"use strict";
/**
 * Created by Abhi on 7/23/16.
 */
var url = 'https://apis.google.com/js/client.js?onload=__onGoogleLoaded';
var GoogleAPI = (function () {
    function GoogleAPI() {
        var _this = this;
        this.loadAPI = new Promise(function (resolve) {
            window['__onGoogleLoaded'] = function (ev) {
                console.log('gapi loaded');
                resolve(window['gapi']);
            };
            _this.loadScript();
        });
    }
    GoogleAPI.prototype.doSomethingGoogley = function () {
        return this.loadAPI.then(function (gapi) {
            console.log(gapi);
        });
    };
    GoogleAPI.prototype.loadScript = function () {
        console.log('loading..');
        var node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(node);
    };
    return GoogleAPI;
}());
exports.GoogleAPI = GoogleAPI;
//# sourceMappingURL=gloader.js.map