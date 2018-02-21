function ConfirmWindow(){
	this.switch = false;

	//assist
	var self = this;

	this.showConfirm = function(param) {
		if (self.switch) {
			return;
		}
		self.switch = true;

		if (param.text == null) {
			alert('Param.text is essential.');
		}
		var _text = param.text;
		var _callback = param.callback || function(){};

		var _darkBg = $('<div id="_confirm_dark_bg"></div>');
		_darkBg.css({
			"position"	:"absolute",
			"top"	:"0px",
			"left"	:"0px",
			"right"	:"0px",
			"bottom":"0px",
			"background-color": "rgba(0,0,0,0.4)",
		});	

		$('body').append(_darkBg);

		var _confirmBody = $('<div id="_confirm_body"></div>');
		_confirmBody.css({
			"position"	:"absolute",
			"margin-left"	:"50%", 
			"margin-top"	:"50%", 
			"top"	:"-7%",
			"height":"26%",
			"left"	:"-44%",
			"width"	:"88%",
			"border-radius":"2rem",
			"background-color": "white",
		})
		_darkBg.append(_confirmBody);


		var _confirmText = $('<div id="_confirm_text">'+ _text +'</div>');
		_confirmText.css({
			"position"	:"absolute",
			"top"	:"10%",
			"left"	:"5%",
			"right"	:"5%",
			"height":"55%",
			"color"	:"rgb(50,50,50)",
			"fontSize": "2rem",
			"word-wrap":"break-word",
			"border-bottom": "2px solid rgba(0,0,0,0.6)",
		});
		_confirmBody.append(_confirmText);
		
		//click yes
		var _confirm_yes = $('<div id="_confirm_yes">Sure</div>');
		_confirm_yes.css({
			"position"	:"absolute",
			"top"	:"65%",
			"left"	:"5%",
			"width"	:"44%",
			"height":"30%",
			"padding-top": "2%",
			"color"	:"rgba(255,50,50,0.7)",
			"fontSize": "2.4rem",
			"text-align":"center"
		});
		_confirm_yes.click(function(){
			_darkBg.remove();
			self.switch = false;
			_callback();
		});
		_confirmBody.append(_confirm_yes);

		//click no
		var _confirm_no = $('<div id="_confirm_no">Cancel</div>');
		_confirm_no.css({
			"position"	:"absolute",
			"top"	:"65%",
			"left"	:"51%",
			"width"	:"44%",
			"height":"30%",
			"padding-top": "2%",
			"color"	:"gray",
			"fontSize": "2.4rem",
			"text-align":"center"
		});
		_confirm_no.click(function(){
			_darkBg.remove();
			self.switch = false;
		});
		_confirmBody.append(_confirm_no);
	}
}


var __ConfirmWindow = new ConfirmWindow();