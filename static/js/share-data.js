// static/js/share-data.js - 最终版：关闭自动播放/弹幕，显示完整控件
const shareData = {
    videos: [
        {
            name: "并不是打穿天山容易，而是天山那头有人民",
            cover: "./static/img/video1_cover.jpg",
            src: "./static/video/video1.mp4",
            b站链接: "https://www.bilibili.com/video/BV1FBrdBFEWe",
            copyright: "博主ID：626297715 | 荒草音乐",
            thought: "阿盼感悟：中华人民共和国万岁"
        },
        {
            name: "爱上的过程也是爱",
            cover: "./static/img/video2_cover.jpg",
            src: "./static/video/video2.mp4",
            b站链接: "https://www.bilibili.com/video/BV1Ee411J7qr",
            copyright: "博主ID：5770768 | 我有两条狗你呢",
            thought: "阿盼感悟：为辛梅尔的爱动容"
        }
    ],
    images: [
        { src: "./static/img/share1.jpg", alt: "风景照1" },
        { src: "./static/img/share2.jpg", alt: "风景照2" },
        { src: "./static/img/share3.jpg", alt: "生活照1" },
        { src: "./static/img/share4.jpg", alt: "生活照2" },
        { src: "./static/img/share5.jpg", alt: "生活照3" }
    ],
    musics: [
        {
            cover: "./static/img/i43.png",
            name: "人间乐",
            singer: "宋佳",
            src: "./static/music/renjianyue.mp3"
        },
        {
            cover: "./static/img/i21.png",
            name: "不属于地球上的",
            singer: "江楠江楠_",
            src: "./static/music/bushuyu.mp3"
        }
    ]
};

function renderSharePage() {
    // 渲染视频列表（核心：B站嵌入参数全优化）
    const videoListEl = document.querySelector('.video-list');
    if (shareData.videos && shareData.videos.length > 0) {
        let videoHtml = '';
        shareData.videos.forEach(video => {
            const bvid = video.b站链接.split('/').pop();
            videoHtml += `
                <div class="video-item">
                    <!-- 终极优化参数：关闭自动播放/弹幕，显示所有控件，静音默认关闭 -->
                    <iframe 
                        src="//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1
                        &autoplay=0&mute=0&controls=1&danmaku=0&loop=0&fullscreen=1"
                        scrolling="no" 
                        border="0" 
                        frameborder="no" 
                        framespacing="0" 
                        allowfullscreen="true" 
                        width="100%" 
                        height="180"
                        allow="autoplay; fullscreen; picture-in-picture"
                    ></iframe>
                    <div class="video-desc">
                        <div class="video-name">${video.name}</div>
                        <div class="video-link">
                            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
                                <path d="M820 208H204c-13.3 0-24 10.7-24 24v576c0 13.3 10.7 24 24 24h616c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24zm-600 560V264h512v504H220z m120-248h272v64H340v-64zm0 128h272v64H340v-64z"/>
                            </svg>
                            Bilibili Link: <a href="${video.b站链接}" target="_blank" rel="noopener noreferrer">${bvid}</a>
                        </div>
                        <div class="video-copyright">
                            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z m104-420h-66.8c-10.2 0-18.5 8.3-18.5 18.5v32.9c0 10.2 8.3 18.5 18.5 18.5H512v66.8c0 10.2-8.3 18.5-18.5 18.5h-32.9c-10.2 0-18.5-8.3-18.5-18.5V512h-66.8c-10.2 0-18.5-8.3-18.5-18.5v-32.9c0-10.2 8.3-18.5 18.5-18.5H448v-66.8c0-10.2 8.3-18.5 18.5-18.5h32.9c10.2 0 18.5 8.3 18.5 18.5v66.8h66.8c10.2 0 18.5 8.3 18.5 18.5v32.9c0 10.2-8.3 18.5-18.5 18.5z"/>
                            </svg>
                            ${video.copyright}
                        </div>
                        <div class="video-thought">
                            <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
                                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z m-80-424c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H440c-4.4 0-8-3.6-8-8v-16zm0 128c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H440c-4.4 0-8-3.6-8-8v-16z"/>
                            </svg>
                            ${video.thought}
                        </div>
                    </div>
                </div>
            `;
        });
        videoListEl.innerHTML = videoHtml;
    }

    // 渲染图片列表（无修改）
    const imgGridEl = document.querySelector('.img-grid');
    if (shareData.images && shareData.images.length > 0) {
        let imgHtml = '';
        shareData.images.forEach(img => {
            imgHtml += `
                <div class="img-item">
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
        });
        imgGridEl.innerHTML = imgHtml;
    }

    // 渲染音乐列表（无修改）
    const musicListEl = document.querySelector('.music-list');
    if (shareData.musics && shareData.musics.length > 0) {
        let musicHtml = '';
        shareData.musics.forEach(music => {
            musicHtml += `
                <div class="music-item">
                    <div class="music-cover">
                        <img src="${music.cover}" alt="${music.name} Cover">
                    </div>
                    <div class="music-info">
                        <div class="music-name">${music.name}</div>
                        <div class="music-singer">${music.singer}</div>
                    </div>
                    <audio controls preload="none">
                        <source src="${music.src}" type="audio/mpeg">
                        Your browser does not support audio playback
                    </audio>
                </div>
            `;
        });
        musicListEl.innerHTML = musicHtml;
    }
}

window.addEventListener('DOMContentLoaded', renderSharePage);