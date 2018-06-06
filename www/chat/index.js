function chat() {
    var chatInput = document.getElementById('chatInput').value;
    var dtAsk = new Date();
    dtAsk = dtAsk.toLocaleString()

    var divNew = document.createElement('div');
    var labelNew = document.createElement('label');
    labelNew.setAttribute('for', 'kuro');
    labelNew.setAttribute('style', 'color: burlywood;');
    labelNew.appendChild(document.createTextNode(`user says(${dtAsk}):${'　'}${chatInput}`));
    divNew.appendChild(labelNew);
    document.getElementById('chatOutput').prepend(labelNew);

    var url = 'https://us-central1-hitomean-v4.cloudfunctions.net/dialogflowPublic';
    fetch(url, {
       method: 'POST',
       body: JSON.stringify({
        queryType: 'text',
        queryInput: chatInput,
      }),
      headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: 'application/json',
      }
    }).then(response => {
        response.json().then(json => {
            document.getElementById('chatInput').value = '';
            document.getElementById('chatInput').focus();

            var speech = json[0].queryResult.fulfillmentText;
            var dtAnswer = new Date();
            dtAnswer = dtAnswer.toLocaleString()

            var divNew = document.createElement('div');
            var labelNew = document.createElement('label');
            labelNew.setAttribute('for', 'kuro');
            labelNew.setAttribute('style', 'color: blue;');
            if (speech !== null && speech !== '' && speech !== undefined) {
                labelNew.appendChild(document.createTextNode(`chatbot says(${dtAnswer}):${'　'}${speech}`));
            } else {
                labelNew.appendChild(document.createTextNode(`chatbot says(${dtAnswer}):${'　'}${'未知エラー'}`));
            }
            divNew.appendChild(labelNew);
            document.getElementById('chatOutput').prepend(labelNew);
        })
    }).catch(err => {
        var dtErr = new Date();
        dtErr = dtErr.toLocaleString()
        console.log(err);
        var divNew = document.createElement('div');
        var labelNew = document.createElement('label');
        labelNew.setAttribute('for', 'kuro');
        labelNew.setAttribute('style', 'color: blue;');
        labelNew.appendChild(document.createTextNode(`chatbot says(${dtErr}):${err}`));
        divNew.appendChild(labelNew);
        document.getElementById('chatOutput').prepend(labelNew);
    });
}

//     var url = 'https://api.dialogflow.com/v1/query';
//     fetch(url, {
//        method: 'POST',
//        body:  JSON.stringify({
//         contexts: [],
//         lang: "ja",
//         query: chatInput,
//         sessionId: "12345",
//         timezone: "America/New_York",
//       }),
//       headers: {
//           "Content-Type": "application/json; charset=utf-8",
//           Authorization: "Bearer e916d34bcb3940dc981498a6e465cc3c",
//       }
//     }).then(response => {
//         response.json().then(json => {
//             document.getElementById('chatInput').value = '';
//             document.getElementById('chatInput').focus();

//             var speech = json.result.speech;
//             var timestamp = json.timestamp;

//             var divNew = document.createElement('div');
//             var labelNew = document.createElement('label');
//             labelNew.setAttribute('for', 'kuro');
//             labelNew.setAttribute('style', 'color: blue;');
//             if (speech !== null && speech !== '' && speech !== undefined) {
//                 labelNew.appendChild(document.createTextNode(`chatbot says(${timestamp}):${'　'}${speech}`));
//             } else {
//                 labelNew.appendChild(document.createTextNode(`chatbot says(${timestamp}):${'　'}${'未知エラー'}`));
//             }
//             divNew.appendChild(labelNew);
//             document.getElementById('chatOutput').prepend(labelNew);
//         })
//     }).catch(err => {
//         console.log(err);
//         var divNew = document.createElement('div');
//         var labelNew = document.createElement('label');
//         labelNew.setAttribute('for', 'kuro');
//         labelNew.setAttribute('style', 'color: blue;');
//         labelNew.appendChild(document.createTextNode(`chatbot says:${err}`));
//         divNew.appendChild(labelNew);
//         document.getElementById('chatOutput').prepend(labelNew);
//     });
// }

function chatClear() {
    var element = document.getElementById('chatOutput');

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

document.addEventListener ('keydown',function(e){
    var t = e.target;
    if(t.nodeName=="INPUT" && t.name=="chatInput" && e.keyCode==13){
      document.getElementById('chatSend').click();
      e.preventDefault();
      document.getElementById('chatInput').value = '';
    }
});
