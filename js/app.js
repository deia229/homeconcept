// ════ SUPABASE ════
const SUPABASE_URL='https://fsbpakhrfkrmfgpaxyly.supabase.co';
const SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzYnBha2hyZmtybWZncGF4eWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NzMyMjAsImV4cCI6MjA4OTE0OTIyMH0.fkF9Ch9QvX2lecY1B2FxuDWxD4DmH4T6WAg6ggYBVlY';
const sb=supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
function dbErr(e,op){if(e){console.error(op,e);showToast('Erro ao guardar ('+op+'): '+e.message,'error');}}

// ════ DADOS BASE ════
const COLABORADORES_BASE=[
  {id:'IA',nome:'Ivo Miguel Silva Almeida',funcao:'',salario:665,valorDia:0,ss:true,duodecimos:0,sabados_rate:0,archived:false},
  {id:'EM',nome:'Euclides José Martins Mendes',funcao:'',salario:500,valorDia:23.81,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'AS',nome:'Aurora',funcao:'',salario:400,valorDia:21.43,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'02',nome:'Rodrigo Jefersson España Jeferson',funcao:'',salario:1400,valorDia:66.93,ss:true,duodecimos:153.33,sabados_rate:75,archived:false},
  {id:'06',nome:'Carlos André Vieira de Barros',funcao:'',salario:1255,valorDia:60,ss:true,duodecimos:153.33,sabados_rate:70,archived:false},
  {id:'05',nome:'Ricardo Jorge Saraiva',funcao:'',salario:1500,valorDia:71.71,ss:true,duodecimos:153.33,sabados_rate:85,archived:false},
  {id:'07',nome:'Francisco Vicente de Carvalho da Silva',funcao:'',salario:920,valorDia:43.98,ss:true,duodecimos:153.33,sabados_rate:0,archived:false},
  {id:'04',nome:'Carlos Alberto Bolivar Cortez',funcao:'',salario:1464.17,valorDia:70,ss:true,duodecimos:244.03,sabados_rate:104.58,archived:false},
  {id:'03',nome:'Darci Batista da Silva',funcao:'',salario:1400,valorDia:66.93,ss:true,duodecimos:233.33,sabados_rate:100,archived:false},
  {id:'10',nome:'Jhonata Mesquita de Lima da Conceição',funcao:'',salario:1255,valorDia:60,ss:true,duodecimos:153.33,sabados_rate:70,archived:false},
  {id:'08',nome:'Diego Santos da Silva',funcao:'',salario:1090,valorDia:52,ss:true,duodecimos:181.67,sabados_rate:77.86,archived:false},
  {id:'09',nome:'Osmar Sainey da Graça Preta Soares',funcao:'',salario:1255,valorDia:60,ss:true,duodecimos:209.17,sabados_rate:0,archived:false},
  {id:'BR',nome:'Bruno Abreu',funcao:'',salario:630,valorDia:70,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'WL',nome:'Wellington',funcao:'',salario:875,valorDia:70,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'ED',nome:'Edson Junior',funcao:'',salario:420,valorDia:60,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'EZ',nome:'Eziel Moura',funcao:'',salario:380,valorDia:76,ss:false,duodecimos:0,sabados_rate:0,archived:false},
  {id:'HV',nome:'Heverton Silva',funcao:'',salario:0,valorDia:60,ss:false,duodecimos:0,sabados_rate:0,archived:false,diaWorker:true},
];
const MESES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

let colaboradores=[], registos=[], obras=[], faturas=[], alocacoes=[];
const REGISTOS_MARCO_2026=[{"id": 1743000001, "tipo": "sabado", "colaborador": "EZ", "mes": "Março", "numSabados": 3, "valorUnit": 76, "totalValor": 228, "data": "2026-03-25"}, {"id": 1743000002, "tipo": "sabado", "colaborador": "09", "mes": "Março", "numSabados": 1, "valorUnit": 90, "totalValor": 90, "data": "2026-03-25"}, {"id": 1743000003, "tipo": "sabado", "colaborador": "08", "mes": "Março", "numSabados": 2, "valorUnit": 77.86, "totalValor": 155.72, "data": "2026-03-25"}, {"id": 1743000004, "tipo": "sabado", "colaborador": "03", "mes": "Março", "numSabados": 3, "valorUnit": 100, "totalValor": 300, "data": "2026-03-25"}, {"id": 1743000005, "tipo": "sabado", "colaborador": "04", "mes": "Março", "numSabados": 1, "valorUnit": 104.58, "totalValor": 104.58, "data": "2026-03-25"}, {"id": 1743000006, "tipo": "sabado", "colaborador": "02", "mes": "Março", "numSabados": 1, "valorUnit": 75, "totalValor": 75, "data": "2026-03-25"}, {"id": 1743000007, "tipo": "falta", "colaborador": "10", "data": "2026-03-20", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000008, "tipo": "falta", "colaborador": "WL", "data": "2026-03-20", "modo": "hora", "horas": 1, "tipoFalta": "Atraso", "obs": "", "mes": "Março"}, {"id": 1743000009, "tipo": "falta", "colaborador": "WL", "data": "2026-03-19", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000010, "tipo": "falta", "colaborador": "WL", "data": "2026-03-13", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000011, "tipo": "falta", "colaborador": "03", "data": "2026-03-05", "modo": "hora", "horas": 3, "tipoFalta": "Atraso", "obs": "", "mes": "Março"}, {"id": 1743000012, "tipo": "falta", "colaborador": "09", "data": "2026-03-05", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000013, "tipo": "falta", "colaborador": "10", "data": "2026-03-04", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000014, "tipo": "falta", "colaborador": "09", "data": "2026-03-03", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000015, "tipo": "falta", "colaborador": "WL", "data": "2026-03-02", "modo": "dia", "dias": 1, "tipoFalta": "Injustificada", "obs": "", "mes": "Março"}, {"id": 1743000016, "tipo": "adiantamento", "colaborador": "BR", "data": "2026-03-24", "mes": "Março", "valor": 20, "obs": ""}, {"id": 1743000017, "tipo": "adiantamento", "colaborador": "BR", "data": "2026-03-18", "mes": "Março", "valor": 50, "obs": ""}, {"id": 1743000018, "tipo": "adiantamento", "colaborador": "WL", "data": "2026-03-18", "mes": "Março", "valor": 60, "obs": ""}, {"id": 1743000019, "tipo": "adiantamento", "colaborador": "10", "data": "2026-03-13", "mes": "Março", "valor": 200, "obs": ""}, {"id": 1743000020, "tipo": "adiantamento", "colaborador": "WL", "data": "2026-03-11", "mes": "Março", "valor": 100, "obs": ""}, {"id": 1743000021, "tipo": "adiantamento", "colaborador": "BR", "data": "2026-03-11", "mes": "Março", "valor": 20, "obs": ""}, {"id": 1743000022, "tipo": "adiantamento", "colaborador": "BR", "data": "2026-03-06", "mes": "Março", "valor": 350, "obs": ""}, {"id": 1743000023, "tipo": "diasTrabalhados", "colaborador": "HV", "mes": "Março", "dias": 11, "valorDia": 60, "total": 660, "data": "2026-03-25"}];
let currentMonth={dash:new Date().getMonth()+1,folha:new Date().getMonth()+1,colab:new Date().getMonth()+1};
let editingColabId=null;

// Funções de save (usadas no import — operações individuais usam sb diretamente)
async function saveCols(){const{error}=await sb.from('colaboradores').upsert(colaboradores);dbErr(error,'saveCols');}
async function saveRegs(){await sb.from('registos').delete().gte('id',0);if(registos.length){const{error}=await sb.from('registos').insert(registos);dbErr(error,'saveRegs');}}
async function saveObras(){const{error}=await sb.from('obras').upsert(obras);dbErr(error,'saveObras');}
async function saveFaturas(){const{error}=await sb.from('faturas').upsert(faturas);dbErr(error,'saveFaturas');}
async function saveAloc(){const{error}=await sb.from('alocacoes').upsert(alocacoes);dbErr(error,'saveAloc');}

// ════ CÁLCULOS RH ════
function calcCol(c,mes){
  const ms=MESES[mes-1];
  const faltas=registos.filter(r=>r.tipo==='falta'&&r.colaborador===c.id&&r.mes===ms);
  const adiantos=registos.filter(r=>r.tipo==='adiantamento'&&r.colaborador===c.id&&r.mes===ms);
  const sabR=registos.filter(r=>r.tipo==='sabado'&&r.colaborador===c.id&&r.mes===ms);
  const totalFaltasDias=faltas.reduce((s,f)=>f.modo==='hora'?s+parseFloat(f.horas||0)/8:s+parseFloat(f.dias||0),0);
  const totalHoras=faltas.filter(f=>f.modo==='hora').reduce((s,f)=>s+parseFloat(f.horas||0),0);
  const totalAdiant=adiantos.reduce((s,a)=>s+parseFloat(a.valor||0),0);
  const totalSab=sabR.reduce((s,r)=>s+parseFloat(r.totalValor||0),0);
  const numSab=sabR.reduce((s,r)=>s+parseFloat(r.numSabados||0),0);
  // Dias trabalhados (múltiplos registos com valores diferentes - ex: Aurora)
  const diasR=registos.filter(r=>r.tipo==='diasTrabalhados'&&r.colaborador===c.id&&r.mes===ms);
  const totalDiasTrab=diasR.reduce((s,r)=>s+parseInt(r.dias||0),0);
  const rendDias=diasR.reduce((s,r)=>s+parseFloat(r.total||0),0);
  // Horas extras
  const extrasR=registos.filter(r=>r.tipo==='horasExtras'&&r.colaborador===c.id&&r.mes===ms);
  const totalExtras=extrasR.reduce((s,r)=>s+parseFloat(r.total||0),0);
  const bruto=c.salario+c.duodecimos+totalSab+rendDias+totalExtras;
  const descFaltas=(c.salario+c.duodecimos)/21*totalFaltasDias;
  // SS sobre ordenado minimo 2026 (920) + duodecimos minimo (153.33) - desconto faltas
  const valorDiarioMinimo=920/173.33*8; // 42.46€/dia
  const baseSS=Math.max(0,920+153.33-totalFaltasDias*valorDiarioMinimo);
  const ss_emp=c.ss?baseSS*0.11:0;
  const liquido=bruto-descFaltas-ss_emp-totalAdiant;
  return{bruto,descFaltas,ss_emp,totalAdiant,liquido,totalFaltasDias,totalHoras,totalSab,numSab,totalDiasTrab,rendDias,totalExtras};
}

// ════ CÁLCULOS OBRAS ════
function calcObra(o){
  const matCost=faturas.filter(f=>f.obraId===o.id).reduce((s,f)=>s+parseFloat(f.valor||0),0);
  const maoCost=alocacoes.filter(a=>a.obraId===o.id).reduce((s,a)=>{
    const c=colaboradores.find(x=>x.id===a.colabId);
    const custoDia=c?c.valorDia:parseFloat(a.custoDia||0);
    const ssDia=c&&c.ss?(920+153.33)*0.11/21:0;
    return s+(parseInt(a.dias||0)*(custoDia+ssDia));
  },0);
  return{matCost,maoCost,total:matCost+maoCost};
}

// ════ DASHBOARD ════
function renderDashboard(){
  const mes=currentMonth.dash;
  const showA=document.getElementById('dash-show-archived')?.checked;
  document.getElementById('dash-month-label').textContent=MESES[mes-1]+' 2026';
  let sB=0,sL=0,rows='';
  colaboradores.filter(c=>!c.archived||showA).forEach(c=>{
    const d=calcCol(c,mes);sB+=d.bruto;sL+=Math.max(0,d.liquido);
    const fc=d.totalFaltasDias===0?'none':d.totalFaltasDias<=2?'few':'many';
    const arch=c.archived?'<span class="archived-badge">Arquivado</span>':'';
    const fd2=d.totalFaltasDias>0?d.totalFaltasDias.toFixed(2).replace(/\.?0+$/,'')+(d.totalHoras>0?' ('+d.totalHoras+'h)':''):'0';
    const vPago=getValColab(mes-1,new Date().getFullYear(),c.id);
    const pagoBadge=vPago.fechado?'<span class="val-status-badge fechado" style="font-size:10px;padding:2px 8px;margin-left:6px;vertical-align:middle">✓ pago</span>':'';
    const rowStyle=c.archived?'opacity:.55':vPago.fechado?'background:rgba(34,197,94,0.06)':'';
    rows+=`<tr${rowStyle?` style="${rowStyle}"`:''}><td><span class="code-badge">${c.id}</span></td><td class="name-cell">${c.nome}${arch}${pagoBadge}</td><td class="amount">${fmt(c.salario)}</td><td class="amount" style="color:var(--mid)">${c.duodecimos>0?fmt(c.duodecimos):'—'}</td><td class="amount" style="color:var(--purple)">${d.totalSab>0?fmt(d.totalSab):'—'}</td><td class="amount" style="color:#7c3aed">${d.totalExtras>0?fmt(d.totalExtras):'—'}</td><td class="amount" style="color:var(--orange)">${d.totalAdiant>0?fmt(d.totalAdiant):'—'}</td><td><span class="faltas-badge ${fc}">${fd2}</span></td><td class="amount neg">${d.descFaltas>0?'-'+fmt(d.descFaltas):'—'}</td><td class="amount">${d.ss_emp>0?fmt(d.ss_emp):'—'}</td><td class="amount pos" style="font-weight:700">${fmt(Math.max(0,d.liquido))}</td></tr>`;
  });
  document.getElementById('dash-tbody').innerHTML=rows||'<tr><td colspan="11" class="empty-state" style="padding:24px">Sem colaboradores</td></tr>';
  document.getElementById('dash-tfoot').innerHTML=`<tr class="tfoot-row"><td colspan="2">TOTAIS</td><td>${fmt(sB)}</td><td colspan="6"></td><td></td><td>${fmt(sL)}</td></tr>`;
  document.getElementById('stat-bruto').textContent=fmt(sB);
  document.getElementById('stat-liquido').textContent=fmt(sL);

  // obras no dashboard
  const totalFat=faturas.reduce((s,f)=>s+parseFloat(f.valor||0),0);
  document.getElementById('stat-faturas-total').textContent=fmt(totalFat);
  document.getElementById('stat-obras-ativas').textContent=obras.filter(o=>o.estado==='ativa').length;

  let obrasRows='';
  if(!obras.length)obrasRows='<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:24px">Nenhuma obra criada ainda.</td></tr>';
  else obras.forEach(o=>{
    const d=calcObra(o);
    const badge=o.estado==='ativa'?'style="background:var(--green-bg);color:var(--green)"':o.estado==='concluida'?'style="background:#f0f0f0;color:#999"':'style="background:var(--orange-bg);color:var(--orange)"';
    obrasRows+=`<tr><td><strong>${o.nome}</strong>${o.codigo?`<br><small style="color:var(--mid)">${o.codigo}</small>`:''}</td><td style="color:var(--mid)">${o.cliente||'—'}</td><td class="amount" style="color:var(--cyan)">${fmt(d.matCost)}</td><td class="amount" style="color:var(--pink)">${fmt(d.maoCost)}</td><td class="amount" style="font-weight:700">${fmt(d.total)}</td><td><span class="code-badge" ${badge}>${o.estado}</span></td></tr>`;
  });
  document.getElementById('dash-obras-tbody').innerHTML=obrasRows;
}

// ════ FOLHA ════
function renderFolha(){
  const mes=currentMonth.folha;
  const showA=document.getElementById('folha-show-archived')?.checked;
  document.getElementById('folha-title').textContent=`Folha de Salários — ${MESES[mes-1]} 2026`;
  let rows='',tB=0,tL=0,tA=0,tF=0,tD=0,tS=0;
  colaboradores.filter(c=>!c.archived||showA).forEach(c=>{
    const d=calcCol(c,mes);
    tB+=d.bruto;tL+=Math.max(0,d.liquido);tA+=d.totalAdiant;tF+=d.totalFaltasDias;tD+=d.descFaltas;tS+=d.ss_emp;
    const fStr=d.totalFaltasDias>0?(d.totalHoras>0?d.totalHoras+'h':d.totalFaltasDias.toFixed(2).replace(/\.?0+$/,'')+'d'):'—';
    const arch=c.archived?'<span class="archived-badge">Arq.</span>':'';
    rows+=`<tr${c.archived?' style="opacity:.55"':''}><td><span class="code-badge">${c.id}</span></td><td class="name-cell" style="font-size:12.5px">${c.nome}${arch}</td><td style="color:var(--mid);font-size:12px">${c.funcao||'—'}</td><td class="amount">${fmt(c.salario)}</td><td class="amount">${c.duodecimos>0?fmt(c.duodecimos):'—'}</td><td class="amount" style="color:var(--purple)">${d.totalSab>0?fmt(d.totalSab):'—'}</td><td class="amount" style="font-weight:600">${fmt(d.bruto)}</td><td class="amount" style="color:var(--orange)">${d.totalAdiant>0?fmt(d.totalAdiant):'—'}</td><td style="text-align:center;font-family:'DM Mono',monospace;font-size:12px">${fStr}</td><td class="amount neg">${d.descFaltas>0?'-'+fmt(d.descFaltas):'—'}</td><td class="amount">${d.ss_emp>0?fmt(d.ss_emp):'—'}</td><td class="amount pos" style="font-weight:700">${fmt(Math.max(0,d.liquido))}</td></tr>`;
  });
  document.getElementById('folha-tbody').innerHTML=rows;
  document.getElementById('folha-tfoot').innerHTML=`<tr class="tfoot-row"><td colspan="3">TOTAIS</td><td>${fmt(tB)}</td><td></td><td></td><td>${fmt(tB)}</td><td>${fmt(tA)}</td><td>${tF>0?tF.toFixed(2)+'d':'—'}</td><td>-${fmt(tD)}</td><td>${fmt(tS)}</td><td>${fmt(tL)}</td></tr>`;
}

// ════ COLABORADORES ════
function renderColaboradores(){
  const mes=currentMonth.colab;
  const showA=document.getElementById('colab-show-archived')?.checked;
  const vis=colaboradores.filter(c=>!c.archived||showA);
  if(!vis.length){document.getElementById('colab-grid').innerHTML='<div class="empty-state"><p>Nenhum colaborador visível.</p></div>';return;}
  document.getElementById('colab-grid').innerHTML=vis.map(c=>{
    const d=calcCol(c,mes);
    const ini=c.nome.split(' ').slice(0,2).map(w=>w[0]).join('');
    return`<div class="colab-card${c.archived?' archived':''}">
      <div class="colab-card-actions">
        ${c.archived?`<button class="btn btn-sm btn-unarchive" onclick="toggleArchive('${c.id}')">Reativar</button>`:`<button class="btn btn-sm btn-ghost" onclick="openEditColab('${c.id}')">Editar</button><button class="btn btn-sm btn-archive" onclick="toggleArchive('${c.id}')">Arquivar</button>`}
      </div>
      <div class="colab-top">
        <div class="colab-avatar${c.archived?' arch':''}">${ini}</div>
        <div><div class="colab-name">${c.nome}${c.archived?'<span class="archived-badge">Arquivado</span>':''}</div>
        <div class="colab-role">${c.funcao||'<span style="color:#ccc;font-style:italic">Função por confirmar</span>'} · <span class="code-badge">${c.id}</span></div></div>
      </div>
      <div class="colab-stats">
        <div class="colab-stat"><div class="colab-stat-label">Salário Base</div><div class="colab-stat-val">${fmt(c.salario)}</div></div>
        <div class="colab-stat"><div class="colab-stat-label">Líquido ${MESES[mes-1]}</div><div class="colab-stat-val" style="color:var(--green)">${fmt(Math.max(0,d.liquido))}</div></div>
        <div class="colab-stat"><div class="colab-stat-label">Faltas</div><div class="colab-stat-val" style="color:${d.totalFaltasDias>0?'var(--red)':'var(--green)'}">${d.totalFaltasDias>0?d.totalFaltasDias+'d':'—'}</div></div>
        <div class="colab-stat"><div class="colab-stat-label">Adiantamentos</div><div class="colab-stat-val" style="color:${d.totalAdiant>0?'var(--orange)':'inherit'}">${d.totalAdiant>0?fmt(d.totalAdiant):'—'}</div></div>
      </div>
    </div>`;
  }).join('');
}

// ════ HISTÓRICO ════
function deleteRegisto(id){
  if(!confirm('Apagar este registo?'))return;
  registos=registos.filter(r=>r.id!==id);
  sb.from('registos').delete().eq('id',id).then(({error})=>dbErr(error,'deleteRegisto'));
  renderHistorico();renderLog();renderDashboard();
  showToast('Registo apagado.','success');
}

function renderHistorico(){
  const fc=document.getElementById('hist-filter-colab')?.value;
  const ft=document.getElementById('hist-filter-tipo')?.value;
  const cn=id=>{const c=colaboradores.find(x=>x.id===id);return c?c.nome:id;};
  const on=id=>{const o=obras.find(x=>x.id===id);return o?o.nome:id;};

  let allItems=[
    ...registos.map(r=>({...r,_src:'reg'})),
    ...alocacoes.map(a=>({...a,tipo:'alocacao',_src:'aloc'}))
  ].sort((a,b)=>(b.id||0)-(a.id||0));

  if(fc)allItems=allItems.filter(r=>r.colaborador===fc||r.colabId===fc);
  if(ft)allItems=allItems.filter(r=>r.tipo===ft);

  if(!allItems.length){document.getElementById('hist-tbody').innerHTML='<div class="empty-state"><p>Nenhum registo encontrado.</p></div>';return;}
  document.getElementById('hist-tbody').innerHTML='<div class="log-list">'+allItems.map(r=>{
    if(r.tipo==='falta'){
      const desc=r.modo==='hora'?`Atraso ${r.horas}h · ${r.mes}`:`Falta ${r.tipoFalta} · ${r.dias}d · ${r.mes}`;
      return`<div class="log-item"><div class="log-dot falta"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">${desc}${r.obs?' · '+r.obs:''}</div></div><div class="log-amount falta">${r.modo==='hora'?'-'+r.horas+'h':'-'+r.dias+'d'}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteRegisto(${r.id})">×</button></div>`;
    }else if(r.tipo==='sabado'){
      return`<div class="log-item"><div class="log-dot sabado"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Sábados · ${r.numSabados}× · ${r.mes}</div></div><div class="log-amount sabado">+${fmt(r.totalValor)}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteRegisto(${r.id})">×</button></div>`;
    }else if(r.tipo==='adiantamento'){
      return`<div class="log-item"><div class="log-dot adiantamento"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Adiantamento · ${r.mes}${r.obs?' · '+r.obs:''}</div></div><div class="log-amount adiantamento">${fmt(r.valor)}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteRegisto(${r.id})">×</button></div>`;
    }else if(r.tipo==='alocacao'){
      const c=colaboradores.find(x=>x.id===r.colabId);
      const custoDia=c?c.valorDia:parseFloat(r.custoDia||0);
      const total=parseInt(r.dias||0)*custoDia;
      return`<div class="log-item"><div class="log-dot" style="background:var(--cyan)"></div><div class="log-info"><div class="log-name">${cn(r.colabId)}</div><div class="log-desc">Alocação → <span class="obra-badge">${on(r.obraId)}</span> · ${r.dias} dias · ${r.periodo||''}</div></div><div class="log-amount" style="color:var(--cyan)">${fmt(total)}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteAlocacao(${r.id})">×</button></div>`;
    }
    if(r.tipo==='diasTrabalhados'){return`<div class="log-item"><div class="log-dot" style="background:var(--orange)"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Dias trabalhados${r.descricao?' · '+r.descricao:''} · ${r.dias}d × ${fmt(r.valorDia)}/dia · ${r.mes}</div></div><div class="log-amount" style="color:var(--orange)">${fmt(r.total)}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteRegisto(${r.id})">×</button></div>`;}
    if(r.tipo==='horasExtras'){return`<div class="log-item"><div class="log-dot" style="background:#7c3aed"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Horas extras · ${r.tipoLabel} · ${r.horas}h · ${r.mes}</div></div><div class="log-amount" style="color:#7c3aed">+${fmt(r.total)}</div><div class="log-date">${fd(r.data)}</div><button class="btn btn-sm btn-danger" style="margin-left:10px" onclick="deleteRegisto(${r.id})">×</button></div>`;}
    return'';
  }).join('')+'</div>';
}

function renderLog(){
  const el=document.getElementById('log-container');
  const cn=id=>{const c=colaboradores.find(x=>x.id===id);return c?c.nome.split(' ')[0]:id;};
  const on=id=>{const o=obras.find(x=>x.id===id);return o?o.nome:id;};
  const allR=[
    ...registos.map(r=>({...r,_ts:r.id||0})),
    ...alocacoes.map(a=>({...a,tipo:'alocacao',_ts:a.id||0}))
  ].sort((a,b)=>b._ts-a._ts).slice(0,12);
  if(!allR.length){el.innerHTML='<div class="empty-state"><p>Nenhum registo ainda.</p></div>';return;}
  el.innerHTML='<div class="log-list">'+allR.map(r=>{
    if(r.tipo==='falta')return`<div class="log-item"><div class="log-dot falta"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">${r.modo==='hora'?'Atraso '+r.horas+'h':'Falta '+r.dias+'d'} · ${r.mes}</div></div><div class="log-amount falta">${r.modo==='hora'?'-'+r.horas+'h':'-'+r.dias+'d'}</div><div class="log-date">${fd(r.data)}</div></div>`;
    if(r.tipo==='sabado')return`<div class="log-item"><div class="log-dot sabado"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Sábados ${r.numSabados}× · ${r.mes}</div></div><div class="log-amount sabado">+${fmt(r.totalValor)}</div><div class="log-date">${fd(r.data)}</div></div>`;
    if(r.tipo==='adiantamento')return`<div class="log-item"><div class="log-dot adiantamento"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Adiantamento · ${r.mes}</div></div><div class="log-amount adiantamento">${fmt(r.valor)}</div><div class="log-date">${fd(r.data)}</div></div>`;
    if(r.tipo==='alocacao'){const c=colaboradores.find(x=>x.id===r.colabId);const cd=c?c.valorDia:0;const t=parseInt(r.dias||0)*cd;return`<div class="log-item"><div class="log-dot" style="background:var(--cyan)"></div><div class="log-info"><div class="log-name">${cn(r.colabId)}</div><div class="log-desc">→ ${on(r.obraId)} · ${r.dias}d · ${r.periodo||''}</div></div><div class="log-amount" style="color:var(--cyan)">${fmt(t)}</div><div class="log-date">${fd(r.data)}</div></div>`;}
    if(r.tipo==='diasTrabalhados'){return`<div class="log-item"><div class="log-dot" style="background:var(--orange)"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Dias trabalhados${r.descricao?' · '+r.descricao:''} · ${r.dias}d × ${fmt(r.valorDia)}/dia · ${r.mes}</div></div><div class="log-amount" style="color:var(--orange)">${fmt(r.total)}</div><div class="log-date">${fd(r.data)}</div></div>`;}
    if(r.tipo==='horasExtras'){return`<div class="log-item"><div class="log-dot" style="background:#7c3aed"></div><div class="log-info"><div class="log-name">${cn(r.colaborador)}</div><div class="log-desc">Horas extras · ${r.tipoLabel} · ${r.horas}h · ${r.mes}</div></div><div class="log-amount" style="color:#7c3aed">+${fmt(r.total)}</div><div class="log-date">${fd(r.data)}</div></div>`;}
    return'';
  }).join('')+'</div>';
}

// ════ OBRAS ════
function addObra(){
  const nome=document.getElementById('obra-nome').value.trim();
  const codigo=document.getElementById('obra-codigo').value.trim();
  const cliente=document.getElementById('obra-cliente').value.trim();
  const inicio=document.getElementById('obra-inicio').value;
  const estado=document.getElementById('obra-estado').value;
  const faturado=parseFloat(document.getElementById('obra-faturado').value)||0;
  if(!nome){showToast('Insere o nome da obra.','error');return;}
  const novaObra={id:Date.now().toString(),nome,codigo,cliente,inicio,estado,faturado};
  obras.push(novaObra);
  sb.from('obras').insert(novaObra).then(({error})=>dbErr(error,'addObra'));
  closeModal('modal-obra');
  ['obra-nome','obra-codigo','obra-cliente','obra-inicio','obra-faturado'].forEach(i=>document.getElementById(i).value='');
  renderObras();populateAllSelects();showToast('Obra criada!','success');
}

function renderObras(){
  const grid=document.getElementById('obras-grid');
  if(!obras.length){grid.innerHTML='<div style="grid-column:1/-1" class="empty-state"><p>Nenhuma obra. Clica em + Nova Obra.</p></div>';return;}
  grid.innerHTML=obras.map(o=>{
    const d=calcObra(o);
    const estadoColor=o.estado==='ativa'?'var(--green)':o.estado==='concluida'?'#999':'var(--orange)';
    const faturado=parseFloat(o.faturado||0);
    const margem=faturado>0?faturado-d.total:null;
    const margemPct=faturado>0?((margem/faturado)*100).toFixed(1):null;
    const margemCor=margem===null?'var(--mid)':margem>=0?'var(--green)':'var(--red)';
    return`<div class="obra-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px">
        <div class="obra-card-name">${o.nome}</div>
        <span style="font-size:11px;font-weight:600;color:${estadoColor}">${o.estado.toUpperCase()}</span>
      </div>
      <div class="obra-card-client">${o.codigo?o.codigo+' · ':''}${o.cliente||'Sem cliente'}</div>
      <div class="obra-costs">
        <div class="obra-cost-item"><div class="obra-cost-label">Materiais</div><div class="obra-cost-val mat">${fmt(d.matCost)}</div></div>
        <div class="obra-cost-item"><div class="obra-cost-label">Mão de Obra</div><div class="obra-cost-val mao">${fmt(d.maoCost)}</div></div>
      </div>
      <div class="obra-total"><span class="obra-total-label">Custo Total</span><span class="obra-total-val">${fmt(d.total)}</span></div>
      ${faturado>0?`
      <div style="display:flex;justify-content:space-between;align-items:center;background:var(--green-bg);border-radius:8px;padding:9px 12px;margin-top:8px">
        <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--mid)">Faturado s/IVA</span>
        <span style="font-family:'DM Mono',monospace;font-weight:700;font-size:15px;color:var(--green)">${fmt(faturado)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:${margem>=0?'var(--green-bg)':'var(--red-bg)'};border-radius:8px;margin-top:4px">
        <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--mid)">Margem</span>
        <span style="font-family:'DM Mono',monospace;font-weight:700;font-size:15px;color:${margemCor}">${fmt(margem)} <span style="font-size:11px">(${margemPct}%)</span></span>
      </div>`:''}
    </div>`;
  }).join('');
}

// ════ FATURAS ════
// Converte qualquer imagem (incluindo HEIC do iPhone) para JPEG base64
function normalizeImageToJpeg(file){
  return new Promise((resolve, reject)=>{
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = ()=>{
      const canvas = document.createElement('canvas');
      const max = 1600;
      let w = img.naturalWidth, h = img.naturalHeight;
      if(w > max || h > max){
        if(w > h){h = Math.round(h*max/w);w=max;}
        else{w=Math.round(w*max/h);h=max;}
      }
      canvas.width=w; canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.75).split(',')[1]);
    };
    img.onerror = ()=>{ URL.revokeObjectURL(url); reject(new Error('Imagem invalida')); };
    img.src = url;
  });
}

async function handleFoto(input){
  const file=input.files[0];if(!file)return;
  const st=document.getElementById('ai-status');
  const stT=document.getElementById('ai-status-text');
  st.className='ai-status loading';stT.textContent='A preparar imagem...';
  try{
    const parts=[];
    if(file.type==='application/pdf'){
      const b64=await fileToBase64(file);
      parts.push({type:'document',source:{type:'base64',media_type:'application/pdf',data:b64}});
    } else {
      stT.textContent='A converter imagem...';
      const b64=await normalizeImageToJpeg(file);
      parts.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}});
    }
    stT.textContent='A analisar fatura com IA...';
    parts.push({type:'text',text:'Analisa esta fatura e extrai os campos em JSON puro sem markdown: {"fornecedor":"nome","data":"YYYY-MM-DD","descricao":"breve descricao","valor":numero} Se nao encontrares um campo usa null. Responde APENAS com o JSON.'});
    const res=await fetch('/.netlify/functions/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:parts}]})});
    const rawText=await res.text();
    if(!res.ok){throw new Error('HTTP '+res.status+': '+rawText.slice(0,200));}
    let data;
    try{data=JSON.parse(rawText);}catch(e){throw new Error('Resposta invalida: '+rawText.slice(0,200));}
    const text=data.content?.map(b=>b.text||'').join('').replace(/```json|```/g,'').trim();
    if(!text)throw new Error('Resposta vazia da IA');
    let p;
    try{p=JSON.parse(text);}catch(e){throw new Error('JSON da IA invalido: '+text.slice(0,200));}
    if(p.fornecedor)document.getElementById('fat-fornecedor').value=p.fornecedor;
    if(p.data)document.getElementById('fat-data').value=p.data;
    if(p.descricao)document.getElementById('fat-descricao').value=p.descricao;
    if(p.valor)document.getElementById('fat-valor').value=p.valor;
    st.className='ai-status done';stT.textContent='Fatura analisada! Verifica os campos abaixo.';
  }catch(e){st.className='ai-status error';stT.textContent='Erro: '+(e.message||'Tenta novamente.');}
}

function fileToBase64(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej();r.readAsDataURL(file);});}

function addFatura(){
  const fornecedor=document.getElementById('fat-fornecedor').value.trim();
  const data=document.getElementById('fat-data').value;
  const descricao=document.getElementById('fat-descricao').value.trim();
  const valor=parseFloat(document.getElementById('fat-valor').value);
  const obraId=document.getElementById('fat-obra').value;
  if(!fornecedor||!valor||!obraId){showToast('Preenche fornecedor, valor e obra.','error');return;}
  const novaFatura={id:Date.now().toString(),fornecedor,data,descricao,valor,obraId,origem:'IA'};
  faturas.push(novaFatura);
  sb.from('faturas').insert(novaFatura).then(({error})=>dbErr(error,'addFatura'));
  closeModal('modal-fatura');
  ['fat-fornecedor','fat-data','fat-descricao','fat-valor'].forEach(i=>document.getElementById(i).value='');
  document.getElementById('fat-obra').value='';
  document.getElementById('ai-status').className='ai-status';
  renderFaturas();renderObras();renderDashboard();
  showToast('Fatura guardada!','success');
}

function renderFaturas(){
  populateAllSelects();
  const filter=document.getElementById('filter-fat-obra')?.value||'';
  const list=filter?faturas.filter(f=>f.obraId===filter):faturas;
  const tbody=document.getElementById('faturas-tbody');
  if(!list.length){tbody.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--mid);padding:32px">Nenhuma fatura registada</td></tr>';return;}
  tbody.innerHTML=[...list].reverse().map(f=>{
    const o=obras.find(x=>x.id===f.obraId);
    return`<tr><td>${f.data||'—'}</td><td><strong>${f.fornecedor}</strong></td><td style="color:var(--mid);max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.descricao||'—'}</td><td>${o?`<span class="obra-badge">${o.nome}</span>`:'—'}</td><td class="amount" style="color:var(--cyan);font-weight:600">${fmt(f.valor)}</td><td><span style="font-size:11px;background:#f0f0f0;color:#777;padding:2px 8px;border-radius:10px">${f.origem||'Manual'}</span></td><td><button class="btn btn-sm btn-danger" onclick="deleteFatura('${f.id}')">×</button></td></tr>`;
  }).join('');
}

function deleteFatura(id){
  if(!confirm('Apagar esta fatura?'))return;
  faturas=faturas.filter(f=>f.id!==id);
  sb.from('faturas').delete().eq('id',id).then(({error})=>dbErr(error,'deleteFatura'));
  renderFaturas();renderObras();renderDashboard();showToast('Fatura apagada.','success');
}

// ════ ALOCAÇÕES ════
function updateAlocPreview(){
  const cid=document.getElementById('aloc-colab').value;
  const oid=document.getElementById('aloc-obra-sel').value;
  const dias=parseInt(document.getElementById('aloc-dias').value)||0;
  const c=colaboradores.find(x=>x.id===cid);
  const o=obras.find(x=>x.id===oid);
  const prev=document.getElementById('aloc-preview');
  if(c&&o&&dias>0)prev.innerHTML=`<strong>${c.nome.split(' ')[0]}</strong> → <strong>${o.nome}</strong> · ${dias} dias × ${fmt(c.valorDia)}/dia = <strong style="color:var(--cyan)">${fmt(dias*c.valorDia)}</strong>`;
  else prev.textContent='Seleciona colaborador e obra para calcular o custo.';
}

function registarAlocacao(){
  const colabId=document.getElementById('aloc-colab').value;
  const obraId=document.getElementById('aloc-obra-sel').value;
  const periodo=document.getElementById('aloc-periodo').value;
  const dias=parseInt(document.getElementById('aloc-dias').value);
  if(!colabId||!obraId||!dias||dias<=0){showToast('Preenche todos os campos.','error');return;}
  const novaAloc={id:Date.now(),colabId,obraId,periodo,dias,data:new Date().toISOString().split('T')[0]};
  alocacoes.push(novaAloc);
  sb.from('alocacoes').insert(novaAloc).then(({error})=>dbErr(error,'registarAlocacao'));
  renderLog();renderObras();renderDashboard();renderHistorico();
  document.getElementById('aloc-dias').value='';
  document.getElementById('aloc-preview').textContent='';
  showToast('Alocação registada!','success');
}

// ════ CUSTOS POR OBRA ════
function renderCustos(){
  const el=document.getElementById('custos-content');
  if(!obras.length){el.innerHTML='<div class="card"><div class="empty-state"><p>Nenhuma obra criada ainda.</p></div></div>';return;}
  el.innerHTML=obras.map(o=>{
    const d=calcObra(o);
    const fats=faturas.filter(f=>f.obraId===o.id);
    const alocs=alocacoes.filter(a=>a.obraId===o.id);
    const fatsHtml=fats.length?fats.map(f=>`<tr><td>${f.data||'—'}</td><td>${f.fornecedor}</td><td style="color:var(--mid)">${f.descricao||'—'}</td><td class="amount" style="color:var(--cyan)">${fmt(f.valor)}</td></tr>`).join(''):'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:12px;font-size:12px">Sem faturas</td></tr>';
    const alocsHtml=alocs.length?alocs.map(a=>{const c=colaboradores.find(x=>x.id===a.colabId);const cd=c?c.valorDia:0;const t=parseInt(a.dias||0)*cd;return`<tr><td>${a.periodo||a.data||'—'}</td><td>${c?c.nome:'?'}</td><td>${a.dias} dias</td><td class="amount" style="color:var(--pink)">${fmt(t)}</td><td><button class="btn btn-sm btn-danger" onclick="deleteAlocacao(${a.id});renderCustos()">×</button></td></tr>`;}).join(''):'<tr><td colspan="4" style="text-align:center;color:var(--mid);padding:12px;font-size:12px">Sem alocações</td></tr>';
    return`<div class="card" style="margin-bottom:20px">
      <div class="card-header">
        <div>
          <span class="card-title">${o.nome}</span>
          ${o.codigo?`<span class="obra-badge" style="margin-left:8px">${o.codigo}</span>`:''}
          ${o.cliente?`<span style="font-size:12px;color:var(--mid);margin-left:8px">· ${o.cliente}</span>`:''}
        </div>
        <div style="display:flex;gap:12px;align-items:center">
          <span style="font-size:12px;color:var(--mid)">Materiais: <strong style="color:var(--cyan)">${fmt(d.matCost)}</strong></span>
          <span style="font-size:12px;color:var(--mid)">Mão de Obra: <strong style="color:var(--pink)">${fmt(d.maoCost)}</strong></span>
          <span style="font-size:13px;font-weight:700;color:var(--dark)">Total: ${fmt(d.total)}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border)">
        <div style="border-right:1px solid var(--border)">
          <div style="padding:10px 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--cyan);background:#fafafa;border-bottom:1px solid var(--border)">📄 Faturas / Materiais</div>
          <table><thead><tr><th>Data</th><th>Fornecedor</th><th>Descrição</th><th>Valor</th></tr></thead><tbody>${fatsHtml}</tbody></table>
        </div>
        <div>
          <div style="padding:10px 14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--pink);background:#fafafa;border-bottom:1px solid var(--border)">👷 Mão de Obra</div>
          <table><thead><tr><th>Período</th><th>Colaborador</th><th>Dias</th><th>Custo</th><th></th></tr></thead><tbody>${alocsHtml}</tbody></table>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ════ OCORRÊNCIAS ════
function toggleFaltaMode(){
  const t=document.getElementById('falta-tipo').value;
  document.getElementById('falta-dias-wrap').style.display=t==='hora'?'none':'';
  document.getElementById('falta-horas-wrap').style.display=t==='hora'?'':'none';
  updateFaltaPreview();
}
function updateFaltaPreview(){
  const cid=document.getElementById('falta-colab').value;
  const tipo=document.getElementById('falta-tipo').value;
  const c=colaboradores.find(x=>x.id===cid);
  const prev=document.getElementById('falta-preview');
  if(!c){prev.textContent='Seleciona um colaborador.';return;}
  if(tipo==='hora'){const h=parseFloat(document.getElementById('falta-horas').value)||0;prev.innerHTML=h>0?`<strong>${c.nome.split(' ')[0]}</strong> · ${h}h = ${(h/8).toFixed(3)}d · Desconto: <strong style="color:var(--red)">${fmt(h/8*c.valorDia)}</strong>`:`Valor dia: ${fmt(c.valorDia)} · Introduz as horas.`;}
  else{const dias=parseFloat(document.getElementById('falta-dias').value)||0;prev.innerHTML=dias>0?`<strong>${c.nome.split(' ')[0]}</strong> · ${dias}d × ${fmt(c.valorDia)}/dia = Desconto: <strong style="color:var(--red)">${fmt(dias*c.valorDia)}</strong>`:`Valor dia: ${fmt(c.valorDia)} · Introduz o nº de dias.`;}
}
function registarFalta(){
  const colab=document.getElementById('falta-colab').value;
  const data=document.getElementById('falta-data').value;
  const tipo=document.getElementById('falta-tipo').value;
  const obs=document.getElementById('falta-obs').value;
  if(!colab||!data){showToast('Preenche colaborador e data.','error');return;}
  const mes=MESES[new Date(data).getMonth()];
  let novoReg;
  if(tipo==='hora'){const horas=parseFloat(document.getElementById('falta-horas').value);if(!horas||horas<=0){showToast('Introduz o nº de horas.','error');return;}novoReg={tipo:'falta',colaborador:colab,data,modo:'hora',horas,tipoFalta:'Atraso',obs,mes,id:Date.now()};document.getElementById('falta-horas').value='';}
  else{const dias=parseFloat(document.getElementById('falta-dias').value);if(!dias||dias<=0){showToast('Introduz o nº de dias.','error');return;}const tf=tipo==='baixa'?'Baixa médica':tipo==='justificada'?'Justificada':'Injustificada';novoReg={tipo:'falta',colaborador:colab,data,modo:'dia',dias,tipoFalta:tf,obs,mes,id:Date.now()};document.getElementById('falta-dias').value='';}
  registos.push(novoReg);
  sb.from('registos').insert(novoReg).then(({error})=>dbErr(error,'registarFalta'));
  document.getElementById('falta-obs').value='';renderLog();renderDashboard();showToast('Falta registada!','success');
}
function registarAdiantamento(){
  const colab=document.getElementById('adiant-colab').value;
  const data=document.getElementById('adiant-data').value;
  const mes=document.getElementById('adiant-mes').value;
  const valor=parseFloat(document.getElementById('adiant-valor').value);
  const obs=document.getElementById('adiant-obs').value;
  if(!colab||!data||!mes||!valor||valor<=0){showToast('Preenche todos os campos.','error');return;}
  const novoAdiant={tipo:'adiantamento',colaborador:colab,data,mes,valor,obs,id:Date.now()};
  registos.push(novoAdiant);
  sb.from('registos').insert(novoAdiant).then(({error})=>dbErr(error,'registarAdiantamento'));
  document.getElementById('adiant-valor').value='';document.getElementById('adiant-obs').value='';
  renderLog();renderDashboard();showToast('Adiantamento registado!','success');
}
function updateDiasPreview(){
  const cid=document.getElementById('dias-colab').value;
  const c=colaboradores.find(x=>x.id===cid);
  if(c&&c.valorDia>0&&!document.getElementById('dias-valor').value)document.getElementById('dias-valor').value=c.valorDia;
  const num=parseInt(document.getElementById('dias-num').value)||0;
  const val=parseFloat(document.getElementById('dias-valor').value)||0;
  const desc=document.getElementById('dias-desc')?.value||'';
  const prev=document.getElementById('dias-preview');
  if(c&&num>0&&val>0)prev.innerHTML=`<strong>${c.nome.split(' ')[0]}</strong>${desc?' · '+desc:''} · ${num} dias × ${fmt(val)}/dia = <strong style="color:var(--orange)">${fmt(num*val)}</strong>`;
  else if(c)prev.innerHTML=`Valor por dia: <strong>${fmt(c.valorDia)}</strong> · Introduz o nº de dias.`;
  else prev.textContent='Seleciona um colaborador.';
}

function registarDiasTrabalhados(){
  const colab=document.getElementById('dias-colab').value;
  const mes=document.getElementById('dias-mes').value;
  const num=parseInt(document.getElementById('dias-num').value);
  const val=parseFloat(document.getElementById('dias-valor').value);
  const desc=document.getElementById('dias-desc')?.value.trim()||'';
  if(!colab||!mes||!num||num<=0||!val||val<=0){showToast('Preenche todos os campos.','error');return;}
  // Permite múltiplos registos (ex: Aurora em locais diferentes)
  const novoDias={tipo:'diasTrabalhados',colaborador:colab,mes,dias:num,valorDia:val,total:num*val,descricao:desc,data:new Date().toISOString().split('T')[0],id:Date.now()};
  registos.push(novoDias);
  sb.from('registos').insert(novoDias).then(({error})=>dbErr(error,'registarDias'));
  document.getElementById('dias-num').value='';document.getElementById('dias-valor').value='';document.getElementById('dias-desc').value='';
  document.getElementById('dias-preview').textContent='Seleciona colaborador para ver o valor por dia.';
  renderLog();renderDashboard();
  showToast(`${num} dias${desc?' ('+desc+')':''} = ${fmt(num*val)}`,'success');
}

// ── HORAS EXTRAS ──
function calcValorHoraExtra(c, tipo){
  // valor hora = valorDia / 8
  const valorHora = c.valorDia / 8;
  if(tipo==='util_1') return valorHora * 1.25;
  if(tipo==='util_2') return valorHora * 1.375;
  if(tipo==='descanso') return valorHora * 1.5;
  return valorHora;
}

function updateExtrasPreview(){
  const cid=document.getElementById('ext-colab').value;
  const c=colaboradores.find(x=>x.id===cid);
  const tipo=document.getElementById('ext-tipo').value;
  const horas=parseFloat(document.getElementById('ext-horas').value)||0;
  const prev=document.getElementById('ext-preview');
  if(!c){prev.textContent='Seleciona um colaborador.';return;}
  const valorHoraBase=c.valorDia/8;
  const pct=tipo==='util_1'?'+25%':tipo==='util_2'?'+37,5%':'+50%';
  const valorHoraExtra=calcValorHoraExtra(c,tipo);
  if(horas>0){
    const total=horas*valorHoraExtra;
    prev.innerHTML=`<strong>${c.nome.split(' ')[0]}</strong> · ${horas}h × ${fmt(valorHoraExtra)}/h (${pct}) = <strong style="color:#7c3aed">${fmt(total)}</strong>`;
  } else {
    prev.innerHTML=`Valor hora base: ${fmt(valorHoraBase)} · Com extra <em>dia útil 1ª hora</em>: ${fmt(valorHoraBase*1.25)}/h · <em>2ª+ hora</em>: ${fmt(valorHoraBase*1.375)}/h · <em>descanso/feriado</em>: ${fmt(valorHoraBase*1.5)}/h`;
  }
}

function registarHorasExtras(){
  const colab=document.getElementById('ext-colab').value;
  const mes=document.getElementById('ext-mes').value;
  const tipo=document.getElementById('ext-tipo').value;
  const horas=parseFloat(document.getElementById('ext-horas').value);
  if(!colab||!mes||!horas||horas<=0){showToast('Preenche todos os campos.','error');return;}
  const c=colaboradores.find(x=>x.id===colab);
  const valorHora=calcValorHoraExtra(c,tipo);
  const total=horas*valorHora;
  const tipoLabel=tipo==='util_1'?'Dia útil 1ª hora (+25%)':tipo==='util_2'?'Dia útil 2ª+ hora (+37,5%)':'Descanso/Feriado (+50%)';
  const novoExtra={tipo:'horasExtras',colaborador:colab,mes,tipoExtra:tipo,tipoLabel,horas,valorHora,total,data:new Date().toISOString().split('T')[0],id:Date.now()};
  registos.push(novoExtra);
  sb.from('registos').insert(novoExtra).then(({error})=>dbErr(error,'registarExtras'));
  document.getElementById('ext-horas').value='';
  document.getElementById('ext-preview').textContent='Seleciona colaborador para calcular o valor das horas extra.';
  renderLog();renderDashboard();
  showToast(`${horas}h extras = ${fmt(total)}`,'success');
}

function updateSabPreview(){
  const cid=document.getElementById('sab-colab').value;
  const c=colaboradores.find(x=>x.id===cid);
  if(c&&c.sabados_rate>0&&!document.getElementById('sab-valor-unit').value)document.getElementById('sab-valor-unit').value=c.sabados_rate;
  const num=parseFloat(document.getElementById('sab-num').value)||0;
  const unit=parseFloat(document.getElementById('sab-valor-unit').value)||0;
  const prev=document.getElementById('sab-preview');
  if(c&&num>0&&unit>0)prev.innerHTML=`<strong>${c.nome.split(' ')[0]}</strong> · ${num} sábado(s) × ${fmt(unit)} = <strong style="color:var(--purple)">${fmt(num*unit)}</strong>`;
  else if(c)prev.innerHTML=c.sabados_rate>0?`Valor por sábado: <strong>${fmt(c.sabados_rate)}</strong> · Introduz o nº de sábados.`:'Sem valor de sábado definido — podes introduzir manualmente.';
  else prev.textContent='Seleciona um colaborador.';
}
function registarSabados(){
  const colab=document.getElementById('sab-colab').value;
  const mes=document.getElementById('sab-mes').value;
  const num=parseFloat(document.getElementById('sab-num').value);
  const unit=parseFloat(document.getElementById('sab-valor-unit').value);
  if(!colab||!mes||!num||num<=0||!unit||unit<=0){showToast('Preenche todos os campos.','error');return;}
  const novoSab={tipo:'sabado',colaborador:colab,mes,numSabados:num,valorUnit:unit,totalValor:num*unit,data:new Date().toISOString().split('T')[0],id:Date.now()};
  registos.push(novoSab);
  sb.from('registos').insert(novoSab).then(({error})=>dbErr(error,'registarSabados'));
  document.getElementById('sab-num').value='';document.getElementById('sab-valor-unit').value='';
  renderLog();renderDashboard();showToast(`Sábados: ${num}× = ${fmt(num*unit)}`,'success');
}
function limparLog(){if(!confirm('Apagar TODOS os registos?'))return;registos=[];sb.from('registos').delete().gte('id',0).then(({error})=>dbErr(error,'limparLog'));renderLog();renderDashboard();showToast('Registos apagados.','success');}

// ════ COLABORADORES ════
function openAddColab(){editingColabId=null;document.getElementById('modal-colab-title').textContent='Novo Colaborador';['nc-id','nc-nome','nc-funcao','nc-salario','nc-valordia','nc-duodecimos','nc-sabado'].forEach(id=>document.getElementById(id).value='');document.getElementById('nc-id').disabled=false;document.querySelectorAll('[name="nc-ss"]').forEach(r=>r.checked=false);document.querySelectorAll('.radio-opt').forEach(l=>l.classList.remove('selected'));openModal('modal-colab');}
function openEditColab(id){editingColabId=id;const c=colaboradores.find(x=>x.id===id);if(!c)return;document.getElementById('modal-colab-title').textContent='Editar Colaborador';document.getElementById('nc-id').value=c.id;document.getElementById('nc-id').disabled=true;document.getElementById('nc-nome').value=c.nome;document.getElementById('nc-funcao').value=c.funcao||'';document.getElementById('nc-salario').value=c.salario;document.getElementById('nc-valordia').value=c.valorDia;document.getElementById('nc-duodecimos').value=c.duodecimos||0;document.getElementById('nc-sabado').value=c.sabados_rate||0;const v=c.ss?'sim':'nao';document.querySelector(`[name="nc-ss"][value="${v}"]`).checked=true;document.querySelectorAll('.radio-opt').forEach(l=>l.classList.remove('selected'));document.querySelector(`[name="nc-ss"][value="${v}"]`).closest('.radio-opt').classList.add('selected');openModal('modal-colab');}
function selectSS(el){document.querySelectorAll('.radio-opt').forEach(l=>l.classList.remove('selected'));el.closest('.radio-opt').classList.add('selected');}
function guardarColaborador(){
  const id=document.getElementById('nc-id').value.trim();
  const nome=document.getElementById('nc-nome').value.trim();
  const funcao=document.getElementById('nc-funcao').value.trim();
  const salario=parseFloat(document.getElementById('nc-salario').value)||0;
  const valorDia=parseFloat(document.getElementById('nc-valordia').value)||0;
  const duodecimos=parseFloat(document.getElementById('nc-duodecimos').value)||0;
  const sabados_rate=parseFloat(document.getElementById('nc-sabado').value)||0;
  const ssEl=document.querySelector('[name="nc-ss"]:checked');
  if(!id||!nome){showToast('Código e nome são obrigatórios.','error');return;}
  if(!editingColabId&&colaboradores.find(c=>c.id===id)){showToast('Código já existe.','error');return;}
  const ss=ssEl?ssEl.value==='sim':false;
  if(editingColabId){
    const i=colaboradores.findIndex(c=>c.id===editingColabId);
    const upd={...colaboradores[i],nome,funcao,salario,valorDia,duodecimos,sabados_rate,ss};
    colaboradores[i]=upd;
    sb.from('colaboradores').update({nome,funcao,salario,valorDia,duodecimos,sabados_rate,ss}).eq('id',editingColabId).then(({error})=>dbErr(error,'editColab'));
    showToast('Colaborador atualizado!','success');
  } else {
    const novoColab={id,nome,funcao,salario,valorDia,ss,duodecimos,sabados_rate,archived:false};
    colaboradores.push(novoColab);
    sb.from('colaboradores').insert(novoColab).then(({error})=>dbErr(error,'addColab'));
    showToast(`${nome} adicionado!`,'success');
  }
  closeModal('modal-colab');populateAllSelects();renderColaboradores();renderDashboard();
}
function toggleArchive(id){const c=colaboradores.find(x=>x.id===id);if(!c)return;if(!confirm(`Tens a certeza?`))return;c.archived=!c.archived;sb.from('colaboradores').update({archived:c.archived}).eq('id',id).then(({error})=>dbErr(error,'toggleArchive'));renderColaboradores();showToast(c.archived?`${c.nome.split(' ')[0]} arquivado.`:`${c.nome.split(' ')[0]} reativado!`,'success');}

// ════ EXPORT ════
function exportFolha(){
  const mes=currentMonth.folha;
  let csv='Codigo,Nome,Funcao,Salario Base,Duodecimos,Sabados,Total Bruto,Adiantamentos,Faltas (dias),Desc Faltas,SS Empregado,Liquido\n';
  colaboradores.filter(c=>!c.archived).forEach(c=>{const d=calcCol(c,mes);csv+=`${c.id},"${c.nome}","${c.funcao||''}",${c.salario},${c.duodecimos},${d.totalSab.toFixed(2)},${d.bruto.toFixed(2)},${d.totalAdiant.toFixed(2)},${d.totalFaltasDias.toFixed(2)},${d.descFaltas.toFixed(2)},${d.ss_emp.toFixed(2)},${Math.max(0,d.liquido).toFixed(2)}\n`;});
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`HomeConcept_Salarios_${MESES[mes-1]}_2026.csv`;a.click();
  showToast('CSV exportado!','success');
}

function exportPagamentosExcel(){
  const mes=currentMonth.folha;
  const nomeMes=MESES[mes-1];
  const cols=colaboradores.filter(c=>!c.archived);

  // Build HTML table styled as Excel
  let totalLiquido=0, totalAdiant=0, totalTransferir=0;
  let rows='';
  cols.forEach((c,i)=>{
    const d=calcCol(c,mes);
    const liquido=Math.max(0,d.bruto-d.descFaltas-d.ss_emp);
    const transferir=Math.max(0,liquido-d.totalAdiant);
    totalLiquido+=liquido;
    totalAdiant+=d.totalAdiant;
    totalTransferir+=transferir;
    const bg=i%2===0?'#ffffff':'#f9f9f9';
    rows+=`<tr style="background:${bg}">
      <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px">${c.nome}</td>
      <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;text-align:right;font-family:monospace">${liquido.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})} €</td>
      <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;text-align:right;font-family:monospace;color:#d35400">${d.totalAdiant>0?d.totalAdiant.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})+' €':'—'}</td>
      <td style="padding:8px 12px;border:1px solid #ddd;font-size:13px;text-align:right;font-family:monospace;font-weight:700;color:#1a7a4a">${transferir.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})} €</td>
    </tr>`;
  });

  const html=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8">
    <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>Pagamentos ${nomeMes}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
    </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;width:100%">
      <tr style="background:#BE1E8C">
        <td colspan="4" style="padding:14px 16px;color:#fff;font-size:16px;font-weight:700;letter-spacing:1px">
          HomeConcept — Pagamentos de Salários · ${nomeMes} 2026
        </td>
      </tr>
      <tr style="background:#1A1A1A">
        <th style="padding:10px 12px;color:#fff;font-size:12px;text-align:left;border:1px solid #333;min-width:250px">COLABORADOR</th>
        <th style="padding:10px 12px;color:#fff;font-size:12px;text-align:right;border:1px solid #333;min-width:140px">LÍQUIDO A PAGAR</th>
        <th style="padding:10px 12px;color:#fff;font-size:12px;text-align:right;border:1px solid #333;min-width:140px">ADIANTAMENTOS PAGOS</th>
        <th style="padding:10px 12px;color:#fff;font-size:12px;text-align:right;border:1px solid #333;min-width:140px">A TRANSFERIR</th>
      </tr>
      ${rows}
      <tr style="background:#f0f0f0">
        <td style="padding:10px 12px;border:2px solid #BE1E8C;font-weight:700;font-size:13px">TOTAIS</td>
        <td style="padding:10px 12px;border:2px solid #BE1E8C;text-align:right;font-weight:700;font-family:monospace;font-size:13px">${totalLiquido.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})} €</td>
        <td style="padding:10px 12px;border:2px solid #BE1E8C;text-align:right;font-weight:700;font-family:monospace;font-size:13px;color:#d35400">${totalAdiant.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})} €</td>
        <td style="padding:10px 12px;border:2px solid #BE1E8C;text-align:right;font-weight:700;font-family:monospace;font-size:14px;color:#1a7a4a">${totalTransferir.toLocaleString('pt-PT',{minimumFractionDigits:2,maximumFractionDigits:2})} €</td>
      </tr>
      <tr><td colspan="4" style="padding:8px 12px;font-size:11px;color:#999;border:1px solid #eee">
        Exportado em ${new Date().toLocaleDateString('pt-PT')} · HomeConcept - Design & Construção
      </td></tr>
    </table></body></html>`;

  const blob=new Blob([html],{type:'application/vnd.ms-excel;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`HomeConcept_Pagamentos_${nomeMes}_2026.xls`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Excel exportado!','success');
}

// ════ SELECTS ════
function populateAllSelects(){
  const colabOpts=colaboradores.filter(c=>!c.archived).map(c=>`<option value="${c.id}">${c.nome}</option>`).join('');
  ['falta-colab','adiant-colab','sab-colab','aloc-colab','fer-colab','dias-colab','ext-colab'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=colabOpts;});
  const heC=document.getElementById('hist-filter-colab');
  if(heC)heC.innerHTML='<option value="">Todos os colaboradores</option>'+colaboradores.map(c=>`<option value="${c.id}">${c.nome}</option>`).join('');
  const obraOpts=obras.filter(o=>o.estado==='ativa').map(o=>`<option value="${o.id}">${o.nome}</option>`).join('');
  ['fat-obra','aloc-obra-sel','filter-fat-obra'].forEach(id=>{
    const el=document.getElementById(id);if(!el)return;
    const isFilter=id==='filter-fat-obra';
    el.innerHTML=(isFilter?'<option value="">Todas as obras</option>':'<option value="">Selecionar obra...</option>')+obras.map(o=>`<option value="${o.id}">${o.nome}</option>`).join('');
  });
  // período select para alocações
  const periodoEl=document.getElementById('aloc-periodo');
  if(periodoEl){periodoEl.innerHTML='<option value="">Selecionar período...</option>'+MESES.map(m=>`<option value="${m} 2026">${m} 2026</option>`).join('');}
}

// ════ NAV & MODAIS ════
function showPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>{if(n.getAttribute('onclick')?.includes(`'${page}'`))n.classList.add('active');});
  if(page==='dashboard')renderDashboard();
  if(page==='folha')renderFolha();
  if(page==='colaboradores')renderColaboradores();
  if(page==='historico')renderHistorico();
  if(page==='obras')renderObras();
  if(page==='faturas')renderFaturas();
  if(page==='custos')renderCustos();
  if(page==='ferias'){renderFerias();renderCalendarioFerias();}
  if(page==='validacao'){renderValidacao();}
}
function openModal(id){populateAllSelects();document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.addEventListener('click',e=>{if(e.target.classList.contains('modal-overlay'))closeModal(e.target.id);});

// ════ MESES ════
function buildMonthBars(){
  ['dash','folha','colab','val'].forEach(s=>{
    const el=document.getElementById(`month-bar-${s}`);if(!el)return;
    el.innerHTML=MESES.map((m,i)=>`<button class="month-btn${currentMonth[s]===i+1?' active':''}" onclick="setMonth('${s}',${i+1})">${m}</button>`).join('');
  });
}
function setMonth(s,m){
  if(s==='val'){currentMonthVal=m-1;buildMonthBars();renderValidacao();return;}
  currentMonth[s]=m;buildMonthBars();
  if(s==='dash')renderDashboard();
  if(s==='folha')renderFolha();
  if(s==='colab')renderColaboradores();
}

// ════ LOGIN ════

function doLogin(){
  if(document.getElementById('login-pass').value==='homeconcept2026'){


    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').style.display='block';
    initApp();
  }else{document.getElementById('login-error').style.display='block';document.getElementById('login-pass').value='';document.getElementById('login-pass').focus();}
}
function doLogout(){document.getElementById('login-screen').style.display='flex';document.getElementById('app').style.display='none';document.getElementById('login-pass').value='';document.getElementById('login-error').style.display='none';}

async function initApp(){
  // ── Mostrar loading ──
  document.getElementById('loading-overlay').style.display='flex';

  // ── Carregar dados do Supabase ──
  try{
    const [rc,rr,ro,rf,ra,rfer,rv]=await Promise.all([
      sb.from('colaboradores').select('*'),
      sb.from('registos').select('*'),
      sb.from('obras').select('*'),
      sb.from('faturas').select('*'),
      sb.from('alocacoes').select('*'),
      sb.from('ferias').select('*'),
      sb.from('settings').select('value').eq('key','validacoes').maybeSingle()
    ]);

    // Seed colaboradores se a tabela estiver vazia
    if(!rc.data?.length){
      await sb.from('colaboradores').insert(COLABORADORES_BASE);
      colaboradores=COLABORADORES_BASE;
    } else {
      colaboradores=rc.data;
      // Adicionar colaboradores novos do base que ainda não existam
      const novos=COLABORADORES_BASE.filter(b=>!colaboradores.find(c=>c.id===b.id));
      if(novos.length){await sb.from('colaboradores').insert(novos);colaboradores=[...colaboradores,...novos];}
    }

    // Seed registos se a tabela estiver vazia
    if(!rr.data?.length){
      const seed=REGISTOS_MARCO_2026.filter(r=>!(r.colaborador==='10'&&r.tipo==='falta'&&r.data==='2026-03-11'));
      await sb.from('registos').insert(seed);
      registos=seed;
    } else {
      registos=rr.data;
    }

    obras=ro.data||[];
    faturas=rf.data||[];
    alocacoes=ra.data||[];
    ferias=rfer.data||[];
    validacoes=rv.data?.value||{};
  }catch(err){
    console.error('Erro ao carregar dados:',err);
    showToast('Erro ao ligar ao Supabase.','error');
  }

  // ── Esconder loading ──
  document.getElementById('loading-overlay').style.display='none';

  // ── Real-time ──
  setupRealtime();

  // ── Inicialização da UI ──
  const now=new Date();
  document.getElementById('dash-date').textContent=now.toLocaleDateString('pt-PT',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const m=now.getMonth()+1;currentMonth={dash:m,folha:m,colab:m};
  populateAllSelects();
  const mo=MESES.map(x=>`<option>${x}</option>`).join('');
  document.getElementById('adiant-mes').innerHTML=mo;document.getElementById('sab-mes').innerHTML=mo;document.getElementById('dias-mes').innerHTML=mo;document.getElementById('ext-mes').innerHTML=mo;
  document.getElementById('adiant-mes').value=MESES[m-1];document.getElementById('sab-mes').value=MESES[m-1];document.getElementById('dias-mes').value=MESES[m-1];document.getElementById('ext-mes').value=MESES[m-1];
  const hoje=now.toISOString().split('T')[0];
  document.getElementById('falta-data').value=hoje;document.getElementById('adiant-data').value=hoje;
  document.getElementById('sab-colab').addEventListener('change',updateSabPreview);
  document.getElementById('dias-colab').addEventListener('change',updateDiasPreview);
  document.getElementById('ext-colab').addEventListener('change',updateExtrasPreview);
  document.getElementById('ext-tipo').addEventListener('change',updateExtrasPreview);
  document.getElementById('aloc-colab').addEventListener('change',updateAlocPreview);
  document.getElementById('aloc-obra-sel').addEventListener('change',updateAlocPreview);
  document.getElementById('aloc-dias').addEventListener('input',updateAlocPreview);
  buildMonthBars();renderDashboard();renderLog();
}

function setupRealtime(){
  const reload=async(tabela,cb)=>{const{data}=await sb.from(tabela).select('*');if(data)cb(data);};
  const paginaAtiva=id=>document.getElementById(id)?.classList.contains('active');

  sb.channel('hc-sync')
    .on('postgres_changes',{event:'*',schema:'public',table:'registos'},()=>{
      reload('registos',d=>{registos=d;renderDashboard();renderLog();if(paginaAtiva('page-historico'))renderHistorico();});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'colaboradores'},()=>{
      reload('colaboradores',d=>{colaboradores=d;renderDashboard();populateAllSelects();if(paginaAtiva('page-colaboradores'))renderColaboradores();});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'obras'},()=>{
      reload('obras',d=>{obras=d;renderDashboard();populateAllSelects();if(paginaAtiva('page-obras'))renderObras();if(paginaAtiva('page-custos'))renderCustos();});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'faturas'},()=>{
      reload('faturas',d=>{faturas=d;renderDashboard();if(paginaAtiva('page-faturas'))renderFaturas();if(paginaAtiva('page-custos'))renderCustos();});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'alocacoes'},()=>{
      reload('alocacoes',d=>{alocacoes=d;renderDashboard();if(paginaAtiva('page-custos'))renderCustos();if(paginaAtiva('page-historico'))renderHistorico();});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'ferias'},()=>{
      reload('ferias',d=>{ferias=d;if(paginaAtiva('page-ferias')){renderFerias();renderCalendarioFerias();}});
    })
    .on('postgres_changes',{event:'*',schema:'public',table:'settings'},async()=>{
      const{data}=await sb.from('settings').select('value').eq('key','validacoes').maybeSingle();
      if(data?.value){validacoes=data.value;if(paginaAtiva('page-validacao'))renderValidacao();}
    })
    .subscribe();
}

// ════ FÉRIAS ════
let ferias = [];
let feriasMesAtual = { ano: new Date().getFullYear(), mes: new Date().getMonth() };

async function saveFerias() { const{error}=await sb.from('ferias').upsert(ferias);dbErr(error,'saveFerias'); }

function calcDiasFerias() {
  const ini = document.getElementById('fer-inicio').value;
  const fim = document.getElementById('fer-fim').value;
  const prev = document.getElementById('fer-preview');
  if (!ini || !fim) { prev.textContent = 'Seleciona as datas para ver o total de dias.'; return; }
  const d1 = new Date(ini), d2 = new Date(fim);
  if (d2 < d1) { prev.innerHTML = '<span style="color:var(--red)">A data de fim tem de ser depois do início.</span>'; return; }
  const dias = Math.round((d2 - d1) / 86400000) + 1;
  const uteis = contaDiasUteis(d1, d2);
  prev.innerHTML = `<strong>${dias} dias</strong> no total · <strong>${uteis} dias úteis</strong>`;
}

function contaDiasUteis(d1, d2) {
  let count = 0, cur = new Date(d1);
  while (cur <= d2) {
    const dow = cur.getDay();
    if (dow !== 0 && dow !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

function addFerias() {
  const colabId = document.getElementById('fer-colab').value;
  const inicio = document.getElementById('fer-inicio').value;
  const fim = document.getElementById('fer-fim').value;
  const obs = document.getElementById('fer-obs').value.trim();
  if (!colabId || !inicio || !fim) { showToast('Preenche colaborador e datas.', 'error'); return; }
  const d1 = new Date(inicio), d2 = new Date(fim);
  if (d2 < d1) { showToast('Data de fim inválida.', 'error'); return; }
  const dias = Math.round((d2 - d1) / 86400000) + 1;
  const ano = d1.getFullYear();
  const novasFerias={ id: Date.now(), colabId, inicio, fim, dias, ano, obs };
  ferias.push(novasFerias);
  sb.from('ferias').insert(novasFerias).then(({error})=>dbErr(error,'addFerias'));
  closeModal('modal-ferias');
  document.getElementById('fer-inicio').value = '';
  document.getElementById('fer-fim').value = '';
  document.getElementById('fer-obs').value = '';
  document.getElementById('fer-preview').textContent = 'Seleciona as datas para ver o total de dias.';
  renderFerias();
  renderCalendarioFerias();
  showToast('Férias marcadas!', 'success');
}

function deleteFerias(id) {
  if (!confirm('Apagar este registo de férias?')) return;
  ferias = ferias.filter(f => f.id !== id);
  sb.from('ferias').delete().eq('id',id).then(({error})=>dbErr(error,'deleteFerias'));
  renderFerias(); renderCalendarioFerias();
  showToast('Férias apagadas.', 'success');
}

function mudaMesFerias(delta) {
  feriasMesAtual.mes += delta;
  if (feriasMesAtual.mes > 11) { feriasMesAtual.mes = 0; feriasMesAtual.ano++; }
  if (feriasMesAtual.mes < 0) { feriasMesAtual.mes = 11; feriasMesAtual.ano--; }
  renderCalendarioFerias();
}

function renderCalendarioFerias() {
  const { ano, mes } = feriasMesAtual;
  document.getElementById('ferias-mes-label').textContent = MESES[mes] + ' ' + ano;
  const grid = document.getElementById('ferias-calendario');
  const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  let html = '<div class="ferias-cal-grid">';
  dias.forEach(d => html += `<div class="ferias-cal-head">${d}</div>`);

  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const hoje = new Date(); hoje.setHours(0,0,0,0);

  // dias do mês anterior
  let startDow = primeiroDia.getDay();
  for (let i = 0; i < startDow; i++) {
    const d = new Date(ano, mes, -startDow + i + 1);
    html += `<div class="ferias-cal-day outro-mes">${d.getDate()}</div>`;
  }

  // dias do mês atual
  for (let d = 1; d <= ultimoDia.getDate(); d++) {
    const data = new Date(ano, mes, d); data.setHours(0,0,0,0);
    const dataStr = data.toISOString().split('T')[0];
    const dow = data.getDay();
    const fimSemana = dow === 0 || dow === 6;
    const eHoje = data.getTime() === hoje.getTime();

    // ver quem está de férias neste dia
    const emFerias = ferias.filter(f => {
      const ini = new Date(f.inicio); ini.setHours(0,0,0,0);
      const fim = new Date(f.fim); fim.setHours(0,0,0,0);
      return data >= ini && data <= fim;
    });

    let classes = 'ferias-cal-day';
    if (fimSemana) classes += ' fim-semana';
    if (eHoje) classes += ' hoje';
    if (emFerias.length > 0) classes += ' ferias-dia';

    let nomes = '';
    if (emFerias.length > 0) {
      nomes = emFerias.map(f => {
        const c = colaboradores.find(x => x.id === f.colabId);
        return c ? c.nome.split(' ')[0] : '?';
      }).join(', ');
      classes += ' multi';
    }

    html += `<div class="${classes}">${d}${nomes ? `<span class="ferias-nomes">${nomes}</span>` : ''}</div>`;
  }

  // dias do próximo mês
  const totalCells = startDow + ultimoDia.getDate();
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `<div class="ferias-cal-day outro-mes">${i}</div>`;
  }

  html += '</div>';
  grid.innerHTML = html;
}

function renderFerias() {
  // populate filter
  const fc = document.getElementById('filter-ferias-colab');
  if (fc) {
    const cur = fc.value;
    fc.innerHTML = '<option value="">Todos os colaboradores</option>' +
      colaboradores.filter(c => !c.archived).map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    if (cur) fc.value = cur;
  }

  const filterColab = document.getElementById('filter-ferias-colab')?.value || '';
  let list = [...ferias].sort((a, b) => new Date(b.inicio) - new Date(a.inicio));
  if (filterColab) list = list.filter(f => f.colabId === filterColab);

  const tbody = document.getElementById('ferias-tbody');
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--mid);padding:32px">Nenhumas férias marcadas</td></tr>';
    return;
  }
  const cn = id => { const c = colaboradores.find(x => x.id === id); return c ? c.nome : id; };
  tbody.innerHTML = list.map(f => {
    const ini = new Date(f.inicio).toLocaleDateString('pt-PT');
    const fim = new Date(f.fim).toLocaleDateString('pt-PT');
    return `<tr>
      <td><strong>${cn(f.colabId)}</strong></td>
      <td>${ini}</td>
      <td>${fim}</td>
      <td><span class="faltas-badge none">${f.dias}d</span></td>
      <td style="color:var(--mid)">${f.ano}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteFerias(${f.id})">×</button></td>
    </tr>`;
  }).join('');
}

// ════ ALOCAÇÕES DELETE ════
function deleteAlocacao(id){
  if(!confirm('Apagar esta alocação?'))return;
  alocacoes=alocacoes.filter(a=>a.id!==id);
  sb.from('alocacoes').delete().eq('id',id).then(({error})=>dbErr(error,'deleteAlocacao'));
  renderObras();renderDashboard();renderHistorico();renderLog();
  showToast('Alocação apagada.','success');
}

// ════ VALIDAÇÃO MENSAL ════
let validacoes = {};
// estrutura: { "Março_2026": { "IA": { faltas:true, sabados:false, ... }, ... } }
let currentMonthVal = new Date().getMonth();

function saveValidacoes(){ sb.from('settings').upsert({key:'validacoes',value:validacoes}).then(({error})=>dbErr(error,'saveValidacoes')); }

function chaveVal(mes, ano){ return `${MESES[mes]}_${ano}`; }

function getValColab(mes, ano, colabId){
  const k = chaveVal(mes, ano);
  if(!validacoes[k]) validacoes[k] = {};
  if(!validacoes[k][colabId]) validacoes[k][colabId] = {faltas:false, sabados:false, adiantamentos:false, extras:false, diasTrab:false, fechado:false};
  return validacoes[k][colabId];
}

function toggleCheck(mes, ano, colabId, campo){
  const v = getValColab(mes, ano, colabId);
  v[campo] = !v[campo];
  // auto-fecha se todos checados
  const checks = ['faltas','sabados','adiantamentos','extras','diasTrab'];
  v.fechado = checks.every(c => v[c]);
  saveValidacoes();
  renderValidacao();
}

function toggleFechado(mes, ano, colabId){
  const v = getValColab(mes, ano, colabId);
  v.fechado = !v.fechado;
  if(v.fechado){
    // marca todos os checks ao fechar manualmente
    ['faltas','sabados','adiantamentos','extras','diasTrab'].forEach(c => v[c] = true);
  }
  saveValidacoes();
  renderValidacao();
}

function resetarValidacao(){
  const ano = new Date().getFullYear();
  const k = chaveVal(currentMonthVal, ano);
  if(!confirm(`Reiniciar toda a validação de ${MESES[currentMonthVal]}?`)) return;
  delete validacoes[k];
  saveValidacoes();
  renderValidacao();
  showToast('Validação reiniciada.', 'success');
}

function renderValidacao(){
  const mes = currentMonthVal;
  const ano = new Date().getFullYear();
  const ms = MESES[mes];
  const lista = document.getElementById('val-lista');
  if(!lista) return;

  const cols = colaboradores.filter(c => !c.archived);
  let nFechados=0, nAbertos=0, nSemReg=0;

  // pré-contar sem-registo para o resumo
  cols.forEach(c => {
    const v = getValColab(mes, new Date().getFullYear(), c.id);
    const temQ = registos.some(r => r.colaborador===c.id && r.mes===ms && ['falta','sabado','adiantamento','horasExtras','diasTrabalhados'].includes(r.tipo));
    if(v.fechado) nFechados++;
    else if(!temQ) nSemReg++;
    else nAbertos++;
  });

  // mostrar apenas quem tem registos ou está fechado
  const colsVisiveis = cols.filter(c => {
    const v = getValColab(mes, new Date().getFullYear(), c.id);
    const temQ = registos.some(r => r.colaborador===c.id && r.mes===ms && ['falta','sabado','adiantamento','horasExtras','diasTrabalhados'].includes(r.tipo));
    return temQ || v.fechado;
  });

  if(!colsVisiveis.length){
    lista.innerHTML='<div class="empty-state" style="padding:40px"><p>Nenhum registo para validar este mês.</p></div>';
    document.getElementById('val-pct').textContent = '—';
    document.getElementById('val-progress-fill').style.width = '0%';
    document.getElementById('val-n-fechados').textContent = nFechados;
    document.getElementById('val-n-abertos').textContent = nAbertos;
    document.getElementById('val-n-semreg').textContent = nSemReg;
    document.getElementById('val-resumo').textContent = 'Sem ocorrências este mês';
    return;
  }

  lista.innerHTML = colsVisiveis.map(c => {
    const d = calcCol(c, mes+1);
    const v = getValColab(mes, ano, c.id);

    // ver se tem algum registo no mês
    const temFaltas = registos.some(r => r.tipo==='falta' && r.colaborador===c.id && r.mes===ms);
    const temSabados = registos.some(r => r.tipo==='sabado' && r.colaborador===c.id && r.mes===ms);
    const temAdiant = registos.some(r => r.tipo==='adiantamento' && r.colaborador===c.id && r.mes===ms);
    const temExtras = registos.some(r => r.tipo==='horasExtras' && r.colaborador===c.id && r.mes===ms);
    const temDias = registos.some(r => r.tipo==='diasTrabalhados' && r.colaborador===c.id && r.mes===ms);
    const temQualquer = temFaltas||temSabados||temAdiant||temExtras||temDias;

    // contar checks relevantes
    const checksRelevantes = [
      {key:'faltas', label:'Faltas/Atrasos', tem:temFaltas, icon:'🗓'},
      {key:'sabados', label:'Sábados', tem:temSabados, icon:'📅'},
      {key:'adiantamentos', label:'Adiantamentos', tem:temAdiant, icon:'💶'},
      {key:'extras', label:'Horas Extras', tem:temExtras, icon:'⏱️'},
      {key:'diasTrab', label:'Dias Trabalhados', tem:temDias, icon:'📋'},
    ];

    const totalChecks = checksRelevantes.length;
    const doneChecks = checksRelevantes.filter(ch => v[ch.key]).length;



    const statusLabel = v.fechado ? 'fechado' : !temQualquer ? 'semregisto' : 'aberto';
    const statusText = v.fechado ? '✓ Fechado' : !temQualquer ? 'Sem registos' : 'Em aberto';

    const ini = c.nome.split(' ').slice(0,2).map(w=>w[0]).join('');
    const avatarBg = v.fechado ? 'background:var(--green)' : !temQualquer ? 'background:#ccc' : 'background:var(--pink)';

    // resumo dos registos
    let resumoItems = [];
    if(temFaltas){const f=registos.filter(r=>r.tipo==='falta'&&r.colaborador===c.id&&r.mes===ms);resumoItems.push(`<span>🗓 ${f.length} falta(s)</span>`);}
    if(temSabados){const s=registos.filter(r=>r.tipo==='sabado'&&r.colaborador===c.id&&r.mes===ms);const tot=s.reduce((a,r)=>a+parseFloat(r.totalValor||0),0);resumoItems.push(`<span>📅 ${fmt(tot)}</span>`);}
    if(temAdiant){const a=registos.filter(r=>r.tipo==='adiantamento'&&r.colaborador===c.id&&r.mes===ms);const tot=a.reduce((x,r)=>x+parseFloat(r.valor||0),0);resumoItems.push(`<span>💶 ${fmt(tot)}</span>`);}
    if(temExtras){const e=registos.filter(r=>r.tipo==='horasExtras'&&r.colaborador===c.id&&r.mes===ms);const tot=e.reduce((x,r)=>x+parseFloat(r.total||0),0);resumoItems.push(`<span>⏱️ ${fmt(tot)}</span>`);}
    if(temDias){const dd=registos.filter(r=>r.tipo==='diasTrabalhados'&&r.colaborador===c.id&&r.mes===ms);const tot=dd.reduce((x,r)=>x+parseFloat(r.total||0),0);resumoItems.push(`<span>📋 ${fmt(tot)}</span>`);}

    const checksHtml = checksRelevantes.map(ch =>
      `<label class="val-check${v[ch.key]?' checked':''}" onclick="toggleCheck(${mes},${ano},'${c.id}','${ch.key}')">
        <input type="checkbox" ${v[ch.key]?'checked':''} onclick="event.stopPropagation()">
        ${ch.icon} ${ch.label}${ch.tem?'':' <span style="color:#ccc;font-size:11px">(sem reg.)</span>'}
      </label>`
    ).join('');

    return `<div class="val-card">
      <div class="val-card-header" onclick="toggleValCard('${c.id}')">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:36px;height:36px;border-radius:50%;${avatarBg};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0">${ini}</div>
          <div>
            <div class="val-card-name">${c.nome}</div>
            <div style="font-size:12px;color:var(--mid)">Líquido: <strong>${fmt(Math.max(0,d.liquido))}</strong>${temQualquer?' · '+resumoItems.join(''):' · Sem ocorrências este mês'}</div>
          </div>
        </div>
        <div class="val-card-status">
          <div style="font-size:12px;color:var(--mid)">${doneChecks}/${totalChecks}</div>
          <span class="val-status-badge ${statusLabel}">${statusText}</span>
          <button class="btn btn-sm ${v.fechado?'btn-danger':'btn-primary'}" onclick="event.stopPropagation();toggleFechado(${mes},${ano},'${c.id}')" style="padding:5px 12px">
            ${v.fechado?'Reabrir':'Fechar'}
          </button>
        </div>
      </div>
      <div class="val-card-body" id="val-body-${c.id}">
        ${temQualquer?`<div class="val-registos">${resumoItems.join('')}</div>`:'<div style="color:var(--mid);font-size:13px;margin-bottom:12px">Sem ocorrências registadas este mês.</div>'}
        <div class="val-checks">${checksHtml}</div>
      </div>
    </div>`;
  }).join('');

  // update progress (total = quem tem registos + fechados)
  const totalRelevante = nFechados + nAbertos;
  const pct = totalRelevante ? Math.round((nFechados/totalRelevante)*100) : 0;
  document.getElementById('val-pct').textContent = pct + '%';
  document.getElementById('val-progress-fill').style.width = pct + '%';
  document.getElementById('val-n-fechados').textContent = nFechados;
  document.getElementById('val-n-abertos').textContent = nAbertos;
  document.getElementById('val-n-semreg').textContent = nSemReg;
  document.getElementById('val-resumo').textContent = totalRelevante && nFechados === totalRelevante ? '✅ Todos fechados — pode processar!' : `${nFechados} de ${totalRelevante} fechados`;
}

function toggleValCard(colabId){
  const body = document.getElementById('val-body-'+colabId);
  if(body) body.classList.toggle('open');
}

// ════ EXPORT / IMPORT ════
function exportarDados(){
  const dados={
    colaboradores,registos,obras,faturas,alocacoes,ferias,
    exportadoEm:new Date().toISOString(),versao:'1.0'
  };
  const blob=new Blob([JSON.stringify(dados,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const hoje=new Date().toISOString().split('T')[0];
  a.href=url;a.download=`HomeConcept_dados_${hoje}.json`;a.click();
  URL.revokeObjectURL(url);
  showToast('Dados exportados!','success');
}

function importarDados(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      const dados=JSON.parse(e.target.result);
      if(!dados.colaboradores||!dados.registos){showToast('Ficheiro inválido.','error');return;}
      if(!confirm('Isto vai substituir todos os dados atuais. Tens a certeza?'))return;
      colaboradores=dados.colaboradores;
      registos=dados.registos;
      obras=dados.obras||[];
      faturas=dados.faturas||[];
      alocacoes=dados.alocacoes||[];
      ferias=dados.ferias||[];
      showToast('A importar para Supabase…','success');
      await Promise.all([saveCols(),saveObras(),saveFaturas(),saveAloc(),saveFerias()]);
      // registos: apaga todos e reinserere
      await sb.from('registos').delete().gte('id',0);
      if(registos.length) await sb.from('registos').insert(registos);
      populateAllSelects();renderDashboard();renderLog();
      showToast('Dados importados com sucesso!','success');
    }catch(err){showToast('Erro ao importar: '+err.message,'error');}
  };
  reader.readAsText(file);
  input.value='';
}

function fmt(v){if(v===undefined||v===null||isNaN(v))return'—';return v.toLocaleString('pt-PT',{style:'currency',currency:'EUR',minimumFractionDigits:2});}
function fd(d){if(!d)return'';try{return new Date(d).toLocaleDateString('pt-PT');}catch{return d;}}
function showToast(msg,type='success'){const t=document.getElementById('toast');t.textContent=(type==='success'?'✓ ':'✕ ')+msg;t.className=`toast ${type} show`;setTimeout(()=>t.className='toast',3200);}