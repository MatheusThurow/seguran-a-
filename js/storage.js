import {supabaseConfig} from './supabase-config.js';
export function participation(data){return {id:data.id,version:data.version,pre_answers:data.pre.answers,pre_score:data.pre.score,post_answers:data.post.answers,post_score:data.post.score,outcome:data.outcome,analysis_ms:data.analysisMs,events:data.events.map(e=>({name:e.name,stage:e.stage,elapsed_ms:e.elapsedMs}))};}
export async function sendParticipation(data){
 const response=await fetch(supabaseConfig.url+'/rest/v1/participacoes',{method:'POST',headers:{apikey:supabaseConfig.publishableKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(participation(data)),signal:AbortSignal.timeout(15000)});
 if(response.ok)return;
 const error=await response.json().catch(()=>({}));
 if(response.status===409&&error.code==='23505')return;
 throw Error('Não foi possível salvar no Supabase. Confira a tabela e a conexão.');
}
