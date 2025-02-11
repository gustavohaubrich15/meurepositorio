import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { InputCustomizeComponent } from '../input-customize/input-customize.component';
import { ButtonCustomizeComponent } from '../button-customize/button-customize.component';

export interface BasicInfoData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-modal-basic-info',
  imports: [ InputCustomizeComponent, ButtonCustomizeComponent ],
  templateUrl: './modal-basic-info.component.html',
  styleUrl: './modal-basic-info.component.css'
})
export class ModalBasicInfoComponent {
    @ViewChild('nameInput') nameInput!: InputCustomizeComponent;
    @ViewChild('descriptionInput') descriptionInput!: InputCustomizeComponent;
    isInputDisabled = signal<boolean>(false);
    buttonCloseName = signal<string>("Voltar");
    buttonSaveName = signal<string>("Salvar");
    backgroundColor = signal<string>("#19191A");
    maxlength = signal<string>("41");
    @Input() name: string = '';
    @Input() description: string = '';
  
    @Output() closeModalBasicInfoEvent = new EventEmitter<Event>();
    @Output() saveBasicInfoButtonEvent = new EventEmitter<BasicInfoData>();
    
    ngAfterViewInit() {
      if (this.nameInput) {
        this.nameInput.inputValue = this.name || '';
      }
  
      if (this.descriptionInput) {
        this.descriptionInput.inputValue = this.description || '';
      }
    }
    
    closeModal() {
      this.closeModalBasicInfoEvent.emit();
    }
  
    saveBasicInfo(){
      const basicInfoData: BasicInfoData = {
        name: this.nameInput?.inputValue || '',
        description: this.descriptionInput?.inputValue || ''
      };
      
      this.saveBasicInfoButtonEvent.emit(basicInfoData);
    }
}
