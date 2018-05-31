import { Directive,ElementRef,HostListener } from '@angular/core';
import { GlobalService } from './global.service';
import { EventEmitter } from 'events';
declare var $ : any;
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
          this.global.showSearchResult=false;
          $('.nav-search').animate({"width":"190px"},300);
          setTimeout(()=>{
            var width = $('.nav-search').outerWidth();
            var padding =$('.dropdown').outerWidth();
            $('.search-result').css({"width":width,"visibility":"hidden"}); 
            $('.tab').css({"padding-left":padding});
          },300)
      }
    }

}
