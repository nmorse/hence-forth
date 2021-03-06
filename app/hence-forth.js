System.register(['angular2/src/facade/lang'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var lang_1;
    var Stack, Queue, Item, HenceForth;
    return {
        setters:[
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            //import {toJson} from 'angular2/src/';
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
            // Queue fast offset pointer implimentation
            Queue = (function () {
                function Queue() {
                    this.queue = [];
                    this.offset = 0;
                }
                Queue.prototype.add = function (item) {
                    this.queue.push(item);
                };
                Queue.prototype.remove = function () {
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
                Queue.prototype.shove = function (art) {
                    // press (backpress) every element of art
                    // on the queue. art is pressed in reverse order
                    var i = art.length - 1;
                    for (; i >= 0; i -= 1) {
                        this.press(art[i]);
                    }
                };
                Queue.prototype.press = function (art) {
                    if (this.offset > 0) {
                        this.offset -= 1;
                        this.queue[this.offset] = art;
                    }
                    else {
                        this.queue.unshift(art);
                    }
                };
                Queue.prototype.getLength = function () {
                    return (this.queue.length - this.offset);
                };
                Queue.prototype.isEmpty = function () {
                    return (this.queue.length == 0);
                };
                Queue.prototype.setQ = function (arr) {
                    this.queue = arr;
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
                        "clear": function () {
                            this.data = new Stack();
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
                            var method = 'not defined';
                            if (method = this.dict[name]) {
                                if (lang_1.isFunction(this.dict[name])) {
                                    method = 'JS_function';
                                }
                                else if (this.dict[name].length) {
                                    method = this.dict[name].join(' ');
                                }
                                else {
                                    method = this.dict[name];
                                }
                            }
                            this.stdOut = ': ' + name + ' ' + method + ' ;';
                        },
                        // : swap @a pop @b pop #a push #b push ; ***
                        "swap": ["@", "a", "pop", "@", "b", "pop", "@", "a", "push", "@", "b", "push"],
                        "dup": ["@", "a", "pop", "@", "a", "push", "@", "a", "push"],
                        "drop": ["pop"],
                        "pop": function () {
                            var a = this.data.pop();
                            this.local_dict[this.local_var] = a;
                        },
                        "push": function () {
                            var a = this.local_dict[this.local_var];
                            this.data.push(a);
                        },
                        "@": function () {
                            var var_name = this.token.remove();
                            this.local_var = var_name;
                        },
                        "=": function () {
                            var key = this.data.pop();
                            var val = this.data.pop();
                            this.dict[key] = val;
                        },
                        // : a {x:5} ; a x . yeilds 5
                        ".": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            if (!this.isObject(b)) {
                                b = JSON.parse(b);
                            }
                            this.data.push(b[a]);
                        },
                        "toJson": function () {
                            var b = JSON.parse(this.data.pop());
                            this.data.push(b);
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
                            if (!this.isNumeric(b) && !this.isNumeric(a)) {
                                this.data.push([b, a, '*']);
                            }
                            else {
                                this.data.push(b * a);
                            }
                        },
                        "/": function () {
                            var a = this.data.pop();
                            var b = this.data.pop();
                            this.data.push(b / a);
                        }
                    };
                    this.local_dict = {};
                    this.local_var = "temp_var_name";
                    this.data = new Stack();
                    this.token = new Queue();
                    this.immediate = true;
                    this.user_item = { name: '', words: [] };
                }
                HenceForth.prototype.parse = function (input) {
                    this.token = new Queue();
                    var input_tokens = new Queue();
                    input_tokens.setQ(input.split(' ')); //: string[] = input.split(' ');
                    var inStr = false;
                    var s = "";
                    var t;
                    while (t = input_tokens.remove()) {
                        var l = t.length;
                        if (l > 1) {
                            // check for condenced chars that should be split
                            var result = void 0;
                            if (result = this.decondence(t)) {
                                t = result[0];
                                input_tokens.press(result[1]);
                            }
                        }
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
                HenceForth.prototype.decondence = function (t) {
                    var result = false;
                    if (t.charAt(0) === '@' || t.charAt(0) === ':') {
                        result[0] = t.charAt(0);
                        result[1] = t.substr(1);
                    }
                    return result;
                };
                HenceForth.prototype.run = function () {
                    var t = '';
                    while (t = this.token.remove()) {
                        // not "immeadiate" mode, means that we are
                        // in parsing mode
                        // and the ';' word ends parsing
                        if (!this.immediate && t !== ';') {
                            this.user_item.words.push(t);
                        }
                        else if (t in this.dict && lang_1.isFunction(this.dict[t])) {
                            this.dict[t].call(this);
                        }
                        else if (t in this.dict && this.dict[t].length) {
                            this.token.shove(this.dict[t]);
                        }
                        else {
                            // everything else goes on the stack
                            if (this.isNumeric(t)) {
                                t = +t;
                            }
                            else if (this.isString(t)) {
                                // clean the double quotes
                                t = t.slice(1, -1);
                            }
                            this.data.push(t);
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
                HenceForth.prototype.isObject = function (o) {
                    return (typeof o === 'object');
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