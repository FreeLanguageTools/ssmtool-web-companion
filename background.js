let convertPage = () => {
  let enabled = document.getElementById("enabled").checked;
  console.log(enabled)
  chrome.storage.sync.set({'enableSSM': enabled}); 
};

chrome.storage.sync.get(['enableSSM']).then(res => {
  console.log("Hello")
  document.getElementById("enabled").checked = res.enableSSM;
})

let connect = () => {
    document.getElementById("enabled").onclick = convertPage
}

document.addEventListener('DOMContentLoaded', connect);
