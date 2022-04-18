import { Component } from '@angular/core';
import { map } from 'rxjs';
import { IFCService } from '../viewer/ifc/ifc';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.less']
})
export class ProgressSpinnerComponent {
  showSpinner$ = this.ifc.loading$.pipe(map((percent: number) => {
    return percent && percent != 100;
    // return true;
  }));

  constructor(private ifc: IFCService) { }

}
