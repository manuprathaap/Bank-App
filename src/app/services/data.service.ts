import { Injectable } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})



export class DataService {
  constructor() {  //First execution
    this.getDetails();
  }

// currentacno
currentAcno=''

// currentuser
currentuser=''


//saveDetails() - to store data into the local storage
saveDetails(){
  if(this.userDetails){
    localStorage.setItem('database',JSON.stringify(this.userDetails))
  }
  if(this.currentAcno){
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
  if(this.currentuser){
    localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
  }
}


getDetails(){
  if(this.userDetails){
    this.userDetails=JSON.parse(localStorage.getItem('database')||'')
  }
  if(this.currentAcno){
    this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'')
  }
  if(this.currentuser){
    this.currentuser=JSON.parse(localStorage.getItem('currentuser')||'')
  }
}




  userDetails:any={
    1000:{acno:1000,username:'manu',pswd:'1000',balance:1000,transaction:[]},
    1001:{acno:1001,username:'sayyid',pswd:'1001',balance:1000,transaction:[]},
    1002:{acno:1002,username:'abhi',pswd:'1002',balance:1000,transaction:[]}
  }
  //////////////////////////

  register(acno:any,username:any,pswd:any){
    let userDetails=this.userDetails;
    if(acno in userDetails){
      return false;
    }
    else{
      userDetails[acno]={
        acno:acno,
        username:username,
        pswd:pswd,
        balance:0,
         transaction:[]
      }
      console.log(userDetails);
      this.saveDetails();
      return true;
      
    }
  }

  ////////////////////////

  login(acno:any,pswd:any){
    if(acno in this.userDetails){
      if(pswd==this.userDetails[acno]['pswd']){
        this.currentuser=this.userDetails[acno]['username']
        this.currentAcno=acno;
        this.saveDetails();
        return true
      }
      else{
        return false
      }
    
    }
    else{
      return false
    }

  }

///////////////////////////////////

  deposit(acno:any,pswd:any,amt:any){
    let userDetails = this.userDetails;
    var amount=parseInt(amt)
    if(acno in userDetails){
      if(pswd==userDetails[acno]['pswd']){
        userDetails[acno]['balance']+=amount;
        userDetails[acno]['transaction'].push({
          Type:'credit',
          Amount:amount
        })
        console.log(userDetails);
        this.saveDetails();
        return userDetails[acno]['balance']
      }
      else{
        alert("password incorrect");
        return false;
      }
    }else{
      alert("invalid userDetails")
      return false;
    }
  }

  //////////////////

  withdraw(acno:any,pswd:any,amt:any){
    let userDetails = this.userDetails;
    var amount=parseInt(amt)
    if(acno in userDetails){
    if(amount>userDetails[acno]['balance']){
      alert("insufficient balance")
    }
    else if(pswd==userDetails[acno]['pswd']){
      userDetails[acno]['balance']-=amount;
      userDetails[acno]['transaction'].push({
        Type:'Debit',
        Amount:amount
        
      })
      console.log(userDetails);
      this.saveDetails();
      return userDetails[acno]['balance']
     
      }
    
    else{
      alert("password incorrect");
    }
  }
  else
  {
    alert("invalid UserDetails")
  }

  }

  ///////////

  getTransaction(acno:any){
    return this.userDetails[acno]['transaction']
  }











}
