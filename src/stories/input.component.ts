import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
     <div class="flex" style="align-items: center; position: relative; max-width: 400px;">
    <input
      [type]="Type"
      [placeholder]="placeholder"
      [value]="Text"
      [class.is-invalid]="isInvalid"
    >

    <img  *ngIf="Type == 'text'" src="./assets/user-icon.svg"  [class.out-input]="Text == ''" [class.in-input] ="Text != '' && Text != ' '"  alt="">
    <img  *ngIf="Type == 'password'" src="./assets/password-icon.svg"  [class.out-input]="Text == ''" [class.in-input] ="Text != '' && Text != ' '"  alt="">

  </div>
  `,
  styleUrls: ['./input.css'],
})
export class InputComponent {
  @Input()
  placeholder: string = 'Usuário'

  @Input()
  Text: string = ''

  @Input()
  isInvalid: boolean = false;

  @Input()
  Type: 'text' | 'password' = 'text';
}
