import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-cart.component.html',
  styleUrls: ['./pizza-cart.component.css'],
})
export class PizzaCartComponent {
  @Input() cart: any[] = [];
}
