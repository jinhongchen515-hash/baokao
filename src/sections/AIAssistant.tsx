import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sparkles,
  Send,
  Key,
  Loader2,
  Bot,
  User,
  AlertCircle,
  CheckCircle2,
  Settings,
  History,
  Trash2,
  Clock,
  ChevronLeft,
  GraduationCap,
} from "lucide-react";
import {
  getAIRecommendation,
  continueAIConversation,
  validateApiKey,
  type AIMessage,
  type UserProfile,
} from "@/services/ai";

const PRESET_API_KEY = "sk-50dd415ccf084c8aadb7fa36697bb2f9";
const STORAGE_KEY = "qwen_api_key";
const HISTORY_KEY = "ai_recommend_history";

// 历史记录条目
interface HistoryEntry {
  id: string;
  profile: UserProfile;
  messages: AIMessage[];
  createdAt: string;
}

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryEntry[]) {
  // 只保留最近 20 条
  const trimmed = history.slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

interface AIAssistantProps {
  userProfile: UserProfile | null;
}

export default function AIAssistant({ userProfile }: AIAssistantProps) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || PRESET_API_KEY;
  });
  const [isKeySet, setIsKeySet] = useState(() => {
    return !!localStorage.getItem(STORAGE_KEY) || !!PRESET_API_KEY;
  });
  const [isValidating, setIsValidating] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);

  // 保存当前会话到历史记录
  const saveCurrentToHistory = useCallback((profile: UserProfile, msgs: AIMessage[]) => {
    const entry: HistoryEntry = {
      id: profile.id,
      profile,
      messages: msgs,
      createdAt: profile.createdAt,
    };
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== entry.id);
      const updated = [entry, ...filtered].slice(0, 20);
      saveHistory(updated);
      return updated;
    });
    setCurrentEntryId(entry.id);
  }, []);

  // 当 userProfile 变化时（新 id），自动触发 AI 推荐
  useEffect(() => {
    if (!userProfile || !apiKey || isLoading) return;

    // 如果是恢复历史记录的 profile，直接加载消息
    const existing = history.find(h => h.id === userProfile.id);
    if (existing) {
      setMessages(existing.messages);
      setCurrentEntryId(existing.id);
      return;
    }

    // 新的 profile，触发 AI 推荐
    setIsLoading(true);
    setError(null);

    getAIRecommendation(userProfile, apiKey.trim())
      .then(result => {
        setMessages([result]);
        saveCurrentToHistory(userProfile, [result]);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : "请求失败，请稍后重试");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userProfile?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 验证 API Key
  const handleValidateKey = async () => {
    if (!apiKey.trim()) return;
    setIsValidating(true);
    setError(null);
    const valid = await validateApiKey(apiKey.trim());
    setIsValidating(false);
    if (valid) {
      setIsKeySet(true);
      localStorage.setItem(STORAGE_KEY, apiKey.trim());
    } else {
      setError("API Key 无效，请检查后重试");
    }
  };

  // 继续对话
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: AIMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const result = await continueAIConversation(messages, input.trim(), apiKey.trim());
      const finalMessages = [...newMessages, result];
      setMessages(finalMessages);

      // 更新历史记录中的消息
      if (currentEntryId && userProfile) {
        setHistory(prev => {
          const updated = prev.map(h =>
            h.id === currentEntryId ? { ...h, messages: finalMessages } : h
          );
          saveHistory(updated);
          return updated;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 加载历史记录
  const loadHistoryEntry = (entry: HistoryEntry) => {
    setMessages(entry.messages);
    setCurrentEntryId(entry.id);
    setShowHistory(false);
    // 通知父组件更新 userProfile
    if (window.setPredictFormData) {
      window.setPredictFormData(entry.profile);
    }
  };

  // 删除历史记录
  const deleteHistoryEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id);
      saveHistory(updated);
      return updated;
    });
    if (currentEntryId === id) {
      setMessages([]);
      setCurrentEntryId(null);
    }
  };

  // 清空所有历史
  const clearAllHistory = () => {
    setHistory([]);
    saveHistory([]);
    setMessages([]);
    setCurrentEntryId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 未设置 API Key 的界面
  if (!isKeySet) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI 志愿助手（通义千问）
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-dashed border-border text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">配置通义千问 API Key</p>
              <p className="text-xs text-muted-foreground mt-1">
                需要你的阿里云 DashScope API Key 来启用 AI 推荐功能
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="sk-xxxxxxxxxxxxxxxx"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleValidateKey()}
            />
            <Button
              onClick={handleValidateKey}
              disabled={!apiKey.trim() || isValidating}
              className="w-full cursor-pointer"
              size="sm"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  验证中...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                  验证并启用
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive">{error}</p>
            </div>
          )}

          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 还没有 API Key？访问 <a href="https://dashscope.console.aliyun.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">dashscope.console.aliyun.com</a> 获取，新用户有免费额度。
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 历史记录侧栏
  if (showHistory) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <History className="w-4 h-4 text-primary" />
              推荐历史
              {history.length > 0 && (
                <span className="text-xs text-muted-foreground font-normal">({history.length})</span>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 cursor-pointer"
              onClick={() => setShowHistory(false)}
              title="返回对话"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          {history.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">暂无推荐记录</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {history.map(entry => (
                <button
                  key={entry.id}
                  onClick={() => loadHistoryEntry(entry)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer hover:border-primary/30 hover:bg-primary/5 ${
                    currentEntryId === entry.id
                      ? "border-primary/50 bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{entry.profile.score}分</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                          {entry.profile.subject === "physics" ? "物理" : "历史"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{entry.createdAt}</span>
                        <span className="mx-1">·</span>
                        <span>{entry.messages.length} 条消息</span>
                      </div>
                      {entry.profile.preferredProvinces && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {entry.profile.preferredProvinces.slice(0, 4).map(p => (
                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-muted">{p}</span>
                          ))}
                          {entry.profile.preferredProvinces.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">+{entry.profile.preferredProvinces.length - 4}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => deleteHistoryEntry(entry.id, e)}
                      className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-2"
                      title="删除记录"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                className="w-full cursor-pointer text-destructive hover:text-destructive"
                onClick={clearAllHistory}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                清空所有记录
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // 已设置 API Key，显示对话界面
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            AI 志愿助手（通义千问）
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 cursor-pointer relative"
              onClick={() => setShowHistory(true)}
              title="推荐历史"
            >
              <History className="w-3.5 h-3.5" />
              {history.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary text-[9px] text-primary-foreground flex items-center justify-center font-bold">
                  {history.length > 9 ? "9+" : history.length}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 cursor-pointer"
              onClick={() => {
                setIsKeySet(false);
                setMessages([]);
                localStorage.removeItem(STORAGE_KEY);
              }}
              title="更换 API Key"
            >
              <Settings className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* 消息区域 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 min-h-[300px] max-h-[500px] pr-1">
          {!messages.length && !isLoading && userProfile && (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                正在为你生成 AI 推荐...
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {!messages.length && !isLoading && !userProfile && (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                请先在左侧填写你的高考成绩和偏好信息
              </p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarFallback className={`text-xs ${msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}>
                  {msg.role === "assistant" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <p className="text-[10px] mt-1.5 opacity-60">
                  {msg.timestamp.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && messages.length > 0 && (
            <div className="flex gap-2.5">
              <Avatar className="w-7 h-7 shrink-0">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  <Bot className="w-3.5 h-3.5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-xl px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs text-muted-foreground">正在思考...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-2 flex items-start gap-2 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
            <p className="text-xs text-destructive">{error}</p>
          </div>
        )}

        {/* 输入区域 */}
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="继续提问，如：推荐一些医学类院校..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !messages.length}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
