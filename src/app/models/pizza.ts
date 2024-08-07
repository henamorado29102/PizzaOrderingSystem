import { Offer } from "./offer";
import { Size } from "./size";
import { Topping } from "./topping";

export interface Pizza {
    size : Size;
    toppings : Topping[];
    price: number;
    beforePrice: number;
    offer: string;
}
