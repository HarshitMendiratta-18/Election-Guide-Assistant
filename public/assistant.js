/**
 * Election AI Assistant - Contextual Help System
 */
const Assistant = {
    tips: [
        "Did you know? You can verify your voter ID online via the NVSP portal.",
        "Remember to bring an original ID proof to the polling station.",
        "The VVPAT slip confirms your vote. Look for it through the glass!",
        "Voting is not just a right, it's a responsibility. Be the change!",
        "Struggling to find your booth? Use our Booth Finder tool!"
    ],
    init() {
        this.createUI();
        this.startTips();
    },
    createUI() {
        const bubble = document.createElement('div');
        bubble.id = 'ai-assistant';
        bubble.innerHTML = `
            <div class="assistant-trigger" onclick="Assistant.toggle()">
                <span class="material-symbols-outlined">smart_toy</span>
            </div>
            <div class="assistant-panel" id="assistant-panel" style="display:none;">
                <div class="assistant-header">
                    <strong>Election Assistant</strong>
                    <span class="material-symbols-outlined" onclick="Assistant.toggle()" style="cursor:pointer; font-size:18px;">close</span>
                </div>
                <div class="assistant-body">
                    <p id="assistant-text">Hello! I'm here to help you navigate the election process.</p>
                </div>
            </div>
        `;
        document.body.appendChild(bubble);
        this.injectStyles();
    },
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #ai-assistant {
                position: fixed; bottom: 30px; right: 30px; z-index: 9999;
            }
            .assistant-trigger {
                width: 60px; height: 60px; border-radius: 50%;
                background: var(--gradient-main); color: white;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; box-shadow: 0 4px 20px rgba(129, 140, 248, 0.4);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .assistant-trigger:hover { transform: scale(1.1) rotate(5deg); }
            .assistant-panel {
                position: absolute; bottom: 80px; right: 0; width: 300px;
                background: var(--bg-glass); backdrop-filter: blur(20px);
                border: 1px solid var(--border-glass); border-radius: 18px;
                overflow: hidden; box-shadow: var(--shadow-glow);
                animation: slideIn 0.3s ease;
            }
            .assistant-header {
                padding: 15px; background: rgba(129, 140, 248, 0.2);
                display: flex; justify-content: space-between; align-items: center;
            }
            .assistant-body { padding: 20px; font-size: 0.9rem; }
            @keyframes slideIn {
                from { opacity: 0; transform: translateY(20px) scale(0.9); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
        `;
        document.head.appendChild(style);
    },
    toggle() {
        const panel = document.getElementById('assistant-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },
    startTips() {
        let i = 0;
        setInterval(() => {
            const text = document.getElementById('assistant-text');
            if (text) {
                text.style.opacity = 0;
                setTimeout(() => {
                    text.innerText = this.tips[i];
                    text.style.opacity = 1;
                    i = (i + 1) % this.tips.length;
                }, 500);
            }
        }, 8000);
    }
};

window.addEventListener('load', () => Assistant.init());
