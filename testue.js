/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(['N/currentRecord', 'N/email', 'N/error', 'N/format', 'N/http', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/transaction', 'N/translation', 'N/ui/dialog', 'N/ui/message', 'N/ui/serverWidget', 'N/url'],
    /**
     * @param {currentRecord} currentRecord
     * @param {email} email
     * @param {error} error
     * @param {format} format
     * @param {http} http
     * @param {log} log
     * @param {record} record
     * @param {runtime} runtime
     * @param {search} search
     * @param {transaction} transaction
     * @param {translation} translation
     * @param {dialog} dialog
     * @param {message} message
     * @param {serverWidget} serverWidget
     * @param {url} url
     */
    function (currentRecord, email, error, format, http, log, record, runtime, search, transaction, translation, dialog, message, serverWidget, url) {

        function beforeLoad(scriptContext) {
            try {



                if (scriptContext.type == 'create') {
                    var obj_record = scriptContext.newRecord;
                    var i_recordId = scriptContext.newRecord.id;
                    var s_record_type = scriptContext.newRecord.type;
                    var currentrecord = scriptContext.currentRecord;
                    var approval_status = obj_record.getValue('custbody_ah_approval_status');
                    log.debug('approval_status', approval_status);
                    obj_record.setValue({
                        fieldId: 'custbody_ah_approval_status',
                        value: 3

                    });
                    var user = runtime.getCurrentUser();
                    var author = user.id; //custbody_ah_cl_created_by
                    obj_record.setValue({
                        fieldId: 'custbody_ah_cl_created_by',
                        value: author

                    });

                }


                if (scriptContext.type == 'view') {
                    var obj_record = scriptContext.newRecord;
                    var i_recordId = scriptContext.newRecord.id;
                    var s_record_type = scriptContext.newRecord.type;
                    var currentrecord = scriptContext.currentRecord;
                    //  var currentuser = runtime.getCurrentUser();
                    log.debug('s_record_type', s_record_type);
                    log.debug('i_recordId', i_recordId);
                    var userobj = runtime.getCurrentUser();
                    // log.debug("userobj", userobj); 
                    var current_user_id = userobj.id;
                    log.debug("current_user_id", current_user_id);

                    var next_approver = obj_record.getValue('custbody_ah_next_approver');
                    log.debug('next_approver', next_approver);
                    var approval_status = obj_record.getValue('custbody_ah_approval_status');
                    log.debug('approval_status', approval_status);
                    //    obj_record.setValue({
                    //     fieldId: 'custbody_ah_approval_status',
                    //     value:3

                    //    })

                    if (approval_status == 3) {
                        log.debug('approval_status', approval_status);
                        scriptContext.form.clientScriptModulePath = './ApproveButtonClientScript.js';

                        scriptContext.form.addButton({
                            id: "custpage_subapprove",
                            label: "Submit For Approval",
                            functionName: "onSubmitForApproval"
                        });


                    } //end of if condition





                    if ((isNotEmpty(next_approver) && (next_approver == current_user_id) && ((approval_status == 6) || ((approval_status == 4))))) {


                        scriptContext.form.clientScriptModulePath = './ApproveButtonClientScript.js';
                        scriptContext.form.addButton({
                            id: "custpage_approve",
                            label: "Approve",
                            functionName: "onApproveButtonClick"
                        });
                        scriptContext.form.addButton({
                            id: "custpage_reject",
                            label: "Reject",
                            functionName: "onRejectButtonClick"
                        });

                    } //end of if





                } //end of if(scriptContext.type == 'view')


            } //end of try block
            catch (e) {
                log.debug('Exception:==', e);
            } //end of catch block	
        } //end of function beforeLoad(scriptContext) 

        function beforeSubmit(scriptContext) {
            try {
                //log.debug('runtime.executionContext',runtime.executionContext);
                log.debug('scriptContext.type', scriptContext.type);
                //  if (scriptContext.type == scriptContext.UserEventType.VIEW) {

                //  var newRecord = scriptContext.newRecord;
                //  log.debug('newRecord ', newRecord);
                //  var firstapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_first_approver'
                //  });
                //  log.debug("firstapp ", firstapp);
                //  var secondapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_second_approver'
                //  });
                //  log.debug("secondapp ", secondapp);
                //  var thirdapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_third_approver'
                //  });
                //  log.debug("thirdapp ", thirdapp);
                //  var fourthapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_fourth_approver'
                //  });
                //  log.debug("fourthapp ", fourthapp);
                //  var fifthapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_fifth_approver'
                //  });
                //  log.debug("fifthapp ", fifthapp);
                //  var sixthapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_sixth_approver'
                //  });
                //  log.debug("sixthapp ", sixthapp);
                //  var seventhapp = newRecord.getValue({
                //      fieldId: 'custbody_ah_seventh_approver'
                //  });
                //  log.debug("seventhapp ", seventhapp);

                //  var userObj = runtime.getCurrentUser();
                //  log.debug("userObj ", userObj);


            } catch (err) {
                log.error('Error occurred in beforeload function', err);
            }
        }

        function afterSubmit(scriptContext) {
            try {
                //log.debug('runtime.executionContext',runtime.executionContext);
                log.debug('scriptContext.type', scriptContext.type);

                var newRecord = scriptContext.newRecord;
                var poRec = record.load({
                    type: newRecord.type,
                    id: newRecord.id
                });
                log.debug(" poRec", poRec);
                var obj_record = scriptContext.newRecord;
                var i_recordId = scriptContext.newRecord.id;
                var s_record_type = scriptContext.newRecord.type;
                var currentrecord = scriptContext.currentRecord;
                var user = runtime.getCurrentUser();
                log.debug("user", user);
                //  if (scriptContext.type == scriptContext.UserEventType.VIEW) {
                //      scriptContext.form.clientScriptModulePath = './ApproveButtonClientScript.js';
                // //  scriptContext.form.addButton({
                // //      id: "custpage_subapprove",
                // //      label: "Submit For Approval",
                // //      functionName: "onSubmitForApproval"
                //  });



                //  }
                //  if (scriptContext.type == scriptContext.UserEventType.EDIT)
                //  {
                //     var newRecord = scriptContext.newRecord;
                //     var poRec = record.load({
                //         type: newRecord.type,
                //         id: newRecord.id
                //     });
                //     var last_approver = newRecord.getValue({
                //         fieldId: 'custbody_ah_last_approved_by'
                //     });
                //     var next_approver = newRecord.getValue({
                //         fieldId: 'custbody_ah_next_approver'
                //     });
                //     var status = newRecord.getValue({
                //         fieldId: 'custbody_ah_approval_status'
                //     });
                //   // alert('status inside edit submit to approval'+status);
                //     var newdept = newRecord.getValue({
                //         fieldId: 'department'
                //     });
                //    //alert("newdept "+ newdept);
                //     var newloc = newRecord.getValue({
                //         fieldId: 'location'
                //     });
                //    // alert("newloc "+ newloc);
                //     var newcls = newRecord.getValue({
                //         fieldId: 'class'
                //     });
                //     //alert("newcls "+ newcls);
                //     var newposeg = newRecord.getValue({
                //         fieldId: 'custbody22'
                //     });
                //    // alert("newposeg "+ newposeg);
                //     var newsubs = newRecord.getValue({
                //         fieldId: 'subsidiary'
                //     });
                //     var customrecord_preSearchObj = search.create({
                //         type: "customrecord_pre",
                //         filters:
                //         [
                //            ["custrecord_presubs","anyof",newsubs], 
                //            "AND", 
                //            ["custrecord_predept","anyof",newdept], 
                //            "AND", 
                //            ["custrecord_precls","anyof",newcls], 
                //            "AND", 
                //            ["custrecord_preloc","anyof",newloc], 
                //            "AND", 
                //            ["custrecord_precnt","anyof", newposeg]

                //         ],
                //         columns:
                //         [
                //            search.createColumn({
                //               name: "name",
                //               sort: search.Sort.ASC,
                //               label: "ID"
                //            }),
                //            search.createColumn({name: "custrecord_preal", label: "Approval Level"}),
                //            search.createColumn({name: "custrecord_prefirst", label: "First Approver"}),
                //            search.createColumn({name: "custrecord_presecond", label: "Second Approver"}),
                //            search.createColumn({name: "custrecord_prethird", label: "Third Approver"}),
                //            search.createColumn({name: "custrecord_fourth", label: "Fourth Approver"}),
                //            search.createColumn({name: "custrecord_prefifth", label: "Fifth Approver"}),
                //            search.createColumn({name: "custrecord_sixth", label: "Sixth Approver"}),
                //            search.createColumn({name: "custrecord_ahseven", label: "Seventh Approver"}),
                //            search.createColumn({name: "custrecord_role", label: "Role"})
                //         ]
                //      });

                //      var searchResult = customrecord_preSearchObj.run().getRange({
                //         start: 0,
                //         end: 1
                //     });
                //    // alert("searchResult.length"+searchResult.length);
                //    var nwar =[];
                //     if (searchResult.length != 0) {

                //             var pf_id = searchResult[0].id;
                //         // alert("pfffff_id"+ pf_id);
                //          var firstapp = searchResult[0].getValue({
                //             name: "custrecord_prefirst",
                //             label: "First Approver"
                //         });
                //         if(isNotEmpty(firstapp))
                //         {
                //             nwar.push(firstapp);

                //         }
                //         var secondapp = searchResult[0].getValue({
                //             name: "custrecord_presecond",
                //             label: "Second Approver"
                //         });
                //         if(isNotEmpty(secondapp))
                //         {
                //             nwar.push(secondapp);

                //         }

                //         var thirdapp = searchResult[0].getValue({
                //             name: "custrecord_prethird",
                //             label: "Third Approver"
                //         });
                //         if(isNotEmpty(thirdapp))
                //         {
                //             nwar.push(thirdapp);

                //         }
                //         var fourthapp = searchResult[0].getValue({
                //             name: "custrecord_fourth",
                //             label: "Fourth Approver"
                //         });
                //         if(isNotEmpty(fourthapp))
                //         {
                //             nwar.push(fourthapp);

                //         }
                //         var fifthapp = searchResult[0].getValue({
                //             name: "custrecord_prefifth",
                //             label: "Fifth Approver"
                //         });
                //         if(isNotEmpty(fifthapp))
                //         {
                //             nwar.push(fifthapp);

                //         }
                //         var sixthapp = searchResult[0].getValue({
                //             name: "custrecord_sixth",
                //             label: "Sixth Approver"
                //         });
                //         if(isNotEmpty(sixthapp))
                //         {
                //             nwar.push(sixthapp);

                //         }
                //         var seventhapp = searchResult[0].getValue({
                //             name: "custrecord_ahseven",
                //             label: "Seventh Approver"
                //         });
                //         if(isNotEmpty(seventhapp))
                //         {
                //             nwar.push(seventhapp);

                //         }
                //         var applevel = searchResult[0].getValue({
                //             name: "custrecord_preal",
                //             label: "Approval Level"
                //         });
                //         log.debug('nwar',nwar);
                //         log.debug('applevel',applevel);
                //         log.debug('firstapp',firstapp);
                //         log.debug('secondapp',secondapp);
                //         log.debug('thirdapp',thirdapp);
                //          log.debug('fourthapp',fourthapp);
                //          log.debug('fifthapp',fifthapp);
                //         log.debug('sixthapp',sixthapp);
                //         log.debug('seventhapp',seventhapp);
                //     }

                // //    var newflag = 0;
                // //   for (var i = 0 ; i < nwar.length;i++)
                // //     {    
                // //     // if ( i == (nwar.length-1)){
                // //      //    newflag=1;
                // //      // }
                // //      if(last_approver==nwar[i]){

                // //        poRec.setValue({fieldId: 'custbody_ah_next_approver',value: nwar[i+1]});
                // //       // log.debug(' mewapp', mewapp);
                // //       log.debug(' nwar[i+1]', nwar[i+1]);
                // //      }

                // //    }
                // if(last_approver==firstapp){
                //            poRec.setValue({fieldId: 'custbody_ah_next_approver',value: secondapp});
                //           log.debug('secondapp', secondapp);
                // }
                // else if(last_approver==secondapp){
                //     poRec.setValue({fieldId: 'custbody_ah_next_approver',value: thirdapp});
                //    log.debug('thirdapp', thirdapp);
                // }
                // else if(last_approver==thirdapp){
                //     poRec.setValue({fieldId: 'custbody_ah_next_approver',value: fourthapp});
                //    log.debug('fourthapp', fourthapp);
                // }

                //     //  if(newflag == 1){
                //     //    log.debug("enter the last condition");
                //     //      var  newflagrec = record.submitFields({
                //     //            type: poRec.type,
                //     //              id: poRec.id ,
                //     //              values: {

                //     //                  'custbody_ah_next_approver': null,
                //     //               'custbody_ah_approval_status': 4

                //     //              }
                //     //          });
                //     // } 

                //  }

                //   if (scriptContext.type == scriptContext.UserEventType.EDIT) {
                //     // if( (isNotEmpty(next_approver)&&(next_approver==current_user_id)))
                //     // scriptContext.form.clientScriptModulePath = './ApproveButtonClientScript.js';
                //     // scriptContext.form.addButton({
                //     //     id: "custpage_subapprove",
                //     //     label: "Submit For Approval",
                //     //     functionName: "onSubmitForApproval"
                //     // });

                //      var status = poRec.getValue({
                //          fieldId: 'custbody_ah_approval_status'
                //      });
                //      log.debug('status', status);


                //  }    
                //       var documentsNumber = newRecord.getValue({
                //           fieldId: 'tranid'
                //       });
                //       log.debug('documentNumbertest', documentsNumber);
                //       var documentNumber = poRec.getValue({
                //           fieldId: 'tranid'
                //       });
                //       log.debug('documentNumber', documentNumber);
                //       var firstapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_first_approver'
                //       });
                //       log.debug("firstapp ", firstapp);
                //       var firstappt = newRecord.getText({
                //           fieldId: 'custbody_ah_first_approver'
                //       });
                //       log.debug("firstappt text value", firstappt);
                //       var secondapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_second_approver'
                //       });
                //       log.debug("secondapp ", secondapp);
                //       var thirdapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_third_approver'
                //       });
                //       log.debug("thirdapp ", thirdapp);
                //       var fourthapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_fourth_approver'
                //       });
                //       log.debug("fourthapp ", fourthapp);
                //       var fifthapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_fifth_approver'
                //       });
                //       log.debug("fifthapp ", fifthapp);
                //       var sixthapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_sixth_approver'
                //       });
                //       log.debug("sixthapp ", sixthapp);
                //       var seventhapp = newRecord.getValue({
                //           fieldId: 'custbody_ah_seventh_approver'
                //       });
                //       log.debug("seventhapp ", seventhapp);

                //       var userObj = runtime.getCurrentUser();
                //       log.debug("userObj ", userObj);


                //   // Lookup Start For Customer
                //   var author = user.id;
                //   log.debug('author ', author);


                //    var custNumber = newRecord.getValue({
                //        fieldId: 'custbody_ah_next_approver'
                //    });
                //    log.debug('custNumber', custNumber);



                //   var custEmail = "";

                //   if (custNumber) {
                //       var customerLookup = search.lookupFields({
                //           type: search.Type.EMPLOYEE,
                //           id: custNumber,
                //           columns: ['email']
                //       });
                //       log.debug('customerLookup', customerLookup);

                //       if (customerLookup != '') {
                //           custEmail = customerLookup.email;
                //       }
                //       log.debug('custEmail: ' + custEmail);
                //   } else {
                //       custEmail = '';
                //   }
                //   // Lookup End For Customer

                //   var html = '<html>';
                //   if (firstapp != null && firstapp != '' && firstapp != undefined) {
                //       html += '<head><style>table {border-collapse: collapse;border: 1px solid black;} th, td {border: 1px solid black;padding: 8px;}</style></head>';
                //   }
                //   html += '<body>Hi ' + firstappt + ',<br/><br/>PO - ' + documentNumber + ' is Pending Approval.<br/><br/>';

                //   html += '<br/><br/>Thanks.</body></html>';
                //   email.send({
                //       author: author,
                //       recipients: custEmail,
                //       subject: 'PO - ' + documentNumber + ' is pending approval.',
                //       body: html,

                //   });
                //   log.debug('Email sent', 'document Number - ' + documentNumber);



            } catch (err) {
                log.error('Error occurred in beforeload function', err);
            }
        }

        return {
            beforeLoad: beforeLoad,
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit

        };
    });

function isNotEmpty(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
        return true;
    else
        return false;
} //