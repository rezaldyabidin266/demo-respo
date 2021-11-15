import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerkasDetailComponent } from './berkas-detail.component';

describe('BerkasDetailComponent', () => {
  let component: BerkasDetailComponent;
  let fixture: ComponentFixture<BerkasDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerkasDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BerkasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
