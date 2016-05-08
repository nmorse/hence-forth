System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Terminal;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Terminal = (function () {
                function Terminal() {
                    this.stdIn = new core_1.EventEmitter();
                }
                Terminal.prototype.Enter = function () {
                    if (this.stdOut) {
                        this.stdIn.next(this.stdOut);
                    }
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], Terminal.prototype, "stdIn", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Terminal.prototype, "stdOut", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], Terminal.prototype, "stdError", void 0);
                Terminal = __decorate([
                    core_1.Component({
                        selector: 'terminal',
                        template: "\n  <div>\n    <form (ngSubmit)=\"Enter()\">\n      <input type=\"text\" [(ngModel)]=\"stdOut\" size=\"30\"\n           placeholder=\"type code here (hence-FORTH)\">\n      <input class=\"btn-primary\" type=\"submit\" value=\"Enter\">\n    </form>\n    <p>error message: <span style=\"color:red;\">{{stdError}}</span></p>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Terminal);
                return Terminal;
            }());
            exports_1("Terminal", Terminal);
        }
    }
});
//# sourceMappingURL=terminal.js.map