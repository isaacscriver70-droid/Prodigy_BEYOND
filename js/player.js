const Player=(()=>{
const pal={skin:'#f5cfa6',hair:'#5a3320',shirt:'#4a78e0',shirtD:'#2f55b8',pants:'#4b3f6b',boot:'#6b4226'};
const flip=c=>{const n=Art.cv(64,84),g=n.getContext('2d');g.translate(64,0);g.scale(-1,1);g.drawImage(c,0,0);return n};
const spr={down:[0,1,2,3].map(f=>Art.character('down',f,pal)),up:[0,1,2,3].map(f=>Art.character('up',f,pal)),left:[0,1,2,3].map(f=>Art.character('left',f,pal))};
spr.right=spr.left.map(flip);
const p={x:World.start.x,y:World.start.y,dir:'up',t:0,moving:false};
p.update=(dt,ix,iy)=>{p.moving=!!(ix||iy);if(!p.moving){p.t=0;return}
 const l=Math.hypot(ix,iy),sp=185*dt;ix=ix/l*sp;iy=iy/l*sp;
 if(Math.abs(ix)>Math.abs(iy)||!iy)p.dir=ix<0?'left':'right';else p.dir=iy<0?'up':'down';
 if(ix&&!World.blocked(p.x+ix,p.y))p.x+=ix;if(iy&&!World.blocked(p.x,p.y+iy))p.y+=iy;p.t+=dt*9};
p.draw=g=>{g.drawImage(spr[p.dir][p.moving?(p.t|0)%4:0],p.x-32,p.y-78)};
return p})();
