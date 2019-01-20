import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(value: string, args: string): SafeHtml {
    if (args && value) {
        const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex !== -1) {
            const endLength = args.length;
            const matchingString = value.substr(startIndex, endLength);
            return this.sanitizer.bypassSecurityTrustHtml(value.replace(matchingString, '<mark>' + matchingString + '</mark>'));
        }

    }
    return value;
}

}
