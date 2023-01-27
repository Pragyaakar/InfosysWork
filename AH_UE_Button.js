/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

// Load two standard modules.
define(['N/record', 'N/search', 'N/runtime', 'N/ui/serverWidget', 'N/email'],
    // Add the callback function.
    function (record, search, runtime, serverWidget, email) {
        // In the beforeLoad function, disable the Notes field.
        function myAfterSubmit(scriptContext) {
            try {
                //log.debug('runtime.executionContext',runtime.executionContext);
                log.debug('scriptContext.type', scriptContext.type);
                if (scriptContext.type == scriptContext.UserEventType.VIEW) {
                  
                    var newRecord = scriptContext.newRecord;
                    log.debug('newRecord ', newRecord);
                   
                    
                    var firstapp = newRecord.getValue({
                        fieldId: 'custbody_ah_first_approver'
                    });
                   log.debug("firstapp ",firstapp );
                   
                    
                    
                    }

                   }  

                
             catch (err) {
                log.error('Error occurred in beforeload function', err);
            }
        }


       
        return {
            afterSubmit: myAfterSubmit
           
        };
    });