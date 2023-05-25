(function() {
    var pgElement = document.getElementById('pgnum');
    var current = 0;

    function updateScore() {
        current += 1;
        pgElement.textContent = current;
    }

    setInterval(updateScore, 1000);
})();
