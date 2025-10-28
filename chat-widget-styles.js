// Optimodo Chat Widget – Modern Gradient Design
(function() {
    // Lade externe Styles
    const styleScript = document.createElement('script');
    styleScript.src = "https://cdn.jsdelivr.net/gh/optimodoagency/chat-widget-new2@main/chat-widget-styles.js";
    document.head.appendChild(styleScript);

    // Lade Schriftart
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Warte, bis Styles geladen sind
    setTimeout(() => {
        const config = window.ChatWidgetConfig || {};
        if (window.OptimodoChatWidgetInitialized) return;
        window.OptimodoChatWidgetInitialized = true;

        let currentSessionId = crypto.randomUUID();

        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'n8n-chat-widget';
        const chatContainer = document.createElement('div');
        chatContainer.className = `chat-container${config.style?.position === 'left' ? ' position-left' : ''}`;

        // Chat HTML-Struktur
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

        // Toggle Button
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

        // Referenzen
        const newChatBtn = chatContainer.querySelector('.new-chat-btn');
        const chatInterface = chatContainer.querySelector('.chat-interface');
        const messagesContainer = chatContainer.querySelector('.chat-messages');
        const textarea = chatContainer.querySelector('textarea');
        const sendButton = chatContainer.querySelector('button[type="submit"]');

        // Nachrichtenanzeige
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

        // Chat starten
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
            } catch (err) {
                console.error(err);
            }
        }

        // Nachricht senden
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
            } catch (err) {
                console.error(err);
            }
        }

        // Event Listener
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
    }, 400);
})();
