var appConfig = {
  iFrameURL : (function(){return ('undefined' !== typeof cognosURL && cognosURL.length) ? cognosURL : false}())
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
  
window.onload = function() {
  //If an IFrame for Cognos Analytics has not been configured, display a screenshot of a dashboard.
  if (!appConfig.iFrameURL){
    document.getElementById("mainContent").appendChild(document.createElement("img")).src = '/img/cognos-dashboard-sample.png';
  }
  else {
    document.getElementById("mainContent").appendChild(document.createElement("iframe")).src = appConfig.iFrameURL;
  }
}