import { Injectable } from '@angular/core';
import { Size } from '../models/size';
import { SIZE_DATA } from './static-data';

@Injectable({
  providedIn: 'root'
})
export class SizesService {
  constructor() { }

  getAllSizes() : Size[] {
    return SIZE_DATA;
  }
}
