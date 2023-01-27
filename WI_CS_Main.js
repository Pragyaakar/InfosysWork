/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/currentRecord', 'N/ui/dialog', 'N/log'], function (search, currentRecord, dialog, log) {
    var record = currentRecord.get();
    try {
        function fieldChanged(context) {
            if (context.fieldId == 'custpage_trans') {
                // alert("Transactions are selected");
                var get_parameter = record.getText('custpage_trans');
                // alert('get_parameter '+get_parameter );
                // var tranid = record.getValue('custpage_trans');
                //alert('tranid '+tranid );
                record.setValue({
                    fieldId: 'custpage_textarea',
                    value: get_parameter
                });


            }

        }

        function saveRecord(context) {
            alert('Record will be saved');
            return true;








        }
    } catch (e) {
        log.error('Unexpected Error', e);
        context.response.write('Unexpected Error. Please Contact your Administrator. Error:: ' + e);
    }
    return {
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
});