/* ====== EDIT THIS PART ====== */
const CONFIG = {
  title: "Our Sky",
  subtitle: "Every moment with you is a star I never want to lose.",
  startDate: "2026-02-10T11:00:00",           // the day your story began
  letterTitle: "For you",
  letter: [
    "Thank you for every laugh, every late call, every ordinary day that turned into something special.",
    "I don’t know what the next stars will be, but I want to find them with you."
  ],
  footer: "Made with love, by Ghaith"
};
// x,y = star position (% of the sky). photo = path to your image, e.g. "img/first-date.jpg" (leave "" for a placeholder)
const MOMENTS = [
  {x:10,y:62,label:"Hello",date:"January 15, 2026",title:"Our first meet",text:"netfakir kifeh jit 7theya awl marra wa9tha 3andi dvr BD kmlt dvr jitik nejri toul rwhna r9adna ba7dha b3athna dasina b3athna i felt a lot of things inside my heart. wa9tha i decided that u'll be mine. Ba3d tlamina r9Adna lkolna fard blasa louta we had a lot of unforgettable things, our first kiss was so random but i love it, our first sexual activity, and ur first orgasm with me, habithom moment moment bil sweet talks li hkinehom. Nhbk💖", photo:"", video:"img/Hello.mp4"},
  {x:26,y:28,label:"Love",date:"February 10, 2026",title:"The Start of an infinit love",text:"i remember that days as it if today i was riding to Mahdia and i didnt told u that i'm coming i kept tellingu that i cant come  meanwhile i was on my way to u. My idea was i go confess my love ask her to me my gf if she refused i go back home, crazy right? that day the first thing i spoke about was my feelings to u.( ur answer was so stuped btw and funny u told me mmmmm idk ask maissa)", photo:"", video:"img_s/Love.mp4"},
  {x:42,y:68,label:"Trip",date:"January 19, 2026",title:"That unforgettable trip",text:"Habtitna il soussa kenit ba3d kathir mil to9ra9 but it happens thank to god and we had a lot of fun tgthr. Since it was our first trip together i was so happy and excited, we were jumping around next to me laughing, smiling enjoying the moments. mchina dorna l3abna billard w 3malna 9hewi mahlehom. R9adna mab3athna 3malna hajet ferhan bihom fou9 matetswr. AS i said -unforgettable trip-. i had the best night ever with you i enjoyed talking to u listening to u. Damn i wanna marry u <3", photo:"", video:"img_s/Trip.mp4"},
  {x:58,y:30,label:"Laughing",date:"Random days",title:"The day we laughed until we cried",text:"Netfakr nhar fil nebil li 93adna fil cafiement rkichna nsawro bil snap w nhoto fil filtrowet. d7akna barcha w netfakr zeda machyetna lil bhar dh7akna fihom i'm always laughing with u i was always faking my laugh to people but not u cz u make my heart and soul laughs too. hhahahahahah w tfkrt nhar li enty t7Asr fil salta3onet i was so fucking happy seeing u acting childich with me.", photo:"", video:"img_s/Laughs.mp4"},
  {x:74,y:64,label:"Celebration",date:"Our parties",title:"Our best moments partying",text:"awl party 3mlneha mab3athna mchina pinchos chikhna 3mlna jaw chta7 dh7akna i was admiring how sexy u were i was stunished by r beauty.3wedna mchina ekhir marra shih hazart 3lik chwaya fil labsa w hazit khechmi but it was the best day we had together we had a lot of fun brsmi 3mlt jaw wa9afna hakim w maissa khefit, w rakchetna 3al bhar w dhhakna 9Adeh ma7leh nhar athaka. ", photo:"", video:"img_s/Party.mp4"},
  {x:90,y:26,label:"Next",date:"Soon",title:"Our next chapter",text:"A promise, that i will maryy u and live a good life tgthr. We will have our children, our home and our private place. I wish if u stay with me for the rest of my life. Together For Ever sweet love 💖🥹.", photo:"", video:"img/Family.mp4"}
];
/* ============================ */

const $ = id => document.getElementById(id);
document.title = CONFIG.title;
$("title").textContent = CONFIG.title; $("sub").textContent = CONFIG.subtitle;
$("lTitle").textContent = CONFIG.letterTitle; $("foot").textContent = CONFIG.footer;
$("lBody").innerHTML = CONFIG.letter.map(t => t).join("</p><p>");

// counter
const start = new Date(CONFIG.startDate).getTime();
function tick(){
  let diff = Math.max(0, Date.now() - start) / 1000;
  $("d").textContent = Math.floor(diff/86400);
  $("h").textContent = Math.floor(diff%86400/3600);
  $("m").textContent = Math.floor(diff%3600/60);
  $("s").textContent = Math.floor(diff%60);
}
tick(); setInterval(tick, 1000);

// constellation
const sky = $("sky");
$("line").setAttribute("points", MOMENTS.map(m => m.x+","+m.y).join(" "));
const stars = MOMENTS.map((m,i) => {
  const b = document.createElement("button");
  b.className = "star"; b.style.left = m.x+"%"; b.style.top = m.y+"%";
  b.setAttribute("aria-label", m.title);
  b.innerHTML = "<i>"+m.label+"</i>";
  b.onclick = () => show(i);
  sky.appendChild(b); return b;
});
function show(i){
  const m = MOMENTS[i];
  stars.forEach((s,j) => s.classList.toggle("on", i===j));
  $("cDate").textContent = m.date; $("cTitle").textContent = m.title; $("cText").textContent = m.text;
  const p = $("photo"); p.innerHTML = "";
   if (m.video){
    const v = document.createElement("video");
    v.src = m.video; v.autoplay = true; v.loop = true; v.muted = true; v.playsInline = true;
    if (m.photo) v.poster = m.photo;   // optional cover while the video loads
    p.appendChild(v);
    v.play().catch(() => {});
  } else if (m.photo){
    const im = new Image(); im.src = m.photo; im.alt = m.title; p.appendChild(im);
  } else p.textContent = "Your photo or video goes here";
}
show(0);

// background stars
const cv = $("bg"), cx = cv.getContext("2d"); let pts = [];
function size(){
  cv.width = innerWidth; cv.height = innerHeight;
  pts = Array.from({length: Math.round(innerWidth*innerHeight/9000)}, () => ({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.3+.2,p:Math.random()*6}));
  draw(0);
}
function draw(t){
  cx.clearRect(0,0,cv.width,cv.height);
  for (const s of pts){ cx.globalAlpha = .35 + .35*Math.sin(t/1500 + s.p); cx.fillStyle = "#fff"; cx.beginPath(); cx.arc(s.x,s.y,s.r,0,7); cx.fill(); }
}
addEventListener("resize", size); size();
if (!matchMedia("(prefers-reduced-motion: reduce)").matches){ (function loop(t){ draw(t); requestAnimationFrame(loop); })(0); }
