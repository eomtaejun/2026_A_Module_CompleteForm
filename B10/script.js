const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let drawing=false;

document.addEventListener("mousedown", e=>{
    if(e.target.tagName!=="CANVAS") return;
    drawing=true;

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
})

document.addEventListener("mousemove", e=>{
    if(!drawing) return;

    if(e.target.tagName==="BUTTON") return;

    if(e.target.tagName==="CANVAS") ctx.lineTo(e.offsetX, e.offsetY);
    else if(e.target.tagName!=="CANVAS") ctx.lineTo(e.offsetX-canvas.offsetLeft, e.offsetY-canvas.offsetTop);
    ctx.stroke();
    // ctx.closePath();
})

document.addEventListener("mouseup", e=>{
    drawing=false;
})

document.querySelector(".clear").addEventListener("click", e=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector(".save").addEventListener("click", e=>{
    const a=document.createElement("a");
    a.download="canvas.png";
    a.href=canvas.toDataURL("image/png");
    a.click();
})