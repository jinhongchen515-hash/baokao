import { strategies, timelineEvents } from "@/data/guideData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Target,
  BarChart3,
  Scale,
  MapPin,
  CheckCircle,
  Star,
  Clock,
  CircleCheckBig,
  CircleDot,
  Circle,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Target,
  BarChart3,
  Scale,
  MapPin,
  CheckCircle,
  Star,
};

const statusConfig = {
  completed: { icon: CircleCheckBig, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50" },
  current: { icon: CircleDot, color: "text-primary bg-primary/10 border-primary/20" },
  upcoming: { icon: Circle, color: "text-muted-foreground bg-muted border-border" },
};

export default function StrategiesSection() {
  return (
    <section id="strategies" className="py-20 md:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">核心策略</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">志愿填报策略</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            掌握科学填报方法，避免踩坑，最大化利用每一分
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 策略卡片 - 左侧 */}
          <div className="lg:col-span-3 space-y-4">
            {strategies.map((s) => {
              const Icon = iconMap[s.icon] || Target;
              return (
                <Card key={s.id} className="magnetic-hover cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <CardTitle className="text-base">{s.title}</CardTitle>
                          <Badge variant="secondary" className={`text-xs ${s.tagColor}`}>
                            {s.tag}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="detail" className="border-0">
                        <AccordionTrigger className="py-2 text-xs text-primary hover:no-underline cursor-pointer">
                          查看详细说明
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-0">
                            {s.detail}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 时间轴 - 右侧 */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg">填报时间轴</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {timelineEvents.map((event, idx) => {
                    const config = statusConfig[event.status];
                    const StatusIcon = config.icon;
                    return (
                      <div key={idx} className="flex gap-3 relative">
                        {/* 连接线 */}
                        {idx < timelineEvents.length - 1 && (
                          <div className="absolute left-[15px] top-8 w-0.5 h-[calc(100%-16px)] bg-border" />
                        )}
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${config.color}`}>
                          <StatusIcon className="w-4 h-4" />
                        </div>
                        <div className="pb-6 min-w-0">
                          <p className="text-xs font-medium text-primary mb-0.5">{event.date}</p>
                          <p className="text-sm font-semibold mb-1">{event.title}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
