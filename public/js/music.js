/////music

const audio = document.getElementById('music');
const avatar = document.getElementById('avatar');
const halo = document.querySelector('.halo');

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

// 更新光环效果
function updateHalo() {
    requestAnimationFrame(updateHalo);
    analyser.getByteFrequencyData(dataArray);
    let maxVolume = 0;
    for (let i = 0; i < dataArray.length; i++) {
        maxVolume = Math.max(maxVolume, dataArray[i]);
    }
    // 根据音量调整光环尺寸
    halo.style.transform = `scale(1.${maxVolume / 100})`;
}

// 开始分析音频
function startAnalysis() {
    audio.play();
    initAudio();
    updateHalo();
}

// 在音频播放时启动分析
audio.addEventListener('play', startAnalysis);