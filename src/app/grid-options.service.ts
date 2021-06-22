import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GridOptionsService {
  x = new BehaviorSubject(10);
  y = new BehaviorSubject(10);
  constructor() {}
}
