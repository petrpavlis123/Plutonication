// inject our data injector
console.log("Trying to inject script")

const script = document.createElement('script');

script.src = chrome.extension.getURL('page.js');

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

console.log("done")