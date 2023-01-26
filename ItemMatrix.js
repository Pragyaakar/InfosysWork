/**
 * Script Type          : User Event Script
 * Script Name          : SetChildMatrixItemIds_UEAS.js
 * Version              : 2.3
 * Author               : Venkata Rajesh Muthyalapati
 * Start Date           : 25 Nov 2016
 * Last Modified Date   : 22 Feb 2017
 * 
 * Description          : The Script sets the Child matrix item Ids into custom field "CHILD MATRIX ITEM IDS" with comma separated.
 * 						  22 Feb 2017: Script sets the Child matrix item Ids and matrix fields data into custom field "CHILD MATRIX ITEM IDS" with | separated.
 * 
 * Last Modified By     : Venkata Rajesh Muthyalapati
 * Last Modified Date   : 27 APR 2017
 * Description          : Added new logic to update the PARENT STORE DISPLAY NAME field on the child matrix items with the webstore display name from correspondint parent.
 *                        This is for the data which is essential for boomi to import/exprot the data to Magento System.
 */

 var beforeSubmit = false;

 /************** Start Main User Event Before Submit Function ************************/
 function setChildMatrixItemIds_BeforeSubmit(type){
     beforeSubmit = true;
     setChildMatrixItemIds(type);
 }
 /************** Start Main User Event Before Submit Function ************************/
 
 
 /************** Start Main User Event After Submit Function ************************/
 function setChildMatrixItemIds(type){
     try{
         var context = nlapiGetContext().getExecutionContext();
         if( context=='userinterface' || context=='webservices' || context=='csvimport'  || context=='offlineclient' || context=='portlet' || context=='suitelet' || context=='custommassupdate' || context=='webstore' || context=='workflow' ||  context=='userevent' || context=='scheduled' ){
 
             var currentRecType = nlapiGetRecordType();
             var currentRecId   = nlapiGetRecordId();
             nlapiLogExecution('DEBUG', '* context, Mode , Rec Type & Id is ', context +' , '+type +' , '+currentRecType+' , '+currentRecId );
             if( currentRecType != '' && currentRecType != null && currentRecId != '' && currentRecId != null ){
                 if( type == 'create' || type == 'edit' || type == 'xedit' ){
 
                     // Getting current Record data
                     var itemRecObj          = nlapiLoadRecord(currentRecType, currentRecId);
                     var matrixType          = itemRecObj.getFieldValue('matrixtype');
 
                     var processItemType = '';
                     var processItemId   = '';
 
                     if( matrixType == "PARENT" ){
                         // If the current Record is parent
                         processItemType = currentRecType;
                         processItemId   = currentRecId;
 
                     }else if( matrixType == "CHILD" ){
                         // If the current Record is Child, then pulling the related parent marix item id
 
                         var parentMatrixItemId  = itemRecObj.getFieldValue('parent');
                         if( parentMatrixItemId != '' && parentMatrixItemId != null){
                             var itemSearch = nlapiSearchRecord('item',null,[new nlobjSearchFilter('internalid',null,'anyOf',parentMatrixItemId)] ,
                                     [new nlobjSearchColumn('internalid'), new nlobjSearchColumn('storedisplayname')]);
                             if( itemSearch != '' && itemSearch != null ){
                                 var parentRecType = itemSearch[0].getRecordType();
                                 if( parentRecType != '' && parentRecType != null ){
                                     processItemType = parentRecType;
                                     processItemId   = parentMatrixItemId;	
                                 }
 
                             }
                         }
 
 
                     }else{
 
                     }
 
 
                     // Triggering the Set_ChildMatrixData with item details to update the child matrix item data into custom fields
                     if( processItemType!= '' && processItemType != null && processItemId != '' && processItemId != null ){						
                         Set_ChildMatrixData(processItemType, processItemId, matrixType);
                     }
 
 
                 }
             }
 
         }
     }catch(ERR_Main){
         nlapiLogExecution('ERROR','Error Occured in setChildMatrixItemIds Main Block',ERR_Main);
     }
 
 }
 /************** End  Main User Event After Submit Function ************************/
 
 
 
 
 
 function Set_ChildMatrixData(currentRecType, currentRecId, matrixType){
 
     try{
 
         nlapiLogExecution('DEBUG', '*Record Type & Id is ',currentRecType+' , '+currentRecId );
         if( currentRecType != '' && currentRecType != null ){
             var itemRecObj                               = nlapiLoadRecord(currentRecType, currentRecId);
             var previousChildMatrixUniqueIds             = itemRecObj.getFieldValue('custitem_child_matrix_item_ids');
             var previousChildMatrixConfigVariations      = itemRecObj.getFieldValue('custitem_child_configurable_varaiation');
             var previousChildMatrixConfigVariationLabels = itemRecObj.getFieldValue('custitem_child_configurable_labels');
             var childMatrixSublistCount                  = itemRecObj.getLineItemCount('matrixmach');
             var storeDispName                            = itemRecObj.getFieldValue('storedisplayname');
 
 
             // Update Store Display Name
             nlapiLogExecution('DEBUG', 'storeDispName ', storeDispName );
             if( beforeSubmit == true ){
                 nlapiSetFieldValue('custitem_parent_store_display_name', storeDispName );
             }
 
 
             if( childMatrixSublistCount >= 1 ){
 
 
                 // Getting the child matrix item ids 
                 var childItemIId_Array                    = new Array();
                 var childMatrixItemUniqueIds              = '';
                 var childMatrixItemConfigVariations       = '';
                 var childMatrixItemConfigVariationLabels  = '';
                 var matrixColorOptionFlag                 = false;
                 var matrixSizeOptionFlag                  = false;
 
                 for( var i=1; i<=childMatrixSublistCount ; i++ ){
                     var currentChildItemId = itemRecObj.getLineItemValue('matrixmach', 'mtrxid', i);
                     if( currentChildItemId != '' && currentChildItemId != null ){
                         childItemIId_Array.push(currentChildItemId);						
                     }
                 }
 
 
 
 
                 // Search on child matrix item ids 
                 if( childItemIId_Array.length > 0 ){
                     var itemSearch = nlapiSearchRecord('item',null,[new nlobjSearchFilter('internalid',null,'anyOf',childItemIId_Array)] ,
                             [new nlobjSearchColumn('custitem_unique_item_id'),new nlobjSearchColumn('custitem_matrix_item_color'),new nlobjSearchColumn('custitem2')
                             ,new nlobjSearchColumn('custitem_parent_store_display_name')]);
 
                     // Processing the item results and generating the unique ids text
                     if( itemSearch != '' && itemSearch != null ){
                         for( var j=0; j<itemSearch.length ; j++ ){
                             var currentUniqueItemId = itemSearch[j].getValue('custitem_unique_item_id');
                             var currentItemcolor    = itemSearch[j].getText ('custitem_matrix_item_color');
                             var currentItemSize     = itemSearch[j].getText ('custitem2');
                             var currentDispName     = itemSearch[j].getText ('custitem_parent_store_display_name');
 
 
                             if( matrixType == "PARENT" && currentDispName != storeDispName ){
                                 var submitCurrentItem = nlapiSubmitField( itemSearch[j].getRecordType(), itemSearch[j].getId(), ['custitem_parent_store_display_name'], [storeDispName] );
                             }
 
                             // Field Value generation for CHILD MATRIX ITEM IDS
                             if( currentUniqueItemId != '' && currentUniqueItemId != null ){
                                 if( childMatrixItemUniqueIds != '' && childMatrixItemUniqueIds != null ){
                                     childMatrixItemUniqueIds += ',';
                                 }
                                 childMatrixItemUniqueIds += currentUniqueItemId;
                             }
 
 
                             // Field Value generation for CONFIGURABLE VARIATIONS
                             if( currentUniqueItemId != '' && currentUniqueItemId != null && ((currentItemcolor != '' && currentItemcolor != null) || (currentItemSize != '' && currentItemSize != null)) ){
                                 if( childMatrixItemConfigVariations != '' && childMatrixItemConfigVariations != null ){
                                     childMatrixItemConfigVariations += '|';
                                 }
                                 childMatrixItemConfigVariations += 'sku='+currentUniqueItemId;
                                 if( currentItemcolor != '' && currentItemcolor != null ){
                                     childMatrixItemConfigVariations += ',color='+currentItemcolor;
                                     matrixColorOptionFlag = true;
                                 }
                                 if( currentItemSize != '' && currentItemSize != null ){
                                     childMatrixItemConfigVariations += ',size='+currentItemSize;
                                     matrixSizeOptionFlag  = true;
                                 }
                             }
 
 
 
                         }
                     }
 
                 }
 
 
                 // Field Value generation for CONFIGURABLE VARIATIONS LABELS
                 if( matrixSizeOptionFlag == true ){
                     childMatrixItemConfigVariationLabels += 'size=Size';
                 }
                 if( matrixColorOptionFlag == true ){
                     if( childMatrixItemConfigVariationLabels != '' && childMatrixItemConfigVariationLabels != null ){
                         childMatrixItemConfigVariationLabels += ',';
                     }
                     childMatrixItemConfigVariationLabels += 'color=Color';
                 }
 
                 /*nlapiLogExecution('DEBUG', 'previousChildMatrixUniqueIds ', previousChildMatrixUniqueIds );
                 nlapiLogExecution('DEBUG', 'childMatrixItemUniqueIds ', childMatrixItemUniqueIds );
                 nlapiLogExecution('DEBUG', 'childMatrixItemConfigVariations ', previousChildMatrixConfigVariations );
                 nlapiLogExecution('DEBUG', 'childMatrixItemConfigVariations ', childMatrixItemConfigVariations );
                 nlapiLogExecution('DEBUG', 'childMatrixItemConfigVariationLabels ', childMatrixItemConfigVariationLabels );*/
 
 
 
 
                 // Updating the "childMatrixItemUniqueIds" field on current item record
                 if( previousChildMatrixUniqueIds != childMatrixItemUniqueIds || previousChildMatrixConfigVariations != childMatrixItemConfigVariations || previousChildMatrixConfigVariationLabels != childMatrixItemConfigVariationLabels){
                     if( beforeSubmit = true && matrixType == "PARENT"){
                         // Before Submit
                         nlapiSetFieldValue('custitem_child_matrix_item_ids', childMatrixItemUniqueIds);
                         nlapiSetFieldValue('custitem_child_configurable_varaiation', childMatrixItemConfigVariations);
                         nlapiSetFieldValue('custitem_child_configurable_labels', childMatrixItemConfigVariationLabels);
                     }else{
                         // After Submit
                         var submitItem = nlapiSubmitField( currentRecType, currentRecId, ['custitem_child_matrix_item_ids','custitem_child_configurable_varaiation','custitem_child_configurable_labels'], [childMatrixItemUniqueIds,childMatrixItemConfigVariations,childMatrixItemConfigVariationLabels] );
                         nlapiLogExecution('AUDIT', 'Updated Item Record ID', submitItem);
                         return;
                     }
 
                 }
 
 
             }else{
                 nlapiLogExecution('DEBUG', '* No Child Items Found for Item Id', currentRecId );
             }
 
         }
 
         nlapiLogExecution('DEBUG', 'No Item Updated', 'No Item Updated' );
 
     }catch(ERR_Main){
         nlapiLogExecution('ERROR','Error Occured in Set_ChildMatrixData Main Block',ERR_Main);
     }
 
 
 }
 