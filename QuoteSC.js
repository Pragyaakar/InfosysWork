/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/file', 'N/format', 'N/runtime', 'N/search', 'N/task', 'N/sftp', 'N/record'],
    /**
     * @param {email} email
     * @param {file} file
     * @param {format} format
     * @param {runtime} runtime
     * @param {search} search
     * @param {sftp} sftp
     */
    function (email, file, format, runtime, search, task, sftp, record) {
        /**
         * Definition of the Scheduled script trigger point.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
         * @Since 2015.2
         */
        function execute(scriptContext) {
            try {
                log.audit('execute > Schedule script', 'Strat');
                var scriptObj = runtime.getCurrentScript(); //0 units
                var savedSearchId = scriptObj.getParameter({ //0 units
                    name: 'custscript_quote_extract_saved_search'
                });
                var sftpConfigId = scriptObj.getParameter({ //0 units
                    name: 'custscript_sftp_config_record'
                });
                log.debug('execute > Script Params', 'savedSearchId : ' + savedSearchId + ' :: sftpConfigId : ' + sftpConfigId);
                if (!savedSearchId && !sftpConfigId) {
                    log.audit('Script Terminated', 'Required script params missing in the deployment record.');
                    return false;
                }
                var recObj = search.lookupFields({
                    type: 'customrecord_sftp_configuration',
                    id: sftpConfigId,
                    columns: [
                        'custrecord_sftp_operation',
                        'custrecord_sftp_active_sb_testing',
                        'custrecord_sftp_host_key',
                        'custrecord_sftp_password_guid',
                        'custrecord_sftp_username',
                        'custrecord_sftp_url',
                        'custrecord_sftp_port',
                        'custrecord_sftp_remote_root_directory',
                        'custrecord_sftp_remote_target_directory',
                        'custrecord_sftp_last_uploaded_file_date',
                        'custrecord_sftp_ns_ul_archive_dir_id',
                    ]
                })
                var savedSearchObj = search.load({ //5 units
                    id: savedSearchId
                });
                /* savedSearchObj.filters.push(search.createFilter({
                    name: 'lastmodifieddate',
                    operator: search.Operator.ONORBEFORE,
                    values: "15/12/2022 12:30 am"
                })); */
                var onOrAfterFilterDate, onOrBeforeDate;
                var date = format.format({ //0 units
                    value: new Date(),
                    type: format.Type.DATETIME,
                    timezone: format.Timezone.AUSTRALIA_SYDNEY
                }).split(':');
                onOrBeforeDate = date[0] + ':' + date[1] + ' ' + date[2].split(' ')[1]
                savedSearchObj.filters.push(search.createFilter({ //0 units
                    name: 'lastmodifieddate',
                    operator: search.Operator.ONORBEFORE,
                    values: onOrBeforeDate
                }));
                if (recObj.custrecord_sftp_last_uploaded_file_date) {
                    onOrAfterFilterDate = recObj.custrecord_sftp_last_uploaded_file_date
                } else { //if there is no last uploaded file date field values in the config record will pass the filter past 12 hrs.
                    var dateAft = format.format({ //0 units
                        value: new Date(new Date().setHours(-12)),
                        type: format.Type.DATETIME,
                        timezone: format.Timezone.AUSTRALIA_SYDNEY
                    }).split(':');
                    onOrAfterFilterDate = dateAft[0] + ':' + dateAft[1] + ' ' + dateAft[2].split(' ')[1]
                }
                savedSearchObj.filters.push(search.createFilter({ //0 units
                    name: 'lastmodifieddate',
                    operator: search.Operator.ONORAFTER,
                    values: onOrAfterFilterDate
                }));
                log.debug('execute > Search Filters', 'On or After : ' + onOrAfterFilterDate + ' :: On or Before : ' + onOrBeforeDate);
                // Build Header
                var columns = savedSearchObj.columns;
                var header = '';
                for (var i = 0; i < columns.length; i++) {
                    header += columns[i].label + ',';
                    if (i == columns.length - 1) {
                        header = header.substring(0, header.length - 1) + '\n'; // End of headers. Remove comma and add line break
                    }
                }
                //log.audit('execute > header', header);
                // Build Body
                var body = '';
                var resultSet = savedSearchObj.run();
                var myPagedData = savedSearchObj.runPaged({ //0 units initially it is 5 units now it uses 0 units
                    pageSize: 1000
                });
                log.debug('execute > Search Results', 'Results Count : ' + myPagedData.count);
                if (myPagedData.count > 0) {
                    for (var i = 0; i <= myPagedData.pageRanges.length; i++) {
                        var pageRange = myPagedData.pageRanges[i];
                        if (pageRange) {
                            var currentPage = myPagedData.fetch({
                                index: pageRange.index
                            });
                            for (var j = 0; j < currentPage.data.length; j++) {
                                var result = currentPage.data[j];
                                //log.audit('execute > result', JSON.stringify(result));
                                for (var column in columns) {
                                    if (columns[column]) {
                                        if (columns[column].name == 'custcol_quote_job_role') {
                                            body += escapeCSV(result.getText(columns[column])) + ',';
                                        } else {
                                            body += escapeCSV(result.getValue(columns[column])) + ',';
                                        }
                                    }
                                    if (column == columns.length - 1) {
                                        body = body.substring(0, body.length - 1) + '\n'; // End of line. Remove comma and add line break
                                    }
                                }
                            }
                        }
                    }
                    /* savedSearchObj.run().each(function (result) {//10 units
                        for (var i = 0; i < columns.length; i++) {
                            body += escapeCSV(result.getValue(columns[i])) + ',';
                            //log.debug('columns[i])', columns[i])
                            //log.debug('escapeCSV(result.getValue(columns[i]))', escapeCSV(result.getValue(columns[i]))) 
                            if (i == columns.length - 1) {
                                body = body.substring(0, body.length - 1) + '\n'; // End of line. Remove comma and add line break
                            }
                        }
                        return true;
                    }); */
                    log.audit('execute > body', body);
                    // Combine header & body and create CSV file
                    var fileId = file.create({ //0 units
                        name: 'NETSUITE_QLI.csv',
                        fileType: file.Type.CSV,
                        contents: header + body,
                        folder: 4162548 // Open Air Leave - Outgoing
                    }).save();
                    log.audit('execute > fileId', fileId);
                    //no need to reschedule this script because the script governance will not exced 10000 units.
                    /* if (scriptObj.getRemainingUsage() < 1000) {
                        var scriptTask = task.create({
                            taskType: task.TaskType.SCHEDULED_SCRIPT,
                            scriptId: scriptObj.id,
                            deploymentId: scriptObj.deploymentId
                        }).submit();
                    } */
                    /* scriptTask.scriptId = 'customscript_sftp_transfer_ss';
                    scriptTask.deploymentId = 'customdeploy_quote_lt_extract_upload';
                    var scriptTaskId = scriptTask.submit();
                    var status = task.checkStatus(scriptTaskId);
                    log.audit('Out Quote', scriptTaskId);
                    if (status == task.TaskStatus.PENDING || status == task.TaskStatus.PROCESSING) {
                        return;
                    } */
                    var response = uploadFileToSFTP(recObj, fileId);
                    log.debug('execute > Upload Response', response);
                    if (response)
                        record.submitFields({
                            type: 'customrecord_sftp_configuration',
                            id: sftpConfigId,
                            values: {
                                'custrecord_sftp_last_uploaded_file_date': onOrBeforeDate
                            }
                        })
                    log.audit('execute > getRemainingUsage', scriptObj.getRemainingUsage());
                } else {
                    log.audit('Script Terminated', 'There are no results found in these intervel.');
                    return false;
                }
            } catch (e) {
                log.error('execute > Catch Error', e);
            } finally {
                log.audit('execute > > Schedule script', 'End');
            }
        }

        function escapeCSV(val) {
            if (!val) return '';
            if (!(/['",\s\n\r]/).test(val)) return val;
            val = val.replace(/['",\s\n\r]/g, ' ');
            return val;
        }

        function uploadFileToSFTP(recObj, fileId) {
            log.audit('File Upload > Params', 'recObj: ' + JSON.stringify(recObj) + ' :: fileId: ' + fileId);
            var operation = recObj.custrecord_sftp_operation[0].value;
            var sandboxTesting = recObj.custrecord_sftp_active_sb_testing;
            if (runtime.envType != runtime.EnvType.PRODUCTION && !sandboxTesting) {
                log.audit('Script Terminated', 'Environment missmatch.');
                return false; // Prevents transferring in sandbox unless Active for Sandbox Testing is ticked
            }
            if (operation == 1 && !fileId) {
                log.error('Script Terminated', 'No files to upload within nominated folder');
                return false;
            }
            var fileObj = file.load({ //10 units
                id: fileId
            });
            var connection = sftp.createConnection({ //0 units
                username: recObj.custrecord_sftp_username,
                passwordGuid: recObj.custrecord_sftp_password_guid,
                hostKey: recObj.custrecord_sftp_host_key,
                directory: recObj.custrecord_sftp_remote_root_directory,
                url: recObj.custrecord_sftp_url,
                port: Number(recObj.custrecord_sftp_port)
            });
            log.debug('File Upload > File Size Check', 'Created File Size:' + fileObj.size + ' :: Supported Sized: ' + connection.MAX_FILE_SIZE);
            if (fileObj.size > connection.MAX_FILE_SIZE) {
                log.error('Script Terminated', "The file you are trying to upload is too big");
                return false;
            }
            connection.upload({
                directory: recObj.custrecord_sftp_remote_target_directory,
                filename: fileObj.name,
                file: fileObj,
                replaceExisting: true
            });
            if (recObj.custrecord_sftp_ns_ul_archive_dir_id) {
                fileObj.folder = recObj.custrecord_sftp_ns_ul_archive_dir_id;
                log.debug('File Upload > Moved File Id', fileObj.save());
            }
            log.audit('File Upload > Upload File Success', fileObj.name);
            return true;
        }
        return {
            execute: execute,
            escapeCSV: escapeCSV,
        };
    });