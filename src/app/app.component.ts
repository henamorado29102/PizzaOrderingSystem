import { Component } from '@angular/core';

import { PizzaCustomizationComponent } from './pizza-customization/pizza-customization.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PizzaCustomizationComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzaOrderingSystem';
}
