import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPageList } from './ui-page-list';

describe('UiPageList', () => {
  let component: UiPageList;
  let fixture: ComponentFixture<UiPageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPageList],
    }).compileComponents();

    fixture = TestBed.createComponent(UiPageList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
