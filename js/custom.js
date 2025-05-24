document.addEventListener("DOMContentLoaded", function () {
    const title = document.querySelector(".presentation-video__title");
    let appearScrollY = null;
    const maxDelta = 500;
    const maxScale = 1.5;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                title.classList.add("moving");
                appearScrollY = window.scrollY;
                window.addEventListener("scroll", handleScroll);
                console.log("Заголовок на подходе – класс 'moving' добавлен");
            } else {
                title.classList.remove("moving");
                title.style.transform = "scale(1)";
                appearScrollY = null;
                window.removeEventListener("scroll", handleScroll);
                console.log("Заголовок ушёл – класс 'moving' удалён");
            }
        });
    }, {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -200px 0px"
    });

    observer.observe(title);

    function handleScroll() {
        if (appearScrollY === null) return;

        const delta = window.scrollY - appearScrollY;
        const clamped = Math.min(Math.max(delta, 0), maxDelta);
        const progress = clamped / maxDelta;
        const scale = 1 + progress * (maxScale - 1);

        title.style.transform = `scale(${scale})`;
    }
});
