/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(['N/ui/serverWidget', 'N/runtime', 'N/record','N/search'], function (serverWidget, runtime, record,search) {
    try {
      function onRequest(context) {
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
          log.debug('compoffvalue'+compoffvalue);
             log.debug('earn_value'+ earn_value);
          var new_comb_val = [];
          new_comb_val = combvalue.split(",");
          log.debug("newcomb array", new_comb_val);
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
        
          log.debug("configurationid",configrecid);
  
         
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
          if (subsvalue == "T" )
            var subs = form.addField({
              id: 'custpage_subsidiary',
              type: serverWidget.FieldType.SELECT,
              label: 'Subsidiary',
              source: 'subsidiary', //record type id
              container: 'custpage_new_grp'
            });
  
            
  
          if (deptvalue == "T")
            var dept = form.addField({
              id: 'custpage_department',
              type: serverWidget.FieldType.SELECT,
              label: 'Department',
              source: 'department', //record type id
              container: 'custpage_new_grp'
            });
          if (locationvalue == "T")
            var loc = form.addField({
              id: 'custpage_location',
              type: serverWidget.FieldType.SELECT,
              label: 'Location',
              source: 'location', //record type id
              container: 'custpage_new_grp'
            });
          if (classValue == "T")
            var cls = form.addField({
              id: 'custpage_class',
              type: serverWidget.FieldType.SELECT,
              label: 'Class',
              source: 'classification', //record type id
              container: 'custpage_new_grp'
            });
          if (ctvalue == "T")
            var ct = form.addField({
              id: 'custpage_country',
              type: serverWidget.FieldType.SELECT,
              label: 'Country',
              source: 'customlist_atsuitelet', //record type id
              container: 'custpage_new_grp'
            });
          if (attvalue == "T")
            var at = form.addField({
              id: 'custpage_attendance',
              type: serverWidget.FieldType.SELECT,
              label: 'Attendance',
              source: 'customrecord_cseg_attendance', //record type id
              container: 'custpage_new_grp'
            });
           log.debug("compoffvalue ",compoffvalue );
          if (compoffvalue == "T")
            var coff = form.addField({
              id: 'custpage_comp',
              type: serverWidget.FieldType.SELECT,
              label: 'CompOff',
              source: 'customrecord_cseg_compoff', //record type id
              container: 'custpage_new_grp'
            });
                log.debug("earn_value ",earn_value );
          if (earn_value == "T")
            var earnl = form.addField({
              id: 'custpage_leave',
              type: serverWidget.FieldType.SELECT,
              label: 'Earned Leave',
              source: 'customrecord_cseg_earnedleave', //record type id
              container: 'custpage_new_grp'
            });
  
          var alevel = form.addField({
            id: 'custpage_approver',
            type: serverWidget.FieldType.SELECT,
            label: 'Approval Level',
            source: 'customlist_al', //record type id
            container: 'custpage_new_approver_grp'
          });
          var first_app = form.addField({
            id: 'custpage_first',
            type: serverWidget.FieldType.SELECT,
            label: 'First Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
          var second_app = form.addField({
            id: 'custpage_second',
            type: serverWidget.FieldType.SELECT,
            label: 'Second Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
          var third_app = form.addField({
            id: 'custpage_third',
            type: serverWidget.FieldType.SELECT,
            label: 'Third Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
          var fourth_app = form.addField({
            id: 'custpage_fourth',
            type: serverWidget.FieldType.SELECT,
            label: 'Fourth Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
          var fifth_app = form.addField({
            id: 'custpage_fifth',
            type: serverWidget.FieldType.SELECT,
            label: 'Fifth Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
  
          var sixth_app = form.addField({
            id: 'custpage_sixth',
            type: serverWidget.FieldType.SELECT,
            label: 'Sixth Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
  
          var seventh_app = form.addField({
            id: 'custpage_seventh',
            type: serverWidget.FieldType.SELECT,
            label: 'Seventh Approver',
            source: 'employee', //record type id
            container: 'custpage_new_approver_grp'
          });
          var customrecord_preSearchObj = search.create({
            type: "customrecord_pre",
            filters:
            [
               ["custrecord_configlink","is",configrecid]
            ],
            columns:
            [
               search.createColumn({
                  name: "name",
                  sort: search.Sort.ASC,
                  label: "ID"
               }),
              // search.createColumn({name: "custrecord_configlink", label: "Configuration Link"})
               search.createColumn({name: "custrecord_presubs", label: "Subsidiary"}),
               search.createColumn({name: "custrecord_predept", label: "Department"}),
               search.createColumn({name: "custrecord_precls", label: "Class"}),
               search.createColumn({name: "custrecord_preloc", label: "Location"}),
               search.createColumn({name: "custrecord_precnt", label: "Country"}),
               search.createColumn({name: "custrecord_preal", label: "Approval Level"}),
               search.createColumn({name: "custrecord_precs1", label: "Attendance"}),
               search.createColumn({name: "custrecord_prefcomp", label: "Comp Off"}),
               search.createColumn({name: "custrecord_prefel", label: "Earned Leave"}),
               search.createColumn({name: "custrecord_prefirst", label: "First Approver"}),
               search.createColumn({name: "custrecord_presecond", label: "Second Approver"}),
               search.createColumn({name: "custrecord_prethird", label: "Third Approver"}),
               search.createColumn({name: "custrecord_fourth", label: "Fourth Approver"}),
               search.createColumn({name: "custrecord_prefifth", label: "Fifth Approver"}),
               search.createColumn({name: "custrecord_sixth", label: "Sixth Approver"}),
               search.createColumn({name: "custrecord_ahseven", label: "Seventh Approver"})
            ]
         });
  
         var searchResult = customrecord_preSearchObj.run().getRange({
          start: 0,
          end: 1
      });
       if (searchResult.length != 0)
          {
            for (var pri in searchResult) {
              var pre_id = searchResult[pri].id;
              log.debug("pre_id ",pre_id );
              //pref_link.defaultValue = pre_id;
              var preName = searchResult[pri].getValue({
                name: "name",
                sort: search.Sort.ASC,
                label: "ID"
              });
              log.debug("preName",preName);
              var subs_pre = searchResult[pri].getValue({
                      name: "custrecord_presubs", 
                      label: "Subsidiary"
                    });
                    log.debug("subs_pre",subs_pre); 
              var dept_pre = searchResult[pri].getValue({
                name: "custrecord_predept", 
                label: "Department"
              });
              var cls_pre = searchResult[pri].getValue({
                name: "custrecord_precls",
                label: "Class"
              });
              var ct_pre= searchResult[pri].getValue({
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
              var att_pre=searchResult[pri].getValue({
                name: "custrecord_precs1",
                label: "Attendance"
              });
              var compoff_pre=searchResult[pri].getValue({
                name: "custrecord_prefcomp", 
                label: "Comp Off"
              });
              var alevelpre = searchResult[pri].getValue({
                name: "custrecord_preal", 
                label: "Approval Level"
              });
              var fst_app= searchResult[pri].getValue({
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
              var for_app=searchResult[pri].getValue({
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
            if(pre_id)
             {       
            pref_link.defaultValue = pre_id;        
             }
  
            if(cls_pre)
            {
              cls.defaultValue = cls_pre;
            } 
            if(dept_pre)
            {
              dept.defaultValue = dept_pre;
            } 
            if(loc_pre)
            {
              loc.defaultValue = loc_pre;
  
            } 
            if(ct_pre)
            {
              ct.defaultValue = ct_pre; 
            } 
            if(compoff_pre)
            {
              coff.defaultValue = compoff_pre;
  
            }  if(el_pre )
            {
              earnl.defaultValue = el_pre ;
            }  
            if(subs_pre)
            {
              subs.defaultValue = subs_pre;
            }
            if(att_pre)
            {
              at.defaultValue = att_pre;
            }
            if(alevelpre)
            {
              alevel.defaultValue = alevelpre;
            } 
            if(fst_app)
            {
              first_app.defaultValue = fst_app;
            }
            if(s_app)
            {
              second_app.defaultValue = s_app;
            }
            if(t_app)
            {
              third_app.defaultValue = t_app;
            }
            if(for_app)
            {
              fourth_app.defaultValue = for_app;
            }
            if(fi_app)
            {
              fifth_app.defaultValue = fi_app;
            }
            if(si_app )
            {
              sixth_app.defaultValue = si_app ;
            }
            if(sev_app)
            {
              seventh_app.defaultValue = sev_app;
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
          log.debug("configrecid:", recidconfig);
          log.debug("prefrec_link ",prefrec_link );
          if(prefrec_link)
          {
            var recObj = record.load({
              type: 'customrecord_pre',
              id: prefrec_link
            });
           log.debug("recObj"+recObj);
            // recObj.getField('custpage_configrecid').isDisabled = true;
            if(subs_rec)
            recObj.setValue({
              fieldId: 'custrecord_presubs',
              value: subs_rec
            });
            if(deptrec)
            recObj.setValue({
              fieldId: 'custrecord_predept',
              value: deptrec
            });
            if(cls_rec)
            recObj.setValue({
              fieldId: 'custrecord_precls',
              value: cls_rec
            });
            if(ct_rec)
            recObj.setValue({
              fieldId: 'custrecord_precnt',
              value: ct_rec
            });
            if(loc_rec)
            recObj.setValue({
              fieldId: 'custrecord_preloc',
              value: loc_rec
            });
            if(att_rec)
            recObj.setValue({
              fieldId: 'custrecord_preal',
              value: att_rec
            });
            if(el_rec )
            recObj.setValue({
              fieldId: 'custrecord_preal',
              value: el_rec 
            });
            if(comp_rec)
            recObj.setValue({
              fieldId: 'custrecord_preal',
              value:comp_rec
            });
            if(alevelrec)
            recObj.setValue({
              fieldId: 'custrecord_preal',
              value: alevelrec
            });
            if(firstapprec)
            recObj.setValue({
              fieldId: 'custrecord_prefirst',
              value: firstapprec
            });
            if(secondapprec)
            recObj.setValue({
              fieldId: 'custrecord_presecond',
              value: secondapprec
            });
            if(thirdapprec)
            recObj.setValue({
              fieldId: 'custrecord_prethird',
              value: thirdapprec
            });
            if(fourthapprec)
            recObj.setValue({
              fieldId: 'custrecord_fourth',
              value: fourthapprec
            });
            if(fifthapprec)
            recObj.setValue({
              fieldId: 'custrecord_prefifth',
              value: fifthapprec
            });
            if(sixthapprec)
            recObj.setValue({
              fieldId: 'custrecord_sixth',
              value: sixthapprec
            });
            if(seventhapprec)
            recObj.setValue({
              fieldId: 'custrecord_ahseven',
              value: seventhapprec
            });
            var cust_rec = recObj.save({});
            context.response.write('Preference Custom record Updated' + cust_rec);
  
          }
          else{
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
          context.response.write('Preference Custom record Created' + cust_rec);
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