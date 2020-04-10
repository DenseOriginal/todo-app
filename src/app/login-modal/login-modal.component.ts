import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth/';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { auth as firebase} from 'firebase/app';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  isLogin: boolean = false;
  loading: boolean = false;
  serverMessage: string;
  form: FormGroup

  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,
    public afAuth: AngularFireAuth,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]]
    })
  }

  switchForm() {
    this.isLogin = !this.isLogin
  }

  async onSubmit() {
    this.loading = true;

    try {
      if (this.isLogin) {
        await this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value);
      } else {
        await this.afAuth.createUserWithEmailAndPassword(this.email.value, this.password.value);
      }
      
      this.dialogRef.close();
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }

  async loginWithGoogle() {
    this.loading = true;

    try {
      await this.afAuth.signInWithPopup(new firebase.GoogleAuthProvider());
      this.dialogRef.close();
    } catch (err) {
      this.serverMessage = err;
    }
    this.loading = false;
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
