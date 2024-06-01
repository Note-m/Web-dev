export function manageModal () {
    const workTogetherForm =  document.querySelector(".work-together-form");
    const workTogetherModal = document.querySelector(".work-together-backdrop");
    const workTogetherModalButton = document.querySelector(".work-together-modal-btn-closing")
    const workTogetherInputEmail =document.querySelector(".work-together-input-email")
    const workTogetherErrorMessage =document.querySelector(".work-together-error-message")

   
    workTogetherForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        
        if(workTogetherInputEmail.value.trim() !== "" && workTogetherInputEmail.value.trim() !== " " ) {
            workTogetherErrorMessage.classList.remove("active")
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workTogetherInputEmail.value.trim()) === true) {
                workTogetherModal.classList.add("active")
                workTogetherInputEmail.style.color ="black"
            }
            else {
                workTogetherErrorMessage.innerHTML ="Olease input correct Email adress"
                workTogetherInputEmail.style.color ="red"
                workTogetherErrorMessage.classList.add("active")
            }
            
        }
        else {
            workTogetherErrorMessage.innerHTML ="Email cannnot be blank"
            workTogetherErrorMessage.classList.add("active")

        }

        
    })


    workTogetherModalButton.addEventListener("click", ()=>{
        console.log(workTogetherModalButton);
        workTogetherModal.classList.remove("active")
        workTogetherInputEmail.value = "";
    })


}