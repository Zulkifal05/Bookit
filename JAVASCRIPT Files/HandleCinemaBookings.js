class CinemaBooking extends TrainBookings {  //Cinema class inherits from train class for some common tasks
    constructor() {
        super();
        this.cinemaPage = document.querySelector(".cinema-book-pg");
        this.cinemaSelect = document.querySelector("#cinema-pg-select");
        this.cinemaSearchBtn = document.querySelector(".cinema-pg-filters-srch-btn");
        //Aboce are necessary DOM elements

        this.cinemaFoundedIds = [];  //Id's of all the book buttons of cinemas founded
        this.cinemaSearchBtnPressCount = 0;  //For counting no of clicks of cinema search button so if there are more then 1 click so before displaying new founded cinemas remove previous ones
    }

    LoadCinemaPage() {
        this.cinemaPage.style.display = "flex";
        this.cinemaSearchBtn.addEventListener("click", () => {
            this.BookCinema();
        })
        //Show cinema page and start booking process when user selects the city and presses search button by BookCinema()
    }

    SaveCinemaBooking(City,Cinema,Date,Time,Movie) {
        let toSaveCinemaObj = {
            username : user.username,
            booking : "cinema",
            city : City,
            cinema : Cinema,
            date : Date,
            time : Time,
            movie : Movie
        }  //Create object of booked cinema ticket for saving booking in localstorage
        let Bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        Bookings.push(toSaveCinemaObj);
        localStorage.setItem("bookings",JSON.stringify(Bookings));
        //Above get bookings array from localstorage push new cinema booking object in array and again save that array in localstorage
        alert("Booking Done!");
    }

    GenerateInfoPara(text) {  //Function to generate a paragraph in case of problem with search
        user.footer.style.position = "absolute";
        this.cinemaSearchBtn.disabled = true;
        let cinemaInfoPara = document.createElement("p");
        cinemaInfoPara.setAttribute("class","Cinema-info-para");
        cinemaInfoPara.innerText = text;
        this.cinemaPage.append(cinemaInfoPara);
        setTimeout(() => {
            cinemaInfoPara.remove();
            this.cinemaSearchBtn.disabled = false;
        },1500)
        //Disable search button while information is displayed
    }

    BookCinema() {
        if(this.cinemaSelect.value === "Empty") {  //If user left city select empty then call the function to generate information
            if(this.cinemaSearchBtnPressCount > 0) {
                document.getElementById("remove").remove();
                this.cinemaSearchBtnPressCount = 0;
            }
            //Above is to remove previous showed cinemas before displaying error message
            this.GenerateInfoPara("Please Select A City!");
        }
        else {  //If user selected a city and no error occured
            let cinemaFoundedContainer = document.createElement("div");
            cinemaFoundedContainer.setAttribute("class","Cinema-founded-container");
            cinemaFoundedContainer.id = "remove"; //Beacause in case of new search when previous are displayed remove previous before showing new
            //Above is container for holding all founded cinemas divs

            if(this.cinemaSearchBtnPressCount > 0) {
                document.getElementById("remove").remove();
            }
            this.cinemaSearchBtnPressCount++;
            //Above is to increase search button count evertytime button is pressed & also removing previously showed cinemas by tracking it by search button press count
            
            let cinemaInfo = JSON.parse(localStorage.getItem("movieShows"));  //Get movie information stored from localstorage
            let cinemasFoundedCount = 0; //Track no of cinemas founded at a city
            for(let i=0 ; i<cinemaInfo.length ; i++) {
                //Check each object in movie information array and get only those objects whose city is same as user entered city
                if(cinemaInfo[i].city === this.cinemaSelect.value) {
                    //Create a div for holding one cinema founded information
                    let cinemaFounded = document.createElement("div");
                    
                    //Create paragraphs containing information about founded cinema by calling base class function
                    let cinemaCity = this.GenerateFoundedInfo(this.cinemaSelect.value,"City","Cinema-founded-paras");
                    let cinemaName = this.GenerateFoundedInfo(cinemaInfo[i].cinema,"Cinema","Cinema-founded-paras");
                    let showDate = this.GenerateFoundedInfo(cinemaInfo[i].date,"Date","Cinema-founded-paras");
                    let showTime = this.GenerateFoundedInfo(cinemaInfo[i].time,"Time","Cinema-founded-paras");
                    let movie = this.GenerateFoundedInfo(cinemaInfo[i].movie,"Movie","Cinema-founded-paras");
                    
                    //Create book btn for every founded cinema div
                    let cinemaBookBtn = document.createElement("button");
                    cinemaBookBtn.innerText = "Book it";
                    cinemaBookBtn.id = "Cinema-founded-book-btn";
                    cinemaBookBtn.setAttribute("class","Cinema-founded-book-btn");
                    
                    //Append all the created paragraphs & button to div containing one founded cinema information
                    cinemaFounded.append(cinemaCity);
                    cinemaFounded.append(cinemaName);
                    cinemaFounded.append(showDate);
                    cinemaFounded.append(showTime);
                    cinemaFounded.append(movie);
                    cinemaFounded.append(cinemaBookBtn);
                    cinemaFounded.setAttribute("class","Cinema-founded");
                    
                    //Append founded cinema div to the main founded cinemas container
                    cinemaFoundedContainer.append(cinemaFounded);
                    cinemasFoundedCount++;  //Increase count by 1 for every founded cinema
                }
            }

            if(cinemasFoundedCount > 1) {
                user.footer.style.position = "static";
            }
            else if(cinemasFoundedCount === 0) {
                this.GenerateInfoPara("No Cinemas Founded In Selected City!");
            }
            else {
                user.footer.style.position = "absolute";
            }
            //Above is setting footer position with respect to number of cinemas founded
            this.cinemaPage.append(cinemaFoundedContainer);  //Append founded cinemas container in cinema page

            let foundedCinemasDivs = document.querySelectorAll(".Cinema-founded");
            let foundedCinemasBookBtn = document.querySelectorAll("#Cinema-founded-book-btn");
            //Above getting all the founded cinemas divs & book buttons of those divs
            
            //Below is event listener for every button of each founded cinema div
            foundedCinemasBookBtn.forEach((cinemaBookBtn,index) => {
                cinemaBookBtn.addEventListener("click", () => {
                    let toSaveCity = foundedCinemasDivs[index].childNodes[0].innerText;
                    let toSaveCinema = foundedCinemasDivs[index].childNodes[1].innerText;
                    let toSaveDate = foundedCinemasDivs[index].childNodes[2].innerText;
                    let toSaveTime = foundedCinemasDivs[index].childNodes[3].innerText;
                    let toSaveMovie = foundedCinemasDivs[index].childNodes[4].innerText;
                    //Above get the innerText of all the nodes in founded cinemas divs and then call function to save booking
                    
                    this.SaveCinemaBooking(toSaveCity,toSaveCinema,toSaveDate,toSaveTime,toSaveMovie);
                })
            })
        }
    }
}

let cinemaBookObj = new CinemaBooking()
