import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonHelper } from 'src/Helper/CommonHelper';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private httpClient: HttpClient, private helper: CommonHelper) {

  }
  public GetAll(UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}`).toPromise<any>();
  }
  public GetById(id: number, UrlName: string) {
    return this.httpClient.get<any>(`${this.helper.ApiURL}/${UrlName}/${id}`).toPromise<any>();
  }
  public InsertOrUpdate(model: any, UrlName: string) {
    model = this.helper.ConvertDateFormatFromArray(model);
    if (model.id == 0) {
      return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Insert`, model).toPromise<any>();
    }
    else {
      return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}Update/${model.id}`, model).toPromise<any>();
    }
  }
  public CommonPost(model: any, UrlName: string) {
    model = this.helper.ConvertDateFormatFromArray(model);
    return this.httpClient.post(`${this.helper.ApiURL}/${UrlName}`, model).toPromise<any>();
  }

  public Delete(id: number, UrlName: string) {
    return this.httpClient.get(`${this.helper.ApiURL}/${UrlName}/${id}`).toPromise<any>();
  }

  public PostWithParameter(model: any, UrlName: string, params: any) {
    model = this.helper.ConvertDateFormatFromArray(model);
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e => {
      url = url + "/" + e.params;
    });
    return this.httpClient.post(url, model).toPromise<any>();
  }

  public GetWithParameter(UrlName: string, params: any) {
    let url = `${this.helper.ApiURL}/${UrlName}`;
    params.forEach(e => {
      url = url + "/" + e.params;
    });
    return this.httpClient.get<any>(url).toPromise<any>();
  }

  public FullUrlGet(UrlName: string) {
    return this.httpClient.get<any>(UrlName).toPromise<any>();
  }
}

