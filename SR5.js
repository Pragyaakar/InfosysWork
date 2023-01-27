/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * @author Pragya Akar
 */
define(['N/search', 'N/record'],
    function (search, record) {
        function saveRecord(context) {
            try {
                if (context.currentRecord.isNew == false)
                    return true;
                var recObj = context.currentRecord;
                log.debug("This is the context mode ", JSON.stringify(context));
                log.debug("recObj.type", recObj.type);
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });

                var jobRec = recObj.getValue({
                    fieldId: 'job',
                });
                log.debug("saveRecord " + context.mode + ' mode', 'form: ' + qform + ' :: jobId: ' + jobRec, 'record type' + recObj.type);
                if (isNotEmpty(jobRec)) {
                    var jobData = search.lookupFields({
                        type: 'job',
                        id: jobRec,
                        columns: [
                            'entitystatus'
                        ]
                    });
                    log.debug('jobData.entitystatus[0].value', jobData.entitystatus[0].value);
                    log.debug('jobData.entitystatus[0].text', jobData.entitystatus[0].text);
                }
                //createdfrom
                if (recObj.type == "salesorder") {
                    var qtRec = recObj.getValue({
                        fieldId: 'createdfrom',
                    });
                    log.debug('qtRec', qtRec);
                    log.debug("jobData.entitystatus[0]", JSON.stringify(jobData.entitystatus[0]));
                    if (qform == 192 && isNotEmpty(jobData.entitystatus[0]) && isNotEmpty(qtRec)) {
                        log.debug('context', JSON.stringify(context))
                        if (jobData.entitystatus[0].value != 5 && jobData.entitystatus[0].value != 22) { //open or initiate
                            alert('You can only create this record when the job status is either Initiate or Open. But the job status is ' + jobData.entitystatus[0].text);
                            return false;
                        } else {
                            record.submitFields({
                                type: record.Type.JOB,
                                id: jobRec,
                                values: {
                                    entitystatus: 5, // open
                                    custentity_probability_precentage: 100
                                }
                            });
                        }
                        record.submitFields({
                            type: record.Type.ESTIMATE,
                            id: qtRec,
                            values: {
                                custbody_telstra_quote_booking_status: 3, // approved
                                probability: 100
                            }
                        });
                    }
                }
                if (recObj.type == "invoice" || recObj.type == "creditmemo") {
                    log.debug("jobData.entitystatus[0]", jobData.entitystatus[0]);
                    log.debug("jobData.entitystatus[0]", jobData.entitystatus[0].text);
                    if ((qform == 130 || qform == 194) && isNotEmpty(jobData.entitystatus[0])) {
                        if (jobData.entitystatus[0].value == 1 || jobData.entitystatus[0].value == 20 || jobData.entitystatus[0].value == 24 || jobData.entitystatus[0].value == 23 || jobData.entitystatus[0].value == 21 || jobData.entitystatus[0].value == 22) {
                            alert('You can only create this record when the job status is  Open. But the job status is ' + jobData.entitystatus[0].text);
                            return false;
                        }
                    }
                }
                return true;
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }
        }

        function isNotEmpty(value) {
            if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN')
                return true;
            else
                return false;
        }
        return {
            //pageInit: pageInit,
            //postSourcing: postSourcing,
            saveRecord: saveRecord
        };
    });