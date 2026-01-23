const readFile=async (file)=>{
    return new Promise((res, rej)=>{
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(rs)=>res(rs.target.result);
    })
}

const loadImage=async (url)=>{
    return new Promise((res, rej)=>{
        let img=new Image();
        img.src=url;
        img.onload=()=>res(img);
    })
}

document.querySelector("input").addEventListener("input", async e=>{
    const file=e.target.files[0];
    const base=await readFile(file);
    const img=await loadImage(base);

    document.querySelector(".box").appendChild(img);
})

document.querySelector(".btns").addEventListener("click", e=>{
    const filter=e.target.dataset.filter;
    if(filter==null) return;

    document.querySelector("img")?.classList.remove("grayscale", "sepia", "invert");
    filter && document.querySelector("img")?.classList.add(filter);
})