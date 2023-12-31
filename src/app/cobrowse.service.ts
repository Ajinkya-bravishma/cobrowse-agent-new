import { Injectable } from '@angular/core';
import { Component, Renderer2, ViewEncapsulation } from '@angular/core';
import config from './utils/config';
import CobrowseAPI from 'cobrowse-agent-sdk';
declare var require: any;
// const CobrowseIO = require('cobrowse-sdk-js');
// import CobrowseIO from 'cobrowse-sdk-js';

@Injectable({
  providedIn: 'root',
})
export class CobrowseService {
  // CobrowseIO: any;
  CobrowseAPI: any;
  agentToken: any = config.jwtToken;
  cobrowseAgent: any;
  interactionId: any;
  // constructor(private renderer: Renderer2) {}

  async loadCobrowseScript(w: any, t: any, c: any, p: any, s: any, e: any) {
    console.log('Loading scripts');

    let a = new Promise(function (r) {
      w[c] = {
        client: function () {
          console.log('Inside promise function');
          if (!s) {
            s = document.createElement(t);
            s.src = 'https://js.cobrowse.io/CobrowseIO.js';
            s.async = 1;
            e = document.getElementsByTagName(t)[0];
            e.parentNode.insertBefore(s, e);
            s.onload = function () {
              console.log('Inside onload function');
              console.log('w[c] :: ', w[c]);
              r(w[c]);
            };
          }
          return a;
        },
      };
    });

    this.initializeCobrowse();

    // this.CobrowseIO = CobrowseIO;
    // this.CobrowseAPI = CobrowseAPI;
    // this.cobrowseAgent = new this.CobrowseAPI(this.agentToken);

    // // const cobroScr = this.renderer.createElement('script');
    // // const coBroAgScr = this.renderer.createElement('script');
    // console.log('Loading scripts');
    // const cobroScr = document.createElement('script');
    // const coBroAgScr = document.createElement('script');
    // coBroAgScr.src =
    //   'https://unpkg.com/cobrowse-agent-sdk@1.6.0/dist/umd-browser/cobrowse-agent-sdk.js';
    // cobroScr.src = 'https://js.cobrowse.io/CobrowseIO.js';

    // cobroScr.type = 'text/javascript';
    // coBroAgScr.type = 'text/javascript';

    // cobroScr.async = false;
    // coBroAgScr.async = false;

    // let a = new Promise((resolve, reject) => {
    //   cobroScr.onload = () => resolve(true);
    // });
    // let b = new Promise((resolve, reject) => {
    //   coBroAgScr.onload = () => resolve(true);
    // });

    // document.head.appendChild(cobroScr);
    // document.head.appendChild(coBroAgScr);
    // let fu = await Promise.all([a, b])
    //   .then((suc) => {
    //     this.initializeCobrowse();
    //     console.log('scripts loaded successfully');
    //     return suc;
    //   })
    //   .catch((err) => console.log('scripts loaded unsuccessfully'));

    // console.log('fu========', fu);
    // return fu;

    // // this.renderer.appendChild(
    // //   this.renderer.selectRootElement('app-agent-share'),
    // //   cobroScr
    // // );
    // // this.renderer.appendChild(
    // //   this.renderer.selectRootElement('app-agent-share'),
    // //   coBroAgScr
    // // );
  }

  initializeCobrowse() {
    // this.CobrowseAPI = (<any>window)?.CobrowseAPI;
    this.CobrowseAPI = CobrowseAPI;
    // this.CobrowseIO = (<any>window)?.CobrowseIO;

    console.log('this. cobro2=> ', this.CobrowseAPI);

    this.cobrowseAgent = new this.CobrowseAPI(this.agentToken);

    // this.createPresentSession();
  }
}
