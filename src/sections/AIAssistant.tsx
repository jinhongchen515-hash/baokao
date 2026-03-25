import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
} from "lucide-react";
import {
  getAIRecommendation,
  continueAIConversation,
  validateApiKey,
  type AIMessage,
  type UserProfile,
} from "@/services/ai";

// 预置 API Key（用户可在设置中更换）
const PRESET_API_KEY = "sk-50dd415ccf084c8aadb7fa36697bb2f9";
const STORAGE_KEY = "qwen_api_key";

interface AIAssistantProps {
  userProfile: UserProfile | null;
}

export default function AIAssistant({ userProfile }: AIAssistantProps) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || PRESET_API_KEY;
  });
  const [isKeySet, setIsKeySet] = useState(() => {
    // 如果有预置 key，自动跳过配置步骤
    return !!localStorage.getItem(STORAGE_KEY) || !!PRESET_API_KEY;
  });
  const [isValidating, setIsValidating] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // 发送首次请求
  const handleInitialRecommend = async () => {
    if (!userProfile || !apiKey) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAIRecommendation(userProfile, apiKey.trim());
      setMessages([result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请稍后重试");
    } finally {
      setIsLoading(false);
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

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const result = await continueAIConversation(messages, input.trim(), apiKey.trim());
      setMessages(prev => [...prev, result]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请稍后重试");
    } finally {
      setIsLoading(false);
    }
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

  // 已设置 API Key，显示对话界面
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            AI 志愿助手（通义千问）
          </CardTitle>
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
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* 消息区域 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 min-h-[300px] max-h-[500px] pr-1">
          {!messages.length && userProfile && (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                已获取你的填报信息，点击下方按钮获取 AI 推荐
              </p>
              <Button
                onClick={handleInitialRecommend}
                disabled={isLoading}
                size="sm"
                className="bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    AI 分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    获取 AI 志愿推荐
                  </>
                )}
              </Button>
            </div>
          )}

          {!messages.length && !userProfile && (
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
