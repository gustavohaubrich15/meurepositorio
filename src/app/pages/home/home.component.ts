import { Component, computed, signal, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ButtonCustomizeComponent } from '../../shared/components/button-customize/button-customize.component';
import { InputCustomizeComponent } from '../../shared/components/input-customize/input-customize.component';
import { CardDevComponent } from '../../shared/components/card-dev/card-dev.component';
import { AuthService } from '../../services/authservice/authservice.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/userservice/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ CommonModule , ButtonCustomizeComponent, InputCustomizeComponent, CardDevComponent, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(InputCustomizeComponent) inputComponent: InputCustomizeComponent | undefined;
  isInputDisabled = signal<boolean>(true);
  showViewers = signal<boolean>(true);
  buttonLinkName = signal<string>("Criar Agora");
  isAuthenticated = computed(() => {
    const authenticated = this.authService.isAuthenticated();
    if (authenticated) {
      this.loadUserLink()
    }
    return authenticated;
  });
  username = computed(() => this.authService.currentUser()?.displayName ?? '');
  buttons = [
    { 
      id: 1, 
      name: 'LinkedIn', 
      icon: `assets/linkedin.svg`,
      link: 'https://www.linkedin.com/'  
    },
    { 
      id: 2, 
      name: 'Instagram', 
      icon: `assets/instagram.svg`,
      link: 'https://instagram.com/'
    },
    { 
      id: 3, 
      name: 'Facebook', 
      icon: `assets/facebook.svg`,
      link: 'https://facebook.com/'
    },
    { 
      id: 4, 
      name: 'GitHub', 
      icon: `assets/github.svg`,
      link: 'https://github.com/'
    },
    { 
      id: 5, 
      name: 'Plus', 
      icon: `assets/plus.svg`,
      link: ''
    } 
  ];


  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    
  }

  login() {
    this.authService.loginWithGoogle().subscribe();
  }
 

  loadUserLink() {
    this.userService.getUserData().subscribe(user => {
      if (this.inputComponent) {
        this.inputComponent.inputValue = user?.link ?? ''; 
        if(this.inputComponent.inputValue != ''){
          this.buttonLinkName.set("Editar agora")
        } else{
          this.buttonLinkName.set("Criar agora")
        }
      }
      this.isInputDisabled.set(false); 
    });
  }
  

  async saveLink() {
    try {
      if (this.inputComponent) {
        await this.userService.saveUserLink(this.inputComponent.inputValue);
        alert('Link salvo com sucesso!');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Por favor, forneça um link para salvar.');
      }
    } catch (error) {
      alert('Erro ao salvar o link:');
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      if (this.inputComponent) {
        this.inputComponent.inputValue = ''
      }
      this.isInputDisabled.set(true); 
      this.buttonLinkName.set("Criar agora") 
    });
  }

}
