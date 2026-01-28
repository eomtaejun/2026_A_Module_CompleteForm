const video=document.querySelector("video");

document.querySelector(".btns").addEventListener("click", e=>{
    const control=e.target.dataset.control;
    if(!control) return;

    switch(control){
        case "pp":
            video[video.paused ? "play" : "pause"]();
            break;
        case "prev":
            video.currentTime-=10;
            break;
        case "next":
            video.currentTime+=10;
            break;
        case "mute":
            video.muted=!video.muted;
            break;
    }
})

video.addEventListener("play", e=>document.querySelector("[data-control='pp']").textContent="일시정지");
video.addEventListener("pause", e=>document.querySelector("[data-control='pp']").textContent="재생");
video.addEventListener("volumechange", e=>document.querySelector("[data-control='mute']").textContent=video.muted ? "음소거 해제" : "소리 음소거");

const timeFormat=(num)=>{
    const m=Math.floor(num/60);
    const s=Math.floor(num%60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const timeSet=()=>{
    document.querySelector(".time").textContent=`${timeFormat(video.currentTime)} / ${timeFormat(video.duration)}`;
}

video.addEventListener("timeupdate", timeSet);
video.addEventListener("loadedmetadata", timeSet);