import {
  Component,
  ViewEncapsulation,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import CobrowseAPI from 'cobrowse-agent-sdk';
import config from '../utils/config';
import { CobrowseService } from '../cobrowse.service';

@Component({
  selector: 'app-cobrowse-form',
  templateUrl: './cobrowse-form.component.html',
  styleUrls: ["./cobrowse-form.component.css"],
})
export class CobrowseFormComponent implements OnInit {
  @ViewChild('myIframe') iframe!: ElementRef;

  ngAfterViewInit() {
    // const iframeElement: HTMLIFrameElement = this.iframe.nativeElement;
    // console.log('iframe content  ::', this.iframe.nativeElement);
    // // Call a function on the iframe element
    // // iframeElement.contentWindow.postMessage('Hello from parent', '*');
  }
  @Input()
  public widgetAPI: any;
  public interactionId!: string;

  public message: string = '';
  public interaction: any;
  finalurl: any;
  newURL: any;
  divtxt: boolean = false;
  url: string = config.cobrowseDashboardUrl;
  isyes!: boolean;
  // urlSafe!: SafeResourceUrl;
  // cobrowse = new CobrowseAPI();
  CobrowseIO: any;
  frameEl = document.getElementById('myIframe');
  session: any;
  screenInfo: any;
  userData: any;
  selectedTool: string = 'laser';
  jwtToken = config.jwtToken;

  constructor(
    public sanitizer: DomSanitizer,
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private cobrowseService : CobrowseService
  ) {
    // this.interactionId =
    //   this.element.nativeElement.getAttribute('interactionid');
    this.interactionId = this.cobrowseService.interactionId;
      console.log("cobrowse form interaction id", this.interactionId);
      
    this.widgetAPI = (<any>window)?.WS?.widgetAPI(this.interactionId);
  }
  ngOnInit(): void {}

  selectedValue: any;
  description: any;
  urlname: any;
  getSelectedValue(value: any) {
    // Prints selected value
    this.selectedValue = value;
    console.log(this.selectedValue);

    if (this.selectedValue == 'Update mobile number') {
      this.urlname = 'https://lab.bravishma.com:6510';
      this.description = 'Update mobile number form';
    } else if (this.selectedValue == 'Update address details') {
      this.urlname = 'https://lab.bravishma.com:6508';
      this.description = 'Update address details form';
    } else if (this.selectedValue == 'Update email address') {
      this.urlname = 'https://lab.bravishma.com:6507';
      this.description = 'Update email address form';
    }
  }

  sendCobrowseUrlToCustomer() {
    console.log('widgetApi : ', this.widgetAPI, this.urlname)
    this?.widgetAPI?.sendChatMessage(this.urlname);
    console.log(this.urlname);
  }

  goToLink() {
    window.open(this.urlname, '_blank');
  }

  // generateSessionCode() {
  //   this.cobrowse.license = config.license; //license copy
  // }

  // createCobrowseURL(session: any) {
  //   // let payload = {
  //   //   "cobrowse_session_code": 134646,
  //   //   "cobrowse_details": {
  //   //     "name": "Nikhil Vishvas Ghorpade",
  //   //     "email": "nikhilg@bravishma.com",
  //   //     "license": "h5U9O61S0DG05Q"
  //   //   },
  //   //   "cobrowse_options": {
  //   //     "end_action": "none",
  //   //     "agent_tools": "none",
  //   //     "device_controls": "none",
  //   //     "session_details": "none",
  //   //     "popout": "none",
  //   //     "messages": "none"
  //   //   },
  //   // };

  //   // here we have to generated sessionID
  //   this.newURL = window.open(
  //     `${this.cobrowse.api}/session/${session}?end_action=none&token=${this.jwtToken}`
  //   );
  //   // console.log('widgetApi : ', this.widgetAPI, this.newURL)
  //   // this?.widgetAPI?.sendChatMessage(this.newURL);
  // }
}
