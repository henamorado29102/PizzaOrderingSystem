import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PizzaCartComponent } from '../pizza-cart/pizza-cart.component';
import { Pizza } from '../models/pizza';
import { Size } from '../models/size';
import { ToppingType } from '../models/topping-type';
import { Topping } from '../models/topping';
import { ToppingTypesService } from '../Services/topping-types.service';
import { SizesService } from '../Services/sizes.service';
import { ToppingsService } from '../Services/toppings.service';
import { SIZE_DATA } from '../Services/static-data';

@Component({
  selector: 'app-pizza-customization',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PizzaCartComponent],
  templateUrl: './pizza-customization.component.html',
  styleUrls: ['./pizza-customization.component.css'],
})
export class PizzaCustomizationComponent implements OnInit {
  @Output() onAddPizzaToChart: EventEmitter<Pizza> = new EventEmitter();
  selectedSize: string = '';
  sizes: Size[] = [];
  toppingTypes: ToppingType[] = [];
  toppings: Topping[] = [];
  pizzaForm: FormGroup;

  constructor(
    private sizesService: SizesService,
    private toppingTypesService: ToppingTypesService,
    private topppingsService: ToppingsService,
    private formBuilder: FormBuilder
  ) {
    
    this.pizzaForm = this.formBuilder.group({
      size: [Validators.required],
      toppings: this.formBuilder.array([]), 
    });
  }

  ngOnInit(): void {
    this.sizes = this.sizesService.getAllSizes();
    this.toppingTypes = this.toppingTypesService.getToppingTypes();
    this.toppings = this.topppingsService.getToppings();
    this.selectedSize = this.sizes[0].id; 
    if (this.sizes.length > 0) {
      this.pizzaForm.get('size')?.setValue(this.selectedSize);
    }  
  }
  onToppingChange(toppingId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const toppingsFormArray = this.pizzaForm.get('toppings') as FormArray;
  
    if (isChecked) {
      toppingsFormArray.push(this.formBuilder.control(toppingId));
    } else {
      const index = toppingsFormArray.controls.findIndex(x => x.value === toppingId);
      toppingsFormArray.removeAt(index);
    }
  }

  addToCart() {
    const formValue = this.pizzaForm.value;
    const selectedSize = this.sizes.find(size => size.id === formValue.size);
    const selectedToppings = formValue.toppings.map((toppingId: string) =>
      this.toppings.find(topping => topping.id === toppingId)
    ).filter((topping: Topping | undefined): topping is Topping => !!topping);

    if (!selectedSize) {
      console.error('Selected size not found!');
      return;
    }

    const pizza: Pizza = {
      size: selectedSize,
      toppings: selectedToppings,
      price: 0,
      beforePrice: 0,
      offer: ""
    };
    this.onAddPizzaToChart.emit(pizza);
    this.resetPizzaForm()
  }

  resetPizzaForm() {
    this.pizzaForm.get('size')?.setValue(this.sizes[0]?.id);

    const toppingsFormArray = this.pizzaForm.get('toppings') as FormArray;
    toppingsFormArray.clear();

    const checkboxes = document.querySelectorAll('.topping input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
  }

}
