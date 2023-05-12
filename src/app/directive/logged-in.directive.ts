import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appIf]',
})
export class LoggedInDirective {
  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input('appIf') set isLoggedIn(value: boolean) {
    if (value) {
      this.viewContainer.createEmbeddedView(this.template);
    } else {
      this.viewContainer.clear();
    }
  }
}
