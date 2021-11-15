import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBerkasComponent } from './upload-berkas.component';

describe('UploadBerkasComponent', () => {
  let component: UploadBerkasComponent;
  let fixture: ComponentFixture<UploadBerkasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBerkasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBerkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
