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


.animbox {
    width: 80px;
    height: 80px;
    margin-top: 30%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    position: absolute;
    z-index: -1;
    visibility: visible;
  }
  /*设置各竖条的共有样式*/
  .animbox > div {
    background-color: rgba(255, 255, 255, 0.5);
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    animation-fill-mode: both;
    display: inline-block;
    animation: anim 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
  }
  /*设置动画延迟*/
  .animbox > :nth-child(2), .animbox > :nth-child(4) {
    animation-delay: 0.25s !important;
  }
  
  .animbox > :nth-child(1), .animbox > :nth-child(5) {
    animation-delay: 0.5s !important;
  }
  /*定义动画*/
  @keyframes anim {
    0% {  transform: scaley(1); }
    80% {  transform: scaley(0.3); }
    90% {  transform: scaley(1);   }
  }
  