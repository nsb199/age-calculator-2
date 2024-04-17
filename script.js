const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
setTimeout(() => {
    document.body.style.transition = "background-image 0.9s ";
    document.body.style.backgroundImage = "url('bg-2.jpg')";
}, 500);


function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    document.body.appendChild(messageElement);

   
    messageElement.style.fontFamily = "Arial, sans-serif";
    messageElement.style.fontWeight = "bold";
    messageElement.style.color = "white";
    messageElement.style.fontSize = "2rem";
    messageElement.style.opacity = "0"; 
    messageElement.style.position = "absolute";
    messageElement.style.left = "50%";
    messageElement.style.transform = "translate(-50%, -110%)"; 

   
    messageElement.offsetHeight;

    
    messageElement.style.transition = "opacity 0.5s, transform 0.5s";
    messageElement.style.opacity = "1"; 
    messageElement.style.transform = "translate(-50%, -50%)"; 

 
    setTimeout(() => {
        messageElement.style.opacity = "0"; 
        messageElement.style.transform = "translate(-50%, -110%)"; 
        setTimeout(() => {
            messageElement.remove();
        }, 500); 
    }, 3000); 
}

function calculateAge() {
    let inputDateValue = document.getElementById("date-input").value;

    if (!inputDateValue) {
        displayMessage("At least tell me your Date of Birth pal, I'm not an Astrologer 🥴");
        return;
    }

    let today = new Date();
    let inputDate = new Date(inputDateValue);
    let birthMonth, birthDate, birthYear;
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    }
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    leapChecker(currentYear);

    if (birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year == currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month == currentMonth && birthDetails.year == currentYear)) {
        displayMessage("Hey Man, I can't do the Time Travel Stuff 🥶");
        displayResult("-", "-", "-");
        return;
    }

    if (currentYear - birthDetails.year > 130) {
        displayMessage("Either You are the oldest man alive or having a good internet connection in Heaven 🙂");
        displayResult("-", "-", "-");
        return;
    }

    birthYear = currentYear - birthDetails.year;

    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}

function leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}
