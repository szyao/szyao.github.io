const audio = document.getElementById('music');
const waveRingContainer = document.getElementById('waveRingContainer');
let audioCtx;
let analyser;
let source;
let dataArray;

// 初始化Web Audio API
function initAudio() {
    if (!window.AudioContext) {
        window.AudioContext = window.webkitAudioContext;
    }
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
}

// 更新波浪圆环效果
function updateWaveRing() {
    requestAnimationFrame(updateWaveRing);
    analyser.getByteFrequencyData(dataArray);
    let maxVolume = 0;
    for (let i = 0; i < dataArray.length; i++) {
        maxVolume = Math.max(maxVolume, dataArray[i]);
    }
    waveRingContainer.style.animationTimingFunction = `cubic-bezier(${maxVolume / 256}, 0, 1, ${1 - maxVolume / 256})`;
    waveRingContainer.style.opacity = `${Math.min(1, maxVolume / 128)}`;
    waveRingContainer.style.transform = `scale(1.${maxVolume / 100})`;
}

// 控制圆环显示与隐藏
function toggleWaveRing() {
    if (audio.paused) {
        waveRingContainer.style.visibility = 'hidden';
    } else {
        waveRingContainer.style.visibility = 'visible';
        initAudio();
        updateWaveRing();
    }
}

// 监听音频播放状态
audio.addEventListener('play', toggleWaveRing);
audio.addEventListener('pause', toggleWaveRing);