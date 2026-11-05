/**
 * DUONG LEN DINH OLYMPIA - Game Engine (Vite ES Module - Taste Compliant)
 * Quản lý toàn bộ tiến trình 4 vòng thi, đồng hồ, tính điểm, âm thanh, hiệu ứng sân khấu
 */

import { soundEngine } from './audio.js';
import { questionManager } from './questions.js';
import { firebaseSync } from './firebase.js';

export class OlympiaGame {
  constructor() {
    this.data = questionManager.data;
    this.currentRound = 0; // 0: Trang chủ, 1: Khởi động, 2: Vượt CNV, 3: Tăng tốc, 4: Về đích, 5: Chung kết
    this.currentTeamTurn = 1; // 1, 2, 3, 4
    this.currentQuestionIdx = 0;
    
    // Trạng thái đồng hồ
    this.timer = null;
    this.timeLeft = 0;
    this.maxTime = 15;
    this.isTimerRunning = false;

    // Trạng thái vòng 2 (Vượt CNV)
    this.activeRowIdx = 0;
    this.solvedRows = [false, false, false, false];
    this.revealedTiles = [false, false, false, false];
    this.obstacleSolved = false;

    // Trạng thái vòng 4 (Về đích)
    this.selectedPackPoints = 20; // 20, 30, 40
    this.starOfHopeActive = false;
    this.r4TeamQuestionsDone = { 1: 0, 2: 0, 3: 0, 4: 0 };

    // Trạng thái quản lý Sự kiện & Ngân hàng đề trong Settings modal
    this.selectedSettingsEventId = null;
    this.selectedSettingsBankId = null;

    // Pháo hoa canvas
    this.fireworks = [];
    this.fireworksAnimId = null;

    this.initDOM();
    this.initEvents();
    this.updateTeamPedestals();
    this.updateHeaderInfo();
    this.setupPregameConsole();
    this.initAuth();
    this.initFirebase();
  }

  initDOM() {
    // Top Header
    this.gameTitleEl = document.getElementById("game-title-text");
    this.gameSubInfoEl = document.getElementById("game-sub-info");
    this.soundToggleBtn = document.getElementById("btn-sound-toggle");
    this.fullscreenBtn = document.getElementById("btn-fullscreen");
    this.leaderboardBtn = document.getElementById("btn-leaderboard");
    this.settingsBtn = document.getElementById("btn-settings");
    this.userProfileBadge = document.getElementById("user-profile-badge");
    this.currentUserNameEl = document.getElementById("current-user-name");
    this.navStepBtns = document.querySelectorAll(".round-step-btn");

    // Views
    this.viewWelcome = document.getElementById("view-welcome");
    this.viewRound1 = document.getElementById("view-round1");
    this.viewRound2 = document.getElementById("view-round2");
    this.viewRound3 = document.getElementById("view-round3");
    this.viewRound4 = document.getElementById("view-round4");
    this.viewFinale = document.getElementById("view-finale");

    // Pre-game Console (Welcome Screen)
    this.pregameEventSelect = document.getElementById("pregame-event-select");
    this.pregameBankSelect = document.getElementById("pregame-bank-select");
    this.pregameTeamInputs = [
      document.getElementById("pregame-team-1"),
      document.getElementById("pregame-team-2"),
      document.getElementById("pregame-team-3"),
      document.getElementById("pregame-team-4")
    ];

    // Modal
    this.modalLeaderboard = document.getElementById("modal-leaderboard");
    this.modalSettings = document.getElementById("modal-settings");
    this.modalLogin = document.getElementById("modal-login");
    this.loginErrorMsg = document.getElementById("login-error-msg");
    this.toastEl = document.getElementById("toast-notice");
    this.fireworksCanvas = document.getElementById("fireworks-canvas");

    // Settings Modal elements
    this.setEventListSelect = document.getElementById("set-event-list-select");
    this.setBankStudioSelect = document.getElementById("set-bank-studio-select");
    this.setEventBankSelect = document.getElementById("set-event-bank-select");
    this.setGameTitle = document.getElementById("set-game-title");
    this.setSubject = document.getElementById("set-subject");
    this.setGrade = document.getElementById("set-grade");
    this.setTopic = document.getElementById("set-topic");
    this.bankTitleInput = document.getElementById("bank-title-input");
    this.bankSubjectInput = document.getElementById("bank-subject-input");
    this.bankGradeInput = document.getElementById("bank-grade-input");
    this.editorRoundSelect = document.getElementById("editor-round-select");

    // Firebase Cloud elements
    this.cloudStatusBadge = document.getElementById("cloud-status-badge");
    this.cloudStatusDot = document.getElementById("cloud-status-dot");
    this.cloudStatusText = document.getElementById("cloud-status-text");
    this.fbDatabaseUrl = document.getElementById("fb-database-url");
    this.fbWorkspaceKey = document.getElementById("fb-workspace-key");
    this.fbAuthSecret = document.getElementById("fb-auth-secret");
    this.fbStatusBanner = document.getElementById("firebase-status-banner");
    this.fbBannerDot = document.getElementById("firebase-banner-dot");
    this.fbBannerText = document.getElementById("firebase-banner-text");

    // Round 1 elements
    this.r1TeamBadge = document.getElementById("r1-team-badge");
    this.r1QuestionNum = document.getElementById("r1-q-num");
    this.r1QuestionText = document.getElementById("r1-q-text");
    this.r1AnswersContainer = document.getElementById("r1-answers");
    this.r1TimerNum = document.getElementById("r1-timer-num");
    this.r1TimerRing = document.getElementById("r1-timer-ring");
    this.r1TimerBox = document.getElementById("r1-timer-box");

    // Round 2 elements
    this.r2KeywordLetters = document.getElementById("r2-keyword-letters");
    this.r2RowsList = document.getElementById("r2-rows-list");
    this.r2QuestionText = document.getElementById("r2-question-text");
    this.r2AnswerReveal = document.getElementById("r2-answer-reveal");
    this.r2ImageEl = document.getElementById("r2-secret-image");

    // Round 3 elements
    this.r3QuestionNum = document.getElementById("r3-q-num");
    this.r3PointsBadge = document.getElementById("r3-points-badge");
    this.r3QuestionText = document.getElementById("r3-q-text");
    this.r3AnswersContainer = document.getElementById("r3-answers");
    this.r3TimerNum = document.getElementById("r3-timer-num");
    this.r3TimerRing = document.getElementById("r3-timer-ring");
    this.r3TimerBox = document.getElementById("r3-timer-box");
    this.r3BuzzersRow = document.getElementById("r3-buzzers-row");
    this.r3SpeedRanking = document.getElementById("r3-speed-ranking");
    this.r3BuzzRecords = [];
    this.r3StartTime = 0;
    this.r3HasAwardedPoints = false;

    // Round 4 elements
    this.r4TeamBadge = document.getElementById("r4-team-badge");
    this.r4PointsBadge = document.getElementById("r4-points-badge");
    this.r4QuestionText = document.getElementById("r4-q-text");
    this.r4AnswersContainer = document.getElementById("r4-answers");
    this.r4TimerNum = document.getElementById("r4-timer-num");
    this.r4TimerRing = document.getElementById("r4-timer-ring");
    this.r4TimerBox = document.getElementById("r4-timer-box");
    this.r4StarBtn = document.getElementById("btn-r4-star");
  }

  initEvents() {
    // Sound toggle
    this.soundToggleBtn.addEventListener("click", () => {
      const enabled = soundEngine.toggleSound();
      this.soundToggleBtn.innerHTML = enabled 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`;
      this.showToast(enabled ? "Đã bật âm thanh" : "Đã tắt âm thanh");
    });

    // Fullscreen toggle
    this.fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Leaderboard modal
    this.leaderboardBtn.addEventListener("click", () => this.openLeaderboard());
    document.getElementById("btn-close-lb").addEventListener("click", () => this.closeModals());

    // Settings modal
    this.settingsBtn.addEventListener("click", () => {
      if (!this.isAuthenticated()) {
        this.openLoginModal();
        return;
      }
      this.openSettings();
    });
    document.getElementById("btn-close-settings").addEventListener("click", () => this.closeModals());

    // Nav round buttons
    this.navStepBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const round = parseInt(btn.dataset.round, 10);
        if (round !== 0 && !this.isAuthenticated()) {
          this.openLoginModal();
          return;
        }
        this.switchRound(round);
      });
    });

    // Bắt đầu game từ Welcome screen
    const startBtn = document.getElementById("btn-start-game");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        if (!this.isAuthenticated()) {
          this.openLoginModal();
          return;
        }
        soundEngine.init();
        soundEngine.playRoundIntro();
        this.switchRound(1);
      });
    }

    // Modal background click
    [this.modalLeaderboard, this.modalSettings].forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeModals();
      });
    });

    if (this.modalLogin) {
      this.modalLogin.addEventListener("click", (e) => {
        if (e.target === this.modalLogin && this.isAuthenticated()) {
          this.closeLoginModal();
        }
      });
    }

    // Nút Bấm chuông Chướng ngại vật
    const btnGuessObs = document.getElementById("btn-guess-obstacle");
    if (btnGuessObs) {
      btnGuessObs.addEventListener("click", () => this.triggerObstacleBuzzer());
    }

    // Window resize cho Fireworks
    window.addEventListener("resize", () => {
      if (this.fireworksCanvas) {
        this.fireworksCanvas.width = this.fireworksCanvas.parentElement.clientWidth;
        this.fireworksCanvas.height = this.fireworksCanvas.parentElement.clientHeight;
      }
    });

    // Bàn phím bấm chuông (Phím 1, 2, 3, 4 cho 4 đội và Phím Space tạm dừng đồng hồ)
    window.addEventListener("keydown", (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

      // Phím tắt bấm chuông vòng 3 Tăng tốc
      if (this.currentRound === 3) {
        if (e.key === "1" || e.code === "Digit1" || e.code === "Numpad1") {
          e.preventDefault();
          this.r3RecordBuzz(1);
        } else if (e.key === "2" || e.code === "Digit2" || e.code === "Numpad2") {
          e.preventDefault();
          this.r3RecordBuzz(2);
        } else if (e.key === "3" || e.code === "Digit3" || e.code === "Numpad3") {
          e.preventDefault();
          this.r3RecordBuzz(3);
        } else if (e.key === "4" || e.code === "Digit4" || e.code === "Numpad4") {
          e.preventDefault();
          this.r3RecordBuzz(4);
        }
      }

      // Phím Space tạm dừng / chạy tiếp đồng hồ
      if (e.code === "Space") {
        e.preventDefault();
        if (this.currentRound === 3) {
          this.pauseResumeTimer(this.r3TimerNum, this.r3TimerRing, this.r3TimerBox);
        } else if (this.currentRound === 1) {
          this.pauseResumeTimer(this.r1TimerNum, this.r1TimerRing, this.r1TimerBox);
        } else if (this.currentRound === 4) {
          this.pauseResumeTimer(this.r4TimerNum, this.r4TimerRing, this.r4TimerBox);
        }
      }
    });
  }

  showToast(msg) {
    if (!this.toastEl) return;
    this.toastEl.innerText = msg;
    this.toastEl.classList.add("show");
    setTimeout(() => {
      this.toastEl.classList.remove("show");
    }, 2400);
  }

  updateHeaderInfo() {
    if (this.gameTitleEl) {
      this.gameTitleEl.innerText = this.data.gameTitle || "ĐƯỜNG LÊN ĐỈNH OLYMPIA";
    }
    if (this.gameSubInfoEl) {
      this.gameSubInfoEl.innerHTML = `
        <span class="brand-tag">MÔN: ${this.data.subject || "Kiến thức"}</span>
        <span class="brand-tag">LỚP: ${this.data.grade || "Tiểu học"}</span>
      `;
    }
  }

  // =========================================================================
  // TEAM PEDESTALS (4 BỤC THI ĐẤU)
  // =========================================================================
  updateTeamPedestals() {
    const pedestalsContainer = document.getElementById("stage-pedestals");
    if (!pedestalsContainer) return;

    pedestalsContainer.innerHTML = "";
    this.data.teams.forEach((team) => {
      const isTurn = this.currentTeamTurn === team.id;
      const card = document.createElement("div");
      card.className = `team-pedestal ${isTurn ? "active-turn" : ""}`;
      card.style.setProperty("--team-color", team.color);

      card.innerHTML = `
        <div class="team-header-row">
          <div class="team-badge-avatar" style="background:${team.color}">${team.id}</div>
          <div class="team-name" title="${team.name}">${team.name}</div>
        </div>
        <div class="pedestal-score-screen">
          <div class="score-display-value" id="pedestal-score-${team.id}">${team.score}</div>
        </div>
        <div class="pedestal-actions">
          <button class="btn-buzz-team" onclick="window.game.buzzTeam(${team.id})">Chuông</button>
          <div class="score-tweak-btns">
            <button class="btn-tweak" onclick="window.game.adjustScore(${team.id}, 10)" title="Cộng 10 điểm">+10</button>
            <button class="btn-tweak" onclick="window.game.adjustScore(${team.id}, -10)" title="Trừ 10 điểm">-10</button>
          </div>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (!e.target.closest("button")) {
          this.setTeamTurn(team.id);
        }
      });

      pedestalsContainer.appendChild(card);
    });
  }

  setTeamTurn(teamId) {
    this.currentTeamTurn = teamId;
    this.updateTeamPedestals();
    if (this.currentRound === 1) {
      this.currentQuestionIdx = 0;
      this.renderRound1();
    } else if (this.currentRound === 4) {
      this.renderRound4();
    }
  }

  buzzTeam(teamId) {
    soundEngine.playBuzzer();
    const team = this.data.teams.find((t) => t.id === teamId);
    this.showToast(`${team.name} ĐÃ BẤM CHUÔNG!`);
    this.setTeamTurn(teamId);

    if (this.currentRound === 3) {
      this.r3RecordBuzz(teamId);
    }
  }

  adjustScore(teamId, delta) {
    const team = this.data.teams.find((t) => t.id === teamId);
    if (!team) return;
    team.score += delta;
    if (team.score < 0) team.score = 0;

    this.spawnFloatingScore(teamId, delta);

    if (delta > 0) {
      soundEngine.playCorrect();
    } else if (delta < 0) {
      soundEngine.playWrong();
    }

    const scoreEl = document.getElementById(`pedestal-score-${teamId}`);
    if (scoreEl) {
      scoreEl.innerText = team.score;
      scoreEl.classList.add("score-pop");
      setTimeout(() => scoreEl.classList.remove("score-pop"), 300);
    }
    questionManager.saveData(this.data);
  }

  spawnFloatingScore(teamId, delta) {
    const scoreScreen = document.getElementById(`pedestal-score-${teamId}`);
    if (!scoreScreen) return;

    const popup = document.createElement("div");
    popup.className = `floating-score ${delta >= 0 ? "plus" : "minus"}`;
    popup.innerText = `${delta >= 0 ? "+" : ""}${delta}`;
    scoreScreen.appendChild(popup);

    setTimeout(() => popup.remove(), 1200);
  }

  // =========================================================================
  // TIMER ENGINE
  // =========================================================================
  startTimer(seconds, timerNumEl, timerRingEl, timerBoxEl, onFinish) {
    this.stopTimer();
    this.maxTime = seconds;
    this.timeLeft = seconds;
    this.isTimerRunning = true;

    const circumference = 2 * Math.PI * 26;
    if (timerRingEl) {
      timerRingEl.style.strokeDasharray = circumference;
      timerRingEl.style.strokeDashoffset = 0;
    }

    const updateUI = () => {
      if (timerNumEl) timerNumEl.innerText = this.timeLeft;
      if (timerRingEl) {
        const offset = circumference - (this.timeLeft / this.maxTime) * circumference;
        timerRingEl.style.strokeDashoffset = offset;
      }
      if (timerBoxEl) {
        if (this.timeLeft <= 3) {
          timerBoxEl.classList.add("urgent");
        } else {
          timerBoxEl.classList.remove("urgent");
        }
      }
    };

    updateUI();

    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft > 0) {
        if (this.timeLeft <= 3) {
          soundEngine.playWarningTick();
        } else {
          soundEngine.playTick();
        }
        updateUI();
      } else {
        updateUI();
        this.stopTimer();
        soundEngine.playTimesUp();
        if (onFinish) onFinish();
      }
    }, 1000);
  }

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  pauseResumeTimer(timerNumEl, timerRingEl, timerBoxEl, onFinish) {
    if (this.isTimerRunning) {
      this.stopTimer();
      this.showToast("Đã tạm dừng đồng hồ");
    } else if (this.timeLeft > 0) {
      this.startTimer(this.timeLeft, timerNumEl, timerRingEl, timerBoxEl, onFinish);
      this.showToast("Tiếp tục đếm ngược");
    }
  }

  // =========================================================================
  // ROUND SWITCHING
  // =========================================================================
  switchRound(roundNum) {
    this.stopTimer();
    this.stopFireworks();
    this.currentRound = roundNum;

    this.navStepBtns.forEach((btn) => {
      const r = parseInt(btn.dataset.round, 10);
      btn.classList.toggle("active", r === roundNum);
    });

    [
      this.viewWelcome,
      this.viewRound1,
      this.viewRound2,
      this.viewRound3,
      this.viewRound4,
      this.viewFinale
    ].forEach((v) => {
      if (v) v.classList.remove("active");
    });

    if (roundNum === 0) {
      this.viewWelcome.classList.add("active");
    } else if (roundNum === 1) {
      this.viewRound1.classList.add("active");
      this.renderRound1();
    } else if (roundNum === 2) {
      this.viewRound2.classList.add("active");
      this.renderRound2();
    } else if (roundNum === 3) {
      this.viewRound3.classList.add("active");
      this.renderRound3();
    } else if (roundNum === 4) {
      this.viewRound4.classList.add("active");
      this.renderRound4();
    } else if (roundNum === 5) {
      this.viewFinale.classList.add("active");
      this.renderFinale();
    }

    this.updateTeamPedestals();
  }

  // =========================================================================
  // VÒNG 1: KHỞI ĐỘNG
  // =========================================================================
  renderRound1() {
    const qList = (this.data.round1.teamsQuestions && this.data.round1.teamsQuestions[this.currentTeamTurn]) || [];
    const totalQ = qList.length;

    if (this.currentQuestionIdx >= totalQ) {
      this.currentQuestionIdx = 0;
    }

    const currentQ = qList[this.currentQuestionIdx];
    const currentTeam = this.data.teams.find((t) => t.id === this.currentTeamTurn);

    if (this.r1TeamBadge) {
      this.r1TeamBadge.innerText = `LƯỢT THI: ${currentTeam.name.toUpperCase()}`;
      this.r1TeamBadge.style.color = currentTeam.color;
    }

    if (this.r1QuestionNum) {
      this.r1QuestionNum.innerText = `CÂU ${this.currentQuestionIdx + 1}/${totalQ}`;
    }

    if (!currentQ) {
      this.r1QuestionText.innerText = "Chưa có câu hỏi cho đội này.";
      this.r1AnswersContainer.innerHTML = "";
      return;
    }

    this.r1QuestionText.innerText = currentQ.question;
    this.r1AnswersContainer.innerHTML = "";

    const letters = ["A", "B", "C", "D"];
    currentQ.options.forEach((opt, idx) => {
      const card = document.createElement("div");
      card.className = "answer-card";
      card.innerHTML = `<span class="ans-letter">${letters[idx]}.</span> <span>${opt.replace(/^[A-D]\.\s*/, "")}</span>`;

      card.addEventListener("click", () => {
        this.selectAnswerRound1(idx, card, currentQ);
      });

      this.r1AnswersContainer.appendChild(card);
    });

    this.startTimer(
      this.data.round1.timeLimit || 15,
      this.r1TimerNum,
      this.r1TimerRing,
      this.r1TimerBox,
      () => {
        this.showToast("Hết thời gian câu hỏi!");
      }
    );
  }

  selectAnswerRound1(selectedIdx, cardEl, question) {
    this.stopTimer();
    const cards = this.r1AnswersContainer.querySelectorAll(".answer-card");
    cards.forEach((c) => c.classList.add("disabled"));

    const isCorrect = selectedIdx === question.correct;
    if (isCorrect) {
      cardEl.classList.add("correct");
      soundEngine.playCorrect();
      this.adjustScore(this.currentTeamTurn, this.data.round1.pointsPerQuestion || 10);
      this.showToast("CHÍNH XÁC! +10 điểm");
    } else {
      cardEl.classList.add("wrong");
      soundEngine.playWrong();
      if (cards[question.correct]) {
        cards[question.correct].classList.add("correct");
      }
      this.showToast("RẤT TIẾC, CHƯA CHÍNH XÁC!");
    }
  }

  r1GradeCorrect() {
    this.stopTimer();
    this.adjustScore(this.currentTeamTurn, this.data.round1.pointsPerQuestion || 10);
    this.showToast("ĐÚNG! +10 điểm");
    const qList = this.data.round1.teamsQuestions[this.currentTeamTurn] || [];
    const currentQ = qList[this.currentQuestionIdx];
    const cards = this.r1AnswersContainer.querySelectorAll(".answer-card");
    if (currentQ && cards[currentQ.correct]) {
      cards[currentQ.correct].classList.add("correct");
    }
  }

  r1GradeWrong() {
    this.stopTimer();
    soundEngine.playWrong();
    this.showToast("CHƯA CHÍNH XÁC!");
  }

  r1NextQuestion() {
    const qList = (this.data.round1.teamsQuestions && this.data.round1.teamsQuestions[this.currentTeamTurn]) || [];
    if (this.currentQuestionIdx < qList.length - 1) {
      this.currentQuestionIdx++;
      this.renderRound1();
    } else {
      this.showToast(`Đã hoàn thành phần thi Khởi động của ${this.data.teams.find((t) => t.id === this.currentTeamTurn).name}!`);
      if (this.currentTeamTurn < 4) {
        this.setTeamTurn(this.currentTeamTurn + 1);
      } else {
        this.openLeaderboard();
      }
    }
  }

  r1PrevQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.renderRound1();
    }
  }

  // =========================================================================
  // VÒNG 2: VƯỢT CHƯỚNG NGẠI VẬT
  // =========================================================================
  renderRound2() {
    const r2Data = this.data.round2;

    if (this.r2KeywordLetters) {
      this.r2KeywordLetters.innerHTML = "";
      const keyword = r2Data.keyword.toUpperCase();
      for (let i = 0; i < keyword.length; i++) {
        const char = keyword[i];
        const cell = document.createElement("div");
        if (char === " ") {
          cell.className = "letter-cell space";
        } else {
          cell.className = "letter-cell";
          cell.innerText = this.obstacleSolved ? char : "?";
        }
        this.r2KeywordLetters.appendChild(cell);
      }
    }

    if (this.r2ImageEl && r2Data.imageUrl) {
      this.r2ImageEl.src = r2Data.imageUrl;
    }

    if (this.r2RowsList) {
      this.r2RowsList.innerHTML = "";
      r2Data.rows.forEach((row, idx) => {
        const isSolved = this.solvedRows[idx];
        const isActive = this.activeRowIdx === idx;
        const rowItem = document.createElement("div");
        rowItem.className = `row-item ${isActive ? "active" : ""} ${isSolved ? "solved" : ""}`;

        let cellsHtml = "";
        const letters = row.answer.toUpperCase();
        for (let l = 0; l < letters.length; l++) {
          const char = letters[l];
          cellsHtml += `<div class="row-cell-tiny ${isSolved ? "revealed" : ""}">${isSolved ? char : ""}</div>`;
        }

        rowItem.innerHTML = `
          <div class="row-title">
            <span>${row.name}:</span>
            <span>(${row.length} chữ cái)</span>
          </div>
          <div class="row-cells-preview">${cellsHtml}</div>
        `;

        rowItem.addEventListener("click", () => {
          this.activeRowIdx = idx;
          this.renderRound2();
        });

        this.r2RowsList.appendChild(rowItem);
      });
    }

    const activeRow = r2Data.rows[this.activeRowIdx];
    if (activeRow) {
      this.r2QuestionText.innerText = `HÀNG NGANG SỐ ${this.activeRowIdx + 1} (${activeRow.length} chữ cái): ${activeRow.question}`;
      if (this.solvedRows[this.activeRowIdx]) {
        this.r2AnswerReveal.innerText = `ĐÁP ÁN: ${activeRow.answer.toUpperCase()} - ${activeRow.explanation}`;
        this.r2AnswerReveal.style.display = "block";
      } else {
        this.r2AnswerReveal.style.display = "none";
      }
    }

    for (let i = 1; i <= 4; i++) {
      const tile = document.getElementById(`puzzle-tile-${i}`);
      if (tile) {
        tile.classList.toggle("revealed", this.revealedTiles[i - 1] || this.obstacleSolved);
      }
    }
    const centerPiece = document.getElementById("puzzle-center-piece");
    if (centerPiece) {
      centerPiece.classList.toggle("revealed", this.obstacleSolved);
    }
  }

  r2SolveActiveRow(isCorrect) {
    const activeIdx = this.activeRowIdx;
    if (isCorrect) {
      soundEngine.playCorrect();
      soundEngine.playTileFlip();
      this.solvedRows[activeIdx] = true;
      this.revealedTiles[activeIdx] = true;
      this.adjustScore(this.currentTeamTurn, 10);
      this.showToast(`Mở thành công Hàng ngang số ${activeIdx + 1}!`);
    } else {
      soundEngine.playWrong();
      this.showToast(`Chưa mở được Hàng ngang số ${activeIdx + 1}!`);
    }
    this.renderRound2();
  }

  triggerObstacleBuzzer() {
    soundEngine.playBuzzer();
    const team = this.data.teams.find((t) => t.id === this.currentTeamTurn);
    const confirmed = confirm(
      `Đội [${team.name}] bấm chuông trả lời CHƯỚNG NGẠI VẬT?\n\n- Đúng: Được 40 ĐIỂM và mở toàn bộ bức tranh!\n- Thầy/cô nhấn OK nếu đội trả lời ĐÚNG, Cancel nếu SAI!`
    );

    if (confirmed) {
      this.obstacleSolved = true;
      this.revealedTiles = [true, true, true, true];
      this.solvedRows = [true, true, true, true];
      this.adjustScore(this.currentTeamTurn, 40);
      soundEngine.playCorrect();
      soundEngine.playRoundIntro();
      this.showToast(`TUYỆT VỜI! ${team.name} ĐÃ GIẢI ĐƯỢC CHƯỚNG NGẠI VẬT: ${this.data.round2.keyword.toUpperCase()}! (+40 ĐIỂM)`);
      this.renderRound2();
    } else {
      soundEngine.playWrong();
      this.showToast(`Rất tiếc, câu trả lời chướng ngại vật chưa chính xác!`);
    }
  }

  // =========================================================================
  // VÒNG 3: TĂNG TỐC (SPEED TRACKER & SCORING)
  // =========================================================================
  renderRound3() {
    const questions = this.data.round3.questions || [];
    if (this.currentQuestionIdx >= questions.length) {
      this.currentQuestionIdx = 0;
    }

    const currentQ = questions[this.currentQuestionIdx];
    if (!currentQ) return;

    // Reset bảng bấm chuông và thời gian bắt đầu câu hỏi
    this.r3BuzzRecords = [];
    this.r3HasAwardedPoints = false;
    this.r3StartTime = performance.now();

    if (this.r3QuestionNum) {
      this.r3QuestionNum.innerText = `CÂU ${this.currentQuestionIdx + 1}/${questions.length}`;
    }
    if (this.r3PointsBadge) {
      this.r3PointsBadge.innerText = `40 - 30 - 20 - 10 ĐIỂM (${currentQ.timeLimit || 20} GIÂY)`;
    }
    if (this.r3QuestionText) {
      this.r3QuestionText.innerText = currentQ.question;
    }

    this.r3AnswersContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    currentQ.options.forEach((opt, idx) => {
      const card = document.createElement("div");
      card.className = "answer-card";
      card.innerHTML = `<span class="ans-letter">${letters[idx]}.</span> <span>${opt.replace(/^[A-D]\.\s*/, "")}</span>`;

      card.addEventListener("click", () => {
        this.selectAnswerRound3(idx, card, currentQ);
      });
      this.r3AnswersContainer.appendChild(card);
    });

    // Vẽ bảng tốc độ 4 đội
    this.renderR3SpeedDashboard();

    this.startTimer(
      currentQ.timeLimit || 20,
      this.r3TimerNum,
      this.r3TimerRing,
      this.r3TimerBox,
      () => {
        this.showToast("Hết thời gian Tăng tốc! Giáo viên hãy đối chiếu và trao điểm.");
      }
    );
  }

  r3RecordBuzz(teamId) {
    if (this.currentRound !== 3) return;

    // Đội đã bấm chuông câu này rồi thì không ghi đè
    const existing = this.r3BuzzRecords.find((r) => r.teamId === teamId);
    if (existing) return;

    const team = this.data.teams.find((t) => t.id === teamId);
    if (!team) return;

    const elapsed = Math.max(0.1, (performance.now() - this.r3StartTime) / 1000);
    const timeSec = parseFloat(elapsed.toFixed(2));

    soundEngine.playBuzzer();

    this.r3BuzzRecords.push({
      teamId: team.id,
      teamName: team.name,
      teamColor: team.color,
      timeSec: timeSec,
      isCorrect: true,
      awardedPoints: 0
    });

    // Sắp xếp thứ tự thời gian bấm từ nhanh nhất đến chậm nhất
    this.r3BuzzRecords.sort((a, b) => a.timeSec - b.timeSec);

    this.showToast(`${team.name} đã bấm chuông lúc ${timeSec}s!`);
    this.renderR3SpeedDashboard();
  }

  r3ResetBuzzers() {
    this.r3BuzzRecords = [];
    this.r3HasAwardedPoints = false;
    this.r3StartTime = performance.now();
    this.showToast("Đã đặt lại thời gian bấm chuông câu này");
    this.renderR3SpeedDashboard();
  }

  r3ToggleTeamCorrect(teamId, isCorrect) {
    const rec = this.r3BuzzRecords.find((r) => r.teamId === teamId);
    if (rec) {
      rec.isCorrect = isCorrect;
      this.renderR3SpeedDashboard();
    }
  }

  r3AwardOlympiaPoints() {
    if (this.r3HasAwardedPoints) {
      this.showToast("Điểm câu này đã được trao rồi!");
      return;
    }

    if (this.r3BuzzRecords.length === 0) {
      this.showToast("Chưa có đội nào bấm chuông để trao điểm!");
      return;
    }

    this.stopTimer();

    // Chuẩn điểm Olympia: 40 - 30 - 20 - 10
    const pointTiers = [40, 30, 20, 10];
    let correctCount = 0;
    const summary = [];

    this.r3BuzzRecords.forEach((rec) => {
      if (rec.isCorrect) {
        const pts = pointTiers[correctCount] || 10;
        rec.awardedPoints = pts;
        this.adjustScore(rec.teamId, pts);
        summary.push(`${rec.teamName} (+${pts}đ - ${rec.timeSec}s)`);
        correctCount++;
      } else {
        rec.awardedPoints = 0;
      }
    });

    this.r3HasAwardedPoints = true;
    if (correctCount > 0) {
      soundEngine.playCorrect();
      this.showToast(`TRAO ĐIỂM THÀNH CÔNG: ${summary.join(" | ")}`);
    } else {
      soundEngine.playWrong();
      this.showToast("Không có đội nào trả lời đúng!");
    }

    const questions = this.data.round3.questions || [];
    const currentQ = questions[this.currentQuestionIdx];
    if (currentQ) {
      this.revealAnswer(this.r3AnswersContainer, currentQ);
    }

    this.renderR3SpeedDashboard();
  }

  r3AwardFixedPoints(pts) {
    if (this.r3HasAwardedPoints) {
      this.showToast("Điểm câu này đã được trao rồi!");
      return;
    }

    this.stopTimer();
    const summary = [];
    this.r3BuzzRecords.forEach((rec) => {
      if (rec.isCorrect) {
        rec.awardedPoints = pts;
        this.adjustScore(rec.teamId, pts);
        summary.push(`${rec.teamName} (+${pts}đ)`);
      } else {
        rec.awardedPoints = 0;
      }
    });

    this.r3HasAwardedPoints = true;
    soundEngine.playCorrect();
    this.showToast(`ĐÃ CỘNG +${pts}Đ CHO CÁC ĐỘI ĐÚNG: ${summary.join(", ")}`);

    const questions = this.data.round3.questions || [];
    const currentQ = questions[this.currentQuestionIdx];
    if (currentQ) {
      this.revealAnswer(this.r3AnswersContainer, currentQ);
    }

    this.renderR3SpeedDashboard();
  }

  renderR3SpeedDashboard() {
    if (!this.r3BuzzersRow || !this.r3SpeedRanking) return;

    // 1. Vẽ 4 ô bấm chuông của 4 đội
    this.r3BuzzersRow.innerHTML = "";
    this.data.teams.forEach((team) => {
      const rec = this.r3BuzzRecords.find((r) => r.teamId === team.id);
      const isBuzzed = !!rec;
      const rankIdx = rec ? this.r3BuzzRecords.indexOf(rec) + 1 : null;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `speed-buzzer-btn ${isBuzzed ? "buzzed" : ""}`;
      btn.style.setProperty("--team-color", team.color);

      btn.innerHTML = `
        <div class="buzzer-key-badge">${team.id}</div>
        <div class="buzzer-info">
          <div class="buzzer-team-name">${team.name}</div>
          <div class="buzzer-status">${isBuzzed ? `${rec.timeSec}s (Hạng ${rankIdx})` : `Bấm phím ${team.id}`}</div>
        </div>
      `;

      btn.addEventListener("click", () => {
        this.r3RecordBuzz(team.id);
      });

      this.r3BuzzersRow.appendChild(btn);
    });

    // 2. Vẽ bảng xếp hạng thời gian & xét duyệt điểm
    if (this.r3BuzzRecords.length === 0) {
      this.r3SpeedRanking.innerHTML = `
        <div class="speed-empty-state">
          <span>Chưa có đội nào bấm chuông. Nhấn phím số <strong>1, 2, 3, 4</strong> trên bàn phím hoặc nhấp vào ô của từng đội để ghi nhận thời gian trả lời.</span>
        </div>
      `;
      return;
    }

    const pointTiers = [40, 30, 20, 10];
    let correctCounter = 0;
    const rowsHtml = this.r3BuzzRecords.map((rec, idx) => {
      let expectedPts = 0;
      if (rec.isCorrect) {
        expectedPts = pointTiers[correctCounter] || 10;
        correctCounter++;
      }

      return `
        <div class="speed-ranking-row ${rec.isCorrect ? "is-correct" : "is-wrong"}">
          <div class="speed-rank-badge">#${idx + 1}</div>
          <div class="speed-team-pill" style="border-left-color:${rec.teamColor}">
            <span class="pill-name">${rec.teamName}</span>
            <span class="pill-time">${rec.timeSec}s</span>
          </div>
          <div class="speed-grade-toggles">
            <button type="button" class="btn-toggle-grade ${rec.isCorrect ? "active-correct" : ""}" 
                    onclick="window.game.r3ToggleTeamCorrect(${rec.teamId}, true)" 
                    ${this.r3HasAwardedPoints ? "disabled" : ""}>Đúng</button>
            <button type="button" class="btn-toggle-grade ${!rec.isCorrect ? "active-wrong" : ""}" 
                    onclick="window.game.r3ToggleTeamCorrect(${rec.teamId}, false)" 
                    ${this.r3HasAwardedPoints ? "disabled" : ""}>Sai</button>
          </div>
          <div class="speed-expected-pts">
            ${this.r3HasAwardedPoints 
              ? `<span class="pts-final">+${rec.awardedPoints}đ</span>` 
              : `<span class="pts-preview">${rec.isCorrect ? `+${expectedPts}đ` : `0đ`}</span>`}
          </div>
        </div>
      `;
    }).join("");

    const questions = this.data.round3.questions || [];
    const currentQ = questions[this.currentQuestionIdx];
    const fixedPts = currentQ ? currentQ.points : 20;

    this.r3SpeedRanking.innerHTML = `
      <div class="speed-ranking-list">
        ${rowsHtml}
      </div>
      <div class="speed-submit-actions">
        <button type="button" class="btn-action btn-award-olympia" onclick="window.game.r3AwardOlympiaPoints()" ${this.r3HasAwardedPoints ? "disabled" : ""}>
          Trao điểm chuẩn Olympia (40-30-20-10)
        </button>
        <button type="button" class="btn-action btn-award-fixed" onclick="window.game.r3AwardFixedPoints(${fixedPts})" ${this.r3HasAwardedPoints ? "disabled" : ""}>
          Cộng đều +${fixedPts}đ cho đội đúng
        </button>
      </div>
    `;
  }

  selectAnswerRound3(selectedIdx, cardEl, question) {
    this.stopTimer();
    const cards = this.r3AnswersContainer.querySelectorAll(".answer-card");
    cards.forEach((c) => c.classList.add("disabled"));

    const isCorrect = selectedIdx === question.correct;
    if (isCorrect) {
      cardEl.classList.add("correct");
      soundEngine.playCorrect();
      this.showToast(`ĐÁP ÁN ĐÚNG! Thầy cô hãy đối chiếu đáp án của 4 đội.`);
    } else {
      cardEl.classList.add("wrong");
      soundEngine.playWrong();
      if (cards[question.correct]) {
        cards[question.correct].classList.add("correct");
      }
      this.showToast("CHƯA CHÍNH XÁC!");
    }
  }

  r3GradeCorrect() {
    this.stopTimer();
    const questions = this.data.round3.questions || [];
    const currentQ = questions[this.currentQuestionIdx];
    const pts = currentQ ? currentQ.points : 20;
    this.adjustScore(this.currentTeamTurn, pts);
    this.showToast(`ĐÚNG! +${pts} điểm cho ${this.data.teams.find((t) => t.id === this.currentTeamTurn).name}!`);
    if (currentQ) this.revealAnswer(this.r3AnswersContainer, currentQ);
  }

  r3GradeWrong() {
    this.stopTimer();
    soundEngine.playWrong();
    this.showToast("CHƯA CHÍNH XÁC!");
  }

  r3RevealAnswer() {
    const questions = this.data.round3.questions || [];
    const currentQ = questions[this.currentQuestionIdx];
    if (currentQ) {
      this.revealAnswer(this.r3AnswersContainer, currentQ);
      this.showToast(`Giải thích: ${currentQ.explanation}`);
    }
  }

  r3NextQuestion() {
    const questions = this.data.round3.questions || [];
    if (this.currentQuestionIdx < questions.length - 1) {
      this.currentQuestionIdx++;
      this.renderRound3();
    } else {
      this.showToast("Đã hoàn thành vòng thi TĂNG TỐC!");
      this.openLeaderboard();
    }
  }

  r3PrevQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.renderRound3();
    }
  }

  // =========================================================================
  // VÒNG 4: VỀ ĐÍCH
  // =========================================================================
  renderRound4() {
    const currentTeam = this.data.teams.find((t) => t.id === this.currentTeamTurn);
    if (this.r4TeamBadge) {
      this.r4TeamBadge.innerText = `ĐỘI THI: ${currentTeam.name.toUpperCase()}`;
      this.r4TeamBadge.style.color = currentTeam.color;
    }

    const pack = this.data.round4.questionPacks[this.selectedPackPoints] || [];
    const currentQ = pack[this.currentQuestionIdx % pack.length];

    if (this.r4PointsBadge) {
      this.r4PointsBadge.innerText = `GÓI ${this.selectedPackPoints} ĐIỂM (CÂU ${(this.currentQuestionIdx % 3) + 1}/3)`;
    }

    if (!currentQ) return;
    this.r4QuestionText.innerText = currentQ.question;

    this.r4AnswersContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    currentQ.options.forEach((opt, idx) => {
      const card = document.createElement("div");
      card.className = "answer-card";
      card.innerHTML = `<span class="ans-letter">${letters[idx]}.</span> <span>${opt.replace(/^[A-D]\.\s*/, "")}</span>`;

      card.addEventListener("click", () => {
        this.selectAnswerRound4(idx, card, currentQ);
      });
      this.r4AnswersContainer.appendChild(card);
    });

    this.updateStarButton();

    this.startTimer(
      currentQ.timeLimit || 20,
      this.r4TimerNum,
      this.r4TimerRing,
      this.r4TimerBox,
      () => {
        this.showToast("Hết thời gian Về đích!");
      }
    );
  }

  toggleStarOfHope() {
    this.starOfHopeActive = !this.starOfHopeActive;
    if (this.starOfHopeActive) {
      soundEngine.playStarSound();
      this.showToast("ĐÃ ĐẶT NGÔI SAO HY VỌNG! Đúng nhân đôi điểm, Sai bị trừ điểm!");
    } else {
      this.showToast("Đã hủy Ngôi sao hy vọng");
    }
    this.updateStarButton();
  }

  updateStarButton() {
    if (!this.r4StarBtn) return;
    if (this.starOfHopeActive) {
      this.r4StarBtn.style.background = "#DC2626";
      this.r4StarBtn.innerHTML = "Ngôi Sao Đang Bật (x2)";
    } else {
      this.r4StarBtn.style.background = "#D97706";
      this.r4StarBtn.innerHTML = "Đặt Ngôi Sao Hy Vọng";
    }
  }

  selectAnswerRound4(selectedIdx, cardEl, question) {
    this.stopTimer();
    const cards = this.r4AnswersContainer.querySelectorAll(".answer-card");
    cards.forEach((c) => c.classList.add("disabled"));

    const isCorrect = selectedIdx === question.correct;
    const basePoints = question.points || this.selectedPackPoints;
    const pointsAwarded = this.starOfHopeActive ? basePoints * 2 : basePoints;

    if (isCorrect) {
      cardEl.classList.add("correct");
      soundEngine.playCorrect();
      this.adjustScore(this.currentTeamTurn, pointsAwarded);
      this.showToast(`CHÍNH XÁC! +${pointsAwarded} ĐIỂM!`);
    } else {
      cardEl.classList.add("wrong");
      soundEngine.playWrong();
      if (cards[question.correct]) {
        cards[question.correct].classList.add("correct");
      }
      if (this.starOfHopeActive) {
        this.adjustScore(this.currentTeamTurn, -basePoints);
        this.showToast(`SAI NGÔI SAO HY VỌNG: Trừ ${basePoints} điểm!`);
      } else {
        this.showToast("CHƯA CHÍNH XÁC! Các đội khác có thể bấm chuông giành quyền!");
      }
    }
    this.starOfHopeActive = false;
    this.updateStarButton();
  }

  r4GradeCorrect() {
    this.stopTimer();
    const basePts = this.selectedPackPoints;
    const pts = this.starOfHopeActive ? basePts * 2 : basePts;
    this.adjustScore(this.currentTeamTurn, pts);
    this.showToast(`ĐÚNG! +${pts} điểm cho ${this.data.teams.find((t) => t.id === this.currentTeamTurn).name}!`);
    const pack = this.data.round4.questionPacks[this.selectedPackPoints] || [];
    const currentQ = pack[this.currentQuestionIdx % pack.length];
    if (currentQ) this.revealAnswer(this.r4AnswersContainer, currentQ);
    this.starOfHopeActive = false;
    this.updateStarButton();
  }

  r4GradeWrong() {
    this.stopTimer();
    soundEngine.playWrong();
    const basePts = this.selectedPackPoints;
    if (this.starOfHopeActive) {
      this.adjustScore(this.currentTeamTurn, -basePts);
      this.showToast(`SAI NGÔI SAO HY VỌNG: Trừ ${basePts} điểm!`);
    } else {
      this.showToast("CHƯA CHÍNH XÁC! Các đội khác có 5 giây để bấm chuông cướp điểm!");
    }
    this.starOfHopeActive = false;
    this.updateStarButton();
  }

  r4RevealAnswer() {
    const pack = this.data.round4.questionPacks[this.selectedPackPoints] || [];
    const currentQ = pack[this.currentQuestionIdx % pack.length];
    if (currentQ) {
      this.revealAnswer(this.r4AnswersContainer, currentQ);
      this.showToast(`Giải thích: ${currentQ.explanation}`);
    }
  }

  r4SelectPack(points) {
    this.selectedPackPoints = points;
    this.currentQuestionIdx = 0;
    this.starOfHopeActive = false;
    this.renderRound4();
    this.showToast(`Đã chọn gói câu hỏi ${points} điểm`);
  }

  r4NextQuestion() {
    this.currentQuestionIdx++;
    this.starOfHopeActive = false;
    if (this.currentQuestionIdx % 3 === 0) {
      this.showToast(`Đã hoàn thành phần thi Về đích của ${this.data.teams.find((t) => t.id === this.currentTeamTurn).name}!`);
      if (this.currentTeamTurn < 4) {
        this.setTeamTurn(this.currentTeamTurn + 1);
      } else {
        this.switchRound(5);
      }
    } else {
      this.renderRound4();
    }
  }

  revealAnswer(container, question) {
    if (!container || !question) return;
    const cards = container.querySelectorAll(".answer-card");
    if (cards[question.correct]) {
      cards[question.correct].classList.add("correct");
    }
  }

  // =========================================================================
  // VIEW 5: CHUNG KẾT & TRAO GIẢI
  // =========================================================================
  renderFinale() {
    soundEngine.playVictory();
    this.startFireworks();

    const sortedTeams = [...this.data.teams].sort((a, b) => b.score - a.score);
    const champion = sortedTeams[0];

    const champTitle = document.getElementById("finale-winner-name");
    if (champTitle) {
      champTitle.innerText = `CHÚC MỪNG NHÀ VÔ ĐỊCH: ${champion.name.toUpperCase()} (${champion.score} ĐIỂM)!`;
    }

    const podiumMap = {
      1: { elId: "podium-1", rank: 1, team: sortedTeams[0] },
      2: { elId: "podium-2", rank: 2, team: sortedTeams[1] },
      3: { elId: "podium-3", rank: 3, team: sortedTeams[2] },
      4: { elId: "podium-4", rank: 4, team: sortedTeams[3] }
    };

    Object.values(podiumMap).forEach((p) => {
      const col = document.getElementById(p.elId);
      if (col && p.team) {
        col.querySelector(".podium-team-name").innerText = p.team.name;
        col.querySelector(".podium-score-pill").innerText = `${p.team.score} ĐIỂM`;
      }
    });
  }

  // =========================================================================
  // FIREWORKS SIMULATION (CANVAS)
  // =========================================================================
  startFireworks() {
    if (!this.fireworksCanvas) return;
    const canvas = this.fireworksCanvas;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    this.fireworks = [];
    const colors = ["#ffd700", "#ff3366", "#00d2ff", "#34d399", "#ffaa00", "#ffffff"];

    const createParticle = (x, y, color) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3 + 2
      };
    };

    const launchBurst = () => {
      const x = Math.random() * (canvas.width - 200) + 100;
      const y = Math.random() * (canvas.height * 0.5) + 50;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 40; i++) {
        this.fireworks.push(createParticle(x, y, color));
      }
    };

    let frameCount = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frameCount % 25 === 0) {
        launchBurst();
      }
      frameCount++;

      for (let i = this.fireworks.length - 1; i >= 0; i--) {
        const p = this.fireworks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.fireworks.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      this.fireworksAnimId = requestAnimationFrame(loop);
    };

    this.stopFireworks();
    loop();
  }

  stopFireworks() {
    if (this.fireworksAnimId) {
      cancelAnimationFrame(this.fireworksAnimId);
      this.fireworksAnimId = null;
    }
    if (this.fireworksCanvas) {
      const ctx = this.fireworksCanvas.getContext("2d");
      ctx.clearRect(0, 0, this.fireworksCanvas.width, this.fireworksCanvas.height);
    }
  }

  // =========================================================================
  // MODALS & TEACHER SETTINGS
  // =========================================================================
  openLeaderboard() {
    const list = document.getElementById("leaderboard-content-list");
    if (!list) return;

    list.innerHTML = "";
    const sorted = [...this.data.teams].sort((a, b) => b.score - a.score);

    const ranks = ["Hạng 1", "Hạng 2", "Hạng 3", "Hạng 4"];
    sorted.forEach((team, idx) => {
      const row = document.createElement("div");
      row.className = `leaderboard-row rank-${idx + 1}`;
      row.innerHTML = `
        <div class="lb-rank">${ranks[idx]}</div>
        <div class="lb-team" style="color: ${team.color}">
          <span class="team-badge-avatar" style="background:${team.color}">${team.id}</span>
          <span>${team.name}</span>
        </div>
        <div class="lb-score">${team.score} ĐIỂM</div>
      `;
      list.appendChild(row);
    });

    this.modalLeaderboard.classList.add("open");
  }

  openSettings(tab = 'event') {
    if (!this.isAuthenticated()) {
      this.openLoginModal();
      return;
    }
    this.selectedSettingsEventId = questionManager.state.activeEventId;
    const activeEvt = questionManager.getActiveEvent();
    this.selectedSettingsBankId = activeEvt ? activeEvt.questionBankId : 'bank_tong_hop';

    this.populateSettingsData();
    if (typeof window.showSettingsTab === 'function') {
      window.showSettingsTab(tab);
    }
    this.modalSettings.classList.add("open");
  }

  closeModals() {
    this.modalLeaderboard.classList.remove("open");
    this.modalSettings.classList.remove("open");
    if (this.isAuthenticated() && this.modalLogin) {
      this.modalLogin.classList.remove("open");
    }
  }

  // =========================================================================
  // XÁC THỰC & ĐĂNG NHẬP (AUTHENTICATION)
  // =========================================================================
  isAuthenticated() {
    return localStorage.getItem("olympia_logged_in") === "true";
  }

  initAuth() {
    if (!this.isAuthenticated()) {
      this.openLoginModal();
    }
    this.updateAuthUI();
  }

  openLoginModal() {
    if (this.modalLogin) {
      this.modalLogin.classList.add("open");
      const userIn = document.getElementById("login-username");
      if (userIn && !userIn.value) userIn.value = "admin";
      const passIn = document.getElementById("login-password");
      if (passIn && !passIn.value) passIn.value = "admin";
      if (this.loginErrorMsg) this.loginErrorMsg.style.display = "none";
    }
  }

  closeLoginModal() {
    if (this.modalLogin) {
      this.modalLogin.classList.remove("open");
    }
  }

  handleLogin() {
    const userIn = document.getElementById("login-username");
    const passIn = document.getElementById("login-password");
    const errorEl = document.getElementById("login-error-msg");

    const username = (userIn ? userIn.value : "").trim();
    const password = (passIn ? passIn.value : "").trim();

    // Mặc định username/admin: admin / admin
    if (username.toLowerCase() === "admin" && password === "admin") {
      localStorage.setItem("olympia_logged_in", "true");
      localStorage.setItem("olympia_user", username);
      if (errorEl) errorEl.style.display = "none";
      this.closeLoginModal();
      this.updateAuthUI();
      soundEngine.init();
      soundEngine.playCorrect();
      this.showToast(`Đăng nhập thành công! Xin chào ${username}!`);
    } else {
      soundEngine.playWrong();
      if (errorEl) {
        errorEl.innerText = "Tên đăng nhập hoặc mật khẩu chưa đúng! (Mặc định: admin / admin)";
        errorEl.style.display = "block";
      }
      this.showToast("Sai thông tin đăng nhập! Mặc định là admin/admin");
    }
  }

  logout() {
    localStorage.removeItem("olympia_logged_in");
    this.updateAuthUI();
    this.showToast("Đã đăng xuất khỏi phiên làm việc!");
    this.openLoginModal();
  }

  updateAuthUI() {
    const logged = this.isAuthenticated();
    const userName = localStorage.getItem("olympia_user") || "admin";
    if (this.currentUserNameEl) {
      this.currentUserNameEl.innerText = userName;
    }
    if (this.userProfileBadge) {
      this.userProfileBadge.style.display = logged ? "inline-flex" : "none";
    }
  }

  // =========================================================================
  // PRE-GAME CONSOLE & EVENT / QUESTION BANK MANAGEMENT
  // =========================================================================
  setupPregameConsole() {
    const events = questionManager.getEvents();
    const activeEvt = questionManager.getActiveEvent();
    const banks = questionManager.getQuestionBanks();

    if (this.pregameEventSelect) {
      this.pregameEventSelect.innerHTML = events.map(e => 
        `<option value="${e.id}" ${e.id === activeEvt.id ? 'selected' : ''}>${e.title} (${e.subject || 'Tổng hợp'})</option>`
      ).join("");
    }

    if (this.pregameBankSelect) {
      this.pregameBankSelect.innerHTML = banks.map(b => 
        `<option value="${b.id}" ${b.id === activeEvt.questionBankId ? 'selected' : ''}>${b.title} [${b.subject || ''}]</option>`
      ).join("");
    }

    if (this.pregameTeamInputs && activeEvt.teams) {
      this.pregameTeamInputs.forEach((input, idx) => {
        if (input && activeEvt.teams[idx]) {
          input.value = activeEvt.teams[idx].name;
        }
      });
    }
  }

  handleSelectEvent(eventId) {
    questionManager.selectEvent(eventId);
    this.data = questionManager.data;
    this.updateHeaderInfo();
    this.updateTeamPedestals();
    this.setupPregameConsole();
    const evt = questionManager.getActiveEvent();
    this.showToast(`Đã chuyển sang sự kiện: ${evt.title}`);
  }

  handleSelectBank(bankId) {
    const activeEvt = questionManager.getActiveEvent();
    questionManager.updateEvent(activeEvt.id, { questionBankId: bankId });
    this.data = questionManager.assembleCurrentGameData();
    this.updateHeaderInfo();
    const bank = questionManager.getQuestionBank(bankId);
    this.showToast(`Đã gắn bộ đề: ${bank ? bank.title : bankId}`);
  }

  updateQuickTeam(teamId, newName) {
    const trimmed = (newName || "").trim();
    if (!trimmed) return;
    const activeEvt = questionManager.getActiveEvent();
    const t = activeEvt.teams.find(item => item.id === teamId);
    if (t) {
      t.name = trimmed;
      questionManager.saveWorkspace();
      this.data = questionManager.assembleCurrentGameData();
      this.updateTeamPedestals();
      this.triggerBackgroundCloudSync();
      this.showToast(`Đã cập nhật Đội ${teamId}: ${trimmed}`);
    }
  }

  populateSettingsData() {
    const events = questionManager.getEvents();
    const banks = questionManager.getQuestionBanks();
    const currentEvtId = this.selectedSettingsEventId || questionManager.state.activeEventId;
    const currentEvt = events.find(e => e.id === currentEvtId) || events[0];
    this.selectedSettingsEventId = currentEvt ? currentEvt.id : null;

    // 1. Tab Event: Điền danh sách Sự kiện & Bộ đề gắn kèm
    if (this.setEventListSelect) {
      this.setEventListSelect.innerHTML = events.map(e =>
        `<option value="${e.id}" ${e.id === currentEvt.id ? 'selected' : ''}>${e.title}</option>`
      ).join("");
    }

    if (this.setEventBankSelect) {
      this.setEventBankSelect.innerHTML = banks.map(b =>
        `<option value="${b.id}" ${b.id === currentEvt.questionBankId ? 'selected' : ''}>${b.title} [${b.subject || ''}]</option>`
      ).join("");
    }

    if (this.setGameTitle) this.setGameTitle.value = currentEvt.title || "";
    if (this.setSubject) this.setSubject.value = currentEvt.subject || "";
    if (this.setGrade) this.setGrade.value = currentEvt.grade || "";
    if (this.setTopic) this.setTopic.value = currentEvt.topic || "";

    // 2. Tab Bank: Điền danh sách Bộ đề thi trong Studio
    if (!this.selectedSettingsBankId || !questionManager.getQuestionBank(this.selectedSettingsBankId)) {
      this.selectedSettingsBankId = currentEvt.questionBankId || banks[0].id;
    }
    const currentBank = questionManager.getQuestionBank(this.selectedSettingsBankId) || banks[0];
    this.selectedSettingsBankId = currentBank.id;

    if (this.setBankStudioSelect) {
      this.setBankStudioSelect.innerHTML = banks.map(b =>
        `<option value="${b.id}" ${b.id === currentBank.id ? 'selected' : ''}>${b.title} (${b.subject || 'Đề thi'})</option>`
      ).join("");
    }

    if (this.bankTitleInput) this.bankTitleInput.value = currentBank.title || "";
    if (this.bankSubjectInput) this.bankSubjectInput.value = currentBank.subject || "";
    if (this.bankGradeInput) this.bankGradeInput.value = currentBank.grade || "";

    // 3. Tab Teams: Điền tên và điểm 4 đội
    for (let i = 1; i <= 4; i++) {
      const nameInput = document.getElementById(`set-team-${i}`);
      const scoreInput = document.getElementById(`set-score-${i}`);
      const teamObj = currentEvt.teams ? currentEvt.teams.find(t => t.id === i) : null;
      if (nameInput && teamObj) nameInput.value = teamObj.name || `Đội ${i}`;
      if (scoreInput && teamObj) scoreInput.value = teamObj.score || 0;
    }

    // 4. Tab JSON: Điền chuỗi JSON
    const jsonArea = document.getElementById("set-json-area");
    if (jsonArea) jsonArea.value = questionManager.exportJSON();

    // 5. Tab Firebase
    this.populateFirebaseSettings();

    this.renderVisualQuestionEditor();
  }

  // =========================================================================
  // FIREBASE CLOUD SYNC CONTROLS
  // =========================================================================
  initFirebase() {
    firebaseSync.onStatusChange((status, msg) => {
      this.handleCloudStatusChange(status, msg);
    });

    if (firebaseSync.isConfigured()) {
      firebaseSync.testConnection();
    } else {
      this.handleCloudStatusChange("unconfigured", "Ngoại tuyến (Chưa cấu hình Firebase)");
    }
  }

  handleCloudStatusChange(status, message) {
    if (this.cloudStatusDot) {
      this.cloudStatusDot.className = `cloud-status-dot dot-${status}`;
    }
    if (this.cloudStatusText) {
      if (status === 'connected') {
        this.cloudStatusText.innerText = "Đã đồng bộ";
      } else if (status === 'syncing') {
        this.cloudStatusText.innerText = "Đang đồng bộ...";
      } else if (status === 'error') {
        this.cloudStatusText.innerText = "Lỗi kết nối";
      } else {
        this.cloudStatusText.innerText = "Ngoại tuyến";
      }
    }

    if (this.fbBannerDot) {
      this.fbBannerDot.className = `cloud-banner-dot dot-${status}`;
    }
    if (this.fbBannerText) {
      this.fbBannerText.innerText = `Trạng thái: ${message || status}`;
    }
  }

  populateFirebaseSettings() {
    if (this.fbDatabaseUrl) this.fbDatabaseUrl.value = firebaseSync.config.databaseURL || "";
    if (this.fbWorkspaceKey) this.fbWorkspaceKey.value = firebaseSync.config.workspaceKey || "olympia_lop_hoc";
    if (this.fbAuthSecret) this.fbAuthSecret.value = firebaseSync.config.authSecret || "";
  }

  async testFirebaseConnection() {
    if (this.fbDatabaseUrl) {
      firebaseSync.saveConfig({
        databaseURL: this.fbDatabaseUrl.value,
        workspaceKey: this.fbWorkspaceKey ? this.fbWorkspaceKey.value : "olympia_lop_hoc",
        authSecret: this.fbAuthSecret ? this.fbAuthSecret.value : ""
      });
    }

    const res = await firebaseSync.testConnection();
    if (res.success) {
      this.showToast("Kết nối Google Firebase thành công!");
    } else {
      alert("Không thể kết nối Firebase: " + res.error);
    }
  }

  async saveFirebaseConfigAndPush() {
    if (this.fbDatabaseUrl) {
      firebaseSync.saveConfig({
        databaseURL: this.fbDatabaseUrl.value,
        workspaceKey: this.fbWorkspaceKey ? this.fbWorkspaceKey.value : "olympia_lop_hoc",
        authSecret: this.fbAuthSecret ? this.fbAuthSecret.value : ""
      });
    }

    const res = await firebaseSync.pushWorkspaceToCloud(questionManager.state);
    if (res.success) {
      this.showToast("Đã lưu cấu hình và đẩy toàn bộ đề thi lên Đám mây!");
    } else {
      alert("Lỗi khi đẩy lên Đám mây: " + res.error);
    }
  }

  async pullFromFirebase() {
    if (!firebaseSync.isConfigured()) {
      alert("Vui lòng nhập Database URL của Firebase trước khi tải!");
      return;
    }

    if (confirm("Tải dữ liệu mới nhất từ Firebase về máy? (Dữ liệu trên máy sẽ được cập nhật)")) {
      const res = await firebaseSync.pullWorkspaceFromCloud();
      if (res.success && res.data) {
        questionManager.importJSON(JSON.stringify(res.data));
        this.data = questionManager.assembleCurrentGameData();
        this.selectedSettingsEventId = questionManager.state.activeEventId;
        this.selectedSettingsBankId = questionManager.getActiveEvent().questionBankId;
        this.updateHeaderInfo();
        this.updateTeamPedestals();
        this.setupPregameConsole();
        this.populateSettingsData();
        this.showToast("Đã tải dữ liệu thành công từ Firebase Đám mây!");
      } else {
        alert("Lỗi tải từ Firebase: " + res.error);
      }
    }
  }

  triggerBackgroundCloudSync() {
    if (firebaseSync && firebaseSync.isConfigured()) {
      firebaseSync.pushWorkspaceToCloud(questionManager.state).catch(() => {});
    }
  }

  handleSettingsEventSelect(eventId) {
    this.selectedSettingsEventId = eventId;
    this.populateSettingsData();
  }

  handleCreateNewEvent() {
    const title = prompt("Nhập tên Sự kiện / Trận đấu mới:", "Hội thi Olympia Tuần mới");
    if (!title || !title.trim()) return;

    const newEvt = questionManager.createEvent({
      title: title.trim(),
      subject: "Kiến thức",
      grade: "Tiểu học",
      topic: "",
      questionBankId: "bank_tong_hop"
    });
    this.selectedSettingsEventId = newEvt.id;
    this.data = questionManager.data;
    this.updateHeaderInfo();
    this.updateTeamPedestals();
    this.setupPregameConsole();
    this.populateSettingsData();
    this.showToast(`Đã tạo sự kiện mới: ${newEvt.title}`);
  }

  handleDuplicateEvent() {
    const currentEvtId = this.selectedSettingsEventId || questionManager.state.activeEventId;
    const currentEvt = questionManager.state.events.find(e => e.id === currentEvtId);
    if (!currentEvt) return;

    const newTitle = prompt("Nhập tên cho sự kiện nhân bản:", `${currentEvt.title} (Bản sao)`);
    if (!newTitle || !newTitle.trim()) return;

    const cloned = questionManager.createEvent({
      title: newTitle.trim(),
      subject: currentEvt.subject,
      grade: currentEvt.grade,
      topic: currentEvt.topic,
      questionBankId: currentEvt.questionBankId,
      teams: JSON.parse(JSON.stringify(currentEvt.teams))
    });
    this.selectedSettingsEventId = cloned.id;
    this.data = questionManager.data;
    this.updateHeaderInfo();
    this.updateTeamPedestals();
    this.setupPregameConsole();
    this.populateSettingsData();
    this.showToast(`Đã nhân bản sự kiện: ${cloned.title}`);
  }

  handleDeleteEvent() {
    const currentEvtId = this.selectedSettingsEventId || questionManager.state.activeEventId;
    const currentEvt = questionManager.state.events.find(e => e.id === currentEvtId);
    if (!currentEvt) return;

    if (questionManager.state.events.length <= 1) {
      alert("Không thể xóa sự kiện duy nhất còn lại trong hệ thống!");
      return;
    }

    if (confirm(`Bạn có chắc chắn muốn xóa sự kiện "${currentEvt.title}" không?`)) {
      questionManager.deleteEvent(currentEvtId);
      this.selectedSettingsEventId = questionManager.state.activeEventId;
      this.data = questionManager.data;
      this.updateHeaderInfo();
      this.updateTeamPedestals();
      this.setupPregameConsole();
      this.populateSettingsData();
      this.showToast("Đã xóa sự kiện thành công!");
    }
  }

  handleSettingsBankSelect(bankId) {
    this.selectedSettingsBankId = bankId;
    const bank = questionManager.getQuestionBank(bankId);
    if (bank) {
      if (this.bankTitleInput) this.bankTitleInput.value = bank.title || "";
      if (this.bankSubjectInput) this.bankSubjectInput.value = bank.subject || "";
      if (this.bankGradeInput) this.bankGradeInput.value = bank.grade || "";
    }
    this.renderVisualQuestionEditor();
  }

  handleCreateNewBank() {
    const title = prompt("Nhập tên Bộ đề thi mới:", "Bộ đề thi Olympia Mới");
    if (!title || !title.trim()) return;

    const baseBankId = this.selectedSettingsBankId || "bank_tong_hop";
    const newBank = questionManager.createQuestionBank({
      title: title.trim(),
      subject: "Kiến thức",
      grade: "Tiểu học",
      topic: "",
      templateBankId: baseBankId
    });

    this.selectedSettingsBankId = newBank.id;
    this.populateSettingsData();
    this.renderVisualQuestionEditor();
    this.showToast(`Đã tạo bộ đề mới: ${newBank.title}`);
  }

  handleDuplicateBank() {
    const currentBankId = this.selectedSettingsBankId || "bank_tong_hop";
    const currentBank = questionManager.getQuestionBank(currentBankId);
    if (!currentBank) return;

    const newTitle = prompt("Nhập tên cho bộ đề nhân bản:", `${currentBank.title} (Bản sao)`);
    if (!newTitle || !newTitle.trim()) return;

    const clonedBank = questionManager.createQuestionBank({
      title: newTitle.trim(),
      subject: currentBank.subject,
      grade: currentBank.grade,
      topic: currentBank.topic,
      templateBankId: currentBankId
    });

    this.selectedSettingsBankId = clonedBank.id;
    this.populateSettingsData();
    this.renderVisualQuestionEditor();
    this.showToast(`Đã nhân bản bộ đề: ${clonedBank.title}`);
  }

  updateSelectedBankMeta() {
    const bankId = this.selectedSettingsBankId;
    const bank = questionManager.getQuestionBank(bankId);
    if (!bank) return;

    if (this.bankTitleInput) bank.title = this.bankTitleInput.value.trim() || bank.title;
    if (this.bankSubjectInput) bank.subject = this.bankSubjectInput.value.trim() || bank.subject;
    if (this.bankGradeInput) bank.grade = this.bankGradeInput.value.trim() || bank.grade;

    questionManager.saveWorkspace();
    this.setupPregameConsole();
  }

  resetTeamScores() {
    if (confirm("Đặt lại điểm số của cả 4 đội về 0 điểm?")) {
      const currentEvtId = this.selectedSettingsEventId || questionManager.state.activeEventId;
      const currentEvt = questionManager.state.events.find(e => e.id === currentEvtId);
      if (currentEvt && currentEvt.teams) {
        currentEvt.teams.forEach(t => t.score = 0);
      }
      for (let i = 1; i <= 4; i++) {
        const scoreInput = document.getElementById(`set-score-${i}`);
        if (scoreInput) scoreInput.value = 0;
      }
      questionManager.saveWorkspace();
      this.data = questionManager.assembleCurrentGameData();
      this.updateTeamPedestals();
      this.showToast("Đã đặt lại điểm 4 đội về 0!");
    }
  }

  saveSettings() {
    const currentEvtId = this.selectedSettingsEventId || questionManager.state.activeEventId;
    const currentEvt = questionManager.state.events.find(e => e.id === currentEvtId);

    if (currentEvt) {
      if (this.setGameTitle) currentEvt.title = this.setGameTitle.value.trim() || currentEvt.title;
      if (this.setEventBankSelect) currentEvt.questionBankId = this.setEventBankSelect.value;
      if (this.setSubject) currentEvt.subject = this.setSubject.value.trim() || currentEvt.subject;
      if (this.setGrade) currentEvt.grade = this.setGrade.value.trim() || currentEvt.grade;
      if (this.setTopic) currentEvt.topic = this.setTopic.value.trim() || "";

      for (let i = 1; i <= 4; i++) {
        const nameInput = document.getElementById(`set-team-${i}`);
        const scoreInput = document.getElementById(`set-score-${i}`);
        const t = currentEvt.teams ? currentEvt.teams.find(item => item.id === i) : null;
        if (t) {
          if (nameInput && nameInput.value.trim()) t.name = nameInput.value.trim();
          if (scoreInput) t.score = parseInt(scoreInput.value, 10) || 0;
        }
      }
    }

    this.updateSelectedBankMeta();
    questionManager.saveWorkspace();
    this.data = questionManager.assembleCurrentGameData();
    this.updateHeaderInfo();
    this.updateTeamPedestals();
    this.setupPregameConsole();
    this.triggerBackgroundCloudSync();
    this.closeModals();
    this.showToast("Đã lưu toàn bộ thiết lập Sự kiện & Đề thi thành công!");
  }

  importJSONSettings() {
    const jsonArea = document.getElementById("set-json-area");
    if (!jsonArea) return;
    const res = questionManager.importJSON(jsonArea.value);
    if (res.success) {
      this.data = questionManager.data;
      this.selectedSettingsEventId = questionManager.state.activeEventId;
      this.selectedSettingsBankId = questionManager.getActiveEvent().questionBankId;
      this.updateHeaderInfo();
      this.updateTeamPedestals();
      this.setupPregameConsole();
      this.populateSettingsData();
      this.closeModals();
      this.showToast("Đã nạp thành công dữ liệu từ file JSON!");
      this.switchRound(this.currentRound);
    } else {
      alert("Lỗi nạp dữ liệu: " + res.error);
    }
  }

  downloadJSONFile() {
    const jsonStr = questionManager.exportJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    const safeName = (this.data.subject || "olympia").toLowerCase().replace(/[^a-z0-9]/gi, "_");
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `olympia_workspace_${safeName}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
    this.showToast("Đã tải file câu hỏi & sự kiện về máy tính!");
  }

  handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const res = questionManager.importJSON(content);
      if (res.success) {
        this.data = questionManager.data;
        this.selectedSettingsEventId = questionManager.state.activeEventId;
        this.selectedSettingsBankId = questionManager.getActiveEvent().questionBankId;
        this.updateHeaderInfo();
        this.updateTeamPedestals();
        this.setupPregameConsole();
        this.populateSettingsData();
        this.showToast("Nạp file JSON thành công!");
        this.switchRound(this.currentRound);
      } else {
        alert("Lỗi khi đọc file JSON: " + res.error);
      }
    };
    reader.readAsText(file);
  }

  // --- QUESTION BANK EDITING HELPERS ---
  updateBankR1Question(bankId, teamId, qIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round1 && bank.round1.teamsQuestions[teamId] && bank.round1.teamsQuestions[teamId][qIdx]) {
      bank.round1.teamsQuestions[teamId][qIdx].question = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR1Option(bankId, teamId, qIdx, optIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round1 && bank.round1.teamsQuestions[teamId] && bank.round1.teamsQuestions[teamId][qIdx]) {
      bank.round1.teamsQuestions[teamId][qIdx].options[optIdx] = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR1Correct(bankId, teamId, qIdx, correctVal) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round1 && bank.round1.teamsQuestions[teamId] && bank.round1.teamsQuestions[teamId][qIdx]) {
      bank.round1.teamsQuestions[teamId][qIdx].correct = parseInt(correctVal, 10);
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR2Keyword(bankId, val) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round2) {
      bank.round2.keyword = (val || "").toUpperCase();
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR2Desc(bankId, val) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round2) {
      bank.round2.description = val;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR2Row(bankId, rIdx, field, val) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round2 && bank.round2.rows[rIdx]) {
      if (field === 'answer') {
        bank.round2.rows[rIdx].answer = (val || "").toUpperCase();
        bank.round2.rows[rIdx].length = (val || "").length;
      } else {
        bank.round2.rows[rIdx][field] = val;
      }
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR3Question(bankId, qIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round3 && bank.round3.questions[qIdx]) {
      bank.round3.questions[qIdx].question = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR3Option(bankId, qIdx, optIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round3 && bank.round3.questions[qIdx]) {
      bank.round3.questions[qIdx].options[optIdx] = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR3Correct(bankId, qIdx, correctVal) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round3 && bank.round3.questions[qIdx]) {
      bank.round3.questions[qIdx].correct = parseInt(correctVal, 10);
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR4Question(bankId, pts, qIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round4 && bank.round4.questionPacks[pts] && bank.round4.questionPacks[pts][qIdx]) {
      bank.round4.questionPacks[pts][qIdx].question = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR4Option(bankId, pts, qIdx, optIdx, text) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round4 && bank.round4.questionPacks[pts] && bank.round4.questionPacks[pts][qIdx]) {
      bank.round4.questionPacks[pts][qIdx].options[optIdx] = text;
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  updateBankR4Correct(bankId, pts, qIdx, correctVal) {
    const bank = questionManager.getQuestionBank(bankId);
    if (bank && bank.round4 && bank.round4.questionPacks[pts] && bank.round4.questionPacks[pts][qIdx]) {
      bank.round4.questionPacks[pts][qIdx].correct = parseInt(correctVal, 10);
      questionManager.saveWorkspace();
      if (this.data.questionBankId === bankId) this.data = questionManager.assembleCurrentGameData();
    }
  }

  renderVisualQuestionEditor() {
    const container = document.getElementById("editor-questions-list");
    const roundSelect = document.getElementById("editor-round-select");
    if (!container || !roundSelect) return;

    const round = roundSelect.value;
    container.innerHTML = "";

    const bankId = this.selectedSettingsBankId || (this.data ? this.data.questionBankId : 'bank_tong_hop');
    const bank = questionManager.getQuestionBank(bankId) || this.data;
    if (!bank) return;

    if (round === "1") {
      const teamsQuestions = (bank.round1 && bank.round1.teamsQuestions) || {};
      const teamColors = ["#c82333", "#1e40af", "#d97706", "#059669"];
      const teamNames = ["Đội 1", "Đội 2", "Đội 3", "Đội 4"];

      for (let teamId = 1; teamId <= 4; teamId++) {
        const qList = teamsQuestions[teamId] || [];
        const groupEl = document.createElement("div");
        groupEl.style.marginBottom = "14px";
        groupEl.innerHTML = `<h4 style="color:${teamColors[teamId - 1]}; margin-bottom:8px;">Câu hỏi cho ${teamNames[teamId - 1]} (5 câu):</h4>`;

        qList.forEach((q, qIdx) => {
          const item = document.createElement("div");
          item.style.background = "#f8fafc";
          item.style.padding = "10px";
          item.style.borderRadius = "8px";
          item.style.marginBottom = "8px";
          item.style.border = "1.5px solid #cbd5e1";

          item.innerHTML = `
            <div style="font-weight:bold; color:var(--blue-brand); margin-bottom:4px;">Câu ${qIdx + 1}:</div>
            <input type="text" class="form-input" style="margin-bottom:6px;" value="${(q.question || '').replace(/"/g, '&quot;')}" 
              oninput="window.game.updateBankR1Question('${bank.id}', ${teamId}, ${qIdx}, this.value)">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              ${(q.options || []).map((opt, optIdx) => `
                <input type="text" class="form-input" style="font-size:0.85rem;" value="${(opt || '').replace(/"/g, '&quot;')}"
                  oninput="window.game.updateBankR1Option('${bank.id}', ${teamId}, ${qIdx}, ${optIdx}, this.value)">
              `).join("")}
            </div>
            <div style="margin-top:6px; font-size:0.85rem; color:#475569; display:flex; align-items:center; gap:8px;">
              <span>Đáp án đúng:</span>
              <select class="form-select" style="width:auto; padding:4px 8px;" 
                onchange="window.game.updateBankR1Correct('${bank.id}', ${teamId}, ${qIdx}, this.value)">
                <option value="0" ${q.correct === 0 ? "selected" : ""}>A</option>
                <option value="1" ${q.correct === 1 ? "selected" : ""}>B</option>
                <option value="2" ${q.correct === 2 ? "selected" : ""}>C</option>
                <option value="3" ${q.correct === 3 ? "selected" : ""}>D</option>
              </select>
            </div>
          `;
          groupEl.appendChild(item);
        });
        container.appendChild(groupEl);
      }
    } else if (round === "2") {
      const r2 = bank.round2 || { keyword: "", description: "", rows: [] };
      const kwBox = document.createElement("div");
      kwBox.style.background = "#f8fafc";
      kwBox.style.padding = "12px";
      kwBox.style.borderRadius = "8px";
      kwBox.style.marginBottom = "14px";
      kwBox.style.border = "1.5px solid #cbd5e1";
      kwBox.innerHTML = `
        <h4 style="color:var(--blue-brand); margin-bottom:8px;">Từ Khóa Chướng Ngại Vật:</h4>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Từ khóa bí ẩn:</label>
            <input type="text" class="form-input" value="${r2.keyword || ''}"
              oninput="window.game.updateBankR2Keyword('${bank.id}', this.value)">
          </div>
          <div class="form-group">
            <label class="form-label">Gợi ý / Miêu tả:</label>
            <input type="text" class="form-input" value="${(r2.description || '').replace(/"/g, '&quot;')}"
              oninput="window.game.updateBankR2Desc('${bank.id}', this.value)">
          </div>
        </div>
      `;
      container.appendChild(kwBox);

      (r2.rows || []).forEach((row, rIdx) => {
        const rItem = document.createElement("div");
        rItem.style.background = "#f8fafc";
        rItem.style.padding = "10px";
        rItem.style.borderRadius = "8px";
        rItem.style.marginBottom = "8px";
        rItem.style.border = "1.5px solid #cbd5e1";
        rItem.innerHTML = `
          <h5 style="color:var(--blue-brand); margin-bottom:6px;">${row.name || `Hàng ngang ${rIdx + 1}`}:</h5>
          <div class="form-row" style="margin-bottom:6px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Đáp án hàng ngang:</label>
              <input type="text" class="form-input" value="${row.answer || ''}"
                oninput="window.game.updateBankR2Row('${bank.id}', ${rIdx}, 'answer', this.value)">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Giải thích sau khi mở:</label>
              <input type="text" class="form-input" value="${(row.explanation || '').replace(/"/g, '&quot;')}"
                oninput="window.game.updateBankR2Row('${bank.id}', ${rIdx}, 'explanation', this.value)">
            </div>
          </div>
          <div class="form-group" style="margin-top:6px; margin-bottom:0;">
            <label class="form-label">Câu hỏi gợi ý:</label>
            <input type="text" class="form-input" value="${(row.question || '').replace(/"/g, '&quot;')}"
              oninput="window.game.updateBankR2Row('${bank.id}', ${rIdx}, 'question', this.value)">
          </div>
        `;
        container.appendChild(rItem);
      });
    } else if (round === "3") {
      const qList = (bank.round3 && bank.round3.questions) || [];
      qList.forEach((q, qIdx) => {
        const item = document.createElement("div");
        item.style.background = "#f8fafc";
        item.style.padding = "10px";
        item.style.borderRadius = "8px";
        item.style.marginBottom = "10px";
        item.style.border = "1.5px solid #cbd5e1";
        item.innerHTML = `
          <div style="font-weight:bold; color:var(--blue-brand); margin-bottom:6px;">Câu ${qIdx + 1} (${q.points} Điểm - ${q.timeLimit || 30} Giây):</div>
          <input type="text" class="form-input" style="margin-bottom:6px;" value="${(q.question || '').replace(/"/g, '&quot;')}"
            oninput="window.game.updateBankR3Question('${bank.id}', ${qIdx}, this.value)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            ${(q.options || []).map((opt, optIdx) => `
              <input type="text" class="form-input" style="font-size:0.85rem;" value="${(opt || '').replace(/"/g, '&quot;')}"
                oninput="window.game.updateBankR3Option('${bank.id}', ${qIdx}, ${optIdx}, this.value)">
            `).join("")}
          </div>
          <div style="margin-top:6px; font-size:0.85rem; color:#475569; display:flex; align-items:center; gap:8px;">
            <span>Đáp án đúng:</span>
            <select class="form-select" style="width:auto; padding:4px 8px;"
              onchange="window.game.updateBankR3Correct('${bank.id}', ${qIdx}, this.value)">
              <option value="0" ${q.correct === 0 ? "selected" : ""}>A</option>
              <option value="1" ${q.correct === 1 ? "selected" : ""}>B</option>
              <option value="2" ${q.correct === 2 ? "selected" : ""}>C</option>
              <option value="3" ${q.correct === 3 ? "selected" : ""}>D</option>
            </select>
          </div>
        `;
        container.appendChild(item);
      });
    } else if (round === "4") {
      const packs = (bank.round4 && bank.round4.questionPacks) || {};
      [20, 30, 40].forEach((pts) => {
        const packList = packs[pts] || [];
        const groupEl = document.createElement("div");
        groupEl.style.marginBottom = "14px";
        groupEl.innerHTML = `<h4 style="color:var(--blue-brand); margin-bottom:8px;">Gói câu hỏi ${pts} Điểm:</h4>`;

        packList.forEach((q, qIdx) => {
          const item = document.createElement("div");
          item.style.background = "#f8fafc";
          item.style.padding = "10px";
          item.style.borderRadius = "8px";
          item.style.marginBottom = "8px";
          item.style.border = "1.5px solid #cbd5e1";
          item.innerHTML = `
            <div style="font-weight:bold; color:var(--blue-brand); margin-bottom:4px;">Câu ${qIdx + 1} (${pts}đ):</div>
            <input type="text" class="form-input" style="margin-bottom:6px;" value="${(q.question || '').replace(/"/g, '&quot;')}"
              oninput="window.game.updateBankR4Question('${bank.id}', ${pts}, ${qIdx}, this.value)">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
              ${(q.options || []).map((opt, optIdx) => `
                <input type="text" class="form-input" style="font-size:0.85rem;" value="${(opt || '').replace(/"/g, '&quot;')}"
                  oninput="window.game.updateBankR4Option('${bank.id}', ${pts}, ${qIdx}, ${optIdx}, this.value)">
              `).join("")}
            </div>
            <div style="margin-top:6px; font-size:0.85rem; color:#475569; display:flex; align-items:center; gap:8px;">
              <span>Đáp án đúng:</span>
              <select class="form-select" style="width:auto; padding:4px 8px;"
                onchange="window.game.updateBankR4Correct('${bank.id}', ${pts}, ${qIdx}, this.value)">
                <option value="0" ${q.correct === 0 ? "selected" : ""}>A</option>
                <option value="1" ${q.correct === 1 ? "selected" : ""}>B</option>
                <option value="2" ${q.correct === 2 ? "selected" : ""}>C</option>
                <option value="3" ${q.correct === 3 ? "selected" : ""}>D</option>
              </select>
            </div>
          `;
          groupEl.appendChild(item);
        });
        container.appendChild(groupEl);
      });
    }
  }

  resetAllGame() {
    if (confirm("Bạn có chắc chắn muốn đặt lại điểm số và chơi lại từ đầu không?")) {
      this.data.teams.forEach((t) => (t.score = 0));
      questionManager.saveData(this.data);
      this.currentTeamTurn = 1;
      this.currentQuestionIdx = 0;
      this.solvedRows = [false, false, false, false];
      this.revealedTiles = [false, false, false, false];
      this.obstacleSolved = false;
      this.starOfHopeActive = false;
      this.updateTeamPedestals();
      this.switchRound(0);
      this.showToast("Trò chơi đã được thiết lập lại từ đầu!");
    }
  }

  restoreDefaultQuestions() {
    if (confirm("Khôi phục toàn bộ các sự kiện và ngân hàng câu hỏi mẫu ban đầu?")) {
      this.data = questionManager.resetToDefault();
      this.selectedSettingsEventId = questionManager.state.activeEventId;
      this.selectedSettingsBankId = questionManager.getActiveEvent().questionBankId;
      this.updateHeaderInfo();
      this.updateTeamPedestals();
      this.setupPregameConsole();
      this.populateSettingsData();
      this.showToast("Đã khôi phục dữ liệu mẫu thành công!");
    }
  }
}
