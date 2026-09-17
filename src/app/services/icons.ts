import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { uiIcons } from '../assets/icons';

@Injectable({
  providedIn: 'root',
})
export class Icons {
  private sanitizer = inject(DomSanitizer);

  readonly icons = {
    check: this.sanitizer.bypassSecurityTrustHtml(uiIcons.check()),
    close: this.sanitizer.bypassSecurityTrustHtml(uiIcons.close()),
    trashcan: this.sanitizer.bypassSecurityTrustHtml(uiIcons.trashcan()),
    plus: this.sanitizer.bypassSecurityTrustHtml(uiIcons.plus()),
    dropdownDownArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownDownArrow()),
    dropdownUpArrow: this.sanitizer.bypassSecurityTrustHtml(uiIcons.dropdownUpArrow()),
  };
}
