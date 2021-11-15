import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PertanyaanComponent } from './pertanyaan.component';

describe('PertanyaanComponent', () => {
  let component: PertanyaanComponent;
  let fixture: ComponentFixture<PertanyaanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PertanyaanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PertanyaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
