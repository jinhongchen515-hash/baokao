// 福建省高考批次线数据（参考数据，以教育考试院公布为准）
export const batchLines = {
  "2024": {
    physics: {
      "本科提前批": 465,
      "本科批": 465,
      "特殊类型招生控制线": 538,
      "专科批": 220,
    },
    history: {
      "本科提前批": 465,
      "本科批": 465,
      "特殊类型招生控制线": 519,
      "专科批": 220,
    },
  },
  "2023": {
    physics: {
      "本科提前批": 431,
      "本科批": 431,
      "特殊类型招生控制线": 518,
      "专科批": 220,
    },
    history: {
      "本科提前批": 453,
      "本科批": 453,
      "特殊类型招生控制线": 531,
      "专科批": 220,
    },
  },
  "2022": {
    physics: {
      "本科提前批": 428,
      "本科批": 428,
      "特殊类型招生控制线": 520,
      "专科批": 220,
    },
    history: {
      "本科提前批": 468,
      "本科批": 468,
      "特殊类型招生控制线": 542,
      "专科批": 221,
    },
  },
};

// 厦门本地院校信息
export const xiamenUniversities = [
  {
    name: "厦门大学",
    type: "985/211",
    category: "综合",
    location: "思明区/翔安区",
    features: ["双一流建设高校", "世界知名学府", "海洋学科全国领先", "会计学/金融学强势"],
    minScore: { "2024": 618, "2023": 613, "2022": 610 },
    minRank: { "2024": 4200, "2023": 4500, "2022": 4800 },
    tags: ["985", "211", "双一流"],
    color: "#1a56db",
  },
  {
    name: "华侨大学",
    type: "部属",
    category: "综合",
    location: "丰泽区(泉州)/思明区",
    features: ["中央统战部直属", "面向海内外招生", "建筑学/土木工程强", "多元文化氛围"],
    minScore: { "2024": 545, "2023": 540, "2022": 535 },
    minRank: { "2024": 31000, "2023": 33000, "2022": 35000 },
    tags: ["部属", "重点"],
    color: "#c2410c",
  },
  {
    name: "集美大学",
    type: "省属",
    category: "综合",
    location: "集美区",
    features: ["百年名校", "航海/水产特色", "船舶与海洋工程", "嘉庚精神传承"],
    minScore: { "2024": 520, "2023": 515, "2022": 510 },
    minRank: { "2024": 46000, "2023": 48000, "2022": 50000 },
    tags: ["省重点", "航海特色"],
    color: "#0891b2",
  },
  {
    name: "厦门理工学院",
    type: "省属",
    category: "理工",
    location: "集美区",
    features: ["应用型本科", "机械/电子信息", "光学工程特色", "产教融合突出"],
    minScore: { "2024": 500, "2023": 495, "2022": 490 },
    minRank: { "2024": 58000, "2023": 60000, "2022": 62000 },
    tags: ["省属", "应用型"],
    color: "#059669",
  },
  {
    name: "厦门医学院",
    type: "省属",
    category: "医学",
    location: "集美区",
    features: ["医学专门院校", "临床医学/护理学", "口腔医学特色", "基层医疗人才培养"],
    minScore: { "2024": 495, "2023": 490, "2022": 488 },
    minRank: { "2024": 63000, "2023": 65000, "2022": 66000 },
    tags: ["省属", "医学"],
    color: "#7c3aed",
  },
  {
    name: "厦门城市职业学院",
    type: "市属",
    category: "综合",
    location: "思明区/翔安区",
    features: ["高职高专", "数字媒体/旅游管理", "校企合作紧密", "就业率高"],
    minScore: { "2024": 380, "2023": 370, "2022": 365 },
    minRank: { "2024": null, "2023": null, "2022": null },
    tags: ["高职", "市属"],
    color: "#ca8a04",
  },
];

// 热门专业分类与推荐
export const majorCategories = [
  {
    name: "工学",
    icon: "Wrench",
    description: "工程技术类，就业面广",
    majors: [
      { name: "计算机科学与技术", hot: true, salary: "8K-25K", trend: "up" },
      { name: "软件工程", hot: true, salary: "9K-28K", trend: "up" },
      { name: "人工智能", hot: true, salary: "12K-35K", trend: "up" },
      { name: "电子信息工程", hot: true, salary: "7K-20K", trend: "up" },
      { name: "机械工程", hot: false, salary: "6K-15K", trend: "stable" },
      { name: "电气工程及其自动化", hot: true, salary: "7K-18K", trend: "up" },
    ],
  },
  {
    name: "理学",
    icon: "Atom",
    description: "基础科学，深造空间大",
    majors: [
      { name: "数学与应用数学", hot: false, salary: "6K-15K", trend: "stable" },
      { name: "统计学", hot: true, salary: "8K-22K", trend: "up" },
      { name: "数据科学", hot: true, salary: "10K-30K", trend: "up" },
      { name: "物理学", hot: false, salary: "5K-12K", trend: "stable" },
    ],
  },
  {
    name: "管理学",
    icon: "Briefcase",
    description: "商科管理，职业发展路径清晰",
    majors: [
      { name: "会计学", hot: true, salary: "6K-18K", trend: "stable" },
      { name: "金融学", hot: true, salary: "8K-30K", trend: "up" },
      { name: "工商管理", hot: false, salary: "5K-15K", trend: "stable" },
      { name: "电子商务", hot: true, salary: "6K-18K", trend: "up" },
    ],
  },
  {
    name: "医学",
    icon: "Heart",
    description: "医疗健康，社会需求稳定",
    majors: [
      { name: "临床医学", hot: true, salary: "8K-25K", trend: "up" },
      { name: "口腔医学", hot: true, salary: "10K-35K", trend: "up" },
      { name: "护理学", hot: false, salary: "5K-12K", trend: "stable" },
      { name: "药学", hot: true, salary: "6K-18K", trend: "up" },
    ],
  },
  {
    name: "法学",
    icon: "Scale",
    description: "法律专业，公检法司方向",
    majors: [
      { name: "法学", hot: true, salary: "5K-20K", trend: "stable" },
      { name: "知识产权", hot: true, salary: "7K-18K", trend: "up" },
    ],
  },
  {
    name: "文学",
    icon: "BookOpen",
    description: "语言文化，教育传媒方向",
    majors: [
      { name: "汉语言文学", hot: true, salary: "5K-12K", trend: "stable" },
      { name: "英语", hot: false, salary: "5K-14K", trend: "stable" },
      { name: "新闻传播学", hot: false, salary: "5K-15K", trend: "stable" },
    ],
  },
];

// 志愿填报时间轴
export const timelineEvents = [
  {
    date: "6月9日",
    title: "高考结束",
    description: "放松心情，开始关注志愿填报信息",
    status: "completed",
  },
  {
    date: "6月10-15日",
    title: "估分与成绩查询",
    description: "参考答案估分，等待正式成绩公布",
    status: "completed",
  },
  {
    date: "6月25日左右",
    title: "成绩公布",
    description: "查询高考成绩，了解全省排名位次",
    status: "current",
  },
  {
    date: "6月25-29日",
    title: "志愿填报（提前批）",
    description: "填报提前批次志愿，包括军校、公安、航海等特殊院校",
    status: "upcoming",
  },
  {
    date: "6月30日-7月2日",
    title: "志愿填报（本科批）",
    description: "填报本科批常规志愿，可填报最多40个院校专业组",
    status: "upcoming",
  },
  {
    date: "7月-8月",
    title: "录取结果公布",
    description: "各批次录取结果陆续公布，关注征集志愿机会",
    status: "upcoming",
  },
];

// 填报策略
export const strategies = [
  {
    id: "1",
    title: "冲稳保策略",
    description: "将志愿院校分为「冲刺」「稳妥」「保底」三个梯次，合理分配志愿名额。",
    detail: "建议按照「冲2-3所、稳5-8所、保2-3所」的比例分配。冲刺院校选择略高于自己排名的学校，稳妥院校选择与排名匹配的，保底院校选择排名明显低于自己的。",
    icon: "Target",
    tag: "核心策略",
    tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    id: "2",
    title: "位次优先法",
    description: "以全省位次为主要参考，比单纯看分数更科学可靠。",
    detail: "福建高考实行平行志愿，按「分数优先、遵循志愿、一轮投档」原则。因此应重点参考目标院校往年的录取位次，而非录取分数线。建议将位次作为筛选院校的第一标准。",
    icon: "BarChart3",
    tag: "关键原则",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "3",
    title: "专业优先 vs 学校优先",
    description: "根据个人规划，在名校冷门专业和普通院校王牌专业之间做出权衡。",
    detail: "如果计划考研深造或进入体制内，学校品牌更重要；如果希望直接就业，专业对口更关键。建议高分考生优先考虑学校层次，中等分数考生优先考虑专业实力。",
    icon: "Scale",
    tag: "选择策略",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    id: "4",
    title: "地域因素考量",
    description: "一线城市高校资源丰富，但录取分数线也相对较高。",
    detail: "厦门本地高校如厦门大学、集美大学等有地域优势。北上广深高校视野开阔但竞争激烈。建议综合考虑城市发展与自身职业规划的匹配度。",
    icon: "MapPin",
    tag: "辅助参考",
    tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    id: "5",
    title: "服从调剂",
    description: "建议在非首选志愿中勾选「服从专业调剂」，降低退档风险。",
    detail: "在平行志愿模式下，一旦被投档后退档，将只能参加征集志愿。为避免退档，建议在不太确定的情况下勾选服从调剂。但要注意，调剂可能分配到不喜欢的专业。",
    icon: "CheckCircle",
    tag: "防退档",
    tagColor: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    id: "6",
    title: "关注特殊招生",
    description: "了解强基计划、综合评价、专项计划等特殊招生渠道。",
    detail: "国家专项、地方专项、高校专项面向农村及贫困地区；强基计划面向基础学科拔尖学生；综合评价招生考虑综合素质。符合条件的考生应积极申请这些降分录取机会。",
    icon: "Star",
    tag: "加分机会",
    tagColor: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
];

// 政策解读要点
export const policyPoints = [
  {
    title: "平行志愿投档规则",
    content: "福建省本科批实行「院校专业组」平行志愿，考生可填报最多40个院校专业组志愿。投档时按照「分数优先、遵循志愿、一轮投档」的原则进行。",
    highlight: "一轮投档意味着每位考生只有一次投档机会",
  },
  {
    title: "选科要求变化",
    content: "2024年起，福建省新高考采用「3+1+2」模式。理工类专业普遍要求选考物理，部分专业还要求化学或生物。文科类专业以历史为首选科目。",
    highlight: "务必确认目标专业的选科要求是否符合",
  },
  {
    title: "加分政策调整",
    content: "福建省高考加分政策逐年收紧，目前保留的加分项目包括：烈士子女、归侨/华侨子女、台湾省籍考生等。加分最高不超过20分，且仅适用于省属高校。",
    highlight: "加分在投档时计入总分，但专业分配时多数高校按裸分排序",
  },
  {
    title: "厦门考生本地优势",
    content: "部分驻厦高校在厦门地区可能有少量地方专项计划或定向招生名额。此外，厦门一中等名校的考生在综合素质评价方面有一定优势。",
    highlight: "关注厦门大学、集美大学等本地高校的招生优惠政策",
  },
];
