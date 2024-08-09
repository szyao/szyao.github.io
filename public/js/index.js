const canvasEl = document.getElementById("bg");
StarrySky.init(canvasEl);
StarrySky.render();
StarrySky.setStarSpeedLevel(0.0003);
//鼠标移入，粒子加速
const avatar = document.querySelector('.avatar');
avatar.addEventListener('mouseover', function () {
  StarrySky.setStarSpeedLevel(0.003);
});
//鼠标移出，粒子恢复
avatar.addEventListener('mouseout', function () {
  StarrySky.setStarSpeedLevel(0.0003);
});


// 背景音乐
// 获取页面上的音频控制按钮和音频元素
const audioControlButton = document.getElementById('audioControl');

// 定义一个变量用来判断音频是否已经加载完成
let hasLoaded = false;

// 定义一个变量用来判断音频是否正在播放
let isPlaying = false;

// 获取页面上的音频动画
const anim1 = document.getElementById('anim1');
const anim2 = document.getElementById('anim2');
const anim3 = document.getElementById('anim3');
const anim4 = document.getElementById('anim4');
const anim5 = document.getElementById('anim5');
function updateWaveRing() {
    if (!isPlaying) {
        anim1.style.animationPlayState = 'paused';
        anim2.style.animationPlayState = 'paused';
        anim3.style.animationPlayState = 'paused';
        anim4.style.animationPlayState = 'paused';
        anim5.style.animationPlayState = 'paused';
    } else {
        anim1.style.animationPlayState = 'running';
        anim2.style.animationPlayState = 'running';
        anim3.style.animationPlayState = 'running';
        anim4.style.animationPlayState = 'running';
        anim5.style.animationPlayState = 'running';
    }
}
updateWaveRing(); 

// 添加点击事件监听器到音频控制按钮
audioControlButton.addEventListener('click', function() {
    if (!hasLoaded) {
        // 如果音频尚未加载，则先加载音频文件
        audioControlButton.textContent = "加载中...";
        backgroundMusic.load();
        hasLoaded = true; // 设置已加载标志为true
        backgroundMusic.play().then(() => {
          isPlaying = true;
          audioControlButton.textContent = "暂停音乐";
      }).catch(error => {
          console.error("播放失败:", error);
      });
    } else {
        // 如果音频已经加载，则根据当前播放状态切换播放/暂停
        if (!isPlaying) {
            backgroundMusic.play().then(() => {
                isPlaying = true;
                audioControlButton.textContent = "暂停音乐";
            }).catch(error => {
                console.error("播放失败:", error);
            });
        } else {
            backgroundMusic.pause();
            isPlaying = false;
            audioControlButton.textContent ="播放音乐";
        }
    }
    updateWaveRing();  //更新动画状态
});

