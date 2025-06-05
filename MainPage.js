class MainPage {
    constructor() {
        this.trainBookBtn = document.querySelector("#Train-book-btn");
        this.cinemaBookBtn = document.querySelector("#Cinema-book-btn");
        this.hotelBookBtn = document.querySelector("#Hotel-book-btn");
    }  //DOM element needed from main page (booking buttons)
}

let mainPageObj = new MainPage();

mainPageObj.trainBookBtn.addEventListener("click", () => {  //Event listener for book now of train booking card in main page
    user.mainSection.style.display = "none";
    user.footer.style.position = "absolute";  //Beacause height of train page is less
    book.LoadPage("train");
    //Display train booking page and display none of previous page
})