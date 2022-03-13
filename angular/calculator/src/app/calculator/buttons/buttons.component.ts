import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  highlightedBtn: Record<string, boolean> = {
    "*": false,
    "/": false,
    "+": false,
    "-": false
  }

  @Output() onBtnClick = new EventEmitter<string>();

  btnClick(val: string) {
    for (let key in this.highlightedBtn) {
      this.highlightedBtn[key] = key === val;
    }
    this.onBtnClick.emit(val);
  }

}
