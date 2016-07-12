import {Injectable, Inject, Component} from '@angular/core';
import {Loading, Toast, Alert, NavController} from 'ionic-angular';
import {Http, HTTP_PROVIDERS, Response, RequestOptions, BaseRequestOptions, Headers, RequestMethod} from '@angular/http';
import {Events} from 'ionic-angular';

@Injectable()
export class ProfileService {

    constructor(private http: Http,public nav: NavController, public events: Events) { 

        this.http = http;

        this.loadLocales();

    }
 
    //加载地区
    loadLocales() {
        return new Promise(resolve => {
            this.http.get('./data').subscribe(res => {
                resolve(res.json());
            });
        });
    }
 


}