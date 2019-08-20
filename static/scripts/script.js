import {setHoverAnimation, setClickAnimation, coordinateList, URLify, jQueryFlags} from "/static/scripts/auxfns.js/";
let dragReady = false;
let navUp = true;
let position = -565;
let prevPos = 0;

const initWindowEvents = () => {
	let flexcontainer = document.querySelector(".flex-container");
	window.addEventListener("mouseup", function() {
		dragReady = false;
	});
	window.addEventListener("mousemove", function(event) {
		if (dragReady == true) {
			let currPos = event.clientY;
			let move = currPos - prevPos;
			if (move < 5) {
				position = -565;
			}
			if (move > -5) {
				position = 0;
			}
			move = 0;
			if (position > 0) {		
				position = 0;
			} 
			if (position < -565) {
				position = -565;
			}
			flexcontainer.style.transform = "translateY(" + String(position) + "px)";
			prevPos = event.clientY;
		}

	});
}

const navClick = (obj) => {
	obj.addEventListener("click", function() {
		if (navUp == true) {
			$(".flex-container").css("transform", "translateY(0px)");
		} else {
			$(".flex-container").css("transform", "translateY(-565px)");
		}
		navUp = !navUp;
	});
}

const navDrag = (obj) => {
	let flexcontainer = document.querySelector(".flex-container");
	let jflexcontainer = $(".flex-container");
	obj.setAttribute("draggable", "true");
	jQuery(obj).on("dragstart", function() {
		return false;
	});
	obj.addEventListener("mousedown", function(event) {
		dragReady = true;
	});
	obj.addEventListener("click", function(event) {
		if (navUp == true) {
			jflexcontainer.css("transform", "translateY(0%)");
			position = 0;
		} else {
			jflexcontainer.css("transform", "translateY(-90%)");
			position = -90;
		}
		navUp = !navUp;
	});
}
const stopVideo = () => {
	let videos = document.querySelectorAll(".music-video");
	for (let i = 0; i < videos.length; i++) {
		videos.item(i).currentTime = 0;
		videos.item(i).pause();
	}
}

const hideAll = () => {
	//find all page elements, hide them
	stopVideo();
	let pageElems = $(".page-contents");
	for (let i = 0; i < pageElems.length; i++) {
		jQuery(pageElems[i]).hide();
	}
}

const displayPage = (pageID) => {
	hideAll();
	$(pageID).show();
}


const pagesInit = () => {
	hideAll();
}

const navInit = () => {
	let bubbleElems = $(".flex-bubble");
	let textElems = $(".flex-text");
	let pageElems = $(".page-contents");
	let flexcontainer = document.getElementsByClassName("flex-container")[0];
	let jflexcontainer = $(".flex-container");
	let bgList = [];
	bgList.push("static/images/book_bg0.jpg");
	bgList.push("static/images/piano_bg0.jpg");
	bgList.push("static/images/portfolio0.png");
	bgList.push("static/images/me_close0.jpg");	
	for (let i = 0; i < bubbleElems.length; i++) {
		let touchedElem = jQuery(bubbleElems[i]);
		let affectedElem = jQuery(textElems[i]);
		touchedElem.css("background-image", URLify(bgList[i]));
		touchedElem.css("background-size", "cover");
		let fromAnimation = { 
			"opacity": 0
		};
		let toAnimation = {
 				"opacity": 1
		};
		touchedElem.on("dragstart", function() {
			return false;
		});
		affectedElem.on("dragstart", function() {
			return false;
		});
		setHoverAnimation(touchedElem, touchedElem, toAnimation, fromAnimation, 400);
		setHoverAnimation(touchedElem, affectedElem, {"opacity":0.2}, {"opacity":1, "color":"yellow"}, 100);
		setHoverAnimation(affectedElem, affectedElem, {"opacity":0.2}, {"opacity":1, "color":"yellow"}, 100);
	}
	$("#about").on("click", function() {
		displayPage("#about-descr");
	});
	$("#portfolio").on("click", function() {
		displayPage("#port-descr");
	});
	$("#writing").on("click", function() {
		displayPage("#writing-descr");
	});
	$("#music").on("click", function() {
		displayPage("#music-descr");
	});
	setHoverAnimation($("#explore"), $("#explore"), {"opacity": 0.2}, {"opacity":1}, 300);
	navDrag(document.getElementById("music"));
	navDrag(document.getElementById("explore"));
	navDrag(document.getElementById("portfolio"));
	navDrag(document.getElementById("about"));
	navDrag(document.getElementById("writing"));
	navDrag(document.getElementById("music-text"));
	navDrag(document.getElementById("port-text"));
	navDrag(document.getElementById("writing-text"));
	navDrag(document.getElementById("about-text"));
	navDrag(flexcontainer);
	navClick(document.getElementById("explore"));
}

$(document).ready(function(){
	initWindowEvents();
	pagesInit();
	navInit();
});