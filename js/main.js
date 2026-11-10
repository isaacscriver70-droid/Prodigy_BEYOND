const cvs=document.getElementById('game'),g=cvs.getContext('2d'),keys={};
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=1;if(e.key.startsWith('Arrow'))e.preventDefault()});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
let zoom=1,cam={x:Player.x,y:Player.y};
function resize(){const d=devicePixelRatio||1;cvs.width=innerWidth*d;cvs.height=innerHeight*d;zoom=Math.max(.7,innerHeight/720)*d}resize();addEventListener('resize',resize);
const leaves=Array.from({length:22},()=>({x:Math.random(),y:Math.random(),s:.4+Math.random()}));
let last=performance.now(),time=0;
function frame(now){const dt=Math.max(0,Math.min(.05,(now-last)/1000));last=now;time+=dt;
 const ix=(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),iy=(keys.s||keys.arrowdown?1:0)-(keys.w||keys.arrowup?1:0);
 Player.update(dt,ix,iy);
 const vw=cvs.width/zoom,vh=cvs.height/zoom;cam.x+=(Player.x-cam.x)*Math.min(1,dt*6);cam.y+=(Player.y-60-cam.y)*Math.min(1,dt*6);
 const cx=Math.max(0,Math.min(World.W-vw,cam.x-vw/2)),cy=Math.max(0,Math.min(World.H-vh,cam.y-vh/2));
 g.setTransform(zoom,0,0,zoom,-cx*zoom,-cy*zoom);g.fillStyle='#2f6b34';g.fillRect(cx-5,cy-5,vw+10,vh+10);
 g.drawImage(World.ground,0,0);
 const pd=World.pond;g.save();g.beginPath();g.ellipse(pd.x,pd.y,pd.rx*.95,pd.ry*.95,0,0,7);g.clip();g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=2;
 for(let i=0;i<6;i++){const ph=(time*.5+i/6)%1,R=ph*70;g.globalAlpha=1-ph;g.beginPath();g.ellipse(pd.x-40+i*28,pd.y-20+(i%3)*22,R,R*.5,0,0,7);g.stroke()}g.restore();g.globalAlpha=1;
 const dr=[];for(const o of World.objs)if(o.x>cx-150&&o.x<cx+vw+150&&o.y>cy&&o.y<cy+vh+260)dr.push(o);dr.push({y:Player.y,p:1});dr.sort((a,b)=>a.y-b.y);
 for(const o of dr){if(o.p){Player.draw(g);continue}
  g.save();g.translate(o.x,o.y);if(o.flip)g.scale(-1,1);if(o.sway)g.transform(1,0,Math.sin(time*1.3+o.x*.01)*.014,1,0,0);g.drawImage(o.s.img,-o.s.ax,-o.s.ay);g.restore()}
 g.setTransform(1,0,0,1,0,0);g.fillStyle='rgba(255,240,150,.55)';
 for(const l of leaves){const x=((l.x+time*.02*l.s)%1)*cvs.width,y=((l.y+time*.03*l.s)%1)*cvs.height;g.save();g.translate(x,y);g.rotate(time*l.s+l.x*9);g.beginPath();g.ellipse(0,0,4*zoom,2*zoom,0,0,7);g.fill();g.restore()}
 const v=g.createRadialGradient(cvs.width/2,cvs.height/2,cvs.height*.45,cvs.width/2,cvs.height/2,cvs.height*.95);v.addColorStop(0,'rgba(10,30,20,0)');v.addColorStop(1,'rgba(10,30,20,.38)');g.fillStyle=v;g.fillRect(0,0,cvs.width,cvs.height);
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
