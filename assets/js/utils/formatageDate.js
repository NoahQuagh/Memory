/**
 * Conversion de seconde en texte en minute seconde
 * @param sec temps en secondes
 * @returns {string} secondes formater en mm:ss
 */
function formatTime(sec) {
    const min = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${min}:${s}`;
}
