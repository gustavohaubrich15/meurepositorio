import { Component, EventEmitter, Input, input, Output, signal } from '@angular/core';
import { ButtonCustomizeComponent } from '../button-customize/button-customize.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-project',
  imports: [ ButtonCustomizeComponent, CommonModule],
  templateUrl: './item-project.component.html',
  styleUrl: './item-project.component.css'
})
export class ItemProjectComponent {
  @Input() image: string = "assets/project.jpg";
  @Input() showButton: boolean = true;
  @Input() title: string = "Taskify";
  @Input() description: string = "Gerencie tarefas e acompanhe o progresso.";
  @Input() link: string = "https://developer.mozilla.org/pt-BR/";
  isInputDisabled = signal<boolean>(false);
  buttonDeleteName = signal<string>("Delete");

  @Output() deleteProjectEvent = new EventEmitter<string>();

  clickItem() {
    if (this.link) {
      window.open(this.link, '_blank'); 
    }
  }

  deleteProject(){
    this.deleteProjectEvent.emit(this.title)
  }
}
