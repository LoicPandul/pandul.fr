#!/usr/bin/env python3
"""Régénère les extraits de _data/definitions.json depuis le dépôt du Dictionnaire.

La sélection (titres, slugs, ordre) reste celle du fichier ; seul le champ « d »
est recalculé à partir de definitions/fr/<lettre>/<slug>/definition.md.

L'extrait suit la règle de l'ancienne passe 9 de sync-dictionnaire.js : première
phrase, complétée jusqu'à 70 caractères, coupée au dernier espace avant 152 avec
une ellipse au-delà de 155. Différence : une formule en ligne $…$ n'est plus
supprimée (ce qui laissait « l'ensemble des tels que . ») mais réécrite en texte
lisible, variables en italique (<i>), espaces insécables à l'intérieur pour
qu'elle ne soit jamais coupée. Une formule que le convertisseur ne sait pas lire
fait échouer le script au lieu de laisser un trou.

Usage : python3 _scripts/definitions-extraits.py [--source <dossier definitions/fr>] [--check]
  --check : n'écrit rien, signale les extraits qui changeraient ou sont abîmés.
"""
import argparse
import json
import os
import re
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CIBLE = os.path.join(RACINE, '_data', 'definitions.json')
SOURCE = os.path.expanduser('~/Documents/GitHub/Dictionnaire/definitions/fr')

NBSP = ' '
I0, I1 = '\x01', '\x02'  # bornes d'italique, remplacées par <i></i> à la fin
ESP = '\x03'  # espace d'une formule, insécable à la fin

SYMBOLES = {
    'cdot': '·', 'times': '×', 'div': '÷', 'pm': '±', 'le': '≤', 'leq': '≤', 'ge': '≥', 'geq': '≥',
    'neq': '≠', 'ne': '≠', 'approx': '≈', 'equiv': '≡', 'in': '∈', 'notin': '∉', 'subset': '⊂',
    'oplus': '⊕', 'to': '→', 'rightarrow': '→', 'leftarrow': '←', 'Rightarrow': '⇒', 'mapsto': '↦',
    'infty': '∞', 'sum': 'Σ', 'prod': 'Π', 'ldots': '…', 'dots': '…', 'cdots': '⋯', 'mid': '|',
    'lfloor': '⌊', 'rfloor': '⌋', 'lceil': '⌈', 'rceil': '⌉', 'langle': '⟨', 'rangle': '⟩',
    'alpha': 'α', 'beta': 'β', 'gamma': 'γ', 'delta': 'δ', 'epsilon': 'ε', 'lambda': 'λ', 'mu': 'μ',
    'pi': 'π', 'sigma': 'σ', 'phi': 'φ', 'omega': 'ω', 'Delta': 'Δ', 'Sigma': 'Σ', 'Omega': 'Ω',
    'mod': ' mod ', 'bmod': ' mod ', 'log': 'log', 'ln': 'ln', 'max': 'max', 'min': 'min',
    '{': '{', '}': '}', ',': ' ', ';': ' ', ' ': ' ', '|': '‖',
}
BB = {'Z': 'ℤ', 'N': 'ℕ', 'R': 'ℝ', 'Q': 'ℚ', 'C': 'ℂ', 'F': '𝔽'}
EXPOSANTS = str.maketrans('0123456789+-=()n', '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ')
INDICES = str.maketrans('0123456789+-=()', '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎')


def groupe(s, i):
    """Lit un argument LaTeX à la position i : {…} ou un seul caractère."""
    if i < len(s) and s[i] == '{':
        prof, j = 0, i
        while j < len(s):
            prof += {'{': 1, '}': -1}.get(s[j], 0)
            if prof == 0:
                return s[i + 1:j], j + 1
            j += 1
        raise ValueError('accolade non fermée')
    return s[i:i + 1], i + 1


def formule(tex):
    """Convertit une formule LaTeX en ligne en texte lisible, variables en italique."""
    out, i = [], 0
    while i < len(tex):
        c = tex[i]
        if c == '\\':
            m = re.match(r'\\([A-Za-z]+|.)', tex[i:])
            nom = m.group(1)
            i += len(m.group(0))
            if nom in ('mathbb',):
                arg, i = groupe(tex, i)
                out.append(BB.get(arg, arg))
            elif nom in ('text', 'mathrm', 'textrm', 'operatorname'):
                arg, i = groupe(tex, i)
                out.append(arg)
            elif nom in ('mathit', 'mathbf', 'boldsymbol'):
                arg, i = groupe(tex, i)
                out.append(formule(arg))
            elif nom == 'frac':
                a, i = groupe(tex, i)
                b, i = groupe(tex, i)
                out.append(formule(a) + '/' + formule(b))
            elif nom == 'sqrt':
                a, i = groupe(tex, i)
                out.append('√(' + formule(a) + ')')
            elif nom in ('left', 'right', 'big', 'Big', 'bigl', 'bigr'):
                pass
            elif nom in SYMBOLES:
                out.append(SYMBOLES[nom])
            else:
                raise ValueError(f'commande inconnue \\{nom}')
        elif c in '^_':
            arg, i = groupe(tex, i + 1)
            table = EXPOSANTS if c == '^' else INDICES
            if arg and all(ord(ch) in table for ch in arg):
                out.append(arg.translate(table))
            else:
                out.append(('^' if c == '^' else '_') + ('(' + formule(arg) + ')' if len(arg) > 1 else formule(arg)))
        elif c in '{}':
            i += 1
        elif c.isalpha() and c.isascii():
            m = re.match(r'[A-Za-z]+', tex[i:])
            out.append(I0 + m.group(0) + I1)
            i += len(m.group(0))
        else:
            out.append(c)
            i += 1
    texte = ''.join(out)
    texte = re.sub(r'\s+', ' ', texte).strip()
    texte = texte.replace(I1 + I0, '')  # italiques contiguës fusionnées
    return texte.replace(' ', ESP)


def nettoyer(md):
    """Retire le Markdown, réécrit les formules ; même ordre que l'ancienne passe 9."""
    md = re.sub(r'\$\$[\s\S]*?\$\$', '', md)  # formules en bloc : jamais dans un extrait court
    md = re.sub(r'\$([^$\n]+?)\$', lambda m: formule(m.group(1)), md)
    md = re.sub(r'```[\s\S]*?```', '', md)
    md = re.sub(r'!\[[^\]]*\]\([^)]+\)', '', md)
    md = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', md)
    md = re.sub(r'\*\*([^*]+)\*\*', r'\1', md)
    md = re.sub(r'\*([^*\n]+)\*', r'\1', md)
    md = re.sub(r'`([^`\n]+)`', r'\1', md)
    md = re.sub(r'^>\s*', '', md, flags=re.M)
    md = re.sub(r'^[\s]*[-*]\s+', '', md, flags=re.M)
    md = re.sub(r'\s+', ' ', md)  # espaces insécables de la source comprises, comme l'ancienne passe
    return md.strip()


def visible(s):
    return s.replace(I0, '').replace(I1, '')

def longueur(d):
    return len(re.sub(r'</?i>', '', d))


def extrait(md):
    texte = nettoyer(md)
    phrases = re.split(r'(?<=[.!?])[\s ]+(?=[A-ZÀ-Ý])', texte)
    res, i = phrases[0].strip(), 1
    if not 70 <= len(visible(res)) <= 155:
        while len(visible(res)) < 70 and i < len(phrases):
            res = (res + ' ' + phrases[i].strip()).strip()
            i += 1
        if len(visible(res)) > 155:
            # coupe au dernier espace avant 152 caractères visibles, jamais dans une formule
            pos, vus = [], 0
            for k, ch in enumerate(res):  # ESP n'est pas une espace : la coupe ne tombe jamais dans une formule
                if ch == ' ' and vus <= 152:
                    pos.append(k)
                if ch not in (I0, I1):
                    vus += 1
            res = re.sub(r'[.,;:!?]+$', '', res[:pos[-1]]) + '…'
    # espaces insécables à l'intérieur des guillemets, comme le fait site.js au tirage
    res = res.replace('« ', '«' + NBSP).replace(' »', NBSP + '»').replace(ESP, NBSP)
    return res.replace(I0, '<i>').replace(I1, '</i>')


def abime(d):
    """Traces d'une extraction ratée : formule perdue, Markdown ou LaTeX restant."""
    t = re.sub(r'</?i>', '', d)
    motifs = [
        (r'\s[.,)](?:\s|$)', 'espace avant un point, une virgule ou une parenthèse'),
        (r'\s{2,}', 'espaces doubles'),
        (r'\(\s*\)', 'parenthèses vides'),
        (r'[$\\]', 'LaTeX restant'),
        (r'\*|`|\]\(', 'Markdown restant'),
    ]
    return [nom for motif, nom in motifs if re.search(motif, t)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--source', default=SOURCE)
    ap.add_argument('--check', action='store_true')
    a = ap.parse_args()
    if not os.path.isdir(a.source):
        sys.exit(f'source introuvable : {a.source}')
    dossiers = {}
    for lettre in os.listdir(a.source):
        p = os.path.join(a.source, lettre)
        if os.path.isdir(p):
            for slug in os.listdir(p):
                dossiers[slug] = os.path.join(p, slug)
    defs = json.load(open(CIBLE, encoding='utf-8'))
    changes, erreurs = [], []
    for d in defs:
        dossier = dossiers.get(d['s'])
        if not dossier:
            erreurs.append(f"{d['s']} : absent de la source")
            continue
        md = open(os.path.join(dossier, 'definition.md'), encoding='utf-8').read()
        try:
            neuf = extrait(md)
        except ValueError as e:
            erreurs.append(f"{d['s']} : formule illisible ({e})")
            continue
        if longueur(neuf) < 70 and not abime(d['d']):
            # source trop courte pour un extrait (ex. TARO) : on garde le texte écrit à la main
            continue
        if abime(neuf):
            erreurs.append(f"{d['s']} : {', '.join(abime(neuf))} : {neuf}")
        if neuf != d['d']:
            changes.append((d['s'], d['d'], neuf))
            d['d'] = neuf
    for s, avant, apres in changes:
        print(f'{s}\n  - {avant}\n  + {apres}')
    print(f'{len(defs)} extraits, {len(changes)} modifiés, {len(erreurs)} en erreur')
    for e in erreurs:
        print('ERREUR', e, file=sys.stderr)
    if erreurs:
        sys.exit(1)
    if not a.check:
        with open(CIBLE, 'w', encoding='utf-8') as f:
            json.dump(defs, f, ensure_ascii=False, indent=0)
            f.write('\n')


if __name__ == '__main__':
    main()
