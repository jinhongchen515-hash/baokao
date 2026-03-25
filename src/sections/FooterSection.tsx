import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, ExternalLink, ArrowUp } from "lucide-react";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-muted/20">
      {/* 回到顶部 */}
      <div className="flex justify-center -mt-5">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full shadow-lg bg-background border-border hover:border-primary/30 cursor-pointer"
          aria-label="回到顶部"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* 品牌区 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-teal-500 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold">厦门高考志愿指南</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              专为厦门高考考生打造的志愿填报参考平台，提供院校信息、专业推荐与填报策略。
            </p>
          </div>

          {/* 快捷链接 */}
          <div>
            <h4 className="text-sm font-semibold mb-3">快速导航</h4>
            <ul className="space-y-2">
              {[
                { label: "批次线查询", href: "#batch-lines" },
                { label: "AI 推荐", href: "#ai-predict" },
                { label: "院校查询", href: "#universities" },
                { label: "专业推荐", href: "#majors" },
                { label: "填报策略", href: "#strategies" },
                { label: "政策解读", href: "#policy" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 官方链接 */}
          <div>
            <h4 className="text-sm font-semibold mb-3">官方资源</h4>
            <ul className="space-y-2">
              {[
                { label: "福建省教育考试院", url: "https://www.eeafj.cn" },
                { label: "阳光高考信息平台", url: "https://gaokao.chsi.com.cn" },
                { label: "厦门大学招生网", url: "https://zs.xmu.edu.cn" },
                { label: "集美大学招生网", url: "https://zsb.jmu.edu.cn" },
              ].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 厦门高考志愿填报指南 · 本站数据仅供参考，请以官方公布为准
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for 厦门考生
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
