let text = document.getElementById("text");
let characters = document.getElementById("characters");
let words = document.getElementById("words");
let sentence = document.getElementById("sentence");
let paragraph = document.getElementById("paragraphs");
let readingTime = document.getElementById("reading");
let blockKeywords = document.getElementById("block-keywords");

let readingSpeed = 10; // Characters per second

function renderTop(keywords) {
    blockKeywords.innerHTML = '';
    for (let [key, value] of keywords) {
        if (!key) return;
        let col = document.createElement('div');
        col.classList.add('col');
        let k = document.createElement('span');
        k.classList.add('count');
        k.innerHTML = key + ": ";
        let val = document.createElement('span');
        val.innerHTML = value;
        col.appendChild(k);
        col.appendChild(val);
        blockKeywords.appendChild(col);
    }
}

text.addEventListener('input', function(inpEvent) {
    let inpText = text.value;
    let wordslist = inpText.split(/[ ,.?!]+/);
    if (!wordslist[0]) wordslist = [];

    characters.innerHTML = inpText.length;
    words.innerHTML = wordslist.length;
    sentence.innerHTML = inpText.split(/[.?!]+/).length - 1;
    paragraph.innerHTML = inpText.split("\n").length;

    let seconds = Math.round(inpText.length / readingSpeed);
    if (seconds > 59) {
        let minutes = Math.round(seconds / 60);
        seconds = seconds % 60;
        readingTime.innerHTML = minutes + "min " + seconds + "s";
    } else {
        readingTime.innerHTML = inpText.length / readingSpeed + "s";
    }

    let keywords = new Map();
    for (let i = 0; i < wordslist.length; i++) {
        let word = wordslist[i].toLowerCase();
        let val = 1;

        if (keywords.has(word)) {
            val += keywords.get(word);
        }
        keywords.set(word, val);
    }
    renderTop(keywords);
});
