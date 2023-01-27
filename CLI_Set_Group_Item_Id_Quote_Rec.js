/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/search', 'N/record', 'N/currentRecord'],
    function (runtime, search, record, currentRecord) {
        function pageInit(context) {
            try {
                var recObj = context.currentRecord;
                var form = recObj.getValue({
                    fieldId: 'customform'
                });
                log.debug("form ", form);
                if (form == 227) {
                    { //for setting mandatory fields
                        var sublistObj = recObj.getSublist({
                            sublistId: 'item'
                        });
                        var billingRule = sublistObj.getColumn({
                            fieldId: 'custcol_oa_billing_rule_type'
                        });
                        billingRule.isMandatory = true;
                        /* var itemGroupType = sublistObj.getColumn({
                            fieldId: 'custcol_telstra_quote_item_group_type'
                        });
                        itemGroupType.isMandatory = true; */
                    }
                    var custId = recObj.getValue({
                        fieldId: 'entity',
                    });
                    log.debug('Customer Id', custId);
                    var jobRec = recObj.getValue({
                        fieldId: 'job',
                    });
                    log.debug('Job Rec Id', jobRec);
                    var sessionObj = runtime.getCurrentSession(); //sessionObj is a runtime.Session object
                    var sessionJobId = sessionObj.get({
                        name: 'jobId'
                    });
                    log.debug('Session Job Id', sessionJobId)
                    if (!sessionJobId) {
                        if (jobRec)
                            sessionObj.set({
                                name: 'jobId',
                                value: jobRec
                            });
                    } else {
                        jobRec = sessionJobId;
                    }
                    if (custId && jobRec) {
                        recObj.setValue({
                            fieldId: 'job',
                            value: jobRec,
                        });
                        var jobData = search.lookupFields({
                            type: 'job',
                            id: jobRec,
                            columns: [
                                'custentity_oa_export_to_openair',
                                'entitystatus',
                                'customer',
                                'custentity_probability_precentage',
                                'custentity_maxim_id',
                                'custentity_flexcab_account_id',
                                'startdate'
                            ]
                        });
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
                        var jobDate = jobData.startdate;
                        log.debug('job Date', jobDate);
                        alert(new Date(jobDate))
                        if (jobDate)
                            recObj.setValue({
                                fieldId: 'trandate',
                                value: new Date(jobDate),
                            });
                        var exportToOA = jobData.custentity_oa_export_to_openair;
                        log.debug('exportToOA', exportToOA);
                        if (exportToOA)
                            recObj.setValue({
                                fieldId: 'custbody_oa_export_to_openair',
                                value: nexportToOA,
                            });
                    } else {
                        log.audit('Script Terminated', 'There is no customer and job rec ids for this quote.')
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
                if (context.fieldId == 'item' && context.sublistId == 'item') {
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
                var groupItemLineNumber = [];
                var pcms = '';
                var billingRule = '';
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
                    //alert(itemSubType)
                    log.debug('quote Line details: ' + line, 'itemType: ' + itemType)
                    var itemId = recObj.getCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'item'
                    });
                    if (itemType == "Group") {
                        groupItemLineNumber.push(line);
                        groupItemId = recObj.getCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'item'
                        });
                        recObj.setCurrentSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_telstra_quote_line_itg_int_id',
                            value: groupItemId
                        });
                        if (itemId)
                            recObj.setCurrentSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_telstra_quote_line_item_int_i',
                                value: itemId
                            });
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
                            value: itemSubType == 'Resale' ? 3 : itemSubType == 'Sale' ? 2 : ''
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
                log.debug('Group Line Arry', groupItemLineNumber)
                for (var grpLine = 0; grpLine < groupItemLineNumber; grpLine++) {
                    log.debug('Group Line grpLine', grpLine)
                    recObj.selectLine({
                        sublistId: 'item',
                        line: grpLine
                    });
                    recObj.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_pcms',
                        value: pcms
                    });
                    recObj.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_oa_billing_rule_type',
                        value: billingRule
                    });
                    recObj.commitLine({
                        sublistId: 'item'
                    })
                }
                return true
            } catch (e) {
                log.error('Cli Quote Error', e);
                alert(e);
            }
        }
        return {
            postSourcing: postSourcing,
            saveRecord: saveRecord,
            pageInit: pageInit
        };
    });