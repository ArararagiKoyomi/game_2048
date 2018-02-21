function BlockInfo(){
	this.info = [
		{'level':0, 	'point': '2', 		'bgColor': 'rgb(235,217,224)', 	'textColor': 'rgb(108,109,103)'},
		{'level':1, 	'point': '4', 		'bgColor': 'rgb(237,226,198)', 	'textColor': 'rgb(108,109,103)'},
		{'level':2, 	'point': '8', 		'bgColor': 'rgb(243,178,122)', 	'textColor': 'rgb(108,109,103)'},
		{'level':3, 	'point': '16', 		'bgColor': 'rgb(246,150,99)', 	'textColor': 'rgb(108,109,103)'},
		{'level':4, 	'point': '32', 		'bgColor': 'rgb(246,125,98)', 	'textColor': 'rgb(108,109,103)'},
		{'level':5, 	'point': '64', 		'bgColor': 'rgb(255,89,63)', 	'textColor': 'rgb(108,109,103)'},
		{'level':6, 	'point': '128', 	'bgColor': 'rgb(235,209,114)', 	'textColor': 'rgb(108,109,103)'},
		{'level':7, 	'point': '256', 	'bgColor': 'rgb(237,203,95)', 	'textColor': 'rgb(108,109,103)'},
		{'level':8, 	'point': '512', 	'bgColor': 'rgb(239,201,78)', 	'textColor': 'rgb(108,109,103)'},
		{'level':9, 	'point': '1024', 	'bgColor': 'rgb(234,197,64)', 	'textColor': 'rgb(108,109,103)'},
		{'level':10,	'point': '2048', 	'bgColor': 'rgb(239,195,47)', 	'textColor': 'rgb(108,109,103)'},
		{'level':11,	'point': '4096', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(108,109,103)'},
		{'level':12,	'point': '8192', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(248,250,239)'},
		{'level':13,	'point': '16384', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(248,250,239)'},
		{'level':14,	'point': '32768', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(248,250,239)'},
		{'level':15,	'point': '65536', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(248,250,239)'},
		{'level':16,	'point': '131072', 	'bgColor': 'rgb(57,59,54)', 	'textColor': 'rgb(248,250,239)'}
	]

	//assist
	var self = this;

	this.getPoint = function(level){
		for (var i in self.info) {
			if (self.info[i].level == level) {
				return self.info[i].point;
			}
			continue;
		}
		return false;
	}

	this.getInfo = function(level){
		for (var i in self.info) {
			if (self.info[i].level == level) {
				return self.info[i];
			}
			continue;
		}
		return false;
	}

}

//instance
var __BlockInfo = new BlockInfo();