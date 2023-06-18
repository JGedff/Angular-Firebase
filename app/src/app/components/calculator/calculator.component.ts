import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/model/Game';

@Component({
  selector: 'app-calculator',
  templateUrl:  './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  @Input() array: Game[] = [];

  firstInput: boolean = true;
  number1: number = 0;
  operator: string = " ";
  number2: number = 0;
  result: number = 0;

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      game: ['', Validators.required]
    })
  }

  addNumber(num: number) {
    if (this.firstInput) {
      this.number1 = Number(num);

      this.firstInput = !this.firstInput;
    }
    else {
      this.number2 = Number(num);
    }
  }

  changeOperation(op: string) {
    this.operator = op
  }

  operate() {
    switch(this.operator) {
      case '+': 
        this.number1 = this.number1 + this.number2;
        break;
      case '-': 
        this.number1 = this.number1 - this.number2;
        break;
      case '*': 
        this.number1 = this.number1 * this.number2;
        break;
      case '/': 
        this.number1 = this.number1 / this.number2;
        break;
    }

    this.result = this.number1;
  }

  clear() {
    this.number1 = 0;
    this.number2 = 0;
    this.result = 0;
    this.operator = " ";
    this.firstInput = true;
  }

  selectGame() {
    let num = Number(this.form.value.game);

    if (this.firstInput) {
      this.number1 = num;

      this.firstInput = !this.firstInput;
    }
    else {
      this.number2 = num;
    }
  }
}
