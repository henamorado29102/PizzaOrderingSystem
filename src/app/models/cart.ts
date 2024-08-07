import { Offer } from "./offer";
import { Pizza } from "./pizza";

export interface Cart {
    pizzas : Pizza[];
    offers : Offer[]; 
    total : number
    discount : number
    finalTotal : number;
}
