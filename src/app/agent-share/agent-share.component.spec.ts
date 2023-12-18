import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentShareComponent } from './agent-share.component';

describe('AgentShareComponent', () => {
  let component: AgentShareComponent;
  let fixture: ComponentFixture<AgentShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentShareComponent]
    });
    fixture = TestBed.createComponent(AgentShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
