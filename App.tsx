import React, { useEffect, useState, useRef } from 'react';
import { Section } from './components/Section';
import { BentoCard } from './components/BentoCard';
import { 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Users, 
  Layout, 
  CheckCircle2, 
  Search,
  Zap,
  MessageSquare,
  Sparkles,
  GitMerge,
  Lightbulb,
  FileText,
  Settings,
  Upload,
  X,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';

// --- Types & Initial Data ---
type AssetType = 'image' | 'video';

interface Asset {
  id: string;
  type: AssetType;
  src: string;
  label: string;
}

const INITIAL_ASSETS: Record<string, Asset> = {
  'acquisition-before': { 
    id: 'acquisition-before',
    type: 'image', 
    src: 'https://nb-stor.s3.us-east-1.amazonaws.com/67c00e62059345c26b528b14/9c922a61324847e196420a8677c73330.png', 
    label: '授权获客 - Before' 
  },
  'acquisition-after': { 
    id: 'acquisition-after',
    type: 'image', 
    src: 'https://nb-stor.s3.us-east-1.amazonaws.com/67c00e62059345c26b528b14/0ad839ef40254c728e8211db98da05f3.png', 
    label: '授权获客 - After' 
  },
  'acquisition-scheme': { 
    id: 'acquisition-scheme',
    type: 'image', 
    src: 'https://nb-stor.s3.us-east-1.amazonaws.com/67c02b3c059345c26b528b17/84542129c51a441395b0728c0529d479.png', 
    label: '授权获客 - 方案示意' 
  },
  'acquisition-redesign': { 
    id: 'acquisition-redesign',
    type: 'image', 
    src: 'https://picsum.photos/600/600?random=2', 
    label: '授权再设计 - 界面' 
  },
  'conversion-research-core': { 
    id: 'conversion-research-core',
    type: 'image', 
    src: 'https://picsum.photos/2477/672', 
    label: '促单调研 - 核心页面' 
  },
  'crm-main': { 
    id: 'crm-main',
    type: 'image', 
    src: 'https://picsum.photos/1200/600?random=3', 
    label: '促单转化 - CRM界面' 
  },
  'conversion-list': { 
    id: 'conversion-list',
    type: 'image', 
    src: 'https://picsum.photos/600/400?random=4', 
    label: '转化再设计 - 列表' 
  },
  'conversion-detail': { 
    id: 'conversion-detail',
    type: 'image', 
    src: 'https://picsum.photos/600/400?random=5', 
    label: '转化再设计 - 详情' 
  },
  'evidence-1': { 
    id: 'evidence-1',
    type: 'image', 
    src: 'https://picsum.photos/400/300?random=6', 
    label: '体验保障 - 证据1' 
  },
  'evidence-2': { 
    id: 'evidence-2',
    type: 'image', 
    src: 'https://picsum.photos/400/300?random=7', 
    label: '体验保障 - 证据2' 
  },
  'evidence-3': { 
    id: 'evidence-3',
    type: 'image', 
    src: 'https://picsum.photos/400/300?random=8', 
    label: '体验保障 - 证据3' 
  },
  'evidence-4': { 
    id: 'evidence-4',
    type: 'image', 
    src: 'https://picsum.photos/400/300?random=9', 
    label: '体验保障 - 证据4' 
  },
};

const App: React.FC = () => {
  const [assets, setAssets] = useState<Record<string, Asset>>(INITIAL_ASSETS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Simple intersection observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleFileUpload = (key: string, file: File) => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const type: AssetType = file.type.startsWith('video/') ? 'video' : 'image';

    setAssets(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        type,
        src: objectUrl
      }
    }));
  };

  // Helper component to render image or video based on asset type
  const SmartMedia = ({ id, className = "", alt = "" }: { id: string; className?: string; alt?: string }) => {
    const asset = assets[id];
    if (!asset) return null;

    if (asset.type === 'video') {
      return (
        <video 
          src={asset.src} 
          className={className} 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ objectFit: 'cover' }} // Ensure behavior matches img object-cover
        />
      );
    }

    return (
      <img 
        src={asset.src} 
        alt={alt || asset.label} 
        className={className} 
      />
    );
  };

  return (
    <div className="relative w-full min-h-screen text-[#1d1d1f]">
      
      {/* Global Background for subsequent sections (Subtle) */}
      <div className="aurora-bg-fixed"></div>

      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10 transition-all hover:bg-white/10">
        <span className="font-semibold text-sm tracking-widest uppercase opacity-60 mix-blend-difference text-black">2025 Review</span>
        <span className="font-bold text-sm mix-blend-difference text-black">Yongjie Zhu</span>
      </nav>

      {/* Part 1: Linear Design Cover */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 overflow-hidden">
        {/* Background Image Integration */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/0 via-[#f5f5f7]/50 to-[#f5f5f7]">
           <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/30 blur-[100px] mix-blend-multiply opacity-80 animate-pulse"></div>
           <div className="absolute top-[20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-50/40 to-blue-50/30 blur-[120px] mix-blend-multiply opacity-60"></div>
        </div>

        {/* Gradient Mask for Smooth Transition */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-b from-transparent via-[#f5f5f7]/40 to-[#f5f5f7] z-1 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          {/* Left Column: Big Typography */}
          <div className="lg:col-span-7 space-y-8 breathe-content origin-bottom-left">
             <div className="flex items-center gap-3 mb-8">
                <div className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/60 shadow-sm flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-600">Product Experience Design</span>
                </div>
             </div>
             
             <div className="space-y-1">
                <h1 className="text-8xl md:text-[140px] leading-[0.8] font-bold tracking-tighter text-[#1d1d1f] select-none">
                  2025
                </h1>
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter shimmer-text pb-2">
                  年终述职
                </h2>
             </div>
             
             <p className="text-xl md:text-2xl text-gray-500 font-light max-w-lg mt-6 leading-relaxed">
               Annual Performance Review<br/>
               <span className="text-base text-gray-400 mt-2 block">Driving conversion through user-centric experiences.</span>
             </p>
          </div>

          {/* Right Column: Glass Card Details */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end mb-4 lg:mb-6">
             <div className="liquid-glass p-8 md:p-10 rounded-[40px] w-full max-w-md transform hover:scale-[1.02] transition-transform duration-700">
                <div className="flex flex-col gap-8">
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Presenter</p>
                        <h3 className="text-4xl font-semibold text-[#1d1d1f]">朱泳洁</h3>
                        <p className="text-sm text-gray-400 font-mono mt-1">Yongjie Zhu</p>
                      </div>
                      <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-50 to-purple-50 border border-white flex items-center justify-center text-xl shadow-inner">
                        <span className="filter grayscale opacity-60">🦄</span>
                      </div>
                   </div>
                   
                   <div className="h-[1px] w-full bg-gradient-to-r from-gray-400/20 to-transparent"></div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Role</p>
                        <p className="font-semibold text-lg text-gray-800">Senior Designer</p>
                      </div>
                      <div>
                         <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Dept</p>
                         <p className="font-semibold text-lg text-gray-800">User Experience</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-400/50">
          <ArrowRight className="rotate-90 w-6 h-6" />
        </div>
      </section>

      {/* Part 2: Overview */}
      <Section id="overview" index={1} title="全年概览" subtitle="Overview">
        {/* Core Goal */}
        <BentoCard colSpan={2} subtitle="Core Goal" title="目标制定" className="h-full !pb-12">
          <div className="flex flex-col h-full">
            <p className="text-[16px] font-medium leading-snug text-gray-800 mt-4 mb-4 min-h-[48px]">
              网电销全局提升保险司机端的<span className="text-blue-600">授权及转化效果</span>，助力实现 <span className="text-blue-600">8万单</span> 模型车险。
            </p>
            <div className="flex-1 flex flex-col gap-4 mb-12">
              <div className="flex-1 flex items-center justify-between bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Users size={20}/></div>
                     <span className="font-semibold text-gray-800 whitespace-nowrap">潜客授权率</span>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-blue-600 whitespace-nowrap">60%</div>
                   <div className="text-xs text-blue-400 font-medium whitespace-nowrap">已达成</div>
                 </div>
              </div>
              <div className="flex-1 flex items-center justify-between bg-green-50/50 p-4 rounded-2xl border border-green-100">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><TrendingUp size={20}/></div>
                     <span className="font-semibold text-gray-800 whitespace-nowrap">模型单量</span>
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-bold text-green-600 whitespace-nowrap">8万单</div>
                   <div className="text-xs text-green-400 font-medium whitespace-nowrap">已实现</div>
                 </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Key Insight */}
        <BentoCard colSpan={2} subtitle="Key Insight" title="现状洞察" className="h-full !pb-12">
          <div className="flex flex-col h-full">
            <p className="text-[16px] font-medium leading-snug text-gray-800 mt-4 mb-4 min-h-[48px]">
              按照模型单整体销售模式找到<span className="text-blue-600">授权</span>与<span className="text-blue-600">转化</span>的关键动作发力点。
            </p>
            <div className="flex-1 flex flex-col gap-4 mb-12">
               <div className="flex-1 flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><Target size={20}/></div>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">授权获客</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-gray-900 whitespace-nowrap">81.7%</span>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">来自网销</span>
                  </div>
               </div>
               <div className="flex-1 flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><PhoneIcon /></div>
                      <span className="font-semibold text-gray-800 whitespace-nowrap">转化促单</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-gray-900 whitespace-nowrap">77.29%</span>
                    <span className="text-xs text-gray-400 font-medium whitespace-nowrap">来自电销</span>
                  </div>
               </div>
            </div>
          </div>
        </BentoCard>

        {/* Execution Strategy */}
        <BentoCard colSpan={4} subtitle="Execution Strategy" title="执行策略">
          <div className="absolute top-0 right-0 md:top-[-3rem] text-xs text-gray-400 uppercase tracking-widest font-semibold hidden md:block">
            网电销差异化策略定制
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Net Sales Mode */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-md shadow-blue-200">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">网销模式</h4>
              </div>
              <div className="space-y-6">
                <div>
                   <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Target 目标</div>
                   <p className="text-xl font-bold text-gray-800 leading-snug">以授权获客为主</p>
                </div>
                <div>
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Strategy 策略</div>
                   <p className="text-base text-gray-600 leading-relaxed">
                     通过权益贯穿，快速引导产品外授权，提升司机的授权动力，同时电销增加授权入口，解决后续转化的信任度问题。
                   </p>
                </div>
              </div>
            </div>
            {/* Telesales Mode */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-green-50/50 to-white border border-green-100 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500 rounded-2xl text-white shadow-md shadow-green-200">
                  <TrendingUp size={24} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">电销模式</h4>
              </div>
              <div className="space-y-6">
                <div>
                   <div className="text-xs font-bold text-green-500 uppercase tracking-wider mb-2">Target 目标</div>
                   <p className="text-xl font-bold text-gray-800 leading-snug">以促单转化为主</p>
                </div>
                <div>
                   <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Strategy 策略</div>
                   <p className="text-base text-gray-600 leading-relaxed">
                     通过解决并优化销售工具的使用卡点，提升销售工作效率，从而提升促单成绩。
                   </p>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Operating Mechanism */}
        <BentoCard colSpan={4} subtitle="Operating Mechanism" title="运转机制">
          <div className="flex flex-col h-full">
             <p className="text-[#31383F] text-lg mt-[-2px] mb-8 max-w-3xl">
               全年遵循以下闭环流程进行运转，保障方案的有效性。
             </p>
             <div className="w-full bg-gray-50/50 rounded-3xl p-8 border border-gray-100 mb-0">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-4 relative">
                   <div className="hidden md:block absolute top-[68px] left-0 w-full h-[2px] bg-gray-200 -z-0"></div>
                   <MechanismStep 
                      number="01" 
                      title="洞察机会" 
                      icon={<Lightbulb size={18} fill="currentColor" />} 
                      color="blue" 
                      details={[{label: '实地访谈', value: '3次'}, {label: '专家走查', value: '1次'}, {label: '问卷收集', value: '3次'}]}
                   />
                   <div className="md:hidden rotate-90 text-gray-300 my-2"><ArrowRight size={20}/></div>
                   <MechanismStep 
                      number="02" 
                      title="制定方案" 
                      icon={<FileText size={18} fill="currentColor" />} 
                      color="purple" 
                      details={[{label: '网销方案', value: '6+'}, {label: '电销方案', value: '30+'}, {label: '其他方案', value: '6+'}]}
                   />
                   <div className="md:hidden rotate-90 text-gray-300 my-2"><ArrowRight size={20}/></div>
                   <MechanismStep 
                      number="03" 
                      title="推动落地" 
                      icon={<Zap size={18} fill="currentColor" />} 
                      color="orange" 
                      details={[{label: '网销方案', value: '4+'}, {label: '电销方案', value: '16+'}, {label: '其他方案', value: '5+'}]}
                   />
                   <div className="md:hidden rotate-90 text-gray-300 my-2"><ArrowRight size={20}/></div>
                   <MechanismStep 
                      number="04" 
                      title="验证再设计" 
                      icon={<CheckCircle2 size={18} fill="currentColor" />} 
                      color="green" 
                      details={[{label: '网销方案', value: '2+'}, {label: '电销方案', value: '6+'}, {label: '其他方案', value: '1+'}]}
                   />
                </div>
             </div>
          </div>
        </BentoCard>
      </Section>

      {/* Part 3: Acquisition */}
      <Section id="acquisition" index={2} title="授权获客" subtitle="Acquisition">
        {/* Top Row: Scenario + Image (Dark Card) */}
        <BentoCard colSpan={4} dark className="p-0 sm:p-0 md:p-0 overflow-hidden">
           <div className="flex flex-col lg:flex-row h-full">
              {/* Left Content Area */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-8">
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1">Scenario</p>
                      <h3 className="text-3xl font-semibold text-white tracking-tight leading-tight">贴合预期的全流程引导设计</h3>
                      <p className="text-gray-400 mt-2 text-lg font-light italic opacity-80">"先顺应预期，再引导转化"</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Before Block */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm flex flex-col gap-4 group hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-red-400 text-[10px] uppercase font-bold tracking-widest">Before</span>
                        </div>
                        <div className="bg-white/5 rounded-lg overflow-hidden p-2">
                           <SmartMedia id="acquisition-before" className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-white leading-relaxed font-medium">
                          页面与用户预期不符，存在秒退风险…
                        </p>
                    </div>

                    {/* After Block */}
                    <div className="bg-white/10 p-5 rounded-2xl border border-green-500/30 relative overflow-hidden backdrop-blur-sm flex flex-col gap-4 group hover:bg-white/15 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                        <div className="flex items-center justify-between">
                            <span className="text-green-400 text-[10px] uppercase font-bold tracking-widest">After</span>
                        </div>
                        <div className="bg-white/5 rounded-lg overflow-hidden p-2">
                            <SmartMedia id="acquisition-after" className="w-full h-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed font-medium">
                          页面与用户预期匹配，激发后续操作兴趣…
                        </p>
                    </div>
                  </div>

                  {/* New Scheme Demo Block */}
                  <div className="mt-8 pt-8 border-t border-white/5">
                      <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 opacity-90">Scheme Illustration 方案示意</h5>
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5 p-4">
                           <SmartMedia id="acquisition-scheme" className="w-full h-auto object-cover opacity-95 hover:opacity-100 transition-opacity rounded-lg" />
                      </div>
                  </div>
              </div>
           </div>
        </BentoCard>

        {/* Middle Row: Design Lead (Restored to Middle) */}
        <BentoCard colSpan={4} title="设计主导" subtitle="Design Lead">
           <div className="flex flex-wrap gap-2.5 mt-4">
              {["授权新形式的推动", "用户的差异引导", "玩法的触发交互", "文案的撰写", "上线后的快速调整等"].map((item, i) => (
                  <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-50 text-gray-600 text-xs sm:text-sm font-medium border border-gray-100 shadow-sm">
                     {item}
                  </span>
              ))}
           </div>
        </BentoCard>

        {/* Bottom Row: Results (Restored to Bottom) */}
        <BentoCard colSpan={4}>
           <div className="flex flex-col h-full">
              <div className="mb-4 relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">Results</p>
                  <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-semibold tracking-tight leading-tight text-[#1d1d1f]">上线效果</h3>
                      <span className="text-[10px] font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        较之前的活动引导授权
                      </span>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                 {/* Stat 1 */}
                 <div className="flex flex-col justify-center p-6 bg-blue-50/40 rounded-2xl border border-blue-100/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm border border-blue-100">
                           <TrendingUp size={20} />
                        </div>
                        <span className="text-3xl md:text-4xl font-bold text-blue-600 tracking-tight">+11PP</span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">同意率提升</div>
                 </div>
                 {/* Stat 2 */}
                 <div className="flex flex-col justify-center p-6 bg-green-50/40 rounded-2xl border border-green-100/50">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white rounded-xl text-green-600 shadow-sm border border-green-100">
                           <Users size={20} />
                        </div>
                        <span className="text-3xl md:text-4xl font-bold text-green-600 tracking-tight">382</span>
                    </div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">日均新增授权用户</div>
                 </div>
              </div>
           </div>
        </BentoCard>
      </Section>

      {/* Part 4: Acquisition Redesign */}
      <Section id="acquisition-redesign" index={3} title="授权获客（再设计）" subtitle="Redesign">
        
        {/* Combined Card: Background, Goal, Strategy, Image */}
        <BentoCard colSpan={4}>
           <div className="flex flex-col gap-12">
              
              {/* Custom Header for Part 4 */}
              <div>
                  <span className="inline-block px-3 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold tracking-widest mb-3 border border-gray-200/50">
                    先顺应预期，再引导转化
                  </span>
                  <h3 className="text-[28px] font-semibold tracking-tight leading-tight text-[#1d1d1f]">
                    入口与页面的差异化引导
                  </h3>
              </div>

              {/* Row 1: Background & Goal */}
              <div className="flex flex-col gap-6">
                  {/* Background */}
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden group hover:bg-gray-100/80 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-400"></div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span> Background 背景
                      </h4>
                      <p className="text-gray-700 leading-relaxed font-medium">
                        活动入口区分了窗期状态，但是承接页面并没有做区分，依旧会有因为不符合预期而流失的问题出现。
                      </p>
                  </div>
                  
                  {/* Goal */}
                  <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 relative overflow-hidden group hover:bg-blue-50/80 transition-colors">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                      <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-500"></span> Goal 目标
                      </h4>
                      <p className="text-blue-600 leading-relaxed font-bold text-lg">
                        权益贯穿投保全流程，激发用户投保意愿度。
                      </p>
                  </div>
              </div>

              {/* Row 2: Strategy */}
              <div>
                  <div className="flex items-center mb-6">
                     <span className="w-8 h-[1px] bg-gray-300 mr-2"></span>
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Strategy 策略</h4>
                     <span className="w-full h-[1px] bg-gray-200 ml-6"></span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 hover:shadow-md transition-all group">
                           <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform"></div>
                               <span className="text-sm font-bold text-gray-800">窗期用户</span>
                           </div>
                           <p className="text-xs text-gray-600 leading-relaxed">
                               顺应“窗期即将到期”心智，跳转至产品内授权，核心引导报价。
                           </p>
                       </div>

                       <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 hover:shadow-md transition-all group">
                           <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform"></div>
                               <span className="text-sm font-bold text-gray-800">授权通过</span>
                           </div>
                           <p className="text-xs text-gray-600 leading-relaxed">
                               自动摇树抽奖并显示结果，点击收下即看最新报价。
                           </p>
                       </div>

                       <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 hover:shadow-md transition-all group">
                           <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-125 transition-transform"></div>
                               <span className="text-sm font-bold text-gray-800">继续参与</span>
                           </div>
                           <p className="text-xs text-gray-600 leading-relaxed">
                               结果弹窗动效缩小吸底，不打断流程同时继续活动。
                           </p>
                       </div>

                       <div className="bg-green-50/60 p-4 rounded-2xl border border-green-100 hover:shadow-md transition-all group">
                           <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 rounded-full bg-green-400 group-hover:scale-125 transition-transform"></div>
                               <span className="text-sm font-bold text-gray-800">投保结算</span>
                           </div>
                           <p className="text-xs text-gray-600 leading-relaxed">
                               使用本次抽到的权益优惠进行投保支付。
                           </p>
                       </div>
                  </div>
              </div>

              {/* Row 3: Image */}
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 min-h-[400px] relative">
                  <SmartMedia id="acquisition-redesign" className="w-full h-full object-cover" />
              </div>
           </div>
        </BentoCard>

        {/* Removed Interaction Flow Card */}
      </Section>

      {/* Part 5: Conversion Research (New Inserted Section) */}
      <Section id="conversion-research" index={4} title="促单转化（调研）" subtitle="Research">
         {/* Intro Card */}
         <BentoCard colSpan={4} dark>
            <div className="p-4 md:p-8 flex flex-col items-center text-center justify-center">
               <h3 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed max-w-4xl">
                 "深入一线销售促单环境，洞察销售提效机会点，<br className="hidden md:block" />升级销售工具提升完单率"
               </h3>
            </div>
         </BentoCard>
         
         {/* Steps 1-4 */}
         <BentoCard colSpan={4} title="调研展开" subtitle="Expansion">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
               <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl border border-blue-100 hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-widest">Step 01</div>
                  <h4 className="font-bold text-gray-900 mb-2">焦点小组</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">参加CRM痛点研讨会，记录销售实际使用的问题反馈。</p>
               </div>
               <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-2xl border border-purple-100 hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-bold text-purple-500 mb-2 uppercase tracking-widest">Step 02</div>
                  <h4 className="font-bold text-gray-900 mb-2">实地访谈</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">出差至销售工作环境，观察销售操作并1对1进行访谈记录及问卷回收。</p>
               </div>
               <div className="bg-gradient-to-br from-orange-50 to-white p-4 rounded-2xl border border-orange-100 hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-bold text-orange-500 mb-2 uppercase tracking-widest">Step 03</div>
                  <h4 className="font-bold text-gray-900 mb-2">落地节奏</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">及时整理销售痛点，与产品及技术同学确认落地方向及负责人，制定优化方案。</p>
               </div>
               <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-2xl border border-green-100 hover:shadow-md transition-all duration-300">
                  <div className="text-xs font-bold text-green-500 mb-2 uppercase tracking-widest">Step 04</div>
                  <h4 className="font-bold text-gray-900 mb-2">方案设计</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">核心页面重组并推动上线。</p>
               </div>
            </div>
         </BentoCard>

         {/* Step 5 Stats - CHANGED to colSpan={4} */}
         <BentoCard colSpan={4} title="效果跟进" subtitle="Outcome">
             <div className="flex flex-col justify-center h-full mt-2 gap-6">
                <div className="flex items-end justify-between border-b border-gray-100 pb-4">
                    <div>
                        <div className="text-4xl font-bold text-gray-900">42<span className="text-lg text-gray-400 font-normal ml-1">个</span></div>
                        <div className="text-xs text-gray-500 mt-1">调研发现有效问题</div>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-bold text-green-600">90.2<span className="text-lg text-green-400 font-normal ml-1">%</span></div>
                        <div className="text-xs text-gray-500 mt-1">整体推动解决进度</div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <div className="flex-1 bg-green-50 p-3 rounded-xl border border-green-100 text-center md:text-left">
                      <div className="text-xl font-bold text-green-700">29</div>
                      <div className="text-[10px] text-green-600 uppercase tracking-wider">已上线</div>
                   </div>
                   <div className="flex-1 bg-blue-50 p-3 rounded-xl border border-blue-100 text-center md:text-left">
                      <div className="text-xl font-bold text-blue-700">9</div>
                      <div className="text-[10px] text-blue-600 uppercase tracking-wider">解决中</div>
                   </div>
                </div>
             </div>
         </BentoCard>

         {/* Image - CHANGED to colSpan={4} and taller height */}
         <BentoCard colSpan={4} className="!p-0 overflow-hidden bg-[#F5F5F7]">
             <div className="relative w-full group">
                 <SmartMedia id="conversion-research-core" className="w-full h-auto object-contain block shadow-sm" />
                 <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm border border-gray-100">
                     <span className="text-[10px] font-bold text-gray-800 uppercase tracking-widest">核心页面</span>
                 </div>
             </div>
         </BentoCard>
      </Section>

      {/* Part 6 (formerly 5 & 6): Conversion (Solution) */}
      <Section id="conversion" index={5} title="促单转化（方案）" subtitle="Solution">
         {/* Top Row: Goal & Strategy + Results */}
         
         {/* Left: Goal & Strategy */}
         <BentoCard colSpan={2} title="CRM核心框架重组" subtitle="Goal & Strategy">
            <div className="flex flex-col gap-4 mt-2 h-full">
                <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <Target className="w-4 h-4 text-blue-500" />
                     <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Goal 目标</span>
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    重组CRM销售平台的核心页面框架，保障后期最小可行完善功能的稳定性。
                  </p>
                </div>
                <div className="p-2 flex-1">
                  <div className="flex items-center gap-2 mb-2 px-1">
                     <GitMerge className="w-4 h-4 text-purple-500" />
                     <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">Strategy 策略</span>
                  </div>
                  <p className="text-gray-600 px-1 leading-relaxed">
                    收藏夹升级为<span className="font-bold text-gray-900 mx-1 relative inline-block">
                        客户管理平台
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-200 -z-10"></span>
                    </span>，信息更全面，操作更便捷。
                  </p>
                </div>
            </div>
         </BentoCard>

         {/* Right: Results */}
         <BentoCard colSpan={2} dark title="数据表现" subtitle="Results">
             <div className="flex flex-col h-full justify-between">
                <p className="text-gray-400 mb-6 mt-2 leading-relaxed">
                   各城市网点不再排斥CRM自有系统的使用，数据显著提升。
                </p>
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/15 transition-colors">
                        <div>
                            <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">32.6%</div>
                            <div className="text-[10px] text-gray-400 mt-1">CRM自有系统出单占比 (10月)</div>
                        </div>
                        <div className="text-green-400 font-mono text-sm font-bold bg-green-400/10 px-2 py-1 rounded border border-green-400/20">▲ 8.6PP</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex justify-between items-center group hover:bg-white/15 transition-colors">
                        <div>
                            <div className="text-3xl font-bold text-white group-hover:scale-105 transition-transform origin-left">29.2%</div>
                            <div className="text-[10px] text-gray-400 mt-1">模型单系统报价使用率 (11月)</div>
                        </div>
                        <div className="text-green-400 font-mono text-sm font-bold bg-green-400/10 px-2 py-1 rounded border border-green-400/20">▲ 7.2PP</div>
                    </div>
                </div>
             </div>
         </BentoCard>

         {/* Middle Row: Methods */}
         <BentoCard colSpan={4} title="关键设计方法" subtitle="Methods">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                 {/* Method 1 */}
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                     <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                        <Search size={20} />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">高效筛选</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                       销售自定义线索筛选，打破新老线索界定，按最高效方式出单。
                     </p>
                 </div>
                 {/* Method 2 */}
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                     <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                        <Layout size={20} />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">批量处理</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                       详情页支持批量处理高优线索，无需返回列表，缩短操作步骤。
                     </p>
                 </div>
                 {/* Method 3 */}
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                     <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                        <GitMerge size={20} />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">断点承接</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                       记录动线，了解历史进度直接继续推进，拒绝机械操作。
                     </p>
                 </div>
                 {/* Method 4 */}
                 <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                     <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                        <Zap size={20} />
                     </div>
                     <h4 className="font-bold text-gray-900 mb-2">便捷操作</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                       操作集中右侧，符合右手习惯，缩短移动距离，提升效率。
                     </p>
                 </div>
             </div>
         </BentoCard>

         {/* Bottom Row: Image */}
         <BentoCard colSpan={4} className="p-0 min-h-[400px] overflow-hidden">
              <div className="w-full h-full relative group">
                 <SmartMedia id="crm-main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                 <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">Core Interface / 核心页面</span>
                 </div>
              </div>
         </BentoCard>
      </Section>

      {/* Part 7 (formerly 5): Conversion Redesign */}
      <Section id="conversion-redesign" index={6} title="转化再设计" subtitle="Optimization">
         <BentoCard colSpan={1} title="零页面切换" subtitle="Core Concept">
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                将列表与详情页合并，提炼决策差异点。时时把控每日线索进度，明确处理分类，拒绝盲目推进。
            </p>
         </BentoCard>
         <BentoCard colSpan={3} className="p-0 overflow-hidden">
             <div className="grid grid-cols-2 h-full">
                <SmartMedia id="conversion-list" className="w-full h-full object-cover border-r border-white/20" />
                <SmartMedia id="conversion-detail" className="w-full h-full object-cover" />
             </div>
         </BentoCard>
      </Section>

      {/* Part 8 (formerly 6): Experience Assurance */}
      <Section id="experience" index={7} title="体验保障机制" subtitle="User Voice">
        <BentoCard colSpan={2} title="全流程闭环">
           <div className="flex items-center justify-between mt-8 text-center px-4">
              <div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                      <MessageSquare size={24} />
                  </div>
                  <div className="font-bold">收集问题</div>
              </div>
              <ArrowRight className="text-gray-300"/>
              <div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                      <Search size={24} />
                  </div>
                  <div className="font-bold">分析问题</div>
              </div>
              <ArrowRight className="text-gray-300"/>
              <div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-3">
                      <CheckCircle2 size={24} />
                  </div>
                  <div className="font-bold">验证问题</div>
              </div>
           </div>
        </BentoCard>

        <BentoCard colSpan={2} title="成果汇总" subtitle="Results">
           <div className="grid grid-cols-2 gap-4 mt-4">
               <StatBox label="有效体验问题" value="254" />
               <StatBox label="双周跟进会议" value="12期" />
               <StatBox label="易用性解决率" value="84%" />
               <StatBox label="好用类专项" value="5个" />
           </div>
        </BentoCard>

        <BentoCard colSpan={4} className="p-0 h-[300px] overflow-hidden">
           <div className="grid grid-cols-4 h-full">
              <SmartMedia id="evidence-1" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              <SmartMedia id="evidence-2" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              <SmartMedia id="evidence-3" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              <SmartMedia id="evidence-4" className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
           </div>
        </BentoCard>
      </Section>

      {/* Part 9 (formerly 7): 2026 Plan */}
      <Section id="plan" index={8} title="2026 计划" subtitle="Future">
         <BentoCard colSpan={1} rowSpan={2} dark title="业务方向">
            <div className="mt-4 space-y-4">
                <Target className="text-blue-400" />
                <p className="text-gray-300 text-sm leading-relaxed">
                    聚焦电销工具类产品提效设计，助力模型单量提升。
                </p>
                <GitMerge className="text-purple-400" />
                <p className="text-gray-300 text-sm leading-relaxed">
                    共建设计规范与组件，标准化快速搭建，重点攻克设计难点。
                </p>
            </div>
         </BentoCard>
         <BentoCard colSpan={1} title="横向协作">
             <Users className="mb-2 text-orange-500" />
             <p className="text-sm text-gray-600">
                深入研究体验度量方式，进行可用性验证，总结方法论。
             </p>
         </BentoCard>
         <BentoCard colSpan={1} title="个人能力">
             <Sparkles className="mb-2 text-indigo-500" />
             <p className="text-sm text-gray-600">
                提升AI敏感度，深入学习AI工具，保障高效高质量输出。
             </p>
         </BentoCard>
         <BentoCard colSpan={2} title="AI 辅助构建">
             <div className="flex items-center gap-8 mt-4">
                <div>
                    <h4 className="font-bold text-lg">豆包</h4>
                    <p className="text-xs text-gray-500">总结全年设计亮点</p>
                </div>
                <div className="h-8 w-[1px] bg-gray-300"></div>
                <div>
                    <h4 className="font-bold text-lg">Gemini</h4>
                    <p className="text-xs text-gray-500">Prompt + 细节调整</p>
                </div>
             </div>
         </BentoCard>
      </Section>

      <footer className="py-12 text-center text-gray-400 text-sm">
        <p>© 2025 Yongjie Zhu. Designed with AI Assistance.</p>
      </footer>

      {/* --- Floating Settings Button --- */}
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 text-gray-600 hover:text-black hover:scale-110 transition-all duration-300 group"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* --- Settings Panel Modal --- */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSettingsOpen(false)}
          ></div>

          {/* Panel */}
          <div className="relative w-full max-w-md h-full bg-white/90 backdrop-blur-2xl shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Asset Management</h2>
                    <p className="text-xs text-gray-500 mt-1">Upload images or videos to replace content.</p>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
             </div>

             <div className="space-y-6">
                {Object.values(assets).map((asset: Asset) => (
                   <div key={asset.id} className="bg-white/50 border border-white/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-semibold text-gray-700">{asset.label}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase font-mono tracking-wider">
                            {asset.type}
                          </span>
                      </div>
                      
                      <div className="flex gap-4 items-center">
                         {/* Preview Thumbnail */}
                         <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                            {asset.type === 'video' ? (
                              <video src={asset.src} className="w-full h-full object-cover" muted />
                            ) : (
                              <img src={asset.src} className="w-full h-full object-cover" alt="prev" />
                            )}
                         </div>

                         {/* Upload Input */}
                         <label className="flex-1 cursor-pointer group">
                             <div className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                                <Upload className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                <span className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">Click to Replace</span>
                             </div>
                             <input 
                               type="file" 
                               accept="image/*,video/*" 
                               className="hidden" 
                               onChange={(e) => e.target.files?.[0] && handleFileUpload(asset.id, e.target.files[0])}
                             />
                         </label>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Helper Components for this file (Unchanged)
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const StepIcon = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
    <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
            {icon}
        </div>
        <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
);

const MechanismStep = ({ number, title, icon, color = "gray", details }: { number: string, title: string, icon: React.ReactNode, color?: "gray" | "blue" | "green" | "purple" | "orange", details?: {label: string, value: string}[] }) => {
    const colorStyles = {
        gray: { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-100", title: "text-gray-800" },
        blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", title: "text-blue-800" },
        green: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200", title: "text-green-800" },
        purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200", title: "text-purple-800" },
        orange: { bg: "bg-orange-100", text: "text-orange-600", border: "border-orange-200", title: "text-orange-800" },
    }[color];

    return (
        <div className={`relative flex flex-col bg-white p-4 rounded-2xl shadow-sm border ${colorStyles.border} w-full md:w-[23%] z-10 transition-all hover:-translate-y-1 duration-300`}>
             <div className="flex flex-col items-center mb-4">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${colorStyles.bg} ${colorStyles.text} z-20 bg-white ring-4 ring-white`}>
                    {icon}
                </div>
                <div className={`text-sm font-bold ${colorStyles.title}`}>{title}</div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white text-[10px] text-gray-400 rounded-full border border-gray-100 font-mono shadow-sm">
                    {number}
                </div>
            </div>
            
            {details && (
                 <div className="pt-3 border-t border-gray-100 space-y-2">
                    {details.map((d, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">{d.label}</span>
                            <span className={`font-semibold ${colorStyles.text} bg-opacity-10`}>{d.value}</span>
                        </div>
                    ))}
                 </div>
            )}
        </div>
    );
};

const ResearchStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
    <div className="bg-white/50 rounded-xl p-3 border border-white/40">
        <div className="text-2xl font-bold text-gray-200 mb-1">{number}</div>
        <div className="font-semibold text-sm text-gray-800">{title}</div>
        <div className="text-xs text-gray-500 mt-1">{desc}</div>
    </div>
);

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
    <div className="flex flex-col">
        <h5 className="font-semibold text-gray-800 text-lg mb-1">{title}</h5>
        <p className="text-sm text-gray-500">{desc}</p>
    </div>
);

const StatBox = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-gray-50 p-4 rounded-2xl">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
);

export default App;