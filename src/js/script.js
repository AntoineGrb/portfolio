//Gérer le curseur du header
const cursor = document.querySelector('#header-cursor');
let isCursor = true;

function cursorWinking() {
    if (isCursor) {
        cursor.style.display = 'none';
        isCursor = false;
    }
    else {
        cursor.style.display = 'block';
        isCursor = true;
    }
}

let interval = setInterval(cursorWinking , 500);

//Gérer l'écriture du titre du header

