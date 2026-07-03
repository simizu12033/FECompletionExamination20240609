const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const jp=s=>String(s||"");
const has=(q,word)=>jp(q.title).includes(word)||jp(q.summary).includes(word)||jp(q.field).includes(word);
const box=(text,cls="")=>`<div class="v-box ${cls}">${esc(text)}</div>`;
const badge=(text,cls="")=>`<span class="mini-badge ${cls}">${esc(text)}</span>`;
const arrow=label=>`<div class="v-arrow"><i>→</i>${label?`<small>${esc(label)}</small>`:""}</div>`;
const flow=(parts,labels=[])=>`<div class="v-flow">${parts.map((x,i)=>`${i?arrow(labels[i-1]||""):""}${box(x,i===parts.length-1?"focus":"")}`).join("")}</div>`;
const cards=items=>`<div class="v-cardset">${items.map((x,i)=>`<section class="${x.focus||i===items.length-1?"focus":""}"><b>${esc(x.title||x[0])}</b><p>${esc(x.text||x[1])}</p></section>`).join("")}</div>`;
const table=(heads,rows)=>`<div class="mini-table"><table><thead><tr>${heads.map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const formula=(title,items,result)=>`<div class="v-formula rich-formula"><strong>${esc(title)}</strong>${items.map(s=>`<em>${esc(s)}</em>`).join("")}<span>${esc(result)}</span></div>`;

function binaryTree(){
  return `<div class="tree-diagram">
    <div class="tree-row root"><span>A</span></div>
    <div class="tree-lines two"></div>
    <div class="tree-row"><span>B</span><span>C</span></div>
    <div class="tree-lines four"></div>
    <div class="tree-row leaves"><b>D</b><b>E</b><b>F</b><b>G</b></div>
    <p><strong>葉が n 個</strong>なら、葉以外の節点は <strong>n - 1</strong></p>
  </div>`;
}
function stackVisual(){
  return `<div class="stack-visual">
    <div class="stack-box"><span>後</span><b>C</b><b>B</b><b>A</b><span>先</span></div>
    <div class="stack-note"><strong>LIFO</strong><p>最後に入れた C から取り出す</p></div>
  </div>`;
}
function regexVisual(){
  return `<div class="regex-visual">
    ${badge("A-Z","+")}
    ${badge("A-Z","repeat")}
    ${badge("0-9","*")}
    <p><code>[A-Z]+[0-9]*</code></p>
    <small>英大文字が1文字以上、数字は0文字以上</small>
  </div>`;
}
function queueVisual(){
  return flow(["到着率 λ","サービス率 μ","利用率 ρ=λ/μ","待ち行列"],["小さいほど余裕","1に近いと混雑","平均待ち時間へ"]);
}
function sqlVisual(){
  return `<div class="sql-visual">
    <div><b>親表の行</b><span>候補</span></div>
    <i>対応する行を探す</i>
    <div class="empty"><b>子表</b><span>存在しない</span></div>
    <strong>NOT EXISTS が真</strong>
  </div>`;
}
function securityVisual(){
  return cards([
    {title:"方針",text:"守る対象と基準を決める"},
    {title:"統制",text:"組織として実施する"},
    {title:"評価",text:"監査・見直しで改善",focus:true},
  ]);
}
function lifecycleVisual(){
  return `<div class="lifecycle-visual">
    <svg viewBox="0 0 300 150" aria-hidden="true"><path d="M20 125 C70 115 75 50 120 45 S190 35 220 75 S250 125 285 128"/><line x1="72" y1="112" x2="72" y2="28"/><line x1="145" y1="112" x2="145" y2="28"/><line x1="218" y1="112" x2="218" y2="28"/></svg>
    <div><span>導入</span><span>成長</span><span>成熟</span><span>衰退</span></div>
  </div>`;
}
function paretoVisual(){
  return `<div class="pareto"><div class="bars"><i style="--h:92%"></i><i style="--h:68%"></i><i style="--h:45%"></i><i style="--h:25%"></i></div><svg viewBox="0 0 300 150"><polyline points="25,32 105,60 185,92 270,112"/></svg><span>件数が多い順</span><b>累積比率</b></div>`;
}
function sCurveVisual(){
  return `<div class="s-curve"><svg viewBox="0 0 320 160"><path d="M20 135 C85 130 82 85 140 78 S210 30 300 25"/><path d="M20 122 C92 122 110 95 150 92 S225 88 300 50"/></svg><span>技術性能は導入・成長・成熟で伸び方が変わる</span></div>`;
}
function networkLayers(){
  return `<div class="v-layers"><div>アプリケーション</div><div class="focus">トランスポート TCP/UDP</div><div>インターネット IP</div><div>ネットワークインタフェース</div></div>`;
}
function dbVisual(q){
  if(has(q,"正規形"))return table(["前","確認"],[["主キー","一意に決まる"],["非キー属性","主キーにだけ従属"],["第3正規形","推移的従属を除く"]]);
  if(has(q,"ロック"))return table(["ロック","読取","更新"],[["共有","可","不可"],["排他","不可","可"]]);
  if(has(q,"NOT EXISTS"))return sqlVisual();
  return table(["観点","見ること"],[["表","行と列の意味"],["キー","一意性"],["条件","存在する/しない"]]);
}
function strategyVisual(q){
  if(has(q,"ライフサイクル"))return lifecycleVisual();
  if(has(q,"Sカーブ"))return sCurveVisual();
  if(has(q,"BSC"))return cards([{title:"財務",text:"収益"},{title:"顧客",text:"満足・価値",focus:true},{title:"業務",text:"内部プロセス"},{title:"学習",text:"成長"}]);
  if(has(q,"M&A"))return flow(["買収・合併","経営資源を取得","シナジーを狙う"],["手段","目的"]);
  return cards([{title:"目的",text:"事業価値を高める"},{title:"手段",text:jp(q.title)},{title:"効果",text:"競争力・効率を改善",focus:true}]);
}
function richVisual(q){
  if(has(q,"完全二分木"))return binaryTree();
  if(has(q,"スタック"))return stackVisual();
  if(has(q,"正規表現"))return regexVisual();
  if(has(q,"M/M/1"))return queueVisual();
  if(has(q,"標準偏差"))return formula("標準偏差の性質",["全データを2倍","平均との差も2倍"],"標準偏差も2倍");
  if(has(q,"2進数")||has(q,"シフト"))return formula("左シフト",["1bitで2倍","2bitで4倍","さらに加算"],"条件を順に計算");
  if(has(q,"画面メモリ"))return formula("必要容量",["横画素×縦画素","1画素のbit数","bit→byte"],"画面メモリ量");
  if(has(q,"CPI")||has(q,"MIPS"))return formula("CPU性能",["平均CPI","クロック周波数","命令数/秒"],"MIPS");
  if(has(q,"パレート"))return paretoVisual();
  if(jp(q.field).includes("データベース"))return dbVisual(q);
  if(jp(q.field).includes("ネットワーク"))return has(q,"TCP/IP")?networkLayers():flow(["通信条件","プロトコル/アドレス","正しい層・単位"],["整理","判定"]);
  if(jp(q.field).includes("セキュリティ"))return securityVisual();
  if(jp(q.field).includes("ストラテジ")||jp(q.field).includes("会計")||jp(q.field).includes("法務"))return strategyVisual(q);
  if(jp(q.field).includes("マネジメント"))return cards([{title:"計画",text:"基準・見積り"},{title:"実績",text:"進捗・品質"},{title:"差分",text:"改善判断",focus:true}]);
  if(jp(q.field).includes("開発"))return cards([{title:"要求",text:"何を作るか"},{title:"設計",text:"構造を決める"},{title:"レビュー",text:"早く誤りを見つける",focus:true}]);
  return flow(Array.isArray(q.diagram)?q.diagram:[q.title,"要点確認",`正答 ${q.answer}`]);
}
function explanationSteps(q){
  if(has(q,"完全二分木"))return [
    "完全二分木では、葉以外の節点がそれぞれ2本の枝で下位の節点につながります。",
    "小さな木で数えると、葉が4個のとき葉以外は3個です。一般化すると、葉がn個なら葉以外はn-1です。",
    `この関係を述べている選択肢 ${q.answer} を選びます。`
  ];
  if(has(q,"スタック"))return [
    "スタックは、最後に入れたデータを最初に取り出すLIFOの構造です。",
    "pushで上に積み、popで上から取り出す、と考えると順序を追いやすくなります。",
    `最後に入ったものから出る順序に合う選択肢 ${q.answer} が正解です。`
  ];
  if(has(q,"正規表現"))return [
    "+ は直前の要素が1回以上、* は0回以上繰り返すことを表します。",
    "[A-Z]+ は英大文字が1文字以上、[0-9]* は数字が0文字以上という意味です。",
    `文字列の条件に合う説明を選ぶので、正解は ${q.answer} です。`
  ];
  if(has(q,"標準偏差"))return [
    "標準偏差は、平均からの散らばりの大きさを表します。",
    "全データを2倍すると、平均との差もすべて2倍になるため標準偏差も2倍になります。",
    `定数を足すだけなら標準偏差は変わらない点と区別して、${q.answer} を選びます。`
  ];
  if(has(q,"M/M/1"))return [
    "M/M/1は、到着もサービスも確率的に発生し、窓口が1つの待ち行列モデルです。",
    "到着率とサービス率から利用率を考え、窓口が混み合うほど待ち時間が増えます。",
    `条件に合う待ち行列の扱いをしている選択肢 ${q.answer} が正解です。`
  ];
  if(has(q,"NOT EXISTS"))return [
    "NOT EXISTSは、条件を満たす行が存在しないときに真になります。",
    "親表の候補行に対して、対応する子表の行があるかを1行ずつ確認するイメージです。",
    `存在しないことを判定している選択肢 ${q.answer} を選びます。`
  ];
  if(has(q,"TCP/IP"))return [
    "TCP/IPでは、IPはネットワーク間の配送、TCP/UDPは端末間の通信制御を担当します。",
    "どの層の役割を問われているかを先に分けると、選択肢を絞りやすくなります。",
    `層と役割の対応が正しい選択肢 ${q.answer} が正解です。`
  ];
  if(has(q,"プロダクトライフサイクル"))return [
    "プロダクトライフサイクルは、導入期・成長期・成熟期・衰退期で市場の状態を見る考え方です。",
    "売上や競争状況がどの段階の説明に当たるかを読み取ります。",
    `段階の特徴と一致する選択肢 ${q.answer} が正解です。`
  ];
  if(has(q,"パレート"))return [
    "パレート図は、件数の多い項目から棒で並べ、累積比率を折れ線で重ねます。",
    "重点的に対策すべき項目を見つけるための図です。",
    `棒の並びと累積線の意味に合う選択肢 ${q.answer} を選びます。`
  ];
  if(jp(q.field).includes("セキュリティ"))return [
    `${q.title} が、予防・検知・対応・管理のどこに関わる用語かを確認します。`,
    "セキュリティ問題では、守る対象、脅威、対策、管理責任を分けて読むと迷いにくくなります。",
    `説明と役割が一致する選択肢 ${q.answer} が正解です。`
  ];
  if(jp(q.field).includes("データベース"))return [
    `${q.title} の対象が、表、行、キー、条件式のどれかを先に押さえます。`,
    "データベース問題は、関係する表同士の対応と、条件が真になる場面を図で追うと整理できます。",
    `問題文の条件に合う選択肢 ${q.answer} を選びます。`
  ];
  if(jp(q.field).includes("マネジメント"))return [
    "計画値、実績値、差分、品質のどれを判断する問題かを分けます。",
    `${q.title} は、進捗や品質を客観的に見るための観点として押さえます。`,
    `判断の目的に合う選択肢 ${q.answer} が正解です。`
  ];
  if(jp(q.field).includes("ストラテジ")||jp(q.field).includes("会計")||jp(q.field).includes("法務"))return [
    "用語の目的、使う場面、得られる効果を分けて読みます。",
    `${q.title} は、事業・組織・市場・法務のどの判断に使うものかを確認します。`,
    `説明の方向性が一致する選択肢 ${q.answer} を選びます。`
  ];
  return [
    q.summary || `${q.title} の定義を確認します。`,
    "問題文の条件、単位、主体を選択肢と照合して、合わないものを外します。",
    `最後に残る選択肢 ${q.answer} が正解です。`
  ];
}
function detailedFrame(q,visual){
  const steps=explanationSteps(q);
  const chips=Array.isArray(q.diagram)?q.diagram.slice(0,4):[q.title,q.field,`正答 ${q.answer}`];
  return `<div class="v-detail">
    <div class="v-detail-main">${visual}</div>
    <aside class="v-detail-side">
      <div class="v-detail-title"><span>見る順</span><strong>${esc(q.title)}</strong></div>
      <ol>${steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <div class="v-detail-cue"><b>復習の軸</b><p>${esc(q.caption||q.summary||q.title)}</p></div>
      <div class="v-detail-trap"><b>注意点</b><p>${esc(q.trap)}</p></div>
      <div class="v-detail-chips">${chips.map(x=>`<i>${esc(x)}</i>`).join("")}</div>
    </aside>
  </div>`;
}
window.renderRichVisual=q=>detailedFrame(q,richVisual(q));
