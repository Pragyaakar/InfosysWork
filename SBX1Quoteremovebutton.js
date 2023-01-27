/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(['N/search', 'N/record'],
    function (search, record) {
        function beforeLoad(scriptContext) {
            try {
                log.audit('before Load', 'start');
                log.debug("scriptContext", JSON.stringify(scriptContext));
                var obj_record = scriptContext.newRecord;
                log.debug('obj_record type', obj_record.type);
                if (obj_record.id) {
                    obj_record = record.load({
                        type: obj_record.type,
                        id: obj_record.id,
                        isDynamic: true,
                    })
                }
                log.debug('obj_record type', obj_record.type);
                var qform = obj_record.getValue({
                    fieldId: 'customform',
                });
                log.debug('qform', qform);
                if (obj_record.type == "estimate" && qform == 128) {
                    log.debug('qform inside if ', qform);
                    if (scriptContext.type == scriptContext.UserEventType.VIEW || scriptContext.type == scriptContext.UserEventType.XEDIT || scriptContext.type == scriptContext.UserEventType.EDIT) {
                        var relatedSalesCount = obj_record.getValue({
                            fieldId: 'custbody42',
                        });
                        log.debug('relatedSalesCount ', relatedSalesCount);
                        if (relatedSalesCount > 0) {
                            var yourForm = scriptContext.form;
                            yourForm.removeButton('edit');
                        }
                    }

                }

            } //end of try block
            catch (e) {
                log.debug('Exception:==', e);
            } //end of catch block	
        }

        function isNotEmpty(value) {
            if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN')
                return true;
            else
                return false;
        }
        return {
            beforeLoad: beforeLoad,
        };
    });