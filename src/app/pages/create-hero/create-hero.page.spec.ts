import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHeroPage } from './create-hero.page';

describe('CreateHeroPage', () => {
  let component: CreateHeroPage;
  let fixture: ComponentFixture<CreateHeroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHeroPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHeroPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
