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
                    var s_record_type = scriptContext.newRecord.type;
                    log.debug('s_record_type', s_record_type);
                    log.debug('obj_record ', obj_record);
                    var custId = obj_record.getValue({
                        fieldId: 'entity',
                    });
                    log.debug('custName', custId);
                    var qform = obj_record.getValue({
                        fieldId: 'customform',
                    });
                    log.debug('qform', qform);
                    var jobRec = obj_record.getValue({
                        fieldId: 'job',
                    });
                    log.debug('jobRec', jobRec);
                    var sessionObj = runtime.getCurrentSession(); //sessionObj is a runtime.Session object
                    var sessionJobId = sessionObj.get({
                        name: 'jobId'
                    })
                    if (!sessionJobId) {
                        sessionObj.set({
                            name: 'jobId',
                            value: jobRec
                        });
                        jobRec = sessionJobId;
                    }
                    if (isNotEmpty(custId) && isNotEmpty(jobRec)) {
                        if (qform != 227) {
                            obj_record.setValue({
                                fieldId: 'customform',
                                value: 227,
                                ignoreFieldChange: true
                            });
                        }
                        obj_record.setValue({
                            fieldId: 'job',
                            value: jobRec,
                            ignoreFieldChange: true
                        });

                        var jobData = search.lookupFields({
                            type: 'job',
                            id: jobRec,
                            columns: ['entitystatus', 'customer', 'custentity_probability_precentage', 'custentity_maxim_id', 'custentity_flexcab_account_id', 'startdate']
                        });
                        var jobStatus = jobData.entitystatus[0].value;
                        var jobCust = jobData.customer[0].value;
                        var jobProb = jobData.custentity_probability_precentage;
                        var jobSFopp = jobData.custentity_maxim_id;
                        var jobSFlexcab = jobData.custentity_flexcab_account_id;
                        var jobDate = jobData.startdate;
                        log.debug('jobStatus', jobStatus);
                        log.debug('jobProb', jobProb);
                        log.debug('jobSFopp', jobSFopp);
                        log.debug('jobSFlexcab', jobSFlexcab);
                        log.debug('jobDate', jobDate);
                        log.debug('jjobCust ', jobCust);
                        //   obj_record.setValue({
                        //     fieldId: 'trandate',
                        //     value: jobDate,
                        //     ignoreFieldChange: true
                        // });
                        // obj_record.setValue({
                        //     fieldId: 'custbody20',
                        //     value: jobSFopp,
                        //     ignoreFieldChange: true
                        // });
                        // obj_record.setValue({
                        //     fieldId: 'custbody15',
                        //     value: jobSFlexcab,
                        //     ignoreFieldChange: true
                        // });
                    }
                }
            } //end of try block
            catch (e) {
                log.debug('Exception:==', e);
            } //end of catch block	
        } //end of function beforeLoad(scriptContext)
        function isNotEmpty(value) {
            if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
                return true;
            else
                return false;
        } //
        return {
            beforeLoad: beforeLoad
        };
    });