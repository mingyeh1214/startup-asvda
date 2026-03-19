# AI 科學圖形生成技術研究報告

> 研究日期：2026-03-05
> 聚焦：AI 生成 TikZ 圖形、數學函式圖、3D 立體圖形、科學圖表

## 目錄

- [1. 研究概要](#1-研究概要)
- [2. OpenAI Prism — Visual Synthesis](#2-openai-prism--visual-synthesis)
- [3. Google PaperBanana — 五代理科學圖形框架](#3-google-paperbanana--五代理科學圖形框架)
- [4. DeTikZify — 專用 TikZ 生成模型（NeurIPS 2024）](#4-detikzify--專用-tikz-生成模型neurips-2024)
- [5. LLM 生成 SVG 數學圖形（AIED 2025）](#5-llm-生成-svg-數學圖形aied-2025)
- [6. 圖形生成格式比較：TikZ vs SVG vs 程式碼繪圖 vs 像素圖](#6-圖形生成格式比較tikz-vs-svg-vs-程式碼繪圖-vs-像素圖)
- [7. 商業產品與工具](#7-商業產品與工具)
  - [7.1 OpenAI Prism（免費）](#71-openai-prism免費)
  - [7.2 Underleaf AI](#72-underleaf-ai)
  - [7.3 SciDraw](#73-scidraw)
  - [7.4 AnimG](#74-animg)
  - [7.5 Claude Artifacts](#75-claude-artifacts)
  - [7.6 其他工具](#76-其他工具)
- [8. 數學函式與 3D 圖形專項](#8-數學函式與-3d-圖形專項)
  - [8.1 2D 函式圖](#81-2d-函式圖)
  - [8.2 3D 曲面與立體圖形](#82-3d-曲面與立體圖形)
  - [8.3 互動式數學視覺化](#83-互動式數學視覺化)
- [9. LLM 各模型圖形生成能力比較](#9-llm-各模型圖形生成能力比較)
- [10. 技術路線建議](#10-技術路線建議)
- [11. 與影片管線的整合方案](#11-與影片管線的整合方案)
- [12. 資料來源](#12-資料來源)

---

## 1. 研究概要

AI 生成科學圖形正在經歷快速發展，2025-2026 年出現了多個里程碑式的產品與研究：

| 時間 | 里程碑 |
|------|--------|
| 2024 NeurIPS | **DeTikZify** — 首個專用 TikZ 生成模型，超越 GPT-4V 和 Claude 3 |
| 2025 AIED | **Text-to-SVG** — 證明 SVG 遠優於像素圖用於數學圖形生成 |
| 2026.01 | **OpenAI Prism** — 白板草圖 → TikZ 即時轉換，免費使用 |
| 2026.02 | **Google PaperBanana** — 五代理框架自動生成論文級科學圖表 |

**核心發現：AI 生成科學圖形的最佳路徑不是生成像素圖（如 DALL·E），而是生成向量圖形程式碼（TikZ、SVG、Matplotlib/Plotly 程式碼）。**

---

## 2. OpenAI Prism — Visual Synthesis

### 背景

- **發布日期：** 2026 年 1 月 27 日
- **底層模型：** GPT-5.2 Thinking（專為數學精確性與技術合成微調）
- **技術來源：** 收購 Crixet（LaTeX 平台新創，2025 年底收購）
- **價格：** 免費（ChatGPT 個人帳號即可使用）
- **網址：** [prism.openai.com](https://prism.openai.com/)

### Visual Synthesis 功能

這是 Prism 最令人矚目的 AI 圖形生成功能：

```
白板草圖 / 手繪圖 → 拍照上傳 → GPT-5.2 視覺分析 → 出版品質 TikZ/LaTeX 程式碼
```

**運作方式：**
1. 研究者在白板上畫草圖（方程式、圖表、流程圖等）
2. 拍照上傳至 Prism
3. GPT-5.2 的視覺能力即時辨識草圖內容
4. 自動轉換為精確的 TikZ 命令或 LaTeX 程式碼
5. 輸出出版品質的向量圖形

**節省時間：** 官方聲稱可為研究者在準備論文圖表時節省數小時。

### Prism 完整功能

| 功能 | 說明 |
|------|------|
| **Visual Synthesis** | 白板草圖 → TikZ/LaTeX 程式碼 |
| **LaTeX 編輯器** | 基於 Crixet 的雲端 LaTeX 工作空間 |
| **文獻管理** | AI 自動辨識並納入相關文獻（需人工驗證） |
| **課程材料生成** | 自動生成研究所課程計畫與習題集 |
| **協作功能** | 無限專案與協作者 |

### 對科學圖形生成的意義

Prism 是第一個將「手繪→TikZ」能力整合進完整科學工作流的產品，且免費開放。這意味著：
- TikZ 圖形生成已從「專家技能」變為「任何人都能用」
- GPT-5.2 的 TikZ 生成能力已達到出版品質水準
- OpenAI 認為科學圖形生成是一個值得收購公司（Crixet）來佈局的重要方向

---

## 3. Google PaperBanana — 五代理科學圖形框架

### 背景

- **發布日期：** 2026 年 2 月
- **研究機構：** 北京大學 + Google Cloud AI Research
- **論文：** [PaperBanana: Automating Academic Illustration for AI Scientists](https://arxiv.org/abs/2601.23265)
- **底層模型：** Gemini-3-Pro + Nano-Banana-Pro
- **可用性：** 開源實作已在 GitHub 發布

### 五代理架構

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. Retriever │ →  │  2. Planner  │ →  │  3. Stylist  │
│   參考檢索     │    │   方案規劃    │    │   美學優化    │
├──────────────┤    ├──────────────┤    ├──────────────┤
│ 從資料庫搜尋   │    │ 技術文字 →    │    │ 根據 NeurIPS │
│ 10 個最相關    │    │ 圖形詳細描述  │    │ 風格指南     │
│ 參考圖範例     │    │              │    │ 優化視覺描述  │
└──────────────┘    └──────────────┘    └──────┬───────┘
                                               │
                    ┌──────────────┐    ┌───────▼──────┐
                    │  5. Critic   │ ←  │ 4. Visualizer│
                    │   品質評審    │    │   圖形生成    │
                    ├──────────────┤    ├──────────────┤
                    │ 對照原文檢查  │    │ 使用影像生成   │
                    │ 提供修改建議  │    │ 模型渲染圖形   │
                    │ 迭代 3 輪     │    │              │
                    └──────────────┘    └──────────────┘
```

### 雙軌輸出

| 圖形類型 | 生成方式 | 說明 |
|---------|---------|------|
| **方法論圖表** | AI 影像生成模型 | 系統架構圖、流程圖等 → 光柵圖 |
| **統計圖表** | Python + Matplotlib 程式碼 | 數據圖、函式圖 → 向量圖（精確數值） |

**關鍵設計：** 統計圖表不用影像生成模型，而是生成 Matplotlib 程式碼。因為影像生成模型無法保證數值準確性（經常產生「隨意數字」）。

### 評測成績（PaperBananaBench，292 個 NeurIPS 2025 案例）

| 指標 | 提升幅度 |
|------|---------|
| 簡潔性（Conciseness） | +37.2% |
| 可讀性（Readability） | +12.9% |
| 美觀度（Aesthetics） | +6.6% |
| 內容忠實度（Content Fidelity） | +2.8% |
| 人類偏好率 | 73% 偏好 PaperBanana |

### 限制

| 限制 | 說明 |
|------|------|
| 內容忠實度 | 僅 45.8%（低於人類基準 50%） |
| 常見錯誤 | 連接線錯位、箭頭方向錯誤 |
| 輸出格式 | 光柵圖（非向量圖），後期修改困難 |
| 可用性 | 依賴 Google 專有模型（Gemini-3-Pro、Nano-Banana-Pro） |

---

## 4. DeTikZify — 專用 TikZ 生成模型（NeurIPS 2024）

### 背景

- **論文：** [DeTikZify: Synthesizing Graphics Programs for Scientific Figures and Sketches with TikZ](https://arxiv.org/abs/2405.15306)
- **會議：** NeurIPS 2024 **Spotlight Paper**
- **GitHub：** [potamides/DeTikZify](https://github.com/potamides/DeTikZify)
- **最新版：** DeTikZifyv2 (8B)，2024 年 12 月發布

### 核心能力

```
輸入 A：科學論文圖形（截圖/照片）  ──→  ┌──────────────┐  ──→  TikZ 程式碼
輸入 B：手繪草圖                   ──→  │  DeTikZify   │  ──→  可編譯 LaTeX
                                        │  視覺編碼器   │
                                        │  + 語言模型   │
                                        └──────────────┘
```

### 三個專用資料集

| 資料集 | 規模 | 用途 |
|-------|------|------|
| **DaTikZv2** | 360,000+ | 人類創建的 TikZ 圖形（目前最大 TikZ 資料集） |
| **SketchFig** | — | 手繪草圖與對應科學圖形的配對 |
| **MetaFig** | — | 多樣化科學圖形及其後設資料 |

### MCTS 推論演算法

DeTikZify 引入了基於**蒙地卡羅樹搜索（MCTS）**的推論演算法：
- 允許模型迭代優化輸出
- 不需要額外訓練
- 有效提升複雜圖形的生成品質

### 性能比較

| 模型 | TikZ 生成品質 |
|------|-------------|
| **DeTikZifyv2 (8B)** | ★★★★★ 最佳 |
| GPT-4V | ★★★☆☆ |
| Claude 3 | ★★★☆☆ |
| Fine-tuned LLaMA | ★★★★☆ |

**DeTikZify 大幅超越 GPT-4V 和 Claude 3** — 這是因為它是專門為 TikZ 生成任務訓練的模型，而非通用 LLM。

### 適用場景

- 將論文中的截圖圖形轉為可編輯 TikZ
- 將白板手繪草圖轉為精確向量圖
- 批量轉換既有科學圖形為 LaTeX 格式

---

## 5. LLM 生成 SVG 數學圖形（AIED 2025）

### 論文

> [From Text to Visuals: Using LLMs to Generate Math Diagrams with Vector Graphics](https://arxiv.org/abs/2503.07429)
> AIED 2025

### 核心發現

**SVG 遠優於像素圖用於數學圖形生成。**

| 生成方式 | VQA 準確度 | 說明 |
|---------|-----------|------|
| **GPT-4o → SVG** | 0.80-0.96 | 精確、可縮放、可編輯 |
| **DALL·E 3 → 像素圖** | 0.12-0.14 | 災難性失敗：隨意數字、錯誤 3D 效果 |

**擴散模型（DALL·E 等）生成的像素圖「對數學圖形完全無用」** — 數字隨機、幾何不精確、無法保證數學正確性。

### 管線架構

```
輸入：題目描述 + 前一步驟提示 + ICL 範例
           ↓
      GPT-4o (temp=0.5)
           ↓
      SVG XML 程式碼
           ↓
      向量圖形渲染
```

### 關鍵提示策略

| 策略 | 效果 |
|------|------|
| **主題匹配示範（Topic-matched ICL）** | 顯著提升品質 |
| **明確文字提示** | 優於讓 LLM 自行推斷 |
| **序列上下文（含前一步驟圖形）** | 提升一致性至 0.93-0.96 |

### 主題差異

| 數學主題 | 語意準確度 |
|---------|-----------|
| 「2 的倍數」 | 0.92（高） |
| 「分數比較」 | 0.56（低） |

**啟示：** 簡單結構性圖形效果好，需要深層數學推理的圖形仍具挑戰。

---

## 6. 圖形生成格式比較：TikZ vs SVG vs 程式碼繪圖 vs 像素圖

| 維度 | TikZ | SVG | 程式碼繪圖（Matplotlib/Plotly） | 像素圖（DALL·E/Midjourney） |
|------|------|-----|-------------------------------|---------------------------|
| **數學精確性** | ★★★★★ | ★★★★☆ | ★★★★★ | ★☆☆☆☆ |
| **可編輯性** | ★★★★★ | ★★★★☆ | ★★★★★ | ★☆☆☆☆ |
| **可縮放性** | ★★★★★（向量） | ★★★★★（向量） | ★★★★☆ | ★★☆☆☆ |
| **LLM 生成可靠性** | ★★★★☆ | ★★★★☆ | ★★★★★ | ★★☆☆☆ |
| **3D 支援** | ★★★☆☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| **動畫支援** | ★☆☆☆☆ | ★★★☆☆ | ★★★☆☆（Plotly） | ☆☆☆☆☆ |
| **LaTeX 整合** | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★☆☆☆☆ |
| **學習曲線** | 陡峭 | 中等 | 中等 | 極低 |
| **出版品質** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ |

### 選擇建議

| 場景 | 推薦格式 |
|------|---------|
| LaTeX 論文圖表 | **TikZ**（最佳整合 + 出版品質） |
| Web / 互動展示 | **SVG** 或 **Plotly**（可縮放 + 互動） |
| 數據視覺化 / 函式圖 | **Matplotlib / Plotly 程式碼** |
| 3D 曲面 / 立體圖形 | **Plotly 3D / Three.js / Manim** |
| 影片動畫 | **Manim**（直接渲染為影片） |
| 快速草圖概念 | **像素圖**（僅用於概念參考，不用於精確圖形） |

---

## 7. 商業產品與工具

### 7.1 OpenAI Prism（免費）

| 項目 | 說明 |
|------|------|
| **網址** | [prism.openai.com](https://prism.openai.com/) |
| **價格** | 免費（ChatGPT 帳號） |
| **核心能力** | 白板草圖 → TikZ、LaTeX 編輯、文獻管理 |
| **底層模型** | GPT-5.2 Thinking |
| **圖形格式** | TikZ / LaTeX |
| **適合場景** | 論文圖表、科學圖形、LaTeX 文件 |

### 7.2 Underleaf AI

| 項目 | 說明 |
|------|------|
| **網址** | [underleaf.ai](https://www.underleaf.ai/) |
| **功能 A** | [Image to TikZ](https://www.underleaf.ai/image-to-tikz) — 圖片 → TikZ 程式碼 |
| **功能 B** | [TikZ Generator](https://www.underleaf.ai/tools/tikz-generator) — 文字描述 → TikZ |
| **功能 C** | [Mermaid to TikZ](https://www.underleaf.ai/tools/mermaid-to-latex) — 流程圖轉換 |
| **辨識能力** | 形狀、箭頭、節點、連接、階層、佈局、文字標籤、顏色樣式 |
| **學科覆蓋** | 電腦科學、數學、工程、物理、生物、經濟學 |
| **Overleaf 整合** | 支援無縫匯入 Overleaf |

### 7.3 SciDraw

| 項目 | 說明 |
|------|------|
| **網址** | [sci-draw.com](https://sci-draw.com/) |
| **價格** | 付費服務 |
| **特色** | Nature/Science 品質插圖，30 秒出圖 |
| **使用者** | 10,000+ 科學家 |
| **輸出類型** | TOC 圖形、期刊封面、研究圖表、海報 |
| **注意** | 偏重生物/化學插圖，非數學圖形專用 |

### 7.4 AnimG

| 項目 | 說明 |
|------|------|
| **網址** | [animg.app](https://animg.app/en) |
| **價格** | Free（2 支）/ $7/月 Pro |
| **特色** | 自然語言 → Manim 動畫，瀏覽器內使用 |
| **適合** | 微積分、線性代數、向量空間等數學概念動畫化 |

### 7.5 Claude Artifacts

| 項目 | 說明 |
|------|------|
| **價格** | Claude 免費 / Pro |
| **圖形格式** | SVG、Mermaid 流程圖 |
| **特色** | 在對話中即時生成互動式 SVG 圖形 |
| **數學支援** | 可生成函式圖、幾何圖、向量圖等 |
| **限制** | 不直接支援 TikZ 輸出（但可生成 TikZ 程式碼文字） |

### 7.6 其他工具

| 工具 | 類型 | 特色 |
|------|------|------|
| **TikZMaker** | 線上編輯器 | WYSIWYG TikZ 編輯，自動生成 Circuitikz |
| **FreeTikZ** | 線上工具 | 手繪 → TikZ 快速轉換 |
| **ManimGPT** | GPT Store | ChatGPT 內的 Manim 助手 |
| **Octree TikZ Generator** | 線上工具 | AI 描述 → TikZ，含即時 PDF 預覽 |
| **Desmos** | 計算工具 | 2D/3D 函式圖、幾何計算器 |
| **GeoGebra** | 教育工具 | 3D 視覺化、動態係數操作、百萬教學資源 |

---

## 8. 數學函式與 3D 圖形專項

### 8.1 2D 函式圖

**最佳 AI 生成路徑：LLM → Python（Matplotlib/Plotly）程式碼 → 渲染**

```python
# LLM 可可靠生成此類程式碼
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2*np.pi, 2*np.pi, 1000)
y = np.sin(x) / x  # sinc 函數

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2)
plt.axhline(y=0, color='k', linewidth=0.5)
plt.axvline(x=0, color='k', linewidth=0.5)
plt.grid(True, alpha=0.3)
plt.title(r'$f(x) = \frac{\sin(x)}{x}$', fontsize=16)
plt.savefig('sinc.svg', format='svg')
```

**LLM 生成 Matplotlib 程式碼的可靠性極高** — 這是 LLM 訓練資料中最豐富的繪圖庫之一。

### 8.2 3D 曲面與立體圖形

**方案一：Plotly 3D（互動式 + Web 友好）**

```python
# LLM 可生成此類程式碼
import plotly.graph_objects as go
import numpy as np

x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

fig = go.Figure(data=[go.Surface(z=Z, x=X, y=Y)])
fig.update_layout(title='3D Surface: sin(√(x²+y²))')
fig.write_html('surface.html')  # 互動式 HTML
```

**方案二：Manim 3D（影片動畫）**

```python
# LLM 生成 Manim 3D 場景
from manim import *

class Surface3D(ThreeDScene):
    def construct(self):
        axes = ThreeDAxes()
        surface = Surface(
            lambda u, v: axes.c2p(u, v, np.sin(np.sqrt(u**2 + v**2))),
            u_range=[-5, 5], v_range=[-5, 5],
            resolution=(50, 50)
        )
        self.set_camera_orientation(phi=75*DEGREES, theta=45*DEGREES)
        self.play(Create(surface))
        self.begin_ambient_camera_rotation(rate=0.2)
        self.wait(5)
```

**方案三：Three.js（Web 3D 互動）**

- 適合需要在網頁上展示互動式 3D 圖形的場景
- LLM 可生成 Three.js 程式碼，但可靠性低於 Matplotlib/Plotly

**方案四：TikZ + pgfplots（LaTeX 論文用）**

```latex
% LLM 可生成此類 TikZ 3D 圖
\begin{tikzpicture}
\begin{axis}[
    view={60}{30},
    xlabel=$x$, ylabel=$y$, zlabel={$f(x,y)$}
]
\addplot3[surf, domain=-3:3, samples=30]
    {sin(deg(sqrt(x^2+y^2))) / sqrt(x^2+y^2+0.01)};
\end{axis}
\end{tikzpicture}
```

### 8.3 互動式數學視覺化

| 工具 | 2D 函式 | 3D 函式 | 互動性 | AI 整合 |
|------|--------|--------|-------|--------|
| **Desmos** | ★★★★★ | ★★★★☆ | ★★★★★ | ★★☆☆☆ |
| **GeoGebra** | ★★★★★ | ★★★★★ | ★★★★★ | ★★★☆☆（可接 ChatGPT） |
| **Plotly** | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★（LLM 生成可靠） |
| **Manim** | ★★★★★ | ★★★★☆ | ☆☆☆☆☆（影片） | ★★★★☆ |
| **Three.js** | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★☆☆ |

---

## 9. LLM 各模型圖形生成能力比較

### TikZ 生成能力

| 模型 | TikZ 品質 | 說明 |
|------|----------|------|
| **GPT-5.2**（Prism 內建） | ★★★★★ | 白板→TikZ 出版品質，Prism 專為此優化 |
| **DeTikZifyv2 (8B)** | ★★★★★ | 專用模型，NeurIPS 2024 最佳 |
| **Claude Opus** | ★★★★☆ | 通用 LLM 中 TikZ 品質良好 |
| **GPT-4o** | ★★★★☆ | SVG 生成優秀，TikZ 良好 |
| **DeepSeek-V3** | ★★★★☆ | 程式碼生成強，TikZ 可靠 |
| **Gemini 3.1 Pro** | ★★★★☆ | 幾何與視覺數學最強（可處理手繪圖片） |

### 繪圖程式碼生成能力（Matplotlib/Plotly）

| 模型 | 可靠性 | 說明 |
|------|-------|------|
| **GPT-5.2** | ★★★★★ | 訓練資料最豐富 |
| **Claude Opus** | ★★★★★ | 程式碼品質高 |
| **DeepSeek-V3** | ★★★★★ | 程式碼生成頂尖 |
| **Gemini 3.1 Pro** | ★★★★☆ | 良好但略遜 |

### SVG 生成能力

| 模型 | SVG 品質 | 說明 |
|------|---------|------|
| **GPT-4o/5.2** | ★★★★★ | AIED 2025 研究驗證 |
| **Claude** | ★★★★☆ | Artifacts 內建 SVG 渲染 |
| **StarVector (8B)** | ★★★★☆ | 專用圖片→SVG 模型 |

### 像素圖生成（不推薦用於科學圖形）

| 模型 | 數學精確性 |
|------|-----------|
| DALL·E 3 | ★☆☆☆☆（VQA 0.12-0.14，災難性） |
| Midjourney | ★☆☆☆☆ |
| FLUX Pro | ★★☆☆☆（美觀但不精確） |

---

## 10. 技術路線建議

### 場景一：LaTeX 論文圖表

```
推薦路線：
  手繪/草圖 → OpenAI Prism（免費）→ TikZ 程式碼 → LaTeX 文件
  或
  文字描述 → Underleaf TikZ Generator → TikZ 程式碼 → Overleaf
  或
  既有圖片 → DeTikZify → TikZ 程式碼 → LaTeX 文件
```

### 場景二：數學教育影片

```
推薦路線：
  題目 → LLM 解題 + 腳本 → LLM 生成 Manim 程式碼 → 渲染動畫影片
  （參見前份研究報告：數學題目自動化影片生成）
```

### 場景三：互動式 Web 數學視覺化

```
推薦路線：
  數學概念 → LLM 生成 Plotly/Three.js 程式碼 → 互動式 HTML 頁面
  或
  → LLM 生成 SVG → 嵌入網頁
```

### 場景四：批量生成科學圖表

```
推薦路線：
  研究論文 PDF → PaperBanana 架構（五代理）→ 論文級圖表
  或
  數據 → LLM 生成 Matplotlib/Plotly 程式碼 → 批量渲染
```

---

## 11. 與影片管線的整合方案

結合前份研究（數學題目自動化影片生成），以下是將科學圖形生成整合進影片管線的建議：

### 整合架構

```
┌─────────────────────────────────────────────────────────────┐
│                  影片管線中的圖形生成層                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐                                            │
│  │  數學題目     │                                            │
│  └──────┬──────┘                                            │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────┐    圖形需求分析                              │
│  │  LLM 解題     │ → 判斷需要哪些圖形類型                       │
│  └──────┬───────┘                                            │
│         │                                                   │
│    ┌────┴─────────────────────────────┐                      │
│    │          圖形類型路由              │                      │
│    ├──────────┬───────────┬──────────┤                      │
│    ▼          ▼           ▼          ▼                      │
│  ┌──────┐  ┌──────┐  ┌───────┐  ┌───────┐                  │
│  │ 2D   │  │ 3D   │  │ 幾何   │  │ 流程  │                  │
│  │ 函式圖 │  │ 曲面  │  │ 圖形   │  │ 圖表  │                  │
│  │      │  │      │  │       │  │       │                  │
│  │Manim │  │Manim │  │Manim  │  │Manim  │                  │
│  │2D Plot│  │3D    │  │Geometry│  │TikZ→  │                  │
│  │      │  │Scene │  │       │  │SVG    │                  │
│  └──┬───┘  └──┬───┘  └───┬───┘  └───┬───┘                  │
│     └─────────┴──────────┴──────────┘                       │
│                    │                                        │
│                    ▼                                        │
│           Manim 統一渲染 → MP4 動畫片段                       │
│                    │                                        │
│                    ▼                                        │
│           + 中文語音旁白 → 最終教學影片                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 各圖形類型的 Manim 實現

| 圖形類型 | Manim 元件 | LLM 生成可靠性 |
|---------|-----------|--------------|
| 2D 函式圖 | `Axes`, `FunctionGraph`, `ParametricFunction` | ★★★★★ 極高 |
| 3D 曲面 | `ThreeDAxes`, `Surface`, `ParametricSurface` | ★★★★☆ 高 |
| 幾何圖形 | `Circle`, `Polygon`, `Line`, `Angle` | ★★★★★ 極高 |
| 向量 | `Vector`, `Arrow`, `NumberPlane` | ★★★★★ 極高 |
| 矩陣/線代 | `Matrix`, `MobjectMatrix` | ★★★★☆ 高 |
| 機率分佈 | `BarChart`, `FunctionGraph` | ★★★★☆ 高 |
| 微積分動畫 | `Riemann`, 面積填充 | ★★★★☆ 高 |
| 流程圖/樹狀圖 | `DiGraph`, 自訂節點 | ★★★☆☆ 中等 |

---

## 12. 資料來源

### 產品與平台
- [OpenAI Prism 官方頁面](https://openai.com/prism/)
- [OpenAI Prism 介紹文](https://openai.com/index/introducing-prism/)
- [Underleaf Image to TikZ](https://www.underleaf.ai/image-to-tikz)
- [Underleaf TikZ Generator](https://www.underleaf.ai/tools/tikz-generator)
- [SciDraw](https://sci-draw.com/)
- [AnimG](https://animg.app/en)
- [TikZMaker](https://tikzmaker.com/)
- [Desmos](https://www.desmos.com/)
- [GeoGebra](https://www.geogebra.org/)

### 學術論文
- [DeTikZify (NeurIPS 2024)](https://arxiv.org/abs/2405.15306) / [GitHub](https://github.com/potamides/DeTikZify)
- [PaperBanana (Google, 2026)](https://arxiv.org/abs/2601.23265) / [GitHub](https://github.com/llmsresearch/paperbanana)
- [From Text to Visuals: SVG Math Diagrams (AIED 2025)](https://arxiv.org/abs/2503.07429)
- [Text-Guided Synthesis of Scientific Vector Graphics with TikZ](https://arxiv.org/abs/2310.00367)
- [OmniSVG: Unified SVG Generation Model](https://omnisvg.github.io/)
- [StarVector: Image to SVG](https://huggingface.co/starvector/starvector-8b-im2svg)

### 技術文章
- [Engadget: OpenAI releases Prism](https://www.engadget.com/ai/openai-releases-prism-a-claude-code-like-app-for-scientific-research-180000454.html)
- [The Decoder: Google PaperBanana](https://the-decoder.com/googles-paperbanana-uses-five-ai-agents-to-auto-generate-scientific-diagrams/)
- [Master TikZ Figures with ChatGPT](https://lennartnacke.com/master-tikz-figures-with-chatgpt-for-high-impact-academic-writing-in-latex/)
- [Claude SVG Magic](https://www.oreateai.com/blog/claudes-svg-magic-turning-ideas-into-visual-stories/)
- [Best AI Models for Scientific Visualization 2026](https://www.siliconflow.com/articles/en/best-ai-models-for-scientific-visualization)
