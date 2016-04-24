System.register(['angular2/core', './terminal', './hence-forth', './hf-stack-viewer'], function(exports_1, context_1) {
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
    var core_1, terminal_1, hence_forth_1, hf_stack_viewer_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (terminal_1_1) {
                terminal_1 = terminal_1_1;
            },
            function (hence_forth_1_1) {
                hence_forth_1 = hence_forth_1_1;
            },
            function (hf_stack_viewer_1_1) {
                hf_stack_viewer_1 = hf_stack_viewer_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.hf_interp = new hence_forth_1.HenceForth();
                    this.errorMessage = 'This is a test of the error message system, if this was an actual error... this is only a test';
                    this.testStack = [];
                }
                AppComponent.prototype.run = function ($event) {
                    this.current_code = $event;
                    this.hf_interp.parse(this.current_code);
                    this.hf_interp.run();
                    //this.testStack = this.hf_interp.data.stack;
                    this.errorMessage = '';
                    this.hfout = 'test';
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'hf-app',
                        template: "<h1>hence-FORTH</h1>\n    <p>A browser-based <em>modified</em> FORTH programming language interpretor, with an eye to the future, and nod to the past.</p>\n    <terminal (stdIn)=\"run($event)\" [stdOut]=\"hfout\" [stdError]=\"errorMessage\">terminal is loading...</terminal>\n    <p>outer code is {{current_code}}\n    <hf-stack-view [stack]=\"hf_interp.data.stack\"> </hf-stack-view>\n    ",
                        directives: [terminal_1.Terminal, hf_stack_viewer_1.StackView]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.hence-forth.js.map