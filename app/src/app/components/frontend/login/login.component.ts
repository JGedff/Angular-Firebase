import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/model/User';
import { FirebaseService } from 'src/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() user = new EventEmitter<any>();

  register: boolean = false;
  enterEmail: boolean = false;
  passNotMatch: boolean = false;
  logedIn: boolean = false;

  userData: User | null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private _firebaseService: FirebaseService, private _toastrService: ToastrService) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userData = {
      userId: '',
      email: '',
      userName: '',
      password: '',
      totalLikes: 0,
      totalDislikes: 0,
      totalPosts: 0,
      totalComments: 0,
      totalRevews: 0,
      admin: false
    }
  }

  changeRegister() {
    this.register = !(this.register);

    if (this.register) {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeatP: ['', Validators.required],
      });
    }
    else {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  loginEmail() {
    this.enterEmail = !(this.enterEmail);

    if (this.enterEmail) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })
    }
    else {
      this.form = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
    }
  }

  logIn() {
    let log: boolean = false;

    this._firebaseService.getUsers()
      .then(array => {
        array.forEach((doc: any) => {
          if (!(this.logedIn)) {
            if ((doc.data().userName == this.form.value.userName || doc.data().email == this.form.value.email) && doc.data().password == this.form.value.password) {
              this.userData = {
                userId: doc.id,
                ... doc.data()
              }

              log = true;

              let saveDataUser = JSON.stringify(this.userData?.userId);

              sessionStorage.setItem('app.user', saveDataUser);
            }
          }
        });
      })
      .catch(error => {
        this._toastrService.error("There was an error while trying to log in:\n" + error.message, "Login error: " + error.code);
      })
      .finally(() => {

        if (!log) {

          let str = "";
    
          if (this.enterEmail) {
            str = "Email";
          }
          else {
            str = "User name";
          }
    
          str += " or password incorrect";
    
          this._toastrService.error(str, 'Login error');
        }
        else {

          if (this.userData?.admin === 1039 || typeof(this.userData?.admin) == 'boolean') {
            this.logedIn = true;
  
            this.user.emit(this.userData);
            
            this._toastrService.success('Logged successfuly', 'Login');
          }
          else {
            this.userData = null;

            this._toastrService.error('There was an Internal error while trying to log in. Please, warn this error to the administration', 'Internal error');
          }
        }
      });
  }

  saveUser() {

    this.passNotMatch = false;

    if (this.form.value.password !== this.form.value.repeatP) {
      this.passNotMatch = true;

      this._toastrService.error("The user wasn't created: The passwords do not match", "Create user error");
    }
    else {
      try {
        const USER: User = this.createUser();

        this._firebaseService.addUser(USER);
        
        this.register = !(this.register);
        
        this._toastrService.success('The user was successfuly created', 'Create user');
      }
      catch (e: any) {
        this._toastrService.error("The user wasn't created:\n" + e.message, "Create user error: " + e.code);
      }
    }
  }

  createUser(): User {
    let userInfo: User = {
      userId: '',
      email: this.form.value.email,
      userName: this.form.value.userName,
      password: this.form.value.password,
      totalLikes: 0,
      totalDislikes: 0,
      totalPosts: 0,
      totalComments: 0,
      totalRevews: 0,
      admin: false
    }

    return userInfo;
  }
}
