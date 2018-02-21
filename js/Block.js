function Block(pCell, level){
	this.pCell = pCell;
	this.edge = this.pCell.edge;
	this.border = this.pCell.border;
	this.node = null;
	this.level = 0;
	this.changedTurn = 1;
	
	//assist
	var self = this;

	this.init = function(level){
		var _info = __BlockInfo.getInfo(level);
		if (!_info) {
			alert('炸了');
		}
		var _point = _info.point;

		//var _indexNumber = "x:"+self.pCell.x + "\ny:"+self.pCell.y;
		//var _node = $('<div class="block_div"><p>'+ _indexNumber +'</p></div>');
		
		var _node = $('<div class="block_div"><p>'+ _point +'</p></div>');
		_node.css({
			"top": function(){
				return self.border + (self.pCell.y + 0.5) * self.edge;
			},
			"left": function(){
				return self.border + (self.pCell.x + 0.5) * self.edge;
			},
			"width": 	"0px",
			"height": 	"0px",
			"background-color" : _info.bgColor,
			"color" : _info.textColor
		})

		var _fontSize = 50;
		_node.children('p').css({
			"top": "0px",
			"left": "0px",
			"width": "0px",
			"height": "0px",
			"fontSize": "10px"
		})

		//入场动画
		var _top = self.border + self.pCell.y * self.edge;
		var _left = self.border + self.pCell.x * self.edge;
		_node.animate({
			"top": _top,
			"left": _left,
			"width": self.edge,
			"height": self.edge,
		},
		400
		)

		_node.children('p').animate({
			"top": (self.edge - _fontSize) / 2 - 5,
			"left": "0px",
			"width": self.edge,
			"height": _fontSize,
			"fontSize": _fontSize,
			"color" : _info.textColor
		})

		//注册changedTurn
		self.changedTurn = -1;
		//注册level
		self.level = level;
		//注册node
		self.node = _node;
	}


	this.slideAnimate = function(pEndCell, callback){
		var _distance = Math.abs(pEndCell.x - self.pCell.x) + Math.abs(pEndCell.y - self.pCell.y);
		var _time = _distance * 70;
		// alert("****************************************");
		// alert("x: "+ Math.abs(pEndCell.x - self.pCell.x));
		// alert("y: "+ Math.abs(pEndCell.y - self.pCell.y));
		var _callback = callback || function(){alert('No callback.')};
		this.node.animate(
		{
			'left' : pEndCell.node.css("left"),
			'top' : pEndCell.node.css("top"),
		},
		_time,
		"swing",
		_callback()
		)
	}

	this.levelUp = function(){
		self.level++;
		var _level = self.level;
		var _info = __BlockInfo.getInfo(_level);
		self.changedTurn = self.pCell.pContainer.turn;
		self.node.children('p').html(_info.point);
		self.node.css({
			"background-color" : _info.bgColor,
			"color" : _info.textColor
		})
	}

	this.removeNode = function(){
		self.node.remove();
		self.node = null;
	}

	this.init(level);
}