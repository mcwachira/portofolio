function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return pageYOffset;
    } else {
        var B = document.body; //IE 'quirks'
        var D = document.documentElement; //IE with doctype
        D = (D.clientHeight) ? D : B;
        return D.scrollTop;
    }
}

var timeouts = [];
var scrolling = false;
var scroller;
var scrollTop = getScrollTop();
var timeMs;
var alter = false;
var speed = 5;
window.onscroll = function() {
    if(alter) {
        var timeDif = new Date().getMilliseconds() - timeMs;
        speed = 5 - (timeDif / 50);
        console.log(speed);
    }
    timeMs = new Date().getMilliseconds();
    alter = !alter;
    var scrollDirection = getScrollTop() - scrollTop;
    scrollDirection = scrollDirection / Math.abs(scrollDirection);
    scrollTop = getScrollTop();
    clearTimeout(scroller);
    scroller = setTimeout(function(){
        console.log('smooth scrolling active');
        if(!scrolling) {
            timeouts.length = 0;
            scrolling = true;
            var steps = 50;
            var delay = 6;
            for(var i = 0; i < steps; i++) {
                (function(i){
                    var timeout = setTimeout(function(){
                        var perc = i / steps; 
                        var val = (perc == 1) ? 1 : (-Math.pow(2, -10 * perc) + 1); 
                        var scrollY = val * speed * scrollDirection;
                        window.scrollTo(0, getScrollTop() + scrollY);
                        setTimeout(function(){
                            if(i == (steps - 1)) scrolling = false;
                        }, steps * delay);
                    }, (i * delay));
                    timeouts.push(timeout);
                })(i);
            }
        }
    }, 50);
};