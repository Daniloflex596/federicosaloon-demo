import{F as Ye,w as K,I as lt,P as ct,M as je,S as ut,E as dt,V as B,C as $e,T as vt,G as X,a as D,b as pt,c as mt,d as Pe,h as ft,A as gt,i as ne,j as ht,k as wt,e as xt,l as Je,m as yt,f as Se,n as Xe,o as Ke,q as bt,p as Re,R as Qe,y as Mt,r as Tt,s as Ze,t as St,J as Rt,z as et,u as At,v as Pt}from"./three.module.BCv813u3.js";import{t as Ct,p as Et,a as Gt,b as fe,d as _t,I as Ut,g as Ft}from"./v28.astro_astro_type_script_index_0_lang.YA-i9COI.js";import{R as It}from"./RoomEnvironment.HZ5sevbQ.js";import"./neon-paths.B4VCQnq5.js";import"./lenis.CciUKl-_.js";function tt({stations:t,aspect:f=1}={}){if(!Array.isArray(t)||t.length<2)throw new Error("createCameraRig: servono almeno 2 stations { p:[x,y,z], l:[x,y,z] }");const o=new Ye(t.map(n=>new K(n.p[0],n.p[1],n.p[2])),!1,"catmullrom",.4),r=new Ye(t.map(n=>new K(n.l[0],n.l[1],n.l[2])),!1,"catmullrom",.4),a=new K,p=new K;function g(n,l){const d=l<0?0:l>1?1:l;o.getPoint(d,a),r.getPoint(d,p),n.position.copy(a),n.lookAt(p)}function T(n,l=.94){return 1-Math.pow(l,Math.min(n,.25)*60)}function R(n){return n<.8?64:55}function M(n,l){n.aspect=l,n.fov=R(l),n.updateProjectionMatrix()}return{posCurve:o,lookCurve:r,applyCamera:g,dampFactor:T,fovForAspect:R,onResize:M,initialAspect:f,stations:t}}const zt=[.06,.18,.35,.55,.75,.95];function Lt(t,f,o,r,a=zt){for(const p of a)r(o,p),t.render(f,o);r(o,0)}function Vt({renderer:t,scene:f,camera:o,applyCamera:r,getTargetT:a,onFrame:p,damping:g=.94,microLife:T=0,startT:R=0}={}){const M=new lt;let n=R,l=!1,d=0;function S(){if(!l||(d=requestAnimationFrame(S),typeof document<"u"&&document.hidden))return;const H=M.getDelta(),N=Math.min(H,.05),w=M.elapsedTime,k=a?a():0,G=1-Math.pow(g,Math.min(H,.25)*60);n+=(k-n)*G,r(o,n),T&&(o.position.y+=Math.sin(w*.8)*T),p&&p({dt:N,time:w,renderT:n}),t.render(f,o)}return{start(){l||(l=!0,M.getDelta(),S())},stop(){l=!1,d&&cancelAnimationFrame(d),d=0},dispose(){l=!1,d&&cancelAnimationFrame(d),d=0},getRenderT(){return n}}}const ot=4,Wt=3.3;function Dt(t,f){const o=new ct(t),r=o.fromScene(new It,.04).texture;o.dispose();const a=new je({color:14263886,metalness:1,roughness:.26,envMap:r,envMapIntensity:1.05}),p=new je({color:15254654,metalness:1,roughness:.13,envMap:r,envMapIntensity:1.05}),g=new ut;g.moveTo(-.46,-.05),g.quadraticCurveTo(-.47,.1,-.2,.105),g.quadraticCurveTo(.95,.14,2.06,.014),g.lineTo(2.09,-.004),g.quadraticCurveTo(1,-.03,-.14,-.06),g.quadraticCurveTo(-.36,-.1,-.46,-.05),g.closePath();const T=new dt(g,{depth:.05,bevelEnabled:!0,bevelThickness:.022,bevelSize:.03,bevelSegments:5,curveSegments:40}),R=new B(-.98,-.44),M=new B(R.x+.12,R.y),n=M.length()-.24,l=new $e(.085,n,8,18),d=new vt(.215,.076,24,64),S=new $e(.03,.26,4,10);function H(P){const h=new X,c=new D(T,p);c.position.z=-.025;const C=new D(l,a),E=Math.atan2(M.y,M.x);C.position.set(-.12+M.x*.47,M.y*.47,0),C.rotation.z=E-Math.PI/2;const U=new D(d,a);return U.position.set(R.x,R.y,0),h.add(c,C,U),h}const N=new X,w=new X,k=H(),G=H();G.rotation.x=Math.PI,G.position.z=.1,N.add(k),w.add(G);const Y=new D(new pt(.085,.085,.2,32),a);Y.rotation.x=Math.PI/2,Y.position.z=.025;const m=new X;m.add(N,w,Y),m.position.x=-.45;const _=new X;_.add(m);const A=new X;A.add(_);const L=new mt(16766362,6,12,2);L.position.set(.6,2.2,1.6),A.add(L),f.add(A);let O=1;return{place(P,h,c,C){const E=ot*Math.tan(Pe.degToRad(P.fov/2)),U=E*P.aspect,j=h.left+h.width/2,ie=h.top+h.height/2;A.position.set((j/c*2-1)*U,(1-ie/C*2)*E,-ot);const x=h.width/c*2*U,re=h.height/C*2*E;O=Math.min(x/(Wt*1.06),re/1.85)},update(P,h){if(A.visible=h>.01,!A.visible)return;const c=Math.min(1,P/1.6),C=1-Math.pow(1-c,3);A.scale.setScalar(O*h*(.6+.4*C)),_.rotation.set(.42+Math.sin(P*.42)*.1,(1-C)*Math.PI*1.5+Math.sin(P*.55)*.6,.26);const E=P%2.4/.34,j=.27-.23*(E<1?Math.sin(Math.PI*E):0);N.rotation.z=j/2,w.rotation.z=-j/2},dispose(){f.remove(A),T.dispose(),l.dispose(),d.dispose(),S.dispose(),a.dispose(),p.dispose(),r.dispose()}}}const ae=7,z=3.4,q=-14,W=1.62,Ce=16,nt=Ce*(1230/1080),ge=t=>t<0?0:t>1?1:t,at=t=>t*t*(3-2*t),Ht=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Nt=`
varying vec2 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,kt=`
uniform sampler2D uTex;
uniform sampler2D uGlow;
uniform vec4 uGlowRect;
uniform vec2 uTile;
uniform vec2 uTileOrigin;
uniform float uIgnite;
uniform float uHum;
uniform float uTime;
uniform float uSweepY;
uniform float uSweepAmt;
uniform vec2 uPointer;
uniform float uPointerAmt;
uniform vec3 uMirror;
uniform vec2 uRes;
varying vec2 vWorld;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 w = vWorld;
  vec3 alb = texture2D(uTex, (w - uTileOrigin) / uTile).rgb; // già lineare (texture sRGB)
  alb = pow(alb, vec3(1.18)) * 1.12; // marmo lucidato: neri più profondi, venature nette
  float lum = dot(alb, vec3(0.299, 0.587, 0.114));
  float vena = smoothstep(0.10, 0.45, lum);

  // Portoro: le venature sono oro/crema, non bianche → si scaldano e si abbassano
  vec3 goldVein = alb * vec3(1.0, 0.80, 0.52);
  alb = mix(alb, goldVein, 0.55 * vena);
  alb *= mix(0.55, 1.0, 1.0 - vena * 0.35);

  // stanza in penombra: luce ambiente minima
  vec3 col = alb * 0.04;

  // luce dall'alto (strip LED a soffitto): cala scendendo lungo il muro
  float key = exp(-max(0.0, NEON_TOP - w.y) * 0.22);
  col += alb * key * 0.06;

  // l'insegna illumina il marmo (maschera sfocata dei tubi accesi)
  vec2 gUv = (w - uGlowRect.xy) / uGlowRect.zw;
  float g = 0.0;
  if (gUv.x > 0.0 && gUv.x < 1.0 && gUv.y > 0.0 && gUv.y < 1.0) g = texture2D(uGlow, gUv).r;
  vec3 neonCol = vec3(1.0, 0.72, 0.38);
  // velo scuro DIETRO le lettere (le venature non devono attraversare la scritta)
  float halo = smoothstep(0.01, 0.32, g);
  col *= 1.0 - 0.72 * halo * uIgnite;
  // la luce dell'insegna sul marmo: presente, ma non deve bruciare le venature
  col += alb * neonCol * g * 0.85 * uIgnite * uHum;
  col += neonCol * g * g * 0.02 * uIgnite;

  // la luce che corre nelle vene durante la discesa
  float band = exp(-pow((w.y - uSweepY) / 1.15, 2.0));
  col += alb * vena * band * uSweepAmt * vec3(1.0, 0.80, 0.50) * 0.75;

  // riflesso morbido che segue il puntatore (marmo lucidato)
  float d = length(w - uPointer);
  col += (alb * 0.22 + 0.006) * exp(-d * d / 1.6) * uPointerAmt * vec3(1.0, 0.88, 0.72);

  // ombra portata dello specchio sul muro
  vec2 mo = w - (uMirror.xy + vec2(0.0, -0.10));
  float md = length(mo);
  col *= 1.0 - 0.62 * smoothstep(uMirror.z + 0.75, uMirror.z + 0.02, md);

  // vignetta + grana fotografica
  vec2 sp = gl_FragCoord.xy / uRes;
  float vig = smoothstep(1.05, 0.28, length((sp - 0.5) * vec2(1.2, 1.0)));
  col *= mix(0.35, 1.0, vig);
  col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.012;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Ot=`
uniform sampler2D uVideo;
uniform sampler2D uPoster;
uniform sampler2D uMarble;
uniform sampler2D uGlowTex;
uniform sampler2D uNeonTex;
uniform float uHasVideo;
uniform float uVideoAspect;
uniform float uTime;
uniform float uLight;
uniform float uReveal;
uniform float uIgnite;
varying vec2 vUv;
void main() {
  vec2 c = vUv - 0.5;
  float r = length(c) * 2.0;
  // "cover" quadrato dentro un video verticale, centrato poco sopra la metà (i volti)
  vec2 uv = vec2(vUv.x, 0.5 + (vUv.y - 0.5) * uVideoAspect + 0.06 * (1.0 - uVideoAspect));
  vec3 v = mix(texture2D(uPoster, uv).rgb, texture2D(uVideo, uv).rgb, uHasVideo);
  v *= uLight;
  // PRIMA del reel il vetro riflette la stanza: marmo scuro e l'insegna, rovesciata
  // (nel film v2a lo specchio era un disco nero: leggeva «vuoto», non «vetro»)
  vec3 alb = texture2D(uMarble, vUv * 0.42 + vec2(0.31, 0.22) + vec2(uTime * 0.002, 0.0)).rgb;
  vec3 refl = pow(alb, vec3(1.35)) * vec3(0.30, 0.27, 0.22);
  vec2 g = vec2(1.0 - (vUv.x * 1.18 - 0.09), (vUv.y - 0.36) * 2.1);
  float inside = step(0.0, g.y) * step(g.y, 1.0);
  float glow = texture2D(uGlowTex, clamp(g, 0.0, 1.0)).r * inside;
  vec3 tubes = texture2D(uNeonTex, clamp(vec2(1.0 - (vUv.x * 1.36 - 0.18), (vUv.y - 0.5) * 3.6), 0.0, 1.0)).rgb
    * step(0.0, (vUv.y - 0.5) * 3.6) * step((vUv.y - 0.5) * 3.6, 1.0);
  refl += vec3(1.0, 0.74, 0.4) * glow * 0.5 * uIgnite + tubes * 0.38 * uIgnite;
  v = mix(refl, v, uReveal);
  // riflesso del vetro: una lama diagonale tenue + bordo più scuro
  float sheen = smoothstep(0.08, 0.0, abs(c.x * 0.8 + c.y - 0.18)) * 0.07;
  v += sheen;
  v *= mix(1.0, 0.72, smoothstep(0.78, 1.0, r));
  gl_FragColor = vec4(v, 1.0);
  #include <colorspace_fragment>
}`,qt=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Bt=`
attribute float aSeed;
uniform float uTime;
uniform float uPx;
varying float vA;
void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.11 + aSeed * 40.0) * 0.18;
  p.y += mod(uTime * (0.025 + aSeed * 0.02) + aSeed * 30.0, 18.0) - 9.0;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float near = smoothstep(9.0, 1.0, -mv.z);
  gl_PointSize = uPx * (0.6 + aSeed * 1.6) * (6.0 / -mv.z);
  vA = (0.25 + 0.75 * fract(aSeed * 13.7)) * (0.55 + 0.45 * sin(uTime * (0.6 + aSeed) + aSeed * 20.0)) * near;
}`,Yt=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vA * 0.55;
  gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a, a);
}`;async function it(t){const f=new Image;f.decoding="async",f.src=t,await f.decode();const o=new Pt(f);return o.needsUpdate=!0,o}const Ae=()=>new Promise(t=>requestAnimationFrame(()=>t()));function Zt(t){const f=Ct(t.tier),o=new ft({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"});o.setPixelRatio(Et(t.tier)),o.toneMapping=gt,o.toneMappingExposure=1.1,o.outputColorSpace=ne,o.setClearColor(921362,1);const r=new ht;r.background=new wt(921362);const a=new xt(55,1,.1,80);r.add(a);let p=null;const g=()=>{!p||!t.iconEl||p.place(a,t.iconEl.getBoundingClientRect(),window.innerWidth,te.offsetHeight||window.innerHeight)},T=Gt(t.neon),[R,M,n,l]=t.neon.viewBox,d=ae*l/n,S=document.createElement("canvas"),H=t.tier==="high"?2400:1500;S.width=H,S.height=Math.round(H*l/n);const N=S.getContext("2d"),w=document.createElement("canvas"),k=2.4,G=ae+k*2,Y=d+k*2;w.width=512,w.height=Math.round(512*Y/G);const m=w.getContext("2d");let _=T.map(()=>0);function A(){N.clearRect(0,0,S.width,S.height),_t(N,t.neon,T,{scale:S.width/n,levels:_,spill:!1,tube:3}),m.save(),m.fillStyle="#000",m.fillRect(0,0,w.width,w.height);const e=w.width/G,i=ae/n*e;m.setTransform(i,0,0,i,k*e-R*i,k*e-M*i),m.lineJoin="round",m.globalCompositeOperation="lighter",T.forEach((s,y)=>{const b=_[y];if(!(b<=.01))for(const[I,V,Q]of[[48,26,.34],[18,12,.55],[5,5,.7]]){m.filter=`blur(${(I*i).toFixed(1)}px)`,m.strokeStyle=`rgba(255,255,255,${(Q*b).toFixed(3)})`,m.lineWidth=V;for(const Z of s)m.stroke(Z)}}),m.restore(),m.filter="none",L.needsUpdate=!0,O.needsUpdate=!0}const L=new Je(S);L.colorSpace=ne,L.anisotropy=4;const O=new Je(w);O.colorSpace=yt;const P=new Se({map:L,transparent:!0,blending:Xe,depthWrite:!1,toneMapped:!1}),h=new D(new Ke(ae,d),P);h.position.set(0,z,.06),r.add(h);const c={uTex:{value:null},uGlow:{value:O},uGlowRect:{value:new bt(-G/2,z-Y/2,G,Y)},uTile:{value:new B(Ce,nt)},uTileOrigin:{value:new B(-Ce/2,z+2.55-nt)},uIgnite:{value:0},uHum:{value:1},uTime:{value:0},uSweepY:{value:z},uSweepAmt:{value:0},uPointer:{value:new B(0,z-2)},uPointerAmt:{value:0},uMirror:{value:new K(0,q,W)},uRes:{value:new B(1,1)}},C=new Re({uniforms:c,vertexShader:Nt,fragmentShader:kt.replace("NEON_TOP",`${(z+2.5).toFixed(2)}`)}),E=new D(new Ke(40,46),C);E.position.set(0,-2,0),r.add(E);const U=new X;U.position.set(0,q,.02);const j=new D(new Qe(W,W*1.05,160),new Se({color:460810}));j.position.z=.012;const ie=new D(new Qe(W*1.05,W*1.056,160),new Se({color:5920076,transparent:!0,opacity:.55}));ie.position.z=.013;const x={uVideo:{value:null},uPoster:{value:null},uHasVideo:{value:0},uVideoAspect:{value:720/958},uTime:{value:0},uLight:{value:1},uMarble:{value:null},uGlowTex:{value:O},uNeonTex:{value:L},uReveal:{value:0},uIgnite:{value:1}},re=new D(new Mt(W,160),new Re({uniforms:x,vertexShader:qt,fragmentShader:Ot}));re.position.z=.01,U.add(re,j,ie),r.add(U);const he=f.particles?420:160,se=new Float32Array(he*3),Ee=new Float32Array(he);for(let e=0;e<he;e++)se[e*3]=(fe(e*3+1)-.5)*16,se[e*3+1]=(fe(e*7+2)-.5)*18-1.5,se[e*3+2]=.3+fe(e*13+3)*4.2,Ee[e]=fe(e*17+5);const we=new Tt;we.setAttribute("position",new Ze(se,3)),we.setAttribute("aSeed",new Ze(Ee,1));const Ge={uTime:{value:0},uPx:{value:3.2*o.getPixelRatio()}},rt=new St(we,new Re({uniforms:Ge,vertexShader:Bt,fragmentShader:Yt,transparent:!0,depthWrite:!1,blending:Xe}));r.add(rt);let F=null;const v=t.video,le=()=>{!F||!v||v.readyState<2||(F.needsUpdate=!0,x.uHasVideo.value=1)};let _e=!1;v&&(v.addEventListener("loadeddata",()=>{!v.videoWidth||F||(v.width=v.videoWidth,v.height=v.videoHeight,F=new Rt(v),F.colorSpace=ne,F.minFilter=et,F.magFilter=et,F.generateMipmaps=!1,x.uVideo.value=F,x.uVideoAspect.value=v.videoWidth/v.videoHeight,le())}),v.addEventListener("seeked",le),v.addEventListener("playing",le));let Ue=.4,ce=1,xe=800,Fe=70,ye=tt({stations:Ie(1.6),aspect:1.6});function Ie(e){const i=e<.8?64:55,s=Math.tan(Pe.degToRad(i/2)),y=Te=>Te/2/(s*e),b=Te=>Te/2/s,I=e<.8,V=Math.max(y(ae/(I?.86:.48)),b(d*3.4)),Q=(I?.24:.27)*ce,Z=-(.5-Q)*2*V*s;Ue=Q+d/(4*V*s);const u=Math.max(b(W*2.1/((I?.4:.6)*ce)),y(W*2.1/(I?.86:.9))),J=W/(u*s)*xe*.5,pe=-(.5-Math.max((I?.33:.4)*ce,(Fe+10+J)/xe))*2*u*s,me=0,Be=(z+q)/2;return[{p:[0,z+Z,V],l:[0,z+Z,0]},{p:[.45,Be+.9,V*.97],l:[.1,Be-.2,0]},{p:[me,q+pe,u],l:[me,q+pe,0]},{p:[me,q+pe*.96,u*.96],l:[me,q+pe*.96,0]}]}function st(e){return e<.05?0:e<.6?at((e-.05)/.55)*(2/3):e<.92?2/3+Ht((e-.6)/.32)*(1/3):1}const ze=(e,i)=>ye.applyCamera(e,st(i)),te=document.createElement("div");te.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;pointer-events:none;visibility:hidden",document.body.appendChild(te);const ue=document.createElement("div");ue.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;pointer-events:none;visibility:hidden",document.body.appendChild(ue);let Le=0,Ve=0;function We(e=!1){const i=t.canvas.clientWidth||window.innerWidth,s=te.offsetHeight||window.innerHeight;if(!e&&i===Le&&Math.abs(s-Ve)<150)return;Le=i,Ve=s,o.setSize(i,s,!1);const y=Number(new URLSearchParams(location.search).get("qa-bars"))||0;ce=Math.min(1,Math.max(.7,((ue.offsetHeight||s)-y)/s)),xe=s,Fe=document.querySelector("[data-nav]")?.offsetHeight||70;const b=i/s;a.aspect=b,a.fov=ye.fovForAspect(b),a.updateProjectionMatrix(),ye=tt({stations:Ie(b),aspect:b}),document.documentElement.style.setProperty("--neon-bottom",`${(Ue*100).toFixed(2)}vh`),c.uRes.value.set(o.domElement.width,o.domElement.height),g()}const De=()=>We();window.addEventListener("resize",De);const He=matchMedia("(hover: hover) and (pointer: fine)").matches,Ne=new B(0,0),oe=new B(0,0);let ke=0;const Oe=e=>{Ne.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),ke=performance.now()};He&&window.addEventListener("pointermove",Oe,{passive:!0});const qe=new K,de=new K;let be=-1;const ve=Vt({renderer:o,scene:r,camera:a,applyCamera:ze,getTargetT:()=>ge(t.getProgress()),damping:.92,onFrame:({dt:e,time:i,renderT:s})=>{const y=s;be<0&&(be=i);const b=i-be;if(p){const u=1-at(ge(y/.16));u>.01&&g(),p.update(b,u)}if(b<=Ut+.1){const u=T.map((J,ee)=>Ft(ee,b));u.some((J,ee)=>J!==_[ee])&&(_=u,A())}const I=_.reduce((u,J)=>u+J,0)/_.length,V=.985+.015*Math.sin(i*2.1)*Math.sin(i*.73);c.uIgnite.value=I,x.uIgnite.value=I,x.uTime.value=i,c.uHum.value=V,P.color.setScalar(V),c.uTime.value=i,Ge.uTime.value=i;const Q=ge((y-.05)/.55);c.uSweepY.value=Pe.lerp(z-.5,q+1.2,Q),c.uSweepAmt.value=Math.sin(Math.PI*ge((y-.04)/.58));const Z=1-Math.exp(-6*e);if(oe.lerp(Ne,Z),He){qe.set(oe.x,oe.y,.5).unproject(a),de.copy(qe).sub(a.position).normalize();const u=-a.position.z/de.z;c.uPointer.value.set(a.position.x+de.x*u,a.position.y+de.y*u);const ee=performance.now()-ke<2500?1:0;c.uPointerAmt.value+=(ee-c.uPointerAmt.value)*(1-Math.exp(-2*e)),a.position.x+=oe.x*.12,a.position.y+=oe.y*.08}if(x.uLight.value=1,x.uReveal.value=1,v){const u=y>.3;u!==_e&&(_e=u,u?v.play().catch(()=>{}):v.pause())}t.onFrame?.(y)}});let $=!1,Me=!0;return{ready:(async()=>{const[e,i]=await Promise.all([it(t.marbleUrl),it(t.posterUrl)]);$||(await Ae(),!$&&(t.iconEl&&(p=Dt(o,a)),await Ae(),!$&&(e.colorSpace=ne,e.wrapS=e.wrapT=At,e.anisotropy=o.capabilities.getMaxAnisotropy(),c.uTex.value=e,x.uMarble.value=e,i.colorSpace=ne,x.uPoster.value=i,x.uVideo.value||(x.uVideo.value=i),We(!0),A(),await Ae(),!$&&(o.extensions.has("KHR_parallel_shader_compile")&&(await o.compileAsync(r,a),$)||(Lt(o,r,a,ze),Me&&ve.start())))))})(),setActive(e){e===Me||$||(Me=e,e?ve.start():ve.stop())},dispose(){$=!0,ve.dispose(),p?.dispose(),window.removeEventListener("resize",De),window.removeEventListener("pointermove",Oe),v?.removeEventListener("seeked",le),te.remove(),ue.remove(),r.traverse(e=>{const i=e;i.geometry?.dispose?.();const s=i.material;Array.isArray(s)?s.forEach(y=>y.dispose()):s?.dispose?.()}),L.dispose(),O.dispose(),F?.dispose(),o.dispose()}}}export{Zt as createHero};
