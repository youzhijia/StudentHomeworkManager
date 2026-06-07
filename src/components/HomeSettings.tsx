/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  School, 
  Languages, 
  Clock, 
  CalendarDays, 
  Coffee, 
  Clock3 
} from 'lucide-react';

interface HomeSettingsProps {
  onGenerate: (config: {
    hasSchoolHomework: boolean;
    workload: 'easy' | 'standard' | 'heavy';
    englishFocus: boolean;
    endTime: string;
    avoidCourses: boolean;
    scheduleRest: boolean;
    presetMinutes: number;
  }) => void;
  dayType?: string;
  executionDate?: string;
}

export default function HomeSettings({ 
  onGenerate, 
  dayType = '普通工作日', 
  executionDate = '2026年6月10日 (周三)' 
}: HomeSettingsProps) {
  const [hasSchoolHomework, setHasSchoolHomework] = useState(true);
  const [workload, setWorkload] = useState<'easy' | 'standard' | 'heavy'>('standard');
  const [englishFocus, setEnglishFocus] = useState(false);
  const [endTime, setEndTime] = useState('21:00');
  const [avoidCourses, setAvoidCourses] = useState(true);
  const [scheduleRest, setScheduleRest] = useState(true);
  const [presetMinutes, setPresetMinutes] = useState(25);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = () => {
    setLoading(true);
    setTimeout(() => {
      onGenerate({
        hasSchoolHomework,
        workload,
        englishFocus,
        endTime,
        avoidCourses,
        scheduleRest,
        presetMinutes,
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#1b1c1c] tracking-tight">智能生成设置</h2>
        <p className="text-sm text-[#3d494a]">
          根据您的规则，系统将优先安排学校作业并于 18:50 开始工作日计划。
        </p>
      </div>

      {/* Date & Recognition Card */}
      <div className="bg-white p-5 rounded-2xl border border-[#bdc9ca]/20 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#3d494a] uppercase tracking-wider">执行日期</span>
          <div className="text-lg font-bold text-[#00666d]">{executionDate}</div>
        </div>
        <div className="bg-[#00818a]/10 px-3.5 py-2 rounded-xl">
          <span className="text-xs text-[#00666d] font-bold">识别为：{dayType}</span>
        </div>
      </div>

      {/* Config Group */}
      <div className="space-y-4">
        {/* School Homework Toggle */}
        <div className="bg-white p-4 rounded-xl border border-[#bdc9ca]/20 border-l-4 border-[#b22200] flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <School className="w-5 h-5 text-[#b22200]" />
            <span className="text-base font-medium text-[#1b1c1c]">今天是否有学校作业</span>
          </div>
          <button 
            type="button"
            onClick={() => setHasSchoolHomework(!hasSchoolHomework)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${hasSchoolHomework ? 'bg-[#00666d]' : 'bg-[#bdc9ca]'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${hasSchoolHomework ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Workload Selection */}
        <div className="bg-white p-5 rounded-xl border border-[#bdc9ca]/20 flex flex-col gap-4 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
          <span className="text-xs font-semibold text-[#3d494a]">作业量预估</span>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setWorkload('easy')}
              className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                workload === 'easy'
                  ? 'bg-[#00666d]/10 border-[#00666d] text-[#00666d] font-bold ring-2 ring-[#00666d]/20'
                  : 'border-[#bdc9ca]/40 text-[#3d494a] hover:bg-[#efeded]/30'
              }`}
            >
              轻松
            </button>
            <button
              onClick={() => setWorkload('standard')}
              className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                workload === 'standard'
                  ? 'bg-[#00666d] border-transparent text-white font-bold shadow-md shadow-[#00666d]/10'
                  : 'border-[#bdc9ca]/40 text-[#3d494a] hover:bg-[#efeded]/30'
              }`}
            >
              标准
            </button>
            <button
              onClick={() => setWorkload('heavy')}
              className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${
                workload === 'heavy'
                  ? 'bg-[#00666d]/10 border-[#00666d] text-[#00666d] font-bold ring-2 ring-[#00666d]/20'
                  : 'border-[#bdc9ca]/40 text-[#3d494a] hover:bg-[#efeded]/30'
              }`}
            >
              加强
            </button>
          </div>
        </div>

        {/* English Focus Toggle */}
        <div className="bg-white p-4 rounded-xl border border-[#bdc9ca]/20 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-[#00666d]" />
            <span className="text-base font-medium text-[#1b1c1c]">英语是否为今日重点</span>
          </div>
          <button 
            type="button"
            onClick={() => setEnglishFocus(!englishFocus)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${englishFocus ? 'bg-[#00666d]' : 'bg-[#bdc9ca]'}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${englishFocus ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
        </div>

        {/* Time Picker */}
        <div className="bg-white p-4 rounded-xl border border-[#bdc9ca]/20 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#00666d]" />
            <span className="text-base font-medium text-[#1b1c1c]">最晚完成时间</span>
          </div>
          <div className="relative">
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="appearance-none bg-[#efeded]/60 border border-[#bdc9ca]/30 pl-3 pr-10 py-1.5 rounded-xl font-bold text-[#1b1c1c] text-sm focus:outline-none focus:ring-2 focus:ring-[#00666d]/20 cursor-pointer"
            >
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#3d494a]">
              <Clock3 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Avoid Classes & Rest Toggles Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl border border-[#bdc9ca]/20 flex flex-col gap-3 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <CalendarDays className="w-5 h-5 text-[#00666d]" />
              <button 
                type="button"
                onClick={() => setAvoidCourses(!avoidCourses)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${avoidCourses ? 'bg-[#00666d]' : 'bg-[#bdc9ca]'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${avoidCourses ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>
            <span className="text-sm font-bold text-[#1b1c1c]">避开已有课程</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#bdc9ca]/20 flex flex-col gap-3 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
              <Coffee className="w-5 h-5 text-[#00666d]" />
              <button 
                type="button"
                onClick={() => setScheduleRest(!scheduleRest)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${scheduleRest ? 'bg-[#00666d]' : 'bg-[#bdc9ca]'}`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${scheduleRest ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
            </div>
            <span className="text-sm font-bold text-[#1b1c1c]">安排休息时间</span>
          </div>
        </div>

        {/* Expected Study Time Slider */}
        <div className="bg-white p-5 rounded-xl border border-[#bdc9ca]/20 flex flex-col gap-4 shadow-[0px_4px_12px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#1b1c1c]">每项预计学习时间</span>
            <span className="text-[#00666d] font-bold text-lg">{presetMinutes} 分钟</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={presetMinutes}
            onChange={(e) => setPresetMinutes(Number(e.target.value))}
            className="w-full h-2 bg-[#bdc9ca] rounded-lg appearance-none cursor-pointer accent-[#00666d]"
          />
          <div className="flex justify-between text-xs text-[#3d494a] font-medium px-1">
            <span>10m</span>
            <span>30m</span>
            <span>60m</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={handleGenerateClick}
          disabled={loading}
          className="w-full bg-[#00666d] hover:bg-[#004f54] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-[#00666d]/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
              <span>正在生成今日最优计划...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>智能一键生成计划</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
