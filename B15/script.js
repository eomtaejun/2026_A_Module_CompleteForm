let datas=new Array();

const parsing=(text)=>{
    const rows=text.split("\n");
    const header=rows.shift().split(",");

    return rows.map(row=>{
        const values=row.split(",");

        return header.reduce((acc, head, index)=>{
            acc[head.trim()]=values[index];

            return acc;
        }, {})
    })
}

const getData=async ()=>{
    const data=await fetch("./sample-data.csv");
    return await data.text();
}

let page=0;
const limit=10;

const load=()=>{
    document.querySelector("#tableBody").innerHTML=datas
    // .filter((data, index)=>index>=(page*10) && index<((page+1)*limit))
    .slice(page*limit, (page+1)*limit)
    .map(data=>`
        <tr>
            ${Object.values(data).map(v=>`<td>${v}</td>`).join("")}
        </tr>
    `).join("");

    pagination();
}

const pagination=()=>{
    const total=Math.ceil(datas.length/limit);

    // ...count.map(value=>`<button class="${page===value && "active"}" data-page="${value}">${value+1}</button>`),
    document.querySelector("#pagination").innerHTML=[
        `<button data-control="prev" ${page===0 ? "disabled" : ""}>이전</button>`,
        ...Array.from({length: total}, (_, index)=>`<button class="${page===index ? "active" : ""}" data-page="${index}">${index+1}</button>`),
        `<button data-control="next" ${page===total ? "disabled" : ""}>다음</button>`
    ].join("");
}

document.querySelector("#pagination").addEventListener("click", e=>{
    if(e.target.dataset.page){
        page=Number(e.target.dataset.page);
    }

    if(e.target.dataset.control==="prev"){
        page=Math.max(0, --page);
    }
    if(e.target.dataset.control==="next"){
        page=Math.min((datas.length/limit)-1, ++page);
    }

    load();
})


getData().then(res=>{
    datas=parsing(res);
    console.log(datas)

    load();
    pagination();
})