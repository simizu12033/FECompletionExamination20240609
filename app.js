const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const box=(text,cls="")=>`<div class="v-box ${cls}">${esc(text)}</div>`;
const arrow=(label="")=>`<div class="v-arrow"><i>↓</i>${label?`<small>${esc(label)}</small>`:""}</div>`;
const flow=(parts,labels=[])=>`<div class="v-flow">${parts.map((x,i)=>`${i?arrow(labels[i-1]||""):""}${box(x,i===parts.length-1?"focus":"")}`).join("")}</div>`;
const cards=(items)=>`<div class="v-cardset">${items.map((x,i)=>`<section class="${i===items.length-1?"focus":""}"><b>${esc(x[0])}</b><p>${esc(x[1])}</p></section>`).join("")}</div>`;
const formula=(top,bottom,steps=[])=>`<div class="v-formula rich-formula"><strong>${esc(top)}</strong>${steps.map(s=>`<em>${esc(s)}</em>`).join("")}<span>${esc(bottom)}</span></div>`;
function detailedFrame(q,visual){
  const steps=(q.reasoning||[]).slice(0,3);
  const chips=Array.isArray(q.diagram)?q.diagram.slice(0,4):[];
  return `<div class="v-detail">
    <div class="v-detail-main">${visual}</div>
    <aside class="v-detail-side">
      <div class="v-detail-title"><span>見る順</span><strong>${esc(q.title)}</strong></div>
      <ol>${steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <div class="v-detail-cue"><b>覚える軸</b><p>${esc(q.caption||q.title)}</p></div>
      <div class="v-detail-trap"><b>注意</b><p>${esc(q.trap)}</p></div>
      <div class="v-detail-chips">${chips.map(x=>`<i>${esc(x)}</i>`).join("")}</div>
    </aside>
  </div>`;
}
function richVisual(q){
  if(q.field==="基礎理論"||q.field==="会計")return formula(q.diagram[0],q.diagram[q.diagram.length-1],q.diagram.slice(1,-1));
  if(q.field==="情報セキュリティ"||q.field==="ストラテジ")return cards(q.diagram.map((x,i)=>[i+1,x]));
  return flow(q.diagram);
}
window.renderRichVisual=q=>detailedFrame(q,richVisual(q));
