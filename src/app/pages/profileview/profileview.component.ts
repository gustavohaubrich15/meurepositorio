import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IUserData, UserService } from '../../services/userservice/user.service';
import { ActivatedRoute } from '@angular/router';
import { CardDevComponent } from '../../shared/components/card-dev/card-dev.component';
import { ItemProjectComponent } from '../../shared/components/item-project/item-project.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css'],
  imports: [ CardDevComponent, ItemProjectComponent, CommonModule ]
})
export class ProfileViewComponent implements OnInit {
  showViewers = signal<boolean>(false);
  showButton = signal<boolean>(false); 
  showButtonPlus = signal<boolean>(false);  
  userImage = signal<string>('')
  userData = signal<IUserData>({
    name: '',
    description: '',
    link: '',
    projects: [],
    socialMediaLinks: [],
    photo: ''
  });

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
  link: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.link = params['link'];

      if (this.link) {
        this.loadUserData();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  loadUserData(): void {
    if (this.link) {
      this.userService.getUserDataByLink(this.link).subscribe(
        (user: IUserData | null) => {
          if (user) { 
            this.userData.set(user);
            this.getUserButtonsSocialMedia();
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.router.navigate(['/home']);
        }
      );
    }
  }

  getUserButtonsSocialMedia() {
    if (this.userData()) { 
      const userButtons = this.buttons().filter(button => {
        let buttonFind = this.userData()?.socialMediaLinks.some(link => link.nameSocialMedia === button.name);
        return buttonFind;
      }).map(button => {
        const userLink = this.userData()?.socialMediaLinks.find(link => link.nameSocialMedia === button.name);
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
  
}
