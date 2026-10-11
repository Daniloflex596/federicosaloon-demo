import{p as $e,l as K,q as dt,a as rt,r as pt,s as xe,t as vt,u as lt,d as M,I as mt,v as ft,M as we,w as ht,x as gt,E as wt,V as q,y as Xe,z as xt,G as J,D as Mt,k as Ee,W as yt,A as bt,S as ae,C as Tt,P as St,b as Je,N as At,c as Ke,e as Qe,g as Pt,f as Re,R as Ze,m as Rt,B as Ct,h as et,i as Et,F as Gt,n as tt,j as _t,T as It}from"./three.module.BOhqKR8L.js";import{t as Ut,p as Ft,a as Lt,b as he,d as zt,I as Vt,g as Wt}from"./v28.astro_astro_type_script_index_0_lang.B9a2ELzN.js";import"./neon-paths.B4VCQnq5.js";import"./lenis.CciUKl-_.js";function ot({stations:e,aspect:i=1}={}){if(!Array.isArray(e)||e.length<2)throw new Error("createCameraRig: servono almeno 2 stations { p:[x,y,z], l:[x,y,z] }");const n=new $e(e.map(a=>new K(a.p[0],a.p[1],a.p[2])),!1,"catmullrom",.4),l=new $e(e.map(a=>new K(a.l[0],a.l[1],a.l[2])),!1,"catmullrom",.4),s=new K,v=new K;function u(a,c){const d=c<0?0:c>1?1:c;n.getPoint(d,s),l.getPoint(d,v),a.position.copy(s),a.lookAt(v)}function o(a,c=.94){return 1-Math.pow(c,Math.min(a,.25)*60)}function y(a){return a<.8?64:55}function g(a,c){a.aspect=c,a.fov=y(c),a.updateProjectionMatrix()}return{posCurve:n,lookCurve:l,applyCamera:u,dampFactor:o,fovForAspect:y,onResize:g,initialAspect:i,stations:e}}const Dt=[.06,.18,.35,.55,.75,.95];function Ht(e,i,n,l,s=Dt){for(const v of s)l(n,v),e.render(i,n);l(n,0)}function Nt({renderer:e,scene:i,camera:n,applyCamera:l,getTargetT:s,onFrame:v,damping:u=.94,microLife:o=0,startT:y=0}={}){const g=new dt;let a=y,c=!1,d=0;function w(){if(!c||(d=requestAnimationFrame(w),typeof document<"u"&&document.hidden))return;const H=g.getDelta(),N=Math.min(H,.05),T=g.elapsedTime,k=s?s():0,_=1-Math.pow(u,Math.min(H,.25)*60);a+=(k-a)*_,l(n,a),o&&(n.position.y+=Math.sin(T*.8)*o),v&&v({dt:N,time:T,renderT:a}),e.render(i,n)}return{start(){c||(c=!0,g.getDelta(),w())},stop(){c=!1,d&&cancelAnimationFrame(d),d=0},dispose(){c=!1,d&&cancelAnimationFrame(d),d=0},getRenderT(){return a}}}class kt extends rt{constructor(){super();const i=new pt;i.deleteAttribute("uv");const n=new xe({side:vt}),l=new xe,s=new lt(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const v=new M(i,n);v.position.set(-.757,13.219,.717),v.scale.set(31.713,28.305,28.591),this.add(v);const u=new mt(i,l,6),o=new ft;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),u.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),u.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),u.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),u.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),u.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),u.setMatrixAt(5,o.matrix),this.add(u);const y=new M(i,te(50));y.position.set(-16.116,14.37,8.208),y.scale.set(.1,2.428,2.739),this.add(y);const g=new M(i,te(50));g.position.set(-16.109,18.021,-8.207),g.scale.set(.1,2.425,2.751),this.add(g);const a=new M(i,te(17));a.position.set(14.904,12.198,-1.832),a.scale.set(.15,4.265,6.331),this.add(a);const c=new M(i,te(43));c.position.set(-.462,8.89,14.52),c.scale.set(4.38,5.441,.088),this.add(c);const d=new M(i,te(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const w=new M(i,te(100));w.position.set(0,20,0),w.scale.set(1,.1,1),this.add(w)}dispose(){const i=new Set;this.traverse(n=>{n.isMesh&&(i.add(n.geometry),i.add(n.material))});for(const n of i)n.dispose()}}function te(e){const i=new we;return i.color.setScalar(e),i}const nt=4,Ot=3.3;function Bt(e,i){const n=new ht(e),l=n.fromScene(new kt,.04).texture;n.dispose();const s=new xe({color:14263886,metalness:1,roughness:.26,envMap:l,envMapIntensity:1.05}),v=new xe({color:15254654,metalness:1,roughness:.13,envMap:l,envMapIntensity:1.05}),u=new gt;u.moveTo(-.46,-.05),u.quadraticCurveTo(-.47,.1,-.2,.105),u.quadraticCurveTo(.95,.14,2.06,.014),u.lineTo(2.09,-.004),u.quadraticCurveTo(1,-.03,-.14,-.06),u.quadraticCurveTo(-.36,-.1,-.46,-.05),u.closePath();const o=new wt(u,{depth:.05,bevelEnabled:!0,bevelThickness:.022,bevelSize:.03,bevelSegments:5,curveSegments:40}),y=new q(-.98,-.44),g=new q(y.x+.12,y.y),a=g.length()-.24,c=new Xe(.085,a,8,18),d=new xt(.215,.076,24,64),w=new Xe(.03,.26,4,10);function H(C){const b=new J,m=new M(o,v);m.position.z=-.025;const E=new M(c,s),G=Math.atan2(g.y,g.x);E.position.set(-.12+g.x*.47,g.y*.47,0),E.rotation.z=G-Math.PI/2;const U=new M(d,s);return U.position.set(y.x,y.y,0),b.add(m,E,U),b}const N=new J,T=new J,k=H(),_=H();_.rotation.x=Math.PI,_.position.z=.1,N.add(k),T.add(_);const Y=new M(new Mt(.085,.085,.2,32),s);Y.rotation.x=Math.PI/2,Y.position.z=.025;const x=new J;x.add(N,T,Y),x.position.x=-.45;const I=new J;I.add(x);const R=new J;R.add(I);const V=new lt(16766362,6,12,2);V.position.set(.6,2.2,1.6),R.add(V),i.add(R);let O=1;return{place(C,b,m,E){const G=nt*Math.tan(Ee.degToRad(C.fov/2)),U=G*C.aspect,j=b.left+b.width/2,se=b.top+b.height/2;R.position.set((j/m*2-1)*U,(1-se/E*2)*G,-nt);const S=b.width/m*2*U,re=b.height/E*2*G;O=Math.min(S/(Ot*1.06),re/1.85)},update(C,b){if(R.visible=b>.01,!R.visible)return;const m=Math.min(1,C/1.6),E=1-Math.pow(1-m,3);R.scale.setScalar(O*b*(.6+.4*E)),I.rotation.set(.42+Math.sin(C*.42)*.1,(1-E)*Math.PI*1.5+Math.sin(C*.55)*.6,.26);const G=C%2.4/.34,j=.27-.23*(G<1?Math.sin(Math.PI*G):0);N.rotation.z=j/2,T.rotation.z=-j/2},dispose(){i.remove(R),o.dispose(),c.dispose(),d.dispose(),w.dispose(),s.dispose(),v.dispose(),l.dispose()}}}const ie=7,z=3.4,B=-14,D=1.62,Ge=16,at=Ge*(1230/1080),ge=e=>e<0?0:e>1?1:e,it=e=>e*e*(3-2*e),qt=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Yt=`
varying vec2 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,jt=`
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
}`,$t=`
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
}`,Xt=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Jt=`
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
}`,Kt=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vA * 0.55;
  gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a, a);
}`;async function st(e){const i=new Image;i.decoding="async",i.src=e,await i.decode();const n=new It(i);return n.needsUpdate=!0,n}const Ce=()=>new Promise(e=>requestAnimationFrame(()=>e()));function no(e){const i=Ut(e.tier),n=new yt({canvas:e.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"});n.setPixelRatio(Ft(e.tier)),n.toneMapping=bt,n.toneMappingExposure=1.1,n.outputColorSpace=ae,n.setClearColor(921362,1);const l=new rt;l.background=new Tt(921362);const s=new St(55,1,.1,80);l.add(s);let v=null;const u=()=>{!v||!e.iconEl||v.place(s,e.iconEl.getBoundingClientRect(),window.innerWidth,oe.offsetHeight||window.innerHeight)},o=Lt(e.neon),[y,g,a,c]=e.neon.viewBox,d=ie*c/a,w=document.createElement("canvas"),H=e.tier==="high"?2400:1500;w.width=H,w.height=Math.round(H*c/a);const N=w.getContext("2d"),T=document.createElement("canvas"),k=2.4,_=ie+k*2,Y=d+k*2;T.width=512,T.height=Math.round(512*Y/_);const x=T.getContext("2d");let I=o.map(()=>0);function R(){N.clearRect(0,0,w.width,w.height),zt(N,e.neon,o,{scale:w.width/a,levels:I,spill:!1,tube:3}),x.save(),x.fillStyle="#000",x.fillRect(0,0,T.width,T.height);const t=T.width/_,r=ie/a*t;x.setTransform(r,0,0,r,k*t-y*r,k*t-g*r),x.lineJoin="round",x.globalCompositeOperation="lighter",o.forEach((p,A)=>{const P=I[A];if(!(P<=.01))for(const[L,W,Q]of[[48,26,.34],[18,12,.55],[5,5,.7]]){x.filter=`blur(${(L*r).toFixed(1)}px)`,x.strokeStyle=`rgba(255,255,255,${(Q*P).toFixed(3)})`,x.lineWidth=W;for(const Z of p)x.stroke(Z)}}),x.restore(),x.filter="none",V.needsUpdate=!0,O.needsUpdate=!0}const V=new Je(w);V.colorSpace=ae,V.anisotropy=4;const O=new Je(T);O.colorSpace=At;const C=new we({map:V,transparent:!0,blending:Ke,depthWrite:!1,toneMapped:!1}),b=new M(new Qe(ie,d),C);b.position.set(0,z,.06),l.add(b);const m={uTex:{value:null},uGlow:{value:O},uGlowRect:{value:new Pt(-_/2,z-Y/2,_,Y)},uTile:{value:new q(Ge,at)},uTileOrigin:{value:new q(-Ge/2,z+2.55-at)},uIgnite:{value:0},uHum:{value:1},uTime:{value:0},uSweepY:{value:z},uSweepAmt:{value:0},uPointer:{value:new q(0,z-2)},uPointerAmt:{value:0},uMirror:{value:new K(0,B,D)},uRes:{value:new q(1,1)}},E=new Re({uniforms:m,vertexShader:Yt,fragmentShader:jt.replace("NEON_TOP",`${(z+2.5).toFixed(2)}`)}),G=new M(new Qe(40,46),E);G.position.set(0,-2,0),l.add(G);const U=new J;U.position.set(0,B,.02);const j=new M(new Ze(D,D*1.05,160),new we({color:460810}));j.position.z=.012;const se=new M(new Ze(D*1.05,D*1.056,160),new we({color:5920076,transparent:!0,opacity:.55}));se.position.z=.013;const S={uVideo:{value:null},uPoster:{value:null},uHasVideo:{value:0},uVideoAspect:{value:720/958},uTime:{value:0},uLight:{value:1},uMarble:{value:null},uGlowTex:{value:O},uNeonTex:{value:V},uReveal:{value:0},uIgnite:{value:1}},re=new M(new Rt(D,160),new Re({uniforms:S,vertexShader:Xt,fragmentShader:$t}));re.position.z=.01,U.add(re,j,se),l.add(U);const Me=i.particles?420:160,le=new Float32Array(Me*3),_e=new Float32Array(Me);for(let t=0;t<Me;t++)le[t*3]=(he(t*3+1)-.5)*16,le[t*3+1]=(he(t*7+2)-.5)*18-1.5,le[t*3+2]=.3+he(t*13+3)*4.2,_e[t]=he(t*17+5);const ye=new Ct;ye.setAttribute("position",new et(le,3)),ye.setAttribute("aSeed",new et(_e,1));const Ie={uTime:{value:0},uPx:{value:3.2*n.getPixelRatio()}},ct=new Et(ye,new Re({uniforms:Ie,vertexShader:Jt,fragmentShader:Kt,transparent:!0,depthWrite:!1,blending:Ke}));l.add(ct);let F=null;const h=e.video,ce=()=>{!F||!h||h.readyState<2||(F.needsUpdate=!0,S.uHasVideo.value=1)};let Ue=!1;h&&(h.addEventListener("loadeddata",()=>{!h.videoWidth||F||(h.width=h.videoWidth,h.height=h.videoHeight,F=new Gt(h),F.colorSpace=ae,F.minFilter=tt,F.magFilter=tt,F.generateMipmaps=!1,S.uVideo.value=F,S.uVideoAspect.value=h.videoWidth/h.videoHeight,ce())}),h.addEventListener("seeked",ce),h.addEventListener("playing",ce));let Fe=.4,ue=1,be=800,Le=70,Te=ot({stations:ze(1.6),aspect:1.6});function ze(t){const r=t<.8?64:55,p=Math.tan(Ee.degToRad(r/2)),A=Pe=>Pe/2/(p*t),P=Pe=>Pe/2/p,L=t<.8,W=Math.max(A(ie/(L?.86:.48)),P(d*3.4)),Q=(L?.24:.27)*ue,Z=-(.5-Q)*2*W*p;Fe=Q+d/(4*W*p);const f=Math.max(P(D*2.1/((L?.4:.6)*ue)),A(D*2.1/(L?.86:.9))),X=D/(f*p)*be*.5,me=-(.5-Math.max((L?.33:.4)*ue,(Le+10+X)/be))*2*f*p,fe=0,je=(z+B)/2;return[{p:[0,z+Z,W],l:[0,z+Z,0]},{p:[.45,je+.9,W*.97],l:[.1,je-.2,0]},{p:[fe,B+me,f],l:[fe,B+me,0]},{p:[fe,B+me*.96,f*.96],l:[fe,B+me*.96,0]}]}function ut(t){return t<.05?0:t<.6?it((t-.05)/.55)*(2/3):t<.92?2/3+qt((t-.6)/.32)*(1/3):1}const Ve=(t,r)=>Te.applyCamera(t,ut(r)),oe=document.createElement("div");oe.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;pointer-events:none;visibility:hidden",document.body.appendChild(oe);const de=document.createElement("div");de.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;pointer-events:none;visibility:hidden",document.body.appendChild(de);let We=0,De=0;function He(t=!1){const r=e.canvas.clientWidth||window.innerWidth,p=oe.offsetHeight||window.innerHeight;if(!t&&r===We&&Math.abs(p-De)<150)return;We=r,De=p,n.setSize(r,p,!1);const A=Number(new URLSearchParams(location.search).get("qa-bars"))||0;ue=Math.min(1,Math.max(.7,((de.offsetHeight||p)-A)/p)),be=p,Le=document.querySelector("[data-nav]")?.offsetHeight||70;const P=r/p;s.aspect=P,s.fov=Te.fovForAspect(P),s.updateProjectionMatrix(),Te=ot({stations:ze(P),aspect:P}),document.documentElement.style.setProperty("--neon-bottom",`${(Fe*100).toFixed(2)}vh`),m.uRes.value.set(n.domElement.width,n.domElement.height),u()}const Ne=()=>He();window.addEventListener("resize",Ne);const ke=matchMedia("(hover: hover) and (pointer: fine)").matches,Oe=new q(0,0),ne=new q(0,0);let Be=0;const qe=t=>{Oe.set(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1),Be=performance.now()};ke&&window.addEventListener("pointermove",qe,{passive:!0});const Ye=new K,pe=new K;let Se=-1;const ve=Nt({renderer:n,scene:l,camera:s,applyCamera:Ve,getTargetT:()=>ge(e.getProgress()),damping:.92,onFrame:({dt:t,time:r,renderT:p})=>{const A=p;Se<0&&(Se=r);const P=r-Se;if(v){const f=1-it(ge(A/.16));f>.01&&u(),v.update(P,f)}if(P<=Vt+.1){const f=o.map((X,ee)=>Wt(ee,P));f.some((X,ee)=>X!==I[ee])&&(I=f,R())}const L=I.reduce((f,X)=>f+X,0)/I.length,W=.985+.015*Math.sin(r*2.1)*Math.sin(r*.73);m.uIgnite.value=L,S.uIgnite.value=L,S.uTime.value=r,m.uHum.value=W,C.color.setScalar(W),m.uTime.value=r,Ie.uTime.value=r;const Q=ge((A-.05)/.55);m.uSweepY.value=Ee.lerp(z-.5,B+1.2,Q),m.uSweepAmt.value=Math.sin(Math.PI*ge((A-.04)/.58));const Z=1-Math.exp(-6*t);if(ne.lerp(Oe,Z),ke){Ye.set(ne.x,ne.y,.5).unproject(s),pe.copy(Ye).sub(s.position).normalize();const f=-s.position.z/pe.z;m.uPointer.value.set(s.position.x+pe.x*f,s.position.y+pe.y*f);const ee=performance.now()-Be<2500?1:0;m.uPointerAmt.value+=(ee-m.uPointerAmt.value)*(1-Math.exp(-2*t)),s.position.x+=ne.x*.12,s.position.y+=ne.y*.08}if(S.uLight.value=1,S.uReveal.value=1,h){const f=A>.3;f!==Ue&&(Ue=f,f?h.play().catch(()=>{}):h.pause())}e.onFrame?.(A)}});let $=!1,Ae=!0;return{ready:(async()=>{const[t,r]=await Promise.all([st(e.marbleUrl),st(e.posterUrl)]);$||(await Ce(),!$&&(e.iconEl&&(v=Bt(n,s)),await Ce(),!$&&(t.colorSpace=ae,t.wrapS=t.wrapT=_t,t.anisotropy=n.capabilities.getMaxAnisotropy(),m.uTex.value=t,S.uMarble.value=t,r.colorSpace=ae,S.uPoster.value=r,S.uVideo.value||(S.uVideo.value=r),He(!0),R(),await Ce(),!$&&(n.extensions.has("KHR_parallel_shader_compile")&&(await n.compileAsync(l,s),$)||(Ht(n,l,s,Ve),Ae&&ve.start())))))})(),setActive(t){t===Ae||$||(Ae=t,t?ve.start():ve.stop())},dispose(){$=!0,ve.dispose(),v?.dispose(),window.removeEventListener("resize",Ne),window.removeEventListener("pointermove",qe),h?.removeEventListener("seeked",ce),oe.remove(),de.remove(),l.traverse(t=>{const r=t;r.geometry?.dispose?.();const p=r.material;Array.isArray(p)?p.forEach(A=>A.dispose()):p?.dispose?.()}),V.dispose(),O.dispose(),F?.dispose(),n.dispose()}}}export{no as createHero};
