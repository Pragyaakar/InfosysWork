/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/search', 'N/currentRecord', 'N/ui/dialog', 'N/log'], function (search, currentRecord, dialog, log) {
    var record = currentRecord.get();
    try {
        function pageInit(context) {
            var get_parameter = record.getText('custpage_typerecord');
            var tranid = record.getValue('custpage_typerecord');
            var config_form = record.getValue("custpage_recform");
            var config_formn = record.getText("custpage_recform");
            // alert("config_form" + config_form);
            // alert("config_formn" + config_formn);


            // alert("tranid" + tranid);
            var type_rec = '';
            if (get_parameter == "Sales Order") {
                type_rec = "SalesOrd";
            } else if (get_parameter == "Purchase Order") {
                type_rec = "PurchOrd";
            } else if (get_parameter == "Invoice") {
                type_rec = "CustInvc";
            } else if (get_parameter == "Bill") {
                type_rec = "VendBill";
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
                var formFieldObj = record.getField('custpage_recform');
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
        }
        // function pageInit(context){
        //     var getform = record.getText({
        //         fieldId: "custpage_recform",
        //     });
        //     // var forms = getform.join(', ');
        //     var getformn = record.setValue({
        //         fieldId: "custpage_recform",
        //     });

        // }


        function fieldChanged(context) {

            if (context.fieldId == 'custpage_approver') {
                var get_approver = record.getCurrentSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_approver',
                    // line: 0
                });
                alert('get_approver' + get_approver);



                if (get_approver == "Level 1") {
                    // log.debug("First approver", get_approver)
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_first',
                        // line: 0
                    }).isDisabled = false;
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_second',
                        // line: 0 ,
                        value: '',
                        //value: null,
                    });

                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_second',
                        // line: 0 ,
                    }).isDisabled = true;

                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_third',
                        // line: 0 ,
                        value: '',
                        //value: null,
                    });
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_third',

                    }).isDisabled = true;

                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',

                        value: '',
                        //value: null,
                    });

                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',
                        // line: 0 ,

                    }).isDisabled = true;

                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',

                        value: '',
                        //value: null,
                    });
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',

                    }).isDisabled = true;

                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',

                        value: '',
                        //value: null,
                    });
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',

                    }).isDisabled = true;


                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',

                        value: '',
                        //value: null,
                    });
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',

                    }).isDisabled = true;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first' }).isMandatory = true;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second'}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third'}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth'}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth'}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth'}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh'}).isMandatory = false;




                } else if (get_approver == "Level 2") {
                    // type_rec = "PurchOrd";
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_first',
                        line: 0

                    }).isDisabled = false;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_second',
                        line: 0
                    }).isDisabled = false;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_third',
                        line: 0
                    }).isDisabled = true;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',
                        line: 0
                    }).isDisabled = true;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',
                        line: 0
                    }).isDisabled = true;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',
                        line: 0
                    }).isDisabled = true;
                    record.getCurrentSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',
                        line: 0
                    }).isDisabled = true;
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_third',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',
                        line: 0,
                        value: '',
                        //value: null,
                    });

                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first', line: 0 }).isMandatory = true;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second', line: 0}).isMandatory = true;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third', line: 0}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth', line: 0}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth', line: 0}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth', line: 0}).isMandatory = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh', line: 0}).isMandatory = false;

                } else if (get_approver == "Level 3") {

                    // alert("inside level 3");
                    record.getField({
                        //sublistId: 'custpage_sublist',
                        fieldId: 'custpage_first',
                        //line: 0,
                    }).isDisabled = false;
                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_second',
                        line: 0,
                    }).isDisabled = false;
                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_third',
                        line: 0,
                    }).isDisabled = false;
                    record.setValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',
                        line: 0,
                        value: '',
                        //value: null,
                    });


                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fourth',
                        line: 0,
                    }).isDisabled = true;
                    record.setValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_fifth',
                        line: 0,
                    }).isDisabled = true;
                    record.setValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',
                        line: 0,
                        value: '',
                    });
                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_sixth',
                        line: 0,
                    }).isDisabled = true;
                    record.setValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',
                        line: 0,
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_seventh',
                        line: 0,
                    }).isDisabled = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first', line: 0 }).isMandatory = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second', line: 0}).isMandatory = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third', line: 0}).isMandatory = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth', line: 0}).isMandatory = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth', line: 0}).isMandatory = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth', line: 0}).isMandatory = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh', line: 0}).isMandatory = false;





                } else if (get_approver == "Level 4") {

                    //type_rec = "VendBill";
                    var newfst = record.getField({
                        fieldId: 'custpage_first'
                    });
                    alert('test done' + JSON.stringify(newfst));
                    newfst.isDisabled = true;

                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = true;
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = true;
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = true;

                    record.setValue({
                        fieldId: 'custpage_fifth',
                        value: '',
                        //value: null,
                    });
                    record.setValue({
                        fieldId: 'custpage_sixth',
                        value: '',
                        //value: null,
                    });
                    record.setValue({
                        fieldId: 'custpage_seventh',
                        value: '',
                        //value: null,
                    });
                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = true;
                    record.getField('custpage_third').isMandatory = true;
                    record.getField('custpage_fourth').isMandatory = true;
                    record.getField('custpage_fifth').isMandatory = false;
                    record.getField('custpage_sixth').isMandatory = false;
                    record.getField('custpage_seventh').isMandatory = false;
                } else if (get_approver == "Level 5") {
                    // type_rec = "VendBill";
                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = true;
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = true;
                    record.setValue({
                        fieldId: 'custpage_sixth',
                        value: '',
                        //value: null,
                    });
                    record.setValue({
                        fieldId: 'custpage_seventh',
                        value: '',
                        //value: null,
                    });
                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = true;
                    record.getField('custpage_third').isMandatory = true;
                    record.getField('custpage_fourth').isMandatory = true;
                    record.getField('custpage_fifth').isMandatory = true;
                    record.getField('custpage_sixth').isMandatory = false;
                    record.getField('custpage_seventh').isMandatory = false;
                } else if (get_approver == "Level 6") {
                    //type_rec = "VendBill";

                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = true;
                    record.setValue({
                        fieldId: 'custpage_seventh',
                        value: '',
                        // value: null,
                    });
                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = true;
                    record.getField('custpage_third').isMandatory = true;
                    record.getField('custpage_fourth').isMandatory = true;
                    record.getField('custpage_fifth').isMandatory = true;
                    record.getField('custpage_sixth').isMandatory = true;
                    record.getField('custpage_seventh').isMandatory = false;
                } else if (get_approver == "Level 7") {
                    //type_rec = "VendBill";
                    // record.getField({fieldId:'custpage_seventh'}).isDisabled = true;

                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    var appthird = record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = false;
                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = true;
                    record.getField('custpage_third').isMandatory = true;
                    record.getField('custpage_fourth').isMandatory = true;
                    record.getField('custpage_fifth').isMandatory = true;
                    record.getField('custpage_sixth').isMandatory = true;
                    record.getField('custpage_seventh').isMandatory = true;


                }


            }

            if (context.fieldId == 'custpage_slevel') {
                var slevel = record.getCurrentSublistValue({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_slevel',


                });
                alert('slevel' + slevel);
                if (slevel == true) {
                    slevel.isMandatory = true;
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_mlevel',
                        value: false,
                    });
                    record.getSublistField({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_mlevel'
                    }).isDisabled = true;

                    // record.getField('custpage_single').isVisible = true;
                    // record.getField('custpage_role').isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first'}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third' }).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh' }).isVisible = false;

                } else {
                    // record.getField('custpage_single').isVisible = false;
                    // record.getField('custpage_role').isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_mlevel'}).isDisabled = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth'}).isVisible = false;
                    // record.getCurrentSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh'}).isVisible = false;

                }

            }
            //     var sublistName = context.sublistId;
            //     var sublistFieldName =  record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_mlevel'}).isDisabled = true;
            //    context.fieldId;
            //     var line = context.line;
            //     if (sublistName === 'item' && sublistFieldName === 'item')
            if (context.fieldId == 'custpage_mlevel') //sublist field change of multiselect
            {
                var mlevel = record.getCurrentSublistValue({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_mlevel'
                });
                alert('mlevel' + mlevel);
                if (mlevel == true) {
                    mlevel.isMandatory = true;
                    record.setCurrentSublistValue({
                        sublistId: 'custpage_sublist',
                        fieldId: 'custpage_slevel',
                        value: false,

                    });
                    // record.getField('custpage_single').isVisible = false;
                    // record.getField('custpage_role').isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_slevel',line: 0 }).isDisabled = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first',line: 0}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second',line: 0}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third',line: 0}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth',line: 0}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth',line: 0 }).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth',line: 0}).isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh',line: 0}).isVisible = true;

                } else {
                    // record.getField('custpage_single').isVisible = true;
                    // record.getField('custpage_role').isVisible = true;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_slevel'}).isDisabled = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_first'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_second'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_third'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fourth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_fifth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_sixth'}).isVisible = false;
                    // record.getSublistField({sublistId: 'custpage_sublist',fieldId: 'custpage_seventh'}).isVisible = false;

                }

            }





        }

        function saveRecord(context) {
            var alertlevel = record.getSublistText({
                sublistId: 'custpage_sublist',
                fieldId: 'custpage_approver',
                line: 0
            });
            alert("alertlevel " + alertlevel);
            if (!alertlevel) {
                var alertfirst = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_id',
                    line: 0


                });
                if (!alertfirst) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }

            } else

            if (alertlevel == "Level 1") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                if (!alertfirst) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }

            } else if (alertlevel == "Level 2") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });
                if (!alertfirst || !alertsec) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }
            } else if (alertlevel == "Level 3") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });

                var alertthrd = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_third',
                    line: 0
                });
                if (!alertfirst || !alertsec || !alertthrd) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }

            } else

            if (alertlevel == "Level 4") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });

                var alertthrd = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_third',
                    line: 0
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fourth',
                    line: 0
                });


                // alert("alertfor "+alertfor);
                if (!alertfirst || !alertsec || !alertthrd || !alertfor) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }


            } else if (alertlevel == "Level 5") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });

                var alertthrd = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_third',
                    line: 0
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fourth',
                    line: 0
                });

                var alertfif = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fifth',
                    line: 0
                });
                if (!alertfirst || !alertsec || !alertthrd || !alertfor || !alertfif) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }

            } else if (alertlevel == "Level 6") {
                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });

                var alertthrd = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_third',
                    line: 0
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fourth',
                    line: 0
                });

                var alertfif = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fifth',
                    line: 0
                });
                var alertsix = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_sixth',
                    line: 0
                });

                if (!alertfirst || !alertsec || !alertthrd || !alertfor || !alertfif || !alertsix) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }

            } else if (alertlevel == "Level 7") {

                var alertfirst = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_first',
                    line: 0
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getSublistText({
                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_second',
                    line: 0
                });

                var alertthrd = record.getSublistText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_third',
                    line: 0
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fourth',
                    line: 0
                });

                var alertfif = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_fifth',
                    line: 0
                });
                var alertsix = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_sixth',
                    line: 0
                });
                var alertsev = record.getText({

                    sublistId: 'custpage_sublist',
                    fieldId: 'custpage_seventh',
                    line: 0
                });
                if (!alertfirst || !alertsec || !alertthrd || !alertfor || !alertfif || !alertsix || !alertsev) {
                    dialog.alert({
                        title: ' Approver needed',
                        message: 'Please enter  Approver '
                    });
                    return false;
                } else {
                    return true;
                }
            }


            // var appsix = record.getField({
            //     fieldId: 'custpage_sixth'
            // });
            // alert("appsix"+appsix);
            // if (appsix ==""){
            //     dialog.alert({
            //         title: 'Six approver needed',
            //         message: 'Please enter six approver '
            //     });
            //     return false;
            // }else {
            //     return true;
            // }







        }
    } catch (e) {
        log.debug('Unexpected Error', e);
    }
    return {
        fieldChanged: fieldChanged,
        saveRecord: saveRecord,
        pageInit: pageInit
    };

});