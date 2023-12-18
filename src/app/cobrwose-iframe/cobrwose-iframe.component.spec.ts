import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COBrwoseIframeComponent } from './cobrwose-iframe.component';

describe('COBrwoseIframeComponent', () => {
  let component: COBrwoseIframeComponent;
  let fixture: ComponentFixture<COBrwoseIframeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [COBrwoseIframeComponent]
    });
    fixture = TestBed.createComponent(COBrwoseIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
