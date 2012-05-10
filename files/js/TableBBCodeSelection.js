var tableBBCodeContainerVisible = false;
var tableBBCodeBox = $('tableBBCodeContainer');
var tableBBCodeButton = $('button');

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