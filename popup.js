var $=function(i){return document.getElementById(i)};
var L=["60 Hz","250 Hz","1 kHz","4 kHz","12 kHz"];
var P={"Neutre":[[0,0,0,0,0],0,false],"Basses":[[5,3,0,0,1],6,false],"Voix claires":[[-3,-1,3,3,1],0,true],"Jeux":[[-2,-2,1,6,4],0,true],"Cinéma":[[4,1,0,2,3],4,true]};
var S={sat:100,sOn:false,g:[0,0,0,0,0],bass:0,vol:100,comp:false};
$("bands").innerHTML=L.map(function(l,i){return '<div class="r"><span>'+l+'</span><input data-b="'+i+'" id="b'+i+'" type="range" min="-12" max="12" value="0"><span id="bv'+i+'">0 dB</span></div>'}).join("");
function ui(){
  $("sat").value=S.sat;$("satV").textContent=S.sat+" %";$("sOn").checked=S.sOn;
  $("bass").value=S.bass;$("bassV").textContent=S.bass+" dB";$("vol").value=S.vol;$("volV").textContent=S.vol+" %";$("comp").checked=S.comp;
  S.g.forEach(function(v,i){$("b"+i).value=v;$("bv"+i).textContent=v+" dB"});
}
function save(){chrome.storage.local.set(S);ui()}
chrome.storage.local.get(S,function(d){S=d;ui()});
$("sat").oninput=function(e){S.sat=+e.target.value;save()};
$("sOn").onchange=function(e){S.sOn=e.target.checked;save()};
$("bass").oninput=function(e){S.bass=+e.target.value;save()};
$("vol").oninput=function(e){S.vol=+e.target.value;save()};
$("comp").onchange=function(e){S.comp=e.target.checked;save()};
$("bands").oninput=function(e){var b=e.target.getAttribute("data-b");if(b!=null){S.g[b]=+e.target.value;save()}};
$("pre").onchange=function(e){var p=P[e.target.value];if(p){S.g=p[0].slice();S.bass=p[1];S.comp=p[2];S.sOn=true;save()}};
$("rst").onclick=function(){S={sat:100,sOn:false,g:[0,0,0,0,0],bass:0,vol:100,comp:false};save()};
