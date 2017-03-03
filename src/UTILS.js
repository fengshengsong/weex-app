'use strict'

module.exports = {
	getHowLong(time){
		return Math.ceil((Date.now() - new Date(time).getTime())/(60*60*24*1000));
	},
	getBaseUrl(self) {
		var url = self.$getConfig().bundleUrl;
    	var bundleUrl = url;
    	bundleUrl = new String(bundleUrl);

		var nativeBase;
		var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
		var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;

		if (isAndroidAssets) {
			nativeBase = 'file://assets/';
		}
		else if (isiOSAssets) {
		    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
		}
		else {
			var host = 'localhost:12580';
			var matches = /\/\/([^\/]+?)\//.exec(bundleUrl);
			if (matches && matches.length >= 2) {
				host = matches[1];
			}
			nativeBase = 'http://' + host + '/dist/';
		}
		var h5Base = './index.html?page=./dist/';
		var base = nativeBase;
		if (typeof window === 'object') {
		    base = h5Base;
		}
		return base
	},
	getUrlParam(key,url){
    	var reg = new RegExp('[?|&]' + key + '=([^&]+)');
    	var match = url.match(reg);
    	return match && match[1];
  	}
}