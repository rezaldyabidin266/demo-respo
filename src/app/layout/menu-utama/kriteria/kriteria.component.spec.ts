import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KriteriaComponent } from './kriteria.component';

describe('KriteriaComponent', () => {
  let component: KriteriaComponent;
  let fixture: ComponentFixture<KriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
