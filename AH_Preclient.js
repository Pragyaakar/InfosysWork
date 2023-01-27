/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

 define(['N/search', 'N/currentRecord'], function (search, currentRecord) {
    var record = currentRecord.get();

    function fieldChanged(context) {
        try {
            if (context.fieldId == 'custpage_approver') {
                var get_approver = record.getText('custpage_approver');
                alert("approver:" + get_approver);


                if (get_approver == "Level 1") {

                   

                    record.getField({
                        fieldId: 'custpage_first'
                    }).isDisabled = false;
                    record.getField({
                        fieldId: 'custpage_second'
                    }).isDisabled = true;
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

                } else if (get_approver == "Level 3") {
                 
                    alert("inside level 3");
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
                } else if (get_approver == "Level 7") {
                    //type_rec = "VendBill";
                    // record.getField({fieldId:'custpage_seventh'}).isDisabled = true;
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
                    }).isDisabled = false;
                }


            }





        } catch (e) {
            log.debug('fieldchanged:error', e);
        }

    }
    return {
        fieldChanged: fieldChanged
    };

});