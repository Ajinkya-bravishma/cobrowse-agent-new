import {Component,
  ViewEncapsulation,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild, } from '@angular/core';

  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import CobrowseAPI from 'cobrowse-agent-sdk';

@Component({
  selector: 'app-cobrowse-form',
  templateUrl: './cobrowse-form.component.html',
  styles: [
    `
    .panel {
      background-color: #ffffff;
      width: 80%;
      max-width: 700px;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  #present-url {
      width: calc(100% - 20px);
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }

  #share-button,
  #end-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }

  #share-button:hover,
  #end-button:hover {
      background-color: #0056b3;
  }

  #preview {
      width: 100%;
      height: auto;
      margin-top: 20px;
      overflow: hidden;
      display: none;
      border: 1px solid #ccc;
  }
    `,
  ],
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
  newURL:any;
  divtxt: boolean = false;
  url: string = 'https://cobrowse.io/dashboard';
  isyes!: boolean;
  urlSafe!: SafeResourceUrl;
  cobrowse = new CobrowseAPI();
  CobrowseIO :any;
  frameEl = document.getElementById('myIframe');
  session: any;
  screenInfo: any;
  userData: any;
  selectedTool: string = 'laser';
  jwtToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI5MjE0MDk1MTEsImV4cCI6MTc0Nzk2NDk3OSwiYXVkIjoiaHR0cHM6Ly9jb2Jyb3dzZS5pbyIsImlzcyI6Img1VTlPNjFTMERHMDVRIiwic3ViIjoibmlraGlsZ0BicmF2aXNobWEuY29tIiwiZGlzcGxheU5hbWUiOiJOaWtoaWwgVmlzaHZhcyBHaG9ycGFkZSJ9.jItCm8OrkPkz_ciaNjatnjwRkJfBqa8EExzjhi99lbHh_-NZhuv4bk6jQrc5SgBNj61pA1idDO8JysxVlG_L-zSMXuYDy2N8QZ_1uJNpDJu-HWRGZ7vqE2ZDCSFEFCK1SyGuZv3MIDpaKoixxpDdEwxkQcbc5vkZaZ3uC37WerIaze2H3odhL6PJPRSYxZ6OvPK00eJk2s-N6tteCHerr49FwL4GNg39kzJ3xAXksse0NVDB2d-yveWomaLV54GsePhxn-2QWorHgW4iwElmDUBH1JcDk5xVyBDncHWvMY9reiawqF5hDLxN7rkLaLoSfRsH7BKl9O3h8XbshMXncZ3yROiz4hAI76RSM3KiTvr430iIq2VHTlWq0OS0QXUeaJ8ESgzgflxE9C-9J4gVhM5JY2SfWEfA6GL4XL-OMjlzsnq0ByJT8jzH9j9UdL9kSe86iu1QEszHeGU54RBD-mXGRkucGTRin8mqRzzctaddHOCA_mx6y5GWSH8wPSGZqQeli6MOqwW_5lxQZv97l5Zy40pI7rdaxmjkCU8sKm9SwwyForFXHg9UoXdFeXgOiy1q6LO0-cKF3ciWecvCSJc0Zn-lq8LqrMHhqQgIvDuml9E0Gw28Xd3rNfDUjMY_qTyfK0YagMLC32ZE4jT4nBnjowwsTJ7TSXArYy2tNyU`;
  //iframeurl="https://cobrowse.io/dashboard";
  
  constructor(
  
    public sanitizer: DomSanitizer,
    private element: ElementRef,
    private formBuilder: FormBuilder,
  ) {
    // this.interactionId =
    //   this.element.nativeElement.getAttribute('interactionid');
    // this.widgetAPI = (<any>window).WS.widgetAPI(this.interactionId);
   
   
  }
  ngOnInit(): void {
    
  }



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
    // console.log('widgetApi : ', this.widgetAPI, this.urlname)
    // this?.widgetAPI?.sendChatMessage(this.urlname);
    // console.log(this.urlname);
  }

  goToLink() {
    window.open(this.urlname, '_blank');
  }
  getData() {
    this.finalurl = `${this.url}?token=${this.jwtToken}&agent_tools=none&device_controls=none&session_details=none&popout=none&messages=none`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.finalurl);
    console.log(this.finalurl,' This is the final url ')
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

  generateSessionCode() {
   this.cobrowse.license = "h5U9O61S0DG05Q"; //license copy
  }

  createCobrowseURL(session:any){
    // let payload = {
    //   "cobrowse_session_code": 134646,
    //   "cobrowse_details": {
    //     "name": "Nikhil Vishvas Ghorpade",
    //     "email": "nikhilg@bravishma.com",
    //     "license": "h5U9O61S0DG05Q"
    //   },
    //   "cobrowse_options": {
    //     "end_action": "none",
    //     "agent_tools": "none",
    //     "device_controls": "none",
    //     "session_details": "none",
    //     "popout": "none",
    //     "messages": "none"
    //   },
    // };

    // here we have to generated sessionID
    this.newURL=(window.open(`${this.cobrowse.api}/session/${session}?end_action=none&token=${this.jwtToken}`))
    // console.log('widgetApi : ', this.widgetAPI, this.newURL)
    // this?.widgetAPI?.sendChatMessage(this.newURL);
  }


}
