import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrowseFormComponent } from './cobrowse-form.component';

describe('CobrowseFormComponent', () => {
  let component: CobrowseFormComponent;
  let fixture: ComponentFixture<CobrowseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobrowseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobrowseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
