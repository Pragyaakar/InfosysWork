/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/error','N/currentRecord','N/https','N/url', 'N/search'],
 function(error,currentRecord,https,url,search) {
    try{
    function setVal(context) 
    {
        var currentRecord = context.currentRecord;
        // var field = form.addField({
        //     id : 'cust_tran_type',
        //     type : serverWidget.FieldType.MULTISELECT,
        //     label : 'Transaction Type',
        //     source : 'customlist_atsuitelet' //record type id
        // });
        // var suitletURL = url.resolveScript({
        //     scriptId : 'customscript_ah_sl_type',
        //     deploymentId : 'customdeploy_ah_sl_trans_deploy'
        //     });
      

          /* suitletURL = "https://tstdrv2648267.app.netsuite.com" + "" + suitletURL;
            var myresponse = https.request({
                 method: https.Method.GET,
                url: suitletURL,
               });
      alert("url"+suitletURL);*/
              

        //     console.log("URL",  suitletURL);
            // var response = https.post({
            //     url  : scheme + host + suitletURL,
            //     body : postData
            // });
        
        // var sublistName = context.sublistId;
        // var sublistFieldName = context.fieldId;
        var form_FieldName = context.fieldId;
        //alert('CSFORMFIELD :'+form_FieldName );
        
        if( form_FieldName == 'cust_tran_type')
         {

            //var request=context.request;
            //alert("request:"+ myresponse);
           //alert("request:"+ myresponse.parameters.cust_tran_type);
            var get_parameter= currentRecord.getText('cust_tran_type');
           // log.debug("parameters", get_parameter);
            //var get_parameter = form_FieldName.parameters.Classificationid;
            // var itemName = form.serverWidget.FieldType.MULTISELECT({
                
            //     fieldId: 'cust_tran_type'
            // });
            
          // alert("Transaction:"+ get_parameter);
           /* currentRecord.setValue({
                fieldId: 'custpage_abc_text',
                value: get_parameter
            });*/
//BillInvoicePurchase OrderSales Order
           //"VendBill","CustInvc","SalesOrd","PurchOrd"
           if (get_parameter == "Sales Order" )
               {
               get_parameter="SalesOrd";
               }
           else if(get_parameter=="Purchase Order")
           {
             get_parameter="PurchOrd";
           }
       else if(get_parameter=="Invoice")
           {
             get_parameter="CustInvc";
           }
       else if(get_parameter=="Bill")
           {
             get_parameter="VendBill";
           }
          /* var suitletURL = url.resolveScript({
             scriptId : 'customscript_ah_sl_type',
          deploymentId : 'customdeploy_ah_sl_trans_deploy',
             params: {
			'gettransvalue':get_parameter
		}
          });*/
            var transactionSearchObj = search.create({
                type: "transaction",
                filters:
                [
                   ["mainline","is","T"], 
                   "AND", 
                   ["type","anyof", get_parameter]
                ],
                columns:
                [
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
             var searchResult = transactionSearchObj.run().getRange({
                start: 0,
                end: 100
            });
            log.debug("search length:",searchResult.length);
           alert("search length:"+searchResult.length);
           var  formarr = [];
           var flag = 1;
            for (var fl = 0; fl < searchResult.length; fl++) {
                var formValue = searchResult[fl].getText({
                  
                   
                    name: "customform",
                      summary: "GROUP",
                      label: "Custom Form"
                });
           // alert("Formvalue"+ formValue);
              if (formValue == "- None -")
                {
                  flag = 0;
                }
             else
             {
               flag = 1;
             }
              if (flag == 1){
                formarr.push(formValue);
               /* currentRecord.setValue({
                fieldId: 'cust_form_type',
                value: formValue
               });*/
              
              }
               
            }
           alert("Formvaluearray"+ formarr );
           alert("Formused"+ formValue );
           
            alert("Formvalue"+ formarr.length);
           //alert('New array valueuarr:', formarr);
           var newarr = formarr.join();
          // alert('newarrjoin'+newarr.length);
           var finalarr =newarr.split("\u0005");
            
          //var uarr = finalarr.join();
           //alert('New array valueuarr:', uarr);
           //var farr = uarr.split(",")
        //alert('newarrfinalsplit'+farr.length )
          //      alert('New array value:', farr );
         
          /* currentRecord.addSelectOption({
                fieldId: 'cust_form_type',
                value: 'list of forms'
             //'cust_tran_type_test'
           });*/
               currentRecord.setValue({
                fieldId: 'cust_tran_type_test',
                value: finalarr
               });
           
        /*   var fieldObject = currentRecord.getField({ fieldId: 'cust_form_type' });
           alert('fieldobj'+fieldObject)
		fieldObject.insertSelectOption({ value: 'Option1', text: 'Test1' });*/
      
       /* fieldObject.addSelectOption({
                    value: 'SalesOrder',
                      text: 'Sales Order'
                  });*/
          
           
          /* for (var i = 0 ; i < farr.length;i++)
             {
               currentRecord.setValue({
                fieldId: 'cust_form_type',
                value:  farr[i],
                 line : i
            });
             }*/
              
           // alert("search length:"+searchResult.length);
         //  alert("Formvalue"+ formValue);
           
            
        }      
    }
}catch(e){
    log.error('Unexpected Error',e);
    context.response.write('Unexpected Error. Please Contact your Administrator.');
}
    return{
        fieldChanged: setVal
    };
});