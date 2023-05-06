import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})

export class HomeService{

 apiurl='https://localhost:2001'
  
  constructor(private http:HttpClient){
     
  }

  // Params(senddata:any)   
  // {
  //   return this.http.get(this.apiurl,{
  //     params:{
  //       term: this.value.keyword,


  //   console.log(this.apiurl,senddata);
  // }
 
 


}