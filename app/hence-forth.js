System.register([], function(exports_1) {
    "use strict";
    var Stack, Queue, HenceForth;
    return {
        setters:[],
        execute: function() {
            Stack = (function () {
                function Stack() {
                }
                Stack.prototype.push = function (art) {
                    this.stack.push(art);
                };
                Stack.prototype.pop = function () {
                    return this.stack.pop();
                };
                return Stack;
            })();
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
            })();
            HenceForth = (function () {
                function HenceForth() {
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
                };
                HenceForth.prototype.run = function () {
                    var mode = 'immediate';
                    for (var t in this.token) {
                        if (+t === t * 1) {
                            this.data.push(t);
                        }
                        else if (t in this.dict) {
                            // if this.dict[t] is a function
                            //     call it
                            // if this.dict[t] is an array
                            //     shove it on the token list
                            this.token.shove(t);
                        }
                    }
                };
                return HenceForth;
            })();
            exports_1("HenceForth", HenceForth);
        }
    }
});
//# sourceMappingURL=hence-forth.js.map