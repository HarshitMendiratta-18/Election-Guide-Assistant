document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-simulation-btn');
  const container = document.getElementById('vote-container');

  startBtn?.addEventListener('click', () => {
    const voterId = document.getElementById('voter-id-input').value;
    if (!voterId) {
      alert("Please enter a Voter ID to start.");
      return;
    }

    // Phase 1: Authentication Simulation
    container.innerHTML = `
      <span class="material-symbols-outlined spin" style="font-size:48px; color:var(--accent-2);">sync</span>
      <h3 style="margin-top:24px;">Authenticating Voter ID...</h3>
      <p style="color:var(--text-muted);">Verifying details with Google Cloud Identity Hub</p>
    `;

    setTimeout(() => {
      showQueue();
    }, 2000);
  });

  function showQueue() {
    container.innerHTML = `
      <span class="material-symbols-outlined" style="font-size:48px; color:var(--accent-1);">groups</span>
      <h3 style="margin-top:24px;">Digital Queue Management</h3>
      <p style="color:var(--text-muted); margin-bottom:32px;">You are at position #2 in the polling booth.</p>
      <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
        <div style="width:70%; height:100%; background:var(--gradient-main); transition:width 2s ease-in-out;"></div>
      </div>
    `;
    
    setTimeout(() => {
      container.innerHTML += '<p style="margin-top:16px; color:#22c55e; font-weight:600;">Proceed to Officer Desk</p>';
      setTimeout(showEVM, 2000);
    }, 2000);
  }

  function showEVM() {
    container.innerHTML = `
      <div style="width:100%; border-bottom:1px solid var(--border-glass); padding-bottom:16px; margin-bottom:24px; text-align:left;">
        <h3 class="gradient-text">Electronic Voting Machine</h3>
        <p style="font-size:0.8rem; color:var(--text-muted);">SELECT ONE CANDIDATE / एक उम्मीदवार चुनें</p>
      </div>
      <div style="width:100%; display:grid; gap:12px;">
        ${['National Party A', 'Regional Party B', 'Democratic Alliance', 'Independent'].map((p, i) => `
          <button class="evm-row" style="display:flex; justify-content:space-between; align-items:center; width:100%; padding:16px; background:rgba(255,255,255,0.05); border:1px solid var(--border-glass); border-radius:12px; color:white; cursor:pointer; text-align:left;">
            <span>${i+1}. ${p}</span>
            <div style="width:24px; height:24px; border-radius:50%; border:2px solid var(--border-glass); display:flex; align-items:center; justify-content:center;">
              <div class="dot" style="width:12px; height:12px; border-radius:50%; background:var(--accent-3); opacity:0;"></div>
            </div>
          </button>
        `).join('')}
      </div>
      <button class="btn btn-primary" style="margin-top:32px; width:100%; justify-content:center; opacity:0.5;" id="vote-btn" disabled>Cast Vote / वोट डालें</button>
    `;
    
    const rows = container.querySelectorAll('.evm-row');
    const voteBtn = container.querySelector('#vote-btn');
    
    rows.forEach(row => {
      row.addEventListener('click', () => {
        rows.forEach(r => {
          r.style.borderColor = 'var(--border-glass)';
          r.querySelector('.dot').style.opacity = '0';
        });
        row.style.borderColor = 'var(--accent-1)';
        row.querySelector('.dot').style.opacity = '1';
        voteBtn.disabled = false;
        voteBtn.style.opacity = '1';
        
        // BEEP SOUND (Simulated)
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.frequency.value = 800;
        osc.start();
        setTimeout(() => osc.stop(), 100);
      });
    });

    voteBtn.addEventListener('click', () => {
      container.innerHTML = `
        <span class="material-symbols-outlined" style="font-size:64px; color:#22c55e;">check_circle</span>
        <h3 style="margin-top:24px;">Vote Recorded Successfully</h3>
        <p style="color:var(--text-muted); margin-bottom:32px;">Your receipt has been generated and secured via Google Cloud Storage.</p>
        <a href="/" class="btn btn-primary">Return Home</a>
      `;
    });
  }
});
