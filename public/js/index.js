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

// 网站运行时间

document.addEventListener('DOMContentLoaded', function() {
  const uptimeDisplay = document.getElementById('uptime');
  const launchDate = new Date('2020-01-01T00:00:00Z'); // 假设网站在2024年1月1日上线
  
  const now = new Date();
  const diff = now.getTime() - launchDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);

  uptimeDisplay.textContent = `网站已经萌萌哒运行了 ${years} 年 ${days % 365} 天`;
});




// 背景音乐
// 获取页面上的音频控制按钮和音频元素
const audioControlButton = document.getElementById('audioControl');
const backgroundMusic = document.getElementById('backgroundMusic');

// 定义一个变量用来判断音频是否已经加载完成
let hasLoaded = false;

// 定义一个变量用来判断音频是否正在播放
let isPlaying = false;

// 添加点击事件监听器到音频控制按钮
audioControlButton.addEventListener('click', function() {
    if (!hasLoaded) {
        // 如果音频尚未加载，则先加载音频文件
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
});