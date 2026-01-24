import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroDialog } from './delete-hero-dialog';

describe('DeleteHeroDialog', () => {
  let component: DeleteHeroDialog;
  let fixture: ComponentFixture<DeleteHeroDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHeroDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
