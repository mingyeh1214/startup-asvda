import { Question } from "@/types/survey";

export const TAIWAN_CITIES = [
  "台北市", "新北市", "桃園市", "台中市", "台南市", "高雄市",
  "基隆市", "新竹市", "嘉義市",
  "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣",
  "屏東縣", "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣", "金門縣", "連江縣",
];

export const questions: Question[] = [
  // ===== 第一部分：基本資料 =====
  {
    id: "Q1",
    question: "請問您的孩子目前就讀年級？",
    type: "radio",
    options: ["國一", "國二", "國三", "高一", "高二", "高三", "以上皆非"],
    required: true,
    section: 1,
    sectionTitle: "基本資料",
  },
  {
    id: "Q2",
    question: "您的孩子最近一次數學考試成績大約落在？",
    type: "radio",
    options: ["90 分以上", "70-89 分", "50-69 分", "50 分以下", "不清楚"],
    required: true,
    section: 1,
    sectionTitle: "基本資料",
  },
  {
    id: "Q3",
    question: "您居住在哪個縣市？",
    type: "select",
    options: TAIWAN_CITIES,
    required: true,
    section: 1,
    sectionTitle: "基本資料",
  },

  // ===== 第二部分：目前的學習行為 =====
  {
    id: "Q4",
    question: "您的孩子目前有在課外加強數學嗎？（可複選）",
    type: "checkbox",
    options: [
      "補習班",
      "家教",
      "線上課程（如均一、學習吧等）",
      "自行使用 YouTube 教學影片",
      "使用 AI 工具（如 ChatGPT、Photomath 等）",
      "自己看課本/參考書",
      "沒有額外加強",
    ],
    required: true,
    allowOther: true,
    section: 2,
    sectionTitle: "學習行為",
  },
  {
    id: "Q5",
    question: "您目前每月花費在孩子數學學習上的金額大約是？",
    type: "radio",
    options: [
      "NT$0（沒有額外花費）",
      "NT$1 - 2,000",
      "NT$2,001 - 5,000",
      "NT$5,001 - 10,000",
      "NT$10,001 以上",
    ],
    required: true,
    section: 2,
    sectionTitle: "學習行為",
  },
  {
    id: "Q6",
    question: "您的孩子每週大約花多少時間在課外的數學學習上？",
    type: "radio",
    options: [
      "不到 1 小時",
      "1-3 小時",
      "3-5 小時",
      "5-8 小時",
      "8 小時以上",
    ],
    required: true,
    section: 2,
    sectionTitle: "學習行為",
  },

  // ===== 第三部分：痛點挖掘 =====
  {
    id: "Q7",
    question: "以下哪些情況最讓您困擾？（最多選 3 項）",
    type: "checkbox",
    options: [
      "補習班費用太高",
      "孩子在家寫作業遇到不會的題目沒人可問",
      "補習班教法千篇一律，無法針對孩子弱點加強",
      "不確定孩子到底哪裡不會",
      "孩子對數學沒興趣、排斥學習",
      "課業進度太快，跟不上",
      "找不到好的家教",
      "沒有以上困擾",
    ],
    required: true,
    maxSelections: 3,
    section: 3,
    sectionTitle: "痛點挖掘",
  },
  {
    id: "Q8",
    question: "您的孩子在家遇到不會的數學題時，通常怎麼處理？",
    type: "radio",
    options: [
      "問我（家長）",
      "上網搜尋（Google、YouTube）",
      "問同學",
      "使用 AI 工具（ChatGPT 等）",
      "等到補習班/學校再問老師",
      "跳過不做",
    ],
    required: true,
    allowOther: true,
    section: 3,
    sectionTitle: "痛點挖掘",
  },
  {
    id: "Q9",
    question: "承上題，您對孩子目前的處理方式滿意嗎？",
    type: "radio",
    options: ["非常滿意", "還算滿意", "普通", "不太滿意", "非常不滿意"],
    required: true,
    section: 3,
    sectionTitle: "痛點挖掘",
  },
  {
    id: "Q10",
    question: "最不滿意的原因是？",
    type: "text",
    required: false,
    showWhen: {
      questionId: "Q9",
      answers: ["不太滿意", "非常不滿意"],
    },
    section: 3,
    sectionTitle: "痛點挖掘",
  },

  // ===== 第四部分：解方測試 =====
  {
    id: "Q11",
    question: "看完以上描述，您覺得這個工具對您的孩子有幫助嗎？",
    type: "radio",
    options: ["非常有幫助", "有些幫助", "普通", "幫助不大", "完全沒幫助"],
    required: true,
    description:
      "一個 AI 數學學習工具，能讓孩子拍照上傳不會的數學題，AI 會用圖形和動畫一步步講解解題過程，還能根據孩子的弱點自動推薦練習題。",
    section: 4,
    sectionTitle: "解方測試",
  },
  {
    id: "Q12",
    question: "您最重視這個工具的哪些功能？（最多選 3 項）",
    type: "checkbox",
    options: [
      "拍照即時解題",
      "圖形化、視覺化的解題過程",
      "根據弱點自動推薦練習",
      "學習進度追蹤報告（給家長看）",
      "符合台灣課綱的題庫",
      "24 小時隨時可用",
      "比補習班便宜",
    ],
    required: true,
    maxSelections: 3,
    allowOther: true,
    section: 4,
    sectionTitle: "解方測試",
  },
  {
    id: "Q13",
    question: "您對這個工具最大的疑慮是？（最多選 2 項）",
    type: "checkbox",
    options: [
      "AI 解題是否正確可靠",
      "會不會讓孩子太依賴、不自己思考",
      "資料安全/隱私保護",
      "對提升成績是否真的有效",
      "價格",
      "操作是否簡單",
      "沒有疑慮",
    ],
    required: true,
    maxSelections: 2,
    section: 4,
    sectionTitle: "解方測試",
  },

  // ===== 第五部分：付費驗證 =====
  {
    id: "Q14",
    question: "如果這個工具確實能幫助孩子的數學學習，您願意每月支付多少費用？",
    type: "radio",
    options: [
      "不願意付費（只用免費功能）",
      "NT$200 以下",
      "NT$200 - 400",
      "NT$400 - 600",
      "NT$600 - 800",
      "NT$800 以上",
    ],
    required: true,
    section: 5,
    sectionTitle: "付費驗證",
  },
  {
    id: "Q15",
    question: "什麼情況下您會決定付費訂閱？（可複選）",
    type: "checkbox",
    options: [
      "孩子試用後覺得有幫助",
      "看到其他家長的好評推薦",
      "孩子的成績有明顯提升",
      "價格比補習班便宜很多",
      "有免費試用期",
      "學校老師推薦",
    ],
    required: true,
    allowOther: true,
    section: 5,
    sectionTitle: "付費驗證",
  },

  // ===== 第六部分：行動承諾 =====
  {
    id: "Q16",
    question: "我們即將推出免費體驗版，您有興趣讓孩子試試看嗎？",
    type: "radio",
    options: [
      "有，請通知我",
      "考慮中，先看看",
      "目前不需要",
    ],
    required: true,
    section: 6,
    sectionTitle: "行動承諾",
  },
  {
    id: "Q17",
    question: "請留下您的聯絡方式，我們會優先邀請您體驗：",
    type: "contact",
    required: false,
    showWhen: {
      questionId: "Q16",
      answers: ["有，請通知我"],
    },
    section: 6,
    sectionTitle: "行動承諾",
  },
  {
    id: "Q18",
    question: "您還有什麼想補充的嗎？（選填）",
    type: "text",
    required: false,
    section: 6,
    sectionTitle: "行動承諾",
  },
];

// Group questions by section for step navigation
export function getQuestionsBySection(): Map<number, Question[]> {
  const sections = new Map<number, Question[]>();
  for (const q of questions) {
    if (!sections.has(q.section)) {
      sections.set(q.section, []);
    }
    sections.get(q.section)!.push(q);
  }
  return sections;
}

export const TOTAL_SECTIONS = 6;
