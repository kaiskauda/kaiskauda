var fixedTrap;
var headerState = 0;

fixedTrap= document.querySelector("section").offsetTop;
fixedNav();
window.addEventListener("scroll", fixedNav);


function fixedNav (){
	var windowLoc = window.pageYOffset;
	if ((windowLoc > fixedTrap) && (headerState === 0) ) {
		document.getElementById('header-fixed').classList.toggle("active");
		headerState = 1;
	} else if((windowLoc < fixedTrap) && (headerState === 1) ){
		document.getElementById('header-fixed').classList.toggle("active");
		headerState = 0;
	}
}
