class MainPage {
    constructor() {
        this.trainBookBtn = document.querySelector("#Train-book-btn");
        this.cinemaBookBtn = document.querySelector("#Cinema-book-btn");
        this.hotelBookBtn = document.querySelector("#Hotel-book-btn");
    }
}

let mainPageObj = new MainPage();

mainPageObj.trainBookBtn.addEventListener("click", () => {
    mainSection.style.display = "none";
})

mainPageObj.cinemaBookBtn.addEventListener("click", () => {
    mainSection.style.display = "none";
})

mainPageObj.hotelBookBtn.addEventListener("click", () => {
    mainSection.style.display = "none";
})