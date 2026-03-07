# RevisionDojo 功能設計架構研究報告

> 研究日期：2026-03-05

## 目錄

- [1. 平台概覽](#1-平台概覽)
- [2. 數學項目服務內容](#2-數學項目服務內容)
  - [2.1 課程分類](#21-課程分類)
  - [2.2 題庫系統（Questionbank）](#22-題庫系統questionbank)
  - [2.3 AI 家教系統（Jojo AI）](#23-ai-家教系統jojo-ai)
  - [2.4 考試模擬系統（Exam Mode）](#24-考試模擬系統exam-mode)
  - [2.5 學習筆記](#25-學習筆記)
  - [2.6 閃卡系統（Flashcards）](#26-閃卡系統flashcards)
  - [2.7 影片教學](#27-影片教學)
- [3. 學習方法論](#3-學習方法論)
- [4. 進階功能](#4-進階功能)
- [5. 定價方案](#5-定價方案)
- [6. 競品比較：RevisionDojo vs Revision Village](#6-競品比較revisiondojo-vs-revision-village)
- [7. 技術與安全](#7-技術與安全)
- [8. 平台數據](#8-平台數據)
- [9. 資料來源](#9-資料來源)

---

## 1. 平台概覽

RevisionDojo 是一個**專注 IB（國際文憑）考試準備**的 AI 驅動學習平台。平台採用「AI-first」設計哲學，以 Jojo AI 為核心，覆蓋所有 21 個 IB 科目及 SAT 考試準備。

**不支援的範圍：** MYP、IGCSE 或其他課綱、非考試類學習、特殊教育需求。

---

## 2. 數學項目服務內容

### 2.1 課程分類

| 課程 | 網址路徑 | 級別 |
|------|---------|------|
| Mathematics Analysis & Approaches (AA) | `/ib/ib-math-aa` | SL / HL |
| Mathematics Applications & Interpretation (AI) | `/ib/ib-math-ai` | SL / HL |

涵蓋主題包括：微積分（Calculus）、代數（Algebra）、向量（Vectors）、統計與機率（Statistics & Probability）等，完整對齊 IB 教學大綱。

### 2.2 題庫系統（Questionbank）

- **題目數量：** 35,000+ 道考試風格練習題（全科目合計）
- **分類方式：** 按主題（Topic）、試卷（Paper）、級別（SL/HL）、命令詞（Command Terms）篩選
- **難度分級：** Easy → Medium → Hard 三級遞進
- **解答方式：** 每題附逐步詳解（Step-by-step worked solutions）
- **使用限制：** 免費版無每日練習上限
- **自訂測驗：** 支援自訂組卷（Custom Quizzes）進行針對性複習
- **成績分析：** 內建表現分析儀表板（Performance Analytics）

### 2.3 AI 家教系統（Jojo AI）

Jojo AI 是平台的核心功能，提供以下數學學習支援：

- **即時批改：** 依照 IB mark scheme 標準即時評分與回饋
- **逐步解釋：** 不只告訴答案，解釋「為什麼」這樣解題
- **自適應學習路徑：** 根據學生答題表現，自動調整推薦題目與難度
- **24/7 問答：** 隨時可向 AI 提問數學概念問題
- **圖表支援：** 支援數學圖表與公式的即時回饋

### 2.4 考試模擬系統（Exam Mode）

- **自訂測驗產生器（Test Builder）：** 可按主題、難度、題型自由組合
- **計時模擬考試：** 模擬真實考試環境，含倒計時功能
- **主題級別成績分析：** 考後提供各主題的得分明細（Topic-level Mark Breakdowns）
- **考試產生器（Exam Builder）：** 當題庫練習題用完時，可生成額外練習

### 2.5 學習筆記

- **撰寫者：** 官方 IB 出題者、考官、資深教師、高分學生
- **內容對齊：** 完全對齊 IB 教學大綱（Syllabus-aligned）
- **排版特色：** 彩色標註（Color Callouts）、編號重點、結構化排版
- **數學公式：** 使用 KaTeX 渲染數學公式
- **存取權限：** 免費版可存取基本筆記，Plus/Pro 可無限存取所有科目

### 2.6 閃卡系統（Flashcards）

- **生成方式：** AI 自動生成閃卡組
- **學習法：** 間隔重複（Spaced Repetition）記憶法
- **存取權限：** 免費版可使用基本閃卡功能

### 2.7 影片教學

- **內容：** 專家教師逐步講解困難數學概念
- **存取權限：** Pro 方案限定功能

---

## 3. 學習方法論

RevisionDojo 採用**三階段學習模型**，這是其核心教學設計理念：

```
階段一：理解（Understanding）    →    階段二：記憶（Retention）    →    階段三：應用（Application）
        ↓                                    ↓                                ↓
  專家撰寫筆記                         間隔重複閃卡                    35,000+ 考試風格題目
  + Jojo AI 家教                      AI 生成閃卡組                   即時批改與解題回饋
```

**設計邏輯：**
- 先透過結構化筆記和 AI 家教建立概念理解
- 再透過間隔重複閃卡鞏固記憶
- 最後透過大量考試風格題目訓練應用能力

這是 RevisionDojo 與競爭對手的主要差異化——多數平台（如 Revision Village）只專注在「應用」階段的題目練習。

---

## 4. 進階功能

以下功能不限於數學科目，但數學學生同樣可用：

| 功能 | 說明 | 方案限制 |
|------|------|---------|
| **AI 作業批改器** | 針對 IA/EE/TOK，按評分標準（Rubric）逐項批註與分析 | Pro |
| **範例庫（Exemplars）** | 5,000+ 經 IBO 批改的範例作品，可按分數帶與考試場次篩選 | Pro |
| **預測卷（Predicted Papers）** | AI 分析歷年考題趨勢，生成預測試卷 | Pro |
| **抄襲/AI 偵測** | 作業原創性檢查 | Pro |
| **進度分析** | 弱項偵測、成績追蹤、學習進度視覺化 | 全方案 |
| **IB 成績計算機** | 輸入科目分數、邊界值、TOK/EE，預估最終成績 | 全方案 |
| **TOK 分數計算機** | 將 TOK + EE 等級轉換為核心分數 | 全方案 |
| **IB 命令詞彙表** | Command Terms 查詢與練習中心 | 全方案 |
| **HL vs SL 規劃器** | 使用 1.6x 加權規則協助選課規劃 | 全方案 |
| **複習時間表模板** | 提供 8 週與 12 週考前複習計畫範本 | 全方案 |

---

## 5. 定價方案

### 個人方案

| 方案 | 月費（促銷價） | 兩年費用 | 目標用戶 | 重點功能 |
|------|--------------|---------|---------|---------|
| **Free** | $0 | $0 | 新用戶試用 | 題庫（無上限）、基本 Jojo AI、基本筆記與閃卡 |
| **Plus** | ~$17/月 | $408/2年 | 日常自學 | 無限筆記/課程（所有科目）、擴展 AI 對話與回饋 |
| **Pro** | ~$19/月 | $456/2年 | 備考衝刺 | AI 作業批改、範例庫、影片教學、預測卷、抄襲偵測、TutorPass |

### 其他服務

| 服務 | 價格 | 說明 |
|------|------|------|
| **真人家教（Tutoring）** | $29/小時 | 0% 平台抽成，首堂免費 |
| **學校方案** | 教師免費 | 教師獲 Pro 級帳號，學生享 10% 折扣，含批量 AI 批改 |

### Freemium 商業模式分析

- **免費鉤子：** 題庫無上限 + 基本 AI 回饋 → 吸引大量用戶進入
- **付費推力：** 進階 AI 功能、無限筆記、作業批改 → 推動轉換
- **高階鎖定：** 影片教學、預測卷、範例庫 → Pro 方案差異化

---

## 6. 競品比較：RevisionDojo vs Revision Village

| 比較維度 | RevisionDojo | Revision Village |
|---------|-------------|-----------------|
| **學習方法** | 三階段模型（理解→記憶→應用） | 主要聚焦練習題 |
| **內容撰寫者** | 官方 IB 出題者、考官、資深教師 | 未明確說明 |
| **AI 整合** | AI-first 設計，核心架構 | 事後添加，較淺層 |
| **筆記/教科書** | 提供結構化教學大綱對齊筆記 | 不提供 |
| **閃卡** | AI 生成 + 間隔重複 | 提供 |
| **題庫** | 35,000+ 題 | 提供（數量未明確） |
| **作業支援（IA/EE/TOK）** | AI 批改 + 5,000+ 範例庫 | 不提供 |
| **價格** | 較低（Free 方案功能豐富） | 較高（如 Business Management 套餐 $250） |
| **品質疑慮** | — | 2021 被收購後品質下滑，曾出現不符考試格式的題目 |

### RevisionDojo 報告的用戶成效

- 92% 用戶壓力降低 39%
- 75% 用戶對 mark scheme 理解度提升 48%

> 注意：以上數據來自 RevisionDojo 自身行銷頁面，可能存在偏差。

---

## 7. 技術與安全

| 項目 | 說明 |
|------|------|
| **隱私合規** | GDPR 合規 |
| **帳號安全** | SSO / 2FA 登入 |
| **資料處理** | 上傳檔案 48 小時內刪除，不用於模型訓練 |
| **追蹤政策** | 零行銷 cookies |
| **前端技術** | Next.js 框架、KaTeX 數學公式渲染 |

---

## 8. 平台數據

| 指標 | 數據 |
|------|------|
| 全球學生數 | 350,000+ |
| 合作學校數 | 2,500+ |
| 覆蓋國家 | 180+ |
| 題目總數 | 35,000+ |
| 範例作品數 | 5,000+ |
| 支援科目數 | 21 個 IB 科目 |

---

## 9. 資料來源

- [RevisionDojo 官網](https://www.revisiondojo.com/)
- [RevisionDojo 定價與功能比較](https://llms.revisiondojo.com/pricing-feature-map)
- [RevisionDojo vs Revision Village 完整比較](https://www.revisiondojo.com/revision-dojo-vs-revision-village)
- [RevisionDojo 平台概覽（LLM 版）](https://llms.revisiondojo.com/)
- [IB Math AA 頁面](https://www.revisiondojo.com/ib/ib-math-aa)
- [IB Math AI 頁面](https://www.revisiondojo.com/ib/ib-math-ai)
- [RevisionDojo Trustpilot 評價](https://www.trustpilot.com/review/revisiondojo.com)
