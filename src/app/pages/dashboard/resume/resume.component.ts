import {Component} from '@angular/core';
import {ResumeService} from './resume.service';


@Component({
  selector: 'resume',
  templateUrl: './resume.html',
  styleUrls: ['./resume.scss']
})

export class Resume {

  public data: Object;
  private _init = false;

  constructor(private _resumeService: ResumeService) {
    this.data = this._resumeService.getData();
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._updateData();
      this._init = true;
    }
  }

  private _updateData() {
     this.data = this._resumeService.getData();
  }
}
