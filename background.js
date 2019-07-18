// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {
    console.log("OOOO____WWWW:"+info.srcUrl)
    getImgToBase64(info.srcUrl,LOG)

  };
};

function getMD() {
  return function(info, tab) {
    console.log("OOOO____WWWW:"+info.srcUrl)
    getImgToBase64(info.srcUrl,mdimg)
  };
};
function getMDres(){
	  return function(info, tab) {
    console.log("OOOO____WWWW:"+info.srcUrl)
    getImgToBase64(info.srcUrl,LOG)
  };
}
function mdimg(imgdata){
	console.log("![]("+imgdata+")");
	copyTextToClipboard("![]("+imgdata+")");
}
var parent = chrome.contextMenus.create({"title": "Image2Base64","contexts":["image"]});
var child1 = chrome.contextMenus.create(
  {"title": "Get Base64 Encode String","type":"normal", "parentId": parent,"contexts" : ["image"], "onclick": getClickHandler()});
var child2 = chrome.contextMenus.create(
  {"title": "Get MarkdownBase64","type":"normal", "parentId": parent,"contexts" : ["image"], "onclick": getMD()});

function LOG(data){
    console.log(data);
}
function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}
function getImgToBase64(url,callback){
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img,0,0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}
