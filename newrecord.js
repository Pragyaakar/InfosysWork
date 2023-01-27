/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
 define(['N/record'],
 function (record) {
     function pageInit(context) {
         try {

             log.debug('script Biggins', JSON.stringify(context));
             var itemSedObj = context.currentRecord;
             var itemSedObj1 = record.load({
                 type: 'salesorder',
                 id: 192,
                 isDynamic: true,
             });
             var fieldsObj = itemSedObj1.getFields();
             //log.debug('before', JSON.stringify(fieldsObj));
             for (var index = 0; index < fieldsObj.length; index++) {
                 var fieldId = fieldsObj[index];
                 if (fieldId.split("_")[0] == 'cseg') {
                     var fieldObj = itemSedObj.getField({
                         fieldId: fieldId
                     });
                     //fieldObj.isDisplay = false;
                     log.debug(fieldId + ' :: isDisplay', fieldObj.isDisplay)
                     log.debug(fieldId + ' :: isDisabled', fieldObj.isDisabled)
                     log.debug(fieldId + ' :: isVisible', fieldObj.isVisible)
                 }
             }
         } catch (error) {
             log.debug('error', error)
         }

     }
     return {
         pageInit: pageInit
     }
 });