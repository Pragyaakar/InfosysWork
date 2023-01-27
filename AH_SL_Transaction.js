/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */

define(['N/ui/serverWidget', 'N/redirect', 'N/record'], function (serverWidget, redirect, record) {
    function onRequest(context) {
        try {
            if (context.request.method == 'GET') {
                var form = serverWidget.createForm({
                    title: 'Criteria'
                });
                form.addFieldGroup({
                    id: 'custpage_detail',
                    label: 'Transaction Detail'
                });
                form.addFieldGroup({
                    id: 'custpage_new_req_link',
                    label: 'Classification'
                });
                form.addFieldGroup({
                    id: 'custpage_cseg',
                    label: 'Custom Segments'
                });
                form.addFieldGroup({
                    id: 'custpage_config',
                    label: 'Configuration Record Detail'
                });
                var field = form.addField({
                    id: 'custpage_tran_type',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Record Type',
                    source: 'customlist_tl', //record type id
                    container: 'custpage_detail'
                });
                field.isMandatory = true;
                var fman= form.addField({
                    id: 'custpage_forms',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Forms',
                    container: 'custpage_detail'
                });
                fman.isMandatory = true;
                form.addField({
                    id: 'custpage_department',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Department',
                    container: 'custpage_new_req_link'
                });
                form.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Subsidiary',
                    container: 'custpage_new_req_link'
                });
                form.addField({
                    id: 'custpage_location',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Location',
                    container: 'custpage_new_req_link'
                });
                form.addField({
                    id: 'custpage_class',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Class',
                    container: 'custpage_new_req_link'
                });
                form.addField({
                    id: 'custpage_country',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Country',
                    container: 'custpage_new_req_link'
                });
                form.addField({
                    id: 'custpage_attendance',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Attendance',
                    container: 'custpage_cseg'
                });
                form.addField({
                    id: 'custpage_comp',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'CompOff',
                    container: 'custpage_cseg'
                });
                form.addField({
                    id: 'custpage_leave',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Earned Leave',
                    container: 'custpage_cseg'
                });
                var sublist = form.addSublist({
                    id: 'custpage_sublist',
                    type: serverWidget.SublistType.INLINEEDITOR,
                    label: 'Configuration Record List'
                });
                var check = sublist.addField({
                    id: 'custpage_id',
                    label: 'Check',
                    type: serverWidget.FieldType.CHECKBOX
                });
                check.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.ENTRY
                });
                var configr_id = sublist.addField({
                    id: 'custpage_configrecid',
                    label: 'Config Id',
                    type: serverWidget.FieldType.TEXT,
                });
                configr_id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                var configr_name = sublist.addField({
                    id: 'custpage_configrecname',
                    label: 'Config Name',
                    type: serverWidget.FieldType.TEXT,
                });
                configr_name.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                var seg_id = sublist.addField({
                    id: 'custpage_values',
                    label: 'Classification & Segments',
                    type: serverWidget.FieldType.TEXT
                });
                seg_id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                var rectype_id = sublist.addField({
                    id: 'custpage_rec_type',
                    label: 'Record Type',
                    type: serverWidget.FieldType.TEXT
                });
                rectype_id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                var form_id = sublist.addField({
                    id: 'custpage_formvalue',
                    label: 'Form Used',
                    type: serverWidget.FieldType.TEXT
                });
                form_id.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                });
                form.addSubmitButton({
                    id:'submitbtn',
                    label: 'Submit',
                });
                form.addButton({
                    id :'update_config',
                    label: 'Update Configuration Record',
                });
                form.clientScriptModulePath = 'SuiteScripts/CS_AH_Trans.js';
                context.response.writePage(form);
            } else {
                var crid = '';
                var comb_value = '';
                var request = context.request;
                log.debug('requestJSON:', JSON.stringify(request));
                var subs_config = request.parameters.custpage_subsidiary;
                var dept_config = request.parameters.custpage_department;
                var loc_config = request.parameters.custpage_location;
                var cls_cofig = request.parameters.custpage_class;
                var country_config = request.parameters.custpage_country;
                var transtype = request.parameters.inpt_custpage_tran_type;
                var formused = request.parameters.inpt_custpage_forms;
                //custrecord_configform
                var att_config = request.parameters.custpage_attendance;
                var comp_config = request.parameters.custpage_comp;
                var leave_config = request.parameters.custpage_leave;
                log.debug("subsidiary", subs_config);
                log.debug('transtype', transtype);
                log.debug('Formused', formused);
                var lines = context.request.getLineCount({
                    group: "custpage_sublist"
                });
                log.debug("Sublist Lines ", lines);
                var cust_config_rec = '';
                for (var i = 0; i < lines; i++) {
                    var chekBox_value = context.request.getSublistValue({
                        group: 'custpage_sublist',
                        name: 'custpage_id',
                        line: i
                    });
                    if (chekBox_value == 'T') {
                        cust_config_rec = context.request.getSublistValue({
                            group: 'custpage_sublist',
                            name: 'custpage_configrecid',
                            line: i
                        });
                        log.debug("cust_config_rec ", cust_config_rec);

                        comb_value = context.request.getSublistValue({
                            group: 'custpage_sublist',
                            name: 'custpage_values',
                            line: i
                        });
                        log.debug("combination value", comb_value);
                        formused = context.request.getSublistValue({
                            group: 'custpage_sublist',
                            name: 'custpage_formvalue',
                            line: i
                        });
                        log.debug("combination valueformused", formused);
                        transtype = context.request.getSublistValue({
                            group: 'custpage_sublist',
                            name: 'custpage_rec_type',
                            line: i
                        });
                        log.debug("combination valuetranstype", transtype);
                        break;
                    }
                }
                // if (!cust_config_rec) {
                //     var configObj = record.create({
                //         type: 'customrecord_configrecord'
                //     });
                //     configObj.setText({
                //         fieldId: 'custrecord_transtypecr',
                //         text: transtype
                //     });
                //     configObj.setText({
                //         fieldId: 'custrecord_configform',
                //         text: formused
                //     });
                //     if (subs_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_subscr',
                //             value: true
                //         });
                //     if (dept_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_deptcr',
                //             value: true
                //         });
                //     if (loc_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_loccr',
                //             value: true
                //         });
                //     if (cls_cofig == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_classcr',
                //             value: true
                //         });
                //     if (country_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_countcr',
                //             value: true
                //         });
                //     if (att_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_custseg1cr',
                //             value: true
                //         });
                //     if (comp_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_compoff',
                //             value: true
                //         });
                //     if (leave_config == "T")
                //         configObj.setValue({
                //             fieldId: 'custrecord_elconfig',
                //             value: true
                //         });
                //     cust_config_rec = configObj.save({});
                //     log.debug("recid", cust_config_rec);
                // }
               // log.debug("split", comb_value.split(","));
               log.debug("recid", cust_config_rec);
                redirect.toSuitelet({
                    scriptId: 'customscript_ah_su_pref',
                    deploymentId: 'customdeploy_ah_su_pref_deploy',
                    parameters: {
                       
                        'custscript_recordid': cust_config_rec,
                        'custscript_subs': subs_config,
                        'custscript_dept': dept_config,
                        'custscript_loc': loc_config,
                        "custscript_class": cls_cofig,
                        "custscript_ct": country_config,
                        "custscript_att": att_config,
                        'custscript_comp': comp_config,
                        'custscript_leave': leave_config,
                        'custscript_combination': comb_value,
                        'custscript_recform': formused,

                        'custscript_rectype': transtype
                    }
                });
            }

        } catch (e) {
            log.debug('onRequest:error', e);
        }
    }
    return {
        onRequest: onRequest
    };
});