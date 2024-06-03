(() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
      body: document.querySelector('body'),
      menuLinks: document.querySelectorAll('.mob-menu-link')
    };
  
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
      refs.body.classList.toggle('no-scroll')
    
    if (refs.modal.classList.contains('is-hidden')) {
        refs.openModalBtn.style.display = "block";
        refs.closeModalBtn.style.display = "none";
        }

    else  { 
        refs.openModalBtn.style.display = "none";
        refs.closeModalBtn.style.display = "block";
    }
}
 refs.menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        toggleModal();
    });
 });  
  })();

