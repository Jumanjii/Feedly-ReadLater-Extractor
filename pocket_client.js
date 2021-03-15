// MIT License
//
// Copyright (c) 2021 Allan Jacquet-Cretides
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//


// const consumerKey = ""
// const redirectURL = "http://www.allanjacquet.com/pocket"

function extractRequestToken(requestResponse) {
    const regex = /code=(.*)/;
    const requestToken = requestResponse.match(regex)[1];
    console.log('requestToken', requestToken)
    return requestToken
}

function extractAccessToken(authorizeResponse) {
    const regex = /access_token=(.*)&/;
    const accessToken = authorizeResponse.match(regex)[1];
    console.log('accessToken', accessToken)
    return accessToken
}

function getRequestToken(consumerKey, redirectURL) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "consumer_key": consumerKey,
      "redirect_uri": redirectURL
      });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://getpocket.com/v3/oauth/request", requestOptions)
    .then(response => response.text())
    .then(extractRequestToken)
    .catch(error => console.log('error', error));
}

function getAccessToken(consumerKey, requestToken) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("consumer_key", consumerKey);
  urlencoded.append("code", requestToken);

  var requestOptions = {
    method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
  };

  return fetch("https://getpocket.com/v3/oauth/authorize", requestOptions)
    .then(response => response.text())
    .then(extractAccessToken)
    .catch(error => console.log('error', error));
}

function saveURLs(consumerkey, accesstoken, urls) {

  var actions = res.map(url => ({"action": "add", "url": url}));
  
  var myheaders = new headers();
  myheaders.append("content-type", "application/json");

  var raw = json.stringify({
    consumer_key: consumerkey,
    access_token: accesstoken,
    actions: actions
  };

  var requestoptions = {
    method: 'post',
    headers: myheaders,
    body: raw
  };

  return fetch("https://getpocket.com/v3/send", requestoptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .then( _ => console.log("batch of urls has been correctly registered in pocket collection")
    .catch(error => console.log('error', error));
}

function logAuthorizeURL(requestToken) {
   console.log(
     "Go this address with your browser", 
     `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${redirectURL}`
   )
   
   return requestToken
}

function logAccessToken(accessToken) {
   console.log(
     "You can now use the following access token to access Pocket API", 
     accessToken
   )
   
   return accessToken
}
