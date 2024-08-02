import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaCartComponent } from '../pizza-cart/pizza-cart.component';
import { PizzaOrder } from '../models/pizza-order.model'; // Import the PizzaOrder model

@Component({
  selector: 'app-pizza-customization',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PizzaCartComponent
  ],
  templateUrl: './pizza-customization.component.html',
  styleUrls: ['./pizza-customization.component.css'],
})
export class PizzaCustomizationComponent {
  sizes = [
    { size: 'Small', price: 5 },
    { size: 'Medium', price: 7 },
    { size: 'Large', price: 8 },
    { size: 'Extra Large', price: 9 }
  ];

  selectedSize = this.sizes[0].size;

  vegetarianToppings: { name: string, price: number }[] = [
    { name: 'Tomatoes', price: 1 },
    { name: 'Onion', price: 0.5 },
    { name: 'Bell Pepper', price: 1 },
    { name: 'Mushrooms', price: 1.2 },
    { name: 'Pineapple', price: 0.75 }
  ];

  nonVegetarianToppings: { name: string, price: number }[] = [
    { name: 'Sausage', price: 1 },
    { name: 'Pepperoni', price: 2 },
    { name: 'Barbecue Chicken', price: 3 }
  ];

  selectedToppings: string[] = [];
  cart: PizzaOrder[] = [];

  onToppingChange(event: any) {
    const topping = event.target.value;
    if (event.target.checked) {
      this.selectedToppings.push(topping);
    } else {
      const index = this.selectedToppings.indexOf(topping);
      if (index > -1) {
        this.selectedToppings.splice(index, 1);
      }
    }
  }

  calculatePrice(size: string, toppings: string[]): { price: number, offer: string, oldPrice: number } {
    const selectedSizeObj = this.sizes.find(s => s.size === size);
    const sizePrice = selectedSizeObj ? selectedSizeObj.price : 0;
    const toppingsPrice = toppings.reduce((total, topping) => {
      const vegTopping = this.vegetarianToppings.find(t => t.name === topping);
      const nonVegTopping = this.nonVegetarianToppings.find(t => t.name === topping);
      return total + (vegTopping ? vegTopping.price : nonVegTopping ? nonVegTopping.price : 0);
    }, 0);

    let price = sizePrice + toppingsPrice;
    let offer = '';
    let oldPrice = 0;


    if (size === 'Medium' && toppings.length === 2) {
      oldPrice = price;
      price = 5;
      offer = 'Offer 1';
    }

    else if (size === 'Large' && toppings.filter(t => t === 'Pepperoni' || t === 'Barbecue Chicken').length >= 2) {
      oldPrice = price;
      price = price * 0.5;
      offer = 'Offer 3';
    }

    return { price, offer, oldPrice };
  }

  applyOffers() {
    
    let mediumPizzaCount = 0;
    let mediumPizzaIndex = 0;

    this.cart.forEach((pizza, index) => {
      const { price, offer, oldPrice } = this.calculatePrice(pizza.size, pizza.toppings);
      pizza.price = price;
      pizza.offer = offer;
      pizza.oldPrice = oldPrice;
      if (pizza.size === 'Medium' && pizza.toppings.length == 4) {
         mediumPizzaCount++;
         if (mediumPizzaCount == 1){
            mediumPizzaIndex = index;
         }         
      }

      if(mediumPizzaCount == 2){
        this.cart[mediumPizzaIndex].oldPrice = this.cart[mediumPizzaIndex].price;
        this.cart[mediumPizzaIndex].price = 9;
        this.cart[mediumPizzaIndex].offer = 'Offer 2';        
        pizza.price = 9;
        pizza.offer = 'Offer 2';;
        pizza.oldPrice = price;
        mediumPizzaCount = 0;
      }
    });
  }

  addToCart() {
    const selectedPizza: PizzaOrder = {
      size: this.selectedSize,
      toppings: [...this.selectedToppings],
      price: 0,
      offer: '',
      oldPrice: 0
    };

    this.cart.push(selectedPizza);
    this.applyOffers();

    // Reset the form
    this.selectedSize = this.sizes[0].size;
    this.selectedToppings = [];
  }
}
