import { Component, ElementRef } from '@angular/core';
import { CobrowseService } from './cobrowse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cobrowse';
  interactionId: any;
  widgetAPI: any;
  scriptLoaded = false;
  constructor(
    private element: ElementRef,
    private cobrowseService: CobrowseService
  ) {
    this.interactionId =
      this.element.nativeElement.getAttribute('interactionid');
    console.log('cobrowse app comp interaction id', this.interactionId);
    console.log('cobrowse app comp element id', this.element);

    this.cobrowseService.interactionId = this.interactionId;
    this.widgetAPI = (<any>window)?.WS?.widgetAPI(this.interactionId);
    console.log('cobrowse app comp widgetAPI ', this.widgetAPI);
    this.cobrowseService.loadCobrowseScript().then((suc) => {
      this.scriptLoaded = true;
    });
  }
}
