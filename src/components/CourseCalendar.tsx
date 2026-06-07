/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  Wand2, 
  BookOpen, 
  Laptop, 
  GraduationCap, 
  Clock, 
  FileCheck, 
  FileSpreadsheet, 
  Sun,
  Printer,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { CourseEvent } from '../types';

interface CourseCalendarProps {
  events: CourseEvent[];
  onAutoOptimize: () => void;
  onNavigateToPrintSheet: () => void;
}

export default function CourseCalendar({
  events,
  onAutoOptimize,
  onNavigateToPrintSheet
}: CourseCalendarProps) {
  const [viewType, setViewType] = useState<'month' | 'week'>('month');
  const [selectedDay, setSelectedDay] = useState(21); // active day June 21 or 22
  const [optimized, setOptimized] = useState(false);

  // Filter events by date
  const june21Events = events.filter(e => e.date === '2026-06-21');
  const june22Events = events.filter(e => e.date === '2026-06-22');

  // Triggering optimization function
  const handleOptimizationClick = () => {
    onAutoOptimize();
    setOptimized(true);
    alert('「智能排程调度算法」已成功运行！已把6月22日「数学补习精品班」自动顺延至 18:05 开始。完美避开16:30「钢琴课」下课和通勤所需时间的冲突。');
  };

  // Timeline events helper render
  const renderEvents = (dayEvents: CourseEvent[]) => {
    return dayEvents.map((evt) => {
      // Type styling helper
      let iconColorClass = 'text-[#00666d] bg-[#00666d]/10';
      let tagLabel = '作业';
      let tagColorClass = 'bg-[#efeded] text-[#3d494a]';

      if (evt.type === 'online') {
        iconColorClass = 'text-[#00818a] bg-[#00818a]/10';
        tagLabel = '线上课';
        tagColorClass = 'bg-[#00818a]/15 text-[#00666d] font-bold';
      } else if (evt.type === 'offline') {
        iconColorClass = 'text-[#b22200] bg-[#b22200]/10';
        tagLabel = '线下课';
        tagColorClass = 'bg-[#ffdad3] text-[#b22200] font-bold';
      } else if (evt.type === 'exam') {
        iconColorClass = 'text-[#ba1a1a] bg-[#ba1a1a]/10';
        tagLabel = '考前测';
        tagColorClass = 'bg-[#ffdad6] text-[#ba1a1a] font-bold';
      }

      return (
        <div key={evt.id} className="relative pl-6 border-l-2 border-[#bdc9ca]/30 animate-fade-in font-sans">
          {/* Timeline node bullet */}
          <div className="absolute -left-[6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00666d] ring-4 ring-white"></div>
          
          <div className="flex flex-col gap-1 pb-1">
            <span className="text-xs font-extrabold text-[#00666d] font-mono">
              {evt.timeStart} - {evt.timeEnd}
            </span>
            <h5 className="text-sm font-bold text-[#1b1c1c] leading-tight">{evt.title}</h5>
            <div className="flex items-center gap-2 text-[10px] text-[#3d494a] font-semibold mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#3d494a]" />
              <span>{evt.duration} 分钟</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${tagColorClass}`}>
                {tagLabel}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-xl font-bold text-[#1b1c1c] tracking-tight">学校课程与日历计划</h1>
          <p className="text-sm text-[#3d494a] font-medium mt-1">2026年6月方案</p>
        </div>
        <div className="flex bg-[#efeded]/70 rounded-xl p-1 w-fit border border-[#bdc9ca]/10 select-none">
          <button 
            onClick={() => setViewType('month')}
            className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewType === 'month' 
                ? 'bg-white shadow-xs text-[#00666d] font-bold' 
                : 'text-[#3d494a] hover:bg-white/20'
            }`}
          >
            月视图
          </button>
          <button 
            onClick={() => setViewType('week')}
            className={`px-5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewType === 'week' 
                ? 'bg-white shadow-xs text-[#00666d] font-bold' 
                : 'text-[#3d494a] hover:bg-white/20'
            }`}
          >
            周视图
          </button>
        </div>
      </section>

      {/* Course Types Legend tags */}
      <section className="flex flex-wrap gap-4 p-4 bg-white rounded-2xl border border-[#bdc9ca]/20 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs text-[#3d494a] font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00666d]"></span>
          <span>家庭作业单 (Homework)</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#3d494a] font-bold">
          <Laptop className="w-4 h-4 text-[#00818a]" />
          <span>线上网课 (Online)</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#3d494a] font-bold">
          <GraduationCap className="w-4 h-4 text-[#b22200]" />
          <span>非网课程 (Offline)</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#3d494a] font-bold">
          <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
          <span>学校考试 (Exam)</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#3d494a] font-bold">
          <Sun className="w-4 h-4 text-orange-400" />
          <span>暑期活动 (Summer)</span>
        </div>
      </section>

      {/* Calendar Month Selector & Conflict details Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly view simulation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#bdc9ca]/15 shadow-sm font-sans">
            <div className="grid grid-cols-7 gap-1 mb-3 text-center border-b border-[#efeded] pb-2">
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">日</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">一</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">二</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">三</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">四</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">五</div>
              <div className="text-xs text-[#3d494a] font-black uppercase py-1">六</div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 select-none">
              {/* Row 1 */}
              <div className="aspect-square flex items-center justify-center rounded-xl text-[#bdc9ca] text-xs">31</div>
              <div className="aspect-square flex flex-col items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer relative text-xs font-bold text-[#1b1c1c] border border-transparent">
                1
                <div className="absolute bottom-1 w-1 h-1 bg-[#00666d] rounded-full"></div>
              </div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">2</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">3</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">4</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">5</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">6</div>
              
              {/* row dot dots */}
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>
              <div className="aspect-square flex items-center justify-center rounded-xl text-neutral-300 text-xs font-bold">...</div>

              {/* Day 21 (Active event day) */}
              <button 
                onClick={() => setSelectedDay(21)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl relative text-xs font-black transition-all ${
                  selectedDay === 21 
                    ? 'bg-[#00666d] text-white shadow-md' 
                    : 'bg-[#efeded] text-[#1b1c1c] font-black'
                }`}
              >
                21
                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${selectedDay === 21 ? 'bg-white' : 'bg-[#00818a]'}`}></div>
              </button>

              {/* Day 22 (Conflict Alert Day) */}
              <button 
                onClick={() => setSelectedDay(22)}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl relative text-xs font-black transition-all border-2 ${
                  optimized 
                    ? 'border-[#00818a]/40 bg-[#00818a]/10 text-[#00666d]' 
                    : 'border-[#ba1a1a] bg-[#ffdad6]/20 text-[#ba1a1a]'
                } ${
                  selectedDay === 22 ? 'bg-[#ba1a1a]! text-white!' : ''
                }`}
              >
                22
                <div className="absolute -top-1 -right-1">
                  {!optimized && <span className="w-2 h-2 rounded-full bg-[#ba1a1a] block animate-ping"></span>}
                </div>
                <span className="text-[9px] font-bold absolute bottom-1">
                  {optimized ? '已解决' : '冲突'}
                </span>
              </button>

              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">23</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">24</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">25</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">26</div>
              <div className="aspect-square flex items-center justify-center rounded-xl hover:bg-[#efeded]/30 cursor-pointer text-xs font-bold text-[#1b1c1c]">27</div>
            </div>
          </div>

          {/* Dynamic Conflict Alert Banner */}
          {!optimized ? (
            <div className="bg-[#ffdad6]/60 border border-[#ba1a1a]/20 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[#ba1a1a]/5 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center text-[#ba1a1a] shrink-0 animate-bounce">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-bold text-[#ba1a1a]">检测到周一晚日程时间冲突</h4>
                  <p className="text-xs text-[#3d494a] font-medium">6月22日 16:30-18:00 钢琴课 与 17:00-18:30 数学精品班 产生重叠</p>
                </div>
              </div>
              <button 
                onClick={handleOptimizationClick}
                className="bg-[#00666d] text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-[#004f54] hover:shadow-md transition-all active:scale-95 shrink-0"
              >
                <Wand2 className="w-4 h-4 text-white" />
                <span>智能一键调优</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#00818a]/15 border border-[#00818a]/30 p-5 rounded-3xl flex items-center gap-3 shadow-xs animate-pulse">
              <div className="w-10 h-10 rounded-full bg-[#00666d]/10 flex items-center justify-center text-[#00666d] shrink-0">
                <Sparkles className="w-5 h-5 fill-[#00666d] text-[#00666d]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#00666d]">日程排程优化成功！</h4>
                <p className="text-xs text-[#3d494a] font-medium">
                  已自动顺延数学精品课（延后65分钟），钢琴下课后可顺利回家并在 18:50 准时开始，冲突已完美消除！
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Date timeline details list */}
        <section className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#bdc9ca]/15 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#efeded]">
              <h3 className="font-bold text-sm text-[#1b1c1c]">6月{selectedDay}日 详细课程</h3>
              <span className="text-xs px-2.5 py-0.5 bg-[#00666d]/10 text-[#00666d] rounded-full font-bold">
                {selectedDay === 21 ? '星期日' : '星期一'}
              </span>
            </div>

            {/* List timeline content */}
            <div className="space-y-4">
              {selectedDay === 21 ? (
                renderEvents(june21Events)
              ) : (
                renderEvents(june22Events)
              )}
            </div>

            {/* Print and generate A4 list direct button link */}
            <button 
              onClick={onNavigateToPrintSheet}
              className="w-full mt-2 bg-[#00666d] hover:bg-[#004f54] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>生成当日家庭作业单 (A4打印)</span>
            </button>
          </div>

          {/* Summer Vacation Countdown feature widget box */}
          <div className="relative overflow-hidden rounded-3xl aspect-[4/3] group shadow-xs">
            <img 
              alt="Summer breaks scenery landscape"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none referrerPolicy='no-referrer'"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN4e6CL2gdJNmq9O3ANlAbgNZ-nBQj78h6It-yxObDQUiwE0rFBNl8Cnc_iES6IYdqG2N-BDrMNCoHH5wJtsuElF2MM9ZqBiN57H_SYPIL-eJMx3d9zTzf7YnuTqdo3vwC_omYCRVpmr6Rk288lJSdd4tdKM0qvVcqFNrhdtt3XK3qloVFdPXrJIBBMik88JGzLG0vtSaPWIXQVS2KP_a0tNUJi739L0F-ShH2DPX6xDfktcdGj6eTqmFkfCh9CgeWNQqWuWmZuA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-1.5 text-white/90 mb-1">
                <Sun className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">暑假倒计时</span>
              </div>
              <h4 className="text-white text-base font-bold">距离暑期开始还剩最后 12 天</h4>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
