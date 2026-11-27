import {openPdfReport,type Report} from "@/data/report-export";
import { useState } from "react";
import type { Track } from "@/data/resilience-expansion";
type PilotTrack=Track;
type Phase="pre"|"post";
type Question=[string,string,string,string,number];
const bank:Record<PilotTrack,Record<Phase,Question[]>>={
  general:{"pre":[["Un organismo se parece visualmente a una pieza. ¿Qué hace válida la inspiración?","La función, el mecanismo causal y sus límites de transferencia","La semejanza de forma por sí sola","La popularidad de la inspiración",0],["Una idea biomimética promete reducir una vulnerabilidad. ¿Cómo evaluarla?","Aceptar la mejora por su origen biológico","Medir solo el número de ideas","Una referencia equivalente, indicadores y ensayos que puedan refutarla",2],["Un equipo identifica calor futuro o una dependencia de suministro. ¿Qué debe conectar su propuesta?","La solución y su coste sin analizar la función","Amenaza, función vulnerable, mecanismo propuesto y responsable de verificarlo","El organismo y una promesa genérica de sostenibilidad",1],["Una propuesta es prometedora, pero no ha sido ensayada. ¿Qué se puede afirmar?","Es una hipótesis de aprendizaje pendiente de verificación","La propuesta está aprobada para uso real","La mejora operativa está demostrada",0]],"post":[["Una estructura natural presenta una forma atractiva. ¿Qué debes investigar primero?","La semejanza de forma por sí sola","La popularidad de la inspiración","La función, el mecanismo causal y sus límites de transferencia",2],["Una propuesta imita una estrategia natural y declara mayor durabilidad. ¿Qué falta?","Medir solo el número de ideas","Una referencia equivalente, indicadores y ensayos que puedan refutarla","Aceptar la mejora por su origen biológico",1],["Una hipótesis afecta a un componente o proceso. ¿Cómo vincularla al trabajo profesional?","Amenaza, función vulnerable, mecanismo propuesto y responsable de verificarlo","El organismo y una promesa genérica de sostenibilidad","La solución y su coste sin analizar la función",0],["La idea parece prometedora tras el taller. ¿Qué conclusión está justificada?","La propuesta está aprobada para uso real","La mejora operativa está demostrada","Es una hipótesis de aprendizaje pendiente de verificación",2]]},
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
type RecordData={pairedVersion?:number;attemptId?:string;pre?:number[];post?:number[];utility?:number;clarity?:number;transfer?:number;confidence?:number;action?:string;challengeId?:string};
function read(id:string,track:PilotTrack):RecordData {try{return JSON.parse(localStorage.getItem(key(id,track))||"{}")||{};}catch{return {};}}
function write(id:string,track:PilotTrack,value:RecordData){localStorage.setItem(key(id,track),JSON.stringify(value));}
export function preferredTrack():Track {try{const v=localStorage.getItem(PREF);return v==="climate"||v==="resilience"?v:"general";}catch{return "general";}}
export function setPreferredTrack(track:Track){try{localStorage.setItem(PREF,track);}catch{/* default remains general */}}
const actionOptions=[["discuss","Conversar con mi área o responsable"],["seek_evidence","Buscar evidencia o requisitos"],["apply_learning","Aplicar el aprendizaje en una actividad autorizada"],["none","Sin acción prevista"],["not_applicable","No aplica"]];
const explanations:Record<Track,string[][]>={"general":[["El parecido visual no explica cómo funciona una estructura.","La popularidad no demuestra utilidad técnica.","La función y el mecanismo causal permiten estudiar la transferencia y sus límites."],["Contar ideas no mide durabilidad.","Una referencia equivalente, indicadores y ensayos permiten confirmar o refutar el beneficio.","El origen natural no demuestra una mejora."],["Conectar amenaza, función, mecanismo y responsable convierte la idea en una hipótesis comprobable.","Una promesa genérica no explica cómo se reduce la vulnerabilidad.","El coste por sí solo no demuestra que se conserve la función."],["El taller no autoriza el uso real.","La mejora operativa exige pruebas comparativas.","Una idea razonada sigue siendo una hipótesis hasta verificarla."]],"climate":[["Compensar emisiones es mitigación; no protege directamente del calor.","Evaluar la exposición y ensayar protección aborda la vulnerabilidad física futura.","Cambiar el color sin medir no demuestra menor temperatura."],["Función, exposición y criterios equivalentes permiten comparar el efecto de cada diseño.","El precio no demuestra resistencia a impactos.","La inspiración natural no acredita resistencia al granizo."],["Comunicar un beneficio contradice el ensayo.","La creatividad no sustituye las evidencias.","Si los datos no apoyan la hipótesis, hay que revisarla o descartarla."],["El aspecto no mide desgaste ni pérdida de prestaciones.","Retener menos polvo no garantiza durabilidad; la erosión debe ensayarse por separado.","Menos deposición no valida todas las propiedades."]],"resilience":[["Una alternativa no verificada podría no estar disponible.","Resiliencia es mantener o recuperar la función ante interrupciones mediante alternativas viables.","Reducir consumo por sí solo no prueba continuidad."],["Comprobar dependencias y cualificación evita confundir redundancia con una vulnerabilidad compartida.","Dos rutas con el mismo recurso crítico no son independientes.","Ignorar la dependencia oculta un posible fallo común."],["Sellar una grieta no prueba recuperar resistencia.","La extensión de vida requiere datos de durabilidad.","Hay que medir la función recuperada y el daño residual."],["El tiempo de desmontaje no demuestra que la unión funcione.","Comprobar función, daños y ciclos permite evaluar repetibilidad y aceptación.","Una sola prueba no demuestra toda la resiliencia."]]};
const initialExplanations:Record<Track,string[][]>={"general":[["La función y el mecanismo causal explican qué puede transferirse y con qué límites.","El parecido externo no demuestra que se reproduzca la función.","La popularidad no es evidencia de utilidad."],["El origen biológico no garantiza un beneficio.","Contar ideas no mide la vulnerabilidad ni el efecto de la solución.","Una referencia equivalente, indicadores y ensayos permiten comprobar o refutar la hipótesis."],["Sin analizar la función vulnerable, el coste no permite valorar la resiliencia.","Conectar la amenaza, la función y el mecanismo con un responsable permite plantear una comprobación concreta.","Una promesa general no explica cómo se reduce una vulnerabilidad."],["Una idea no ensayada es una hipótesis que necesita verificación.","La actividad formativa no constituye una aprobación técnica.","Sin resultados de ensayo no se puede afirmar una mejora demostrada."]],"climate":[["Reducir la exposición al calor futuro aborda un riesgo físico climático.","Reducir emisiones es mitigación; por sí solo no reduce la exposición física al calor.","Cambiar la marca no modifica la vulnerabilidad física."],["El nombre de un organismo no identifica la exposición ni los requisitos técnicos.","El escenario, la exposición, la vulnerabilidad y los requisitos permiten definir qué debe resistir la solución.","Un ahorro sin datos no demuestra capacidad de adaptación."],["Una analogía biológica no constituye certificación.","Una analogía no garantiza reducción de riesgo.","La analogía genera una hipótesis que debe comprobarse con ensayos."],["Rechazar agua no demuestra resistencia a la abrasión.","La erosión y la deposición son mecanismos distintos y requieren ensayos específicos.","Una propiedad superficial no elimina todos los riesgos climáticos."]],"resilience":[["Resiliencia es conservar o recuperar una función frente a una interrupción.","Reducir costes no demuestra continuidad ni recuperación.","Comprar más recursos no garantiza que sean viables durante una interrupción."],["Los logotipos no revelan dependencias comunes.","Una fábrica compartida puede provocar un fallo común; hay que comprobar alternativas independientes y cualificadas.","Tener dos proveedores no garantiza redundancia si dependen de la misma fábrica."],["La disponibilidad debe demostrarse con evidencias.","La aeronavegabilidad requiere procesos de cualificación y aprobación.","Sin ensayo solo cabe formular una hipótesis de mejora."],["El número de imágenes no mide reparabilidad.","Tiempo y daños bajo condiciones equivalentes permiten comparar el proceso de reparación.","El número de ideas no mide el resultado de una reparación."]]};
const valid=(a:number[]|undefined)=>Array.isArray(a)&&a.length===4&&a.every(n=>Number.isInteger(n)&&n>=0&&n<=3);
export function hasBaseline(teamId:string,track:Track,challengeId?:string){const r=read(teamId,track);return r.pairedVersion===4&&r.challengeId===challengeId&&valid(r.pre);}
const score=(answers:number[]|undefined,qs:Question[])=>valid(answers)?qs.filter((q,i)=>answers![i]===q[4]).length:null;
export function PilotAssessment({teamId,track,challengeId,phase="post",onComplete,preview=false}:{teamId:string;track:PilotTrack;phase?:Phase;challengeId?:string;onComplete?:()=>void;preview?:boolean}){
 const [record,setRecord]=useState(()=>{const data=preview?{}:read(teamId,track);return data.challengeId===challengeId&&(phase==="pre"?data.pairedVersion===4&&valid(data.pre):valid(data.post)||data.pairedVersion===4&&valid(data.pre))?data:{};});
 const [answers,setAnswers]=useState<number[]>(()=>record[phase]??[-1,-1,-1,-1]);
 const [utility,setUtility]=useState(record.utility??-1),[clarity,setClarity]=useState(record.clarity??-1),[transfer,setTransfer]=useState(record.transfer??-1),[confidence,setConfidence]=useState(record.confidence??-1),[action,setAction]=useState(record.action??"");
 const [error,setError]=useState(false);
 const questions=bank[track][phase],locked=valid(record[phase]),after=score(record.post,bank[track].post),before=record.pairedVersion===4?score(record.pre,bank[track].pre):null,currentScore=score(record[phase],questions),reasons=phase==="pre"?initialExplanations[track]:explanations[track];
 const option=(q:Question,n:number)=>n===3?"No lo sé todavía":String(q[n+1]);
 const status=(i:number)=>record[phase]?.[i]===questions[i][4]?"Correcta":"Incorrecta";
 const reason=(i:number)=>record[phase]?.[i]===3?"Has indicado que aún no lo sabes. Revisa la explicación de la respuesta correcta.":reasons[i][record[phase]?.[i]??0];
 const save=()=>{if(!valid(answers)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action)))return;try{
 const next:RecordData={...record,attemptId:record.attemptId??attemptId(),challengeId,[phase]:answers,...(phase==="pre"?{pairedVersion:4,post:undefined}:{utility,clarity,transfer,confidence,action})};
 const initial=next.pairedVersion===4?score(next.pre,bank[track].pre):null,final=score(next.post,bank[track].post);
 if(preview){setRecord(next);setError(false);onComplete?.();return;}
 write(teamId,track,next);
 localStorage.setItem("biolab-pilot-result-v2:"+next.attemptId,JSON.stringify({schema:1,assessmentVersion:"biolab-pilot-v4",assessmentMode:initial===null?"final-only":"paired-with-feedback",resourceId:"bio-inspired-innovation-lab",language:"es",unit:"session/team",sessionKey:next.attemptId,track,challengeId:challengeId??null,preScore:initial,postScore:final,maxScore:4,preAnswers:initial===null?null:next.pre,postAnswers:next.post,utility:next.utility,clarity:next.clarity,transfer:next.transfer,confidence:next.confidence,action:next.action,limitation:"Descriptive scores on different, uncalibrated forms; initial feedback is part of learning. No causal or technical accreditation."}));setRecord(next);setError(false);onComplete?.();}catch{setError(true);}};
 const report=():Report=>({language:"es",title:"Evaluación de aprendizaje",subtitle:track+" · "+(challengeId??"")+" · "+(before===null?"Sin evaluación inicial":"Inicial: "+before+"/4")+(after===null?"":" · Final: "+after+"/4"),blocks:[...(["pre","post"] as const).flatMap(ph=>{const ans=record[ph];if(!valid(ans)||(ph==="pre"&&record.pairedVersion!==4))return [];const qs=bank[track][ph],ex=ph==="pre"?initialExplanations[track]:explanations[track];return [{heading:ph==="pre"?"Evaluación inicial":"Evaluación final",paragraphs:qs.flatMap((q,i)=>[(i+1)+". "+q[0],"Tu respuesta: "+option(q,ans![i])+" — "+(ans![i]===q[4]?"Correcta":"Incorrecta"),ans![i]===3?"Has indicado que aún no lo sabes.":ex[i][ans![i]],"Respuesta correcta: "+option(q,q[4]),ex[i][q[4]]])}];}),...(after===null?[]:[{heading:"Utilidad y transferencia",paragraphs:["Utilidad / claridad / aplicación / confianza: "+[utility,clarity,transfer,confidence].map(x=>x===0?"No aplica":x+"/5").join(" · "),"Siguiente paso: "+(actionOptions.find(([v])=>v===action)?.[1]??action)]}]),{heading:"Interpretación",paragraphs:[before!==null&&after!==null?"Cambio descriptivo: "+(after-before)+" aciertos sobre 4.":"No hay dos puntuaciones comparables todavía.","Las preguntas son diferentes y no están calibradas. La corrección inicial también forma parte del aprendizaje; el cambio no demuestra causalidad ni acredita competencia técnica."]}]});
 return <section data-testid={phase==="pre"?"initial-assessment":"final-assessment"} className="max-w-6xl mx-auto biolab-card my-6" aria-label={phase==="pre"?"Evaluación inicial":"Evaluación final"}>
 <h2 className="font-display text-2xl font-bold mb-3">{phase==="pre"?"Evaluación inicial · ¿Qué sabes ya?":"Evaluación final · ¿Qué has aprendido?"}</h2>
 <p className="text-muted-foreground mb-4">{phase==="pre"?"Antes de investigar el reto, responde a cuatro preguntas sobre la temática elegida. Al corregirlas conocerás las respuestas correctas y sus razones. No hay nota mínima para continuar.":"Después de revisar la solución de referencia, responde a cuatro preguntas distintas sobre los mismos conceptos. Al corregirlas verás qué has acertado, qué debes revisar y por qué."}</p>
 <p className="rounded-lg border bg-muted/40 p-3 mb-4 text-sm">{preview?"Vista de revisión: las respuestas de prueba no se guardan ni se incluyen en los resultados del piloto.":"Tus resultados se guardan únicamente en este navegador y dispositivo. No se envían a Airbus ni al organizador. Puedes guardar el informe en PDF y compartirlo por el canal autorizado si te lo solicitan."}</p>
 {!locked&&<div className="space-y-4">{questions.map((q,i)=><fieldset key={i} className="border rounded-xl p-4"><legend className="font-semibold px-2">{i+1}. {q[0]}</legend>{[...q.slice(1,4),"No lo sé todavía"].map((o,j)=><label key={j} className="flex items-start gap-2 py-2"><input type="radio" name={teamId+track+i} checked={answers[i]===j} onChange={()=>setAnswers(prev=>prev.map((x,k)=>k===i?j:x))}/><span>{o}</span></label>)}</fieldset>)}
 {phase==="post"&&<div className="grid md:grid-cols-3 gap-3">{([["Utilidad para mi actividad",utility,setUtility],["Claridad sin facilitador",clarity,setClarity],["Posibilidad de aplicar lo aprendido",transfer,setTransfer],["Confianza percibida para analizar decisiones",confidence,setConfidence]] as [string,number,(n:number)=>void][]).map(([label,value,set])=><label className="border rounded-xl p-3" key={label}><span className="block font-semibold mb-2">{label}</span><select className="w-full border rounded p-2 bg-background" value={value} onChange={e=>set(Number(e.target.value))}><option value={-1}>Selecciona 1–5</option><option value={0}>No aplica</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?"Muy baja":n===5?"Muy alta": ""}</option>)}</select></label>)}<label className="border rounded-xl p-3"><span className="block font-semibold mb-2">Siguiente paso previsto</span><select className="w-full border rounded p-2 bg-background" value={action} onChange={e=>setAction(e.target.value)}><option value="">Selecciona</option>{actionOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}

 <button type="button" data-testid="correct-assessment" className="biolab-btn-primary" disabled={!valid(answers)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action))} onClick={save}>{preview?"Corregir evaluación":"Corregir y guardar evaluación"}</button></div>}
 {error&&<p role="alert">No se pudo guardar en el navegador. Comprueba que permite almacenamiento local.</p>}
 {locked&&<div className="mt-4 space-y-4"><p data-testid={phase==="pre"?"initial-score":"final-score"} className="font-bold text-xl">{phase==="pre"?"Resultado inicial:":"Resultado final:"} {currentScore}/4</p><p className="text-sm">{preview?"Corrección de prueba · sin registro de resultados.":"Evaluación guardada en este navegador."}</p>{phase==="post"&&<p data-testid="paired-summary" className="rounded-lg border p-3 text-sm">{before===null?"No hay evaluación inicial comparable en esta sesión.":"Inicial: "+before+"/4 · Final: "+after+"/4 · Cambio descriptivo: "+(after!-before)+" aciertos. Las preguntas son distintas, no calibradas; la explicación inicial forma parte del aprendizaje."}</p>}{questions.map((q,i)=><div key={i} data-testid={"feedback-"+i} className={"rounded-xl border p-4 "+(record[phase]![i]===q[4]?"bg-emerald-50 border-emerald-300 text-emerald-950":"bg-amber-50 border-amber-300 text-amber-950")}><strong>{i+1}. {q[0]}</strong><p className="font-bold mt-2">{status(i)}</p><p className="mt-2">Tu respuesta: {option(q,record[phase]![i])}</p><p className="mt-1">Por qué: {reason(i)}</p><p className="mt-2 font-semibold">Respuesta correcta: {option(q,q[4])}</p>{record[phase]![i]!==q[4]&&<p className="mt-1">{reasons[i][q[4]]}</p>}</div>)}{!preview&&<button data-testid="assessment-pdf" className="biolab-btn-primary" onClick={()=>{if(!openPdfReport(report()))alert("Permite abrir una nueva pestaña.");}}>Guardar evaluación en PDF</button>}</div>}
 </section>;
}
