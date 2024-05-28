function getQuestions() {
    const questions = document.querySelectorAll(".question");
    const chapter = `chapter=${questions[0].value}`;
    const abilities = `abilities=${questions[1].value}`;
    getStands(chapter, abilities);
}

async function getStands(chapter, abilities) {
    const infoBoxes = document.querySelectorAll(".stat");
    const standImage = document.querySelector("#standImage");
    for (let infoBox of infoBoxes) {
        infoBox.textContent = "";
    }
    standImage.src = "";
    
    let standData = null;
    const standURL = "https://stand-by-me.herokuapp.com/api/v1/stands/query/query?";
    try { 
        const response = await fetch(standURL + chapter + "&" + abilities);
        standData = await response.json();
    }
    catch(error) {
        console.log(error);
    }
    if (standData.length === 0) {
        const nameBox = document.querySelector("#name");
        nameBox.textContent = "You didn't get a stand! You died!";
    }
    else {
        getOneStand(standData);
    }
}
function getOneStand(data) {
    let randomChance = Math.floor(data.length * Math.random());
    let yourStand = data[randomChance];
    showStats(yourStand);
    showUser(yourStand);
}
function showStats(data) {
    console.log(data);
    for (const info of Object.keys(data)) {
        if (info !== "id") {
            if (info !== "standUser") {
                if (info !== "image") {
                    const box = document.querySelector(`#${info}`);
                    box.textContent = `${info}: ${data[info]}`;
                }
            } 
        }
    }
    const image = document.querySelector("#standImage");
    image.src = `https://jojos-bizarre-api.netlify.app/assets/${data.image}`;
}
async function showUser(data) {
    let userData = null;
    const userURL = "https://stand-by-me.herokuapp.com/api/v1/characters/";
    try { 
        const response = await fetch(userURL + data.standUser);
        userData = await response.json();
    }
    catch(error) {
        console.log(error);
    }
    const userBox = document.querySelector("#user");
    userBox.textContent = `Original user: ${userData.name}`;  
}

function runProgram() {
    const standArrow = document.querySelector("#standArrow");
    //for context, within the series, the way you get a stand is by using the stand arrow, among other things. 
    standArrow.addEventListener("click", getQuestions);
}




document.addEventListener('DOMContentLoaded', runProgram);
