<?php
// wcf imports
require_once(WCF_DIR.'lib/system/event/EventListener.class.php');

/**
 * Adds Table BBCode Selection JS and CSS to each page.
 * 
 * @author	Okan Esen
 * @copyright	2012 Okan Esen
 * @license	GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
 * @package	de.okanesen.bbcode.table
 * @subpackage	lib.system.event.listener
 * @category	Quick Reply Smileys
 */
class TableBBCodeSelectionTemplateListener implements EventListener {
	/**
	 * @see EventListener::execute()
	 */
	public function execute($eventObj, $className, $eventName) {
		WCF::getTPL()->append('specialStyles', '<link rel="stylesheet" type="text/css" media="screen" href="'.RELATIVE_WCF_DIR.'style/tableBBCodeSelection.css" />');
		WCF::getTPL()->append('specialStyles', '<script type="text/javascript" src="'.RELATIVE_WCF_DIR.'js/TableBBCodeSelection.js"></script>');
		WCF::getTPL()->append('additionalFooterContents', WCF::getTPL()->fetch("tableBBCodeContainer"));
	}
}
?>