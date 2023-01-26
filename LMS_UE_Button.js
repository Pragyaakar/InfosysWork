/** 
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

define(['N/currentRecord', 'N/email', 'N/error', 'N/format', 'N/http', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/transaction', 'N/translation', 'N/ui/dialog', 'N/ui/message', 'N/ui/serverWidget', 'N/url'],

    function (currentRecord, email, error, format, http, log, record, runtime, search, transaction, translation, dialog, message, serverWidget, url) {

        function beforeLoad(scriptContext) {
            try {



                if (scriptContext.type == 'create') {
                    var obj_record = scriptContext.newRecord;
                    log.debug('obj_record ', obj_record);
                    var i_recordId = scriptContext.newRecord.id;
                    log.debug('i_recordId', i_recordId);
                    var s_record_type = scriptContext.newRecord.type;
                    log.debug('s_record_type', s_record_type);
                    var currentrecord = scriptContext.currentRecord;
                    log.debug('currentrecord ', currentrecord);
                    var approval_status = obj_record.getValue('custrecord_lms_approval_status');
                    log.debug('approval_status', approval_status);
                    obj_record.setValue({
                        fieldId: 'custrecord_lms_approval_status',
                        value: 6

                    });
                    var user = runtime.getCurrentUser();
                    log.debug('user ', user);
                    var author = user.id; //custbody_ah_cl_created_by
                    log.debug('author ', author);
                    // obj_record.setValue({
                    //     fieldId: 'custbody_ah_cl_created_by',
                    //     value: author

                    // });

                }


                if (scriptContext.type == 'view') {
                    var obj_record = scriptContext.newRecord;
                    log.debug('obj_record ', obj_record);
                    var i_recordId = scriptContext.newRecord.id;
                    var s_record_type = scriptContext.newRecord.type;
                    var currentrecord = scriptContext.currentRecord;
                    //  var currentuser = runtime.getCurrentUser();
                    log.debug('currentrecord view ', currentrecord);
                    log.debug('s_record_type view', s_record_type);
                    log.debug('i_recordId view', i_recordId);
                    var userobj = runtime.getCurrentUser();
                    log.debug("userobj view", userobj);
                    var current_user_id = userobj.id;
                    log.debug("current_user_id view", current_user_id);
                    var current_user_role = userobj.role;
                    log.debug("current_user_role", current_user_role);
                    var leaveRequestor = obj_record.getValue('custrecord_lms_employee');
                    log.debug('leaveRequestor ', leaveRequestor);
                    var sup_approver = obj_record.getValue('custrecord_lms_employee_supervisor');
                    log.debug('sup_approver', sup_approver);
                    var man_approver = obj_record.getValue('custrecord_lms_approver_name');
                    log.debug('man_approver', man_approver);
                    var hr_approver = obj_record.getValue('custrecord1481');
                    log.debug('hr_approver', hr_approver);
                    var ltype = obj_record.getValue('custrecord_lms_leave_type');
                    log.debug('ltype ', ltype);
                    //custrecord_lms_approver_name-Manager
                    //custrecord1481-HR
                    var approval_status = obj_record.getValue('custrecord_lms_approval_status');
                    log.debug('approval_status', approval_status);
                    //    obj_record.setValue({
                    //     fieldId: 'custbody_ah_approval_status',
                    //     value:3

                    //    })

                    if (approval_status == 6 && (leaveRequestor == current_user_id || current_user_role == 3)) {
                        log.debug('approval_status', approval_status);
                        scriptContext.form.clientScriptModulePath = './LMS_CLButton.js';

                        scriptContext.form.addButton({
                            id: "custpage_subapprove",
                            label: "Submit For Approval",
                            functionName: "onSubmitForApproval"
                        });


                    } //end of if condition
                    if (approval_status == 5 && (leaveRequestor == current_user_id || current_user_role == 3)) {
                        log.debug('approval_status', approval_status);
                        scriptContext.form.clientScriptModulePath = './LMS_CLButton.js';

                        scriptContext.form.addButton({
                            id: "custpage_resubapprove",
                            label: "Resubmit For Approval",
                            functionName: "onResubmitForApproval"
                        });


                    } //end of if condition

                    var trackApp = [];
                    var SearchObj = search.create({
                        type: "customrecord_lms_leave_rule",
                        filters: [
                            ["custrecord_lms_leave_type_", "is", ltype]
                        ],
                        columns: [
                            search.createColumn({
                                name: "custrecord_lms_leave_type_",
                                label: "LMS Leave type "
                            }),
                            search.createColumn({
                                name: "custrecord1482",
                                label: "LMS Approval Hierarchy "
                            })
                        ]
                    });
                    var searchResult = SearchObj.run().getRange({
                        start: 0,
                        end: 1
                    });
                    if (searchResult.length != 0) {

                        var applevel = searchResult[0].getValue({
                            name: "custrecord1482",
                            label: "LMS Approval Hierarchy "
                        });
                        log.debug('applevel', applevel);
                        if (applevel == 1) {
                            trackApp.push(sup_approver);
                            log.debug('trackApp', trackApp);

                        } else if (applevel == 2) {
                            trackApp.push(sup_approver);
                            trackApp.push(man_approver);
                            log.debug('trackApp', trackApp);

                        } else if (applevel == 3) {
                            trackApp.push(sup_approver);
                            trackApp.push(man_approver);
                            trackApp.push(hr_approver);
                            log.debug('trackApp', trackApp);
                        }

                    }
                    log.debug('trackApp.length', trackApp.length);


                    if (isNotEmpty(sup_approver) && (sup_approver == current_user_id) && (approval_status == 1) && (trackApp.length == 1 || trackApp.length == 2 || trackApp.length == 3)) {


                        scriptContext.form.clientScriptModulePath = './LMS_CLButton.js';
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

                    }
                    if (isNotEmpty(man_approver) && (man_approver == current_user_id) && (approval_status == 2) && (trackApp.length == 2 || trackApp.length == 3)) {


                        scriptContext.form.clientScriptModulePath = './LMS_CLButton.js';
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

                    }
                    if ((isNotEmpty(hr_approver) || current_user_role == 1056) && ((hr_approver == current_user_id) || current_user_role == 1056) && (approval_status == 3) && (trackApp.length == 3)) {


                        scriptContext.form.clientScriptModulePath = './LMS_CLButton.js';
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

                    }









                } //end of if(scriptContext.type == 'view')


            } //end of try block
            catch (e) {
                log.debug('Exception:==', e);
            } //end of catch block	
        } //end of function beforeLoad(scriptContext) 




        return {
            beforeLoad: beforeLoad
            // beforeSubmit: beforeSubmit,
            // afterSubmit: afterSubmit

        };
    });

function isNotEmpty(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
        return true;
    else
        return false;
}