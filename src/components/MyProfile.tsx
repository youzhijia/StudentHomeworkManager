/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Flame, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  Search, 
  Copy, 
  Clock, 
  Quote, 
  ChevronRight, 
  ClipboardList,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../data/presets';

interface HistoricLog {
  date: string;
  completed: boolean;
  tasksCount: number;
  totalDuration: number;
}

interface MyProfileProps {
  onLoadHistoricSheet: (date: string) => void;
  streakCount?: number;
  weeklyRate?: number;
}

export default function MyProfile({
  onLoadHistoricSheet,
  streakCount = 15,
  weeklyRate = 98
}: MyProfileProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [randomQuote, setRandomQuote] = useState(() => {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  });

  // Mock historic logs list
  const historicLogs: HistoricLog[] = [
    { date: '2026-06-09', completed: true, tasksCount: 6, totalDuration: 105 },
    { date: '2026-06-08', completed: true, tasksCount: 7, totalDuration: 110 },
    { date: '2026-06-07', completed: true, tasksCount: 5, totalDuration: 90 },
    { date: '2026-06-06', completed: true, tasksCount: 8, totalDuration: 130 }
  ];

  const handleHistoricClick = (date: string) => {
    onLoadHistoricSheet(date);
    alert(`成功载入历史记录「${date}家庭作业单」。已为您自动跳转至“作业单”以供查阅、补签、补记或重新打印。`);
  };

  const handleSearchHistory = () => {
    if (!searchQuery.trim()) {
      alert('请输入日期以对历史记录进行匹配查找 (例: 2026-06-08)。');
      return;
    }
    const match = historicLogs.find(l => l.date === searchQuery.trim());
    if (match) {
      handleHistoricClick(match.date);
    } else {
      alert(`没有找到日期为「${searchQuery}」的历史作业单，目前数据库仅保存有6月6日后的几份快照。`);
    }
  };

  const handleCopySheetAction = () => {
    alert('已成功复制最新一期「家庭作业单配置模型」！您可以在“任务库”中选择应用它，或在添加新任务时快捷填加。');
  };

  return (
    <div className="space-y-6">
      {/* Top summary streaks grid */}
      <section className="grid grid-cols-2 gap-4 animate-fade-in font-sans">
        <div className="bg-white p-4.5 rounded-2xl border border-[#bdc9ca]/20 border-l-4 border-[#00666d] shadow-sm">
          <p className="text-xs font-semibold text-[#3d494a] uppercase tracking-wider">连续全额完成</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#00666d] font-mono">{streakCount}</span>
            <span className="text-xs text-[#3d494a] font-bold">天</span>
          </div>
          <div className="mt-3 flex items-center text-[10px] text-[#00666d] font-black gap-1 uppercase tracking-wider select-none">
            <Flame className="w-4 h-4 text-[#00666d] fill-[#00666d] animate-pulse" />
            <span>保持极佳学习状态</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#bdc9ca]/20 border-l-4 border-[#b22200] shadow-sm">
          <p className="text-xs font-semibold text-[#3d494a] uppercase tracking-wider">本周计划完成率</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl font-black text-[#b22200] font-mono">{weeklyRate}</span>
            <span className="text-xs text-[#3d494a] font-bold">%</span>
          </div>
          <div className="mt-3 flex items-center text-[10px] text-[#b22200] font-black gap-1 uppercase tracking-wider select-none">
            <TrendingUp className="w-4 h-4 text-[#b22200]" />
            <span>比上周提升了 2%</span>
          </div>
        </div>
      </section>

      {/* Learning Analytics habits analysis */}
      <section className="space-y-3 font-sans">
        <h2 className="text-sm font-extrabold text-[#1b1c1c] uppercase tracking-wider px-1">学习习惯分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Conic-gradient Pie Chart */}
          <div className="bg-white p-5 rounded-2xl border border-[#bdc9ca]/20 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#1b1c1c] mb-1 flex items-center gap-1">
              <PieChart className="w-4 h-4 text-[#00666d]" />
              按学科时长结构分布
            </h3>
            <div className="flex items-center justify-between">
              
              {/* Pie SVG center-focused */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <div className="w-28 h-28 rounded-full bg-neutral-100 rotate-180" style={{
                  background: 'conic-gradient(#00666d 0% 45%, #b22200 45% 75%, #5c5c59 75% 100%)'
                }}></div>
                <div className="w-16 h-16 bg-white rounded-full absolute flex flex-col items-center justify-center shadow-inner">
                  <span className="text-[10px] font-bold text-[#3d494a] leading-tight text-center">
                    总耗时<br /><span className="text-xs font-extrabold text-neutral-800">12.5h</span>
                  </span>
                </div>
              </div>

              {/* Legends counts percentage list */}
              <div className="space-y-2.5 pl-4 flex-1">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00666d]"></span>
                  <span className="text-[#3d494a] font-medium">语文 (45% / 5.6h)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b22200]"></span>
                  <span className="text-[#3d494a] font-medium">数学 (30% / 3.8h)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5c5c59]"></span>
                  <span className="text-[#3d494a] font-medium">英语 (25% / 3.1h)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Animated vertical bar charts frequencies */}
          <div className="bg-white p-5 rounded-2xl border border-[#bdc9ca]/20 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#1b1c1c] mb-1 flex items-center gap-1">
              <BarChart3 className="w-4 h-4 text-[#00666d]" />
              本周任务计划频致情况
            </h3>
            
            <div className="flex items-end justify-between h-28 pt-2 select-none">
              {[
                { label: '周一', value: 70 },
                { label: '周二', value: 85 },
                { label: '周三', value: 60 },
                { label: '周四', value: 95 },
                { label: '周五', value: 40 },
                { label: '周六', value: 30 },
                { label: '周日', value: 50 }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className="w-3 bg-neutral-100 rounded-t-full h-20 relative">
                    <div 
                      className="absolute bottom-0 left-0 w-full bg-[#00818a]/80 group-hover:bg-[#00666d] rounded-t-full transition-all duration-700 ease-out" 
                      style={{ height: `${bar.value}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-bold text-[#3d494a]">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Habits Action Helpers */}
      <section className="flex gap-3 font-sans">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索流转快照日期..."
            className="w-full text-xs h-10 pl-10 pr-4 bg-white border border-[#bdc9ca]/40 rounded-xl outline-none focus:ring-2 focus:ring-[#00666d]/15"
          />
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#bdc9ca]" />
        </div>
        <button
          onClick={handleSearchHistory}
          className="bg-[#00666d] hover:bg-[#004f54] text-white px-3 text-xs rounded-xl font-bold active:scale-95 transition-transform"
        >
          查询
        </button>
        <button
          onClick={handleCopySheetAction}
          className="bg-[#efeded] text-[#3d494a] hover:bg-neutral-200 px-3 py-2 text-xs rounded-xl font-bold flex items-center gap-1 active:scale-95 transition-transform shrink-0"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>复制配置</span>
        </button>
      </section>

      {/* List of Past Completed Sheets */}
      <section className="space-y-3 font-sans">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-[#1b1c1c] uppercase tracking-wider">历史档案纪录</h2>
          <span className="text-xs text-[#00666d] font-bold">查看全部</span>
        </div>
        <div className="space-y-2.5">
          {historicLogs.map((log) => (
            <div 
              key={log.date}
              onClick={() => handleHistoricClick(log.date)}
              className="bg-white p-4 rounded-xl border border-transparent border-b-[#bdc9ca]/20 hover:border-[#bdc9ca]/40 flex items-center justify-between transition-all cursor-pointer group shadow-xs hover:shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#00666d]/10 flex items-center justify-center text-[#00666d] group-hover:scale-105 transition-transform">
                  <ClipboardList className="w-5 h-5 fill-[#00666d]/10" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1b1c1c]">{log.date} 家庭作业清单</p>
                  <div className="flex items-center gap-3.5 mt-0.5 text-[11px] text-[#3d494a] font-medium">
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" />
                      已归档
                    </span>
                    <span>任务: {log.tasksCount}项</span>
                    <span>耗时: {log.totalDuration}min</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Aristotle Inspirational Quotations Card */}
      <section className="bg-[#e4e2de]/60 text-center p-6 rounded-2xl space-y-2 font-serif text-neutral-800">
        <Quote className="w-8 h-8 text-[#00666d] opacity-25 mx-auto fill-[#00666d]/10" />
        <p className="text-md italic font-semibold leading-relaxed">
          {randomQuote.text}
        </p>
        <p className="text-xs font-semibold text-[#3d494a] font-sans opacity-80">
          — {randomQuote.author}
        </p>
      </section>
    </div>
  );
}
