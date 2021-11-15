import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUtamaComponent } from './menu-utama.component';

describe('MenuUtamaComponent', () => {
  let component: MenuUtamaComponent;
  let fixture: ComponentFixture<MenuUtamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUtamaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUtamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
