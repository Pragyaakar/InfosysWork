/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 */
define(['N/search'], function (search) {
    function onAction(scriptContext) {
        log.debug({
            title: 'Start Script'
        });
        var newRecord = scriptContext.newRecord;
        var quoteRecord = newRecord.id;
        log.debug({
            title: 'quoteRecord',
            details: quoteRecord
        });
        var salesorderSearchObj = search.create({
            type: "salesorder",
            filters: [
                ["type", "anyof", "SalesOrd"],
                "AND",
                ["createdfrom", "anyof", quoteRecord],
                "AND",
                ["mainline", "is", "T"]
            ],
            columns: [
                search.createColumn({
                    name: "createdfrom",
                    label: "Created From"
                })
            ]
        });
        var searchResultCount = salesorderSearchObj.runPaged().count;
        log.debug("salesorderSearchObj result count", searchResultCount);

        if (searchResultCount > 0) {
            //scriptContext.workflowId = 195;
            return true;
        } else {
            return false;
        }
    }
    return {
        onAction: onAction
    }
});