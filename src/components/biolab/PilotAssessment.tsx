import { useState } from "react";
import type { Track } from "@/data/resilience-expansion";
type PilotTrack=Track;
type Phase="pre"|"post";
type Question=[string,string,string,string,number];
const bank:Record<PilotTrack,Record<Phase,Question[]>>={
  general:{"pre":[["Un organismo se parece visualmente a una pieza. ¿Qué hace válida la inspiración?","La función, el mecanismo causal y sus límites de transferencia","La semejanza de forma por sí sola","La popularidad de la inspiración",0],["Una idea biomimética promete reducir una vulnerabilidad. ¿Cómo evaluarla?","Aceptar la mejora por su origen biológico","Medir solo el número de ideas","Una referencia equivalente, indicadores y ensayos que puedan refutarla",2],["Un equipo identifica calor futuro o una dependencia de suministro. ¿Qué debe conectar su propuesta?","La solución y su coste sin analizar la función","Amenaza, función vulnerable, mecanismo propuesto y responsable de verificarlo","El organismo y una promesa genérica de sostenibilidad",1],["Una propuesta es prometedora, pero no ha sido ensayada. ¿Qué se puede afirmar?","Es una hipótesis de aprendizaje pendiente de verificación","La propuesta está aprobada para uso real","La mejora operativa está demostrada",0]],"post":[["Una estructura natural presenta una forma atractiva. ¿Qué debes investigar primero?","La semejanza de forma por sí sola","La popularidad de la inspiración","La función, el mecanismo causal y sus límites de transferencia",2],["Una propuesta imita una estrategia natural y declara mayor durabilidad. ¿Qué falta?","Medir solo el número de ideas","Una referencia equivalente, indicadores y ensayos que puedan refutarla","Aceptar la mejora por su origen biológico",1],["Una hipótesis afecta a un componente o proceso. ¿Cómo vincularla al trabajo profesional?","Amenaza, función vulnerable, mecanismo propuesto y responsable de verificarlo","El organismo y una promesa genérica de sostenibilidad","La solución y su coste sin analizar la función",0],["La idea obtiene buena puntuación en el taller. ¿Qué conclusión está justificada?","La propuesta está aprobada para uso real","La mejora operativa está demostrada","Es una hipótesis de aprendizaje pendiente de verificación",2]]},
  "climate": {
    "pre": [
      [
        "¿Cuál es un ejemplo de adaptación climática?",
        "Reducir la exposición de un equipo al calor futuro",
        "Reducir únicamente el CO₂ de fabricación",
        "Cambiar la marca del equipo",
        0
      ],
      [
        "Antes de cambiar un material por una amenaza futura, ¿qué necesitas?",
        "El nombre del organismo",
        "Escenario, exposición, vulnerabilidad y requisitos",
        "Una estimación de ahorro sin datos",
        1
      ],
      [
        "¿Qué demuestra una analogía biológica?",
        "Certificación automática",
        "Reducción garantizada de riesgo",
        "Una hipótesis que necesita ensayo",
        2
      ],
      [
        "Un recubrimiento rechaza agua. ¿Qué puedes concluir?",
        "Resiste cualquier abrasión",
        "Es necesario ensayar por separado erosión y deposición",
        "Elimina todos los riesgos climáticos",
        1
      ]
    ],
    "post": [
      [
        "Una carcasa podría sobrecalentarse en veranos futuros. ¿Cuál es una acción de adaptación?",
        "Comprar compensaciones de carbono",
        "Revisar exposición térmica y ensayar protección",
        "Cambiar el color sin medir",
        1
      ],
      [
        "¿Qué hace defendible una comparación de dos soluciones ante granizo?",
        "Misma función, exposición y criterios de ensayo",
        "El precio más bajo",
        "Que la segunda esté inspirada en naturaleza",
        0
      ],
      [
        "El ensayo de humedad no confirma la respuesta prevista. ¿Qué procede?",
        "Comunicar el beneficio igualmente",
        "Aumentar la puntuación por creatividad",
        "Revisar o descartar la hipótesis",
        2
      ],
      [
        "Una superficie retiene menos polvo seco. ¿Qué queda por verificar?",
        "Solo su aspecto",
        "Durabilidad y erosión bajo condiciones pertinentes",
        "Nada, ya está validada",
        1
      ]
    ]
  },
  "resilience": {
    "pre": [
      [
        "¿Qué significa resiliencia de un proceso?",
        "Preservar o recuperar una función ante interrupciones",
        "Reducir cualquier coste",
        "Comprar más recursos siempre",
        0
      ],
      [
        "Dos proveedores usan la misma fábrica. ¿Qué debes revisar?",
        "El color de sus logotipos",
        "La dependencia común y las alternativas cualificadas",
        "Nada, ya hay redundancia",
        1
      ],
      [
        "¿Qué permite afirmar un concepto biomimético sin ensayos?",
        "Mayor disponibilidad probada",
        "Aeronavegabilidad",
        "Una hipótesis de mejora",
        2
      ],
      [
        "¿Qué indicador puede comprobar una mejora de reparabilidad?",
        "Número de imágenes del diseño",
        "Tiempo de intervención y daños bajo condiciones equivalentes",
        "Número de ideas propuestas",
        1
      ]
    ],
    "post": [
      [
        "Un recurso no está disponible. ¿Qué demostraría resiliencia?",
        "Tener muchas alternativas no verificadas",
        "Mantener o recuperar la función con una alternativa viable",
        "Reducir solo el consumo eléctrico",
        1
      ],
      [
        "Una alternativa de suministro comparte un subproveedor crítico. ¿Qué acción tiene sentido?",
        "Verificar independencia y cualificación",
        "Contar dos rutas como independientes",
        "Ignorar la dependencia",
        0
      ],
      [
        "Un material se autosella pero su resistencia no se ha medido. ¿Qué afirmación es válida?",
        "Se ha recuperado toda la función estructural",
        "Se ha prolongado la vida útil",
        "Debe comprobarse qué función se recupera y qué daño permanece",
        2
      ],
      [
        "Una unión reversible ahorra tiempo de desmontaje en una prueba. ¿Qué falta?",
        "Solo comunicar el ahorro",
        "Verificar función, daños, ciclos y condiciones de aceptación",
        "Nada, se ha probado toda la resiliencia",
        1
      ]
    ]
  }
};
const PREF="biolab-pilot-track-v1";
const key=(id:string,track:PilotTrack)=>"biolab-pilot-v2:es:"+id+":"+track;
const attemptId=()=>globalThis.crypto?.randomUUID?.()??("bio-"+Date.now()+"-"+Math.random().toString(36).slice(2));
type RecordData={attemptId?:string;pre?:number[];post?:number[];utility?:number;clarity?:number;transfer?:number;confidence?:number;action?:string;challengeId?:string};
function read(id:string,track:PilotTrack):RecordData {try{return JSON.parse(localStorage.getItem(key(id,track))||"{}")||{};}catch{return {};}}
function write(id:string,track:PilotTrack,value:RecordData){localStorage.setItem(key(id,track),JSON.stringify(value));}
export function preferredTrack():Track {try{const v=localStorage.getItem(PREF);return v==="climate"||v==="resilience"?v:"general";}catch{return "general";}}
export function setPreferredTrack(track:Track){try{localStorage.setItem(PREF,track);}catch{/* default remains general */}}
export function hasBaseline(id:string,track:PilotTrack,challengeId?:string){const data=read(id,track),p=data.pre;return Array.isArray(p)&&p.length===4&&p.every(x=>Number.isInteger(x)&&x>=0&&x<=3)&&!(challengeId&&data.post&&data.challengeId!==challengeId);}
const score=(answers:number[]|undefined,qs:Question[])=>answers?.length===qs.length?answers.filter((a,i)=>a===qs[i][4]).length:null;
const actionOptions=[["discuss","Conversar con mi área o responsable"],["seek_evidence","Buscar evidencia o requisitos"],["apply_learning","Aplicar el aprendizaje en una actividad autorizada"],["none","Sin acción prevista"],["not_applicable","No aplica"]];
function resultData(record:RecordData,track:PilotTrack){return {schema:1,assessmentVersion:"biolab-pilot-v2",resourceId:"bio-inspired-innovation-lab",language:"es",unit:"session/team",sessionKey:record.attemptId,track,challengeId:record.challengeId??null,preScore:score(record.pre,bank[track].pre),postScore:score(record.post,bank[track].post),maxScore:4,utility:record.utility,clarity:record.clarity,transfer:record.transfer,confidence:record.confidence,action:record.action,limitation:"Self-reported use; descriptive uncalibrated learning assessment; no identity or technical approval."};}
export function PilotAssessment({teamId,track,phase,challengeId}:{teamId:string;track:PilotTrack;phase:Phase;challengeId?:string}){
 const [record,setRecord]=useState(()=>{const data=read(teamId,track);return phase==="post"&&data.challengeId&&data.challengeId!==challengeId?{}:data;});
 const [answers,setAnswers]=useState<number[]>(()=>record[phase]??[-1,-1,-1,-1]);
 const [utility,setUtility]=useState(record.utility??-1),[clarity,setClarity]=useState(record.clarity??-1),[transfer,setTransfer]=useState(record.transfer??-1),[confidence,setConfidence]=useState(record.confidence??-1),[action,setAction]=useState(record.action??"");
 const [error,setError]=useState(false);
 const questions=bank[track][phase],locked=record[phase]?.length===4;
 const before=score(record.pre,bank[track].pre),after=score(record.post,bank[track].post);
 const save=()=>{try{const next={...record,attemptId:record.attemptId??attemptId(),[phase]:answers,...(phase==="post"?{utility,clarity,transfer,confidence,action,challengeId}: {})};write(teamId,track,next);if(phase==="post")localStorage.setItem("biolab-pilot-result-v2:"+next.attemptId,JSON.stringify(resultData(next,track)));setRecord(next);setError(false);}catch{setError(true);}};
 const restart=()=>{if(!window.confirm("¿Iniciar una nueva evaluación? El resultado anterior se conserva en el registro local. Repite el recorrido desde el principio."))return;try{write(teamId,track,{});setRecord({});setAnswers([-1,-1,-1,-1]);setError(false);}catch{setError(true);}};
 const exportResult=()=>{const data=resultData(record,track);const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="biolab-pilot-result.json";a.click();URL.revokeObjectURL(url);};
 return <section className="max-w-6xl mx-auto biolab-card my-6" aria-label={phase==="pre"?"Evaluación inicial":"Evaluación final"}>
 <h2 className="font-display text-2xl font-bold mb-3">{phase==="pre"?"Antes del reto · 4 preguntas":"Después del reto · aprendizaje y utilidad"}</h2>
 <p className="text-muted-foreground mb-4">{phase==="pre"?"Responde sin consultar referencias. No se revelan las respuestas hasta finalizar; el resultado no bloquea por puntuación, solo hay que completar las cuatro.":"Responde tras revisar la propuesta y el ejemplo. Valora también la utilidad del recorrido. Las puntuaciones son orientativas, no acreditan competencia técnica."}</p>
 {phase==="post"&&before===null&&<p className="mb-3 text-amber-800">No hay evaluación inicial registrada; no se calculará mejora.</p>}
 {!locked&&<div className="space-y-4">{questions.map((q,i)=><fieldset key={i} className="border rounded-xl p-4"><legend className="font-semibold px-2">{i+1}. {q[0]}</legend>{[...q.slice(1,4),"No lo sé todavía"].map((option,j)=><label key={j} className="flex items-start gap-2 py-2"><input type="radio" name={teamId+track+phase+i} checked={answers[i]===j} onChange={()=>setAnswers(prev=>prev.map((x,k)=>k===i?j:x))}/><span>{option}</span></label>)}</fieldset>)}
 {phase==="post"&&<div className="grid md:grid-cols-3 gap-3">{([["Utilidad para mi actividad",utility,setUtility],["Claridad sin facilitador",clarity,setClarity],["Posibilidad de aplicar lo aprendido",transfer,setTransfer],["Confianza percibida para analizar decisiones",confidence,setConfidence]] as [string,number,(n:number)=>void][]).map(([label,value,set])=><label className="border rounded-xl p-3" key={label}><span className="block font-semibold mb-2">{label}</span><select className="w-full border rounded p-2 bg-background" value={value} onChange={e=>set(Number(e.target.value))}><option value={-1}>Selecciona 1–5</option><option value={0}>No aplica</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?"Muy baja":n===5?"Muy alta": ""}</option>)}</select></label>)}<label className="border rounded-xl p-3"><span className="block font-semibold mb-2">Siguiente paso previsto</span><select className="w-full border rounded p-2 bg-background" value={action} onChange={e=>setAction(e.target.value)}><option value="">Selecciona</option>{actionOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}
 <button type="button" className="biolab-btn-primary" disabled={answers.some(a=>a<0)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action))} onClick={save}>Guardar evaluación</button></div>}
 {error&&<p role="alert">No se pudo guardar en el navegador. Comprueba que permite almacenamiento local.</p>}
 {locked&&<p className="font-semibold text-primary">Evaluación registrada.</p>}
 {locked&&phase==="pre"&&record.post&&<button type="button" className="biolab-btn-ghost" onClick={restart}>Nueva evaluación para otro recorrido</button>}
 {locked&&phase==="post"&&<div className="mt-4 space-y-3"><p className="font-bold text-lg">Inicial: {before??"—"}/4 · Final: {after}/4 {before!==null&&after!==null&&` · ${(after-before)*25} pp`}</p><p className="text-sm text-muted-foreground">Cambio descriptivo entre formularios paralelos no calibrados. No implica causalidad ni resultados de negocio.</p>{questions.map((q,i)=><p className="text-sm" key={i}><strong>{q[0]}</strong> — {q[q[4]+1]}</p>)}<button type="button" className="biolab-btn-primary" onClick={exportResult}>Exportar resultados sin nombre (JSON)</button><p className="text-sm">Comparte el archivo solo por el canal autorizado del piloto. No se envía automáticamente.</p></div>}
 </section>;
}
