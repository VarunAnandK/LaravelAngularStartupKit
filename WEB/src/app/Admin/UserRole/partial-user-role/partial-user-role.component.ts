import { Component, OnInit, NgModule } from '@angular/core';
import { ApiResponseModel } from 'src/Helper/api-response-model';
import { user_role } from 'src/Model/user_role';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig, } from 'primeng/dynamicdialog';
import { CommonService } from 'src/Service/Common.service';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';


@Component({
  selector: 'app-partial-user-role',
  templateUrl: './partial-user-role.component.html',
})
export class PartialUserRoleComponent implements OnInit {

  UserRoleData: user_role;
  UserRoleForm: FormGroup;

  constructor(
    private helper: CommonHelper,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public commonservice: CommonService,
    private formbuilder: FormBuilder
  ) {
    this.UserRoleData = this.config.data;
  }
  ngOnInit() {
    this.UserRoleForm = this.formbuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      landing_page: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  UserRoleValidationMessages = {
    'name': [{ type: 'required', message: 'Name Required.' },],
    'landing_page': [{ type: 'required', message: 'Landing Page Required.' },],
  };

  async CreateOrUpdate() {
    if (this.UserRoleForm.valid == true) {
      this.helper.ShowSpinner();
      let res = await this.commonservice.InsertOrUpdate(this.UserRoleData, "UserRole");
      if (res.Type == "S") {
        this.helper.SucessToastr(res.Message, "User Role");
        this.ref.close(true);
      } else {
        this.helper.ErrorToastr(res.Message, "User Role");
      }
      this.helper.HideSpinner();
    }
    else {
      this.helper.validateAllFormFields(this.UserRoleForm);
    }
  }
  async Delete() {
    this.helper.ShowSpinner();
    let res = await this.commonservice.Delete(this.UserRoleData.id, "UserRoleDelete");
    if (res.Type == "S") {
      this.helper.SucessToastr(res.Message, "User Role");
      this.ref.close(true);
    } else {
      this.helper.ErrorToastr(res.Message, "User Role");
    }
    this.helper.HideSpinner();
  }
}


const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartialUserRoleRoutingModule { }


@NgModule({
  declarations: [PartialUserRoleComponent],
  imports: [
    CommonModule,
    PartialUserRoleRoutingModule,
    ModuleData
  ],
  exports: [PartialUserRoleComponent]
})
export class PartialUserRoleModule { }
