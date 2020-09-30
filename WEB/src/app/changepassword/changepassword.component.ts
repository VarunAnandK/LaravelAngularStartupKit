import { Component, OnInit, NgModule } from "@angular/core";
import { user } from "src/Model/user";
import { CommonHelper } from "src/Helper/CommonHelper";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";
import { CommonService } from "src/Service/Common.service";
import { Routes, RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModuleData } from "src/Helper/Modules";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
})
export class ChangePasswordComponent implements OnInit {
  UserData: user;
  ChangePasswordForm: FormGroup;
  new_password: string;
  confirm_password: string;

  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder,
    public route: Router
  ) { }
  ngOnInit() {
    this.ChangePasswordForm = this.formbuilder.group(
      {
        new_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-zd$@$!%*?&].{7,}"
            ),
          ])
        ),
        confirm_password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-zd$@$!%*?&].{7,}"
            ),
          ])
        ),
      },
      { validator: this.passwordConfirming }
    );
  }

  ChangePasswordValidationMessages = {
    new_password: [
      { type: "required", message: "New Password Required." },
      {
        type: "pattern",
        message:
          "At least 8 characters in length, 1 Lowercase letter, 1 Uppercase letter, Numbers and Special characters",
      },
    ],
    confirm_password: [
      { type: "required", message: "Confirm Password Required." },
      {
        type: "pattern",
        message:
          "At least 8 characters in length, 1 Lowercase letter, 1 Uppercase letter, Numbers and Special characters",
      },
    ],
  };

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("new_password").value !== c.get("confirm_password").value) {
      return { invalid: true };
    }
  }

  async ChangePassword() {
    if (this.ChangePasswordForm.valid == true) {
      this.helper.ShowSpinner();
      let userdata = {
        id: this.helper.GetCurentUser().id,
        confirmpassword: this.confirm_password,
      };
      let res = await this.commonservice.CommonPost(userdata, "ChangePassword");
      if (res["Type"] == "S") {
        this.helper.SucessToastr(res.Message, "User");
        this.ref.close(true);
        this.route.navigate(["/Login"]);
        this.helper.HideSpinner();
      } else {
        this.helper.ErrorToastr(res.Message, "User");
        this.helper.HideSpinner();
      }
    } else {
      this.helper.validateAllFormFields(this.ChangePasswordForm);
    }
  }
}

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordRoutingModule { }

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ModuleData
  ],
  exports: [ChangePasswordComponent],
})
export class ChangePasswordModule { }
