const format=(num)=>{
    return String(num).padStart(2, "0");
}

const setTime=()=>{
    const h=new Date().getHours();
    const m=new Date().getMinutes();
    const s=new Date().getSeconds();

    document.querySelector("p").innerText=`${format(h)}:${format(m)}:${format(s)}`;

    requestAnimationFrame(setTime);
}

setTime();