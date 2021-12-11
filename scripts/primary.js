menuTree = {
    "ExhiGlobe": {
        "The Project": {
            "About": {
                "Origins": {"src": "origins.html"},
                "The Name": {"src": "name.html"}
            },
            "Important Links": {"src": "links.html"},
            "Timeline": {"src": "timeline.html"}
        }
    }
}

function genMenu(idArray) {
    flashMenu();

    let depth = idArray.length;
    let menuContent = document.getElementById("menu-Content");

    let level = menuTree;

    for (var i=0;i<depth;i++) {
        level = level[idArray[i]];
        if (i == depth-1) {
            break;
        }
    }

    if (Object.keys(level)[0] == "src") {
        let lnk = level[Object.keys(level)[0]];
        window.open(lnk, "_self");
    } else {
        if (idArray.length == 1) {
            document.getElementById("home-button").style.display = "none";
        } else {
            document.getElementById("home-button").style.display = "block";
        }

        while (menuContent.firstChild) {
            menuContent.removeChild(menuContent.firstChild);
        }

        let newTitle = document.createElement("h1");
        newTitle.classList.add("folder-Path");
        newTitle.textContent = "";
        for (var dirI=0;dirI<idArray.length;dirI++) {
            if (dirI != idArray.length - 1) {
                newTitle.textContent += idArray[dirI];
                newTitle.textContent += "/";
            } else {
                let selected = document.createElement("span");
                selected.textContent = idArray[dirI];
                selected.classList.add("current-Folder");
                newTitle.appendChild(selected);
            }
        }
        
        menuContent.appendChild(newTitle);

        let ind = 1;
        for (var obj in Object.keys(level)) {
            let newA = document.createElement("a");
            newA.textContent = Object.keys(level)[obj];
            newA.id = "l" + String(ind);
            newA.classList.add("menu-Link");
            let newArrayStr = "";
            let lastArrayStr = "";
            for (var i=0; i<idArray.length; i++) {
                newArrayStr += "'" + idArray[i] + "', ";
                if (i != idArray.length - 1) {
                    lastArrayStr += "'" + idArray[i] + "', ";
                }
            };
            let mouseDwnBack = "genMenu([" + lastArrayStr + "])";

            newArrayStr += "'" + Object.keys(level)[obj] + "'";
            let mouseDwn = "genMenu([" + newArrayStr + "])";
            newA.setAttribute("onmousedown", mouseDwn);
            document.getElementById("home-button").setAttribute("onmousedown", mouseDwnBack);
            menuContent.appendChild(newA);

            ind++;
        }
    }
}

function flashMenu() {
    let menu = document.getElementById("corner-MENU");
    //not yet functioning
}


let menuOpen = false;

function menuToggle(menu, content, clickedOnClose) {
    if (menuOpen && clickedOnClose) {
        menu.style.animationName = "menuClose";
        content.style.animationName = "contentOpen";
        menuOpen = false;
        menu.children[0].style.animationName = "menuCloseContent";
        menu.children[0].style.display = "none";
        menu.children[1].style.animationName = "menuCloseContent";

        content.children[0].style.animationName = "menuOpenContent";
        content.children[0].style.display = "block";
    } else if (!menuOpen && !clickedOnClose) {
        menu.style.animationName = "menuOpen";
        content.style.animationName = "contentClose";
        menuOpen = true;
        menu.children[0].style.animationName = "menuOpenContent";
        menu.children[0].style.display = "block";
        menu.children[1].style.animationName = "menuOpenContent";

        content.children[0].style.animationName = "menuCloseContent";
        content.children[0].style.display = "none";
    }
}

document.addEventListener("click", function(e) {
    let menu = document.getElementById("corner-MENU");
    let content = document.getElementById("main-Content");

    let clickedOnClose = true;
    if (menu == e.target || menu.children[0] == e.target || menu.children[1] == e.target) {
        clickedOnClose = false;
    } else {
        let i = 0;
        while (menu.children[0].children[i]) {
            if (e.target == menu.children[0].children[i]) {
                clickedOnClose = false;
            }
            i++;
        };
    }
    menuToggle(menu, content, clickedOnClose);
})

function light(obj) {
    if (!menuOpen) {
        obj.style.border = "2px solid rgb(91, 97, 126)";
        obj.style.cursor = "pointer";
    }
}

function unlight(obj) {
    obj.style.border = "2px solid rgb(210, 255, 215)";
    obj.style.cursor = "default";
}