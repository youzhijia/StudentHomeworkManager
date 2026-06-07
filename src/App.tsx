/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Home, 
  FileCheck, 
  Calendar, 
  FolderHeart, 
  User, 
  AlertCircle 
} from 'lucide-react';

// Shared Types
import { Task, HomeworkSheet as HomeworkSheetType, PresetTask, TaskTemplate, CourseEvent } from './types';

// Preset Data
import { 
  DEFAULT_PRESET_TASKS, 
  DEFAULT_TEMPLATES, 
  DEFAULT_COURSE_EVENTS 
} from './data/presets';

// Component Views
import HomeSettings from './components/HomeSettings';
import HomeDashboard from './components/HomeDashboard';
import HomeworkSheet from './components/HomeworkSheet';
import HomeworkEditor from './components/HomeworkEditor';
import TaskLibrary from './components/TaskLibrary';
import CourseCalendar from './components/CourseCalendar';
import MyProfile from './components/MyProfile';

// AI Mom Avatar Asset
// @ts-ignore
import aiMomAvatar from './assets/images/ai_mom_avatar_1780802724068.png';

export default function App() {
  // Navigation Tabs state: 'home' | 'sheet' | 'calendar' | 'library' | 'profile'
  const [navTab, setNavTab] = useState<'home' | 'sheet' | 'calendar' | 'library' | 'profile'>('home');

  // Plan Generation status: if null, home displays the "智能生成设置" setup parameters first
  const [generationConfig, setGenerationConfig] = useState<any | null>(() => {
    const saved = localStorage.getItem('homework_gen_config');
    return saved ? JSON.parse(saved) : null;
  });

  // Active Homework Sheet for June 10, 2026
  const [activeSheet, setActiveSheet] = useState<HomeworkSheetType>(() => {
    const saved = localStorage.getItem('homework_active_sheet');
    if (saved) return JSON.parse(saved);

    // Initial default mock sheet data matching template t1
    const defaultTasks: Task[] = DEFAULT_TEMPLATES[0].tasksToGenerate.map((t, idx) => ({
      ...t,
      id: 'task_def_' + idx,
      completed: idx === 0 || idx === 2 || idx === 5 // Match mock screen values: 3 / 7 completed
    }));

    return {
      date: '2026年6月10日 (周三)',
      studentName: '小名',
      grade: '二升三',
      targetGoal: '坚持认真完成，为暑假做准备',
      tasks: defaultTasks,
      rating: 4,
      comment: '语文和英语认读较为顺畅，稍微在2位算法进位退回部分卡壳，需要周末加强。',
      parentSignature: '小名妈妈'
    };
  });

  // Master mutable database states
  const [templates, setTemplates] = useState<TaskTemplate[]>(() => {
    const saved = localStorage.getItem('homework_templates');
    return saved ? JSON.parse(saved) : DEFAULT_TEMPLATES;
  });

  const [presetTasks, setPresetTasks] = useState<PresetTask[]>(() => {
    const saved = localStorage.getItem('homework_presets');
    return saved ? JSON.parse(saved) : DEFAULT_PRESET_TASKS;
  });

  const [events, setEvents] = useState<CourseEvent[]>(() => {
    const saved = localStorage.getItem('homework_course_events');
    return saved ? JSON.parse(saved) : DEFAULT_COURSE_EVENTS;
  });

  // Modal editor visibility
  const [editorOpen, setEditorOpen] = useState(false);

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem('homework_gen_config', JSON.stringify(generationConfig));
  }, [generationConfig]);

  useEffect(() => {
    localStorage.setItem('homework_active_sheet', JSON.stringify(activeSheet));
  }, [activeSheet]);

  useEffect(() => {
    localStorage.setItem('homework_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('homework_presets', JSON.stringify(presetTasks));
  }, [presetTasks]);

  useEffect(() => {
    localStorage.setItem('homework_course_events', JSON.stringify(events));
  }, [events]);

  // Handler: Task completed checklist toggle trigger
  const handleToggleTask = (id: string) => {
    const updatedTasks = activeSheet.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setActiveSheet(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
  };

  // Handler: Update active sheet properties (ratings, signature, goal, comments)
  const handleUpdateSheet = (updatedProps: Partial<HomeworkSheetType>) => {
    setActiveSheet(prev => ({
      ...prev,
      ...updatedProps
    }));
  };

  // Handler: Smart 一键一秒生成 schedule based on rules configuration
  const handleGenerateSheetFromRules = (config: any) => {
    setGenerationConfig(config);

    // Get preset tasks from standard templates
    const selectedTemplate = templates.find(t => t.isDefault) || templates[0];
    const generatedTasks: Task[] = selectedTemplate.tasksToGenerate.map((t, idx) => {
      // Modify priority according to config settings
      let updatedPriority = t.priority;
      if (config.hasSchoolHomework && t.type === 'school') {
        updatedPriority = 'high';
      }
      return {
        ...t,
        id: 'task_auto_' + Date.now() + '_' + idx,
        priority: updatedPriority,
        completed: false
      };
    });

    setActiveSheet(prev => ({
      ...prev,
      tasks: generatedTasks,
      rating: 0,
      comment: '',
      parentSignature: ''
    }));

    // Alert and jump to Home stats dashboard
    alert('今日最优家庭作业单已智能计算完毕！已根据排课避让、适当休息等规则，自动填充了精配学科练习组，完美契合标准作业量要求。');
    setNavTab('home');
  };

  // Handler: Apply template bundle as active sheets
  const handleApplyTemplate = (templateId: string) => {
    const selected = templates.find(t => t.id === templateId);
    if (!selected) return;

    const newTasks: Task[] = selected.tasksToGenerate.map((t, idx) => ({
      ...t,
      id: 'task_applied_' + Date.now() + '_' + idx,
      completed: false
    }));

    setActiveSheet(prev => ({
      ...prev,
      tasks: newTasks,
      rating: 0,
      comment: '',
      parentSignature: ''
    }));

    setGenerationConfig({ workload: 'standard' }); // toggle generation screen out
    setNavTab('home');
  };

  // Handler: Add customized task directly to today's active schedule
  const handleAddTaskToActive = (title: string, duration: number, category: any, remarks?: string) => {
    const newTask: Task = {
      id: 'task_added_' + Date.now(),
      title,
      duration,
      category,
      priority: 'normal',
      type: 'extra',
      completed: false,
      remarks
    };

    setActiveSheet(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  // Handler: Star favoriting triggers in presets list
  const handleTogglePresetFavorite = (id: string) => {
    setPresetTasks(prev => 
      prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p)
    );
  };

  // Handler: Save custom task as Preset database entry
  const handleAddCustomPreset = (newPreset: Omit<PresetTask, 'id'>) => {
    const prep: PresetTask = {
      ...newPreset,
      id: 'preset_' + Date.now()
    };
    setPresetTasks(p => [prep, ...p]);
  };

  // Handler: Save current active task array as custom Template bundle
  const handleSaveAsTemplate = (name: string, tasksToSave: Task[]) => {
    const tasksToGenerate = tasksToSave.map(t => ({
      title: t.title,
      duration: t.duration,
      priority: t.priority,
      category: t.category,
      type: t.type,
      remarks: t.remarks
    }));

    const counts: any = {};
    tasksToSave.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    const newTemplate: TaskTemplate = {
      id: 'template_custom_' + Date.now(),
      name,
      iconType: 'psychology',
      isDefault: false,
      itemsCount: counts,
      tasksToGenerate
    };

    setTemplates(prev => [...prev, newTemplate]);
  };

  // Handler: Set default template
  const handleSetDefaultTemplate = (templateId: string) => {
    setTemplates(prev =>
      prev.map(t => ({
        ...t,
        isDefault: t.id === templateId
      }))
    );
  };

  // Handler: Conflict automagic optimize trigger
  const handleConflictOptimize = () => {
    setEvents(prev => 
      prev.map(evt => {
        if (evt.id === 'c5' && evt.date === '2026-06-22') {
          // Relocate class starting time to avoid overlap conflict with c4 piano lesson
          return {
            ...evt,
            timeStart: '18:05',
            timeEnd: '19:35',
          };
        }
        return evt;
      })
    );
  };

  // Handler: Copy sheet logs and rewrite snapshot date details
  const handleLoadHistoricSheet = (dateString: string) => {
    // Modify active snapshot parameters to simulate historic backups
    const historicTasks: Task[] = [
      { id: 'h1', title: '语文课外阅读15题', duration: 20, priority: 'high', category: 'chinese', type: 'extra', completed: true },
      { id: 'h2', title: '数学练习：有余数的除法练3页', duration: 15, priority: 'high', category: 'math', type: 'school', completed: true },
      { id: 'h3', title: 'RAZ 连音熟读朗读录制', duration: 25, priority: 'normal', category: 'english', type: 'school', completed: true },
      { id: 'h4', title: '硬笔字帖摹本一页', duration: 10, priority: 'normal', category: 'chinese', type: 'extra', completed: true },
      { id: 'h5', title: '户外体适力打羽毛球', duration: 40, priority: 'normal', category: 'other', type: 'extra', completed: true }
    ];

    setActiveSheet({
      date: `${dateString} (已归档期)`,
      studentName: '小名',
      grade: '二升三',
      targetGoal: '积极积累，贵在习惯坚持！',
      tasks: historicTasks,
      rating: 5,
      comment: '非常好，完全全额完成了全部项目，书写极其端正有神！',
      parentSignature: '小名爸爸'
    });

    setNavTab('sheet');
  };

  // Handler: Quick Copy Yesterday sheet copy
  const handleCloneYesterday = () => {
    const yesterdayTasks: Task[] = [
      { id: 'y1', title: '语文练习册 P19 (古诗书写)', duration: 15, priority: 'high', category: 'chinese', type: 'school', completed: false, remarks: '重点抄写李白静夜思' },
      { id: 'y2', title: '数学思维拓张题 2道', duration: 20, priority: 'high', category: 'math', type: 'school', completed: false, remarks: '锻炼推理逻辑' },
      { id: 'y3', title: 'RAZ 读本跟读完成', duration: 20, priority: 'normal', category: 'english', type: 'extra', completed: false },
      { id: 'y4', title: '英语背单词 10个', duration: 15, priority: 'normal', category: 'english', type: 'extra', completed: false }
    ];

    setActiveSheet(prev => ({
      ...prev,
      tasks: yesterdayTasks,
      rating: 0,
      comment: '',
      parentSignature: ''
    }));

    setGenerationConfig({ workload: 'standard' }); // toggle generation config panel directly
    alert('已成功一键复制昨日的家庭作业项，您可直接在面板中进行勾选或补充。');
  };

  // simulated alerts triggers
  const handleNotificationClick = () => {
    alert('【系统消息中心】\n1. 钢琴课与补习班冲突已完全自动消除。\n2. 连续 15 天全额保质保量完成，小名荣获“习惯先力标兵”徽章！🥇');
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen text-[#1b1c1c] selection:bg-[#00818a]/20 select-none pb-28 leading-normal relative overflow-x-hidden">
      
      {/* Dynamic Background Blurs */}
      <div className="fixed top-0 right-0 -z-10 w-72 h-72 bg-[#00666d]/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-[#b22200]/4 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      {/* Top Navigation Frame App Bar (no-print utility) */}
      <header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-white border-b border-[#bdc9ca]/15 shadow-xs no-print">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00666d]/30 shadow-inner">
            <img 
              alt="AI Mom Avatar portrait" 
              className="w-full h-full object-cover" 
              src={aiMomAvatar}
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-base font-black text-[#00666d] tracking-tight">学生作业管家</h1>
            <p className="text-[10px] font-bold text-[#3d494a] font-sans">
              家长端 · {navTab === 'home' ? '每日作业看板' : navTab === 'sheet' ? '打印作业单' : navTab === 'calendar' ? '排程冲突日历' : navTab === 'library' ? '任务模板库' : '统计习惯分析'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleNotificationClick}
          className="w-10 h-10 rounded-xl bg-[#efeded]/60 hover:bg-[#efeded] text-[#3d494a] hover:text-[#00666d] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <Bell className="w-5 h-5 shrink-0" />
        </button>
      </header>

      {/* Primary Dashboard main content container */}
      <main className="px-4 py-4 max-w-xl mx-auto">
        
        {/* Full Inline detailed editor overlay */}
        {editorOpen ? (
          <HomeworkEditor
            tasks={activeSheet.tasks}
            onSaveTasks={(updated) => handleUpdateSheet({ tasks: updated })}
            onSaveAsTemplate={handleSaveAsTemplate}
            onClose={() => setEditorOpen(false)}
          />
        ) : (
          <div className="space-y-6">
            
            {/* NavTab router switcher */}
            {navTab === 'home' && (
              generationConfig === null ? (
                <HomeSettings 
                  onGenerate={handleGenerateSheetFromRules} 
                  dayType="普通工作日"
                />
              ) : (
                <HomeDashboard
                  tasks={activeSheet.tasks}
                  onToggleTask={handleToggleTask}
                  onEditRequest={() => setEditorOpen(true)}
                  onResetToTemplate={handleApplyTemplate}
                  onCloneYesterday={handleCloneYesterday}
                  studentName={activeSheet.studentName}
                  executionDate={activeSheet.date}
                />
              )
            )}

            {navTab === 'sheet' && (
              <HomeworkSheet
                sheet={activeSheet}
                onUpdateSheet={handleUpdateSheet}
                onEditRequest={() => setEditorOpen(true)}
              />
            )}

            {navTab === 'calendar' && (
              <CourseCalendar
                events={events}
                onAutoOptimize={handleConflictOptimize}
                onNavigateToPrintSheet={() => setNavTab('sheet')}
              />
            )}

            {navTab === 'library' && (
              <TaskLibrary
                templates={templates}
                presetTasks={presetTasks}
                onApplyTemplate={handleApplyTemplate}
                onSetDefaultTemplate={handleSetDefaultTemplate}
                onAddTaskToActive={handleAddTaskToActive}
                onTogglePresetFavorite={handleTogglePresetFavorite}
                onAddCustomPreset={handleAddCustomPreset}
              />
            )}

            {navTab === 'profile' && (
              <MyProfile
                onLoadHistoricSheet={handleLoadHistoricSheet}
                streakCount={15}
                weeklyRate={98}
              />
            )}

          </div>
        )}

      </main>

      {/* Floating alert if sheet was modified but not signed (no-print utility) */}
      {!activeSheet.parentSignature && activeSheet.tasks.filter(t => t.completed).length === activeSheet.tasks.length && activeSheet.tasks.length > 0 && navTab === 'home' && (
        <div className="fixed bottom-20 left-4 right-4 z-40 bg-amber-50 border border-amber-300 p-3 rounded-xl flex items-center justify-between shadow-lg text-xs leading-snug no-print animate-fade-in font-sans">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
            <span className="text-[#3d494a] font-medium">小名已全套完成今日计划作业！去“作业单”给孩子打个高评分、补签个名字吧。</span>
          </div>
          <button 
            onClick={() => setNavTab('sheet')}
            className="text-amber-800 font-extrabold underline shrink-0 pl-1"
          >
            去签字
          </button>
        </div>
      )}

      {/* Sticky footer Bottom Tab navigation bar (no-print utility) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-2.5 bg-white border-t border-[#bdc9ca]/20 shadow-[0px_-4px_12px_rgba(0,0,0,0.03)] no-print select-none">
        
        <button
          onClick={() => { setNavTab('home'); setEditorOpen(false); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            navTab === 'home' 
              ? 'bg-[#00818a]/12 text-[#00666d] scale-95 px-5 font-bold' 
              : 'text-[#3d494a]/85 hover:bg-[#efeded]/30 px-3'
          }`}
        >
          <Home className={`w-5 h-5 ${navTab === 'home' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] mt-1 font-bold">首页</span>
        </button>

        <button
          onClick={() => { setNavTab('sheet'); setEditorOpen(false); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            navTab === 'sheet' 
              ? 'bg-[#00818a]/12 text-[#00666d] scale-95 px-5 font-bold' 
              : 'text-[#3d494a]/85 hover:bg-[#efeded]/30 px-3'
          }`}
        >
          <FileCheck className={`w-5 h-5 ${navTab === 'sheet' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] mt-1 font-bold">作业单</span>
        </button>

        <button
          onClick={() => { setNavTab('calendar'); setEditorOpen(false); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            navTab === 'calendar' 
              ? 'bg-[#00818a]/12 text-[#00666d] scale-95 px-5 font-bold' 
              : 'text-[#3d494a]/85 hover:bg-[#efeded]/30 px-3'
          }`}
        >
          <Calendar className={`w-5 h-5 ${navTab === 'calendar' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] mt-1 font-bold">日历</span>
        </button>

        <button
          onClick={() => { setNavTab('library'); setEditorOpen(false); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            navTab === 'library' 
              ? 'bg-[#00818a]/12 text-[#00666d] scale-95 px-5 font-bold' 
              : 'text-[#3d494a]/85 hover:bg-[#efeded]/30 px-3'
          }`}
        >
          <FolderHeart className={`w-5 h-5 ${navTab === 'library' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] mt-1 font-bold">任务库</span>
        </button>

        <button
          onClick={() => { setNavTab('profile'); setEditorOpen(false); }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            navTab === 'profile' 
              ? 'bg-[#00818a]/12 text-[#00666d] scale-95 px-5 font-bold' 
              : 'text-[#3d494a]/85 hover:bg-[#efeded]/30 px-3'
          }`}
        >
          <User className={`w-5 h-5 ${navTab === 'profile' ? 'stroke-[2.5px]' : ''}`} />
          <span className="text-[10px] mt-1 font-bold">我的</span>
        </button>

      </nav>

    </div>
  );
}
