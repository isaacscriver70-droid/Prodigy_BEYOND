// Hand-authored 2D illustration painter: consistent dark outline, 3-tone shading, soft ground shadows.
const Art=(()=>{
const OUT='#1c2b20',TAU=6.2832;
const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const cv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
function smooth(g,p){const n=p.length;g.beginPath();g.moveTo((p[n-1][0]+p[0][0])/2,(p[n-1][1]+p[0][1])/2);
 for(let i=0;i<n;i++){const a=p[i],b=p[(i+1)%n];g.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2)}g.closePath()}
function blob(g,x,y,r,rnd,n=10,sq=.88){const p=[];for(let i=0;i<n;i++){const a=i/n*TAU,k=r*(.85+rnd()*.3);p.push([x+Math.cos(a)*k,y+Math.sin(a)*k*sq])}smooth(g,p)}
function paint(g,fill,w=2.5){g.fillStyle=fill;g.fill();g.lineWidth=w;g.strokeStyle=OUT;g.lineJoin='round';g.stroke()}
function shadow(g,x,y,rx,ry,a=.28){g.fillStyle=`rgba(8,28,18,${a})`;g.beginPath();g.ellipse(x,y,rx,ry,0,0,TAU);g.fill()}
function rr(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,w,h,r)}
function lg(g,x0,y0,x1,y1,stops){const k=g.createLinearGradient(x0,y0,x1,y1);stops.forEach((s,i)=>k.addColorStop(i/(stops.length-1),s));return k}
const mk=(w,h,ax,ay,fn)=>{const c=cv(w,h),g=c.getContext('2d');fn(g);return{img:c,ax,ay}};

const PAL=[['#2d6a35','#47a043','#82d058','#c4ef86'],['#25684f','#3a9a6c','#72d496','#bdf5c4'],['#a24f1c','#d57a22','#f2ab3c','#ffdc7a']];
function tree(v){const r=rng(11+v*97);return mk(170,214,85,194,g=>{const P=PAL[v%3],fx=85,fy=194;
 shadow(g,fx+10,fy,56,15);
 g.beginPath();g.moveTo(fx-22,fy+3);g.quadraticCurveTo(fx-10,fy-14,fx-9,fy-64);g.lineTo(fx+9,fy-64);g.quadraticCurveTo(fx+10,fy-14,fx+22,fy+3);g.quadraticCurveTo(fx,fy+9,fx-22,fy+3);
 paint(g,lg(g,fx-16,0,fx+16,0,['#7c4e2c','#a2703f','#5b3821']));
 g.strokeStyle='rgba(48,26,12,.5)';g.lineWidth=1.6;for(let i=0;i<4;i++){const x=fx-6+i*4;g.beginPath();g.moveTo(x,fy-8-r()*10);g.lineTo(x+r()*3-1,fy-46-r()*10);g.stroke()}
 const tall=v===1,pu=[];const n=tall?8:9;
 for(let i=0;i<n;i++){const a=i/n*TAU+r()*.4;pu.push([fx+Math.cos(a)*(tall?30:50),fy-108+Math.sin(a)*(tall?52:30),19+r()*10])}
 pu.push([fx,fy-108,32],[fx-8,fy-122,24]);
 pu.forEach(p=>{blob(g,p[0],p[1],p[2],r);paint(g,P[0])});
 pu.forEach(p=>{blob(g,p[0]-3,p[1]-5,p[2]*.82,r);g.fillStyle=P[1];g.fill()});
 pu.forEach(p=>{blob(g,p[0]-6,p[1]-10,p[2]*.5,r,8);g.fillStyle=P[2];g.fill()});
 g.fillStyle=P[3];for(let i=0;i<34;i++){const a=r()*TAU,d=r()*48;g.beginPath();g.ellipse(fx-8+Math.cos(a)*d*1.2,fy-118+Math.sin(a)*d*(tall?1.4:.8),3,1.6,r()*3,0,TAU);g.fill()}
 })}
function bush(v){const r=rng(5+v*31);return mk(84,64,42,56,g=>{const c=v?['#2c7a4a','#4cb064','#8ae08a']:['#3b7f2e','#5fb540','#a2e068'];shadow(g,44,56,34,8);
 [[26,38,18],[56,38,19],[41,30,22],[40,42,17]].forEach(p=>{blob(g,p[0],p[1],p[2],r);paint(g,c[0])});
 [[24,35,13],[55,35,14],[40,26,16]].forEach(p=>{blob(g,p[0]-2,p[1]-3,p[2],r);g.fillStyle=c[1];g.fill()});
 g.fillStyle=c[2];for(let i=0;i<9;i++){g.beginPath();g.ellipse(26+r()*30,22+r()*12,3.5,2,r()*3,0,TAU);g.fill()}
 if(v){const f=['#ff7aa8','#fff2a0'];for(let i=0;i<7;i++){g.fillStyle=f[i%2];g.beginPath();g.arc(20+r()*44,26+r()*20,2.6,0,TAU);g.fill()}}})}
function rock(v){const r=rng(9+v*7);const s=v?1:.8;return mk(72,50,36,42,g=>{shadow(g,38,43,30*s+4,7);
 blob(g,36,28,22*s+6,r,8,.72);paint(g,lg(g,14,10,60,44,['#c2c6c9','#8d939a','#656b74']));
 g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=3;g.beginPath();g.arc(30,24,10,3.6,4.8);g.stroke();
 g.strokeStyle='rgba(30,36,44,.45)';g.lineWidth=1.6;g.beginPath();g.moveTo(40,26);g.lineTo(46,36);g.stroke();
 g.fillStyle='#6fae45';g.beginPath();g.ellipse(18,38,7,3,0,0,TAU);g.fill()})}
function flowers(v){const r=rng(77+v);const cols=[['#ff6f9c','#ffe08a'],['#8fb8ff','#fff'],['#ffb347','#fff3b0']][v%3];return mk(60,40,30,34,g=>{
 for(let i=0;i<9;i++){const x=8+r()*44,y=14+r()*18;g.strokeStyle='#3f8f3a';g.lineWidth=2;g.beginPath();g.moveTo(x,y+10);g.lineTo(x,y);g.stroke();
  g.fillStyle=cols[0];g.strokeStyle=OUT;g.lineWidth=1.2;for(let k=0;k<5;k++){const a=k/5*TAU;g.beginPath();g.ellipse(x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8,2.8,0,0,TAU);g.fill();g.stroke()}
  g.fillStyle=cols[1];g.beginPath();g.arc(x,y,2,0,TAU);g.fill()}})}
function fence(){return mk(74,56,37,52,g=>{shadow(g,37,52,34,5,.2);
 [8,37,66].forEach(x=>{rr(g,x-5,10,10,42,3);paint(g,lg(g,x-5,0,x+5,0,['#d9a766','#b57c3e']));g.beginPath();g.moveTo(x-5,12);g.lineTo(x,5);g.lineTo(x+5,12);paint(g,'#d9a766')});
 [22,36].forEach(y=>{rr(g,0,y,74,8,3);paint(g,lg(g,0,y,0,y+8,['#e9bd7c','#b98240']))})})}
function lamp(){return mk(44,120,22,112,g=>{shadow(g,22,112,14,4);rr(g,18,38,8,74,3);paint(g,'#3b3f4c');rr(g,12,102,20,10,3);paint(g,'#4a4f5e');
 g.beginPath();g.moveTo(10,34);g.lineTo(34,34);g.lineTo(30,10);g.lineTo(14,10);g.closePath();paint(g,lg(g,0,10,0,34,['#fff3a8','#ffc94a']));
 g.beginPath();g.moveTo(8,12);g.lineTo(22,0);g.lineTo(36,12);g.closePath();paint(g,'#3b3f4c');
 const h=g.createRadialGradient(22,22,2,22,22,26);h.addColorStop(0,'rgba(255,230,140,.5)');h.addColorStop(1,'rgba(255,230,140,0)');g.fillStyle=h;g.fillRect(-4,-4,52,52)})}
function sign(){return mk(70,84,35,78,g=>{shadow(g,36,78,18,4);rr(g,31,36,8,42,2);paint(g,'#9a6a3a');
 rr(g,6,8,58,34,6);paint(g,lg(g,0,8,0,42,['#e7bf7e','#c0894a']));g.strokeStyle='rgba(80,48,20,.45)';g.lineWidth=1.5;[18,26,34].forEach(y=>{g.beginPath();g.moveTo(12,y);g.lineTo(58,y);g.stroke()});
 g.fillStyle='#fff0c8';g.beginPath();g.arc(35,25,4,0,TAU);g.fill()})}

function cottage(){return mk(240,214,120,204,g=>{const r=rng(3);shadow(g,126,205,112,13,.3);
 rr(g,166,6,28,60,3);paint(g,lg(g,166,0,194,0,['#b6aca0','#8c8279']));g.fillStyle='rgba(60,50,45,.5)';for(let y=14;y<60;y+=11)g.fillRect(166,y,28,1.6);
 rr(g,28,100,184,104,4);paint(g,lg(g,0,100,0,204,['#f6e7c1','#dcc392']));
 g.save();rr(g,28,100,184,104,4);g.clip();g.strokeStyle='rgba(120,90,50,.28)';g.lineWidth=1;for(let x=40;x<212;x+=20){g.beginPath();g.moveTo(x,100);g.lineTo(x,204);g.stroke()}
 g.fillStyle=lg(g,0,180,0,204,['#a7a49b','#7a776f']);g.fillRect(28,182,184,22);g.strokeStyle='rgba(40,40,40,.45)';for(let y=182;y<204;y+=7){g.beginPath();g.moveTo(28,y);g.lineTo(212,y);g.stroke();for(let x=28+((y/7|0)%2)*9;x<212;x+=18){g.beginPath();g.moveTo(x,y);g.lineTo(x,y+7);g.stroke()}}g.restore();
 g.beginPath();g.moveTo(6,116);g.lineTo(234,116);g.lineTo(196,28);g.lineTo(44,28);g.closePath();
 const cols=['#b9472f','#cf5d3b','#a63b2b','#d96d45'];g.save();g.clip();g.fillStyle='#b9472f';g.fillRect(0,20,240,110);
 for(let row=0;row<7;row++)for(let x=-10+(row%2)*11;x<250;x+=22){rr(g,x,26+row*13,21,15,6);g.fillStyle=cols[(r()*4)|0];g.fill();g.lineWidth=1.3;g.strokeStyle='rgba(60,18,10,.7)';g.stroke()}
 g.fillStyle=lg(g,0,26,0,60,['rgba(255,230,180,.35)','rgba(255,230,180,0)']);g.fillRect(0,26,240,40);g.restore();
 g.beginPath();g.moveTo(6,116);g.lineTo(234,116);g.lineTo(196,28);g.lineTo(44,28);g.closePath();g.lineWidth=3;g.strokeStyle=OUT;g.stroke();
 g.fillStyle='rgba(50,24,16,.35)';g.fillRect(10,117,220,7);
 g.beginPath();g.moveTo(98,204);g.lineTo(98,152);g.quadraticCurveTo(120,126,142,152);g.lineTo(142,204);g.closePath();paint(g,lg(g,98,0,142,0,['#8a5530','#a8703c','#7a4826']));
 g.strokeStyle='rgba(50,26,12,.55)';g.lineWidth=1.5;[112,120,128].forEach(x=>{g.beginPath();g.moveTo(x,146);g.lineTo(x,204);g.stroke()});
 g.fillStyle='#ffd35a';g.beginPath();g.arc(133,178,3.2,0,TAU);g.fill();g.stroke();
 rr(g,90,201,60,7,3);paint(g,'#b5b0a4');
 [[44,134],[166,134]].forEach(([x,y])=>{rr(g,x,y,32,30,3);paint(g,lg(g,x,y,x+32,y+30,['#bfeaff','#5aa6dd']));g.strokeStyle='#7a4a28';g.lineWidth=3;g.beginPath();g.moveTo(x+16,y);g.lineTo(x+16,y+30);g.moveTo(x,y+15);g.lineTo(x+32,y+15);g.stroke();
  g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.moveTo(x+4,y+4);g.lineTo(x+11,y+4);g.lineTo(x+4,y+12);g.fill();
  rr(g,x-3,y+30,38,10,2);paint(g,'#8a5a30');['#ff6f9c','#ffe08a','#ff9a4a','#fff'].forEach((c,i)=>{g.fillStyle=c;g.beginPath();g.arc(x+5+i*8,y+29,3.4,0,TAU);g.fill();g.stroke()})})})}

function character(dir,f,pal){const c=cv(64,84),g=c.getContext('2d');g.translate(32,0);
 const side=dir==='left'||dir==='right';if(dir==='left')g.scale(-1,1);
 const st=[0,1,0,-1][f],bob=(f%2)?-2:0,L=side?st*8:0,legs=!side?st*5:0;
 shadow(g,0,78,17,6,.3);
 const leg=(x,dy)=>{rr(g,x-6,56+dy,12,19-dy*.3,5);paint(g,pal.pants);rr(g,x-7,68+dy*.6,14,9,4);paint(g,pal.boot)};
 if(side){leg(-4+L,0);leg(4-L,0)}else{leg(-8,legs);leg(8,-legs)}
 const ay=bob;
 if(!side){[[-20,1],[20,-1]].forEach(([x,s])=>{rr(g,x-5,38+ay+s*st*2,10,22,5);paint(g,pal.skin);rr(g,x-6,36+ay+s*st*2,12,12,5);paint(g,pal.shirt)})}
 rr(g,-15,34+ay,30,28,9);paint(g,lg(g,-15,34,15,62,[pal.shirt,pal.shirtD]));
 rr(g,-15,52+ay,30,6,2);paint(g,'#7a4a24');rr(g,-4,51+ay,8,8,2);paint(g,'#ffd35a',1.8);
 if(side){rr(g,-5,38+ay-st*2,11,22,5);paint(g,pal.skin);rr(g,-6,36+ay-st*2,13,12,5);paint(g,pal.shirt)}
 const hy=22+ay,hx=side?3:0;
 if(dir==='up'){g.beginPath();g.arc(0,hy,18,0,TAU);paint(g,pal.hair)}
 else{g.beginPath();g.arc(hx,hy,17,0,TAU);paint(g,pal.skin);
  if(side){g.beginPath();g.arc(hx-7,hy-2,16,0,TAU);paint(g,pal.hair);g.beginPath();g.arc(hx+3,hy+1,13,-1.2,1.6);g.fillStyle=pal.skin;g.fill();
   g.beginPath();g.ellipse(hx+8,hy+1,2.8,4,0,0,TAU);g.fillStyle='#1b1b2a';g.fill();g.fillStyle='#fff';g.fillRect(hx+8,hy-2,1.6,1.8);
   g.fillStyle='rgba(255,120,120,.35)';g.beginPath();g.ellipse(hx+8,hy+8,3.5,2.2,0,0,TAU);g.fill()}
  else{g.beginPath();g.moveTo(-18,hy-2);g.quadraticCurveTo(-18,hy-24,0,hy-24);g.quadraticCurveTo(18,hy-24,18,hy-2);g.quadraticCurveTo(10,hy-12,0,hy-10);g.quadraticCurveTo(-10,hy-12,-18,hy-2);paint(g,pal.hair);
   [-6.5,6.5].forEach(x=>{g.beginPath();g.ellipse(x,hy+3,3,4.4,0,0,TAU);g.fillStyle='#1b1b2a';g.fill();g.fillStyle='#fff';g.fillRect(x-1.4,hy,1.8,2)});
   g.fillStyle='rgba(255,120,120,.35)';[-11,11].forEach(x=>{g.beginPath();g.ellipse(x,hy+9,3.4,2.2,0,0,TAU);g.fill()});
   g.strokeStyle='#8a4a3a';g.lineWidth=1.6;g.beginPath();g.arc(0,hy+9,3,.2,2.9);g.stroke()}}
 return c}

function ground(W,H,paths,pond){const c=cv(W,H),g=c.getContext('2d'),r=rng(1234);
 const tiles=[0,1,2,3].map(v=>{const t=cv(128,128),k=t.getContext('2d'),q=rng(40+v);k.fillStyle=lg(k,0,0,128,128,['#72bd4c','#69b546']);k.fillRect(0,0,128,128);
  for(let i=0;i<150;i++){const x=6+q()*116,y=6+q()*116,h=4+q()*6;k.strokeStyle=['#4f9a3a','#8fd35e','#5eab40','#a6e06c'][(q()*4)|0];k.lineWidth=1.3;k.beginPath();k.moveTo(x,y);k.quadraticCurveTo(x+q()*4-2,y-h/2,x+q()*6-3,y-h);k.stroke()}return t});
 for(let y=0;y<H;y+=128)for(let x=0;x<W;x+=128)g.drawImage(tiles[(r()*4)|0],x,y);
 for(let i=0;i<260;i++){const x=r()*W,y=r()*H,R=60+r()*140,d=r()<.5,k=g.createRadialGradient(x,y,0,x,y,R);k.addColorStop(0,d?'rgba(40,110,50,.16)':'rgba(190,240,110,.16)');k.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=k;g.fillRect(x-R,y-R,R*2,R*2)}
 const P=(p)=>{g.beginPath();g.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length-1;i++)g.quadraticCurveTo(p[i][0],p[i][1],(p[i][0]+p[i+1][0])/2,(p[i][1]+p[i+1][1])/2);g.lineTo(p[p.length-1][0],p[p.length-1][1])};
 g.lineCap='round';g.lineJoin='round';
 paths.forEach(p=>{[[84,'#6e4f2c'],[74,'#9a7440'],[62,'#c5a063'],[44,'#d3b377']].forEach(([w,col])=>{g.strokeStyle=col;g.lineWidth=w;P(p);g.stroke()});
  for(let s=0;s<p.length-1;s++){const a=p[s],b=p[s+1],n=(Math.hypot(b[0]-a[0],b[1]-a[1])/6)|0;for(let i=0;i<n;i++){const t=r(),x=a[0]+(b[0]-a[0])*t+(r()-.5)*56,y=a[1]+(b[1]-a[1])*t+(r()-.5)*56;g.fillStyle=r()<.5?'rgba(110,80,40,.5)':'rgba(240,215,160,.6)';g.beginPath();g.ellipse(x,y,1+r()*2.5,1+r()*1.6,r()*3,0,TAU);g.fill()}
   for(let i=0;i<n/3;i++){const t=r(),side=r()<.5?-1:1,x=a[0]+(b[0]-a[0])*t+side*(40+r()*4),y=a[1]+(b[1]-a[1])*t;blob(g,x,y,3+r()*3,r,6,.7);paint(g,'#aaa59a',1.3)}}});
 const{x,y,rx,ry}=pond;
 blob(g,x,y,rx+22,r,14,ry/rx);g.fillStyle='#e6cf98';g.fill();
 blob(g,x,y,rx+8,r,14,ry/rx);g.fillStyle='#c9ad72';g.fill();
 blob(g,x,y,rx,r,14,ry/rx);
 const wg=g.createRadialGradient(x-30,y-20,8,x,y,rx);wg.addColorStop(0,'#8fe3f2');wg.addColorStop(.6,'#3fa7d6');wg.addColorStop(1,'#256fae');g.fillStyle=wg;g.fill();g.lineWidth=3;g.strokeStyle='#1d4f78';g.stroke();
 g.strokeStyle='rgba(255,255,255,.4)';g.lineWidth=2;for(let i=0;i<14;i++){const a=r()*TAU,d=r()*.7,px=x+Math.cos(a)*rx*d,py=y+Math.sin(a)*ry*d;g.beginPath();g.moveTo(px-9,py);g.quadraticCurveTo(px,py-3,px+9,py);g.stroke()}
 [[-60,18],[40,-24],[70,28],[-20,-34]].forEach(([dx,dy])=>{g.beginPath();g.ellipse(x+dx,y+dy,16,9,.2,0,TAU);paint(g,'#4fa845',2);g.fillStyle='#ff9ec4';g.beginPath();g.arc(x+dx+3,y+dy-2,3.2,0,TAU);g.fill()});
 return c}

return{rng,cv,tree,bush,rock,flowers,fence,lamp,sign,cottage,character,ground,shadow,paint,rr,lg,OUT}})();
