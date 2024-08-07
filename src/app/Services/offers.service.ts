import { Injectable } from '@angular/core';
import { Offer } from '../models/offer';
import { SIZE_DATA } from './static-data';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  private OFFERS_DATA: Offer[] = [
    {
      id: '1',
      description: '1 Medium Pizza with 2 toppings',
      minPizza: 1,
      size: SIZE_DATA[1],
      minToppings: 2,
      minToppingsPerPizza: 0,
      discount: 5,
      percentDiscount: 0,
    },
    {
      id: '2',
      description: '2 Medium Pizza with 4 toppings each',
      minPizza: 2,
      size: SIZE_DATA[1],
      minToppings: 0,
      minToppingsPerPizza: 4,
      discount: 9,
      percentDiscount: 0,
    },
    {
      id: '2',
      description:
        '1 Large with 4 toppings (Peperoni and Barbecue chiking are counted as 2 toppings)',
      minPizza: 1,
      size: SIZE_DATA[2],
      minToppings: 4,
      minToppingsPerPizza: 0,
      discount: 0,
      percentDiscount: 0.5,
    },
  ];

  constructor() {}

  getAllOffers() {
    return this.OFFERS_DATA;
  }

  getApplicableOffers(pizzas: Pizza[]): Pizza[] {
    const applicableOffers: Offer[] = [];
    let mediumPizzaCount = 0;
    let mediumPizzaIndex = 0;

    pizzas.forEach((pizza, index) => {
      if (pizza.size.id === 'medium' && pizza.toppings.length === 2) {
        pizza.beforePrice = pizza.price;
        pizza.price = 5;
        pizza.offer = 'Offer 1';
      } else if (
        pizza.size.id === 'large' &&
        pizza.toppings.filter((t) => t.id === 'pep' || t.id === 'bbq')
          .length === 2
      ) {
        pizza.beforePrice = pizza.price;
        pizza.price = pizza.price * 0.5;
        pizza.offer = 'Offer 3';
      } else if (pizza.size.id === 'medium' && pizza.toppings.length == 4) {
        mediumPizzaCount++;
        if (mediumPizzaCount == 1){
           mediumPizzaIndex = index;
        }         
     }

     if(mediumPizzaCount == 2){
       pizzas[mediumPizzaIndex].beforePrice = pizzas[mediumPizzaIndex].price;
       pizzas[mediumPizzaIndex].price = 9;
       pizzas[mediumPizzaIndex].offer = 'Offer 2';    
       pizza.beforePrice = pizza.price;    
       pizza.price = 9;
       pizza.offer = 'Offer 2';;
       
       mediumPizzaCount = 0;
     }      
    });
    return pizzas.map(pizza => {return pizza})
  }
}
