/**
 * @author	Okan Esen
 * @copyright	2012 Okan Esen
 * @license	GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
 * @package	de.okanesen.bbcode.table
 */

Event.observe(window, 'load', function() {
	var tableBBCodeContainerVisible = false;
	var tableBBCodeBox = $('tableBBCodeContainer');
	var tableBBCodeButton = $('mce_editor_0_table');
	//var tableBBCodeTableHeading = $("tableHeading").getValue();
	var tableBBCodeTableHeading = null;
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
	
	// get checkbox value
	// $("tableHeading").observe('click', function(event) {
	// 	tableBBCodeTableHeading = $("tableHeading").getValue();
	// });
	
	$$(".tableBBCodeContainer ul").each(function (element) {
		element.observe('mouseover', function(event) {
			// get hovered element
			var hoveredCol = event.findElement('li');
			
			// check if element hovered
			if (hoveredCol) {
				// get row and col number
				tableBBCodeRows = hoveredCol.readAttribute("id").match(pattern)[0];
				tableBBCodeCols = hoveredCol.readAttribute("id").match(pattern)[1];

				// delete old selection
				for (i = 1; i <= tableBBCodeRowsTemp; i++) {
					for (j = 1; j <= tableBBCodeColsTemp; j++) {
						$("col-" + i + "-" + j).removeClassName("container-3");
					}
				}

				// set new selection
				for (i = 1; i <= tableBBCodeRows; i++) {
					for (j = 1; j <= tableBBCodeCols; j++) {
						$("col-" + i + "-" + j).addClassName("container-3");
					}
				}
				
				tableBBCodeRowsTemp = tableBBCodeRows;
				tableBBCodeColsTemp = tableBBCodeCols;
			}
		});
		element.observe('click', function(event) {
			var editorContent = "";
			
			// check wether checkbox is set
			if (tableBBCodeTableHeading == 1) {
				editorContent += "[table]<br />";
			} else {
				editorContent += "[table='";
				for (i = 1; i <= tableBBCodeCols; i++) {
					editorContent += i;
					if (i != tableBBCodeCols) editorContent += ",";
				}
				editorContent += "']<br />";
			}
			
			// generate table structure
			for (i = 1; i <= tableBBCodeRows; i++) {
				for (j = 1; j <= tableBBCodeCols; j++) {
					editorContent += "[*] " + i + ":" + j + "\t";
				}
				editorContent += "<br />";
			}
			editorContent += "[/table]<br />"
			
			// insert table structure into edtor
			WysiwygInsert('text', editorContent);
		
		
			// hide selection container
			if (tableBBCodeBox.visible()) {
				new Effect.Parallel([
					new Effect.BlindUp(tableBBCodeBox),
					new Effect.Fade(tableBBCodeBox)
				], {duration: 0.3});
				tableBBCodeContainerVisible = false;
			}
			
			// reset grid selection
			for (i = 1; i <= tableBBCodeRowsTemp; i++) {
				for (j = 1; j <= tableBBCodeColsTemp; j++) {
					$("col-" + i + "-" + j).removeClassName("container-3");
				}
			}
		});
	});
});