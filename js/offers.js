const catalog = {
 under_18: {id:'ps5',name:'PlayStation 5 (PS5)',category:'Games / Consoles',spec:'Console de videogame',description:'Controle sem fio • Edição da simulação'},
 '18_29': {id:'fritadeira',name:'Fritadeira elétrica (Air Fryer)',category:'Eletroportáteis / Fritadeiras',spec:'Capacidade: 4 litros',description:'Cesto removível • Potência de 1.500 W'},
 '30_44': {id:'maquina-de-lavar',name:'Máquina de lavar',category:'Eletrodomésticos / Lavadoras',spec:'Capacidade: 12 kg',description:'Ciclos de lavagem • Edição da simulação'},
 '45_59': {id:'geladeira',name:'Geladeira',category:'Eletrodomésticos / Geladeiras',spec:'Capacidade: 400 litros',description:'Duas portas • Frost free • Edição da simulação'},
 '60_plus': {id:'jogo-de-cama',name:'Jogo de cama',category:'Cama e banho / Jogos de cama',spec:'Jogo de cama casal',description:'4 peças • Edição da simulação'}
};
const prices={"under_18":[5000,2499],"18_29":[799,399],"30_44":[2499,1299],"45_59":[3999,1999],"60_plus":[299,149]};
const money=value=>value.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2});
export function offerForAgeGroup(ageGroup){
 if(!Object.hasOwn(catalog,ageGroup))throw new RangeError('Informe uma faixa etária válida.');
 const [original,sale]=prices[ageGroup];
 return Object.freeze({originalPrice:money(original),salePrice:money(sale),pixPrice:money(sale/2),installment:money(sale/6),discount:Math.round((1-sale/original)*100),...catalog[ageGroup],image:`assets/${catalog[ageGroup].id}.svg`});
}
