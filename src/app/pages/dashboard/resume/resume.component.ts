import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from '../../../app.services/analytics.service';
import { GlobalState } from '../../../global.state';


@Component({
  selector: 'resume',
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss'],
  providers: [AnalyticsService]
})

export class Resume {

  data = [{}, {}, {}, {}];
  private _init = false;
  currentUser: Object;
  currentUserID: string;

   private setData(adata){
   this.data = adata
  }

  constructor(private _ref: ChangeDetectorRef, private _state: GlobalState, private _resumeService: AnalyticsService) {
     this.data = _resumeService.getDummyData();    
     var upf = async (user) => {
      console.log('usuario llego')
      console.log(user);
      console.log(user['objectId']);
      console.log(this);
      this.currentUser = user;
      this.currentUserID = (user != undefined) ? user['objectId'] : undefined;
      console.log(this.currentUserID);      
      var udata = await this._getResData(this.currentUserID);
      console.log('udata');
      console.log(udata);
      this.setData(udata);
      console.log('data');
      console.log(this.data);
      //this.data = _resumeService.getDummyData();
      this._ref.markForCheck();
     // this._ref.detectChanges();
      
    
      }

     //this._state.subscribe('user.current',upf );

/*
    this._state.subscribe('user.current', (user) => {
      this.currentUser = user;
      console.log('usuario llego')
      console.log(user);
      console.log(user['objectId']);
      this.currentUserID = (user != undefined) ? user['objectId'] : undefined;
      console.log(this.currentUserID);
      this.data = _resumeService.getDummyData();
      var idata = this.data;
      this._resumeService.getResumeData(this.currentUserID).then(function (result) {
        console.log('result'); // "Stuff worked!"
        console.log(result); // "Stuff worked!"
        console.log(idata); // "Stuff worked!"
        idata = _resumeService.getDummyData();
        idata = result;
      }, function (err) {
        console.log(err); // Error: "It broke"
      });

    console.log( 'antes de asignar' ); // "Stuff worked!"
     this.data = idata;
     console.log( this.data ); // "Stuff worked!"

    });
    */

  }

  async ngAfterViewInit() {

    console.log("init");    
    var userid = sessionStorage.getItem('user.current.id');
    console.log('session storage init');
    console.log(userid);
    //var userid= (user != undefined) ? user['objectId'] : undefined;
     //this._init = true;
    if (!this._init) {
      try {
        var st = await this._getResData(userid);
        console.log("respuesta1");
        console.log(st);
        if (st != undefined) {
          this.data = st;
        }
      } catch (error) {
        console.log(error);
      }

      this._init = true;
    }
  }

  private async _getResData(userid: string) {
    console.log('geting data');
    console.log(userid);
    var stats = await this._resumeService.getResumeData(userid);
    return stats;
  }

}