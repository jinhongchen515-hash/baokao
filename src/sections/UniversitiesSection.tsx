import { useState, useMemo } from "react";
import {
  allUniversities,
  provinceList,
  universityTypes,
  universityLevels,
  type University,
} from "@/data/universities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  X,
  TrendingUp,
  Flame,
} from "lucide-react";

const PAGE_SIZE = 12;

export default function UniversitiesSection() {
  const [keyword, setKeyword] = useState("");
  const [selectedProvince, setSelectedProvince] = useState<string>("全部");
  const [selectedLevel, setSelectedLevel] = useState<string>("全部");
  const [selectedType, setSelectedType] = useState<string>("全部");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allUniversities];

    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        u =>
          u.name.toLowerCase().includes(kw) ||
          u.province.includes(kw) ||
          u.city.includes(kw) ||
          u.hotMajors.some(m => m.includes(kw)) ||
          u.features.some(f => f.includes(kw))
      );
    }

    if (selectedProvince !== "全部") {
      result = result.filter(u => u.province === selectedProvince);
    }

    if (selectedLevel !== "全部") {
      if (selectedLevel === "985/211") {
        result = result.filter(u => u.is985 || u.is211);
      } else {
        result = result.filter(u => u.level === selectedLevel);
      }
    }

    if (selectedType !== "全部") {
      result = result.filter(u => u.type === selectedType);
    }

    return result;
  }, [keyword, selectedProvince, selectedLevel, selectedType]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setKeyword("");
    setSelectedProvince("全部");
    setSelectedLevel("全部");
    setSelectedType("全部");
    setPage(1);
  };

  const hasActiveFilters = selectedProvince !== "全部" || selectedLevel !== "全部" || selectedType !== "全部";

  return (
    <section id="universities" className="py-20 md:py-28 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-medium text-primary">全国本科院校</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">院校查询</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            覆盖全国重点本科院校，支持按地区、层级、类型搜索筛选
          </p>
        </div>

        {/* 搜索栏 */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索院校名称、城市、专业..."
              value={keyword}
              onChange={e => { setKeyword(e.target.value); setPage(1); }}
              className="pl-10"
            />
          </div>
          <Button
            variant={showFilters ? "default" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className="shrink-0 cursor-pointer"
          >
            <Filter className="w-4 h-4" />
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="icon" onClick={resetFilters} className="shrink-0 cursor-pointer text-destructive">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 筛选面板 */}
        {showFilters && (
          <Card className="mb-6 animate-in slide-in-from-top-2 duration-200">
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">地区</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => { setSelectedProvince("全部"); setPage(1); }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      selectedProvince === "全部"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    全部
                  </button>
                  {provinceList.map(p => (
                    <button
                      key={p}
                      onClick={() => { setSelectedProvince(p); setPage(1); }}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        selectedProvince === p
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">层级</p>
                <div className="flex flex-wrap gap-1.5">
                  {["全部", "985/211", ...universityLevels.filter(l => l !== "985" && l !== "211")].map(level => (
                    <button
                      key={level}
                      onClick={() => { setSelectedLevel(level); setPage(1); }}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        selectedLevel === level
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">类型</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => { setSelectedType("全部"); setPage(1); }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      selectedType === "全部"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    全部
                  </button>
                  {universityTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => { setSelectedType(t); setPage(1); }}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        selectedType === t
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 结果统计 */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            共找到 <span className="font-semibold text-foreground">{filtered.length}</span> 所院校
          </p>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1">
              {selectedProvince !== "全部" && (
                <Badge variant="secondary" className="text-xs">{selectedProvince}</Badge>
              )}
              {selectedLevel !== "全部" && (
                <Badge variant="secondary" className="text-xs">{selectedLevel}</Badge>
              )}
              {selectedType !== "全部" && (
                <Badge variant="secondary" className="text-xs">{selectedType}</Badge>
              )}
            </div>
          )}
        </div>

        {/* 院校卡片网格 */}
        {paged.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">没有找到匹配的院校</p>
            <Button variant="link" onClick={resetFilters} className="mt-2 cursor-pointer">清除筛选条件</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paged.map(uni => (
              <UniversityCard key={uni.id} university={uni} />
            ))}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              上一页
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (page <= 4) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = page - 3 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      page === pageNum
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="cursor-pointer"
            >
              下一页
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground text-center">
            💡 本数据库收录全国重点本科院校，数据仅供参考。完整院校信息请访问教育部阳光高考平台。
          </p>
        </div>
      </div>
    </section>
  );
}

// 院校卡片
function UniversityCard({ university }: { university: University }) {
  const levelColor: Record<string, string> = {
    "985": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "211": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    "双一流": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "普通本科": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "民办本科": "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400",
    "合作办学": "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="magnetic-hover cursor-pointer group h-full">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors truncate">
                  {university.name}
                </CardTitle>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">{university.province} · {university.city}</span>
                </div>
              </div>
              <Badge variant="secondary" className={`text-[10px] shrink-0 ${levelColor[university.level]}`}>
                {university.level}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-2.5">
              <Badge variant="outline" className="text-[10px]">{university.type}</Badge>
              {university.is985 && <Badge variant="outline" className="text-[10px] text-red-500 border-red-200">985</Badge>}
              {university.is211 && !university.is985 && <Badge variant="outline" className="text-[10px] text-orange-500 border-orange-200">211</Badge>}
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {university.hotMajors.slice(0, 3).map(m => (
                <span key={m} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {m}
                </span>
              ))}
              {university.hotMajors.length > 3 && (
                <span className="text-[10px] text-muted-foreground">+{university.hotMajors.length - 3}</span>
              )}
            </div>
            <div className="flex items-center justify-between pt-2.5 border-t border-border">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">参考分数</span>
              </div>
              <span className="text-sm font-bold text-primary">
                {university.scoreRange.min}-{university.scoreRange.max}
              </span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-lg">
              {university.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-lg">{university.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {university.province} · {university.city} · {university.type}类
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            <Badge className={levelColor[university.level]}>{university.level}</Badge>
            <Badge variant="outline">{university.type}类</Badge>
            {university.is985 && <Badge variant="outline" className="text-red-500 border-red-200">985工程</Badge>}
            {university.is211 && <Badge variant="outline" className="text-orange-500 border-orange-200">211工程</Badge>}
            {university.isDoubleFirst && <Badge variant="outline" className="text-purple-500 border-purple-200">双一流</Badge>}
          </div>

          {/* 办学特色 */}
          <div>
            <h4 className="text-sm font-semibold mb-2">办学特色</h4>
            <div className="flex flex-wrap gap-2">
              {university.features.map(f => (
                <span key={f} className="flex items-center gap-1 text-xs bg-primary/5 text-primary px-2.5 py-1 rounded-lg">
                  <Flame className="w-3 h-3" />
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* 录取分数 */}
          <div>
            <h4 className="text-sm font-semibold mb-2">参考录取分数</h4>
            <div className="p-3 rounded-lg bg-muted">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">分数范围</span>
                <span className="text-xl font-bold text-primary">
                  {university.scoreRange.min} - {university.scoreRange.max}
                </span>
              </div>
              {university.rankRange && (
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-muted-foreground">位次参考</span>
                  <span className="text-sm text-muted-foreground">
                    ~{university.rankRange.min.toLocaleString()} - {university.rankRange.max.toLocaleString()} 名
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 热门专业 */}
          <div>
            <h4 className="text-sm font-semibold mb-2">热门专业</h4>
            <div className="flex flex-wrap gap-2">
              {university.hotMajors.map(m => (
                <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>
              ))}
            </div>
          </div>

          {/* 官网链接 */}
          {university.website && (
            <Button
              variant="outline"
              className="w-full rounded-xl cursor-pointer"
              onClick={() => window.open(university.website, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              访问官方网站
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
