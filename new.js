var rec = currentRecord.get();
var custRec = record.load({
    type: rec.type,
    id: rec.id
});
var user = runtime.getCurrentUser();
//alert("user sender of mail" + user);
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
// alert('sup_approver' + sup_approver);
var supAppText = custRec.getText({
    fieldId: 'custrecord_lms_employee_supervisor'
});
//alert('supApprover receiver of mail newAppText' + supAppText);

var man_approver = custRec.getValue('custrecord_lms_approver_name');
//alert('man_approver' + man_approver);
var manAppText = custRec.getText({
    fieldId: 'custrecord_lms_approver_name'
});
//alert('manApprover receiver of mail newAppText' + manAppText);

var hr_approver = custRec.getValue('custrecord1481');
// alert('hr_approver' + hr_approver);
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
// alert('leaveType' + leaveType);
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
// alert('leaveFrom' + leaveFrom);
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
// alert('leaveBalance' + leaveBalance);

if (isNotEmpty(sup_approver) && status == 1) {
    var leaveRec = record.submitFields({
        type: rec.type,
        id: rec.id,
        values: {
            'custrecord_lms_approval_status': 5,


        }
    });
    sendEmailReject(leaveEmpVal, sup_approver, supAppText, leaveEmp, leaveID);

} else if (isNotEmpty(man_approver) && status == 2) {
    var leaveRec = record.submitFields({
        type: rec.type,
        id: rec.id,
        values: {
            'custrecord_lms_approval_status': 5,


        }
    });

    sendEmailReject(leaveEmpVal, man_approver, manAppText, leaveEmp, leaveID);

} else if (isNotEmpty(hr_approver) && status == 3) {
    var leaveRec = record.submitFields({
        type: rec.type,
        id: rec.id,
        values: {
            'custrecord_lms_approval_status': 5,


        }
    });

    sendEmailReject(leaveEmpVal, hr_approver, hrAppText, leaveEmp, leaveID);

}

window.location.reload();