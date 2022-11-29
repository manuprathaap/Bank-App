import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //deposit property
  acno1=''
  pswd1=''
  amount1=''


  //withdraw property
  acno2=''
  pswd2=''
  amount2=''

    //curent user
    user=''
  constructor(private ds:DataService) { 
    this.user=this.ds.currentuser;
  }

  ngOnInit(): void {
  }
  deposit(){
    // alert('clicked')
    var acno=this.acno1;
    var pswd=this.pswd1;
    var amount=this.amount1;
    const result =this.ds.deposit(acno,pswd,amount);
    if(result){
      alert(`${amount}is credited... available balance is ${result} `)
    }
    else{
      alert('transaction error')
    }

  }

  withdraw(){
    // alert('clicked')
    var acno=this.acno2;
    var pswd=this.pswd2;
    var amount=this.amount2;
    const result =this.ds.withdraw(acno,pswd,amount);
   
    if(result){
      alert(`${amount}is debited... available balance is ${result} `)
    }
    else{
      alert('transaction error')
    }
  }

}
