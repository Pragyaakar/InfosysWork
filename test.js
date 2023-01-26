/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/log', 'N/record', 'N/ui/dialog', "N/runtime", "N/url", "N/https", "N/search", "N/email"],
    function (currentRecord, log, record, dialog, runtime, url, https, search, email) {

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

        function onSubmitForApproval() {

            var rec = currentRecord.get();
            var custRec = record.load({
                type: rec.type,
                id: rec.id
            });
            var user = runtime.getCurrentUser();
            var author = user.id;
            var documentNumber = custRec.getValue({
                fieldId: 'tranid'
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
            //alert("newsubs "+ newsubs);
            // alert('pending approval'+rec.id);


            //    var customrecord_preSearchObj = search.create({
            //        type: "customrecord_pre",
            //        filters:
            //        [
            //           ["custrecord_presubs","anyof",newsubs], 
            //           "AND", 
            //           ["custrecord_predept","anyof",newdept], 
            //           "AND", 
            //           ["custrecord_precls","anyof",newcls], 
            //           "AND", 
            //           ["custrecord_preloc","anyof",newloc], 
            //           "AND", 
            //           ["custrecord_precnt","anyof", newposeg]

            //        ],
            //        columns:
            //        [
            //           search.createColumn({
            //              name: "name",
            //              sort: search.Sort.ASC,
            //              label: "ID"
            //           }),
            //           search.createColumn({name: "custrecord_preal", label: "Approval Level"}),
            //           search.createColumn({name: "custrecord_prefirst", label: "First Approver"}),
            //           search.createColumn({name: "custrecord_presecond", label: "Second Approver"}),
            //           search.createColumn({name: "custrecord_prethird", label: "Third Approver"}),
            //           search.createColumn({name: "custrecord_fourth", label: "Fourth Approver"}),
            //           search.createColumn({name: "custrecord_prefifth", label: "Fifth Approver"}),
            //           search.createColumn({name: "custrecord_sixth", label: "Sixth Approver"}),
            //           search.createColumn({name: "custrecord_ahseven", label: "Seventh Approver"}),
            //           search.createColumn({name: "custrecord_role", label: "Role"})
            //        ]
            //     });

            //     var searchResult = customrecord_preSearchObj.run().getRange({
            //        start: 0,
            //        end: 1
            //    });
            //   alert("searchResult.length"+searchResult.length);
            //    if (searchResult.length != 0) {

            //            var pf_id = searchResult[0].id;
            //        alert("pfffff_id"+ pf_id);
            //     //     var newnext = searchResult[0].getValue({
            //     //        name: "custrecord_prefirst",
            //     //        label: "First Approver"
            //     //    });

            //            // var newnext = search.lookupFields({

            //            //     type: search.Type.customrecord_pre,

            //            //     id: pf_id,

            //            //     columns: ['custrecord_prefirst']

            //            // });
            //           //  alert('newnext.custrecord_prefirst'+newnext);
            //         //    var purchId = record.submitFields({
            //         //        type:  rec.type,
            //         //        id: rec.id ,
            //         //        values: {
            //         //            'custbody_ah_approval_status': 6,
            //         //            'custbody23': pf_id,
            //         //            'custbody_ah_next_approver':newnext,
            //         //           'custbody_ah_temp':7

            //         //        }
            //         //    });
            //    }

            var customrecord_appruleSearchObj = search.create({
                type: "customrecord538",
                filters: [
                    ["custrecordcustrecord_presubs", "anyof", newsubs],
                    "AND",
                    ["custrecordcustrecord_predept", "anyof", newdept],
                    "AND",
                    ["custrecordcustrecord_precls", "anyof", newcls],
                    "AND",
                    ["custrecordcustrecord_preloc", "anyof", newloc],
                    "AND",
                    ["custrecord1466", "anyof", newposeg]
                ],
                columns: [
                    search.createColumn({
                        name: "custrecord1471",
                        label: "Preference Link"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_prefirst",
                        label: "First Approver"
                    })
                ]
            });
            //  var searchResult = customrecord_appruleSearchObj.runPaged().count;
            //     alert("customrecord_appruleSearchObj result count"+searchResult);
            //     customrecord_appruleSearchObj.run().each(function(result){
            // // .run().each has a limit of 4,000 results
            // return true;
            // });

            var searchResult = customrecord_appruleSearchObj.run().getRange({
                start: 0,
                end: 10
            });
            //  alert("searchResult.length"+searchResult.length);
            if (searchResult.length != 0) {

                // var info = searchResult[0].id;
                // alert("pfffff_id"+ pf_id);
                var newnext = searchResult[0].getValue({
                    name: "custrecordcustrecord_prefirst",
                    label: "First Approver"
                });
                var info = searchResult[0].getValue({
                    name: "custrecord1471",
                    label: "info field"
                });
                // alert("info"+ info);

                // alert("newnext"+ newnext);

                var purchId = record.submitFields({
                    type: rec.type,
                    id: rec.id,
                    values: {
                        'custbody_ah_approval_status': 6,
                        'custbody23': info,
                        'custbody_ah_next_approver': newnext,
                        'custbody_ah_temp': 7

                    }
                });
                // alert("purchId "+ purchId);
                sendEmailPending(newnext, documentNumber, author);


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
            var firstapp = custRec.getValue('custbody_ah_next_approver');
            var firstappt = custRec.getText('custbody_ah_next_approver');
            // alert('firstappt'+firstappt);
            var user = runtime.getCurrentUser();
            var author = user.id;
            log.debug('author ', author);
            var documentNumber = custRec.getValue({
                fieldId: 'tranid'
            });

            var custEmail = custRec.getValue('custbody_ah_cl_created_by');
            //alert('custEmail'+custEmail);
            var ll_lastap = custRec.getValue('custbody_ah_last_approved_by');
            //alert('ll_lastap'+ll_lastap);
            var arrap = [];

            if (isNotEmpty(firstapp)) {
                // nwar.push(firstapp);
                // alert('nwar'+nwar);
                var temp = custRec.setValue({
                    fieldId: 'custbody_ah_approval_status',
                    value: 6
                });

                //   var appby = custRec.setValue({
                //     fieldId: 'custbody_ah_approved_by',
                //     value: nwar
                // });
                var lastapp = custRec.setValue({
                    fieldId: 'custbody_ah_last_approved_by',
                    value: firstapp
                });

            }


            var last_approver = custRec.getValue({
                fieldId: 'custbody_ah_last_approved_by'
            });
            //alert(' last_approver '+last_approver);
            var apby_approvern = custRec.getValue({
                fieldId: 'custbody_ah_approved_by'
            });

            var next_approver = custRec.getValue({
                fieldId: 'custbody_ah_next_approver'
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
            var customrecord_appruleSearchObj = search.create({
                type: "customrecord538",
                filters: [
                    ["custrecordcustrecord_presubs", "anyof", newsubs],
                    "AND",
                    ["custrecordcustrecord_predept", "anyof", newdept],
                    "AND",
                    ["custrecordcustrecord_precls", "anyof", newcls],
                    "AND",
                    ["custrecordcustrecord_preloc", "anyof", newloc],
                    "AND",
                    ["custrecord1466", "anyof", newposeg]
                ],
                columns: [
                    search.createColumn({
                        name: "custrecord1471",
                        label: "Preference Link"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_prefirst",
                        label: "First Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_presecond",
                        label: "Second Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_prethird",
                        label: "Third Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_fourth",
                        label: "Fourth Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_prefifth",
                        label: "Fifth Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_sixth",
                        label: "Sixth Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_ahseven",
                        label: "Seventh Approver"
                    }),
                    search.createColumn({
                        name: "custrecordcustrecord_preal",
                        label: "Approval Level"
                    })

                ]
            });

            var searchResult = customrecord_appruleSearchObj.run().getRange({
                start: 0,
                end: 10
            });
            // alert("searchResult.length"+searchResult.length);
            var nwar = [];
            if (searchResult.length != 0) {

                var pf_id = searchResult[0].id;
                // alert("pfffff_id"+ pf_id);
                var firstapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_prefirst",
                    label: "First Approver"
                });

                if (isNotEmpty(firstapps)) {
                    // alert('firstapp'+firstapps);

                }
                var secondapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_presecond",
                    label: "Second Approver"
                });
                if (isNotEmpty(secondapps)) {
                    // alert('secondapp'+secondapps);

                }

                var thirdapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_prethird",
                    label: "Third Approver"
                });
                if (isNotEmpty(thirdapps)) {
                    // alert('thirdapp'+thirdapps);

                }
                var fourthapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_fourth",
                    label: "Fourth Approver"
                });
                if (isNotEmpty(fourthapps)) {
                    //alert('fourthapp'+fourthapps);
                }
                var fifthapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_prefifth",
                    label: "Fifth Approver"
                });
                if (isNotEmpty(fifthapps)) {
                    //alert('fifthapp'+fifthapps);
                }
                var sixthapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_sixth",
                    label: "Sixth Approver"
                });
                if (isNotEmpty(sixthapps)) {
                    //alert('sixthapps'+sixthapps);

                }
                var seventhapps = searchResult[0].getValue({
                    name: "custrecordcustrecord_ahseven",
                    label: "Seventh Approver"
                });
                if (isNotEmpty(seventhapps)) {
                    // alert('seventhapps'+seventhapps);

                }
                var applevel = searchResult[0].getValue({
                    name: "custrecordcustrecord_preal",
                    label: "Approval Level"
                });
                // alert('applevel'+applevel);//level 4
                var applev_char = applevel.charAt(applevel.length - 1);
                var applev_int = parseInt(applev_char);

            }
            var apby_approver;
            // alert('ll_lastap before if'+ll_lastap);
            if ((last_approver == firstapps) && (ll_lastap == '')) //&&(ll_lastap =='')
            {

                arrap.push(firstapps);
                var apby_approver = custRec.setValue({
                    fieldId: 'custbody_ah_approved_by',
                    value: arrap
                });
                // alert('apby_approver'+apby_approver);
                var length = arrap.length;
                // alert('length'+length);
                // alert('author'+author);
                // alert('custEmail'+custEmail);
                // alert('last_approver'+last_approver);
                // alert('documentNumber'+documentNumber);
                sendEmailApproved(last_approver, documentNumber, author, custEmail);

            } else if ((last_approver == secondapps) && (ll_lastap == firstapps)) //&&(ll_lastap == firstapps )
            {

                arrap.push(firstapps);
                arrap.push(secondapps);
                var apby_approver = custRec.setValue({
                    fieldId: 'custbody_ah_approved_by',
                    value: arrap
                });
                var length = arrap.length;
                // alert('length'+length);
                sendEmailApproved(last_approver, documentNumber, author, custEmail);


            } else if ((last_approver == thirdapps) && (ll_lastap == secondapps)) //&&(ll_lastap == secondapps )
            {

                arrap.push(firstapps);
                arrap.push(secondapps);
                arrap.push(thirdapps);
                var apby_approver = custRec.setValue({
                    fieldId: 'custbody_ah_approved_by',
                    value: arrap
                });
                var length = arrap.length;
                // alert('length'+length);
                sendEmailApproved(last_approver, documentNumber, author, custEmail);

            } else if ((last_approver == fourthapps) && (ll_lastap == thirdapps)) {

                arrap.push(firstapps);
                arrap.push(secondapps);
                arrap.push(thirdapps);
                arrap.push(fourthapps);
                var apby_approver = custRec.setValue({
                    fieldId: 'custbody_ah_approved_by',
                    value: arrap
                });
                var length = arrap.length;
                sendEmailApproved(last_approver, documentNumber, author, custEmail);

            } else if ((last_approver == fifthapps) && (ll_lastap == fourthapps)) {

                arrap.push(firstapps);
                arrap.push(secondapps);
                arrap.push(thirdapps);
                arrap.push(fourthapps);
                arrap.push(fifthapps);
                var apby_approver = custRec.setValue({
                    fieldId: 'custbody_ah_approved_by',
                    value: arrap
                });
                var length = arrap.length;
                sendEmailApproved(last_approver, documentNumber, author, custEmail);

            }


            if (((last_approver == firstapps) && (applev_int > 1) && ((arrap[0] == firstapps) && (length < 2)))) {


                // sendEmailApproved(author,custEmail,last_approver,documentNumber);
                //alert('first is approved'+last_approver);
                custRec.setValue({
                    fieldId: 'custbody_ah_next_approver',
                    value: secondapps
                });
                var nexts_app = custRec.getValue('custbody_ah_next_approver');
                //alert('nexts_app'+nexts_app);
                //alert('documentNumber'+documentNumber);
                //alert('author'+author);

                sendEmailPending(nexts_app, documentNumber, author);

            } else if ((last_approver == secondapps) && (applev_int > 2) && ((arrap[0] == firstapps) && (arrap[1] == secondapps) && (length < 3))) //approved_by == first && approved by==second
            {
                // alert('2 is approved'+last_approver);
                custRec.setValue({
                    fieldId: 'custbody_ah_next_approver',
                    value: thirdapps
                });
                var nexts_app = custRec.getValue('custbody_ah_next_approver');
                sendEmailPending(nexts_app, documentNumber, author);
            } else if ((last_approver == thirdapps) && (applev_int > 3) && ((arrap[0] == firstapps) && (arrap[1] == secondapps) && (arrap[2] == thirdapps) && (length < 4))) {

                // alert('3 is approved'+last_approver);
                custRec.setValue({
                    fieldId: 'custbody_ah_next_approver',
                    value: fourthapps
                });
                var nexts_app = custRec.getValue('custbody_ah_next_approver');
                sendEmailPending(nexts_app, documentNumber, author);
            } else if ((last_approver == fourthapps) && (applev_int > 4) && ((arrap[0] == firstapps) && (arrap[1] == secondapps) && (arrap[2] == thirdapps) && (arrap[3] == fourthapps) && (length < 5))) {

                custRec.setValue({
                    fieldId: 'custbody_ah_next_approver',
                    value: fifthapps
                });
                var nexts_app = custRec.getValue('custbody_ah_next_approver');
                sendEmailPending(nexts_app, documentNumber, author);
            } else {

                custRec.setValue({
                    fieldId: 'custbody_ah_next_approver',
                    value: null
                });
                custRec.setValue({
                    fieldId: 'custbody_ah_approval_status',
                    value: 4
                });

            }

            custRec.save();


            //  var purchId = record.submitFields({
            //      type: rec.type,
            //      id: rec.id,
            //      values: {

            //          'custbody_ah_approved_by': firstapp,
            //          'custbody_ah_approval_status': 4,
            //          'custbody_ah_last_approved_by': firstapp,
            //          'custbody_ah_next_approver': null,
            //      }
            //  });
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
            //alert('firstapp'+firstapp );
            var location = custRec.getValue('location');
            var user = runtime.getCurrentUser();
            var last_approver = user.id;
            // alert('last_approver '+last_approver);
            var documentNumber = custRec.getValue({
                fieldId: 'tranid'
            });
            // alert('documentNumber'+documentNumber);

            var custEmail = custRec.getValue('custbody_ah_cl_created_by');
            // alert('custEmail'+custEmail);

            var suiteletURL = url.resolveScript({
                scriptId: "customscript_ahsurejectreason",

                deploymentId: "customdeploy_rejectreason",
                returnExternalUrl: false,


            });
            // alert('1'+suiteletURL);
            //  var ssuiteletURL = "https://tstdrv2648267.app.netsuite.com" + "" + suiteletURL;
            suiteletURL += '&recordId=' + rec.id + '&recordType=' + rec.type + '&firstapp=' + firstapp + '&documentNumber=' + documentNumber + '&custEmail=' + custEmail;
            nlExtOpenWindow(suiteletURL, 'Reject Reason', 400, 300);





            var reject = custRec.setValue({
                fieldId: 'custbody_ah_approval_status',
                value: 5
            }); // reject status
            var reason = custRec.getText('custbody_rejreason');
            //  alert('reason'+reason);
            //  sendEmailreject(last_approver,documentNumber,custEmail,reason)

            custRec.save();
            //window.onbeforeunload = null;
            var newreject = custRec.getValue('custbody_rejreason');
            //alert(newreject);
            //    if(newreject){
            //  parent.location.reload();
            //    }
            // closePopup();
        }

        function sendEmailApproved(last_approver1, documentNumber1, author1, custEmail1) {
            // alert('entered into email approve');
            var html = '<html>';

            if (last_approver1 != null && last_approver1 != '' && last_approver1 != undefined) {

                html += '<head><style>table {border-collapse: collapse;border: 1px solid black;} th, td {border: 1px solid black;padding: 8px;}</style></head>';
            }
            html += '<body>Hi ' + last_approver1 + ',<br/><br/>approved the PO - ' + documentNumber1 + ' <br/><br/>';

            html += '<br/><br/>Thanks.</body></html>';
            email.send({
                author: author1,
                recipients: [custEmail1],
                cc: [custEmail1],
                subject: 'PO - ' + documentNumber1 + ' is approved.',
                body: html,

            });


        }

        function sendEmailPending(nexts_app1, documentNumber1, author1) {
            var html = '<html>';
            if (nexts_app1 != null && nexts_app1 != '' && nexts_app1 != undefined) {
                html += '<head><style>table {border-collapse: collapse;border: 1px solid black;} th, td {border: 1px solid black;padding: 8px;}</style></head>';
            }
            html += '<body>Hi ' + nexts_app1 + ',<br/><br/>PO - ' + documentNumber1 + ' is Pending for Approval.<br/><br/>';
            html += '<br/><br/>Thanks.</body></html>';
            email.send({
                author: author1,
                recipients: nexts_app1,
                subject: 'PO - ' + documentNumber1 + ' is  pending approval.',
                body: html,

            });

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
            onSubmitForApproval: onSubmitForApproval,
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