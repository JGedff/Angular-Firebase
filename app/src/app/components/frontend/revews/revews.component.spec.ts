import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevewsComponent } from './revews.component';

describe('RevewsComponent', () => {
  let component: RevewsComponent;
  let fixture: ComponentFixture<RevewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
