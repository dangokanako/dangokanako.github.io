function playAudio(file) {
    const audio = new Audio('/asset/game/audio/' + file);
    audio.volume = 0.4;
    audio.play();
}