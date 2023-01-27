/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/search', 'N/currentRecord'], function (search, currentRecord) {
    var record = currentRecord.get();

    try {
        function fieldChanged(context) {
            if (context.mode != 'create') {

                if (context.fieldId == 'entity') {
                    var custText = record.getText('entity');
                    var custname = record.getValue('entity');
                    var type_rec = record.type;
                    //var subsidiary = record.getValue('subsidiary');
                    // alert("next_approver "+ next_approver);
                    var customForm = record.getText({
                        fieldId: 'customform'
                    });
                   // alert("customForm  " + customForm);
                   // alert("type_rec  " + type_rec);

                    
                    //alert('custname' + custname);
                    //alert('custText' + custText);











                   
                        var customerLookup = search.lookupFields({
                            type: search.Type.CUSTOMER,
                            id: custname,
                            columns: ['email', 'phone', 'custentity24']
                        });
                       // alert('customerLookup' + customerLookup.email);

                       // alert('customerLookup' + customerLookup.phone);

                        //alert('customerLookup' + customerLookup.custentity24);
                        var ph =  customerLookup.phone;
                        var enableval = customerLookup.custentity24;
                        if(enableval)
                        {
                            record.setValue({
                                fieldId: 'custbody21',
                                value: enableval,
                               
                            });
                        }
                       
                        if(ph)
                        {
                            record.setValue({
                                fieldId: 'custbody15',
                                value: ph,
                               
                            });
                        }
                        





                    


                }


            }
        }
    } catch (e) {
        log.error('Unexpected Error', e);
        context.response.write('Unexpected Error. Please Contact your Administrator. Error:: ' + e);
    }
    return {
        fieldChanged: fieldChanged

    };
});