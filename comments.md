---
layout: default
title: Comments
description: Leave a comment or message for James Wells.
extra_js: /assets/js/comments.js
---

<div class="row">
  <div class="col-md-8 mx-auto">

    <h1>Comments</h1>
    <p class="text-secondary font-monospace mb-4">Leave a message. Your comment will appear here after submission.</p>

    <!-- Source page banner — shown only when arriving via a footer link -->
    <div id="source-banner" class="alert mb-4" role="alert"
         style="display:none; background: rgba(0,255,65,0.08); border: 1px solid #00ff41; color: #00d9ff;">
      <span class="font-monospace" style="font-size:0.875rem;">
        <span style="color:#00ff41;">▸</span>
        Commenting from page:
        <strong id="source-label" style="color:#00ff41;"></strong>
      </span>
    </div>

    <!-- Comment form -->
    <form id="comment-form" class="mb-5" novalidate>
      <!-- Honeypot — hidden from real users, filled by bots -->
      <div style="display:none;" aria-hidden="true">
        <input type="text" id="hp_field" name="hp_field" tabindex="-1" autocomplete="off">
      </div>

      <!-- Source page (auto-populated by JS) -->
      <input type="hidden" id="source_page" name="source_page" value="">

      <div class="mb-3">
        <label for="name" class="form-label font-monospace" style="color:#00d9ff;">Name</label>
        <input type="text" class="form-control" id="name" name="name"
               placeholder="Your name" required
               style="background: rgba(0,0,0,0.6); border-color: rgba(0,217,255,0.3); color: #e0e0e0;">
      </div>

      <div class="mb-3">
        <label for="message" class="form-label font-monospace" style="color:#00d9ff;">Message</label>
        <textarea class="form-control" id="message" name="message" rows="4"
                  placeholder="Your message..." required
                  style="background: rgba(0,0,0,0.6); border-color: rgba(0,217,255,0.3); color: #e0e0e0; resize: vertical;"></textarea>
      </div>

      <div id="success-msg" class="alert mb-3" role="alert"
           style="display:none; background: rgba(0,255,65,0.1); border: 1px solid #00ff41; color: #00ff41;">
        <span class="font-monospace">✓ Comment submitted successfully!</span>
      </div>
      <div id="error-msg" class="alert mb-3" role="alert"
           style="display:none; background: rgba(255,50,50,0.1); border: 1px solid #ff3232; color: #ff6b6b;">
        <span class="font-monospace">✗ Submission failed. Please try again.</span>
      </div>

      <button type="submit" id="submit-btn" class="btn btn-dark">Submit</button>
    </form>

    <!-- Comments list -->
    <h2 style="color:#00d9ff;" class="mb-3">All Comments</h2>
    <div id="comments-list">
      <p class="text-secondary font-monospace">Loading comments...</p>
    </div>

  </div>
</div>

<style>
  .comment-card {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(0, 217, 255, 0.2);
  }
  .comment-card:hover {
    border-color: #00ff41;
    transform: translateY(-2px);
    transition: all 0.3s ease;
  }
  .comment-author {
    font-family: 'Fira Code', monospace;
    color: #00ff41;
    font-weight: 600;
  }
  .comment-date {
    font-size: 0.8rem;
  }
  .comment-source {
    font-size: 0.8rem;
  }
  .comment-source-page {
    color: #00d9ff;
    margin-left: 0.25rem;
  }
  #comment-form input:focus,
  #comment-form textarea:focus {
    border-color: #00ff41;
    box-shadow: 0 0 0 0.2rem rgba(0, 255, 65, 0.15);
    background: rgba(0, 0, 0, 0.7);
    color: #e0e0e0;
  }
</style>
