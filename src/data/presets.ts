/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresetTask, TaskTemplate, CourseEvent } from '../types';

export const DEFAULT_PRESET_TASKS: PresetTask[] = [
  {
    id: 'p1',
    title: '337晨读',
    duration: 15,
    difficulty: 'Easy',
    category: 'chinese',
    tag: 'Standard',
    description: '“一年之计在于春，一日之计在于晨。”',
    isFavorite: true,
  },
  {
    id: 'p2',
    title: '快乐读书吧',
    duration: 30,
    difficulty: 'Normal',
    category: 'chinese',
    tag: 'Weekend',
    description: '培养课外阅读习惯，积累词汇好句。',
    isFavorite: false,
  },
  {
    id: 'p3',
    title: '字帖练习',
    duration: 10,
    difficulty: 'Easy',
    category: 'chinese',
    tag: 'Daily',
    description: '每日一页，锻炼专注力与书写规范。',
    isFavorite: true,
  },
  {
    id: 'p4',
    title: '10个单词背诵',
    duration: 15,
    difficulty: 'Normal',
    category: 'english',
    tag: 'Workday',
    description: '智能复习昨日单词，并识记新词。',
    isFavorite: true,
  },
  {
    id: 'p5',
    title: 'Power Up 听力',
    duration: 20,
    difficulty: 'Normal',
    category: 'english',
    tag: 'Summer',
    description: 'Level 3 - Unit 4 Listening Practice',
    isFavorite: false,
  },
  {
    id: 'p6',
    title: 'RAZ 分级阅读 L10',
    duration: 25,
    difficulty: 'Normal',
    category: 'english',
    tag: 'Standard',
    description: '备注: 注意发音连读与轻重音。',
    isFavorite: true,
  },
  {
    id: 'p7',
    title: '逻辑推理奥数天天练',
    duration: 30,
    difficulty: 'Hard',
    category: 'math',
    tag: 'Weekend',
    description: '锻炼逻辑思维，攻克1-2道奥数拓展题。',
    isFavorite: false,
  },
  {
    id: 'p8',
    title: '口算练习天天练',
    duration: 10,
    difficulty: 'Easy',
    category: 'math',
    tag: 'Daily',
    description: '完成1页口算练习，限时高准确率。',
    isFavorite: true,
  },
  {
    id: 'p9',
    title: 'Python 少儿趣味编程',
    duration: 45,
    difficulty: 'Normal',
    category: 'courses',
    tag: 'Weekend',
    description: '学习基础逻辑，完成一个小程序实例。',
    isFavorite: false,
  },
  {
    id: 'p10',
    title: '硬笔书法兴趣班复习',
    duration: 30,
    difficulty: 'Normal',
    category: 'courses',
    tag: 'Daily',
    description: '规范偏旁部首，练习结构章法。',
    isFavorite: false,
  }
];

export const DEFAULT_TEMPLATES: TaskTemplate[] = [
  {
    id: 't1',
    name: '普通工作日',
    iconType: 'calendar_today',
    isDefault: true,
    itemsCount: { chinese: 3, math: 1, english: 2 },
    tasksToGenerate: [
      { title: '语文练习册 P20', duration: 15, priority: 'high', category: 'chinese', type: 'school', remarks: '重点关注古诗字词' },
      { title: '数学口算 1页', duration: 10, priority: 'high', category: 'math', type: 'school', remarks: '重点练习加减乘除' },
      { title: '337晨读', duration: 15, priority: 'normal', category: 'chinese', type: 'extra', remarks: '大声朗读，练习连贯性' },
      { title: '字帖练习', duration: 10, priority: 'normal', category: 'chinese', type: 'extra', remarks: '工整书写' },
      { title: '计算小达人', duration: 15, priority: 'normal', category: 'math', type: 'extra', remarks: '注重纠错率' },
      { title: 'RAZ E', duration: 20, priority: 'normal', category: 'english', type: 'extra', remarks: '录制语音' },
      { title: '单词背诵', duration: 15, priority: 'normal', category: 'english', type: 'extra', remarks: '背诵10个重点词汇' }
    ]
  },
  {
    id: 't2',
    name: '周五(含围棋)',
    iconType: 'sports_esports',
    isDefault: false,
    itemsCount: { chinese: 2, math: 1, courses: 1, other: 1 },
    tasksToGenerate: [
      { title: '学校周末语文作业 (部分)', duration: 25, priority: 'high', category: 'chinese', type: 'school', remarks: '优先梳理错题' },
      { title: '数学练习题两页', duration: 20, priority: 'high', category: 'math', type: 'school', remarks: '计算几何题配合尺规' },
      { title: '围棋打谱与死活题', duration: 45, priority: 'normal', category: 'courses', type: 'extra', remarks: '复习老师讲到的布局' },
      { title: '课外阅读 30分钟', duration: 30, priority: 'normal', category: 'other', type: 'extra', remarks: '整理好词好句' },
      { title: '字帖临摹一页', duration: 10, priority: 'normal', category: 'chinese', type: 'extra', remarks: '注意握笔姿势' }
    ]
  },
  {
    id: 't3',
    name: '周六(含编程)',
    iconType: 'code',
    isDefault: false,
    itemsCount: { chinese: 1, math: 1, english: 1, courses: 1, other: 2 },
    tasksToGenerate: [
      { title: '奥数逻辑推理专项练习', duration: 30, priority: 'high', category: 'math', type: 'extra', remarks: '3道大题' },
      { title: 'Python 创意编程实例', duration: 60, priority: 'normal', category: 'courses', type: 'extra', remarks: '提交作品到作业平台' },
      { title: '英语绘本跟读录音', duration: 20, priority: 'normal', category: 'english', type: 'extra', remarks: '精进连读语音' },
      { title: '周末古文赏析', duration: 15, priority: 'normal', category: 'chinese', type: 'extra', remarks: '理解常用意思' },
      { title: '户外运动一小时', duration: 60, priority: 'normal', category: 'other', type: 'extra', remarks: '打羽毛球或户外慢跑' }
    ]
  },
  {
    id: 't4',
    name: '暑假英语加强',
    iconType: 'language',
    isDefault: false,
    itemsCount: { english: 3, other: 1 },
    tasksToGenerate: [
      { title: 'RAZ 分级阅读 L10', duration: 25, priority: 'high', category: 'english', type: 'extra', remarks: '注意发音连读' },
      { title: '10个单词背诵与默写', duration: 15, priority: 'high', category: 'english', type: 'extra', remarks: '循环复习' },
      { title: 'Power Up 听力特训', duration: 20, priority: 'normal', category: 'english', type: 'extra', remarks: '完成听后连线题' },
      { title: '暑假游记一篇 (150字)', duration: 40, priority: 'normal', category: 'other', type: 'extra', remarks: '记述一次家庭出游' }
    ]
  },
  {
    id: 't5',
    name: '考前轻量',
    iconType: 'psychology',
    isDefault: false,
    itemsCount: { chinese: 1, math: 1, other: 1 },
    tasksToGenerate: [
      { title: '数学期末错题回顾', duration: 20, priority: 'high', category: 'math', type: 'extra', remarks: '梳理公式和细节' },
      { title: '语文古诗词必背背诵', duration: 15, priority: 'high', category: 'chinese', type: 'extra', remarks: '默写难写字' },
      { title: '睡前深呼吸与心理调节', duration: 10, priority: 'normal', category: 'other', type: 'extra', remarks: '保持充足睡眠，放平心态' }
    ]
  }
];

export const DEFAULT_COURSE_EVENTS: CourseEvent[] = [
  // June 21st (No conflict, high classes)
  {
    id: 'c1',
    title: '核桃编程赛考复习课',
    timeStart: '09:00',
    timeEnd: '10:00',
    duration: 60,
    type: 'online',
    date: '2026-06-21'
  },
  {
    id: 'c2',
    title: '数学周测模拟考试',
    timeStart: '11:30',
    timeEnd: '12:30',
    duration: 60,
    type: 'exam',
    date: '2026-06-21'
  },
  {
    id: 'c3',
    title: '暑期游泳特训',
    timeStart: '15:00',
    timeEnd: '17:00',
    duration: 120,
    type: 'offline',
    date: '2026-06-21'
  },
  // June 22nd (Has conflict!)
  {
    id: 'c4',
    title: '钢琴周课',
    timeStart: '16:30',
    timeEnd: '18:00',
    duration: 90,
    type: 'offline',
    date: '2026-06-22'
  },
  {
    id: 'c5',
    title: '数学补习精品班',
    timeStart: '17:00',
    timeEnd: '18:30',
    duration: 90,
    type: 'offline',
    date: '2026-06-22'
  }
];

export const MOTIVATIONAL_QUOTES = [
  {
    text: "“卓越不是一种行为，而是一种习惯。”",
    author: "亚里士多德"
  },
  {
    text: "“不积跬步，无以至千里；不积小流，无以成江海。”",
    author: "荀子"
  },
  {
    text: "“好习惯如同轨道，能带我们的未来驶向理想的远方。”",
    author: "塞缪尔·斯迈尔斯"
  },
  {
    text: "“少壮不努力，老大徒伤悲。”",
    author: "汉乐府"
  }
];
