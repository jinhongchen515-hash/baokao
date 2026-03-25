import { majorCategories } from "@/data/guideData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wrench,
  Atom,
  Briefcase,
  Heart,
  Scale,
  BookOpen,
  Flame,
  TrendingUp,
  Minus,
  ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  Atom,
  Briefcase,
  Heart,
  Scale,
  BookOpen,
};

const trendMap = {
  up: { icon: TrendingUp, color: "text-emerald-500", label: "上升" },
  stable: { icon: Minus, color: "text-gray-400", label: "稳定" },
  down: { icon: ArrowUpRight, color: "text-red-500", label: "下降" },
};

export default function MajorsSection() {
  return (
    <section id="majors" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">专业方向</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">热门专业推荐</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            按学科门类浏览热门专业，了解就业前景与发展趋势
          </p>
        </div>

        <Tabs defaultValue="工学" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-1 h-auto bg-muted/60 p-1 mb-8">
            {majorCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || BookOpen;
              return (
                <TabsTrigger
                  key={cat.name}
                  value={cat.name}
                  className="cursor-pointer px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Icon className="w-4 h-4 mr-1.5" />
                  {cat.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {majorCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            return (
              <TabsContent key={cat.name} value={cat.name}>
                <Card className="border-0 bg-muted/30">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{cat.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{cat.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {cat.majors.map((major) => {
                        const trend = trendMap[major.trend as keyof typeof trendMap];
                        const TrendIcon = trend.icon;
                        return (
                          <div
                            key={major.name}
                            className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {major.hot && (
                                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                              )}
                              <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                {major.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <Badge variant="outline" className="text-xs text-muted-foreground whitespace-nowrap">
                                {major.salary}
                              </Badge>
                              <span className={`flex items-center gap-0.5 text-xs ${trend.color}`}>
                                <TrendIcon className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* 底部说明 */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center gap-1 p-3">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-muted-foreground">热门专业</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3">
            <span className="text-xs text-muted-foreground">薪资为应届毕业生参考范围</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground">趋势为近年就业形势</span>
          </div>
        </div>
      </div>
    </section>
  );
}
