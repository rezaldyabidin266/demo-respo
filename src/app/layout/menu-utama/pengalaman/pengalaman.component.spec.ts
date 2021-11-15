import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengalamanComponent } from './pengalaman.component';

describe('PengalamanComponent', () => {
  let component: PengalamanComponent;
  let fixture: ComponentFixture<PengalamanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PengalamanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PengalamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
