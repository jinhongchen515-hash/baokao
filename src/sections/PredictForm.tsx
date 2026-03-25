import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  GraduationCap,
  MapPin,
  BookOpen,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { provinceList, universityTypes } from "@/data/universities";
import { majorCategories } from "@/data/guideData";

export interface UserProfile {
  score: number;
  rank?: number;
  subject: "physics" | "history";
  preferredProvinces?: string[];
  preferredTypes?: string[];
  preferredMajors?: string[];
  budget?: "high" | "medium" | "low";
  notes?: string;
  id: string; // 唯一标识，每次提交生成新 id
  createdAt: string;
}

interface PredictFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading?: boolean;
}

const allMajors = majorCategories.flatMap(c => c.majors.map(m => m.name));

export default function PredictForm({ onSubmit, isLoading }: PredictFormProps) {
  const [subject, setSubject] = useState<"physics" | "history">("physics");
  const [score, setScore] = useState("");
  const [rank, setRank] = useState("");
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(["福建"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  const toggleProvince = (prov: string) => {
    setSelectedProvinces(prev =>
      prev.includes(prov) ? prev.filter(p => p !== prov) : [...prev, prov]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleMajor = (major: string) => {
    setSelectedMajors(prev =>
      prev.includes(major) ? prev.filter(m => m !== major) : [...prev, major]
    );
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      score: parseInt(score),
      rank: rank ? parseInt(rank) : undefined,
      subject,
      preferredProvinces: selectedProvinces.length ? selectedProvinces : undefined,
      preferredTypes: selectedTypes.length ? selectedTypes : undefined,
      preferredMajors: selectedMajors.length ? selectedMajors : undefined,
      notes: notes || undefined,
      createdAt: new Date().toLocaleString("zh-CN"),
    };
    onSubmit(profile);
  };

  const canSubmit = score && parseInt(score) > 0 && parseInt(score) <= 750;

  const resetForm = () => {
    setScore("");
    setRank("");
    setSelectedProvinces(["福建"]);
    setSelectedTypes([]);
    setSelectedMajors([]);
    setNotes("");
    setStep(1);
  };

  return (
    <div className="space-y-6">
      {/* 步骤指示器 */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                step >= s
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground"
              }`}
              onClick={() => setStep(s)}
            >
              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* 步骤内容 */}
      <div className="min-h-[320px]">
        {/* Step 1: 基础信息 */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in-0 duration-300">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  考试科目
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={subject} onValueChange={v => setSubject(v as "physics" | "history")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="physics"
                      className="cursor-pointer data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                    >
                      物理类
                    </TabsTrigger>
                    <TabsTrigger
                      value="history"
                      className="cursor-pointer data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-md"
                    >
                      历史类
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  成绩信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="score">高考分数 <span className="text-destructive">*</span></Label>
                    <Input
                      id="score"
                      type="number"
                      placeholder="如：580"
                      min={0}
                      max={750}
                      value={score}
                      onChange={e => setScore(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank">全省位次（选填）</Label>
                    <Input
                      id="rank"
                      type="number"
                      placeholder="如：15000"
                      value={rank}
                      onChange={e => setRank(e.target.value)}
                    />
                  </div>
                </div>
                {score && (parseInt(score) < 0 || parseInt(score) > 750) && (
                  <p className="text-xs text-destructive">请输入 0-750 之间的分数</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: 偏好设置 */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in-0 duration-300">
            {/* 意向地区 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  意向地区（可多选）
                </CardTitle>
                <CardDescription className="text-xs">选择你希望就读的地区，留空表示不限</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {provinceList.map(prov => (
                    <button
                      key={prov}
                      onClick={() => toggleProvince(prov)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedProvinces.includes(prov)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 院校类型 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  院校类型偏好（可多选）
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["985", "211", "双一流", "普通本科"].map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedTypes.includes(type)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                  {universityTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedTypes.includes(type)
                          ? "bg-secondary text-secondary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary-foreground"
                      }`}
                    >
                      {type}类
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 专业方向 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  兴趣专业（可多选）
                </CardTitle>
                <CardDescription className="text-xs">选择感兴趣的专业方向</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allMajors.slice(0, 24).map(major => (
                    <button
                      key={major}
                      onClick={() => toggleMajor(major)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedMajors.includes(major)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {major}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: 确认提交 */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in-0 duration-300">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">确认你的填报信息</CardTitle>
                <CardDescription>请确认以下信息是否正确</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem label="考试科目" value={subject === "physics" ? "物理类" : "历史类"} />
                  <InfoItem label="高考分数" value={`${score}分`} />
                  {rank && <InfoItem label="全省位次" value={`约${parseInt(rank).toLocaleString()}名`} />}
                </div>

                {selectedProvinces.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">意向地区</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProvinces.map(p => <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>)}
                    </div>
                  </div>
                )}

                {selectedTypes.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">院校类型</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTypes.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                )}

                {selectedMajors.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">兴趣专业</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMajors.map(m => <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>)}
                    </div>
                  </div>
                )}

                {notes && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1.5">补充说明</p>
                    <p className="text-sm">{notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      {step === 3 && (
        <div className="pt-2">
          <Input
            placeholder="补充说明（选填，如：希望学医、prefer沿海城市等）"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="mb-3"
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={resetForm}
          className="cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          重置
        </Button>

        <div className="flex gap-2">
          {step > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(step - 1)}
              className="cursor-pointer"
            >
              上一步
            </Button>
          )}
          {step < 3 ? (
            <Button
              size="sm"
              onClick={() => canSubmit && setStep(step + 1)}
              disabled={!canSubmit}
              className="cursor-pointer"
            >
              下一步
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isLoading}
              className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />
                  AI 分析中...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  获取 AI 推荐
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-muted/50">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
