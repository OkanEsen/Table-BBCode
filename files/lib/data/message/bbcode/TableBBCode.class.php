<?php
// wcf imports
require_once(WCF_DIR.'lib/data/message/bbcode/BBCodeParser.class.php');
require_once(WCF_DIR.'lib/data/message/bbcode/BBCode.class.php');

/**
 * Parses the [table] bbcode tag
 * 
 * @author	Okan Esen
 * @copyright	2011 Okan Esen
 * @license	GNU Lesser General Public License <http://opensource.org/licenses/lgpl-license.php>
 * @package	de.okanesen.bbcode.table
 * @subpackage	data.message.bbcode
 * @category 	Community Framework
 */
class TableBBCode implements BBCode {
	/**
	 * @see BBCode::getParsedTag()
	 */
	public function getParsedTag($openingTag, $content, $closingTag, BBCodeParser $parser) {
		$tableHeadElements = null;
		
		// get table head (th) elements
		if (isset($openingTag['attributes'][0])) $tableHeadElements = explode(',', $openingTag['attributes'][0]);
		
		// get table data (td) elements
		$tableDataElements = preg_split('/\[\*\]/', StringUtil::trim($content), -1, PREG_SPLIT_NO_EMPTY);
		
		// set counter for td elements
		$counter = 0;
		
		// set index for cycle
		$cycle = 1;
		
		// remove <br /> elements
		foreach ($tableDataElements as $key => $val) {
			$tableDataElements[$key] = StringUtil::trim($val);
			if ($tableDataElements[$key] == '<br />') {
				unset($tableDataElements[$key]);
			}
		}
		
		if (count($tableHeadElements) != 0 && count($tableDataElements) != 0) {
			$tableHeadElementsTemp = $tableDataElementsTemp = '';
			
			foreach ($tableHeadElements as $tableHeadElement) {
				$tableHeadElementsTemp .= '<th><div><span class="emptyHead">'.$tableHeadElement.'</span></div></th>';
			}
			
			foreach ($tableDataElements as $tableDataElement) {
				if (($counter % count($tableHeadElements)) == 0) {
					if ($cycle == 1 && $counter != 0) $cycle = 2;
					else $cycle = 1;
					
					$tableDataElementsTemp .= '<tr class="container-'.$cycle.'">';
				}
				if (($counter % count($tableHeadElements)) == (count($tableHeadElements))) $tableDataElementsTemp .= '</tr>';
				
				$tableDataElementsTemp .= '<td>'.$tableDataElement.'</td>';
				
				$counter++;
			}
			
			if ($parser->getOutputType() == 'text/html') {
				return '<div class="border"><table class="tableList"><thead><tr class="tableHead">'.$tableHeadElementsTemp.'</tr></thead><tbody>'.$tableDataElementsTemp.'</tbody></table></div>';
			}
			else if ($parser->getOutputType() == 'text/plain') {
				return $openingTag['source'].$content.$closingTag['source'];
			}
		}
	}
}
?>