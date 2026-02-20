import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorOverview } from './editor-overview';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('EditorOverview', () => {
  let component: EditorOverview;
  let fixture: ComponentFixture<EditorOverview>;
  let httpTestingController: HttpTestingController;

  const getLoadingIndicator = () =>
    fixture.debugElement.query(By.css('[data-automation-id]=pages-are-loading'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorOverview],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorOverview);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loading pages', () => {
    let request: TestRequest;

    beforeEach(() => {
      request = httpTestingController.expectOne('/api/editor/pages');
    });

    it('should show a loading indicator, while loading the pages', () => {
      expect(getLoadingIndicator()).toBeTruthy();
      request.flush([]);
      fixture.detectChanges();
      expect(getLoadingIndicator()).toBeFalsy();
    });
  });
});
