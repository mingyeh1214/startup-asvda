# RevisionDojo 競品研究報告

> Mathify 產品對標分析：RevisionDojo (IB) → Mathify (台灣國高中數學)

---

## 一、公司概況

| 項目 | RevisionDojo | Mathify (對照) |
|------|-------------|---------------|
| 成立年份 | 2023 | 2025 |
| 原名 | StudyDojo | — |
| 創辦團隊 | Bowen Liu (CEO)、Michael Tong (CTO, 19歲, Stanford CS)、Janet Liu (COO) | 劉明燁 (創辦人, 清大數學/台大統計)、石亞喬 (CPTO, 輔大數學/北大統計) |
| 加速器 | Y Combinator (W2024 → F2024) | — |
| 融資 | $3.4M 種子輪 | 申請 NT$300 萬創業支持金 |
| 團隊規模 | ~10 人 | 2 人（核心團隊） |
| 用戶數 | 350,000+ 免費用戶 | 尚未上線 |
| 付費用戶 | 2,000+（mid-six figure ARR） | 目標第一年 500 人 |
| 覆蓋國家 | 180+ | 台灣（Phase 1） |
| 合作學校 | 2,500+ | 尚未開始 |
| NPS | 75+ | — |
| 週成長率 | 13% | — |

---

## 二、產品架構深度分析

### RevisionDojo 核心學習迴圈（四大模組）

```
內容交付 → 練習 → 回饋 → 模擬考
(Study Notes)  (Questionbank)  (Jojo AI)  (Exam Mode)
```

### 完整功能清單

| 功能模組 | 說明 | Mathify 可借鏡程度 |
|---------|------|-----------------|
| **Study Notes** | 全科目考官撰寫、大綱對齊的學習筆記（化學 237 章、生物 623 章） | ★★★★★ 必須有，對齊台灣各版本教材 |
| **Questionbank** | 35,000+ 題庫，附標準答案回饋 | ★★★★★ 核心功能 |
| **Jojo AI** | 24/7 AI 家教，Fine-tuned on IB mark schemes，可辨識圖形、批改手寫 | ★★★★★ Mathify 的核心差異化（視覺化解題） |
| **Exam Mode** | 計時模擬考，考後即時診斷分析 | ★★★★☆ 可做會考/段考模擬 |
| **Test Builder** | 自訂測驗，可列印/線上作答 | ★★★☆☆ 教師端功能 |
| **Coursework Grader** | AI 批改 IA/EE/TOK 作業，48 小時內刪除檔案 | ★★☆☆☆ 台灣較不需要（無 IB 式 coursework） |
| **Flashcards** | 間隔重複記憶卡，AI 生成 | ★★★☆☆ 公式記憶卡可考慮 |
| **Grade Calculator** | IB 成績計算器 | ★★☆☆☆ 可改為會考/學測成績預測器 |
| **Predicted Papers** | AI 預測考題 | ★★★★☆ 台灣考前猜題功能 |
| **Exemplars** | 高分範例作答 | ★★★★☆ 標準解題示範 |
| **Plagiarism/AI Detection** | 抄襲/AI 偵測 | ★☆☆☆☆ B2C 階段不需要 |

### Jojo AI 技術細節

- **底層模型**：基於強大基礎模型（推測 GPT-4 等級），Fine-tuned on proprietary dataset
- **訓練資料**：特定課綱內容、官方考題、高分學生作品、詳細評分標準
- **能力**：
  - 課綱感知的解釋與教學
  - 圖形辨識與批改（包含手寫）
  - 針對性練習題生成
  - 角色扮演考試準備情境
  - 即時回饋整合至所有平台工具
- **定位**：形成性學習（formative learning），非正式評量

---

## 三、定價策略分析

### RevisionDojo 定價

| 方案 | 月費 | 2 年費用 | 定位 |
|------|------|--------|------|
| **Free** | $0 | $0 | 新用戶體驗，所有科目 + Jojo AI 基本存取 + 無限練習 |
| **Plus** | $17/月 | $408 | 日常自主學習，解鎖無限筆記與 AI |
| **Pro** | $19/月 | $456 | 作業批改、預測卷、影片、範例，考試衝刺 |
| **Schools** | 教師免費 | — | 學校端，批量批改、分析儀表板 |
| **Tutoring** | $29/小時 | — | 真人家教，平台抽成 0% |

### 對 Mathify 定價策略的啟示

- RevisionDojo 的 **Free 方案非常慷慨**（無限練習 + AI 基本存取），這是獲客關鍵
- Plus ($17/月 ≈ NT$550) 與 Mathify 的 NT$600/月 非常接近
- **建議 Mathify 參考的定價架構**：

| Mathify 方案 | 建議月費 | 功能 |
|-------------|--------|------|
| **Free** | $0 | 每日有限次 AI 對話 + 部分題庫 + 基本筆記 |
| **Standard** | NT$490/月 | 無限 AI 對話 + 完整題庫 + 全部筆記 |
| **Premium** | NT$690/月 | 模擬考 + 學習報告 + 預測考題 + 迷你課程 |

---

## 四、用戶評價分析

### Trustpilot 評分：4.1/5（137 則評論）

### 用戶最喜歡的（Mathify 必須做到的）
1. **一站式整合** — 教科書、閃卡、題庫、測驗全在一個地方
2. **AI 個人化解釋** — 針對課綱的即時解答
3. **明顯的成績提升** — 有用戶從 3-4 分進步到滿分 7
4. **讓學習變有趣** — 比其他資源更有參與感
5. **性價比高** — 比 Revision Village 等競品便宜

### 用戶最不滿的（Mathify 必須避免的）
1. **客服回應慢** — 數月無回覆（最大痛點）
2. **付費後無法存取** — 帳號/訂閱問題
3. **AI 數學準確度不足** — 特別是在 IA 開發階段提供錯誤數學內容
4. **內容不完整** — 許多主題筆記尚未完成
5. **定價透明度低** — 促銷價格常變動、續約條款不清楚

### Mathify 的機會
- **RevisionDojo 的 AI 數學弱點 = Mathify 的最大機會**
- Mathify 專注數學 + Fine-tuned LLM + 視覺化引擎，可以在數學解題準確度上大幅超越
- 客服品質是差異化的低垂果實

---

## 五、RevisionDojo 商業模式解構

### 營收來源
1. **B2C 訂閱**：Free → Plus → Pro（主要營收）
2. **B2B2C 學校端**：教師免費，學生 10% 折扣（獲客通道）
3. **Tutoring**：$29/小時真人家教，0% 抽成（平台黏著度）

### 關鍵成長指標
- 2,000+ 付費用戶 × 估計 ARPU $200-300/年 = mid-six figure ARR ($400K-$600K)
- 350,000 免費用戶，付費轉換率約 **0.6%**
- 13% 週成長率（非常強勁）
- NPS 75+（世界級水準）

### 增長飛輪
```
免費題庫（無限練習）
     ↓
學生體驗 AI 回饋的價值
     ↓
升級 Plus/Pro 解鎖深度功能
     ↓
學校教師免費帳號 → 推薦給學生
     ↓
口碑傳播 + 社群（140K+ 成員）
     ↓
更多數據 → AI 更精準 → 更好體驗
```

---

## 六、Mathify vs RevisionDojo 差異化定位

| 維度 | RevisionDojo | Mathify |
|------|-------------|---------|
| **市場** | 全球 IB 學生（180+ 國家） | 台灣國高中學生（108 萬人） |
| **科目** | 21 個 IB 科目全覆蓋 | 專注數學（深度 > 廣度） |
| **AI 核心** | Fine-tuned on IB mark schemes | Fine-tuned LLM + **視覺化解題引擎**（TikZ/Desmos） |
| **差異化** | 全科目一站式 + 作業批改 | **數學視覺化**：將抽象概念變成動態圖形 |
| **課綱** | IB Diploma Programme | 台灣 108 課綱（康軒/南一/翰林） |
| **語言** | 英文 | 繁體中文 |
| **定價** | $17-19/月（~NT$550-620） | NT$490-690/月（建議） |
| **在地化** | 全球化但無深度在地化 | 深度在地化（台灣升學制度、會考/學測/指考） |

### Mathify 的不可替代優勢
1. **視覺化解題**：RevisionDojo 的 Jojo AI 仍以文字為主，Mathify 的 TikZ/Desmos 視覺化是獨有的
2. **數學專精**：RevisionDojo 做 21 科但數學 AI 準確度被用戶批評，Mathify 只做數學可以做到極致
3. **台灣課綱深度對齊**：108 課綱、各版本教材、會考/學測/指考題型
4. **繁體中文原生**：非翻譯，而是以中文思維設計的數學教學邏輯

---

## 七、從 RevisionDojo 學到的商業計畫書撰寫啟示

### 在商業計畫書中應強調的
1. **RevisionDojo 驗證了模式可行** — AI 教育 SaaS 的 Freemium 模式已被 YC 認可、$3.4M 融資證明
2. **引用 RevisionDojo 作為模式參照** — 但強調 Mathify 的差異化（數學專精 + 視覺化 + 台灣在地化）
3. **免費方案是獲客關鍵** — RevisionDojo 35 萬免費用戶才轉出 2,000 付費用戶
4. **學校端是重要通路** — 2,500 校合作帶來 B2B2C 增長
5. **AI 數學準確度是痛點** — Mathify 有機會在這個維度勝出

### 財務預測可參考的基準
- RevisionDojo 在成立約 2 年後達到 mid-six figure ARR
- 免費到付費轉換率約 0.6%（Mathify 目標 6% 可能偏高，建議下調至 2-3%）
- B2C 教育 SaaS 的 ARPU 約 $200-300/年

---

## 八、參考來源

- https://www.ycombinator.com/companies/revisiondojo
- https://llms.revisiondojo.com/revisiondojo-overview-2025
- https://llms.revisiondojo.com/pricing-feature-map
- https://www.trustpilot.com/review/revisiondojo.com
- https://www.revisiondojo.com/fundraise
- https://topai.tools/t/revisiondojo
