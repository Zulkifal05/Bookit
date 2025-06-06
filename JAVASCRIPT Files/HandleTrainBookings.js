class TrainBookings {
    constructor() {
        this.trainPage = document.querySelector(".train-book-page");
        this.departureSelect = document.querySelector("#departure-select");
        this.destinationSelect = document.querySelector("#destination-select");
        this.searchTrainBtn = document.querySelector(".train-search-btn");
        //Above are neccesary DOM objects

        this.trainBookBtnPressCount = 0;  //Counter for founded trains at  entered destination & departure
        this.trainsFoundedBookBtn = [];  //Contains id's of all the book buttons of trains founded
    }

    LoadTrainPage() {  //Function to load train page
        this.trainPage.style.display = "flex";
        //When filters search button is clicked BookTrain function should be called
        this.searchTrainBtn.addEventListener("click", () => {
            this.BookTrain();
        })
    }

    CreateNode(text) {  //For creating span tags as required for founded trains
        let node = document.createElement("span");
        node.setAttribute("class","span");
        node.innerText = `${text} : `;
        return node;
    }

    TrainInfoAfterSearch(text) {  //For poping information whenever problem with showing trains
        let emptyLeftPara = document.createElement("p")
        emptyLeftPara.setAttribute("class","emptyLeftPara");
        emptyLeftPara.innerText = `${text}`;
        this.trainPage.append(emptyLeftPara);
        setTimeout(() => {
        emptyLeftPara.remove();
        },1500)
    }

    SaveTrainBooking(dep,dest,times,dates) {  //Function for saving trains booked in localstorage
        let oneTrainBooking = {
            username : user.username,
            booking : "train",
            departure : dep,
            destination : dest,
            time : times,
            date : dates
        }  //Create object containing one train booking record
        //Below is fetching bookings array from localstorage and add new record object in that and again save in localstorage
        let trainBooking = JSON.parse(localStorage.getItem("bookings"));
        trainBooking.push(oneTrainBooking);
        localStorage.setItem("bookings",JSON.stringify(trainBooking));
    }

    BookTrain() {  //Performs functionality after user clicks search train
        let userDeparture = this.departureSelect.value;
        let userDestination = this.destinationSelect.value;
        
        if(userDeparture === "Empty" || userDestination === "Empty") {  //If user didn't selected city for whether departure or destination or both 
            if(this.trainBookBtnPressCount > 0) {  //Track if successfull search buttons presses were greater then 0 so delete previously showed data 
                document.getElementById("remove").remove();
                this.trainBookBtnPressCount = 0;
                user.footer.style.position = "absolute";  //Footer's position absolute beacause height of page is less
            }  //Remove previous all founded trains displayed & reset count to 0 as needed at logic at line 62
            this.TrainInfoAfterSearch("Please Select Cities!");
        }
        else if (userDeparture === userDestination) {  //If user selected same cities for both departure & destination
            if(this.trainBookBtnPressCount > 0) {  //Track if successfull search buttons presses were greater then 0 so delete previously showed data 
                document.getElementById("remove").remove();
                this.trainBookBtnPressCount = 0;
                user.footer.style.position = "absolute";  //Footer's position absolute beacause height of page is less
            }  //Remove previous all founded trains displayed & reset count to 0 as needed at logic at line 62
            this.TrainInfoAfterSearch("Please Select Different Cities!");
        }
        else {  //If cities input is without any error
            let trainArray = JSON.parse(localStorage.getItem("trainTimings"));  //Get traintimings stored in localstorage
            let trainsFounded = 0;  //To track no of trains founded
            let foundedTrainContainer = document.createElement("div");  //Div which will show trains
            foundedTrainContainer.id = "remove";

            if(this.trainBookBtnPressCount > 0) {  //Track if successfull search buttons presses were greater then 0 so delete previously showed data 
                document.getElementById("remove").remove();
            }
            this.trainBookBtnPressCount++;

            for (let i=0 ; i<trainArray.length ; i++) {  //Loop for checking each object stored in array
                if(userDeparture === trainArray[i].departure && userDestination === trainArray[i].destination) {  //If destination & departure is same as user's in localstorage
                    let trainFounded = document.createElement("div");
                    //Created div which will hold one train founded record
    
                    let departurePara = document.createElement("p");
                    departurePara.innerText = `${userDeparture}`;
                    departurePara.prepend(this.CreateNode("From"));
                    departurePara.setAttribute("class","train-founded-paras");
                    //Paragraph for seting From
    
                    let destinationPara = document.createElement("p");
                    destinationPara.innerText = `${userDestination}`;
                    destinationPara.prepend(this.CreateNode("To"));
                    destinationPara.setAttribute("class","train-founded-paras");
                    //Paragraph for seting To

                    let timePara = document.createElement("p");
                    timePara.innerText = `${trainArray[i].time} Hrs`;
                    timePara.prepend(this.CreateNode("Time"));
                    timePara.setAttribute("class","train-founded-paras");
                    //Paragraph for seting time

                    let datePara = document.createElement("p");
                    datePara.innerText = `${trainArray[i].date}`;
                    datePara.prepend(this.CreateNode("Date"));
                    datePara.setAttribute("class","train-founded-paras");
                    //Paragraph for seting date

                    let bookBtn = document.createElement("button");
                    bookBtn.innerText = "Book it";
                    bookBtn.id = "trainsFoundedBookBtn";
                    bookBtn.setAttribute("class","trains-founded-book-btn");
                    //Create booking button in every founded train div

                    trainFounded.append(departurePara);
                    trainFounded.append(destinationPara);
                    trainFounded.append(timePara);
                    trainFounded.append(datePara);
                    trainFounded.append(bookBtn);
                    trainFounded.setAttribute("class","trains-founded");
                    //Append all the childs (Paragraphs & button) in main div holding one record
                    foundedTrainContainer.append(trainFounded);  //Append each train record div to main container of all founded trains
                    trainsFounded++;  //Increment the founded trains count 
                }
            }
            if(trainsFounded > 1) {  //Do footer's position static if more then 1 trains found so UI has no problem
                user.footer.style.position = "static";
            }
            else if (trainsFounded === 0) {  //Display message if no trains are found
                this.TrainInfoAfterSearch("No Trains Found!");
            }
            else {  //If only 1 train is found keep the footer location as absolute
                user.footer.style.position = "absolute";
            }
            foundedTrainContainer.setAttribute("class","foundedTrainContainer");
            this.trainPage.append(foundedTrainContainer);
            //Set the class and append container of all the trains founded in main trains page div
            this.trainsFoundedBookBtn = document.querySelectorAll("#trainsFoundedBookBtn");  //Get the book buttons of all the booked buttons of trains founded

            let trainsFoundedDivs = document.querySelectorAll(".trains-founded");  //All the divs of founded trains to access their child nodes info for saving booking

            //Event listener for all the book buttons of trains founded
            this.trainsFoundedBookBtn.forEach((train,index) => {
                train.addEventListener("click", () => {
                    //Stored values of only those train divs details whose book btn is pressed by user (Index is for tracking the book btn of div whose button is pressed)
                    let toSaveDeparture = trainsFoundedDivs[index].childNodes[0].innerText;
                    let toSaveDestination = trainsFoundedDivs[index].childNodes[1].innerText;
                    let toSaveTime = trainsFoundedDivs[index].childNodes[2].innerText;
                    let toSaveDate = trainsFoundedDivs[index].childNodes[3].innerText;
                    //Calling save function to save details of user's booked train in localstorage
                    this.SaveTrainBooking(toSaveDeparture,toSaveDestination,toSaveTime,toSaveDate);
                })
            })
        }
    }
}
  
let book = new TrainBookings();  //Object created of Bookings class

// // //Event listener for trains search button
// book.searchTrainBtn.addEventListener("click", () => {
//     book.BookTrain()
// })