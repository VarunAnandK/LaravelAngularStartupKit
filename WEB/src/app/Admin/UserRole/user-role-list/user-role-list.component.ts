import { Component, OnInit, NgModule } from '@angular/core';
import { user_role } from 'src/Model/user_role';
import { CommonService } from 'src/Service/Common.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { PartialUserRoleComponent, PartialUserRoleModule } from '../partial-user-role/partial-user-role.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModuleData } from 'src/Helper/Modules';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  providers: [DialogService]
})
export class UserRoleListComponent implements OnInit {

  Columns: any;
  UserRoleList: any;
  constructor(
    private commonservice: CommonService,
    private _dialogService: DialogService,
    private helper: CommonHelper
  ) {
  }

  ngOnInit() {
    this.GetList();
    this.Columns = [

      { field: 'name', header: 'Name' },
      { field: 'landing_page', header: 'Landing Page' },
    ];
  }

  async GetList() {
    this.helper.ShowSpinner();
    let res = await this.commonservice.GetAll("UserRoleList");
    this.UserRoleList = res;
    this.helper.HideSpinner();
  }

  async OpenPopup(Id: number) {
    if (Id == 0) {
      const ref = this._dialogService.open(PartialUserRoleComponent, {
        header: 'UserRole - New',
        width: '50%',
        data: new user_role()
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          this.GetList();
        }
      });
    }
    else {
      this.helper.ShowSpinner();
      let res = await this.commonservice.GetById(Id, "UserRoleById");
      const ref = this._dialogService.open(PartialUserRoleComponent, {
        header: 'UserRole  - Edit',
        width: '50%',
        data: res
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          this.GetList();
        }
      });
      this.helper.HideSpinner();
    }
  }
}


const routes: Routes = [
  { path: '', component: UserRoleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleListRoutingModule { }

@NgModule({
  declarations: [UserRoleListComponent],
  imports: [
    CommonModule,
    UserRoleListRoutingModule,
    ModuleData,
    TableModule,
    DynamicDialogModule,
    PartialUserRoleModule,
    PanelModule
  ],
  entryComponents: [PartialUserRoleComponent]
})
export class UserRoleListModule { }

