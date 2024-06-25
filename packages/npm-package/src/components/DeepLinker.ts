/**
 * Source: https://gist.github.com/diachedelic/0d60233dab3dcae3215da8a4dfdcd434
 * Deep link to a native app from a browser, with a fallback
 * @param options 
 */
export function DeepLinker(
  onIgnored: () => void,
  onReturn: () => void,
  onFallback: () => void,
) {
  var hasFocus = true;
  var didHide = false;

  // window is blurred when dialogs are shown
  function onBlur() {
    hasFocus = false;
  };

  // document is hidden when native app is shown or browser is backgrounded
  function onVisibilityChange(e) {
    if (e.target.visibilityState === 'hidden') {
      didHide = true;
    }
  };

  // window is focused when dialogs are hidden, or browser comes into view
  function onFocus() {
    if (didHide) {
      onReturn();

      didHide = false; // reset
    } else {
      // ignore duplicate focus event when returning from native app on
      // iOS Safari 13.3+
      if (!hasFocus) {
        // wait for app switch transition to fully complete - only then is
        // 'visibilitychange' fired
        setTimeout(function() {
          // if browser was not hidden, the deep link failed
          if (!didHide) {
            onFallback();
          }
        }, 1000);
      }
    }

    hasFocus = true;
  };

  // add/remove event listeners
  // `mode` can be "add" or "remove"
  function bindEvents(mode) {
    [
      [window, 'blur', onBlur],
      [document, 'visibilitychange', onVisibilityChange],
      [window, 'focus', onFocus],
    ].forEach(function(conf) {
      conf[0][mode + 'EventListener'](conf[1], conf[2]);
    });
  }

  // add event listeners
  bindEvents('add');

  // expose public API
  this.destroy = bindEvents.bind(null, 'remove');
  this.openURL = function(url) {
    // it can take a while for the dialog to appear
    var dialogTimeout = 500;

    setTimeout(function() {
      if (hasFocus) {
        onIgnored();
      }
    }, dialogTimeout);


    try {
      window.location = url;
    }
    catch {
      console.log("failed to assign")
    }
  };
}
