/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/search', 'N/record', 'N/currentRecord', 'N/format', 'N/ui/dialog'],
    function (runtime, search, record, currentRecord, format, dialog) {
        function pageInit(context) {
            try {
                var recObj = context.currentRecord;
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });
                log.debug('Form Id not in create mode ', qform);
                if (qform == 227) {
                    if (context.mode == 'create' || context.mode == 'copy') {
                        log.debug("Inside " + context.mode + ' mode');
                        var recObj = context.currentRecord;
                        var statusId = recObj.getValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                        });
                        log.debug('statusId ', statusId);
                        recObj.setValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                            value: 1,
                        });
                        recObj.setValue({
                            fieldId: 'status',
                            value: 'Open'
                        });
                    }
                    if (context.mode == 'edit') {
                        var status = recObj.getValue({
                            fieldId: 'status',
                        });
                        var qbsstatus = recObj.getValue({
                            fieldId: 'custbody_telstra_quote_booking_status',
                        });
                        if ((status == 'Closed' || status == 'Voided' || status == 'Expired') && qbsstatus != 4)
                            recObj.setValue({
                                fieldId: 'custbody_telstra_quote_booking_status',
                                value: 4 // canceled
                            });
                    }
                }
                /* if (context.mode == 'copy') {
                    recObj.setValue({
                        fieldId: 'status',
                        value: 'Open'
                    });
                    recObj.setValue({
                        fieldId: 'custbody_telstra_quote_booking_status',
                        value: 1
                    });
                } */
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }
        }

        function postSourcing(context) {
            try {
                var recObj = context.currentRecord;
                /* if (context.fieldId == 'item' && context.sublistId == 'item') {
                    log.debug('start', 'any')
                    var itemType = recObj.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'itemtype'
                    });
                    var groupItemId = recObj.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item'
                    });
                    log.debug(itemType, groupItemId)
                    if (itemType == "Group") {
                        recObj.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_telstra_quote_line_itg_int_id',
                            value: groupItemId
                        });
                    }
                    log.debug('end', 'end')
                } */
                if (context.fieldId == 'job') {
                    var qform = recObj.getValue({
                        fieldId: 'customform',
                    });
                    log.debug('Form Id ', qform);
                    var jobRec = recObj.getValue({
                        fieldId: 'job',
                    });
                    log.debug('Job Rec Id ', jobRec);
                    if (qform == 227 && jobRec) {
                        var jobRec = recObj.getValue({
                            fieldId: 'job',
                        });
                        log.debug('Job Rec Id ', jobRec);
                        var jobData = search.lookupFields({
                            type: 'job',
                            id: jobRec,
                            columns: [
                                'custentity_oa_export_to_openair',
                                'custentity_probability_precentage',
                                'custentity_maxim_id',
                                'entitystatus'
                            ]
                        });
                        var jobStatus = jobData.entitystatus;
                        log.debug('jobStatus', jobStatus);
                        var jobProb = jobData.custentity_probability_precentage;
                        log.debug('job Probability', jobProb);
                        if (jobProb)
                            recObj.setValue({
                                fieldId: 'probability',
                                value: jobProb.replace(/\d+% ?/g, ""),
                            });
                        var jobSFopp = jobData.custentity_maxim_id;
                        log.debug('Job SF opp', jobSFopp);
                        if (jobSFopp)
                            recObj.setValue({
                                fieldId: 'custbody20',
                                value: jobSFopp,
                            });
                        var exportToOA = jobData.custentity_oa_export_to_openair;
                        log.debug('exportToOA', exportToOA);
                        if (exportToOA)
                            recObj.setValue({
                                fieldId: 'custbody_oa_export_to_openair',
                                value: exportToOA,
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
                var lineCount = recObj.getLineCount({
                    sublistId: 'item'
                });
                log.debug('quote details', 'line count: ' + lineCount)
                var groupItemId = '';
                var pcms = '';
                var billingRule = '';
                var qform = recObj.getValue({
                    fieldId: 'customform',
                });
                log.debug('Form Id ', qform);
                var jobRec = recObj.getValue({
                    fieldId: 'job',
                });
                log.debug('Job Rec Id ', jobRec);
                if (qform == 227 && isNotEmpty(jobRec)) {
                    for (var line = 0; lineCount > line; line++) {
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
                            // if (billingRule)
                            //     recObj.setCurrentSublistValue({
                            //         sublistId: 'item',
                            //         fieldId: 'custcol_oa_billing_rule_type',
                            //         value: billingRule
                            //     });
                            recObj.commitLine({
                                sublistId: 'item',
                            });
                        } else if (itemType == "EndGroup") {
                            if (groupItemId) {
                                groupItemId = '';
                                recObj.cancelLine({
                                    sublistId: 'item'
                                })
                            }
                        } else {
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
                            log.debug("billingRule before if condn", billingRule);
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
                    var statusId = recObj.getValue({
                        fieldId: 'custbody_telstra_quote_booking_status',
                    });
                    log.debug('statusId ', statusId);
                    if (statusId == 1 || statusId == 2) { // Quote quoted & requoted
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
                    } else if (statusId == 3) { // Quote Approved
                        var newLength = statusQuote(jobRec);
                        if (newLength > 0) {
                            record.submitFields({
                                type: record.Type.JOB,
                                id: jobRec,
                                values: {
                                    entitystatus: 5, // open
                                    custentity_probability_precentage: 100
                                }
                            });
                        } else {
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
                    } else if (statusId == 4) { // Cancelled
                        var newLength = statusQuote(jobRec);
                        if (newLength == 0) {
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
                            log.debug('searchResult.length', searchResult.length);
                            if (searchResult.length > 0) {
                                var cancelledQuoteIds = [];
                                //cancelledQuoteIds.push(recObj.id);
                                for (var i = 0; i < searchResult.length; i++) {
                                    log.debug("searchResult[i]", JSON.stringify(searchResult[i]));
                                    var quoteValue = searchResult[i].getValue({
                                        name: "custbody_telstra_quote_booking_status",
                                        label: "Quote Booking Status"
                                    });
                                    log.debug("quoteValue", quoteValue);
                                    if (quoteValue == 4) {
                                        cancelledQuoteIds.push(searchResult[i].id);
                                    }
                                }
                                log.debug('Compare Results ', 'Search results count : ' + searchResult.length + ' :: Cancelled Quotes Count :: ' + cancelledQuoteIds.length);
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
                                            custentity_probability_precentage: 0
                                        }
                                    });
                                    for (var quoteIdIndex = 0; quoteIdIndex < cancelledQuoteIds.length; quoteIdIndex++) {
                                        record.submitFields({
                                            type: record.Type.ESTIMATE,
                                            id: cancelledQuoteIds[quoteIdIndex],
                                            values: {
                                                probability: 0
                                            }
                                        });
                                    }
                                }
                            }


                        }
                        //return true;
                    }
                    var qtranid = recObj.getValue({
                        fieldId: 'tranid'
                    });
                    log.debug('qtranid ', qtranid);
                    var jobStatus = recObj.getValue({
                        fieldId: 'custbody_telstra_job_status',
                    });
                    log.debug('jobStatus ', jobStatus);
                    var jobStatusText = recObj.getText({
                        fieldId: 'custbody_telstra_job_status',
                    });
                    log.debug('jobStatusText ', jobStatusText);

                    if (jobStatus != 5 && jobStatus != 21 && jobStatus != 22 && isNotEmpty(qtranid)) { // Quoted,initiate,open job status
                        //Quote#QU77673 //Quote #QU77673
                        const str1 = "Quote #"
                        const newq = str1.concat(qtranid);
                        log.debug('newq', newq);
                        var salesLength = salesOrderQuote(newq);
                        log.debug("salesLength ", salesLength);
                        if (salesLength != 0) {
                            alert("You cannot edit Quote with associated sales order or job status: " + jobStatusText);
                            return false;
                        } else {
                            return true;
                        }

                    } else if (jobStatus != 5 && jobStatus != 21 && jobStatus != 22) {
                        alert("You cannot create Quote with the job status: " + jobStatusText);
                        return false;

                    }
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
            saveRecord: saveRecord
        };
    });