# Memory

https://noahquagh.github.io/Memory/

Un jeu de mémoire (paires) en HTML, CSS et JavaScript vanilla. Les images des cartes sont chargées dynamiquement depuis [Picsum Photos](https://picsum.photos/).

## Règles du jeu

Le plateau contient 16 cartes, soit 8 paires d'images identiques, disposées en grille 4×4.

- si les deux images correspondent, la paire reste face visible ;
- sinon, les deux cartes se retournent après un court délai.

La partie se termine quand les 8 paires sont trouvées. Le nombre de coups et le temps écoulé sont affichés en continu.

## Structure du projet

```
.
├── index.html
└── assets/
    ├── style/
    │   └── memoryStyle.css
    └── js/
        ├── scriptMemory.js
        └── utils/
            └── formatageDate.js
```

## Fonctionnement technique

Au lancement d'une partie, `scriptMemory.js` tire un identifiant de départ aléatoire et construit 8 URL d'images Picsum consécutives, qu'il duplique et mélange (algorithme de Fisher-Yates) pour former les 16 cartes. Chaque carte est un `<div class="card">` ; cliquer dessus insère une balise `<img>` dedans, ce qui déclenche visuellement le retournement côté CSS. En cas d'échec, cet `<img>` est retiré après un délai, et la carte revient face cachée.
