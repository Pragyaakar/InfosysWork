/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

 define(['N/search', 'N/currentRecord'], function (search, currentRecord) {
    var record = currentRecord.get();
    try{
    function fieldChanged(context) {
        if (context.fieldId == 'custpage_tran_type') {
            var get_parameter = record.getText('custpage_tran_type');
            var tranid = record.getValue('custpage_tran_type');
          //  alert('tranid' + tranid);
            var type_rec = '';

            //  customrecord_ah_leave
            if (get_parameter == "Sales Order") {
                type_rec = "SalesOrd";

            } else if (get_parameter == "Purchase Order") {
                type_rec = "PurchOrd";

            } else if (get_parameter == "Invoice") {
                type_rec = "CustInvc";

            } else if (get_parameter == "Bill") {
                type_rec = "VendBill";

            }
            /* else if (get_parameter == "Leave Record") {
                 type = 'customrecord_ah_leave';
                
              }
             else if (get_parameter == "Employee") {
                  type = 'employee';
               
              }
            alert(" transaction type",type );*/

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
                text: '-New-'
            });

            alert("search length:" + searchResult.length);
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
}catch (e) {
        log.error('Unexpected Error', e);
        context.response.write('Unexpected Error. Please Contact your Administrator.');
    }
        return {
            fieldChanged: fieldChanged
        };
    
    });