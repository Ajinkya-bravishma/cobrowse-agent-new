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
  selector: 'app-cobrwose-iframe',
  templateUrl: './cobrwose-iframe.component.html',
  styleUrls: ['./cobrwose-iframe.component.css'],
  // styles: [
  //   `
  //     .fk {
  //       border-radius: 0 !important;
  //     }
  //     .CustomAgentUIExample .agent-controls {
  //       display: flex !important;
  //       flex-direction: row !important;
  //       justify-content: center !important;
  //       align-items: center !important;
  //       padding-bottom: 20px !important;
  //       /* margin-top: 20px !important; */
  //     }

  //     .CustomAgentUIExample .btn {
  //       padding: 15px 20px;
  //       background: rgb(51, 51, 54);
  //       font-size: 0.85em;
  //       color: white;
  //       cursor: pointer;
  //       border-left: 1px solid rgb(70, 70, 73);
  //     }

  //     .CustomAgentUIExample .btn:hover {
  //       opacity: 0.95;
  //     }

  //     .CustomAgentUIExample .btn-left-most {
  //       border-radius: 10px 0px 0 10px;
  //       border-left: 0px none;
  //     }

  //     .CustomAgentUIExample .btn-right-most {
  //       border-radius: 0 10px 10px 0;
  //     }

  //     .CustomAgentUIExample .btn-selected {
  //       background: rgb(26, 26, 28);
  //     }

  //     .CustomAgentUIExample .btn-end {
  //       background: rgb(196, 64, 77);
  //     }

  //     .CustomAgentUIExample .full-device-on {
  //       background: rgb(45, 161, 37);
  //     }

  //     .CustomAgentUIExample .timer {
  //       color: white !important;
  //       background: rgb(51, 51, 54) !important;
  //       width: 60px !important;
  //       height: 30px !important;
  //       border-radius: 20px !important;
  //       margin-right: 10px !important;
  //       display: flex !important;
  //       justify-content: center !important;
  //       align-items: center !important;
  //       font-size: 12px !important;
  //       font-weight: bold !important;
  //     }
  //     .panel {
  //       background-color: #ffffff;
  //       width: 80%;
  //       max-width: 700px;
  //       padding: 20px;
  //       border-radius: 8px;
  //       box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  //       text-align: center;
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //     }

  //     #present-url {
  //       width: calc(100% - 20px);
  //       padding: 10px;
  //       margin-bottom: 10px;
  //       border: 1px solid #ccc;
  //       border-radius: 4px;
  //     }

  //     #share-button,
  //     #end-button {
  //       padding: 10px 20px;
  //       background-color: #007bff;
  //       color: #fff;
  //       border: none;
  //       border-radius: 4px;
  //       cursor: pointer;
  //       transition: background-color 0.3s ease;
  //     }

  //     #share-button:hover,
  //     #end-button:hover {
  //       background-color: #0056b3;
  //     }

  //     #preview {
  //       width: 100%;
  //       height: auto;
  //       margin-top: 20px;
  //       overflow: hidden;
  //       display: none;
  //       border: 1px solid #ccc;
  //     }
  //   `,
  // ],
  encapsulation: ViewEncapsulation.None,
})
export class COBrwoseIframeComponent implements OnInit {
  @ViewChild('myIframe') iframe!: ElementRef;

  
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
  urlSafe!: SafeResourceUrl;
  // cobrowse = new CobrowseAPI();
  cobrowse: any;
  CobrowseAPI: any;
  CobrowseIO: any;
  frameEl = document.getElementById('myIframe');
  session: any;
  screenInfo: any;
  userData: any;
  selectedTool: string = 'laser';
  jwtToken = config.jwtToken;
  //iframeurl="https://cobrowse.io/dashboard";

  constructor(
    public sanitizer: DomSanitizer,
    private element: ElementRef,
    private formBuilder: FormBuilder,
    private CobrowseService: CobrowseService
  ) {
    // this.interactionId =
    //   this.element.nativeElement.getAttribute('interactionid');
    this.interactionId = this.CobrowseService.interactionId;
      console.log("cobrowse iframe interaction id", this.interactionId);

    this.widgetAPI = (<any>window)?.WS?.widgetAPI(this.interactionId);
  }

  context: any = null;
  async ngOnInit() {
    this.getData();

    // await this.CobrowseService.loadCobrowseScript();

    // this.CobrowseAPI=(<any>window)?.CobrowseAPI;

    

    // this.generateViewerJWT(this.licenseKey,this.sessionID);
    console.log('called');

    // // this.getData();
    // this.finalurl = `${this.url}?token=${this.jwtToken}`;
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.finalurl);
    // this.divtxt=true;

    //this.urlSafe= "https://www.youtubse.com/";
    //  if(this.urlSafe!=="https://cobrowse.io/dashboard" && this.urlSafe!=='undefined')
    //  {

    //   this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    //  }

    //alert(this.urlSafe+'Load Event');
    // setTimeout(() => {
    // setInterval(() => {
    //   console.log("this.iframe ", this.iframe);
    //   this.frameEl = document.getElementById('myIframe');
    //   console.log("this.frameEl ", this.frameEl);

    // console.log('this.iframe.nativeElement', this.iframe.nativeElement);
    // this.onIframeRef(this.iframe.nativeElement);
    // }, 1000);
  }

  async ngAfterViewInit() {
    this.CobrowseIO = this.CobrowseService.CobrowseIO;
    this.CobrowseAPI = this.CobrowseService.CobrowseAPI;
    this.cobrowse = this.CobrowseService.cobrowseAgent;
    console.log('this.iframe.nativeElement', this.iframe.nativeElement);
    this.onIframeRef(this.iframe.nativeElement);
  }

  async onIframeRef(iframe: any) {
    this.getDuration();
    if (!this.context && iframe) {
      console.log('Context ', this.context);
      console.log('cobrowse ', this.cobrowse);
      const ctx = await this.cobrowse.attachContext(iframe);
      console.log('CTX : ', ctx);
      (window as any).cobrowse_ctx = ctx;
      // window.cobrowse_ctx = ctx;
      ctx.on('session.updated', (session: any) => {
        // update the component session state
        // setSession(session.toJSON());
        this.session = session.toJSON();
        // when the session ends, trigger some cleanup of the context
        if (session.isEnded()) {
          ctx.destroy();
          this.context = null;
        }
      });
      ctx.on('screen.updated', (info: any) => {
        this.screenInfo = info;
      });
      ctx.on('error', (err: any) => {
        console.log(err);
      });
      this.context = ctx;
    }
  }

  readContext(tool: string) {
    this.context?.setTool(tool);
    this.selectedTool = tool;
  }

  checkCondition(tool: string) {
    if (this.selectedTool === tool) {
      return true;
    } else {
      return false;
    }
  }

  // checkSessionDetaails() {
  //   if (this.session?.state === 'active') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  ellapsedTime: string = '00:00';
  getDuration() {
    // console.log('Session : ', this.session)
    if (this.session?.state === 'active') {
      // Assuming you have two date variables
      const startDate: Date = new Date(this.session.updated);
      const now = new Date();
      const diff = (now.getTime() - startDate.getTime()) / 1000;
      this.ellapsedTime = this.parseTime(diff);
    }
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  selectedValue: any;
  description: any;
  urlname: any;

  getData() {
    this.finalurl = `${this.url}?token=${this.jwtToken}&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none`;
    // this.finalurl = `${this.url}?token=${this.jwtToken}`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.finalurl);
    console.log(this.finalurl, ' This is the final url ');
    console.log(this.urlSafe, ' This is the urlSafe ');
    //setTimeout(() => {

    // this.http.getJwtToken().subscribe({
    //   next: (res: any) => {
    //     this.isyes = true;
    //     this.userData = res;

    //     console.log(res.token);
    //     this.finalurl = this.url + '?token=' + res.token;
    //     this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
    //       this.finalurl
    //     );
    //     console.log(this.finalurl);
    //     this.divtxt = true;
    //     // alert(this.urlSafe+ "    Getdatafun") ;
    //   },
    //   error: (err: { error: { message: any } }) => {
    //     //  alert('ERROR');
    //   },
    // });
    //}, 1000);

    //alert(1);

    // return this.urlSafe
  }
}
