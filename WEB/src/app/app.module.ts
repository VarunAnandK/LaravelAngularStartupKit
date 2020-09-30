import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { ToastModule } from 'primeng/toast';
import { CommonHelper } from 'src/Helper/CommonHelper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlphaInterceptor } from 'src/Helper/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogModule } from 'primeng/dynamicdialog';
import { LabelModule } from './Shared/label/label.module';
import { ChangePasswordModule, ChangePasswordComponent } from './changepassword/changepassword.component';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LabelModule,
    ChangePasswordModule,
    DynamicDialogModule
  ],
  providers: [
    CommonHelper,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AlphaInterceptor,
      multi: true
    },
    CommonHelper,
    DynamicDialogRef,
    MessageService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ChangePasswordComponent]
})
export class AppModule { }
