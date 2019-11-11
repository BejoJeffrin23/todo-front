
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
//for localhost
 private url = 'http://localhost:4001/api/v1/users';

 //for aws
//private url ="/api/v1/users"

  constructor(
    public http: HttpClient
  ) { }

  //function to get data from cookies
  public getUserInfoInLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  //function to save data from cookies
  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  //start of signup function
  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/login`, params);
  } // end of signinFunction function.

  //start of sign up function
  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)
      .set('country',data.country)

    return this.http.post(`${this.url}/signup`, params);

  } // end of signupFunction function.

  //start of log out function
  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'));

    return this.http.post(`${this.url}/logout?authToken=${Cookie.get('authToken')}`, params);

  } // end logout function

//fetch all users
  public allUser(): any {
    return this.http.get(`${this.url}/allUsers?authToken=${Cookie.get('authToken')}`)
  }

//send mail to reset password
  public sendMail(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)

    return this.http.post(`${this.url}/reset`, params);
  }

//reset password
  public resetPassword(userId, data): Observable<any> {
    const params = new HttpParams()
      .set('password', data.password)

    return this.http.post(`${this.url}/${userId}/change`, params);
  }

//create new event function
  public create(data): Observable<any> {
    console.log(data)
    const params = new HttpParams()
      .set('title', data.title)
      .set('startYear', data.startYear)
      .set('startMonth', data.startMonth)
      .set('startDay', data.startDay)
      .set('adminId', data.adminId)
      .set('adminName', data.adminName)
      
      return this.http.post(`${this.url}/createtodo`,params)

  } // end of signupFunction function.

//function to fetch single event
  public getSingleEvent(eventId): any {
    return this.http.get(`${this.url}/getEvent/${eventId}`, eventId)

  }

//function to fetch all events of user
 
  public getevents=(userId):any=>{
    let datas=this.http.get(`${this.url}/gettodo/${userId}`)
    return datas;
  }
  public delete=(id):any=>{
    console.log(id)
    let params=new HttpParams()
    .set("eventId",id)
    .set('userId',Cookie.get('userId'))
    let datas=this.http.post(`${this.url}/delete`,params)
    return datas;
  }
  public getevent=(statusId):any=>{
   let datas=this.http.get(`${this.url}/getevent/${statusId}`);
   return datas;
  }
  public edit=(data):any=>{
    let datas=this.http.post(`${this.url}/update`,data);
    return datas;
  }
  public getusers=():any=>{
    let datas=this.http.get(`${this.url}/getusers`);
    return datas;
  }
  public sendrequest=(data):any=>{
    console.log(data)
   let params=new HttpParams()
   .set("receiverId",data.receiverId)
   .set("senderId",data.senderId)
   .set('senderName',data.senderName)
   .set('receiverFirstName',data.recieverfirstName)
   .set('receiverLastName',data.recieverlastName)
   let datas=this.http.post(`${this.url}/sendrequest`,params);
   return datas;
  }
  public getrequest=(userId):any=>{
    let datas=this.http.get(`${this.url}/getrequest/${userId}`);
    return datas;
  }
  public acceptrequest=(data):any=>{
    console.log(data)
    let params=new HttpParams()
    .set("friendreqId",data.friendreqId)
   let datas=this.http.post(`${this.url}/acceptrequest`,params);
   return datas;
  }
  public getfriends=(userId):any=>{
    console.log(userId)
    let datas=this.http.get(`${this.url}/getfriends/${userId}`);
    return datas;
  }
  public unfriend=(data):any=>{
    let params=new HttpParams()
    .set("friendreqId",data.friendId)
     let datas=this.http.post(`${this.url}/unfriend`,params);
     return datas;
  }
  public deletefrnfreq=(data):any=>{
    let params=new HttpParams()
    .set("friendreqId",data);
    let datas=this.http.post(`${this.url}/deletefriendrequest`,params);
    return datas;
  }
  public sendcode=(data):any=>{
    let params=new HttpParams()
    .set("email",data.email)
     let datas=this.http.post(`${this.url}/resetcode`,params);
     return datas;
  }
 
  public undo=(statusId):any=>{
    let params=new HttpParams()
    .set('statusId',statusId);
    let datas=this.http.post(`${this.url}/undo`,params);
    return datas;
  }
  public savehistory=(statusId):any=>{
    let params=new HttpParams()
    .set('statusId',statusId);
    let datas=this.http.post(`${this.url}/savehistory`,params)
    return datas;
  }
}