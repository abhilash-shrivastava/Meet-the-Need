"use strict";
/**
 * Created by Abhi on 6/11/16.
 */
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var serviceProviders = [];
        return { serviceProviders: serviceProviders };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map