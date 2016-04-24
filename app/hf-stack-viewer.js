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
    var StackView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            StackView = (function () {
                function StackView() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], StackView.prototype, "stack", void 0);
                StackView = __decorate([
                    core_1.Component({
                        selector: 'hf-stack-view',
                        styles: ["\n    .data-item {\n      color: green;\n    }"
                        ],
                        template: "\n  Stack View:\n    <ul class=\"list-unstyled\">\n      <li *ngFor=\"#s_item of stack\">\n        <span>{{s_item}}</span>\n      </li>\n    </ul>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], StackView);
                return StackView;
            }());
            exports_1("StackView", StackView);
        }
    }
});
//# sourceMappingURL=hf-stack-viewer.js.map