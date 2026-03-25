import { batchLines, type Year, type SubjectType, getScoreTrend } from "@/data/batchLines";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";

const years = Object.keys(batchLines).filter(k => k !== "_note") as Year[];
const subjects: { value: SubjectType; label: string }[] = [
  { value: "physics", label: "物理类" },
  { value: "history", label: "历史类" },
];

function TrendIcon({ current, previous }: { current: number; previous?: number }) {
  const trend = getScoreTrend(current, previous);
  if (!trend || trend.direction === "stable") {
    return (
      <Badge variant="secondary" className="text-xs text-gray-400 bg-transparent">
        <Minus className="w-3 h-3 mr-1" /> 0
      </Badge>
    );
  }
  const isUp = trend.direction === "up";
  return (
    <Badge
      variant="secondary"
      className={`text-xs bg-transparent ${isUp ? "text-red-500" : "text-green-500"}`}
    >
      {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
      {isUp ? "+" : ""}{trend.diff}
    </Badge>
  );
}

export default function BatchLinesSection() {
  const [year, setYear] = useState<Year>("2025");
  const [subject, setSubject] = useState<SubjectType>("physics");

  const currentData = batchLines[year][subject];
  const prevYearIdx = years.indexOf(year) - 1;
  const prevYear = prevYearIdx >= 0 ? years[prevYearIdx] : undefined;
  const prevData = prevYear ? batchLines[prevYear][subject] : undefined;

  const isEstimated = year === "2025";

  return (
    <section id="batch-lines" className="py-20 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">参考数据</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">福建省高考批次线</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            覆盖近4年分数线变化趋势，以教育考试院公布为准
          </p>
        </div>

        {/* 年份选择 */}
        <div className="flex justify-center gap-2 mb-8">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer relative ${
                year === y
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {y === "2025" && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[8px] text-white font-bold flex items-center justify-center">
                  新
                </span>
              )}
              {y}年
            </button>
          ))}
        </div>

        {isEstimated && (
          <div className="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-center">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              ⏳ 2025年为预估值，正式数据待6月下旬成绩公布后更新
            </p>
          </div>
        )}

        {/* 科目切换 + 数据卡片 */}
        <Tabs value={subject} onValueChange={v => setSubject(v as SubjectType)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            {subjects.map(s => (
              <TabsTrigger key={s.value} value={s.value} className="cursor-pointer">{s.label}</TabsTrigger>
            ))}
          </TabsList>

          {subjects.map(s => (
            <TabsContent key={s.value} value={s.value}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(currentData).map(([batch, score]) => {
                  const prevScore = prevData ? prevData[batch as keyof typeof prevData] : undefined;

                  return (
                    <Card key={batch} className="magnetic-hover cursor-pointer group">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                          {batch}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-end gap-3">
                          <span className="number-highlight text-3xl md:text-4xl">{score}</span>
                          {prevScore !== undefined && (
                            <TrendIcon current={score} previous={prevScore} />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {s.label}分数线
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* 提示 */}
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground text-center">
            💡 以上数据仅供参考，请以福建省教育考试院（<a href="https://www.eeafj.cn" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">eeafj.cn</a>）官方公布数据为准。
          </p>
        </div>
      </div>
    </section>
  );
}
