import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './default-modal/default-modal.component';

import { MediaItemService } from '../../../../app.services/mediaitem.service';
import { DeviceService } from '../../../../app.services/device.service';
import { CategoryService } from '../../../../app.services/category.service';
import { ServiceResponse } from '../../../../app.model/service.response';

@Component({
  selector: 'modals',
  styleUrls: ['./modals.scss'],
  templateUrl: './modals.html',
  providers: [MediaItemService, DeviceService, CategoryService]
})
export class Modals {

  constructor(private categservice: CategoryService, private mediitemservice: MediaItemService, private deviceservice: DeviceService, private modalService: NgbModal) { }

  lgModalShow() {
    const activeModal = this.modalService.open(DefaultModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'Large Modal';

  }

/* DEVICES */

// OK
  private async addDevice() {
    const name: string = 'device a';
    const model: string = 'modelo 2';
    const address: string = 'entre y y z';
    const devicetypeid: string = '6e8oyNxMOE';
    const ownerid: string =  'rtG5zyX9JD'; // 'wJ1XDdGTFf';  //rtG5zyX9JD
    const planid: string =  '4NYvHpWboE';
    const statusid: string =  'wuCfyAJxeZ';
    const capacity = 6;
     const sharedcapacity = 4;
     const onSystem = false;
    const deviceid = 'FjoehVlGEE';//undefined;
    const location = {latitude: 40.0, longitude: -30.0};

    var response = await this.deviceservice.addorUpdateDevice(deviceid, name, model, address, location, devicetypeid, 
                                                                      ownerid,planid, statusid,capacity, sharedcapacity, onSystem);
    console.log(response);
    var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

  //OK
  private async removeDevice() {    
    const id: string =  'FjoehVlGEE'; // 'wJ1XDdGTFf';  //rtG5zyX9JD
    var response = await this.deviceservice.removeDevice(id);
    var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }



  //OK
  async getDeviceByUser() {
    const userid = 'wJ1XDdGTFf';
    var response = await this.deviceservice.getDevicesByUser(userid);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }

  }



  async addDeviceCategory() {
    var deviceid = 's99179l4LT';
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.deviceservice.addCategory(deviceid, categories);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }

  }

  async remDeviceCategory() {
    var deviceid = 's99179l4LT';
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.deviceservice.removeCategory(deviceid, categories);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }

  }


  private async getDeviceofCategory() {
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.deviceservice.getDeviceByCategory(categories, true);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

 private async addDeviceVideo() {
    var deviceid = 's99179l4LT';
    var videos = ['iQmxrzPava', 'B7esxY8Orr'];
    var response = await this.deviceservice.addMediaItem(deviceid, videos);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

  private async removeDeviceVideo() {
    var deviceid = 's99179l4LT';
    var videos = ['iQmxrzPava', 'B7esxY8Orr'];
    var response = await this.deviceservice.removeMediaItems(deviceid, videos);
    console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

 


/*VIDEOS*/

//OK
  private async getVideosofCategory() {
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.mediitemservice.getMediaItemsByCategory(categories, true);
    console.log(response);
     var succ = ServiceResponse.isResposeSuccess(response);
     if (succ) {
        alert('succes');
      }
      else {
        alert(ServiceResponse.getErroMsg(response));
      }

  }

//OK
  private async addVideoCat() {
    var videoid = 'iQmxrzPava';
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.mediitemservice.addCategory(videoid, categories);
    console.log(response);
     var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

//OK
  private async removeVideoCat() {
    var videoid = 'iQmxrzPava';
    var categories = ['XUM9McE2db', 'qQuJFZEWcz'];
    var response = await this.mediitemservice.removeCategory(videoid, categories);
    console.log(response);
     var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

// OK
  private async addVideo() {
    const name: string = 'video a';
    const desc: string = 'video a desc';
    const mrl: string = 'url';
    const type: string = 'youaa';
    const userid: string =  'rtG5zyX9JD'; // 'wJ1XDdGTFf';  //rtG5zyX9JD
    const id = 'zZzXroqMIn';
    var response = await this.mediitemservice.addOrUpdateMediaItem(id,name, desc,mrl,type,userid,2,3);
    console.log(response);
    var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }
 
  //OK
  private async removeVideo() {    
    const id: string =  'bz3pn2CPTN'; // 'wJ1XDdGTFf';  //rtG5zyX9JD
    var response = await this.mediitemservice.removeMediaItem(id);
    var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

  //OK
  async getVideoByUser() {
    const userid = 'wJ1XDdGTFf';
    var response = await this.mediitemservice.getMediaItemsByUser(userid);
     console.log('response en modal');
    console.log(response);

    var succ = ServiceResponse.isResposeSuccess(response);
      console.log(succ);


    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }

  }


  /*CATEGORY*/
   //OK
  private async addCategory() {
    var name = 'catewa';
    var desc = 'aaaaa';
    var response = await this.categservice.addCategory(name, desc);
    var succ = ServiceResponse.isResposeSuccess(response);
    console.log(response);
    console.log(succ);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }


  //OK
  private async remCategory() {
    var id = 'LBOXXKmkxX';
    var response = await this.categservice.removeCategory(id);
     var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }
  //OK
  private async getCategories() {
    var response = await this.categservice.getCategories(undefined);
    console.log(response);
    var succ = ServiceResponse.isResposeSuccess(response);
    if (succ) {
      alert('success');
    }
    else {
      alert(ServiceResponse.getErroMsg(response));
    }
  }

}
