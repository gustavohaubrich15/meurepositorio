import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-customize',
  imports: [],
  templateUrl: './button-customize.component.html',
  styleUrl: './button-customize.component.css'
})
export class ButtonCustomizeComponent {
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() backgroundColor: string = '#4B2DBB';
}
