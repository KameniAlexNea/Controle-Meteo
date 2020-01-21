import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective {

  constructor(el: ElementRef) {
    var r = Math.floor(256 * Math.random());
    var g = Math.floor(256 * Math.random());
    var b = Math.floor(256 * Math.random());
    el.nativeElement.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  }

}
