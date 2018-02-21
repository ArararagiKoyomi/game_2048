function PointBoard(pContainer){
	this.pContainer = pContainer;
	this.scoreAddList = new Array();
	this.score = 0;
	this.highest = getCookie('highest') || 0;
	this.scoreTextNode = null;
	this.scorePointNode = null;
	this.hightestTextNode = null;
	this.hightestPointNode = null;
	//assist
	var self = this;

	this.init = function(){
		var _node = $('<div id="game_point_board"></div>');
		var _fatherNode = $('#title_div');
		_fatherNode.append(_node);

		//initScore
		self.score = 0;

		//Score
		var _nowSocreNode = $('<p id="game_point_now">SCORE: </p>');
		_nowSocreNode.css({
			"position": "absolute",
			"fontSize": "3rem",
			"padding" : "0",
			"margin"  : "0",
			"color"   : "white",
			"top"	  : "0",
			"height"  : "3rem",
			"left"    : "0"
		})
		_node.append(_nowSocreNode);
		self.scoreTextNode = _nowSocreNode;

		//Score--Point
		var _nowPointNode = $('<p id="game_point_now_">'+self.score+'</p>');
		_nowPointNode.css({
			"position": "absolute",
			"fontSize": "3rem",
			"padding" : "0",
			"margin"  : "0",
			"color"   : "white",
			"top"	  : "0",
			"height"  : "3rem",
			"left"    : "12rem",
			"width"   : "16rem",
			"text-align" : "left"
		})
		_node.append(_nowPointNode);
		self.scorePointNode = _nowPointNode;

		// ********************************************************************************************************************
		//Highest Score
		var _highSocreNode = $('<p id="game_point_highest">HIGHEST: </p>');
		_highSocreNode.css({
			"position": "absolute",
			"fontSize": "2.3rem",
			"padding" : "0",
			"margin"  : "0",
			"color"   : "white",
			"top"	  : "3rem",
			"margin-top": "40px",
		})
		_node.append(_highSocreNode);
		self.hightestTextNode = _highSocreNode;

		//Score--Point
		var _highestPointNode = $('<p id="game_point_highest_">'+self.highest+'</p>');
		_highestPointNode.css({
			"position": "absolute",
			"fontSize": "2.3rem",
			"padding" : "0",
			"margin"  : "0",
			"color"   : "white",
			"top"	  : "3rem",
			"margin-top": "40px",
			"height"  : "3rem",
			"left"    : "12rem",
			"width"   : "16rem",
			"text-align" : "left"
		})
		_node.append(_highestPointNode);
		self.hightestPointNode = _highestPointNode;
	}

	this.addScore = function(pNewCell){
		var _scoreAdded = __BlockInfo.getPoint(pNewCell.pBlock.level);
		if (!_scoreAdded) {
			alert('Error!');
			return;
		}
		var _listSize = self.scoreAddList.length;
		self.scoreAddList.push(_scoreAdded);
		if (_listSize == 0) {
			self.changeScore();
		}
	}

	this.changeScore = function(){
		alert("___List Length:" +self.scoreAddList.length);
		if (self.scoreAddList.length == 0) {
			return;
		}
		var _scoreAdded = self.scoreAddList.splice(0,1);
		alert("Add Score:"+ _scoreAdded);
		
		//score
		var _newScore = parseInt(self.score)+parseInt(_scoreAdded);
		self.score = _newScore;
		if (self.score > self.highest) {
			self.changeHighest();
		}

		//animate
		//init
		if (self.scorePointNode.hasClass("rotateOut")) {
			self.scorePointNode.removeClass("rotateOut");
		}
		if (self.scorePointNode.hasClass("rotateIn")) {
			self.scorePointNode.removeClass("rotateIn");
		}

		//do it
		self.scorePointNode.addClass("rotateOut");
		setTimeout(function(){
			self.scorePointNode.html(_newScore);
			self.scorePointNode.addClass("rotateIn");
			setTimeout(function(){
				self.changeScore();
			},
			200
			);
		},
		200
		);
		
		
	}

	this.changeHighest = function(){
		if (self.highest >= self.score) {
			return;
		}
		self.highest = self.score;
		var _newScore = self.highest;
		
		//注册cookie的值
		//$.cookie('highest', _newScore);
		setCookie('highest', _newScore, 3650);

		//animate
		//init
		if (self.hightestPointNode.hasClass("rotateOut")) {
			self.hightestPointNode.removeClass("rotateOut");
		}
		if (self.hightestPointNode.hasClass("rotateIn")) {
			self.hightestPointNode.removeClass("rotateIn");
		}

		//do it
		self.hightestPointNode.addClass("rotateOut");
		setTimeout(function(){
			self.hightestPointNode.html(_newScore);
			self.hightestPointNode.addClass("rotateIn");
		},
		200
		);
		
	}

	this.clearScore = function(){
		self.score = 0;
		self.scorePointNode.html(self.score);
	}

	self.init();
}