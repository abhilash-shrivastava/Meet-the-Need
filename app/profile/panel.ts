/**
 * Created by Abhi on 7/28/16.
 */
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'panel',
    styles: [`
    .hide {
      display: none;
    },
    .list-title {
    background: #0273D4;
    color: white;
    }
    `
    ],
    template: `
  <div class="card" *ngIf="title">
    <div style="background: #0273D4; color: white; padding: 20px; width: 80%;" (click)="toggle()">{{title}}  </div>
    <div  [ngClass]="{hide: !opened}"><ng-content></ng-content></div>
  </div>`,
    inputs: ['title']
})
export class Panel {
    opened: Boolean = false;
    toggle () {
        this.opened = !this.opened;
    }
}
