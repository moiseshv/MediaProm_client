import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class ResumeService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    return [
      {

        description: 'dashboard.devices',
        stats: '127',
        icon: 'fa fa-desktop fa-5x',
      }, {

        description: 'dashboard.plans',
        stats: '4',
        icon: 'fa fa-money fa-5x',
      }, {

        description: 'dashboard.videos',
        stats: '178',
        icon: 'fa fa-file-movie-o fa-5x',
      }, {

        description: 'dashboard.shared_devices',
        stats: '23',
        icon: 'fa fa-share-alt fa-5x',
      }
    ];
    /*

    var stats = {
                'devices'         : 10,  
                'videos'          : 23,
                'shared_devices'  : 34,
                'plans'           : 3
              }  
              
              */

  }

}
