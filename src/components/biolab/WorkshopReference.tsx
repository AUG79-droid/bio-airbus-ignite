import {useState} from "react";
import {referenceSolutions,referenceLabels} from "@/data/reference-solutions";
import {climateSources} from "@/data/climate-challenges";
import {challengeFor,modelPool,type Session,type Proposal} from "@/data/workshop";
export default function WorkshopReference({session,proposals}:{session:Session;proposals:Proposal[]}){
 const [slot,setSlot]=useState(proposals[0]?.slot??1);
 const reference=referenceSolutions[session.challengeId];
 const selected=proposals.find(p=>p.slot===slot)??proposals[0];
 const model=reference&&modelPool.find(m=>m.name===reference.recommendedModel);
 if(!reference||!selected)return <p role="alert">No hay una referencia disponible para este reto. No se puede evaluar la propuesta sin revisión experta.</p>;
 const chosen=modelPool.find(m=>m.id===selected.organismId);
 return <div className="space-y-6">
  <section className="biolab-card-dark p-5 md:p-7" data-testid="common-reference">
    <span className="biolab-label block mb-2" style={{color:"#ffce55"}}>SOLUCIÓN DE REFERENCIA · MISMA PARA TODOS</span>
    <h3 className="text-2xl font-bold text-white mb-4">{challengeFor(session).title}</h3>
    <div className="grid md:grid-cols-[240px_1fr] gap-5 items-start">
      {model?.image&&<img src={model.image} alt={reference.recommendedModel} className="w-full h-44 object-cover rounded-xl"/>}
      <div className="min-w-0"><p className="text-sm text-slate-200">Modelo natural recomendado</p><h4 className="text-xl font-bold text-white my-2" data-testid="reference-model">{reference.recommendedModel}</h4><p className="text-base leading-7 text-slate-100">{reference.mechanism}</p><p className="mt-3 text-sm leading-6 text-slate-200">{reference.explanation}</p></div>
    </div>
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 mt-5"><h4 className="font-bold text-white mb-2">Solución propuesta</h4><p className="text-base leading-7 text-slate-100" data-testid="reference-solution">{reference.answer.solution}</p><h4 className="font-bold text-white mt-4 mb-2">Cómo comprobar si funciona</h4><p className="text-base leading-7 text-slate-100">{reference.answer.implementation}</p></div>
    <p className="text-sm text-slate-200 leading-6 mt-4"><strong>Límites:</strong> {reference.caution}</p>
    {climateSources[session.challengeId]&&<a className="underline text-sm text-white mt-3 inline-block" href={climateSources[session.challengeId]} target="_blank" rel="noreferrer">Fuente del mecanismo biológico</a>}
  </section>
  <section className="rounded-xl border p-4 md:p-5">
    <h3 className="font-bold text-xl mb-2">Compara cada equipo con la referencia</h3>
    <p className="text-sm leading-6 mb-4">Selecciona un equipo. A la izquierda verás sus respuestas originales; a la derecha, las seis respuestas modelo del reto. Revisad las diferencias y qué se podría mejorar, sin decidir quién gana.</p>
    <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Equipo para comparar">{proposals.map(p=><button type="button" key={p.slot} data-testid={"compare-team-"+p.slot} aria-pressed={selected.slot===p.slot} className={selected.slot===p.slot?"biolab-btn-primary":"biolab-btn-ghost border border-border"} onClick={()=>setSlot(p.slot)}>Equipo {p.slot}</button>)}</div>
    <div className="rounded-xl border bg-muted/40 p-4 mb-4 min-w-0"><h4 className="font-bold text-base break-words" style={{overflowWrap:"anywhere"}} data-testid="selected-proposal">{selected.pitchTitle}</h4><p className="text-sm leading-6 whitespace-pre-wrap break-words mt-2" style={{overflowWrap:"anywhere"}}>{selected.pitchSummary}</p><p className="text-sm mt-3"><strong>Modelo elegido:</strong> {chosen?.name} · {selected.language.toUpperCase()}</p></div>
    <p className="text-sm leading-6 mb-4">Un modelo distinto puede ser válido si explica el mecanismo causal y cómo comprobar la solución. La coincidencia con el nombre del modelo no garantiza una buena respuesta.</p>
    <div className="space-y-3">{referenceLabels.map(({key,label})=><div key={key} data-testid={"reference-field-"+key} className="rounded-xl border overflow-hidden"><h4 className="bg-muted/70 font-bold px-4 py-3">{label}</h4><div className="grid md:grid-cols-2"><div className="p-4 min-w-0 border-b md:border-b-0 md:border-r"><p className="font-semibold text-primary mb-2">Respuesta del equipo {selected.slot}</p><p className="text-base leading-7 whitespace-pre-wrap break-words" style={{overflowWrap:"anywhere"}}>{selected.canvas[key]}</p></div><div className="p-4 bg-primary/5 min-w-0"><p className="font-semibold text-primary mb-2">Respuesta de referencia</p><p className="text-base leading-7">{reference.answer[key]}</p></div></div></div>)}</div>
  </section>
  <section className="rounded-xl border bg-muted/40 p-5"><h3 className="font-bold text-lg mb-3">Qué debe contener una respuesta bien fundamentada</h3><ul className="list-disc pl-5 space-y-2 text-base leading-7">{reference.check.map(q=><li key={q}>{q}</li>)}</ul><p className="text-sm leading-6 mt-4">Estos criterios sirven para aprender, no para calificar a los compañeros. La referencia es un ejemplo formativo de una hipótesis técnica, no una solución certificada ni la única alternativa posible. Su eficacia requiere ensayos.</p></section>
 </div>;
}
