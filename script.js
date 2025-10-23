// Simple JavaScript functionality for the web application
document.addEventListener('DOMContentLoaded', function() {
    const actionBtn = document.getElementById('actionBtn');
    const resultBox = document.getElementById('result');
    
    let clickCount = 0;
    const messages = [
        "🎉 Great! You clicked the button!",
        "🚀 Awesome! Keep going!",
        "💫 Fantastic! You're on a roll!",
        "⭐ Amazing! You're doing great!",
        "🌟 Wonderful! You're a star!",
        "🎯 Perfect! You've got it!",
        "🏆 Excellent! You're winning!",
        "💎 Brilliant! You're shining!"
    ];
    
    // Button click handler
    actionBtn.addEventListener('click', function() {
        clickCount++;
        
        // Update button text
        actionBtn.textContent = `Clicked ${clickCount} time${clickCount > 1 ? 's' : ''}!`;
        
        // Show result with animation
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        resultBox.textContent = randomMessage;
        resultBox.classList.add('active');
        
        // Add some extra fun for multiple clicks
        if (clickCount === 5) {
            resultBox.textContent = "🔥 You're on fire! Keep clicking!";
            celebrateAnimation();
        } else if (clickCount === 10) {
            resultBox.textContent = "🎊 Amazing! You're a click master!";
            celebrateAnimation();
        } else if (clickCount === 20) {
            resultBox.textContent = "🏅 LEGENDARY! You've reached 20 clicks!";
            celebrateAnimation();
        }
        
        // Reset animation
        setTimeout(() => {
            resultBox.classList.remove('active');
        }, 500);
    });
    
    // Celebration animation
    function celebrateAnimation() {
        actionBtn.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            actionBtn.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add current year to footer
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} Simple Web App. Built with ❤️`;
    }
    
    console.log('🚀 Simple Web App initialized successfully!');
});
