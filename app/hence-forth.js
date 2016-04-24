System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Stack, Queue, HenceForth;
    return {
        setters:[],
        execute: function() {
            Stack = (function () {
                function Stack() {
                    this.stack = [];
                }
                Stack.prototype.push = function (art) {
                    this.stack.push(art);
                };
                Stack.prototype.pop = function () {
                    return this.stack.pop();
                };
                return Stack;
            }());
            Queue = (function () {
                function Queue() {
                }
                Queue.prototype.add = function (art) {
                    this.q.unshift(art);
                };
                Queue.prototype.remove = function () {
                    return this.q.pop();
                };
                Queue.prototype.shove = function (art) {
                    this.q.push(art);
                };
                return Queue;
            }());
            HenceForth = (function () {
                function HenceForth() {
                    this.dict = {};
                    this.data = new Stack();
                    this.token = [];
                }
                HenceForth.prototype.parse = function (input) {
                    var tokens = input.split(' ');
                    var inStr = false;
                    var s = "";
                    for (var t in tokens) {
                        var l = t.length;
                        if (inStr) {
                            s += t;
                            t = "";
                            if (t.charAt(l - 1) === '"') {
                                inStr = false;
                                t = s;
                            }
                        }
                        if (t.charAt(0) === '"') {
                            inStr = true;
                            s = t;
                            t = "";
                        }
                    }
                    this.token = tokens;
                };
                HenceForth.prototype.run = function () {
                    var mode = 'immediate';
                    for (var t in this.token) {
                        var this_t = this.token[t];
                        var ty = typeof this_t;
                        //alert(ty);
                        if (typeof +this_t === 'number') {
                            this.data.push(this_t);
                        }
                        else if (this_t in this.dict) {
                            // if this.dict[t] is a function
                            //     call it
                            // if this.dict[t] is an array
                            //     shove it on the token list
                            this.token.push(this.dict[this_t]);
                            console.log(this_t);
                        }
                    }
                };
                return HenceForth;
            }());
            exports_1("HenceForth", HenceForth);
        }
    }
});
//# sourceMappingURL=hence-forth.js.map