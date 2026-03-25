// =============================================================
// SUPABASE CONFIGURATION — replace these two values before use
// =============================================================
// 1. Create a free project at https://supabase.com
// 2. Go to Project Settings → API
// 3. Copy "Project URL" → SUPABASE_URL
//    Copy "anon / public" key → SUPABASE_ANON_KEY
// 4. Run this SQL in the Supabase SQL editor:
//
//   create table comments (
//     id bigint generated always as identity primary key,
//     name text not null,
//     message text not null,
//     source_page text not null default 'Direct visit',
//     created_at timestamptz default now()
//   );
//   alter table comments enable row level security;
//   create policy "Public can insert" on comments
//     for insert to anon with check (true);
//   create policy "Public can read" on comments
//     for select to anon using (true);
// =============================================================
const SUPABASE_URL = 'https://haguppcsmhltxopnduqz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z2TeI9nzRdr8fjBHKH12aQ_kc5xMrT-';

const COMMENTS_ENDPOINT = `${SUPABASE_URL}/rest/v1/comments`;
const SUPABASE_HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: 'numeric'
});

let submitting = false;

function setVisible(el, visible) {
  if (el) el.style.display = visible ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const sourcePage = params.get('from') || 'Direct visit';

  const sourceField = document.getElementById('source_page');
  const sourceBanner = document.getElementById('source-banner');
  const sourceLabel = document.getElementById('source-label');

  if (sourceField) sourceField.value = sourcePage;

  if (sourceBanner && sourceLabel) {
    sourceLabel.textContent = sourcePage;
    setVisible(sourceBanner, true);
  }

  fetchComments();

  const form = document.getElementById('comment-form');
  if (form) form.addEventListener('submit', handleSubmit);
});

async function fetchComments() {
  const list = document.getElementById('comments-list');
  if (!list) return;

  list.innerHTML = '<p class="text-secondary font-monospace">Loading comments...</p>';

  try {
    const res = await fetch(
      `${COMMENTS_ENDPOINT}?select=*&order=created_at.desc`,
      { headers: SUPABASE_HEADERS }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const comments = await res.json();
    renderComments(comments, list);
  } catch (err) {
    list.innerHTML = '<p class="text-danger font-monospace">Failed to load comments.</p>';
    console.error('fetchComments:', err);
  }
}

function renderComments(comments, container) {
  if (!comments.length) {
    container.innerHTML = '<p class="text-secondary font-monospace">No comments yet. Be the first!</p>';
    return;
  }
  container.innerHTML = comments.map(commentCard).join('');
}

function commentCard(c) {
  const date = DATE_FORMATTER.format(new Date(c.created_at));
  return `
    <div class="card mb-3 comment-card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="comment-author">${escapeHtml(c.name)}</span>
          <span class="comment-date text-secondary font-monospace">${date}</span>
        </div>
        <p class="card-text mb-2">${escapeHtml(c.message)}</p>
        <small class="comment-source font-monospace">
          <span class="text-secondary">from:</span>
          <span class="comment-source-page">${escapeHtml(c.source_page)}</span>
        </small>
      </div>
    </div>`;
}

async function handleSubmit(e) {
  e.preventDefault();
  if (submitting) return;

  // Honeypot — bots fill this field; real users don't
  const hp = document.getElementById('hp_field');
  if (hp && hp.value) return;

  const form = e.target;
  const name = form.name.value.trim();
  const message = form.message.value.trim();
  if (!name || !message) return;

  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('success-msg');
  const errorMsg = document.getElementById('error-msg');

  setVisible(successMsg, false);
  setVisible(errorMsg, false);

  submitting = true;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
  }

  const payload = {
    name,
    message,
    source_page: form.source_page.value || 'Direct visit'
  };

  try {
    const res = await fetch(COMMENTS_ENDPOINT, {
      method: 'POST',
      headers: { ...SUPABASE_HEADERS, 'Prefer': 'return=minimal' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    form.reset();
    const sourceField = document.getElementById('source_page');
    if (sourceField) sourceField.value = payload.source_page;

    setVisible(successMsg, true);

    // Prepend new comment immediately — avoids a full refetch round trip
    const list = document.getElementById('comments-list');
    if (list) {
      if (list.querySelector('p')) list.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = commentCard({ ...payload, created_at: new Date().toISOString() });
      list.insertBefore(wrapper.firstElementChild, list.firstChild);
    }
  } catch (err) {
    setVisible(errorMsg, true);
    console.error('handleSubmit:', err);
  } finally {
    submitting = false;
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
