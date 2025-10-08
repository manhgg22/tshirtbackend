// 🎯 PATRIOTIC LANDING PAGE - MAIN JAVASCRIPT
// Tinh Thần Yêu Nước Việt Nam Qua Các Thời Kỳ Lịch Sử

// 📊 DATA ARRAYS
const historicalPeriods = [
    {
        name: "Văn Lang – Âu Lạc",
        time: "2879 TCN – 179 TCN",
        description: "Khởi nguồn dân tộc và tinh thần dựng nước. Thời kỳ Hùng Vương với 18 đời vua, xây dựng nền tảng văn hóa Việt Nam.",
        icon: "🏛️"
    },
    {
        name: "Thời Lý – Trần – Lê",
        time: "1009 – 1789",
        description: "Chiến công hiển hách, lòng yêu nước ngời sáng. Ba lần đánh bại quân Nguyên Mông, bảo vệ độc lập dân tộc.",
        icon: "⚔️"
    },
    {
        name: "Kháng chiến chống Pháp – Mỹ",
        time: "1945 – 1975",
        description: "Tinh thần bất khuất, bảo vệ độc lập dân tộc. Cuộc đấu tranh anh dũng giành lại tự do cho Tổ quốc.",
        icon: "🛡️"
    },
    {
        name: "Việt Nam hiện đại",
        time: "1975 – Nay",
        description: "Hòa bình, phát triển, hội nhập quốc tế. Xây dựng đất nước giàu mạnh, văn minh, hiện đại.",
        icon: "🚀"
    }
];

const nationalHeroes = [
    {
        name: "Hai Bà Trưng",
        quote: "Phụ nữ Việt Nam anh hùng, bất khuất",
        icon: "👑",
        period: "40-43 SCN"
    },
    {
        name: "Lý Thường Kiệt",
        quote: "Nam quốc sơn hà Nam đế cư",
        icon: "⚔️",
        period: "1019-1105"
    },
    {
        name: "Hồ Chí Minh",
        quote: "Không có gì quý hơn độc lập tự do",
        icon: "🌟",
        period: "1890-1969"
    },
    {
        name: "Võ Nguyên Giáp",
        quote: "Đại tướng của nhân dân",
        icon: "🎖️",
        period: "1911-2013"
    },
    {
        name: "Nguyễn Trãi",
        quote: "Bình Ngô đại cáo - Tuyên ngôn độc lập đầu tiên",
        icon: "📜",
        period: "1380-1442"
    },
    {
        name: "Lê Lợi",
        quote: "Lãnh tụ khởi nghĩa Lam Sơn",
        icon: "👑",
        period: "1385-1433"
    }
];

const culturalSymbols = [
    {
        name: "Trống Đồng",
        icon: "🥁",
        meaning: "Biểu tượng văn hóa Đông Sơn, tinh thần đoàn kết dân tộc"
    },
    {
        name: "Hoa Sen",
        icon: "🪷",
        meaning: "Sự thanh cao, trong sạch của tâm hồn Việt Nam"
    },
    {
        name: "Nón Lá",
        icon: "👒",
        meaning: "Nét đẹp truyền thống, sự duyên dáng của phụ nữ Việt"
    },
    {
        name: "Cờ Đỏ Sao Vàng",
        icon: "🇻🇳",
        meaning: "Biểu tượng thiêng liêng của Tổ quốc Việt Nam"
    },
    {
        name: "Tháp Rùa",
        icon: "🏯",
        meaning: "Trái tim của Thủ đô Hà Nội, lịch sử ngàn năm"
    },
    {
        name: "Áo Dài",
        icon: "👗",
        meaning: "Trang phục truyền thống, nét đẹp văn hóa Việt"
    }
];

const modernStats = [
    {
        number: "100",
        suffix: "triệu+",
        label: "Dân số Việt Nam",
        icon: "👥"
    },
    {
        number: "63",
        suffix: "tỉnh thành",
        label: "Đoàn kết toàn quốc",
        icon: "🗺️"
    },
    {
        number: "54",
        suffix: "dân tộc",
        label: "Đa dạng văn hóa",
        icon: "🌍"
    },
    {
        number: "4000",
        suffix: "năm",
        label: "Lịch sử dân tộc",
        icon: "📚"
    }
];

// 🎨 ANIMATION & SCROLL FUNCTIONS
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollProgress();
        this.setupFadeInAnimations();
        this.setupHeaderScroll();
        this.setupSmoothScrolling();
    }

    setupScrollProgress() {
        const progressBar = document.getElementById('progressBar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupFadeInAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    setupHeaderScroll() {
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 🏗️ COMPONENT GENERATORS
class ComponentGenerator {
    static generateTimeline() {
        const container = document.getElementById('timelineContainer');
        container.innerHTML = '';

        historicalPeriods.forEach((period, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item fade-in';
            timelineItem.style.animationDelay = `${index * 0.2}s`;
            
            timelineItem.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 1rem;">${period.icon}</div>
                <h3>${period.name}</h3>
                <div class="time">${period.time}</div>
                <p>${period.description}</p>
            `;
            
            container.appendChild(timelineItem);
        });
    }

    static generateHeroes() {
        const container = document.getElementById('heroesContainer');
        container.innerHTML = '';

        nationalHeroes.forEach((hero, index) => {
            const heroCard = document.createElement('div');
            heroCard.className = 'hero-card fade-in';
            heroCard.style.animationDelay = `${index * 0.15}s`;
            
            heroCard.innerHTML = `
                <div class="hero-image">${hero.icon}</div>
                <h3 class="hero-name">${hero.name}</h3>
                <p class="hero-quote">"${hero.quote}"</p>
                <small style="opacity: 0.7; margin-top: 1rem; display: block;">${hero.period}</small>
            `;
            
            container.appendChild(heroCard);
        });
    }

    static generateSymbols() {
        const container = document.getElementById('symbolsContainer');
        container.innerHTML = '';

        culturalSymbols.forEach((symbol, index) => {
            const symbolItem = document.createElement('div');
            symbolItem.className = 'symbol-item fade-in';
            symbolItem.style.animationDelay = `${index * 0.1}s`;
            
            symbolItem.innerHTML = `
                <div class="symbol-icon">${symbol.icon}</div>
                <h3 class="symbol-name">${symbol.name}</h3>
                <p class="symbol-meaning">${symbol.meaning}</p>
            `;
            
            // Add hover effect
            symbolItem.addEventListener('mouseenter', () => {
                symbolItem.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            symbolItem.addEventListener('mouseleave', () => {
                symbolItem.style.transform = 'translateY(0) scale(1)';
            });
            
            container.appendChild(symbolItem);
        });
    }

    static generateStats() {
        const container = document.getElementById('statsContainer');
        container.innerHTML = '';

        modernStats.forEach((stat, index) => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item fade-in';
            statItem.style.animationDelay = `${index * 0.2}s`;
            
            statItem.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 1rem;">${stat.icon}</div>
                <div class="stat-number" data-target="${stat.number}">0</div>
                <div class="stat-label">${stat.label}</div>
            `;
            
            container.appendChild(statItem);
        });

        // Animate counters
        this.animateCounters();
    }

    static animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        };

        // Trigger animation when stats come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }
}

// 🎵 AUDIO CONTROLS
class AudioController {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.createAudioToggle();
    }

    createAudioToggle() {
        const audioToggle = document.createElement('button');
        audioToggle.innerHTML = '🎵';
        audioToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: var(--vietnam-red);
            color: var(--vietnam-gold);
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

        audioToggle.addEventListener('click', () => {
            this.toggleAudio();
        });

        audioToggle.addEventListener('mouseenter', () => {
            audioToggle.style.transform = 'scale(1.1)';
        });

        audioToggle.addEventListener('mouseleave', () => {
            audioToggle.style.transform = 'scale(1)';
        });

        document.body.appendChild(audioToggle);
    }

    toggleAudio() {
        if (!this.audio) {
            // Create audio element with Vietnamese instrumental music
            this.audio = new Audio();
            this.audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Placeholder
            this.audio.loop = true;
            this.audio.volume = 0.3;
        }

        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
        } else {
            this.audio.play();
            this.isPlaying = true;
        }
    }
}

// 🎯 UTILITY FUNCTIONS
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 🌟 FIRE ANIMATION
class FireAnimation {
    constructor() {
        this.createFireEffect();
    }

    createFireEffect() {
        const fireContainer = document.createElement('div');
        fireContainer.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        // Create multiple fire elements
        for (let i = 0; i < 5; i++) {
            const fire = document.createElement('div');
            fire.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${i * 20}%;
                width: 60px;
                height: 100px;
                background: linear-gradient(to top, #ff4500, #ff6347, #ffa500, transparent);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                animation: fireFlicker ${2 + Math.random() * 2}s ease-in-out infinite alternate;
                opacity: 0.6;
            `;

            fireContainer.appendChild(fire);
        }

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fireFlicker {
                0% { transform: scaleY(1) rotate(-2deg); }
                50% { transform: scaleY(1.1) rotate(1deg); }
                100% { transform: scaleY(0.9) rotate(-1deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(fireContainer);
    }
}

// 🚀 INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    console.log('🇻🇳 Tinh Thần Yêu Nước Việt Nam - Landing Page Loading...');
    
    // Initialize all components
    ComponentGenerator.generateTimeline();
    ComponentGenerator.generateHeroes();
    ComponentGenerator.generateSymbols();
    ComponentGenerator.generateStats();
    
    // Initialize animations
    new ScrollAnimations();
    
    // Initialize audio controller
    new AudioController();
    
    // Initialize fire animation
    new FireAnimation();
    
    // Add loading complete message
    setTimeout(() => {
        console.log('✅ Landing page loaded successfully!');
        console.log('🎯 All animations and interactions are ready!');
    }, 1000);
});

// 🎨 ADDITIONAL ENHANCEMENTS
// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add random patriotic quotes
const patrioticQuotes = [
    "Việt Nam muôn năm!",
    "Tổ quốc trên hết!",
    "Độc lập - Tự do - Hạnh phúc!",
    "Việt Nam - Đất nước tôi yêu!",
    "Tinh thần Việt Nam bất diệt!"
];

// Show random quote in console
setInterval(() => {
    const randomQuote = patrioticQuotes[Math.floor(Math.random() * patrioticQuotes.length)];
    console.log(`💝 ${randomQuote}`);
}, 10000);

console.log('🇻🇳 Tinh Thần Yêu Nước Việt Nam - JavaScript Loaded!');
console.log('🎯 Ready to inspire patriotism and national pride!');
