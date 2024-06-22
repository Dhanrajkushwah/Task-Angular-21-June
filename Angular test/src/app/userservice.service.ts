import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private _http: HttpClient) { }
//Add User----------------------------------->
  addUser(obj: any) {
    return this._http.post<any>(environment._api + "/api/user/create", obj)
  }
  //Get User----------------------------------->
  getUser() {
    return this._http.get<any>(environment._api + "/api/user/list")
  }
  //Get BYID User----------------------------------->
  getUserById(id: any) {
    let url = `${environment._api + "/api/user/"}/${id}`
    return this._http.get<any>(url)
  }
  //Update Edit User----------------------------------->
  updateUser(obj: any) {
    return this._http.put<any>(environment._api + "/api/user/edit",obj)
  }
  //Delete User----------------------------------->
  deleteUser(id: any) {
    return this._http.delete<any>(`${environment._api}/api/user/delete?id=${id}`)
  }
}
