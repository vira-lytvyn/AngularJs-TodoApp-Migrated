import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render not found message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Not found');
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Sorry, but the page you were trying to view does not exist.'
    );
  });

  it('should render reasons list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ul li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('mistyped address');
    expect(listItems[1].textContent).toContain('out-of-date link');
  });
});
