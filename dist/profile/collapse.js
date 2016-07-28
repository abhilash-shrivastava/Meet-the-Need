"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Abhi on 7/28/16.
 */
var core_1 = require('@angular/core');
var Collapse = (function () {
    function Collapse(el) {
        this.el = el;
        this.measureHeight();
    }
    Object.defineProperty(Collapse.prototype, "collapse", {
        set: function (value) {
            if (value !== undefined) {
                if (value) {
                    this.hide();
                }
                else {
                    this.show();
                }
            }
            //
        },
        enumerable: true,
        configurable: true
    });
    Collapse.prototype.measureHeight = function () {
        var elem = this.el.nativeElement;
        //lets be sure the element has display:block style
        elem.className = elem.className.replace('collapse', '');
        this.h = elem.scrollHeight;
    };
    Collapse.prototype.hide = function () {
        var _this = this;
        this.height = this.h + 'px';
        setTimeout(function () {
            _this.height = '0px';
            _this.isCollapsing = true; //apply 'collapsing' class
        }, 1);
    };
    Collapse.prototype.show = function () {
        var _this = this;
        this.height = '0px';
        setTimeout(function () {
            _this.height = _this.h + 'px';
            _this.isCollapsing = true; //apply 'collapsing' class
        }, 1);
    };
    __decorate([
        core_1.HostBinding('class.collapsing'), 
        __metadata('design:type', Boolean)
    ], Collapse.prototype, "isCollapsing", void 0);
    __decorate([
        core_1.HostBinding('style.height'), 
        __metadata('design:type', String)
    ], Collapse.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], Collapse.prototype, "collapse", null);
    Collapse = __decorate([
        core_1.Directive({ selector: '[collapse]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Collapse);
    return Collapse;
}());
exports.Collapse = Collapse;
//# sourceMappingURL=collapse.js.map