/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

// Load two standard modules.
define(['N/record', 'N/search', 'N/runtime', 'N/ui/serverWidget', 'N/email'],
    // Add the callback function.
    function (record, search, runtime, serverWidget, email) {
        // In the beforeLoad function, disable the Notes field.
        function myBeforeLoad(scriptContext) {
            try {
                //log.debug('runtime.executionContext',runtime.executionContext);
                log.debug('scriptContext.type', scriptContext.type);
                if (scriptContext.type == scriptContext.UserEventType.CREATE) {
                    var recForm = scriptContext.form;
                    log.debug('formrecord', recForm);
                    var newRecord = scriptContext.newRecord;
                    log.debug('newRecord ', newRecord);
                    var vendor_val = newRecord.getValue({
                        fieldId: 'entity'
                    });


                    var customForm = newRecord.getValue({
                        fieldId: 'customform'
                    });
                    log.debug('customForm ', customForm);
                    if (vendor_val) {
                        var recordType = newRecord.type;
                        log.debug('type of record', recordType);
                        var subs_val = newRecord.getValue({
                            fieldId: 'subsidiary'
                        });
                        log.debug("subs_val", subs_val);
                        if (recordType == 'purchaseorder') {

                            var newType = "Purchase Order";
                        }
                        log.debug('newType', newType);
                        if (customForm == 182) {
                            var newForm = "Z - HM PO Form";
                        }
                        log.debug("newForm", newForm);
                        var SearchObj = search.create({
                            type: "customrecord_pre",
                            filters: [
                                ["custrecord_preform", "is", newForm],
                                "AND",
                                ["custrecord_prett", "is", newType],
                                "AND",
                                ["custrecord_presubs", "is", subs_val]
                            ],
                            columns: [
                                // search.createColumn({
                                //     name: "custrecord1403",
                                //     label: "Vendor"
                                // }),
                                search.createColumn({
                                    name: "custrecord_configlink",
                                    label: "Configuration Link"
                                }),
                                search.createColumn({
                                    name: "custrecord_preform",
                                    label: "Form Name"
                                }),
                                search.createColumn({
                                    name: "custrecord_prett",
                                    label: "Record Type"
                                }),
                                search.createColumn({
                                    name: "custrecord_precls",
                                    label: "Class"
                                }),
                                search.createColumn({
                                    name: "custrecord_precnt",
                                    label: "Country"
                                }),
                                search.createColumn({
                                    name: "custrecord_preloc",
                                    label: "Location"
                                }),
                                search.createColumn({
                                    name: "custrecord_predept",
                                    label: "Department"
                                }),
                                search.createColumn({
                                    name: "custrecord_presubs",
                                    label: "Subsidiary"
                                }),
                                search.createColumn({
                                    name: "custrecord_precs1",
                                    label: "Attendance"
                                }),
                                search.createColumn({
                                    name: "custrecord_prefel",
                                    label: "Earned Leave"
                                }),
                                search.createColumn({
                                    name: "custrecord_prefcomp",
                                    label: "Comp Off"
                                }),
                                search.createColumn({
                                    name: "custrecord_prefirst",
                                    label: "First Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_presecond",
                                    label: "Second Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_prethird",
                                    label: "Third Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_fourth",
                                    label: "Fourth Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_prefifth",
                                    label: "Fifth Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_sixth",
                                    label: "Sixth Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_ahseven",
                                    label: "Seventh Approver"
                                }),
                                search.createColumn({
                                    name: "custrecord_preal",
                                    label: "Approval Level"
                                })
                            ]
                        });

                        var searchResult = SearchObj.run().getRange({
                            start: 0,
                            end: 1000
                        });
                        log.debug("searchResult.length", searchResult.length);
                        if (searchResult.length != 0) {
                            for (var ue in searchResult) {
                                // var vend = searchResult[ue].getText({
                                //     name: "custrecord1403",
                                //     label: "Vendor"
                                // });
                                // log.debug("vend", vend);
                                var subsValue = searchResult[ue].getText({
                                    name: "custrecord_presubs",
                                    label: "Subsidiary"
                                });
                                log.debug("subsValue", subsValue);
                                var deptValue = searchResult[ue].getText({
                                    name: "custrecord_predept",
                                    label: "Department"
                                });
                                log.debug("deptValue ", deptValue);
                                var clsValue = searchResult[ue].getText({
                                    name: "custrecord_precls",
                                    label: "Class"
                                });
                                log.debug("clsValue  ", clsValue);
                                var locationValue = searchResult[ue].getText({
                                    name: "custrecord_preloc",
                                    label: "Location"
                                });
                                log.debug("locationValue", locationValue);
                                var alevelValue = searchResult[ue].getValue({
                                    name: "custrecord_preal",
                                    label: "Approval Level"
                                });
                                log.debug("alevelValue", alevelValue);
                                var firstApprover = searchResult[ue].getValue({
                                    name: "custrecord_prefirst",
                                    label: "First Approver"
                                });
                                log.debug("firstApprover", firstApprover);
                                // if (vend)
                                //     log.debug("vendor");
                                // newRecord.setValue({
                                //     fieldId: 'entity',
                                //     value: vend
                                //  });
                                // if (subsValue)
                                //     log.debug("subsidiary");
                                // newRecord.setValue({
                                //     fieldId: 'subsidiary',
                                //     value: subsValue
                                // });
                                // if (deptValue)
                                //     newRecord.setValue({
                                //         fieldId: 'department',
                                //         value: deptValue
                                //     });
                                // if (clsValue)
                                //     newRecord.setValue({
                                //         fieldId: 'class',
                                //         value: clsValue
                                //     });
                                // if (locationValue)
                                //     newRecord.setValue({
                                //         fieldId: 'location',
                                //         value: locationValue
                                //     });
                                if (alevelValue)
                                    newRecord.setValue({
                                        fieldId: 'custbody_ahapp',
                                        value: alevelValue
                                    });
                                if (firstApprover)
                                    log.debug('firstApprover', firstApprover);
                                newRecord.setValue({
                                    fieldId: 'custbody_ah_first_approver',
                                    value: firstApprover
                                });

                            }
                        }

                    }

                }
            } catch (err) {
                log.error('Error occurred in beforeload function', err);
            }
        }




        return {
            beforeLoad: myBeforeLoad

        };
    });

function isNotEmpty(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
        return true;
    else
        return false;
} //