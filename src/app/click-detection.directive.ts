import { Directive,ElementRef,HostListener } from '@angular/core';
import { GlobalService } from './global.service';
import { EventEmitter } from 'events';

@Directive({
  selector: '[appClickDetection]'
})
export class ClickDetectionDirective {
  constructor(private el : ElementRef,private global :GlobalService) { 
  }
  @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
      const clickedInside = this.el.nativeElement.contains(targetElement);
      if (!clickedInside) {
          this.global.showSearchResult=false;;
      }
    }

}
