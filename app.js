(()=>{'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const WIDGETS=[
 {id:'distance',name:'Partner Distance',category:'essentials',icon:'↗',description:"The distance is just a number. Your connection isn't."},
 {id:'days',name:'Days Together',category:'essentials',icon:'♥',description:'A little reminder of every day in your story.'},
 {id:'counter',name:'Together Counter',category:'essentials',icon:'◷',description:'Every second together is part of your story.'},
 {id:'time',name:'Partner Time',category:'essentials',icon:'◴',description:'Know what time it is in their little corner of the world.'},
 {id:'weather',name:'Partner Weather',category:'essentials',icon:'☀',description:'A little glimpse of the day happening around them.'},
 {id:'visit',name:'Next Visit Countdown',category:'essentials',icon:'▣',description:'Count down to the next hello, hug and hello again.'},
 {id:'compass',name:'Love Compass',category:'relationship',icon:'⌖',description:'A little arrow pointing towards your favourite person.'},
 {id:'initials',name:'Initials',category:'relationship',icon:'♡',description:'Your initials together, even when you are apart.'},
 {id:'anniversary',name:'Anniversary',category:'relationship',icon:'✧',description:'The dates that make your story uniquely yours.'},
 {id:'heartbeat',name:'Heartbeat',category:'interactive',icon:'♥',description:'Send a little heartbeat to let them know you are thinking of them.',action:'Send a heartbeat ♥'},
 {id:'kiss',name:'Kiss',category:'interactive',icon:'❥',description:'A tiny digital kiss can go a very long way.',action:'Send a kiss ♡'},
 {id:'emoji',name:'Emoji',category:'interactive',icon:'☺',description:'When a single emoji says everything.',action:'Send an emoji ☺'}
];
const THEMES=['rose','lavender','sky','peach'];
let selected='distance',category='all',theme='rose',counts={heartbeat:0,kiss:0,emoji:0},gestureCount=0;
const options=$('#widgetOptions'),device=$('#previewDevice'),widgetPreview=$('#widgetPreview'),actionBtn=$('#previewAction');
const readStore=(k,f)=>{try{let v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}};
const saveStore=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
theme=readStore('lovelynk-theme','rose');if(!THEMES.includes(theme))theme='rose';counts={...counts,...readStore('lovelynk-demo-counts',{})};
const toast=$('#toast');let toastT;
function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('visible');clearTimeout(toastT);toastT=setTimeout(()=>toast.classList.remove('visible'),2850)}
function renderOptions(){options.replaceChildren();const filtered=WIDGETS.filter(w=>category==='all'||w.category===category);for(const w of filtered){const b=document.createElement('button');b.className='widget-option'+(selected===w.id?' selected':'');b.dataset.widget=w.id;b.type='button';b.setAttribute('aria-pressed',selected===w.id?'true':'false');b.innerHTML=`<span class="option-icon" aria-hidden="true">${w.icon}</span><span class="option-label">${w.name}</span>`;b.addEventListener('click',()=>{selected=w.id;renderOptions();renderPreview();if(window.matchMedia('(max-width: 960px)').matches){setTimeout(()=>$('.playground-preview').scrollIntoView({behavior:'smooth',block:'center'}),80)}});options.appendChild(b)}}
function widgetIcon(name){
 const paths={
  heart:'<path d="M20.8 4.6a5.6 5.6 0 0 0-7.9 0L12 5.5l-.9-.9a5.6 5.6 0 0 0-7.9 7.9L12 21l8.8-8.5a5.6 5.6 0 0 0 0-7.9Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  cloud:'<path d="M7 19a5 5 0 1 1 1.7-9.7A6.5 6.5 0 0 1 21 12.5a4.5 4.5 0 0 1-4.5 6.5H7Z"/><path d="M16 3v2M20 6l-1 1M11 3l1 2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h2M13 14h2M8 18h2"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 5-4.8 2 2.1-5Z"/>',
  pulse:'<path d="M2 12h4l2-5 4 10 2-5h3"/><path d="M20 11.5a2 2 0 0 1 0 3L17.5 17 15 14.5a2 2 0 0 1 2.8-2.8"/>',
  kiss:'<path d="M4 12c3-3 5-3 8-1 3-2 5-2 8 1-2 3-4 5-8 6-4-1-6-3-8-6Z"/><path d="M4 12c5 2 11 2 16 0"/>',
  weather:'<circle cx="16" cy="7" r="3"/><path d="M16 1v2M10 7H8M22 7h-2M20 3l-1.4 1.4"/><path d="M7 19a5 5 0 1 1 1-9.9A6 6 0 0 1 20 13a4 4 0 0 1-4 6H7Z"/>'
 };
 return `<svg class="pw-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.heart}</svg>`;
}
function markup(w){
 const brand='<div class="pw-brand"><span class="pw-brand-mark" aria-hidden="true">♥</span><span>LoveLynk</span></div>';
 let body='';
 switch(w.id){
 case 'distance': body=`<div class="pw-distance"><strong>Our distance: 1,136 km</strong><div class="pw-link"><span class="pw-person">J</span><span class="pw-connector"><i>♥</i></span><span class="pw-person">S</span></div></div>`;break;
 case 'days': body=`<div class="pw-horizontal">${widgetIcon('heart')}<div><strong class="pw-big-number">197</strong><span class="pw-text-small">days together</span></div></div>`;break;
 case 'counter': body=`<div class="pw-counter-design"><span class="pw-text-small">Together</span><div class="pw-digits"><b>1</b><b>9</b><b>7</b><small>days</small></div></div>`;break;
 case 'time': body=`<div class="pw-horizontal">${widgetIcon('clock')}<div><span class="pw-overline">London</span><strong class="pw-big-time">10:16 <small>PM</small></strong></div></div>`;break;
 case 'weather': body=`<div class="pw-horizontal">${widgetIcon('weather')}<div><span class="pw-overline">London</span><strong class="pw-big-time">11°C</strong></div></div>`;break;
 case 'visit': body=`<div class="pw-horizontal">${widgetIcon('calendar')}<div><span class="pw-overline">Next visit</span><strong class="pw-big-time">7 <small>days</small></strong></div></div>`;break;
 case 'compass': body=`<div class="pw-horizontal pw-compass">${widgetIcon('compass')}<div><span class="pw-text-small">Sarah is</span><strong class="pw-plain-strong">east of you</strong></div></div>`;break;
 case 'initials': body=`<div class="pw-couple-initials"><span class="pw-initial-heart">J</span><span class="pw-middle-heart">♥</span><span class="pw-initial-heart">S</span></div>`;break;
 case 'anniversary': body=`<div class="pw-horizontal">${widgetIcon('calendar')}<div><span class="pw-overline">Next anniversary</span><strong class="pw-big-time pw-date">26 Apr</strong></div></div>`;break;
 case 'heartbeat': body=`<div class="pw-horizontal">${widgetIcon('pulse')}<div><strong class="pw-big-number">${67+(counts.heartbeat||0)}</strong><span class="pw-text-small">heartbeats from partner*</span></div></div>`;break;
 case 'kiss': body=`<div class="pw-horizontal">${widgetIcon('kiss')}<div><strong class="pw-big-number">${4+(counts.kiss||0)}</strong><span class="pw-text-small">kisses from partner*</span></div></div>`;break;
 case 'emoji': body=`<div class="pw-horizontal"><span class="pw-emoji-glyph">🥰</span><div><strong class="pw-plain-strong">Sent from partner*</strong><span class="pw-text-small">${counts.emoji?`${counts.emoji} demo reply${counts.emoji===1?'':'s'} sent`:'A little love for you'}</span></div></div>`;break;
 default:body='<strong class="pw-plain-strong">LoveLynk</strong>';
 }
 return brand+`<div class="pw-content pw-content-${w.id}">${body}</div>`;
}
function renderPreview(){const w=WIDGETS.find(w=>w.id===selected);$('#previewTitle').textContent=w.name;const interactive=w.category==='interactive';actionBtn.parentElement.hidden=!interactive;actionBtn.hidden=!interactive;if(interactive)actionBtn.querySelector('.ll-cta-label').textContent=w.action;device.className='preview-device theme-'+theme;widgetPreview.innerHTML=markup(w);device.setAttribute('aria-label',w.name+' Lock Screen concept preview');$$('.swatch').forEach(b=>{const active=b.dataset.theme===theme;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active?'true':'false')});}
function send(w){counts[w.id]=(counts[w.id]||0)+1;saveStore('lovelynk-demo-counts',counts);renderPreview();const names={heartbeat:'heartbeat',kiss:'kiss',emoji:'emoji'};showToast(`Demo ${names[w.id]} sent ♥`);widgetPreview.animate?.([{transform:'scale(1)'},{transform:'scale(1.065)'},{transform:'scale(1)'}],{duration:330,easing:'ease-out'})}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;$$('.filter').forEach(v=>v.classList.toggle('active',v===b));if(category!=='all'&&WIDGETS.find(w=>w.id===selected)?.category!==category)selected=WIDGETS.find(w=>w.category===category).id;renderOptions();renderPreview()}));
$$('.swatch').forEach(b=>b.addEventListener('click',()=>{theme=b.dataset.theme;saveStore('lovelynk-theme',theme);renderPreview()}));
actionBtn?.addEventListener('click',()=>{const w=WIDGETS.find(w=>w.id===selected);if(w?.category==='interactive')send(w)});
renderOptions();renderPreview();
$('#gestureDemo')?.addEventListener('click',()=>{gestureCount++;const b=$('#gestureDemo');b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');$('#gestureDemoLabel').textContent=gestureCount===1?'A little love sent ♥':`${gestureCount} little hearts sent ♥`;showToast('A little heart, sent with love')});
const menuToggle=$('#menuToggle'),mobileMenu=$('#mobileMenu');function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu')}menuToggle?.addEventListener('click',()=>{const willOpen=mobileMenu.hidden;mobileMenu.hidden=!willOpen;menuToggle.setAttribute('aria-expanded',String(willOpen));menuToggle.setAttribute('aria-label',willOpen?'Close menu':'Open menu')});$$('#mobileMenu a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
function choosePlan(plan){$$('.plan-toggle').forEach(b=>{let active=b.dataset.plan===plan;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});const annual=plan==='annual';$('#priceNumber').textContent=annual?'19.99':'4.99';$('#priceUnit').textContent=annual?'/ year':'/ month';$('#priceDescription').textContent=annual?'Just £1.67 a month for both of you.':'Just £4.99 a month for both of you.';$('#perPerson').textContent=annual?'£0.83':'£2.50';try{localStorage.setItem('lovelynk-plan',plan)}catch{}}$$('.plan-toggle').forEach(b=>b.addEventListener('click',()=>choosePlan(b.dataset.plan)));choosePlan((()=>{try{return localStorage.getItem('lovelynk-plan')}catch{return 'annual'}})()==='monthly'?'monthly':'annual');
$$('#faqList details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('#faqList details').filter(other=>other!==d).forEach(other=>other.open=false)}));
$('#copyrightYear').textContent=new Date().getFullYear();
// Store destinations are configured in store-links.js. Never invent listing URLs.
const links=window.LOVELYNK_STORE_URLS||{},storeModal=$('#storeModal');
let lastStoreTrigger=null;
const validStoreUrl=(url,platform)=>{
 if(!url||typeof url!=='string')return false;
 try{const u=new URL(url);return u.protocol==='https:'&&(platform==='ios'?u.hostname==='apps.apple.com':u.hostname==='play.google.com')}
 catch{return false}
};
function openStore(platform,trigger){
 const url=links[platform];
 if(validStoreUrl(url,platform)) {window.location.assign(url);return}
 lastStoreTrigger=trigger||null;
 const title=$('#storeModalTitle'),description=$('#storeModalDescription');
 title.textContent=platform==='ios'?'LoveLynk for iPhone':'LoveLynk for Android';
 description.textContent=`The ${platform==='ios'?'App Store':'Google Play'} listing hasn't been connected to this website preview yet. Add the official listing URL to store-links.js before publishing.`;
 storeModal.hidden=false;document.body.classList.add('modal-open');$('#storeModalClose').focus();
}
function closeStore(){storeModal.hidden=true;document.body.classList.remove('modal-open');lastStoreTrigger?.focus()}
$$('[data-store]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openStore(a.dataset.store,a)}));
$$('[data-modal-close]').forEach(b=>b.addEventListener('click',closeStore));$('#storeModalClose')?.addEventListener('click',closeStore);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!storeModal.hidden)closeStore()});

})();




// Build 1.4 — a lightweight, keyboard-accessible interaction in step three.
(() => {
  const button=document.getElementById('journeySendHeart');
  const scene=document.querySelector('.journey-scene-connected');
  const status=document.getElementById('journeyHeartStatus');
  if(!button||!scene||!status)return;
  let count=0;
  button.addEventListener('click',()=>{
    count++;
    scene.classList.remove('is-sending');
    void scene.offsetWidth;
    scene.classList.add('is-sending');
    status.textContent=count===1?'A little love sent ♥':`${count} little hearts sent ♥`;
  });
  scene.addEventListener('animationend',()=>scene.classList.remove('is-sending'));
})();
