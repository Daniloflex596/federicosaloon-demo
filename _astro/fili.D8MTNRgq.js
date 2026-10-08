import{h as Q,O as X,j as Z,r as $,s as C,w as M,q as ee,p as ae,x as oe}from"./three.module.BCv813u3.js";import{b as R}from"./v28.astro_astro_type_script_index_0_lang.YA-i9COI.js";import"./neon-paths.B4VCQnq5.js";import"./lenis.CciUKl-_.js";const a=h=>{const g=parseInt(h.slice(1),16);return[(g>>16&255)/255,(g>>8&255)/255,(g&255)/255]},U={len:1,lenVar:.12,cut:2,cutAmt:0,waveA:.03,waveF:1.6,waveSpeed:.18,frizz:0,clump:.62,sway:.012,root:a("#2a1a12"),tip:a("#6b4428"),hi:a("#f0d39c"),hiFrac:0,gradMid:.6,gradSoft:.3,shine:.55,tipGlow:.18,alpha:.5},s=h=>({...U,...h}),b={riposo:s({}),piega:s({waveA:.075,waveF:2.3,waveSpeed:.22,root:a("#3a2416"),tip:a("#9a6a3c"),shine:1,clump:.7}),"taglio-donna":s({cut:.6,cutAmt:1,lenVar:.03,waveA:.012,waveF:1.2,root:a("#2b1911"),tip:a("#5b3721"),clump:.4,shine:.7}),"taglio-prima":s({lenVar:.16,waveA:.02,waveF:1.3,root:a("#2b1911"),tip:a("#5b3721"),clump:.5,shine:.7}),"taglio-uomo":s({len:.56,lenVar:.32,cut:.5,cutAmt:.85,waveA:.026,waveF:3.2,frizz:.16,clump:.9,root:a("#1b130e"),tip:a("#4a3322"),shine:.6,tipGlow:.45,alpha:.62}),colore:s({waveA:.04,waveF:1.8,root:a("#2a0610"),tip:a("#b81d48"),gradMid:.3,gradSoft:.25,shine:.95}),balayage:s({waveA:.055,waveF:2,root:a("#24160f"),tip:a("#e8c48a"),gradMid:.55,gradSoft:.24,shine:.9,tipGlow:.3}),"colpi-di-sole":s({waveA:.035,root:a("#36231a"),tip:a("#5b3d27"),hi:a("#f2d9a6"),hiFrac:.26,shine:.75}),henne:s({waveA:.03,root:a("#4a140b"),tip:a("#a3401f"),gradMid:.4,shine:.4}),"extension-inizio":s({len:.5,lenVar:.22,waveA:.04,waveF:1.7,root:a("#2e1d14"),tip:a("#8a643f"),alpha:.5,shine:.7}),extension:s({len:1.25,lenVar:.06,waveA:.05,waveF:1.7,root:a("#2e1d14"),tip:a("#a0754a"),alpha:.6,shine:.85}),anticrespo:s({frizz:1,waveA:.012,clump:.5,root:a("#2a1a12"),tip:a("#5a3c28"),shine:.12,sway:.016,alpha:.42}),"anticrespo-fine":s({frizz:0,waveA:.004,waveF:1,clump:.55,lenVar:.04,root:a("#2a1a12"),tip:a("#5c3b24"),shine:1.25,sway:.006})},K=Object.keys(U);function se(h,g,T){const y={};for(const r of K){const c=h[r],w=g[r];Array.isArray(c)?y[r]=[0,1,2].map(x=>c[x]+(w[x]-c[x])*T):y[r]=c+(w-c)*T}return y}const te=`
attribute vec4 aR;
attribute float aT;
uniform float uTime;
uniform vec4 uBox;          // x0, x1, yTop, yBottom
uniform float uLen, uLenVar, uCut, uCutAmt;
uniform float uWaveA, uWaveF, uWavePh;
uniform float uFrizz, uClump, uSway;
uniform vec3 uRoot, uTip, uHi;
uniform float uHiFrac, uGradMid, uGradSoft, uShine, uShineY, uTipGlow, uAlpha;
uniform vec3 uPointer;      // x, y, forza
uniform float uWind;        // velocità dello scroll, smorzata
uniform float uGrow;        // 0..1: la chioma scende dall'alto entrando in scena (la luce che diventa capello)
uniform float uFlare;       // la chioma si allarga verso il basso (bordo in diagonale)
varying vec3 vCol;
varying float vA;

float h1(float n) { return fract(sin(n * 12.9898) * 43758.5453); }

void main() {
  float u = aR.x;
  // ciocche: i fili vicini seguono la stessa guida e si stringono verso le punte
  float NC = 54.0;
  float ci = floor(u * NC);
  float cr = h1(ci + 3.7);
  float cu = (ci + 0.5 + (cr - 0.5) * 0.35) / NC;
  float du = u - cu;

  float H = uBox.z - uBox.w;
  float L = uLen * (1.0 - uLenVar * aR.z);
  L = mix(L, min(L, uCut), uCutAmt);
  // discesa: ogni filo arriva con un piccolo ritardo suo, come una colata di luce
  float gr = clamp(uGrow * 1.35 - aR.y * 0.35, 0.0, 1.0);
  L *= gr * gr * (3.0 - 2.0 * gr);
  float t = aT * L;
  float y = uBox.z - t * H;

  float conv = mix(1.0, 1.0 - uClump, pow(aT, 1.4));
  float x = mix(uBox.x, uBox.y, cu + du * conv);
  x -= (1.0 - u) * pow(t, 1.25) * uFlare;

  // onda: le ciocche vicine ondeggiano INSIEME (fase che scorre lungo la testa, non a caso),
  // con una piccola libertà per ciocca e per filo — è così che un'onda vera attraversa la chioma
  float ph = uWavePh + cu * 2.4 + (cr - 0.5) * 0.8;
  float wf = uWaveF * (0.9 + 0.2 * cr);
  float wa = uWaveA * (0.7 + 0.6 * h1(ci + 9.1));
  float arg = t * wf * 6.2831 + ph;
  float onset = smoothstep(0.0, 0.22, t);
  x += sin(arg) * wa * onset;
  x += sin(t * wf * 6.7 + aR.w * 6.2831) * wa * 0.14 * onset;
  // respiro lento (ampiezza minima: non è un'animazione autonoma, è aria)
  x += sin(uTime * 0.55 + cu * 3.0 + t * 1.7) * uSway * t * t;
  x += sin(uTime * 2.1 + cu * 4.0 + t * 2.6 + cr) * uWind * 0.05 * t * t;

  // crespo: ciocche che si arricciano a frequenza media, ampiezza diversa per filo,
  // e qualche filo ribelle che esce dalla chioma
  // (dalla foto vera del «prima» anticrespo: ondulazione fitta e coerente per ciocca,
  //  volume che si apre verso le punte, peluria fine e qualche filo ribelle)
  float crimpF = 6.0 + 3.0 * h1(ci + 4.4);
  x += sin(t * crimpF * 6.2831 + cr * 6.0 + aR.w * 1.6) * uFrizz * 0.026 * (0.35 + t);
  x += sin(t * 61.0 + aR.w * 91.0) * uFrizz * 0.007 * (0.3 + t);
  x += (u - 0.5) * uFrizz * 0.22 * t * (uBox.y - uBox.x) * 0.25;
  y += cos(t * 23.0 + aR.y * 77.0) * uFrizz * 0.012 * t;
  float rebel = step(0.88, h1(u * 777.0 + 5.0));
  x += rebel * sin(t * 7.0 + aR.w * 20.0) * uFrizz * 0.085 * t;

  // pettine: il puntatore apre una riga tra i capelli
  // spinta CONTINUA (vale 0 al centro): con sign() due fili vicini partivano in direzioni
  // opposte e si strappavano in segmenti dritti (visto con GPU reale, _qa/v2f/gpu-balayage)
  vec2 d = vec2(x, y) - uPointer.xy;
  float f = exp(-dot(d, d) / 0.06) * uPointer.z;
  x += d.x / (length(d) + 0.09) * f * 0.075 * smoothstep(0.0, 0.3, t);

  // colore: radice → punte, con la mano libera del colorista (variazione per filo)
  float g = smoothstep(uGradMid - uGradSoft, uGradMid + uGradSoft, aT + (aR.y - 0.5) * 0.22);
  vec3 col = mix(uRoot, uTip, g);
  float isHi = step(h1(u * 917.0 + 1.3), uHiFrac);
  col = mix(col, uHi, isHi * smoothstep(0.02, 0.2, aT));

  // profondità: i fili dietro sono più scuri e trasparenti
  float depth = h1(u * 1931.0 + 7.0);
  col *= mix(0.42, 1.08, depth);

  // lucentezza: una banda che prende le creste dell'onda, sfalsata ciocca per ciocca
  float band = exp(-pow((y - uShineY - (cr - 0.5) * 0.14) / 0.15, 2.0));
  float crest = 0.45 + 0.55 * abs(cos(arg));
  col += vec3(1.0, 0.9, 0.72) * band * crest * uShine * 0.42 * (0.4 + depth * 0.6);
  // controluce: le punte sottili lasciano passare la luce dell'insegna
  col += vec3(1.0, 0.78, 0.45) * smoothstep(0.62, 1.0, aT) * uTipGlow * 0.5;

  // finché scende, la punta è ancora luce dell'insegna
  col = mix(col, vec3(1.0, 0.92, 0.76), (1.0 - gr) * smoothstep(0.55, 1.0, aT) * 0.85);
  vCol = col;
  // bordo della chioma: si dirada, non si taglia
  float edge = smoothstep(0.0, 0.16, u) * (1.0 - smoothstep(0.93, 1.0, u));
  vA = uAlpha * mix(0.3, 1.0, depth) * edge * smoothstep(0.0, 0.03, aT) * (1.0 - smoothstep(0.9, 1.0, aT) * 0.7);
  vA *= 1.0 - f * 0.45; // nella riga del pettine i fili si diradano
  gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, 0.0, 1.0);
}`,ie=`
varying vec3 vCol;
varying float vA;
void main() { gl_FragColor = vec4(vCol, vA); }`;function pe({canvas:h,tier:g,layout:T="auto"}){const y=g==="high",r=new Q({canvas:h,antialias:!0,alpha:!0,powerPreference:y?"high-performance":"default"});r.setClearColor(0,0);const c=new X(-1,1,1,-1,-1,1),w=new Z,x=y?5600:2400,A=y?46:30,P=x*(A+1),F=new Float32Array(P*4),H=new Float32Array(P),W=new Uint32Array(x*A*2);let E=0;for(let e=0;e<x;e++){const i=(e+R(e*3+1)*.9)/x,v=R(e*7+11),p=R(e*13+17),t=R(e*19+23);for(let f=0;f<=A;f++){const l=e*(A+1)+f;F[l*4]=i,F[l*4+1]=v,F[l*4+2]=p,F[l*4+3]=t,H[l]=f/A,f<A&&(W[E++]=l,W[E++]=l+1)}}const z=new $;z.setAttribute("position",new C(new Float32Array(P*3),3)),z.setAttribute("aR",new C(F,4)),z.setAttribute("aT",new C(H,1)),z.setIndex(new C(W,1));const o={...b.riposo,root:[...b.riposo.root],tip:[...b.riposo.tip],hi:[...b.riposo.hi]};let N=b.riposo;const u={uTime:{value:0},uBox:{value:new ee(-1,1,1.12,-1.2)},uLen:{value:1},uLenVar:{value:0},uCut:{value:2},uCutAmt:{value:0},uWaveA:{value:0},uWaveF:{value:1},uWavePh:{value:0},uFrizz:{value:0},uClump:{value:.6},uSway:{value:0},uRoot:{value:new M},uTip:{value:new M},uHi:{value:new M},uHiFrac:{value:0},uGradMid:{value:.5},uGradSoft:{value:.3},uShine:{value:.5},uShineY:{value:.2},uTipGlow:{value:.2},uAlpha:{value:.5},uPointer:{value:new M(9,9,0)},uFlare:{value:0},uWind:{value:0},uGrow:{value:1}},Y=new ae({vertexShader:te,fragmentShader:ie,uniforms:u,transparent:!0,depthTest:!1,depthWrite:!1}),q=new oe(z,Y);q.frustumCulled=!1,w.add(q);let d=1,B=!1,L=0,I=0;const n={x:9,y:9,tx:9,ty:9,amt:0,on:!1};let G=0,V=0,m=1;function _(){const e=h.clientWidth||1,i=h.clientHeight||1;r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setSize(e,i,!1),d=e/i,c.left=-d,c.right=d,c.updateProjectionMatrix();const v=T==="full",p=d<.9||v,t=p?-d*1.18:-d*.02,f=p?d*1.18:d*1.16,l=v?-1.22:p?-.18:-1.22;u.uBox.value.set(t,f,1.12,l),u.uFlare.value=p?0:d*.42}function k(e){const i=1-Math.exp(-e*3.2),v=o,p=N;for(const f of K){const l=v[f],O=p[f];if(Array.isArray(l))for(let S=0;S<3;S++)l[S]+=(O[S]-l[S])*i;else v[f]=l+(O-l)*i}const t=u;t.uLen.value=o.len,t.uLenVar.value=o.lenVar,t.uCut.value=o.cut,t.uCutAmt.value=o.cutAmt,t.uWaveA.value=o.waveA,t.uWaveF.value=o.waveF,t.uFrizz.value=o.frizz,t.uClump.value=o.clump,t.uSway.value=o.sway,t.uRoot.value.set(...o.root),t.uTip.value.set(...o.tip),t.uHi.value.set(...o.hi),t.uHiFrac.value=o.hiFrac,t.uGradMid.value=o.gradMid,t.uGradSoft.value=o.gradSoft,t.uShine.value=o.shine,t.uTipGlow.value=o.tipGlow,t.uAlpha.value=o.alpha}function D(e){if(!B)return;e=Math.min(e,.05),L+=e,I+=e*o.waveSpeed,k(e),n.x+=(n.tx-n.x)*(1-Math.exp(-e*10)),n.y+=(n.ty-n.y)*(1-Math.exp(-e*10)),n.amt+=((n.on?1:0)-n.amt)*(1-Math.exp(-e*4)),u.uPointer.value.set(n.x,n.y,n.amt),G+=(V-G)*(1-Math.exp(-e*(V>G?5:1.4))),u.uWind.value=G,u.uTime.value=L,u.uWavePh.value=I;const i=.35+Math.sin(L*.22)*.25;if(m<1){m=Math.min(1,m+e/1.3);const p=1.25-m*m*(3-2*m)*2.6;u.uShineY.value=m<.85?p:p+(i-p)*((m-.85)/.15)}else u.uShineY.value=i;!j&&performance.now()-J<1500||r.render(w,c)}_(),k(10);let j=!1;const J=performance.now();return(r.extensions.has("KHR_parallel_shader_compile")?r.compileAsync(w,c):Promise.resolve().then(()=>void r.compile(w,c))).catch(()=>{}).finally(()=>{j=!0;const e=window.requestIdleCallback,i=()=>!B&&r.render(w,c);e?e(i):window.setTimeout(i,200)}),{setTarget(e){N=e},flash(){m=0},setPointer(e,i,v){n.tx=(e*2-1)*d,n.ty=1-i*2,n.on=v},setWind(e){V=e},setGrow(e){u.uGrow.value=e},setActive(e){B=e},resize:_,frame:D,cutScreenY(){const e=u.uBox.value.z-u.uBox.value.w,i=Math.min(o.len*(1-o.lenVar*.5),o.cut);return(1-(u.uBox.value.z-i*e))/2},dispose(){z.dispose(),Y.dispose(),r.dispose()}}}export{b as PRESETS,pe as createFili,se as mixPreset};
