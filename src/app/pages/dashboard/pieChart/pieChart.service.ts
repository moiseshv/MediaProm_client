import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.devices',
        stats: '57,820',
        icon: 'fa fa-user fa-5x',
      }, {
        color: pieColor,
        description: 'dashboard.plans',
        stats: '$ 89,745',
        icon: 'fa fa-money fa-5x',
      }, {
        color: pieColor,
        description: 'dashboard.videos',
        stats: '178,391',
        icon: 'movie',
      }, {
        color: pieColor,
        description: 'dashboard.shared_devices',
        stats: '32,592',
        icon: 'face',
      }
    ];
  }
}
