import { ArrowRight, MapPin, BookOpen, Users, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-20">
      {/* 背景装饰 */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* 浮动装饰球 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* 徽章 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 badge-glow">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm font-medium text-primary">2025 福建高考 · AI 智能推荐</span>
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          <span className="block">高考志愿填报</span>
          <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 dark:from-cyan-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
            智慧指南
          </span>
        </h1>

        {/* 副标题 */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          全国本科院校查询 + AI 智能推荐，输入分数即可获取个性化志愿方案
        </p>

        {/* CTA 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={() => scrollTo("#ai-predict")}
            className="h-13 px-8 text-base font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-4.5 h-4.5 mr-2" />
            AI 智能推荐
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo("#universities")}
            className="h-13 px-8 text-base font-medium rounded-xl border-2 cursor-pointer"
          >
            <Search className="w-4.5 h-4.5 mr-2" />
            查询全国院校
          </Button>
        </div>

        {/* 快捷统计 */}
        <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">80+</span>
            <span className="text-xs text-muted-foreground">全国院校</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">20+</span>
            <span className="text-xs text-muted-foreground">热门专业</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">16</span>
            <span className="text-xs text-muted-foreground">覆盖省份</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">AI</span>
            <span className="text-xs text-muted-foreground">智能推荐</span>
          </div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
