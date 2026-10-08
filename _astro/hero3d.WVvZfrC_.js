import{P as et,M as He,S as tt,E as ot,V as O,C as nt,T as at,G as D,a as L,b as st,c as it,d as xe,W as rt,L as ct,H as lt,e as $e,B as pt,f as Xe,g as dt,N as ut,O as mt,h as vt,A as ft,i as ge,j as gt,k as ht,l as Ne,m as wt,n as ze,o as Ue,p as Be,q as xt,r as yt,s as ke,t as bt,u as Tt,v as De,w as Ve}from"./three.module.BCv813u3.js";import{c as Ye,p as Mt,a as St}from"./render-loop.T1Kdol_1.js";import{t as Rt,p as Pt}from"./capability.BNYK3-LX.js";import{t as At,a as _t,p as re,d as Ct,l as Et,I as Gt,g as It}from"./neon.C4J96Zby.js";import{R as Wt}from"./RoomEnvironment.HZ5sevbQ.js";const qe=4,Ot=3.3;async function Lt(t,c){if(!t.extensions.has("KHR_parallel_shader_compile"))return;const r=new rt(4,4,{type:lt,colorSpace:ct}),n=new $e(90,1,.1,100),i=new L(new pt,new Xe({side:dt,depthWrite:!1,depthTest:!1}));c.add(i);const o=t.getRenderTarget(),d=t.toneMapping;t.toneMapping=ut,t.setRenderTarget(r);const l=t.compileAsync(c,n);t.setRenderTarget(o),t.toneMapping=d,c.remove(i);try{await l}finally{i.geometry.dispose(),i.material.dispose(),r.dispose()}}async function Ft(t,c){const r=c;if(!t.extensions.has("KHR_parallel_shader_compile")||!r._setSize||!r._allocateTargets)return;r._setSize(256);const n=r._allocateTargets(),i=r._blurMaterial,o=r._lodPlanes?.[0];if(!i||!o)return n.dispose();const d=t.getRenderTarget();t.setRenderTarget(n);const l=t.compileAsync(new L(o,i),new mt);t.setRenderTarget(d);try{await l}finally{n.dispose()}}async function Ht(t,c){const r=new Wt,n=new et(t);await Promise.all([Lt(t,r).catch(()=>{}),Ft(t,n).catch(()=>{})]);const i=n.fromScene(r,.04).texture;n.dispose(),r.dispose();const o=new He({color:14263886,metalness:1,roughness:.26,envMap:i,envMapIntensity:1.05}),d=new He({color:15254654,metalness:1,roughness:.13,envMap:i,envMapIntensity:1.05}),l=new tt;l.moveTo(-.46,-.05),l.quadraticCurveTo(-.47,.1,-.2,.105),l.quadraticCurveTo(.95,.14,2.06,.014),l.lineTo(2.09,-.004),l.quadraticCurveTo(1,-.03,-.14,-.06),l.quadraticCurveTo(-.36,-.1,-.46,-.05),l.closePath();const Y=new ot(l,{depth:.05,bevelEnabled:!0,bevelThickness:.022,bevelSize:.03,bevelSegments:5,curveSegments:40}),F=new O(-.98,-.44),y=new O(F.x+.12,F.y),q=y.length()-.24,B=new nt(.085,q,8,18),H=new at(.215,.076,24,64);function j(){const u=new D,p=new L(Y,d);p.position.z=-.025;const S=new L(B,o),R=Math.atan2(y.y,y.x);S.position.set(-.12+y.x*.47,y.y*.47,0),S.rotation.z=R-Math.PI/2;const h=new L(H,o);return h.position.set(F.x,F.y,0),u.add(p,S,h),u}const G=new D,b=new D,X=j(),N=j();N.rotation.x=Math.PI,N.position.z=.1,G.add(X),b.add(N);const T=new L(new st(.085,.085,.2,32),o);T.rotation.x=Math.PI/2,T.position.z=.025;const I=new D;I.add(G,b,T),I.position.x=-.45;const W=new D;W.add(I);const g=new D;g.add(W);const k=new it(16766362,6,12,2);k.position.set(.6,2.2,1.6),g.add(k),c.add(g);let M=1;return{place(u,p,S,R){const h=qe*Math.tan(xe.degToRad(u.fov/2)),A=h*u.aspect,_=p.left+p.width/2,J=p.top+p.height/2;g.position.set((_/S*2-1)*A,(1-J/R*2)*h,-qe);const Q=p.width/S*2*A,m=p.height/R*2*h;M=Math.min(Q/(Ot*1.06),m/1.85)},update(u,p){if(g.visible=p>.01,!g.visible)return;const S=Math.min(1,u/1.6),R=1-Math.pow(1-S,3);g.scale.setScalar(M*p*(.6+.4*R)),W.rotation.set(.42+Math.sin(u*.42)*.1,(1-R)*Math.PI*1.5+Math.sin(u*.55)*.6,.26);const h=u%2.4/.34,_=.27-.23*(h<1?Math.sin(Math.PI*h):0);G.rotation.z=_/2,b.rotation.z=-_/2},dispose(){c.remove(g),Y.dispose(),B.dispose(),H.dispose(),o.dispose(),d.dispose(),i.dispose()}}}const $=7,P=3.4,V=-14,he=1.62,ye=16,je=ye*(1230/1080),ce=t=>t<0?0:t>1?1:t,Ke=t=>t*t*(3-2*t),Nt=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,zt=`
varying vec2 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ut=`
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

  #ifdef POINTER
  // riflesso morbido che segue il puntatore (marmo lucidato; solo con il mouse)
  float d = length(w - uPointer);
  col += (alb * 0.22 + 0.006) * exp(-d * d / 1.6) * uPointerAmt * vec3(1.0, 0.88, 0.72);
  #endif

  // vignetta + grana fotografica
  vec2 sp = gl_FragCoord.xy / uRes;
  float vig = smoothstep(1.05, 0.28, length((sp - 0.5) * vec2(1.2, 1.0)));
  col *= mix(0.35, 1.0, vig);
  col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * 0.012;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Bt=`
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
}`,kt=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vA * 0.55;
  gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a, a);
}`,Dt=typeof createImageBitmap=="function"&&(!/AppleWebKit/.test(navigator.userAgent)||/Chrome\//.test(navigator.userAgent));async function Vt(t){if(Dt)try{const n=await(await fetch(t)).blob(),i=await createImageBitmap(n,{imageOrientation:"flipY",premultiplyAlpha:"none",colorSpaceConversion:"default"}),o=new De(i);return o.flipY=!1,o.needsUpdate=!0,o}catch{}const c=new Image;c.decoding="async",c.src=t,await c.decode();const r=new De(c);return r.needsUpdate=!0,r}const we=()=>new Promise(t=>requestAnimationFrame(()=>t()));function Qt(t){const c=Rt(t.tier),r=matchMedia("(hover: hover) and (pointer: fine)").matches,n=new vt({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"});n.setPixelRatio(Pt(t.tier)),n.toneMapping=ft,n.toneMappingExposure=1.1,n.outputColorSpace=ge,n.setClearColor(921362,1);const i=new gt;i.background=new ht(921362);const o=new $e(55,1,.1,80);i.add(o);let d=null,l=window.innerWidth,Y=window.innerHeight;const F=()=>{const e=d&&t.getIconRect?.();e&&d.place(o,e,l,Y)},y=At(t.neon),[q,B,H,j]=t.neon.viewBox,G=$*j/H,b=document.createElement("canvas"),X=t.tier==="high"?2400:1500;b.width=X,b.height=Math.round(X*j/H);const N=b.getContext("2d"),T=document.createElement("canvas"),I=2.4,W=$+I*2,g=G+I*2;T.width=512,T.height=Math.round(512*g/W);const k=T.getContext("2d");let M=y.map(()=>0);const u=3,p=_t(t.neon,y,u,!1),S=[[48,26,.34],[18,12,.55],[5,5,.7]],R=Et(y,157,(e,s,a)=>{e.lineCap="butt";for(const[w,v,C]of S){e.filter=`blur(${(w*a).toFixed(1)}px)`,e.strokeStyle=`rgba(255,255,255,${C.toFixed(3)})`,e.lineWidth=v;for(const E of s)e.stroke(E)}});function h(){const e=b.width/H;N.clearRect(0,0,b.width,b.height),Ct(N,y,M,e,-q*e,-B*e,u),p(N,M,e,-q*e,-B*e),k.fillStyle="#000",k.fillRect(0,0,T.width,T.height);const s=T.width/W,a=$/H*s;R(k,M,a,I*s-q*a,I*s-B*a),A.needsUpdate=!0,_.needsUpdate=!0}const A=new Ne(b);A.colorSpace=ge,A.anisotropy=4;const _=new Ne(T);_.colorSpace=wt;const J=new Xe({map:A,transparent:!0,blending:ze,depthWrite:!1,toneMapped:!1}),Q=new L(new Ue($,G),J);Q.position.set(0,P,.06),i.add(Q);const m={uTex:{value:null},uGlow:{value:_},uGlowRect:{value:new xt(-W/2,P-g/2,W,g)},uTile:{value:new O(ye,je)},uTileOrigin:{value:new O(-ye/2,P+2.55-je)},uIgnite:{value:0},uHum:{value:1},uTime:{value:0},uSweepY:{value:P},uSweepAmt:{value:0},uPointer:{value:new O(0,P-2)},uPointerAmt:{value:0},uRes:{value:new O(1,1)}},Je=new Be({uniforms:m,vertexShader:zt,fragmentShader:Ut.replace("NEON_TOP",`${(P+2.5).toFixed(2)}`),defines:r?{POINTER:""}:{}}),be=new L(new Ue(40,46),Je);be.position.set(0,-2,0),i.add(be);const le=c.particles?420:160,Z=new Float32Array(le*3),Te=new Float32Array(le);for(let e=0;e<le;e++)Z[e*3]=(re(e*3+1)-.5)*16,Z[e*3+1]=(re(e*7+2)-.5)*18-1.5,Z[e*3+2]=.3+re(e*13+3)*4.2,Te[e]=re(e*17+5);const pe=new yt;pe.setAttribute("position",new ke(Z,3)),pe.setAttribute("aSeed",new ke(Te,1));const Me={uTime:{value:0},uPx:{value:3.2*n.getPixelRatio()}},Qe=new bt(pe,new Be({uniforms:Me,vertexShader:Bt,fragmentShader:kt,transparent:!0,depthWrite:!1,blending:ze}));i.add(Qe);let Se=.4,ee=1,de=800,Re=70,ue=Ye({stations:Pe(1.6),aspect:1.6});function Pe(e){const s=e<.8?64:55,a=Math.tan(xe.degToRad(s/2)),w=fe=>fe/2/(a*e),v=fe=>fe/2/a,C=e<.8,E=Math.max(w($/(C?.86:.48)),v(G*3.4)),se=(C?.24:.27)*ee,f=-(.5-se)*2*E*a;Se=se+G/(4*E*a);const x=Math.max(v(he*2.1/((C?.4:.6)*ee)),w(he*2.1/(C?.86:.9))),U=he/(x*a)*de*.5,ie=-(.5-Math.max((C?.33:.4)*ee,(Re+10+U)/de))*2*x*a,Fe=(P+V)/2;return[{p:[0,P+f,E],l:[0,P+f,0]},{p:[.45,Fe+.9,E*.97],l:[.1,Fe-.2,0]},{p:[0,V+ie,x],l:[0,V+ie,0]},{p:[0,V+ie*.96,x*.96],l:[0,V+ie*.96,0]}]}function Ze(e){return e<.05?0:e<.6?Ke((e-.05)/.55)*(2/3):e<.92?2/3+Nt((e-.6)/.32)*(1/3):1}const Ae=(e,s)=>ue.applyCamera(e,Ze(s)),te=document.createElement("div");te.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;pointer-events:none;visibility:hidden",document.body.appendChild(te);const oe=document.createElement("div");oe.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;pointer-events:none;visibility:hidden",document.body.appendChild(oe);let _e=0,Ce=0;function Ee(e=!1){const s=t.canvas.clientWidth||window.innerWidth,a=te.offsetHeight||window.innerHeight;if(!e&&s===_e&&Math.abs(a-Ce)<150)return;_e=s,Ce=a,l=window.innerWidth,Y=a,n.setSize(s,a,!1);const w=Number(new URLSearchParams(location.search).get("qa-bars"))||0;ee=Math.min(1,Math.max(.7,((oe.offsetHeight||a)-w)/a)),de=a,Re=document.querySelector("[data-nav]")?.offsetHeight||70;const v=s/a;o.aspect=v,o.fov=ue.fovForAspect(v),o.updateProjectionMatrix(),ue=Ye({stations:Pe(v),aspect:v}),document.documentElement.style.setProperty("--neon-bottom",`${(Se*100).toFixed(2)}vh`),m.uRes.value.set(n.domElement.width,n.domElement.height),F()}const Ge=()=>Ee();window.addEventListener("resize",Ge);const Ie=new O(0,0),K=new O(0,0);let We=0;const Oe=e=>{Ie.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),We=performance.now()};r&&window.addEventListener("pointermove",Oe,{passive:!0});const Le=new Ve,ne=new Ve;let me=-1;const ae=St({renderer:n,scene:i,camera:o,applyCamera:Ae,getTargetT:()=>ce(t.getProgress()),damping:.92,onFrame:({dt:e,time:s,renderT:a})=>{const w=a;me<0&&(me=s);const v=s-me;if(d){const f=1-Ke(ce(w/.16));f>.01&&F(),d.update(v,f)}if(v<=Gt+.1){const f=y.map((x,U)=>It(U,v));f.some((x,U)=>x!==M[U])&&(M=f,h(),M.every(x=>x===1)&&(p.release(),R.release()))}const C=M.reduce((f,x)=>f+x,0)/M.length,E=.985+.015*Math.sin(s*2.1)*Math.sin(s*.73);m.uIgnite.value=C,m.uHum.value=E,J.color.setScalar(E),m.uTime.value=s,Me.uTime.value=s;const se=ce((w-.05)/.55);if(m.uSweepY.value=xe.lerp(P-.5,V+1.2,se),m.uSweepAmt.value=Math.sin(Math.PI*ce((w-.04)/.58)),r){K.lerp(Ie,1-Math.exp(-6*e)),Le.set(K.x,K.y,.5).unproject(o),ne.copy(Le).sub(o.position).normalize();const f=-o.position.z/ne.z;m.uPointer.value.set(o.position.x+ne.x*f,o.position.y+ne.y*f);const U=performance.now()-We<2500?1:0;m.uPointerAmt.value+=(U-m.uPointerAmt.value)*(1-Math.exp(-2*e)),o.position.x+=K.x*.12,o.position.y+=K.y*.08}}});let z=!1,ve=!0;return{ready:(async()=>{const e=await Vt(t.marbleUrl);z||(await we(),!z&&(t.getIconRect&&(d=await Ht(n,o)),await we(),!z&&(e.colorSpace=ge,e.wrapS=e.wrapT=Tt,e.anisotropy=n.capabilities.getMaxAnisotropy(),m.uTex.value=e,Ee(!0),h(),await we(),!z&&(n.extensions.has("KHR_parallel_shader_compile")&&(await n.compileAsync(i,o),z)||(Mt(n,i,o,Ae),ve&&ae.start())))))})(),setActive(e){e===ve||z||(ve=e,e?ae.start():ae.stop())},dispose(){z=!0,ae.dispose(),d?.dispose(),window.removeEventListener("resize",Ge),window.removeEventListener("pointermove",Oe),te.remove(),oe.remove(),i.traverse(e=>{const s=e;s.geometry?.dispose?.();const a=s.material;Array.isArray(a)?a.forEach(w=>w.dispose()):a?.dispose?.()}),A.dispose(),_.dispose(),n.dispose()}}}export{Qt as createHero};
