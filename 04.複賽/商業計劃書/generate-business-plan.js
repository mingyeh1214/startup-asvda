const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak } = require("docx");

const FONT = "Microsoft JhengHei";
const C1 = "1B3A5C", C2 = "2C5E8A", ACC = "D5E8F0";

function toRuns(c) {
  if (typeof c === "string") return [new TextRun({ text: c, font: FONT })];
  if (Array.isArray(c)) return c.map(x => typeof x === "string" ? new TextRun({ text: x, font: FONT }) : new TextRun({ text: x.t || "", bold: x.b, italics: x.i, color: x.color, size: x.size, font: FONT }));
  return [new TextRun({ text: c.t || "", bold: c.b, italics: c.i, size: c.size, color: c.color, font: FONT })];
}

function makeTable(headers, rows, widths) {
  const bs = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
  const bd = { top: bs, bottom: bs, left: bs, right: bs };
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: ACC }, borders: bd, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: h, bold: true, font: FONT, size: 22, color: C1 })] })] })) }),
      ...rows.map(row => new TableRow({ children: row.map((cell, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA }, borders: bd, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: toRuns(cell), spacing: { before: 40, after: 40 } })] })) }))
    ]
  });
}

function render(items) {
  const out = [];
  for (const it of items) {
    if (it.h1) out.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: it.h1, font: FONT, bold: true, size: 32, color: C1 })], spacing: { before: 360, after: 240 } }));
    else if (it.h2) out.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text: it.h2, font: FONT, bold: true, size: 28, color: C2 })], spacing: { before: 240, after: 180 } }));
    else if (it.h3) out.push(new Paragraph({ children: [new TextRun({ text: it.h3, font: FONT, bold: true, size: 24, color: C2 })], spacing: { before: 180, after: 120 } }));
    else if (it.p) out.push(new Paragraph({ children: toRuns(it.p), spacing: { after: 120, line: 360 } }));
    else if (it.bullets) for (const b of it.bullets) out.push(new Paragraph({ children: toRuns(b), numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 } }));
    else if (it.table) { out.push(makeTable(it.table.h, it.table.r, it.table.w)); out.push(new Paragraph({ text: "", spacing: { after: 120 } })); }
    else if (it.pb) out.push(new Paragraph({ children: [new PageBreak()] }));
    else if (it.sp) out.push(new Paragraph({ text: "", spacing: { after: it.sp || 200 } }));
  }
  return out;
}

const numConfig = [{
  reference: "bullets",
  levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
}];

// ========== COVER PAGE ==========
const coverChildren = [
  new Paragraph({ text: "", spacing: { before: 3000 } }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MATHIFY", font: FONT, bold: true, size: 72, color: C1 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200 }, children: [new TextRun({ text: "AI 驅動的數學個人化學習平台", font: FONT, size: 32, color: C2 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "商 業 計 畫 書", font: FONT, bold: true, size: 44, color: C1 })] }),
  new Paragraph({ text: "", spacing: { before: 1200 } }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "創業綻放 — 創業大聯盟競賽（複賽）", font: FONT, size: 26, color: "555555" })] }),
  new Paragraph({ text: "", spacing: { before: 600 } }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "團隊成員", font: FONT, bold: true, size: 26, color: C1 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "劉明燁（Bennie）— 創辦人", font: FONT, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 }, children: [new TextRun({ text: "石亞喬（Rachel）— 技術長暨產品長（CPTO）", font: FONT, size: 24 })] }),
  new Paragraph({ text: "", spacing: { before: 600 } }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2026 年 3 月", font: FONT, size: 24, color: "777777" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100 }, children: [new TextRun({ text: "mathify.io", font: FONT, size: 22, color: C2 })] }),
];

// ========== CHAPTER 1 ==========
const ch1 = [
  { h1: "第一章　執行摘要" },
  { p: "Mathify 是一個以 AI 驅動的數學個人化學習平台，專為台灣國高中學生設計。透過 Fine-tuned 大型語言模型（LLM）與視覺化解題引擎（TikZ/Desmos），Mathify 將抽象的數學概念轉化為互動式的動態圖形與逐步解題過程，實現真正的適性化學習體驗。" },
  { h2: "核心問題" },
  { p: "台灣 108 萬國高中學生中，會考數學近 75% 未達精熟等級，超過 25% 處於待加強（C 級）。傳統補習班年均費用高達 NT$71,249，但採用「一對多」模式，無法針對個別學生的學習斷層提供個人化指導。此外，都會區與偏遠地區的校外學習參與率差距高達 32 個百分點（75.6% vs 43.6%），教育資源分配嚴重不均。" },
  { h2: "解決方案" },
  { p: "Mathify 以三大支柱解決上述痛點：" },
  { bullets: [
    [{ t: "適性化：", b: true }, "Fine-tuned LLM 精準對齊 108 課綱（康軒/南一/翰林），根據學生程度動態調整教學內容與難度"],
    [{ t: "視覺化：", b: true }, "整合 TikZ 與 Desmos 引擎，將幾何、函數、統計等抽象概念化為可互動的動態圖形"],
    [{ t: "普及化：", b: true }, "以 Freemium 訂閱制提供服務，月費 NT$490 起，僅為傳統補習費用的 8%，大幅降低學習門檻"]
  ]},
  { h2: "關鍵指標" },
  { table: {
    h: ["指標", "數值"],
    r: [
      ["目標市場（SAM）", "648,000 名學生（108 萬 × 60% 補習率）"],
      ["可服務市場（SOM）", "38,880 名付費用戶（6% 市場佔有率）"],
      ["定價", "免費 / 標準 NT$490/月 / 進階 NT$690/月"],
      ["第一年目標", "500 名付費用戶，營收 NT$180 萬"],
      ["盈虧平衡", "第 15-16 個月"],
      ["資金需求", "NT$300 萬（創業支持金）"],
    ],
    w: [3000, 6000]
  }},
];

// ========== CHAPTER 2 ==========
const ch2 = [
  { h1: "第二章　問題與市場痛點" },
  { p: "台灣的數學教育正面臨結構性的三大斷層，這些斷層不僅影響學生的學業表現，更深遠地影響其未來的升學與職涯發展。" },
  { h2: "2.1 步調斷層：一對多教學的根本限制" },
  { p: "傳統補習班與學校課堂採用統一進度教學，無法因應每位學生的學習速度差異。根據教育部統計，全台共有 12,771 家文理補習班，年營收合計達 NT$270.8 億，顯示市場需求龐大。然而，平均每班 20-30 人的教學模式，意味著教師無法即時掌握每位學生的理解程度，導致程度落後的學生越學越挫折，程度超前的學生則缺乏挑戰。" },
  { h2: "2.2 理解斷層：數學的抽象性障礙" },
  { p: "數學科的抽象性使其成為學生最感困難的科目之一。113 學年度國中教育會考數學科成績分布如下：" },
  { table: {
    h: ["等級", "定義", "比例", "約當人數"],
    r: [
      ["A（精熟）", "能應用數學概念解決複雜問題", "25.49%", "~44,200"],
      ["B（基礎）", "能理解基本數學概念", "48.02%", "~83,200"],
      ["C（待加強）", "僅具備部分基礎數學能力", "26.49%", "~45,900"],
    ],
    w: [1500, 3500, 1500, 1500]
  }},
  { p: [{ t: "近四分之三（74.51%）的考生未達精熟等級", b: true }, "，意味著每年約 129,000 名學生在數學學習上存在不同程度的困難。傳統教材以文字與靜態圖片為主的呈現方式，無法有效幫助學生理解幾何空間、函數變化等需要「看見」的抽象概念。"] },
  { h2: "2.3 資源斷層：城鄉教育不平等" },
  { p: "教育資源的城鄉差距是台灣長期存在的結構性問題。校外學習參與率的地區差異觸目驚心：" },
  { table: {
    h: ["地區類型", "校外學習參與率", "年均支出"],
    r: [
      ["都會區", "75.6%", "NT$85,000+"],
      ["一般城鎮", "63.6%", "NT$71,249"],
      ["偏遠地區", "43.6%", "NT$45,000-"],
    ],
    w: [2500, 3000, 3000]
  }},
  { p: "都會區與偏遠地區的參與率差距達 32 個百分點。偏遠地區學生不僅缺乏實體補習資源，即使有意願學習，也因地理與經濟因素而無法獲得優質的課後輔導。Mathify 作為數位學習平台，能以極低的邊際成本觸及偏遠地區學生，有效縮小教育資源落差。" },
  { h2: "2.4 現行解決方案的不足" },
  { table: {
    h: ["現行方案", "優勢", "核心限制"],
    r: [
      ["傳統補習班", "面對面教學、社交互動", "高成本（年均 NT$71,249）、一對多、無法個人化"],
      ["線上影片課程", "隨時隨地學習", "單向輸出、無互動、無法診斷學生弱點"],
      ["ChatGPT 等通用 AI", "免費、即時回應", "未對齊台灣課綱、數學準確度不足、無視覺化能力"],
      ["紙本參考書", "系統化內容", "靜態、無法適應個別程度、無即時回饋"],
    ],
    w: [2000, 2500, 4500]
  }},
  { p: "上述方案皆未能同時解決步調、理解與資源三大斷層。Mathify 的 AI 個人化 + 視覺化解題引擎正是針對這三重痛點而設計的解決方案。" },
];
// ========== CHAPTER 3 ==========
const ch3 = [
  { h1: "第三章　解決方案與產品" },
  { p: "Mathify 平台以「AI 驅動的適性化學習」為核心理念，整合五大功能模組，打造完整的數學學習閉環。" },
  { h2: "3.1 平台功能全景" },
  { table: {
    h: ["模組", "功能說明", "技術基礎"],
    r: [
      ["AI 數學家教", "24/7 即時問答，支援拍照解題、語音輸入", "Fine-tuned LLM + RAG"],
      ["視覺化解題", "動態圖形展示解題過程，支援互動操作", "TikZ + Desmos API"],
      ["適性化題庫", "依學生程度自動推薦練習題，即時診斷弱點", "知識圖譜 + 推薦演算法"],
      ["模擬考系統", "計時模擬會考/學測，考後生成學習診斷報告", "項目反應理論（IRT）"],
      ["學習儀表板", "視覺化呈現學習進度、弱點分析、成長趨勢", "數據分析 + 視覺化"],
    ],
    w: [2000, 4000, 3000]
  }},
  { h2: "3.2 核心技術創新" },
  { h3: "Fine-tuned 數學 LLM" },
  { p: "Mathify 的 AI 核心並非直接使用通用大型語言模型，而是在強大基礎模型之上，以台灣 108 課綱教材、歷屆會考/學測/指考題目、標準解題步驟、以及教師批改資料進行 Fine-tuning。這使得 Mathify AI 能夠：" },
  { bullets: [
    "精準對齊康軒、南一、翰林三大版本教材的章節結構與用詞",
    "以符合台灣數學教育邏輯的方式進行逐步解題",
    "識別學生常見的錯誤模式，提供針對性的糾正與補強",
    "支援繁體中文數學表述的自然語言理解",
  ]},
  { h3: "視覺化解題引擎" },
  { p: "數學的本質是視覺化的——幾何需要「看見」圖形，函數需要「看見」曲線變化，統計需要「看見」數據分布。Mathify 整合 TikZ（學術級繪圖引擎）與 Desmos（互動式圖形計算器），實現：" },
  { bullets: [
    "幾何證明的動態展示：旋轉、平移、縮放幾何圖形，讓抽象定理變得直觀",
    "函數圖形的即時互動：拖曳參數，即時觀察函數圖形變化",
    "統計圖表的動態生成：根據數據自動生成適當的圖表類型",
    "解題過程的步驟動畫：將複雜的解題過程分解為可視化的動態步驟",
  ]},
  { p: [{ t: "這是 Mathify 相較於 ChatGPT 等通用 AI 最核心的差異化優勢。", b: true }, "通用 AI 僅能輸出文字描述或靜態的 LaTeX 公式，無法提供互動式的視覺化解題體驗。"] },
  { h2: "3.3 知識圖譜與適性化學習路徑" },
  { p: "Mathify 建立了涵蓋國中至高中的完整數學知識圖譜，將所有數學概念以節點（concept）與邊（prerequisite）的形式結構化。當學生在特定概念上表現不佳時，系統會自動追溯其前置知識的掌握狀況，找出真正的學習斷點，並生成個人化的補強路徑。" },
  { h2: "3.4 產品發展路線圖" },
  { table: {
    h: ["階段", "時程", "核心功能", "目標"],
    r: [
      ["MVP", "2026 Q2-Q3", "AI 家教 + 基礎題庫 + 視覺化解題", "驗證核心價值，獲取種子用戶"],
      ["V2.0", "2026 Q4-2027 Q1", "模擬考 + 知識圖譜 + 學習報告", "提升留存率，開始收費"],
      ["V3.0", "2027 Q2+", "學校端介面 + API 整合 + 多科目", "B2B2C 通路開展"],
    ],
    w: [1200, 2000, 3500, 2300]
  }},
  { h2: "3.5 與通用 AI 工具的差異" },
  { table: {
    h: ["比較維度", "ChatGPT / Gemini", "Mathify"],
    r: [
      ["課綱對齊", "無，通用知識庫", "完整對齊 108 課綱三大版本"],
      ["數學準確度", "時常出錯，尤其複雜題型", "Fine-tuned 數學專用模型，高準確度"],
      ["視覺化", "僅文字/LaTeX 輸出", "TikZ + Desmos 動態互動圖形"],
      ["適性化", "無學習記錄", "知識圖譜追蹤，個人化學習路徑"],
      ["台灣在地化", "無", "繁中原生，對齊台灣升學制度"],
      ["學習追蹤", "對話即失", "完整學習歷程、弱點分析、進度報告"],
    ],
    w: [2000, 3500, 3500]
  }},
];
// ========== CHAPTER 4 ==========
const ch4 = [
  { h1: "第四章　市場分析" },
  { h2: "4.1 行業現況" },
  { table: {
    h: ["指標", "數據", "來源"],
    r: [
      ["全台國高中學生數", "1,118,644 人（113 學年）", "教育部統計"],
      ["文理補習班數", "12,771 家", "教育部統計"],
      ["校外學習市場規模", "NT$270.8 億/年", "主計總處家庭收支調查"],
      ["校外學習參與率", "63.6%", "主計總處家庭收支調查"],
      ["參與者年均支出", "NT$71,249（4 年成長 37.5%）", "主計總處家庭收支調查"],
      ["全球 AI Tutors 市場", "USD $1.41B（2023）→ $15.47B（2032）", "市場研究報告"],
      ["全球 AI Tutors CAGR", "30.58%", "市場研究報告"],
    ],
    w: [2500, 3500, 3000]
  }},
  { p: "台灣教育市場呈現「少子化但支出增長」的獨特趨勢。2024 年出生人數降至 134,856 人（歷史新低），但家庭在子女教育上的投入持續增加，每位學生分配到的教育資源反而上升。這對 Mathify 而言是正面信號：家長願意為高品質的學習工具付費。" },
  { h2: "4.2 市場規模（TAM / SAM / SOM）" },
  { table: {
    h: ["層級", "定義", "計算", "規模"],
    r: [
      ["TAM", "全球 AI 家教市場", "全球 AI Tutors 市場", "USD $15.47B（2032）"],
      ["SAM", "台灣國高中有補習需求學生", "1,118,644 × 60% 補習率 × 96.5%", "648,000 人"],
      ["SOM", "第三年可觸及付費用戶", "SAM × 6% 市場佔有率", "38,880 人"],
      ["SOM 營收", "年度目標營收", "38,880 × NT$7,200/年", "NT$2.8 億"],
    ],
    w: [1200, 2500, 3000, 2300]
  }},
  { h2: "4.3 目標客群畫像" },
  { h3: "主要客群：國高中學生（13-18 歲）" },
  { bullets: [
    "數學成績 B-C 級，有明確提升需求",
    "習慣使用手機/平板進行學習",
    "對傳統補習班感到疲倦或無法配合時間",
    "偏遠地區缺乏優質補習資源的學生",
  ]},
  { h3: "次要客群：家長" },
  { bullets: [
    "年收入 NT$80-200 萬的中產家庭",
    "重視子女教育但對補習班高費用感到負擔",
    "希望能追蹤子女學習狀況",
  ]},
  { h2: "4.4 市場趨勢與機會" },
  { bullets: [
    [{ t: "AI 個人化學習浪潮：", b: true }, "全球 EdTech 投資持續增長，2025 Q3 美國 EdTech 交易 256 筆、總額 USD $1.37B"],
    [{ t: "後疫情數位學習常態化：", b: true }, "學生與家長對線上學習工具的接受度大幅提升"],
    [{ t: "108 課綱強調素養導向：", b: true }, "傳統填鴨式教學已不足夠，需要更靈活的學習工具"],
    [{ t: "少子化推升個人化需求：", b: true }, "家長願意為每位孩子投入更多資源，追求更精準的學習效果"],
  ]},
  { h2: "4.5 市場拓展路徑" },
  { p: "Phase 1（Year 1-2）：深耕台灣國高中數學市場，建立產品口碑與數據飛輪。Phase 2（Year 3-4）：拓展至華語圈市場（香港、馬來西亞、新加坡華校），利用繁體中文內容優勢。Phase 3（Year 5+）：進入國際市場，以英文版本覆蓋更大的 TAM。" },
];
// ========== CHAPTER 5 ==========
const ch5 = [
  { h1: "第五章　競爭分析" },
  { h2: "5.1 競爭格局" },
  { p: "Mathify 所處的市場涵蓋四大類競爭者。以下從「個人化程度」與「數學專業深度」兩個維度進行定位分析：" },
  { table: {
    h: ["競爭者類型", "代表", "個人化", "數學專深", "月費"],
    r: [
      ["傳統補習班", "陳立/赫哲/百成", "低", "高", "NT$3,000-8,000"],
      ["線上影片平台", "均一/學習吧/Snapask", "中", "中", "免費-NT$500"],
      ["國際 AI 工具", "Photomath/Khanmigo", "中高", "中", "USD $4-10"],
      ["通用 AI", "ChatGPT/Gemini", "低", "低-中", "免費-USD $20"],
      [{ t: "Mathify", b: true, color: C1 }, { t: "mathify.io", b: true, color: C1 }, { t: "極高", b: true, color: C1 }, { t: "極高", b: true, color: C1 }, { t: "NT$490-690", b: true, color: C1 }],
    ],
    w: [2000, 2000, 1200, 1200, 2000]
  }},
  { h2: "5.2 國際標竿：RevisionDojo 分析" },
  { p: "RevisionDojo 是 Y Combinator（W2024/F2024）支持的 AI 教育平台，獲得 USD $3.4M 種子輪融資，覆蓋 180+ 國家、350,000+ 用戶、2,500+ 合作學校，週成長率 13%，NPS 75+。其成功驗證了「AI 教育 SaaS Freemium 模式」的市場可行性。" },
  { table: {
    h: ["維度", "RevisionDojo", "Mathify"],
    r: [
      ["市場", "全球 IB 學生（180+ 國）", "台灣國高中（108 萬人）"],
      ["科目", "21 個 IB 科目", "專注數學（深度 > 廣度）"],
      ["AI 核心", "Fine-tuned on IB mark schemes", "Fine-tuned LLM + 視覺化引擎"],
      ["用戶痛點", "AI 數學準確度被批評", "以數學專精解決此痛點"],
      ["定價", "USD $17-19/月（~NT$550-620）", "NT$490-690/月"],
      ["在地化", "全球化但無深度在地化", "深度對齊台灣課綱與升學制度"],
    ],
    w: [1800, 3600, 3600]
  }},
  { h2: "5.3 Mathify 的競爭護城河" },
  { bullets: [
    [{ t: "視覺化解題（核心護城河）：", b: true }, "TikZ/Desmos 視覺化引擎是 Mathify 獨有的技術差異化，市場上無同等產品"],
    [{ t: "數學專精深度：", b: true }, "專注單一科目可達到通用平台無法企及的準確度與教學品質"],
    [{ t: "台灣課綱數據壁壘：", b: true }, "108 課綱結構化數據、歷屆考題、教師批改資料構成難以複製的訓練資料集"],
    [{ t: "網路效應與數據飛輪：", b: true }, "更多學生使用 → 更多學習數據 → AI 更精準 → 更好體驗 → 更多用戶"],
  ]},
];
// ========== CHAPTER 6 ==========
const ch6 = [
  { h1: "第六章　商業模式" },
  { h2: "6.1 收入模式：Freemium SaaS 訂閱制" },
  { p: "Mathify 採用經過國際市場驗證的 Freemium SaaS 模式。免費方案提供基本功能以降低試用門檻，付費方案解鎖完整的 AI 對話、視覺化解題與學習分析功能，驅動付費轉換。" },
  { h2: "6.2 定價策略" },
  { table: {
    h: ["方案", "月費", "年費", "核心功能"],
    r: [
      ["Free", "NT$0", "NT$0", "每日 5 次 AI 對話 + 部分題庫 + 基本筆記"],
      ["Standard", "NT$490", "NT$4,900（省 17%）", "無限 AI 對話 + 完整題庫 + 全部筆記 + 基礎學習報告"],
      ["Premium", "NT$690", "NT$6,900（省 17%）", "模擬考 + 進階學習報告 + 預測考題 + 知識圖譜 + 家長報告"],
    ],
    w: [1300, 1300, 2200, 4200]
  }},
  { p: "定價參考國際標竿 RevisionDojo（USD $17-19/月 ≈ NT$550-620）及台灣市場消費力。Standard 方案月費 NT$490 僅為傳統補習班月費的 8%，具備極高性價比。" },
  { h2: "6.3 單位經濟學" },
  { table: {
    h: ["指標", "數值", "說明"],
    r: [
      ["ARPU（月）", "NT$600", "Standard 與 Premium 加權平均"],
      ["月流失率", "5%", "B2C 教育 SaaS 產業基準（SMB 端 3-7%）"],
      ["客戶生命週期", "20 個月", "1 / 月流失率"],
      ["CLTV", "NT$12,000", "ARPU × 生命週期"],
      ["目標 CAC", "< NT$4,000", "維持 CLTV/CAC ≥ 3:1"],
      ["CLTV/CAC", "3:1", "SaaS 健康基準"],
      ["CAC 回收期", "< 8 個月", "投資人期望 12 個月內"],
      ["毛利率", "> 80%", "SaaS 產業標準 > 75%"],
    ],
    w: [2000, 2000, 5000]
  }},
  { h2: "6.4 未來擴展：B2B2C 學校端" },
  { p: "Phase 2 起，Mathify 將推出教師端管理介面，以免費工具（出題、批改、學習分析）吸引數學教師使用，再透過教師推薦帶動學生端訂閱。此模式參考 RevisionDojo 與 2,500+ 學校的合作經驗，教師免費使用、學生享 10% 折扣，形成 B2B2C 獲客通道。" },
];
// ========== CHAPTER 7 ==========
const ch7 = [
  { h1: "第七章　行銷與市場進入策略" },
  { h2: "7.1 Phase 1：種子用戶獲取（Month 1-6）" },
  { p: "目標：獲取 2,000 名免費用戶，轉換 100 名付費用戶。" },
  { bullets: [
    [{ t: "教育展與校園推廣：", b: true }, "參加台灣教育科技展、各縣市教育局研習活動，直接接觸教師與家長"],
    [{ t: "教育 KOL 合作：", b: true }, "與數學教師 YouTuber、教育部落客合作內容行銷，提供免費帳號換取真實評測"],
    [{ t: "免費工具策略：", b: true }, "提供免費的會考數學模擬練習，以高價值內容吸引自然流量"],
    [{ t: "家長社群經營：", b: true }, "在 PTT、Dcard、Facebook 家長社團進行口碑行銷與問題解答"],
  ]},
  { h2: "7.2 Phase 2：口碑裂變與社群（Month 7-12）" },
  { p: "目標：達成 10,000 免費用戶，500 名付費用戶。" },
  { bullets: [
    [{ t: "推薦獎勵計畫：", b: true }, "邀請好友註冊可獲得 Premium 功能免費使用 7 天"],
    [{ t: "學習社群建立：", b: true }, "建立 Discord/LINE 學習社群，促進用戶間互動與留存"],
    [{ t: "段考/會考衝刺活動：", b: true }, "配合台灣考試時程推出限時免費模擬考活動，創造用戶激增"],
    [{ t: "SEO 與內容行銷：", b: true }, "建立數學學習部落格，以會考/學測解題內容吸引搜尋流量"],
  ]},
  { h2: "7.3 Phase 3：學校端合作（Year 2+）" },
  { p: "目標：與 50+ 所學校建立合作關係，開展 B2B2C 通路。" },
  { bullets: [
    [{ t: "教師端免費工具：", b: true }, "提供出題、派發作業、學習分析儀表板等教師專屬功能"],
    [{ t: "學校試用計畫：", b: true }, "與教育局合作推動數位學習試辦計畫，以一學期免費試用降低導入門檻"],
    [{ t: "成效報告：", b: true }, "提供量化的學習成效報告，協助學校向家長與教育局展示成果"],
  ]},
  { h2: "7.4 增長飛輪" },
  { p: "免費工具吸引學生試用 → AI 個人化體驗創造 Aha Moment → 付費升級解鎖完整功能 → 學習成效提升帶動口碑推薦 → 教師發現工具價值主動推薦 → 更多數據強化 AI 模型 → 更好的學習體驗 → 持續正向循環。" },
];
// ========== CHAPTER 8 ==========
const ch8 = [
  { h1: "第八章　團隊" },
  { h2: "8.1 核心成員" },
  { h3: "劉明燁（Bennie）— 創辦人 & CEO" },
  { bullets: [
    "學歷：國立清華大學 數學系、國立台灣大學 統計碩士",
    "教育經驗：20+ 年數學教育經驗，深諳台灣升學制度與學生學習痛點",
    "創業動機：長年觀察到數學教育的結構性問題，決心以科技手段實現教育平等化",
    "核心職責：產品策略、教育內容設計、商業發展、市場推廣",
  ]},
  { h3: "石亞喬（Rachel）— CPTO（技術長暨產品長）" },
  { bullets: [
    "學歷：輔仁大學 數學系、國立台北大學 統計碩士",
    "技術專長：AI/ML、大型語言模型 Fine-tuning、數據分析、全端開發",
    "產品經驗：具備從概念到產品上線的完整經驗，擅長將教育需求轉化為技術方案",
    "核心職責：AI 模型訓練、平台架構設計、產品開發、技術團隊管理",
  ]},
  { h2: "8.2 團隊互補性" },
  { table: {
    h: ["能力維度", "Bennie（創辦人）", "Rachel（CPTO）"],
    r: [
      ["數學專業", "清大數學 + 台大統計", "輔大數學 + 北大統計"],
      ["核心優勢", "教育洞察 + 商業策略", "AI 技術 + 產品開發"],
      ["經驗年資", "20+ 年教育領域", "AI/ML 技術深耕"],
      ["角色定位", "What to build", "How to build"],
    ],
    w: [2000, 3500, 3500]
  }},
  { p: "兩位共同創辦人皆具備數學與統計的雙重學術背景，且分別在教育端（Bennie）與技術端（Rachel）擁有深厚經驗，形成高度互補的組合。" },
  { h2: "8.3 未來招聘計畫" },
  { table: {
    h: ["時程", "職位", "人數", "優先順序"],
    r: [
      ["Year 1 Q1-Q2", "全端工程師", "1", "最高"],
      ["Year 1 Q3", "AI/ML 工程師", "1", "高"],
      ["Year 1 Q4", "內容編輯（數學教師）", "1", "中"],
      ["Year 2", "行銷專員 / 客戶成功", "1-2", "依成長狀況"],
    ],
    w: [2000, 2500, 1200, 2000]
  }},
];
// ========== CHAPTER 9 ==========
const ch9 = [
  { h1: "第九章　財務規劃" },
  { h2: "9.1 NT$300 萬資金分配計畫" },
  { table: {
    h: ["類別", "金額", "比例", "用途說明"],
    r: [
      ["產品開發", "NT$225 萬", "75%", "AI 模型訓練、平台開發、伺服器與 API 費用、外包開發人力"],
      ["內容建置", "NT$30 萬", "10%", "題庫建置、課綱對齊內容編輯、視覺化教材製作"],
      ["行銷推廣", "NT$30 萬", "10%", "KOL 合作、教育展攤位、數位廣告、社群經營"],
      ["營運管理", "NT$15 萬", "5%", "法務、會計、辦公設備、雜支"],
    ],
    w: [1500, 1500, 1000, 5000]
  }},
  { h2: "9.2 三年財務預測" },
  { table: {
    h: ["項目", "Year 1", "Year 2", "Year 3"],
    r: [
      ["免費用戶", "10,000", "50,000", "150,000"],
      ["付費用戶", "500", "2,500", "8,000"],
      ["付費轉換率", "5%", "5%", "5.3%"],
      ["ARPU（年）", "NT$5,880", "NT$6,500", "NT$7,200"],
      [{ t: "營收", b: true }, { t: "NT$180 萬", b: true }, { t: "NT$800 萬", b: true }, { t: "NT$2,200 萬", b: true }],
      ["人事成本", "NT$120 萬", "NT$360 萬", "NT$720 萬"],
      ["伺服器/API", "NT$60 萬", "NT$150 萬", "NT$350 萬"],
      ["行銷費用", "NT$80 萬", "NT$120 萬", "NT$200 萬"],
      ["其他營運", "NT$40 萬", "NT$50 萬", "NT$80 萬"],
      [{ t: "總成本", b: true }, { t: "NT$300 萬", b: true }, { t: "NT$680 萬", b: true }, { t: "NT$1,350 萬", b: true }],
      [{ t: "淨利", b: true }, { t: "(NT$120 萬)", b: true, color: "CC0000" }, { t: "NT$120 萬", b: true, color: "008800" }, { t: "NT$850 萬", b: true, color: "008800" }],
    ],
    w: [2000, 2200, 2200, 2200]
  }},
  { p: "Year 1 以創業支持金 NT$300 萬支撐開發與初期營運，預期淨虧損 NT$120 萬。Year 2 隨付費用戶規模成長，營收突破 NT$800 萬並實現盈利。Year 3 進入規模化階段，營收達 NT$2,200 萬，淨利 NT$850 萬。" },
  { h2: "9.3 盈虧平衡分析" },
  { p: "預計在第 15-16 個月達到月度盈虧平衡。以 ARPU NT$600/月計算，當月付費用戶達到約 420 人時，月營收（NT$252,000）即可覆蓋月度營運成本（約 NT$250,000）。以目前規劃的用戶成長曲線，此目標具備高度可行性。" },
  { h2: "9.4 三項量化成果指標（KPI）" },
  { table: {
    h: ["KPI", "Year 1 目標", "衡量方式"],
    r: [
      ["付費用戶數", "500 人", "Stripe 訂閱後台即時追蹤"],
      ["週活躍用戶率（WAU）", "30%", "平台使用數據分析"],
      ["營收", "NT$180 萬", "財務報表"],
    ],
    w: [2500, 2500, 4000]
  }},
  { h2: "9.5 關鍵 SaaS 指標" },
  { table: {
    h: ["指標", "Year 1", "Year 2", "Year 3"],
    r: [
      ["MRR", "NT$15 萬", "NT$67 萬", "NT$183 萬"],
      ["ARR", "NT$180 萬", "NT$800 萬", "NT$2,200 萬"],
      ["月流失率", "5%", "4%", "3.5%"],
      ["CLTV", "NT$12,000", "NT$15,000", "NT$18,000"],
      ["CAC", "NT$4,000", "NT$3,500", "NT$3,000"],
      ["CLTV/CAC", "3.0x", "4.3x", "6.0x"],
      ["毛利率", "80%", "82%", "85%"],
    ],
    w: [2000, 2200, 2200, 2200]
  }},
];
// ========== CHAPTER 10 ==========
const ch10 = [
  { h1: "第十章　里程碑與風險管理" },
  { h2: "10.1 十二個月發展路線圖" },
  { table: {
    h: ["月份", "里程碑", "關鍵交付物"],
    r: [
      ["M1-M2", "產品規劃與技術架構", "PRD 完成、技術架構確定、AI 模型初步訓練"],
      ["M3-M4", "MVP 開發", "核心 AI 對話 + 基礎題庫 + 視覺化引擎 Alpha"],
      ["M5-M6", "Beta 測試", "50 名種子用戶測試、收集回饋、迭代優化"],
      ["M7-M8", "公開上線", "正式上線 + 免費方案推出 + 首波行銷"],
      ["M9-M10", "付費啟動", "Standard/Premium 方案上線 + 第一批付費用戶"],
      ["M11-M12", "規模成長", "達成 500 付費用戶 + 學校端試辦合作啟動"],
    ],
    w: [1500, 2500, 5000]
  }},
  { h2: "10.2 風險識別與對策" },
  { table: {
    h: ["風險", "影響", "發生機率", "對策"],
    r: [
      ["AI 模型準確度不足", "高", "中", "持續收集教師回饋進行 Fine-tuning，建立人工審核機制"],
      ["用戶獲取速度低於預期", "高", "中", "多元獲客管道（KOL + 學校 + SEO + 社群），快速測試並優化轉換漏斗"],
      ["付費轉換率偏低", "高", "中高", "強化免費到付費的 Aha Moment 設計，A/B 測試定價與功能組合"],
      ["資金不足", "極高", "低", "嚴控燃燒率，積極申請政府補助與加速器，保留 3 個月現金緩衝"],
      ["競爭者進入", "中", "中", "持續深化視覺化引擎與課綱數據壁壘，建立用戶黏著度"],
    ],
    w: [2000, 1000, 1200, 4800]
  }},
  { h2: "10.3 願景" },
  { p: "Mathify 的長期願景是成為華語圈最值得信賴的 AI 數學學習平台。我們相信，每一位學生都應該擁有一位耐心、專業、24 小時陪伴的數學家教——不受地理位置、家庭經濟狀況的限制。透過 AI 技術的力量，Mathify 致力於讓優質的數學教育真正普及化，縮小城鄉教育差距，幫助每一位學生發掘自己的數學潛能。" },
  { p: [{ t: "「讓每位學生都能看見數學的美。」", b: true, size: 28, color: C1 }] },
];

// ========== ASSEMBLY ==========
const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10];
const mainChildren = [];
for (let i = 0; i < chapters.length; i++) {
  if (chapters[i].length > 0) {
    mainChildren.push(...render(chapters[i]));
    if (i < chapters.length - 1) mainChildren.push(new Paragraph({ children: [new PageBreak()] }));
  }
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", run: { size: 32, bold: true, color: C1, font: FONT }, paragraph: { spacing: { before: 360, after: 240 } } },
      { id: "Heading2", name: "Heading 2", run: { size: 28, bold: true, color: C2, font: FONT }, paragraph: { spacing: { before: 240, after: 180 } } },
      { id: "Heading3", name: "Heading 3", run: { size: 24, bold: true, color: C2, font: FONT }, paragraph: { spacing: { before: 180, after: 120 } } },
    ]
  },
  numbering: { config: numConfig },
  sections: [
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 2880, bottom: 1440, left: 1440, right: 1440 } } },
      children: coverChildren,
    },
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "Mathify 商業計畫書", font: FONT, size: 18, color: "999999" })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["\u2014 ", PageNumber.CURRENT, " \u2014"], font: FONT, size: 18, color: "999999" })] })] }) },
      children: mainChildren,
    }
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(__dirname + "/Mathify_商業計畫書.docx", buf);
  console.log("Done! Generated Mathify_商業計畫書.docx");
});
