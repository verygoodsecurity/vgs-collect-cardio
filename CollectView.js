import React, { Component } from 'react'
import { WebView } from 'react-native-webview';



export default function CollectView(props) {
  
  const VGSColletFormHTML = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VGS Collect Credit Card Example</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
              integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script type="text/javascript" src="https://js.verygoodvault.com/vgs-collect/1/vgs-collect-examples.js"></script>
        <style>
          .box {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
          span[id*="cc-"] iframe {
            height: 100%;
            width: 100%;
          }
          .box div {
            width: 90%;
          }
          html, body {
            height: 100%;
          }
          .form-field {
            display: block;
            width: 100%;
            height: calc(2.25rem + 2px);
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          }

          .form-field iframe {
            height: 100%;
            vertical-align: middle;
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <div class="box-inner">
            <form id="cc-form">
              <section class="form-group">
                <label for="cc-name">Name</label>
                <span id="cc-name" class="form-field">
                  <!--VGS Collect iframe for card name field will be here!-->
                </span>
                <br><BR> 
                <button type="submit" class="btn btn-success btn-block">Submit</button>
              </section>
            </form>
            <script>
              const form = VGSCollect.create('tntq4dwvhri', function(state) {});
  
              form.field('#cc-name', {
                type: 'text',
                name: 'card_number',
                placeholder: '',
                defaultValue: '421211',
                validations: ['required'],
              });

              // form.submit('/post', {
              //   data: {

              //   }
              // }, function(status, data) {
              //   // window.ReactNativeWebView.postMessage("qweqweqweqweqwe", "*");
              // });

              document.getElementById('cc-form')
              .addEventListener('submit', function(e) {
                e.preventDefault();
                form.submit('/post', {
                }, function(status, data) {
                  // window.ReactNativeWebView.postMessage("qweqweqweqweqwe", "*");
                });
              }, function (errors) {});
            </script> 
          </div>
        </div>
      </body>
    <html>
  `;

  function addMessage(message) {
    console.log('messssssssssssss', message )
  }
  
  return (
      <WebView
        style={{margin: 100}}
        source={{html: VGSColletFormHTML}}
        scrollEnabled={false}
        onMessage={(evt)=>{
          addMessage(evt.nativeEvent.data);
        }}
        javaScriptEnabled={true}
      />
  );

}
