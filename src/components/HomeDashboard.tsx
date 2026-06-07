/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Bell, 
  Info, 
  BookOpen, 
  Calculator, 
  Languages, 
  Clock, 
  Plus, 
  Copy, 
  CalendarRange, 
  CheckSquare, 
  Square,
  GraduationCap
} from 'lucide-react';
import { Task } from '../types';

interface HomeDashboardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onEditRequest: () => void;
  onResetToTemplate: (templateId: string) => void;
  onCloneYesterday: () => void;
  studentName?: string;
  executionDate?: string;
}

export default function HomeDashboard({
  tasks,
  onToggleTask,
  onEditRequest,
  onResetToTemplate,
  onCloneYesterday,
  studentName = '小名',
  executionDate = '2026年6月10日 (周三)'
}: HomeDashboardProps) {

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progressRatio = totalTasks > 0 ? completedTasks / totalTasks : 0;
  const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0);

  // Filter tasks into lists for rendering
  const schoolTasks = tasks.filter(t => t.type === 'school');
  const chineseTasks = tasks.filter(t => t.category === 'chinese' && t.type !== 'school');
  const mathTasks = tasks.filter(t => t.category === 'math' && t.type !== 'school');
  const englishTasks = tasks.filter(t => t.category === 'english' && t.type !== 'school');
  const otherTasks = tasks.filter(t => (t.category === 'courses' || t.category === 'other') && t.type !== 'school');

  // Math variables for Circular SVG
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressRatio * circumference);

  return (
    <div className="space-y-6">
      {/* Header Profile Summary */}
      <section className="flex justify-between items-end mt-2 animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👋</span>
            <h2 className="text-2xl font-bold text-[#1b1c1c] tracking-tight">你好，{studentName}</h2>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e4e2e2] text-xs font-medium text-[#3d494a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00666d] mr-1.5 animate-ping"></span>
            上学期间
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 absolute -rotate-90">
              <circle
                className="text-[#efeded]"
                cx="32"
                cy="32"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeWidth="5"
              />
              <circle
                className="text-[#00666d] transition-all duration-500 ease-out"
                cx="32"
                cy="32"
                fill="transparent"
                r={radius}
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="5"
              />
            </svg>
            <span className="text-sm font-bold text-[#00666d] z-10">
              {completedTasks}/{totalTasks}
            </span>
          </div>
          <p className="text-[10px] font-bold text-[#3d494a] mt-1 uppercase tracking-wider">已完成进度</p>
        </div>
      </section>

      {/* Status Banner */}
      <div className="p-4 rounded-xl bg-[#00818a]/10 border border-[#00818a]/20 flex items-center gap-3 shadow-sm">
        <Info className="w-5 h-5 text-[#00818a] shrink-0" />
        <p className="text-sm text-[#004f54] font-medium">今天18:30到家，建议18:50开始学习</p>
      </div>

      {/* Priority Section: School Homework */}
      {schoolTasks.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1b1c1c] font-bold flex items-center gap-2 text-md">
              <span className="w-1.5 h-5 bg-[#b22200] rounded-full"></span>
              重点关注
            </h3>
          </div>
          <div className="rounded-2xl bg-[#d73b19]/5 shadow-sm border border-[#bdc9ca]/30 border-l-4 border-[#b22200] p-4 space-y-3">
            <div className="flex justify-between items-center pb-1 border-b border-[#bdc9ca]/15">
              <span className="text-[#b22200] font-bold text-sm flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                学校作业｜优先完成
              </span>
              <span className="bg-[#b22200] text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                紧急
              </span>
            </div>
            <ul className="space-y-2">
              {schoolTasks.map((task) => (
                <li 
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className="flex items-center gap-3 bg-white/80 p-2.5 rounded-xl text-[#3d3d3d] hover:bg-white cursor-pointer transition-all border border-[#bdc9ca]/15 shadow-sm group"
                >
                  <button className="text-[#b22200] shrink-0">
                    {task.completed ? (
                      <CheckSquare className="w-5 h-5 fill-[#b22200] text-white" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 flex flex-col">
                    <span className={`text-sm font-medium ${task.completed ? 'line-through text-[#bdc9ca]' : 'text-[#1b1c1c]'}`}>
                      {task.title}
                    </span>
                    {task.remarks && (
                      <span className="text-[10px] text-[#3d494a]">{task.remarks}</span>
                    )}
                  </div>
                  <span className="text-xs text-[#3d494a] bg-[#efeded] px-2 py-0.5 rounded-lg shrink-0">
                    {task.duration} min
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Subject Sections Grid */}
      <section className="space-y-3">
        <h3 className="text-[#1b1c1c] font-bold flex items-center gap-2 text-md">
          <span className="w-1.5 h-5 bg-[#00666d] rounded-full"></span>
          自主练习清单
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Chinese Card */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border-t-4 border-[#b22200] border-x border-b border-[#bdc9ca]/20 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-[#b22200] flex items-center gap-1.5 text-sm">
                <BookOpen className="w-4 h-4" />
                语文自习
              </h4>
              <span className="text-xs text-[#3d494a]">{chineseTasks.length} 项</span>
            </div>
            {chineseTasks.length === 0 ? (
              <p className="text-xs text-[#bdc9ca] italic py-2 text-center">暂无自主项目</p>
            ) : (
              <div className="space-y-2">
                {chineseTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer transition-all text-xs"
                  >
                    <span className={`font-medium pr-1 flex-1 truncate ${task.completed ? 'line-through text-[#bdc9ca]' : 'text-[#1b1c1c]'}`}>
                      {task.title}
                    </span>
                    <button className="text-[#3d494a] shrink-0">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#00666d]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#bdc9ca]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mathematics Card */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border-t-4 border-[#00666d] border-x border-b border-[#bdc9ca]/20 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-[#00666d] flex items-center gap-1.5 text-sm">
                <Calculator className="w-4 h-4" />
                数学提优
              </h4>
              <span className="text-xs text-[#3d494a]">{mathTasks.length} 项</span>
            </div>
            {mathTasks.length === 0 ? (
              <p className="text-xs text-[#bdc9ca] italic py-2 text-center">暂无自主项目</p>
            ) : (
              <div className="space-y-2">
                {mathTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer transition-all text-xs"
                  >
                    <span className={`font-medium pr-1 flex-1 truncate ${task.completed ? 'line-through text-[#bdc9ca]' : 'text-[#1b1c1c]'}`}>
                      {task.title}
                    </span>
                    <button className="text-[#3d494a] shrink-0">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#00666d]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#bdc9ca]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* English Card */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border-t-4 border-[#5c5c59] border-x border-b border-[#bdc9ca]/20 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-[#5c5c59] flex items-center gap-1.5 text-sm">
                <Languages className="w-4 h-4" />
                英语强化
              </h4>
              <span className="text-xs text-[#3d494a]">{englishTasks.length} 项</span>
            </div>
            {englishTasks.length === 0 ? (
              <p className="text-xs text-[#bdc9ca] italic py-2 text-center">暂无自主项目</p>
            ) : (
              <div className="space-y-2">
                {englishTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer transition-all text-xs"
                  >
                    <span className={`font-medium pr-1 flex-1 truncate ${task.completed ? 'line-through text-[#bdc9ca]' : 'text-[#1b1c1c]'}`}>
                      {task.title}
                    </span>
                    <button className="text-[#3d494a] shrink-0">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#00666d]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#bdc9ca]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Extra Courses/Others Card */}
          <div className="p-4 rounded-2xl bg-white shadow-sm border-t-4 border-[#00818a] border-x border-b border-[#bdc9ca]/20 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-[#00818a] flex items-center gap-1.5 text-sm">
                <CalendarRange className="w-4 h-4" />
                课外或兴趣
              </h4>
              <span className="text-xs text-[#3d494a]">{otherTasks.length} 项</span>
            </div>
            {otherTasks.length === 0 ? (
              <p className="text-xs text-[#bdc9ca] italic py-2 text-center">暂无自主项目</p>
            ) : (
              <div className="space-y-2">
                {otherTasks.map((task) => (
                  <div 
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer transition-all text-xs"
                  >
                    <span className={`font-medium pr-1 flex-1 truncate ${task.completed ? 'line-through text-[#bdc9ca]' : 'text-[#1b1c1c]'}`}>
                      {task.title}
                    </span>
                    <button className="text-[#3d494a] shrink-0">
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#00666d]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#bdc9ca]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Speed totals */}
      <div className="flex items-center justify-center gap-2 py-1.5 bg-[#efeded]/30 rounded-xl border border-[#bdc9ca]/10">
        <Clock className="w-4' h-4 text-[#3d494a]" />
        <p className="text-xs text-[#3d494a] font-medium">
          今日预计总耗时约: <span className="text-[#00666d] font-bold">{totalDuration} 分钟</span>
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          onClick={onEditRequest}
          className="flex-1 py-4 px-6 rounded-2xl bg-[#00666d] text-white hover:bg-[#004f54] font-bold text-sm shadow-md shadow-[#00666d]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>管理或编辑作业单</span>
        </button>
      </div>

      {/* Preset shortcut links block */}
      <div className="pt-2 border-t border-[#bdc9ca]/20">
        <h4 className="text-xs font-bold text-[#3d494a] mb-3 text-center uppercase tracking-wider">快捷预置计划</h4>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={onCloneYesterday}
            className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-[#bdc9ca]/20 hover:bg-[#efeded]/30 transition-all active:scale-[0.96]"
          >
            <div className="w-10 h-10 rounded-full bg-[#efeded]/70 flex items-center justify-center text-[#3d494a]">
              <Copy className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-[#3d494a]">复制昨天</span>
          </button>
          <button 
            onClick={() => onResetToTemplate('t1')}
            className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-[#bdc9ca]/20 hover:bg-[#efeded]/30 transition-all active:scale-[0.96]"
          >
            <div className="w-10 h-10 rounded-full bg-[#efeded]/70 flex items-center justify-center text-[#3d494a]">
              <CalendarRange className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-[#3d494a]">工作日模板</span>
          </button>
          <button 
            onClick={() => onResetToTemplate('t2')}
            className="flex flex-col items-center gap-1.5 p-2 bg-white rounded-xl border border-[#bdc9ca]/20 hover:bg-[#efeded]/30 transition-all active:scale-[0.96]"
          >
            <div className="w-10 h-10 rounded-full bg-[#efeded]/70 flex items-center justify-center text-[#3d494a]">
              <CheckSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold text-[#3d494a]">周末模板</span>
          </button>
        </div>
      </div>
    </div>
  );
}
