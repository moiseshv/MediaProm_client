import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModal } from './default-modal/default-modal.component';

import { MediaItemService } from '../../../../app.services/mediaitem.service';
import { DeviceService } from '../../../../app.services/device.service';

@Component({
  selector: 'modals',
  styleUrls: ['./modals.scss'],
  templateUrl: './modals.html',
  providers: [MediaItemService,DeviceService ]
})
export class Modals {

  constructor(private mediitemservice:MediaItemService , private deviceservice:DeviceService , private modalService: NgbModal) {}

  lgModalShow() {    
    const activeModal = this.modalService.open(DefaultModal, {size: 'lg'});
    activeModal.componentInstance.modalHeader = 'Large Modal';
    
  }
  async addDeviceCategory() {
    var deviceid = 's99179l4LT';
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.deviceservice.addCategory(deviceid,categories);
     
  }

  async remDeviceCategory() {
    var deviceid = 's99179l4LT';
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.deviceservice.removeCategory(deviceid,categories);
     
  }

  
   private async getDeviceofCategory(){
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.deviceservice.getDeviceByCategory(categories, true);
    console.log(popo);
  }

  private async getVideosofCategory(){
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.mediitemservice.getMediaItemsByCategory(categories, true);
    console.log(popo);
  }


  

  
 private async addVideoCat(){
    var videoid = 'iQmxrzPava';
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.mediitemservice.addCategory(videoid,categories);
    console.log(popo);
  }

  private async removeVideoCat(){    
    var videoid = 'iQmxrzPava';
    var categories = ['XUM9McE2db','qQuJFZEWcz'];
    var popo = await this.mediitemservice.removeCategory(videoid,categories);
    console.log(popo);
  }

   private async removeDeviceVideo(){    
    var deviceid = 's99179l4LT';
       var videos = ['iQmxrzPava','B7esxY8Orr'];
    var popo = await this.deviceservice.removeMediaItem(deviceid,videos);
    console.log(popo);
  }

   private async addDeviceVideo(){    
    var deviceid = 's99179l4LT';
    var videos = ['iQmxrzPava','B7esxY8Orr'];
    var popo = await this.deviceservice.addMediaItem(deviceid,videos);
    console.log(popo);
  }

  
}
