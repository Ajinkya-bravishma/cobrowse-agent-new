import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CobrowseAPI from 'cobrowse-agent-sdk';
import * as jose from 'jose';
import config from '../utils/config';
declare var require: any;
const CobrowseIO = require('cobrowse-sdk-js');




@Component({
  selector: 'app-agent-share',
  templateUrl: './agent-share.component.html',
  styleUrls: ['./agent-share.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AgentShareComponent {
  cobrowse = new CobrowseAPI();
  // CobrowseIO: any;
  frameEl = document.getElementById('myIframe');
  selectedTool: string = 'laser';
  jwtToken = config.jwtToken;
  //iframeurl="https://cobrowse.io/dashboard";
  session: any;
  suggestionForm!: FormGroup;
  viewerToken: any;
  presentURL: any;

  sessionID: any;
  //adding for agent preview
  licenseKey = config.license;
  agentToken =this.jwtToken;
  cobrowseAgent = new CobrowseAPI(this.agentToken);
  require: any;

  pkcs8 =config.pkcs8;
  public isShareScreen: boolean = true;
  public isEnd: boolean = false;

  ngOnInit() {
    this.createPresentSession();
  }

  constructor(private formBuilder: FormBuilder) {
    this.suggestionForm = this.formBuilder.group({
      presentURL: [''],
    });
  }

  //**** agent screen sharing ****//

  createPresentSession = async () => {
    this.session = await this.cobrowseAgent.sessions.create({
      full_device: 'requested',
    });
    // console.log("session:",this.session);
    this.sessionID = this.session.id;
    console.log('sessionId:', this.sessionID);

    this.viewerToken = await this.generateViewerJWT(
      this.licenseKey,
      this.sessionID
    );
    // console.log('viewerToken:', this.viewerToken);
    // Generate the present URL for the session with the viewer token all query parameters to hide agent tools from the viewer
    this.presentURL = `https://cobrowse.io/session/${this.session.id}?token=${this.viewerToken}&agent_tools=none&device_controls=none&end_action=none&popout=none&session_details=none`;

    console.log('presentURL', this.presentURL);
    this.suggestionForm.controls['presentURL'].setValue(this.presentURL);
  };

  generateViewerJWT = async (licenseKey: any, id: any) => {
    const alg = 'RS256';

    // WE DO NOT RECOMMEND COMMITING YOUR PRIVATE KEY. THIS IS ONLY FOR DEMO PURPOSES.
    // Replace with your private key in PKCS8 format
    const pkcs8 = this.pkcs8;

    const privateKey = await jose.importPKCS8(pkcs8, alg);

    // Generate a viewer JWT token scoped to a single session
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
      .setIssuer(this.licenseKey)
      .setSubject('viewer@cobrowse.io')
      .setAudience('https://cobrowse.io')
      .setExpirationTime('30m') // Choose your own expiration time
      .sign(privateKey);

    return jwt;
  };

  startPresentSession = async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
      video: {
        // cursor: 'always',
        width: { ideal: 1400 },
        height: { ideal: 1000 },
        frameRate: { max: 10 },
      },
      audio: false,
    });

    await CobrowseIO.client(); // client

    CobrowseIO.license = this.licenseKey;
    CobrowseIO.redactedViews = ['.container'];
    CobrowseIO.capabilities = ['full_device'];
    CobrowseIO.showSessionControls = () => {};
    CobrowseIO.hideSessionControls = () => {};
    CobrowseIO.confirmSession = async () => true;
    CobrowseIO.confirmFullDevice = async () => media;
    CobrowseIO.confirmRemoteControl = async () => false;

    CobrowseIO.on('session.updated', (presentSession: any) => {
      if (presentSession.isActive()) {
        this.isShareScreen = false;
        this.isEnd = true;

        if (!presentSession.fullDevice()) {
          this.session.end();
        }
      }
    });

    CobrowseIO.on('session.ended', async (presentSession: any) => {
      if (media) media.getTracks().forEach((track) => track.stop());
      this.resetPresentSession();
    });

    await CobrowseIO.start({
      allowIFrameStart: true,
      register: false,
    });

    // Use the Client SDK to join the session
    await CobrowseIO.getSession(this.session.id);
  };

  resetPresentSession = async () => {
    await CobrowseIO.stop();
    this.isShareScreen = true;
    this.isEnd = false;

    // this.isPreview = false

    await this.createPresentSession();
  };
}
