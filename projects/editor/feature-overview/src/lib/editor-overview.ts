import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { editorApi } from '@editor/data';
import { EditorPageList } from '@editor/ui-page-list';

@Component({
  selector: 'editor-overview',
  imports: [EditorPageList],
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
