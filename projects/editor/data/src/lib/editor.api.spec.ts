import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { editorApi, type EditorApi } from './editor.api';
import { firstValueFrom } from 'rxjs';
import type { PageSummary, PageCreation } from './generated';

describe('EditorApi', () => {
  let service: EditorApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(editorApi);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return a list of pages', async () => {
    const mockedPages: PageSummary[] = [
      { id: '1', title: 'Page 1' },
      { id: '2', title: 'Page 2', path: '/test/page-2' },
    ];

    const result = firstValueFrom(service.listPages());

    const req = httpTestingController.expectOne('/api/editor/pages');
    expect(req.request.method).toEqual('GET');
    req.flush(mockedPages);

    expect(await result).toEqual(mockedPages);
  });

  it('should create a page', async () => {
    const request: PageCreation = {
      path: 'path/test/page',
      title: 'test-title',
    };
    const creationResponse: PageSummary = {
      ...request,
      id: 'page-id',
    };
    const result = firstValueFrom(service.createPage(request));

    const req = httpTestingController.expectOne('/api/editor/pages');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(request);

    req.flush(creationResponse);

    expect(await result).toEqual(creationResponse);
  });
});
