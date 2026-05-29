
// Variable global donde guardaremos los juegos
let gamesData = [];
// Función que carga los juegos desde el archivo JSON
async function loadGames() {
    const response = await fetch('data/games.json');
    gamesData = await response.json();
    return gamesData;
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function changeGameStatus(index, newStatus) {
    gamesData[index].estado = newStatus;
    if (newStatus === 'en-progreso') {
        gamesData[index].fecha_inicio = getTodayDate();
        if (!gamesData[index].fecha_completado) {
            gamesData[index].fecha_completado = null;
        }
    } else if (newStatus === 'completado') {
        gamesData[index].fecha_completado = getTodayDate();
    } else {
        gamesData[index].fecha_inicio = null;
        gamesData[index].fecha_completado = null;
    }
    saveGames();
}

function saveGames() {
    localStorage.setItem('gamesData', JSON.stringify(gamesData));
}

