import { Component, OnInit } from '@angular/core';
import { CalculatorService } from './services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [CalculatorService]
})
export class CalculatorComponent implements OnInit {

  nums: string[] = [];
  operations: string[] = [];
  
  constructor(private calculator: CalculatorService) {}

  ngOnInit(): void {
    const { nums, operations } = this.calculator;
    this.nums = nums;
    this.operations = operations;
  }

  handleBtnClick(event: string) {
    this.calculator.handleEvent(event);
  }
}