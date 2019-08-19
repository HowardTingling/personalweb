let i, j;

export let double = (x) => {
	return 2 * x;
}

export let URLify = (imgPath) => {
	return 'url("' + imgPath + '")';
}

export let intToPx = (intVal) => {
	return String(intVal) + "px";
}

export let pxToInt = (pxVal) => {
	return parseInt(pxVal, 10);
}

//Lists are paired by wrapping
//return list of lists, each list contains set of coordinates, which is a pairlist
// e.g.: pairLists(3,3, true) =
//		 [ 
//		   [[1,1], [1,2], [1,3]], 
//		   [[2,1], [2,2], [2,3]], 
//		   [[3,1], [3,2], [3,3]]  
//		 ]
export let pairLists = (X, Y, vertical) => {
	//If either X or Y not a List, error
	//If length of X or Y are less than 1, error
	let retVal = [];
	if (vertical) {
		for (i = 0; i < X.length; i++) {
			let tempList = [];
			for (j = 0; j < Y.length; j++) {
				tempList.push([ X[i] , Y[j] ]);
			}
			retVal.push(tempList);
		}
	} else {
		//default horizontal: changing X
		for (i = 0; i < Y.length; i++) {
			let tempList = [];
			for (j = 0; j < X.length; j++) {
				tempList.push([ X[j] , Y[i] ]);
			}
			retVal.push(tempList);
		}
	}
	return retVal;
}

export let jQueryFlags = function() {
	this.list = {};
	this.updateObjList = (objName, boolFlag) => {
		//make sure objName is a String
		let tempFlag;
		boolFlag ? (tempFlag = true) : (tempFlag = false);
		this.objList[objName] = boolFlag;
	};
}

// e.g.: let cList = coordinateList(2, 4, 1653, 756);
// divides container into 2x4 container, returning list of list of X,Y coordinates

export let coordinateList = (dimX, dimY, containerWidth, containerHeight, vertical) => {
	//if dimX > containerWidth or dimY > containerHeight error
	//typecheck error
	let XList = [];
	let YList = [];
	let retVal = [];
	//pair every value of X with every value of Y
	if ((dimX < 1) || (dimY < 1)) {
		//error
		console.log("(X,Y) dimensions: (" + String(dimX) + "," + String(dimY) + ") impossible.");
	} else {
		let subDivHeight = (containerHeight/dimY);
		let subDivWidth = (containerWidth/dimX);
		for (i = 0; i < dimY; i++) {
			YList.push(subDivHeight * i);
		}
		for (i = 0; i < dimX; i++) {
			XList.push(subDivWidth * i);
		}
		vertical ? (retVal = pairLists(XList, YList, vertical)) : (retVal = pairLists(XList, YList));
	}
	return retVal;
}

export let setHoverAnimation = (touchedElem, affectedElem, toAnimation, fromAnimation, animationTime) => {
	touchedElem.hover(function() {
		affectedElem.stop().animate(toAnimation, animationTime);
	}, () => {
		affectedElem.stop().animate(fromAnimation, animationTime);
	});
}

export let setClickAnimation = (clickedElem, affectedElem, toAnimation, fromAnimation, animationTime) => {
	clickedElem.click(function() {
		affectedElem.css(toAnimation);
		clickedElem.off("click");
		setClickAnimation(clickedElem, affectedElem, fromAnimation, toAnimation, animationTime);
	});
}

//returns the exact middle (X, Y) point
export let getCenterCoordinates = () => {
	return [$(document).width(), $(document).height()];
}

export let verticalCenter = () => {
	return $(document).height() / 2;
}

export let horizontalCenter = () => {
	return $(document).width() / 2;	
}