menuTree = {
    "ExhiByte": {
        "The Project": {
            "About": {
                "Test": {}
            },
            "Important Links": {},
            "Timeline": {}
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

    if (Object.keys(level).length == 0) {

    } else {
        if (idArray.length == 1) {
            document.getElementById("home-button").style.display = "none";
        } else {
            console.log(idArray.length);
            document.getElementById("home-button").style.display = "block";
        }

        while (menuContent.firstChild) {
            menuContent.removeChild(menuContent.firstChild);
        }

        let newTitle = document.createElement("h1");
        newTitle.textContent = idArray[idArray.length - 1];
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

function menuToggle(menu, clickedOnClose) {
    if (menuOpen && clickedOnClose) {
        menu.style.animationName = "menuClose";
        menuOpen = false;
        menu.children[0].style.animationName = "menuCloseContent";
        menu.children[0].style.display = "none";
        menu.children[1].style.animationName = "menuCloseContent";
    } else if (!menuOpen && !clickedOnClose) {
        menu.style.animationName = "menuOpen";
        menuOpen = true;
        menu.children[0].style.animationName = "menuOpenContent";
        menu.children[0].style.display = "block";
        menu.children[1].style.animationName = "menuOpenContent";
    }
}

document.addEventListener("click", function(e) {
    let menu = document.getElementById("corner-MENU");

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
    menuToggle(menu, clickedOnClose);
})