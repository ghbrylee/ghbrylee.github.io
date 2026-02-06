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
    }, 3000);
}

// 컨페티 생성
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const colors = ['#ff6b9d', '#ff8fab', '#ffb3d9', '#ffd9ec', '#ffebf5'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
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
            
            // STEP 3이 표시되면 4초 후 STEP 4로 자동 전환
            if (stepNumber === 3 && !ticketShown) {
                ticketShown = true;
                setTimeout(() => {
                    showStep(4);
                }, 4000);
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


