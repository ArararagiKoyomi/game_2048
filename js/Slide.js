function applySlide(param){
	if (param.node == null) {
		alert("Node is essential! Please check!")
		return;
	}
	var _node = param.node;
	var _slideLeftFun = param.slideLeftFun || function(){alert('Left')};
	var _slideRightFun = param.slideRightFun || function(){alert('Right')};
	var _slideUpFun = param.slideUpFun || function(){alert('Up')};
	var _slideDownFun = param.slideDownFun || function(){alert('Down')};


	var _downPosX = 0;
	var _downPosY = 0;
	var _isMouseDown = false;

	_node.mousedown(function(e){
		_downPosX = e.pageX;
		_downPosY = e.pageY;
		_isMouseDown = true;
	});

	$('body').mouseup(function(e){
		if (!_isMouseDown) {
			return;
		}
		var _upPosX = e.pageX;
		var _upPosY = e.pageY;
		if (_downPosX < 0 || _downPosY < 0) return;

		var vectorX = _upPosX - _downPosX;
		var vectorY = _upPosY - _downPosY;

		//alert('Vector: X_'+ vectorX + '  Y_'+vectorY);

		if (Math.abs(vectorX) > Math.abs(vectorY)) {
			//横向矢量比纵向大
			if (vectorX > 0) {
				_slideRightFun();
			}
			else if (vectorX < 0) {
				_slideLeftFun();
			}
		}
		else{
			//横向矢量比纵向小
			if (vectorY > 0) {
				_slideDownFun();
			}
			else if (vectorY < 0) {
				_slideUpFun();
			}
		}

		//end to init
		_isMouseDown = false;
		_downPosX = -1;
		_downPosY = -1;
	});
}