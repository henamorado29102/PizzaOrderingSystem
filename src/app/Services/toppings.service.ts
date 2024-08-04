import { Injectable } from '@angular/core';
import { Topping } from '../models/topping';
import { TOPPINGS } from './static-data';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  
  constructor() { }

  getToppings() {
    return TOPPINGS;
  }
}
