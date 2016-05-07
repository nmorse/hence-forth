System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Stack, Queue2, Queue, Item, HenceForth;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
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
            Queue2 = (function () {
                function Queue2() {
                    this.queue = [];
                    this.offset = 0;
                }
                Queue2.prototype.add = function (item) {
                    this.queue.push(item);
                };
                Queue2.prototype.remove = function () {
                    var len = this.queue.length;
                    if (len === 0) {
                        return undefined;
                    }
                    var item = this.queue[this.offset];
                    // increment offset, remove the free space
                    this.offset += 1;
                    if (this.offset * 2 >= len) {
                        this.queue = this.queue.slice(this.offset);
                        this.offset = 0;
                    }
                    return item;
                };
                Queue2.prototype.shove = function (art) {
                    for (var _i = 0, art_1 = art; _i < art_1.length; _i++) {
                        var a = art_1[_i];
                        this.press(a);
                    }
                };
                Queue2.prototype.press = function (art) {
                    if (this.offset > 0) {
                        this.offset -= 1;
                        this.queue[this.offset] = art;
                    }
                    else {
                        this.queue.unshift(art);
                    }
                };
                Queue2.prototype.getLength = function () {
                    return (this.queue.length - this.offset);
                };
                Queue2.prototype.isEmpty = function () {
                    return (this.queue.length == 0);
                };
                return Queue2;
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
            Item = (function () {
                function Item() {
                }
                return Item;
            }());
            HenceForth = (function () {
                function HenceForth() {
                    this.stdOut = '';
                    this.stdErr = '';
                    this.dict = {
                        ".": function () {
                            this.data = [];
                        },
                        ":": function () {
                            this.user_item.name = this.token.remove();
                            this.user_item.words = [];
                            this.immediate = false;
                        },
                        ";": function () {
                            this.dict[this.user_item.name] = this.user_item.words;
                            this.immediate = true;
                        },
                        "see": function () {
                            var name = this.token.remove();
                            this.stdOut = ': ' + name + ' ' + this.dict[name].join(' ') + ' ;';
                        },
                        "+": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            this.data.push(b + a);
                        },
                        "-": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            this.data.push(b - a);
                        },
                        "*": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            this.data.push(b * a);
                        },
                        "/": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            this.data.push(b / a);
                        }
                    };
                    this.data = new Stack();
                    this.token = new Queue2();
                    this.immediate = true;
                    this.user_item = { name: '', words: [] };
                }
                HenceForth.prototype.parse = function (input) {
                    this.token = new Queue2();
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
                    var t = '';
                    while (t = this.token.remove()) {
                        if (!this.immediate && t !== ';') {
                            this.user_item.words.push(t);
                        }
                        else if (this.isNumeric(t)) {
                            this.data.push(+t);
                        }
                        else if (this.isString(t)) {
                            // clean the double quotes
                            t = t.slice(1, -1);
                            this.data.push(t);
                        }
                        else if (t in this.dict) {
                            if (lang_1.isFunction(this.dict[t])) {
                                this.dict[t].call(this);
                            }
                            else {
                                this.token.shove(this.dict[t]);
                            }
                        }
                    }
                };
                HenceForth.prototype.isNumeric = function (str_or_num) {
                    var dataPattern = new RegExp('^[-+]?[0-9]+\.?[0-9]*$');
                    return dataPattern.test('' + str_or_num);
                };
                HenceForth.prototype.isString = function (s) {
                    var l = s.length;
                    if (l >= 2 && s.charAt(0) === '"' && s.charAt(l - 1) === '"') {
                        return true;
                    }
                    return false;
                };
                HenceForth.prototype.getStdOut = function () {
                    var o = this.stdOut;
                    this.stdOut = '';
                    return o;
                };
                HenceForth.prototype.getStdErr = function () {
                    var e = this.stdErr;
                    this.stdErr = '';
                    return e;
                };
                return HenceForth;
            }());
            exports_1("HenceForth", HenceForth);
        }
    }
});
//# sourceMappingURL=hence-forth.js.map