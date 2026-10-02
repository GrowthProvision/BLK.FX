import { useEffect, useRef, useState, type CSSProperties } from "react";

const locations: [number, number][] = [[51.5,-.12],[40.71,-74.01],[25.2,55.27],[50.11,8.68],[43.65,-79.38],[-33.87,151.21],[-26.2,28.04],[47.38,8.54],[35.68,139.69],[22.32,114.17]];
const cards = [
 {label:"Conversion booked",detail:"GBP → EUR · £250,000 · Rate locked"},
 {label:"Payment sent",detail:"USD → AED · Same day"},
 {label:"Forward booked",detail:"EUR/GBP · 6 months · Budget rate fixed"},
 {label:"Payment received",detail:"CAD → GBP · Credited to your account"},
 {label:"Conversion booked",detail:"GBP → USD · $1.2m · Settled next day"},
] as const;
const rainColumns = [
 [2,11.4,-3.2,"£€$¥€£$¥£€$¥€£¥$",.18,0],[7,8.7,-7.1,"$¥£€$€¥£$¥€£¥$€£",.27,1],[12,13.2,-1.4,"€£¥$€$£¥€£$¥£€¥$",.14,0],[18,9.6,-5.8,"¥$€£¥£$€¥$£€$¥€£",.23,0],[23,12.1,-9.3,"£¥€$£€¥$£¥$€€£$¥",.16,1],
 [29,7.9,-2.6,"€$£¥€¥$£€$¥££€¥$",.29,0],[35,10.8,-8.4,"$£€¥$¥£€$£¥€¥$€£",.17,0],[41,14.1,-4.7,"¥€$£¥£€$¥€£$$¥£€",.13,1],[46,9.1,-6.5,"£$¥€£€$¥£¥€$$£€¥",.24,0],[52,11.8,-.9,"€¥£$€$¥£€£$¥¥€$£",.19,0],
 [58,8.4,-5.1,"$€¥£$£€¥$¥£€€$¥£",.28,1],[63,13.6,-10.2,"¥£$€¥€£$¥$€££¥€$",.15,0],[69,10.2,-3.9,"£€¥$£$€¥£¥$€€£¥$",.21,0],[74,7.6,-6.8,"€£$¥€¥£$€$¥£¥€$£",.3,0],[80,12.7,-1.8,"$¥€£$£¥€$€£¥£$€¥",.16,1],
 [85,9.9,-8.9,"¥$£€¥€$£¥£€$$¥€£",.22,0],[90,14.4,-5.5,"£¥$€£€¥$£$€¥¥£$€",.13,0],[94,8.9,-2.1,"€$¥£€£$¥€¥£$$€¥£",.26,1],[97,11.1,-7.7,"$£¥€$€£¥$¥€££$¥€",.17,0],
] as const;

export function HeroCurrencyRain(){
 return <div className="hero-currency-rain" aria-hidden="true">{rainColumns.flatMap(([x,duration,delay,symbols,opacity,orange],index)=>[0,1].map(copy=><span key={`${index}-${copy}`} className={orange?"is-orange":undefined} style={{"--rain-column":`${x}%`,"--rain-duration":`${duration}s`,"--rain-delay":`${delay-(copy*duration/2)}s`,"--rain-opacity":opacity} as CSSProperties}>{symbols.split("").concat(symbols.split("").reverse()).join("\n")}</span>))}</div>
}

type DragState = {id:number;x:number;y:number;startedAt:number;touch:boolean;locked:boolean}|null;

export function HeroGlobe(){
 const wrapper=useRef<HTMLDivElement>(null);const visual=useRef<HTMLDivElement>(null);const canvas=useRef<HTMLCanvasElement>(null);const drag=useRef<DragState>(null);const rotation=useRef({phi:-.72,theta:.16,vPhi:0,vTheta:0,resumeAt:0});const hover=useRef({x:0,y:0});const[card,setCard]=useState(0);const[dragging,setDragging]=useState(false);
  useEffect(()=>{let destroy:undefined|(()=>void);let mounted=true;let last=performance.now();let renderVersion=0;const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;const node=canvas.current;const frame=visual.current;if(!node||!frame)return undefined;const render=async()=>{const version=++renderVersion;const{default:createGlobe}=await import("cobe");if(!mounted||version!==renderVersion)return;const rect=frame.getBoundingClientRect();const size=Math.max(1,Math.round(Math.min(rect.width,rect.height)));const ratio=Math.min(window.devicePixelRatio||1,2);destroy?.();last=performance.now();const globe=createGlobe(node,{devicePixelRatio:ratio,width:size*ratio,height:size*ratio,offset:[0,0],scale:1.25,phi:rotation.current.phi,theta:rotation.current.theta,dark:1,diffuse:2.2,mapSamples:size<420?24000:40000,mapBrightness:9,mapBaseBrightness:.025,baseColor:[.78,.78,.78],markerColor:[1,.278,0],glowColor:[.55,.22,.08],markers:locations.map((location,i)=>({location,size:i===0?.07:.036})),onRender:(state)=>{const now=performance.now();const dt=Math.min((now-last)/1000,.05);last=now;const motion=rotation.current;if(!reduced&&drag.current===null){motion.phi+=motion.vPhi*dt;motion.theta=Math.max(-1.05,Math.min(1.05,motion.theta+motion.vTheta*dt));const damping=Math.exp(-3.7*dt);motion.vPhi*=damping;motion.vTheta*=damping;if(now>motion.resumeAt)motion.phi+=.17*dt}const tiltX=reduced?0:hover.current.x*.045;const tiltY=reduced?0:hover.current.y*.035;state["phi"]=motion.phi+tiltX;state["theta"]=Math.max(-1.1,Math.min(1.1,motion.theta+tiltY));state["width"]=size*ratio;state["height"]=size*ratio;}});destroy=()=>globe.destroy()};void render();let resizeTimer=0;const queueRender=()=>{window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>void render(),100)};const observer=new ResizeObserver(queueRender);observer.observe(frame);window.addEventListener("resize",queueRender,{passive:true});window.visualViewport?.addEventListener("resize",queueRender,{passive:true});const id=reduced?0:window.setInterval(()=>setCard(v=>(v+1)%cards.length),3500);return()=>{mounted=false;renderVersion++;observer.disconnect();window.removeEventListener("resize",queueRender);window.visualViewport?.removeEventListener("resize",queueRender);window.clearTimeout(resizeTimer);destroy?.();if(id)clearInterval(id)}},[]);
 const finishDrag=(pointerId:number)=>{const current=drag.current;if(!current||current.id!==pointerId)return;rotation.current.resumeAt=performance.now()+2000;drag.current=null;setDragging(false)};
 const activeCard=cards[card]??cards[0];
  return <div ref={wrapper} className={`hero-globe ${dragging?"is-dragging":""}`} data-globe
  onPointerDown={e=>{drag.current={id:e.pointerId,x:e.clientX,y:e.clientY,startedAt:performance.now(),touch:e.pointerType==="touch",locked:e.pointerType!=="touch"};if(e.pointerType!=="touch"){e.currentTarget.setPointerCapture(e.pointerId);setDragging(true)}}}
  onPointerMove={e=>{const current=drag.current;if(!current||current.id!==e.pointerId){if(e.pointerType==="mouse"){const rect=e.currentTarget.getBoundingClientRect();hover.current={x:(e.clientX-rect.left)/rect.width*2-1,y:(e.clientY-rect.top)/rect.height*2-1}}return}const totalX=e.clientX-current.x;const totalY=e.clientY-current.y;if(current.touch&&!current.locked){if(Math.abs(totalX)<7&&Math.abs(totalY)<7)return;if(Math.abs(totalY)>Math.abs(totalX)){drag.current=null;return}current.locked=true;e.currentTarget.setPointerCapture(e.pointerId);setDragging(true)}const dx=e.clientX-current.x;const dy=e.clientY-current.y;const dt=Math.max((performance.now()-current.startedAt)/1000,.008);rotation.current.phi+=dx/180;rotation.current.theta=Math.max(-1.05,Math.min(1.05,rotation.current.theta-dy/180));rotation.current.vPhi=(dx/180)/dt;rotation.current.vTheta=(-dy/180)/dt;current.x=e.clientX;current.y=e.clientY;current.startedAt=performance.now()}}
  onPointerUp={e=>finishDrag(e.pointerId)} onPointerCancel={e=>finishDrag(e.pointerId)} onPointerLeave={e=>{hover.current={x:0,y:0};if(e.pointerType==="mouse"&&!e.currentTarget.hasPointerCapture(e.pointerId))finishDrag(e.pointerId)}}>
   <div ref={visual} className="hero-globe-visual"><canvas ref={canvas} aria-label="Interactive globe with BLK.FX city locations. Drag horizontally or vertically to turn it."/></div>
  <div className="payment-float" key={card}><span><i aria-hidden="true"/>{activeCard.label}</span><strong><b aria-hidden="true">✓</b>{activeCard.detail}</strong></div>
 </div>;
}