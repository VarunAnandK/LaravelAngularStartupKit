import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CommonHelper } from "./CommonHelper";

@Injectable()
export class AlphaInterceptor implements HttpInterceptor {
  constructor(private helper: CommonHelper) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token = "";
    token = this.helper.GetCurentUser().api_token;
    request = request.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          // this.helper.redirectTo("Login");
          // this.helper.ErrorToastr(
          //   "Your are logout, due to user aleady logged in another system",
          //   "Multiple user login"
          // );
          // this.helper.HideSpinner();
        }
      )
    );
  }
}
