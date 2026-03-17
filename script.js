document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // --- Sticky Header ---
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    // Fix typo from my mental plan: reals -> reveals
    const revealCallback = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealCallback);
    revealCallback(); // Initial check

    // --- Booking Form Validation ---
    const bookingForm = document.getElementById('booking-form');
    const successMessage = document.getElementById('success-message');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Fields to validate
        const fields = [
            { id: 'name', errorId: 'name-error' },
            { id: 'email', errorId: 'email-error', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            { id: 'phone', errorId: 'phone-error' },
            { id: 'service', errorId: 'service-error' },
            { id: 'date', errorId: 'date-error' },
            { id: 'time', errorId: 'time-error' }
        ];

        fields.forEach(field => {
            const el = document.getElementById(field.id);
            const errorEl = document.getElementById(field.errorId);
            
            if (!el.value || (field.pattern && !field.pattern.test(el.value))) {
                errorEl.style.display = 'block';
                isValid = false;
            } else {
                errorEl.style.display = 'none';
            }
        });

        if (isValid) {
            bookingForm.style.display = 'none';
            successMessage.style.display = 'block';
            console.log("Form Submitted Successfully");
        }
    });

    window.resetForm = () => {
        bookingForm.reset();
        bookingForm.style.display = 'block';
        successMessage.style.display = 'none';
    };

    // --- Chatbot Logic ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    chatToggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('msg', sender === 'bot' ? 'bot-msg' : 'user-msg');
        msgDiv.innerText = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // --- Dynamic Chatbot with n8n Webhook ---
    // Webhook URL loaded from config.js (not committed to version control)
    const N8N_WEBHOOK_URL = (typeof CONFIG !== 'undefined' && CONFIG.N8N_WEBHOOK_URL) ? CONFIG.N8N_WEBHOOK_URL : '';

    const handleChat = async () => {
        const userText = chatInput.value.trim();
        if (!userText) return;

        addMessage(userText, 'user');
        chatInput.value = '';

        // Add a temporary typing indicator
        const typingId = 'typing-' + Date.now();
        const typingMsg = document.createElement('div');
        typingMsg.id = typingId;
        typingMsg.classList.add('msg', 'bot-msg');
        typingMsg.innerText = '...';
        chatMessages.appendChild(typingMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chatInput: userText
                })
            });

            const data = await response.json();
            const botResponse = data.output || data.text || data.response || "I'm here to help! Could you please rephrase that?";

            // Remove typing indicator and add real message
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();

            addMessage(botResponse, 'bot');
        } catch (error) {
            console.error('n8n Webhook Error:', error);
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();
            addMessage("I'm sorry, I'm having trouble connecting. Please call us at +1 (234) 567 890 for immediate assistance.", 'bot');
        }
    };

    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

});
