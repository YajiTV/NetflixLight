# NetflixLight

### Documentation : 

API : https://developer.themoviedb.org/reference/trending-movies
emogie : https://symbl.cc/fr/collections/star-symbols/


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

### API REST : 
C'est une interface qui permet à deux applications de communiquer entre elles via le protocole HTTP, en échangeant des données généralement au format JSON.

Principes clés : 

Stateless : le serveur ne garde aucune mémoire du client entre deux requêtes — chaque requête est autonome et contient toutes les infos nécessaires (c'est là que le JWT entre en jeu)​

Client-Serveur : séparation stricte entre le front et le back​

Système en couches : l'API peut passer par des proxys, load balancers, etc., sans que le client s'en préoccupe​

Réponses en JSON : format léger, lisible par les humains et les machine

### Codes a retenir : 
2xx — Succès
| Code | Nom        | Quand l'utiliser                                        |
| ---- | ---------- | ------------------------------------------------------- |
| 200  | OK         | Requête réussie, données renvoyées (GET) mintfull​      |
| 201  | Created    | Ressource créée avec succès (POST) laconsole​           |
| 204  | No Content | Succès mais rien à renvoyer (DELETE) developer.mozilla​ |
3xx — Redirections
| Code | Nom               | Quand l'utiliser                              |
| ---- | ----------------- | --------------------------------------------- |
| 301  | Moved Permanently | L'URL a changé définitivement dotcom-monitor​ |
| 302  | Found             | Redirection temporaire wikipedia​             |
4xx — Erreurs côté client
| Code | Nom                  | Signification                                                                             |
| ---- | -------------------- | ----------------------------------------------------------------------------------------- |
| 400  | Bad Request          | Requête mal formée, JSON invalide, champ manquant ex2​                                    |
| 401  | Unauthorized         | Non authentifié — token JWT absent ou invalide mintfull​                                  |
| 403  | Forbidden            | Authentifié mais sans les droits — ex: un user qui tente d'accéder à une route admin dev​ |
| 404  | Not Found            | Ressource introuvable search-factory​                                                     |
| 405  | Method Not Allowed   | Mauvais verbe HTTP utilisé sur la route (ex: POST sur une route GET) laconsole​           |
| 409  | Conflict             | Conflit de données — ex: email déjà utilisé à l'inscription ex2​                          |
| 422  | Unprocessable Entity | Données syntaxiquement valides mais sémantiquement incorrectes developer.mozilla​         |
5xx — Erreurs côté serveur
| Code | Nom                   | Signification                                                   |
| ---- | --------------------- | --------------------------------------------------------------- |
| 500  | Internal Server Error | Crash non géré côté serveur (bug, DB down) dev​                 |
| 502  | Bad Gateway           | Proxy ou load balancer n'a pas pu joindre le serveur wikipedia​ |
| 503  | Service Unavailable   | Serveur surchargé ou en maintenance ex2​                        |
| 504  | Gateway Timeout       | Le serveur en amont n'a pas répondu à temps wikipedia​          |


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
> Recommandé par l'OWASP en premier choix absolu​ et le NIST
> API quasi identique à bcrypt en Node.js