/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/error','N/currentRecord','N/https','N/url'],
 function(error,currentRecord,https,url) {
    try{
    function setVal(context) 
    {
        var currentRecord = context.currentRecord;
       
        var form_FieldName = context.fieldId;
        
        
        if( form_FieldName == 'cust_tran_type')
         {
           
            var get_parameter= currentRecord.getText('cust_tran_type');
            
            
            //alert("Transaction:"+ get_parameter);
            currentRecord.setValue({
                fieldId: 'custpage_abc_text',
                value: get_parameter
            });

            
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