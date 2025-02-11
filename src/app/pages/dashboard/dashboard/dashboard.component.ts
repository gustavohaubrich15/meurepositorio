import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardDevComponent } from '../../../shared/components/card-dev/card-dev.component';
import { InputCustomizeComponent } from '../../../shared/components/input-customize/input-customize.component';
import { CommonModule } from '@angular/common';
import { IProject, IUserData, UserService } from '../../../services/userservice/user.service';
import { Router } from '@angular/router';
import { ModalSocialMediaComponent, SocialMediaData } from '../../../shared/components/modal-social-media/modal-social-media.component';
import { BasicInfoData, ModalBasicInfoComponent } from '../../../shared/components/modal-basic-info/modal-basic-info.component';
import { AuthService } from '../../../services/authservice/authservice.service';
import { ItemProjectComponent } from '../../../shared/components/item-project/item-project.component';
import { ModalProjectComponent } from '../../../shared/components/modal-project/modal-project.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule , InputCustomizeComponent, CardDevComponent, FormsModule, ModalSocialMediaComponent, ModalBasicInfoComponent, ItemProjectComponent, ModalProjectComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  showModalSocialMedia = signal<boolean>(false);
  showModalBasicInfo = signal<boolean>(false);
  showEdit = signal<boolean>(true);
  link = signal<string>('');
  showModalProject = signal<boolean>(false);
  showViewers = signal<boolean>(false);
  userData: IUserData = {
    name: '',
    description: '',
    link: '',
    projects:[],
    socialMediaLinks:[],
    photo: ''
  };
  buttons = signal([
    { 
      id: 1, 
      name: 'LinkedIn', 
      icon: 'assets/linkedin.svg',
      link: 'https://www.linkedin.com/in/'
    },
    { 
      id: 2, 
      name: 'Instagram', 
      icon: 'assets/instagram.svg',
      link: 'https://instagram.com/'
    },
    { 
      id: 3, 
      name: 'Facebook', 
      icon: 'assets/facebook.svg',
      link: 'https://facebook.com/'
    },
    { 
      id: 4, 
      name: 'GitHub', 
      icon: 'assets/github.svg',
      link: 'https://github.com/'
    }
  ]);

  buttonsUserSocialMedia = signal<any[]>([]);

  userLinkedin = signal<string>(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'LinkedIn')?.username || '');
  userInstagram = signal<string>(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'Instagram')?.username || '');
  userFacebook = signal<string>(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'Facebook')?.username || '');
  userGithub = signal<string>(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'GitHub')?.username || '');
  userName = signal<string>(this.userData?.name)
  userDescription = signal<string>(this.userData?.description)
  userImage = signal<string>('')
  userProject = signal<IProject[]>(this.userData?.projects ?? []) ;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.loadUserData();
    this.userImage.set(this.authService.getUser()?.photoURL ?? '');
  }

  loadProjects(){
    this.userProject.set(this.userData?.projects ?? []) ;
  }

  loadBasicInfo(){
    this.userName.set(this.userData?.name)
    this.userDescription.set(this.userData?.description)

  }

  loadSocialMedia(){
    this.userLinkedin.set(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'LinkedIn')?.username || '');
    this.userInstagram.set(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'Instagram')?.username || '');
    this.userFacebook.set(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'Facebook')?.username || '');
    this.userGithub.set(this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === 'GitHub')?.username || '');

  }

  loadUserData() {
    this.userService.getUserData().subscribe(user => {
      if (user) {
        this.userData = user; 
        this.getUserButtonsSocialMedia();
        this.loadSocialMedia();
        this.loadBasicInfo();
        this.loadProjects();
        this.link.set(this.userData.link)
      } else {
        alert('Usuário não encontrado ou não autenticado');
        this.router.navigate(['/home']);
      }
    });
  }

  getUserButtonsSocialMedia() {
    if (this.userData) {
      const userButtons = this.buttons().filter(button =>{
        let buttonFind =this.userData?.socialMediaLinks.some(link => link.nameSocialMedia === button.name)
        return buttonFind
      }
      ).map(button => {
        const userLink = this.userData?.socialMediaLinks.find(link => link.nameSocialMedia === button.name);
        const userName = userLink ? userLink.username : '';
  
        const updatedLink = `${button.link}${userName}`;
  
        return {
          ...button,
          link: updatedLink
        };
      });
  
      this.buttonsUserSocialMedia.set(userButtons); 
    }
  }

  saveBasicInfoButtonEvent(basicInfo: BasicInfoData){
    if (this.userData) {
      this.userData.name = basicInfo.name;
      this.userData.description = basicInfo.description;
      this.userService.saveUserData(this.userData);
      this.loadBasicInfo();
      this.closeModalBasicInfoEvent();
    }
  }
  

  saveSocialMediaButtonEvent(socialMediaData: SocialMediaData) {
    this.saveSocialMediaToDatabase(socialMediaData);
  }
  
  saveSocialMediaToDatabase(data: SocialMediaData) {
    if (this.userData) {
      const updatedSocialMediaLinks = [...this.userData.socialMediaLinks];
  
      const socialMediaNames = ['LinkedIn', 'Instagram', 'Facebook', 'GitHub'];
  
      socialMediaNames.forEach(name => {
        const username = data[name.toLowerCase() as keyof SocialMediaData];
  
        const index = updatedSocialMediaLinks.findIndex(link => link.nameSocialMedia === name);
  
        if (username) {
          if (index !== -1) {
            updatedSocialMediaLinks[index].username = username;
          } else {
            updatedSocialMediaLinks.push({ username, nameSocialMedia: name });
          }
        } else {
          if (index !== -1) {
            updatedSocialMediaLinks.splice(index, 1);
          }
        }
      });
  
      this.userData.socialMediaLinks = updatedSocialMediaLinks;
      this.userService.saveUserData(this.userData);
      alert('Dados de redes sociais atualizados!');
      this.getUserButtonsSocialMedia();
      this.loadSocialMedia();
      this.closeModalSocialMediaEvent();
    }
  }

  newSocialMediaButtonEvent() {
    this.showModalSocialMedia.set(true)
  }

  closeModalSocialMediaEvent(){
    this.showModalSocialMedia.set(false)
  }

  editProfileButtonEvent(){
    this.showModalBasicInfo.set(true)
  }

  closeModalBasicInfoEvent(){
    this.showModalBasicInfo.set(false)
  }

  addProjectkModal(){
    this.showModalProject.set(true)
  }

  saveProjectButtonEvent(data: IProject){
    if (this.userData) {
      this.userData.projects.push({
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link
      })
      this.userService.saveUserData(this.userData);
      this.loadProjects()
      this.closeModalProjectEvent();
    }
  }

  closeModalProjectEvent(){
    this.showModalProject.set(false)
  }

  deleteProjectEvent(titleProject : string){
    if (this.userData) {
      this.userData.projects = this.userData.projects.filter(project => project.title !== titleProject);
      this.userService.saveUserData(this.userData);
      this.loadProjects();
    }
  }

}
