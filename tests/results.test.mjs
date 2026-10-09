import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {Session,risks} from '../js/model.js';
import {participation} from '../js/storage.js';

test('os sete sinais são preservados no envio e contados pelo painel',()=>{
 const session=new Session({now:()=>100,id:()=> 'teste'});
 session.quiz('pre',[0,0,0]);session.stage='store';
 for(const risk of risks){session.event(risk.key);session.event(risk.key)}
 session.decide('quit');session.quiz('post',[0,0,0]);
 const sent=participation(structuredClone(session.data));
 assert.equal(sent.events.filter(e=>risks.some(r=>r.key===e.name)).length,7);
 const nodes=new Map();const get=id=>{if(!nodes.has(id))nodes.set(id,{value:'',innerHTML:'',textContent:''});return nodes.get(id)};
 const context=vm.createContext({document:{getElementById:get},Date});
 const source=readFileSync(new URL('../js/results.js',import.meta.url),'utf8');
 const renderSource=source.slice(source.indexOf('const $='),source.indexOf('async function load()'));
 const date={toDate:()=>new Date('2026-10-08T15:00:00Z')};
 context.testRecords=[{...sent,created_at:date},{...sent,events:[],created_at:date}];
 vm.runInContext(renderSource+'\nrecords=testRecords;render();',context);
 assert.equal((get('risks').innerHTML.match(/<strong>50%/g)||[]).length,7);
 assert.equal((get('risks').innerHTML.match(/1 de 2 participações/g)||[]).length,7);
 context.testRecords=[{...sent,events:[],created_at:date}];
 vm.runInContext('records=testRecords;render();',context);
 assert.match(get('risk-status').textContent,/Nenhuma das 1 participações/);
 assert.equal((get('risks').innerHTML.match(/<strong>0%/g)||[]).length,7);
});


test('tempo por etapa soma retornos, exclui aba oculta e chega ao envio final',()=>{
 let time=0,submitted;
 const session=new Session({now:()=>time,id:()=> 'teste',onEvent:(event,data)=>{if(event.name==='respondeu_quiz_final')submitted=participation(structuredClone(data))}});
 time=1000;session.changeStage('pre');session.quiz('pre',[0,0,0]);
 time=3000;session.changeStage('store');time=5000;session.visibility(false);
 time=15000;session.visibility(true);time=16000;session.changeStage('checkout');
 time=18000;session.changeStage('store');time=19000;session.changeStage('post');
 time=21000;session.quiz('post',[0,0,0]);
 const duration=stage=>submitted.events.find(e=>e.name==='tempo_etapa_'+stage)?.duration_ms;
 assert.equal(duration('welcome'),1000);assert.equal(duration('pre'),2000);
 assert.equal(duration('store'),4000);assert.equal(duration('checkout'),2000);
 assert.equal(duration('post'),2000);assert.equal(duration('ad'),undefined);
 assert.equal(submitted.events.filter(e=>e.name==='tempo_etapa_store').length,1);
});
