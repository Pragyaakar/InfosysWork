/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/runtime', 'N/record', 'N/search', 'N/ui/message', 'N/ui/dialog'], function (serverWidget, runtime, record, search, message, dialog) {
  try {
    function onRequest(context) {
      //var subsvalue = context.request.parameters.custscript_subs;
      if (context.request.method === 'GET') {

        var configrecid = context.request.parameters.custscript_recordid;
        var deptvalue = context.request.parameters.custscript_dept;
        var subsvalue = context.request.parameters.custscript_subs;
        var locationvalue = context.request.parameters.custscript_loc;
        var classValue = context.request.parameters.custscript_class;
        var ctvalue = context.request.parameters.custscript_ct;
        var attvalue = context.request.parameters.custscript_att;
        var recform = context.request.parameters.custscript_recform;
        var rectype = context.request.parameters.custscript_rectype;
        var compoffvalue = context.request.parameters.custscript_comp;
        var earn_value = context.request.parameters.custscript_leave;
        var combvalue = context.request.parameters.custscript_combination;
        log.debug("combval", combvalue);
        log.debug("combval", combvalue);
        var new_comb_val = [];
        new_comb_val = combvalue.split(",");
        log.debug("configrecid", configrecid);
        log.debug("length", new_comb_val.length);

        if (new_comb_val.length != 0) {
          log.debug("length", new_comb_val.length);
          for (var ncomb = 0; ncomb < new_comb_val.length; ncomb++) {
            if (new_comb_val[ncomb] == "Department") {
              deptvalue = "T"
            } else if (new_comb_val[ncomb] == "Subsidiary") {
              subsvalue = "T"
            } else if (new_comb_val[ncomb] == "Location") {
              locationvalue = "T"
            } else if (new_comb_val[ncomb] == "Class") {
              classValue = "T"
            } else if (new_comb_val[ncomb] == "Country") {
              ctvalue = "T"
            } else if (new_comb_val[ncomb] == "Attendance") {
              attvalue = "T"
            } else if (new_comb_val[ncomb] == "CompOff") {
              compoffvalue = "T"
            } else if (new_comb_val[ncomb] == "EarnedLeave") {
              earn_value = "T"
            }

          }
        }
        // var compoffvalue=context.request.parameters.custscript_comp;
        //var leavevalue=context.request.parameters.custscript_leave;

        var form = serverWidget.createForm({
          title: 'Preference'
        });
        form.addFieldGroup({
          id: 'custpage_new_grp',
          label: 'Classification & Segments'
        });
        form.addFieldGroup({
          id: 'custpage_new_approver_grp',
          label: 'Approver Details'
        });

        var rec_link = form.addField({
          id: 'custpage_configrecid',
          type: serverWidget.FieldType.SELECT,
          label: 'Configuration Record Link',
          source: 'customrecord_configrecord', //record type id
          container: 'custpage_new_grp'
        });
        rec_link.defaultValue = configrecid;
        rec_link.updateDisplayType({
          displayType: serverWidget.FieldDisplayType.DISABLED
        });

        log.debug("configurationid", configrecid);


        var rec_f = form.addField({
          id: 'custpage_recform',
          type: serverWidget.FieldType.TEXT,
          label: 'Configuration Record Form',
          // source: 'customrecord_configrecord', //record type id
          container: 'custpage_new_grp'
        });
        rec_f.defaultValue = recform;
        rec_f.updateDisplayType({
          displayType: serverWidget.FieldDisplayType.DISABLED
        });
        var rec_t = form.addField({
          id: 'custpage_typerecord',
          type: serverWidget.FieldType.TEXT,
          label: 'Configuration Record Type',
          // source: 'customlist_tl', //record type id
          container: 'custpage_new_grp'
        });
        rec_t.defaultValue = rectype;
        log.debug('record type value latest', rectype);
        rec_t.updateDisplayType({
          displayType: serverWidget.FieldDisplayType.DISABLED
        });
        var pref_link = form.addField({
          id: 'custpage_preflink',
          type: serverWidget.FieldType.SELECT,
          label: 'Preference Record',
          source: 'customrecord_pre', //record type id
          container: 'custpage_new_grp'
        });
        //pref_link.defaultValue = pre_id;
        //log.debug("pref_link",pref_link);
        pref_link.updateDisplayType({
          displayType: serverWidget.FieldDisplayType.DISABLED
        });

        // rec_link.getField('custpage_configrecid').isDisabled = true;
        //rec_link.isDisabled = true;
        if (subsvalue == "T") {
          var subs = form.addField({
            id: 'custpage_subsidiary',
            type: serverWidget.FieldType.SELECT,
            label: 'Subsidiary',
            source: 'subsidiary', //record type id
            container: 'custpage_new_grp'
          });
          subs.isMandatory = true;
        }


        if (deptvalue == "T") {
          var dept = form.addField({
            id: 'custpage_department',
            type: serverWidget.FieldType.SELECT,
            label: 'Department',
            source: 'department', //record type id
            container: 'custpage_new_grp'
          });
          dept.isMandatory = true;
        }
        if (locationvalue == "T") {
          var loc = form.addField({
            id: 'custpage_location',
            type: serverWidget.FieldType.SELECT,
            label: 'Location',
            source: 'location', //record type id
            container: 'custpage_new_grp'
          });
          loc.isMandatory = true;
        }
        if (classValue == "T") {
          var cls = form.addField({
            id: 'custpage_class',
            type: serverWidget.FieldType.SELECT,
            label: 'Class',
            source: 'classification', //record type id
            container: 'custpage_new_grp'
          });
          cls.isMandatory = true;
        }
        if (ctvalue == "T") {
          var ct = form.addField({
            id: 'custpage_country',
            type: serverWidget.FieldType.SELECT,
            label: 'Country',
            source: 'customlist_atsuitelet', //record type id
            container: 'custpage_new_grp'
          });
          ct.isMandatory = true;
        }
        if (attvalue == "T") {
          var at = form.addField({
            id: 'custpage_attendance',
            type: serverWidget.FieldType.SELECT,
            label: 'Attendance',
            source: 'customrecord_cseg_attendance', //record type id
            container: 'custpage_new_grp'
          });
          at.isMandatory = true;
        }
        log.debug("compoffvalue ", compoffvalue);
        if (compoffvalue == "T") {
          var coff = form.addField({
            id: 'custpage_comp',
            type: serverWidget.FieldType.SELECT,
            label: 'CompOff',
            source: 'customrecord_cseg_compoff', //record type id
            container: 'custpage_new_grp'
          });
          coff.isMandatory = true;
        }
        if (earn_value == "T") {
          var earnl = form.addField({
            id: 'custpage_leave',
            type: serverWidget.FieldType.SELECT,
            label: 'Earned Leave',
            source: 'customrecord_cseg_earnedleave', //record type id
            container: 'custpage_new_grp'
          });
          earnl.isMandatory = true;
        }
        var slevel = form.addField({
          id: 'custpage_slevel',
          type: serverWidget.FieldType.CHECKBOX,
          label: 'Single Level Approval',
          container: 'custpage_new_approver_grp'
        });
        //slevel.defaultValue = true;
        var mlevel = form.addField({
          id: 'custpage_mlevel',
          type: serverWidget.FieldType.CHECKBOX,
          label: 'Multiple Level Approval',
          container: 'custpage_new_approver_grp'
        });
        mlevel.defaultValue = 'T'; 
        var alevel = form.addField({
          id: 'custpage_approver',
          type: serverWidget.FieldType.SELECT,
          label: 'Approval Level',
          source: 'customlist_al', //record type id
          container: 'custpage_new_approver_grp'
        });
        // alevel.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });

        var first_app = form.addField({
          id: 'custpage_first',
          type: serverWidget.FieldType.SELECT,
          label: 'Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // first_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        var second_app = form.addField({
          id: 'custpage_second',
          type: serverWidget.FieldType.SELECT,
          label: 'Second Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // second_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        var third_app = form.addField({
          id: 'custpage_third',
          type: serverWidget.FieldType.SELECT,
          label: 'Third Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // third_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        var fourth_app = form.addField({
          id: 'custpage_fourth',
          type: serverWidget.FieldType.SELECT,
          label: 'Fourth Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // fourth_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        var fifth_app = form.addField({
          id: 'custpage_fifth',
          type: serverWidget.FieldType.SELECT,
          label: 'Fifth Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // fifth_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });

        var sixth_app = form.addField({
          id: 'custpage_sixth',
          type: serverWidget.FieldType.SELECT,
          label: 'Sixth Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // sixth_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        var seventh_app = form.addField({
          id: 'custpage_seventh',
          type: serverWidget.FieldType.SELECT,
          label: 'Seventh Approver',
          source: 'employee', //record type id
          container: 'custpage_new_approver_grp'
        });
        // seventh_app.updateDisplayType({
        //   displayType: serverWidget.FieldDisplayType.HIDDEN
        // });
        log.debug("configrecid", configrecid);
        if (configrecid) // added if condition to check the val
        {
          var customrecord_preSearchObj = search.create({
            type: "customrecord_pre",
            filters: [
              ["custrecord_configlink", "is", configrecid]
            ],
            columns: [
              search.createColumn({
                name: "name",
                sort: search.Sort.ASC,
                label: "ID"
              }),
              // search.createColumn({name: "custrecord_configlink", label: "Configuration Link"})
              search.createColumn({
                name: "custrecord_presubs",
                label: "Subsidiary"
              }),
              search.createColumn({
                name: "custrecord_predept",
                label: "Department"
              }),
              search.createColumn({
                name: "custrecord_precls",
                label: "Class"
              }),
              search.createColumn({
                name: "custrecord_preloc",
                label: "Location"
              }),
              search.createColumn({
                name: "custrecord_precnt",
                label: "Country"
              }),
              search.createColumn({
                name: "custrecord_preal",
                label: "Approval Level"
              }),
              search.createColumn({
                name: "custrecord_precs1",
                label: "Attendance"
              }),
              search.createColumn({
                name: "custrecord_prefcomp",
                label: "Comp Off"
              }),
              search.createColumn({
                name: "custrecord_prefel",
                label: "Earned Leave"
              }),
              search.createColumn({
                name: "custrecord_prefirst",
                label: "First Approver"
              }),
              search.createColumn({
                name: "custrecord_presecond",
                label: "Second Approver"
              }),
              search.createColumn({
                name: "custrecord_prethird",
                label: "Third Approver"
              }),
              search.createColumn({
                name: "custrecord_fourth",
                label: "Fourth Approver"
              }),
              search.createColumn({
                name: "custrecord_prefifth",
                label: "Fifth Approver"
              }),
              search.createColumn({
                name: "custrecord_sixth",
                label: "Sixth Approver"
              }),
              search.createColumn({
                name: "custrecord_ahseven",
                label: "Seventh Approver"
              })
            ]
          });

          var searchResult = customrecord_preSearchObj.run().getRange({
            start: 0,
            end: 1
          });
          if (searchResult.length != 0) {
            for (var pri in searchResult) {
              var pre_id = searchResult[pri].id;
              log.debug("pre_id ", pre_id);
              //pref_link.defaultValue = pre_id;
              var preName = searchResult[pri].getValue({
                name: "name",
                sort: search.Sort.ASC,
                label: "ID"
              });
              log.debug("preName", preName);
              var subs_pre = searchResult[pri].getValue({
                name: "custrecord_presubs",
                label: "Subsidiary"
              });
              log.debug("subs_pre", subs_pre);
              var dept_pre = searchResult[pri].getValue({
                name: "custrecord_predept",
                label: "Department"
              });
              var cls_pre = searchResult[pri].getValue({
                name: "custrecord_precls",
                label: "Class"
              });
              var ct_pre = searchResult[pri].getValue({
                name: "custrecord_precnt",
                label: "Country"
              });
              var loc_pre = searchResult[pri].getValue({
                name: "custrecord_preloc",
                label: "Location"
              });
              var el_pre = searchResult[pri].getValue({
                name: "custrecord_prefel",
                label: "Earned Leave"
              });
              var att_pre = searchResult[pri].getValue({
                name: "custrecord_precs1",
                label: "Attendance"
              });
              var compoff_pre = searchResult[pri].getValue({
                name: "custrecord_prefcomp",
                label: "Comp Off"
              });
              var alevelpre = searchResult[pri].getValue({
                name: "custrecord_preal",
                label: "Approval Level"
              });
              var fst_app = searchResult[pri].getValue({
                name: "custrecord_prefirst",
                label: "First Approver"
              });
              var s_app = searchResult[pri].getValue({
                name: "custrecord_presecond",
                label: "Second Approver"
              });
              var t_app = searchResult[pri].getValue({
                name: "custrecord_prethird",
                label: "Third Approver"
              });
              var for_app = searchResult[pri].getValue({
                name: "custrecord_fourth",
                label: "Fourth Approver"
              });
              var fi_app = searchResult[pri].getValue({
                name: "custrecord_prefifth",
                label: "Fifth Approver"
              });
              var si_app = searchResult[pri].getValue({
                name: "custrecord_sixth",
                label: "Sixth Approver"
              });
              var sev_app = searchResult[pri].getValue({
                name: "custrecord_ahseven",
                label: "Seventh Approver"
              });
              if (pre_id) {
                pref_link.defaultValue = pre_id;
              }

              if (cls_pre) {
                cls.defaultValue = cls_pre;
              }
              if (dept_pre) {
                dept.defaultValue = dept_pre;
              }
              if (loc_pre) {
                loc.defaultValue = loc_pre;

              }
              if (ct_pre) {
                ct.defaultValue = ct_pre;
              }
              if (compoff_pre) {
                coff.defaultValue = compoff_pre;

              }
              if (el_pre) {
                earnl.defaultValue = el_pre;
              }
              if (subs_pre) {
                subs.defaultValue = subs_pre;
              }
              if (att_pre) {
                at.defaultValue = att_pre;
              }
              if (alevelpre) {
                log.debug('alevelpre inside if 455 to test value ', alevelpre);
                alevel.defaultValue = alevelpre;
                if (alevelpre == 1) {

                  first_app.isMandatory = true;
                  second_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  third_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  fourth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  fifth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  sixth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 2) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  fourth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  fifth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  sixth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 3) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.isMandatory = true;

                  fourth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  fifth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  sixth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 4) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.isMandatory = true;

                  fourth_app.isMandatory = true;

                  fifth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  sixth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 5) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.isMandatory = true;
                  fourth_app.isMandatory = true;
                  fifth_app.isMandatory = true;
                  sixth_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 6) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.isMandatory = true;
                  fourth_app.isMandatory = true;
                  fifth_app.isMandatory = true;
                  sixth_app.isMandatory = true;
                  seventh_app.updateDisplayType({
                    displayType: serverWidget.FieldDisplayType.DISABLED
                  });
                } else if (alevelpre == 7) {
                  first_app.isMandatory = true;
                  second_app.isMandatory = true;
                  third_app.isMandatory = true;
                  fourth_app.isMandatory = true;
                  fifth_app.isMandatory = true;
                  sixth_app.isMandatory = true;
                  seventh_app.isMandatory = true;
                }
              }
              if (fst_app) {
                first_app.defaultValue = fst_app;
              }
              if (s_app) {
                second_app.defaultValue = s_app;
              }
              if (t_app) {
                third_app.defaultValue = t_app;
              }
              if (for_app) {
                fourth_app.defaultValue = for_app;
              }
              if (fi_app) {
                fifth_app.defaultValue = fi_app;
              }
              if (si_app) {
                sixth_app.defaultValue = si_app;
              }
              if (sev_app) {
                seventh_app.defaultValue = sev_app;
              }
            }
          }
        }
        form.addSubmitButton({
          label: 'Submit'
        });
        form.clientScriptModulePath = 'SuiteScripts/CS_AH_PREF.js';
        context.response.writePage(form);
      } else {

        var request = context.request;
        var subs_rec = request.parameters.custpage_subsidiary;
        var deptrec = request.parameters.custpage_department;
        var cls_rec = request.parameters.custpage_class;
        var ct_rec = request.parameters.custpage_country;
        var loc_rec = request.parameters.custpage_location;
        var att_rec = request.parameters.custpage_attendance;
        var el_rec = request.parameters.custpage_leave;
        var comp_rec = request.parameters.custpage_comp;
        var alevelrec = request.parameters.custpage_approver;
        var firstapprec = request.parameters.custpage_first;
        var secondapprec = request.parameters.custpage_second;
        var thirdapprec = request.parameters.custpage_third;
        var fourthapprec = request.parameters.custpage_fourth;
        var fifthapprec = request.parameters.custpage_fifth;
        var sixthapprec = request.parameters.custpage_sixth;
        var seventhapprec = request.parameters.custpage_seventh;
        var recidconfig = request.parameters.custpage_configrecid;
        var recformconfig = request.parameters.custpage_recform;
        var rectypeconfig = request.parameters.custpage_typerecord;
        var prefrec_link = request.parameters.custpage_preflink;
        var plag = 0;
        if (rectypeconfig) {
          plag = 1
        };
        if (recformconfig) {
          plag = 1
        };
        if (subs_rec) {
          plag = 1
        };
        if (deptrec) {
          plag = 1
        };
        if (loc_rec) {
          plag = 1
        };
        if (cls_rec) {
          plag = 1
        };
        if (ct_rec) {
          plag = 1
        };
        if (comp_rec) {
          plag = 1
        };
        if (att_rec) {
          plag = 1
        };
        if (el_rec) {
          plag = 1
        };
        log.debug('alevelrec', alevelrec);
        log.debug('firstapprec  ', firstapprec);
        log.debug('secondapprec', secondapprec);
        log.debug('thirdapprec', thirdapprec);
        log.debug('fourthapprec', fourthapprec);
        log.debug('fifthapprec', fifthapprec);
        log.debug('sixthapprec', sixthapprec);
        log.debug('seventhapprec', seventhapprec);
        log.debug("configrecid:", recidconfig);
        log.debug("rectypeconfig :", rectypeconfig);
        log.debug("recformconfig", recformconfig);
        log.debug("prefrec_link ", prefrec_link); // config record
        /*if(paramAPaccount){
          searchBills.filters.push(search.createFilter({ name: 'account', operator: 'anyof', values: paramAPaccount }));
        }*/
        if (!recidconfig && !prefrec_link) {
          var preSearchObj = search.create({
            type: "customrecord_pre",
            filters: [],
            columns: [
              search.createColumn({
                name: "custrecord_configlink",
                label: "Configuration Link"
              })
            ]
          });
          if (rectypeconfig) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_prett",
              operator: search.Operator.IS,
              values: rectypeconfig
            }));
          }
          if (recformconfig) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_preform",
              operator: search.Operator.IS,
              values: recformconfig
            }));
          }
          if (subs_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_presubs",
              operator: search.Operator.IS,
              values: subs_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_presubs",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (deptrec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_predept",
              operator: search.Operator.IS,
              values: deptrec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_predept",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (loc_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_preloc",
              operator: search.Operator.IS,
              values: loc_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_preloc",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (cls_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precls",
              operator: search.Operator.IS,
              values: cls_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precls",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (ct_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precnt",
              operator: search.Operator.IS,
              values: ct_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precnt",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (comp_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_prefcomp",
              operator: search.Operator.IS,
              values: comp_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_prefcomp",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (att_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precs1",
              operator: search.Operator.IS,
              values: att_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_precs1",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          if (el_rec && plag == 1) {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_prefel",
              operator: search.Operator.IS,
              values: el_rec
            }));
          } else {
            preSearchObj.filters.push(search.createFilter({
              name: "custrecord_prefel",
              operator: search.Operator.IS,
              values: "@NONE@"
            }));
          }
          var searchResultCount = preSearchObj.run().getRange({
            start: 0,
            end: 1
          });

          log.debug("searchResultCount fiiiiiiiinallll", searchResultCount.length);

          if (searchResultCount.length != 0) {
            for (var recid in searchResultCount) {
              var pref_id = searchResultCount[recid].id;
              log.debug("pre_id ", pref_id);
              //pref_link.defaultValue = pre_id;
              var config_id = searchResultCount[recid].getValue({
                name: "custrecord_configlink",
                label: "Configuration Link"
              });
              log.debug("config_id", config_id);
              var html = '<html><body><h3 style="font-size:12pt ">Criteria record present</h3></body></html>';
              context.response.write(html + config_id);
              var htmls = '<html><body><h3 style="font-size:12pt ">Preference record present</h3></body></html>';
              context.response.write(htmls + pref_id);
              //context.response.write('Criteria record present' + config_id);
              // context.response.write('Preference record present' + pref_id);


            }
          } else {
            if (!recidconfig) // config record creation
            {
              var configObj = record.create({
                type: 'customrecord_configrecord'
              });
              configObj.setText({
                fieldId: 'custrecord_transtypecr',
                text: rectypeconfig
              });
              configObj.setText({
                fieldId: 'custrecord_configform',
                text: recformconfig
              });
              log.debug('subs_rec', subs_rec);

              if (subs_rec)
                configObj.setValue({
                  fieldId: 'custrecord_subscr',
                  value: true
                });
              log.debug('deptrec', deptrec);
              if (deptrec)
                configObj.setValue({
                  fieldId: 'custrecord_deptcr',
                  value: true
                });
              log.debug('loc_rec', loc_rec);
              if (loc_rec)
                configObj.setValue({
                  fieldId: 'custrecord_loccr',
                  value: true
                });
              log.debug('cls_rec', cls_rec);
              if (cls_rec)
                configObj.setValue({
                  fieldId: 'custrecord_classcr',
                  value: true
                });
              log.debug('ct_rec', ct_rec);
              if (ct_rec)
                configObj.setValue({
                  fieldId: 'custrecord_countcr',
                  value: true
                });
              log.debug('att_rec', att_rec);
              if (att_rec)
                configObj.setValue({
                  fieldId: 'custrecord_custseg1cr',
                  value: true
                });
              log.debug('comp_rec', comp_rec);
              if (comp_rec)
                configObj.setValue({
                  fieldId: 'custrecord_compoff',
                  value: true
                });
              log.debug('el_rec', el_rec);
              if (el_rec)
                configObj.setValue({
                  fieldId: 'custrecord_elconfig',
                  value: true
                });
              recidconfig = configObj.save({});

              log.debug("recid", recidconfig);
              // context.response.write('Criteria Custom record Created' + recidconfig);
              var html = '<html><body><h3 style="font-size:12pt ">Criteria Custom record Created</h3></body></html>';
              context.response.write(html + recidconfig);
            } //end of config record

            if (prefrec_link) {
              var recObj = record.load({
                type: 'customrecord_pre',
                id: prefrec_link
              });
              log.debug("recObj" + recObj);
              // recObj.getField('custpage_configrecid').isDisabled = true;
              if (subs_rec)
                recObj.setValue({
                  fieldId: 'custrecord_presubs',
                  value: subs_rec
                });
              if (deptrec)
                recObj.setValue({
                  fieldId: 'custrecord_predept',
                  value: deptrec
                });
              if (cls_rec)
                recObj.setValue({
                  fieldId: 'custrecord_precls',
                  value: cls_rec
                });
              if (ct_rec)
                recObj.setValue({
                  fieldId: 'custrecord_precnt',
                  value: ct_rec
                });
              if (loc_rec)
                recObj.setValue({
                  fieldId: 'custrecord_preloc',
                  value: loc_rec
                });
              if (att_rec)
                recObj.setValue({
                  fieldId: 'custrecord_preal',
                  value: att_rec
                });
              if (el_rec)
                recObj.setValue({
                  fieldId: 'custrecord_preal',
                  value: el_rec
                });
              if (comp_rec)
                recObj.setValue({
                  fieldId: 'custrecord_preal',
                  value: comp_rec
                });
              log.debug('alevelrec', alevelrec);

              if (alevelrec)
                recObj.setValue({
                  fieldId: 'custrecord_preal',
                  value: alevelrec
                });
              log.debug('firstapprec ', firstapprec);

              //if (firstapprec)
              recObj.setValue({
                fieldId: 'custrecord_prefirst',
                value: firstapprec
              });
              log.debug('secondapprec', secondapprec);

              //if (secondapprec)
              recObj.setValue({
                fieldId: 'custrecord_presecond',
                value: secondapprec
              });
              log.debug('thirdapprec', thirdapprec);

              //if (thirdapprec)
              recObj.setValue({
                fieldId: 'custrecord_prethird',
                value: thirdapprec
              });
              log.debug('fourthapprec', fourthapprec);

              //if (fourthapprec)
              recObj.setValue({
                fieldId: 'custrecord_fourth',
                value: fourthapprec
              });
              log.debug('fifthapprec', fifthapprec);

              // if (fifthapprec)
              recObj.setValue({
                fieldId: 'custrecord_prefifth',
                value: fifthapprec
              });
              log.debug('sixthapprec', sixthapprec);

              // if (sixthapprec)
              recObj.setValue({
                fieldId: 'custrecord_sixth',
                value: sixthapprec
              });
              log.debug('seventhapprec', seventhapprec);
              //if (seventhapprec)
              recObj.setValue({
                fieldId: 'custrecord_ahseven',
                value: seventhapprec
              });
              var cust_rec = recObj.save({});

              var html = '<html><body><h3 style="font-size:12pt ">Preference Custom record Updated</h3></body></html>';
              context.response.write(html + cust_rec);
              //context.response.write('Preference Custom record Updated' + cust_rec);

            } else {
              var recObj = record.create({
                type: 'customrecord_pre'
              });
              recObj.setValue({
                fieldId: 'custrecord_configlink',
                value: recidconfig
              });
              recObj.setValue({
                fieldId: 'custrecord_prett',
                value: rectypeconfig
              });
              recObj.setValue({
                fieldId: 'custrecord_preform',
                value: recformconfig
              });
              // recObj.getField('custpage_configrecid').isDisabled = true;
              recObj.setValue({
                fieldId: 'custrecord_presubs',
                value: subs_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_preloc',
                value: loc_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_predept',
                value: deptrec
              });
              recObj.setValue({
                fieldId: 'custrecord_precls',
                value: cls_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_precnt',
                value: ct_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_precs1',
                value: att_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_prefel',
                value: el_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_prefcomp',
                value: comp_rec
              });
              recObj.setValue({
                fieldId: 'custrecord_preal',
                value: alevelrec
              });
              recObj.setValue({
                fieldId: 'custrecord_prefirst',
                value: firstapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_presecond',
                value: secondapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_prethird',
                value: thirdapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_fourth',
                value: fourthapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_prefifth',
                value: fifthapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_sixth',
                value: sixthapprec
              });
              recObj.setValue({
                fieldId: 'custrecord_ahseven',
                value: seventhapprec
              });
              var cust_rec = recObj.save({});

              //  context.response.write('Preference Custom record Created' + cust_rec);
              var html = '<html><body><h3 style="font-size:12pt ">Preference Custom record Created</h3></body></html>';
              context.response.write(html + cust_rec);
            }

          }
        } else {
          if (!recidconfig) // config record creation
          {
            var configObj = record.create({
              type: 'customrecord_configrecord'
            });
            configObj.setText({
              fieldId: 'custrecord_transtypecr',
              text: rectypeconfig
            });
            configObj.setText({
              fieldId: 'custrecord_configform',
              text: recformconfig
            });
            log.debug('subs_rec', subs_rec);

            if (subs_rec)
              configObj.setValue({
                fieldId: 'custrecord_subscr',
                value: true
              });
            log.debug('deptrec', deptrec);
            if (deptrec)
              configObj.setValue({
                fieldId: 'custrecord_deptcr',
                value: true
              });
            log.debug('loc_rec', loc_rec);
            if (loc_rec)
              configObj.setValue({
                fieldId: 'custrecord_loccr',
                value: true
              });
            log.debug('cls_rec', cls_rec);
            if (cls_rec)
              configObj.setValue({
                fieldId: 'custrecord_classcr',
                value: true
              });
            log.debug('ct_rec', ct_rec);
            if (ct_rec)
              configObj.setValue({
                fieldId: 'custrecord_countcr',
                value: true
              });
            log.debug('att_rec', att_rec);
            if (att_rec)
              configObj.setValue({
                fieldId: 'custrecord_custseg1cr',
                value: true
              });
            log.debug('comp_rec', comp_rec);
            if (comp_rec)
              configObj.setValue({
                fieldId: 'custrecord_compoff',
                value: true
              });
            log.debug('el_rec', el_rec);
            if (el_rec)
              configObj.setValue({
                fieldId: 'custrecord_elconfig',
                value: true
              });
            recidconfig = configObj.save({});

            log.debug("recid", recidconfig);
            //  context.response.write('Criteria Custom record Created' + recidconfig);
            var html = '<html><body><h3 style="font-size:12pt ">Criteria Custom record Created</h3></body></html>';
            context.response.write(html + recidconfig);
          } //end of config record

          if (prefrec_link) {
            var recObj = record.load({
              type: 'customrecord_pre',
              id: prefrec_link
            });
            log.debug("recObj" + recObj);
            // recObj.getField('custpage_configrecid').isDisabled = true;
            if (subs_rec)
              recObj.setValue({
                fieldId: 'custrecord_presubs',
                value: subs_rec
              });
            if (deptrec)
              recObj.setValue({
                fieldId: 'custrecord_predept',
                value: deptrec
              });
            if (cls_rec)
              recObj.setValue({
                fieldId: 'custrecord_precls',
                value: cls_rec
              });
            if (ct_rec)
              recObj.setValue({
                fieldId: 'custrecord_precnt',
                value: ct_rec
              });
            if (loc_rec)
              recObj.setValue({
                fieldId: 'custrecord_preloc',
                value: loc_rec
              });
            if (att_rec)
              recObj.setValue({
                fieldId: 'custrecord_preal',
                value: att_rec
              });
            if (el_rec)
              recObj.setValue({
                fieldId: 'custrecord_preal',
                value: el_rec
              });
            if (comp_rec)
              recObj.setValue({
                fieldId: 'custrecord_preal',
                value: comp_rec
              });
            log.debug('alevelrec inside set value', alevelrec);

            if (alevelrec)
              recObj.setValue({
                fieldId: 'custrecord_preal',
                value: alevelrec
              });
            log.debug('firstapprec inside set value ', firstapprec);

            //if (firstapprec)
            recObj.setValue({
              fieldId: 'custrecord_prefirst',
              value: firstapprec
            });
            log.debug('secondapprec inside set value', secondapprec);

            //if (secondapprec)
            recObj.setValue({
              fieldId: 'custrecord_presecond',
              value: secondapprec
            });
            log.debug('thirdapprec inside set value', thirdapprec);

            //if (thirdapprec)
            recObj.setValue({
              fieldId: 'custrecord_prethird',
              value: thirdapprec
            });
            log.debug('fourthapprec inside set value', typeof (fourthapprec));

            //if (fourthapprec)
            recObj.setValue({
              fieldId: 'custrecord_fourth',
              value: fourthapprec
            });
            log.debug('fifthapprec inside set value', fifthapprec);

            // if (fifthapprec)
            recObj.setValue({
              fieldId: 'custrecord_prefifth',
              value: fifthapprec
            });
            log.debug('sixthapprec inside set value', sixthapprec);

            // if (sixthapprec)
            recObj.setValue({
              fieldId: 'custrecord_sixth',
              value: sixthapprec
            });
            log.debug('seventhapprec inside set value', seventhapprec);
            // if (seventhapprec)
            recObj.setValue({
              fieldId: 'custrecord_ahseven',
              value: seventhapprec
            });
            var cust_rec = recObj.save();
            log.debug("cust_rec prefff record created", cust_rec);

            //context.response.write('Preference Custom record Updated' + cust_rec);
            var html = '<html><body><h3 style="font-size:12pt ">Preference Custom record Updated</h3></body></html>';
            context.response.write(html + cust_rec);
          } else {
            var recObj = record.create({
              type: 'customrecord_pre'
            });
            recObj.setValue({
              fieldId: 'custrecord_configlink',
              value: recidconfig
            });
            recObj.setValue({
              fieldId: 'custrecord_prett',
              value: rectypeconfig
            });
            recObj.setValue({
              fieldId: 'custrecord_preform',
              value: recformconfig
            });
            // recObj.getField('custpage_configrecid').isDisabled = true;
            recObj.setValue({
              fieldId: 'custrecord_presubs',
              value: subs_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_preloc',
              value: loc_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_predept',
              value: deptrec
            });
            recObj.setValue({
              fieldId: 'custrecord_precls',
              value: cls_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_precnt',
              value: ct_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_precs1',
              value: att_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_prefel',
              value: el_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_prefcomp',
              value: comp_rec
            });
            recObj.setValue({
              fieldId: 'custrecord_preal',
              value: alevelrec
            });
            recObj.setValue({
              fieldId: 'custrecord_prefirst',
              value: firstapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_presecond',
              value: secondapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_prethird',
              value: thirdapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_fourth',
              value: fourthapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_prefifth',
              value: fifthapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_sixth',
              value: sixthapprec
            });
            recObj.setValue({
              fieldId: 'custrecord_ahseven',
              value: seventhapprec
            });
            var cust_rec = recObj.save({});
            // context.response.write('Preference Custom record Created' + cust_rec);
            var html = '<html><body><h3 style="font-size:12pt ">Preference Custom record Created</h3></body></html>';
            context.response.write(html + cust_rec);
          }
        }

      }

    }
  } catch (e) {
    log.error('Unexpected Error', e);
    context.response.write('Unexpected Error. Please Contact your Administrator.');
  }
  return {
    onRequest: onRequest
  };
});