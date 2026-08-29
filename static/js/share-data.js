const shareData = {
    videos: [
        {
            name: "并不是打穿天山容易，而是天山那头有人民",
            cover: "./static/img/thumbs/video1-cover.webp",
            src: "./static/video/Video1.mp4?v=20260812",
            bilibili: "https://www.bilibili.com/video/BV1FBrdBFEWe",
            copyright: "博主ID：626297715 | 荒草音乐",
            thought: "阿盼感悟：中华人民共和国万岁"
        },
        {
            name: "爱上的过程也是爱",
            cover: "./static/img/thumbs/video2-cover.webp",
            src: "./static/video/Video2.mp4?v=20260812",
            bilibili: "https://www.bilibili.com/video/BV1Ee411J7qr",
            copyright: "博主ID：5770768 | 我有两条狗你呢",
            thought: "阿盼感悟：为辛梅尔的爱动容"
        }
    ],
    images: [
        { src: "./static/img/share1.jpg", thumb: "./static/img/thumbs/share1.webp", alt: "Anime scene 01" },
        { src: "./static/img/share2.jpg", thumb: "./static/img/thumbs/share2.webp", alt: "Anime scene 02" },
        { src: "./static/img/share3.jpg", thumb: "./static/img/thumbs/share3.webp", alt: "Anime scene 03" },
        { src: "./static/img/share4.jpg", thumb: "./static/img/thumbs/share4.webp", alt: "Anime scene 04" },
        { src: "./static/img/share5.jpg", thumb: "./static/img/thumbs/share5.webp", alt: "Anime scene 05" },
        { src: "./static/img/share6.png", thumb: "./static/img/thumbs/share6.webp", alt: "Anime scene 06" },
        { src: "./static/img/share7.png", thumb: "./static/img/thumbs/share7.webp", alt: "Anime scene 07" },
        { src: "./static/img/share8.png", thumb: "./static/img/thumbs/share8.webp", alt: "Anime scene 08" },
        { src: "./static/img/share9.png", thumb: "./static/img/thumbs/share9.webp", alt: "Anime scene 09" },
        { src: "./static/img/share10.png", thumb: "./static/img/thumbs/share10.webp", alt: "Anime scene 10" }
    ],
    musics: [
        { cover: "./static/img/i43.png", name: "人间乐", singer: "宋佳", src: "./static/music/renjianyue.mp3" },
        { cover: "./static/img/i21.png", name: "不属于地球上的", singer: "江楠江楠_", src: "./static/music/bushuyu.mp3" },
        { cover: "./static/img/qinxian-cover.webp", name: "谁动了我的琴弦", singer: "周笔畅", src: "./static/music/qinxian.mp3" },
        { cover: "./static/img/record-player-cover.svg", name: "Record Player", singer: "Daisy the Great / AJR", src: "./static/music/record-player.mp3" }
    ]
};

function renderVideos() {
    const container = document.querySelector('.video-list');
    container.innerHTML = shareData.videos.map(video => {
        const bvid = video.bilibili.split('/').pop();
        return `
            <article class="video-item">
                <video poster="${video.cover}" preload="none" controls playsinline>
                    <source src="${video.src}" type="video/mp4">
                    Your browser does not support video playback.
                </video>
                <div class="video-desc">
                    <div class="video-name">${video.name}</div>
                    <div class="video-meta">
                        <div class="video-link">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 14.5 14.5 9M8 7h9v9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 13v5H6V8h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                            Bilibili: <a class="media-link" href="${video.bilibili}" target="_blank" rel="noopener noreferrer">${bvid}</a>
                        </div>
                        <div class="video-copyright">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9.5a4 4 0 1 0 0 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                            ${video.copyright}
                        </div>
                        <div class="video-thought">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 18h8M9 21h6M8.5 15.5A7 7 0 1 1 15.5 15.5C14.5 16.3 14 17 14 18h-4c0-1-.5-1.7-1.5-2.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            ${video.thought}
                        </div>
                    </div>
                </div>
            </article>`;
    }).join('');
}

function setupAlbum() {
    const album = document.querySelector('.album');
    let currentIndex = 0;

    album.innerHTML = `
        <div class="album-stage">
            <button class="album-nav album-prev" type="button" aria-label="Previous photo">‹</button>
            <button class="album-main" type="button" aria-label="Open current photo">
                <img src="" alt="">
            </button>
            <button class="album-nav album-next" type="button" aria-label="Next photo">›</button>
            <span class="album-counter" aria-live="polite"></span>
        </div>
        <div class="album-info">
            <div>
                <span class="album-kicker">Selected scene</span>
                <strong class="album-title"></strong>
            </div>
            <span class="album-hint">Choose a scene</span>
        </div>
        <div class="album-filmstrip" role="listbox" aria-label="Choose an anime scene"></div>`;

    const mainImage = album.querySelector('.album-main img');
    const counter = album.querySelector('.album-counter');
    const title = album.querySelector('.album-title');
    const filmstrip = album.querySelector('.album-filmstrip');

    filmstrip.innerHTML = shareData.images.map((image, index) => `
        <button class="album-thumb" type="button" role="option" data-image-index="${index}" aria-label="Show ${image.alt}" aria-selected="false">
            <img src="${image.thumb}" alt="" decoding="async">
            <span>${String(index + 1).padStart(2, '0')}</span>
        </button>`).join('');

    function selectImage(index, scrollThumbnail = true) {
        currentIndex = (index + shareData.images.length) % shareData.images.length;
        const image = shareData.images[currentIndex];
        mainImage.src = image.src;
        mainImage.alt = image.alt;
        title.textContent = image.alt;
        counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(shareData.images.length).padStart(2, '0')}`;
        filmstrip.querySelectorAll('.album-thumb').forEach((button, buttonIndex) => {
            const active = buttonIndex === currentIndex;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-selected', String(active));
            if (active && scrollThumbnail) button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    }

    album.querySelector('.album-prev').addEventListener('click', () => selectImage(currentIndex - 1));
    album.querySelector('.album-next').addEventListener('click', () => selectImage(currentIndex + 1));
    filmstrip.addEventListener('click', event => {
        const button = event.target.closest('.album-thumb');
        if (button) selectImage(Number(button.dataset.imageIndex));
    });
    album.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            selectImage(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    album.querySelector('.album-main').addEventListener('click', () => openImageDialog(currentIndex));
    selectImage(0, false);
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

function setupMusicPlayer() {
    const player = document.querySelector('.music-player');
    let currentIndex = 0;

    player.innerHTML = `
        <div class="now-playing">
            <div class="now-cover"><img src="" alt=""></div>
            <div class="now-copy">
                <span class="now-kicker">Now Playing</span>
                <h3 class="now-title"></h3>
                <p class="now-artist"></p>
            </div>
            <button class="play-toggle" type="button" aria-label="Play current song">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path class="play-symbol" d="m9 7 8 5-8 5V7Z" fill="currentColor"/>
                    <path class="pause-symbol" d="M8 7h3v10H8zM13 7h3v10h-3z" fill="currentColor"/>
                </svg>
            </button>
            <div class="progress-group">
                <span class="current-time">0:00</span>
                <input class="progress-range" type="range" min="0" max="100" value="0" step="0.1" aria-label="Song progress">
                <span class="total-time">0:00</span>
            </div>
        </div>
        <div class="track-list" role="list" aria-label="Music playlist"></div>
        <audio class="player-audio" preload="metadata"></audio>`;

    const audio = player.querySelector('.player-audio');
    const cover = player.querySelector('.now-cover img');
    const title = player.querySelector('.now-title');
    const artist = player.querySelector('.now-artist');
    const toggle = player.querySelector('.play-toggle');
    const progress = player.querySelector('.progress-range');
    const currentTime = player.querySelector('.current-time');
    const totalTime = player.querySelector('.total-time');
    const trackList = player.querySelector('.track-list');

    trackList.innerHTML = shareData.musics.map((music, index) => `
        <button class="track-item" type="button" data-track-index="${index}">
            <span class="track-number">${String(index + 1).padStart(2, '0')}</span>
            <img src="${music.cover}" alt="" decoding="async">
            <span class="track-copy"><strong>${music.name}</strong><small>${music.singer}</small></span>
            <span class="track-state" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>`).join('');

    function updatePlayingState() {
        const playing = !audio.paused;
        player.classList.toggle('is-playing', playing);
        toggle.setAttribute('aria-label', playing ? 'Pause current song' : 'Play current song');
        trackList.querySelectorAll('.track-item').forEach((item, index) => {
            item.classList.toggle('is-active', index === currentIndex);
            item.classList.toggle('is-playing', index === currentIndex && playing);
        });
    }

    function selectTrack(index, autoplay = false) {
        currentIndex = (index + shareData.musics.length) % shareData.musics.length;
        const music = shareData.musics[currentIndex];
        cover.src = music.cover;
        cover.alt = `${music.name} cover`;
        title.textContent = music.name;
        artist.textContent = music.singer;
        audio.src = music.src;
        audio.load();
        progress.value = 0;
        currentTime.textContent = '0:00';
        totalTime.textContent = '0:00';
        updatePlayingState();
        if (autoplay) audio.play().catch(() => updatePlayingState());
    }

    function togglePlayback() {
        if (audio.paused) audio.play().catch(() => updatePlayingState());
        else audio.pause();
    }

    toggle.addEventListener('click', togglePlayback);
    trackList.addEventListener('click', event => {
        const item = event.target.closest('.track-item');
        if (!item) return;
        const index = Number(item.dataset.trackIndex);
        if (index === currentIndex) togglePlayback();
        else selectTrack(index, true);
    });
    audio.addEventListener('play', updatePlayingState);
    audio.addEventListener('pause', updatePlayingState);
    audio.addEventListener('loadedmetadata', () => {
        progress.max = audio.duration || 100;
        totalTime.textContent = formatTime(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
        progress.value = audio.currentTime;
        currentTime.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener('ended', () => selectTrack(currentIndex + 1, true));
    progress.addEventListener('input', () => { audio.currentTime = Number(progress.value); });
    selectTrack(0);
}

function setupImageDialog() {
    const dialog = document.querySelector('.image-dialog');
    const close = dialog.querySelector('.dialog-close');
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
        const preview = dialog.querySelector('img');
        preview.removeAttribute('src');
        preview.alt = '';
    });
}

function openImageDialog(index) {
    const dialog = document.querySelector('.image-dialog');
    const preview = dialog.querySelector('img');
    const image = shareData.images[index];
    preview.src = image.src;
    preview.alt = image.alt;
    dialog.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    renderVideos();
    setupImageDialog();
    setupAlbum();
    setupMusicPlayer();
});
