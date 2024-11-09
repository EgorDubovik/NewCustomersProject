/*! Drum.JS - v0.1dev - 2014-01-09
 * http://mb.aquarius.uberspace.de/drum.js
 *
 * Copyright (c) 2013 Marcel Bretschneider <marcel.bretschneider@gmail.com>;
 * Licensed under the MIT license */

(function($) {
    "use strict";

    var DrumIcon = (function () {
        var svgelem = function (tagName) {
            return document.createElementNS("http://www.w3.org/2000/svg", tagName);
        };
        var svgcanvas = function (width, height) {
            var svg = $(svgelem("svg"));
            $(svg).attr("width", width);
            $(svg).attr("height", height);

            var g = $(svgelem("g"));
            $(svg).append(g);

            return svg;
        };
        var container = function (className) {
            var container = document.createElement("div");
            $(container).attr("class", className);
            var inner = document.createElement("div");
            $(container).append(inner);
            return container;
        };
        var path = function (settings) {
            var p = $(svgelem("path"));
            var styles = {
                "fill" : "none",
                "stroke" : settings.dail_stroke_color,
                "stroke-width" : settings.dail_stroke_width + "px",
                "stroke-linecap" : "butt",
                "stroke-linejoin" : "miter",
                "stroke-opacity": "1"
            };
            var style = "";
            for (var i in styles) {
                $(p).attr(i, styles[i]);
            }
            return p;
        };
        return {
            up : function (settings) {
                var width = settings.dail_w;
                var height = settings.dail_h;

                var svg = svgcanvas(width, height);
                var p = path(settings);

                $(p).attr("d", "m0," + (height + settings.dail_stroke_width) + "l" + (width/2) + ",-" + height + "l" + (width/2) + "," + height);
                $(svg).find("g").append(p);

                var cont = container("dial up");
                $(cont).find("div").append(svg);
                return cont;
            },
            down : function (settings) {
                var width = settings.dail_w;
                var height = settings.dail_h;

                var svg = svgcanvas(width, height);
                var p = path(settings);

                $(p).attr("d", "m0,-" + settings.dail_stroke_width + "l" + (width/2) + "," + height + "l" + (width/2) + ",-" + height);
                $(svg).find("g").append(p);

                var cont = container("dial down");
                $(cont).find("div").append(svg);
                return cont;
            }
        };
    })();

    var PanelModel = function (index, data_index, settings)
    {
        this.index = index;
        this.dataModel = new (function (data, i) {
            this.data = data;
            this.index = i;
            this.getText = function () {
                return this.data[this.index];
            };
        })(settings.data, data_index);

        this.init = function () {

            this.angle = settings.theta * index;
            this.elem = document.createElement('figure');
            $(this.elem).addClass('a' + this.angle*100);
            $(this.elem).css('opacity', '0.5');
            $(this.elem).css(
                settings.transformProp,
                settings.rotateFn + '(' + -this.angle + 'deg) translateZ(' + settings.radius + 'px)'
            );
            this.setText();
        };
        this.setText = function () {
            $(this.elem).text(this.dataModel.getText());
        };
        this.update = function (data_index) {
            if (this.dataModel.index != data_index) {
                this.dataModel.index = data_index;
                this.setText();
            }
        };
    };

    var DataPicker = function (element, options, transformProp){
        var settings = $.extend({

        }, options || {});
        var month =  ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var minutes = ['00', '15','30','45'];
        var last_selected_day = null;
        var HTMLselect = element;
        let drumMonth, drumDay, drumYer, drumHour, drumMinute, drumAmPM;
        var getDays = function (month, yer){
            var r = [];
            var days = new Date(yer,month+1,0).getDate();
            for (var i = 1; i<=days; i++) r.push(i);
            return r;
        };

        var getYers = function (){
            var now = new Date();
            var yerNow = now.getFullYear();
            var r = [];
            for (var i = yerNow-10; i <= yerNow+10; i++) r.push(i);
            return r;
        }
        var viewAndSetDate = function (date){
            var d = month[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear();
            HTMLselect.find('.view_selected_date_time .date').html((d));

            var t = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            HTMLselect.find(".view_selected_date_time .time_from").html(t);

            //HTMLselect.find('.input_time_from').val(d +" "+date.getHours()+":"+date.getMinutes());
            if (settings.onChange) {
                settings.onChange(date);
            }
        }

        var createConteiner = function (cssClass){
            var c = document.createElement( "div" );
            $(c).addClass("data_picker");
            $(c).attr('id', cssClass);
            HTMLselect.find('.date_wrapper').append(c);
            return c;
        }

        var monthConteiner = createConteiner("drum_month");
        var daysConteiner = createConteiner("drum_date");
        var yersConteiner = createConteiner("drum_fullYear");

        // Timer Pickek
        var textFromConteiner = createConteiner("drum_text");
        $(textFromConteiner).html("Time: ");
        var timeFromConteiner = createConteiner("drum_hours");
        var minuteFromConteiner = createConteiner("drum_minutes");
        var ampmFromConteiner = createConteiner("drum_ampms");

        var now = new Date();
        now.setSeconds(0);

        drumMonth = new Drum(monthConteiner, {
            onChange : function (month){
                now.setMonth(month);
                var days = getDays(month, now.getFullYear());
                drumDay = new Drum(daysConteiner, {
                    onChange : function (day){
                        now.setDate(day+1);
                        viewAndSetDate(now);
                        last_selected_day = day;
                    }
                }, transformProp, days, (last_selected_day!=null) ? last_selected_day : now.getDate()-1);
            }
        }, transformProp, month, now.getMonth());

        var yers = getYers();
        drumYer = new Drum(yersConteiner, {
            onChange : function (yer){
                now.setFullYear(yers[yer]);
                viewAndSetDate(now);
            }
        }, transformProp, yers, 10);

        var sethour = now.getHours();
        var ampm = (sethour >= 12) ? 1 : 0;
        sethour = sethour % 12;
        sethour = sethour ? sethour : 12;
        drumHour = new Drum(timeFromConteiner, {
            onChange : function (hour){
                var dhour = (ampm == 1 && hour != 11) ? 12 : 0;
                if (ampm == 0 && hour == 11) dhour = -12;
                now.setHours(hour+1+dhour);
                viewAndSetDate(now);
            }
        }, transformProp, hours,sethour-1);

        now.setMinutes(0);
        drumMinute = new Drum(minuteFromConteiner, {
            onChange : function (minuteIndex){
                now.setMinutes(minutes[minuteIndex]);
                viewAndSetDate(now);
            }
        }, transformProp, minutes, 0);
        var ampmList = ["AM", "PM"];
        drumAmPM = new Drum(ampmFromConteiner, {
            onChange : function (ampmIndex){
                if (ampm != ampmIndex) {
                    if (ampmIndex == 0 && now.getHours() >= 12) now.setHours(now.getHours() - 12);
                    if (ampmIndex == 1 && now.getHours() <= 12) now.setHours(now.getHours() + 12);
                    ampm = ampmIndex;
                    viewAndSetDate(now);
                }
            }
        }, transformProp, ampmList, ampm);

        this.setDateTime = function (date){
            drumMonth.setIndex(date.getMonth());
            yers.forEach((yer,index) => {
                if (yer == date.getFullYear()){
                    drumYer.setIndex(index);
                }
            });
            drumDay.setIndex(date.getDate()-1);
            var geth = date.getHours();
            var getampm = (geth >= 12) ? 1 : 0;
            geth = geth % 12;
            geth = geth ? geth : 12;
            drumHour.setIndex(geth-1);
            drumAmPM.setIndex(getampm);
            //viewAndSetDate(date);
        }
    };

    var Drum = function(element, options, transformProp, data, selectIndex)
    {
        var HTMLselect = element;
        var obj = this;
        var settings = $.extend({
            panelCount : 16,
            rotateFn : 'rotateX',
            interactive: true,
            dail_w: 20,
            dail_h: 5,
            dail_stroke_color: '#999999',
            dail_stroke_width: 1,
            data : data,
        }, options || {});

        settings.transformProp = transformProp;
        settings.rotation = 0;
        settings.distance = 0;
        settings.last_angle = 0;
        settings.theta = 360 / settings.panelCount;

        settings.initselect = selectIndex;

        var wrapper = document.createElement( "div" );
        $(wrapper).addClass("drum-wrapper");
        $(HTMLselect).html(wrapper);

        var inner = document.createElement("div");
        $(inner).addClass("inner");
        $(inner).appendTo(wrapper);

        var container = document.createElement( "div" );
        $(container).addClass("container");
        $(container).appendTo(inner);

        var drum = document.createElement( "div" );
        $(drum).addClass("drum");
        $(drum).appendTo(container);

        if (settings.interactive === true) {
            var dialUp = DrumIcon.up(settings);
            $(wrapper).append(dialUp);

            var dialDown = DrumIcon.down(settings);
            $(wrapper).append(dialDown);

            $(wrapper).hover(function () {
                $(this).find(".up").show();
                $(this).find(".down").show();
            }, function () {
                $(this).find(".up").hide();
                $(this).find(".down").hide();
            });
        }

        settings.radius = Math.round( ( $(drum).height() / 2 ) / Math.tan( Math.PI / settings.panelCount ) );
        settings.mapping = [];
        var c = 0;
        for (var i=0; i < settings.panelCount; i++) {
            if (settings.data.length == i) break;
            var j = c;
            if (c >= (settings.panelCount / 2)) {
                j = settings.data.length - (settings.panelCount - c);
            }
            c++;

            var panel = new PanelModel(i, j, settings);
            panel.init();
            settings.mapping.push(panel);

            $(drum).append(panel.elem);
        }

        var getNearest = function (deg) {
            deg = deg || settings.rotation;
            var th = (settings.theta / 2);
            var n = 360;
            var angle = ((deg + th) % n + n) % n;
            angle = angle - angle % settings.theta;
            var l = (settings.data.length - 1) * settings.theta;
            if (angle > l) {
                if (deg > 0) return l;
                else return 0;
            }
            return angle;
        };
        var getSelected = function () {
            var nearest = getNearest();
            for (var i in settings.mapping) {
                if (settings.mapping[i].angle == nearest) {
                    return settings.mapping[i];
                }
            }
        };
        var update = function (selected) {
            var c, list = [], pc = settings.panelCount, ph = settings.panelCount / 2, l = settings.data.length;
            var i = selected.index;
            var j = selected.dataModel.index;
            for (var k=j-ph; k<=j+ph-1; k++) {
                c = k;
                if (k < 0) c = l+k;
                if (k > l-1) c = k-l;
                list.push(c);
            }
            var t = list.slice(ph-i);
            list = t.concat(list.slice(0, pc - t.length));
            for (var i=0; i<settings.mapping.length; i++) {
                settings.mapping[i].update(list[i]);
            }
        };

        var canEventChange = true;
        var transform = function() {
            $(drum).css(settings.transformProp, 'translateZ(-' + settings.radius + 'px) ' + settings.rotateFn + '(' + settings.rotation + 'deg)');

            var selected = getSelected();

            if (selected) {
                var data = selected.dataModel;

                if (settings.onChange && canEventChange)
                    settings.onChange(data.index);

                $(selected.elem).css("opacity", 1);

                $("div.figure:not(.a" + (selected.angle*100) + ", .hidden)", drum).css("opacity", "0.5");
                if (selected.angle != settings.last_angle && [0,90,180,270].indexOf(selected.angle) >= 0) {
                    settings.last_angle = selected.angle;
                    update(selected);
                }
            }
        };
        this.setIndex = function (dataindex) {
            var page = Math.floor(dataindex / settings.panelCount);
            var index = dataindex - (page * settings.panelCount);
            var selected = new PanelModel(index, dataindex, settings);
            update(selected);
            settings.rotation = index * settings.theta;
            transform();
        };

        this.setIndex(settings.initselect);

        this.getIndex = function () {
            return getSelected().dataModel.index;
        };

        if (typeof(Hammer) != "undefined") {
            settings.touch = new Hammer(wrapper, {
                prevent_default: true,
                no_mouseevents: true
            });

            settings.touch.on("dragstart", function (e) {
                settings.distance = 0;
                canEventChange = false;
            });

            settings.touch.on("drag", function (e) {
                var evt = ["up", "down"];
                if (evt.indexOf(e.gesture.direction)>=0) {
                    settings.rotation += Math.round(e.gesture.deltaY - settings.distance) * -1;
                    transform();
                    settings.distance = e.gesture.deltaY;
                }
            });

            settings.touch.on("dragend", function (e) {
                settings.rotation = getNearest();
                canEventChange = true;
                transform();
            });
        }

        if (settings.interactive) {
            $(dialUp).click(function (e) {
                var deg = settings.rotation + settings.theta + 1;
                settings.rotation = getNearest(deg);
                transform();
            });
            $(dialDown).click(function (e) {
                var deg = settings.rotation - settings.theta - 1;
                settings.rotation = getNearest(deg);
                transform();
            });
        }
    };

    var methods = {
        // getIndex : function () {
        //     if ($(this).data('drum'))
        //         return $(this).data('drum').getIndex();
        //     return false;
        // },
        // setIndex : function (index) {
        //     if ($(this).data('drum'))
        //         $(this).data('drum').setIndex(index);
        // },
        dataPicker : null,
        setDateTime : function (date){
            this.dataPicker.setDateTime(date);
        },
        init : function (self, options) {
            var transformProp = false;
            var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
            for(var i = 0; i < prefixes.length; i++) {
                if(document.createElement('div').style[prefixes[i]] !== undefined) {
                    transformProp = prefixes[i];
                }
            }
            if (transformProp) {
                this.dataPicker = new DataPicker($(self), options, transformProp);
            }
        }
    };

    $.fn.DataPicker = function(options)
    {
        this.each(function(i, el) {
            methods.init(el, options);
        });
        return methods;

    };
})(jQuery);
