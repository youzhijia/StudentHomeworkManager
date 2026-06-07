/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Plus, 
  Edit3, 
  FolderOpen, 
  CalendarDays, 
  Flame, 
  Languages, 
  Gamepad, 
  Wand2, 
  Trophy, 
  Brain,
  CheckCircle2,
  BookmarkCheck,
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import { PresetTask, TaskTemplate, CategoryType } from '../types';

interface TaskLibraryProps {
  templates: TaskTemplate[];
  presetTasks: PresetTask[];
  onApplyTemplate: (templateId: string) => void;
  onSetDefaultTemplate: (templateId: string) => void;
  onAddTaskToActive: (title: string, duration: number, category: CategoryType, remarks?: string) => void;
  onTogglePresetFavorite: (id: string) => void;
  onAddCustomPreset: (task: Omit<PresetTask, 'id'>) => void;
}

export default function TaskLibrary({
  templates,
  presetTasks,
  onApplyTemplate,
  onSetDefaultTemplate,
  onAddTaskToActive,
  onTogglePresetFavorite,
  onAddCustomPreset
}: TaskLibraryProps) {
  // Navigation section
  const [activeTab, setActiveTab] = useState<'presets' | 'templates'>('templates');

  // Search & Category states for Presets
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  // New customized Preset creator modal simulator
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [presetTitle, setPresetTitle] = useState('');
  const [presetDuration, setPresetDuration] = useState(20);
  const [presetCategory, setPresetCategory] = useState<CategoryType>('chinese');
  const [presetTag, setPresetTag] = useState<'Daily' | 'Weekend' | 'Summer' | 'Workday'>('Daily');
  const [presetDesc, setPresetDesc] = useState('');
  const [presetDifficulty, setPresetDifficulty] = useState<'Easy' | 'Normal' | 'Hard'>('Normal');

  // Handle template icon mapping
  const renderTemplateIcon = (iconType: string) => {
    switch (iconType) {
      case 'sports_esports':
        return <Gamepad className="w-5 h-5 text-[#b22200]" />;
      case 'code':
        return <Wand2 className="w-5 h-5 text-[#00666d]" />;
      case 'language':
        return <Languages className="w-5 h-5 text-[#00818a]" />;
      case 'psychology':
        return <Brain className="w-5 h-5 text-[#5c5c59]" />;
      default:
        return <CalendarDays className="w-5 h-5 text-[#00666d]" />;
    }
  };

  // Preset addition triggered
  const handleAddNewPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetTitle.trim()) return;

    onAddCustomPreset({
      title: presetTitle.trim(),
      duration: presetDuration,
      difficulty: presetDifficulty,
      category: presetCategory,
      tag: presetTag,
      description: presetDesc.trim() || undefined,
      isFavorite: false
    });

    // Reset Form
    setPresetTitle('');
    setPresetDesc('');
    setPresetDuration(20);
    setShowCreateModal(false);
    alert('已成功将新项目添加至自定义常用库中！');
  };

  // Direct active insert notification
  const handleDirectActiveInsert = (preset: PresetTask) => {
    onAddTaskToActive(preset.title, preset.duration, preset.category, preset.description);
    alert(`已将常用任务「${preset.title}」（${preset.duration}分钟）添加至今日作业清单！`);
  };

  // Filter Presets list
  const filteredPresets = presetTasks.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#1b1c1c] tracking-tight">任务与计划模板库</h1>
        <p className="text-sm text-[#3d494a]">
          快速应用每周惯例预设计划包，或挑选精选任务，轻松定制今日学习路径。
        </p>
      </div>

      {/* Pane Selector Tab Buttons */}
      <div className="flex bg-[#efeded]/70 rounded-2xl p-1 shadow-xs max-w-md">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'templates'
              ? 'bg-white text-[#00666d] shadow-sm font-bold'
              : 'text-[#3d494a] hover:bg-white/30'
          }`}
        >
          计划模板包 ({templates.length})
        </button>
        <button
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'presets'
              ? 'bg-white text-[#00666d] shadow-sm font-bold'
              : 'text-[#3d494a] hover:bg-white/30'
          }`}
        >
          单项常用库 ({presetTasks.length})
        </button>
      </div>

      {/* RENDER VIEW: TEMPLATES PANE */}
      {activeTab === 'templates' && (
        <section className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map(tpl => {
              const defaultText = tpl.isDefault ? '当前默认' : '';
              return (
                <div 
                  key={tpl.id}
                  className={`bg-white rounded-2xl p-5 border shadow-sm relative flex flex-col justify-between transition-all ${
                    tpl.isDefault ? 'border-[#00666d] ring-1 ring-[#00666d]/15' : 'border-[#bdc9ca]/20'
                  }`}
                >
                  {/* Default Tag badge on top corner */}
                  {tpl.isDefault && (
                    <div className="absolute top-0 right-0 p-3 pt-2">
                      <span className="bg-[#00666d] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                        {defaultText}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 flex-grow pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#efeded]/60 flex items-center justify-center shrink-0">
                        {renderTemplateIcon(tpl.iconType)}
                      </div>
                      <h3 className="font-bold text-[#1b1c1c] text-base">{tpl.name}</h3>
                    </div>

                    {/* Category counts breakdowns summary list */}
                    <div className="space-y-2 border-t border-b border-[#bdc9ca]/10 py-3 font-sans">
                      {tpl.itemsCount.chinese && (
                        <div className="flex items-center justify-between text-xs text-[#3d494a]">
                          <span>语文任务项数</span>
                          <span className="bg-[#f5f3f3] text-[#00666d] font-bold px-2 py-0.5 rounded-md">
                            {tpl.itemsCount.chinese} 项
                          </span>
                        </div>
                      )}
                      {tpl.itemsCount.math && (
                        <div className="flex items-center justify-between text-xs text-[#3d494a]">
                          <span>数学任务项数</span>
                          <span className="bg-[#f5f3f3] text-[#00666d] font-bold px-2 py-0.5 rounded-md">
                            {tpl.itemsCount.math} 项
                          </span>
                        </div>
                      )}
                      {tpl.itemsCount.english && (
                        <div className="flex items-center justify-between text-xs text-[#3d494a]">
                          <span>英语任务项数</span>
                          <span className="bg-[#f5f3f3] text-[#00666d] font-bold px-2 py-0.5 rounded-md">
                            {tpl.itemsCount.english} 项
                          </span>
                        </div>
                      )}
                      {tpl.itemsCount.courses && (
                        <div className="flex items-center justify-between text-xs text-[#3d494a]">
                          <span>素质/兴趣项数</span>
                          <span className="bg-[#f5f3f3] text-[#00666d] font-bold px-2 py-0.5 rounded-md">
                            {tpl.itemsCount.courses} 项
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Template Buttons Trigger */}
                  <div className="space-y-2 pt-2">
                    {!tpl.isDefault && (
                      <button
                        onClick={() => {
                          onSetDefaultTemplate(tpl.id);
                          alert(`已成功将「${tpl.name}」设为系统的每日首选默认模版！`);
                        }}
                        className="w-full py-1.5 rounded-xl bg-[#f5f3f3] text-[#00666d] hover:bg-[#efeded] text-xs font-bold transition-all text-center"
                      >
                        设为每日首选默认
                      </button>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onApplyTemplate(tpl.id);
                          alert(`已成功重置今日清单并导入「${tpl.name}」预设项！`);
                        }}
                        className="py-2 rounded-xl bg-[#00666d] text-white hover:bg-[#004f54] text-xs font-semibold shadow-xs flex items-center justify-center gap-1"
                      >
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        应用到今日
                      </button>
                      <button
                        onClick={() => alert('请在“作业单”模块内对当前方案进行高度精细的参数编辑修改。')}
                        className="py-2 rounded-xl border border-[#bdc9ca] text-[#3d494a] hover:bg-[#f5f3f3] text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        微调内容
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* RENDER VIEW: PRESETS PANEL */}
      {activeTab === 'presets' && (
        <section className="space-y-4 animate-fade-in">
          {/* Search Bar filter */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#bdc9ca]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索任务名称、标签、或描述常识..."
              className="w-full h-12 pl-12 pr-4 bg-white border border-[#bdc9ca]/40 rounded-2xl focus:ring-2 focus:ring-[#00666d]/20 focus:border-transparent outline-none text-sm transition-all shadow-xs shrink-0"
            />
          </div>

          {/* Sub-categorizations filters tabs */}
          <nav className="flex overflow-x-auto gap-2 py-1 scrollbar-thin select-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#00666d] text-white shadow-xs'
                  : 'bg-[#efeded] text-[#3d494a] hover:bg-[#e4e2e2]'
              }`}
            >
              全部项目
            </button>
            <button
              onClick={() => setSelectedCategory('chinese')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'chinese'
                  ? 'bg-[#b22200] text-white shadow-xs'
                  : 'bg-[#efeded] text-[#3d494a] hover:bg-[#e4e2e2]'
              }`}
            >
              语文
            </button>
            <button
              onClick={() => setSelectedCategory('math')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'math'
                  ? 'bg-[#00666d] text-white shadow-xs'
                  : 'bg-[#efeded] text-[#3d494a] hover:bg-[#e4e2e2]'
              }`}
            >
              数学
            </button>
            <button
              onClick={() => setSelectedCategory('english')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'english'
                  ? 'bg-[#5c5c59] text-white shadow-xs'
                  : 'bg-[#efeded] text-[#3d494a] hover:bg-[#e4e2e2]'
              }`}
            >
              英语
            </button>
            <button
              onClick={() => setSelectedCategory('courses')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === 'courses'
                  ? 'bg-[#00818a] text-white shadow-xs'
                  : 'bg-[#efeded] text-[#3d494a] hover:bg-[#e4e2e2]'
              }`}
            >
              兴趣/探究
            </button>
          </nav>

          {/* Active Preset single cards Details list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredPresets.map(preset => {
              // Get category configurations
              let borderT = 'border-l-[#5c5c59]';
              let badgeBg = 'bg-[#efeded] text-[#3d494a]';
              let badgeLabel = '自学';

              if (preset.category === 'chinese') {
                borderT = 'border-l-[#b22200]';
                badgeBg = 'bg-[#b22200]/10 text-[#b22200]';
                badgeLabel = '语文';
              } else if (preset.category === 'math') {
                borderT = 'border-l-[#00666d]';
                badgeBg = 'bg-[#00666d]/10 text-[#00666d]';
                badgeLabel = '数学';
              } else if (preset.category === 'english') {
                borderT = 'border-l-[#5c5c59]';
                badgeBg = 'bg-[#5c5c59]/10 text-[#5c5c59]';
                badgeLabel = '英语';
              } else if (preset.category === 'courses') {
                borderT = 'border-l-[#00818a]';
                badgeBg = 'bg-[#00818a]/10 text-[#00818a]';
                badgeLabel = '兴趣';
              }

              return (
                <div 
                  key={preset.id}
                  className={`bg-white rounded-2xl p-4.5 border border-[#bdc9ca]/20 border-l-4 ${borderT} flex flex-col justify-between shadow-xs hover:shadow-sm transition-all relative group`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`${badgeBg} text-[10px] font-bold px-1.5 py-0.5 rounded`}>
                            {badgeLabel}
                          </span>
                          <span className="bg-[#efeded] text-[#5c5c59] text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full">
                            {preset.tag}
                          </span>
                          <h4 className="font-bold text-[#1b1c1c] text-sm truncate">{preset.title}</h4>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => onTogglePresetFavorite(preset.id)}
                          className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#efeded]/50 transition-colors ${
                            preset.isFavorite ? 'text-[#00666d]' : 'text-[#bdc9ca]'
                          }`}
                        >
                          <Star className={`w-4.5 h-4.5 ${preset.isFavorite ? 'fill-[#00666d]' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs font-sans text-[#3d494a] flex-wrap font-medium">
                      <span className="bg-[#efeded] px-2 py-0.5 rounded text-[11px]">⏱️ {preset.duration} min</span>
                      <span className="bg-[#efeded] px-2 py-0.5 rounded text-[11px]">🔥 难度: {preset.difficulty}</span>
                    </div>

                    {preset.description && (
                      <p className="text-xs text-[#3d494a] italic bg-[#f5f3f3]/50 p-2 rounded-xl">
                        “{preset.description}”
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end pt-3 mt-2 border-t border-[#bdc9ca]/5">
                    <button
                      onClick={() => handleDirectActiveInsert(preset)}
                      className="bg-[#00666d]/10 hover:bg-[#00666d] text-[#00666d] hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>添加到今日</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Big Custom Preset Drawer Modal Open button */}
          <div className="pt-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-[#efeded] hover:bg-[#00818a]/10 hover:text-[#006d70] border border-dashed border-[#bdc9ca] text-neutral-800 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span>新建自定义常用学练项目</span>
            </button>
          </div>
        </section>
      )}

      {/* CREATE PRESET MODAL DIALOG */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 z-[999] backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 border shadow-2xl max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-center pb-2 border-b">
              <h2 className="font-bold text-[#00666d] text-base flex items-center gap-1.5">
                <GraduationCap className="w-5 h-5" />
                新增自定义常用任务
              </h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-[#bdc9ca] hover:text-[#1b1c1c] font-bold text-lg px-2"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddNewPreset} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3d494a]">常用项名称 *</label>
                <input
                  type="text"
                  required
                  value={presetTitle}
                  onChange={(e) => setPresetTitle(e.target.value)}
                  placeholder="例: RAZ 分级口头跟读二十分钟"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3d494a]">科目分类</label>
                  <select
                    value={presetCategory}
                    onChange={(e) => setPresetCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10"
                  >
                    <option value="chinese">语文</option>
                    <option value="math">数学</option>
                    <option value="english">英语</option>
                    <option value="courses">兴趣班 / 素质</option>
                    <option value="other">其他 / 自主项目</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3d494a]">耗时估算</label>
                  <select
                    value={presetDuration}
                    onChange={(e) => setPresetDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10"
                  >
                    <option value="10">10 分钟</option>
                    <option value="15">15 分钟</option>
                    <option value="20">20 分钟</option>
                    <option value="25">25 分钟</option>
                    <option value="30">30 分钟</option>
                    <option value="45">45 分钟</option>
                    <option value="60">60 分钟</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3d494a]">时机分类</label>
                  <select
                    value={presetTag}
                    onChange={(e) => setPresetTag(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10"
                  >
                    <option value="Daily">Daily 每日</option>
                    <option value="Weekend">Weekend 周末</option>
                    <option value="Workday">Workday 工作日</option>
                    <option value="Summer">Summer 暑假</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3d494a]">练习难度</label>
                  <select
                    value={presetDifficulty}
                    onChange={(e) => setPresetDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10"
                  >
                    <option value="Easy">轻松 (Easy)</option>
                    <option value="Normal">标准 (Normal)</option>
                    <option value="Hard">探究 (Hard)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3d494a]">任务描述 / 一言提示</label>
                <textarea
                  value={presetDesc}
                  onChange={(e) => setPresetDesc(e.target.value)}
                  placeholder="例: 指导朗读重点音，复述出主要情节。"
                  rows={2}
                  className="w-full px-3.5 py-2 text-sm bg-[#f5f3f3] border border-[#bdc9ca]/40 rounded-xl focus:ring-2 focus:ring-[#00666d]/10 outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-[#efeded] text-[#1b1c1c] font-bold py-2.5 rounded-xl border border-[#bdc9ca]/30 text-xs active:scale-95 transition-transform"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#00666d] text-white font-bold py-2.5 rounded-xl border text-xs active:scale-95 transition-transform"
                >
                  保存入库
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
