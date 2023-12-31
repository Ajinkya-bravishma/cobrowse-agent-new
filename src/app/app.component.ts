import { Component, ElementRef, OnInit } from '@angular/core';
import { CobrowseService } from './cobrowse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
  }
  async ngOnInit() {
    await this.cobrowseService
      .loadCobrowseScript(<any>window, 'script', 'CobrowseIO', null, null, null)
      .then((suc) => {
        this.scriptLoaded = true;
        console.log('promise return ', suc);
      });
  }
}
