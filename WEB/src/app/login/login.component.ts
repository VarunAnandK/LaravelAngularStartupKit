import { Component, OnInit, NgModule } from '@angular/core';
import { user } from 'src/Model/user';
import { CommonService } from 'src/Service/Common.service';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
declare var Swal: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup;
  UserData: user;
  constructor(
    private commonservice: CommonService,
    private helper: CommonHelper,
    private route: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.UserData = new user();
    document.body.className = "authentication-bg authentication-bg-pattern";
  }
  ngOnInit() {
    this.helper.DeleteLocalStorage("AlphaUserData");
    this.helper.DeleteLocalStorage("AlphaPermissionData");
    this.helper.DeleteLocalStorage("AlphaCompanyData");
    this.UserForm = this._formBuilder.group({
      user_name: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  UserValidationMessages = {
    'user_name': [{ type: 'required', message: 'User Name is required.' },],
    'password': [{ type: 'required', message: 'Password is required.' },],
  };

  async Login() {
    this.helper.ShowSpinner();
    let res: any = await this.commonservice.CommonPost(this.UserData, "Login");
    if (res.Type == "S") {
      this.helper.SetLocalStorage("AlphaUserData", res.AdditionalData["User"]);
      this.helper.SetLocalStorage("AlphaPermissionData", res.AdditionalData["Permission"]);
      this.helper.SetLocalStorage("AlphaCompanyData", res.AdditionalData["Company"]);
      this.helper.SucessToastr(res.Message, "Login");
      this.route.navigate([res.AdditionalData["User"].user_role.landing_page]);
    }
    else if (res.Type == "UE") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to close previous login",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.UserData.id = res.Id;
          this.Login();
        }
        else {
          this.UserData.id = 0;
        }
      })
    }
    else {
      this.helper.ErrorToastr(res.Message, "Login");
    }
    this.helper.HideSpinner();
  }
}




const routes: Routes = [
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModuleData
  ]
})
export class LoginModule { }
