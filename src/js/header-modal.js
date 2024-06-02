(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    
    if (refs.modal.classList.contains('is-hidden') === true) {
        refs.openModalBtn.style.display = "block";
        refs.closeModalBtn.style.display = "none";
        }

    else  { 
        refs.openModalBtn.style.display = "none";
        refs.closeModalBtn.style.display = "block";
    }
}
    
  })();

