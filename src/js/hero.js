
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTarget = () => {
        const targetElement = document.getElementById('workTogether');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Element with ID "workTogether" not found.');
        }
    };

    const scrollButton = document.getElementById('scrollButton');
    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToTarget);
    } else {
        console.error('Element with ID "scrollButton" not found.');
    }
});
