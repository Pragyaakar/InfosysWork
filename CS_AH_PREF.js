/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/search', 'N/currentRecord', 'N/ui/dialog', 'N/log'], function (search, currentRecord, dialog, log) {
    var record = currentRecord.get();
    try {
        function fieldChanged(context) {

            if (context.fieldId == 'custpage_approver') {
                var get_approver = record.getText('custpage_approver');


                if (get_approver == "Level 1") {
                    // log.debug("First approver", get_approver)
                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.setValue({
                        fieldId: 'custpage_second',
                        value: '',
                        //value: null,
                    });

                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = true;

                    record.setValue({
                        fieldId: 'custpage_third',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = true;

                    record.setValue({
                        fieldId: 'custpage_fourth',
                        value: '',
                        //value: null,
                    });

                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = true;


                    record.setValue({
                        fieldId: 'custpage_fifth',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = true;

                    record.setValue({
                        fieldId: 'custpage_sixth',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = true;



                    record.setValue({
                        fieldId: 'custpage_seventh',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = true;

                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = false;
                    record.getField('custpage_third').isMandatory = false;
                    record.getField('custpage_fourth').isMandatory = false;
                    record.getField('custpage_fifth').isMandatory = false;
                    record.getField('custpage_sixth').isMandatory = false;
                    record.getField('custpage_seventh').isMandatory = false;


                } else if (get_approver == "Level 2") {
                    // type_rec = "PurchOrd";
                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = true;
                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = true;
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
                        fieldId: 'custpage_third',
                        value: '',
                        //value: null,
                    });
                    record.setValue({
                        fieldId: 'custpage_fourth',
                        value: '',
                        //value: null,
                    });

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
                    record.getField('custpage_third').isMandatory = false;
                    record.getField('custpage_fourth').isMandatory = false;
                    record.getField('custpage_fifth').isMandatory = false;
                    record.getField('custpage_sixth').isMandatory = false;
                    record.getField('custpage_seventh').isMandatory = false;
                } else if (get_approver == "Level 3") {

                    // alert("inside level 3");
                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_third'
                    }).isDisabled = false;
                    record.setValue({
                        fieldId: 'custpage_fourth',
                        value: '',
                        //value: null,
                    });


                    record.getField({
                        fieldId: 'custpage_fourth'
                    }).isDisabled = true;
                    record.setValue({
                        fieldId: 'custpage_fifth',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_fifth'
                    }).isDisabled = true;
                    record.setValue({
                        fieldId: 'custpage_sixth',
                        value: '',
                    });
                    record.getField({
                        fieldId: 'custpage_sixth'
                    }).isDisabled = true;
                    record.setValue({
                        fieldId: 'custpage_seventh',
                        value: '',
                        //value: null,
                    });
                    record.getField({
                        fieldId: 'custpage_seventh'
                    }).isDisabled = true;

                    record.getField('custpage_first').isMandatory = true;
                    record.getField('custpage_second').isMandatory = true;
                    record.getField('custpage_third').isMandatory = true;
                    record.getField('custpage_fourth').isMandatory = false;
                    record.getField('custpage_fifth').isMandatory = false;
                    record.getField('custpage_sixth').isMandatory = false;
                    record.getField('custpage_seventh').isMandatory = false;



                } else if (get_approver == "Level 4") {
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
                var slevel = record.getValue('custpage_slevel');
                alert('slevel'+slevel);
                if(slevel == true){
                    slevel.isMandatory = true;
                    record.setValue({
                        fieldId: 'custpage_mlevel',
                        value: false,
                    });
                    record.getField('custpage_mlevel').isDisabled = true;
                    // record.getField('custpage_single').isVisible = true;
                    // record.getField('custpage_role').isVisible = true;
                    record.getField('custpage_first').isVisible = true;
                    record.getField('custpage_second').isVisible = false;
                    record.getField('custpage_third').isVisible = false;
                    record.getField('custpage_fourth').isVisible = false;
                    record.getField('custpage_fifth').isVisible = false;
                    record.getField('custpage_sixth').isVisible = false;
                    record.getField('custpage_approver').isVisible = false;
                    record.getField('custpage_seventh').isVisible = false;
                }else{
                    // record.getField('custpage_single').isVisible = false;
                    // record.getField('custpage_role').isVisible = false;
                    record.getField('custpage_mlevel').isDisabled = false;
                    record.getField('custpage_first').isVisible = false;
                    record.getField('custpage_second').isVisible = false;
                    record.getField('custpage_third').isVisible = false;
                    record.getField('custpage_fourth').isVisible = false;
                    record.getField('custpage_fifth').isVisible = false;
                    record.getField('custpage_sixth').isVisible = false;
                    record.getField('custpage_approver').isVisible = false;
                    record.getField('custpage_seventh').isVisible = false;
                }
                
            }
            if (context.fieldId == 'custpage_mlevel') {
                var mlevel = record.getValue('custpage_mlevel');
                alert('mlevel'+mlevel);
                if(mlevel == true){
                    mlevel.isMandatory = true;
                    record.setValue({
                        fieldId: 'custpage_slevel',
                        value: false,
                    });
                    // record.getField('custpage_single').isVisible = false;
                    // record.getField('custpage_role').isVisible = false;
                    record.getField('custpage_slevel').isDisabled = true;
                    record.getField('custpage_first').isVisible = true;
                    record.getField('custpage_second').isVisible = true;
                    record.getField('custpage_third').isVisible = true;
                    record.getField('custpage_fourth').isVisible = true;
                    record.getField('custpage_fifth').isVisible = true;
                    record.getField('custpage_sixth').isVisible = true;
                    record.getField('custpage_approver').isVisible = true;
                    record.getField('custpage_seventh').isVisible = true;
                }else{
                    // record.getField('custpage_single').isVisible = true;
                    // record.getField('custpage_role').isVisible = true;
                    record.getField('custpage_slevel').isDisabled = false;
                    record.getField('custpage_first').isVisible = false;
                    record.getField('custpage_second').isVisible = false;
                    record.getField('custpage_third').isVisible = false;
                    record.getField('custpage_fourth').isVisible = false;
                    record.getField('custpage_fifth').isVisible = false;
                    record.getField('custpage_sixth').isVisible = false;
                    record.getField('custpage_approver').isVisible = false;
                    record.getField('custpage_seventh').isVisible = false;
                }
            
            }





        }

        function saveRecord(context) {
            var alertlevel = record.getText('custpage_approver');
            // alert("alertlevel "+alertlevel);
            if (!alertlevel) {
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
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

            }else 

            if (alertlevel == "Level 1") {
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
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
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
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
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
                });
                // alert("alertsec "+alertsec);

                var alertthrd = record.getText({
                    fieldId: 'custpage_third'
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
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
                });
                // alert("alertsec "+alertsec);

                var alertthrd = record.getText({
                    fieldId: 'custpage_third'
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({
                    fieldId: 'custpage_fourth'
                });

                var alertfif = record.getText({
                    fieldId: 'custpage_fifth'
                });
                var alertsix = record.getText({
                    fieldId: 'custpage_sixth'
                });
                var alertsev = record.getText({
                    fieldId: 'custpage_seventh'
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
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
                });
                // alert("alertsec "+alertsec);

                var alertthrd = record.getText({
                    fieldId: 'custpage_third'
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({
                    fieldId: 'custpage_fourth'
                });

                var alertfif = record.getText({
                    fieldId: 'custpage_fifth'
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
                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
                });
                // alert("alertsec "+alertsec);

                var alertthrd = record.getText({
                    fieldId: 'custpage_third'
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({
                    fieldId: 'custpage_fourth'
                });

                var alertfif = record.getText({
                    fieldId: 'custpage_fifth'
                });
                var alertsix = record.getText({
                    fieldId: 'custpage_sixth'
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

                var alertfirst = record.getText({
                    fieldId: 'custpage_first'
                });
                // alert("alertfirst  "+alertfirst );

                var alertsec = record.getText({
                    fieldId: 'custpage_second'
                });
                // alert("alertsec "+alertsec);

                var alertthrd = record.getText({
                    fieldId: 'custpage_third'
                });
                // alert("alertthrd  "+alertthrd );
                var alertfor = record.getText({
                    fieldId: 'custpage_fourth'
                });

                var alertfif = record.getText({
                    fieldId: 'custpage_fifth'
                });
                var alertsix = record.getText({
                    fieldId: 'custpage_sixth'
                });
                var alertsev = record.getText({
                    fieldId: 'custpage_seventh'
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
        saveRecord: saveRecord
    };

});