import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AgentShareComponent } from './agent-share/agent-share.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { COBrwoseIframeComponent } from './cobrwose-iframe/cobrwose-iframe.component';
import { CobrowseFormComponent } from './cobrowse-form/cobrowse-form.component';

import { IconModule } from './icon/icon.module';
import { CobrowseService } from './cobrowse.service';


@NgModule({
  declarations: [AppComponent, AgentShareComponent, COBrwoseIframeComponent, CobrowseFormComponent],
  imports: [BrowserModule,ReactiveFormsModule,FormsModule,IconModule],
  providers: [CobrowseService],

  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule {
  // constructor(private injector: Injector) {
  //   const componentElement = createCustomElement(AgentShareComponent, {
  //     injector,
  //   });
  //   customElements.define('my-web-component', componentElement);
  // }

  // ngDoBootstrap() {}

  constructor(private injector: Injector) {
    const componentElement = createCustomElement(AppComponent, {
      injector,
    });
    customElements.define('app-agent-co-browse', componentElement);
  }
  ngDoBootstrap() {}
}
