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
                    this.q = [];
                }
                Queue.prototype.add = function (art) {
                    this.q.push(art);
                };
                Queue.prototype.remove = function () {
                    return this.q.shift();
                };
                Queue.prototype.shove = function (art) {
                    this.q.unshift(art);
                };
                return Queue;
            }());
            HenceForth = (function () {
                function HenceForth() {
                    this.dict = {};
                    this.data = new Stack();
                    this.token = new Queue();
                }
                HenceForth.prototype.parse = function (input) {
                    this.token = new Queue();
                    var tokens = input.split(' ');
                    var inStr = false;
                    var s = "";
                    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                        var t = tokens_1[_i];
                        var l = t.length;
                        if (inStr) {
                            s += ' ' + t;
                            if (t.charAt(l - 1) === '"') {
                                inStr = false;
                                this.token.add(s);
                                s = '';
                            }
                        }
                        else if (t.charAt(0) === '"') {
                            inStr = true;
                            s = t;
                            if (l >= 2 && t.charAt(l - 1) === '"') {
                                inStr = false;
                                this.token.add(s);
                                s = '';
                            }
                        }
                        else {
                            this.token.add(t);
                        }
                    }
                };
                HenceForth.prototype.run = function () {
                    var mode = 'immediate';
                    var this_t = '';
                    while (this_t = this.token.remove()) {
                        var as_int = parseInt(this_t, 10);
                        if (as_int && as_int + '' === this_t) {
                            this.data.push(this_t);
                        }
                        else if (this.isString(this_t)) {
                            // clean the double quotes
                            this_t = this_t.slice(1, -1);
                            this.data.push(this_t);
                        }
                        else if (this_t in this.dict) {
                            // if this.dict[t] is a function
                            //     call it
                            // if this.dict[t] is an array
                            //     shove it on the token list
                            this.token.shove(this.dict[this_t]);
                            console.log(this_t);
                        }
                    }
                };
                HenceForth.prototype.isString = function (s) {
                    var l = s.length;
                    if (l >= 2 && s.charAt(0) === '"' && s.charAt(l - 1) === '"') {
                        return true;
                    }
                    return false;
                };
                return HenceForth;
            }());
            exports_1("HenceForth", HenceForth);
        }
    }
});
//# sourceMappingURL=hence-forth.js.map