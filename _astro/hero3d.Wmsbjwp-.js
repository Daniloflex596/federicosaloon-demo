import{h as je,A as $e,i as E,j as qe,k as Xe,e as Je,l as Ce,m as Ke,f as oe,n as Ee,a as V,o as Ve,V as R,w as ne,q as Qe,p as ae,G as Ze,R as Le,y as et,r as tt,s as Ge,t as ot,v as nt,z as Ue,u as at,D as it,d as We}from"./three.module.BCv813u3.js";import{c as Fe,p as rt,a as st}from"./render-loop.T1Kdol_1.js";import{t as lt,p as ct}from"./capability.BNYK3-LX.js";import{t as ut,p as k,d as dt,I as vt,g as mt}from"./v1.astro_astro_type_script_index_0_lang.M69x5tvj.js";import"./neon-paths.B4VCQnq5.js";import"./lenis.CciUKl-_.js";const L=7,p=3.4,S=-6.4,b=1.62,ie=16,ze=ie*(1230/1080),G=t=>t<0?0:t>1?1:t,He=t=>t*t*(3-2*t),pt=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,ft=`
varying vec2 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,gt=`
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
  col += alb * neonCol * g * 1.35 * uIgnite * uHum;
  col += neonCol * g * g * 0.035 * uIgnite;

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
}`,wt=`
uniform sampler2D uVideo;
uniform sampler2D uPoster;
uniform float uHasVideo;
uniform float uVideoAspect;
uniform float uTime;
uniform float uLight;
varying vec2 vUv;
void main() {
  vec2 c = vUv - 0.5;
  float r = length(c) * 2.0;
  // "cover" quadrato dentro un video verticale, centrato poco sopra la metà (i volti)
  vec2 uv = vec2(vUv.x, 0.5 + (vUv.y - 0.5) * uVideoAspect + 0.06 * (1.0 - uVideoAspect));
  vec3 v = mix(texture2D(uPoster, uv).rgb, texture2D(uVideo, uv).rgb, uHasVideo);
  v *= uLight;
  // riflesso del vetro: una lama diagonale tenue + bordo più scuro
  float sheen = smoothstep(0.08, 0.0, abs(c.x * 0.8 + c.y - 0.18)) * 0.10;
  v += sheen;
  v *= mix(1.0, 0.72, smoothstep(0.78, 1.0, r));
  gl_FragColor = vec4(v, 1.0);
  #include <colorspace_fragment>
}`,ht=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,xt=`
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
}`,yt=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vA * 0.55;
  gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a, a);
}`;function Oe(t){return new Promise((Y,r)=>new it().load(t,Y,void 0,r))}function _t(t){const Y=lt(t.tier),r=new je({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"});r.setPixelRatio(ct(t.tier)),r.toneMapping=$e,r.toneMappingExposure=1.2,r.outputColorSpace=E,r.setClearColor(921362,1);const f=new qe;f.background=new Xe(921362);const l=new Je(55,1,.1,80),U=ut(t.neon),[Ne,Ie,W,re]=t.neon.viewBox,B=L*re/W,T=document.createElement("canvas"),se=t.tier==="high"?2400:1500;T.width=se,T.height=Math.round(se*re/W);const le=T.getContext("2d"),M=document.createElement("canvas"),F=2.4,z=L+F*2,j=B+F*2;M.width=512,M.height=Math.round(512*j/z);const c=M.getContext("2d");let A=U.map(()=>0);function ce(){le.clearRect(0,0,T.width,T.height),dt(le,t.neon,U,{scale:T.width/W,levels:A,spill:!1,tube:3.6}),c.save(),c.fillStyle="#000",c.fillRect(0,0,M.width,M.height);const e=M.width/z,o=L/W*e;c.setTransform(o,0,0,o,F*e-Ne*o,F*e-Ie*o),c.lineJoin="round",c.globalCompositeOperation="lighter",U.forEach((a,i)=>{const w=A[i];if(!(w<=.01))for(const[d,h,P]of[[48,26,.34],[18,12,.55],[5,5,.7]]){c.filter=`blur(${(d*o).toFixed(1)}px)`,c.strokeStyle=`rgba(255,255,255,${(P*w).toFixed(3)})`,c.lineWidth=h;for(const x of a)c.stroke(x)}}),c.restore(),c.filter="none",_.needsUpdate=!0,H.needsUpdate=!0}const _=new Ce(T);_.colorSpace=E,_.anisotropy=4;const H=new Ce(M);H.colorSpace=Ke;const ue=new oe({map:_,transparent:!0,blending:Ee,depthWrite:!1,toneMapped:!1}),de=new V(new Ve(L,B),ue);de.position.set(0,p,.06),f.add(de);const u={uTex:{value:null},uGlow:{value:H},uGlowRect:{value:new Qe(-z/2,p-j/2,z,j)},uTile:{value:new R(ie,ze)},uTileOrigin:{value:new R(-ie/2,p+2.55-ze)},uIgnite:{value:0},uHum:{value:1},uTime:{value:0},uSweepY:{value:p},uSweepAmt:{value:0},uPointer:{value:new R(0,p-2)},uPointerAmt:{value:0},uMirror:{value:new ne(0,S,b)},uRes:{value:new R(1,1)}},De=new ae({uniforms:u,vertexShader:ft,fragmentShader:gt.replace("NEON_TOP",`${(p+2.5).toFixed(2)}`)}),ve=new V(new Ve(40,46),De);ve.position.set(0,-2,0),f.add(ve);const $=new Ze;$.position.set(0,S,.02);const me=new V(new Le(b,b*1.05,160),new oe({color:460810}));me.position.z=.012;const pe=new V(new Le(b*1.05,b*1.056,160),new oe({color:5920076,transparent:!0,opacity:.55}));pe.position.z=.013;const g={uVideo:{value:null},uPoster:{value:null},uHasVideo:{value:0},uVideoAspect:{value:720/958},uTime:{value:0},uLight:{value:1}},fe=new V(new et(b,160),new ae({uniforms:g,vertexShader:ht,fragmentShader:wt}));fe.position.z=.01,$.add(fe,me,pe),f.add($);const q=Y.particles?420:160,O=new Float32Array(q*3),ge=new Float32Array(q);for(let e=0;e<q;e++)O[e*3]=(k(e*3+1)-.5)*16,O[e*3+1]=(k(e*7+2)-.5)*18-1.5,O[e*3+2]=.3+k(e*13+3)*4.2,ge[e]=k(e*17+5);const X=new tt;X.setAttribute("position",new Ge(O,3)),X.setAttribute("aSeed",new Ge(ge,1));const we={uTime:{value:0},uPx:{value:3.2*r.getPixelRatio()}},ke=new ot(X,new ae({uniforms:we,vertexShader:xt,fragmentShader:yt,transparent:!0,depthWrite:!1,blending:Ee}));f.add(ke);let v=null;const n=t.video,J=()=>{!v||!n||n.readyState<2||(v.needsUpdate=!0,g.uHasVideo.value=1)};n&&(n.addEventListener("loadeddata",()=>{!n.videoWidth||v||(n.width=n.videoWidth,n.height=n.videoHeight,v=new nt(n),v.colorSpace=E,v.minFilter=Ue,v.magFilter=Ue,v.generateMipmaps=!1,g.uVideo.value=v,g.uVideoAspect.value=n.videoWidth/n.videoHeight,J())}),n.addEventListener("seeked",J));let K=Fe({stations:he(1.6),aspect:1.6});function he(e){const o=e<.8?64:55,a=Math.tan(We.degToRad(o/2)),i=te=>te/2/(a*e),w=te=>te/2/a,d=e<.8,h=Math.max(i(L/(d?.86:.56)),w(B*3.4)),P=-(.5-(d?.24:.31))*2*h*a,x=Math.max(w(b*2.1/(d?.42:.64)),i(b*2.1/(d?.74:.9))),s=d?-x*a*.36:0,m=d?0:-x*a*e*.38,y=(p+S)/2;return[{p:[0,p+P,h],l:[0,p+P,0]},{p:[.45,y+.9,h*.97],l:[.1,y-.2,0]},{p:[m,S+s,x],l:[m,S+s,0]},{p:[m*.92,S+s*.92,x*(d?.92:.84)],l:[m*.92,S+s*.92,0]}]}function Ye(e){return e<.1?0:e<.56?He((e-.1)/.46)*(2/3):e<.9?2/3+pt((e-.56)/.34)*(1/3):1}const xe=(e,o)=>K.applyCamera(e,Ye(o)),N=document.createElement("div");N.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;pointer-events:none;visibility:hidden",document.body.appendChild(N);let ye=0,Se=0;function be(e=!1){const o=t.canvas.clientWidth||window.innerWidth,a=N.offsetHeight||window.innerHeight;if(!e&&o===ye&&Math.abs(a-Se)<150)return;ye=o,Se=a,r.setSize(o,a,!1);const i=o/a;l.aspect=i,l.fov=K.fovForAspect(i),l.updateProjectionMatrix(),K=Fe({stations:he(i),aspect:i}),u.uRes.value.set(r.domElement.width,r.domElement.height)}const Te=()=>be();window.addEventListener("resize",Te);const Me=matchMedia("(hover: hover) and (pointer: fine)").matches,Ae=new R(0,0),C=new R(0,0);let Pe=0;const Re=e=>{Ae.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),Pe=performance.now()};Me&&window.addEventListener("pointermove",Re,{passive:!0});const _e=new ne,I=new ne;let Q=-1;const Be=matchMedia("(pointer: coarse)").matches?.02:.008,D=st({renderer:r,scene:f,camera:l,applyCamera:xe,getTargetT:()=>G(t.getProgress()),damping:.92,onFrame:({dt:e,time:o,renderT:a})=>{const i=a;Q<0&&(Q=o);const w=o-Q;if(w<=vt+.1){const s=U.map((m,y)=>mt(y,w));s.some((m,y)=>m!==A[y])&&(A=s,ce())}const d=A.reduce((s,m)=>s+m,0)/A.length,h=.985+.015*Math.sin(o*2.1)*Math.sin(o*.73);u.uIgnite.value=d,u.uHum.value=h,ue.color.setScalar(h),u.uTime.value=o,we.uTime.value=o;const P=G((i-.1)/.5);u.uSweepY.value=We.lerp(p-.5,S+1.2,P),u.uSweepAmt.value=Math.sin(Math.PI*G((i-.08)/.56));const x=1-Math.exp(-6*e);if(C.lerp(Ae,x),Me){_e.set(C.x,C.y,.5).unproject(l),I.copy(_e).sub(l.position).normalize();const s=-l.position.z/I.z;u.uPointer.value.set(l.position.x+I.x*s,l.position.y+I.y*s);const y=performance.now()-Pe<2500?1:0;u.uPointerAmt.value+=(y-u.uPointerAmt.value)*(1-Math.exp(-2*e)),l.position.x+=C.x*.12,l.position.y+=C.y*.08}if(g.uLight.value=.35+.65*He(G((i-.42)/.16)),n&&n.readyState>=2&&n.duration){const s=G((i-.52)/.4)*.999*n.duration;!n.seeking&&Math.abs(n.currentTime-s)>Be&&(n.currentTime=s)}t.onFrame?.(i)}});let Z=!1,ee=!0;return{ready:(async()=>{const[e,o]=await Promise.all([Oe(t.marbleUrl),Oe(t.posterUrl)]);Z||(e.colorSpace=E,e.wrapS=e.wrapT=at,e.anisotropy=r.capabilities.getMaxAnisotropy(),u.uTex.value=e,o.colorSpace=E,g.uPoster.value=o,g.uVideo.value||(g.uVideo.value=o),be(!0),ce(),rt(r,f,l,xe),ee&&D.start())})(),setActive(e){e===ee||Z||(ee=e,e?D.start():D.stop())},dispose(){Z=!0,D.dispose(),window.removeEventListener("resize",Te),window.removeEventListener("pointermove",Re),n?.removeEventListener("seeked",J),N.remove(),f.traverse(e=>{const o=e;o.geometry?.dispose?.();const a=o.material;Array.isArray(a)?a.forEach(i=>i.dispose()):a?.dispose?.()}),_.dispose(),H.dispose(),v?.dispose(),r.dispose()}}}export{_t as createHero};
