const leftArrow = document.getElementById("left-arrow-click");
const rightArrow = document.getElementById("right-arrow-click");

// const creationCard = document.getElementById("creation-card");
// const updateCard = document.getElementById("update-card")

leftArrow.addEventListener("click", () => {
    const active = document.querySelector(".active-slide");
    const inactive = document.querySelector(".inactive-slide-right");

    if (inactive) {
        active.classList.add("inactive-slide-left")
        active.classList.remove("active-slide");

        inactive.classList.add("active-slide");
        inactive.classList.remove("inactive-slide-right");
    }
});

rightArrow.addEventListener("click", () => {
    const active = document.querySelector(".active-slide");
    const inactive = document.querySelector(".inactive-slide-left");

    if (inactive) {
        active.classList.add("inactive-slide-right")
        active.classList.remove("active-slide");

        inactive.classList.add("active-slide");
        inactive.classList.remove("inactive-slide-left");
    }
});