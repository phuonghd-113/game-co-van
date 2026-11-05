/**
 * DUONG LEN DINH OLYMPIA - Main Entry Point (Vite)
 */
import './style.css';
import { soundEngine } from './audio.js';
import { questionManager } from './questions.js';
import { firebaseSync } from './firebase.js';
import { OlympiaGame } from './game.js';

// Gắn vào window để phục vụ các hàm gọi trực tiếp từ HTML inline event handlers
window.soundEngine = soundEngine;
window.questionManager = questionManager;
window.firebaseSync = firebaseSync;

window.showSettingsTab = function(tabName) {
  // Alias hỗ trợ tên cũ nếu có
  let activeTab = tabName;
  if (tabName === 'general') activeTab = 'event';
  if (tabName === 'editor') activeTab = 'bank';

  const tabs = ['event', 'bank', 'teams', 'json', 'firebase'];
  document.querySelectorAll(".settings-tabs .tab-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", tabs[idx] === activeTab);
  });

  tabs.forEach((tab) => {
    const pane = document.getElementById(`tab-pane-${tab}`);
    if (pane) {
      pane.style.display = tab === activeTab ? 'block' : 'none';
    }
  });

  if (activeTab === 'bank' && window.game) {
    window.game.renderVisualQuestionEditor();
  }
};

// Khởi tạo trò chơi
document.addEventListener("DOMContentLoaded", () => {
  window.game = new OlympiaGame();
});

// Trường hợp Vite HMR hoặc DOM đã tải xong trước khi script chạy
if (document.readyState === "complete" || document.readyState === "interactive") {
  if (!window.game) {
    window.game = new OlympiaGame();
  }
}

