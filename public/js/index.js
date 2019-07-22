var appConfig = {
  iFrameURL : (function(){return ('undefined' !== typeof cognosURL && cognosURL.length) ? cognosURL : false}())
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
  
/* Toggle click for Home / Dashboard views */
document.getElementById('home-button').onclick=function(){
  document.getElementById('dashboardContent').style.display = "none";
  document.getElementById('homeContent').style.display = "flex";
  document.getElementById('dashboard-button').classList.remove("active");
  document.getElementById('home-button').classList.add("active");
}
document.getElementById('dashboard-button').onclick=function(){
  document.getElementById('homeContent').style.display = "none";
  document.getElementById('dashboardContent').style.display = "flex";
  document.getElementById('home-button').classList.remove("active");
  document.getElementById('dashboard-button').classList.add("active");
}



window.onload = function() {

  //Load Dashboard Content
  //If an IFrame for Cognos Analytics has not been configured, display a screenshot of a dashboard.
  if (!appConfig.iFrameURL){
    document.getElementById("dashboardContent").appendChild(document.createElement("img")).src = '/img/cognos-dashboard-sample.png';
  }
  else {
    var iframe_html_el = document.createElement("iframe");
    iframe_html_el.setAttribute("frameborder", "0" );
    iframe_html_el.setAttribute("gesture", "media" );
    iframe_html_el.setAttribute("allow", "encrypted-media" );
    iframe_html_el.setAttribute("allowfullscreen","");
    document.getElementById("dashboardContent").appendChild(iframe_html_el).src = appConfig.iFrameURL;
  }
}