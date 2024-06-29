/**
 * Source: https://gist.github.com/diachedelic/0d60233dab3dcae3215da8a4dfdcd434
 * Deep link to a native app from a browser, with a fallback
 * @param options 
 */
export function DeepLinker(
  this: any, 
  onSuccess: () => void,
  onFailed: () => void,
) {
  var didHide = false;
  var didFail = false;

  // document is hidden when native app is shown or browser is backgrounded
  function onVisibilityChange(e: any) {
    if (e.target.visibilityState === 'hidden') {
      if (!(didHide || didFail)) {
        onSuccess();

        didHide = true;
      }      
    }
  };

  // window is focused when dialogs are hidden, or browser comes into view
  function onFocus() {
    
  };

  // add/remove event listeners
  // `mode` can be "add" or "remove"
  function bindEvents(mode: any) {
    [
      [document, 'visibilitychange', onVisibilityChange],
      [window, 'focus', onFocus],
    ].forEach(function(conf: any) {
      conf[0][mode + 'EventListener'](conf[1], conf[2]);
    });
  }

  // add event listeners
  bindEvents('add');

  // expose public API
  this.destroy = bindEvents.bind(null, 'remove');
  this.openURL = function(url: string) {
    // it can take a while for the dialog to appear
    var dialogTimeout = 500;

    setTimeout(function() {
      if (!didHide) {
        didFail = true;

        onFailed();
      }
    }, dialogTimeout);

    window.location = url as Location | (string & Location);
  };
}
