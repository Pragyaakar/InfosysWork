/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/currentRecord', 'N/ui/dialog', 'N/log'], function (search, currentRecord, dialog, log) {
    var record = currentRecord.get();
    try {
        function fieldChanged(context) {
            if (context.fieldId == 'custpage_tran_type') {
                var get_parameter = record.getText('custpage_tran_type');
                var tranid = record.getValue('custpage_tran_type');
                var type_rec = '';
                if (get_parameter == "Sales Order") {
                    type_rec = "SalesOrd";
                } else if (get_parameter == "Purchase Order") {
                    type_rec = "PurchOrd";
                } else if (get_parameter == "Invoice") {
                    type_rec = "CustInvc";
                } else if (get_parameter == "Bill") {
                    type_rec = "VendBill";
                } else if (get_parameter == "Employee") {
                    var emp_form = ['Ramsey Employee Form',
                        'Custom Employee Form',
                        'Standard Employee Form'
                    ];




                    var formFieldObj = record.getField('custpage_forms');
                    if (formFieldObj != 0) {
                        var formFieldObj = record.getField('custpage_forms');
                        formFieldObj.removeSelectOption({
                            value: null
                        });
                    }
                    if (emp_form.length != 0) {
                        formFieldObj.insertSelectOption({
                            value: 0,
                            text: ''
                        });
                        for (var e in emp_form) {
                            formFieldObj.insertSelectOption({
                                value: e.toString(),
                                text: emp_form[e].toString()
                            });
                        }
                    }
                } else if (get_parameter == "Leave") {
                    var l_form = ['Standard Leave Record Form', 'Custom Leave Record Form'];
                    var formFieldObj = record.getField('custpage_forms');
                    if (formFieldObj != 0) {
                        var formFieldObj = record.getField('custpage_forms');
                        formFieldObj.removeSelectOption({
                            value: null
                        });
                    }
                    if (l_form.length != 0) {
                        formFieldObj.insertSelectOption({
                            value: 0,
                            text: ''
                        });
                        for (var l in l_form) {
                            formFieldObj.insertSelectOption({
                                value: l.toString(),
                                text: l_form[l].toString()
                            });
                        }
                    }
                }
                var subs_value = record.getValue({
                    fieldId: 'custpage_subsidiary'
                });
                if (subs_value == false) {
                    record.getField('custpage_subsidiary').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_subsidiary',
                        value: false
                    });
                }
                var dept_value = record.getValue({
                    fieldId: 'custpage_department'
                });
                if (dept_value == false) {
                    record.getField('custpage_department').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_department',
                        value: false
                    });
                }
                var loc_value = record.getValue({
                    fieldId: 'custpage_location'
                });
                if (loc_value == false) {
                    record.getField('custpage_location').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_location',
                        value: false
                    });
                }
                var cls_value = record.getValue({
                    fieldId: 'custpage_class'
                });
                if (cls_value == false) {
                    record.getField('custpage_class').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_class',
                        value: false
                    });
                }
                var ct_value = record.getValue({
                    fieldId: 'custpage_country'
                });
                if (ct_value == false) {
                    record.getField('custpage_country').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_country',
                        value: false
                    });
                }
                var at_value = record.getValue({
                    fieldId: 'custpage_attendance'
                });
                if (at_value == false) {
                    record.getField('custpage_attendance').isDisabled = false;
                } else {
                    record.setValue({
                        fieldId: 'custpage_attendance',
                        value: false
                    });
                }
                var el_value = record.getValue({
                    fieldId: 'custpage_leave'
                });
                if (el_value == false) {
                    record.getField('custpage_leave').isDisabled = false;
                } else {

                    record.setValue({
                        fieldId: 'custpage_leave',
                        value: false
                    });
                }
                var co_value = record.getValue({
                    fieldId: 'custpage_comp'
                });
                if (co_value == false) {
                    record.getField('custpage_comp').isDisabled = false;
                } else {

                    record.setValue({
                        fieldId: 'custpage_comp',
                        value: false
                    });
                }
                if (type_rec == "SalesOrd" || type_rec == "PurchOrd" || type_rec == "CustInvc" || type_rec == "VendBill") {
                    var SearchObj = search.create({
                        type: "transaction",
                        filters: [
                            ["mainline", "is", "T"],
                            "AND",
                            ["type", "anyof", type_rec]
                        ],
                        columns: [
                            search.createColumn({
                                name: "type",
                                summary: "GROUP",
                                label: "Type"
                            }),
                            search.createColumn({
                                name: "customform",
                                summary: "GROUP",
                                label: "Custom Form"
                            })
                        ]
                    });
                    var searchResult = SearchObj.run().getRange({
                        start: 0,
                        end: 1000
                    });
                    var formFieldObj = record.getField('custpage_forms');
                    formFieldObj.removeSelectOption({
                        value: null
                    });
                    formFieldObj.insertSelectOption({
                        value: 0,
                        text: ''
                    });
                    if (searchResult.length != 0) {
                        for (var i in searchResult) {
                            var formValue = searchResult[i].getText({
                                name: "customform",
                                summary: "GROUP",
                                label: "Custom Form"
                            });
                            if (formValue)
                                formFieldObj.insertSelectOption({
                                    value: i.toString(),
                                    text: formValue.toString()
                                });
                        }
                    }
                }
                // var tranid = record.getValue('custpage_tran_type');
                // var tranform = record.getText({
                //     fieldId: 'custpage_forms'
                // });
                // var configSearchObj = search.create({
                //     type: "customrecord_configrecord",
                //     filters: [
                //         ["custrecord_transtypecr", "anyof", tranid],
                //         // "AND", 
                //         // ["custrecord_configform","is",tranform ]
                //     ],
                //     columns: [
                //         search.createColumn({
                //             name: "name",
                //             sort: search.Sort.ASC,
                //             label: "ID"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_transtypecr",
                //             label: "Transaction Type"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_configform",
                //             label: "Form Name"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_custseg1cr",
                //             label: "Attendance"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_deptcr",
                //             label: "Department"

                //         }),
                //         search.createColumn({
                //             name: "custrecord_subscr",
                //             label: "Subsidiary"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_classcr",
                //             label: "Class"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_countcr",
                //             label: "Country"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_loccr",
                //             label: "Location"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_compoff",
                //             label: "COMPOFF"
                //         }),
                //         search.createColumn({
                //             name: "custrecord_elconfig",
                //             label: "EARNED LEAVE"
                //         })
                //     ]
                // });
                // var searchResult = configSearchObj.run().getRange({
                //     start: 0,
                //     end: 1000
                // });
                // var numLines = record.getLineCount({
                //     sublistId: 'custpage_sublist'
                // });
                // if (searchResult.length != 0) {
                //     if (numLines > 0) {
                //         for (var scount = 0; scount < numLines; scount++) {
                //             record.removeLine({
                //                 sublistId: 'custpage_sublist',
                //                 line: 0
                //             });
                //         }
                //         numLines = 0;
                //     }
                //     if (numLines == 0) {
                //         for (var subi in searchResult) {
                //             var c_id = searchResult[subi].id;
                //             var recName = searchResult[subi].getValue({
                //                 name: "name",
                //                 sort: search.Sort.ASC,
                //                 label: "ID"
                //             });
                //             var rec_type = searchResult[subi].getText({
                //                 name: "custrecord_transtypecr",
                //                 label: "Transaction Type"
                //             });
                //             var form_name = searchResult[subi].getValue({
                //                 name: "custrecord_configform",
                //                 label: "Form Name"
                //             });
                //             var dept_type = searchResult[subi].getValue({
                //                 name: "custrecord_deptcr",
                //                 label: "Department"
                //             });
                //             var sub_type = searchResult[subi].getValue({
                //                 name: "custrecord_subscr",
                //                 label: "Subsidiary"
                //             });
                //             var loc_type = searchResult[subi].getValue({
                //                 name: "custrecord_loccr",
                //                 label: "Location"
                //             });
                //             var cls_type = searchResult[subi].getValue({
                //                 name: "custrecord_classcr",
                //                 label: "Class"
                //             });
                //             var ct_type = searchResult[subi].getValue({
                //                 name: "custrecord_countcr",
                //                 label: "Country"
                //             });
                //             var at_type = searchResult[subi].getValue({
                //                 name: "custrecord_custseg1cr",
                //                 label: "Attendance"
                //             });

                //             var coff_type = searchResult[subi].getValue({
                //                 name: "custrecord_compoff",
                //                 label: "COMPOFF"
                //             });
                //             var earnl_type = searchResult[subi].getValue({
                //                 name: "custrecord_elconfig",
                //                 label: "EARNED LEAVE"
                //             });
                //             var seg_class_arr = [];
                //             var seg_cls = "";
                //             if (dept_type == true)
                //                 seg_class_arr.push("Department");
                //             if (sub_type == true)
                //                 seg_class_arr.push("Subsidiary");
                //             if (loc_type == true)
                //                 seg_class_arr.push("Location");
                //             if (cls_type == true)
                //                 seg_class_arr.push("Class");
                //             if (ct_type == true)
                //                 seg_class_arr.push("Country");
                //             if (at_type == true)
                //                 seg_class_arr.push("Attendance");
                //             if (coff_type == true)
                //                 seg_class_arr.push("CompOff");
                //             if (earnl_type == true)
                //                 seg_class_arr.push("EarnedLeave");
                //             seg_cls = seg_class_arr.join();
                //             record.selectNewLine({
                //                 sublistId: 'custpage_sublist',
                //             });
                //             record.getSublist({
                //                 sublistId: 'custpage_sublist'
                //             }).getColumn({
                //                 fieldId: 'custpage_id'
                //             }).isDisabled = false
                //             if (c_id)
                //                 record.setCurrentSublistValue({
                //                     sublistId: 'custpage_sublist',
                //                     fieldId: 'custpage_configrecid',
                //                     value: c_id
                //                 });
                //             if (recName)
                //                 record.setCurrentSublistValue({
                //                     sublistId: 'custpage_sublist',
                //                     fieldId: 'custpage_configrecname',
                //                     value: recName
                //                 });
                //             if (seg_cls)
                //                 record.setCurrentSublistValue({
                //                     sublistId: 'custpage_sublist',
                //                     fieldId: 'custpage_values',
                //                     value: seg_cls
                //                 });
                //             if (rec_type)
                //                 record.setCurrentSublistValue({
                //                     sublistId: 'custpage_sublist',
                //                     fieldId: 'custpage_rec_type',
                //                     value: rec_type
                //                 });
                //             if (form_name)
                //                 record.setCurrentSublistValue({
                //                     sublistId: 'custpage_sublist',
                //                     fieldId: 'custpage_formvalue',
                //                     value: form_name
                //                 });
                //             record.commitLine({
                //                 sublistId: 'custpage_sublist'
                //             });
                //         }
                //     }
                // }

            }
            if (context.fieldId == 'custpage_forms') { // start of form field
                var get_form = record.getText({
                    fieldId: 'custpage_forms'
                });

                var recType = record.getValue({
                    fieldId: 'custpage_tran_type'
                });
                var tranid = record.getValue('custpage_tran_type');
                var configSearchObj = search.create({
                    type: "customrecord_configrecord",
                    filters: [
                        ["custrecord_transtypecr", "anyof", tranid],
                        "AND",
                        ["custrecord_configform", "is", get_form]
                    ],
                    columns: [
                        search.createColumn({
                            name: "name",
                            sort: search.Sort.ASC,
                            label: "ID"
                        }),
                        search.createColumn({
                            name: "custrecord_transtypecr",
                            label: "Transaction Type"
                        }),
                        search.createColumn({
                            name: "custrecord_configform",
                            label: "Form Name"
                        }),
                        search.createColumn({
                            name: "custrecord_custseg1cr",
                            label: "Attendance"
                        }),
                        search.createColumn({
                            name: "custrecord_deptcr",
                            label: "Department"

                        }),
                        search.createColumn({
                            name: "custrecord_subscr",
                            label: "Subsidiary"
                        }),
                        search.createColumn({
                            name: "custrecord_classcr",
                            label: "Class"
                        }),
                        search.createColumn({
                            name: "custrecord_countcr",
                            label: "Country"
                        }),
                        search.createColumn({
                            name: "custrecord_loccr",
                            label: "Location"
                        }),
                        search.createColumn({
                            name: "custrecord_compoff",
                            label: "COMPOFF"
                        }),
                        search.createColumn({
                            name: "custrecord_elconfig",
                            label: "EARNED LEAVE"
                        })
                    ]
                });
                var searchResult = configSearchObj.run().getRange({
                    start: 0,
                    end: 1000
                });
                var numLines = record.getLineCount({
                    sublistId: 'custpage_sublist'
                });
                if (searchResult.length != 0) {
                    if (numLines > 0) {
                        for (var scount = 0; scount < numLines; scount++) {
                            record.removeLine({
                                sublistId: 'custpage_sublist',
                                line: 0
                            });
                        }
                        numLines = 0;
                    }
                    if (numLines == 0) {
                        for (var subi in searchResult) {
                            var c_id = searchResult[subi].id;
                            var recName = searchResult[subi].getValue({
                                name: "name",
                                sort: search.Sort.ASC,
                                label: "ID"
                            });
                            var rec_type = searchResult[subi].getText({
                                name: "custrecord_transtypecr",
                                label: "Transaction Type"
                            });
                            var form_name = searchResult[subi].getValue({
                                name: "custrecord_configform",
                                label: "Form Name"
                            });
                            var dept_type = searchResult[subi].getValue({
                                name: "custrecord_deptcr",
                                label: "Department"
                            });
                            var sub_type = searchResult[subi].getValue({
                                name: "custrecord_subscr",
                                label: "Subsidiary"
                            });
                            var loc_type = searchResult[subi].getValue({
                                name: "custrecord_loccr",
                                label: "Location"
                            });
                            var cls_type = searchResult[subi].getValue({
                                name: "custrecord_classcr",
                                label: "Class"
                            });
                            var ct_type = searchResult[subi].getValue({
                                name: "custrecord_countcr",
                                label: "Country"
                            });
                            var at_type = searchResult[subi].getValue({
                                name: "custrecord_custseg1cr",
                                label: "Attendance"
                            });

                            var coff_type = searchResult[subi].getValue({
                                name: "custrecord_compoff",
                                label: "COMPOFF"
                            });
                            var earnl_type = searchResult[subi].getValue({
                                name: "custrecord_elconfig",
                                label: "EARNED LEAVE"
                            });
                            var seg_class_arr = [];
                            var seg_cls = "";
                            if (dept_type == true)
                                seg_class_arr.push("Department");
                            if (sub_type == true)
                                seg_class_arr.push("Subsidiary");
                            if (loc_type == true)
                                seg_class_arr.push("Location");
                            if (cls_type == true)
                                seg_class_arr.push("Class");
                            if (ct_type == true)
                                seg_class_arr.push("Country");
                            if (at_type == true)
                                seg_class_arr.push("Attendance");
                            if (coff_type == true)
                                seg_class_arr.push("CompOff");
                            if (earnl_type == true)
                                seg_class_arr.push("EarnedLeave");
                            seg_cls = seg_class_arr.join();
                            record.selectNewLine({
                                sublistId: 'custpage_sublist',
                            });
                            record.getSublist({
                                sublistId: 'custpage_sublist'
                            }).getColumn({
                                fieldId: 'custpage_id'
                            }).isDisabled = false
                            if (c_id)
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_configrecid',
                                    value: c_id
                                });
                            if (recName)
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_configrecname',
                                    value: recName
                                });
                            if (seg_cls)
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_values',
                                    value: seg_cls
                                });
                            if (rec_type)
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_rec_type',
                                    value: rec_type
                                });
                            if (form_name)
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_formvalue',
                                    value: form_name
                                });
                            record.commitLine({
                                sublistId: 'custpage_sublist'
                            });
                        }
                    }
                }
                var customrecord_ahclsSearchObj = search.create({ // classification 407 update search
                    type: "customrecord_ahcls",
                    filters: [
                        ["name", "is", get_form],
                        "AND",
                        ["custrecord1393", "anyof", tranid]
                    ],
                    columns: [
                        search.createColumn({
                            name: "custrecord1395",
                            label: "Department"
                        }),
                        search.createColumn({
                            name: "custrecord1396",
                            label: "Subsidiary"
                        }),
                        search.createColumn({
                            name: "custrecord1397",
                            label: "class"
                        }),
                        search.createColumn({
                            name: "custrecord1398",
                            label: "Location"
                        }),
                        search.createColumn({
                            name: "custrecord1399",
                            label: "Country"
                        }),
                        search.createColumn({
                            name: "custrecord1400",
                            label: "Attendance"
                        }),
                        search.createColumn({
                            name: "custrecord1401",
                            label: "Comp Off"
                        }),
                        search.createColumn({
                            name: "custrecord1402",
                            label: "Earned Leave"
                        })
                    ]
                });
                var searchResult = customrecord_ahclsSearchObj.run().getRange({
                    start: 0,
                    end: 1
                });
                if (searchResult.length != 0) {
                    var dept_enable = searchResult[0].getValue({
                        name: "custrecord1395",
                        label: "Department"
                    });
                    var subs_enable = searchResult[0].getValue({
                        name: "custrecord1396",
                        label: "Subsidiary"
                    });
                    var cls_enable = searchResult[0].getValue({
                        name: "custrecord1397",
                        label: "class"
                    });
                    var loc_enable = searchResult[0].getValue({
                        name: "custrecord1398",
                        label: "Location"
                    });
                    var cnt_enable = searchResult[0].getValue({
                        name: "custrecord1399",
                        label: "Country"
                    });
                    var attendance_enable = searchResult[0].getValue({
                        name: "custrecord1400",
                        label: "Attendance"
                    });
                    var comp_enable = searchResult[0].getValue({
                        name: "custrecord1401",
                        label: "Comp Off"
                    });
                    var earnedleave_enable = searchResult[0].getValue({
                        name: "custrecord1402",
                        label: "Earned Leave"
                    });
                    if (dept_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_department',
                            value: dept_enable,
                        });
                        record.getField('custpage_department').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_department',
                            value: false,
                        });
                        record.getField('custpage_department').isDisabled = true;
                    }
                    if (subs_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_subsidiary',
                            value: subs_enable,
                        });
                        record.getField('custpage_subsidiary').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_subsidiary',
                            value: false,
                        });
                        record.getField('custpage_subsidiary').isDisabled = true;
                    }
                    if (cls_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_class',
                            value: cls_enable,
                        });
                        record.getField('custpage_class').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_class',
                            value: false,
                        });
                        record.getField('custpage_class').isDisabled = true;
                    }
                    if (loc_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_location',
                            value: loc_enable,
                        });
                        record.getField('custpage_location').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_location',
                            value: false,
                        });
                        record.getField('custpage_location').isDisabled = true;
                    }
                    if (cnt_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_country',
                            value: cnt_enable,
                        });
                        record.getField('custpage_country').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_country',
                            value: false,
                        });
                        record.getField('custpage_country').isDisabled = true;
                    }
                    if (attendance_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_attendance',
                            value: attendance_enable,
                        });
                        record.getField('custpage_attendance').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_attendance',
                            value: false,
                        });
                        record.getField('custpage_attendance').isDisabled = true;
                    }
                    if (comp_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_comp',
                            value: comp_enable,
                        });
                        record.getField('custpage_comp').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_comp',
                            value: false,
                        });
                        record.getField('custpage_comp').isDisabled = true;
                    }
                    if (earnedleave_enable == true) {
                        record.setValue({
                            fieldId: 'custpage_leave',
                            value: earnedleave_enable,
                        });
                        record.getField('custpage_leave').isDisabled = false;
                    } else {
                        record.setValue({
                            fieldId: 'custpage_leave',
                            value: false,
                        });
                        record.getField('custpage_leave').isDisabled = true;
                    }
                    var configSearchObj = search.create({
                        type: "customrecord_configrecord",
                        filters: [],
                    });
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_transtypecr',
                        operator: search.Operator.ANYOF,
                        values: recType
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_configform',
                        operator: search.Operator.IS,
                        values: get_form
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_custseg1cr',
                        operator: search.Operator.IS,
                        values: attendance_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_deptcr',
                        operator: search.Operator.IS,
                        values: dept_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_classcr',
                        operator: search.Operator.IS,
                        values: cls_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_countcr',
                        operator: search.Operator.IS,
                        values: cnt_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_subscr',
                        operator: search.Operator.IS,
                        values: subs_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_loccr',
                        operator: search.Operator.IS,
                        values: loc_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_compoff',
                        operator: search.Operator.IS,
                        values: comp_enable ? "T" : "F"
                    }));
                    configSearchObj.filters.push(search.createFilter({
                        name: 'custrecord_elconfig',
                        operator: search.Operator.IS,
                        values: earnedleave_enable ? "T" : "F"
                    }));
                    var configResults = configSearchObj.run().getRange({
                        start: 0,
                        end: 1
                    });
                    if (configResults.length != 0) {
                        var configRecId = configResults[0].id;

                        var flag = 0;
                        var lineNumber = record.findSublistLineWithValue({
                            sublistId: 'custpage_sublist',
                            fieldId: 'custpage_configrecid',
                            value: configRecId
                        })

                        if (lineNumber == 0) {
                            lineNumber++;
                            flag = 1;
                        }

                        if (lineNumber > 0) {
                            if (flag == 1) {
                                lineNumber--;
                            }
                            alert('This form is available in the below configuration record List ');
                            // alert('This form is available in the below configuration record line number : ' + lineNumber);
                            record.selectLine({
                                sublistId: 'custpage_sublist',
                                line: lineNumber
                            });
                            record.setCurrentSublistValue({
                                sublistId: 'custpage_sublist',
                                fieldId: 'custpage_id',
                                value: false
                            });
                            record.commitLine({
                                sublistId: 'custpage_sublist'
                            });
                        }
                    } else {
                        alert('This Form does not matched with any of the existing Configuration records');
                    }
                } else {
                    // creation of classification record alert 
                    alert("Create Classification Record");
                    var subs_value = record.getValue({
                        fieldId: 'custpage_subsidiary'
                    });
                    if (subs_value == true) {
                        record.setValue({
                            fieldId: 'custpage_subsidiary',
                            value: false
                        });
                        record.getField('custpage_subsidiary').isDisabled = true;
                    } else {
                        record.getField('custpage_subsidiary').isDisabled = true;
                    }
                    var dept_value = record.getValue({
                        fieldId: 'custpage_department'
                    });
                    if (dept_value == true) {
                        record.setValue({
                            fieldId: 'custpage_department',
                            value: false
                        });
                        record.getField('custpage_department').isDisabled = true;
                    } else {
                        record.getField('custpage_department').isDisabled = true;
                    }
                    var loc_value = record.getValue({
                        fieldId: 'custpage_location'
                    });
                    if (loc_value == true) {
                        record.setValue({
                            fieldId: 'custpage_location',
                            value: false
                        });
                        record.getField('custpage_location').isDisabled = true;
                    } else {
                        record.getField('custpage_location').isDisabled = true;
                    }
                    var cls_value = record.getValue({
                        fieldId: 'custpage_class'
                    });
                    if (cls_value == true) {
                        record.setValue({
                            fieldId: 'custpage_class',
                            value: false
                        });
                        record.getField('custpage_class').isDisabled = true;
                    } else {
                        record.getField('custpage_class').isDisabled = true;
                    }
                    var ct_value = record.getValue({
                        fieldId: 'custpage_country'
                    });
                    if (ct_value == true) {
                        record.setValue({
                            fieldId: 'custpage_country',
                            value: false
                        });
                        record.getField('custpage_country').isDisabled = true;
                    } else {
                        record.getField('custpage_country').isDisabled = true;
                    }
                    var at_value = record.getValue({
                        fieldId: 'custpage_attendance'
                    });
                    if (at_value == true) {
                        record.setValue({
                            fieldId: 'custpage_attendance',
                            value: false
                        });
                        record.getField('custpage_attendance').isDisabled = true;
                    } else {
                        record.getField('custpage_attendance').isDisabled = true;
                    }
                    var el_value = record.getValue({
                        fieldId: 'custpage_leave'
                    });
                    if (el_value == true) {
                        record.setValue({
                            fieldId: 'custpage_leave',
                            value: false
                        });
                        record.getField('custpage_leave').isDisabled = true;
                    } else {
                        record.getField('custpage_leave').isDisabled = true;
                    }
                    var co_value = record.getValue({
                        fieldId: 'custpage_comp'
                    });
                    if (co_value == true) {
                        record.setValue({
                            fieldId: 'custpage_comp',
                            value: false
                        });
                        record.getField('custpage_comp').isDisabled = true;
                    } else {
                        record.getField('custpage_comp').isDisabled = true;
                    }
                }
            }
            if (context.fieldId == 'custpage_id') {
                var get_check = record.getCurrentSublistValue({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_id'
                });
                if (get_check == true) {
                    var getFormFieldVal = record.getText('custpage_forms');
                    if (getFormFieldVal == "-New-" || getFormFieldVal == '' || !getFormFieldVal) {
                        alert("Please Select Form");
                        record.setCurrentSublistValue({
                            sublistId: 'custpage_sublist',
                            fieldId: 'custpage_id',
                            value: false
                        });
                        return false;
                    } else {
                        var numLines = record.getLineCount({
                            sublistId: 'custpage_sublist'
                        });
                        // alert("numLines "+numLines );
                        var currentLineNumber = record.getCurrentSublistIndex({
                            sublistId: 'custpage_sublist'
                        });
                        // alert("currentLineNumber  "+currentLineNumber );
                        if (numLines == currentLineNumber + 1) {
                            var lineNumber = record.findSublistLineWithValue({
                                sublistId: 'custpage_sublist',
                                fieldId: 'custpage_id',
                                value: 'T'
                            });
                            //alert("lineNumber  "+lineNumber );
                            if (lineNumber > 0) {
                                record.selectLine({
                                    sublistId: 'custpage_sublist',
                                    line: lineNumber
                                });
                                record.setCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_id',
                                    value: false
                                });
                                record.commitLine({
                                    sublistId: 'custpage_sublist'
                                });
                            } // added if else line 1012
                            else {
                                // record.selectLine({
                                //     sublistId: 'custpage_sublist',
                                //     line: numLines - 1
                                // }); // need to remove if doesnot work below if conditions 830
                                for (var index = 0; index < numLines; index++) {
                                    record.selectLine({
                                        sublistId: 'custpage_sublist',
                                        line: index
                                    });
                                    if (currentLineNumber != index) {
                                        record.setCurrentSublistValue({
                                            sublistId: 'custpage_sublist',
                                            fieldId: 'custpage_id',
                                            value: false
                                        });
                                    } else {
                                        record.setCurrentSublistValue({
                                            sublistId: 'custpage_sublist',
                                            fieldId: 'custpage_id',
                                            value: true,
                                            ignoreFieldChange: true
                                        })
                                    }
                                    var get_check = record.getCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_id'
                                    });
                                    var recid = record.getCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_configrecid'
                                    });
                                    if (get_check == true && recid) {
                                        record.commitLine({
                                            sublistId: 'custpage_sublist'
                                        });
                                    }
                                }

                                var subs_value = record.getValue({
                                    fieldId: 'custpage_subsidiary'
                                });
                                if (subs_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_subsidiary',
                                        value: false
                                    });
                                    record.getField('custpage_subsidiary').isDisabled = true;
                                } else {
                                    record.getField('custpage_subsidiary').isDisabled = true;
                                }
                                var dept_value = record.getValue({
                                    fieldId: 'custpage_department'
                                });
                                if (dept_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_department',
                                        value: false
                                    });
                                    record.getField('custpage_department').isDisabled = true;
                                } else {
                                    record.getField('custpage_department').isDisabled = true;
                                }
                                var loc_value = record.getValue({
                                    fieldId: 'custpage_location'
                                });
                                if (loc_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_location',
                                        value: false
                                    });
                                    record.getField('custpage_location').isDisabled = true;
                                } else {
                                    record.getField('custpage_location').isDisabled = true;
                                }
                                var cls_value = record.getValue({
                                    fieldId: 'custpage_class'
                                });
                                if (cls_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_class',
                                        value: false
                                    });
                                    record.getField('custpage_class').isDisabled = true;
                                } else {
                                    record.getField('custpage_class').isDisabled = true;
                                }
                                var ct_value = record.getValue({
                                    fieldId: 'custpage_country'
                                });
                                if (ct_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_country',
                                        value: false
                                    });
                                    record.getField('custpage_country').isDisabled = true;
                                } else {
                                    record.getField('custpage_country').isDisabled = true;
                                }
                                var at_value = record.getValue({
                                    fieldId: 'custpage_attendance'
                                });
                                if (at_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_attendance',
                                        value: false
                                    });
                                    record.getField('custpage_attendance').isDisabled = true;
                                } else {
                                    record.getField('custpage_attendance').isDisabled = true;
                                }
                                var el_value = record.getValue({
                                    fieldId: 'custpage_leave'
                                });
                                if (el_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_leave',
                                        value: false
                                    });
                                    record.getField('custpage_leave').isDisabled = true;
                                } else {
                                    record.getField('custpage_leave').isDisabled = true;
                                }
                                var co_value = record.getValue({
                                    fieldId: 'custpage_comp'
                                });
                                if (co_value == true) {
                                    record.setValue({
                                        fieldId: 'custpage_comp',
                                        value: false
                                    });
                                    record.getField('custpage_comp').isDisabled = true;
                                } else {
                                    record.getField('custpage_comp').isDisabled = true;
                                }


                            }
                            //return false;
                        } else {
                            for (var index = 0; index < numLines; index++) {
                                record.selectLine({
                                    sublistId: 'custpage_sublist',
                                    line: index
                                });
                                if (currentLineNumber != index) {
                                    record.setCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_id',
                                        value: false
                                    });
                                } else {
                                    record.setCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_id',
                                        value: true,
                                        ignoreFieldChange: true
                                    })
                                }
                                var get_check = record.getCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_id'
                                });
                                var recid = record.getCurrentSublistValue({
                                    sublistId: 'custpage_sublist',
                                    fieldId: 'custpage_configrecid'
                                });
                                if (get_check == true && recid) {
                                    record.commitLine({
                                        sublistId: 'custpage_sublist'
                                    });
                                }
                                if (numLines == currentLineNumber && !recid) {
                                    alert('cancel')
                                    record.setCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_id',
                                        value: false,
                                    });
                                } else if (numLines - 1 == currentLineNumber && !recid) {
                                    alert('cancel')
                                    record.setCurrentSublistValue({
                                        sublistId: 'custpage_sublist',
                                        fieldId: 'custpage_id',
                                        value: false,
                                    });
                                    /* record.cancelLine({
                                         sublistId: 'custpage_sublist'
                                      })*/
                                }
                            }
                        }
                    }
                    var subs_value = record.getValue({
                        fieldId: 'custpage_subsidiary'
                    });
                    if (subs_value == true) {
                        record.setValue({
                            fieldId: 'custpage_subsidiary',
                            value: false
                        });
                        record.getField('custpage_subsidiary').isDisabled = true;
                    } else {
                        record.getField('custpage_subsidiary').isDisabled = true;
                    }
                    var dept_value = record.getValue({
                        fieldId: 'custpage_department'
                    });
                    if (dept_value == true) {
                        record.setValue({
                            fieldId: 'custpage_department',
                            value: false
                        });
                        record.getField('custpage_department').isDisabled = true;
                    } else {
                        record.getField('custpage_department').isDisabled = true;
                    }
                    var loc_value = record.getValue({
                        fieldId: 'custpage_location'
                    });
                    if (loc_value == true) {
                        record.setValue({
                            fieldId: 'custpage_location',
                            value: false
                        });
                        record.getField('custpage_location').isDisabled = true;
                    } else {
                        record.getField('custpage_location').isDisabled = true;
                    }
                    var cls_value = record.getValue({
                        fieldId: 'custpage_class'
                    });
                    if (cls_value == true) {
                        record.setValue({
                            fieldId: 'custpage_class',
                            value: false
                        });
                        record.getField('custpage_class').isDisabled = true;
                    } else {
                        record.getField('custpage_class').isDisabled = true;
                    }
                    var ct_value = record.getValue({
                        fieldId: 'custpage_country'
                    });
                    if (ct_value == true) {
                        record.setValue({
                            fieldId: 'custpage_country',
                            value: false
                        });
                        record.getField('custpage_country').isDisabled = true;
                    } else {
                        record.getField('custpage_country').isDisabled = true;
                    }
                    var at_value = record.getValue({
                        fieldId: 'custpage_attendance'
                    });
                    if (at_value == true) {
                        record.setValue({
                            fieldId: 'custpage_attendance',
                            value: false
                        });
                        record.getField('custpage_attendance').isDisabled = true;
                    } else {
                        record.getField('custpage_attendance').isDisabled = true;
                    }
                    var el_value = record.getValue({
                        fieldId: 'custpage_leave'
                    });
                    if (el_value == true) {
                        record.setValue({
                            fieldId: 'custpage_leave',
                            value: false
                        });
                        record.getField('custpage_leave').isDisabled = true;
                    } else {
                        record.getField('custpage_leave').isDisabled = true;
                    }
                    var co_value = record.getValue({
                        fieldId: 'custpage_comp'
                    });
                    if (co_value == true) {
                        record.setValue({
                            fieldId: 'custpage_comp',
                            value: false
                        });
                        record.getField('custpage_comp').isDisabled = true;
                    } else {
                        record.getField('custpage_comp').isDisabled = true;
                    }
                } else if (get_check == false) { // start of else start of else start of else start of else 

                    var get_formn = record.getText({
                        fieldId: 'custpage_forms'
                    });
                    // var recTypen = record.getValue({
                    //     fieldId: 'custpage_tran_type'
                    // });
                    var tranidn = record.getValue('custpage_tran_type');
                    var ahclsSearchObj = search.create({
                        type: "customrecord_ahcls",
                        filters: [
                            ["name", "is", get_formn],
                            "AND",
                            ["custrecord1393", "anyof", tranidn]
                        ],
                        columns: [
                            search.createColumn({
                                name: "custrecord1395",
                                label: "Department"
                            }),
                            search.createColumn({
                                name: "custrecord1396",
                                label: "Subsidiary"
                            }),
                            search.createColumn({
                                name: "custrecord1397",
                                label: "class"
                            }),
                            search.createColumn({
                                name: "custrecord1398",
                                label: "Location"
                            }),
                            search.createColumn({
                                name: "custrecord1399",
                                label: "Country"
                            }),
                            search.createColumn({
                                name: "custrecord1400",
                                label: "Attendance"
                            }),
                            search.createColumn({
                                name: "custrecord1401",
                                label: "Comp Off"
                            }),
                            search.createColumn({
                                name: "custrecord1402",
                                label: "Earned Leave"
                            })
                        ]
                    });
                    var searchResultn = ahclsSearchObj.run().getRange({
                        start: 0,
                        end: 1
                    });
                    if (searchResultn.length != 0) {
                        var dept_enable = searchResultn[0].getValue({
                            name: "custrecord1395",
                            label: "Department"
                        });
                        var subs_enable = searchResultn[0].getValue({
                            name: "custrecord1396",
                            label: "Subsidiary"
                        });
                        var cls_enable = searchResultn[0].getValue({
                            name: "custrecord1397",
                            label: "class"
                        });
                        var loc_enable = searchResultn[0].getValue({
                            name: "custrecord1398",
                            label: "Location"
                        });
                        var cnt_enable = searchResultn[0].getValue({
                            name: "custrecord1399",
                            label: "Country"
                        });
                        var attendance_enable = searchResultn[0].getValue({
                            name: "custrecord1400",
                            label: "Attendance"
                        });
                        var comp_enable = searchResultn[0].getValue({
                            name: "custrecord1401",
                            label: "Comp Off"
                        });
                        var earnedleave_enable = searchResultn[0].getValue({
                            name: "custrecord1402",
                            label: "Earned Leave"
                        });
                        if (dept_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_department',
                                value: dept_enable,
                            });
                            record.getField('custpage_department').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_department',
                                value: false,
                            });
                            record.getField('custpage_department').isDisabled = true;
                        }
                        if (subs_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_subsidiary',
                                value: subs_enable,
                            });
                            record.getField('custpage_subsidiary').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_subsidiary',
                                value: false,
                            });
                            record.getField('custpage_subsidiary').isDisabled = true;
                        }
                        if (cls_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_class',
                                value: cls_enable,
                            });
                            record.getField('custpage_class').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_class',
                                value: false,
                            });
                            record.getField('custpage_class').isDisabled = true;
                        }
                        if (loc_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_location',
                                value: loc_enable,
                            });
                            record.getField('custpage_location').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_location',
                                value: false,
                            });
                            record.getField('custpage_location').isDisabled = true;
                        }
                        if (cnt_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_country',
                                value: cnt_enable,
                            });
                            record.getField('custpage_country').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_country',
                                value: false,
                            });
                            record.getField('custpage_country').isDisabled = true;
                        }
                        if (attendance_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_attendance',
                                value: attendance_enable,
                            });
                            record.getField('custpage_attendance').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_attendance',
                                value: false,
                            });
                            record.getField('custpage_attendance').isDisabled = true;
                        }
                        if (comp_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_comp',
                                value: comp_enable,
                            });
                            record.getField('custpage_comp').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_comp',
                                value: false,
                            });
                            record.getField('custpage_comp').isDisabled = true;
                        }
                        if (earnedleave_enable == true) {
                            record.setValue({
                                fieldId: 'custpage_leave',
                                value: earnedleave_enable,
                            });
                            record.getField('custpage_leave').isDisabled = false;
                        } else {
                            record.setValue({
                                fieldId: 'custpage_leave',
                                value: false,
                            });
                            record.getField('custpage_leave').isDisabled = true;
                        }
                    }
                    //end of the above search code
                    // var subs_value = record.getValue({
                    //     fieldId: 'custpage_subsidiary'
                    // });
                    // if (subs_value == false) {
                    //     record.getField('custpage_subsidiary').isDisabled = true;
                    // }
                    // var dept_value = record.getValue({
                    //     fieldId: 'custpage_department'
                    // });
                    // if (dept_value == false) {
                    //     record.getField('custpage_department').isDisabled = true;
                    // }
                    // var loc_value = record.getValue({
                    //     fieldId: 'custpage_location'
                    // });
                    // if (loc_value == false) {
                    //     record.getField('custpage_location').isDisabled = true;
                    // }
                    // var cls_value = record.getValue({
                    //     fieldId: 'custpage_class'
                    // });
                    // if (cls_value == false) {
                    //     record.getField('custpage_class').isDisabled = true;
                    // }
                    // var ct_value = record.getValue({
                    //     fieldId: 'custpage_country'
                    // });
                    // if (ct_value == false) {
                    //     record.getField('custpage_country').isDisabled = true;
                    // }
                    // var at_value = record.getValue({
                    //     fieldId: 'custpage_attendance'
                    // });
                    // if (at_value == false) {
                    //     record.getField('custpage_attendance').isDisabled = true;
                    // }
                    // var el_value = record.getValue({
                    //     fieldId: 'custpage_leave'
                    // });
                    // if (el_value == false) {
                    //     record.getField('custpage_leave').isDisabled = true;
                    // }
                    // var co_value = record.getValue({
                    //     fieldId: 'custpage_comp'
                    // });
                    // if (co_value == false) {
                    //     record.getField('custpage_comp').isDisabled = true;
                    // }

                }
            }
        }

        function saveRecord(context) {

            var get_form = record.getText({
                fieldId: 'custpage_forms'
            });
            var get_check = record.getCurrentSublistValue({
                sublistId: 'custpage_sublist',
                fieldId: 'custpage_id'
            });
            // alert("get_check"+get_check);
            var subs_value = record.getValue({
                fieldId: 'custpage_subsidiary'
            });
            // alert("subs_value "+subs_value );

            var dept_value = record.getValue({
                fieldId: 'custpage_department'
            });

            var loc_value = record.getValue({
                fieldId: 'custpage_location'
            });

            var cls_value = record.getValue({
                fieldId: 'custpage_class'
            });

            var ct_value = record.getValue({
                fieldId: 'custpage_country'
            });

            var at_value = record.getValue({
                fieldId: 'custpage_attendance'
            });

            var el_value = record.getValue({
                fieldId: 'custpage_leave'
            });

            var co_value = record.getValue({
                fieldId: 'custpage_comp'
            });


            if (!get_form || get_form == "-New-" || get_form == '') {
                dialog.alert({
                    title: 'Form  Needed',
                    message: 'Please select Form '
                });
                return false;
            } // else if (get_check == false && subs_value == false && dept_value == false && cls_value == false && ct_value == false && loc_value == false && at_value == false && el_value == false && co_value == false) {
            //     dialog.alert({
            //         title: 'Select Combination',
            //         message: 'Please select combination for preference record'
            //     });
            //     return false;

            // } 
            else {
                return true;
            }
        }







    } catch (e) {
        log.error('Unexpected Error', e);
        context.response.write('Unexpected Error. Please Contact your Administrator. Error:: ' + e);
    }
    return {
        fieldChanged: fieldChanged,
        saveRecord: saveRecord

    };
});