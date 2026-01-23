let datas=new Array();
let favorites=new Array();

// favorites=JSON.parse(localStorage.getItem("favorites")) ?? new Array();
const storage=param=>param ? localStorage.setItem("favorites", JSON.stringify(param)) : JSON.parse(localStorage.getItem("favorites")) ?? new Array();

const getData=async ()=>{
    const data=await fetch("./data.json");
    return await data.json();
}

const load=()=>{
    document.querySelector(".list").innerHTML=datas.map(data=>{
        const isFavorite=favorites.includes(data.id);
        
        return `
        <div class="p-3 mb-2 bg-white border rounded-3 shadow-sm d-flex jcb aic">
            <div>
                <p class="mb-0 fx-3 fw-bold">${data.name}</p>
                <p class="mb-0 fx-1 text-secondary fw-semibold">${data.desc}</p>
            </div>

            <span data-id="${data.id}" class="p-1 fx-3 text-${isFavorite ? "warning" : "dark"}">${isFavorite ? "★" : "☆"}</span>
        </div>
    `;
    }).join("");
}

getData().then(res=>{
    datas=res;
    favorites=storage();
    console.log(datas);
    console.log(favorites);
    load();
})

document.querySelector(".list").addEventListener("click", e=>{
    const id=Number(e.target.dataset.id);
    if(!id) return;

    // if(favorites.find(value=>value===id)) favorites=favorites.filter(value=>value!==id);
    // else favorites.push(id);

    favorites=favorites.includes(id) ? favorites.filter(value=>value!==id) : [...favorites, id];

    storage(favorites);
    load();
})