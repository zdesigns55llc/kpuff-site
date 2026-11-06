document.getElementById("fb").href=FB_MESSENGER||"https://www.facebook.com/";
document.getElementById("f").addEventListener("submit",function(e){
  e.preventDefault();
  var v=function(i){return document.getElementById(i).value.trim()};
  var txt="Hi KPuff, booking request!\nName: "+v("n")+"\nService: "+v("s")+"\nDay: "+(v("d")||"flexible")+" ("+v("t")+")\nPhone: "+(v("p")||"n/a")+(v("m")?"\nNotes: "+v("m"):"");
  var out=document.getElementById("msg");
  if(PHONE){window.location.href="sms:"+PHONE+"?&body="+encodeURIComponent(txt);out.textContent="Opening your messages app...";return}
  var done=function(){out.textContent="Request copied! Paste it into a Messenger chat with KPuff to finish booking."};
  try{navigator.clipboard.writeText(txt).then(done,function(){out.textContent=txt})}catch(x){out.textContent=txt}
  if(FB_MESSENGER)setTimeout(function(){window.open(FB_MESSENGER,"_blank")},600);
});
