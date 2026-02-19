import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { editorApi, type EditorApi, type PageSummary } from './editor.api';
import { firstValueFrom } from 'rxjs';

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
    const mockUsers: PageSummary[] = [
      { id: '1', title: 'Page 1' },
      { id: '2', title: 'Page 2', path: '/test/page-2' },
    ];

    const result = firstValueFrom(service.listPages());

    const req = httpTestingController.expectOne('/api/editor/pages');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);

    expect(await result).toEqual(mockUsers);
  });
});
