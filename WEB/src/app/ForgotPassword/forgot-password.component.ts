import { Component, OnInit, NgModule } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  UserForm: FormGroup;
  Email: string;
  constructor(
    private commonservice: CommonService,
    private helper: CommonHelper,
    private _formBuilder: FormBuilder,
  ) {
    document.body.className = "authentication-bg authentication-bg-pattern";
  }

  ngOnInit() {
    this.UserForm = this._formBuilder.group({
      Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
  }
  UserValidationMessages = {
    'Email': [{ type: 'required', message: 'User Name is required.' }, { type: 'email', message: 'Please enter email format as example@test.com' }],
  };
  async ResetPassword() {
    if (this.UserForm.valid == true) {
      this.helper.ShowSpinner();
      let data = { "email": this.Email };
      let res = await this.commonservice.CommonPost(data, "ResetPassword");
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message, "Reset Password");
        this.helper.redirectTo("Login");
      }
      else {
        this.helper.ErrorToastr(res.Message, "Reset Password");
      }
    }
    else {
      this.helper.validateAllFormFields(this.UserForm);
    }
    this.helper.HideSpinner();
  }

}


const routes: Routes = [
  { path: '', component: ForgotPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ModuleData
  ],
})
export class ForgotPasswordModule { }

