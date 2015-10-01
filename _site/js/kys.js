window.onload = function() {
    kysInit();
}



function nav() {
    var windowloc = window.pageYOffset + screenPlower;
    //console.log('page: ' + window.pageYOffset + " plow: " + screenPlower);
    if (windowloc > firstNav && fixedNavState === 0) {
        document.getElementById('fixed-nav').className = 'fixed-nav fixed-nav-fixed';
        fixedNavState = 1;
    } else if (windowloc < firstNav && fixedNavState === 1) {
        document.getElementById('fixed-nav').className = 'fixed-nav fixed-nav-absolute';
        fixedNavState = 0;
        removeAllClass('active-nav');
    }
    navLocator();
}

function navLocator() {
    var currentFocus = document.elementFromPoint(elementFromPointXLocation, (screenHeight * 0.35)).parentNode;
    console.log('lastFocus: '+lastFocus + " currentFocus: " + currentFocus.id);
    //if text-box div contains nav-locator
    if (currentFocus.classList.contains('nav-locator') && lastFocus != currentFocus.id) {
        //save li object from fixed-nav
        var currElm = document.getElementById(currentFocus.id + '-nav');
        //if the elms nav-master is .active, do nothing
        if (document.querySelector('li.' + currElm.parentNode.id + '.active-nav')) {
            //if it's not active, check if there are any others that have it
        } else {
            //if other nav-masters have .active. remove.
            if (document.querySelector('#fixed-nav>ul>li.active-nav')) {
                navExtend(document.querySelector('#fixed-nav>ul>li.active-nav').nextElementSibling.id, document.querySelector('#fixed-nav>ul>li.active-nav'));
                //and add to current elms navigation
                navExtend(currElm.parentNode.id, currElm.parentNode.previousElementSibling);
            } else {
                //or just add to nav.li
                navExtend(currElm.parentNode.id, currElm.parentNode.previousElementSibling);
            }
        }


        console.log(currElm);

        //remove all active-nav from nav li (from siblings)
        if (document.querySelector('#fixed-nav>ul>ul>li.active-nav')) {
            document.querySelector('#fixed-nav>ul>ul>li.active-nav').className -= 'active-nav';
        }
        console.log(currElm.classList);
        currElm.className = "active-nav";


    }
    lastFocus = currentFocus.id;

}






var lastFocus;
var fixedNavState = 0;
var screenHeight;
var firstNav;
var screenPlower;
var elementFromPointXLocation;
// var textArray;
var textRangesArray = [];
//for styling, delete after
var navTop = 0.3;


function kysInit() {
    lastFocus = 'none';
    // textArray = document.getElementsByClassName('nav-locator');
   	elementAligning();
    nav();
    window.onresize = elementAligning;
    window.onscroll = nav;
}

function navExtend(arg1, clr) {
    var elm = document.getElementById(arg1);
    removeAllClass('active-nav');
    elm.classList.toggle("active-nav");
    clr.classList.toggle('active-nav');
}



function removeAllClass(arg1) {
    var elm = document.querySelectorAll('.' + arg1);
    [].forEach.call(elm, function(el) {
        el.classList.remove(arg1);
    });

}

function elementAligning() {
    screenHeight = window.innerHeight;
    var screenWidth = window.innerWidth;
    screenPlower = screenHeight * navTop;
    firstNav = document.getElementById('vidausorganai').offsetTop;
    document.getElementById('fixed-nav').style.top = firstNav + 'px';

    if (screenWidth > 1200) {
        var leftMargin = ((screenWidth - 1200) / 2) - 16;
        console.log(leftMargin);
        document.getElementById('fixed-nav').style.left = leftMargin + 900 + 'px';
        document.getElementById('fixed-nav').style.width = 300 + 'px';

        elementFromPointXLocation = leftMargin + 100;

    } else {

        document.getElementById('fixed-nav').style.left = ((screenWidth * 0.73)) + 'px';
        document.getElementById('fixed-nav').style.width = (screenWidth - (screenWidth * 0.73)) + 'px';
        elementFromPointXLocation = screenWidth * 0.1;



    }


}
