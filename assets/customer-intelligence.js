(()=> {
  const root=document.getElementById('visitmate-no-location');
  if(!root)return;
  const names={catl:'宁德时代',byd:'比亚迪',nio:'蔚来汽车',sunwoda:'欣旺达',eve:'亿纬锂能',gotion:'国轩高科',calb:'中创新航',xpeng:'小鹏',li:'理想',xiaomi:'小米'};
  const source={catl25:{url:'https://www.catl.com/en/uploads/1/file/public/202603/20260310105310_46xjbwckvn.pdf',title:'宁德时代 2025 年年度报告'},catl26:{url:'https://disc.static.szse.cn/disc/disk03/finalpage/2026-07-25/8e6750da-b178-4be9-a74a-4b1d8fc42c58.PDF',title:'宁德时代 2026 年半年度报告'},byd25:{url:'https://prod.byd.com/cn/detail618',title:'比亚迪 2025 年全年财报'},byd25sales:{url:'https://www.byd.com/cn/detail614',title:'比亚迪 2025 年销量公告'},byd24:{url:'https://www.hkexnews.hk/listedco/listconews/sehk/2025/0324/2025032401228.pdf',title:'比亚迪 2024 年年度报告'}};
  const base=[];
  const add=(customer,category,period,scope,metric,value,extra={})=>base.push({id:'seed-'+customer+'-'+period.replace(/[^0-9A-Za-z]/g,'')+'-'+metric,customer,category,period,scope,metric,value,...extra,sourceURL:extra.sourceURL||'',sourceTitle:extra.sourceTitle||'',note:extra.note||''});
  const f=(customer,period,metric,value,extra={})=>add(customer,'financial',period,'集团合并',metric,value,extra);
  for(const [p,vals,s] of [
    ['2024年度',{营业收入:'3,620.13 亿元',毛利:'884.94 亿元',归母净利润:'507.45 亿元',毛利率:'24.44%',净利率:'14.02%',研发费用:'186.07 亿元',研发费用占比:'5.14%'},source.catl25],
    ['2025年度',{营业收入:'4,237.02 亿元',毛利:'1,113.19 亿元',归母净利润:'722.01 亿元',毛利率:'26.27%',净利率:'17.04%',研发费用:'221.47 亿元',研发费用占比:'5.23%'},source.catl25],
    ['2026年上半年',{营业收入:'2,769.17 亿元',归母净利润:'432.84 亿元',研发费用:'113.77 亿元',研发费用占比:'4.11%',动力电池系统毛利率:'20.63%',储能电池系统毛利率:'23.96%'},source.catl26]
  ])Object.entries(vals).forEach(([m,v])=>f('catl',p,m,v,{sourceURL:s.url,sourceTitle:s.title,note:p==='2026年上半年'?'半年度合并口径；按半年收入计算研发占比。细分产品毛利率见备注。':'年度合并口径；金额按人民币亿元显示。'}));
  add('catl','market','2025年度','电池业务','锂电池销量','661 GWh',{yoy:'+39%',rank:'全球动力电池市占率 39.2%，全球第 1',sourceURL:source.catl25.url,sourceTitle:source.catl25.title});
  add('catl','market','2026年1–5月','电池业务','动力电池使用量市占率','40.2%',{yoy:'+2.2 个百分点',rank:'全球第 1',sourceURL:source.catl26.url,sourceTitle:source.catl26.title});
  add('catl','capacity','2025年末','全球','年产能（已建 / 可用）','772 GWh',{stage:'已建产能',sourceURL:source.catl25.url,sourceTitle:source.catl25.title,note:'公司披露口径；并非实际产量。'});
  add('catl','capacity','2025年末','全球','在建产能','321 GWh',{stage:'在建',sop:'各项目投产时间请查看年报项目清单',sourceURL:source.catl25.url,sourceTitle:source.catl25.title,note:'年报披露的期末在建产能合计。'});
  add('byd','market','2025年度','比亚迪整车','新能源汽车销量','4,602,436 辆',{yoy:'+7.73%',rank:'全球新能源车销量第 1',sourceURL:source.byd25sales.url,sourceTitle:source.byd25sales.title,note:'新能源车含纯电与插电混动；“销量”口径。'});
  add('byd','market','2025年度','比亚迪整车','海外销量','超过 100 万辆',{rank:'占总销量约 23%',sourceURL:source.byd25sales.url,sourceTitle:source.byd25sales.title,note:'公司公告称海外销量首次突破 100 万辆。'});
  for(const [p,vals,s] of [
    ['2024年度',{营业收入:'7,771.02亿元',营业利润:'504.86亿元',毛利:'1,510.56亿元',归母净利润:'402.54亿元',毛利率:'19.44%',净利率:'5.18%',研发费用:'541.61亿元',研发费用占比:'6.97%'},source.byd24],
    ['2025年度',{营业收入:'8,039.65亿元',营业利润:'401.85亿元',毛利:'1,426.60亿元',归母净利润:'326.19亿元',毛利率:'17.74%',净利率:'4.06%',研发费用:'634.41亿元',研发费用占比:'7.89%'},source.byd25]
  ])Object.entries(vals).forEach(([m,v])=>f('byd',p,m,v,{sourceURL:s.url,sourceTitle:s.title,note:m==='营业利润'||m==='毛利'||m==='毛利率'?'比亚迪集团合并口径，单位人民币亿元；毛利率按营业收入减营业成本计算。':'比亚迪集团合并口径；研发费用占比按研发投入÷营业收入。不同业务板块利润率不同。'}));
  const read=(key,fallback)=>{try{const x=JSON.parse(localStorage.getItem(key)||'null');return x??fallback;}catch{return fallback;}};
  let userData=read('visitmate.company-intelligence.v1',[]);
  let opps=read('visitmate.cooperation-opportunities.v1',[]);
  let category='market',year='2025',segment='全部';
  const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const safeHref=value=>{try{const u=new URL(value,location.href);return u.protocol==='https:'||u.protocol==='http:'?u.href:'';}catch{return'';}};
  const allData=client=>{const merged=new Map(base.filter(x=>x.customer===client).map(x=>[x.id,x]));userData.filter(x=>x.customer===client).forEach(x=>merged.set(x.id,x));return [...merged.values()];};
  const tell=s=>{const el=root.querySelector('#vm-status');if(el)el.textContent=s;};
  const set=(key,value,message)=>{try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{tell('本机保存空间不可用；请先复制内容备份。');return false;}};
  const marketMetrics=id=>id==='byd'
    ? {'比亚迪电池':['电池产量','电池销量 / 出货量','动力电池装机量'],'比亚迪整车':['车辆产量','新能源车销量 / 交付量','纯电销量','插混销量','出口量']}
    : ['nio','xpeng','li','xiaomi'].includes(id)
      ? {'整车业务':['汽车产量','汽车销量 / 交付量','出口量']}
      : {'电池业务':['电池产量','电池销量 / 出货量','动力电池装机量']};
  const financialMetrics=['营业收入','营业利润','毛利','归母净利润','净利率','毛利率','研发费用','研发费用占比'];
  function initDialogs(){
    if(root.querySelector('#vi-data-editor'))return;
    root.insertAdjacentHTML('beforeend',`<dialog class="vi-dialog" id="vi-data-editor"><h2 id="vi-data-title">添加客户资料</h2><form id="vi-data-form" method="dialog" class="vi-form">
      <input type="hidden" name="id"><div><label>资料类别</label><select name="category"><option value="market">经营与排名</option><option value="capacity">产能布局</option><option value="financial">财务数据</option></select></div>
      <div><label>统计期</label><input name="period" placeholder="例如：2025年度 / 2026年9月" required></div>
      <div><label>业务口径</label><input name="scope" placeholder="例如：比亚迪电池 / 整车业务"></div>
      <div><label>指标名称</label><input name="metric" list="vi-metric-options" placeholder="例如：销量" required></div><datalist id="vi-metric-options"></datalist>
      <div><label>数值与单位</label><input name="value" placeholder="例如：4,602,436 辆"></div>
      <div><label>同比</label><input name="yoy" placeholder="例如：+8.2%"></div>
      <div><label>环比</label><input name="mom" placeholder="例如：+3.1%"></div>
      <div><label>排名 / 市占率</label><input name="rank" placeholder="注明全球或中国口径"></div>
      <div><label>产能状态</label><select name="stage"><option value="">请选择（仅产能）</option><option>现有 / 已投产</option><option>在建</option><option>规划</option></select></div>
      <div><label>预计投产时间 SOP</label><input name="sop" placeholder="例如：2027年Q2"></div>
      <div class="vi-wide"><label>项目 / 地区</label><input name="project" placeholder="工厂项目名称，或全球 / 中国地区"></div>
      <div class="vi-wide"><label>信息来源链接</label><input name="sourceURL" type="url" placeholder="https://"></div><div class="vi-wide"><label>来源名称 / 说明</label><input name="sourceTitle" placeholder="年报、公告或客户拜访信息"></div>
      <div class="vi-wide"><label>备注</label><textarea name="note" placeholder="统计口径、核实情况或补充说明"></textarea></div>
      <div class="vi-wide vi-dialog-actions"><button type="button" data-close>取消</button><button type="submit">保存资料</button></div>
    </form></dialog>
    <dialog class="vi-dialog" id="vi-op-editor"><h2 id="vi-op-title">新增合作机会</h2><form id="vi-op-form" method="dialog" class="vi-form">
      <input type="hidden" name="id"><div class="vi-wide"><label>机会名称 *</label><input name="title" maxlength="120" required placeholder="例如：电池包灌封材料验证"></div>
      <div><label>业务方向</label><select name="product"><option value="cell">灌封胶 Cell</option><option value="cover">Battery Cover 电池上盖</option></select></div>
      <div><label>进展</label><select name="stage"><option>待确认</option><option>需求沟通</option><option>样品验证</option><option>商务评估</option><option>暂缓</option></select></div>
      <div class="vi-wide"><label>客户需求 / 项目背景</label><textarea name="need" maxlength="3000" placeholder="只记录客户确认或团队核实的信息"></textarea></div>
      <div class="vi-wide"><label>下一步 Action</label><textarea name="action" maxlength="1500" placeholder="写明动作和负责人"></textarea></div>
      <div><label>负责人</label><input name="owner" maxlength="80"></div><div><label>下次跟进日期</label><input name="followDate" type="date"></div>
      <div class="vi-wide"><label>Follow-up 备注</label><textarea name="follow" maxlength="1500"></textarea></div>
      <div class="vi-wide vi-dialog-actions"><button type="button" data-close>取消</button><button type="submit">保存机会</button></div>
    </form></dialog>`);
  }
  function renderCompany(client){
    initDialogs();
    const box=root.querySelector('#vi-intelligence');if(!box)return;
    const data=allData(client);
    const categories=[['market','产销与排名'],['capacity','产能布局'],['financial','财务数据']];
    const years=['全部','2026','2025','2024','2023'];
    const active=data.filter(r=>r.category===category&&(year==='全部'||String(r.period).startsWith(year))&&(category!=='market'||segment==='全部'||r.scope===segment));
    const title=category==='market'?'产销与行业排名':category==='capacity'?'全球与中国 · 现有 / 在建 / SOP':'营业利润 · 毛利 · 净利率 · 研发';
    let inner=`<div class="vi-intel"><p class="vi-intel-intro">按客户、业务口径和年份查看。同比、环比及排名按记录来源填写；空白项表示尚未录入。</p>
      <div class="vi-intel-tabs" role="tablist" aria-label="企业数据类别">${categories.map(([v,l])=>`<button type="button" data-intel-category="${v}" aria-pressed="${category===v}">${l}</button>`).join('')}</div>
      <div class="vi-year-tabs" aria-label="统计年份">${years.map(v=>`<button type="button" data-intel-year="${v}" aria-pressed="${year===v}">${v==='全部'?'全部年份':v+'年'}</button>`).join('')}</div>`;
    if(category==='market'){
      const scopes=Object.keys(marketMetrics(client));
      const shown=segment==='全部'?scopes:[segment];
      inner+=`<div class="vi-intel-top"><div><h2>${title}</h2><p>每条资料均可补充同比、环比和全球 / 中国排名。</p></div><button class="vi-intel-add" type="button" data-new-data>+ 添加数据</button></div>`;
      inner+=`<div class="vi-scope-tabs"><button type="button" data-intel-segment="全部" aria-pressed="${segment==='全部'}">全部业务</button>${scopes.map(v=>`<button type="button" data-intel-segment="${esc(v)}" aria-pressed="${segment===v}">${esc(v)}</button>`).join('')}</div>`;
      for(const scope of shown){
        const seededMetrics=marketMetrics(client)[scope]||[];
        const records=active.filter(x=>x.scope===scope);
        const present=new Set(records.map(x=>x.metric));
        const rows=records.map(x=>`<div class="vi-intel-data"><div><strong>${esc(x.metric)} · ${esc(x.value||'待补充')}</strong><small>${esc(x.period)} · 同比 ${esc(x.yoy||'待补')} · 环比 ${esc(x.mom||'待补')} · 排名 ${esc(x.rank||'待补')}</small>${x.note?`<small>${esc(x.note)}</small>`:''}${safeHref(x.sourceURL)?`<small><a class="vi-source-link" href="${esc(safeHref(x.sourceURL))}" target="_blank" rel="noopener noreferrer">${esc(x.sourceTitle||'查看来源')} ↗</a></small>`:''}</div><div class="vi-item-actions"><button type="button" data-edit-data="${esc(x.id)}">修改</button></div></div>`).join('');
        const blanks=seededMetrics.filter(m=>!present.has(m)).map(m=>`<div class="vi-intel-data"><div><strong>${esc(m)}</strong><small>${year==='全部'?'2024–2026':''} 资料尚未录入</small></div><div class="vi-item-actions"><button type="button" data-add-metric="${esc(m)}" data-add-scope="${esc(scope)}">补充</button></div></div>`).join('');
        inner+=`<section class="vi-intel-card"><h3>${esc(scope)}</h3>${rows||''}${blanks||''}<p class="vi-intel-note">产量、销量、交付量、装机量和出货量采用各自统计口径，请勿混用；排名需注明榜单与地区。</p></section>`;
      }
    }else if(category==='capacity'){
      inner+=`<div class="vi-intel-top"><div><h2>${title}</h2><p>每个项目可独立记录地区、现有或在建产能与 SOP。</p></div><button class="vi-intel-add" type="button" data-new-capacity>添加项目</button></div>`;
      const rows=active.map(x=>`<article class="vi-intel-card"><div class="vi-intel-top"><div><h2>${esc(x.project||x.metric||'产能项目')}</h2><p>${esc(x.region||x.scope||'地区待补充')} · ${esc(x.period||'统计期待补充')}</p></div><span class="vm-pill">${esc(x.stage||'状态待补充')}</span></div><strong>${esc(x.value||'产能待补充')}</strong><p>${x.sop?'SOP：'+esc(x.sop):'SOP：待核实'}</p>${x.note?`<p class="vi-intel-note">${esc(x.note)}</p>`:''}${safeHref(x.sourceURL)?`<a class="vi-source-link" href="${esc(safeHref(x.sourceURL))}" target="_blank" rel="noopener noreferrer">${esc(x.sourceTitle||'查看来源')} ↗</a>`:''}<div class="vi-item-actions"><button type="button" data-edit-data="${esc(x.id)}">修改</button><button type="button" data-delete-data="${esc(x.id)}">删除</button></div></article>`).join('');
      inner+=rows||`<article class="vi-intel-card"><p class="vi-intel-empty">还没有产能记录。点击“添加项目”录入全球或中国的现有产能、在建项目和投产时间。</p></article>`;
    }else{
      const metrics=financialMetrics;
      inner+=`<div class="vi-intel-top"><div><h2>${title}</h2><p>金额建议统一用人民币亿元；财务主体默认按集团合并口径。</p></div><button class="vi-intel-add" type="button" data-new-financial>添加数据</button></div>`;
      const present=new Set(active.map(x=>x.metric));
      const rows=active.map(x=>`<div class="vi-intel-data"><div><strong>${esc(x.metric)} · ${esc(x.value||'待补充')}</strong><small>${esc(x.period)} · ${esc(x.scope||'集团合并')} · 同比 ${esc(x.yoy||'待补')}</small>${x.note?`<small>${esc(x.note)}</small>`:''}${safeHref(x.sourceURL)?`<small><a class="vi-source-link" href="${esc(safeHref(x.sourceURL))}" target="_blank" rel="noopener noreferrer">${esc(x.sourceTitle||'查看来源')} ↗</a></small>`:''}</div><div class="vi-item-actions"><button type="button" data-edit-data="${esc(x.id)}">修改</button></div></div>`).join('');
      const blanks=metrics.filter(m=>!present.has(m)).map(m=>`<div class="vi-intel-data"><div><strong>${m}</strong><small>${year==='全部'?'近三年':year+'年'} 尚未录入</small></div><div class="vi-item-actions"><button type="button" data-add-metric="${m}" data-add-scope="集团合并">补充</button></div></div>`).join('');
      inner+=`<section class="vi-intel-card"><h3>${year==='全部'?'已录入的财务数据':year+'年财务数据'}</h3>${rows}${blanks}<p class="vi-intel-note">净利率、毛利率请填比例；营业利润与毛利分开记录。半年 / 季度数据请在统计期里注明。</p></section>`;
    }
    inner+=`<button class="vi-intel-add" type="button" data-new-data>+ 添加资料</button><p class="vi-intel-note">本机浏览器保存，清除浏览器数据后会丢失；尚未同步到其他设备。公开资料请核对原文和统计口径。</p></div>`;
    box.innerHTML=inner;
    box.querySelectorAll('[data-intel-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.intelCategory;renderCompany(client);}));
    box.querySelectorAll('[data-intel-year]').forEach(b=>b.addEventListener('click',()=>{year=b.dataset.intelYear;renderCompany(client);}));
    box.querySelectorAll('[data-intel-segment]').forEach(b=>b.addEventListener('click',()=>{segment=b.dataset.intelSegment;renderCompany(client);}));
    box.querySelectorAll('[data-new-data],[data-new-capacity],[data-new-financial]').forEach(b=>b.addEventListener('click',()=>openDataEditor(client,{category:b.hasAttribute('data-new-capacity')?'capacity':b.hasAttribute('data-new-financial')?'financial':category})));
    box.querySelectorAll('[data-add-metric]').forEach(b=>b.addEventListener('click',()=>openDataEditor(client,{category,metric:b.dataset.addMetric,scope:b.dataset.addScope,period:year==='全部'?'2026年':year})));
    box.querySelectorAll('[data-edit-data]').forEach(b=>b.addEventListener('click',()=>openDataEditor(client,allData(client).find(x=>x.id===b.dataset.editData))));
    box.querySelectorAll('[data-delete-data]').forEach(b=>b.addEventListener('click',()=>{userData=userData.filter(x=>x.id!==b.dataset.deleteData);if(set('visitmate.company-intelligence.v1',userData,'资料已删除'))renderCompany(client);}));
  }
  function openDataEditor(client,item={}){
    const dialog=root.querySelector('#vi-data-editor'),form=root.querySelector('#vi-data-form');
    form.reset();form.elements.id.value=item.id||'';form.elements.category.value=item.category||category;form.elements.period.value=item.period||year+'年度';form.elements.scope.value=item.scope||'';form.elements.metric.value=item.metric||'';form.elements.value.value=item.value||'';form.elements.yoy.value=item.yoy||'';form.elements.mom.value=item.mom||'';form.elements.rank.value=item.rank||'';form.elements.stage.value=item.stage||'';form.elements.sop.value=item.sop||'';form.elements.lat.value=item.lat||'';form.elements.lon.value=item.lon||'';form.elements.project.value=item.project||'';form.elements.sourceURL.value=item.sourceURL||'';form.elements.sourceTitle.value=item.sourceTitle||'';form.elements.note.value=item.note||'';
    root.querySelector('#vi-data-title').textContent=item.id?'修改客户资料':'添加客户资料';
    form.querySelector('[name=category]').addEventListener('change',()=>{const opts=form.elements.category.value==='financial'?financialMetrics:form.elements.category.value==='market'?Object.values(marketMetrics(client)).flat():['现有产能','在建产能','产量规划'];root.querySelector('#vi-metric-options').innerHTML=[...new Set(opts)].map(x=>`<option value="${x}">`).join('');},{once:true});
    dialog.showModal();
  }
  function bindDataForm(){
    const form=root.querySelector('#vi-data-form');if(!form)return;
    root.querySelectorAll('#vi-data-editor [data-close]').forEach(b=>b.addEventListener('click',()=>root.querySelector('#vi-data-editor').close()));
    form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form),item=Object.fromEntries(fd.entries());item.customer=window.VisitMateIntelligence.currentClient||'catl';item.id=item.id||'data-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);item.updatedAt=new Date().toISOString();const index=userData.findIndex(x=>x.id===item.id);if(index>=0)userData[index]=item;else userData.push(item);if(set('visitmate.company-intelligence.v1',userData,'客户资料已保存到此浏览器')){root.querySelector('#vi-data-editor').close();renderCompany(item.customer);tell('客户资料已保存到此浏览器');}});
  }
  function renderOpportunities(client,current){
    initDialogs();
    const box=root.querySelector('#vi-opportunity-manager');if(!box)return;
    const list=opps.filter(x=>x.customer===client);
    box.innerHTML=`<div class="vi-intel-top"><div><h2>合作机会记录</h2><p>记录已确认的客户需求、Action 和 Follow-up。</p></div><button type="button" class="vi-intel-add" data-new-opportunity>+ 新增</button></div>${list.length?'<div class="vi-op-list">'+list.map(x=>`<article class="vi-op-card"><div class="vi-op-card-head"><div><h3>${esc(x.title)}</h3><small>${esc(({cell:'灌封胶 Cell',cover:'Battery Cover · 电池上盖',...(window.VisitMateBusinessDirections||{})})[x.product]||x.product||'灌封胶 Cell')} · ${esc(x.stage||'待确认')}</small></div><div class="vi-item-actions"><button type="button" data-edit-op="${esc(x.id)}">修改</button><button type="button" data-delete-op="${esc(x.id)}">删除</button></div></div>${x.need?`<p><strong>需求：</strong>${esc(x.need)}</p>`:''}${x.action?`<p><strong>Action：</strong>${esc(x.action)}</p>`:''}<small>${x.owner?'负责人：'+esc(x.owner)+' · ':''}${x.followDate?'下次跟进：'+esc(x.followDate):''}</small>${x.follow?`<p><strong>Follow-up：</strong>${esc(x.follow)}</p>`:''}</article>`).join('')+'</div>':'<article class="vi-intel-card"><p class="vi-intel-empty">还没有手动记录的合作机会。</p></article>'}`;
    box.querySelector('[data-new-opportunity]').addEventListener('click',()=>openOpportunityEditor(client,{product:current}));
    box.querySelectorAll('[data-edit-op]').forEach(b=>b.addEventListener('click',()=>openOpportunityEditor(client,opps.find(x=>x.id===b.dataset.editOp))));
    box.querySelectorAll('[data-delete-op]').forEach(b=>b.addEventListener('click',()=>{opps=opps.filter(x=>x.id!==b.dataset.deleteOp);if(set('visitmate.cooperation-opportunities.v1',opps,'合作机会已删除'))renderOpportunities(client,current);}));
  }
  function openOpportunityEditor(client,item={}){
    const dialog=root.querySelector('#vi-op-editor'),form=root.querySelector('#vi-op-form');form.reset();
    const directions={cell:'灌封胶 Cell',cover:'Battery Cover · 电池上盖',...(window.VisitMateBusinessDirections||{})};const product=form.elements.product;product.replaceChildren();for(const [value,label] of Object.entries(directions)){const option=document.createElement('option');option.value=value;option.textContent=label;product.append(option);}
    for(const k of ['id','title','product','stage','need','action','owner','followDate','follow'])if(form.elements[k])form.elements[k].value=item[k]||'';
    form.elements.id.value=item.id||'';form.elements.product.value=item.product||'cell';form.elements.stage.value=item.stage||'待确认';root.querySelector('#vi-op-title').textContent=item.id?'修改合作机会':'新增合作机会';dialog.dataset.customer=client;dialog.showModal();
  }
  function bindOpportunityForm(){
    const dialog=root.querySelector('#vi-op-editor'),form=root.querySelector('#vi-op-form');if(!form)return;
    dialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));
    form.addEventListener('submit',e=>{e.preventDefault();const item=Object.fromEntries(new FormData(form).entries());item.customer=dialog.dataset.customer;item.id=item.id||'opp-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);item.updatedAt=new Date().toISOString();const index=opps.findIndex(x=>x.id===item.id);if(index>=0)opps[index]=item;else opps.unshift(item);if(set('visitmate.cooperation-opportunities.v1',opps,'合作机会已保存到此浏览器')){dialog.close();renderOpportunities(item.customer,window.VisitMateIntelligence.currentOpportunity||'cell');tell('合作机会已保存在此浏览器');}});
  }
  initDialogs();
  window.VisitMateIntelligence={currentClient:'catl',currentOpportunity:'cell',renderCompany(client){this.currentClient=client;renderCompany(client);},renderOpportunities(client,current){this.currentClient=client;this.currentOpportunity=current;renderOpportunities(client,current);}};
  bindDataForm();bindOpportunityForm();
})();





