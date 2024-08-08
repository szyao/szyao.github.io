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