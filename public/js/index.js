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
document.addEventListener('DOMContentLoaded', function() {
  const musicToggle = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');
  backgroundMusic.load(); // 加载音频文件
  musicToggle.addEventListener('click', function() {
      if (backgroundMusic.paused) {
          // 如果音乐暂停，开始播放
          backgroundMusic.play();
          musicToggle.textContent = "暂停音乐";
      } else {
          // 如果音乐正在播放，暂停播放
          backgroundMusic.pause();
          musicToggle.textContent = "播放音乐";
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const audioControlButton = document.getElementById('audioControl');
  const backgroundMusic = document.getElementById('backgroundMusic');
  let playCount = 0; // 跟踪播放次数，用于控制加载/播放/停止的循环
  
  audioControlButton.addEventListener('click', function() {
      if (playCount === 0) {
          // 第一次点击：加载并播放音频
          backgroundMusic.load();
          backgroundMusic.play().then(() => {
              audioControlButton.textContent = "暂停音乐";
              playCount++;
          }).catch(error => {
              console.error("播放失败:", error);
          });
      } else if (playCount >0) {
          // 第二次点击：停止播放音频
          backgroundMusic.pause();
          audioControlButton.textContent = "播放音乐";
      } else {
          // 第三次及之后的点击：重新开始播放音频
          backgroundMusic.play().then(() => {
              audioControlButton.textContent = "暂停音乐";
          }).catch(error => {
              console.error("播放失败:", error);
          });
      }
  });
});