/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope Public
 */
 define(['N/log', 'N/email', 'N/search'], function (log, email, search) {
    function getInputData(context) {
      return search.create({
        type: 'invoice',
        filters: [
          ['mainline', 'is', 'T'],
          'and', ['duedate', 'before', 'today']
        ],
        columns: [
          'tranid',
          'duedate',
          'amountremaining',
          'customer.email'
        ]
      });
    }
  
    function map(context) {
      var data = JSON.parse(context.value);
      var emailAddress = data.values['email.customer'];
  
      context.write({
        key: emailAddress,
        value: data.values
      });
    }
  
    function reduce(context) {
      var emailAddress = context.key;
      var values = context.values.map(JSON.parse);
  
      var invoiceData = values.map(function(invoice) {
          return [invoice['tranid'], invoice['duedate'], invoice['amountremaining']].join(' - ');
        });
  
      var emailBody = 'The following invoices are past due, please pay them.\n'
        + invoiceData.join('\n');
  
      email.send({
        author: -5,
        recipients: [emailAddress],
        subject: 'Past Due Invoices',
        body: emailBody
      });
  
      context.write({ key: emailAddress });
    }
  
    function summarize(context) {
      var inputSummary = context.inputSummary;
      var mapSummary = context.mapSummary;
      var reduceSummary = context.reduceSummary;
  
      context.output.iterator().each(function(key) {
        log.debug({ title: 'Sent email to', details: key });
      });
  
      if (inputSummary.error) {
        log.error({ title: 'getInputData error', details: inputSummary.error });
      }
  
      logErrors('Map', mapSummary);
      logErrors('Reduce', reduceSummary);
    }
  
    function logErrors(stage, summary) {
      summary.errors.iterator().each(function(key, value) {
        var message = JSON.parse(value).message;
        log.error({ title: stage + ' Error Key: ' + key, details: message });
      });
    }
  
    return {
      getInputData: getInputData,
      map: map,
      reduce: reduce,
      summarize: summarize
    };
  });