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
    user.footer.style.bottom = "0px";
    user.mainHeading.innerText = "Search & Book Trains From Here!";  //Change main heading at top of page text
    bookTrainObj.LoadTrainPage();
    //Display train booking page and display none of previous page
})

mainPageObj.cinemaBookBtn.addEventListener("click", () => {
    user.mainSection.style.display = "none";
    user.footer.style.position = "absolute";  //Beacause height of train page is less
    user.footer.style.bottom = "0px";
    user.mainHeading.innerText = "Search & Book Movie Tickets From Here!";  //Change main heading at top of page text
    cinemaBookObj.LoadCinemaPage();
    //Display cinema booking page and display none of previous page
})

mainPageObj.hotelBookBtn.addEventListener("click", () => {
    user.mainSection.style.display = "none";
    user.footer.style.position = "absolute";  //Beacause height of train page is less
    user.footer.style.bottom = "0px";
    user.mainHeading.innerText = "Search & Book Hotels From Here!";  //Change main heading at top of page text
    hotelObj.LoadHotelPage();
    //Display hotel booking page and display none of previous page
})