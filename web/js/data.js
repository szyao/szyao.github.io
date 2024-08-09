/*
 * @Author: N0ts
 * @Date: 2021-06-12 20:02:41
 * @LastEditTime: 2023-04-20 13:51:22
 * @Description: 我的第三个个人主页
 * @FilePath: /NutssssIndex3/js/data.js
 * @Mail：mail@n0ts.top
 */

export default {
    themeSelect: "dark",
    // 主题
    themes: {
        white: [
            // 背景颜色
            ["--bgColor", "rgb(255, 165, 92)"],
            // 第一屏背景颜色
            ["--firstBgColor", "linear-gradient(to top, rgb(255, 165, 92), rgb(255, 159, 49))"],
            // 山颜色
            ["--hillColor1", "rgb(115, 49, 54)"],
            ["--hillColor2", "rgb(131, 55, 59)"],
            ["--hillColor3", "rgb(162, 72, 80)"],
            ["--hillColor4", "rgb(221, 102, 107)"],
            // 大地颜色
            ["--earth", "linear-gradient(to top right, rgb(202, 112, 117), rgb(126, 50, 53))"],
            // 小草颜色
            ["--cao", "linear-gradient(to top, rgb(202, 112, 117), rgb(126, 50, 53))"],
            // 标题文字颜色
            ["--titleColor", "rgb(255, 69, 32)"],
            // 标题文字阴影
            ["--titleShadow", "2px 2px 0px rgba(255, 255, 255, .8), 0 0 10px rgba(0, 0, 0, .5)"],
            // 图标菜单阴影
            ["--iconShadow", "0 0 5px white"]
        ],
        dark: [
            // 背景颜色
            ["--bgColor", "rgb(48, 37, 95)"],
            // 第一屏背景颜色
            ["--firstBgColor", "linear-gradient(to top, rgb(78, 36, 88), rgb(13, 18, 51))"],
            // 山颜色
            ["--hillColor1", "rgb(36, 32, 74)"],
            ["--hillColor2", "rgb(41, 35, 94)"],
            ["--hillColor3", "rgb(65, 37, 71)"],
            ["--hillColor4", "rgb(87, 50, 95)"],
            // 大地颜色
            ["--earth", "linear-gradient(to top right, rgb(43, 38, 95), rgb(61, 36, 95))"],
            // 小草颜色
            ["--cao", "linear-gradient(to top, rgb(85, 49, 96), rgb(78, 72, 128))"],
            // 标题文字颜色
            ["--titleColor", "rgb(136, 65, 167)"],
            // 标题文字阴影
            ["--titleShadow", "2px 2px 0px rgba(255, 255, 255, .8), 0 0 10px rgba(0, 0, 0, .5)"],
            // 图标菜单阴影
            ["--iconShadow", "0 0 2px white"]
        ]
    },
    lovexhj1: {
        title: "牧之 ｜ 主页",
        subTitle: "花有重开日，人无再少年。",
        menu: [
            {
                name: "Email",
                icon: "fa-envelope",
                link: "mailto:yao@mzlog.com"
            },
                        {
                name: "微信",
                icon: "fa-weixin",
                link: "https://wpa.qq.com/msgrd?v=3&uin=1656071287&site=qq&menu=yes"
            },
            {
                name: "Gitee",
                icon: "fa-github",
                link: "https://github.com/szyao"
            },
            {
                name: "阿里云盘",
                icon: "fa-cloud",
                link: "https://www.alipan.com/drive/home"
            },
            {
                name: "知识库",
                icon: "fa-book",
                link: "https://www.yuque.com/szyao/note"
            }
        ]
    },
    lovexhj2: {
        content: `
        <h2>我是 牧之，</h2>
        <p>一名<b>💻代码开发者</b>，目前是在读学生，现在🌏北京实习，最爱**；</p>
        <p>用#️⃣代码去与计算机进行沟通，是我最喜欢做的事；🔋</p>
        <p>我也开源的一些小作品，去提升自己的开发能力⭐；</p>
        <p>当然，我也很乐意与志同道合的朋友🤙一起学习，可在上方来找我哦。</p>
        <p>即使前方的路看似绝境🌋，也要有硬生生为自己开辟出一条道路的勇气！💪</p>
        <p>
            我的开源：<a href="https://github.com" target="_blank">📁Github</a> ；
            我的博客：<a href="https://mzlog.com/" target="_blank">📚Blog</a> 。
        </p>`,
        cropright :'<a  target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">苏ICP备19043277号</a>'                     ,
        img: "./images/hsl.webp"
    }
};
