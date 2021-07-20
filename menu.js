let convertPage = () => {
  let enabled = document.getElementById("enabled").checked;
  console.log(enabled)
  
  browser.browserAction.setIcon({
    "path": {
      48: enabled ? "icons/48.png" : "icons/48-grayscale.png"
    },
  })

  browser.storage.sync.set({'enableSSM': enabled}); 
  browser.tabs.reload();
};

browser.storage.sync.get(['enableSSM']).then(res => {
  document.getElementById("enabled").checked = res.enableSSM;
})

let connect = () => {
    document.getElementById("enabled").onclick = convertPage
}

document.addEventListener('DOMContentLoaded', connect);
