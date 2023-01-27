/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(['N/currentRecord', 'N/email', 'N/error', 'N/format', 'N/http', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/transaction'],
    function (currentRecord, email, error, format, http, log, record, runtime, search, transaction) {
        function beforeLoad(scriptContext) {
            try {
                if (scriptContext.type == scriptContext.UserEventType.CREATE) {
                    var obj_record = scriptContext.newRecord;
                    var jstat = obj_record.getValue({
                        fieldId: 'entitystatus',
                    });
                    log.debug('status ', jstat);
                    var jform = obj_record.getValue({
                        fieldId: 'customform',
                    });
                    log.debug('Form Id inside beforeload ', jform);
                    if (jform == 271) {
                        obj_record.setValue({
                            fieldId: 'entitystatus',
                            value: 21,
                        });
                        obj_record.setValue({
                            fieldId: 'custentity_probability_precentage',
                            value: 60,
                        });
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