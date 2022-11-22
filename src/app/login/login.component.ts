import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //String interpolation (1 direction) - syntax: {{expression}}
  aim="your perfect banking partner"
  //property binding
  account="enter your account here"

  //event binding using (doller)$event
  acno=''
  pswd=''

  //database
  userDetails:any={
    1000:{acno:1000,username:'manu',pswd:'1000',balance:1000},
    1001:{acno:1001,username:'sayyid',pswd:'1001',balance:1000},
    1002:{acno:1002,username:'abhi',pswd:'1002',balance:1000}
  }






  constructor() { }

  ngOnInit(): void {
  }
  //event binding (view to component)
  // login(){
  //   alert("login clicked");
  // }

  //event binding using (doller)$event
  // acnoChange(event:any){
  //   console.log(event);
  //   this.acno=event.target.value;
  //   console.log(this.acno);
  // }

  // pswdChange(event:any){
  //   this.pswd=event.target.value;
  //   console.log(this.pswd);
  // }

  login(a:any,p:any){
    //alert login clicked
    var acno=a.value;
    var pswd=p.value;
    var userDetails=this.userDetails;

    if(acno in userDetails){
      if(pswd==userDetails[acno]['pswd']){
        alert('login successfull')
      }
      else{
        alert('invalid password')
      }
      
    }
    else{
      alert('invalid userDetails')
    }
  }
}
