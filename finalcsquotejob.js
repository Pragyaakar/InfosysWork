/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * @author Mahesh Bonagiri
 * @Note : In this script there are some staic values we should change that values
 *         while updating from production to sandboxes and sandbox to production.
 *  @StoryIds : DIGI-26978, DIGI-27834, TECTGI - 601
 */
define(['N/search', 'N/record'],
    function (search, record) {
        function pageInit(context) {
            try {
                var recObj = context.currentRecord;
                if (recObj.type != 'estimate')
                    return true;
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });
                if (qform == 227) {
                    /* SB2 quote status option ids and names.
                        1	Quoted
                        2	Requoted
                        3	Approved
                        4	Cancelled 
                    */
                    if (context.mode == 'create' || context.mode == 'copy') {
                        var recObj = context.currentRecord;
                        recObj.setValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                            value: 1,
                        });
                        recObj.setValue({
                            fieldId: 'status',
                            value: 'Open'
                        });
                        log.debug("Page Init " + context.mode + ' mode', 'updated QBS to Quoted and status to open.');
                    }
                    if (context.mode == 'edit') {
                        var status = recObj.getValue({
                            fieldId: 'status',
                        });
                        var qbsstatus = recObj.getValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                        });
                        log.debug('Status', status);
                        if ((status == 'Closed' || status == 'Voided' || status == 'Expired') && qbsstatus != 4) {
                            recObj.setValue({
                                fieldId: 'custbody_telstra_quote_booking_status',
                                value: 4 // canceled
                            });
                            log.debug("Page Init " + context.mode + ' mode', 'Updated the QBS to Cancelled when the QBS is Rejected and status is void or expired or closed.');
                        }
                    }
                }
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }
        }

        function postSourcing(context) {
            try {
                var recObj = context.currentRecord;
                if (recObj.type != 'estimate')
                    return true;
                if (context.fieldId == 'job') {
                    var qform = recObj.getValue({
                        fieldId: 'customform',
                    });
                    var jobRec = recObj.getValue({
                        fieldId: 'job',
                    });
                    log.debug("postSourcing " + context.mode + ' mode', 'form: ' + qform + ' :: jobId: ' + jobRec);
                    if (qform == 227 && jobRec) {
                        var jobData = search.lookupFields({
                            type: 'job',
                            id: jobRec,
                            columns: [
                                'custentity_oa_export_to_openair',
                                'custentity_probability_precentage',
                                'custentity_maxim_id',
                            ]
                        });
                        log.debug("postSourcing " + context.mode + ' mode', 'Job Lookup Data: ' + JSON.stringify(jobData));
                        if (jobData.custentity_probability_precentage)
                            recObj.setValue({
                                fieldId: 'probability',
                                value: jobData.custentity_probability_precentage.replace(/\d+% ?/g, ""),
                            });
                        if (jobData.custentity_maxim_id)
                            recObj.setValue({
                                fieldId: 'custbody20',
                                value: jobData.custentity_maxim_id,
                            });
                        if (jobData.custentity_oa_export_to_openair)
                            recObj.setValue({
                                fieldId: 'custbody_oa_export_to_openair',
                                value: jobData.custentity_oa_export_to_openair,
                            });
                    }
                }
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }
        }

        function fieldChanged(context) {
            //this function should trigger both sales order and quote records.
            var recObj = context.currentRecord;
            if (context.fieldId == 'custcol_renewal_required' && context.sublistId == 'item') {
                var compareFormId = '';
                if (recObj.type == 'estimate') {
                    compareFormId = 128;
                } else {
                    compareFormId = 192;
                }
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });
                if (qform == compareFormId) {
                    var renewalCheck = recObj.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_renewal_required'
                    });
                    if (!renewalCheck) {
                        recObj.getSublist({
                            sublistId: 'item'
                        }).getColumn({
                            fieldId: 'custcol_renewal_processed_date'
                        }).isDisabled = true;
                        recObj.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_renewal_processed_date',
                            value: ''
                        });
                    } else {
                        recObj.getSublist({
                            sublistId: 'item'
                        }).getColumn({
                            fieldId: 'custcol_renewal_processed_date'
                        }).isDisabled = false;
                    }
                }
            }
        }

        function saveRecord(context) {
            try {
                var recObj = context.currentRecord;
                if (recObj.type != 'estimate')
                    return true;
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });
                var jobRec = recObj.getValue({
                    fieldId: 'job',
                });
                log.debug("saveRecord " + context.mode + ' mode', 'form: ' + qform + ' :: jobId: ' + jobRec);
                if (qform == 227 && isNotEmpty(jobRec)) {
                    var lineCount = recObj.getLineCount({
                        sublistId: 'item'
                    });
                    log.debug('quote details', 'line count: ' + lineCount)
                    var groupItemId = '';
                    var pcms = '';
                    var billingRule = '';
                    for (var line = 0; lineCount > line; line++) { //SR2 - Line Section Note 1 to 11.
                        recObj.selectLine({
                            sublistId: 'item',
                            line: line
                        });
                        var itemType = recObj.getCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'itemtype'
                        });
                        var itemSubType = recObj.getCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'itemsubtype'
                        });
                        log.debug('quote Line details: ' + line, 'itemType: ' + itemType)
                        var itemId = recObj.getCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'item'
                        });
                        if (itemType == "Group") {
                            groupItemId = itemId;
                            recObj.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_telstra_quote_line_itg_int_id',
                                value: itemId
                            });
                            if (itemId)
                                recObj.setCurrentSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_telstra_quote_line_item_int_i',
                                    value: itemId
                                });
                            billingRule = recObj.getCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_oa_billing_rule_type'
                            });
                            pcms = recObj.getCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_pcms'
                            });
                            recObj.commitLine({
                                sublistId: 'item',
                            });
                        } else if (itemType == "EndGroup") {
                            if (groupItemId) {
                                groupItemId = '';
                                pcms = '';
                                billingRule = '';
                                recObj.cancelLine({
                                    sublistId: 'item'
                                })
                            }
                        } else {
                            log.debug('quote Line details: ' + line, 'pcms: ' + pcms + ' :: billingRule: ' + billingRule)
                            /* if (groupItemId) */
                            {
                                if (!pcms) {
                                    pcms = recObj.getCurrentSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'custcol_pcms'
                                    });
                                    if (!pcms) {
                                        alert("Please select PCMS value");
                                        return false;
                                    }
                                } else {
                                    var copmPCMS = recObj.getCurrentSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'custcol_pcms'
                                    });
                                    if (pcms != copmPCMS) {
                                        alert('In PCMS column value should be as earliest component item.')
                                        recObj.setCurrentSublistValue({
                                            sublistId: 'item',
                                            fieldId: 'custcol_pcms',
                                            value: pcms
                                        });
                                    }
                                }
                                if (!billingRule) {
                                    billingRule = recObj.getCurrentSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'custcol_oa_billing_rule_type'
                                    });
                                    if (!billingRule) {
                                        alert("Please select Billing Rule value");
                                        return false;
                                    }
                                } else {
                                    var copmbillingRule = recObj.getCurrentSublistValue({
                                        sublistId: 'item',
                                        fieldId: 'custcol_oa_billing_rule_type'
                                    });
                                    if (billingRule != copmbillingRule) {
                                        alert('In Billing Rule column value should be as earliest component item.')
                                        recObj.setCurrentSublistValue({
                                            sublistId: 'item',
                                            fieldId: 'custcol_oa_billing_rule_type',
                                            value: billingRule
                                        });
                                    }
                                }
                            }
                            recObj.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_telstra_quote_item_group_type',
                                value: itemSubType == 'Resale' ? 2 : itemSubType == 'Sale' ? 1 : ''
                            });
                            if (groupItemId) {
                                recObj.setCurrentSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_telstra_quote_line_itg_int_id',
                                    value: groupItemId
                                });
                            }
                            if (itemId)
                                recObj.setCurrentSublistValue({
                                    sublistId: 'item',
                                    fieldId: 'custcol_telstra_quote_line_item_int_i',
                                    value: itemId
                                });
                            recObj.commitLine({
                                sublistId: 'item'
                            })
                        }
                        log.debug('quote Line details: ' + line, 'groupItemId: ' + groupItemId)
                    }
                    log.debug('context', JSON.stringify(context))
                    if (context.currentRecord.isNew == true) {
                        var jobData = search.lookupFields({
                            type: 'job',
                            id: jobRec,
                            columns: [
                                'entitystatus',
                            ]
                        });
                        log.debug('jobData', JSON.stringify(jobData))
                        if (jobData.entitystatus[0]) {
                            if (jobData.entitystatus[0].text == 'Quoted' || jobData.entitystatus[0].text == 'Initiate' || jobData.entitystatus[0].text == 'Open' || jobData.entitystatus[0].text == 'Inflight') {} else {
                                alert('You can only create this record when the job status is either Quoted,Initiate,Open,Inflight. But the job status is ' + jobData.entitystatus[0].text);
                                return false;
                            }
                        } else {
                            alert('You cannot create this quote record because the status of the job is unknown');
                            return false;
                        }
                    } else {
                        var statusId = recObj.getValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                        });
                        log.debug('statusId ', statusId);
                        var status = recObj.getValue({
                            fieldId: 'status',
                        });
                        log.debug('Status', status);
                        if ((status == 'Closed' || status == 'Voided' || status == 'Expired') && statusId != 4) {
                            recObj.setValue({
                                fieldId: 'custbody_telstra_quote_booking_status',
                                value: 4 // canceled
                            });
                            log.debug('Save record status update', 'Updated the QBS to Cancelled when the QBS is Rejected and status is void or expired or closed.');
                        }
                        var statusId = recObj.getValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                        });
                        if (statusId == 1 || statusId == 2) { // Quote quoted & requoted SR4 Note 3.1
                            record.submitFields({
                                type: record.Type.JOB,
                                id: jobRec,
                                values: {
                                    entitystatus: 21, // quoted
                                    custentity_probability_precentage: 60
                                }
                            });
                            recObj.setValue({
                                fieldId: 'probability',
                                value: 60
                            });
                            //return true;
                        } else if (statusId == 3) { // Quote Approved SR4 Note 3.2
                            var newLength = statusQuote(jobRec);
                            if (newLength > 0) { //SR4 Note 3.2.2
                                record.submitFields({
                                    type: record.Type.JOB,
                                    id: jobRec,
                                    values: {
                                        entitystatus: 5, // open
                                        custentity_probability_precentage: 100
                                    }
                                });
                            } else { //SR4 Note 3.2.1
                                record.submitFields({
                                    type: record.Type.JOB,
                                    id: jobRec,
                                    values: {
                                        entitystatus: 22, //initiate
                                        custentity_probability_precentage: 100
                                    }
                                });
                            }
                            recObj.setValue({
                                fieldId: 'probability',
                                value: 100
                            });
                            //return true;
                        } else if (statusId == 4) { // Cancelled SR4 Note 3.3
                            var newLength = statusQuote(jobRec);
                            log.debug('so length', newLength);
                            if (newLength == 0) {
                                log.debug('current rec Id', recObj.id)
                                var estimateSearchObj = search.create({
                                    type: "estimate",
                                    filters: [
                                        ["type", "anyof", "Estimate"],
                                        "AND",
                                        ["jobmain.internalid", "anyof", jobRec],
                                        "AND",
                                        ["mainline", "is", "T"],
                                        "AND",
                                        ['internalid', 'noneof', recObj.id]
                                    ],
                                    columns: [
                                        search.createColumn({
                                            name: "internalid",
                                            label: "Internal ID"
                                        }),
                                        search.createColumn({
                                            name: "custbody_telstra_quote_booking_status",
                                            label: "Quote Booking Status"
                                        })
                                    ]
                                });
                                var searchResult = estimateSearchObj.run().getRange({
                                    start: 0,
                                    end: 1000
                                });
                                log.debug('Quotes count', searchResult.length);
                                var cancelledQuoteIds = [];
                                if (searchResult.length > 0) {
                                    //cancelledQuoteIds.push(recObj.id);
                                    for (var i = 0; i < searchResult.length; i++) {
                                        log.debug("searchResult[i]", JSON.stringify(searchResult[i]));
                                        log.debug("quote id ", searchResult[i].id);
                                        var quoteValue = searchResult[i].getValue({
                                            name: "custbody_telstra_quote_booking_status",
                                            label: "Quote Booking Status"
                                        });
                                        log.debug("quoteValue", quoteValue);
                                        if (quoteValue != 4) {
                                            cancelledQuoteIds.push(searchResult[i].id);
                                        }
                                    }
                                    log.debug('Compare Results ', 'Search results count : ' + searchResult.length + ' :: Cancelled Quotes Count :: ' + cancelledQuoteIds.length);
                                }
                                if (cancelledQuoteIds.length == searchResult.length) {
                                    recObj.setValue({
                                        fieldId: 'probability',
                                        value: 0
                                    });
                                    log.debug('updating fields', 'updating status and probability fields for all closed quotes and job record.')
                                    record.submitFields({
                                        type: record.Type.JOB,
                                        id: jobRec,
                                        values: {
                                            entitystatus: 20, // closed-lost
                                            custentity_probability_precentage: 0,
                                        }
                                    });
                                    for (var quoteIdIndex = 0; quoteIdIndex < cancelledQuoteIds.length; quoteIdIndex++) {
                                        record.submitFields({
                                            type: record.Type.ESTIMATE,
                                            id: cancelledQuoteIds[quoteIdIndex],
                                            values: {
                                                probability: 0,
                                                custbody_telstra_quote_booking_status: 4
                                            }
                                        });
                                    }
                                }
                                recObj.setValue({
                                    fieldId: 'custbody_telstra_quote_booking_status',
                                    value: 4 // canceled
                                });
                                recObj.setValue({
                                    fieldId: 'probability',
                                    value: 0
                                });
                            }
                            //return true;
                        }

                    }

                    /* var jobStatus = recObj.getValue({
                        fieldId: 'custbody_telstra_job_status',
                    });
                    log.debug('jobStatus ', jobStatus);
                    var jobStatusText = recObj.getText({
                        fieldId: 'custbody_telstra_job_status',
                    });
                    log.debug('jobStatusText ', jobStatusText);
                    log.debug("recObj.id", recObj.id);
                    if (jobStatus == 5 || jobStatus == 21 || jobStatus == 22) { // edit mode Quoted,initiate,open job status
                        if (recObj.id) {
                            var salesLength = salesOrderQuote(recObj.id);
                            log.debug("salesLength ", salesLength);
                            if (salesLength > 0) {
                                alert("You cannot edit Quote with associated sales order or job status: " + jobStatusText);
                                return false;
                            }
                        }
                    } else {
                        alert("You cannot create/Edit Quote with the job status: " + jobStatusText);
                        return false;
                    } */
                }
                return true;
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }

        }

        function statusQuote(len) {
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
            log.debug('searchResult.length inside close ', searchResult.length);
            return searchResult.length;
        }

        function salesOrderQuote(qsoid) {
            var salesorderSearchObj = search.create({
                type: "salesorder",
                filters: [
                    ["type", "is", "SalesOrd"],
                    "AND",
                    ["createdfrom", "is", qsoid],
                    "AND",
                    ["mainline", "is", "T"]
                ],
                columns: [
                    search.createColumn({
                        name: "createdfrom",
                        label: "Created From"
                    })
                ]
            });
            var searchQuoteResult = salesorderSearchObj.run().getRange({
                start: 0,
                end: 1
            });
            log.debug('searchQuoteResult.length inside close ', searchQuoteResult.length);
            return searchQuoteResult.length;
        }

        function isNotEmpty(value) {
            if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN')
                return true;
            else
                return false;
        }
        return {
            pageInit: pageInit,
            postSourcing: postSourcing,
            saveRecord: saveRecord,
            fieldChanged: fieldChanged
        };
    });
