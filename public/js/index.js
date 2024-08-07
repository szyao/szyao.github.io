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
  const uptimeDiv = document.getElementById('uptime');
  const launchDate = new Date('2023-01-01T00:00:00Z'); // 假设这是网站上线的日期
  const now = new Date();

  const years = now.getFullYear() - launchDate.getFullYear();
  const months = now.getMonth() - launchDate.getMonth();
  let days = now.getDate() - launchDate.getDate();

  // 如果月份小于0，表示跨年，需要调整月份和天数
  if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
  }
  // 如果月份相等但天数小于0，表示跨月，需要调整天数
  if (months === 0 && days < 0) {
      days += 31; // 假设每个月最多31天，实际需要根据具体月份调整
  }

  uptimeDiv.textContent = `网站已萌萌哒经运行了 ${years} 年 ${months} 月 ${days} 天`;
});

document.addEventListener('DOMContentLoaded', async function() {
  const contentArea = document.getElementById('contentArea');
  const apiUrl = ` http://open.iciba.com/dsapi/`; 
  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      contentArea.innerHTML = `
          ${data.content}
          <br/>
          ${data.note}
      `;
  } catch (error) {
      console.error('Error fetching data:', error);
  }
});