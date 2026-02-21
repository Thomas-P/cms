import { inject, InjectionToken } from '@angular/core';
import { DefaultService as EditorApi } from './generated';
import { HttpClient } from '@angular/common/http';

/**
 * Tree shakable api.
 */
export const editorApi = new InjectionToken<EditorApi>('editor api', {
  providedIn: 'root',
  factory() {
    const basePath = '/api/editor';
    return new EditorApi(inject(HttpClient), basePath);
  },
});

export { type EditorApi };
