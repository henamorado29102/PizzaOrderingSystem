import { Size } from "./size";

export interface Offer {
    id : string;
    description : string;
    size : Size; 
    minToppings : number; 
    minToppingsPerPizza : number;
    minPizza : number;
    discount : number; 
    percentDiscount : number; 
}
