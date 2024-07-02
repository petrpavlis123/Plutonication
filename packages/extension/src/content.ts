// inject our data injector
const script = document.createElement('script');

script.src = chrome.runtime.getURL('page.js');

script.onload = (): void => {
  // remove the injecting tag when loaded
  if (script.parentNode) {
    script.parentNode.removeChild(script);
  }
};

(document.head || document.documentElement).appendChild(script);

if (document.getElementsByTagName("plutonication-modal").length === 0){
  const plutonicationModal = document.createElement("plutonication-modal")
  document.body.appendChild(plutonicationModal);
}
