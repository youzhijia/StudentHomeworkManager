/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 'chinese' | 'math' | 'english' | 'courses' | 'other';
export type PriorityType = 'high' | 'normal' | 'low';
export type TaskType = 'school' | 'extra';

export interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
  priority: PriorityType;
  category: CategoryType;
  type: TaskType;
  completed: boolean;
  remarks?: string;
}

export interface HomeworkSheet {
  date: string; // '2026-06-10'
  studentName: string;
  grade: string;
  targetGoal: string;
  tasks: Task[];
  rating: number; // 1-5 selection values
  comment: string;
  parentSignature: string;
}

export interface PresetTask {
  id: string;
  title: string;
  duration: number;
  difficulty: 'Easy' | 'Normal' | 'Hard';
  category: CategoryType;
  tag: 'Daily' | 'Weekend' | 'Summer' | 'Workday' | 'Standard';
  description?: string;
  isFavorite?: boolean;
}

export interface TaskTemplate {
  id: string;
  name: string;
  iconType: 'calendar_today' | 'sports_esports' | 'code' | 'language' | 'psychology';
  isDefault: boolean;
  itemsCount: {
    chinese?: number;
    math?: number;
    english?: number;
    courses?: number;
    other?: number;
  };
  tasksToGenerate: Omit<Task, 'id' | 'completed'>[];
}

export interface CourseEvent {
  id: string;
  title: string;
  timeStart: string; // e.g. '09:00'
  timeEnd: string;   // e.g. '10:00'
  duration: number;  // in minutes
  type: 'online' | 'offline' | 'exam';
  date: string;      // '2026-06-21'
}
