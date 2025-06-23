class Account {
    constructor() {
        this.accountPage = document.querySelector(".Account-page");
        this.Bookings = [];
        this.mainPageBtn = document.querySelector(".Main-page-btn");
    }

    //This function loads account page which basically shows bookings
    LoadAccountPage() {
        this.accountPage.style.display = "flex";
        this.mainPageBtn.style.display = "block";
        this.ShowBookings();
    }

    //This function creates every single line of each booking showed
    CreateParagraph(text) {
        let para = document.createElement("p");
        para.setAttribute("class","Bookings-founded-paras");
        para.innerText = text;
        return para;
    }

    //This function displays train bookings
    ShowBookedTrains(index) {
        let singleBookingContainer = document.createElement("div");
        singleBookingContainer.setAttribute("class","Single-booking-container");

        let user = this.CreateParagraph(`Username : ${this.Bookings[index].username}`);
        let book = this.CreateParagraph(`Booking : ${this.Bookings[index].booking}`);
        let date = this.CreateParagraph(this.Bookings[index].date);
        let depart = this.CreateParagraph(this.Bookings[index].departure);
        let dest = this.CreateParagraph(this.Bookings[index].destination);
        let time = this.CreateParagraph(this.Bookings[index].time);
        
        singleBookingContainer.append(user);
        singleBookingContainer.append(book);
        singleBookingContainer.append(date);
        singleBookingContainer.append(depart);
        singleBookingContainer.append(dest);
        singleBookingContainer.append(time);

        this.accountPage.append(singleBookingContainer);
        document.querySelector(".Account-btn").disabled = true;
    }

    //This function displays cinema bookings
    ShowBookedCinemas(index) {
        let singleBookingContainer = document.createElement("div");
        singleBookingContainer.setAttribute("class","Single-booking-container");

        let user = this.CreateParagraph(`Username : ${this.Bookings[index].username}`);
        let book = this.CreateParagraph(`Booking : ${this.Bookings[index].booking}`);
        let cinema = this.CreateParagraph(this.Bookings[index].cinema);
        let city = this.CreateParagraph(this.Bookings[index].city);
        let date = this.CreateParagraph(this.Bookings[index].date);
        let movie = this.CreateParagraph(this.Bookings[index].movie);
        let time = this.CreateParagraph(this.Bookings[index].time);

        singleBookingContainer.append(user);
        singleBookingContainer.append(book);
        singleBookingContainer.append(cinema);
        singleBookingContainer.append(city);
        singleBookingContainer.append(date);
        singleBookingContainer.append(movie);
        singleBookingContainer.append(time);

        this.accountPage.append(singleBookingContainer);
        document.querySelector(".Account-btn").disabled = true;
    }

    //This function displays hotel bookings
    ShowBookedHotels(index) {
        let singleBookingContainer = document.createElement("div");
        singleBookingContainer.setAttribute("class","Single-booking-container");

        let user = this.CreateParagraph(`Username : ${this.Bookings[index].username}`);
        let book = this.CreateParagraph(`Booking : ${this.Bookings[index].booking}`);
        let rating = this.CreateParagraph(this.Bookings[index].Rating);
        let city = this.CreateParagraph(this.Bookings[index].city);
        let hotel = this.CreateParagraph(this.Bookings[index].hotel);
        let price = this.CreateParagraph(this.Bookings[index].price);
        let type = this.CreateParagraph(this.Bookings[index].type);

        singleBookingContainer.append(user);
        singleBookingContainer.append(book);
        singleBookingContainer.append(rating);
        singleBookingContainer.append(city);
        singleBookingContainer.append(hotel);
        singleBookingContainer.append(price);
        singleBookingContainer.append(type);

        this.accountPage.append(singleBookingContainer);
        document.querySelector(".Account-btn").disabled = true;
    }

    //This function shows bookings and handles showing booking process
    ShowBookings() {
        this.Bookings = JSON.parse(localStorage.getItem("bookings"));  //Fetch all bookings from localstorage
        let foundedBookingsCounter = 0;  // This keeps track of no of bookings found

        for(let i=0 ; i<this.Bookings.length ; i++) {  //Loop for each booking fetched
            if(this.Bookings[i].username === user.username) {  //This condition for further processing only bookings of loggedin user
                foundedBookingsCounter++;
                if(this.Bookings[i].booking === "train") {
                    this.ShowBookedTrains(i);
                }
                else if(this.Bookings[i].booking === "cinema") {
                    this.ShowBookedCinemas(i);
                }
                else if(this.Bookings[i].booking === "hotel") {
                    this.ShowBookedHotels(i);
                }
                //Above 3 conditions for handling respective domain bookings
                //Also index is sent with function call for tracking respective booking in terms of booking type and username
            }
        }

        if(foundedBookingsCounter === 0) {  //If no bookings are found
            let para = document.createElement("p");
            para.innerText = "Currently No Bookings";
            para.style.fontSize = "1.3rem";
            para.style.fontWeight = "bolder";
            para.style.color = "rgb(55, 107, 203)";
            para.style.marginTop = "5%"
            this.accountPage.append(para);
        }
        else if(foundedBookingsCounter > 1) {
            document.querySelector("footer").style.position = "static";
        }
    }
}

let accountObj = new Account();

//Below is for menu button displayed after showing bookings on account page
accountObj.mainPageBtn.addEventListener("click", () => {
    document.querySelector(".Account-btn").disabled = false;
    accountObj.mainPageBtn.style.display = "none";
    //Below 4 lines of code remove those pages from display which maybe displayed when go to home button is pressed
    accountObj.accountPage.style.display = "none";
    document.querySelector(".train-book-page").style.display = "none";
    document.querySelector(".cinema-book-pg").style.display = "none";
    document.querySelector(".Hotel-page").style.display = "none";
    //Below is to remove all the showed bookings if user goes to menu from account page
    document.querySelectorAll(".Single-booking-container").forEach((item) => {
        item.remove();
    })
    document.querySelector(".main-heading").innerText = "Welcome to Bookit!";
    document.querySelector(".main-section").style.display = "flex";
    document.querySelector("footer").style.position = "static";
})

