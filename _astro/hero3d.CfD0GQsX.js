import{W as Ye,A as ke,S as Z,a as je,C as qe,P as $e,b as Ce,N as Ke,M as Xe,c as Ee,d as _e,e as Ie,f as Oe,V as S,g as Je,B as Qe,h as We,i as Ze,j as et,T as Fe,k as Ne,l as Ge}from"./three.module.BOhqKR8L.js";import{c as Ue,p as tt,a as ot}from"./render-loop.DAZDssxM.js";import{t as nt,p as at}from"./capability.BNYK3-LX.js";import{t as it,a as rt,p as H,d as st,l as lt,I as ct,g as ut}from"./neon.C4J96Zby.js";import{n as dt}from"./index.astro_astro_type_script_index_0_lang.CN0yLSP2.js";import"./neon-paths.B4VCQnq5.js";const C=7,m=3.4,T=-14,ee=1.62,oe=16,Le=oe*(1230/1080),te=t=>t<0?0:t>1?1:t,mt=t=>t*t*(3-2*t),pt=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,vt=`
varying vec2 vWorld;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorld = wp.xy;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,ft=`
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
}`,gt=`
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
}`,wt=`
varying float vA;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vA * 0.55;
  gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a, a);
}`,ht=typeof createImageBitmap=="function"&&(!/AppleWebKit/.test(navigator.userAgent)||/Chrome\//.test(navigator.userAgent));async function xt(t){if(ht)try{const i=await(await fetch(t)).blob(),l=await createImageBitmap(i,{imageOrientation:"flipY",premultiplyAlpha:"none",colorSpaceConversion:"default"}),a=new Fe(l);return a.flipY=!1,a.needsUpdate=!0,a}catch{}const x=new Image;x.decoding="async",x.src=t,await x.decode();const b=new Fe(x);return b.needsUpdate=!0,b}const He=()=>new Promise(t=>requestAnimationFrame(()=>t()));function Ct(t){const x=nt(t.tier),b=matchMedia("(hover: hover) and (pointer: fine)").matches,i=new Ye({canvas:t.canvas,antialias:!0,alpha:!1,powerPreference:"high-performance"});i.setPixelRatio(at(t.tier)),i.toneMapping=ke,i.toneMappingExposure=1.1,i.outputColorSpace=Z,i.setClearColor(921362,1);const l=new je;l.background=new qe(921362);const a=new $e(55,1,.1,80);l.add(a);const A=it(t.neon),[B,z,E,ne]=t.neon.viewBox,D=C*ne/E,g=document.createElement("canvas"),ae=t.tier==="high"?2400:1500;g.width=ae,g.height=Math.round(ae*ne/E);const V=g.getContext("2d"),w=document.createElement("canvas"),_=2.4,I=C+_*2,Y=D+_*2;w.width=512,w.height=Math.round(512*Y/I);const k=w.getContext("2d");let v=A.map(()=>0);const ie=3,re=rt(t.neon,A,ie,!1),Be=[[48,26,.34],[18,12,.55],[5,5,.7]],se=lt(A,157,(e,n,o)=>{e.lineCap="butt";for(const[u,r,p]of Be){e.filter=`blur(${(u*o).toFixed(1)}px)`,e.strokeStyle=`rgba(255,255,255,${p.toFixed(3)})`,e.lineWidth=r;for(const f of n)e.stroke(f)}});function le(){const e=g.width/E;V.clearRect(0,0,g.width,g.height),st(V,A,v,e,-B*e,-z*e,ie),re(V,v,e,-B*e,-z*e),k.fillStyle="#000",k.fillRect(0,0,w.width,w.height);const n=w.width/I,o=C/E*n;se(k,v,o,_*n-B*o,_*n-z*o),M.needsUpdate=!0,O.needsUpdate=!0}const M=new Ce(g);M.colorSpace=Z,M.anisotropy=4;const O=new Ce(w);O.colorSpace=Ke;const ce=new Xe({map:M,transparent:!0,blending:Ee,depthWrite:!1,toneMapped:!1}),ue=new _e(new Ie(C,D),ce);ue.position.set(0,m,.06),l.add(ue);const c={uTex:{value:null},uGlow:{value:O},uGlowRect:{value:new Je(-I/2,m-Y/2,I,Y)},uTile:{value:new S(oe,Le)},uTileOrigin:{value:new S(-oe/2,m+2.55-Le)},uIgnite:{value:0},uHum:{value:1},uTime:{value:0},uSweepY:{value:m},uSweepAmt:{value:0},uPointer:{value:new S(0,m-2)},uPointerAmt:{value:0},uRes:{value:new S(1,1)}},ze=new Oe({uniforms:c,vertexShader:vt,fragmentShader:ft.replace("NEON_TOP",`${(m+2.5).toFixed(2)}`),defines:b?{POINTER:""}:{}}),de=new _e(new Ie(40,46),ze);de.position.set(0,-2,0),l.add(de);const j=x.particles?420:160,W=new Float32Array(j*3),me=new Float32Array(j);for(let e=0;e<j;e++)W[e*3]=(H(e*3+1)-.5)*16,W[e*3+1]=(H(e*7+2)-.5)*18-1.5,W[e*3+2]=.3+H(e*13+3)*4.2,me[e]=H(e*17+5);const q=new Qe;q.setAttribute("position",new We(W,3)),q.setAttribute("aSeed",new We(me,1));const pe={uTime:{value:0},uPx:{value:3.2*i.getPixelRatio()}},De=new Ze(q,new Oe({uniforms:pe,vertexShader:gt,fragmentShader:wt,transparent:!0,depthWrite:!1,blending:Ee}));l.add(De);let ve=.4,P=1,$=800,fe=70,K=Ue({stations:ge(1.6),aspect:1.6});function ge(e){const n=e<.8?64:55,o=Math.tan(Ne.degToRad(n/2)),u=Q=>Q/2/(o*e),r=Q=>Q/2/o,p=e<.8,f=Math.max(u(C/(p?.86:.48)),r(D*3.4)),d=-(.5-(p?.24:.27)*P)*2*f*o;ve=dt(e,P);const s=Math.max(r(ee*2.1/((p?.4:.6)*P)),u(ee*2.1/(p?.86:.9))),h=ee/(s*o)*$*.5,L=-(.5-Math.max((p?.33:.4)*P,(fe+10+h)/$))*2*s*o,Re=(m+T)/2;return[{p:[0,m+d,f],l:[0,m+d,0]},{p:[.45,Re+.9,f*.97],l:[.1,Re-.2,0]},{p:[0,T+L,s],l:[0,T+L,0]},{p:[0,T+L*.96,s*.96],l:[0,T+L*.96,0]}]}function Ve(e){return e<.05?0:e<.52?mt((e-.05)/.47)*(2/3):e<.92?2/3+pt((e-.52)/.4)*(1/3):1}const we=(e,n)=>K.applyCamera(e,Ve(n)),F=document.createElement("div");F.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;pointer-events:none;visibility:hidden",document.body.appendChild(F);const N=document.createElement("div");N.style.cssText="position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;pointer-events:none;visibility:hidden",document.body.appendChild(N);let he=0,xe=0;function be(e=!1){const n=t.canvas.clientWidth||window.innerWidth,o=F.offsetHeight||window.innerHeight;if(!e&&n===he&&Math.abs(o-xe)<150)return;he=n,xe=o,i.setSize(n,o,!1);const u=Number(new URLSearchParams(location.search).get("qa-bars"))||0;P=Math.min(1,Math.max(.7,((N.offsetHeight||o)-u)/o)),$=o,fe=document.querySelector("[data-nav]")?.offsetHeight||70;const r=n/o;a.aspect=r,a.fov=K.fovForAspect(r),a.updateProjectionMatrix(),K=Ue({stations:ge(r),aspect:r}),document.documentElement.style.setProperty("--neon-bottom",`${(ve*100).toFixed(2)}vh`),c.uRes.value.set(i.domElement.width,i.domElement.height)}const ye=()=>be();window.addEventListener("resize",ye);const Se=new S(0,0),R=new S(0,0);let Te=0;const Ae=e=>{Se.set(e.clientX/window.innerWidth*2-1,-(e.clientY/window.innerHeight)*2+1),Te=performance.now()};b&&window.addEventListener("pointermove",Ae,{passive:!0});const Me=new Ge,G=new Ge;let X=-1;const U=ot({renderer:i,scene:l,camera:a,applyCamera:we,getTargetT:()=>te(t.getProgress()),damping:.92,onFrame:({dt:e,time:n,renderT:o})=>{const u=o;X<0&&(X=n);const r=n-X;if(r<=ct+.1){const d=A.map((s,h)=>ut(h,r));d.some((s,h)=>s!==v[h])&&(v=d,le(),v.every(s=>s===1)&&(re.release(),se.release()))}const p=v.reduce((d,s)=>d+s,0)/v.length,f=.985+.015*Math.sin(n*2.1)*Math.sin(n*.73);c.uIgnite.value=p,c.uHum.value=f,ce.color.setScalar(f),c.uTime.value=n,pe.uTime.value=n;const Pe=te((u-.05)/.55);if(c.uSweepY.value=Ne.lerp(m-.5,T+1.2,Pe),c.uSweepAmt.value=Math.sin(Math.PI*te((u-.04)/.58)),b){R.lerp(Se,1-Math.exp(-6*e)),Me.set(R.x,R.y,.5).unproject(a),G.copy(Me).sub(a.position).normalize();const d=-a.position.z/G.z;c.uPointer.value.set(a.position.x+G.x*d,a.position.y+G.y*d);const h=performance.now()-Te<2500?1:0;c.uPointerAmt.value+=(h-c.uPointerAmt.value)*(1-Math.exp(-2*e)),a.position.x+=R.x*.12,a.position.y+=R.y*.08}}});let y=!1,J=!0;return{ready:(async()=>{const e=await xt(t.marbleUrl);y||(await He(),!y&&(e.colorSpace=Z,e.wrapS=e.wrapT=et,e.anisotropy=i.capabilities.getMaxAnisotropy(),c.uTex.value=e,be(!0),le(),await He(),!y&&(i.extensions.has("KHR_parallel_shader_compile")&&(await i.compileAsync(l,a),y)||(tt(i,l,a,we),J&&U.start()))))})(),setActive(e){e===J||y||(J=e,e?U.start():U.stop())},dispose(){y=!0,U.dispose(),window.removeEventListener("resize",ye),window.removeEventListener("pointermove",Ae),F.remove(),N.remove(),l.traverse(e=>{const n=e;n.geometry?.dispose?.();const o=n.material;Array.isArray(o)?o.forEach(u=>u.dispose()):o?.dispose?.()}),M.dispose(),O.dispose(),i.dispose()}}}export{Ct as createHero};
