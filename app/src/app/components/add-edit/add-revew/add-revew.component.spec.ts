import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevewComponent } from './add-revew.component';

describe('AddRevewComponent', () => {
  let component: AddRevewComponent;
  let fixture: ComponentFixture<AddRevewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRevewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRevewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
