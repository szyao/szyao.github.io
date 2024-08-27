const canvasEl = document.getElementById("bg");
StarrySky.init(canvasEl);
StarrySky.render();
StarrySky.setStarSpeedLevel(0.0004);
//鼠标移入，粒子加速
const avatar = document.querySelector('.avatar');
avatar.addEventListener('mouseover', function () {
  StarrySky.setStarSpeedLevel(0.004);
});
//鼠标移出，粒子恢复
avatar.addEventListener('mouseout', function () {
  StarrySky.setStarSpeedLevel(0.0004);
});


// 背景音乐
// 获取switch和音乐元素
var musicSwitch = document.getElementById('switch');
var bgMusic = document.getElementById('backgroundMusic');
let hasLoaded = false;

// 设置switch的change事件
musicSwitch.addEventListener('change', function() {
    if (this.checked) {
        if (!hasLoaded) {
        // 如果音频尚未加载，则先加载音频文件
        bgMusic.load();
        hasLoaded = true; // 设置已加载标志为true
        }
        // 如果switch被选中，则播放音乐
        bgMusic.play();
    } else {
        // 否则暂停音乐
        bgMusic.pause();
    }
});
