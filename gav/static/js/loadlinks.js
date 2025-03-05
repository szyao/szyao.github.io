// JSON数据的URL
const jsonUrl = 'static/links/links.json';
// 使用fetch获取JSON数据
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const bookmarksContainer = document.getElementById('bookmarks');
        bookmarksContainer.innerHTML = ''; // 清空容器
        // 遍历数据
        data.forEach(group => {
            // 创建title元素
            const titleHtml = `<li class="title"><i class="iconfont icon-windows"></i>${group.class}</li>`;
            bookmarksContainer.innerHTML += titleHtml;
            group.links.forEach(link => {
                // 创建列表项
                const linxHtml = 
                `<li><a rel="nofollow" href="${link.url}" target="_blank">
                    <i class="iconfont ${link.icon}"  style="color:${link.color};"></i>
                    ${link.title}</a></li>`;
                bookmarksContainer.innerHTML += linxHtml;
            });

        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
