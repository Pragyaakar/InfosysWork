/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/log', 'N/record', 'N/ui/dialog', "N/runtime", "N/url", "N/https", "N/search", "N/email"],
    function (currentRecord, log, record, dialog, runtime, url, https, search, email) {

        function fieldChanged(scriptContext) {

        }

        function onSubmitForApproval() {

            var rec = currentRecord.get();
            var custRec = record.load({
                type: rec.type,
                id: rec.id
            });
            var user = runtime.getCurrentUser();
            // alert("user sender of mail" + user);
            var author = user.id;
            // alert("author sender of mail" + author);
            var leaveID = custRec.getValue({
                fieldId: 'recordid'
            });
            // alert("leaveID" + leaveID);
            var status = custRec.getValue({
                fieldId: 'custrecord_lms_approval_status'
            });
            // alert('status  submit to approval' + status);
            var newApprover = custRec.getValue({
                fieldId: 'custrecord_lms_employee_supervisor'
            });
            // alert('newApprover receiver of mail' + newApprover);
            var newAppText = custRec.getText({
                fieldId: 'custrecord_lms_employee_supervisor'
            });
            // alert('newApprover receiver of mail newAppText' + newAppText);
            //custrecord_lms_employee_supervisor
            //custrecord_lms_leave_type
            //custrecord_lms_employee
            //custrecord_lms_leave_reasons
            //custrecord_lms_from_date
            //custrecord_lms_to_date
            //custrecord_lms_number_of_days
            //custrecord_lms_leave_balance
            var leaveType = custRec.getText({
                fieldId: 'custrecord_lms_leave_type'
            });
            // alert('leaveType' + leaveType);
            var leaveEmp = custRec.getText({
                fieldId: 'custrecord_lms_employee'
            });
            // alert('leaveEmp' + leaveEmp);
            var leaveReason = custRec.getText({
                fieldId: 'custrecord_lms_leave_reasons'
            });
            //alert('leaveReason' + leaveReason);
            var leaveFrom = custRec.getText({
                fieldId: 'custrecord_lms_from_date'
            });
            //  alert('leaveFrom' + leaveFrom);
            var leaveTo = custRec.getText({
                fieldId: 'custrecord_lms_to_date'
            });
            // alert('leaveTo' + leaveTo);
            var leaveDays = custRec.getValue({
                fieldId: 'custrecord_lms_number_of_days'
            });
            //alert('leaveDays' + leaveDays);
            var leaveBalance = custRec.getValue({
                fieldId: 'custrecord_lms_leave_balance'
            });
            // alert('leaveBalance' + leaveBalance);


            var leaveRec = record.submitFields({
                type: rec.type,
                id: rec.id,
                values: {
                    'custrecord_lms_approval_status': 1,


                }
            });
            // alert("purchId "+ purchId);
            sendEmailPending(newApprover, newAppText, leaveID, author, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);


            window.location.reload();



        }

        function onApproveButtonClick() {

            var rec = currentRecord.get();
            var custRec = record.load({
                type: rec.type,
                id: rec.id
            });
            var user = runtime.getCurrentUser();
            // alert("user sender of mail" + user);
            var author = user.id;
            //alert("author sender of mail" + author);
            var leaveID = custRec.getValue({
                fieldId: 'recordid'
            });
            //alert("leaveID" + leaveID);
            var status = custRec.getValue({
                fieldId: 'custrecord_lms_approval_status'
            });
            //alert('status  submit to approval' + status);
            var sup_approver = custRec.getValue('custrecord_lms_employee_supervisor');
            //alert('sup_approver' + sup_approver);
            var supAppText = custRec.getText({
                fieldId: 'custrecord_lms_employee_supervisor'
            });
            //alert('supApprover receiver of mail newAppText' + supAppText);

            var man_approver = custRec.getValue('custrecord_lms_approver_name');
            // alert('man_approver' + man_approver);
            var manAppText = custRec.getText({
                fieldId: 'custrecord_lms_approver_name'
            });
            //alert('manApprover receiver of mail newAppText' + manAppText);

            var hr_approver = custRec.getValue('custrecord1481');
            //alert('hr_approver' + hr_approver);
            var hrAppText = custRec.getText('custrecord1481');
            //alert('hr_approver' + hrAppText);
            //custrecord_lms_employee_supervisor
            //custrecord_lms_leave_type
            //custrecord_lms_employee
            //custrecord_lms_leave_reasons
            //custrecord_lms_from_date
            //custrecord_lms_to_date
            //custrecord_lms_number_of_days
            //custrecord_lms_leave_balance
            var leaveType = custRec.getText({
                fieldId: 'custrecord_lms_leave_type'
            });
            //alert('leaveType' + leaveType);
            var leaveEmp = custRec.getText({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmp' + leaveEmp);
            var leaveEmpVal = custRec.getValue({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmpVal' + leaveEmpVal);
            var leaveReason = custRec.getText({
                fieldId: 'custrecord_lms_leave_reasons'
            });
            //alert('leaveReason' + leaveReason);
            var leaveFrom = custRec.getText({
                fieldId: 'custrecord_lms_from_date'
            });
            //alert('leaveFrom' + leaveFrom);
            var leaveTo = custRec.getText({
                fieldId: 'custrecord_lms_to_date'
            });
            //alert('leaveTo' + leaveTo);
            var leaveDays = custRec.getValue({
                fieldId: 'custrecord_lms_number_of_days'
            });
            //alert('leaveDays' + leaveDays);
            var leaveBalance = custRec.getValue({
                fieldId: 'custrecord_lms_leave_balance'
            });
            var typeofleave = custRec.getValue({
                fieldId: 'custrecord_lms_leave_type'
            });
            //alert('typeofleave' + typeofleave);
            var trackLevel = [];
            var SearchObj = search.create({
                type: "customrecord_lms_leave_rule",
                filters: [
                    ["custrecord_lms_leave_type_", "is", typeofleave]
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
                // alert('applevel' + applevel);
                if (applevel == 1) {
                    trackLevel.push(sup_approver);
                    //alert('trackLevel' + trackLevel);

                } else if (applevel == 2) {
                    trackLevel.push(sup_approver);
                    trackLevel.push(man_approver);
                    //alert('trackLevel' + trackLevel);

                } else if (applevel == 3) {
                    trackLevel.push(sup_approver);
                    trackLevel.push(man_approver);
                    trackLevel.push(hr_approver);
                    //alert('trackLevel' + trackLevel);
                }

            }
            //alert('trackLevel.length' + trackLevel.length);
            // alert('leaveBalance' + leaveBalance);

            if (isNotEmpty(sup_approver) && status == 1) {
                if (trackLevel.length == 1) {
                    var leaveRec = record.submitFields({
                        type: rec.type,
                        id: rec.id,
                        values: {
                            'custrecord_lms_approval_status': 4,


                        }
                    });
                    // alert("purchId "+ purchId);
                    sendEmailApproved(leaveEmpVal, sup_approver, leaveEmp, leaveID);

                } else {
                    var leaveRec = record.submitFields({
                        type: rec.type,
                        id: rec.id,
                        values: {
                            'custrecord_lms_approval_status': 2,


                        }
                    });
                    // alert("purchId "+ purchId);
                    sendEmailPending(man_approver, manAppText, leaveID, sup_approver, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);
                }
            } else if (isNotEmpty(man_approver) && status == 2) {
                if (trackLevel.length == 3) {
                    var leaveRec = record.submitFields({
                        type: rec.type,
                        id: rec.id,
                        values: {
                            'custrecord_lms_approval_status': 3,


                        }
                    });
                    // alert("purchId "+ purchId);
                    sendEmailPending(hr_approver, hrAppText, leaveID, sup_approver, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);
                } else {
                    var leaveRec = record.submitFields({
                        type: rec.type,
                        id: rec.id,
                        values: {
                            'custrecord_lms_approval_status': 4,


                        }
                    });
                    // alert("purchId "+ purchId);
                    sendEmailApproved(leaveEmpVal, man_approver, leaveEmp, leaveID);
                }
            } else if ((isNotEmpty(hr_approver) || current_user_role == 1056) && status == 3) {
                var leaveRec = record.submitFields({
                    type: rec.type,
                    id: rec.id,
                    values: {
                        'custrecord_lms_approval_status': 4,


                    }
                });
                // alert("purchId "+ purchId);
                sendEmailApproved(leaveEmpVal, hr_approver, leaveEmp, leaveID);
            }

            window.location.reload();



        }

        function onResubmitForApproval() {
            var rec = currentRecord.get();
            var custRec = record.load({
                type: rec.type,
                id: rec.id
            });
            var user = runtime.getCurrentUser();
            // alert("user sender of mail" + user);
            var author = user.id;
            //alert("author sender of mail" + author);
            var leaveID = custRec.getValue({
                fieldId: 'recordid'
            });
            //alert("leaveID" + leaveID);
            var status = custRec.getValue({
                fieldId: 'custrecord_lms_approval_status'
            });
            //alert('status  submit to approval' + status);
            var sup_approver = custRec.getValue('custrecord_lms_employee_supervisor');
            //alert('sup_approver' + sup_approver);
            var supAppText = custRec.getText({
                fieldId: 'custrecord_lms_employee_supervisor'
            });
            //alert('supApprover receiver of mail newAppText' + supAppText);

            var man_approver = custRec.getValue('custrecord_lms_approver_name');
            // alert('man_approver' + man_approver);
            var manAppText = custRec.getText({
                fieldId: 'custrecord_lms_approver_name'
            });
            //alert('manApprover receiver of mail newAppText' + manAppText);

            var hr_approver = custRec.getValue('custrecord1481');
            //alert('hr_approver' + hr_approver);
            var hrAppText = custRec.getText('custrecord1481');
            //alert('hr_approver' + hrAppText);

            var leaveType = custRec.getText({
                fieldId: 'custrecord_lms_leave_type'
            });
            //alert('leaveType' + leaveType);
            var leaveEmp = custRec.getText({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmp' + leaveEmp);
            var leaveEmpVal = custRec.getValue({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmpVal' + leaveEmpVal);
            var leaveReason = custRec.getText({
                fieldId: 'custrecord_lms_leave_reasons'
            });
            //alert('leaveReason' + leaveReason);
            var leaveFrom = custRec.getText({
                fieldId: 'custrecord_lms_from_date'
            });
            //alert('leaveFrom' + leaveFrom);
            var leaveTo = custRec.getText({
                fieldId: 'custrecord_lms_to_date'
            });
            //alert('leaveTo' + leaveTo);
            var leaveDays = custRec.getValue({
                fieldId: 'custrecord_lms_number_of_days'
            });
            //alert('leaveDays' + leaveDays);
            var leaveBalance = custRec.getValue({
                fieldId: 'custrecord_lms_leave_balance'
            });



            if (isNotEmpty(leaveEmpVal) && status == 5) {

                var leaveRec = record.submitFields({
                    type: rec.type,
                    id: rec.id,
                    values: {
                        'custrecord_lms_approval_status': 1,
                        'custrecord_lms_rejection_reason': '',


                    }
                });
                // alert("purchId "+ purchId);
                // sendEmailPending(man_approver, manAppText, leaveID, sup_approver, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);
                sendEmailPending(sup_approver, supAppText, leaveID, author, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);

            }

            window.location.reload();


        }

        function onRejectButtonClick() {

            var rec = currentRecord.get();
            var custRec = record.load({
                type: rec.type,
                id: rec.id
            });
            var user = runtime.getCurrentUser();
            //alert('user object' + JSON.stringify(user));
            //alert("user sender of mail" + user);
            var author = user.id;
            var auname = user.name;
            //alert("author sender of mail" + author);
            //alert("auname" + auname);
            var leaveID = custRec.getValue({
                fieldId: 'recordid'
            });
            //alert("leaveID" + leaveID);
            var leaveEmp = custRec.getText({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmp' + leaveEmp);
            var leaveEmpVal = custRec.getValue({
                fieldId: 'custrecord_lms_employee'
            });
            //alert('leaveEmpVal' + leaveEmpVal);
            // alert('id' + rec.id);
            //alert('type' + rec.type);
            // var firstapp = custRec.getValue('custbody_ah_next_approver');
            //alert('firstapp'+firstapp );



            var suiteletURL = url.resolveScript({
                scriptId: "customscript_lms_su_reject",
                deploymentId: "customdeploy_lms_su",
                returnExternalUrl: false,


            });
            suiteletURL += '&recordId=' + rec.id + '&recordType=' + rec.type + '&author=' + author + '&leaveID=' + leaveID + '&leaveEmpVal=' + leaveEmpVal + '&leaveEmp=' + leaveEmp;
            nlExtOpenWindow(suiteletURL, 'Reject Reason', 400, 300);
            var reject = custRec.setValue({
                fieldId: 'custrecord_lms_approval_status',
                value: 5
            }); // reject status
            var reason = custRec.getText('custrecord_lms_rejection_reason');
            //  alert('reason'+reason);
            custRec.save();



        }

        // function sendEmailReject(emailrec, emailsend, senderName, ename, lrecord) {
        //     // alert('entered into email approve');
        //     var html = '<html>';
        //     html += '<body>Hi ' + ename + ',<br/><br/>Your Leave Request' + lrecord + 'has been Rejected by' + senderName + '.<br/><br/>';

        //     html += '<br/><br/>Thanks.</body></html>';
        //     email.send({
        //         author: emailsend,
        //         recipients: emailrec,
        //         subject: 'LEAVE REQUEST - ' + lrecord + ' is Rejected.',
        //         body: html,

        //     });


        // }




        function sendEmailApproved(emailrec, emailsend, ename, lrecord) {
            // alert('entered into email approve');
            var html = '<html>';
            html += '<body>Hi ' + ename + ',<br/><br/>Your Leave Request' + lrecord + 'has been Approved <br/><br/>';

            html += '<br/><br/>Thanks.</body></html>';
            email.send({
                author: emailsend,
                recipients: emailrec,
                subject: 'LEAVE REQUEST - ' + lrecord + ' is approved.',
                body: html,

            });


        }
        //sendEmailPending(newApprover, leaveID, user, leaveType, leaveEmp, leaveReason, leaveFrom, leaveTo, leaveDays, leaveBalance);
        function sendEmailPending(newapprover, newText, leaveid, authorname, typeofleave, empname, reason, fromdate, todate, period, balancel) {
            var html = '<html>';
            //if (newapprover != null && newapprover != '' && newapprover != undefined) {}
            html += '<head><style>table {border-collapse: collapse;border: 1px solid black;} th, td {border: 1px solid black;padding: 8px;}</style></head>';
            html += '<body>Hi ' + newText + ',<br/><br/>LEAVE REQUEST - ' + leaveid + ' is Pending for Approval.<br/><br/>';
            html += '<body> Below are the following details:<br/><br/>';
            html += '<br/><br/>';
            //html += '<body><table><thead><tr><td>Leave Details</td><td>Value</td></tr></thead><tbody>';
            html += '<body><table><tr><td>Leave Requestor</td><td>' + empname + '</td></tr><tbody>';
            html += '<body><tr><td>Leave Type</td><td>' + typeofleave + '</td></tr>';
            html += '<body><tr><td>Leave Reason</td><td>' + reason + '</td></tr>';
            html += '<body><tr><td>Leave Days </td><td>' + period + '</td></tr>';
            html += '<body><tr><td>Leave FromDate</td><td>' + fromdate + '</td></tr>';
            html += '<body><tr><td>Leave ToDate </td><td>' + todate + '</td></tr>';
            html += '<body><tr><td>Available Balance</td><td>' + balancel + '</td></tr>';
            html += '<body></tbody></table><div style="height:10px;"></div><br/><br/>'
            // html += '<body>' + empname + ',has requested Leave under leave type  - ' + typeofleave + '.<br/><br/>';
            // html += '<body>From Date - ' + fromdate + '&nbsp;&nbsp;To Date -' + todate + '&nbsp;for&nbsp;' + period + '&nbsp;Days having Current leave Balance:&nbsp;' + balancel + '&nbsp;.<br/><br/>';
            // html += '<body>Leave Reason-' + reason + '.<br/><br/>';
            html += '<br/><br/>Thanks.</body></html>';

            //empname
            //reason
            //typeofleave
            //fromdate
            //todate 
            //period
            //balancel
            email.send({
                author: authorname,
                recipients: newapprover,
                subject: 'LEAVE REQUEST - ' + leaveid + ' is  pending approval.',
                body: html,

            });

        }



        return {
            fieldChanged: fieldChanged,
            onApproveButtonClick: onApproveButtonClick,
            onRejectButtonClick: onRejectButtonClick,
            onSubmitForApproval: onSubmitForApproval,
            onResubmitForApproval: onResubmitForApproval,
            sendEmailApproved: sendEmailApproved,
            sendEmailPending: sendEmailPending

        };

    });

function isNotEmpty(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != NaN && value != 'NaN' && value != '- None -')
        return true;
    else
        return false;
}

function isEmpty(value) {
    if (value == null && value == 'undefined' && value == undefined && value == '' && value == NaN && value == 'NaN' && value == '- None -')
        return true;
    else
        return false;
} //