import { Component, Input, Output, EventEmitter, input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type IInputType = 'text' | 'password' | 'email' | 'number' | 'tel';

@Component({
  selector: 'app-input-customize',
  templateUrl: './input-customize.component.html',
  styleUrls: ['./input-customize.component.css'],
  imports:[FormsModule]
})
export class InputCustomizeComponent { 
  @Input() inputType: IInputType = 'text';
  @Input() placeholder: string = 'Digite aqui';
  @Input() disabled: boolean = false;
  @Input() height: string = '70px';
  @Input() width: string = '300px';
  @Input() inputValue: string = '';
  @Input() maxlength: string = '90';

  @Output() inputChange = new EventEmitter<Event>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && changes['disabled'].currentValue === true) {
      this.inputValue = '';
    }
  }

  onInputChange(event: Event): void {
    this.inputChange.emit(event); 
  }  
}
