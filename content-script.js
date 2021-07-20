let copyStringToClipboard = str => {
  // Create new element
  var el = document.createElement('textarea');
  
  // Set value (string to be copied)
  el.value = str;

  // Set non-editable to avoid focus and move outside of view
  el.setAttribute('readonly', '');
  el.style = { position: 'absolute', left: '-9999px' };
  document.body.appendChild(el);

  // Select text inside element
  el.select();

  // Copy text to clipboard
  document.execCommand('copy');

  // Remove temporary element
  document.body.removeChild(el);
}

chrome.storage.sync.get(['enableSSM']).then(res => {
  if (!res.enableSSM) return;

  $('p').each(function() {
    $(this).html($(this).text()
      .split(/([\.\?!])(?= )/)
      .map(v => {return '<span class=sentence>'+v+'</span>'}
  ));
  });

  $('span.sentence').click(obj => {
    let selection = window.getSelection();
    selection.modify('extend','backward','word');        
    let a = selection.toString();
          
    selection.modify('extend','forward','word');
    while (selection.toString().slice(-1) == "-") {
        selection.modify('extend','forward','word');
    }
    let b = selection.toString();

    selection.modify('move','forward','character');
    word = (a + b).replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, "");
    console.log(word);
    console.log(obj)
    copyobj = {
      "sentence": obj.target.textContent.trim(),
      "word": word.trim()
    };
    console.log(copyobj)
    copyStringToClipboard(JSON.stringify(copyobj));
  });
});
