import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, of, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public locationSubject = new BehaviorSubject<any>({ name: 'Home', link: '/', count: 0, isSmall: 'N', hideNav: 'N', hideHeader: 'N'});
  public pageSubject = new BehaviorSubject<any>('{}');
  public paramSubject = new BehaviorSubject<any>('{}');
  public routerSubject = new BehaviorSubject<any>('{}');

  t: any;
  uid: any;
  url: any;
  un: any;
  role: any;
  survey: any;

  baseApiUrl = 'https://sqlstudios.com/up.php';  
  baseAudioUrl = 'https://sqlstudios.com/upaudio.php';  
  baseVerifyUrl = 'https://sqlstudios.com/verify.php';  
  public valid: any = {};

  constructor(private http: HttpClient) { 
        this.url='https://sqlstudios.com/api/router.php';
    }

  getLocalStorage() {
    //
    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }

    if (localStorage.getItem('survey')===null) {
      this.survey="0";
    } else {
      this.survey=localStorage.getItem('survey')
    }

    if (localStorage.getItem('un')===null) {
      this.un="";
    } else {
      this.un=localStorage.getItem('un')
    }

    if (localStorage.getItem('role')===null) {
      this.role="";
    } else {
      this.role=localStorage.getItem('role')
    }
  }

  getData(path: any, id: any, id2: any, id3: any) {
    this.getLocalStorage();
    const data = {
      "q" : path,
      "id": id,
      "id2": id2,
      "id3": id3,      
      "survey": this.survey,
      "uid": this.uid
    }

  this.t= this.http.post(this.url, data);
  return this.t;

  }

  getPing(path: any) {
    this.getLocalStorage();

    let output: any = { page: '', id: '', id2: '', id3: '' };

    let j: any = path.split('/');
    console.log('p1');
    console.log(j);
    console.log('p2');

    if (j[1]!==undefined) { output.page=j[1]; }
    if (j[2]!==undefined) { output.id=j[2];   }
    if (j[3]!==undefined) { output.id2=j[3];  }
    if (j[4]!==undefined) { output.id3=j[4];  }

    return of(output);

  }

  postForm(formID: any, formData: any[]) {
    this.getLocalStorage();
    const data = {
      "q" : formID,
      "data": formData,
      "uid": this.uid,
      "survey": this.survey
    }

  this.t= this.http.post(this.url, data);
  return this.t;

  }

  postAuth(formID: any, formData: any[]) {
    
    this.getLocalStorage();
    const data = {
      "q" : formID,
      "data": formData,
      "uid": this.uid
    }

    this.t= this.http.post("https://sqlstudios.com/api/auth.php", data);
    return this.t;

  }

  postLogin(username: any, password: any) {
    const data = {
      "q" : "login",
      "username": username,
      "password": password
    }
  console.log(data)
  this.t= this.http.post(this.url, data);
  return this.t;

  }

  getFile(q: any, id: any) {
  //  const data = {
  //    "q" : q,
  //    "id": id,
  //  }
    const data = {
      "q" : 'download-file',
      "id": 6,
    }
  console.log(data)
  this.t= this.http.post("https://sqlstudios.com/down.php", data);
  return this.t;

  }

  getVerticalMenu() {
    this.getLocalStorage()
    const data = {
      "q" : "vertical-menu",
      "uid": this.uid,
      "role": this.role
    }
  this.t= this.http.post("https://sqlstudios.com/api/psp-menu.php", data);
  return this.t;

  }

  getUser() {
    this.getLocalStorage()
    const data = {
      "q" : "vertical-menu",
      "uid": this.uid,
      "role": this.role
    }

  this.t= this.http.post("https://sqlstudios.com/api/u.php", data);
  return this.t;

  }
  
  getEnroll(token: any) {
    this.getLocalStorage()
    const data = {
      "q" : "enroll",
      "token": token
    }

  this.t= this.http.post("https://sqlstudios.com/api/enroll.php", data);
  return this.t;

}

postTemplate(file_data:any) {
  console.log(file_data);
  this.t=this.http.post('https://myna-docs.com/api/upload_security_section.php',file_data);
  return this.t;
}


  upload(file:File, postData: any): Observable<any> {

    const formData = new FormData();

    formData.append('file', file, file.name);
    let k: keyof typeof postData;  
    for (k in postData) {
      formData.append(k,postData[k]);
    }

    return this.http.post(this.baseApiUrl, formData, { 
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadAudio(file:File, postData: any): Observable<any> {

    const formData = new FormData();

    formData.append('file', file, file.name);
    let k: keyof typeof postData;  
    for (k in postData) {
      formData.append(k,postData[k]);
    }

    return this.http.post(this.baseAudioUrl, formData, { 
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadPhoto(file:File, postData: any): Observable<any> {

    const formData = new FormData();

    formData.append('file', file, file.name);
    let k: keyof typeof postData;  
    for (k in postData) {
      formData.append(k,postData[k]);
    }

    return this.http.post("https://sqlstudios.com/cyber_upload_photo.php", formData, { 
      reportProgress: true,
      observe: 'events',
    });
  }

  uploadDocument(file:File, postData: any): Observable<any> {

    const formData = new FormData();

    formData.append('file', file, file.name);
    let k: keyof typeof postData;  
    for (k in postData) {
      formData.append(k,postData[k]);
    }

    return this.http.post("https://sqlstudios.com/cyber_upload_doc.php", formData, { 
      reportProgress: true,
      observe: 'events',
    });
  }


  upload_verify(file:File, postData: any): Observable<any> {


    const formData = new FormData();

    if (localStorage.getItem('uid')===null) {
      this.uid="0";
    } else {
      this.uid=localStorage.getItem('uid')
    }

    formData.append('file', file, file.name);
    formData.append('uid', this.uid);    
    let k: keyof typeof postData;  
    for (k in postData) {
      formData.append(k,postData[k]);
    }

    return this.http.post(this.baseVerifyUrl, formData, { 
      reportProgress: true,
      observe: 'events',
    })
    
  }


}