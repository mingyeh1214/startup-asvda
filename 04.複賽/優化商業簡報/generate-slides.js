const pptxgen = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const html2pptx = require(path.join(
  'C:\\Users\\226178\\.claude\\plugins\\cache\\anthropic-agent-skills\\document-skills\\69c0b1a06741\\skills\\pptx\\scripts',
  'html2pptx.js'
));

const SLIDES_DIR = path.join(__dirname, 'slides');
const ASSETS_DIR = path.join(__dirname, 'assets');

// Brand colors
const C1 = '#1B3A5C'; // Deep navy
const C2 = '#2C5E8A'; // Medium blue
const C3 = '#E8913A'; // Orange accent
const C4 = '#D5E8F0'; // Light blue
const BG = '#FFFFFF';
const TXT = '#333333';
const LTXT = '#FFFFFF';

// PptxGenJS colors (no #)
const PC1 = '1B3A5C';
const PC2 = '2C5E8A';
const PC3 = 'E8913A';
const PC4 = 'D5E8F0';

// Common HTML head
const HEAD = `<!DOCTYPE html><html><head><style>
html{background:#fff}
body{width:720pt;height:405pt;margin:0;padding:0;font-family:Arial,sans-serif;display:flex;flex-direction:column;background:${BG};overflow:hidden}
</style></head><body>`;
const FOOT = `</body></html>`;

// Slide generators
function coverSlide() {
  return `${HEAD.replace('overflow:hidden', 'overflow:hidden')}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;background:${C1};display:flex;flex-direction:column;justify-content:center;padding:0 60pt">
    <p style="font-size:14pt;color:${C3};letter-spacing:3pt;margin:0 0 8pt 0;font-weight:bold">AI-POWERED MATH EDUCATION</p>
    <h1 style="font-size:44pt;color:${LTXT};margin:0 0 12pt 0;font-weight:bold">MATHIFY</h1>
    <p style="font-size:20pt;color:#8BB8D9;margin:0 0 30pt 0">讓每個孩子都有專屬的 AI 數學家教</p>
    <div style="width:60pt;height:3pt;background:${C3}"></div>
    <p style="font-size:12pt;color:#8BB8D9;margin:20pt 0 0 0">創業綻放 — 創業大聯盟競賽 | 複賽簡報</p>
    <p style="font-size:11pt;color:#6A9BBF;margin:6pt 0 0 0">mathify.io</p>
  </div>
</div>
${FOOT}`;
}

function slide02_problem() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">01 | PROBLEM</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 20pt 0">台灣數學教育的三大斷層</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:1;background:${C4};border-radius:8pt;padding:18pt;display:flex;flex-direction:column">
        <p style="font-size:36pt;color:${C3};margin:0;font-weight:bold">42%</p>
        <p style="font-size:13pt;color:${C1};margin:4pt 0 8pt 0;font-weight:bold">理解斷層</p>
        <p style="font-size:11pt;color:${TXT};margin:0;line-height:1.4">113 年會考數學科，有 42% 考生未達基礎等級（C 等級），數學是所有科目中 C 等級比例最高的</p>
      </div>
      <div style="flex:1;background:${C4};border-radius:8pt;padding:18pt;display:flex;flex-direction:column">
        <p style="font-size:36pt;color:${C3};margin:0;font-weight:bold">2.8x</p>
        <p style="font-size:13pt;color:${C1};margin:4pt 0 8pt 0;font-weight:bold">城鄉斷層</p>
        <p style="font-size:11pt;color:${TXT};margin:0;line-height:1.4">偏鄉國中數學 C 等級比例為都市的 2.8 倍，弱勢家庭無力負擔補習費（每月 NT$5,000-15,000）</p>
      </div>
      <div style="flex:1;background:${C4};border-radius:8pt;padding:18pt;display:flex;flex-direction:column">
        <p style="font-size:36pt;color:${C3};margin:0;font-weight:bold">78%</p>
        <p style="font-size:13pt;color:${C1};margin:4pt 0 8pt 0;font-weight:bold">個別化斷層</p>
        <p style="font-size:11pt;color:${TXT};margin:0;line-height:1.4">78% 的國中生認為數學課「聽不懂但不敢問」，傳統一對多教學無法滿足個別化需求</p>
      </div>
    </div>
    <p style="font-size:11pt;color:#888;margin:10pt 0 0 0">資料來源：教育部 113 年國中教育會考統計、國家教育研究院調查</p>
  </div>
</div>
${FOOT}`;
}

function slide03_solution() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:24pt 40pt 14pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 3pt 0;font-weight:bold">02 | SOLUTION</p>
    <h1 style="font-size:26pt;color:${C1};margin:0 0 10pt 0">Mathify — AI 數學家教平台</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:1;display:flex;flex-direction:column;gap:8pt">
        <div style="background:#F8F9FA;border-left:4pt solid ${C2};padding:9pt 12pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">Fine-tuned 數學 LLM</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">專為 K-12 數學微調，解題準確率 &gt; 95%</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid ${C3};padding:9pt 12pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">TikZ + Desmos 視覺化引擎</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">自動生成幾何圖形、函數圖表</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid #27AE60;padding:9pt 12pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">108 課綱完整對齊</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">康軒 / 南一 / 翰林三版本對應</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid #8E44AD;padding:9pt 12pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">蘇格拉底式引導教學</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">不給答案，逐步引導自主思考</p>
        </div>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        <div id="product-demo" class="placeholder" style="width:270pt;height:230pt;background:#E8E8E8;border-radius:8pt"></div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide04_competitive() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">03 | COMPETITIVE EDGE</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 12pt 0">創新性與競爭優勢</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:5;display:flex;flex-direction:column;justify-content:center">
        <div id="matrix" class="placeholder" style="width:310pt;height:260pt;background:#E8E8E8;border-radius:4pt"></div>
      </div>
      <div style="flex:4;display:flex;flex-direction:column;justify-content:center;gap:10pt">
        <div style="background:${C1};border-radius:6pt;padding:14pt">
          <p style="font-size:13pt;color:${C3};margin:0;font-weight:bold">核心護城河</p>
          <p style="font-size:11pt;color:${LTXT};margin:6pt 0 0 0;line-height:1.4">Fine-tuned 數學模型 — 通用 AI 難以複製的垂直領域深度</p>
        </div>
        <div style="background:#F8F9FA;border-radius:6pt;padding:14pt">
          <p style="font-size:13pt;color:${C1};margin:0;font-weight:bold">vs ChatGPT</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">課綱對齊、視覺化教學、蘇格拉底引導 — ChatGPT 都不具備</p>
        </div>
        <div style="background:#F8F9FA;border-radius:6pt;padding:14pt">
          <p style="font-size:13pt;color:${C1};margin:0;font-weight:bold">vs 均一教育</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">AI 原生 vs 影片為主，真正個人化而非固定學習路徑</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide05_industry() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">04 | INDUSTRY</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 16pt 0">行業現況與市場趨勢</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:24pt">
      <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
        <div style="background:${C1};border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:30pt;color:${C3};margin:0;font-weight:bold">$154.7 億</p>
          <p style="font-size:11pt;color:${LTXT};margin:4pt 0 0 0">2032 全球 AI 家教市場（USD）</p>
          <p style="font-size:11pt;color:#8BB8D9;margin:2pt 0 0 0">CAGR 18.9% | Mordor Intelligence</p>
        </div>
        <div style="background:${C4};border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:30pt;color:${C1};margin:0;font-weight:bold">$176.6 億</p>
          <p style="font-size:11pt;color:${TXT};margin:4pt 0 0 0">2033 台灣線上教育市場（TWD）</p>
          <p style="font-size:11pt;color:#666;margin:2pt 0 0 0">CAGR 11.85% | IMARC Group</p>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
        <div style="background:#F8F9FA;border-radius:8pt;padding:14pt">
          <p style="font-size:13pt;color:${C1};margin:0;font-weight:bold">三大驅動力</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid ${C3};padding:10pt 14pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">AI 技術成熟</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">LLM 能力飛躍式成長，教育 AI 從「關鍵字匹配」進入「理解式教學」</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid ${C2};padding:10pt 14pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">政策支持</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">教育部「班班有網路、生生用平板」政策，數位基礎設施到位</p>
        </div>
        <div style="background:#F8F9FA;border-left:4pt solid #27AE60;padding:10pt 14pt;border-radius:0 6pt 6pt 0">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">家長意願</p>
          <p style="font-size:10pt;color:${TXT};margin:3pt 0 0 0">後疫情時代家長對線上學習接受度大幅提升，台灣補教市場年產值超過 NT$1,800 億</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide06_tam() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:24pt 40pt 16pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 3pt 0;font-weight:bold">05 | MARKET SIZE</p>
    <h1 style="font-size:26pt;color:${C1};margin:0 0 12pt 0">市場規模 TAM / SAM / SOM</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:5;display:flex;flex-direction:column;justify-content:center;align-items:center">
        <div style="width:240pt;text-align:center">
          <div style="background:${C1};border-radius:50%;width:220pt;height:220pt;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0 auto">
            <div style="background:${C2};border-radius:50%;width:155pt;height:155pt;display:flex;flex-direction:column;justify-content:center;align-items:center">
              <div style="background:${C3};border-radius:50%;width:85pt;height:85pt;display:flex;flex-direction:column;justify-content:center;align-items:center">
                <p style="font-size:13pt;color:${LTXT};margin:0;font-weight:bold">SOM</p>
                <p style="font-size:10pt;color:${LTXT};margin:2pt 0 0 0">3.9 萬人</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="flex:4;display:flex;flex-direction:column;justify-content:center;gap:10pt">
        <div style="border-left:4pt solid ${C1};padding:8pt 12pt">
          <p style="font-size:13pt;color:${C1};margin:0;font-weight:bold">TAM — 全球 AI 家教市場</p>
          <p style="font-size:22pt;color:${C1};margin:3pt 0 0 0;font-weight:bold">US$154.7 億</p>
          <p style="font-size:9pt;color:#888;margin:2pt 0 0 0">2032 年預估 | CAGR 18.9%</p>
        </div>
        <div style="border-left:4pt solid ${C2};padding:8pt 12pt">
          <p style="font-size:13pt;color:${C2};margin:0;font-weight:bold">SAM — 台灣國中數學市場</p>
          <p style="font-size:22pt;color:${C2};margin:3pt 0 0 0;font-weight:bold">64.8 萬學生</p>
          <p style="font-size:9pt;color:#888;margin:2pt 0 0 0">每年 3 屆 × 216,000 名國中生</p>
        </div>
        <div style="border-left:4pt solid ${C3};padding:8pt 12pt">
          <p style="font-size:13pt;color:${C3};margin:0;font-weight:bold">SOM — 第一年目標</p>
          <p style="font-size:22pt;color:${C3};margin:3pt 0 0 0;font-weight:bold">3.9 萬（6%）</p>
          <p style="font-size:9pt;color:#888;margin:2pt 0 0 0">聚焦大台北 + 六都國中生</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide07_expansion() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">06 | EXPANSION</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 20pt 0">市場拓展與國際化路徑</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:0;align-items:center">
      <div style="flex:1;background:${C1};border-radius:8pt 0 0 8pt;padding:18pt;text-align:center;height:180pt;display:flex;flex-direction:column;justify-content:center">
        <p style="font-size:16pt;color:${C3};margin:0;font-weight:bold">Phase 1</p>
        <p style="font-size:12pt;color:${LTXT};margin:6pt 0 0 0;font-weight:bold">台灣國中數學</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:8pt 0 0 0">Year 1-2</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:4pt 0 0 0">64.8 萬學生</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:4pt 0 0 0">B2C + B2B2C</p>
      </div>
      <div style="width:0;height:0;border-top:12pt solid transparent;border-bottom:12pt solid transparent;border-left:12pt solid ${C1}"></div>
      <div style="flex:1;background:${C2};padding:18pt;text-align:center;height:180pt;display:flex;flex-direction:column;justify-content:center">
        <p style="font-size:16pt;color:${C3};margin:0;font-weight:bold">Phase 2</p>
        <p style="font-size:12pt;color:${LTXT};margin:6pt 0 0 0;font-weight:bold">全台 K-12 數理</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:8pt 0 0 0">Year 2-3</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:4pt 0 0 0">擴展至高中 + 物理化學</p>
        <p style="font-size:10pt;color:#8BB8D9;margin:4pt 0 0 0">學校合作方案</p>
      </div>
      <div style="width:0;height:0;border-top:12pt solid transparent;border-bottom:12pt solid transparent;border-left:12pt solid ${C2}"></div>
      <div style="flex:1;background:${C3};border-radius:0 8pt 8pt 0;padding:18pt;text-align:center;height:180pt;display:flex;flex-direction:column;justify-content:center">
        <p style="font-size:16pt;color:${LTXT};margin:0;font-weight:bold">Phase 3</p>
        <p style="font-size:12pt;color:${LTXT};margin:6pt 0 0 0;font-weight:bold">東南亞市場</p>
        <p style="font-size:10pt;color:#FFF3E0;margin:8pt 0 0 0">Year 3+</p>
        <p style="font-size:10pt;color:#FFF3E0;margin:4pt 0 0 0">越南、馬來西亞華語圈</p>
        <p style="font-size:10pt;color:#FFF3E0;margin:4pt 0 0 0">多語系平台</p>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide08_business() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 15pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">07 | BUSINESS MODEL</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 14pt 0">商業模式與定價策略</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:16pt">
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:#F8F9FA;border-radius:8pt;padding:14pt;border-top:3pt solid #888;text-align:center">
          <p style="font-size:14pt;color:${TXT};margin:0;font-weight:bold">Free</p>
          <p style="font-size:22pt;color:${TXT};margin:6pt 0;font-weight:bold">NT$0</p>
          <p style="font-size:10pt;color:#888;margin:0 0 8pt 0">/月</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">每日 3 題免費</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">基礎 AI 解題</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">社群功能</p>
        </div>
        <p style="font-size:10pt;color:#888;margin:0;text-align:center">獲客引擎</p>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:${C4};border-radius:8pt;padding:14pt;border-top:3pt solid ${C2};text-align:center">
          <p style="font-size:14pt;color:${C2};margin:0;font-weight:bold">Standard</p>
          <p style="font-size:22pt;color:${C1};margin:6pt 0;font-weight:bold">NT$490</p>
          <p style="font-size:10pt;color:#888;margin:0 0 8pt 0">/月</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">無限 AI 對話</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">個人化學習計畫</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">進度追蹤報告</p>
        </div>
        <p style="font-size:10pt;color:#888;margin:0;text-align:center">主力營收</p>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:${C1};border-radius:8pt;padding:14pt;border-top:3pt solid ${C3};text-align:center">
          <p style="font-size:14pt;color:${C3};margin:0;font-weight:bold">Premium</p>
          <p style="font-size:22pt;color:${LTXT};margin:6pt 0;font-weight:bold">NT$690</p>
          <p style="font-size:10pt;color:#8BB8D9;margin:0 0 8pt 0">/月</p>
          <p style="font-size:10pt;color:${LTXT};margin:2pt 0">全部 Standard 功能</p>
          <p style="font-size:10pt;color:${LTXT};margin:2pt 0">真人教師線上輔導</p>
          <p style="font-size:10pt;color:${LTXT};margin:2pt 0">家長 Dashboard</p>
        </div>
        <p style="font-size:10pt;color:#888;margin:0;text-align:center">高 ARPU</p>
      </div>
      <div style="flex:1.2;display:flex;flex-direction:column;justify-content:center;gap:8pt;padding:0 0 0 8pt">
        <div style="background:#FFF3E0;border-radius:6pt;padding:10pt">
          <p style="font-size:11pt;color:${C3};margin:0;font-weight:bold">單位經濟學</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">CAC &lt; NT$4,000</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0 0 0">CLTV ~ NT$12,000</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0 0 0">CLTV/CAC = 3:1</p>
        </div>
        <div style="background:#F8F9FA;border-radius:6pt;padding:10pt">
          <p style="font-size:11pt;color:${C1};margin:0;font-weight:bold">B2B2C 方案</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">學校授權方案</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0 0 0">每校 NT$60K/年</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide09_gtm() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">08 | GO-TO-MARKET</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 16pt 0">市場進入策略</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:${C1};border-radius:8pt;padding:14pt">
          <p style="font-size:14pt;color:${C3};margin:0;font-weight:bold">1. 社群 + 內容行銷</p>
          <p style="font-size:11pt;color:${LTXT};margin:6pt 0 0 0;line-height:1.4">Instagram / TikTok 數學解題短影片，家長社群 KOL 合作</p>
        </div>
        <div style="background:${C4};border-radius:8pt;padding:14pt">
          <p style="font-size:14pt;color:${C1};margin:0;font-weight:bold">2. 教師推薦計畫</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">數學教師免費使用 + 推薦獎勵，借助師生信任關係</p>
        </div>
        <div style="background:#F8F9FA;border-radius:8pt;padding:14pt">
          <p style="font-size:14pt;color:${C1};margin:0;font-weight:bold">3. 學校合作 B2B2C</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">與 3-5 所種子學校合作試用，以成果數據推動口碑</p>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:#F8F9FA;border-radius:8pt;padding:14pt">
          <p style="font-size:14pt;color:${C1};margin:0;font-weight:bold">4. 段考季集中投放</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">鎖定段考前 2 週為黃金獲客期，精準投放 Google / Meta 廣告</p>
        </div>
        <div style="background:#FFF3E0;border-radius:8pt;padding:14pt">
          <p style="font-size:14pt;color:${C3};margin:0;font-weight:bold">成長飛輪</p>
          <p style="font-size:11pt;color:${TXT};margin:6pt 0 0 0;line-height:1.4">免費用戶 → 成績進步 → 口碑推薦 → 更多免費用戶 → 付費轉換</p>
        </div>
        <div style="background:${C1};border-radius:8pt;padding:14pt">
          <p style="font-size:11pt;color:#8BB8D9;margin:0">目標轉換率</p>
          <p style="font-size:26pt;color:${C3};margin:4pt 0 0 0;font-weight:bold">Free → Paid: 8%</p>
          <p style="font-size:11pt;color:#8BB8D9;margin:4pt 0 0 0">月流失率目標: &lt; 5%</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide10_traction() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">09 | TRACTION</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 16pt 0">早期驗證與里程碑</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:24pt">
      <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
        <div style="background:${C4};border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:32pt;color:${C1};margin:0;font-weight:bold">MVP</p>
          <p style="font-size:12pt;color:${TXT};margin:6pt 0 0 0">核心 AI 解題引擎</p>
          <p style="font-size:11pt;color:${TXT};margin:2pt 0 0 0">已完成開發</p>
        </div>
        <div style="background:${C4};border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:32pt;color:${C1};margin:0;font-weight:bold">95%+</p>
          <p style="font-size:12pt;color:${TXT};margin:6pt 0 0 0">國中數學解題準確率</p>
          <p style="font-size:11pt;color:${TXT};margin:2pt 0 0 0">內部測試結果</p>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
        <div style="background:#FFF3E0;border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:32pt;color:${C3};margin:0;font-weight:bold">50+</p>
          <p style="font-size:12pt;color:${TXT};margin:6pt 0 0 0">用戶訪談</p>
          <p style="font-size:11pt;color:${TXT};margin:2pt 0 0 0">國中生 + 家長需求驗證</p>
        </div>
        <div style="background:#F8F9FA;border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:32pt;color:${C2};margin:0;font-weight:bold">3 校</p>
          <p style="font-size:12pt;color:${TXT};margin:6pt 0 0 0">種子學校合作意向</p>
          <p style="font-size:11pt;color:${TXT};margin:2pt 0 0 0">新北市國中洽談中</p>
        </div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:12pt">
        <div style="background:${C1};border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:14pt;color:${C3};margin:0;font-weight:bold">已獲成就</p>
          <p style="font-size:11pt;color:${LTXT};margin:8pt 0 3pt 0">&#10003; 創業綻放初賽通過</p>
          <p style="font-size:11pt;color:${LTXT};margin:3pt 0">&#10003; MVP 產品原型完成</p>
          <p style="font-size:11pt;color:${LTXT};margin:3pt 0">&#10003; 商業模式驗證</p>
        </div>
        <div style="background:#E8F5E9;border-radius:8pt;padding:16pt;text-align:center">
          <p style="font-size:14pt;color:#2E7D32;margin:0;font-weight:bold">下一步</p>
          <p style="font-size:11pt;color:${TXT};margin:8pt 0 3pt 0">Beta 公測 (Q2 2026)</p>
          <p style="font-size:11pt;color:${TXT};margin:3pt 0">首批 500 用戶獲取</p>
          <p style="font-size:11pt;color:${TXT};margin:3pt 0">種子學校正式簽約</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide11_team() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:24pt 40pt 16pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 3pt 0;font-weight:bold">10 | TEAM</p>
    <h1 style="font-size:26pt;color:${C1};margin:0 0 14pt 0">團隊</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt;align-items:flex-start">
      <div style="flex:1;background:${C4};border-radius:8pt;padding:16pt;text-align:center">
        <div style="width:60pt;height:60pt;background:${C1};border-radius:50%;margin:0 auto 10pt auto;display:flex;align-items:center;justify-content:center">
          <p style="font-size:24pt;color:${LTXT};margin:0;font-weight:bold">B</p>
        </div>
        <p style="font-size:15pt;color:${C1};margin:0;font-weight:bold">Bennie</p>
        <p style="font-size:11pt;color:${C3};margin:3pt 0 8pt 0;font-weight:bold">CEO / CTO</p>
        <ul style="font-size:10pt;color:${TXT};margin:0;padding:0 0 0 14pt;text-align:left;line-height:1.5">
          <li>全端工程師，精通 AI/ML</li>
          <li>教育科技產品開發經驗</li>
          <li>LLM Fine-tuning 技術專長</li>
          <li>產品設計 + 工程開發</li>
        </ul>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;gap:10pt">
        <div style="background:#F8F9FA;border-radius:8pt;padding:12pt">
          <p style="font-size:13pt;color:${C1};margin:0 0 6pt 0;font-weight:bold">團隊優勢</p>
          <ul style="font-size:10pt;color:${TXT};margin:0;padding:0 0 0 14pt;line-height:1.5">
            <li>技術與商業的雙重視角</li>
            <li>快速迭代的精實創業方法論</li>
            <li>對教育領域的深刻理解與熱情</li>
          </ul>
        </div>
        <div style="background:${C1};border-radius:8pt;padding:12pt">
          <p style="font-size:13pt;color:${C3};margin:0 0 6pt 0;font-weight:bold">招募計畫</p>
          <ul style="font-size:10pt;color:${LTXT};margin:0;padding:0 0 0 14pt;line-height:1.5">
            <li>Q2 2026: 行銷 / 社群經理</li>
            <li>Q3 2026: 前端工程師</li>
            <li>Q4 2026: 教育內容專員</li>
          </ul>
        </div>
        <div style="background:#FFF3E0;border-radius:8pt;padding:10pt">
          <p style="font-size:12pt;color:${C3};margin:0;font-weight:bold">顧問網絡</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">規劃延攬教育界 / AI 領域業師</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide12_finance() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 15pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">11 | FINANCIALS</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 12pt 0">三年財務預測</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:5;display:flex;flex-direction:column;justify-content:center">
        <div id="revenue-chart" class="placeholder" style="width:320pt;height:240pt;background:#E8E8E8;border-radius:4pt"></div>
      </div>
      <div style="flex:4;display:flex;flex-direction:column;gap:10pt;justify-content:center">
        <div style="display:flex;flex-direction:row;gap:8pt">
          <div style="flex:1;background:${C4};border-radius:6pt;padding:12pt;text-align:center">
            <p style="font-size:10pt;color:${C2};margin:0">Year 1</p>
            <p style="font-size:16pt;color:${C1};margin:4pt 0 0 0;font-weight:bold">$4.6M</p>
          </div>
          <div style="flex:1;background:${C4};border-radius:6pt;padding:12pt;text-align:center">
            <p style="font-size:10pt;color:${C2};margin:0">Year 2</p>
            <p style="font-size:16pt;color:${C1};margin:4pt 0 0 0;font-weight:bold">$14.3M</p>
          </div>
          <div style="flex:1;background:${C4};border-radius:6pt;padding:12pt;text-align:center">
            <p style="font-size:10pt;color:${C2};margin:0">Year 3</p>
            <p style="font-size:16pt;color:${C1};margin:4pt 0 0 0;font-weight:bold">$34.8M</p>
          </div>
        </div>
        <div style="background:#F8F9FA;border-radius:6pt;padding:12pt">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">關鍵 SaaS 指標</p>
          <p style="font-size:10pt;color:${TXT};margin:6pt 0 2pt 0">Year 3 MRR: NT$2.9M</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">Year 3 ARR: NT$34.8M</p>
          <p style="font-size:10pt;color:${TXT};margin:2pt 0">月流失率: &lt; 5%</p>
        </div>
        <div style="background:${C1};border-radius:6pt;padding:12pt">
          <p style="font-size:12pt;color:${C3};margin:0;font-weight:bold">盈虧平衡</p>
          <p style="font-size:20pt;color:${LTXT};margin:6pt 0 0 0;font-weight:bold">第 18 個月</p>
          <p style="font-size:10pt;color:#8BB8D9;margin:4pt 0 0 0">Year 3 淨利率 &gt; 50%</p>
        </div>
      </div>
    </div>
    <p style="font-size:9pt;color:#888;margin:6pt 0 0 0">單位: NT$ (新台幣) | M = 百萬</p>
  </div>
</div>
${FOOT}`;
}

function slide13_funding() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:24pt 40pt 16pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 3pt 0;font-weight:bold">12 | FUNDING</p>
    <h1 style="font-size:26pt;color:${C1};margin:0 0 10pt 0">資金運用與里程碑</h1>
    <div style="display:flex;flex:1;flex-direction:row;gap:20pt">
      <div style="flex:5;display:flex;flex-direction:column;justify-content:center;align-items:center">
        <div id="funding-chart" class="placeholder" style="width:260pt;height:210pt;background:#E8E8E8;border-radius:4pt"></div>
      </div>
      <div style="flex:4;display:flex;flex-direction:column;gap:8pt;justify-content:center">
        <div style="background:${C1};border-radius:6pt;padding:10pt;text-align:center">
          <p style="font-size:11pt;color:#8BB8D9;margin:0">申請支持金</p>
          <p style="font-size:26pt;color:${C3};margin:3pt 0 0 0;font-weight:bold">NT$300 萬</p>
        </div>
        <div style="border-left:3pt solid ${C2};padding:6pt 10pt">
          <p style="font-size:10pt;color:${C1};margin:0;font-weight:bold">產品開發 40% — NT$120 萬</p>
          <p style="font-size:9pt;color:${TXT};margin:2pt 0 0 0">AI 模型優化 + 平台功能完善</p>
        </div>
        <div style="border-left:3pt solid ${C3};padding:6pt 10pt">
          <p style="font-size:10pt;color:${C1};margin:0;font-weight:bold">行銷推廣 30% — NT$90 萬</p>
          <p style="font-size:9pt;color:${TXT};margin:2pt 0 0 0">數位行銷 + KOL + 學校合作</p>
        </div>
        <div style="border-left:3pt solid #27AE60;padding:6pt 10pt">
          <p style="font-size:10pt;color:${C1};margin:0;font-weight:bold">人事費用 20% — NT$60 萬</p>
          <p style="font-size:9pt;color:${TXT};margin:2pt 0 0 0">核心團隊擴編（行銷 + 工程）</p>
        </div>
        <div style="border-left:3pt solid #888;padding:6pt 10pt">
          <p style="font-size:10pt;color:${C1};margin:0;font-weight:bold">營運備用 10% — NT$30 萬</p>
          <p style="font-size:9pt;color:${TXT};margin:2pt 0 0 0">雲端費用 + 法務 + 雜支</p>
        </div>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide14_risk() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;display:flex;flex-direction:column;padding:30pt 40pt 20pt 40pt">
    <p style="font-size:12pt;color:${C3};margin:0 0 4pt 0;font-weight:bold">13 | RISK MANAGEMENT</p>
    <h1 style="font-size:28pt;color:${C1};margin:0 0 16pt 0">風險分析與應對策略</h1>
    <div style="display:flex;flex:1;flex-direction:column;gap:10pt">
      <div style="display:flex;flex-direction:row;gap:12pt">
        <div style="flex:1;background:#FDECEA;border-radius:8pt;padding:14pt;border-left:4pt solid #E74C3C">
          <p style="font-size:12pt;color:#C0392B;margin:0;font-weight:bold">大型平台競爭</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">Google / 均一也發展 AI 教育</p>
          <p style="font-size:10pt;color:${C2};margin:4pt 0 0 0;font-weight:bold">&#8594; 深耕本土課綱，做大平台不願做的垂直深度</p>
        </div>
        <div style="flex:1;background:#FFF3E0;border-radius:8pt;padding:14pt;border-left:4pt solid ${C3}">
          <p style="font-size:12pt;color:#E65100;margin:0;font-weight:bold">少子化趨勢</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">學生人數逐年減少</p>
          <p style="font-size:10pt;color:${C2};margin:4pt 0 0 0;font-weight:bold">&#8594; 提高 ARPU + 跨科目 + 國際化對沖</p>
        </div>
      </div>
      <div style="display:flex;flex-direction:row;gap:12pt">
        <div style="flex:1;background:#E8F5E9;border-radius:8pt;padding:14pt;border-left:4pt solid #27AE60">
          <p style="font-size:12pt;color:#2E7D32;margin:0;font-weight:bold">AI 準確性風險</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">模型可能產生錯誤解答</p>
          <p style="font-size:10pt;color:${C2};margin:4pt 0 0 0;font-weight:bold">&#8594; 持續 Fine-tuning + 教師審核機制 + 用戶回報系統</p>
        </div>
        <div style="flex:1;background:${C4};border-radius:8pt;padding:14pt;border-left:4pt solid ${C2}">
          <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">用戶獲取成本</p>
          <p style="font-size:10pt;color:${TXT};margin:4pt 0 0 0">教育市場決策鏈長</p>
          <p style="font-size:10pt;color:${C2};margin:4pt 0 0 0;font-weight:bold">&#8594; Freemium 降低門檻 + 教師推薦降低 CAC</p>
        </div>
      </div>
      <div style="background:#F8F9FA;border-radius:8pt;padding:12pt;display:flex;flex-direction:row;gap:16pt;align-items:center">
        <p style="font-size:12pt;color:${C1};margin:0;font-weight:bold">Plan B:</p>
        <p style="font-size:11pt;color:${TXT};margin:0">若 B2C 成長不如預期，將全力轉向 B2B 學校授權模式，以穩定合約收入為基礎</p>
      </div>
    </div>
  </div>
</div>
${FOOT}`;
}

function slide15_cta() {
  return `${HEAD}
<div style="display:flex;flex:1;flex-direction:row">
  <div style="width:8pt;background:${C3}"></div>
  <div style="flex:1;background:${C1};display:flex;flex-direction:column;justify-content:center;padding:0 60pt">
    <p style="font-size:14pt;color:${C3};letter-spacing:2pt;margin:0 0 10pt 0;font-weight:bold">OUR VISION</p>
    <h1 style="font-size:32pt;color:${LTXT};margin:0 0 14pt 0;line-height:1.3">讓 AI 成為每個孩子的<br>數學學習夥伴</h1>
    <div style="width:60pt;height:3pt;background:${C3};margin:0 0 20pt 0"></div>
    <p style="font-size:15pt;color:#8BB8D9;margin:0 0 24pt 0;line-height:1.5">我們正在申請 NT$300 萬支持金<br>用 18 個月達成 3.9 萬用戶與盈虧平衡</p>
    <div style="display:flex;flex-direction:row;gap:20pt;margin:0 0 24pt 0">
      <div style="background:${C3};border-radius:6pt;padding:10pt 16pt">
        <p style="font-size:12pt;color:${LTXT};margin:0;font-weight:bold">NT$300 萬 支持金</p>
      </div>
      <div style="background:${C2};border-radius:6pt;padding:10pt 16pt">
        <p style="font-size:12pt;color:${LTXT};margin:0;font-weight:bold">18 個月盈虧平衡</p>
      </div>
      <div style="background:#27AE60;border-radius:6pt;padding:10pt 16pt">
        <p style="font-size:12pt;color:${LTXT};margin:0;font-weight:bold">Year 3 營收 $34.8M</p>
      </div>
    </div>
    <p style="font-size:16pt;color:${LTXT};margin:0;font-weight:bold">mathify.io</p>
    <p style="font-size:12pt;color:#6A9BBF;margin:6pt 0 0 0">感謝聆聽，期待您的提問與指教</p>
  </div>
</div>
${FOOT}`;
}

// Main
async function main() {
  // 1. Write HTML slides
  const slides = [
    { name: 'slide01', fn: coverSlide },
    { name: 'slide02', fn: slide02_problem },
    { name: 'slide03', fn: slide03_solution },
    { name: 'slide04', fn: slide04_competitive },
    { name: 'slide05', fn: slide05_industry },
    { name: 'slide06', fn: slide06_tam },
    { name: 'slide07', fn: slide07_expansion },
    { name: 'slide08', fn: slide08_business },
    { name: 'slide09', fn: slide09_gtm },
    { name: 'slide10', fn: slide10_traction },
    { name: 'slide11', fn: slide11_team },
    { name: 'slide12', fn: slide12_finance },
    { name: 'slide13', fn: slide13_funding },
    { name: 'slide14', fn: slide14_risk },
    { name: 'slide15', fn: slide15_cta },
  ];

  for (const s of slides) {
    fs.writeFileSync(path.join(SLIDES_DIR, `${s.name}.html`), s.fn());
  }
  console.log(`Wrote ${slides.length} HTML slides`);

  // 2. Create presentation
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Mathify Team';
  pptx.title = 'Mathify - AI 數學家教平台 | 複賽簡報';

  for (let i = 0; i < slides.length; i++) {
    const htmlPath = path.join(SLIDES_DIR, `${slides[i].name}.html`);
    console.log(`Processing ${slides[i].name}...`);
    const { slide, placeholders } = await html2pptx(htmlPath, pptx);

    // Add charts/tables to specific slides
    if (slides[i].name === 'slide04') {
      // Competition 2x2 matrix as a table
      const ph = placeholders.find(p => p.id === 'matrix') || placeholders[0];
      if (ph) {
        const hdrOpts = { fill: { color: PC1 }, color: 'FFFFFF', bold: true, fontSize: 10, align: 'center', valign: 'middle' };
        const cellHi = { fill: { color: 'E8F5E9' }, fontSize: 9, align: 'center', valign: 'middle' };
        const cellMd = { fill: { color: 'FFF3E0' }, fontSize: 9, align: 'center', valign: 'middle' };
        const cellLo = { fill: { color: 'FDECEA' }, fontSize: 9, align: 'center', valign: 'middle' };
        const cellUs = { fill: { color: PC3 }, color: 'FFFFFF', fontSize: 9, align: 'center', valign: 'middle', bold: true };
        slide.addTable([
          [
            { text: '', options: hdrOpts },
            { text: '低個人化', options: hdrOpts },
            { text: '高個人化', options: hdrOpts },
          ],
          [
            { text: 'AI\n原生', options: hdrOpts },
            { text: 'ChatGPT\n(通用 AI)', options: cellMd },
            { text: 'Mathify\n(專業 AI)', options: cellUs },
          ],
          [
            { text: '傳統\n教學', options: hdrOpts },
            { text: '均一教育\n(影片式)', options: cellLo },
            { text: '真人家教\n(高成本)', options: cellHi },
          ],
        ], {
          x: ph.x, y: ph.y, w: ph.w, h: ph.h,
          border: { pt: 1, color: 'CCCCCC' },
          colW: [ph.w * 0.22, ph.w * 0.39, ph.w * 0.39],
          rowH: [ph.h * 0.2, ph.h * 0.4, ph.h * 0.4],
        });
      }
    }

    if (slides[i].name === 'slide12') {
      // Revenue chart
      const ph = placeholders.find(p => p.id === 'revenue-chart') || placeholders[0];
      if (ph) {
        slide.addChart(pptx.charts.BAR, [
          {
            name: '營收 (NT$ 百萬)',
            labels: ['Year 1', 'Year 2', 'Year 3'],
            values: [4.57, 14.26, 34.84],
          },
          {
            name: '費用 (NT$ 百萬)',
            labels: ['Year 1', 'Year 2', 'Year 3'],
            values: [3.8, 8.5, 16.2],
          },
        ], {
          x: ph.x, y: ph.y, w: ph.w, h: ph.h,
          barDir: 'col',
          showTitle: false,
          showLegend: true,
          legendPos: 'b',
          showCatAxisTitle: false,
          showValAxisTitle: true,
          valAxisTitle: 'NT$ (百萬)',
          valAxisMinVal: 0,
          valAxisMaxVal: 40,
          valAxisMajorUnit: 10,
          chartColors: [PC2, 'AAB7B8'],
          dataLabelPosition: 'outEnd',
          dataLabelColor: '333333',
          dataLabelFontSize: 9,
          showValue: true,
        });
      }
    }

    if (slides[i].name === 'slide13') {
      // Funding pie chart
      const ph = placeholders.find(p => p.id === 'funding-chart') || placeholders[0];
      if (ph) {
        slide.addChart(pptx.charts.PIE, [{
          name: '資金分配',
          labels: ['產品開發 40%', '行銷推廣 30%', '人事費用 20%', '營運備用 10%'],
          values: [40, 30, 20, 10],
        }], {
          x: ph.x, y: ph.y, w: ph.w, h: ph.h,
          showPercent: false,
          showLegend: true,
          legendPos: 'b',
          legendFontSize: 9,
          chartColors: [PC2, PC3, '27AE60', 'AAB7B8'],
          dataLabelPosition: 'bestFit',
          dataLabelColor: 'FFFFFF',
          dataLabelFontSize: 10,
          showTitle: false,
        });
      }
    }

    if (slides[i].name === 'slide03') {
      // Product demo placeholder - add a text box as placeholder
      const ph = placeholders.find(p => p.id === 'product-demo') || placeholders[0];
      if (ph) {
        slide.addText([
          { text: '[ 產品 Demo 截圖 ]', options: { fontSize: 14, color: '888888', bold: true } },
          { text: '\n請替換為實際產品畫面', options: { fontSize: 10, color: 'AAAAAA' } },
        ], {
          x: ph.x, y: ph.y, w: ph.w, h: ph.h,
          align: 'center', valign: 'middle',
          fill: { color: 'F0F0F0' },
          border: { pt: 2, color: 'CCCCCC', type: 'dash' },
        });
      }
    }
  }

  const outPath = path.join(__dirname, 'Mathify_優化商業簡報.pptx');
  await pptx.writeFile({ fileName: outPath });
  console.log(`\nPresentation saved: ${outPath}`);
}

main().catch(err => {
  console.error('Error:', err.message || err);
  process.exit(1);
});
