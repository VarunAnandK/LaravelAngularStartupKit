import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { CommonService } from 'src/Service/Common.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from '../changepassword/changepassword.component';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [DialogService]
})
export class LayoutComponent implements OnInit {

  Module: ModuleModel[];
  Menu: Array<MenuModel>;

  constructor(public helper: CommonHelper,
    private service: CommonService,
    private _dialogService: DialogService) {

  }

  ngOnInit() {
    document.body.className = "";
    this.Jquery();
    this.Module = new Array<ModuleModel>();
    this.Module = [
      { Label: "Admin", Icon: "fe-users", RouterLink: "Admin/Dashboard", Visiable: true },
    ];
    this.Module = this.Module.filter(o => o.Visiable == true);
    this.Menu = new Array<MenuModel>();
    this.Menu = [
      //Admin
      { Module: "Admin", Label: "Dashboard", RouterLink: "Admin/Dashboard", Icon: "fe-home", Visiable: true },
      { Module: "Admin", Label: "User Role", RouterLink: "Admin/UserRoleList", Icon: "fe-users", Visiable: true },
      { Module: "Admin", Label: "User", RouterLink: "Admin/UserList", Icon: "fe-user-plus", Visiable: true },
      //Admin
    ];
    this.Menu = this.Menu.filter(e => e.Module == this.helper.CurrentModule);
  }

  insertSpaces(string) {
    string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
    string = string.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
    return string;
  }

  Jquery() {
    $(function () {
      $('[data-toggle="popover"]').popover();
      $("#side-menu").metisMenu();
      $('.slimscroll-menu').slimscroll({
        height: 'auto',
        position: 'right',
        size: "8px",
        color: '#9ea5ab',
        wheelStep: 5,
        touchScrollStep: 20
      });

      $('.button-menu-mobile').on('click', function (event) {
        var $this = this;
        event.preventDefault();
        this.$body = $("body");
        this.$window = $(window);
        $this.$body.toggleClass('sidebar-enable');
        if ($this.$window.width() >= 768) {
          $this.$body.toggleClass('enlarged');
        } else {
          $this.$body.removeClass('enlarged');
        }
        $('.slimscroll-menu').slimscroll({
          height: 'auto',
          position: 'right',
          size: "8px",
          color: '#9ea5ab',
          wheelStep: 5,
          touchScrollStep: 20
        });
      });
    });
  }
  async Logout() {
    this.helper.redirectTo("");
  }

  async ChangePassword() {
    this.helper.ShowSpinner();
    const ref = this._dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '50%'
    });
    ref.onClose.subscribe((res) => {
    });
    this.helper.HideSpinner();
  }
}


export class ModuleModel {
  Label: string;
  RouterLink: string;
  Icon: string;
  Visiable: boolean;
}

export class MenuModel {
  Label: string;
  RouterLink: string;
  Icon: string;
  Visiable: boolean;
  ChildId?: string;
  ChildMenu?: Array<MenuModel>;
  Module: string;
}

