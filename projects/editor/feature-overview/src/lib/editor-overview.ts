import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { editorApi } from '@editor/data';

@Component({
  selector: 'editor-overview',
  imports: [],
  templateUrl: 'editor-overview.html',
  styles: ``,
})
export class EditorOverview {
  private readonly editorApi = inject(editorApi);
  /**
   * fetches the list of pages
   */
  readonly pageRequest = rxResource({
    stream: () => this.editorApi.listPages(),
    defaultValue: [],
  });
}
