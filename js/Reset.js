function Reset(pContainer){
	this.pContainer = pContainer;

	//assist
	var self = this;

	this.init = function(){
		var _node = $('<div id=""><img src="img/restart.png" width="100%" height="100%"/></div>');
		_node.css({	
			"position"	:"absolute",
			"right"		:"1rem",
			"width"		:"50px",
			"heigth"	:"50px",
			"top"		:"20px"
		});
		var _fatherNode = $('#title_div');
		_fatherNode.append(_node);

		_node.click(function(){
			__ConfirmWindow.showConfirm({
				'text':"The game will start again, and the score this round will be aborted. Would you want to continue?",
				'callback':function(){
					self.pContainer.restart();
				}
			});
		});
	}

	self.init();
}