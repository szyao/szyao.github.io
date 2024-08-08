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

// 底部音乐
document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleIframe');
  const iframeContainer = document.getElementById('iframeContainer');
  let iframeElement;

  toggleButton.addEventListener('click', function() {
      if (!iframeElement) {
          // 创建并插入iframe
          iframeElement = document.createElement('iframe');
          iframeElement.src = ' https://music.163.com/outchain/player?type=2&id=539420&auto=0'; 
          iframeElement.frameBorder = 0;
          iframeElement.style.width = '100%';
          iframeElement.style.height = '400px';
          iframeContainer.appendChild(iframeElement);
      } else {
          // 移除iframe
          iframeContainer.removeChild(iframeElement);
          iframeElement = null;
      }
  });
});