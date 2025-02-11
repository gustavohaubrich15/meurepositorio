import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { InputCustomizeComponent } from '../input-customize/input-customize.component';
import { IProject } from '../../../services/userservice/user.service';
import { ButtonCustomizeComponent } from '../button-customize/button-customize.component';

@Component({
  selector: 'app-modal-project',
  imports: [InputCustomizeComponent, ButtonCustomizeComponent],
  templateUrl: './modal-project.component.html',
  styleUrl: './modal-project.component.css'
})
export class ModalProjectComponent {
  @ViewChild('titleInput') titleInput!: InputCustomizeComponent;
  @ViewChild('descriptionInput') descriptionInput!: InputCustomizeComponent;
  @ViewChild('linkInput') linkInput!: InputCustomizeComponent;
  isInputDisabled = signal<boolean>(false);
  buttonCloseName = signal<string>("Voltar");
  buttonSaveName = signal<string>("Salvar");
  backgroundColor = signal<string>("#19191A");

  imageFile: File | null = null;
  imagePreview: string | null = null;

  @Output() closeModalProjectEvent = new EventEmitter<Event>();
  @Output() saveProjectButtonEvent = new EventEmitter<IProject>();

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = 100;
            canvas.height = 100;
            ctx.drawImage(img, 0, 0, 100, 100);
            this.imagePreview = canvas.toDataURL('image/png');
          }
        };
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  closeModal() {
    this.closeModalProjectEvent.emit();
  }

  saveProject() {
    const projectData: IProject = {
      title: this.titleInput?.inputValue || '',
      description: this.descriptionInput?.inputValue || '',
      link: this.linkInput?.inputValue || '',
      image: this.imagePreview || ''
    };

    this.saveProjectButtonEvent.emit(projectData);
  }
}
