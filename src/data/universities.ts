// 全国本科院校数据库
// 数据来源：教育部公开信息，按省份分类
// 包含：985/211/双一流/普通本科院校

export interface University {
  id: string;
  name: string;
  province: string;
  city: string;
  type: string;        // 综合/理工/师范/医学/财经/政法/农林/民族/军事/艺术/体育
  level: "985" | "211" | "双一流" | "普通本科" | "民办本科" | "合作办学";
  is985: boolean;
  is211: boolean;
  isDoubleFirst: boolean;
  features: string[];
  // 2024年参考录取数据（物理类/历史类通用范围）
  scoreRange: {
    min: number;
    max: number;
  };
  rankRange?: {
    min: number;
    max: number;
  };
  // 热门专业
  hotMajors: string[];
  website?: string;
}

// 各省份本科院校
export const universitiesByProvince: Record<string, University[]> = {
  北京: [
    { id: "bj-01", name: "北京大学", province: "北京", city: "北京", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["最高学府", "文理双强", "基础学科领先"], scoreRange: { min: 685, max: 700 }, rankRange: { min: 50, max: 300 }, hotMajors: ["数学", "物理学", "法学", "经济学", "计算机"], website: "https://www.pku.edu.cn" },
    { id: "bj-02", name: "清华大学", province: "北京", city: "北京", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科最高", "计算机顶尖", "理科极强"], scoreRange: { min: 685, max: 700 }, rankRange: { min: 50, max: 300 }, hotMajors: ["计算机", "电子信息", "自动化", "建筑学", "经济管理"], website: "https://www.tsinghua.edu.cn" },
    { id: "bj-03", name: "中国人民大学", province: "北京", city: "北京", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["人文社科顶尖", "经济学领先", "法学强校"], scoreRange: { min: 665, max: 680 }, rankRange: { min: 800, max: 2000 }, hotMajors: ["法学", "经济学", "金融学", "新闻学", "社会学"], website: "https://www.ruc.edu.cn" },
    { id: "bj-04", name: "北京航空航天大学", province: "北京", city: "北京", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["航空航天特色", "工科强校", "信息学科突出"], scoreRange: { min: 655, max: 670 }, rankRange: { min: 2000, max: 4000 }, hotMajors: ["计算机", "航空航天", "自动化", "软件工程", "电子信息"], website: "https://www.buaa.edu.cn" },
    { id: "bj-05", name: "北京理工大学", province: "北京", city: "北京", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["国防七子", "兵器科学顶尖", "信息学科强"], scoreRange: { min: 650, max: 665 }, rankRange: { min: 2500, max: 4500 }, hotMajors: ["计算机", "电子信息", "自动化", "兵器", "车辆工程"], website: "https://www.bit.edu.cn" },
    { id: "bj-06", name: "中国农业大学", province: "北京", city: "北京", type: "农林", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["农学最高", "生命科学强", "食品科学领先"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["农学", "食品科学", "生物学", "动物医学", "农业工程"], website: "https://www.cau.edu.cn" },
    { id: "bj-07", name: "北京师范大学", province: "北京", city: "北京", type: "师范", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["师范第一", "教育学顶尖", "心理学领先"], scoreRange: { min: 645, max: 660 }, rankRange: { min: 3000, max: 5500 }, hotMajors: ["教育学", "心理学", "汉语言文学", "数学", "历史学"], website: "https://www.bnu.edu.cn" },
    { id: "bj-08", name: "中央民族大学", province: "北京", city: "北京", type: "民族", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["民族特色", "多元文化", "社会科学"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["民族学", "社会学", "法学", "中国语言文学", "历史学"], website: "https://www.muc.edu.cn" },
    { id: "bj-09", name: "北京交通大学", province: "北京", city: "北京", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["交通特色", "信息学科强", "系统科学"], scoreRange: { min: 610, max: 630 }, rankRange: { min: 8000, max: 13000 }, hotMajors: ["交通运输", "计算机", "通信工程", "电子信息", "经济管理"], website: "https://www.bjtu.edu.cn" },
    { id: "bj-10", name: "北京科技大学", province: "北京", city: "北京", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["材料科学强", "冶金特色", "工科实力突出"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["材料科学", "冶金工程", "计算机", "机械工程", "矿业工程"], website: "https://www.ustb.edu.cn" },
    { id: "bj-11", name: "北京邮电大学", province: "北京", city: "北京", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["信息黄埔", "通信顶尖", "计算机极强"], scoreRange: { min: 625, max: 645 }, rankRange: { min: 5500, max: 9000 }, hotMajors: ["计算机", "通信工程", "电子信息", "人工智能", "网络空间安全"], website: "https://www.bupt.edu.cn" },
    { id: "bj-12", name: "中央财经大学", province: "北京", city: "北京", type: "财经", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["财经名校", "金融学强", "经济学突出"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["金融学", "会计学", "经济学", "财政学", "保险学"], website: "https://www.cufe.edu.cn" },
    { id: "bj-13", name: "对外经济贸易大学", province: "北京", city: "北京", type: "财经", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["国际贸易强校", "外语+经贸", "国际化程度高"], scoreRange: { min: 618, max: 638 }, rankRange: { min: 6500, max: 11000 }, hotMajors: ["国际贸易", "金融学", "会计学", "法学", "商务英语"], website: "https://www.uibe.edu.cn" },
    { id: "bj-14", name: "中国政法大学", province: "北京", city: "北京", type: "政法", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["法学最高", "政法特色", "法官摇篮"], scoreRange: { min: 625, max: 645 }, rankRange: { min: 5500, max: 9000 }, hotMajors: ["法学", "政治学", "社会学", "侦查学", "公共管理"], website: "https://www.cupl.edu.cn" },
    { id: "bj-15", name: "北京外国语大学", province: "北京", city: "北京", type: "语言", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["外语最高", "语种最多", "外交官摇篮"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["英语", "法语", "德语", "日语", "外交学"], website: "https://www.bfsu.edu.cn" },
  ],
  上海: [
    { id: "sh-01", name: "复旦大学", province: "上海", city: "上海", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["华东第一", "文理医三强", "国际化程度高"], scoreRange: { min: 675, max: 690 }, rankRange: { min: 200, max: 800 }, hotMajors: ["临床医学", "经济学", "新闻学", "数学", "哲学"], website: "https://www.fudan.edu.cn" },
    { id: "sh-02", name: "上海交通大学", province: "上海", city: "上海", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科顶尖", "医学强校", "综合性大学"], scoreRange: { min: 675, max: 690 }, rankRange: { min: 200, max: 800 }, hotMajors: ["船舶", "机械", "计算机", "临床医学", "金融学"], website: "https://www.sjtu.edu.cn" },
    { id: "sh-03", name: "同济大学", province: "上海", city: "上海", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["建筑土木第一", "工科强校", "德国合作"], scoreRange: { min: 640, max: 660 }, rankRange: { min: 3000, max: 6000 }, hotMajors: ["建筑学", "土木工程", "城乡规划", "车辆工程", "计算机"], website: "https://www.tongji.edu.cn" },
    { id: "sh-04", name: "华东师范大学", province: "上海", city: "上海", type: "师范", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["师范强校", "教育学领先", "文理兼备"], scoreRange: { min: 615, max: 635 }, rankRange: { min: 6500, max: 11000 }, hotMajors: ["教育学", "心理学", "地理学", "汉语言文学", "数学"], website: "https://www.ecnu.edu.cn" },
    { id: "sh-05", name: "上海财经大学", province: "上海", city: "上海", type: "财经", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["财经名校", "会计学顶尖", "金融学领先"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["会计学", "金融学", "经济学", "财政学", "统计学"], website: "https://www.sufe.edu.cn" },
    { id: "sh-06", name: "上海外国语大学", province: "上海", city: "上海", type: "语言", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["外语名校", "国际化教育", "翻译学强"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["英语", "日语", "法语", "翻译学", "国际经济与贸易"], website: "https://www.shisu.edu.cn" },
    { id: "sh-07", name: "华东理工大学", province: "上海", city: "上海", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["化工顶尖", "材料科学强", "工科实力突出"], scoreRange: { min: 590, max: 610 }, rankRange: { min: 13000, max: 20000 }, hotMajors: ["化学工程", "材料科学", "生物工程", "计算机", "环境工程"], website: "https://www.ecust.edu.cn" },
    { id: "sh-08", name: "东华大学", province: "上海", city: "上海", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["纺织服装第一", "材料科学强", "设计学突出"], scoreRange: { min: 570, max: 590 }, rankRange: { min: 20000, max: 30000 }, hotMajors: ["纺织工程", "服装设计", "材料科学", "环境工程", "计算机"], website: "https://www.dhu.edu.cn" },
  ],
  广东: [
    { id: "gd-01", name: "中山大学", province: "广东", city: "广州", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["华南第一", "文理医工", "岭南名校"], scoreRange: { min: 635, max: 655 }, rankRange: { min: 3500, max: 7000 }, hotMajors: ["临床医学", "计算机", "金融学", "管理学", "生物医学"], website: "https://www.sysu.edu.cn" },
    { id: "gd-02", name: "华南理工大学", province: "广东", city: "广州", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科强校", "建筑老八校", "轻工特色"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["建筑学", "计算机", "电子信息", "材料科学", "食品科学"], website: "https://www.scut.edu.cn" },
    { id: "gd-03", name: "暨南大学", province: "广东", city: "广州", type: "综合", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["侨校特色", "新闻学强", "经济学突出"], scoreRange: { min: 590, max: 610 }, rankRange: { min: 13000, max: 20000 }, hotMajors: ["新闻学", "经济学", "金融学", "会计学", "华文教育"], website: "https://www.jnu.edu.cn" },
    { id: "gd-04", name: "华南师范大学", province: "广东", city: "广州", type: "师范", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["师范强校", "教育学领先", "心理学突出"], scoreRange: { min: 575, max: 595 }, rankRange: { min: 18000, max: 26000 }, hotMajors: ["教育学", "心理学", "汉语言文学", "物理学", "化学"], website: "https://www.scnu.edu.cn" },
    { id: "gd-05", name: "深圳大学", province: "广东", city: "深圳", type: "综合", level: "双一流", is985: false, is211: false, isDoubleFirst: true, features: ["特区大学", "发展迅速", "计算机强"], scoreRange: { min: 580, max: 600 }, rankRange: { min: 16000, max: 24000 }, hotMajors: ["计算机", "电子信息", "光学工程", "建筑学", "金融学"], website: "https://www.szu.edu.cn" },
    { id: "gd-06", name: "南方科技大学", province: "广东", city: "深圳", type: "理工", level: "双一流", is985: false, is211: false, isDoubleFirst: true, features: ["新锐大学", "科研导向", "师资顶尖"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["物理学", "化学", "生物学", "计算机", "材料科学"], website: "https://www.sustech.edu.cn" },
  ],
  江苏: [
    { id: "js-01", name: "南京大学", province: "江苏", city: "南京", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["华东五校", "文理强校", "天文学领先"], scoreRange: { min: 650, max: 665 }, rankRange: { min: 2500, max: 4500 }, hotMajors: ["物理学", "天文学", "计算机", "化学", "经济学"], website: "https://www.nju.edu.cn" },
    { id: "js-02", name: "东南大学", province: "江苏", city: "南京", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["建筑老八校", "工科强校", "生物医学工程"], scoreRange: { min: 635, max: 650 }, rankRange: { min: 3500, max: 7000 }, hotMajors: ["建筑学", "土木工程", "电子信息", "计算机", "生物医学工程"], website: "https://www.seu.edu.cn" },
    { id: "js-03", name: "南京航空航天大学", province: "江苏", city: "南京", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["航空航天", "工科强校", "国防特色"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["航空航天", "计算机", "自动化", "电子信息", "机械工程"], website: "https://www.nuaa.edu.cn" },
    { id: "js-04", name: "南京理工大学", province: "江苏", city: "南京", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["国防七子", "兵器科学", "化工强"], scoreRange: { min: 595, max: 615 }, rankRange: { min: 11000, max: 18000 }, hotMajors: ["兵器", "化学工程", "电子信息", "计算机", "机械工程"], website: "https://www.njust.edu.cn" },
    { id: "js-05", name: "苏州大学", province: "江苏", city: "苏州", type: "综合", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["名城大学", "医学特色", "纺织工程"], scoreRange: { min: 580, max: 600 }, rankRange: { min: 16000, max: 24000 }, hotMajors: ["医学", "法学", "纺织工程", "化学", "材料科学"], website: "https://www.suda.edu.cn" },
    { id: "js-06", name: "中国矿业大学", province: "江苏", city: "徐州", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["矿业顶尖", "安全工程", "能源特色"], scoreRange: { min: 560, max: 580 }, rankRange: { min: 24000, max: 35000 }, hotMajors: ["矿业工程", "安全工程", "土木工程", "计算机", "电气工程"], website: "https://www.cumt.edu.cn" },
  ],
  浙江: [
    { id: "zj-01", name: "浙江大学", province: "浙江", city: "杭州", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["华东五校", "综合实力前三", "工科农学医学强"], scoreRange: { min: 660, max: 675 }, rankRange: { min: 1000, max: 3000 }, hotMajors: ["计算机", "控制科学", "光学工程", "农学", "医学"], website: "https://www.zju.edu.cn" },
    { id: "zj-02", name: "浙江工业大学", province: "浙江", city: "杭州", type: "理工", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["省属强校", "化工特色", "工科突出"], scoreRange: { min: 560, max: 580 }, rankRange: { min: 24000, max: 35000 }, hotMajors: ["化学工程", "机械工程", "计算机", "药学", "控制科学"], website: "https://www.zjut.edu.cn" },
    { id: "zj-03", name: "宁波大学", province: "浙江", city: "宁波", type: "综合", level: "双一流", is985: false, is211: false, isDoubleFirst: true, features: ["双一流", "海洋特色", "力学学科突出"], scoreRange: { min: 565, max: 585 }, rankRange: { min: 22000, max: 32000 }, hotMajors: ["力学", "水产", "信息与通信", "英语", "数学"], website: "https://www.nbu.edu.cn" },
  ],
  湖北: [
    { id: "hb-01", name: "武汉大学", province: "湖北", city: "武汉", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["最美大学", "测绘第一", "法学强校"], scoreRange: { min: 635, max: 650 }, rankRange: { min: 3500, max: 7000 }, hotMajors: ["测绘科学", "法学", "遥感", "水利", "口腔医学"], website: "https://www.whu.edu.cn" },
    { id: "hb-02", name: "华中科技大学", province: "湖北", city: "武汉", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科强校", "医学强校", "光电第一"], scoreRange: { min: 635, max: 650 }, rankRange: { min: 3500, max: 7000 }, hotMajors: ["光电工程", "计算机", "电气工程", "临床医学", "机械工程"], website: "https://www.hust.edu.cn" },
    { id: "hb-03", name: "武汉理工大学", province: "湖北", city: "武汉", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["建材船舶", "材料科学", "交通运输"], scoreRange: { min: 590, max: 610 }, rankRange: { min: 13000, max: 20000 }, hotMajors: ["材料科学", "船舶", "汽车工程", "计算机", "设计学"], website: "https://www.whut.edu.cn" },
    { id: "hb-04", name: "中南财经政法大学", province: "湖北", city: "武汉", type: "财经", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["财经政法", "法学强校", "经济学突出"], scoreRange: { min: 595, max: 615 }, rankRange: { min: 11000, max: 18000 }, hotMajors: ["法学", "金融学", "会计学", "财政学", "经济学"], website: "https://www.zuel.edu.cn" },
    { id: "hb-05", name: "华中师范大学", province: "湖北", city: "武汉", type: "师范", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["师范强校", "教育学领先", "文理兼备"], scoreRange: { min: 580, max: 600 }, rankRange: { min: 16000, max: 24000 }, hotMajors: ["教育学", "心理学", "汉语言文学", "数学", "化学"], website: "https://www.ccnu.edu.cn" },
  ],
  四川: [
    { id: "sc-01", name: "四川大学", province: "四川", city: "成都", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["西南第一", "口腔医学第一", "数学强校"], scoreRange: { min: 620, max: 640 }, rankRange: { min: 6000, max: 10000 }, hotMajors: ["口腔医学", "临床医学", "数学", "化学", "中国语言文学"], website: "https://www.scu.edu.cn" },
    { id: "sc-02", name: "电子科技大学", province: "四川", city: "成都", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["电子信息顶尖", "两电一邮", "国防特色"], scoreRange: { min: 630, max: 650 }, rankRange: { min: 4500, max: 8000 }, hotMajors: ["电子信息", "通信工程", "计算机", "微电子", "人工智能"], website: "https://www.uestc.edu.cn" },
    { id: "sc-03", name: "西南交通大学", province: "四川", city: "成都", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["轨道交通第一", "土木工程", "电气工程"], scoreRange: { min: 580, max: 600 }, rankRange: { min: 16000, max: 24000 }, hotMajors: ["交通运输", "土木工程", "电气工程", "计算机", "机械工程"], website: "https://www.swjtu.edu.cn" },
    { id: "sc-04", name: "西南财经大学", province: "四川", city: "成都", type: "财经", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["金融名校", "经济学强", "西部财经中心"], scoreRange: { min: 590, max: 610 }, rankRange: { min: 13000, max: 20000 }, hotMajors: ["金融学", "会计学", "经济学", "保险学", "财务管理"], website: "https://www.swufe.edu.cn" },
  ],
  福建: [
    { id: "fj-01", name: "厦门大学", province: "福建", city: "厦门", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["最美大学", "海洋学科领先", "经济管理强校"], scoreRange: { min: 618, max: 638 }, rankRange: { min: 4200, max: 9000 }, hotMajors: ["会计学", "金融学", "海洋科学", "化学", "经济学"], website: "https://www.xmu.edu.cn" },
    { id: "fj-02", name: "福州大学", province: "福建", city: "福州", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["省属211", "工科强校", "化学学科突出"], scoreRange: { min: 555, max: 575 }, rankRange: { min: 25000, max: 38000 }, hotMajors: ["化学", "土木工程", "电气工程", "计算机", "机械工程"], website: "https://www.fzu.edu.cn" },
    { id: "fj-03", name: "华侨大学", province: "福建", city: "泉州/厦门", type: "综合", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["侨校特色", "建筑土木", "多元文化"], scoreRange: { min: 530, max: 555 }, rankRange: { min: 35000, max: 50000 }, hotMajors: ["建筑学", "土木工程", "计算机", "机械工程", "经济学"], website: "https://www.hqu.edu.cn" },
    { id: "fj-04", name: "集美大学", province: "福建", city: "厦门", type: "综合", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["百年名校", "航海特色", "嘉庚精神"], scoreRange: { min: 510, max: 530 }, rankRange: { min: 45000, max: 58000 }, hotMajors: ["航海技术", "轮机工程", "水产养殖", "计算机", "会计学"], website: "https://www.jmu.edu.cn" },
    { id: "fj-05", name: "福建师范大学", province: "福建", city: "福州", type: "师范", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["师范强校", "文理并重", "省属重点"], scoreRange: { min: 520, max: 545 }, rankRange: { min: 38000, max: 52000 }, hotMajors: ["教育学", "汉语言文学", "数学", "化学", "地理学"], website: "https://www.fjnu.edu.cn" },
    { id: "fj-06", name: "福建医科大学", province: "福建", city: "福州", type: "医学", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["医学特色", "临床医学", "护理学"], scoreRange: { min: 510, max: 535 }, rankRange: { min: 44000, max: 56000 }, hotMajors: ["临床医学", "口腔医学", "护理学", "药学", "医学影像"], website: "https://www.fjmu.edu.cn" },
    { id: "fj-07", name: "福建农林大学", province: "福建", city: "福州", type: "农林", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["农林特色", "生物学", "生态学"], scoreRange: { min: 490, max: 515 }, rankRange: { min: 53000, max: 65000 }, hotMajors: ["林学", "农学", "生物学", "食品科学", "风景园林"], website: "https://www.fafu.edu.cn" },
    { id: "fj-08", name: "厦门理工学院", province: "福建", city: "厦门", type: "理工", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["应用型", "产教融合", "光学特色"], scoreRange: { min: 490, max: 510 }, rankRange: { min: 55000, max: 66000 }, hotMajors: ["计算机", "电子信息", "机械工程", "光学工程", "车辆工程"], website: "https://www.xmut.edu.cn" },
    { id: "fj-09", name: "厦门医学院", province: "福建", city: "厦门", type: "医学", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["医学专科", "临床医学", "口腔医学"], scoreRange: { min: 485, max: 510 }, rankRange: { min: 58000, max: 70000 }, hotMajors: ["临床医学", "口腔医学", "护理学", "药学"], website: "https://www.xmmc.edu.cn" },
  ],
  天津: [
    { id: "tj-01", name: "南开大学", province: "天津", city: "天津", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["老牌名校", "数学化学强", "经济管理突出"], scoreRange: { min: 640, max: 655 }, rankRange: { min: 3000, max: 6000 }, hotMajors: ["数学", "化学", "经济学", "金融学", "历史学"], website: "https://www.nankai.edu.cn" },
    { id: "tj-02", name: "天津大学", province: "天津", city: "天津", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["建筑老八校", "工科名校", "化工顶尖"], scoreRange: { min: 635, max: 650 }, rankRange: { min: 3500, max: 7000 }, hotMajors: ["建筑学", "化学工程", "计算机", "电气工程", "机械工程"], website: "https://www.tju.edu.cn" },
    { id: "tj-03", name: "天津医科大学", province: "天津", city: "天津", type: "医学", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["医学强校", "临床医学", "内分泌学领先"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["临床医学", "口腔医学", "药学", "护理学", "医学影像"], website: "https://www.tmu.edu.cn" },
    { id: "tj-04", name: "中国民航大学", province: "天津", city: "天津", type: "理工", level: "普通本科", is985: false, is211: false, isDoubleFirst: false, features: ["民航特色", "飞行技术", "交通运输"], scoreRange: { min: 540, max: 565 }, rankRange: { min: 28000, max: 42000 }, hotMajors: ["飞行技术", "交通运输", "电子信息", "计算机", "航空工程"], website: "https://www.cauc.edu.cn" },
  ],
  湖南: [
    { id: "hn-01", name: "中南大学", province: "湖南", city: "长沙", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科强校", "医学强校", "冶金材料"], scoreRange: { min: 615, max: 635 }, rankRange: { min: 6500, max: 11000 }, hotMajors: ["冶金工程", "材料科学", "临床医学", "计算机", "土木工程"], website: "https://www.csu.edu.cn" },
    { id: "hn-02", name: "湖南大学", province: "湖南", city: "长沙", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["千年学府", "土木强校", "化学学科突出"], scoreRange: { min: 605, max: 625 }, rankRange: { min: 8000, max: 14000 }, hotMajors: ["土木工程", "化学", "机械工程", "金融学", "设计学"], website: "https://www.hnu.edu.cn" },
    { id: "hn-03", name: "国防科技大学", province: "湖南", city: "长沙", type: "军事", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["军校最高", "计算机顶尖", "军事特色"], scoreRange: { min: 640, max: 660 }, rankRange: { min: 3000, max: 6000 }, hotMajors: ["计算机", "软件工程", "航空航天", "通信工程", "网络空间安全"], website: "https://www.nudt.edu.cn" },
    { id: "hn-04", name: "湖南师范大学", province: "湖南", city: "长沙", type: "师范", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["师范强校", "文理并重", "外国语强"], scoreRange: { min: 570, max: 590 }, rankRange: { min: 18000, max: 26000 }, hotMajors: ["教育学", "英语", "汉语言文学", "数学", "生物科学"], website: "https://www.hunnu.edu.cn" },
  ],
  山东: [
    { id: "sd-01", name: "山东大学", province: "山东", city: "济南/青岛", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["百年名校", "数学强校", "文理医工"], scoreRange: { min: 610, max: 630 }, rankRange: { min: 8000, max: 13000 }, hotMajors: ["数学", "化学", "临床医学", "计算机", "材料科学"], website: "https://www.sdu.edu.cn" },
    { id: "sd-02", name: "中国海洋大学", province: "山东", city: "青岛", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["海洋特色", "水产第一", "海洋科学领先"], scoreRange: { min: 590, max: 610 }, rankRange: { min: 13000, max: 20000 }, hotMajors: ["海洋科学", "水产养殖", "海洋技术", "食品科学", "环境科学"], website: "https://www.ouc.edu.cn" },
    { id: "sd-03", name: "中国石油大学（华东）", province: "山东", city: "青岛", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["石油特色", "能源强校", "化工突出"], scoreRange: { min: 575, max: 595 }, rankRange: { min: 18000, max: 26000 }, hotMajors: ["石油工程", "地质资源", "化学工程", "机械工程", "安全工程"], website: "https://www.upc.edu.cn" },
  ],
  辽宁: [
    { id: "ln-01", name: "大连理工大学", province: "辽宁", city: "大连", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科名校", "化工强校", "力学突出"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["化学工程", "力学", "机械工程", "计算机", "土木工程"], website: "https://www.dlut.edu.cn" },
    { id: "ln-02", name: "东北大学", province: "辽宁", city: "沈阳", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["工科强校", "自动化顶尖", "冶金特色"], scoreRange: { min: 585, max: 605 }, rankRange: { min: 14000, max: 22000 }, hotMajors: ["自动化", "计算机", "软件工程", "冶金工程", "材料科学"], website: "https://www.neu.edu.cn" },
    { id: "ln-03", name: "大连海事大学", province: "辽宁", city: "大连", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["航海特色", "交通运输", "国际海事"], scoreRange: { min: 555, max: 575 }, rankRange: { min: 25000, max: 38000 }, hotMajors: ["航海技术", "轮机工程", "交通运输", "法学", "电子信息"], website: "https://www.dlmu.edu.cn" },
  ],
  吉林: [
    { id: "jl-01", name: "吉林大学", province: "吉林", city: "长春", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["规模最大", "学科齐全", "汽车特色"], scoreRange: { min: 580, max: 600 }, rankRange: { min: 16000, max: 24000 }, hotMajors: ["汽车工程", "化学", "法学", "临床医学", "计算机"], website: "https://www.jlu.edu.cn" },
  ],
  黑龙江: [
    { id: "hlj-01", name: "哈尔滨工业大学", province: "黑龙江", city: "哈尔滨", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["航天第一", "工科名校", "C9联盟"], scoreRange: { min: 625, max: 645 }, rankRange: { min: 5500, max: 9000 }, hotMajors: ["航天工程", "焊接", "计算机", "机械工程", "土木工程"], website: "https://www.hit.edu.cn" },
    { id: "hlj-02", name: "哈尔滨工程大学", province: "黑龙江", city: "哈尔滨", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["国防七子", "三海一工", "船舶第一"], scoreRange: { min: 565, max: 585 }, rankRange: { min: 20000, max: 30000 }, hotMajors: ["船舶与海洋", "核科学", "计算机", "自动化", "水声工程"], website: "https://www.hrbeu.edu.cn" },
  ],
  重庆: [
    { id: "cq-01", name: "重庆大学", province: "重庆", city: "重庆", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["建筑老八校", "电气强校", "工科名校"], scoreRange: { min: 610, max: 630 }, rankRange: { min: 8000, max: 13000 }, hotMajors: ["电气工程", "建筑学", "土木工程", "机械工程", "计算机"], website: "https://www.cqu.edu.cn" },
    { id: "cq-02", name: "西南大学", province: "重庆", city: "重庆", type: "综合", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["师范+农学", "教育学领先", "心理学突出"], scoreRange: { min: 575, max: 595 }, rankRange: { min: 18000, max: 26000 }, hotMajors: ["教育学", "心理学", "农学", "生物学", "汉语言文学"], website: "https://www.swu.edu.cn" },
  ],
  陕西: [
    { id: "sn-01", name: "西安交通大学", province: "陕西", city: "西安", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["C9联盟", "工科名校", "电气动力强"], scoreRange: { min: 630, max: 650 }, rankRange: { min: 4500, max: 8000 }, hotMajors: ["电气工程", "动力工程", "机械工程", "计算机", "材料科学"], website: "https://www.xjtu.edu.cn" },
    { id: "sn-02", name: "西北工业大学", province: "陕西", city: "西安", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["国防七子", "三航特色", "航空航天"], scoreRange: { min: 610, max: 630 }, rankRange: { min: 8000, max: 13000 }, hotMajors: ["航空航天", "航海工程", "材料科学", "计算机", "自动化"], website: "https://www.nwpu.edu.cn" },
    { id: "sn-03", name: "西安电子科技大学", province: "陕西", city: "西安", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["两电一邮", "电子信息", "网络安全"], scoreRange: { min: 600, max: 620 }, rankRange: { min: 10000, max: 16000 }, hotMajors: ["电子信息", "通信工程", "计算机", "网络空间安全", "微电子"], website: "https://www.xidian.edu.cn" },
    { id: "sn-04", name: "西北大学", province: "陕西", city: "西安", type: "综合", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["百年名校", "地质学强", "经济学突出"], scoreRange: { min: 560, max: 580 }, rankRange: { min: 20000, max: 30000 }, hotMajors: ["地质学", "考古学", "经济学", "化学", "汉语言文学"], website: "https://www.nwu.edu.cn" },
    { id: "sn-05", name: "长安大学", province: "陕西", city: "西安", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["公路交通", "地质资源", "城乡建设"], scoreRange: { min: 555, max: 575 }, rankRange: { min: 25000, max: 38000 }, hotMajors: ["交通运输", "土木工程", "地质工程", "环境工程", "机械工程"], website: "https://www.chd.edu.cn" },
  ],
  安徽: [
    { id: "ah-01", name: "中国科学技术大学", province: "安徽", city: "合肥", type: "理工", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["华东五校", "理科顶尖", "科研导向"], scoreRange: { min: 660, max: 675 }, rankRange: { min: 1000, max: 3000 }, hotMajors: ["物理学", "化学", "数学", "计算机", "生物学"], website: "https://www.ustc.edu.cn" },
    { id: "ah-02", name: "合肥工业大学", province: "安徽", city: "合肥", type: "理工", level: "211", is985: false, is211: true, isDoubleFirst: true, features: ["工科强校", "管理科学", "车辆工程"], scoreRange: { min: 560, max: 580 }, rankRange: { min: 20000, max: 30000 }, hotMajors: ["计算机", "机械工程", "食品科学", "车辆工程", "土木工程"], website: "https://www.hfut.edu.cn" },
  ],
  甘肃: [
    { id: "gs-01", name: "兰州大学", province: "甘肃", city: "兰州", type: "综合", level: "985", is985: true, is211: true, isDoubleFirst: true, features: ["西部名校", "化学强校", "草学领先"], scoreRange: { min: 570, max: 590 }, rankRange: { min: 18000, max: 26000 }, hotMajors: ["化学", "草学", "生态学", "物理学", "历史学"], website: "https://www.lzu.edu.cn" },
  ],
};

// 所有院校的扁平数组
export const allUniversities: University[] = Object.values(universitiesByProvince).flat();

// 省份列表
export const provinceList = Object.keys(universitiesByProvince);

// 院校类型列表
export const universityTypes = ["综合", "理工", "师范", "医学", "财经", "政法", "农林", "民族", "军事", "语言"];

// 院校层级列表
export const universityLevels: University["level"][] = ["985", "211", "双一流", "普通本科", "民办本科", "合作办学"];

// 按分数筛选院校
export function filterUniversitiesByScore(
  score: number,
  rank?: number,
  options?: {
    level?: University["level"];
    province?: string;
    type?: string;
    keyword?: string;
  }
): { matched: University[]; reach: University[]; safe: University[] } {
  let pool = [...allUniversities];

  // 按筛选条件过滤
  if (options?.level) pool = pool.filter(u => u.level === options.level);
  if (options?.province) pool = pool.filter(u => u.province === options.province);
  if (options?.type) pool = pool.filter(u => u.type === options.type);
  if (options?.keyword) {
    const kw = options.keyword.toLowerCase();
    pool = pool.filter(u =>
      u.name.toLowerCase().includes(kw) ||
      u.province.includes(kw) ||
      u.city.includes(kw) ||
      u.hotMajors.some(m => m.includes(kw))
    );
  }

  // 分类
  const matched: University[] = []; // 分数匹配
  const reach: University[] = [];   // 冲一冲
  const safe: University[] = [];     // 保一保

  pool.forEach(u => {
    const mid = (u.scoreRange.min + u.scoreRange.max) / 2;
    if (score >= u.scoreRange.min && score <= u.scoreRange.max) {
      matched.push(u);
    } else if (score < u.scoreRange.max && score >= u.scoreRange.min - 20) {
      reach.push(u);
    } else if (score > u.scoreRange.min && score <= u.scoreRange.max + 20) {
      safe.push(u);
    }
  });

  // 各组内按分数排序
  const sortByScore = (a: University, b: University) => b.scoreRange.max - a.scoreRange.max;
  matched.sort(sortByScore);
  reach.sort((a, b) => a.scoreRange.min - b.scoreRange.min);
  safe.sort(sortByScore);

  return { matched, reach, safe };
}
