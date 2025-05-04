import { Component, computed, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Colour, coulourToHex } from './data/Colour';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createPixelArtCanvas, PixelArt, PixelArtHex, pixelArtToHex } from './data/pixel-art';
import { ProductComponent } from "./product/product.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    CommonModule,
    FormsModule,
    ProductComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * color est un signal qui émet des valeurs de type Colour.
   * Il est de type readonly, ce qui signifie que color ne peut pas être réaffecté.
   * Sa visibilité est protected, dans notre cas cela signifie que seul AppComponent et sa vue peuvent y accéder.
   * Colour est une interface définie dans le fichier src/app/data/Colour.ts
   */
  protected readonly color = signal<Colour>({ red: 0, green: 0, blue: 0 });
  
  /**
   * hexColor est une propriété calculée qui retourne le code hexadécimal correspondant à color.
   * Utilisez les fonctions du fichier src/app/data/Colour.ts pour convertir la couleur en hexadécimal.
   */
  protected readonly hexColor = computed<string>(
    () => coulourToHex(this.color()) // à remplacer par votre code
  );

  /**
   * setColor est une méthode qui permet de définir la couleur color à partir d'un code hexadécimal.
   * @param hex code hexadécimal de la couleur à définir
   */
  setColor(hex: string): void {
    //ici ces variables sont en hexadecimal
    let red = hex.slice(1,3);//ici on a pris la chaine de la case 1 a la case 3 et on l'a mis dans red 
    let green = hex.slice(3,5);
    let blue = hex.slice(5,7);
    //ici sont en entier
    let redInt = parseInt(red,16);
    let greenInt = parseInt(green,16);
    let blueInt = parseInt(blue,16);

    this.color.set({red:redInt,green:greenInt,blue:blueInt});
  }
  setColorIntensity(canal: keyof Colour, value:number): void{

    this.color.update((oldDict) => ({red: canal==="red" ? value : oldDict.red ,
      green: canal==="green" ?  value : oldDict.green,
      blue: canal==="blue"  ? value : oldDict.blue}));
  }
  logEvent(event: Event): void {
    console.log(event);
  }
  private _pixelArt = signal<PixelArt>(createPixelArtCanvas(50, 50, this.color())) ;
  protected pixelArtHex = signal<PixelArtHex>(pixelArtToHex(this._pixelArt()));

  updateCell(rowIndex:number,colIndex:number): void{
    this._pixelArt.update((oldPixelArt) => {
    const newRow = [...oldPixelArt[rowIndex]];
    newRow[colIndex] = this.color();
    const newPixelArt = oldPixelArt.map((row, index) => {
      return index === rowIndex ? newRow : row;
    })
    return newPixelArt;
  }
  );

    this.pixelArtHex.set(pixelArtToHex(this._pixelArt()));
    }

}
