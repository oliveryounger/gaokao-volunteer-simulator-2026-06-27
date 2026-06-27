const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  resetBtn: $("#resetBtn"),
  copyTopBtn: $("#copyTopBtn"),
  steps: $$(".step"),
  scorePage: $("#scorePage"),
  applyPage: $("#applyPage"),
  resultPage: $("#resultPage"),
  scoreForm: $("#scoreForm"),
  aliasInput: $("#aliasInput"),
  provinceSelect: $("#provinceSelect"),
  trackSelect: $("#trackSelect"),
  ritualSelect: $("#ritualSelect"),
  scoreReport: $("#scoreReport"),
  scoreHeadline: $("#scoreHeadline"),
  scoreExplain: $("#scoreExplain"),
  scoreTotal: $("#scoreTotal"),
  subjectGrid: $("#subjectGrid"),
  enterApplyBtn: $("#enterApplyBtn"),
  candidateStatus: $("#candidateStatus"),
  candidateNo: $("#candidateNo"),
  candidateName: $("#candidateName"),
  candidateProvince: $("#candidateProvince"),
  candidateTrack: $("#candidateTrack"),
  candidateScore: $("#candidateScore"),
  candidateRank: $("#candidateRank"),
  rushMeter: $("#rushMeter"),
  stableMeter: $("#stableMeter"),
  fitMeter: $("#fitMeter"),
  parentMeter: $("#parentMeter"),
  rushValue: $("#rushValue"),
  stableValue: $("#stableValue"),
  fitValue: $("#fitValue"),
  parentValue: $("#parentValue"),
  metricStatus: $("#metricStatus"),
  feedList: $("#feedList"),
  feedCount: $("#feedCount"),
  applicationBody: $("#applicationBody"),
  submitBtn: $("#submitBtn"),
  schoolBody: $("#schoolBody"),
  searchInput: $("#searchInput"),
  riskFilter: $("#riskFilter"),
  tierFilter: $("#tierFilter"),
  balancedBtn: $("#balancedBtn"),
  conservativeBtn: $("#conservativeBtn"),
  aggressiveBtn: $("#aggressiveBtn"),
  clearBtn: $("#clearBtn"),
  resultTitle: $("#resultTitle"),
  resultSummary: $("#resultSummary"),
  resultStats: $("#resultStats"),
  backApplyBtn: $("#backApplyBtn"),
  copyBtn: $("#copyBtn"),
  downloadBtn: $("#downloadBtn"),
  posterCanvas: $("#posterCanvas"),
  processList: $("#processList"),
  processCount: $("#processCount")
};

const provinces = {
  henan: { name: "河南", population: 980000, pressure: 18, line: 511 },
  guangdong: { name: "广东", population: 760000, pressure: 8, line: 498 },
  jiangsu: { name: "江苏", population: 470000, pressure: 12, line: 512 },
  sichuan: { name: "四川", population: 610000, pressure: 4, line: 492 },
  beijing: { name: "北京", population: 69000, pressure: -10, line: 448 }
};

const tracks = {
  physics: { name: "物理类 / 理科向", scoreBias: 8, majorFit: ["计算机类", "电子信息类", "人工智能", "临床医学", "工科试验班", "自动化类", "数学类"] },
  history: { name: "历史类 / 文科向", scoreBias: 0, majorFit: ["法学", "经济学类", "新闻传播学类", "汉语言文学", "师范类", "外国语言文学类", "工商管理类"] }
};

const rituals = {
  steady: { name: "三秒倒计时，稳住手", score: 16, feed: "手没有抖，浏览器都对你肃然起敬。" },
  koi: { name: "转发锦鲤，截图留念", score: 8, feed: "锦鲤可以拜，招生章程还是要读。" },
  family: { name: "全家围观，客厅屏息", score: 2, feed: "妈妈说不看，但已经把总分读完了。" },
  f5: { name: "F5 连点，服务器求饶", score: -10, feed: "服务器没有崩，但你的心态先排队了。" }
};

const majorFactors = {
  "计算机类": .68,
  "人工智能": .65,
  "电子信息类": .75,
  "临床医学": .70,
  "法学": .78,
  "经济学类": .84,
  "金融学类": .82,
  "新闻传播学类": .94,
  "汉语言文学": .98,
  "师范类": .92,
  "外国语言文学类": 1.04,
  "工科试验班": .86,
  "自动化类": .9,
  "数学类": .88,
  "工商管理类": 1.1,
  "材料类": 1.18,
  "环境科学与工程类": 1.2,
  "公共管理类": 1.16
};

const adjustMajors = ["材料类", "环境科学与工程类", "公共管理类", "工商管理类", "外国语言文学类"];

const schools = [
  ["4111010003","清华大学","教育部","北京市","985",160,99,["计算机类","人工智能","电子信息类","工科试验班","法学"]],
  ["4111010001","北京大学","教育部","北京市","985",210,99,["数学类","计算机类","临床医学","法学","经济学类"]],
  ["4131010248","上海交通大学","教育部","上海市","985",620,98,["计算机类","人工智能","电子信息类","临床医学","工科试验班"]],
  ["4131010246","复旦大学","教育部","上海市","985",780,98,["临床医学","经济学类","法学","新闻传播学类","计算机类"]],
  ["4133010335","浙江大学","教育部","杭州市","985",1100,98,["工科试验班","计算机类","人工智能","临床医学","经济学类"]],
  ["4134010358","中国科学技术大学","中国科学院","合肥市","985",1450,96,["数学类","人工智能","计算机类","电子信息类","工科试验班"]],
  ["4132010284","南京大学","教育部","南京市","985",1800,96,["计算机类","人工智能","法学","经济学类","汉语言文学"]],
  ["4111010002","中国人民大学","教育部","北京市","985",2200,95,["法学","经济学类","金融学类","新闻传播学类","公共管理类"]],
  ["4111010006","北京航空航天大学","工业和信息化部","北京市","985",2700,95,["计算机类","人工智能","电子信息类","自动化类","工科试验班"]],
  ["4131010247","同济大学","教育部","上海市","985",3600,94,["工科试验班","计算机类","电子信息类","环境科学与工程类","工商管理类"]],
  ["4123010213","哈尔滨工业大学","工业和信息化部","哈尔滨市","985",4200,94,["工科试验班","计算机类","人工智能","自动化类","电子信息类"]],
  ["4161010698","西安交通大学","教育部","西安市","985",4600,93,["工科试验班","计算机类","电子信息类","临床医学","经济学类"]],
  ["4142010486","武汉大学","教育部","武汉市","985",5200,93,["法学","计算机类","经济学类","新闻传播学类","临床医学"]],
  ["4142010487","华中科技大学","教育部","武汉市","985",5400,93,["计算机类","人工智能","电子信息类","临床医学","自动化类"]],
  ["4144010558","中山大学","教育部","广州市","985",6500,92,["临床医学","计算机类","法学","经济学类","工商管理类"]],
  ["4112010055","南开大学","教育部","天津市","985",7600,90,["经济学类","金融学类","数学类","法学","工商管理类"]],
  ["4132010286","东南大学","教育部","南京市","985",7900,90,["工科试验班","电子信息类","计算机类","自动化类","临床医学"]],
  ["4112010056","天津大学","教育部","天津市","985",8600,89,["工科试验班","电子信息类","计算机类","材料类","工商管理类"]],
  ["4111010027","北京师范大学","教育部","北京市","985",8800,89,["师范类","汉语言文学","数学类","法学","公共管理类"]],
  ["4131010269","华东师范大学","教育部","上海市","985",9600,88,["师范类","计算机类","汉语言文学","数学类","新闻传播学类"]],
  ["4135010384","厦门大学","教育部","厦门市","985",10500,88,["经济学类","金融学类","法学","新闻传播学类","计算机类"]],
  ["4144010561","华南理工大学","教育部","广州市","985",11800,87,["工科试验班","计算机类","电子信息类","食品科学与工程类","工商管理类"]],
  ["4151010610","四川大学","教育部","成都市","985",12500,86,["临床医学","计算机类","法学","汉语言文学","工科试验班"]],
  ["4150010611","重庆大学","教育部","重庆市","985",15000,85,["工科试验班","计算机类","电子信息类","建筑类","工商管理类"]],
  ["4161010699","西北工业大学","工业和信息化部","西安市","985",13500,86,["工科试验班","人工智能","电子信息类","自动化类","计算机类"]],
  ["4121010141","大连理工大学","教育部","大连市","985",18000,84,["工科试验班","计算机类","电子信息类","材料类","工商管理类"]],
  ["4121010145","东北大学","教育部","沈阳市","985",24000,82,["自动化类","计算机类","电子信息类","材料类","公共管理类"]],
  ["4162010730","兰州大学","教育部","兰州市","985",30000,80,["临床医学","计算机类","经济学类","汉语言文学","环境科学与工程类"]],
  ["4111010013","北京邮电大学","教育部","北京市","211",9000,92,["计算机类","人工智能","电子信息类","自动化类","工商管理类"]],
  ["4131010272","上海财经大学","教育部","上海市","211",9800,91,["金融学类","经济学类","法学","工商管理类","公共管理类"]],
  ["4111010034","中央财经大学","教育部","北京市","211",11200,90,["金融学类","经济学类","法学","工商管理类","公共管理类"]],
  ["4111010036","对外经济贸易大学","教育部","北京市","211",12200,89,["金融学类","经济学类","法学","外国语言文学类","工商管理类"]],
  ["4111010053","中国政法大学","教育部","北京市","211",13200,88,["法学","公共管理类","新闻传播学类","经济学类","工商管理类"]],
  ["4161010701","西安电子科技大学","教育部","西安市","211",15000,88,["计算机类","人工智能","电子信息类","自动化类","数学类"]],
  ["4132010287","南京航空航天大学","工业和信息化部","南京市","211",16800,87,["工科试验班","电子信息类","计算机类","自动化类","材料类"]],
  ["4132010288","南京理工大学","工业和信息化部","南京市","211",18500,86,["工科试验班","电子信息类","计算机类","自动化类","材料类"]],
  ["4131010251","华东理工大学","教育部","上海市","211",20500,85,["工科试验班","计算机类","材料类","环境科学与工程类","工商管理类"]],
  ["4111010008","北京科技大学","教育部","北京市","211",21500,84,["工科试验班","计算机类","自动化类","材料类","工商管理类"]],
  ["4111010033","中国传媒大学","教育部","北京市","211",24500,84,["新闻传播学类","数字媒体技术","汉语言文学","外国语言文学类","公共管理类"]],
  ["4132010285","苏州大学","江苏省","苏州市","211",28000,83,["临床医学","计算机类","法学","新闻传播学类","材料类"]],
  ["4144010559","暨南大学","中央统战部","广州市","211",31000,82,["新闻传播学类","经济学类","金融学类","计算机类","工商管理类"]],
  ["4141010459","郑州大学","河南省","郑州市","211",36000,80,["临床医学","计算机类","法学","材料类","公共管理类"]],
  ["4131010280","上海大学","上海市","上海市","211",34000,81,["计算机类","电子信息类","经济学类","新闻传播学类","材料类"]],
  ["4135010386","福州大学","福建省","福州市","211",45000,78,["计算机类","电子信息类","工科试验班","材料类","工商管理类"]],
  ["4136010403","南昌大学","江西省","南昌市","211",62000,74,["临床医学","计算机类","食品科学与工程类","材料类","公共管理类"]],
  ["4114010108","山西大学","山西省","太原市","211",76000,70,["计算机类","汉语言文学","法学","数学类","环境科学与工程类"]],
  ["4113010080","河北工业大学","河北省","天津市","211",58000,76,["工科试验班","计算机类","电子信息类","材料类","工商管理类"]],
  ["4132010293","南京邮电大学","江苏省","南京市","public",39000,79,["电子信息类","计算机类","人工智能","自动化类","工商管理类"]],
  ["4133010336","杭州电子科技大学","浙江省","杭州市","public",43000,79,["计算机类","人工智能","电子信息类","自动化类","金融学类"]],
  ["4144014325","南方科技大学","广东省","深圳市","public",10500,88,["数学类","人工智能","电子信息类","计算机类","工科试验班"]],
  ["4144010590","深圳大学","广东省","深圳市","public",33000,82,["计算机类","人工智能","金融学类","新闻传播学类","电子信息类"]],
  ["4132010300","南京信息工程大学","江苏省","南京市","public",52000,76,["大气科学类","计算机类","人工智能","电子信息类","环境科学与工程类"]],
  ["4150010617","重庆邮电大学","重庆市","重庆市","public",65000,72,["通信工程","计算机类","人工智能","电子信息类","自动化类"]],
  ["4144011845","广东工业大学","广东省","广州市","public",68000,72,["工科试验班","计算机类","自动化类","材料类","工商管理类"]],
  ["4133011646","宁波大学","浙江省","宁波市","public",82000,70,["计算机类","经济学类","法学","师范类","食品科学与工程类"]],
  ["4141010475","河南大学","河南省","开封市","public",112000,66,["师范类","汉语言文学","法学","计算机类","公共管理类"]],
  ["4136010421","江西财经大学","江西省","南昌市","public",86000,69,["金融学类","经济学类","法学","工商管理类","计算机类"]],
  ["4144011846","广东外语外贸大学","广东省","广州市","public",95000,68,["外国语言文学类","法学","经济学类","新闻传播学类","工商管理类"]],
  ["4151010651","西南财经大学","教育部","成都市","211",22000,85,["金融学类","经济学类","法学","工商管理类","公共管理类"]],
  ["4151010614","电子科技大学","教育部","成都市","985",8200,91,["电子信息类","计算机类","人工智能","自动化类","工科试验班"]],
  ["4151010616","成都理工大学","四川省","成都市","public",115000,65,["工科试验班","计算机类","地质类","环境科学与工程类","工商管理类"]],
  ["4153010674","昆明理工大学","云南省","昆明市","public",145000,60,["工科试验班","计算机类","材料类","环境科学与工程类","工商管理类"]],
  ["4111011417","北京联合大学","北京市","北京市","public",260000,48,["计算机类","工商管理类","新闻传播学类","旅游管理类","公共管理类"]],
  ["4131012044","上海第二工业大学","上海市","上海市","public",210000,52,["计算机类","机械类","材料类","环境科学与工程类","工商管理类"]],
  ["4133010351","温州大学","浙江省","温州市","public",175000,56,["师范类","计算机类","法学","工商管理类","材料类"]],
  ["4151011079","成都大学","四川省","成都市","public",190000,54,["计算机类","食品科学与工程类","师范类","工商管理类","公共管理类"]],
  ["4151010623","西华大学","四川省","成都市","public",220000,52,["机械类","计算机类","电子信息类","材料类","工商管理类"]],
  ["4141010464","河南科技大学","河南省","洛阳市","public",185000,55,["临床医学","计算机类","机械类","材料类","工商管理类"]],
  ["4150011799","重庆工商大学","重庆市","重庆市","public",170000,57,["经济学类","金融学类","工商管理类","法学","计算机类"]],
  ["4132010320","江苏师范大学","江苏省","徐州市","public",160000,58,["师范类","汉语言文学","数学类","计算机类","公共管理类"]],
  ["4145010595","桂林电子科技大学","广西壮族自治区","桂林市","public",125000,63,["电子信息类","计算机类","人工智能","自动化类","材料类"]],
  ["4112010070","天津财经大学","天津市","天津市","public",98000,68,["金融学类","经济学类","工商管理类","法学","公共管理类"]]
].map(([code, name, admin, city, tier, baseRank, heat, majors]) => ({ code, name, admin, city, tier, baseRank, heat, majors }));

let state = initialState();

function initialState() {
  return {
    stage: "score",
    candidate: {
      alias: "查分同学",
      province: "henan",
      track: "physics",
      ritual: "steady",
      score: null,
      rank: null,
      subjects: []
    },
    seed: Date.now() % 100000,
    slots: Array.from({ length: 6 }, () => null),
    feedCount: 0,
    result: null,
    shareText: ""
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sanitize(text) {
  const clean = String(text || "").replace(/[<>]/g, "").trim();
  return clean.slice(0, 12) || "查分同学";
}

function formatRank(rank) {
  if (!rank) return "--";
  if (rank >= 10000) return `${(rank / 10000).toFixed(rank >= 100000 ? 1 : 2)} 万名`;
  return `${Math.round(rank).toLocaleString("zh-CN")} 名`;
}

function hashText(text) {
  return [...String(text)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function noise(key, range = 1) {
  const raw = Math.sin(hashText(`${key}-${state.seed}`) * 12.9898) * 43758.5453;
  return (raw - Math.floor(raw)) * range;
}

function switchStep(step) {
  state.stage = step;
  els.scorePage.classList.toggle("active", step === "score");
  els.applyPage.classList.toggle("active", step === "apply");
  els.resultPage.classList.toggle("active", step === "result");
  els.steps.forEach((item) => item.classList.toggle("active", item.dataset.step === step));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function enableStep(step) {
  const tab = els.steps.find((item) => item.dataset.step === step);
  if (tab) tab.disabled = false;
}

function addFeed(name, text) {
  const item = document.createElement("li");
  item.innerHTML = `<b>${name}</b><span>${text}</span>`;
  els.feedList.prepend(item);
  state.feedCount += 1;
  while (els.feedList.children.length > 12) els.feedList.lastElementChild.remove();
  els.feedCount.textContent = `${state.feedCount} 条`;
}

function scoreToRank(score) {
  const province = provinces[state.candidate.province];
  const ratio = clamp((750 - score) / 340, .018, .98);
  const shaped = Math.pow(ratio, 2.55);
  const wobble = 1 + randomInt(-6, 7) / 100;
  return Math.round(clamp(province.population * shaped * wobble, 80, province.population));
}

function generateScore(event) {
  event.preventDefault();
  state.seed = Date.now() % 100000;
  state.candidate.alias = sanitize(els.aliasInput.value);
  state.candidate.province = els.provinceSelect.value;
  state.candidate.track = els.trackSelect.value;
  state.candidate.ritual = els.ritualSelect.value;

  const province = provinces[state.candidate.province];
  const track = tracks[state.candidate.track];
  const ritual = rituals[state.candidate.ritual];
  const base = 540 + track.scoreBias + ritual.score - province.pressure + randomInt(-45, 64);
  const total = clamp(Math.round(base), 398, 704);
  const chinese = clamp(Math.round(94 + (total - 520) * .13 + (state.candidate.track === "history" ? 7 : 0) + randomInt(-10, 13)), 68, 142);
  const math = clamp(Math.round(92 + (total - 520) * .18 + (state.candidate.track === "physics" ? 8 : -3) + randomInt(-16, 18)), 45, 150);
  const english = clamp(Math.round(90 + (total - 520) * .12 + randomInt(-12, 15)), 55, 145);
  const rest = clamp(total - chinese - math - english, 90, 298);
  const finalTotal = chinese + math + english + rest;

  state.candidate.score = finalTotal;
  state.candidate.rank = scoreToRank(finalTotal);
  state.candidate.subjects = [
    ["语文", chinese, "读懂招生章程"],
    ["数学", math, "计算冲稳保梯度"],
    ["外语", english, "识别专业缩写"],
    [state.candidate.track === "physics" ? "理综/选考" : "文综/选考", rest, "心态与位次合卷"]
  ];
  state.slots = Array.from({ length: 6 }, () => null);
  state.result = null;
  state.shareText = "";

  renderCandidate();
  renderScoreReport();
  renderApplication();
  renderSchools();
  renderMetrics();
  enableStep("apply");
  addFeed("成绩查询", `${state.candidate.alias} 查到 ${finalTotal} 分，模拟位次 ${formatRank(state.candidate.rank)}。`);
  addFeed("查分姿势", ritual.feed);
}

function renderCandidate() {
  const c = state.candidate;
  els.candidateStatus.textContent = c.score ? "已查询" : "未查询";
  els.candidateNo.textContent = `${String(260000 + state.seed).slice(0, 4)}******`;
  els.candidateName.textContent = c.alias;
  els.candidateProvince.textContent = c.score ? provinces[c.province].name : "待选择";
  els.candidateTrack.textContent = c.score ? tracks[c.track].name : "待选择";
  els.candidateScore.textContent = c.score || "--";
  els.candidateRank.textContent = formatRank(c.rank);
}

function renderScoreReport() {
  const c = state.candidate;
  els.scoreReport.classList.remove("hidden");
  els.scoreHeadline.textContent = `${c.alias}：${c.score} 分`;
  els.scoreExplain.textContent = `${provinces[c.province].name} · ${tracks[c.track].name} · 模拟位次 ${formatRank(c.rank)}。可以开始填报本科批平行志愿。`;
  els.scoreTotal.textContent = c.score;
  els.subjectGrid.innerHTML = "";
  c.subjects.forEach(([name, score, desc]) => {
    const div = document.createElement("div");
    div.className = "subject-pill";
    div.innerHTML = `<span>${name} · ${desc}</span><strong>${score}</strong>`;
    els.subjectGrid.appendChild(div);
  });
}

function schoolLine(school) {
  const province = provinces[state.candidate.province] || provinces.henan;
  const provinceFactor = province.population > 800000 ? 1.08 : province.population < 100000 ? .55 : 1;
  const heatFactor = 1 - (school.heat - 70) / 850;
  const jitter = .93 + noise(school.code, .14);
  return Math.round(school.baseRank * provinceFactor * heatFactor * jitter);
}

function majorLine(school, major) {
  return Math.round(schoolLine(school) * (majorFactors[major] || 1));
}

function riskOf(school) {
  if (!state.candidate.rank) return { key: "stable", label: "待估", text: "先查分" };
  const ratio = state.candidate.rank / schoolLine(school);
  if (ratio <= .72) return { key: "safe", label: "保", text: "投档较稳" };
  if (ratio <= 1) return { key: "stable", label: "稳", text: "位次接近" };
  if (ratio <= 1.18) return { key: "rush", label: "冲", text: "需要好运" };
  return { key: "dream", label: "梦", text: "主打心跳" };
}

function tierLabel(tier) {
  if (tier === "985") return "985";
  if (tier === "211") return "211/双一流";
  return "普通本科";
}

function renderApplication() {
  els.applicationBody.innerHTML = "";
  state.slots.forEach((slot, index) => {
    const tr = document.createElement("tr");
    const letter = String.fromCharCode(65 + index);
    if (!slot) {
      tr.innerHTML = `
        <td>${letter}</td>
        <td class="empty-cell">--</td>
        <td class="empty-cell">未填报</td>
        <td class="empty-cell">--</td>
        <td class="empty-cell">--</td>
        <td class="empty-cell">--</td>
        <td class="empty-cell">--</td>
        <td class="empty-cell">从下方选择院校</td>
      `;
    } else {
      const school = schools.find((item) => item.code === slot.code);
      const risk = riskOf(school);
      tr.innerHTML = `
        <td>${letter}</td>
        <td class="code">${school.code}</td>
        <td><b>${school.name}</b><br><span class="tier tier-${school.tier}">${tierLabel(school.tier)}</span></td>
        <td>${school.city}</td>
        <td>${slot.major}<br><span class="code">专业线 ${formatRank(majorLine(school, slot.major))}</span></td>
        <td><span class="risk-badge risk-${risk.key}">${risk.label}</span><br><span class="code">${risk.text}</span></td>
        <td><label class="adjust-label"><input type="checkbox" data-action="toggle" data-index="${index}" ${slot.obey ? "checked" : ""}>服从</label></td>
        <td>
          <div class="mini-actions">
            <button type="button" data-action="up" data-index="${index}">上移</button>
            <button type="button" data-action="down" data-index="${index}">下移</button>
            <button type="button" data-action="remove" data-index="${index}">删除</button>
          </div>
        </td>
      `;
    }
    els.applicationBody.appendChild(tr);
  });
  els.submitBtn.disabled = state.slots.filter(Boolean).length < 3;
  renderMetrics();
}

function selectedCodes() {
  return new Set(state.slots.filter(Boolean).map((slot) => slot.code));
}

function filteredSchools() {
  const query = els.searchInput.value.trim().toLowerCase();
  const riskFilter = els.riskFilter.value;
  const tierFilter = els.tierFilter.value;
  return [...schools]
    .sort((a, b) => schoolLine(a) - schoolLine(b))
    .filter((school) => {
      const risk = riskOf(school).key;
      const text = `${school.name} ${school.city} ${school.admin} ${tierLabel(school.tier)}`.toLowerCase();
      return (!query || text.includes(query))
        && (riskFilter === "all" || risk === riskFilter)
        && (tierFilter === "all" || school.tier === tierFilter || (tierFilter === "211" && school.tier === "211"));
    });
}

function renderSchools() {
  const selected = selectedCodes();
  els.schoolBody.innerHTML = "";
  filteredSchools().forEach((school) => {
    const risk = riskOf(school);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="code">${school.code}</td>
      <td><b>${school.name}</b></td>
      <td>${school.city}</td>
      <td>${school.admin}</td>
      <td><span class="tier tier-${school.tier}">${tierLabel(school.tier)}</span></td>
      <td>${formatRank(schoolLine(school))}</td>
      <td><span class="risk-badge risk-${risk.key}">${risk.label}</span></td>
      <td>
        <select data-major="${school.code}">
          ${school.majors.map((major) => `<option value="${major}">${major} · ${formatRank(majorLine(school, major))}</option>`).join("")}
        </select>
      </td>
      <td><button type="button" data-add="${school.code}" ${selected.has(school.code) ? "disabled" : ""}>填入</button></td>
    `;
    els.schoolBody.appendChild(tr);
  });
}

function addSchool(code) {
  if (!state.candidate.score) return;
  const empty = state.slots.findIndex((slot) => !slot);
  if (empty < 0) {
    addFeed("志愿表", "A-F 都填满了，先删一个再加。");
    return;
  }
  const school = schools.find((item) => item.code === code);
  const select = document.querySelector(`select[data-major="${code}"]`);
  state.slots[empty] = {
    code,
    major: select?.value || school.majors[0],
    obey: true
  };
  addFeed("填报系统", `${String.fromCharCode(65 + empty)} 志愿填入 ${school.name}。`);
  renderApplication();
  renderSchools();
}

function handleApplicationAction(event) {
  const target = event.target;
  const action = target.dataset.action;
  const index = Number(target.dataset.index);
  if (!action || !Number.isInteger(index)) return;
  if (action === "toggle") state.slots[index].obey = target.checked;
  if (action === "remove") state.slots[index] = null;
  if (action === "up" && index > 0) {
    [state.slots[index - 1], state.slots[index]] = [state.slots[index], state.slots[index - 1]];
  }
  if (action === "down" && index < state.slots.length - 1) {
    [state.slots[index + 1], state.slots[index]] = [state.slots[index], state.slots[index + 1]];
  }
  renderApplication();
  renderSchools();
}

function autoFill(mode) {
  if (!state.candidate.score) return;
  const buckets = { dream: [], rush: [], stable: [], safe: [] };
  schools.forEach((school) => buckets[riskOf(school).key].push(school));
  Object.values(buckets).forEach((list) => list.sort((a, b) => schoolLine(a) - schoolLine(b)));
  let picks = [];
  if (mode === "conservative") {
    picks = [...buckets.stable.slice(0, 2), ...buckets.safe.slice(0, 4)];
    addFeed("家长模式", "保守防滑档，主打一个今晚能睡着。");
  } else if (mode === "aggressive") {
    picks = [...buckets.dream.slice(0, 2), ...buckets.rush.slice(0, 3), ...buckets.stable.slice(0, 1)];
    addFeed("热血模式", "全冲梦校，心率和院校代码一起上升。");
  } else {
    picks = [...buckets.rush.slice(0, 2), ...buckets.stable.slice(0, 2), ...buckets.safe.slice(0, 2)];
    addFeed("智能填报", "已生成冲稳保梯度，看起来像班主任会点头。");
  }
  const unique = [];
  picks.forEach((school) => {
    if (school && !unique.some((item) => item.code === school.code)) unique.push(school);
  });
  [...schools].sort((a, b) => Math.abs(state.candidate.rank / schoolLine(a) - .9) - Math.abs(state.candidate.rank / schoolLine(b) - .9))
    .forEach((school) => {
      if (unique.length < 6 && !unique.some((item) => item.code === school.code)) unique.push(school);
    });
  const fitMajors = tracks[state.candidate.track].majorFit;
  state.slots = Array.from({ length: 6 }, (_, index) => {
    const school = unique[index];
    if (!school) return null;
    const major = school.majors.find((item) => fitMajors.includes(item)) || school.majors[0];
    return { code: school.code, major, obey: mode !== "aggressive" };
  });
  renderApplication();
  renderSchools();
}

function clearApplication() {
  state.slots = Array.from({ length: 6 }, () => null);
  addFeed("志愿表", "已清空。人生回到草稿纸状态。");
  renderApplication();
  renderSchools();
}

function calculateMetrics() {
  const filled = state.slots.filter(Boolean);
  if (!filled.length) return { rush: 0, stable: 0, fit: 0, parent: 0 };
  let rush = 0;
  let stable = 0;
  let fit = 0;
  let parent = 20;
  const fitMajors = tracks[state.candidate.track].majorFit;
  filled.forEach((slot) => {
    const school = schools.find((item) => item.code === slot.code);
    const risk = riskOf(school).key;
    rush += { dream: 94, rush: 76, stable: 42, safe: 18 }[risk];
    stable += { dream: 20, rush: 44, stable: 74, safe: 92 }[risk];
    fit += fitMajors.includes(slot.major) ? 92 : majorFactors[slot.major] < .9 ? 70 : 58;
    parent += school.tier === "985" ? 8 : school.tier === "211" ? 6 : 2;
    parent += slot.obey ? -3 : 8;
  });
  return {
    rush: clamp(Math.round(rush / filled.length), 0, 100),
    stable: clamp(Math.round(stable / filled.length), 0, 100),
    fit: clamp(Math.round(fit / filled.length), 0, 100),
    parent: clamp(Math.round(parent), 0, 100)
  };
}

function renderMetrics() {
  const metrics = calculateMetrics();
  els.metricStatus.textContent = state.slots.filter(Boolean).length ? `${state.slots.filter(Boolean).length}/6` : "未填报";
  [
    [els.rushMeter, els.rushValue, metrics.rush],
    [els.stableMeter, els.stableValue, metrics.stable],
    [els.fitMeter, els.fitValue, metrics.fit],
    [els.parentMeter, els.parentValue, metrics.parent]
  ].forEach(([bar, valueEl, value]) => {
    bar.style.width = `${value}%`;
    valueEl.textContent = value;
  });
}

function simulateAdmission() {
  const timeline = [];
  let result = null;
  timeline.push(["系统", `开始本科批平行志愿模拟投档。模拟位次 ${formatRank(state.candidate.rank)}，一轮投档。`]);
  for (let i = 0; i < state.slots.length; i += 1) {
    const slot = state.slots[i];
    const letter = String.fromCharCode(65 + i);
    if (!slot) {
      timeline.push([`${letter} 志愿`, "空志愿，直接跳过。"]);
      continue;
    }
    const school = schools.find((item) => item.code === slot.code);
    const line = schoolLine(school);
    const mLine = majorLine(school, slot.major);
    timeline.push([`${letter} 志愿`, `检索 ${school.name}，模拟投档线 ${formatRank(line)}，你的位次 ${formatRank(state.candidate.rank)}。`]);
    if (state.candidate.rank <= line) {
      timeline.push(["投档成功", `档案投进 ${school.name}，后续志愿不再检索。`]);
      if (state.candidate.rank <= mLine) {
        result = {
          type: "admit",
          letter,
          school,
          major: slot.major,
          title: `已被 ${school.name} 录取`,
          summary: `${letter} 志愿投档成功，并被 ${slot.major} 录取。现在可以开始研究宿舍床位和开学高铁票。`
        };
        timeline.push(["专业录取", `${slot.major} 模拟专业线 ${formatRank(mLine)}，你够线。`]);
      } else if (slot.obey) {
        const adjust = adjustMajors.find((major) => school.majors.includes(major)) || adjustMajors[Math.floor(noise(school.code, adjustMajors.length))] || "公共管理类";
        result = {
          type: "transfer",
          letter,
          school,
          major: adjust,
          title: `已被 ${school.name} 录取`,
          summary: `${letter} 志愿投档成功，但 ${slot.major} 未达到模拟专业线。因服从调剂，录取到 ${adjust}。这就是调剂盲盒。`
        };
        timeline.push(["专业调剂", `${slot.major} 没够专业线；服从调剂生效，系统打开了盲盒。`]);
      } else {
        result = {
          type: "reject",
          letter,
          school,
          major: slot.major,
          title: "退档：未服从专业调剂",
          summary: `档案投进 ${school.name}，但 ${slot.major} 未达到模拟专业线且未服从调剂。后续志愿无法继续检索，只能等征集志愿。`
        };
        timeline.push(["退档", "未服从调剂触发退档。系统提示：专业洁癖要配合足够位次。"]);
      }
      break;
    }
    timeline.push(["未投出", `${school.name} 模拟投档线未达到，继续检索下一志愿。`]);
  }
  if (!result) {
    result = {
      type: "slide",
      letter: "征集",
      school: { name: "征集志愿系统", code: "0000000000", city: "待定", tier: "public" },
      major: "等待补录",
      title: "滑档：进入征集志愿副本",
      summary: "所有已填志愿都未投出。系统建议立刻降低焦虑，认真查看征集志愿计划。"
    };
    timeline.push(["滑档", "A-F 均未投出，征集志愿副本已解锁。"]);
  }
  state.result = { ...result, timeline, metrics: calculateMetrics() };
  buildShareText();
  renderResult();
  enableStep("result");
  switchStep("result");
}

function buildShareText() {
  const r = state.result;
  state.shareText = `我在高考志愿填报模拟器查到 ${state.candidate.score} 分，模拟位次 ${formatRank(state.candidate.rank)}。\n录取结果：${r.title}\n院校：${r.school.name}\n专业：${r.major}\n纯娱乐模拟，不代表真实志愿填报建议。`;
}

function renderResult() {
  const r = state.result;
  els.resultTitle.textContent = r.title;
  els.resultSummary.textContent = r.summary;
  els.resultStats.innerHTML = "";
  [
    ["总分", state.candidate.score],
    ["模拟位次", formatRank(state.candidate.rank)],
    ["投档志愿", r.letter],
    ["院校代码", r.school.code],
    ["录取专业", r.major],
    ["稳妥值", r.metrics.stable]
  ].forEach(([label, value]) => {
    const div = document.createElement("div");
    div.className = "result-stat";
    div.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    els.resultStats.appendChild(div);
  });
  els.processList.innerHTML = "";
  r.timeline.forEach(([name, text]) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${name}</b><span>${text}</span>`;
    els.processList.appendChild(li);
  });
  els.processCount.textContent = `${r.timeline.length} 条`;
  els.copyBtn.disabled = false;
  els.copyTopBtn.disabled = false;
  els.downloadBtn.disabled = false;
  addFeed("录取结果", r.summary);
  drawPoster();
}

function drawPoster() {
  const r = state.result;
  const canvas = els.posterCanvas;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#eef3f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#123b73";
  ctx.fillRect(40, 40, 820, 150);
  ctx.fillStyle = "#fff";
  ctx.font = "900 42px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("普通高校招生网上志愿填报系统", 82, 102);
  ctx.font = "700 24px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("娱乐模拟录取结果", 84, 148);

  ctx.fillStyle = "#fff";
  roundRect(ctx, 64, 230, 772, 300, 18);
  ctx.fill();
  ctx.strokeStyle = "#123b73";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "#172033";
  ctx.font = "900 38px PingFang SC, Microsoft YaHei, sans-serif";
  wrapText(ctx, r.title, 104, 306, 700, 48);
  ctx.font = "800 27px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillStyle = r.type === "admit" ? "#087a55" : r.type === "transfer" ? "#d98200" : "#d93628";
  wrapText(ctx, `${r.school.name} · ${r.major}`, 104, 402, 700, 38);
  ctx.fillStyle = "#5d6878";
  ctx.font = "700 22px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText(`${state.candidate.alias} · ${state.candidate.score} 分 · 位次 ${formatRank(state.candidate.rank)}`, 104, 488);

  ctx.fillStyle = "#172033";
  ctx.font = "900 30px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("志愿表", 64, 610);
  ctx.font = "700 20px PingFang SC, Microsoft YaHei, sans-serif";
  state.slots.forEach((slot, i) => {
    const x = i % 2 === 0 ? 64 : 462;
    const y = 642 + Math.floor(i / 2) * 78;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, x, y, 350, 54, 12);
    ctx.fill();
    ctx.strokeStyle = "#cdd8e6";
    ctx.lineWidth = 2;
    ctx.stroke();
    if (slot) {
      const school = schools.find((item) => item.code === slot.code);
      const risk = riskOf(school);
      ctx.fillStyle = risk.key === "safe" ? "#087a55" : risk.key === "stable" ? "#2469bd" : risk.key === "rush" ? "#d98200" : "#d93628";
      ctx.fillText(`${String.fromCharCode(65 + i)} ${risk.label}`, x + 18, y + 34);
      ctx.fillStyle = "#172033";
      ctx.fillText(school.name.slice(0, 10), x + 86, y + 34);
    } else {
      ctx.fillStyle = "#9aa5b3";
      ctx.fillText(`${String.fromCharCode(65 + i)} 空`, x + 18, y + 34);
    }
  });

  const metrics = [["冲刺", r.metrics.rush, "#d93628"], ["稳妥", r.metrics.stable, "#087a55"], ["专业匹配", r.metrics.fit, "#2469bd"], ["家长血压", r.metrics.parent, "#d98200"]];
  metrics.forEach(([label, value, color], i) => {
    const y = 920 + i * 46;
    ctx.fillStyle = "#172033";
    ctx.font = "800 22px PingFang SC, Microsoft YaHei, sans-serif";
    ctx.fillText(label, 86, y);
    ctx.fillStyle = "#dce6f2";
    roundRect(ctx, 230, y - 18, 460, 18, 9);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(ctx, 230, y - 18, 460 * (value / 100), 18, 9);
    ctx.fill();
    ctx.fillStyle = "#172033";
    ctx.fillText(String(value), 720, y);
  });

  ctx.fillStyle = "#5d6878";
  ctx.font = "700 20px PingFang SC, Microsoft YaHei, sans-serif";
  ctx.fillText("真实高校名称 + 娱乐模拟参数，不代表真实分数线或录取概率。", 82, 1138);
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let line = "";
  [...String(text)].forEach((char, index, chars) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = test;
    }
    if (index === chars.length - 1 && line) ctx.fillText(line, x, y);
  });
}

async function copyResult() {
  if (!state.shareText) return;
  try {
    await navigator.clipboard.writeText(state.shareText);
    addFeed("复制成功", "录取结果已复制，可以发给朋友围观。");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = state.shareText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    addFeed("复制成功", "录取结果已复制。");
  }
}

function downloadPoster() {
  if (!state.result) return;
  drawPoster();
  const link = document.createElement("a");
  link.href = els.posterCanvas.toDataURL("image/png");
  link.download = `gaokao-admission-result-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function resetGame() {
  state = initialState();
  els.aliasInput.value = "查分同学";
  els.provinceSelect.value = "henan";
  els.trackSelect.value = "physics";
  els.ritualSelect.value = "steady";
  els.scoreReport.classList.add("hidden");
  els.subjectGrid.innerHTML = "";
  els.applicationBody.innerHTML = "";
  els.schoolBody.innerHTML = "";
  els.processList.innerHTML = "";
  els.processCount.textContent = "0 条";
  els.feedList.innerHTML = "";
  els.feedCount.textContent = "0 条";
  els.copyBtn.disabled = true;
  els.copyTopBtn.disabled = true;
  els.downloadBtn.disabled = true;
  els.steps.forEach((step) => {
    step.disabled = step.dataset.step !== "score";
  });
  renderCandidate();
  renderApplication();
  renderSchools();
  renderMetrics();
  addFeed("系统", "请先查询成绩，再进入本科批志愿填报。");
  addFeed("班主任", "冲稳保不是玄学，是把心跳分层管理。");
  switchStep("score");
}

els.scoreForm.addEventListener("submit", generateScore);
els.enterApplyBtn.addEventListener("click", () => switchStep("apply"));
els.resetBtn.addEventListener("click", resetGame);
els.copyTopBtn.addEventListener("click", copyResult);
els.copyBtn.addEventListener("click", copyResult);
els.downloadBtn.addEventListener("click", downloadPoster);
els.backApplyBtn.addEventListener("click", () => switchStep("apply"));
els.submitBtn.addEventListener("click", simulateAdmission);
els.balancedBtn.addEventListener("click", () => autoFill("balanced"));
els.conservativeBtn.addEventListener("click", () => autoFill("conservative"));
els.aggressiveBtn.addEventListener("click", () => autoFill("aggressive"));
els.clearBtn.addEventListener("click", clearApplication);
els.applicationBody.addEventListener("click", handleApplicationAction);
els.applicationBody.addEventListener("change", handleApplicationAction);
els.schoolBody.addEventListener("click", (event) => {
  const code = event.target.dataset.add;
  if (code) addSchool(code);
});
[els.searchInput, els.riskFilter, els.tierFilter].forEach((input) => {
  input.addEventListener("input", renderSchools);
  input.addEventListener("change", renderSchools);
});
els.steps.forEach((step) => {
  step.addEventListener("click", () => {
    if (!step.disabled) switchStep(step.dataset.step);
  });
});

resetGame();
