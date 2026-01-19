document.querySelector("input").addEventListener("input", e=>{
    const value=e.target.value;
    console.log(value)

    if(value.length>=8 && /[A-Z]+/.test(value) && /[\d]+/.test(value) && /[^A-Za-z가-힣\d\s]+/.test(value)){
        e.target.classList.remove("border-danger", "border-warning", "border-success");
        e.target.classList.add("border-success");
    }
    else if(value.length>=6 && /[A-Z]+/.test(value) && /[\d]+/.test(value)){
        e.target.classList.remove("border-danger", "border-warning", "border-success");
        e.target.classList.add("border-warning");
    }
    else{
        e.target.classList.remove("border-danger", "border-warning", "border-success");
        e.target.classList.add("border-danger");
    }
})