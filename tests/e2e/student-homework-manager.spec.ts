import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('首次进入显示智能生成设置和默认规则', async ({ page }) => {
  await expect(page.getByRole('heading', { name: '智能生成设置' })).toBeVisible();
  await expect(page.getByText('识别为：普通工作日')).toBeVisible();
  await expect(page.getByRole('button', { name: '标准' })).toBeVisible();
  await expect(page.getByRole('button', { name: '智能一键生成计划' })).toBeEnabled();
});

test('智能生成计划后进入今日作业看板', async ({ page }) => {
  await page.getByRole('button', { name: '加强' }).click();
  await page.getByRole('combobox').selectOption('20:30');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('今日最优家庭作业单已智能计算完毕');
    await dialog.accept();
  });
  await page.getByRole('button', { name: '智能一键生成计划' }).click();

  await expect(page.getByRole('heading', { name: '你好，小名' })).toBeVisible();
  await expect(page.getByText('学校作业｜优先完成')).toBeVisible();
  await expect(page.getByText('自主练习清单')).toBeVisible();
});

test('底部导航可以打开全部主要模块', async ({ page }) => {
  await page.getByRole('button', { name: '作业单' }).click();
  await expect(page.getByRole('heading', { name: '今日家庭作业单' })).toBeVisible();

  await page.getByRole('button', { name: '日历' }).click();
  await expect(page.getByRole('heading', { name: '学校课程与日历计划' })).toBeVisible();

  await page.getByRole('button', { name: '任务库' }).click();
  await expect(page.getByRole('heading', { name: '任务与计划模板库' })).toBeVisible();

  await page.getByRole('button', { name: '我的' }).click();
  await expect(page.getByText('学习习惯分析')).toBeVisible();
  await expect(page.getByText('历史档案纪录')).toBeVisible();
});

test('作业单内容修改后刷新仍保存在本地', async ({ page }) => {
  await page.getByRole('button', { name: '作业单' }).click();
  const goal = page.getByPlaceholder('在此输入今日激励目标或提醒词...');
  const signature = page.getByPlaceholder('写下名字(例如: 小名妈妈)');

  await goal.fill('今晚先完成学校作业');
  await signature.fill('测试家长');
  await page.reload();
  await page.getByRole('button', { name: '作业单' }).click();

  await expect(goal).toHaveValue('今晚先完成学校作业');
  await expect(signature).toHaveValue('测试家长');
});

test('任务库支持搜索并新增自定义常用任务', async ({ page }) => {
  await page.getByRole('button', { name: '任务库' }).click();
  await page.getByRole('button', { name: /单项常用库/ }).click();

  const search = page.getByPlaceholder('搜索任务名称、标签、或描述常识...');
  await search.fill('口算');
  await expect(page.getByText(/口算/).first()).toBeVisible();
  await search.clear();

  await page.getByRole('button', { name: '新建自定义常用学练项目' }).click();
  await page.getByPlaceholder('例: RAZ 分级口头跟读二十分钟').fill('自动化测试阅读');
  await page.getByPlaceholder('例: 指导朗读重点音，复述出主要情节。').fill('由 Playwright 创建');

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('已成功将新项目添加');
    await dialog.accept();
  });
  await page.getByRole('button', { name: '保存入库' }).click();

  await expect(page.getByText('自动化测试阅读')).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: '任务库' }).click();
  await page.getByRole('button', { name: /单项常用库/ }).click();
  await expect(page.getByText('自动化测试阅读')).toBeVisible();
});

test('日历冲突可智能调优并进入 A4 作业单', async ({ page }) => {
  await page.getByRole('button', { name: '日历' }).click();
  await expect(page.getByText('检测到周一晚日程时间冲突')).toBeVisible();

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('智能排程调度算法');
    await dialog.accept();
  });
  await page.getByRole('button', { name: '智能一键调优' }).click();
  await expect(page.getByText('日程排程优化成功！')).toBeVisible();

  await page.getByRole('button', { name: '生成当日家庭作业单 (A4打印)' }).click();
  await expect(page.getByRole('heading', { name: '今日家庭作业单' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Excel' })).toBeVisible();
  await expect(page.getByRole('button', { name: '打印' })).toBeVisible();
});
