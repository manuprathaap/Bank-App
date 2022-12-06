import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //deposit property
  // acno1=''
  // pswd1=''
  // amount1=''


  //withdraw property
  // acno2=''
  // pswd2=''
  // amount2=''

    //curent user
    user=''

    //systemdate
    sdate: any;


  //depositform
  depositForm=this.fb.group({  
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })

  //withdrawform
  withdrawForm=this.fb.group({  
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })
  acno: any;

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentuser;
    this.sdate=new Date();
  }

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert("please login first")
      this.router.navigateByUrl('');
    }
  }
  deposit(){
    // alert('clicked')
    var acno1=this.depositForm.value.acno1;
    var pswd1=this.depositForm.value.pswd1;
    var amount=this.depositForm.value.amount1;
    const result =this.ds.deposit(acno1,pswd1,amount);
    if(this.depositForm.valid){

        console.log(this.depositForm.get('acno')?.errors);         

    if(result){
      
      alert(`${amount}is credited... available balance is ${result} `)
    
    }
    
    else{
      alert('transaction error')
    }
  }else
  {
    alert("'invalid form'")
  }
  }



  withdraw(){
    // alert('clicked')
    var acno=this.withdrawForm.value.acno;
    var pswd=this.withdrawForm.value.pswd;
    var amount=this.withdrawForm.value.amount;
    if(this.withdrawForm.valid){
    const result =this.ds.withdraw(acno,pswd,amount);
   
    if(result){
      alert(`${amount}is debited... available balance is ${result} `)
    }
    else{
      alert('transaction error')
    }
  }else{
    alert("invalid form")
  }
  
  }
  logout(){
    alert("clicked")
    localStorage.removeItem('currentAcno');
    localStorage.removeItem('currentuser');
    this.router.navigateByUrl('')
  }

  delete(){
    // alert('clicked')
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'') //covert json into object
  }

  onCancel(){
    this.acno=""
  }

}

