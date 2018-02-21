function random(min, max){
	var range = max - min;
	var result = Math.random() * (range + 1);
	return parseInt(result + min);
}

function random(max){
	var range = max;
	var result = Math.random() * (range + 1);
	return parseInt(result);
}