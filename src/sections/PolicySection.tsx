import { policyPoints } from "@/data/guideData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  BookOpen,
  Scale,
  MapPin,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const iconMap: Record<number, React.ElementType> = {
  0: BookOpen,
  1: Sparkles,
  2: Scale,
  3: MapPin,
};

export default function PolicySection() {
  return (
    <section id="policy" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <Scale className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">政策须知</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">政策要点解读</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            了解最新高考招生政策变化，避免因信息差导致填报失误
          </p>
        </div>

        {/* 政策卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {policyPoints.map((policy, idx) => {
            const Icon = iconMap[idx] || BookOpen;
            return (
              <Card key={idx} className="magnetic-hover group">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{policy.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {policy.content}
                  </p>
                  {/* 高亮提示 */}
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                      {policy.highlight}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 底部链接 */}
        <div className="mt-10 text-center">
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="py-5 px-8">
              <div className="flex items-center gap-3 flex-col sm:flex-row">
                <span className="text-sm text-muted-foreground">
                  需要更详细的政策信息？
                </span>
                <a
                  href="https://www.eeafj.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  访问福建省教育考试院
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
