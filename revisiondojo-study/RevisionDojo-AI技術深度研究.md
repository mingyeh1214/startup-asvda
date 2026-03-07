# RevisionDojo AI 技術與功能深度研究報告

> 研究日期：2026-03-05

## 目錄

- [1. 公司背景與 AI 定位](#1-公司背景與-ai-定位)
- [2. Jojo AI — 核心 AI 引擎](#2-jojo-ai--核心-ai-引擎)
  - [2.1 技術基礎](#21-技術基礎)
  - [2.2 課綱調校（Curriculum Tuning）](#22-課綱調校curriculum-tuning)
  - [2.3 即時問答與對話式學習](#23-即時問答與對話式學習)
  - [2.4 即時批改與 Mark Scheme 對齊](#24-即時批改與-mark-scheme-對齊)
  - [2.5 圖表分析與批改](#25-圖表分析與批改)
  - [2.6 互動式學習工具](#26-互動式學習工具)
- [3. 自適應學習系統](#3-自適應學習系統)
  - [3.1 診斷測驗（Diagnostic Quiz）](#31-診斷測驗diagnostic-quiz)
  - [3.2 自適應間隔閃卡](#32-自適應間隔閃卡)
  - [3.3 動態學習節奏（Dynamic Pacing）](#33-動態學習節奏dynamic-pacing)
  - [3.4 智慧推薦引擎](#34-智慧推薦引擎)
- [4. AI 作業批改系統（Coursework Grader）](#4-ai-作業批改系統coursework-grader)
  - [4.1 運作流程](#41-運作流程)
  - [4.2 回饋生成機制](#42-回饋生成機制)
  - [4.3 準確度與限制](#43-準確度與限制)
- [5. AI 測驗產生器（Test Builder）](#5-ai-測驗產生器test-builder)
- [6. AI 抄襲與 AI 內容偵測](#6-ai-抄襲與-ai-內容偵測)
- [7. 預測卷生成（Predicted Papers）](#7-預測卷生成predicted-papers)
- [8. Jojo AI vs 通用 AI 模型比較](#8-jojo-ai-vs-通用-ai-模型比較)
- [9. 學校端 AI 功能](#9-學校端-ai-功能)
- [10. 隱私與資料安全架構](#10-隱私與資料安全架構)
- [11. 商業數據與融資](#11-商業數據與融資)
- [12. 技術架構推測與分析](#12-技術架構推測與分析)
- [13. 資料來源](#13-資料來源)

---

## 1. 公司背景與 AI 定位

- **前身：** StudyDojo，後改名為 RevisionDojo
- **加速器：** Y Combinator Fall 2024 (F24) 批次畢業
- **融資：** 種子輪 $3.4M，投資者包括 Y Combinator、468 Capital、Goodwater Capital、Amino Capital
- **團隊：** 創辦人 Bowen、Michael、Janet
- **用戶規模：** 500,000+ 學生（持續增長中）
- **成長速度：** 加入 YC 後曾達週成長 13%，穩定維持 10% 週成長率
- **付費用戶：** 2,000+ 付費客戶，年經常性收入（ARR）達六位數美元

**核心定位：** RevisionDojo 自我定義為「AI-first learning platform」——AI 不是後加的功能，而是整個產品的設計起點。平台的每一個學習工具（題庫、筆記、閃卡、模考）都圍繞 Jojo AI 建構。

---

## 2. Jojo AI — 核心 AI 引擎

Jojo AI 是 RevisionDojo 的中央 AI 系統，貫穿平台所有功能模組。

### 2.1 技術基礎

| 項目 | 已知資訊 |
|------|---------|
| **底層模型** | 未公開披露具體模型（未明確使用 GPT、Claude 或自訓練模型） |
| **訓練資料** | 「數千個課綱專屬資料集」（curriculum-specific datasets），非通用網路文本 |
| **專有性** | 使用「proprietary datasets and the latest AI algorithms」 |
| **微調方式** | 在大規模專有課綱素材上進行 fine-tuning |
| **知識範圍** | 限定在 IB 課綱範圍內，不回答無關問題 |

**關鍵特徵：** Jojo AI 不是一個「套殼 ChatGPT」的包裝。根據其官方研究頁面，他們對 Jojo AI 分別與 ChatGPT (GPT 5.2)、Claude (Sonnet 4)、Gemini 3、Perplexity (Sonar)、Poe 進行了對比評測，暗示 Jojo 可能是基於某個基礎模型進行深度客製化，或是結合多個模型的混合架構。

### 2.2 課綱調校（Curriculum Tuning）

Jojo AI 的核心差異化在於其課綱調校機制：

```
通用 LLM（如 ChatGPT）           Jojo AI（課綱調校後）
        ↓                              ↓
  回答基於通用知識               回答基於 IB 課綱標準
  可能偏離考試要求               對齊 Mark Scheme 評分標準
  不理解 Command Terms           理解並應用 Command Terms
  給完整答案                     引導式教學（Socratic method）
```

**調校維度：**
- **Mark Scheme 對齊：** 所有回饋都基於官方 IB 評分標準，而非通用知識
- **Command Terms 感知：** 理解 IB 特有的命令詞（evaluate、discuss、analyze 等），並據此調整回答深度與格式
- **考官視角：** 模擬 IB 考官的評分思維方式
- **教學法設計：** 不直接給答案，而是引導學生理解（pedagogical approach）

### 2.3 即時問答與對話式學習

Jojo AI 的對話功能不同於一般聊天機器人：

- **24/7 全天候可用：** 隨時可向 AI 提問
- **自然語言輸入：** 學生可用自然語言描述問題
- **追問機制：** AI 會提出後續問題加深學生理解
- **考試導向回答：** 提供精簡、考試聚焦的答案，附帶策略性標註（strategic callouts）
  - 標記常見錯誤（critical mistakes）
  - 標記關鍵洞察（key insights）
  - 標記範例用法（examples）
- **多語言支援：** 支援 10+ 語言的口語練習（用於 Individual Oral）

### 2.4 即時批改與 Mark Scheme 對齊

這是 Jojo AI 最核心的技術能力：

1. **學生提交答案**（文字輸入或圖片上傳）
2. **AI 解析答案結構**，比對 Mark Scheme 標準
3. **生成逐步回饋：**
   - 逐分數點對應（mark-point breakdown）
   - 指出得分點與失分點
   - 解釋「為什麼」這樣評分
   - 提供改進建議
4. **自適應調整：** 根據批改結果，推薦下一道練習題

### 2.5 圖表分析與批改

Jojo AI 支援視覺內容處理：

- **圖表上傳批改：** 學生可上傳手繪或數位圖表，AI 即時批改
- **可操作圖表：** 在聊天中生成可縮放、平移的互動式圖表
- **數學公式渲染：** 使用 KaTeX 渲染數學公式與方程式

### 2.6 互動式學習工具

Jojo AI 聊天中可直接生成互動元素（這是與 ChatGPT 的主要差異）：

| 功能 | Jojo AI | ChatGPT |
|------|---------|---------|
| **閃卡** | 在聊天中生成可翻轉的互動閃卡組 | 純文字輸出，需複製到外部工具 |
| **測驗** | 在聊天中生成可導航的互動測驗，含即時評分 | 靜態文字，需手動檢查 |
| **圖表** | 可縮放、平移的互動圖表 | 靜態圖片 |
| **程式碼** | 可在聊天中直接執行程式碼 | 需複製到外部環境 |

---

## 3. 自適應學習系統

RevisionDojo 的自適應系統是其 AI 技術的第二大支柱，負責個人化學習路徑。

### 3.1 診斷測驗（Diagnostic Quiz）

- **入口功能：** 新用戶透過診斷測驗建立初始學習檔案
- **偵測內容：** 辨識各主題的強弱項與知識缺口（topic gaps）
- **輸出結果：** 生成個人化的學習優先級排序

### 3.2 自適應間隔閃卡

```
答對 → 間隔拉長（如 1天 → 3天 → 7天 → 14天）
答錯 → 間隔縮短（立即重複 → 1天 → 3天）
       + 標記為弱項，增加相關題目
```

- **演算法基礎：** 間隔重複（Spaced Repetition），類似 Anki 的 SM-2 演算法概念
- **AI 增強：** 閃卡組由 AI 自動生成，難度自動調整
- **弱項強化：** 系統自動增加學生弱項相關的閃卡比例

### 3.3 動態學習節奏（Dynamic Pacing）

- **每日學習計畫：** AI 根據學生的可用時間與目標分數，規劃每日學習量
- **防過載機制：** 避免學生在單一主題花費過多時間
- **進度追蹤：** 即時監控學習進度，動態調整計畫

### 3.4 智慧推薦引擎

AI 推薦引擎根據以下訊號決定「下一步學什麼」：

| 訊號類型 | 說明 |
|---------|------|
| **答題表現** | 各主題的正確率與得分率 |
| **弱項偵測** | 反覆答錯的主題自動提升優先級 |
| **已掌握主題** | 高正確率主題自動降低推薦頻率 |
| **模考成績** | 模擬考試的各主題得分明細 |
| **學習目標** | 學生設定的目標分數與考試日期 |

---

## 4. AI 作業批改系統（Coursework Grader）

這是 RevisionDojo Pro 方案的旗艦 AI 功能，針對 IB 作業（IA/EE/TOK）提供考官級批改。

### 4.1 運作流程

```
步驟 1: 上傳 PDF（≤10 MB）
        ↓
步驟 2: 選擇作業類型（IA / EE / TOK）
        ↓
步驟 3: 選擇科目、級別（SL/HL）、評分標準類型
        ↓
步驟 4: AI 分析 ───→ 生成多層次回饋
        ↓
步驟 5: 可選 ─ 與 Jojo AI 進行後續對話
               （深度改寫建議、引用驗證、結構優化）
        ↓
步驟 6: 修改後重新提交 → 無限次數迭代
```

### 4.2 回饋生成機制

AI 批改系統產生四層回饋：

| 層次 | 內容 | 說明 |
|------|------|------|
| **第一層：行內標註** | Inline Annotations | 直接在文件中標記，綁定對應的評分標準段落 |
| **第二層：標準逐項分析** | Criterion-Level Breakdown | 每個評分標準（Criterion）的分數帶對齊、強項辨識、改進目標 |
| **第三層：總結報告** | Summary Report | 整體表現評估 + 「下一稿前應採取的行動」清單 |
| **第四層：AI 後續對話** | Jojo AI Follow-ups | 可與 AI 對話進行深度改寫、引用查核、結構調整 |

**Rubric 對齊方法：**
- AI 模型基於「數千份 IB 標準回應」進行訓練
- 對照真實 rubric 解讀進行校準（calibrated against real rubric interpretations）
- 可與高分範例（high-scoring exemplars）進行比較分析
- 根據各標準表現生成個人化改進路徑

### 4.3 準確度與限制

| 面向 | 說明 |
|------|------|
| **用戶反饋** | Trustpilot 評論顯示，多數學生 IA 草稿經 AI 批改後，最終成績誤差在 1-2 分以內 |
| **學科差異** | 人文學科與 TOK 作文的 AI 評分通常偏高於最終教師評分 |
| **官方聲明** | 「最終成績由學校和考官決定」——AI 輸出僅為諮詢性質 |
| **邊界情況** | 「任何 AI 系統在邊界情況、細微解讀題目時都可能出錯」 |
| **精確學科** | HL 數學等高精度學科需與標準解答交叉驗證 |
| **長篇文章** | 長篇論文的評分被視為「估計值」（estimates） |

---

## 5. AI 測驗產生器（Test Builder）

| 項目 | 說明 |
|------|------|
| **自訂維度** | 科目 → 試卷（Paper）→ 主題（Topics）→ 題數 |
| **題型支援** | 選擇題（MCQ）與論述題（Written Questions） |
| **輸出格式** | 可下載 PDF（含 Mark Scheme）或線上即時作答 |
| **AI 整合** | 線上作答時，Jojo AI 提供即時逐題回饋 |
| **應用場景** | 針對弱項組卷、模擬考試練習、考前衝刺 |

---

## 6. AI 抄襲與 AI 內容偵測

RevisionDojo 提供雙重偵測功能（Pro 限定）：

- **抄襲偵測（Plagiarism Detection）：** 檢查作業是否包含未標註的引用或抄襲內容
- **AI 內容偵測（AI Content Detection）：** 辨識作業中由 AI 生成的文字段落
- **用途定位：** 幫助學生在提交前自我檢查，確保學術誠信
- **學校端整合：** 教師可透過學校管理介面查看學生的 AI 使用分析

> 技術細節未公開——未說明使用的偵測演算法、準確率或誤判率。

---

## 7. 預測卷生成（Predicted Papers）

- **撰寫者：** 資深 IB 考官（非純 AI 生成）
- **內容：** 模擬考試風格的題目 + Mark Scheme + 範例解答
- **覆蓋科目：** 包含 IB Math AA、English Lang & Lit 等主要科目
- **AI 輔助：** 可搭配 Jojo AI 即時批改，模擬真實考試體驗
- **存取權限：** 部分免費，完整版需 Pro 方案

---

## 8. Jojo AI vs 通用 AI 模型比較

RevisionDojo 在其研究頁面（2026 年 1 月發表）進行了 Jojo AI 與五大通用 AI 的對比研究：

### 比較對象

| 對比模型 | 版本 |
|---------|------|
| ChatGPT | GPT 5.2 |
| Claude | Sonnet 4 |
| Gemini | Gemini 3 |
| Perplexity | Sonar |
| Poe | — |

### 主要差異總結

| 維度 | Jojo AI | 通用 AI（以 ChatGPT 為代表） |
|------|---------|---------------------------|
| **知識範圍** | 限定 IB 課綱，精準但窄 | 通用知識，廣但不精準 |
| **回答風格** | 考試導向、精簡、標記重點 | 通用回答、可能過於冗長 |
| **教學法** | 引導式教學，不直接給答案 | 傾向直接給最終解答 |
| **評分對齊** | 對齊 IB Mark Scheme | 基於通用標準 |
| **互動工具** | 內嵌閃卡、測驗、互動圖表 | 純文字輸出 |
| **可操作性** | 所有工具整合在平台內 | 需複製到外部工具使用 |
| **後續追蹤** | 記錄表現、調整學習路徑 | 無持續追蹤機制 |

> 注意：RevisionDojo 的對比研究為**定性比較**（功能差異），未提供量化基準測試數據（如準確率分數對比）。

---

## 9. 學校端 AI 功能

RevisionDojo 為學校提供專屬的 AI 管理與監控工具：

### 教師 AI 工具

| 功能 | 說明 |
|------|------|
| **批量批改（Bulk Grader）** | 教師可一次上傳多份作業進行 AI 批量批改 |
| **成績匯出** | 批改結果可匯出用於校內統合評分（moderation）與報告 |
| **IA/EE 規劃器** | AI 輔助的作業規劃工具 |
| **AI 使用分析** | 查看學生如何使用 AI 工具，監控學術誠信 |

### 學校政策整合

- **學術誠信邊界：** 明確禁止學生使用 AI 生成或大幅改寫作業內容
- **AI 用途限制：** 平台設計為「延伸教師能力」，非取代教師判斷
- **政策對齊：** 鼓勵學校將自身的 AI 與學術誠信政策告知學生
- **IB 合規：** 平台設計符合 IB 及學校特定要求

### 定位聲明

> 「平台旨在擴展教師在練習、回饋與差異化教學上的能力，而非取代專業判斷或課堂關係。」

---

## 10. 隱私與資料安全架構

RevisionDojo 在 AI 功能上的隱私設計值得關注：

| 項目 | 措施 |
|------|------|
| **資料保留** | 上傳至 Coursework Grader 的檔案在 48 小時內刪除 |
| **模型訓練** | 明確聲明「不使用用戶資料訓練模型」 |
| **合規標準** | GDPR 合規 |
| **身分驗證** | SSO / 2FA |
| **資料最小化** | 僅收集必要個人識別資訊（PII），不收集信用卡或健康資訊 |
| **Cookie 政策** | 零行銷 cookies |
| **加密** | 加密遠端存取 |

---

## 11. 商業數據與融資

| 指標 | 數據 |
|------|------|
| 種子輪融資 | $3.4M |
| 投資者 | Y Combinator, 468 Capital, Goodwater Capital, Amino Capital |
| 加速器 | Y Combinator F24 |
| 全球學生數 | 500,000+（持續增長中） |
| 付費客戶 | 2,000+ |
| ARR | 六位數美元（mid-six figure） |
| 週成長率 | 10%（高峰期 13%） |

---

## 12. 技術架構推測與分析

基於公開資訊，以下為技術架構的推測性分析：

### 前端技術

- **框架：** Next.js（從頁面原始碼確認）
- **數學渲染：** KaTeX（從字體載入確認）
- **身分驗證：** WorkOS（從認證重導向確認）

### AI 架構推測

```
┌─────────────────────────────────────────────────────┐
│                    用戶介面層                          │
│         Next.js + KaTeX + 互動元件                    │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                  AI 中間層                            │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│    │ 課綱知識庫 │  │Mark Scheme│  │ 範例庫   │         │
│    │  (RAG?)  │  │ 評分規則  │  │ Exemplars│         │
│    └────┬─────┘  └─────┬────┘  └─────┬────┘         │
│         └──────────┬───┘─────────────┘              │
│                    │                                 │
│         ┌──────────▼──────────┐                      │
│         │  Prompt Engineering  │                      │
│         │  + Fine-tuned Model  │                      │
│         └──────────┬──────────┘                      │
└────────────────────┼────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              基礎模型層                               │
│     可能方案：                                        │
│     A) 單一基礎模型 fine-tune（如 GPT/Claude）         │
│     B) 多模型路由（不同任務用不同模型）                  │
│     C) 自訓練模型 + 基礎模型混合                       │
└─────────────────────────────────────────────────────┘
```

### 推測依據

1. **可能使用 RAG（Retrieval-Augmented Generation）：** 平台強調「課綱專屬資料集」，很可能使用 RAG 架構，將 IB 課綱、Mark Scheme、範例答案作為檢索知識庫
2. **可能非單一模型：** 與五種不同 AI 模型進行對比研究，暗示團隊深入了解多種模型的特性，可能在不同場景使用不同模型
3. **WorkOS 認證：** 使用 WorkOS 處理 SSO/2FA，這是一個企業級認證服務
4. **互動元件系統：** Jojo AI 能在聊天中渲染互動閃卡、測驗、圖表等，暗示有一套自訂的元件渲染系統（非標準 Markdown 輸出）

---

## 13. 資料來源

- [Jojo AI 功能頁面](https://www.revisiondojo.com/feature/jojo)
- [Jojo AI 準確度與隱私深度分析](https://llms.revisiondojo.com/jojo-ai-ib-accuracy-privacy)
- [IB 作業批改器](https://llms.revisiondojo.com/ib-coursework-grader)
- [Jojo AI 對話功能](https://www.revisiondojo.com/blog/jojo-ai-conversation-features-interactive-learning-experience)
- [Jojo AI vs ChatGPT 研究](https://www.revisiondojo.com/research/jojo-eval/gpt)
- [RevisionDojo 研究頁面](https://www.revisiondojo.com/research)
- [自適應學習說明](https://www.revisiondojo.com/blog/adaptive-ib-learning-how-ai-personalizes-your-education)
- [智慧推薦系統](https://www.revisiondojo.com/blog/smart-ib-study-recommendations-ai-suggests-what-to-learn-next)
- [AI 抄襲偵測](https://www.revisiondojo.com/checker)
- [Test Builder](https://www.revisiondojo.com/feature/test-builder)
- [預測卷](https://www.revisiondojo.com/papers)
- [學校端 AI 使用](https://www.revisiondojo.com/schools/ai-usage)
- [融資公告](https://www.revisiondojo.com/fundraise)
- [Y Combinator 頁面](https://www.ycombinator.com/companies/revisiondojo)
- [定價與功能對比](https://llms.revisiondojo.com/pricing-feature-map)
