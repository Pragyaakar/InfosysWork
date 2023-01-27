/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
 define(['N/currentRecord', 'N/log', 'N/record', 'N/ui/dialog', "N/runtime", "N/url", "N/https","N/search"],
 function (currentRecord, log, record, dialog, runtime, url, https,search) {

     /**
      * Function to be executed after page is initialized.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
      *
      * @since 2015.2
      */
     function pageInit(scriptContext) {

     }

     /**
      * Function to be executed when field is changed.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      * @param {string} scriptContext.fieldId - Field name
      * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
      * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
      *
      * @since 2015.2
      */
     function fieldChanged(scriptContext) {

     }

     /**
      * Function to be executed when field is slaved.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      * @param {string} scriptContext.fieldId - Field name
      *
      * @since 2015.2
      */
     function postSourcing(scriptContext) {

     }

     /**
      * Function to be executed after sublist is inserted, removed, or edited.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      *
      * @since 2015.2
      */
     function sublistChanged(scriptContext) {

     }

     /**
      * Function to be executed after line is selected.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      *
      * @since 2015.2
      */
     function lineInit(scriptContext) {

     }

     /**
      * Validation function to be executed when field is changed.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      * @param {string} scriptContext.fieldId - Field name
      * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
      * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
      *
      * @returns {boolean} Return true if field is valid
      *
      * @since 2015.2
      */
     function validateField(scriptContext) {

     }

     /**
      * Validation function to be executed when sublist line is committed.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      *
      * @returns {boolean} Return true if sublist line is valid
      *
      * @since 2015.2
      */
     function validateLine(scriptContext) {

     }

     /**
      * Validation function to be executed when sublist line is inserted.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      *
      * @returns {boolean} Return true if sublist line is valid
      *
      * @since 2015.2
      */
     function validateInsert(scriptContext) {

     }

     /**
      * Validation function to be executed when record is deleted.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @param {string} scriptContext.sublistId - Sublist name
      *
      * @returns {boolean} Return true if sublist line is valid
      *
      * @since 2015.2
      */
     function validateDelete(scriptContext) {

     }

     /**
      * Validation function to be executed when record is saved.
      *
      * @param {Object} scriptContext
      * @param {Record} scriptContext.currentRecord - Current form record
      * @returns {boolean} Return true if record is valid
      *
      * @since 2015.2
      */
     function saveRecord(scriptContext) {

     }
     function onSubmitForApproval(){

        var rec = currentRecord.get();
        var custRec = record.load({
            type: rec.type,
            id: rec.id
        });
        var status = custRec.getValue({
            fieldId: 'custbody_ah_approval_status'
        });
      // alert('status inside edit submit to approval'+status);
        var newdept = custRec.getValue({
            fieldId: 'department'
        });
       //alert("newdept "+ newdept);
        var newloc = custRec.getValue({
            fieldId: 'location'
        });
       // alert("newloc "+ newloc);
        var newcls = custRec.getValue({
            fieldId: 'class'
        });
        //alert("newcls "+ newcls);
        var newposeg = custRec.getValue({
            fieldId: 'custbody22'
        });
       // alert("newposeg "+ newposeg);
        var newsubs = custRec.getValue({
            fieldId: 'subsidiary'
        });
       // alert("newsubs "+ newsubs);
       // alert('pending approval'+rec.id);
       
          
        var customrecord_preSearchObj = search.create({
            type: "customrecord_pre",
            filters:
            [
               ["custrecord_presubs","anyof",newsubs], 
               "AND", 
               ["custrecord_predept","anyof",newdept], 
               "AND", 
               ["custrecord_precls","anyof",newcls], 
               "AND", 
               ["custrecord_preloc","anyof",newloc], 
               "AND", 
               ["custrecord_precnt","anyof", newposeg]
              
            ],
            columns:
            [
               search.createColumn({
                  name: "name",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
               search.createColumn({name: "custrecord_preal", label: "Approval Level"}),
               search.createColumn({name: "custrecord_prefirst", label: "First Approver"}),
               search.createColumn({name: "custrecord_presecond", label: "Second Approver"}),
               search.createColumn({name: "custrecord_prethird", label: "Third Approver"}),
               search.createColumn({name: "custrecord_fourth", label: "Fourth Approver"}),
               search.createColumn({name: "custrecord_prefifth", label: "Fifth Approver"}),
               search.createColumn({name: "custrecord_sixth", label: "Sixth Approver"}),
               search.createColumn({name: "custrecord_ahseven", label: "Seventh Approver"}),
               search.createColumn({name: "custrecord_role", label: "Role"})
            ]
         });

         var searchResult = customrecord_preSearchObj.run().getRange({
            start: 0,
            end: 1
        });
       // alert("searchResult.length"+searchResult.length);
        if (searchResult.length != 0) {
          
                var pf_id = searchResult[0].id;
            // alert("pfffff_id"+ pf_id);
             var newnext = searchResult[0].getValue({
                name: "custrecord_prefirst",
                label: "First Approver"
            });
          
                // var newnext = search.lookupFields({

                //     type: search.Type.customrecord_pre,

                //     id: pf_id,

                //     columns: ['custrecord_prefirst']

                // });
               //  alert('newnext.custrecord_prefirst'+newnext);
                var purchId = record.submitFields({
                    type:  rec.type,
                    id: rec.id ,
                    values: {
                        'custbody_ah_approval_status': 6,
                        'custbody23': pf_id,
                        'custbody_ah_next_approver':newnext
                       
                    }
                });
                //alert("purchId "+ purchId);

            }
        
      
        window.location.reload()
        //var flag =1;


     }

     function onApproveButtonClick() {

         var rec = currentRecord.get();
         // do whatever processing...
         var custRec = record.load({
             type: rec.type,
             id: rec.id
         });
        alert('PO is approved:'+rec.id);

        // alert('id' + rec.id);
        // alert('type' + rec.type);
         var firstapp = custRec.getValue('custbody_ah_first_approver');
        // alert('firstapp' + firstapp);
         var purchId = record.submitFields({
             type: rec.type,
             id: rec.id,
             values: {
                 // 'custbody_rejreason': reasonField ,
                 'custbody_ah_approved_by': firstapp,
                 'custbody_ah_approval_status': 4,
                 'custbody_ah_last_approved_by': firstapp,
                  'custbody_ah_next_approver': null,
             }
         });
         window.location.reload()

     }

     function onRejectButtonClick() {
         //  dialog.alert({
         //      title: "Hello",
         //      message: "You clicked the button!"
         //  });



         //this is the script id on the script record for the suitelet (not the deployment)

         var rec = currentRecord.get();
         // do whatever processing...
         var custRec = record.load({
             type: rec.type,
             id: rec.id
         });


         //  alert('id'+rec.id);
         //  alert('type'+rec.type);
         var firstapp = custRec.getValue('custbody_ah_next_approver');
         alert('firstapp'+firstapp );
         var location = custRec.getValue('location');

         var suiteletURL = url.resolveScript({
             scriptId: "customscript_ahsurejectreason",

             deploymentId: "customdeploy_rejectreason",
             returnExternalUrl: false,


         });
         // alert('1'+suiteletURL);
         //  var ssuiteletURL = "https://tstdrv2648267.app.netsuite.com" + "" + suiteletURL;
         suiteletURL += '&recordId=' + rec.id + '&recordType=' + rec.type + '&firstapp=' + firstapp;
         nlExtOpenWindow(suiteletURL, 'Reject Reason', 400, 300);





         var reject = custRec.setValue({
             fieldId: 'custbody_ah_approval_status',
             value: 5
         }); // reject status
        
         custRec.save();
       //window.onbeforeunload = null;
       var newreject = custRec.getValue('custbody_rejreason');
       //alert(newreject);
    //    if(newreject){
    //  parent.location.reload();
    //    }
      // closePopup();
     }

     return {
         pageInit: pageInit,
         fieldChanged: fieldChanged,
         postSourcing: postSourcing,
         sublistChanged: sublistChanged,
         lineInit: lineInit,
         validateField: validateField,
         validateLine: validateLine,
         validateInsert: validateInsert,
         validateDelete: validateDelete,
         saveRecord: saveRecord,
         onApproveButtonClick: onApproveButtonClick,
         onRejectButtonClick: onRejectButtonClick,
         onSubmitForApproval:onSubmitForApproval
     };

 });