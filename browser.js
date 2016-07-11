(function ($) {

  Drupal.behaviors.browserDetection = {
    attach: function (context, settings) {
      var BrowserDetect = {
        init: function () {
          this.browser = this.searchString(this.dataBrowser) || "unknown-browser";
          this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "unknown-version";
          this.OS = this.searchString(this.dataOS) || "unknown-OS";
        },
        searchString: function (data) {
          for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
              if (dataString.indexOf(data[i].subString) != -1)
                return data[i].identity;
            }
            else if (dataProp)
              return data[i].identity;
          }
        },
        searchVersion: function (dataString) {
          var index = dataString.indexOf(this.versionSearchString);
          if (index == -1) return;
          return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
        },
        dataBrowser: [{
          string: navigator.userAgent,
          subString: "OPR",
          identity: "Opera",
          versionSearch: "OPR"
        }, {
          string: navigator.userAgent,
          subString: "Vivaldi",
          identity: "Vivaldi"
        }, {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        }, {
          string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
        }, {
          string: navigator.vendor,
          subString: "Apple",
          identity: "Safari",
          versionSearch: "Version"
        }, { // old Opera
          prop: window.opera,
          identity: "Opera",
          versionSearch: "Version"
        }, {
          string: navigator.vendor,
          subString: "iCab",
          identity: "iCab"
        }, {
          string: navigator.vendor,
          subString: "KDE",
          identity: "Konqueror"
        }, {
          string: navigator.userAgent,
          subString: "Firefox",
          identity: "Firefox"
        }, {
          string: navigator.vendor,
          subString: "Camino",
          identity: "Camino"
        }, { // for newer Netscapes (6+)
          string: navigator.userAgent,
          subString: "Netscape",
          identity: "Netscape"
        }, {
          string: navigator.userAgent,
          subString: "MSIE",
          identity: "Internet Explorer",
          versionSearch: "MSIE"
        }, {
          string: navigator.userAgent,
          subString: ".NET4",
          identity: "Microsoft Edge",
          versionSearch: "rv"
        }, {
          string: navigator.userAgent,
          subString: "Gecko",
          identity: "Mozilla",
          versionSearch: "rv"
        }, { // for older Netscapes (4-)
          string: navigator.userAgent,
          subString: "Mozilla",
          identity: "Netscape",
          versionSearch: "Mozilla"
        }],
        dataOS: [{
          string: navigator.userAgent,
          subString: "Windows Phone",
          identity: "WindowsPhone"
        }, {
          string: navigator.platform,
          subString: "Win",
          identity: "Windows"
        }, {
          string: navigator.platform,
          subString: "Mac",
          identity: "Mac"
        }, {
          string: navigator.userAgent,
          subString: "iPhone",
          identity: "iPhone"
        }, {
          string: navigator.userAgent,
          subString: "iPad",
          identity: "iPad"
        }, {
          string: navigator.userAgent,
          subString: "Android",
          identity: "Android"
        }, {
          string: navigator.platform,
          subString: "Linux",
          identity: "Linux"
        }]
      };
      BrowserDetect.init();

      var os      = BrowserDetect.OS.toLowerCase(),
          browser = BrowserDetect.browser.toLowerCase(),
          version = String(BrowserDetect.version).replace(/\./g, '-');

      $('html').addClass(os);
      $('html').addClass(browser);
      $('html').addClass(browser + '-' + version);
      if (os == 'android' || os == 'iphone' || os == 'ipad' || os == 'windowsphone') {
        $('html').addClass('mobile-browser');
      } 
    }
  };
})(jQuery);
