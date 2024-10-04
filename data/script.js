let currentImageIndex = {};
let totalImages = {};

// Modalı açma fonksiyonu
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
    
    const images = document.querySelectorAll(`#${modalId} .modal-img`);
    totalImages[modalId] = images.length;
    currentImageIndex[modalId] = 1;
    
    showImage(modalId, 1);
}

// Modalı kapatma fonksiyonu
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function showImage(modalId, index) {
    const images = document.querySelectorAll(`#${modalId} .modal-img`);
    const descriptions = document.querySelectorAll(`#${modalId} .modal-description`);
    
    images.forEach(img => img.style.display = 'none');
    descriptions.forEach(desc => desc.style.display = 'none');
    
    images[index - 1].style.display = 'block';
    descriptions[index - 1].style.display = 'block';
}

// İleri resim geçişi
function nextImage(modalId) {
    currentImageIndex[modalId] = (currentImageIndex[modalId] % totalImages[modalId]) + 1;
    showImage(modalId, currentImageIndex[modalId]);
}

// Geri resim geçişi
function prevImage(modalId) {
    currentImageIndex[modalId] = (currentImageIndex[modalId] - 2 + totalImages[modalId]) % totalImages[modalId] + 1;
    showImage(modalId, currentImageIndex[modalId]);
}

// Fotoğrafları büyütme
document.querySelectorAll('.modal-img').forEach(img => {
    img.addEventListener('click', function() {
        if (img.style.transform === 'scale(1.5)') {
            img.style.transform = 'scale(1)';
        } else {
            img.style.transform = 'scale(1.5)';
        }
        img.style.transition = 'transform 0.3s ease';
    });
});

function typeWriterEffect(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// Line Animation
function startAnimation() {
    const box = document.getElementById('box');
    const topLine = document.getElementById('top-line');
    const rightLine = document.getElementById('right-line');
    const bottomLine = document.getElementById('bottom-line');
    const leftLine = document.getElementById('left-line');
    const textBubble = document.getElementById('text-bubble');
    const text1 = document.getElementById('text-1');
    const text2 = document.getElementById('text-2');

    setTimeout(() => {
        topLine.style.height = '2px';
        topLine.style.width = '500px';
    }, 500);

    setTimeout(() => {
        rightLine.style.height = '200px';
        rightLine.style.width = '2px';
        rightLine.style.right = '0';
    }, 1000);

    setTimeout(() => {
        bottomLine.style.height = '2px';
        bottomLine.style.width = '500px';
        bottomLine.style.bottom = '0';
    }, 1500);

    setTimeout(() => {
        leftLine.style.height = '200px';
        leftLine.style.width = '2px';
        leftLine.style.left = '0';
    }, 2000);

    setTimeout(() => {
        box.style.backgroundColor = 'rgba(240, 240, 240, 0.7)';
    }, 2500);

    setTimeout(() => {
        topLine.style.height = '0';
        rightLine.style.height = '0';
        bottomLine.style.height = '0';
        leftLine.style.height = '0';

        textBubble.style.display = 'flex';
        textBubble.style.opacity = '1';

        const titleText1 = "Ahmet Furkan KÖRLÜ";
        const titleText2 = "Yazılım geliştiricisi ve teknoloji meraklısı.";

        typeWriterEffect(text1, titleText1, 75, () => {
            typeWriterEffect(text2, titleText2, 40);
        });

    }, 3000);
}

window.onload = function() {
    startAnimation();
}

const slides = document.querySelectorAll('.slideshow img');
let currentSlide = 0;
let isPaused = false;

// İlk slaytı göster (sayfa yüklendiğinde)
slides[currentSlide].classList.add('active');

// Sonraki slayta geçiş işlevi
function nextSlide() {
    if (!isPaused) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

// Önceki slayta geçiş işlevi
function prevSlide() {
    if (!isPaused) { 
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

// 5 saniyede bir resim değişsin (5000 ms)
let slideInterval = setInterval(nextSlide, 5000);

// Mouse basılı tutulduğunda animasyonu durdur
document.addEventListener('mousedown', () => {
    isPaused = true;
    clearInterval(slideInterval);
});

// Mouse bırakıldığında animasyonu başlat
document.addEventListener('mouseup', () => {
    isPaused = false;
    slideInterval = setInterval(nextSlide, 5000);
});

// Butonlara tıklandığında da animasyon sıfırlansın
document.querySelector('.slide-next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.slide-prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

// Otomatik geçişi sıfırlamak için
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000); 
}
