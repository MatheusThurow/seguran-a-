import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {offerForAgeGroup} from '../js/offers.js';
import {risks} from '../js/model.js';

const cases=[['under_18','PlayStation 5 (PS5)'],['18_29','Fritadeira elétrica (Air Fryer)'],['30_44','Máquina de lavar'],['45_59','Geladeira'],['60_plus','Jogo de cama']];
test('cada faixa recebe exclusivamente seu produto no anúncio, loja e pedido',()=>{
 const source=readFileSync(new URL('../js/app.js',import.meta.url),'utf8');
 const helpers=source.slice(source.indexOf('function offer()'),source.indexOf('const guide='));
 const screens=source.slice(source.indexOf('const screens='),source.indexOf('function openPanel('));
 for(const [ageGroup,name] of cases){
  const product=offerForAgeGroup(ageGroup);
  assert.equal(product.name,name);
  assert.ok(existsSync(new URL('../'+product.image,import.meta.url)));
  const context=vm.createContext({offerForAgeGroup,risks,session:{data:{events:[{name:'faixa_etaria',ageGroup}]}},button:()=>'',shippingAddress:null});
  vm.runInContext(helpers+screens+';globalThis.html=[screens.ad(),screens.store(),screens.checkout()];globalThis.details=offerRisks();',context);
  for(const html of context.html){
   assert.ok(html.includes(name));
   assert.ok(html.includes(product.image));
   for(const [,other] of cases)if(other!==name)assert.ok(!html.includes(other));
  }
  assert.ok(context.details.find(r=>r.key==='inspecionou_preco').detail.includes(name));
  for(const html of context.html.slice(0,2)){
   assert.ok(html.includes('R$ '+product.originalPrice));
   assert.ok(html.includes('R$ '+product.salePrice));
   assert.ok(html.includes(product.discount+'%'));
  }
  assert.ok(context.html[1].includes('6x de R$ '+product.installment));
  assert.ok(context.html[2].includes('R$ '+product.salePrice));
  assert.ok(context.html[2].includes('R$ '+product.pixPrice));
  assert.ok(context.details.find(r=>r.key==='inspecionou_pagamento').detail.includes(product.pixPrice));
 }
});
test('faixa ausente ou inválida não recebe um produto padrão',()=>{
 for(const value of ['',null,undefined,'not_informed','toString','unknown'])assert.throws(()=>offerForAgeGroup(value),RangeError);
});
