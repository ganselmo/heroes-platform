import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButton } from '@angular/material/button';
import { HeroesTablePagination } from './heroes-table-pagination';
describe('HeroesTablePagination', () => {
  let component: HeroesTablePagination;
  let fixture: ComponentFixture<HeroesTablePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesTablePagination, MatButton],
    }).compileComponents();
    fixture = TestBed.createComponent(HeroesTablePagination);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.componentRef.setInput('itemsPerPage', 10);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should start at page 0', () => {
      const span = fixture.nativeElement.querySelector('.paginator > span');
      expect(span.textContent).toContain('Page 1 / 3');
    });
  });

  describe('Execute nextPage', () => {
    it('should increment currentPage by 1', async () => {
      const emitted: number[] = [];
      component.pageChange.subscribe((page: number) => emitted.push(page));
      component.nextPage();
      await fixture.whenStable();
      expect(emitted).toContain(1);
    });

    it('should not go beyond the last page', () => {});
  });

  describe('Execute prevPage', () => {
    it('should not go below page 0', async () => {
      const emitted: number[] = [];
      component.pageChange.subscribe((page: number) => emitted.push(page));
      component.prevPage();
      await fixture.whenStable();
      expect(emitted).not.toContain(-1);
    });
  });
  describe('LinkedSignal adjustment', async () => {
    it('should adjust currentPage when totalPages decreases below current', async () => {
      component.nextPage();
      component.nextPage();
      await fixture.whenStable();
      const emitted: number[] = [];
      component.pageChange.subscribe((page: number) => emitted.push(page));
      fixture.componentRef.setInput('totalPages', 2);
      await fixture.whenStable();
      expect(emitted).toContain(1);
    });
  });
});
