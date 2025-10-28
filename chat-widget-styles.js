// Optimodo Chat Widget – Full Inline Version (Modern Gradient Design)
(function() {
    // 🌈 Inline Styles (Modern Gradient Look)
    const styles = `
        .n8n-chat-widget {
            --color-primary: #7f57f1;
            --color-secondary: #9c7bff;
            --color-bg: #ffffff;
            --color-bot-bg: #f8f8ff;
            --color-font: #1a1a1a;
            --radius: 22px;
            --shadow: 0 8px 30px rgba(127, 87, 241, 0.15);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 390px;
            height: 640px;
            background: var(--color-bg);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            overflow: hidden;
            display: none;
            flex-direction: column;
            backdrop-filter: blur(8px);
            transition: all 0.4s ease;
            z-index: 1000;
            border: 1px solid rgba(127, 87, 241, 0.15);
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
        }

        .n8n-chat-widget .brand-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: white;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 600;
        }

        .n8n-chat-widget .brand-header img {
            width: 34px;
            height: 34px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(255, 255, 255, 0.2);
        }

        .n8n-chat-widget .close-button {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            color: white;
            cursor: pointer;
            padding: 6px 10px;
            border-radius: 10px;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.35);
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            background: var(--color-bot-bg);
            scroll-behavior: smooth;
        }

        .n8n-chat-widget .chat-message {
            max-width: 80%;
            padding: 14px 18px;
            border-radius: 20px;
            font-size: 15px;
            line-height: 1.5;
            margin-bottom: 10px;
            animation: fadeIn 0.25s ease-out;
            box-shadow: 0 4px 16px rgba(0,0,0,0.05);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .n8n-chat-widget .chat-message.user {
            align-self: flex-end;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: #fff;
            border-bottom-right-radius: 5px;
        }

        .n8n-chat-widget .chat-message.bot {
            align-self: flex-start;
            background: #fff;
            border: 1px solid rgba(127,87,241,0.15);
            border-bottom-left-radius: 5px;
            color: var(--color-font);
        }

        .n8n-chat-widget .chat-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 6px 0 12px;
        }

        .n8n-chat-widget .chat-button {
            padding: 12px 18px;
            border-radius: 16px;
            border: none;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: #fff;
            cursor: pointer;
            font-size: 14px;
            text-align: left;
            transition: all 0.2s ease;
            box-shadow: 0 6px 14px rgba(127, 87, 241, 0.25);
        }

        .n8n-chat-widget .chat-button:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 18px rgba(127, 87, 241, 0.35);
        }

        .n8n-chat-widget .chat-input {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 14px 16px;
            background: #fff;
            border-top: 1px solid rgba(127,87,241,0.15);
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border-radius: 16px;
            border: 1px solid rgba(127,87,241,0.25);
            font-size: 14px;
            resize: none;
            transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 3px rgba(127,87,241,0.2);
            outline: none;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: #fff;
            border: none;
            border-radius: 16px;
            padding: 10px 18px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(127, 87, 241, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s ease;
            z-index: 999;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 40px rgba(127, 87, 241, 0.5);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Lade Schriftart
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Haupt-Widget-Logik
    setTimeout(() => {
        const config = window.ChatWidgetConfig || {};
        if (window.OptimodoChatWidgetInitialized) return;
        window.OptimodoChatWidgetInitialized = true;

        let currentSessionId = crypto.randomUUID();

        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget';
        const chatContainer = document.createElement('div');
        chatContainer.className = `chat-container${config.style?.position === 'left' ? ' position-left' : ''}`;

        chatContainer.innerHTML = `
            <div class="brand-header">
                <img src="${config.branding?.logo || ''}" alt="${config.branding?.name || 'Chat'}">
                <span>${config.branding?.name || 'Optimodo Chat'}</span>
                <button class="close-button">×</button>
            </div>
            <div class="new-conversation">
                <h2 class="welcome-text">${config.branding?.welcomeText || '👋 Willkommen bei Optimodo!'}</h2>
                <button class="new-chat-btn">Chat starten</button>
                <p class="response-text">${config.branding?.responseTimeText || 'Wir antworten in der Regel sofort.'}</p>
            </div>
            <div class="chat-interface">
                <div class="brand-header">
                    <img src="${config.branding?.logo || ''}" alt="${config.branding?.name || 'Chat'}">
                    <span>${config.branding?.name || 'Optimodo Chat'}</span>
                    <button class="close-button">×</button>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <textarea placeholder="Nachricht eingeben..." rows="1"></textarea>
                    <button type="submit">Senden</button>
                </div>
            </div>
        `;

        const toggleButton = document.createElement('button');
        toggleButton.className = `chat-toggle${config.style?.position === 'left' ? ' position-left' : ''}`;
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
        `;

        widgetContainer.appendChild(chatContainer);
        widgetContainer.appendChild(toggleButton);
        document.body.appendChild(widgetContainer);

        const newChatBtn = chatContainer.querySelector('.new-chat-btn');
        const chatInterface = chatContainer.querySelector('.chat-interface');
        const messagesContainer = chatContainer.querySelector('.chat-messages');
        const textarea = chatContainer.querySelector('textarea');
        const sendButton = chatContainer.querySelector('button[type="submit"]');

        function addBotMessage(text, buttons = []) {
            const botDiv = document.createElement('div');
            botDiv.className = 'chat-message bot';
            botDiv.textContent = text;
            messagesContainer.appendChild(botDiv);

            if (buttons.length > 0) {
                const btnContainer = document.createElement('div');
                btnContainer.className = 'chat-buttons';
                buttons.forEach(choice => {
                    const btn = document.createElement('button');
                    btn.className = 'chat-button';
                    btn.textContent = choice;
                    btn.onclick = () => sendMessage(choice);
                    btnContainer.appendChild(btn);
                });
                messagesContainer.appendChild(btnContainer);
            }
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        async function startNewConversation() {
            currentSessionId = crypto.randomUUID();
            try {
                const res = await fetch(config.webhook?.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([{ action: "start", sessionId: currentSessionId }])
                });
                const data = await res.json();
                chatContainer.querySelector('.brand-header').style.display = 'none';
                chatContainer.querySelector('.new-conversation').style.display = 'none';
                chatInterface.classList.add('active');
                addBotMessage(
                    data.output || '👋 Hallo! Wie kann ich dir heute helfen?',
                    data.choices || [
                        "💻 Ich möchte eine neue Website erstellen",
                        "🚀 Ich will mehr Kunden über meine Website gewinnen",
                        "✍️ Ich brauche Hilfe bei Texten oder SEO",
                        "📞 Ich möchte Kontakt aufnehmen"
                    ]
                );
            } catch (err) { console.error(err); }
        }

        async function sendMessage(message) {
            const userDiv = document.createElement('div');
            userDiv.className = 'chat-message user';
            userDiv.textContent = message;
            messagesContainer.appendChild(userDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            try {
                const res = await fetch(config.webhook?.url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: "sendMessage", sessionId: currentSessionId, chatInput: message })
                });
                const data = await res.json();
                addBotMessage(data.output || '', data.choices || []);
            } catch (err) { console.error(err); }
        }

        newChatBtn.addEventListener('click', startNewConversation);
        sendButton.addEventListener('click', () => {
            const msg = textarea.value.trim();
            if (msg) { sendMessage(msg); textarea.value = ''; }
        });
        textarea.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const msg = textarea.value.trim();
                if (msg) { sendMessage(msg); textarea.value = ''; }
            }
        });
        toggleButton.addEventListener('click', () => chatContainer.classList.toggle('open'));
        chatContainer.querySelectorAll('.close-button').forEach(btn =>
            btn.addEventListener('click', () => chatContainer.classList.remove('open'))
        );
    }, 200);
})();
