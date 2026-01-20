const inputs=document.querySelectorAll("input");
const btn=document.querySelector("button");

const disabled=()=>{
    const values=[...inputs].map(elem=>elem.value);                     // value 변수를 따로 다루는 것이 아닌 input들의 값을 매칭해 사용

    if(values.some(value=>value==="")) btn.classList.add("disabled");   // inputs 중에 빈 값이 있다면 disabled
    else btn.classList.remove("disabled");
}

inputs.forEach((input, index)=>{
    input.addEventListener("input", e=>{
        const value=e.target.value;                         // 현재 event가 일어난 input의 value
        if(/[^\d]/.test(value)) return e.target.value="";   // 숫자 아니면 return

        if(index<inputs.length-1) inputs[index+1].focus();  // 마지막 index가 아니면 다음 index에 focus
        
        disabled();
    })

    input.addEventListener("keydown", e=>{
        if(e.key==="Tab") e.preventDefault();   // tab으로 focus 변경 방지
        if(e.key!=="Backspace") return;         // backspace만 작동

        if(e.target.value!=="") input.value=""; // 현재 값이 존재한다면 삭제 (6번 input)
        else if(index>0){                       // 현재 입력창이 비어있다면 이전 입력창으로 이동
            inputs[index-1].focus();            // 이전 칸으로 focus 이동
            inputs[index-1].value="";           // 이동한 칸의 글자 지움
        }

        disabled();
    })
})