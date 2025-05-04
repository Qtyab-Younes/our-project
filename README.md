# TP CL&IHM n°2 : Angular, gestion de couleurs

Dans ce TP, nous allons écrire une petite application Angular pour gérer des couleurs et dessiner du pixel art.

## Démarrage

Pour démarrer le processus de développement, vous devez installer les dépendances du projet en exécutant dans un terminal la commande suivante :

```bash
npm ci
```

Exécutez ensuite le serveur de développement avec la commande suivante :

```bash
npm start
```

Un serveur de développement est alors ouvert à l'adresse `http://localhost:4200/`. L'application se recharge automatiquement à chaque modification du code source. Connectez-vous à l'URL pour voir l'application en action. Dans votre navigateur, ouvrez la console de développement pour voir les messages de débogage (raccourci clavier CTRL-MAJ-i en général).

## Partie 1 : Spécification d'une couleur

Nous allons gérer les couleurs avec leur code hexadécimal. Un code hexadécimal est une chaîne de 7 caractères commençant par le caractère `#` suivi de 6 caractères hexadécimaux (chiffres de 0 à 9 et lettres de A à F). Les deux premiers chiffres représentent l'intensité de rouge, les deux suivants l'intensité de vert et les deux derniers l'intensité de bleu. Par exemple, le code `#FF0000` représente la couleur rouge, le code `#00FF00` la couleur verte et le code `#0000FF` la couleur bleue. La couleur jaune est représentée par le code `#FFFF00` (rouge et vert au maximum).

Travaille à réaliser :

* Modifiez le signal dérivé `hexColor` afin qu'il corresponde au code hexadécimal du signal `color`.
* Complétez la méthode `setColor` de la VueModèle pour qu'elle mette à jour le signal `color` à partir du code hexadécimal donné en argument.
* Vérifiez que l'IHM est bien mise à jour lorsque l'utilisateur spécifie une couleur à l'aide du widget dédié.
* Ajoutez dans ce fichier, ci-dessous, une description des influences existantes entre les signaux `color`, `hexColor` et la vue Angular.

## Partie 2 : Ajout d'une IHM de spécification de couleur

Vous allez compléter la vue et la vue-modèle afin de permettre à l'utilisateur de spécifier la valeur de `color` à l'aide de trois potentiomètres linéaires (pour les intensités de rouge, vert et bleu). Ces potentiomètres devront aussi refléter la valeur de `color` lorsqu'elle est modifiée par un autre moyen (par exemple, avec le widget natif dédié).

**Indications :**

* Un potentiomètre linéaire est un élément de formulaire HTML de type `input` avec un attribut `type` de valeur `range` (voir la [documentation](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/range)).
* Implémentez une méthode `setColorIntensity(canal: keyof Colour, value: number)` dans la vue-modèle pour mettre à jour la couleur en fonction de l'intensité d'un canal donné.
* Utilisez cette méthode dans la vue, en particulier dans les instructions exécutez lorsque les potentiomètres sont modifiés (voir `(ngModelChange)`).

# Partie 3 : Pixel art

Nous allons maintenant implémenter un programme de dessin de [pixel art](https://fr.wikipedia.org/wiki/Pixel_art).
Dans la vue-modèle, vous devrez gérer un signal produisant des `PixelArt` (voir définition dans le fichier `src/app/data/pixel-art.ts`). Dans la vue, vous représenterez le pixel art à l'aide d'un tableau HTML. Chaque cellule du tableau représentera un pixel de l'image.

Indications :

* Dans le fichier `src/app/data/pixel-art.ts`, définir une structure de données PixelArtHex représentant un pixel art sous forme de tableau de tableaux de chaînes de caractères hexadécimales.
    ```typescript
    type PixelArtHexRow = readonly string[];
    export type PixelArtHex = readonly PixelArtHexRow[];
    ```
* Implémentez la fonction
    ```typescript
    export function pixelArtToHex(pixelArt: PixelArt): PixelArtHex {
        // ...
    }
    ```
* Dans la vue-modèle
  * Définissez un signal primaire privé `_pixelArt` publiant des `PixelArt`. Initiez en la valeur à l'aide de la fonction `createPixelArtCanvas` (fichier `src/app/data/pixel-art.ts`).
  * Dérivez en un signal `protected` `pixelArtHex` publiant des `PixelArtHex`.
* Dans la vue
  * Utiliser `@for` pour générer la structure du tableau HTML en fonction des données du pixel art.
  * Utiliser la directive `style` pour définir la couleur de fond des cellules du tableau :
    ```html
    <td [style.background-color]="la couleur au format hexadécimal"></td>
    ```
* Utiliser le signal `color` pour remplir les pixels du tableau quand on clique dessus.
* Vous pouvez vous abonner à un click sur une cellule du tableau en utilisant la directive `(click)`.
* Pour que le tableau soit bien mis en page, vous pouvez utiliser le code SCSS suivant, à placer dans le fichier `src/app/app.component.scss` :

    ```scss
    $W: 16px;
    :host {
        table {
            border-collapse: collapse;
            border: solid black 1px;
            td {
                width: $W;
                height: $W;
                &:hover {
                    border: solid black 1px;
                }
            }
        }
    }
    ```