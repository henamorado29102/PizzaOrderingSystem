import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Pizza } from '../models/pizza';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getTotal(pizzas : Pizza[]) : number {
    return pizzas.reduce((sum, current) => sum + current.size.price, 0)
  } 

  getPizzasPrice(pizzas: Pizza[]): Pizza[]{
    return pizzas.map(pizza => {
      const toppingsPrices = pizza.toppings.reduce((total, topping) => total + topping.price, 0);
      pizza.price = pizza.size.price + toppingsPrices;
      return pizza;
    });
  }
  getDiscounts(offers : Offer[]) : number {
    return offers.reduce((sum, current) => sum + current.discount, 0); 
  }

  

  getPercentDiscounts(offers : Offer[]) : number {
    return offers.reduce((sum, current) => sum + current.percentDiscount, 0);
  }
}
