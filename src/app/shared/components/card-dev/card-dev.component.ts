import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCustomizeComponent } from '../button-customize/button-customize.component';

@Component({
  selector: 'app-card-dev',
  imports: [CommonModule, ButtonCustomizeComponent],
  templateUrl: './card-dev.component.html',
  styleUrl: './card-dev.component.css'
})
export class CardDevComponent {
  @Input() buttons: Array<{ id: number, name: string, icon: string, link: string }> = [];
  @Input() showViewers: boolean = false;
  @Input() showEdit: boolean = false;
  @Input() showButtonPlus: boolean = true;
  @Input() name: string = "André Dev";
  @Input() link: string = "";
  @Input() description: string = "Eu crio produtos para internet";
  @Input() imagedev: string = "assets/devdefault.png"
  @Output() newSocialMediaButtonEvent = new EventEmitter<string>();
  @Output() editProfileButtonEvent = new EventEmitter<string>();

  plusButtonClicked() {
    this.newSocialMediaButtonEvent.emit();
  }
  editProfileButtonClicked() {
    this.editProfileButtonEvent.emit();
  }

  showProfile(){ 
    if(this.link){
 
    }
  }
}
