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

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// API 配置 - 阿里千问
const API_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const DEFAULT_MODEL = "qwen-plus";

// 构建 AI 提示词 - 精简表格版
function buildSystemPrompt(): string {
  return `你是一位经验丰富的高考志愿填报指导专家，专门服务福建厦门考生。你熟悉全国高校的录取规则、专业特色和就业前景。

【核心规则 - 必须严格遵守】
1. 输出格式：必须使用 Markdown 表格，禁止大段文字
2. 冲-稳-保分层：每层用一个小表格，包含"院校名称、省份、层级、参考分数、推荐专业、推荐理由"6列
3. 总共推荐 8-12 所院校，冲3-4所、稳3-4所、保2-3所
4. 表格后用 2-3 句话总结关键建议
5. 推荐时要覆盖外省院校，不要只推荐福建本省
6. 参考2024年福建物理类/历史类录取分数

【输出模板（严格遵守）】
## 🎯 冲一冲（录取概率 20-40%）
| 院校 | 省份 | 层级 | 参考分 | 推荐专业 | 理由 |
|------|------|------|--------|---------|------|
| ××大学 | ×× | 985 | 580-600 | 计算机、电子 | ×× |

## ✅ 稳一稳（录取概率 50-70%）
| 院校 | 省份 | 层级 | 参考分 | 推荐专业 | 理由 |
|------|------|------|--------|---------|------|

## 🛡️ 保一保（录取概率 80%+）
| 院校 | 省份 | 层级 | 参考分 | 推荐专业 | 理由 |
|------|------|------|--------|---------|------|

**💡 关键建议**：2-3句核心建议

可用院校数据参考：
${allUniversities.map(u => `${u.name}(${u.province}/${u.level}) ${u.scoreRange.min}-${u.scoreRange.max}分 热门:${u.hotMajors.slice(0,3).join('/')}`).join('\n')}

请始终用中文回复，简洁专业。`;
}

function buildUserMessage(profile: UserProfile): string {
  const parts: string[] = [];
  parts.push(`为以下福建考生推荐志愿（严格按表格格式输出）：`);
  parts.push(`- 分数：${profile.score}分`);
  if (profile.rank) parts.push(`- 位次：${profile.rank}`);
  parts.push(`- 科目：${profile.subject === "physics" ? "物理类" : "历史类"}`);
  if (profile.preferredProvinces?.length) parts.push(`- 意向地区：${profile.preferredProvinces.join("、")}`);
  if (profile.preferredTypes?.length) parts.push(`- 院校类型：${profile.preferredTypes.join("、")}`);
  if (profile.preferredMajors?.length) parts.push(`- 兴趣专业：${profile.preferredMajors.join("、")}`);
  if (profile.notes) parts.push(`- 补充：${profile.notes}`);
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
