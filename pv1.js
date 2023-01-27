else{
    var request = context.request;
    var subs_rec = context.request.parameters.custpage_subsidiary;
    var deptrec=context.request.parameters.custpage_department;
    var alevelrec =context.request.parameters.custpage_approver;
    var firstapprec=context.request.parameters.custpage_first;
   var recObj = record.create({
     type:'customrecord_pre'
   });
    recObj.setValue({
      fieldId:'custrecord_presubs',
      value:subs_rec 
    });
    recObj.setValue({
      fieldId:'custrecord_predept',
      value:deptrec
    });
    recObj.setValue({
      fieldId:'custrecord_preal',
      value:alevelrec
    });
    recObj.setValue({
      fieldId:'custrecord_prefirst',
      value:firstapprec
    });
    var cust_rec = recObj.save({});
    context.response.write('Preference Custom record Created')
  }
       