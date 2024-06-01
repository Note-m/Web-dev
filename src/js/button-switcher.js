const switchThemeBtnEl = document.querySelector('.switch-btn');

export const onSwitchTheme = event => {
switchThemeBtnEl.classList.toggle('dark-on');
document.body.classList.toggle('body-dark'); 
} 

switchThemeBtnEl.addEventListener('click', onSwitchTheme);
document.addEventListener('DOMContentLoaded', () => {
    onSwitchTheme();
});