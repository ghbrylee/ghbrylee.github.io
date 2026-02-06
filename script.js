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

// STEP 1: RSVP 옵션 선택
function selectRSVP(value) {
    const radios = document.querySelectorAll('input[name="rsvp"]');
    radios.forEach(radio => {
        if (radio.value === value) {
            radio.checked = true;
        }
    });
    
    // 시각적 피드백을 위한 클래스 업데이트
    const options = document.querySelectorAll('.rsvp-option');
    options.forEach(option => {
        option.classList.remove('selected');
        const radio = option.querySelector('input[name="rsvp"]');
        if (radio && radio.checked) {
            option.classList.add('selected');
        }
    });
    
    // 버튼 활성화/비활성화
    toggleRSVPSendButton();
}

// STEP 1: RSVP 전송 버튼 활성화/비활성화
function toggleRSVPSendButton() {
    const selectedRSVP = document.querySelector('input[name="rsvp"]:checked');
    const sendButton = document.getElementById('rsvpSendButton');
    
    if (sendButton) {
        if (selectedRSVP) {
            sendButton.disabled = false;
            sendButton.style.opacity = '1';
            sendButton.style.cursor = 'pointer';
            sendButton.style.pointerEvents = 'auto';
        } else {
            sendButton.disabled = true;
            sendButton.style.opacity = '0.5';
            sendButton.style.cursor = 'not-allowed';
            sendButton.style.pointerEvents = 'none';
        }
    }
}

// STEP 1: RSVP 전송 버튼 클릭 처리
function sendRSVP() {
    const selectedRSVP = document.querySelector('input[name="rsvp"]:checked');
    const sendButton = document.getElementById('rsvpSendButton');
    
    // 버튼이 비활성화되어 있으면 실행하지 않음
    if (!selectedRSVP || (sendButton && sendButton.disabled)) {
        return;
    }
    
    // 컨페티 애니메이션 생성
    createConfetti();
    
    // 응답 메시지 설정 (항상 동일한 메시지)
    const responseText = document.getElementById('responseText');
    responseText.textContent = 'Wait… your surprise is arriving 🎁';
    
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
            
            // STEP 5 표시 시 이미지 로드 처리
            if (stepNumber === 5) {
                const photo = document.getElementById('endingPhoto');
                if (photo) {
                    // HEIC 파일이 로드되지 않을 경우를 대비한 fallback
                    photo.onerror = function() {
                        console.warn('HEIC 이미지가 로드되지 않았습니다. JPG/PNG 형식으로 변환해주세요.');
                        // 필요시 fallback 이미지 경로 설정
                        // this.src = 'fallback-image.jpg';
                    };
                }
            }
            
            // STEP 3 표시 시 버튼이 나타나도록 설정
            if (stepNumber === 3 && !ticketShown) {
                ticketShown = true;
                // 아이폰 호환성을 위해 초기 상태 설정
                setTimeout(() => {
                    const checkbox = document.getElementById('termsCheckbox');
                    const button = document.getElementById('journeyButton');
                    if (checkbox && button) {
                        checkbox.checked = false;
                        button.disabled = true;
                        button.style.opacity = '0.5';
                        button.style.pointerEvents = 'none';
                    }
                }, 100);
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
                const buttons = document.getElementById('confessionButtons');
                if (buttons) {
                    buttons.style.display = 'flex';
                }
            }, 500);
        }
    }, 100);
}

// STEP 3: 체크박스 클릭 처리 (아이폰 호환성)
function handleCheckboxClick(event) {
    event.preventDefault();
    const checkbox = document.getElementById('termsCheckbox');
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        toggleJourneyButton();
    }
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
            button.style.pointerEvents = 'auto';
        } else {
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
            button.style.pointerEvents = 'none';
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

// STEP 6: 힌트 공개 (일시적으로 주석처리)
/*
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
*/

// STEP 5: 보딩패스 저장
function saveBoardingPass() {
    const boardingPass = document.querySelector('.boarding-pass');
    if (!boardingPass) {
        alert('보딩패스를 찾을 수 없습니다.');
        return;
    }
    
    // html2canvas를 사용하여 보딩패스를 이미지로 변환
    if (typeof html2canvas === 'undefined') {
        alert('이미지 저장 기능을 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }
    
    html2canvas(boardingPass, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
    }).then(canvas => {
        // Canvas를 Blob으로 변환
        canvas.toBlob(blob => {
            // 다운로드 링크 생성
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'boarding-pass-valentine-2026.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // 성공 메시지
            alert('보딩패스가 저장되었습니다! 💕');
        }, 'image/png');
    }).catch(error => {
        console.error('이미지 저장 중 오류 발생:', error);
        alert('이미지 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 추가 떠다니는 하트 생성
    createFloatingHearts();
    
    // RSVP 라디오 버튼 이벤트 리스너 설정
    const rsvpRadios = document.querySelectorAll('input[name="rsvp"]');
    rsvpRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            selectRSVP(radio.value);
        });
    });
    
    // 초기 버튼 상태 설정 (비활성화)
    toggleRSVPSendButton();
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


