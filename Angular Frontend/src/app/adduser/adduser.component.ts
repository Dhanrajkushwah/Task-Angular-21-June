import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userform!: FormGroup;
  ckDep:boolean =false;
  userarray: any[] = [];
  id: any;
  data: any;
  constructor( private fb: FormBuilder,
    private router: Router,private route: ActivatedRoute,private service: UserserviceService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],  
    },
  );
    this.route.queryParams.subscribe(parsam => {
      this.data = JSON.parse(atob(parsam['data']));
      //this.id = params['id'];
      console.log("editdata",this.data);
      this.setUserData();
    });
  }
  
  setUserData() {
    this.userform.patchValue({
      name: this.data.name,
      email: this.data.email,
      phone_number: this.data.phone_number,
      address: this.data.address,
    })
  }
  AddUsers() {
  if (this.userform.invalid) {
    this.ckDep = true;
    return
  } else {
    
    console.log("register",this.userform.value)
    this.service.addUser(this.userform.value).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(["/list"])
    })
   
  }
}
updateuser() {
  if (this.userform.invalid) {
    this.ckDep = true;
    return
  } else {
    try {
      this.userform.value.id = this.data._id;
      const post = {
        "_id": this.userform.value.id,
        "name": this.userform.value.name,
        "email": this.userform.value.email,
        "phone_number": this.userform.value.phone_number,
        "address": this.userform.value.address,
      }
      this.service.updateUser(post).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(["/list"])
      },

      )
    } catch (err) {
    }
  }
}
}


