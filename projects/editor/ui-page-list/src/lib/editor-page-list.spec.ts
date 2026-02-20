import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPageList } from './editor-page-list';

describe('EditorPageList', () => {
  let component: EditorPageList;
  let fixture: ComponentFixture<EditorPageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorPageList],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorPageList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
