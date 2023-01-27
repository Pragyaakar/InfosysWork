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
                    log.debug('obj_record ', obj_record);
                    var s_record_type = scriptContext.newRecord.type;
                    log.debug('s_record_type', s_record_type);
                    var qform = obj_record.getValue({
                        fieldId: 'customform',

                    });
                    log.debug('qform', qform);
                    if (qform == 271) {
                        log.debug('qform inside if');
                        obj_record.setValue({
                            fieldId: 'custentity_probability_precentage',
                            value: '60.0%',
                            ignoreFieldChange: true
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

function isNotEmpty(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
        return true;
    else
        return false;
} //