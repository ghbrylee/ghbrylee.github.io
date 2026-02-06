// 현재 단계 추적
let currentStep = 1;
const totalSteps = 6;

// 힌트 배열
const hints = [
    "Dress up or come comfy either works",
    "Maybe a place with a view…?",
    "You'll find your favorite kind of food there",
    "It's a place with great vibes ✨"
];

let revealedHints = 0;
let ticketShown = false;

// STEP 1: RSVP 버튼 클릭 처리
function handleRSVP(choice) {
    // 컨페티 애니메이션 생성
    createConfetti();
    
    // 응답 메시지 설정
    const responseText = document.getElementById('responseText');
    if (choice === 'yes') {
        responseText.textContent = 'Wait… your surprise is arriving 🎁';
    } else {
        responseText.textContent = 'Thinking won\'t help! The invitation is already open 😛';
    }
    
    // STEP 2로 전환
    setTimeout(() => {
        showStep(2);
    }, 500);
    
    // STEP 3으로 자동 전환
    setTimeout(() => {
        showStep(3);
    }, 5000);
}

// 컨페티 생성
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const colors = ['#ff6b9d', '#ff8fab', '#ffb3d9', '#ffd9ec', '#ffebf5', '#ffc0cb', '#ff69b4', '#ff1493'];
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '❤️', '💞', '💘'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // 30% 확률로 하트 이모지 사용
        const isHeart = Math.random() < 0.3;
        
        if (isHeart) {
            confetti.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.background = 'transparent';
            confetti.style.width = 'auto';
            confetti.style.height = 'auto';
        } else {
            // 일반 컨페티
            const size = Math.random() * 12 + 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            // 일부는 원형, 일부는 사각형
            if (Math.random() < 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.borderRadius = '0%';
                // 회전 효과를 위한 transform
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        // 좌우로 흔들리는 효과를 위한 CSS 변수
        const drift = (Math.random() - 0.5) * 30; // -15vw ~ +15vw
        confetti.style.setProperty('--drift', drift);
        container.appendChild(confetti);
    }
    
    // 지속적으로 추가 컨페티 생성 (5초 동안)
    let additionalCount = 0;
    const interval = setInterval(() => {
        if (additionalCount >= 100) {
            clearInterval(interval);
            return;
        }
        
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const isHeart = Math.random() < 0.3;
        
        if (isHeart) {
            confetti.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
            confetti.style.background = 'transparent';
            confetti.style.width = 'auto';
            confetti.style.height = 'auto';
        } else {
            const size = Math.random() * 12 + 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            if (Math.random() < 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.borderRadius = '0%';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = '0s';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        const drift = (Math.random() - 0.5) * 30;
        confetti.style.setProperty('--drift', drift);
        container.appendChild(confetti);
        
        additionalCount++;
    }, 50); // 50ms마다 하나씩 추가
}

// 단계 전환 함수
function showStep(stepNumber) {
    // 현재 활성 단계 숨기기
    const currentStepElement = document.querySelector('.step.active');
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
    }
    
    // 새 단계 표시
    const newStepElement = document.getElementById(`step${stepNumber}`);
    if (newStepElement) {
        setTimeout(() => {
            newStepElement.classList.add('active');
            currentStep = stepNumber;
            
            // 특정 단계별 추가 애니메이션
            if (stepNumber === 4) {
                setTimeout(() => {
                    typeConfession();
                }, 500);
            }
            
            // STEP 3 표시 시 버튼이 나타나도록 설정
            if (stepNumber === 3 && !ticketShown) {
                ticketShown = true;
            }
        }, 300);
    }
}

// STEP 4: 타이핑 애니메이션
function typeConfession() {
    const confessionText = document.getElementById('confessionText');
    const text = 'Will you be my Valentine? ❤️';
    confessionText.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            confessionText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            // 버튼 표시
            setTimeout(() => {
                const btn = document.getElementById('confessionBtn');
                if (btn) {
                    btn.style.display = 'block';
                }
            }, 500);
        }
    }, 100);
}

// STEP 3: 약관 체크박스 토글
function toggleJourneyButton() {
    const checkbox = document.getElementById('termsCheckbox');
    const button = document.getElementById('journeyButton');
    
    if (checkbox && button) {
        button.disabled = !checkbox.checked;
        if (checkbox.checked) {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        } else {
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        }
    }
}

// STEP 3: 여정 수락 버튼 클릭
function handleJourney() {
    const checkbox = document.getElementById('termsCheckbox');
    if (checkbox && checkbox.checked) {
        showStep(4);
    }
}

// STEP 4: 고백 버튼 클릭
function handleConfession() {
    showStep(5);
}

// STEP 5: 힌트 공개
function revealHint() {
    if (revealedHints >= hints.length) {
        // 모든 힌트를 공개했으면 STEP 6으로 전환
        if (revealedHints === hints.length) {
            setTimeout(() => {
                showStep(6);
            }, 2000);
        }
        return;
    }
    
    const hintContainer = document.getElementById('hintContainer');
    const hintItem = document.createElement('div');
    hintItem.className = 'hint-item';
    hintItem.textContent = hints[revealedHints];
    hintContainer.appendChild(hintItem);
    
    revealedHints++;
    
    // 모든 힌트를 공개한 후 STEP 6으로 전환
    if (revealedHints >= hints.length) {
        const btn = document.querySelector('.btn-hint');
        if (btn) {
            btn.textContent = 'Next →';
            btn.onclick = () => showStep(6);
        }
        setTimeout(() => {
            showStep(6);
        }, 3000);
    }
}

// STEP 6: 초대장 저장
function saveInvitation() {
    // 실제 저장 기능은 브라우저에 따라 다를 수 있음
    alert('Invitation saved! 💕\n\n(You can add image saving or sharing features)');
}

// STEP 6: 스크린샷 찍기
function takeScreenshot() {
    alert('Please take a screenshot! 📸\n\n(On mobile, use the default screenshot function)');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 추가 떠다니는 하트 생성
    createFloatingHearts();
});

// 추가 떠다니는 하트 생성
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '❤️'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        heart.style.animationDelay = Math.random() * 5 + 's';
        heartsContainer.appendChild(heart);
    }
}


