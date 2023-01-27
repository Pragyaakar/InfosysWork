/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(['N/ui/serverWidget','N/runtime','N/email','N/http','N/redirect'], function (serverWidget,runtime,email,http,redirect) {
    try{
     function onRequest(context) {
         if (context.request.method === 'GET') {
 
             // Steps for adding transaction Type
             var form = serverWidget.createForm({
                 title: 'Criteria'
             });
             var field = form.addField({
                id : 'cust_tran_type',
                type : serverWidget.FieldType.SELECT,
                label : 'Transaction Type',
                source : 'customlist_atsuitelet' //record type id
            });
            var field = form.addField({
                id : 'cust_tran_type_test',
                type : serverWidget.FieldType.TEXTAREA,
                 label : 'FORMS TEST',
               // source : 'customlist_atsuitelet' //record type id
            });
          /*  form.addField({
                id : 'custpage_abc_text',
                type : serverWidget.FieldType.TEXT,
                label : 'Text',
                        // container: 'custpage_new_req_link'
            }); */
           var field = form.addField({
                id : 'cust_form_type',
                type : serverWidget.FieldType.SELECT,
                label : 'FORMS',
                source : 'customform' //record type id
            });
            var cust_tab = form.addTab({
                id: 'custpage_new_req_link',
       		
                label: 'Classification'
            });
            form.addField({
                id: 'dept_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Department',
                container: 'custpage_new_req_link'
            });
               form.addField({
                id: 'subs_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Subsidiary',
                container: 'custpage_new_req_link'
            });
          form.addField({
                id: 'loc_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Location',
                container: 'custpage_new_req_link'
            }); 
             form.addField({
                id: 'cls_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Class',
                container: 'custpage_new_req_link'
            });  
             form.addField({
                id: 'ct_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Country',
                container: 'custpage_new_req_link'
            }); 
           
           /* form.addField({
                id: 'cseg1_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Custom_segment_1',
                container: 'Classificationid'
            });    
			form.addField({
                id: 'cseg2_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Custom_segment_2',
                container: 'Classificationid'
            });  
             form.addField({
                id: 'cseg3_id',
                type: serverWidget.FieldType.CHECKBOX,
                label: 'Custom_segment_3',
                container: 'Classificationid'
            }); */ 
            //  var select = form.addField({
            //          id: 'cust_tran_type',
            //          type: serverWidget.FieldType.MULTISELECT,
            //          label: 'Transaction Type',
            //      });
            //      select.addSelectOption({
            //          value: 'SalesOrder',
            //          text: 'Sales Order'
            //      });
            //      select.addSelectOption({
            //          value: 'PurchaseOrder',
            //          text: 'Purchase Order'
            //      });
            //      select.addSelectOption({
            //          value: 'employee',
            //          text: 'Employee'
            //      });
            //      select.addSelectOption({
            //          value: 'LeaveRecord',
            //          text: 'Leave Record'
            //      });
 
                /* var tab1 = form.addTab({
                     id: 'tab1id',
                     label: 'Transaction Type'
                 });*/
                 
                 
             form.addSubmitButton({
                 label: 'Submit',
                
               
             });
             //objForm.clientScriptModulePath = 'SuiteScripts/formBehavior.js';
             form.clientScriptModulePath = 'SuiteScripts/CS_AH_Trans.js';
          // var clientpa = form.clientScriptModulePath = 'SuiteScripts/CS_AH_Trans.js';
             //var trantype = clientpa.getParameter('cust_tran_type');
             //log.debug("transtype:",trantype );
             //form.setScript('customscript_ah_cl_trans');
             context.response.writePage(form);
          
         } /*else {
             var request=context.request;
             var get_parameter=request.parameters.cust_tran_type;
             log.debug ("Values :",get_parameter);
            //  var delimiter = /\u0001/;
            //  var field = context.request.parameters.Classificationid;
            //  redirect.toSuitelet({
            //      scriptId: 'customscript_ah_sl_config_form',
            //      deploymentId: 'customdeploy_ah_sl_config_deploy',
            //      parameters: {'custscript_transtype': get_parameter}
 
                 
            //  });
         
 
             
              }*/
         
        
 
     }
    }catch(e){
             log.error('Unexpected Error',e);
             context.response.write('Unexpected Error. Please Contact your Administrator.');
         }
     return {
         onRequest: onRequest
     };
 });
 