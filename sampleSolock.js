/*
 * This script is governed by the license agreement located in the script directory. 
 * By installing and using this script the end user acknowledges that they have accepted and 
 * agree with all terms and conditions contained in the license agreement. All code remains the
 * exclusive property of Online One Pty and the end user agrees that they will not attempt to
 * copy, distribute, or reverse engineer this script, in whole or in part.
 * 
 * Author: Online One Pty Ltd
 * Date: 21 May 2012
 * 
 * Date Modified		Modified By			Notes
 * 2/12/2014			Patrick Lee			Update to script to reference hidden field which contains list of open jobs rather than doing a suitelet call
 * 10/09/2016			Ron Nguyen			Adding restrictions on GL impacting fields
 * 01 May 2017			Mark Aquino			Removed calls of Suitelet as response is not being used in any algorithm
 * 22 May 2017			Kim Morfe			Case#10674 - Added condition to allow user to make non-GL changes and prevent them from creating new transactions for closed jobs 
 * 23 Aug 2017			Patrick Lee (Tel)	O2N may be doing large invoices where there are > 100 lines so onSave function has been updated to support this as it was running out of memory
 * 
 */


/* ---- GLOBAL VARIABLES ---- */
var log = new Logger(false); //always include a Logger object.
var context = nlapiGetContext(); //always include an instance of the nlobjContext object.

/* ---- PRODUCTION ---- */
var Script_Name = 'O2 Networks Job Lock CSS';
var Email_From = -5;
var Email_To = 'autechteam@fronde.com';
var Email_Cc = null;
var Client_Name = 'O2 Networks';
var Script_File = 'o2networks_job_lock_css_21052012.js';

var action_type = false;
var job_closed = false;
var itemLineCount = false;

function JobLockOnPageInit(type) {
    action_type = type;
    if ((action_type != 'create' && action_type != 'copy') && isGLImpactOnTransaction(nlapiGetRecordType(), nlapiGetRecordId())) {
        var jobRecord = isJobClosed(nlapiGetRecordType());
        if (jobRecord) { //status == closed
            job_closed = true;
            disableGLImpactingFields('line');
            disableGLImpactingFields('header');
        }
    }
}

function JobLockOnLineInit() {
    if ((action_type != 'create' && action_type != 'copy') && isGLImpactOnTransaction(nlapiGetRecordType(), nlapiGetRecordId())) {
        var jobRecord = isJobClosed(nlapiGetRecordType());
        if (jobRecord) { //status == closed
            job_closed = true;
            disableGLImpactingFields('line');
        }
    }
}

function JobLockOnValidateLine(type) {
    if (nlapiGetRecordType() == 'expensereport') return true;
    if (nlapiGetRecordType() != 'salesorder' && nlapiGetRecordType() != 'purchaseorder') {
        var jobClosed = isJobClosed(nlapiGetRecordType(), 'validateLine', type);
        if (jobClosed) {
            alert('The associated Job on this record is in status closed, hence updating transaction line item is not possible');
            return false;
        }
    }

    return true;
}

function JobLockOnValidateInsert(type) {
    if ((action_type != 'create' && action_type != 'copy') && (type == "item" || type == "expense")) {
        if (job_closed) {
            alert('Job is already closed. You cannot make any GL impacting changes');
            return false;
        }
    }
    return true;
}

function JobLockOnValidateDelete(type) {
    if ((action_type != 'create' && action_type != 'copy') && (type == "item" || type == "expense")) {
        var originalItemLineCount = nlapiGetLineItemCount(type);

        if (job_closed) {
            alert('Job is already closed. You cannot make any GL impacting changes');
            return false;
        }
    }
    return true;
}

function JOBLockpostSourcing(type, name) {

    var recordType = nlapiGetRecordType();

    if (recordType == 'salesorder') {
        if (name === 'job') {
            var JOB = nlapiGetFieldValue('job');
            if (_validateData(JOB)) {

                var JOBStatus = nlapiLookupField('job', JOB, 'entitystatus');

                if (_validateData(JOBStatus) && JOBStatus == 1) {
                    alert("You have selected a closed job.  Please review job status");
                }
            }
        }
    }
}

function JobLockOnSaveRecord() {

    if (isGLImpactOnTransaction(nlapiGetRecordType(), nlapiGetRecordId())) {

        var jobRecord = isJobClosed(nlapiGetRecordType(), 'save');

        if (jobRecord) //status == closed
        {
            if (!_validateData(nlapiGetRecordId())) {
                if (nlapiGetRecordType() == 'salesorder') {
                    var result = confirm("You have selected a closed job which will have finance implications if you proceed.  Please reopen the job (if this is the correct job) before proceeding. If you would still like to continue, please select OK");
                    if (!_validateData(result)) {
                        return false;
                    }
                }
            }
            if ((action_type != 'create' && action_type != 'copy')) {
                var lineItemType = 'item';
                if (nlapiGetRecordType() == 'expensereport') lineItemType = 'expense';

                var lineCount = nlapiGetLineItemCount(lineItemType);
                var tranRec = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
                var prevLineCount = tranRec.getLineItemCount(lineItemType);

                if (lineCount != prevLineCount) {
                    alert('You have added a line in error.  Please cancel out of transaction.');
                    return false;
                }
                lineItemType = 'expense';
                lineCount = nlapiGetLineItemCount(lineItemType);
                prevLineCount = tranRec.getLineItemCount(lineItemType);
                if (lineCount != prevLineCount) {
                    alert('You have added a line in error.  Please cancel out of transaction.');
                    return false;
                }
            } else {

                if (nlapiGetRecordType() != 'salesorder' && nlapiGetRecordType() != 'purchaseorder') {
                    alert('You cannot save this transaction as the job is closed');
                    return false;
                }
            }
        }
    }

    if ([4].contains(parseInt(context.getUser()))) return true;

    var recType = nlapiGetRecordType();

    var jobIds = new Array();
    var body = 'T';
    //removerd  ********   recType == 'salesorder' ||  *************
    if (recType == 'invoice' || recType == 'timebill') {

        var jobFieldId = 'job';
        var tranDate = nlapiStringToDate(nlapiGetFieldValue('trandate'));
        var pastDate = new Date(tranDate.getFullYear(), tranDate.getMonth(), 1);

        var currentDate = new Date();
        var utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000); //Get GMT and convert to absolute time
        var localTime = utc + (10 * 60 * 60 * 1000);
        currentDate = new Date(localTime);
        var futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 7);

        var currentDay = currentDate.getDate();
        var cutOffDate;
        if (currentDay <= 7) {
            currentDate.setDate(1);
            cutOffDate = nlapiAddMonths(currentDate, -1);
            cutOffDate = nlapiAddDays(cutOffDate, -1);
        } else {
            currentDate.setDate(1);
            cutOffDate = currentDate;
            cutOffDate = nlapiAddDays(cutOffDate, -1);
        }

        if (recType == 'timebill') jobFieldId = 'customer';

        var jobId = nlapiGetFieldValue(jobFieldId);
        if (StringUtils.isEmpty(jobId)) return true;

        jobIds.push(jobId);

        if (tranDate < cutOffDate && recType == 'timebill') {
            //					if([5, -5, 88, 125, 4, 6670, 7044, 6509].contains(parseInt(context.getUser()))) return true;
            if ([3, 1016, 1036, 1093, 1094].contains(parseInt(context.getRole()))) return true;
            alert('You are attempting to enter time for a previous month.  This is not allowed.');
            return false;
        } else if (tranDate.compareTo(pastDate) == -1) {
            //					if([5, -5, 88, 125, 4, 6670, 7044, 6509].contains(parseInt(context.getUser()))) return true;
            if ([3, 1016, 1036, 1093, 1094].contains(parseInt(context.getRole()))) return true;
            alert('You are attempting to enter a transaction for a previous month.  This is not allowed.');
            return false;
        }
        if (nlapiGetUser() == '4') {
            //alert('Not Saving on purpose, but will work for other staff');
            return true;
        }
        jobIds = jobIds.toString();
        if (StringUtils.isEmpty(jobIds)) return true;

        // var jobLockSuiteletURL = nlapiResolveURL('SUITELET', 'customscript_o2n_job_lock_slet', 'customdeploy_o2n_job_lock_slet', true);

        // var response = nlapiRequestURL(jobLockSuiteletURL, {'jobids' : jobIds});
        // body = response.getBody();
    }

    var recordType = nlapiGetRecordType();
    var recId = nlapiGetRecordId();


    if (recordType == 'purchaseorder') {
        var JOB = nlapiGetFieldValue('custbody_po_job');
        var customForm = nlapiGetFieldValue('customform');

        if (_validateData(JOB)) {
            if (!_validateData(recId)) {
                var JOBStatus = nlapiLookupField('job', JOB, 'entitystatus');

                if (_validateData(JOBStatus) && JOBStatus == 1) {
                    var result = confirm("You have selected a closed job which will have finance implications if you proceed.  Please reopen the job (if this is the correct job) before proceeding. If you would still like to continue, please select OK");
                    if (!_validateData(result)) {
                        return false;
                    }
                }
            }
        }

    }

    return true;
}

function disableGLImpactingFields(section) {
    if (section == 'header') {
        nlapiDisableField('trandate', true);
        nlapiDisableField('job', true);
        nlapiDisableField('duedate', true);
        nlapiDisableField('exchangerate', true);
        nlapiDisableField('location', true);
        nlapiDisableField('department', true);
        nlapiDisableField('class', true);

        nlapiDisableField('account', true);
        setTimeout(function () {
            nlapiDisableField('postingperiod', true);
        }, 500);
    }

    if (section == 'line') {
        nlapiDisableLineItemField('item', 'item', 'T');
        nlapiDisableLineItemField('item', 'quantityremaining', 'T');
        nlapiDisableLineItemField('item', 'quantity', 'T');
        nlapiDisableLineItemField('item', 'price', 'T');
        nlapiDisableLineItemField('item', 'rate', 'T');
        nlapiDisableLineItemField('item', 'taxcode', 'T');
        nlapiDisableLineItemField('item', 'taxrate1', 'T');
        //nlapiDisableLineItemField('item', 'custcol_maintenance_end_date', 'T');
        //nlapiDisableLineItemField('item', 'custcol_maintenance_start_date', 'T');

        //nlapiDisableLineItemField('item', 'custcol_serial_numbers', 'T');
        nlapiDisableLineItemField('item', 'tax1amt', 'T');
        nlapiDisableLineItemField('item', 'grossamt', 'T')
        nlapiDisableLineItemField('item', 'amount', 'T');

        //nlapiDisableLineItemField('item', 'revrecenddate', 'T');
        nlapiDisableLineItemField('item', 'revrecschedule', 'T');
        //nlapiDisableLineItemField('item', 'revrecstartdate', 'T');

        nlapiDisableLineItemField('item', 'location', 'T');
        nlapiDisableLineItemField('item', 'department', 'T');
        nlapiDisableLineItemField('item', 'class', 'T');

        nlapiDisableLineItemField('item', 'amortizationsched', 'T');

        nlapiDisableLineItemField('expense', 'category', 'T');
        nlapiDisableLineItemField('expense', 'location', 'T');
        nlapiDisableLineItemField('expense', 'department', 'T');
        nlapiDisableLineItemField('expense', 'class', 'T');
        nlapiDisableLineItemField('expense', 'tax1amt', 'T');
        nlapiDisableLineItemField('expense', 'grossamt', 'T');
        nlapiDisableLineItemField('expense', 'taxcode', 'T');
        nlapiDisableLineItemField('expense', 'customer', 'T');
        nlapiDisableLineItemField('expense', 'amount', 'T');

    }
}

function isGLImpactOnTransaction(recType, recId) {
    try {
        var filters = new Array();
        filters.push(new nlobjSearchFilter('posting', null, 'is', 'F'));
        filters.push(new nlobjSearchFilter('internalid', null, 'is', recId));

        var columns = new Array();
        columns.push(new nlobjSearchColumn('internalid'));
        columns.push(new nlobjSearchColumn('posting'));

        var results = nlapiSearchRecord(recType, null, filters, columns);

        if (StringUtils.isNotEmpty(results)) {
            //log.debug('POSTING', 'FALSE');
            return false;
        }

        //log.debug('POSTING', 'TRUE');
    } catch (ex) {

    }
    return true;
}

function isJobClosed(recType, action, type) {
    //removed **** || recType == 'purchaseorder' **** 
    //if(recType!='salesorder' || !='purchaseorder')
    //{
    if (recType == 'expensereport' || recType == 'vendorbill' || recType == 'vendorcredit') {
        var jobIds = new Array();

        if (action == 'validateLine') {
            jobIds = nlapiGetCurrentLineItemValue(type, 'customer');
        } else {
            var itemCount = nlapiGetLineItemCount('item');
            var expenseCount = nlapiGetLineItemCount('expense');

            for (var i = 1; i <= itemCount; i++) {
                var jobId = nlapiGetLineItemValue('item', 'customer', i);

                if (!StringUtils.isEmpty(jobId))
                    jobIds.push(jobId);
            }
            for (var i = 1; i <= expenseCount; i++) {
                var jobId = nlapiGetLineItemValue('expense', 'customer', i);

                if (!StringUtils.isEmpty(jobId))
                    jobIds.push(jobId);
            }
        }
        if (StringUtils.isNotEmpty(jobIds)) {
            var permission = nlapiGetContext().getPermission('LIST_JOB');
            if (permission == 0) {
                var jobLockSuiteletURL = nlapiResolveURL('SUITELET', 'customscript_o2n_job_lock_slet', 'customdeploy_o2n_job_lock_slet', true);
                if (context.getEnvironment() == 'SANDBOX') jobLockSuiteletURL = 'https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=166&deploy=1';
                var response = nlapiRequestURL(jobLockSuiteletURL, {
                    'jobids': jobIds.toString()
                });
                var body = response.getBody();

                if (body != 'F') {
                    alert(body + ' is already closed. You cannot make any GL impacting changes.');
                    return true;
                }
            } else {
                var jobClosedSearch = nlapiSearchRecord('job', null,
                    [new nlobjSearchFilter('internalid', null, 'anyof', jobIds),
                        new nlobjSearchFilter('status', null, 'anyof', '1')
                    ],
                    [new nlobjSearchColumn('companyname')]);

                if (!StringUtils.isEmpty(jobClosedSearch)) {
                    alert(jobClosedSearch[0].getValue('companyname') + ' is already closed. You cannot make any GL impacting changes.');
                    return true;
                }
            }
        }

        return false;
    } else {

        if (!StringUtils.isEmpty(nlapiGetFieldValue('job'))) {
            var jobRecord = nlapiLoadRecord('job', nlapiGetFieldValue('job'));
            if (jobRecord.getFieldValue('entitystatus') == '1') { // status = closed
                return true;
            } else {
                return false;
            }
        }
    }

    return false;
    //}
}

function _validateData(value) {
    if (value != null && value != 'undefined' && value != undefined && value != '' && value != '') {
        return true;
    } else {
        return false;
    }
}