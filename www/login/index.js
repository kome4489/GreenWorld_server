// urlを利用（v1）

// var fetch = require('node-fetch');

// var queryInput1 = {
//     query: 'こんにちは',
//     lang: 'jp',
//     sessionId: 'somerandomthing',
//   };

//   fetch('https://api.api.ai/v1/query', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8',
//       authorization: 'Bearer 0a00bc9741da4957bf03e9c9475c5296',
//     },
//     body: JSON.stringify(queryInput2),
//   }).then(response => response.json().then(json => ({ json, response }))
//   ).then(({ json, response }) => {
//     console.log(json, response);
//   });
