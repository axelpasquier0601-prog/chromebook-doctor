/* ---- Saturation ---- */
function applySat(v){
  var e=document.documentElement; if(!e) return;
  e.style.filter = v===100 ? "" : "saturate("+(v/100)+")";
}
/* ---- Son : égaliseur sur les <video>/<audio> de la page ---- */
var S={sat:100,sOn:false,g:[0,0,0,0,0],bass:0,vol:100,comp:false};
var F=[60,250,1000,4000,12000],ctx=null,chains=new WeakMap(),list=[];
function build(el){
  if(chains.has(el))return;
  try{
    ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
    var src=ctx.createMediaElementSource(el),bass=ctx.createBiquadFilter();bass.type="lowshelf";bass.frequency.value=100;
    var eq=F.map(function(f,i){var b=ctx.createBiquadFilter();b.type=i==0?"lowshelf":i==4?"highshelf":"peaking";b.frequency.value=f;b.Q.value=1;return b});
    var comp=ctx.createDynamicsCompressor(),out=ctx.createGain();
    src.connect(bass);var p=bass;eq.forEach(function(b){p.connect(b);p=b});p.connect(comp);comp.connect(out);out.connect(ctx.destination);
    var c={bass:bass,eq:eq,comp:comp,out:out};chains.set(el,c);list.push(c);applySound(c);
    el.addEventListener("play",function(){ctx.resume()});
  }catch(e){}
}
function applySound(c){
  var on=S.sOn;
  c.bass.gain.value=on?S.bass:0;
  c.eq.forEach(function(b,i){b.gain.value=on?S.g[i]:0});
  c.out.gain.value=on?S.vol/100:1;
  if(on&&S.comp){c.comp.threshold.value=-30;c.comp.ratio.value=6}else{c.comp.threshold.value=0;c.comp.ratio.value=1}
}
function scan(){document.querySelectorAll("video,audio").forEach(build)}
function refresh(){applySat(S.sat);if(S.sOn)scan();list.forEach(applySound);if(ctx&&ctx.state==="suspended"&&S.sOn)ctx.resume().catch(function(){})}
chrome.storage.local.get(S,function(d){S=d;refresh()});
chrome.storage.onChanged.addListener(function(c){for(var k in c)S[k]=c[k].newValue;refresh()});
new MutationObserver(function(){if(S.sOn)scan()}).observe(document,{childList:true,subtree:true});
