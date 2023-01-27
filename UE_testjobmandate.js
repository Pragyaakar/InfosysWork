/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(['N/currentRecord', 'N/email', 'N/error', 'N/format', 'N/http', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/transaction'],
    function (currentRecord, email, error, format, http, log, record, runtime, search, transaction) {
        function beforeLoad(scriptContext) {
            try {
                var obj_record = scriptContext.newRecord;
                var qform = obj_record.getValue({
                    fieldId: 'customform',
                });
                log.debug('Form Id inside beforeload ', qform);
                if (qform == 227) {
                    var newjob = obj_record.getField('job');
                    newjob.isMandatory = true;
                    log.debug('Form inside if before load');
                    var qstatus = obj_record.getValue({
                        fieldId: 'status',
                    });
                    log.debug('Form inside if before load qstatus', qstatus);
                    if (qstatus != 'Closed' && qstatus != 'Voided' && qstatus != 'Expired') {
                        var yourForm = scriptContext.form;
                        yourForm.removeButton('delete');
                    }
                }
            } //end of try block
            catch (e) {
                log.debug('Exception:==', e);
            } //end of catch block	
        } //end of function beforeLoad(scriptContext)
        return {
            beforeLoad: beforeLoad
        };
    });