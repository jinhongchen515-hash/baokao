// 阿里千问（通义千问）API 集成模块
// 兼容 OpenAI 兼容接口格式

import { allUniversities } from "@/data/universities";

export interface UserProfile {
  score: number;
  rank?: number;
  subject: "physics" | "history";
  preferredProvinces?: string[];
  preferredTypes?: string[];
  preferredMajors?: string[];
  budget?: "high" | "medium" | "low";
  notes?: string;
}

export interface AIRecommendation {
  university: string;
  province: string;
  city: string;
  reason: string;
  matchType: "reach" | "match" | "safe";
  suggestedMajors: string[];
  confidence: "high" | "medium" | "low";
}

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  recommendations?: AIRecommendation[];
}

// API 配置 - 阿里千问
const API_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const DEFAULT_MODEL = "qwen-plus";

// 构建 AI 提示词
function buildSystemPrompt(): string {
  return `你是一位经验丰富的高考志愿填报指导专家，专门服务福建厦门考生。你熟悉全国高校的录取规则、专业特色和就业前景。

你的核心职责：
1. 根据考生的高考分数、位次、科目（物理类/历史类）和兴趣偏好，推荐合适的院校和专业
2. 使用"冲-稳-保"策略，给出分层建议
3. 分析每所推荐院校的优势和录取概率
4. 提供专业的填报建议和注意事项

重要规则：
- 推荐院校时必须考虑福建省的录取分数线和位次
- 物理/历史类分别推荐，不要混淆
- 始终提醒数据仅供参考，以官方为准
- 如果考生信息不完整，要主动询问
- 回复要简洁专业，重点突出
- 每次推荐控制在5-8所院校，标注冲/稳/保

可用数据参考（全国本科院校节选）：
${allUniversities.slice(0, 60).map(u => `${u.name}(${u.province}/${u.level}) 分数参考:${u.scoreRange.min}-${u.scoreRange.max} 热门专业:${u.hotMajors.join('/')}`).join('\n')}

请始终用中文回复，语气专业但不失亲和。`;
}

function buildUserMessage(profile: UserProfile): string {
  const parts: string[] = [];
  parts.push(`请为以下福建考生推荐高考志愿：`);
  parts.push(`- 高考分数：${profile.score}分`);
  if (profile.rank) parts.push(`- 全省位次：约${profile.rank}名`);
  parts.push(`- 考试科目：${profile.subject === "physics" ? "物理类" : "历史类"}`);
  if (profile.preferredProvinces?.length) parts.push(`- 意向地区：${profile.preferredProvinces.join("、")}`);
  if (profile.preferredTypes?.length) parts.push(`- 偏好院校类型：${profile.preferredTypes.join("、")}`);
  if (profile.preferredMajors?.length) parts.push(`- 兴趣专业方向：${profile.preferredMajors.join("、")}`);
  if (profile.notes) parts.push(`- 补充说明：${profile.notes}`);

  parts.push(`\n请按照"冲-稳-保"策略给出分层推荐，每层2-3所，并说明推荐理由。`);

  return parts.join("\n");
}

// 调用千问 API（OpenAI 兼容格式）
async function callQwenAPI(
  messages: { role: string; content: string }[],
  apiKey: string
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`千问 API 错误: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 获取首次推荐
export async function getAIRecommendation(
  profile: UserProfile,
  apiKey: string
): Promise<AIMessage> {
  const messages = [
    { role: "system", content: buildSystemPrompt() },
    { role: "user", content: buildUserMessage(profile) },
  ];

  const content = await callQwenAPI(messages, apiKey);

  return {
    role: "assistant",
    content,
    timestamp: new Date(),
  };
}

// 继续对话
export async function continueAIConversation(
  conversationHistory: AIMessage[],
  userMessage: string,
  apiKey: string
): Promise<AIMessage> {
  const messages = [
    { role: "system", content: buildSystemPrompt() },
    ...conversationHistory.map(m => ({
      role: m.role,
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const content = await callQwenAPI(messages, apiKey);

  return {
    role: "assistant",
    content,
    timestamp: new Date(),
  };
}

// 验证 API Key
export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/models`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
