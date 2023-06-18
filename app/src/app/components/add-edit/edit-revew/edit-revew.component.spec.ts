import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRevewComponent } from './edit-revew.component';

describe('EditRevewComponent', () => {
  let component: EditRevewComponent;
  let fixture: ComponentFixture<EditRevewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRevewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRevewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
