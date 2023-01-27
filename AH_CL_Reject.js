/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
 define(['N/currentRecord',  'N/log', 'N/record', 'N/ui/dialog',"N/runtime", "N/url", "N/https"],
 function (currentRecord,  log, record,  dialog, runtime, url, https ) {

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

     function onApproveButtonClick() {
         dialog.alert({
             title: "Hello",
             message: "You clicked the button!"
         });

         try {
             var loadrecord = currentRecord.get();
             var entity = loadrecord.getValue({fieldId:'entity'});
             alert('currentRecordtype'+entity);
             
            
             var salesOrder = record.load({
                 type: record.Type.PURCHASE_ORDER,
                 id: currentRecordID,
                 isDynamic: true
             });
           
             var recId = salesOrder.save();
             log.debug({
                 title: 'Record updated successfully',
                 details: 'Id: ' + recId
             });

         } catch (e) {

             log.debug('recordid' + recIdSO);
             /*log.error({
                 title: e.name,
                 details: e.message
             });*/
         }
     }

     function onRejectButtonClick() {
        //  dialog.alert({
        //      title: "Hello",
        //      message: "You clicked the button!"
        //  });
       
         
     
         //this is the script id on the script record for the suitelet (not the deployment)
        
         var rec = currentRecord.get();
         // do whatever processing...
         var custRec = record.load({ type: rec.type, id: rec.id });
         
         
        //  alert('id'+rec.id);
        //  alert('type'+rec.type);
        var firstapp = custRec.getValue('custbody_ah_first_approver');
        //alert('firstapp'+firstapp );
         var location = custRec.getValue('location');
      
         var suiteletURL = url.resolveScript({
            scriptId: "customscript_ahsurejectreason",
           
            deploymentId: "customdeploy_rejectreason",
            returnExternalUrl: false,
           

          });
         // alert('1'+suiteletURL);
       //  var ssuiteletURL = "https://tstdrv2648267.app.netsuite.com" + "" + suiteletURL;
       suiteletURL += '&recordId=' + rec.id + '&recordType=' + rec.type+'&firstapp='+firstapp ;
        nlExtOpenWindow( suiteletURL, 'Reject Reason', 400, 300);

          //alert('2'+ssuiteletURL );
        //  window.open(suiteletURL);
        //  // To open SuiteLet in same tab, use location.href
        //  location.href = suiteletURL;
        //  // To open SuiteLet in same tab without popup to confirm, add "window.onbeforeunload = null;":
        //   window.onbeforeunload = null;
        //  location.href = suiteletURL;
          
          
         var reject=custRec.setValue({fieldId:'custbody_ah_approval_status',value: 3});// reject status
         custRec.save();
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
         onRejectButtonClick: onRejectButtonClick
     };

 });