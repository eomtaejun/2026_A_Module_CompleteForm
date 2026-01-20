const readFile=async (file)=>{
    return new Promise((res, rej)=>{
        let reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(rs)=>res(rs.target.result); // important
    })
}

const loadImage=async (url)=>{
    return new Promise((res, rej)=>{
        let img=new Image();
        img.src=url;
        img.onload=()=>res(img);
    })
}

document.addEventListener("dragover", e=>{
    e.preventDefault();
})

document.querySelector(".box").addEventListener("drop", async e=>{
    e.preventDefault();

    // important
    const file=e.dataTransfer.files[0];
    const base=await readFile(file);
    const img=await loadImage(base);

    e.target.appendChild(img);
    document.querySelector("p").classList.add("d-none");
})

document.querySelector("button").addEventListener("click", e=>{
    document.querySelector("p").classList.remove("d-none");
    document.querySelector("img").remove();
})