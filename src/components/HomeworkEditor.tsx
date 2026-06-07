/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  School, 
  Plus, 
  Trash2, 
  Save, 
  FolderHeart, 
  GripHorizontal, 
  Library, 
  BookOpen, 
  Calculator, 
  Languages, 
  HelpCircle,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { Task, CategoryType, PriorityType, TaskType } from '../types';

interface HomeworkEditorProps {
  tasks: Task[];
  onSaveTasks: (updatedTasks: Task[]) => void;
  onSaveAsTemplate: (name: string, tasksToSave: Task[]) => void;
  onClose: () => void;
}

export default function HomeworkEditor({
  tasks,
  onSaveTasks,
  onSaveAsTemplate,
  onClose
}: HomeworkEditorProps) {
  const [currentTasks, setCurrentTasks] = useState<Task[]>(() => [...tasks]);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState(20);
  const [newCategory, setNewCategory] = useState<CategoryType>('chinese');
  const [newPriority, setNewPriority] = useState<PriorityType>('normal');
  const [newType, setNewType] = useState<TaskType>('extra');
  const [newRemarks, setNewRemarks] = useState('');

  // School Quick Input Fields State
  const [schoolChinese, setSchoolChinese] = useState('');
  const [schoolMath, setSchoolMath] = useState('');
  const [schoolEnglish, setSchoolEnglish] = useState('');

  // Handle Add custom single task
  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: 'task_' + Date.now(),
      title: newTitle.trim(),
      duration: newDuration,
      priority: newPriority,
      category: newCategory,
      type: newType,
      completed: false,
      remarks: newRemarks.trim() || undefined
    };
    setCurrentTasks(prev => [...prev, newTask]);
    // Reset inputs
    setNewTitle('');
    setNewRemarks('');
    setNewDuration(20);
  };

  // Quick Append School Assignments
  const handleApplySchoolPriorities = () => {
    const appended: Task[] = [];
    if (schoolChinese.trim()) {
      appended.push({
        id: 'sch_' + Date.now() + '_1',
        title: '语文' + (schoolChinese.startsWith('：') || schoolChinese.startsWith(':') ? '' : '：') + schoolChinese.trim(),
        duration: 15,
        priority: 'high',
        category: 'chinese',
        type: 'school',
        completed: false
      });
    }
    if (schoolMath.trim()) {
      appended.push({
        id: 'sch_' + Date.now() + '_2',
        title: '数学' + (schoolMath.startsWith('：') || schoolMath.startsWith(':') ? '' : '：') + schoolMath.trim(),
        duration: 15,
        priority: 'high',
        category: 'math',
        type: 'school',
        completed: false
      });
    }
    if (schoolEnglish.trim()) {
      appended.push({
        id: 'sch_' + Date.now() + '_3',
        title: '英语' + (schoolEnglish.startsWith('：') || schoolEnglish.startsWith(':') ? '' : '：') + schoolEnglish.trim(),
        duration: 15,
        priority: 'high',
        category: 'english',
        type: 'school',
        completed: false
      });
    }

    if (appended.length > 0) {
      setCurrentTasks(prev => [...prev, ...appended]);
      // Reset fields
      setSchoolChinese('');
      setSchoolMath('');
      setSchoolEnglish('');
    }
  };

  // Adjust duration steppers (+5 / -5 min)
  const adjustTaskDuration = (id: string, amount: number) => {
    setCurrentTasks(prev => 
      prev.map(t => 
        t.id === id 
          ? { ...t, duration: Math.max(5, t.duration + amount) } 
          : t
      )
    );
  };

  // Delete Task
  const handleDeleteTask = (id: string) => {
    setCurrentTasks(prev => prev.filter(t => t.id !== id));
  };

  // Save Tasks & Exit
  const handleConfirmSave = () => {
    onSaveTasks(currentTasks);
    onClose();
  };

  // Quick preset loader mock library
  const handleQuickPresetInsert = (presetGroup: 'chinese' | 'math' | 'english') => {
    let presetTitle = '';
    let duration = 15;
    let remarks = '';
    
    if (presetGroup === 'chinese') {
      presetTitle = '古诗词背诵 - 《静夜思》';
      duration = 15;
      remarks = '熟读并背诵给家长听';
    } else if (presetGroup === 'math') {
      presetTitle = '口算口诀突击冲刺';
      duration = 10;
      remarks = '5分钟速算，注意进退位';
    } else {
      presetTitle = 'RAZ 分级阅读跟读 L10';
      duration = 20;
      remarks = '熟练掌握语音连读';
    }

    const newTask: Task = {
      id: 'task_lib_' + Date.now(),
      title: presetTitle,
      duration: duration,
      priority: 'normal',
      category: presetGroup,
      type: 'extra',
      completed: false,
      remarks: remarks
    };
    setCurrentTasks(prev => [...prev, newTask]);
  };

  const handleSaveAsCustomTemplate = () => {
    const templateName = prompt('请输入该常用计划包的名称 (例: 周末加强班):');
    if (templateName && templateName.trim()) {
      onSaveAsTemplate(templateName.trim(), currentTasks);
      alert(`已成功将当前组合保存为名「${templateName}」的常用组合!`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Info */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#1b1c1c] tracking-tight">编辑作业清单</h1>
        <p className="text-sm text-[#3d494a]">
          整理孩子今天的学习任务，量化具体耗时，让效率更高。
        </p>
      </div>

      {/* School Homework Priority Section */}
      <section className="bg-white rounded-2xl p-5 border border-[#bdc9ca]/20 border-l-4 border-[#b22200] shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-[#b22200]" />
            <h2 className="font-bold text-sm text-[#b22200]">学校作业（优先完成）</h2>
          </div>
          <span className="text-xs text-[#3d494a] bg-[#ffdad3] px-2 py-0.5 rounded-lg font-bold">紧急重点</span>
        </div>

        <div className="space-y-3 font-sans">
          <div className="flex items-center gap-3 p-3 bg-[#f5f3f3] rounded-xl border border-[#bdc9ca]/15">
            <span className="text-xs font-bold w-12 text-[#b22200]">语文作业</span>
            <input 
              type="text"
              value={schoolChinese}
              onChange={(e) => setSchoolChinese(e.target.value)}
              placeholder="输入作业内容... (例: 练习册第20页)"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 outline-none placeholder-neutral-400 text-[#1b1c1c] font-medium"
            />
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f5f3f3] rounded-xl border border-[#bdc9ca]/15">
            <span className="text-xs font-bold w-12 text-[#00666d]">数学作业</span>
            <input 
              type="text"
              value={schoolMath}
              onChange={(e) => setSchoolMath(e.target.value)}
              placeholder="输入作业内容... (例: 口算练习1页)"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 outline-none placeholder-neutral-400 text-[#1b1c1c] font-medium"
            />
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#f5f3f3] rounded-xl border border-[#bdc9ca]/15">
            <span className="text-xs font-bold w-12 text-[#5c5c59]">英语作业</span>
            <input 
              type="text"
              value={schoolEnglish}
              onChange={(e) => setSchoolEnglish(e.target.value)}
              placeholder="输入作业内容... (例: 背会第一大题句子)"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-0 outline-none placeholder-neutral-400 text-[#1b1c1c] font-medium"
            />
          </div>
        </div>

        <button
          onClick={handleApplySchoolPriorities}
          disabled={!schoolChinese && !schoolMath && !schoolEnglish}
          className="w-full py-2.5 rounded-xl border border-dashed border-[#b22200] hover:bg-[#b22200]/5 text-xs text-[#b22200] font-bold tracking-wide transition-all active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
        >
          + 录入学校作业项至列表
        </button>
      </section>

      {/* Task Creation Add Form */}
      <section className="bg-white rounded-2xl p-5 border border-[#bdc9ca]/20 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[#1b1c1c] flex items-center gap-1.5">
          <PlusCircle className="w-4.5 h-4.5 text-[#00666d]" />
          快速添加自定义项目
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#3d494a]">项目标题 *</label>
            <input 
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="例: 精读课外书20分钟"
              className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/20 focus:border-transparent outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#3d494a]">备注或指导规范</label>
            <input 
              type="text"
              value={newRemarks}
              onChange={(e) => setNewRemarks(e.target.value)}
              placeholder="例: 注意重点难字与拼音"
              className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/20 focus:border-transparent outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#3d494a]">分类学科</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/20"
              >
                <option value="chinese">语文</option>
                <option value="math">数学</option>
                <option value="english">英语</option>
                <option value="courses">特级兴趣课程</option>
                <option value="other">其他/休息等</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-[#3d494a]">预计耗时</label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/20"
              >
                <option value="10">10 分钟</option>
                <option value="15">15 分钟</option>
                <option value="20">20 分钟</option>
                <option value="30">30 分钟</option>
                <option value="45">45 分钟</option>
                <option value="60">60 分钟</option>
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddTask}
              className="w-full bg-[#00666d] hover:bg-[#004f54] text-white py-2 px-4 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>确认追加项目</span>
            </button>
          </div>
        </div>
      </section>

      {/* Task Editor List details */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-bold text-[#1b1c1c] flex items-center gap-1.5">
            <Library className="w-4.5 h-4.5 text-[#00666d]" />
            当前作业清单 (共 {currentTasks.length} 项)
          </h2>
          <span className="text-xs text-[#3d494a]">点击 + 或 - 微调耗时</span>
        </div>

        {currentTasks.length === 0 ? (
          <div className="border-2 border-dashed border-[#bdc9ca]/50 rounded-2xl py-10 flex flex-col items-center justify-center text-[#bdc9ca] bg-white">
            <HelpCircle className="w-10 h-10 mb-2 stroke-[1.5]" />
            <p className="text-sm font-medium">清单为空，录入一些作业或从库中选择吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentTasks.map((task) => {
              // Color border helper
              let borderClass = 'border-l-[#5c5c59]';
              if (task.category === 'chinese') borderClass = 'border-l-[#b22200]';
              if (task.category === 'math') borderClass = 'border-l-[#00666d]';
              if (task.category === 'courses') borderClass = 'border-l-[#00818a]';

              return (
                <div 
                  key={task.id}
                  className={`bg-white rounded-xl border border-[#bdc9ca]/20 border-l-4 ${borderClass} p-4 flex items-center gap-3 shadow-xs group hover:shadow-sm transition-all`}
                >
                  <GripHorizontal className="w-4 h-4 text-neutral-300 cursor-grab active:cursor-grabbing shrink-0" />
                  
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        task.type === 'school' ? 'bg-[#ffdad3] text-[#b22200]' : 'bg-[#efeded] text-[#3d494a]'
                      }`}>
                        {task.type === 'school' ? '学校' : (task.category === 'chinese' ? '语文' : task.category === 'math' ? '数学' : task.category === 'english' ? '英语' : '素质')}
                      </span>
                      <p className="text-sm font-bold text-[#1b1c1c] truncate">{task.title}</p>
                    </div>
                    {task.remarks && (
                      <p className="text-[11px] text-[#3d494a] italic mt-0.5 truncate">
                        备注: {task.remarks}
                      </p>
                    )}
                  </div>

                  {/* Stepper controls */}
                  <div className="flex items-center gap-1.5 shrink-0 select-none">
                    <button 
                      onClick={() => adjustTaskDuration(task.id, -5)}
                      className="text-[#3d494a] hover:text-[#00666d] active:scale-90"
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-bold text-neutral-800 w-11 text-center font-mono">
                      {task.duration}m
                    </span>
                    <button 
                      onClick={() => adjustTaskDuration(task.id, 5)}
                      className="text-[#3d494a] hover:text-[#00666d] active:scale-90"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-neutral-300 hover:text-[#ba1a1a] p-1.5 rounded-lg active:scale-95 transition-colors shrink-0 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Task library mock search link suggestions */}
      <section className="bg-white rounded-xl p-4 border border-[#bdc9ca]/20 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h4 className="text-xs font-bold text-neutral-800">快捷智能匹配：</h4>
          <p className="text-[11px] text-[#3d494a]">点击一键引入精选核心知识练习项目，匹配暑期及周末规划</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleQuickPresetInsert('chinese')}
            className="px-2.5 py-1 text-xs rounded-lg border border-[#bdc9ca] text-[#b22200] font-bold hover:bg-[#b22200]/5"
          >
            + 语文古诗背诵
          </button>
          <button 
            onClick={() => handleQuickPresetInsert('math')}
            className="px-2.5 py-1 text-xs rounded-lg border border-[#bdc9ca] text-[#00666d] font-bold hover:bg-[#00666d]/5"
          >
            + 数学口算突击
          </button>
          <button 
            onClick={() => handleQuickPresetInsert('english')}
            className="px-2.5 py-1 text-xs rounded-lg border border-[#bdc9ca] text-[#5c5c59] font-bold hover:bg-neutral-100"
          >
            + RAZ分级跟读
          </button>
        </div>
      </section>

      {/* Sticky Bottom Actions */}
      <div className="pt-4 border-t border-[#bdc9ca]/15 max-w-2xl mx-auto flex gap-3">
        <button
          onClick={handleSaveAsCustomTemplate}
          className="flex-1 bg-[#efeded]/70 hover:bg-[#eae8e7] text-[#1b1c1c] font-bold py-3.5 rounded-2xl shadow-sm border border-[#bdc9ca]/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <FolderHeart className="w-5 h-5 text-[#00666d]" />
          <span>保存为常用计划包</span>
        </button>
        <button
          onClick={handleConfirmSave}
          className="flex-[1.5] bg-[#00666d] text-white hover:bg-[#004f54] font-bold py-3.5 rounded-2xl shadow-xl shadow-[#00666d]/15 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Save className="w-5 h-5 text-white" />
          <span>确认保存今日作业单</span>
        </button>
      </div>
    </div>
  );
}
