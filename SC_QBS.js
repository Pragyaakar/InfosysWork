/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/search', 'N/record'],
    function (runtime, search, record) {
        function execute(scriptContext) {
            try {
                log.audit('execute > Schedule script', 'Start');
                var estimateSearchObj = search.create({
                    type: "estimate",
                    filters: [
                        ["type", "anyof", "Estimate"],
                        "AND",
                        ["status", "anyof", "Estimate:X", "Estimate:V", "Estimate:C"],
                        "AND",
                        ["custbody_telstra_quote_booking_status", "noneof", "4"],
                        "AND",
                        ["customform", "anyof", "227"],
                        "AND",
                        ["mainline", "is", "T"]
                    ],
                    columns: []
                });
                var searchResult = estimateSearchObj.runPaged().count;
                log.debug("estimateSearchObj result count", searchResult);
                estimateSearchObj.run().each(function (result) {
                    log.debug('result Id', result.id)
                    record.submitFields({
                        type: record.Type.ESTIMATE,
                        id: result.id,
                        values: {
                            'custbody_telstra_quote_booking_status': 4
                        }
                    });
                    return true;
                });
            } catch (e) {
                log.error('execute > Catch Error', e);
            } finally {
                log.audit('execute > > Schedule script', 'End');
            }
        }

        return {
            execute: execute

        };
    });