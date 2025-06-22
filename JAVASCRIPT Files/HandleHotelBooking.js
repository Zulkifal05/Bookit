class HotelBookings extends CinemaBooking {
    constructor() {
        super();
        this.hotelPage = document.querySelector(".Hotel-page");
        this.hotelSelect = document.querySelector("#hotel-select");
        this.hotelSearchBtn = document.querySelector(".hotel-filter-search-btn");
        //Above are necessay DOM elements

        this.hotelsFoundedIds = [];  //Id's of all the booked hotels
        this.hotelSearchBtnPressCount = 0;  //Counting no of press count of filters search button
    }

    LoadHotelPage() {
        this.hotelPage.style.display = "flex";
        this.hotelSearchBtn.addEventListener("click", () => {
            this.BookHotel();
        })
        //Event listener for filters search button after showing hotel page
    }

    SaveHotelBooking(City,Hotel,Rating,Price,Type) {
        let toSaveHotelObj = {
            username : user.username,
            booking : "hotel",
            city : City,
            hotel : Hotel,
            Rating : Rating,
            price : Price,
            type : Type
        }  //Create object of booked hotel for saving booking in localstorage
        let Bookings = JSON.parse(localStorage.getItem("bookings"));
        Bookings.push(toSaveHotelObj);
        localStorage.setItem("bookings",JSON.stringify(Bookings));
        //Above get bookings array from localstorage push new hotel booking object in array and again save that array in localstorage
        alert("Booking Done!");
    }

    GenerateInformationPara(text) {  //Function to generate a paragraph in case of problem with search
        user.footer.style.position = "absolute";
        this.hotelSearchBtn.disabled = true;
        let hotelInfoPara = document.createElement("p");
        hotelInfoPara.setAttribute("class","Hotel-info-para");
        hotelInfoPara.innerText = text;
        this.hotelPage.append(hotelInfoPara);
        setTimeout(() => {
            hotelInfoPara.remove();
            this.hotelSearchBtn.disabled = false;
        },1500)
        //Disable search button while information is displayed
    }

    BookHotel() {
        if(this.hotelSelect.value === "Empty") {  //If user left city select empty then call the function to generate information
            if(this.hotelSearchBtnPressCount > 0) {
                document.getElementById("remove").remove();
                this.hotelSearchBtnPressCount = 0;
            }
            //Above is to remove previous showed hotels before displaying error message
            this.GenerateInformationPara("Please Select A City!");
        }
        else {
            let hotelFoundedContainer = document.createElement("div");
            hotelFoundedContainer.setAttribute("class","Hotel-founded-container");
            hotelFoundedContainer.id = "remove"; //Beacause in case of new search when previous are displayed remove previous before showing new
            //Above is container for holding all founded hotels divs

            if(this.hotelSearchBtnPressCount > 0) {
                document.getElementById("remove").remove();
            }
            this.hotelSearchBtnPressCount++;
            //Above is to increase search button count evertytime button is pressed & also removing previously showed cinemas by tracking it by search button press count

            let hotelInfo = JSON.parse(localStorage.getItem("hotels"));  //Get hotels from localstorage
            let hotelsFoundedCount = 0;  //Track no of hotels founded
            for(let i=0 ; i<hotelInfo.length ; i++) {
                if(hotelInfo[i].city === this.hotelSelect.value) {
                    let hotelFounded = document.createElement("div");
                    //Create div for containing information about 1 hotel founded

                    //Create paragraphs containing information about founded hotels by calling base class function
                    let hotelCity = this.GenerateFoundedInfo(this.hotelSelect.value,"City","Hotel-founded-paras");
                    let hotelName = this.GenerateFoundedInfo(hotelInfo[i].hotelName,"Hotel","Hotel-founded-paras");
                    let hotelRating = this.GenerateFoundedInfo(hotelInfo[i].hotelRating,"Rating","Hotel-founded-paras");
                    let hotelPrice = this.GenerateFoundedInfo(hotelInfo[i].price,"Price","Hotel-founded-paras");
                    let roomType = this.GenerateFoundedInfo(hotelInfo[i].roomType,"Room Type","Hotel-founded-paras");

                    //Create book btn for every founded hotel div
                    let hotelBookBtn = document.createElement("button");
                    hotelBookBtn.innerText = "Book it";
                    hotelBookBtn.id = "Hotel-founded-book-btn";
                    hotelBookBtn.setAttribute("class","Hotel-founded-book-btn");

                    //Append all the created paragraphs & button to div containing one founded cinema information
                    hotelFounded.append(hotelCity);
                    hotelFounded.append(hotelName);
                    hotelFounded.append(hotelRating);
                    hotelFounded.append(hotelPrice);
                    hotelFounded.append(roomType);
                    hotelFounded.append(hotelBookBtn);
                    hotelFounded.setAttribute("class","Hotel-founded");

                    //Append founded hotels div to the main founded hotels container
                    hotelFoundedContainer.append(hotelFounded);
                    hotelsFoundedCount++;  //Increase count by 1 for every founded hotel
                }
            }

            if(hotelsFoundedCount > 1) {
                user.footer.style.position = "static";
            }
            else if(hotelsFoundedCount === 0) {
                this.GenerateInformationPara("No Hotels Founded In Selected City!");
            }
            else {
                user.footer.style.position = "absolute";
            }
            //Above is setting footer position with respect to number of hotels founded
            this.hotelPage.append(hotelFoundedContainer);  //Append founded hotels container in cinema page

            let foundedHotelsDivs = document.querySelectorAll(".Hotel-founded");
            let foundedHotelsBookBtn = document.querySelectorAll("#Hotel-founded-book-btn");
            //Above getting all the founded hotels divs & book buttons of those divs

            //Below is event listener for every button of each founded cinema div
            foundedHotelsBookBtn.forEach((hotel,index) => {
                hotel.addEventListener("click", () => {
                    let toSaveCity = foundedHotelsDivs[index].childNodes[0].innerText;
                    let toSaveHotel = foundedHotelsDivs[index].childNodes[1].innerText;
                    let toSaveRating = foundedHotelsDivs[index].childNodes[2].innerText;
                    let toSavePrice = `${foundedHotelsDivs[index].childNodes[3].innerText} Rs`;
                    let toSaveType = foundedHotelsDivs[index].childNodes[4].innerText;

                    //Above get all the chilnodes containing information and save them by calling saving function below 
                    this.SaveHotelBooking(toSaveCity,toSaveHotel,toSaveRating,toSavePrice,toSaveType);
                })
            })
        }
    }
}

let hotelObj = new HotelBookings();