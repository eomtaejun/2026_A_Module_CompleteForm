const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

let datas=new Array();
let colors=new Array();
let total=0;

const getColor=()=>{
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
}

const draw=()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let startAngle=-(Math.PI/2);
    total=datas.reduce((acc, value)=>acc+value.value, 0);

    datas.forEach((data, index)=>{
        const angle=(data.value/total)*(Math.PI*2);
        colors.push(getColor());

        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.arc(canvas.width/2, canvas.height/2, canvas.width/4, startAngle, startAngle+angle);
        ctx.fillStyle=colors[index];
        ctx.fill();
        ctx.closePath();

        startAngle+=angle;
    })
}

const labels=()=>{
    document.querySelector("#legend").innerHTML=datas.map((data, index)=>`
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${colors[index]}"></div>
            <span>${data.name} (${Math.round((data.value/total)*100)}%)</span>
        </div>
    `).join("");
}

document.querySelector(".add-btn").addEventListener("click", e=>{
    datas.push({
        name: document.querySelector("#labelInput").value,
        value: Number(document.querySelector("#valueInput").value)
    });

    document.querySelector("#labelInput").value="";
    document.querySelector("#valueInput").value="";

    draw();
    labels();
})