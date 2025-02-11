import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { ButtonCustomizeComponent } from '../button-customize/button-customize.component';
import { InputCustomizeComponent } from '../input-customize/input-customize.component';
import { FormsModule } from '@angular/forms';

export interface SocialMediaData {
  linkedin: string;
  instagram: string;
  facebook: string;
  github: string;
}


@Component({
  selector: 'app-modal-social-media',
  imports: [ ButtonCustomizeComponent, InputCustomizeComponent, FormsModule],
  templateUrl: './modal-social-media.component.html',
  styleUrl: './modal-social-media.component.css'
})
export class ModalSocialMediaComponent {
  @ViewChild('linkedinInput') linkedinInput!: InputCustomizeComponent;
  @ViewChild('instagramInput') instagramInput!: InputCustomizeComponent;
  @ViewChild('facebookInput') facebookInput!: InputCustomizeComponent;
  @ViewChild('githubInput') githubInput!: InputCustomizeComponent;
  isInputDisabled = signal<boolean>(false);
  buttonCloseName = signal<string>("Voltar");
  buttonSaveName = signal<string>("Salvar");
  backgroundColor = signal<string>("#19191A");
  @Input() linkedin: string = '';
  @Input() instagram: string = '';
  @Input() facebook: string = '';
  @Input() github: string = '';

  @Output() closeModalSocialMediaEvent = new EventEmitter<Event>();
  @Output() saveSocialMediaButtonEvent = new EventEmitter<SocialMediaData>();
  
  ngAfterViewInit() {
    if (this.linkedinInput) {
      this.linkedinInput.inputValue = this.linkedin || '';
    }

    if (this.instagramInput) {
      this.instagramInput.inputValue = this.instagram || '';
    }

    if (this.facebookInput) {
      this.facebookInput.inputValue = this.facebook || '';
    }

    if (this.githubInput) {
      this.githubInput.inputValue = this.github || '';
    }
  }
  
  closeModal() {
    this.closeModalSocialMediaEvent.emit();
  }

  saveSocialMedia(){
    const socialMediaData: SocialMediaData = {
      linkedin: this.linkedinInput?.inputValue || '',
      instagram: this.instagramInput?.inputValue || '',
      facebook: this.facebookInput?.inputValue || '',
      github: this.githubInput?.inputValue || ''
    };
    
    this.saveSocialMediaButtonEvent.emit(socialMediaData);
  }

}
