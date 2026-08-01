// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Scroll Animations (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: stop observing once shown
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 2. Music Player ---
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const musicProgress = document.getElementById('music-progress');
    let isPlaying = false;

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            playBtn.innerText = '▶️';
        } else {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            playBtn.innerText = '⏸️';
            createFloatingEmojis(['🎵', '🎶'], 5);
        }
        isPlaying = !isPlaying;
    });

    bgMusic.addEventListener('timeupdate', () => {
        const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
        musicProgress.style.width = `${progress}%`;
    });

    // --- 3. Letter Typing Animation ---
    const openBtn = document.getElementById('open-envelope-btn');
    const envelope = document.getElementById('envelope');
    const typingText = document.getElementById('typing-text');
    const letterContent = "My Dearest,\n\nFrom the moment I met you, my life has been filled with endless joy. You are my sunshine, my best friend, and my true love.\n\nForever Yours, ❤️";
    let isTyping = false;

    openBtn.addEventListener('click', () => {
        document.getElementById('letter-section').scrollIntoView({ behavior: 'smooth' });
        // Attempt to auto-play music on interaction
        if (!isPlaying) playBtn.click();
    });

    envelope.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            if (!isTyping) {
                isTyping = true;
                setTimeout(() => typeWriter(letterContent, 0), 1000);
            }
            createFloatingEmojis(['❤️', '💌'], 10);
        }
    });

    function typeWriter(text, i) {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                typingText.innerHTML += '<br>';
            } else {
                typingText.innerHTML += text.charAt(i);
            }
            setTimeout(() => typeWriter(text, i + 1), 50);
        }
    }

    // --- 4. Lightbox Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxImg.src = item.src;
            lightbox.classList.add('active');
            createFloatingEmojis(['✨', '💖'], 5);
        });
    });

    closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    // --- 5. Love Counter (Since we met/started dating) ---
    // Using a default date from 2 years ago for demo if not specified
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 2);
    startDate.setMonth(startDate.getMonth() - 3);

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('c-years').innerText = years;
        document.getElementById('c-months').innerText = months;
        document.getElementById('c-days').innerText = days;
        document.getElementById('c-hours').innerText = hours;
        document.getElementById('c-mins').innerText = mins;
        document.getElementById('c-secs').innerText = secs;
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // --- 6. Reasons Grid ---
    const reasonsGrid = document.getElementById('reasons-grid');
    const reasons = [
        { icon: '😊', text: 'Your beautiful smile' },
        { icon: '🤣', text: 'Your sense of humor' },
        { icon: '👀', text: 'The way you look at me' },
        { icon: '🧠', text: 'Your brilliant mind' },
        { icon: '🤗', text: 'Your warm hugs' },
        { icon: '🌟', text: 'How you light up a room' },
        { icon: '💪', text: 'Your strength and resilience' },
        { icon: '🎵', text: 'Our terrible singing together' },
        { icon: '🍕', text: 'Our late night pizza runs' },
        { icon: '💖', text: 'Your kind heart' }
    ]; // Can be expanded to 20

    reasons.forEach(r => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `<span class="icon">${r.icon}</span><p>${r.text}</p>`;
        reasonsGrid.appendChild(card);
    });

    // --- 7. Compliment Generator ---
    const compliments = [
        "You are the most beautiful person I know, inside and out.",
        "My favorite place in the world is right next to you.",
        "I love you more than words could ever describe.",
        "You make every single day better just by being in it.",
        "I’m so lucky to have you in my life.",
        "Your smile is my favorite thing to see.",
        "You are my today and all of my tomorrows."
    ];
    const compBtn = document.getElementById('compliment-btn');
    const compText = document.getElementById('compliment-text');
    
    compBtn.addEventListener('click', () => {
        compText.style.opacity = 0;
        setTimeout(() => {
            const random = compliments[Math.floor(Math.random() * compliments.length)];
            compText.innerText = random;
            compText.style.opacity = 1;
            createFloatingEmojis(['✨', '🌸'], 3);
        }, 300);
    });

    // --- 8. Love Quiz ---
    const quizData = [
        { q: "Where was our first date?", options: ["Coffee Shop", "Cinema", "Park", "Restaurant"], answer: 0 },
        { q: "What is my favorite color?", options: ["Blue", "Red", "Pink", "Green"], answer: 2 },
        { q: "Who said 'I love you' first?", options: ["Me", "You", "At the same time"], answer: 0 }
    ];
    let currentQ = 0;
    const qText = document.getElementById('question-text');
    const qOpts = document.getElementById('quiz-options');
    const qProg = document.getElementById('quiz-progress');

    function loadQuiz() {
        if(currentQ >= quizData.length) {
            qText.innerText = "You know me so well! 🥰";
            qOpts.innerHTML = "";
            qProg.style.width = "100%";
            fireConfetti();
            return;
        }
        qText.innerText = quizData[currentQ].q;
        qOpts.innerHTML = "";
        qProg.style.width = `${(currentQ / quizData.length) * 100}%`;
        
        quizData[currentQ].options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.innerText = opt;
            btn.addEventListener('click', () => checkAnswer(idx, btn));
            qOpts.appendChild(btn);
        });
    }

    function checkAnswer(idx, btn) {
        if (idx === quizData[currentQ].answer) {
            btn.classList.add('correct');
            createFloatingEmojis(['✅', '👏'], 3);
            setTimeout(() => {
                currentQ++;
                loadQuiz();
            }, 1000);
        } else {
            btn.classList.add('wrong');
            btn.style.animation = 'shake 0.5s';
            setTimeout(() => {
                btn.classList.remove('wrong');
                btn.style.animation = '';
            }, 500);
        }
    }
    loadQuiz();

    // --- 9. Runaway No Button & Proposal ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // For desktop hover and mobile touch
    const moveNoButton = () => {
        const section = document.getElementById('proposal-section');
        const rect = section.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Ensure it stays within viewport
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        
        const randomX = Math.max(20, Math.random() * maxX);
        const randomY = Math.max(20, Math.random() * maxY);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent clicking
        moveNoButton();
    });

    yesBtn.addEventListener('click', () => {
        document.querySelector('.proposal-title').innerHTML = "I Knew You'd Say Yes! 💍❤️";
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        fireConfetti(true);
        setInterval(() => fireConfetti(), 2000);
        createFloatingEmojis(['💍', '💒', '🥂', '❤️'], 50);
    });

    // --- 10. Surprise Gift ---
    const giftBox = document.getElementById('gift-box');
    const giftContent = document.getElementById('gift-content');

    giftBox.addEventListener('click', () => {
        giftBox.style.display = 'none';
        giftContent.classList.remove('hidden-content');
        giftContent.classList.add('show-content');
        fireConfetti();
    });

    // --- 17. Countdown to Valentine's Day ---
    function updateVdayCountdown() {
        const now = new Date();
        let vDay = new Date(now.getFullYear(), 1, 14); // Feb 14
        if (now > vDay) {
            vDay.setFullYear(now.getFullYear() + 1);
        }
        
        const diff = vDay - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('v-days').innerText = days;
        document.getElementById('v-hours').innerText = hours;
        document.getElementById('v-mins').innerText = mins;
        document.getElementById('v-secs').innerText = secs;
    }
    setInterval(updateVdayCountdown, 1000);
    updateVdayCountdown();


    // --- Global Canvas & Effects ---
    const canvas = document.getElementById('heart-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse trailing hearts
    const particles = [];
    
    class HeartParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 15 + 5;
            this.speedY = Math.random() * 1 - 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.opacity = 1;
        }
        update() {
            this.x += this.speedX;
            this.y -= this.speedY + 1; // Float up
            this.opacity -= 0.02;
            if(this.size > 0.2) this.size -= 0.1;
        }
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ff4b72';
            ctx.font = `${this.size}px Arial`;
            ctx.fillText('❤️', this.x, this.y);
            ctx.globalAlpha = 1;
        }
    }

    function handleParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].opacity <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(handleParticles);
    }
    handleParticles();

    window.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.8) {
            particles.push(new HeartParticle(e.x, e.y));
        }
    });
    window.addEventListener('touchmove', (e) => {
        if(Math.random() > 0.5) {
            particles.push(new HeartParticle(e.touches[0].clientX, e.touches[0].clientY));
        }
    });

    // Background floating emojis
    function createFloatingEmojis(emojisArr = ['❤️', '💖', '✨'], count = 1) {
        const container = document.getElementById('particles-container');
        for(let i=0; i<count; i++) {
            const el = document.createElement('div');
            el.className = 'floating-emoji';
            el.innerText = emojisArr[Math.floor(Math.random() * emojisArr.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = Math.random() * 3 + 3 + 's';
            el.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            container.appendChild(el);
            setTimeout(() => el.remove(), 6000);
        }
    }
    // Ambient falling emojis
    setInterval(() => createFloatingEmojis(['❤️', '✨', '🌸', '💖'], 1), 2000);

    // Simple Confetti effect
    function fireConfetti(massive = false) {
        const colors = ['#ff4b72', '#ffd700', '#ffffff', '#ff758c'];
        const amount = massive ? 150 : 30;
        for(let i=0; i<amount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 20 + 10 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9999';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animation
            const duration = Math.random() * 3 + 2;
            confetti.style.transition = `top ${duration}s ease-in, left ${duration}s ease-in-out, transform ${duration}s linear`;
            
            document.body.appendChild(confetti);
            
            // Trigger animation
            setTimeout(() => {
                confetti.style.top = '120vh';
                confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() * 20 - 10)) + 'vw';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 10);
            
            setTimeout(() => confetti.remove(), duration * 1000);
        }
    }
});
