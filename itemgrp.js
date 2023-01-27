/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
 define(['N/log', 'N/search', 'N/record', 'N/currentRecord'],
 function (log, search, record, currentRecord) {
     function postSourcing(context) {
         try {
             var recObj = context.currentRecord;
             if (context.fieldId == 'item' && context.sublistId == 'item') {
                 log.debug({
                     title: 'start',
                     details: 'any'
                 })
                 var itemType = recObj.getCurrentSublistValue({
                     sublistId: 'item',
                     fieldId: 'itemtype'
                 });
                 var groupItemId = recObj.getCurrentSublistValue({
                     sublistId: 'item',
                     fieldId: 'item'
                 });
                 log.debug({
                     title: itemType,
                     details: groupItemId
                 })
                 if (itemType == "Group") {
                     recObj.setCurrentSublistValue({
                         sublistId: 'item',
                         fieldId: 'custcol9',
                         value: 'ITG-' + groupItemId
                     });
                 }
                 log.debug({
                     title: 'end',
                     details: 'end'
                 })
                 /* var lineCount = recObj.getLineCount({
                     sublistId: 'item'
                 });
                 var groupItemId = '';
                 for (var line = 0; lineCount > line; line++) {
                     recObj.selectLine({
                         sublistId: 'item',
                         line: line
                     });
                     var itemType = recObj.getCurrentSublistValue({
                         sublistId: 'item',
                         fieldId: 'itemtype'
                     });
                     if (itemType == "Group") {
                         groupItemId = recObj.getCurrentSublistValue({
                             sublistId: 'item',
                             fieldId: 'item'
                         });
                     } else if (itemType == "EndGroup") {
                         if (groupItemId) {
                             recObj.setCurrentSublistValue({
                                 sublistId: 'item',
                                 fieldId: 'custcol9',
                                 value: 'ITG-' + groupItemId
                             });
                         }
                         groupItemId = '';
                     } else {
                         if (groupItemId) {
                             recObj.setCurrentSublistValue({
                                 sublistId: 'item',
                                 fieldId: 'custcol9',
                                 value: 'ITG-' + groupItemId
                             });
                         }
                     }
                     //alert('groupItemId: ' + groupItemId + " :: Item Type: " + itemType);
                     if (itemType != "EndGroup")
                         recObj.commitLine({
                             sublistId: 'item',
                         })
                     else {
                         recObj.cancelLine({
                             sublistId: 'item'
                         })
                     } 
                 }*/
             }
         } catch (e) {
             log.error({
                 title: 'Cli Quote Error',
                 details: e
             });
             alert(e);
         }
     }

     function saveRecord(context) {
         try {
             var recObj = context.currentRecord;
             var lineCount = recObj.getLineCount({
                 sublistId: 'item'
             });
             log.debug('quote details', 'line count: ' + lineCount)
             var groupItemId = '';
             for (var line = 0; lineCount > line; line++) {
                 recObj.selectLine({
                     sublistId: 'item',
                     line: line
                 });
                 var itemType = recObj.getCurrentSublistValue({
                     sublistId: 'item',
                     fieldId: 'itemtype'
                 });
                 log.debug('quote Line details: ' + line, 'itemType: ' + itemType)
                 if (itemType == "Group") {
                     groupItemId = recObj.getCurrentSublistValue({
                         sublistId: 'item',
                         fieldId: 'item'
                     });
                     recObj.setCurrentSublistValue({
                         sublistId: 'item',
                         fieldId: 'custcol9',
                         value: 'ITG-' + groupItemId
                     });
                     recObj.commitLine({
                         sublistId: 'item',
                     })
                 } else if (itemType == "EndGroup") {
                     if (groupItemId) {
                         groupItemId = '';
                         recObj.cancelLine({
                             sublistId: 'item'
                         })
                     }
                 } else {
                     if (groupItemId) {
                         recObj.cancelLine({
                             sublistId: 'item'
                         })
                     }
                 }
                 log.debug('quote Line details: ' + line, 'groupItemId: ' + groupItemId)
             }
             return true
         } catch (e) {
             log.error({
                 title: 'Cli Quote Error',
                 details: e
             });
             alert(e);
         }
     }
     return {
         postSourcing: postSourcing,
         saveRecord: saveRecord
     };
 });