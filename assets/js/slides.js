(function($, Markdown) {
    var converter = new Markdown.Converter();
    var slides = [];
    var slideClasses = {};

    var Slide = function(element) {
        $.extend(this, {
            next: function() {
                return false;
            },
            prev: function() {
                return false;
            },
            resize: function(width, height) {
            }
        });
    }

    var slideshow = function(slides) {
        var currentPage = 1,
            self = this,
            pages = slides.length;
        $('body').click(function(e) {
            e.preventDefault();
            self.next();
        });
        $.extend(this, {
            goToPage: function(page) {
                if (page < 1 || page > pages) return;
                var offset = -1 * $('div.slider div').width() * (page - 1) - 1;
                $('div.slider').animate({left: offset}, 1000);
                currentPage = page;
                window.location.hash = currentPage;
            },
            next: function() {
                if (!slides[currentPage - 1].next()) {
                    this.goToPage(currentPage + 1);
                }
            },
            prev: function() {
                if (!slides[currentPage - 1].prev()) {
                    this.goToPage(currentPage - 1);
                }
            },
            resize: function() {
                $('div.slider').css({left:(-1 * $('div.slider div').width() * (currentPage - 1))});
                $.each(slides, function(idx, slide) { 
                    slide.resize($(window).width(), $(window).height());
                });
            }
        });
    }

    slideClasses.List = function(el) {
        var count = $(el).find('li').length;
        var currentItem = 0;
        $.extend(this, {
            next: function() {  
                if (currentItem >= count) return false;
                var item = $(el).find('li').get(currentItem);
                $(item).css({display: 'list-item', opacity:0}).animate({opacity: 1}, 1000);
                currentItem += 1;
                return true;
            },
            prev: function() { return false; },
            resize: function(w, h) {}
        });
    }

    slideClasses.Letters = function(el) {
        var count = $(el).find('dt').length;
        var currentItem = 0;
        $.extend(this, {
            next: function() { 
                if (currentItem >= count) return false;
                var item = $(el).find('dd').get(currentItem);
                $(item).css({display: 'block', opacity:0}).animate({opacity: 1}, 1000);
                currentItem += 1;
                return true;
            },
            prev: function() { return false; },
            resize: function(w, h) {}
        });
    }

    slideClasses.Paradigms = function(el) {
        var canvas = $(el).find('canvas')[0];
        var self = this,
            client = {width: 0, height: 0, offset: 0, center: {x:0,y:0}, scale: {x:0, y:0}},
            currentStep = 0,
            ctx = canvas.getContext('2d'),
            offset = $(canvas).offset();
    
        $(canvas).attr('width', 1200).attr('height', 900);

        ctx.font = 'bold 55px Trebuchet,Georgia,Arial,sans-serif';

        $.extend(this, {
            resize: function(width, height) {
                var min = Math.min(width, height);
                $(canvas).css({width: min * 4 / 3, height: min});
            },
            step1: function() {
                ctx.strokeStyle = '#FFFFFF';
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(600, 200, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'center';
                ctx.fillText("Object Oriented Programming", 600, 180);
            },
            step2: function() {
                   ctx.strokeStyle = '#FFFFFF';
                ctx.fillStyle = '#FFFFFF';
                   ctx.beginPath();
                ctx.arc(859, 650, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'left';
                ctx.fillText("Procedural", 840, 710);
                ctx.fillText("Programming", 800, 760);

            },
            step3: function() {
                ctx.strokeStyle = '#FFFFFF';
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(340, 650, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'right';
                ctx.fillText("Functional", 360, 710);
                ctx.fillText("Programming", 390, 760);

            },
            step4: function() {
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(600, 200);
                ctx.lineTo(859, 650);
                ctx.lineTo(340, 650);
                ctx.lineTo(600, 200);
                ctx.closePath();
                ctx.stroke();
            },
            step5: function() {
                ctx.strokeStyle = '#FF0000';
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(859, 350, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'left';
                ctx.fillText("Class", 850, 300);
                ctx.fillText("Oriented", 880, 350);
                ctx.fillText("Prog.", 900, 400);

            },
            step6: function() {
                ctx.strokeStyle = '#FF0000';
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(600, 800, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'center';
                ctx.fillText("Function Oriented Programming", 600, 850);

            },
            step7: function() {
                ctx.strokeStyle = '#FF0000';
                ctx.fillStyle = '#FF0000';
                ctx.beginPath();
                ctx.arc(340, 350, 10, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.textAlign = 'right';
                ctx.fillText("Value", 330, 310);
                ctx.fillText("Oriented", 320, 360);
                ctx.fillText("Prog.", 290, 410);

            },
            step8: function() {
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.moveTo(859, 350);
                ctx.lineTo(600, 800);
                ctx.lineTo(340, 350);
                ctx.lineTo(859, 350);
                ctx.closePath();
                ctx.stroke();
            },
            step9: function() {
                var angle = 3 * (Math.PI / 2);
                var opacity = 0;
                var interval = setInterval(function() {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = '#0000FF';
                    ctx.fillStyle = '#0000FF';
                    var newAngle = angle + (Math.PI / 50);
                    ctx.beginPath();
                    ctx.arc(600, 500, 300, angle, newAngle, false);
                    ctx.stroke();
                    angle = newAngle;
                    if (angle >= 7 * (Math.PI / 2)) {
                        self.step1();
                        self.step2();
                        self.step3();
                        self.step5();
                        self.step6();
                        self.step7();
                        clearInterval(interval);
                    }
                }, 20);
                var interval2 = setInterval(function() {
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.strokeStyle = "rgba(255, 255, 255, " + opacity + ")";
                    self.step4();
                    ctx.strokeStyle = "rgba(255, 0, 0, " + opacity + ")";
                    self.step8();
                    opacity += 0.02;
                    if (opacity >= 1.0) {
                        ctx.globalCompositeOperation = 'source-over';
                        self.step1();
                        self.step2();
                        self.step3();
                        self.step5();
                        self.step6();
                        self.step7();
                        clearInterval(interval2);
                    }
                }, 50);
            },
            next: function() {
                currentStep += 1;
                
                if (this['step' + currentStep]) {
                    this['step' + currentStep]()
                    return true;
                } else {
                    return false;
                }
            },
            prev: function() {
                return false;
            }
        });
        this.resize($(el).width(), $(el).height());

    }
    
    $(function() {
        $('.markdown').each(function() {
            var html = converter.makeHtml(normalize($(this).text())).replace(/>\s+</g, "><");
            $(this).html(html).removeClass('markdown');
        });

        $('div.slider div').each(function() {
            var classes = $(this).attr('class').split(/\s+/);
            var found = false;
            for (var i = 0; i < classes.length; i++) {
                if (slideClasses[classes[i]]) {
                    slides.push(new slideClasses[classes[i]](this));
                    found = true;
                }
            }
            if (!found) {
                slides.push(new Slide(this));
            }
        });
        var ss = new slideshow(slides);
        $('body').keydown(function(e) {
            if (e.which == 37) {
                ss.prev();
            } else if (e.which == 39) {
                ss.next();
            }
        });

        var resize = function() {
            var min = Math.min($(window).height() * 4/3, $(window).width());
            $('div.window, div.slider div').height(min * 3 / 4).width(min);
            var fontSize = (Math.min($(window).height()*4/3, $(window).width()) / 480) * 80;
            $('body').css('font-size', fontSize + '%');
            ss.resize(min, min * 3 / 4);
        };
        $(window).resize(resize);
        resize();
        $(window).hashchange(function() {
            if (document.location.hash != '' && document.location.hash != '#') {
                ss.goToPage(parseInt(document.location.hash.replace('#', '')));
            }
        });
        $(window).hashchange();
		$('code').addClass('prettyprint');
		prettyPrint();
    });
    
    function normalize(str) {
        var arr = str.replace("\r", "").split("\n");
        var minChars = str.length;
        var re1 = /^\s*/;
        var re2 = /^\s*$/;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == '' || re2.test(arr[i])) {
                arr[i] = '';  
            } else {
                arr[i] = arr[i].replace("\t", "    ");
                minChars=Math.min(re1.exec(arr[i])[0].length, minChars);
            }
        }
        var re3 = new RegExp('^\\\s{' + minChars + '}');
        for (i = 0; i < arr.length; i++) {
            arr[i] = arr[i].replace(re3, '');
        }
        return arr.join("\n");
    }
    
})(jQuery, Markdown);