import { Injectable, signal } from '@angular/core';
import { Auth, user, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);

  constructor(private auth: Auth) {
    user(this.auth).subscribe((u) => this.currentUser.set(u));
  }

  loginWithGoogle(): Observable<User | null> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider).then(result => {
      this.currentUser.set(result.user);
      return result.user;
    }));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth).then(() => {
      this.currentUser.set(null);
    }));
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }

  getUser(): User | null {
    return this.auth.currentUser;
  }
  
}
