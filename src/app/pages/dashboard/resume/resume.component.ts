import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AnalyticsService } from '../../../app.services/analytics.service';
import { GlobalState } from '../../../global.state';
import { ServiceResponse } from '../../../app.model/service.response';


@Component({
  selector: 'resume',
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss'],
  providers: [AnalyticsService]
})

export class Resume {

  data: any;
  private _init = false;
  currentUser: Object;
  currentUserID: string;

  private setData(adata) {
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
        var response = await this._getResData(userid);
        var succ = ServiceResponse.isResposeSuccess(response as ServiceResponse);
        console.log(succ);

        if (succ) {
          this.data = response['value'];
        }
        else {
          alert(ServiceResponse.getErroMsg(response as ServiceResponse));
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