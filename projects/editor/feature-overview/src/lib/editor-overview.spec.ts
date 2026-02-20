import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorOverview } from './editor-overview';

describe('EditorOverview', () => {
  let component: EditorOverview;
  let fixture: ComponentFixture<EditorOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
