const styles = `
    .n8n-chat-widget {
        --chat--color-primary: var(--n8n-chat-primary-color, #7f57f1);
        --chat--color-secondary: var(--n8n-chat-secondary-color, #9c7bff);
        --chat--color-background: var(--n8n-chat-background-color, #ffffff);
        --chat--color-font: var(--n8n-chat-font-color, #1a1a1a);
        --chat--color-border: rgba(127, 87, 241, 0.2);
        font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
    }

    /* Container */
    .n8n-chat-widget .chat-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
        width: 380px;
        height: 620px;
        background: var(--chat--color-background);
        border-radius: 24px;
        box-shadow: 0 20px 50px rgba(127, 87, 241, 0.25);
        border: 1px solid var(--chat--color-border);
        overflow: hidden;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease-out;
    }

    .n8n-chat-widget .chat-container.open {
        display: flex;
        flex-direction: column;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Header */
    .n8n-chat-widget .brand-header {
        padding: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
        color: white;
    }

    .n8n-chat-widget .brand-header span {
        font-size: 18px;
        font-weight: 600;
    }

    .n8n-chat-widget .brand-header img {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(255,255,255,0.2);
    }

    .n8n-chat-widget .close-button {
        background: rgba(255,255,255,0.15);
        border: none;
        color: white;
        cursor: pointer;
        padding: 6px 10px;
        border-radius: 8px;
        transition: background 0.2s;
    }
    .n8n-chat-widget .close-button:hover {
        background: rgba(255,255,255,0.3);
    }

    /* Messages */
    .n8n-chat-widget .chat-messages {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        background: #fafafa;
    }

    .n8n-chat-widget .chat-message {
        padding: 12px 16px;
        border-radius: 16px;
        max-width: 80%;
        font-size: 14px;
        line-height: 1.5;
        word-break: break-word;
        animation: messagePop 0.25s ease-out;
    }

    @keyframes messagePop {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .n8n-chat-widget .chat-message.user {
        align-self: flex-end;
        background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
        color: #fff;
        border-bottom-right-radius: 4px;
        box-shadow: 0 4px 10px rgba(127,87,241,0.3);
    }

    .n8n-chat-widget .chat-message.bot {
        align-self: flex-start;
        background: #fff;
        border: 1px solid var(--chat--color-border);
        color: var(--chat--color-font);
        border-bottom-left-radius: 4px;
        box-shadow: 0 3px 8px rgba(0,0,0,0.05);
    }

    /* Buttons */
    .n8n-chat-widget .chat-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 6px;
    }

    .n8n-chat-widget .chat-button {
        padding: 10px 14px;
        border-radius: 10px;
        border: none;
        background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
        color: white;
        cursor: pointer;
        font-size: 13px;
        transition: transform 0.15s, box-shadow 0.15s;
        box-shadow: 0 4px 12px rgba(127,87,241,0.3);
    }

    .n8n-chat-widget .chat-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(127,87,241,0.4);
    }

    /* Input Area */
    .n8n-chat-widget .chat-input {
        padding: 16px;
        background: #fff;
        border-top: 1px solid rgba(127,87,241,0.1);
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .n8n-chat-widget .chat-input textarea {
        flex: 1;
        padding: 12px;
        border: 1px solid rgba(127,87,241,0.25);
        border-radius: 12px;
        resize: none;
        font-size: 14px;
        outline: none;
        transition: border 0.2s, box-shadow 0.2s;
    }

    .n8n-chat-widget .chat-input textarea:focus {
        border-color: var(--chat--color-primary);
        box-shadow: 0 0 0 3px rgba(127,87,241,0.2);
    }

    .n8n-chat-widget .chat-input button {
        background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
        color: white;
        border: none;
        border-radius: 12px;
        padding: 10px 18px;
        cursor: pointer;
        font-weight: 500;
        transition: transform 0.2s;
    }

    .n8n-chat-widget .chat-input button:hover {
        transform: scale(1.05);
    }

    /* Chat Toggle Button */
    .n8n-chat-widget .chat-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 8px 20px rgba(127,87,241,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.25s, box-shadow 0.25s;
    }

    .n8n-chat-widget .chat-toggle:hover {
        transform: scale(1.08);
        box-shadow: 0 10px 28px rgba(127,87,241,0.45);
    }

    .n8n-chat-widget .chat-toggle svg {
        width: 26px;
        height: 26px;
    }
`;
