function Container(fatherNode, top){
	this.fatherNode = fatherNode;
	this.top = top;
	this.width = fatherNode.width();
	this.node = new Object();
	this.cells = new Array();
	this.unusedCells = new Array();
	this.turn = 0;
	this.pPointBoard = null;
	this.pReset = null;
	//hammerAssist
	this.onPanning = false;
	//assist
	var self = this;

	//init
	this.init = function(){
		//创建新的可滑动底板
		var _node = this.newNode();
		self.fatherNode.append(_node);
		
		//注册滑动函数
		//旧版自己写的实例
		// applySlide({
		// 	node: _node,
		// 	slideLeftFun:	function(){
		// 		self.slideLeft();
		// 	},
		// 	slideRightFun: 	function(){
		// 		self.slideRight();
		// 	},
		// 	slideUpFun: 	function(){
		// 		self.slideUp();
		// 	},
		// 	slideDownFun: 	function(){
		// 		self.slideDown();
		// 	}
		// });

		//通过hammer库注册滑动操作
		var _nodeID = document.getElementById('game_slide_area');
		var _mc = new Hammer(_nodeID);
		_mc.get('swipe').set({
			direction: Hammer.DIRECTION_ALL
		});

		_mc.on("swipeleft", function(){
			self.slideLeft();
		});
		_mc.on("swiperight", function(){
			self.slideRight();
		});
		_mc.on("swipeup", function(){
			self.slideUp();
		});
		_mc.on("swipedown", function(){
			self.slideDown();
		});

		//创建4X4的格子
		self.cells = new Array();
		self.unusedCells = new Array();

		for (var x = 0; x < 4 ; ++x) {
			for (var y = 0; y < 4 ; ++y) {
				var _pCell = new Cell(self, x, y);
				self.cells.push(_pCell);
				self.unusedCells.push(_pCell);
			}
		}

		//初始化分数计数板
		var _pPointBoard = new PointBoard(self);
		self.pPointBoard = _pPointBoard;

		//初始化重置按键
		var _pReset = new Reset(self);
		self.pReset = _pReset;

		//初始化回合数
		self.turn = 1;
		alert("Now Turn:"+self.turn);

		//初始化2个新的block
		var _startBlockCount = 2;
		for (var i = 0; i < _startBlockCount; i++) {
			self.newBlock();
		}
		
	}

	this.slideLeft = function(){
		alert('left');
		this.slide({
			AxisMoving : 'x',
			AxisParallel: 'y',
			movingVector: -1,
			blockFirstIndex : 0,
			blockLastIndex : 3
		});
		alert("Now Turn:"+self.turn);
	}

	this.slideRight = function(){
		this.slide({
			AxisMoving : 'x',
			AxisParallel: 'y',
			movingVector: 1,
			blockFirstIndex : 3,
			blockLastIndex : 0
		});
		alert("Now Turn:"+self.turn);
	}

	this.slideUp = function(){
		this.slide({
			AxisMoving : 'y',
			AxisParallel: 'x',
			movingVector: -1,
			blockFirstIndex : 0,
			blockLastIndex : 3
		});
		alert("Now Turn:"+self.turn);
	}

	this.slideDown = function(){
		this.slide({
			AxisMoving : 'y',
			AxisParallel: 'x',
			movingVector: 1,
			blockFirstIndex : 3,
			blockLastIndex : 0
		});
		alert("Now Turn:"+self.turn);
	}

	this.slide = function(param){
		//从第一行开始
		var _hasBlockMoved = false;
		var _lineCount = 4;

		//init Left

		//the Axis which the block is moving toward
		//方块运动方向上的坐标轴名称
		var _AxisMoving = param.AxisMoving;

		//the Axis which the block is moving parallel with
		//方块运动方向平行的坐标轴名称
		var _AxisParallel = param.AxisParallel;
		
		//沿着运动的坐标轴的运动矢量
		var _movingVector = param.movingVector;

		//需要遍历的格子的起始编号和最终编号
		var _blockFirstIndex = param.blockFirstIndex;
		var _blockLastIndex = param.blockLastIndex;


		for (var _lineIndex = 0; _lineIndex < _lineCount; _lineIndex++) {
			//每行的格子从滑动方向的结尾开始
			for (var _blockIndex = _blockFirstIndex - _movingVector;	//init
				_blockIndex != _blockLastIndex - _movingVector;			//condition
				_blockIndex = _blockIndex - _movingVector				//step
				) 
			{
				//当前格子的x,y
				eval('var _cellPos = {\
					'+_AxisMoving+': _blockIndex,\
					'+_AxisParallel+': _lineIndex\
				}')

				var _pMovedCell = self.getCell(_cellPos);
				if (!_pMovedCell) {
					alert(_cellPos);
					alert('Error! Cell is not found!11');
					return;
				}

				if (!_pMovedCell.hasBlock()) {
					//如果格子内没有方块，则继续遍历
					continue;
				}

				//沿着运动方向依次遍历，尝试移动到cell
				var _pTargetCell = null;

				for (
					var _targetBlockPos = _blockIndex + _movingVector;
					_targetBlockPos != _blockFirstIndex + _movingVector;
					_targetBlockPos = _targetBlockPos + _movingVector
					) 
				{
					eval('var _targetCellPos = {\
						'+_AxisMoving+': _targetBlockPos,\
						'+_AxisParallel+': _lineIndex\
					}')

					_pTempCell = getCell(_targetCellPos);
					if (!_pTempCell) {
						alert(_cellPos);
						alert('Error! Cell is not found!');
						return;
					}

					if (!self.tryMergeCell(_pTempCell, _pMovedCell)) {
						//如果尝试merge失败了，则不能继续移动，跳出循环开始结算
						break;
					}
					//尝试merge成功，则继续
					_pTargetCell = _pTempCell;
					continue;
					

				}

				//结算_pTargetCell是否为null
				if (_pTargetCell == null) {
					//如果找不到_pTargetCell，则继续尝试下一个可移动的格子
					continue;
				}
				
				//如果非null，说明可以合并到这个_pTargetCell
				self.mergeCell(_pTargetCell, _pMovedCell);
				_hasBlockMoved = true;

			}
		}

		if (_hasBlockMoved) {
			self.newBlock();
			self.turn++;
		}
	}

	this.tryMergeCell = function(pTargetCell, pMergedCell){
		if (pTargetCell.pBlock == null) {
			return true;
		}
		//如果两者等级不同，则尝试合并失败
		if (pTargetCell.pBlock.level != pMergedCell.pBlock.level) {
			return false;
		}
		//如果本回合合并过，则尝试失败
		if (pTargetCell.pBlock.changedTurn == self.turn) {
			return false;
		}
		return true;
	}

	this.mergeCell = function(pTargetCell, pMergedCell){
		if (pTargetCell.pBlock == null) {
			//直接滑动
			pMergedCell.pBlock.slideAnimate(
				pTargetCell,
				function(){
					self.onMergeSucceed(pTargetCell, pMergedCell);
				}
			);
			
		}
		else {
			//覆盖目标并升级
			pMergedCell.pBlock.slideAnimate(
				pTargetCell,
				function(){
					pMergedCell.pBlock.levelUp();
					pTargetCell.removeNode();
					self.pPointBoard.addScore(pMergedCell);
					self.onMergeSucceed(pTargetCell, pMergedCell);
				}
			);
		}

	}

	this.onMergeSucceed = function(pTargetCell, pMergedCell){
		pTargetCell.inheritBlock(pMergedCell);

		//将目标格子移出unusedCells
		for (var i in self.unusedCells) {
			if (!self.compareCell(self.unusedCells[i], pTargetCell)) {
				continue;
			}
			self.unusedCells.splice(i,1);
			break;
		}

		//将被移动的格子加入unusedCells
		self.unusedCells.push(pMergedCell);
	}


	this.restart = function(){
		//清空计分板
		this.pPointBoard.clearScore();

		//清空格子
		for (var i in self.cells) {
			self.cells[i].clearBlock();
		}

		//初始化unusedCells
		self.unusedCells = new Array();
		for (var i in self.cells) {
			unusedCells.push(self.cells[i]);
		}

		//初始化回合数
		self.turn = 1;
		alert("Now Turn:"+self.turn);

		//初始化2个新的block
		var _startBlockCount = 2;
		for (var i = 0; i < _startBlockCount; i++) {
			self.newBlock();
		}
	}

	// this.slide = function(direction){
	// 	var _startX = 0;
	// 	var _startY = 0;
	// 	var _slideX = 0;
	// 	var _slideY = 0;
	// 	switch (direction) {
	// 		case 'left' 	: {_startX = 0; _startY = 0; _slideX = -1; _slideY =  0; break; }
	// 		case 'right' 	: {_startX = 4; _startY = 0; _slideX =  1; _slideY =  0; break; }
	// 		case 'up' 		: {_startX = 0; _startY = 4; _slideX =  0; _slideY = -1; break; }
	// 		case 'down' 	: {_startX = 0; _startY = 0; _slideX =  0; _slideY =  1; break; }
	// 		default: { alert('Please check'); return; }
	// 	}


	// 	//left
	// 	//从第一行开始
	// 	var _hasBlockMoved = false;

	// 	for (var y = 0; y < 4; ++y) {
	// 		//第一行的第一格开始
	// 		for (var x = 0; x < 4; ++x) {
	// 			var _pStartCell = self.getCell(x, y);
	// 			if (!_pStartCell) {
	// 				alert('Error!');
	// 			}
	// 			if (!_pStartCell.hasBlock()) {
	// 				//cell里面没有方块，则跳过这个格子
	// 				continue;
	// 			}
	// 			//如果cell里面有方块，则把他往左移动
	// 			var _endX =  x;
	// 			var _locusX = x - 1;
	// 			for (; _locusX >= 0 ; --_locusX) {
	// 				if (!self.hasBlock(_locusX, y)) {
	// 					//如果移动了一格是空格子，则尝试继续移动
	// 					_endX = _locusX;
	// 					if (_endX == 0) {
	// 						//如果最终格子变成最后一格，则直接移动
	// 						var _pEndCell = self.getCell(_endX, y);
	// 						var _callback = function(){
	// 							_pEndCell.inheritBlock(_pStartCell);
	// 						}
	// 						_pStartCell.pBlock.slideTo(_pEndCell, _callback);
	// 						_hasBlockMoved = true;
	// 						break;
	// 					}
	// 					continue;
	// 				}

	// 				//如果不是空格子，则先尝试合并
	// 				var _pEndCell = self.getCell(_locusX, y);
	// 				if (_pEndCell.tryMergeCell(_pStartCell)) {
	// 					//尝试合并成功
	// 					var _callback = function(){
	// 						_pEndCell.removeNode();
	// 						_pStartCell.pBlock.levelUp();
	// 						_pEndCell.inheritBlock(_pStartCell);
	// 					}
	// 					_pStartCell.pBlock.slideTo(_pEndCell, _callback);
	// 					_hasBlockMoved = true;
	// 					break;
	// 				}
					
	// 				//如果合并失败,那么最终目的地就是上一轮的endX
	// 				var _pEndCell = self.getCell(_endX, y);
	// 				if (self.compareCell(_pStartCell, _pEndCell)) {
	// 					//如果结束点就是开始点，那么不移动
	// 					break;
	// 				}
	// 				var _callback = function(){
	// 					_pEndCell.inheritBlock(_pStartCell);
	// 				}
	// 				_pStartCell.pBlock.slideTo(_pEndCell, _callback);
	// 				_hasBlockMoved = true;
	// 				break;
	// 			}
	// 		}
	// 	}

	// 	if (_hasBlockMoved) {
	// 		setTimeout(function(){
	// 			self.newBlock();
	// 			self.turn++;
	// 		},
	// 		1000
	// 		)
	// 	}
	// }

	this.compareCell = function(pCell_1, pCell_2){
		if (pCell_1.x != pCell_2.x) { return false };
		if (pCell_1.y != pCell_2.y) { return false };
		return true;
	}

	this.newBlock = function(){
		var _unusedCount = self.unusedCells.length;
		if (_unusedCount <= 0) {
			//没有空格子，则游戏失败
			alert('游戏结束');
		}
		var _result = random(_unusedCount -1);
		for (var i in self.unusedCells) {
			if (i < _result) {
				continue;
			}
			var _pCell = self.unusedCells[i];
			var _level = 0;
			if (random(100) > 75) {
				_level = 1;
			}
			_pCell.newBlock(_level);

			alert("NewBlock PosX:"+_pCell.x+"\tPosY:"+_pCell.y);

			self.unusedCells.splice(i,1);
			break;
		}
	}

	//new node
	this.newNode = function(){
		var _node = $('<div id="game_slide_area"></div>');
		var _width = self.width;
		_node.css({
			"top": self.top,
			"left": "0px",
			"right":"0px",
			"height": _width,
			"background": "black"
		})
		self.node = _node;
		return _node;
	}

	// this.getCell = function(x, y){
	// 	for (var i in self.cells) {
	// 		if (self.cells[i].x != x) { continue; }
	// 		if (self.cells[i].y != y) { continue; }
	// 		return self.cells[i];
	// 	}
	// 	return false;
	// }

	this.getCell = function(param){
		var _x = param.x;
		var _y = param.y;
		for (var i in self.cells) {
			if (self.cells[i].x != _x) { continue; }
			if (self.cells[i].y != _y) { continue; }
			return self.cells[i];
		}
		return false;
	}

	// this.hasBlock = function(x, y){
	// 	var _cell = null;
	// 	for (var i in self.cells) {
	// 		if (self.cells[i].x != x) { continue; }
	// 		if (self.cells[i].y != y) { continue; }
	// 		_cell =  self.cells[i];
	// 		break;
	// 	}
	// 	if (!_cell) {
	// 		return false;
	// 	}
	// 	return _cell.hasBlock();
	// }

	this.init();
}