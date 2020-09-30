import { Component } from '@angular/core';
import { CommonHelper } from 'src/Helper/CommonHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public helper: CommonHelper) {
  }
  // @HostListener('window:scroll', ['$event'])
  // onScroll(event) {
  //   let data: any = document.getElementsByClassName("ng-trigger ng-trigger-overlayAnimation ui-datepicker")[0];
  //   if (data) {
  //     let sizes = data.getBoundingClientRect();
  //     let bodysize = document.body.getBoundingClientRect();
  //     if (bodysize.top <= 0) {
  //       data.style.top = (sizes.height - bodysize.top) + "px"
  //     }
  //     else {
  //       data.style.top = (sizes.top + bodysize.top) + "px"
  //     }
  //   }
  // }
}

