const tabs = document.querySelectorAll('.nav-tab');
const views = document.querySelectorAll('.panel-view');
const goalChips = document.querySelectorAll('.goal-chip');
const barChart = document.querySelector('#barChart');
const driverList = document.querySelector('#driverList');
const tipsGrid = document.querySelector('#tipsGrid');
const routineTags = document.querySelector('#routineTags');
const progressSteps = document.querySelector('#progressSteps');

const contentByGoal = {
  balanced: {
    focusMetric: '18 kWh + 420L',
    focusNote: 'Your home is slightly above a normal weekday, but still easy to improve.',
    statusText: 'Slightly above average',
    statusNote: 'No urgent issue — one simple change tonight should help.',
    actionText: 'Set AC to 24°C and keep showers 1 minute shorter',
    actionNote: 'Expected monthly saving: $18 and around 500L of water.',
    weekText: 'On track 4/7 days',
    weekNote: 'Consistency matters more than perfect results.',
    goalSummary: 'Keep bills steady while gently improving both electricity and water habits.',
    billEstimate: '$118 / month',
    confidenceText: 'Low effort, high impact',
    insightsTitle: 'Weekly household usage',
    insightsSummary: 'Friday rose because cooling and hot water were both used a little longer.',
    driversTitle: 'Top contributors this week',
    explainText: 'Your household is doing fine overall. Two habits are creating most of the increase, so you do not need to change everything at once.',
    plainTip: 'Start with cooling and shower length first. That will likely create the biggest result with the least friction.',
    chart: [42, 60, 48, 56, 82, 63, 58],
    drivers: [
      { label: 'Air conditioner', value: '34%' },
      { label: 'Hot water use', value: '26%' },
      { label: 'Laundry & kitchen', value: '15%' }
    ],
    tips: [
      { icon: '🌡️', title: 'Lift cooling by 1°C', body: 'A tiny thermostat change can reduce electricity use without changing comfort too much.', time: '10 sec', impact: 'High impact' },
      { icon: '🚿', title: 'Shorten one shower', body: 'Cutting just one minute saves both water and hot-water energy.', time: '1 min', impact: 'Dual saving' },
      { icon: '🔌', title: 'Switch off standby devices', body: 'Turn off devices you will not use overnight to remove quiet background usage.', time: '30 sec', impact: 'Easy win' }
    ],
    routineText: 'Tonight, choose one shutdown habit after dinner and one shorter-water habit after showers.',
    routineTags: ['after dinner reset', 'short shower cue', 'keep it realistic'],
    challengeIcon: '🌿',
    challengeTitle: 'Pick one saving habit and repeat it on 3 days',
    challengeCopy: 'You only need to repeat one small habit several times this week to build momentum.',
    progressText: '3 out of 5 days',
    progressRatio: 0.6,
    progressDone: 3,
    savingsText: '$10 and 120L saved',
    difficultyText: 'Easy to fit into a busy week',
    backupChallenge: 'Run one cold-water wash this week',
    motivationText: 'Small habits beat big plans you cannot maintain.'
  },
  electricity: {
    focusMetric: '18 kWh today',
    focusNote: 'Cooling is the main reason today feels a bit high.',
    statusText: 'Cooling-heavy day',
    statusNote: 'You are still close to your norm — only cooling needs attention.',
    actionText: 'Set AC to 24°C tonight',
    actionNote: 'Expected monthly saving: about $12.',
    weekText: '4 efficient days this week',
    weekNote: 'You are already doing well on lighting and kitchen use.',
    goalSummary: 'Reduce electricity costs without asking the household to change everything.',
    billEstimate: '$96 / month',
    confidenceText: 'Best opportunity: cooling',
    insightsTitle: 'Weekly electricity usage',
    insightsSummary: 'Friday spiked because the AC ran longer than usual in the afternoon.',
    driversTitle: 'Top electricity users',
    explainText: 'Most of the increase is coming from one source: cooling. That means a single thermostat adjustment may do more than several tiny changes elsewhere.',
    plainTip: 'Focus on AC settings first, then standby devices if you want one extra improvement.',
    chart: [34, 68, 46, 61, 86, 67, 78],
    drivers: [
      { label: 'Air conditioner', value: '42%' },
      { label: 'Water heater', value: '28%' },
      { label: 'Refrigerator', value: '12%' }
    ],
    tips: [
      { icon: '❄️', title: 'Raise AC by 1°C', body: 'A small change often reduces energy without a noticeable comfort drop.', time: '10 sec', impact: 'High impact' },
      { icon: '🔌', title: 'Turn off standby at night', body: 'Consoles, chargers and TVs quietly add up when left on overnight.', time: '30 sec', impact: 'Low effort' },
      { icon: '🧺', title: 'Run one cold-water wash', body: 'Using cold water reduces the energy needed for one full laundry cycle.', time: '1 tap', impact: 'Weekly saving' }
    ],
    routineText: 'Tonight, start with one thermostat tweak and one standby switch-off routine.',
    routineTags: ['24°C target', 'night switch-off', 'repeat for 3 days'],
    challengeIcon: '❄️',
    challengeTitle: 'Keep the AC at 24°C for 5 evenings',
    challengeCopy: 'This keeps the task very specific and easier for the whole household to remember.',
    progressText: '3 out of 5 evenings',
    progressRatio: 0.6,
    progressDone: 3,
    savingsText: '$12 estimated this month',
    difficultyText: 'Easy once the setting is agreed',
    backupChallenge: 'Switch off one entertainment zone before bed',
    motivationText: 'You only need one reliable cooling habit to see a result.'
  },
  water: {
    focusMetric: '420L today',
    focusNote: 'Hot showers and longer tap use are lifting your water total.',
    statusText: 'Water use trending up',
    statusNote: 'Still manageable — a lighter shower routine should bring it back down.',
    actionText: 'Reduce shower time by 1 minute',
    actionNote: 'Expected weekly saving: around 120L.',
    weekText: 'Saved water on 4/7 days',
    weekNote: 'Your kitchen use is stable; showers are the main opportunity.',
    goalSummary: 'Reduce household water use with small routine changes that feel natural.',
    billEstimate: '$22 water charge impact',
    confidenceText: 'Best opportunity: shower routine',
    insightsTitle: 'Weekly water usage',
    insightsSummary: 'Weekend showers were slightly longer, which explains most of the increase.',
    driversTitle: 'Top water users',
    explainText: 'Water use is being driven mostly by habits rather than fixed appliances. That is good news, because one routine change can make a noticeable difference quickly.',
    plainTip: 'Start with shower length before changing cooking or cleaning habits.',
    chart: [52, 49, 46, 58, 72, 76, 68],
    drivers: [
      { label: 'Showers', value: '46%' },
      { label: 'Laundry', value: '24%' },
      { label: 'Kitchen taps', value: '14%' }
    ],
    tips: [
      { icon: '🚿', title: 'Shorten one shower', body: 'Even a one-minute reduction saves water without feeling dramatic.', time: '1 min', impact: 'High impact' },
      { icon: '🪥', title: 'Turn tap off while brushing', body: 'A very small habit that is easy for most households to repeat.', time: '2 min', impact: 'Easy win' },
      { icon: '🧺', title: 'Wait for a full laundry load', body: 'Full loads make each cycle more efficient for both water and energy.', time: 'No extra time', impact: 'Smart habit' }
    ],
    routineText: 'Try linking a shorter shower to one clear reminder, like a playlist or timer cue.',
    routineTags: ['1-minute shorter', 'tap-off cue', 'full laundry loads'],
    challengeIcon: '🚿',
    challengeTitle: 'Reduce shower time by 1 minute',
    challengeCopy: 'A small cut in shower time can save water without disrupting your routine.',
    progressText: '3 out of 5 days',
    progressRatio: 0.6,
    progressDone: 3,
    savingsText: '120L of water saved',
    difficultyText: 'Gentle and realistic for families',
    backupChallenge: 'Keep one bottle by the sink instead of running the tap',
    motivationText: 'Simple water habits work best when they feel invisible.'
  }
};

const elementMap = {
  focusMetric: document.querySelector('#focusMetric'),
  focusNote: document.querySelector('#focusNote'),
  statusText: document.querySelector('#statusText'),
  statusNote: document.querySelector('#statusNote'),
  actionText: document.querySelector('#actionText'),
  actionNote: document.querySelector('#actionNote'),
  weekText: document.querySelector('#weekText'),
  weekNote: document.querySelector('#weekNote'),
  goalSummary: document.querySelector('#goalSummary'),
  billEstimate: document.querySelector('#billEstimate'),
  confidenceText: document.querySelector('#confidenceText'),
  insightsTitle: document.querySelector('#insightsTitle'),
  insightsSummary: document.querySelector('#insightsSummary'),
  driversTitle: document.querySelector('#driversTitle'),
  explainText: document.querySelector('#explainText'),
  plainTip: document.querySelector('#plainTip'),
  routineText: document.querySelector('#routineText'),
  challengeIcon: document.querySelector('#challengeIcon'),
  challengeTitle: document.querySelector('#challengeTitle'),
  challengeCopy: document.querySelector('#challengeCopy'),
  progressText: document.querySelector('#progressText'),
  progressFill: document.querySelector('#progressFill'),
  savingsText: document.querySelector('#savingsText'),
  difficultyText: document.querySelector('#difficultyText'),
  backupChallenge: document.querySelector('#backupChallenge'),
  motivationText: document.querySelector('#motivationText')
};

let currentGoal = 'balanced';

function showView(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.target === targetId);
  });

  views.forEach((view) => {
    view.classList.toggle('active', view.id === targetId);
  });
}

function renderChart(values) {
  barChart.innerHTML = values
    .map((value, index) => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return `
        <div class="bar-group">
          <div class="bar" style="height: ${value}%"></div>
          <span>${days[index]}</span>
        </div>
      `;
    })
    .join('');
}

function renderDrivers(drivers) {
  const rankColors = ['green', 'yellow', 'blue'];
  driverList.innerHTML = drivers
    .map((driver, index) => `
      <li>
        <span class="rank ${rankColors[index] || 'blue'}">${index + 1}</span>
        <strong>${driver.label}</strong>
        <span>${driver.value}</span>
      </li>
    `)
    .join('');
}

function renderTips(tips) {
  tipsGrid.innerHTML = tips
    .map((tip) => `
      <article class="tip-card">
        <div class="tip-top">
          <div class="tip-icon">${tip.icon}</div>
          <div>
            <h3 class="tip-title">${tip.title}</h3>
          </div>
        </div>
        <p>${tip.body}</p>
        <div class="tip-meta">
          <span class="tip-badge">${tip.time}</span>
          <span class="tip-badge">${tip.impact}</span>
        </div>
      </article>
    `)
    .join('');
}

function renderRoutineTags(tags) {
  routineTags.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join('');
}

function renderProgress(doneCount, ratio) {
  progressSteps.innerHTML = Array.from({ length: 5 }, (_, index) => {
    const doneClass = index < doneCount ? 'done' : '';
    return `<span class="${doneClass}">✓</span>`;
  }).join('');

  elementMap.progressFill.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;
}

function renderGoal(goal) {
  currentGoal = goal;
  const content = contentByGoal[goal];

  goalChips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.goal === goal);
  });

  Object.entries(elementMap).forEach(([key, element]) => {
    if (!element || key === 'progressFill') {
      return;
    }

    if (key === 'challengeIcon') {
      element.textContent = content[key];
      return;
    }

    if (content[key]) {
      element.textContent = content[key];
    }
  });

  renderChart(content.chart);
  renderDrivers(content.drivers);
  renderTips(content.tips);
  renderRoutineTags(content.routineTags);
  renderProgress(content.progressDone, content.progressRatio);
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => showView(tab.dataset.target));
});

goalChips.forEach((chip) => {
  chip.addEventListener('click', () => renderGoal(chip.dataset.goal));
});

showView('dashboard');
renderGoal(currentGoal);
