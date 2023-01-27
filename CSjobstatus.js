/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/search', 'N/record', 'N/currentRecord', 'N/format', 'N/ui/dialog'], function (runtime, search, record, currentRecord, format, dialog) {

    function pageInit(context) {
        try {
            var recObj = context.currentRecord;
            var jform = recObj.getValue({
                fieldId: 'customform',
            });
            log.debug('Form Id not in create mode ', jform);
            if (jform == 271) {
                recObj.getField('custentity_probability_precentage').isDisabled = true;
            }
            if (context.mode == 'create') {
                log.debug("Inside create mode ");
                var recObj = context.currentRecord;

                var statusId = recObj.getValue({
                    fieldId: 'entitystatus',
                });
                log.debug('statusId ', statusId);
                var jform = recObj.getValue({
                    fieldId: 'customform',
                });
                log.debug('Form Id ', jform);
                var jobProb = recObj.getValue({
                    fieldId: 'custentity_probability_precentage',
                });
                log.debug('jobProb ', jobProb);
                if (jform == 271) {
                    log.debug('statusId inside if  ', statusId);
                    recObj.setValue({
                        fieldId: 'entitystatus',
                        value: 21,
                    });
                    recObj.setValue({
                        fieldId: 'custentity_probability_precentage',
                        value: 60,
                    });
                }
            }
        } catch (e) {
            log.error('Cli Quote Error', e);
            alert(e);
        }
    }

    function fieldChanged(context) {
        try {
            if (context.fieldId == 'entitystatus') {
                var recObj = context.currentRecord;
                var jstatus = recObj.getValue({
                    fieldId: 'entitystatus'
                });
                log.debug('jstatus ', jstatus);

                if (jstatus == 5 || jstatus == 22) { // open && initiate status
                    log.debug('jstatus inside if ', jstatus);
                    recObj.setValue({
                        fieldId: 'custentity_probability_precentage',
                        value: 100,
                    });
                } else if (jstatus == 21) {
                    recObj.setValue({
                        fieldId: 'custentity_probability_precentage',
                        value: 60,
                    });

                } else if (jstatus == 1) {
                    recObj.setValue({
                        fieldId: 'custentity_probability_precentage',
                        value: 100,
                    });

                } else if (jstatus == 20) {
                    recObj.setValue({
                        fieldId: 'custentity_probability_precentage',
                        value: 0,
                    });

                }
            }
        } catch (e) {
            log.error('Cli Quote Error', e);
            alert(e);
        }
    }

    function saveRecord(context) {
        try {
            var recObj = context.currentRecord;
            var jstatus = recObj.getValue({
                fieldId: 'entitystatus'
            });
            log.debug('jstatus ', jstatus);

            /* if (jstatus == 5 || jstatus == 22) { // open && initiate status
                 log.debug('jstatus inside if ', jstatus);
                 recObj.setValue({
                     fieldId: 'custentity_probability_precentage',
                     value: 100,
                 });
             } else if (jstatus == 21) {
                 recObj.setValue({
                     fieldId: 'custentity_probability_precentage',
                     value: 60,
                 });

             } else */
            if (jstatus == 1) { // closed status
                var jobId = recObj.getValue({
                    fieldId: 'custentity_proj_ref_int_id',
                });
                log.debug('jobId  ', jobId);
                if (isNotEmpty(jobId)) {
                    var newLength = statusUpdate(jobId);
                    log.debug('newResult length', newLength);
                    if (newLength != 0) {
                        recObj.setValue({
                            fieldId: 'custentity_probability_precentage',
                            value: 100,
                        });
                        return true;

                    } else {
                        alert("A job can't be set to closed status when there is no associated sales order that exists. The expected status is closed lost.");
                        return false;
                    }
                } else {
                    alert("Please create Job in order to set the status closed  ");
                    return false;
                }
            } else if (jstatus == 20) { // closed lost status
                var jobId = recObj.getValue({
                    fieldId: 'custentity_proj_ref_int_id',
                });
                log.debug('jobId  ', jobId);
                if (isNotEmpty(jobId)) {
                    var newLength = statusUpdate(jobId);
                    log.debug('newResult length', newLength);
                    if (newLength != 0) {
                        alert("A job can't be set to closed lost status when there is an associated sales order. The expected status is closed.");
                        return false;
                    } else {
                        recObj.setValue({
                            fieldId: 'custentity_probability_precentage',
                            value: 0,
                        });
                        var quoteSearchObj = search.create({
                            type: "job",
                            filters: [
                                ["transaction.type", "is", "Estimate"],
                                "AND",
                                ["internalid", "is", jobId]
                            ],
                            columns: [
                                search.createColumn({
                                    name: "internalid",
                                    join: "transaction",
                                    summary: "GROUP",
                                    sort: search.Sort.ASC,
                                    label: "Internal ID"
                                })
                            ]
                        });
                        var quoteResult = quoteSearchObj.run().getRange({
                            start: 0,
                            end: 1000
                        });
                        log.debug('quoteResultinside close ', quoteResult);
                        log.debug('quoteResult.length inside close ', quoteResult.length);
                        if (quoteResult.length != 0) {

                            for (var qt in quoteResult) {
                                var quoteValue = quoteResult[qt].getValue({
                                    name: "internalid",
                                    join: "transaction",
                                    summary: "GROUP",
                                    sort: search.Sort.ASC,
                                    label: "Internal ID"
                                });
                                log.debug('quoteValue', quoteValue);
                                record.submitFields({
                                    type: record.Type.ESTIMATE,
                                    id: quoteValue,
                                    values: {
                                        probability: 0
                                    }
                                });

                            }
                        }
                        return true;

                    }
                } else {
                    alert("Please create Job in order to set the status closed lost ");
                    return false;
                }

            }

            return true;


        } catch (e) {
            log.error('Cli Quote Error', e);
            alert(e);
        }


    }

    function statusUpdate(len) {
        var jobSearchObj = search.create({
            type: "job",
            filters: [
                ["transaction.type", "is", "SalesOrd"],
                "AND",
                ["internalid", "is", len]
            ],
            columns: [
                search.createColumn({
                    name: "internalid",
                    join: "transaction",
                    label: "Internal ID"
                })


            ]
        });
        var searchResult = jobSearchObj.run().getRange({
            start: 0,
            end: 1
        });
        log.debug('searchResultinside close ', searchResult);
        log.debug('searchResult.length inside close ', searchResult.length);
        return searchResult.length;
    }

    function isNotEmpty(value) {
        if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN')
            return true;
        else
            return false;
    }
    return {

        pageInit: pageInit,
        fieldChanged: fieldChanged,
        saveRecord: saveRecord


    };
});