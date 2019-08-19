import {setHoverAnimation, setClickAnimation, coordinateList, URLify, jQueryFlags} from "/static/scripts/auxfns.js/";

const stopVideo = () => {
	let videos = document.querySelector(".music-video");
	videos.currentTime = 0;
	videos.pause();
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
	setClickAnimation($("#explore"), $(".flex-container"), {"transform": "translateY(0%)"}, {"transform": "translateY(-90%)"}, 400);
	setClickAnimation($("#explore-text"), $(".flex-container"), {"transform": "translateY(0%)"}, {"transform": "translateY(-90%)"}, 400);
	setHoverAnimation($("#explore"), $("#explore"), {"opacity": 0.2}, {"opacity":1}, 300);
}

$(document).ready(function(){
	pagesInit();
	navInit();
});