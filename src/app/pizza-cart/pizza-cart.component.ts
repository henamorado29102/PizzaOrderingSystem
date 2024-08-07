import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pizza } from '../models/pizza';
import { Cart } from '../models/cart';
import { Topping } from '../models/topping';
import { ToppingsService } from '../Services/toppings.service';
import { TableHeader } from '../models/table-header';

@Component({
  selector: 'app-pizza-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-cart.component.html',
  styleUrls: ['./pizza-cart.component.css'],
})
export class PizzaCartComponent {
  @Input() cart : Cart | undefined = undefined

  toppings: Topping[] = [];
  tableHeader: TableHeader[] = []

  constructor(   
    private topppingsService: ToppingsService,
  ) {
    this.toppings = this.topppingsService.getToppings();  
    this.tableHeader.push({id: "no", header: "No" })
    this.tableHeader.push({id: "size", header: "Size" })
    this.tableHeader.push({id: "price", header: "Price" })
    this.tableHeader.push({id: "beforeprice", header: "Price Before offer" })
    this.tableHeader.push({id: "offer", header: "Offer" })   

  }

  ngOnInit(): void {
    this.toppings = this.topppingsService.getToppings();
    this.toppings.forEach(topping => {
      this.tableHeader.push({id: topping.id, header: topping.description });
    });
  }

  getToppings(pizza: Pizza): string[] {
    let toppingData: string[] = [];
    this.toppings.forEach(topping => {
      if(pizza.toppings.find(t => t.id === topping.id))
        toppingData.push("x")
      else
      toppingData.push("")
      
    });
    return toppingData;
  }
}
