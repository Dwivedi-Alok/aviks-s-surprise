// Image hover effect
const img = document.querySelector('#image');
img.addEventListener('mouseover', () => {
  img.src = 'image2.png';
});
img.addEventListener('mouseout', () => {
  img.src = 'image.png'; // original image
});

// Get DOM elements
const btn = document.querySelector('#btn');
const vdo = document.querySelector('#vdo');
const comp = document.querySelector('#comp');
const paragraphElement = document.querySelector('.container2 p');

// Loading state function
function setLoadingState(isLoading) {
  if (isLoading) {
    btn.textContent = 'Loading...';
    btn.disabled = true;
    comp.style.opacity = '0.7';
    paragraphElement.style.opacity = '0.7';
  } else {
    btn.textContent = 'Next';
    btn.disabled = false;
    comp.style.opacity = '1';
    paragraphElement.style.opacity = '1';
  }
}

// Smooth content transition
function updateContentWithAnimation(shortCompliment, paragraph) {
  // Fade out
  comp.style.transform = 'translateY(-20px)';
  comp.style.opacity = '0';
  paragraphElement.style.transform = 'translateY(20px)';
  paragraphElement.style.opacity = '0';
  
  setTimeout(() => {
    // Update content
    comp.textContent = shortCompliment;
    paragraphElement.textContent = paragraph;
    
    // Fade in
    comp.style.transform = 'translateY(0)';
    comp.style.opacity = '1';
    paragraphElement.style.transform = 'translateY(0)';
    paragraphElement.style.opacity = '1';
  }, 300);
}

// Add smooth transitions to elements
comp.style.transition = 'all 0.3s ease';
paragraphElement.style.transition = 'all 0.3s ease';

// Main button click handler
btn.addEventListener('click', () => {
  setLoadingState(true);
  
  // 1. Set random video
  const ran = Math.floor(Math.random() * 3) + 1;
  vdo.src = `avuu${ran}.mp4`;
  
  // 2. Fetch compliment from your enhanced server
  fetch("http://localhost:3000/api/compliment")
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log('Received data:', data);
      
      // Update content with animation
      updateContentWithAnimation(
        data.shortCompliment || data.compliment || "You're absolutely amazing!",
        data.paragraph || "Every day with you is a gift. Your smile lights up my world in ways I never thought possible."
      );
      
      // Optional: Log the mood for debugging
      if (data.mood) {
        console.log('Compliment mood:', data.mood);
      }
      
      setLoadingState(false);
    })
    .catch(err => {
      console.error("Failed to fetch compliment:", err);
      
      // Fallback compliments array
      const fallbackCompliments = [
        {
          short: "You make every day brighter just by being you.",
          long: "Your presence in my life is like sunshine breaking through clouds. You have this incredible ability to turn ordinary moments into extraordinary memories."
        },
        {
          short: "Your smile is my favorite notification.",
          long: "Every time you smile, my heart skips a beat. It's like the whole world stops for a moment, and all I can see is your beautiful, radiant happiness."
        },
        {
          short: "You're not just beautiful, you're absolutely magical.",
          long: "There's something truly enchanting about you that goes beyond looks. Your kindness, your laugh, your way of seeing the world – it's all pure magic."
        },
        {
          short: "You're the reason I believe in love at first sight.",
          long: "From the moment I saw you, I knew you were special. You've turned my world upside down in the most wonderful way possible."
        }
      ];
      
      const randomFallback = fallbackCompliments[Math.floor(Math.random() * fallbackCompliments.length)];
      
      updateContentWithAnimation(randomFallback.short, randomFallback.long);
      setLoadingState(false);
    });
});

// Optional: Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Space' || e.key === 'Enter') {
    e.preventDefault();
    btn.click();
  }
});

// Optional: Auto-refresh compliments every 45 seconds
let autoRefreshInterval;

function startAutoRefresh() {
  autoRefreshInterval = setInterval(() => {
    btn.click();
  }, 45000); // 45 seconds
}

function stopAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
  }
}

// Uncomment the line below if you want auto-refresh
// startAutoRefresh();

// Optional: Add a sparkle effect when compliment changes
function createSparkles() {
  const sparkles = ['✨', '💫', '⭐', '🌟', '💖'];
  
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.position = 'fixed';
      sparkle.style.left = Math.random() * window.innerWidth + 'px';
      sparkle.style.top = Math.random() * window.innerHeight + 'px';
      sparkle.style.fontSize = '1.5rem';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    }, i * 150);
  }
}

// Add sparkle animation CSS
const sparkleCSS = `
  @keyframes sparkleFloat {
    0% {
      opacity: 0;
      transform: translateY(0px) scale(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-60px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-120px) scale(0);
    }
  }
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Trigger sparkles on successful compliment fetch
const originalFetch = btn.onclick;
btn.addEventListener('click', () => {
  setTimeout(() => {
    createSparkles();
  }, 800); // Delay to sync with content update
});

console.log('💕 Enhanced romantic script loaded!');
console.log('🔥 Features: Smooth animations, fallback compliments, keyboard support');
console.log('✨ Press Space/Enter for quick compliment changes!');