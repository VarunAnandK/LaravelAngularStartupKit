import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { CommonHelper } from "src/Helper/CommonHelper";
import { Router } from "@angular/router";

@Directive({
  selector: "[appRightbutton]"
})
export class RightbuttonDirective implements OnInit {
  @Input() rights: string = "";
  @Input() url: string = "";
  constructor(
    private el: ElementRef,
    public helper: CommonHelper,
    private router: Router
  ) { }
  ngOnInit() {
    // if (this.helper.GetCurentUser().user_role_id > 1) {
    //   let Url = [];
    //   let result = 0;
    //   if (this.url == "") {
    //     Url = this.router.url.split("/");
    //     result = this.helper
    //       .GetCurentPermission()
    //       .filter(
    //         o =>
    //           o.user_role_id == this.helper.GetCurentUser().user_role_id &&
    //           o.module_name == Url[1] &&
    //           o.page_name == Url[2] &&
    //           o.rights == this.rights
    //       ).length;
    //   } else {
    //     Url = this.url.split("/");
    //     result = this.helper
    //       .GetCurentPermission()
    //       .filter(
    //         o =>
    //           o.user_role_id == this.helper.GetCurentUser().user_role_id &&
    //           o.module_name == Url[0] &&
    //           o.page_name == Url[1] &&
    //           o.rights == this.rights
    //       ).length;
    //   }
    //   if (result == 0) {
    //     this.el.nativeElement.style.display = "none";
    //   }
    // }
  }
}
