import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(value: string, args: string): SafeHtml {
    let parsed = value;
    if (args && value) {
        parsed = value.toString();
        const startIndex = parsed.toLowerCase().indexOf(args.toLowerCase());
        if (startIndex !== -1) {
            const endLength = args.length;
            const matchingString = parsed.substr(startIndex, endLength);
            return this.sanitizer.bypassSecurityTrustHtml(parsed.replace(matchingString, '<mark>' + matchingString + '</mark>'));
        }

    }
    return parsed;
}

}
