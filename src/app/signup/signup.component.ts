import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // first_name: string = '';
  // last_name: string = '';

  myForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.myForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validator: this.checkIfMatchingPasswords('password', 'confirmPassword'),
      }
    );
  }

  checkIfMatchingPasswords(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      let passwordKey = group.controls[password];
      let confirmPasswordKey = group.controls[confirmPassword];
      if (passwordKey.value == confirmPasswordKey.value) {
        return;
      } else {
        confirmPasswordKey.setErrors({
          notEqualToPassword: true,
        });
      }
    };
  }

  onSubmit(signupform: any) {
    console.log(signupform.value);
  }
  ngOnInit(): void {}
}
