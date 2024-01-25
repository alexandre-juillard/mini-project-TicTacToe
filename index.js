const cells = document.querySelectorAll(".cell"); //attribution des cellules a la classe cell du code HTML
const statusText = document.querySelector("#statusText"); //attribution du status joueur a id du code HTML
const restartBtn = document.querySelector("#restartBtn"); //attribution  du bouton restart a id du code HTML

const winConditions = [ //const qui stock la verif des conditions de win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; //var tampon des resultats en cours
let currentPlayer = "X"; //1er joueur est X par defaut
let running = false; // déroulement de la partie est faux de base (inactif)

initializeGame(); //fonction prete a demarrer au chargement des parametres ci dessus

// Fonctions du deroulement de partie

//fonction demarrage
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //si je clique sur une cellule, lance la fonction cellClicked
    restartBtn.addEventListener("click", restartGame); //si je clique sur bouton, lance la fonction restart
    statusText.textContent = `${currentPlayer}'s turn`; //le texte change en "TOUR DE JOUEUR 1"
    running = true; // déroulement de la partie est vraie
}
//fonction evenement clic sur une case
function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) { //si une condition de win est vide ou deroulement de la partie s'arrete, alors recommence a verifier
        return;
    }

    updateCell(this, cellIndex); //met a jour la case une fois cliqué
    checkWinner(); //verifie a chaque fois si wincondition remplie

}
//fonction mise a jour case
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
//fonction change de joueur
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; //si tour de X, alors change en O, sinon change en X
    statusText.textContent = `${currentPlayer}'s turn`; // mise a jour texte tour de joueur

}
//fonction verif gagnant
function checkWinner() {
    let roundWon = false; //de base gagné est faux

    for (let i = 0; i < winConditions.length; i++) { //boucle qui parcourt la const vide de condition de win
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") { //si données vides, boucle continue
            continue;
        }
        if (cellA == cellB && cellB == cellC) { //si 3 données identiques selon index de condition de win, alors gagné est vrai et boucle stop
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins !`; //si gagné est vrai alors maj texte joueur et le jeu stop
        running = false;
    } else if (!options.includes("")) { //si tous les espaces sont remplis mais pas les memes valeur, alors egalité et jeu stop
        statusText.textContent = `Draw !`;
        running = false;
    } else {
        changePlayer(); //si rien de tout ca, change de joueur et jeu continue
    }

}
//fonction restart
function restartGame() {
    currentPlayer = "X"; //nouveaux parametres de redemarrage avec maj 1er joueur, texte joueur, tableau de verif, clean des cases
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;

}