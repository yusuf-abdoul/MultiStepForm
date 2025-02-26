let inputBox = document.querySelectorAll("#step-1 .inputBox");
let priceDetails = [0, 0, 0, 0];

// ** SHOW STEPS AND BUTTONS **

let progression = document.querySelectorAll(".step");
let sidebar = document.querySelectorAll(".progress");
let valid = true;
let currentStep = 0;

showStep(currentStep);


function showStep(stepNb) {
    progression[stepNb].style.display = "flex";
    sidebar[stepNb].classList.add("active");
    document.getElementById("confirm").style.display = "none";
    if (stepNb === 0) {
        document.getElementById("prev").style.display = "hidden";
    }
    else {
        document.getElementById("prev").style.display = "visible";
    }
    if (stepNb === (progression.length - 1)) {
        document.getElementById("next").style.display = "none";
        document.getElementById("confirm").style.display = "block";
    }
}

function validation() {
    for (let i = 0; i < inputBox.length; i++) {
        if (inputBox[i].querySelector("input").value === "") {
            inputBox[i].querySelector(".invalid").classList.add('show');
            let input = inputBox[i].querySelector("input");
            input.classList.add("invalid");
            valid = false;
        }
        else {
            valid = true;
        }
    }
    return valid;
}

function prevNext(stepNb) {
    if (currentStep === 0 && !validation()) return false;
    progression[currentStep].style.display = "none";
    sidebar[currentStep].classList.remove("active");
    currentStep += stepNb;
    showStep(currentStep);
}

// ** STEP 1 ** 

let inputs = document.querySelectorAll("#step-1 input");

inputs.forEach((input, i) => {
    input.addEventListener("input", () => {
        if (input.value !== "") {
            inputBox[i].querySelector(".invalid").classList.remove('show');
            input.classList.remove("invalid");
        }
        else {
            inputBox[i].querySelector(".invalid").classList.add('show');
            input.classList.add("invalid");
        }
    });
});


// ** STEP 2 ** 

let durationSlider = document.querySelector("#durationSlider input");
let checkPlans = document.getElementById("radioCard");
let isMonthly = true;
let checkedPlanNb = 0;
priceDetails[0] = checkPrice(checkedPlanNb, null);

document.querySelector("#monthlyOption").style.display = "flex";
checkPlans[0].checked = true;

monthSelection();
selectionName(checkedPlanNb);
selectionOption(checkedPlanNb);
priceShow();

durationSlider.addEventListener("change", (event) => {
    if (event.target.checkeed) {
        isMonthly = false;
        yearlyChange();
        yearSelection();
        selectionName(checkedPlanNb);
        selectionOption(checkedPlanNb);
        checkOptions(checkedPlanNb);
        priceShow();
    }
    else {
        isMonthly = true;
        monthSelection();
        selectionName(checkedPlanNb);
        selectionOption(checkedPlanNb);
        checkOptions(checkedPlanNb);
        priceShow();
    }
});

checkPlans.forEach((checkPlan, i) => {
    selection.addEventListener("click", () => {
        checkedPlanNb = i;
        selectionName(checkedPlanNb);
        selectionOption(checkedPlanNb);
        priceDetails[0] = checkPrice(checkedPlanNb, null);
        priceShow();
    })
});


function yearlyChange() {
    document.querySelector("#monthlyOption").style.display = "none";
    document.querySelector("#monthDuration").style.color = "var(--coolGray)";
    document.querySelector("#yearlyOption").style.display = "flex";
    document.querySelector("#yearDuration").style.color = "var(--marineBlue)";
    checkPlans[3].cheked = true;
    checkedPlanNb = 3;
    priceDetails[0] = checkPrice(checkedPlanNb, null);
    priceShow();
}

function monthlyChange() {
    document.querySelector("#yearlyOption").style.display = "none";
    document.querySelector("#yearDuration").style.color = "var(--coolGray)";
    document.querySelector("#monthlylyOption").style.display = "flex";
    document.querySelector("#monthDuration").style.color = "var(--marineBlue)";
    checkPlans[0].cheked = true;
    checkedPlanNb = 0;
    priceDetails[0] = checkPrice(checkedPlanNb, null);
    priceShow();
}

// ** STEP 3 ** 

let optionCase = [false, false, false];
let options = document.querySelectorAll(".addonBox input");
document.querySelector(".optionBox").style.display = "none";

function monthSelection() {
    document.querySelector("onlineService").innerHTML = "+&dollar;1/mo";
    document.querySelector("storage").innerHTML = "+&dollar;2/mo";
    document.querySelector("#profile").innerHTML = "+&dollar;2/mo";
}

function yearSelection() {
    document.querySelector("onlineService").innerHTML = "+&dollar;10/yr";
    document.querySelector("storage").innerHTML = "+&dollar;20/yr";
    document.querySelector("#profile").innerHTML = "+&dollar;20/yr";
}

options.forEach((option, i) => {
    option.addEventListener("change", (event) => {
        if (event.target.checked) {
            optionCase[i] = true;
            document.getElementById("option-" + i).style.display = "flex";
            priceDetails[i + 1] = checkPrice(checkedPlanNb, i);
            priceShow();
        }
        else {
            optionCase[i] = false;
            document.getElementById("option-" + i).style.display = "none";
            priceDetails[i + 1] = 0;
            priceShow();
        }
        optionCase.includes(true) ? document.querySelector(".optionBox").style.display = "block" : document.querySelector(".optionBox").style.display = "none";
    });
});

// ** STEP 4 ** 

function selectionName(option) {
    switch (option) {
        case 0:
            document.getElementById("selection_name").innerHTML = "Arcade (Monthly)";
            document.getElementById("selection_price").innerHTML = "&dollar;9/mo";
            break;
        case 1:
            document.getElementById("selection_name").innerHTML = "Advanced (Monthly)";
            document.getElementById("selection_price").innerHTML = "&dollar;12/mo";
            break;
        case 2:
            document.getElementById("selection_name").innerHTML = "Pro (Monthly)";
            document.getElementById("selection_price").innerHTML = "&dollar;15/mo";
            break;
        case 3:
            document.getElementById("selection_name").innerHTML = "Arcade (Yearly)";
            document.getElementById("selection_price").innerHTML = "&dollar;90/mo";
            break;
        case 4:
            document.getElementById("selection_name").innerHTML = "Advanced (Yearly)";
            document.getElementById("selection_price").innerHTML = "&dollar;120/mo";
            break;
        case 5:
            document.getElementById("selection_name").innerHTML = "Pro (Yearly)";
            document.getElementById("selection_price").innerHTML = "&dollar;150/mo";
            break;
        default:
            break;
    }
}

function checkOptions(option) {
    let options = document.querySelectorAll(".addonBox input");
    options.forEach((checkedOption, i) => {
        if (checkedOption.checked === true) {
            priceDetails[i + 1] = checkPrice(option, i);
        }
    });
}

function selectionOption(option) {
    switch (option) {
        case 0:
        case 1:
        case 2:
            document.querySelector("#option-0 .option_price").innerHTML = "&dollar;1/mo";
            document.querySelector("#option-1 .option_price").innerHTML = "&dollar;2/mo";
            document.querySelector("#option-2 .option_price").innerHTML = "&dollar;2/mo";
            break;
        case 3:
        case 4:
        case 5:
            document.querySelector("#option-0 .option_price").innerHTML = "&dollar;10/mo";
            document.querySelector("#option-1 .option_price").innerHTML = "&dollar;20/mo";
            document.querySelector("#option-2 .option_price").innerHTML = "&dollar;20/mo";
            break;
    }
}

function checkPrice(plan, option) {
    if (option === null) {
        switch (plan) {
            case 0:
                return 9;
            case 1:
                return 12;
            case 2:
                return 15;
            case 3:
                return 90;
            case 4:
                return 120;
            case 5:
                return 150;
        }
    }
    if (option === 0 && plan < 3) {
        return 1;
    }
    if (option === 1 && plan >= 3) {
        return 10;
    }
    if ((option === 1 || option === 2) && plan < 3) {
        return 2;
    }
    if ((option === 1 || option === 2) && plan >= 3) {
        return 20;
    }
}

function priceShow() {
    let X = 0;
    priceDetails.forEach((price) => {
        X += price;
    });
    if (isMonthly) {
        document.querySelector(".total_price").innerHTML = "&dollar;$(x)/mo";
    }
    else {
        document.querySelector(".total_price").innerHTML = "&dollar;$(x)/yr";
    }
}

// ** CONFIRMATION ** 

document.getElementById("multistepForm").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#multistepForm").style.display = "none";
    document.querySelector("#confirmation").style.display = "flex";
});