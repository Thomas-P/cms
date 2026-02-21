import { Component, input } from '@angular/core';
import { PageSummary } from '@editor/data';

@Component({
  selector: 'editor-ui-page-list',
  imports: [],
  template: ` <p>ui-page-list works!</p> `,
  styles: ``,
})
export class EditorPageList {
  readonly pages = input.required<PageSummary[]>();
}
