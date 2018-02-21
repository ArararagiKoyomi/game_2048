function Cell(pContainer, x, y){
	this.pContainer = pContainer;
	this.x = x;
	this.y = y;
	this.edge = parseInt(this.pContainer.width * 0.24);
	this.border = parseInt(this.pContainer.width * 0.02);
	this.pBlock = null;
	this.node = null;

	//assist
	var self = this;


	this.init = function(){
		var _node = $('<div class="cell_div"></div>');
		_node.css({
			"top": function(){
				return self.border + self.y * self.edge;
			},
			"left": function(){
				return self.border + self.x * self.edge;
			},
			"width": 	self.edge,
			"height": 	self.edge,
		})
		self.pContainer.node.append(_node);

		self.node = _node;
	}

	this.newBlock = function(level){
		if (self.pBlock != null) {
			return;
		}
		var _pBlock = new Block(self, level);
		self.addBlock(_pBlock);
		self.addBlockNode(_pBlock.node);
	}

	this.addBlock = function(pBlock){
		if (self.pBlock != null) {
			return;
		}
		self.pBlock = pBlock;
	}

	this.addBlockNode = function(node){
		self.pContainer.node.append(node);
	}

	this.hasBlock = function(){
		if (self.pBlock == null) {
			return false;
		}
		return true;
	}

	this.inheritBlock = function(pCell){
		var _pBlock = pCell.pBlock;
		_pBlock.pCell = self;
		pCell.pBlock = null;
		self.pBlock = _pBlock;
	}

	this.removeNode = function(){
		self.pBlock.removeNode();
	}

	this.clearBlock = function(){
		if (self.pBlock == null) {
			return;
		}
		self.removeNode();
		self.pBlock = null;
	}

	this.init();
}