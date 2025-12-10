import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favs } from './favs';

describe('Favs', () => {
  let component: Favs;
  let fixture: ComponentFixture<Favs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
