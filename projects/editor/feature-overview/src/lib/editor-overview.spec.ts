import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorOverview } from './editor-overview';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PageSummary } from '@editor/data';
import { EditorPageList } from '@editor/ui-page-list';
import { MockComponent } from 'ng-mocks';

describe('EditorOverview', () => {
  let component: EditorOverview;
  let fixture: ComponentFixture<EditorOverview>;
  let httpTestingController: HttpTestingController;

  const getLoadingIndicator = () =>
    fixture.debugElement.query(By.css('[data-automation-id=pages-are-loading]'));

  const getErrorPage = (): HTMLElement =>
    fixture.debugElement.query(By.css('[data-automation-id=loading-pages-failed]'))?.nativeElement;

  const getRetryButton = (): DebugElement =>
    fixture.debugElement.query(By.css('[data-automation-id=retry-loading-pages]'));

  const getPageListComponent = (): EditorPageList =>
    fixture.debugElement.query(By.css('[data-automation-id=page-list-shown]'))?.componentInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorOverview, MockComponent(EditorPageList)],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorOverview);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a loading indicator, while loading the pages', async () => {
    const request = httpTestingController.expectOne('/api/editor/pages');
    expect(getLoadingIndicator()).toBeTruthy();
    request.flush([]);
    await fixture.whenStable();
    expect(getLoadingIndicator()).toBeFalsy();
    httpTestingController.verify();
  });

  it('should show an error, if something went wrong with the request.', async () => {
    const request = httpTestingController.expectOne('/api/editor/pages');
    request.flush('Not Found', {
      status: 404,
      statusText: 'Not Found',
    });
    await fixture.whenStable();
    expect(getErrorPage()).toBeTruthy();
    expect(getErrorPage().innerHTML).toContain('Something went wrong.'); // todo later add a proper message.
    expect(getRetryButton()).toBeTruthy();
    expect(getRetryButton().nativeElement.textContent).toContain('Retry');
    getRetryButton().triggerEventHandler('click');
    fixture.detectChanges();
    expect(getLoadingIndicator()).toBeTruthy();
    expect(getErrorPage()).toBeFalsy();
  });

  it('should show the page list, if loaded.', async () => {
    const pages: PageSummary[] = [
      {
        path: '<path>',
        title: '<title>',
        id: '<id>',
      },
    ];
    const request = httpTestingController.expectOne('/api/editor/pages');
    request.flush(pages);
    await fixture.whenStable();
    const pageList = getPageListComponent();
    expect(pageList.pages).toEqual(pages);
  });
});
