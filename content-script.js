browser.storage.sync.get(['enableSSM']).then(res => {
  if (!res.enableSSM) return;
  $(document).ready(function(){
    $("span.sentence").hover(function(){
        $(this).css("text-decoration", "underline #6b7 solid 3px");
        $(this).css("text-decoration-skip-ink", "none");
    },
    function(){
        $(this).css("text-decoration", "");
    });
});



  $('p').each(function() {
    $(this).html($(this).text()
      .split(/(?<=[\.\?!] )/)
      .map(v => {return ' <span class=sentence>'+v.trimRight()+'</span> '}));
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
    word = (a + b).replace(/[.,\/#!$%\^&\*;:{}=\_…`~()]/g, "");
    console.log(word);
    console.log(obj)
    copyobj = {
      "sentence": obj.target.textContent.trim(),
      "word": word.trim()
    };
    console.log(copyobj)
    navigator.clipboard.writeText(JSON.stringify(copyobj));
  });
});