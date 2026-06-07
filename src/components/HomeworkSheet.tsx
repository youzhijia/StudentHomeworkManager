/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Star, 
  Check, 
  Edit3, 
  FileCheck,
  AlertCircle 
} from 'lucide-react';
import { Task, HomeworkSheet as HomeworkSheetType } from '../types';

interface HomeworkSheetProps {
  sheet: HomeworkSheetType;
  onUpdateSheet: (updated: Partial<HomeworkSheetType>) => void;
  onEditRequest: () => void;
}

export default function HomeworkSheet({ 
  sheet, 
  onUpdateSheet,
  onEditRequest
}: HomeworkSheetProps) {
  const [hideTime, setHideTime] = useState(false);
  const [hideSubject, setHideSubject] = useState(false);
  const [excelDownloading, setExcelDownloading] = useState(false);

  const { tasks, date, studentName, grade, targetGoal, rating, comment, parentSignature } = sheet;

  // Rating click handler
  const handleRatingClick = (stars: number) => {
    onUpdateSheet({ rating: stars });
  };

  // Mock download Excel
  const handleDownloadExcel = () => {
    setExcelDownloading(true);
    setTimeout(() => {
      setExcelDownloading(false);
      alert('已成功导出「今日家庭作业单.xlsx」表格文件！ (模拟下载)');
    }, 1000);
  };

  // Trigger Print
  const handlePrint = () => {
    window.print();
  };

  // Toggle tasks check standard print preview style
  const handleToggleTaskCheck = (taskId: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdateSheet({ tasks: updatedTasks });
  };

  // Category Chinese Label mapping
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'chinese': return '语文';
      case 'math': return '数学';
      case 'english': return '英语';
      case 'courses': return '课程';
      default: return '自主';
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel (no-print utility) */}
      <div className="bg-white rounded-2xl p-5 border border-[#bdc9ca]/20 shadow-sm space-y-4 no-print animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#00666d] flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            视图设置
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={handleDownloadExcel}
              disabled={excelDownloading}
              className="p-2 px-3 text-sm rounded-xl bg-[#efeded] hover:bg-[#eae8e7] text-[#00666d] flex items-center gap-1.5 font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{excelDownloading ? '正在导出...' : 'Excel'}</span>
            </button>
            <button 
              onClick={handlePrint}
              className="p-2 px-3.5 text-sm rounded-xl bg-[#00666d] hover:bg-[#004f54] text-white flex items-center gap-1.5 font-bold shadow-md shadow-[#00666d]/10 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>打印</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 border-t border-[#bdc9ca]/10 pt-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#3d494a] select-none font-medium">
            <input 
              type="checkbox"
              checked={hideTime}
              onChange={() => setHideTime(!hideTime)}
              className="w-4.5 h-4.5 rounded border-[#bdc9ca] text-[#00666d] focus:ring-[#00666d]/20 focus:ring-2 cursor-pointer"
            />
            <span>隐藏预计耗时</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#3d494a] select-none font-medium">
            <input 
              type="checkbox"
              checked={hideSubject}
              onChange={() => setHideSubject(!hideSubject)}
              className="w-4.5 h-4.5 rounded border-[#bdc9ca] text-[#00666d] focus:ring-[#00666d]/20 focus:ring-2 cursor-pointer"
            />
            <span>隐藏科目</span>
          </label>
        </div>
      </div>

      {/* A4 Simulation Container */}
      <div className="bg-white border rounded-3xl border-[#bdc9ca]/30 px-6 py-8 md:p-10 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] font-serif max-w-[210mm] mx-auto print:border-none print:shadow-none print:p-0 print:m-0">
        
        {/* Printable Header */}
        <div className="space-y-4 border-b-2 border-[#00666d] pb-6">
          <div className="flex justify-between items-end">
            <h1 className="text-2xl font-bold text-[#00666d] tracking-tight print:text-2xl">今日家庭作业单</h1>
            <div className="text-right text-xs text-[#3d494a] font-sans">
              <span className="font-semibold text-[#1b1c1c]">日期：{date}</span>
            </div>
          </div>
          <div className="flex gap-8 text-base font-sans text-neutral-800">
            <p className="flex items-center">
              姓名：
              <span className="border-b border-[#bdc9ca] px-4 min-w-[100px] inline-block text-center font-bold text-neutral-900">
                {studentName}
              </span>
            </p>
            <p className="flex items-center">
              年级：
              <span className="border-b border-[#bdc9ca] px-4 min-w-[100px] inline-block text-center font-bold text-neutral-900">
                {grade}
              </span>
            </p>
          </div>
          <div className="bg-[#f5f3f3]/75 p-3 rounded-xl border-l-4 border-[#00818a] font-sans">
            <p className="text-xs text-[#3d494a]">
              今日目标：
              <input
                type="text"
                value={targetGoal}
                onChange={(e) => onUpdateSheet({ targetGoal: e.target.value })}
                className="bg-transparent border-none text-[#1b1c1c] p-0 font-medium italic focus:ring-0 w-4/5 text-xs outline-none"
                placeholder="在此输入今日激励目标或提醒词..."
              />
            </p>
          </div>
        </div>

        {/* Assignments Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[#bdc9ca] font-sans">
            <thead>
              <tr className="bg-[#eae8e7] text-[#3d494a] text-xs uppercase tracking-wider font-bold">
                <th className="w-12 text-center py-3 border border-[#bdc9ca]">优先</th>
                {!hideSubject && (
                  <th className="w-20 text-center py-3 border border-[#bdc9ca]">科目</th>
                )}
                <th className="px-4 py-3 border border-[#bdc9ca]">任务内容</th>
                {!hideTime && (
                  <th className="w-20 text-center py-3 border border-[#bdc9ca]">预计时长</th>
                )}
                <th className="w-12 text-center py-3 border border-[#bdc9ca]">完成</th>
                <th className="px-4 py-3 border border-[#bdc9ca]">备注</th>
              </tr>
            </thead>
            <tbody className="text-sm font-sans text-neutral-800">
              {tasks.map((task) => (
                <tr 
                  key={task.id} 
                  className={`border-b border-[#bdc9ca] transition-colors ${
                    task.priority === 'high' ? 'bg-[#ffdad3]/15' : 'bg-transparent'
                  }`}
                >
                  {/* Priority icon star */}
                  <td className="text-center py-3 border border-[#bdc9ca]">
                    {task.priority === 'high' ? (
                      <Star className="w-4 h-4 text-[#b22200] fill-[#b22200] mx-auto animate-pulse" />
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>

                  {/* Subject column */}
                  {!hideSubject && (
                    <td className="text-center py-3 border border-[#bdc9ca] font-extrabold text-[#00666d]">
                      {getCategoryLabel(task.category)}
                    </td>
                  )}

                  {/* Assignment Task details text */}
                  <td className="px-4 py-3 border border-[#bdc9ca] font-medium leading-relaxed">
                    {task.title}
                  </td>

                  {/* Expected duration column */}
                  {!hideTime && (
                    <td className="text-center py-3 border border-[#bdc9ca] text-xs font-semibold">
                      {task.duration} 分钟
                    </td>
                  )}

                  {/* Checklist square checkbox */}
                  <td className="text-center py-3 border border-[#bdc9ca]">
                    <button
                      onClick={() => handleToggleTaskCheck(task.id)}
                      className={`w-5 h-5 mx-auto rounded border-2 border-[#bdc9ca] flex items-center justify-center hover:bg-neutral-50 ${
                        task.completed ? 'bg-[#00666d] border-[#00666d]' : 'bg-transparent'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 text-white stroke-[4px]" />}
                    </button>
                  </td>

                  {/* Parent note remarks column */}
                  <td className="px-4 py-3 border border-[#bdc9ca] text-xs italic text-neutral-500">
                    {task.remarks || '无'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Print Footer Comments & Ratings */}
        <div className="mt-8 border-t border-[#bdc9ca] pt-6 flex flex-col gap-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Daily Stars performance */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#3d494a] uppercase tracking-wider">今日表现 (Rating)</p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button 
                    key={index} 
                    type="button"
                    onClick={() => handleRatingClick(index)}
                    className="hover:scale-110 active:scale-95 transition-transform shrink-0"
                  >
                    <Star 
                      className={`w-6 h-6 ${
                        index <= rating 
                          ? 'text-[#00666d] fill-[#00666d]' 
                          : 'text-neutral-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Parent signature simulator */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#3d494a] uppercase tracking-wider">家长签字 (Signature)</p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={parentSignature}
                  onChange={(e) => onUpdateSheet({ parentSignature: e.target.value })}
                  placeholder="写下名字(例如: 小名妈妈)"
                  className="bg-transparent border-b border-[#bdc9ca] border-dashed py-1 text-sm outline-none w-52 text-[#1b1c1c] font-semibold"
                />
                <button
                  onClick={() => onUpdateSheet({ parentSignature: '小名妈妈' })}
                  className="text-xs px-2.5 py-1 rounded bg-[#efeded] text-[#00666d] hover:bg-[#00818a]/10 font-bold no-print"
                >
                  代签
                </button>
              </div>
            </div>

          </div>

          {/* Need Review / Homework error logs writing board */}
          <div className="bg-[#f5f3f3]/75 p-5 rounded-2xl border border-[#bdc9ca]/20">
            <h4 className="text-xs font-bold text-[#3d494a] mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#00666d]" />
              错题记录 / 重点复习备忘录
            </h4>
            <textarea
              className="w-full bg-transparent border-none text-xs text-neutral-800 italic outline-none resize-none p-0 focus:ring-0 leading-relaxed placeholder-neutral-400"
              rows={3}
              value={comment}
              onChange={(e) => onUpdateSheet({ comment: e.target.value })}
              placeholder="在此手写记录或电子记录孩子今天在学习中感到吃力的知识点、错题，方便下一步定向复习指导..."
            />
          </div>
        </div>

      </div>

      {/* Floating Edit Button (Contextual) banner */}
      <button 
        onClick={onEditRequest}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[#00666d] hover:bg-[#004f54] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all no-print z-40 shadow-[#00666d]/20"
      >
        <Edit3 className="w-5 h-5" />
      </button>
    </div>
  );
}
