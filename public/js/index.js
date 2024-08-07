const canvasEl = document.getElementById("bg");
StarrySky.init(canvasEl);
StarrySky.render();
StarrySky.setStarSpeedLevel(0.0003);
//鼠标移入，粒子加速
const avatar = document.querySelector('.avatar');
avatar.addEventListener('mouseover', function () {
  StarrySky.setStarSpeedLevel(0.002);
});
//鼠标移出，粒子恢复
avatar.addEventListener('mouseout', function () {
  StarrySky.setStarSpeedLevel(0.0003);
});


document.addEventListener('DOMContentLoaded', function() {
  var uptimeDiv = document.getElementById('uptime');
  
  // 网站首次上线的时间戳
  var startTime = new Date('2023-01-01T00:00:00Z').getTime();
  
  // 更新运行时间的函数
  function updateUptime() {
      var currentTime = new Date().getTime();
      var elapsed = Math.floor((currentTime - startTime) / 1000);
      var days = Math.floor(elapsed / 86400);
      var hours = Math.floor((elapsed % 86400) / 3600);
      var minutes = Math.floor((elapsed % 3600) / 60);
      var seconds = elapsed % 60;
      
      uptimeDiv.textContent = `网站已经萌萌哒运行了 ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
  }
  
  // 初始更新
  updateUptime();
  
  // 每秒更新一次运行时间
  setInterval(updateUptime, 1000);
});