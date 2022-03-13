import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ScreenComponent } from './calculator/screen/screen.component';
import { ButtonsComponent } from './calculator/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ScreenComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
