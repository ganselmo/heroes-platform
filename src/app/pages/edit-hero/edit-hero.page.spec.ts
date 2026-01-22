import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroPage } from './edit-hero.page';

describe('EditHeroPage', () => {
  let component: EditHeroPage;
  let fixture: ComponentFixture<EditHeroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
