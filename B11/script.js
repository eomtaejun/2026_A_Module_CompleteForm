const main=document.querySelector("#main");
const reset=document.querySelector("#reset");

/**
 * 0: 초기 상태
 * 1: 계속
 * 2: 중지
 */
let state=0;

let start=0;
let total=0;

const format=n=>String(n).padStart(2, "0");

const render=now=>{
    const m=Math.floor(now/60000);
    const s=Math.floor(now/1000)%60;
    const ms=now%1000;

    document.querySelector("p").textContent=`${format(m)}:${format(s)}:${String(ms).padStart(3, "0")}`;
}

const loop=()=>{
    if(state!==1) return;

    render(Date.now()-start+total);
    requestAnimationFrame(loop);
}

main.addEventListener("click", e=>{
    state=state===1 ? 2 : 1;

    main.textContent=state===1 ? "중지" : "계속";
    reset.hidden=false;

    if(state===1){
        start=Date.now();
        loop();
    } else{
        total+=Date.now()-start;
    }
})

reset.addEventListener("click", e=>{
    state=0;
    main.textContent="시작";
    reset.hidden=true;

    start=0;
    total=0;
    render(0);
})