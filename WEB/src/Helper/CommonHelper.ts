import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from 'src/Model/user';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicScriptLoaderService } from './DynamicScriptLoaderService';
import { MessageService } from 'primeng/api';
@Injectable()
export class CommonHelper {
  constructor(private messageService: MessageService, private router: Router, private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.ApiURL = environment.API_URL;
    this.HideShowSpinner = false;
    this.StorageName = "AlphaUserData";
  }
  ApiURL: string;
  channel: any;
  StorageName: string;
  SignatureStorageName: string;
  CurrentModule: string;
  CurrentPage: string[];
  HideShowSpinner: boolean = false;
  ReloadShareAllotmentTable: boolean = false;
  ReloadShareAllotmentVoidTable: boolean = false;
  ReloadShareTransferForm: boolean = false;
  ReloadShareHolderTable: boolean = false;
  GetUserId(): number {
    let user = JSON.parse(window.localStorage.getItem(this.StorageName));
    if (user == null) {
      return 0;
    }
    else {
      return user.id;
    }
  }
  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  ObjecToSelectItem(data: any, OptionaLable: string = "name", Optionalvalue: string = "id", ActiveStatus: boolean = true, needfiller: boolean = false) {
    let datadropdown = [];
    if (needfiller) {
      // if (ActiveStatus)
      //   data = data.filter(o => o.status == true);
      data.forEach(element => {
        let dataOptionaLable = OptionaLable.split(".");
        if (OptionaLable.split(".").length > 1) {
          datadropdown.push({ label: element[dataOptionaLable[0]][dataOptionaLable[1]], value: element[Optionalvalue], styleClass: JSON.stringify(element), disabled: false });
        }
        else {
          datadropdown.push({ label: element[OptionaLable], value: element[Optionalvalue], styleClass: JSON.stringify(element), disabled: false });
        }
      });
    }
    else {
      // if (ActiveStatus)
      //   data = data.filter(o => o.status == true);
      data.forEach(element => {
        let dataOptionaLable = OptionaLable.split(".");
        if (OptionaLable.split(".").length > 1) {
          datadropdown.push({ label: element[dataOptionaLable[0]][dataOptionaLable[1]], value: element[Optionalvalue], disabled: false });
        }
        else {
          datadropdown.push({ label: element[OptionaLable], value: element[Optionalvalue], disabled: false });
        }
      });
    }

    return datadropdown;
  }
  GetCurrentPageAndModule(data: string) {
    this.CurrentPage = [];
    this.CurrentPage.push(data.split("/")[0]);
    this.CurrentPage.push(data.split("/")[1]);
    if (data.split("/")[1].endsWith("List"))
      this.CurrentPage.push(data.split("/")[1].endsWith("List") ? data.split("/")[1] : data.split("/")[1] + "List");
    else if (data.split("/")[2])
      this.CurrentPage.push(data.split("/")[1].endsWith("List") ? data.split("/")[1] : data.split("/")[1] + "List");
  }

  GetCurentUser() {
    let User: user;
    User = new user();
    let data = JSON.parse(window.localStorage.getItem(this.StorageName));
    if (data != null) {
      User = data;
    }
    return User;
  }

  SetLocalStorage(name: string, data: any, jsonformat: boolean = true) {
    if (jsonformat) {
      window.localStorage.setItem(name, JSON.stringify(data));
    }
    else {
      window.localStorage.setItem(name, data);
    }
  }
  GetLocalStorage(name: string, jsonformat: boolean = false) {
    if (jsonformat)
      return JSON.parse(window.localStorage.getItem(name));
    else
      return window.localStorage.getItem(name);
  }
  DeleteAllLocalStorage() {
    if (document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all").length > 0) {
      document.getElementsByClassName("ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all")[0].dispatchEvent(new Event("click"));
    }
    return window.localStorage.clear();
  }
  DeleteLocalStorage(name: string) {
    return window.localStorage.removeItem(name);
  }
  SucessToastr(message: string, title: string) {
    this.messageService.add({ severity: 'success', summary: title, detail: message });
  }
  ErrorToastr(message: string, title: string) {
    this.messageService.add({ severity: 'error', summary: title, detail: message });
  }
  ShowSpinner() {
    //this.HideShowSpinner = true;
    var x = document.getElementById("spinnerloading");
    var y = document.getElementById("spinnerloadingimage");
    x.style.display = "block";
    y.style.display = "block";
  }
  HideSpinner() {
    var x = document.getElementById("spinnerloading");
    var y = document.getElementById("spinnerloadingimage");
    x.style.display = "none";
    y.style.display = "none";
    // this.HideShowSpinner = false;
  }
  NullOrEmpty(data) {
    if (data == null)
      return true;
    else if (data == undefined)
      return true;
    else if (!isNaN(data))
      return true;
    else if (data == '')
      return true;
    else
      return false;
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  ConvertStringDateFormatFromArray(model: any) {
    if (model.lenght == undefined) {
      var data = Object.keys(model);
      data.filter(o => o.includes('_date') || o.includes('date_') || o.includes('_on') || o.includes('date_of_birth')).filter(o => o != "created_on" && o != "updated_on").forEach(element => {
        if (model[element] == null) {
          model[element] = null;
        }
        else {
          model[element] = new Date(model[element]);
        }
      });
      data.filter(o => o.includes('_time')).forEach(element => {
        if (model[element] == null) {
          model[element] = null;
        }
        else {
          let dateTime = new Date();
          let times = model[element].split(':');
          dateTime.setHours(parseInt(times[0]));
          dateTime.setMinutes(parseInt(times[1]));
          dateTime.setSeconds(parseInt(times[2]));
          model[element] = dateTime;
        }
      });
    }
    else {
      model.forEach(modelelement => {
        var data = Object.keys(modelelement);
        data.filter(o => o.includes('_date') || o.includes('date_') || o.includes('_on') || o.includes('date_of_birth')).filter(o => o != "created_on" && o != "updated_on").forEach(element => {
          if (modelelement[element] == null) {
            modelelement[element] = null;
          }
          else {
            modelelement[element] = new Date(modelelement[element]);
          }
        });
        data.filter(o => o.includes('_time')).forEach(element => {
          if (modelelement[element] == null) {
            modelelement[element] = null;
          }
          else {
            let dateTime = new Date();
            let times = modelelement[element].split(':');
            dateTime.setHours(parseInt(times[0]));
            dateTime.setMinutes(parseInt(times[1]));
            dateTime.setSeconds(parseInt(times[2]));
            modelelement[element] = dateTime;
          }
        });
      });
    }
    return model;
  }



  ConvertDateFormatFromArray(model: any) {
    if (model.length == undefined) {
      model = Object.assign({}, model);
    }
    else {
      model = Object.assign([], model);
    }
    let datepipe: DatePipe = new DatePipe('en-US');
    if (model.length == undefined) {
      var data = Object.keys(model);
      data.filter(o => o.includes('_date') || o.includes('date_') || o.includes('date_of_birth') || o.includes('_on') && o != "created_on" && o != "updated_on").forEach(element => {
        if (model[element] == null) {
          model[element] = null;
        }
        else {
          model[element] = datepipe.transform(model[element], 'yyyy-MM-dd').toString();
        }
      });

      data.filter(o => o.includes('_time')).forEach(element => {
        if (model[element] == null) {
          model[element] = null;
        }
        else {
          model[element] = datepipe.transform(model[element], 'H:mm:ss').toString();
        }
      });
    }
    else {
      model.forEach(modelelement => {
        var data = Object.keys(modelelement);
        data.filter(o => o.includes('_date') || o.includes('date_') || o.includes('_on') || o.includes('date_of_birth') && o != "created_on" && o != "updated_on").forEach(element => {
          if (modelelement[element] == null) {
            modelelement[element] = null;
          }
          else {
            modelelement[element] = datepipe.transform(modelelement[element], 'yyyy-MM-dd').toString();
          }
        });
        data.filter(o => o.includes('_time')).forEach(element => {
          if (modelelement[element] == null) {
            modelelement[element] = null;
          }
          else {
            modelelement[element] = datepipe.transform(modelelement[element], 'H:mm:ss').toString();
          }
        });
      });
    }
    return model;
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  Print(url) {
    var Printiframe = document.getElementById("Printiframe");
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('id', 'ifrm');
    ifrm.height = "0px";
    ifrm.width = "0px";
    Printiframe.parentNode.insertBefore(ifrm, Printiframe);
    ifrm.setAttribute('src', url);
  }
  GroupTheArray(data: any, ColumnToGroup: any) {
    let sorcedata = [...data];
    let Groupdata = {};
    if (sorcedata) {
      for (let i = 0; i < sorcedata.length; i++) {
        let rowData = sorcedata[i];
        let ColumnName = rowData[ColumnToGroup];
        if (i == 0) {
          Groupdata[ColumnName] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = sorcedata[i - 1];
          let previousRowGroup = previousRowData[ColumnName];
          if (ColumnName === previousRowGroup)
            Groupdata[ColumnName].size++;
          else
            Groupdata[ColumnName] = { index: i, size: 1 };
        }
      }
    }
    return Groupdata;
  }
}
