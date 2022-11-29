import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  uname=''
  acno=''
  pswd=''


registerForm=this.fb.group({  
  uname:[''],
  acno:[''],
  pswd:['']
})

  constructor(private ds:DataService, private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register(){
    // alert('clicked register')
    console.log('registerForm');
    
    var username=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;
    const result=this.ds.register(acno,username,pswd);
    if (result) {
        alert('register successfull')
        this.router.navigateByUrl('')
    }
    else{
      alert('register failed')
      this.router.navigateByUrl('')
    }
  }
}
