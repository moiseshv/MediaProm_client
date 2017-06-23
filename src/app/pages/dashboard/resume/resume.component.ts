import { Component } from '@angular/core';
import { ResumeService } from './resume.service';
import {GlobalState} from '../../../global.state';


@Component({
  selector: 'resume',
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss']
})

export class Resume {

  public data = [{},{},{},{}];
  private _init = false;
  currentUser: Object;
  currentUserID: string;

  //constructor(private _resumeService: ResumeService) {
   constructor(private _state:GlobalState, private _resumeService: ResumeService) {
    this._state.subscribe('user.current', (user) => {
       this.currentUser = user;
       console.log('usuario llego')
       console.log(user);
       console.log( user['objectId']); 
       this.currentUserID = (user != undefined ) ? user['objectId'] : undefined;
       console.log(this.currentUserID);
       this.data = _resumeService.getDummyData(); 
     });
   
  }

  async ngAfterViewInit() {
    console.log("init");
    
    if (!this._init) {
      console.log(this.currentUserID);
      try {
         var st = await this._getResData(this.currentUserID);
      console.log("respuesta1");
      console.log(st);
      if (st != undefined){
        this.data=st;
      }
      } catch (error) {
         console.log(error);
      }
     
      this._init = true;
    }
  }

  private async _getResData(userid : string) {
    console.log('geting data');
    console.log(userid);
    var stats = await this._resumeService.getResumeData(userid);
    return stats;
  }

}