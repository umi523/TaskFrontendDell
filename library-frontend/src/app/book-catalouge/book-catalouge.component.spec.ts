import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCatalougeComponent } from './book-catalouge.component';

describe('BookCatalougeComponent', () => {
  let component: BookCatalougeComponent;
  let fixture: ComponentFixture<BookCatalougeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCatalougeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCatalougeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
