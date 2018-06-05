function chat() {
    var chatInput = document.getElementById('chatInput').value;

    var divNew = document.createElement('div');
    var labelNew = document.createElement('label');
    labelNew.setAttribute('for', 'kuro');
    labelNew.setAttribute('style', 'color: burlywood;');
    labelNew.appendChild(document.createTextNode(`user says:${'　'}${chatInput}`));
    divNew.appendChild(labelNew);
    document.getElementById('chatOutput').appendChild(labelNew);

    var url = 'https://api.dialogflow.com/v1/query';
    fetch(url, {
       method: 'POST',
       body:  JSON.stringify({
        contexts: [],
        lang: "ja",
        query: chatInput,
        sessionId: "12345",
        timezone: "America/New_York",
      }),
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer e916d34bcb3940dc981498a6e465cc3c",
      }
    }).then(response => {
        response.json().then(json => {
            document.getElementById('chatInput').value = '';
            document.getElementById('chatInput').focus();

            var speech = json.result.speech;
            var timestamp = json.timestamp;

            var divNew = document.createElement('div');
            var labelNew = document.createElement('label');
            labelNew.setAttribute('for', 'kuro');
            labelNew.setAttribute('style', 'color: blue;');
            if (speech !== null && speech !== '' && speech !== undefined) {
                labelNew.appendChild(document.createTextNode(`chatbot says(${timestamp}):${'　'}${speech}`));
            } else {
                labelNew.appendChild(document.createTextNode(`chatbot says(${timestamp}):${'　'}${'未知エラー'}`));
            }
            divNew.appendChild(labelNew);
            document.getElementById('chatOutput').appendChild(labelNew);
        })
    }).catch(err => {
        console.log(err);
        var divNew = document.createElement('div');
        var labelNew = document.createElement('label');
        labelNew.setAttribute('for', 'kuro');
        labelNew.setAttribute('style', 'color: blue;');
        labelNew.appendChild(document.createTextNode(`chatbot says:${err}`));
        divNew.appendChild(labelNew);
        document.getElementById('chatOutput').appendChild(labelNew);
    });
}

document.addEventListener ('keydown',function(e){
    var t = e.target;
    if(t.nodeName=="INPUT" && t.name=="chatInput" && e.keyCode==13){
      document.getElementsByTagName("button")[0].click();
      e.preventDefault();
    }
});