// Region 1: Willowbrook Meadow. Handcrafted layout; scatter uses seeded rng with rejection so nothing clips paths/pond/cottage.
const World=(()=>{
const W=2400,H=1800,r=Art.rng(2026);
const paths=[[[1200,1830],[1200,1500],[1170,1220],[1240,1000],[1240,790]],[[1190,1260],[940,1230],[760,1170]]];
const pond={x:600,y:1000,rx:150,ry:92},home={x:1240,y:760};
const objs=[],S={};
const spr=(k,n,fn)=>{for(let i=0;i<n;i++)S[k+i]=fn(i)};
spr('tree',3,Art.tree);spr('bush',2,Art.bush);spr('rock',2,Art.rock);spr('fl',3,Art.flowers);
S.fence=Art.fence();S.lamp=Art.lamp();S.sign=Art.sign();S.cottage=Art.cottage();
function dPath(x,y){let m=1e9;for(const p of paths)for(let i=0;i<p.length-1;i++){const[a,b]=[p[i],p[i+1]],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/(dx*dx+dy*dy)));m=Math.min(m,Math.hypot(x-a[0]-t*dx,y-a[1]-t*dy))}return m}
const free=(x,y,pad)=>dPath(x,y)>pad&&(((x-pond.x)/(pond.rx+pad))**2+((y-pond.y)/(pond.ry+pad))**2)>1&&!(Math.abs(x-home.x)<190&&y>home.y-140&&y<home.y+90);
function add(k,x,y,col,flip,sway){objs.push({k,s:S[k],x,y,col,flip,sway})}
const T=(x,y)=>add('tree'+((r()*3)|0),x,y,[-14,-9,28,14],r()<.5,true);
for(let x=40;x<W;x+=105){[100+r()*60,H-60-r()*40].forEach(y=>{const px=x+r()*30;if(free(px,y,60))T(px,y)})}
for(let y=240;y<H-100;y+=110){[50+r()*40,W-50-r()*40].forEach(x=>{const py=y+r()*30;if(free(x,py,60))T(x,py)})}
for(let i=0,n=0;n<28&&i<600;i++){const x=150+r()*(W-300),y=260+r()*(H-520);if(free(x,y,120)){T(x,y);n++}}
for(let i=0,n=0;n<26&&i<800;i++){const x=120+r()*(W-240),y=200+r()*(H-400);if(free(x,y,55)){add('bush'+(r()<.5?0:1),x,y,[-24,-10,48,12],r()<.5);n++}}
for(let i=0,n=0;n<40&&i<900;i++){const x=100+r()*(W-200),y=200+r()*(H-400);if(free(x,y,40)){add('fl'+((r()*3)|0),x,y,null,r()<.5);n++}}
for(let i=0,n=0;n<10&&i<500;i++){const x=120+r()*(W-240),y=200+r()*(H-400);if(free(x,y,60)){add('rock'+(r()<.5?0:1),x,y,[-22,-8,44,12],r()<.5);n++}}
add('cottage',home.x,home.y,[-90,-100,180,100]);
for(let i=0;i<5;i++){add('fence',home.x-300+i*62,home.y+40,[-37,-12,74,12]);add('fence',home.x+130+i*62,home.y+40,[-37,-12,74,12])}
[[1150,1420],[1290,1420],[1140,1120],[1300,1040],[860,1215]].forEach(([x,y])=>add('lamp',x,y,[-6,-6,12,8]));
add('sign',1150,1330,[-10,-8,20,8]);add('sign',840,1100,[-10,-8,20,8]);
const ground=Art.ground(W,H,paths,pond);
objs.sort((a,b)=>a.y-b.y);
function blocked(x,y){if(x<30||x>W-30||y<120||y>H-30)return true;const bx=x-9,by=y-8;
 if(((x-pond.x)/(pond.rx*.86))**2+((y-pond.y)/(pond.ry*.8))**2<1)return true;
 for(const o of objs){const c=o.col;if(c&&bx<o.x+c[0]+c[2]&&bx+18>o.x+c[0]&&by<o.y+c[1]+c[3]&&by+8>o.y+c[1])return true}return false}
return{W,H,ground,objs,pond,blocked,start:{x:1200,y:1640}}})();
