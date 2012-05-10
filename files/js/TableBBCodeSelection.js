var tableBBCodeContainerVisible = false;
var tableBBCodeBox = $('tableBBCodeContainer');
var tableBBCodeButton = $('button');
var tableBBCodeRows = 0;
var tableBBCodeRowsTemp = 0;
var tableBBCodeCols = 0;
var tableBBCodeColsTemp = 0;
var pattern = /\d{1,2}/g;
var i = 0;
var j = 0;

if (tableBBCodeButton && tableBBCodeBox) {
	function showTableBBCodeContainer(evt) {
		if (tableBBCodeBox.hasClassName('hidden')) {
			tableBBCodeBox.setStyle('display: none');
			tableBBCodeBox.removeClassName('hidden');
		}

		var top = (tableBBCodeButton.cumulativeOffset()[1] + tableBBCodeButton.getHeight() + 5);
		var left = tableBBCodeButton.cumulativeOffset()[0] > $$('body')[0].getWidth()/2 ? tableBBCodeButton.cumulativeOffset()[0] - tableBBCodeBox.getWidth() + tableBBCodeButton.getWidth() : tableBBCodeButton.cumulativeOffset()[0];

		tableBBCodeBox.setStyle('left: ' + left + 'px; top: ' + top + 'px;');
		if (tableBBCodeBox.visible()) {
			new Effect.Parallel([
				new Effect.BlindUp(tableBBCodeBox),
				new Effect.Fade(tableBBCodeBox)
			], {duration: 0.3});
			tableBBCodeContainerVisible = false;
		} else {
			new Effect.Parallel([
				new Effect.BlindDown(tableBBCodeBox),
				new Effect.Appear(tableBBCodeBox)
			], { duration: 0.3});
			tableBBCodeContainerVisible = true;
		}
		evt.stop();
	}

	tableBBCodeButton.observe('click', showTableBBCodeContainer);
}

$$("ul").each(function (element) {
	element.observe('mouseover', function(event) {
		var hoveredCol = event.findElement('li');
		if (hoveredCol) {
			tableBBCodeRows = hoveredCol.readAttribute("id").match(pattern)[0];
			tableBBCodeCols = hoveredCol.readAttribute("id").match(pattern)[1];
			
			for (i = 1; i <= tableBBCodeRowsTemp; i++) {
				for (j = 1; j <= tableBBCodeColsTemp; j++) {
					$("col-" + i + "-" + j).removeClassName("hovered");
				}
			}

			for (i = 1; i <= tableBBCodeRows; i++) {
				for (j = 1; j <= tableBBCodeCols; j++) {
					$("col-" + i + "-" + j).addClassName("hovered");
				}
			}
			tableBBCodeRowsTemp = tableBBCodeRows;
			tableBBCodeColsTemp = tableBBCodeCols;
		}
	});
});