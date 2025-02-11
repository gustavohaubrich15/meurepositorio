import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { AuthService } from '../authservice/authservice.service';
import { Observable, of } from 'rxjs';
import { collection, getDocs, query, where } from 'firebase/firestore';

export interface ISocialMediaLink {
  username: string;
  nameSocialMedia: string;
}

export interface IProject {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface IUserData {
  photo: string;
  name: string;
  description: string;
  socialMediaLinks: ISocialMediaLink[];
  link: string;
  projects: IProject[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService); 

  constructor() {}

  getUserData(): Observable<any> {
    const user = this.authService.getUser();
    if (user) {
      const userId = user.uid;
      const userRef = doc(this.firestore, `users/${userId}`);
      return new Observable(observer => {
        getDoc(userRef).then(docSnap => {
          if (docSnap.exists()) {
            observer.next(docSnap.data());
          } else {
            observer.next(null);
          } 
        }).catch(error => {
          alert('Erro ao buscar dados do usuário');
          observer.error(error);
        });
      });
    } else {
      alert('Usuário não autenticado');
      return of(null);  
    }
  }

  saveUserData(userData: IUserData): Promise<void> {
    const user = this.authService.getUser();
    if (user) {
      const userId = user.uid;
      const userRef = doc(this.firestore, `users/${userId}`);

      return getDoc(userRef).then(docSnap => {
        if (!docSnap.exists()) {
          return setDoc(userRef, { ...userData }, { merge: true })
            .then(() => {
              alert('Dados do usuário salvos com sucesso!');
            })
            .catch((error) => {
              alert('Erro ao salvar os dados do usuário');
            });
        } else {
          return setDoc(userRef, { ...userData }, { merge: true })
            .then(() => {
              alert('Dados do usuário atualizados com sucesso!');
            })
            .catch((error) => {
              alert('Erro ao atualizar os dados do usuário');
            });
        }
      }).catch((error) => {
        alert('Erro ao verificar ou criar a estrutura do usuário');
        return Promise.reject('Erro ao verificar ou criar a estrutura do usuário');
      });
    } else {
      alert('Usuário não autenticado');
      return Promise.reject('Usuário não autenticado');
    }
  }

  saveUserLink(link: string): Promise<void> {
    if (link == '') {
      alert('Link não válido');
      return Promise.reject('Link não válido');
    }

    const user = this.authService.getUser();
    if (user) {
      const userId = user.uid;
      const userRef = doc(this.firestore, `users/${userId}`);

      return getDoc(userRef).then(docSnap => {
        if (!docSnap.exists()) {
          const defaultUserData: IUserData = {
            name: '',
            description: '',
            socialMediaLinks: [],
            link: link,
            projects: [],
            photo: user.photoURL ?? ''
          };

          return setDoc(userRef, { ...defaultUserData }, { merge: true })
            .then(() => {
              alert('Estrutura do usuário criada e link salvo com sucesso!');
            })
            .catch((error) => {
              alert('Erro ao criar a estrutura do usuário e salvar o link');
            });
        } else {
          return getDocs(collection(this.firestore, 'users')).then((querySnapshot) => {
            let linkAlreadyUsed = false;

            querySnapshot.forEach(doc => {
              const data = doc.data();
              if (data['link'] === link && doc.id !== userId) { 
                linkAlreadyUsed = true;
              }
            });

            if (linkAlreadyUsed) {
              alert('Link já está sendo utilizado por outro usuário');
              return Promise.reject('Link já está sendo utilizado por outro usuário');
            } else {
              return setDoc(userRef, { link }, { merge: true })
                .then(() => {
                  alert('Link do usuário salvo com sucesso!');
                })
                .catch((error) => {
                  alert('Erro ao salvar o link do usuário');
                });
            }
          }).catch((error) => {
            alert('Erro ao verificar os links');
            return Promise.reject('Erro ao verificar os links');
          });
        }
      }).catch((error) => {
        alert('Erro ao verificar ou criar a estrutura do usuário');
        return Promise.reject('Erro ao verificar ou criar a estrutura do usuário');
      });
    } else {
      alert('Usuário não autenticado');
      return Promise.reject('Usuário não autenticado');
    }
  }

  getUserDataByLink(link: string): Observable<IUserData | null> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('link', '==', link));

    return new Observable(observer => {
      getDocs(q).then(querySnapshot => {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data() as IUserData;
          observer.next(userDoc);
        } else {
          observer.next(null); 
        }
      }).catch(error => {
        alert('Erro ao buscar dados do usuário');
        observer.error(error);
      });
    });
  }
}
