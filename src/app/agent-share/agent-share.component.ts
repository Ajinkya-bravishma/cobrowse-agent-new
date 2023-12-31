import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import CobrowseAPI from 'cobrowse-agent-sdk';
import * as jose from 'jose';
import config from '../utils/config';
declare var require: any;
// const CobrowseIO = require('cobrowse-sdk-js');
import { CobrowseService } from '../cobrowse.service';

@Component({
  selector: 'app-agent-share',
  templateUrl: './agent-share.component.html',
  styleUrls: ['./agent-share.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AgentShareComponent {
  // cobrowse = new CobrowseAPI();
  CobrowseIO: any;
  frameEl = document.getElementById('myIframe');
  selectedTool: string = 'laser';
  jwtToken = config.jwtToken;
  //iframeurl="https://cobrowse.io/dashboard";
  session: any;
  suggestionForm!: FormGroup;
  viewerToken: any;
  presentURL: any;
  cobrowseClient: any;

  sessionID: any;
  //adding for agent preview
  licenseKey = config.license;
  agentToken = this.jwtToken;
  // cobrowseAgent = new CobrowseAPI(this.agentToken);
  CobrowseAPI: any;
  cobrowseAgent: any;
  require: any;

  pkcs8 = config.pkcs8;
  public isShareScreen: boolean = true;
  public isEnd: boolean = false;

  async ngOnInit() {
    // await this.CobrowseService.loadCobrowseScript();
    // this.createPresentSession();

    this.CobrowseIO = (<any>window)?.CobrowseIO;
    this.CobrowseAPI = this.CobrowseService.CobrowseAPI;
    this.cobrowseAgent = this.CobrowseService.cobrowseAgent;

    // this.CobrowseAPI=(<any>window)?.CobrowseAPI;
    // this.CobrowseIO=(<any>window)?.CobrowseIO;

    // this.cobrowseAgent=new this.CobrowseAPI(this.agentToken)
  }
  // ngAfterViewInit(){
  //   this.createPresentSession();
  // }

  constructor(
    private formBuilder: FormBuilder,
    //  private renderer: Renderer2,
    private CobrowseService: CobrowseService
  ) {
    this.suggestionForm = this.formBuilder.group({
      presentURL: [''],
    });
  }

  // private loadCobrowseScript() {
  //   const cobroScr = this.renderer.createElement('script');
  //   const coBroAgScr = this.renderer.createElement('script');
  //   coBroAgScr.src =
  //     'https://unpkg.com/cobrowse-agent-sdk@1.6.0/dist/umd-browser/cobrowse-agent-sdk.js';
  //   cobroScr.src = 'https://js.cobrowse.io/CobrowseIO.js';

  //   let a = new Promise((resolve, reject) => {
  //     cobroScr.onload = () => resolve(true);
  //   });
  //   let b = new Promise((resolve, reject) => {
  //     coBroAgScr.onload = () => resolve(true);
  //   });

  //   Promise.all([a, b])
  //     .then((suc) => {
  //       this.initializeCobrowse();
  //       console.log('scripts loaded successfully');
  //     })
  //     .catch((err) => console.log('scripts loaded unsuccessfully'));

  //   document.head.appendChild(cobroScr);
  //   document.head.appendChild(coBroAgScr);

  //   // this.renderer.appendChild(
  //   //   this.renderer.selectRootElement('app-agent-share'),
  //   //   cobroScr
  //   // );
  //   // this.renderer.appendChild(
  //   //   this.renderer.selectRootElement('app-agent-share'),
  //   //   coBroAgScr
  //   // );
  // }
  // initializeCobrowse() {
  //   this.CobrowseAPI = (<any>window)?.CobrowseAPI;
  //   this.CobrowseIO = (<any>window)?.CobrowseIO;

  //   console.log('this. cobro2=> ', this.CobrowseAPI);

  //   this.cobrowseAgent = new this.CobrowseAPI(this.agentToken);

  //   this.createPresentSession();
  // }

  // private loadScript(scriptElement:HTMLScriptElement):Promise<void>{
  //   return new Promise((resolve,reject))
  // }

  //**** agent screen sharing ****//

  // createPresentSession = async () => {
  //   console.log('wassup');
  //   this.session = await this.CobrowseService.cobrowseAgent.sessions.create({
  //     full_device: 'requested',
  //   });
  //   // console.log("session:",this.session);
  //   this.sessionID = this.session.id;
  //   console.log('sessionId:', this.sessionID);

  //   this.viewerToken = await this.generateViewerJWT(
  //     this.licenseKey,
  //     this.sessionID
  //   );
  //   // console.log('viewerToken:', this.viewerToken);
  //   // Generate the present URL for the session with the viewer token all query parameters to hide agent tools from the viewer
  //   this.presentURL = `https://cobrowse.io/session/${this.session.id}?token=${this.viewerToken}&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none`;

  //   console.log('presentURL', this.presentURL);
  //   this.suggestionForm.controls['presentURL'].setValue(this.presentURL);
  // };

  generateViewerJWT = async (licenseKey: any, id: any) => {
    try {
      const alg = 'RS256';
      const pkcs8 = this.pkcs8;
      const privateKey = await jose.importPKCS8(pkcs8, alg);

      const jwt = await new jose.SignJWT({
        displayName: 'Viewer',
        policy: {
          version: 2,
          sessions: {
            id: id,
          },
        },
      })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer(licenseKey)
        .setSubject('viewer@cobrowse.io')
        .setAudience('https://cobrowse.io')
        .setExpirationTime('2h') // Choose your own expiration time
        .sign(privateKey);

      return jwt;
    } catch (error) {
      console.log('err==> ', error);
      throw new Error('Error Generating JWT');
    }
  };

  startPresentSession = async () => {
    try {
      console.log('cobrowseApi ', this.CobrowseAPI);
      console.log('cobrowseIO ', this.CobrowseIO);
      console.log('cobrowseAgent ', this.cobrowseAgent);

      this.session = await this.CobrowseService.cobrowseAgent.sessions.create({
        full_device: 'requested',
      });
      this.sessionID = this.session.id;
      console.log('sessionId:', this.sessionID);

      this.viewerToken = await this.generateViewerJWT(
        this.licenseKey,
        this.sessionID
      );

      const media = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1400 },
          height: { ideal: 1000 },
          frameRate: { max: 10 },
        },
        audio: false,
      });

      this.presentURL = `https://cobrowse.io/session/${this.session.id}?token=${this.viewerToken}&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none`;

      console.log('presentURL', this.presentURL);
      this.suggestionForm.controls['presentURL'].setValue(this.presentURL);

      media.getVideoTracks()[0].onended = () => {
        this.resetPresentSession();
      };

      this.cobrowseClient = await this.CobrowseIO.client(); // client

      this.cobrowseClient.license = this.licenseKey;
      this.cobrowseClient.redactedViews = ['.container'];
      this.cobrowseClient.capabilities = ['full_device'];
      this.cobrowseClient.showSessionControls = () => {};
      this.cobrowseClient.hideSessionControls = () => {};
      this.cobrowseClient.confirmSession = async () => true;
      this.cobrowseClient.confirmFullDevice = async () => media;
      this.cobrowseClient.confirmRemoteControl = async () => false;

      this.cobrowseClient.on('session.updated', (presentSession: any) => {
        if (presentSession.isActive()) {
          this.isShareScreen = false;
          this.isEnd = true;

          if (!presentSession.fullDevice()) {
            this.session.end();
          }
        }
      });

      this.cobrowseClient.on('session.ended', async (presentSession: any) => {
        if (media) media.getTracks().forEach((track) => track.stop());
        this.resetPresentSession();
      });

      await this.cobrowseClient.start({
        allowIFrameStart: true,
        register: false,
      });

      // Use the Client SDK to join the session
      await this.cobrowseClient.getSession(this.session.id);
    } catch (error) {
      console.log('Error starting cobrowse agent present', error);
      throw new Error('Error starting cobrowse agent present');
    }
  };

  resetPresentSession = async () => {
    await this.cobrowseClient.stop();
    this.isShareScreen = true;
    this.isEnd = false;
    this.suggestionForm.controls['presentURL'].setValue('');

    // this.isPreview = false

    // await this.createPresentSession();
  };
}
