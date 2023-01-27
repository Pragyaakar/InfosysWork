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
                if (obj_record.type == "estimate" && qform == 227) {
                    log.debug('qform inside if ', qform);
                    var newjob = obj_record.getField('job');
                    newjob.isMandatory = true;
                    log.debug('newjob value', newjob);
                    if (scriptContext.type == scriptContext.UserEventType.VIEW || scriptContext.type == scriptContext.UserEventType.XEDIT || scriptContext.type == scriptContext.UserEventType.EDIT) {
                        var relatedSalesCount = obj_record.getValue({
                            fieldId: 'custbody_telstra_quote_sales_count',
                        });
                        log.debug('relatedSalesCount ', relatedSalesCount);
                        if (relatedSalesCount > 0) {
                            var yourForm = scriptContext.form;
                            yourForm.removeButton('edit');
                        }
                    } else if (scriptContext.type == scriptContext.UserEventType.EDIT || scriptContext.type == scriptContext.UserEventType.CREATE) {
                        var newjob = obj_record.getField('job');
                        newjob.isMandatory = true;
                        var qstatus = obj_record.getValue({
                            fieldId: 'status',
                        });
                        log.debug('Form inside if before load qstatus', qstatus);
                        if (qstatus != 'Closed' && qstatus != 'Voided' && qstatus != 'Expired') {
                            var yourForm = scriptContext.form;
                            yourForm.removeButton('delete');
                        } else {
                            log.debug('update qbs value to cancelled')
                            obj_record.setValue({
                                fieldId: 'custbody_telstra_quote_booking_status',
                                value: 4 //cancelled
                            });
                        }
                    }

                }
                if (obj_record.type == "invoice" || obj_record.type == "creditmemo") {

                    if (scriptContext.type == scriptContext.UserEventType.VIEW || scriptContext.type == scriptContext.UserEventType.XEDIT || scriptContext.type == scriptContext.UserEventType.EDIT) {
                        var jobRec = obj_record.getValue({
                            fieldId: 'job',
                        });
                        log.debug('form: ' + qform + ' :: jobId: ' + jobRec, 'record type inside tax invoice credit' + obj_record.type);
                        if (isNotEmpty(jobRec)) {
                            var jobData = search.lookupFields({
                                type: 'job',
                                id: jobRec,
                                columns: [
                                    'entitystatus',
                                    'custentity_probability_precentage'
                                ]
                            });
                            log.debug('jobData.entitystatus[0].value', jobData.entitystatus[0].value);
                            log.debug('jobData.entitystatus[0].text', jobData.entitystatus[0].text);
                        }
                        if ((qform == 130 || qform == 194) && isNotEmpty(jobData.entitystatus[0])) {
                            if (jobData.entitystatus[0].value == 1 || jobData.entitystatus[0].value == 20 || jobData.entitystatus[0].value == 24 || jobData.entitystatus[0].value == 23 || jobData.entitystatus[0].value == 21 || jobData.entitystatus[0].value == 22) {
                                var yourForm = scriptContext.form;
                                yourForm.removeButton('edit');
                            }


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