// 福建省高考批次线数据
// 数据来源：福建省教育考试院
// 注意：2025年为预估值，2022-2024为参考数据，以教育考试院公布为准

export type SubjectType = "physics" | "history";

export const batchLines = {
  "2025": {
    _note: "2025年为预估值，正式数据待6月下旬公布后更新",
    physics: {
      "本科提前批": 465,
      "本科批": 465,
      "特殊类型招生控制线": 540,
      "专科批": 220,
    },
    history: {
      "本科提前批": 465,
      "本科批": 465,
      "特殊类型招生控制线": 522,
      "专科批": 220,
    },
  },
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

export type Year = keyof typeof batchLines;

// 批次线类型
export const batchNames = ["本科提前批", "本科批", "特殊类型招生控制线", "专科批"] as const;

// 获取分数变化趋势
export function getScoreTrend(current: number, previous: number | undefined) {
  if (previous === undefined) return null;
  if (current > previous) return { direction: "up" as const, diff: current - previous };
  if (current < previous) return { direction: "down" as const, diff: current - previous };
  return { direction: "stable" as const, diff: 0 };
}
