import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutIndukComponent } from './layout-induk.component';

describe('LayoutIndukComponent', () => {
  let component: LayoutIndukComponent;
  let fixture: ComponentFixture<LayoutIndukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutIndukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutIndukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
