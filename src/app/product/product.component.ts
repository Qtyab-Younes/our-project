import { Component } from '@angular/core';
import { ChildProductComponent } from './child-product/child-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ChildProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
