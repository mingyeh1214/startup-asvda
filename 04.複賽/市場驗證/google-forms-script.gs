/**
 * Mathify — 國高中數學學習需求調查
 * Google Apps Script：自動建立 Google Forms 問卷
 *
 * 使用方式：
 * 1. 前往 https://script.google.com 建立新專案
 * 2. 將此檔案內容貼入編輯器
 * 3. 執行 createSurvey() 函式
 * 4. 授權後即自動建立表單，連結會顯示在執行紀錄中
 */

function createSurvey() {
  var form = FormApp.create('Mathify — 國高中數學學習需求調查');

  form.setDescription(
    '您好！我們正在研究國高中生的數學學習需求，希望透過您的寶貴意見，' +
    '幫助打造更有效的學習工具。\n\n' +
    '本問卷約 3 分鐘，所有資料僅供研究使用，不會收集個人身份資訊。\n\n' +
    '感謝您的參與！'
  );

  form.setConfirmationMessage('感謝您的填答！您的意見對我們非常寶貴。');
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);

  // ===== 第一部分：基本資料 =====

  // Q1 - 年級（單選，必填）
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('您的孩子目前就讀年級？')
    .setChoiceValues(['國一', '國二', '國三', '高一', '高二', '高三'])
    .setRequired(true);

  // Q2 - 數學成績（單選，必填）
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('您的孩子最近一次數學考試成績大約落在？')
    .setChoiceValues([
      '90 分以上',
      '70-89 分',
      '50-69 分',
      '50 分以下',
      '不清楚'
    ])
    .setRequired(true);

  // ===== 第二部分：學習現況與痛點 =====

  // Q3 - 課外加強方式（複選，必填）
  var q3 = form.addCheckboxItem();
  q3.setTitle('您的孩子目前有在課外加強數學嗎？（可複選）')
    .setChoiceValues([
      '補習班',
      '家教',
      '線上課程（如均一、學習吧）',
      'YouTube 教學影片',
      'AI 工具（如 ChatGPT）',
      '自己看課本或參考書',
      '沒有額外加強'
    ])
    .setRequired(true);

  // Q4 - 每月花費（單選，必填）
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('您目前每月花費在孩子數學學習上的金額大約是？')
    .setChoiceValues([
      'NT$0（沒有額外花費）',
      'NT$1-2,000',
      'NT$2,001-5,000',
      'NT$5,001-10,000',
      'NT$10,001 以上'
    ])
    .setRequired(true);

  // Q5 - 困擾問題（複選，最多 3 項，必填）
  // 注意：Google Forms 原生不支援「最多選 N 項」，透過 validation 設定
  var q5 = form.addCheckboxItem();
  q5.setTitle('以下哪些情況最讓您困擾？（最多選 3 項）')
    .setHelpText('請選擇最多 3 個選項')
    .setChoiceValues([
      '補習班費用太高',
      '孩子在家遇到不會的題目沒人可問',
      '補習班無法針對孩子弱點加強',
      '不確定孩子到底哪裡不會',
      '孩子對數學沒興趣',
      '課業進度太快跟不上',
      '沒有以上困擾'
    ])
    .setRequired(true);

  // 設定最多選 3 項的驗證規則
  var q5Validation = FormApp.createCheckboxValidation()
    .requireSelectAtMost(3)
    .build();
  q5.setValidation(q5Validation);

  // ===== 第三部分：產品概念測試 =====

  // Q6 - 概念測試（五點量表，必填）
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('您覺得這個工具對孩子的數學學習有幫助嗎？')
    .setHelpText(
      '想像有一套 AI 數學線上學習系統：像一本會教學的智慧教科書，' +
      '有完整的課程與學習流程，AI 會用圖形和動畫講解觀念，' +
      '根據孩子的弱點自動調整學習路徑與推薦練習題，月費約 NT$500。'
    )
    .setChoiceValues([
      '非常有幫助',
      '有些幫助',
      '普通',
      '幫助不大',
      '完全沒幫助'
    ])
    .setRequired(true);

  // Q7 - 重視功能（複選，最多 3 項，必填）
  var q7 = form.addCheckboxItem();
  q7.setTitle('您最重視這個工具的哪些功能？（最多選 3 項）')
    .setHelpText('請選擇最多 3 個選項')
    .setChoiceValues([
      '完整的線上課程與學習流程',
      '圖形化、視覺化的觀念講解',
      '根據弱點自動調整學習路徑',
      '學習進度報告（給家長看）',
      '符合台灣課綱的內容',
      '24 小時隨時可用',
      '比補習班便宜'
    ])
    .setRequired(true);

  var q7Validation = FormApp.createCheckboxValidation()
    .requireSelectAtMost(3)
    .build();
  q7.setValidation(q7Validation);

  // ===== 第四部分：付費意願與行動 =====

  // Q8 - 付費意願（單選，必填）
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('如果這個工具確實有效，您願意每月支付多少？')
    .setChoiceValues([
      '不願意付費',
      'NT$200 以下',
      'NT$200-400',
      'NT$400-600',
      'NT$600-800',
      'NT$800 以上'
    ])
    .setRequired(true);

  // Q9 - 試用意願（單選，必填）
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('免費體驗版即將推出，有興趣讓孩子試用嗎？')
    .setChoiceValues([
      '有興趣，請通知我',
      '考慮中',
      '目前不需要'
    ])
    .setRequired(true);

  // Q10 - Email（選填）
  var q10 = form.addTextItem();
  q10.setTitle('如有興趣試用，請留下您的 Email 以便通知')
    .setHelpText('此欄位為選填，僅用於通知免費體驗版推出')
    .setRequired(false);

  // 設定 Email 格式驗證
  var emailValidation = FormApp.createTextValidation()
    .requireTextIsEmail()
    .build();
  q10.setValidation(emailValidation);

  // 輸出表單連結
  var editUrl = form.getEditUrl();
  var publishedUrl = form.getPublishedUrl();

  Logger.log('===== 表單建立成功 =====');
  Logger.log('編輯連結：' + editUrl);
  Logger.log('填答連結：' + publishedUrl);
  Logger.log('========================');

  return {
    editUrl: editUrl,
    publishedUrl: publishedUrl
  };
}
