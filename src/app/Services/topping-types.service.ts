import { Injectable } from '@angular/core';
import { ToppingType } from '../models/topping-type';

@Injectable({
  providedIn: 'root'
})
export class ToppingTypesService {
  
  private TOPPINGS_TYPES : ToppingType[] = [
    { id : "veg", description : "Veg"},
    { id : "non-veg", description : "Non Veg"},
    
  ]

  constructor() { }

  getToppingTypes() : ToppingType[] {
    return this.TOPPINGS_TYPES;
  }
}
