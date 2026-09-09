const STORAGE_KEY = 'asu-assignments-v1';
const THEME_KEY = 'asu-tracker-theme';
const REMINDER_LOG_KEY = 'asu-tracker-reminder-log-v1';

let assignments = [];

// Chapter quizzes and exams get earlier/more frequent reminders than regular
// assignments (see shouldPopupToday). Detected from the name so seed data
// doesn't need a hand-maintained type field; user-added items set it explicitly.
function detectType(name) {
  return /\b(quiz|exam|midterm)\b/i.test(name) ? 'exam' : 'assignment';
}

function normalizeAssignment(a) {
  return { ...a, type: a.type || detectType(a.name), completed: !!a.completed };
}

function loadAssignments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  let list = null;
  if (raw) {
    try {
      list = JSON.parse(raw);
    } catch (e) {
      list = null;
    }
  }
  if (!list) list = SEED_ASSIGNMENTS.map(a => ({ ...a }));
  return list.map(normalizeAssignment);
}

function saveAssignments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

function dueDateTime(a) {
  return new Date(`${a.dueDate}T${a.dueTime || '23:59'}:00`);
}

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function fmtDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function fmtTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const dt = new Date();
  dt.setHours(h, m, 0, 0);
  return dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function classify(a, now) {
  if (a.completed) return 'done';
  const due = dueDateTime(a);
  const today0 = startOfDay(now);
  const tomorrow0 = addDays(today0, 1);
  const dayAfter0 = addDays(today0, 2);
  if (due < now) return 'overdue';
  if (due < tomorrow0) return 'today';
  if (due < dayAfter0) return 'tomorrow';
  if (due < addDays(today0, 8)) return 'upcoming';
  return 'later';
}

function computeStats() {
  const now = new Date();
  const in3days = addDays(now, 3);
  let total = assignments.length;
  let overdue = 0;
  let soon = 0;
  let points = 0;
  assignments.forEach(a => {
    points += Number(a.points) || 0;
    if (a.completed) return;
    const due = dueDateTime(a);
    if (due < now) overdue++;
    else if (due <= in3days) soon++;
  });
  return { total, overdue, soon, points };
}

function renderStats() {
  const s = computeStats();
  document.getElementById('statTotal').textContent = s.total;
  document.getElementById('statOverdue').textContent = s.overdue;
  document.getElementById('statSoon').textContent = s.soon;
  document.getElementById('statPoints').textContent = s.points;
}

function reminderItemHtml(a, status) {
  const due = dueDateTime(a);
  const now = new Date();
  const diffMs = due - now;
  const diffHrs = Math.round(diffMs / 36e5);
  let metaExtra;
  if (status === 'overdue') {
    const hrsLate = Math.round((now - due) / 36e5);
    metaExtra = hrsLate < 24 ? `${hrsLate}h overdue` : `${Math.round(hrsLate / 24)}d overdue`;
  } else {
    metaExtra = diffHrs < 24 ? `in ${diffHrs}h` : `in ${Math.round(diffHrs / 24)}d`;
  }
  const nameContent = a.url
    ? `<a href="${a.url}" target="_blank" rel="noopener">${escapeHtml(a.name)}</a>`
    : escapeHtml(a.name);
  const badgeCls = statusBadgeClass(status);
  return `
    <div class="reminder-item ${badgeCls}">
      <div class="item-main">
        <div class="item-name">${nameContent}</div>
        <div class="item-meta">${escapeHtml(a.course)} · ${fmtDate(a.dueDate)} at ${fmtTime(a.dueTime)} · ${metaExtra}</div>
      </div>
      <span class="badge ${badgeCls}">${STATUS_LABELS[status]}</span>
      <span class="badge points">${a.points} pts</span>
    </div>
  `;
}

const STATUS_LABELS = {
  overdue: 'Overdue',
  today: 'Due Today',
  tomorrow: 'Tomorrow',
  upcoming: 'Upcoming',
  later: 'Later',
  done: 'Completed',
};

function statusBadgeClass(status) {
  if (status === 'done') return 'done';
  if (status === 'overdue') return 'overdue';
  if (status === 'today' || status === 'tomorrow') return 'tomorrow';
  return 'upcoming';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderReminders() {
  const now = new Date();
  const overdue = [];
  const today = [];
  const tomorrow = [];
  const upcoming = [];
  assignments.forEach(a => {
    const status = classify(a, now);
    if (status === 'overdue') overdue.push(a);
    else if (status === 'today') today.push(a);
    else if (status === 'tomorrow') tomorrow.push(a);
    else if (status === 'upcoming') upcoming.push(a);
  });
  [overdue, today, tomorrow, upcoming].forEach(list => list.sort((a, b) => dueDateTime(a) - dueDateTime(b)));

  document.getElementById('countOverdue').textContent = overdue.length;
  document.getElementById('countToday').textContent = today.length;
  document.getElementById('countTomorrow').textContent = tomorrow.length;
  document.getElementById('countUpcoming').textContent = upcoming.length;

  const fill = (elId, list, status) => {
    const el = document.getElementById(elId);
    if (!list.length) {
      el.innerHTML = `<div class="empty-state">Nothing here. You're all caught up.</div>`;
      return;
    }
    el.innerHTML = list.map(a => reminderItemHtml(a, status)).join('');
  };

  fill('listOverdue', overdue, 'overdue');
  fill('listToday', today, 'today');
  fill('listTomorrow', tomorrow, 'tomorrow');
  fill('listUpcoming', upcoming, 'upcoming');
}

/* ---------- Calendar ---------- */
let calYear = 2026;
let calMonth = 8; // September (0-indexed)
let selectedDate = null;

function renderCalendar() {
  const label = new Date(calYear, calMonth, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  document.getElementById('calMonthLabel').textContent = label;

  const grid = document.getElementById('calGrid');

  // Preserve keyboard focus across the re-render below (rebuilding innerHTML
  // destroys the focused node, which would otherwise drop focus to <body>).
  const focused = document.activeElement;
  const focusedDate = focused && focused.closest && focused.closest('#calGrid .calendar-day[data-date]')
    ? focused.dataset.date
    : null;

  const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let html = dows.map(d => `<div class="dow" aria-hidden="true">${d}</div>`).join('');

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const byDate = {};
  assignments.forEach(a => {
    (byDate[a.dueDate] = byDate[a.dueDate] || []).push(a);
  });

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="calendar-day empty" aria-hidden="true"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayAssignments = byDate[dateStr] || [];
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedDate;
    let dots = '';
    dayAssignments.slice(0, 6).forEach(a => {
      const status = classify(a, now);
      const cls = status === 'done' ? 'done' : status === 'overdue' ? 'overdue' : status === 'today' || status === 'tomorrow' ? 'tomorrow' : '';
      dots += `<span class="day-dot ${cls}"></span>`;
    });
    const fullDateLabel = new Date(calYear, calMonth, day).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const dueLabel = dayAssignments.length ? `${dayAssignments.length} due` : 'nothing due';
    html += `
      <button type="button" class="calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}" data-date="${dateStr}"
        aria-label="${escapeHtml(fullDateLabel)}, ${dueLabel}" aria-pressed="${isSelected}" ${isToday ? 'aria-current="date"' : ''}>
        <div class="day-num">${day}</div>
        <div class="day-dots">${dots}</div>
        ${dayAssignments.length ? `<div class="day-count">${dayAssignments.length} due</div>` : ''}
      </button>
    `;
  }

  grid.innerHTML = html;
  grid.querySelectorAll('.calendar-day[data-date]').forEach(el => {
    el.addEventListener('click', () => {
      selectedDate = el.dataset.date;
      renderCalendar();
      renderDayDetail();
    });
  });
  // Assign (not addEventListener) - grid.innerHTML resets each render but the
  // grid node itself persists, so addEventListener would stack duplicate handlers.
  grid.onkeydown = handleCalendarGridKeydown;

  if (focusedDate) {
    const toFocus = grid.querySelector(`.calendar-day[data-date="${focusedDate}"]`);
    if (toFocus) toFocus.focus();
  }

  renderDayDetail();
}

function handleCalendarGridKeydown(e) {
  const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
  if (!step) return;
  const current = e.target.closest('.calendar-day[data-date]');
  if (!current) return;
  const cells = Array.from(document.querySelectorAll('#calGrid .calendar-day[data-date]'));
  const nextCell = cells[cells.indexOf(current) + step];
  if (nextCell) {
    e.preventDefault();
    nextCell.focus();
  }
}

function renderDayDetail() {
  const el = document.getElementById('dayDetail');
  if (!selectedDate) {
    el.innerHTML = '';
    return;
  }
  const dayAssignments = assignments
    .filter(a => a.dueDate === selectedDate)
    .sort((a, b) => a.dueTime.localeCompare(b.dueTime));

  if (!dayAssignments.length) {
    el.innerHTML = `<h3 class="section-title">${fmtDate(selectedDate)}</h3><div class="empty-state">Nothing due this day.</div>`;
    return;
  }

  const now = new Date();
  const rows = dayAssignments.map(a => {
    const status = classify(a, now);
    const badgeCls = statusBadgeClass(status);
    const borderCls = status === 'later' ? '' : badgeCls;
    const nameContent = a.url
      ? `<a href="${a.url}" target="_blank" rel="noopener">${escapeHtml(a.name)}</a>`
      : escapeHtml(a.name);
    return `
      <div class="reminder-item ${borderCls}">
        <div class="item-main">
          <div class="item-name">${nameContent}</div>
          <div class="item-meta">${escapeHtml(a.course)} · ${fmtTime(a.dueTime)}</div>
        </div>
        <span class="badge ${badgeCls}">${STATUS_LABELS[status]}</span>
        <span class="badge points">${a.points} pts</span>
      </div>
    `;
  }).join('');

  el.innerHTML = `<h3 class="section-title"><i class="ti ti-calendar-event"></i> ${fmtDate(selectedDate)}</h3><div class="reminder-list">${rows}</div>`;
}

/* ---------- All Assignments table ---------- */
function populateCourseFilter() {
  const sel = document.getElementById('courseFilter');
  COURSES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = COURSE_LABELS[c] || c;
    sel.appendChild(opt);
  });

  const formSel = document.getElementById('fCourse');
  COURSES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = COURSE_LABELS[c] || c;
    formSel.appendChild(opt);
  });
}

function renderTable() {
  const courseVal = document.getElementById('courseFilter').value;
  const statusVal = document.getElementById('statusFilter').value;
  const typeVal = document.getElementById('typeFilter').value;
  const searchVal = document.getElementById('searchInput').value.trim().toLowerCase();
  const now = new Date();

  let rows = assignments.slice();
  if (courseVal !== 'all') rows = rows.filter(a => a.course === courseVal);
  if (statusVal !== 'all') rows = rows.filter(a => classify(a, now) === statusVal);
  if (typeVal !== 'all') rows = rows.filter(a => a.type === typeVal);
  if (searchVal) rows = rows.filter(a => a.name.toLowerCase().includes(searchVal));

  rows.sort((a, b) => dueDateTime(a) - dueDateTime(b));

  const tbody = document.getElementById('allTableBody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state">No assignments match your filters.</div></td></tr>`;
  } else {
    tbody.innerHTML = rows.map(a => {
      const status = classify(a, now);
      const statusLabel = STATUS_LABELS[status];
      const statusCls = statusBadgeClass(status);
      const nameContent = a.url
        ? `<a href="${a.url}" target="_blank" rel="noopener">${escapeHtml(a.name)}</a>`
        : escapeHtml(a.name);
      const typeTag = a.type === 'exam' ? `<span class="badge type-exam">Quiz/Exam</span> ` : '';
      return `
        <tr data-id="${a.id}" class="${a.completed ? 'completed-row' : ''}">
          <td class="check-cell"><input type="checkbox" class="complete-check" title="Mark complete" ${a.completed ? 'checked' : ''}></td>
          <td class="name-cell">${typeTag}${nameContent}</td>
          <td>${escapeHtml(a.course)}</td>
          <td>${a.points}</td>
          <td>${fmtDate(a.dueDate)}</td>
          <td>${fmtTime(a.dueTime)}</td>
          <td><span class="badge ${statusCls}">${statusLabel}</span></td>
          <td>
            <div class="row-actions">
              <button class="edit" title="Edit"><i class="ti ti-edit"></i></button>
              <button class="delete" title="Delete"><i class="ti ti-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  document.getElementById('resultsCount').textContent = `Showing ${rows.length} of ${assignments.length} assignments`;

  tbody.querySelectorAll('tr[data-id]').forEach(tr => {
    const id = tr.dataset.id;
    tr.querySelector('.edit').addEventListener('click', () => startEdit(id));
    tr.querySelector('.delete').addEventListener('click', () => deleteAssignment(id));
    tr.querySelector('.complete-check').addEventListener('change', () => toggleComplete(id));
  });
}

function toggleComplete(id) {
  const a = assignments.find(x => x.id === id);
  if (!a) return;
  a.completed = !a.completed;
  saveAssignments();
  renderAll();
  showToast(a.completed ? 'Marked complete' : 'Marked incomplete');
}

function deleteAssignment(id) {
  if (!confirm('Delete this assignment?')) return;
  assignments = assignments.filter(a => a.id !== id);
  saveAssignments();
  renderAll();
  showToast('Assignment deleted');
}

function startEdit(id) {
  const a = assignments.find(x => x.id === id);
  if (!a) return;
  document.getElementById('editId').value = a.id;
  document.getElementById('fName').value = a.name;
  document.getElementById('fCourse').value = a.course;
  document.getElementById('fType').value = a.type || 'assignment';
  document.getElementById('fPoints').value = a.points;
  document.getElementById('fDate').value = a.dueDate;
  document.getElementById('fTime').value = a.dueTime;
  document.getElementById('formTitle').innerHTML = '<i class="ti ti-edit"></i> Edit Assignment';
  document.getElementById('submitBtn').innerHTML = '<i class="ti ti-check"></i> Save Changes';
  document.getElementById('cancelEditBtn').style.display = 'inline-flex';
  switchTab('add');
}

function resetForm() {
  document.getElementById('assignmentForm').reset();
  document.getElementById('editId').value = '';
  document.getElementById('fType').value = 'assignment';
  document.getElementById('fTime').value = '23:59';
  document.getElementById('fPoints').value = 0;
  document.getElementById('formTitle').innerHTML = '<i class="ti ti-plus"></i> Add Assignment';
  document.getElementById('submitBtn').innerHTML = '<i class="ti ti-plus"></i> Add Assignment';
  document.getElementById('cancelEditBtn').style.display = 'none';
}

/* ---------- Tabs ---------- */
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${name}`));
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ---------- Reminder popups ----------
   Regular assignments: popup at 2 days out and again at 1 day out.
   Quizzes/exams (name contains "quiz", "exam", or "midterm"): popup starting
   7 days out, then every day until it's due (and every day it stays overdue). */
function calendarDaysUntil(dateStr, now) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const due0 = new Date(y, m - 1, d);
  const today0 = startOfDay(now);
  return Math.round((due0 - today0) / 86400000);
}

function shouldPopupToday(a, daysLeft) {
  if (a.type === 'exam') return daysLeft <= 7;
  return daysLeft === 2 || daysLeft === 1;
}

function daysLeftLabel(daysLeft) {
  if (daysLeft < 0) return `${Math.abs(daysLeft)}d overdue`;
  if (daysLeft === 0) return 'Due today';
  if (daysLeft === 1) return '1 day left';
  return `${daysLeft} days left`;
}

function getReminderLog() {
  try {
    return JSON.parse(localStorage.getItem(REMINDER_LOG_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function requestNotifications() {
  if (!('Notification' in window)) {
    showToast('Notifications are not supported in this browser');
    return;
  }
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      showToast('Notifications enabled');
      checkReminderPopups(true);
    } else {
      showToast('Notifications blocked');
    }
  });
}

function checkReminderPopups(force) {
  const now = new Date();
  const todayKey = now.toDateString();
  const log = getReminderLog();
  const due = [];

  assignments.forEach(a => {
    if (a.completed) return;
    const daysLeft = calendarDaysUntil(a.dueDate, now);
    if (!shouldPopupToday(a, daysLeft)) return;
    if (!force && log[a.id] === todayKey) return;
    due.push({ a, daysLeft });
  });

  if (!due.length) return;
  due.forEach(({ a }) => { log[a.id] = todayKey; });
  localStorage.setItem(REMINDER_LOG_KEY, JSON.stringify(log));

  due.sort((x, y) => x.daysLeft - y.daysLeft);
  showReminderModal(due);

  if ('Notification' in window && Notification.permission === 'granted') {
    const examCount = due.filter(d => d.a.type === 'exam').length;
    const assignmentCount = due.length - examCount;
    const parts = [];
    if (examCount) parts.push(`${examCount} quiz/exam${examCount > 1 ? 'zes' : ''} coming up`);
    if (assignmentCount) parts.push(`${assignmentCount} assignment${assignmentCount > 1 ? 's' : ''} due soon`);
    new Notification('Assignment Tracker', { body: parts.join(' · ') });
  }
}

function showReminderModal(due) {
  const exams = due.filter(d => d.a.type === 'exam');
  const regular = due.filter(d => d.a.type !== 'exam');

  const section = (label, list) => {
    if (!list.length) return '';
    const items = list.map(({ a, daysLeft }) => {
      const urgency = daysLeft <= 0 ? 'overdue' : daysLeft === 1 ? 'tomorrow' : 'upcoming';
      return `
      <div class="reminder-item ${urgency}">
        <div class="item-main">
          <div class="item-name">${escapeHtml(a.name)}</div>
          <div class="item-meta">${escapeHtml(a.course)} · ${fmtDate(a.dueDate)} at ${fmtTime(a.dueTime)}</div>
        </div>
        <span class="badge ${urgency}">${daysLeftLabel(daysLeft)}</span>
      </div>
    `;
    }).join('');
    return `<div class="modal-section-label">${label}</div><div class="reminder-list">${items}</div>`;
  };

  document.getElementById('reminderModalBody').innerHTML =
    section('Quizzes & Exams', exams) + section('Assignments', regular);
  document.getElementById('reminderOverlay').classList.add('show');
}

function closeReminderModal() {
  document.getElementById('reminderOverlay').classList.remove('show');
}

/* ---------- Theme ---------- */
function applyTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const icon = document.querySelector('#themeBtn i');
  const isDark = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  icon.className = isDark ? 'ti ti-sun' : 'ti ti-moon';
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'auto';
  const isDarkNow = current === 'dark' || (current === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDarkNow ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

/* ---------- Render all ---------- */
function renderAll() {
  renderStats();
  renderReminders();
  renderCalendar();
  renderTable();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  assignments = loadAssignments();
  saveAssignments();

  populateCourseFilter();
  applyTheme(localStorage.getItem(THEME_KEY) || 'auto');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.getElementById('themeBtn').addEventListener('click', toggleTheme);
  document.getElementById('notifBtn').addEventListener('click', requestNotifications);

  document.getElementById('calPrev').addEventListener('click', () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    renderCalendar();
  });
  document.getElementById('calNext').addEventListener('click', () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    renderCalendar();
  });

  document.getElementById('courseFilter').addEventListener('change', renderTable);
  document.getElementById('statusFilter').addEventListener('change', renderTable);
  document.getElementById('typeFilter').addEventListener('change', renderTable);
  document.getElementById('searchInput').addEventListener('input', renderTable);

  document.getElementById('cancelEditBtn').addEventListener('click', resetForm);

  document.getElementById('assignmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('editId').value;
    const data = {
      name: document.getElementById('fName').value.trim(),
      course: document.getElementById('fCourse').value,
      type: document.getElementById('fType').value,
      points: Number(document.getElementById('fPoints').value) || 0,
      dueDate: document.getElementById('fDate').value,
      dueTime: document.getElementById('fTime').value,
    };
    if (!data.name || !data.course || !data.dueDate || !data.dueTime) return;

    if (editId) {
      const idx = assignments.findIndex(a => a.id === editId);
      if (idx !== -1) assignments[idx] = { ...assignments[idx], ...data };
      showToast('Assignment updated');
    } else {
      data.id = 'user-' + Date.now();
      data.url = '';
      assignments.push(data);
      showToast('Assignment added');
    }
    saveAssignments();
    resetForm();
    renderAll();
    switchTab('all');
  });

  document.getElementById('reminderCloseBtn').addEventListener('click', closeReminderModal);
  document.getElementById('reminderOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'reminderOverlay') closeReminderModal();
  });

  renderAll();

  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(() => checkReminderPopups(false));
  } else {
    checkReminderPopups(false);
  }

  // Re-check due/overdue status and reminder popups periodically without a full reload
  setInterval(() => {
    renderAll();
    checkReminderPopups(false);
  }, 60000);
});
