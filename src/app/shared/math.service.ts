import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //WHy is this here?
})
export class MathService {

  constructor() { }

  //Move this to a service.. a math service of some sort
  round = (value: number, precision: number) => {
    const decimals = Math.pow(10, precision);
    return Math.round(value * decimals) / decimals;
  }
  getPercent = (amount: number, total: number): number => {
    return this.round(amount / total * 100, 2);
  }
}
