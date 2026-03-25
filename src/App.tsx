import { useEffect, useState } from "react";
import Navbar from "./sections/Navbar";
import HeroSection from "./sections/HeroSection";
import BatchLinesSection from "./sections/BatchLinesSection";
import UniversitiesSection from "./sections/UniversitiesSection";
import MajorsSection from "./sections/MajorsSection";
import StrategiesSection from "./sections/StrategiesSection";
import PolicySection from "./sections/PolicySection";
import FooterSection from "./sections/FooterSection";
import PredictForm from "./sections/PredictForm";
import AIAssistant from "./sections/AIAssistant";
import type { UserProfile } from "./sections/PredictForm";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./App.css";

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Intersection Observer 实现滚动渐入动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("fade-in-up");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    // 滚动到 AI 区域（移动端）
    const aiSection = document.querySelector("#ai-predict");
    if (aiSection && window.innerWidth < 1024) {
      setTimeout(() => {
        aiSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <BatchLinesSection />

        {/* AI 智能推荐区块 - 新增 */}
        <section id="ai-predict" className="py-20 md:py-28 px-4 sm:px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            {/* 标题 */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-medium text-primary">AI 驱动</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                AI 智能志愿推荐
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                输入你的高考成绩和偏好，让 AI 为你定制个性化志愿方案
              </p>
            </div>

            {/* 表单 + AI 对话双栏布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左侧：填报信息表单 */}
              <div className="order-2 lg:order-1">
                <Card className="lg:sticky lg:top-24">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">填报信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PredictForm
                      onSubmit={handleFormSubmit}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* 右侧：AI 对话 */}
              <div className="order-1 lg:order-2">
                <AIAssistant userProfile={userProfile} />
              </div>
            </div>
          </div>
        </section>

        <UniversitiesSection />
        <MajorsSection />
        <StrategiesSection />
        <PolicySection />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
