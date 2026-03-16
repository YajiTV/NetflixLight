# NetflixLight
# DOM & SPA — Notions essentielles

## DOM — Document Object Model

> Représentation en arbre de la page HTML. Chaque balise devient un objet JS manipulable.

### Sélectionner un élément
document.getElementById(id)            → cible l'élément par son id
document.querySelector(selecteur)      → cible le 1er élément qui correspond au sélecteur CSS
document.querySelectorAll(selecteur)   → cible TOUS les éléments qui correspondent au sélecteur CSS

### Modifier un élément
el.textContent = 'texte'               → modifie le texte (sans interpréter le HTML)
el.innerHTML   = '<b>texte</b>'        → modifie le contenu HTML
el.setAttribute('attr', 'valeur')      → ajoute/modifie un attribut (src, href, data-…)
el.style.color = 'red'                 → modifie un style inline

### Manipuler les classes
el.classList.add('maClasse')           → ajoute une classe
el.classList.remove('maClasse')        → supprime une classe
el.classList.toggle('maClasse')        → ajoute si absente, supprime si présente
el.classList.contains('maClasse')      → retourne true/false

### Créer / supprimer des éléments
const el = document.createElement('div')  → crée un nouvel élément
parent.appendChild(el)                    → insère en dernier enfant
parent.prepend(el)                        → insère en premier enfant
el.remove()                               → supprime l'élément

### Écouter des événements
el.addEventListener('click', callback)    → déclenche callback au clic
el.addEventListener('input', callback)    → déclenche à chaque frappe (champ texte)
el.addEventListener('submit', callback)   → déclenche à la soumission d'un formulaire
// Dans le callback : e.preventDefault()  → bloque le comportement par défaut (ex: reload)

---le moteur qui affiche et met à jour le contenu
SPA  → l'architecture qui exploite le DOM pour simuler une navigation sans rechargement


## SPA — Single Page Application

> Une seule page HTML chargée au départ. La navigation ne recharge PAS la page :
> le JS met à jour le DOM à la volée.

### Différence avec un site classique (MPA)
MPA (Multi Page App) → chaque lien = requête serveur + rechargement complet
SPA                  → chaque lien = mise à jour du DOM + changement d'URL en JS

### Concepts clés
history.pushState({}, '', '/route')    → change l'URL sans recharger la page
window.onpopstate = callback           → gère le bouton "retour" du navigateur
fetch('/api/data').then(...)           → récupère des données serveur (JSON) sans reload


### En résumé
DOM  → le moteur qui affiche et met à jour le contenu
SPA  → l'architecture qui exploite le DOM pour simuler une navigation sans rechargement

### Hashache 
https://peaklab.fr/glossaire/bcrypt > initialement 
https://peaklab.fr/glossaire/argon2 > Apres recherche

> Vainqueur du PHC 2015 — le seul algo conçu spécifiquement pour ce besoin
> Memory-hard — rend les attaques GPU/ASIC prohibitivement coûteuses
> 3 paramètres tunable — temps, mémoire, parallélisme
> Résistant aux side-channel attacks (variante id)​
> Recommandé par l'OWASP en premier choix absolu​
> API quasi identique à bcrypt en Node.js — migration en 5 minutes