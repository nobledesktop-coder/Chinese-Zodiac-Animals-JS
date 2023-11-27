document.addEventListener('DOMContentLoaded', renderAnimals);

function renderAnimals() {
    // get the section that serves as the parent wrapper of the interface:
    const section = document.querySelector('section');
    const sound = new Audio(); // one sound obj for all 12 animals
    // this ensures that only one sound can play at the same time

    // run a loop 12x, once per animal:
    for(let i = 0; i < animals.length; i++) {

        const animal = animals[i]; // save current animal in animals array as obj

        // make div for current animal
        const divvy = document.createElement('div');
        divvy.className = 'divvy'; // assign div its class
        section.appendChild(divvy); // output div to section

        // make img to hold animal pic
        let pic = new Image();
        // set src dynamically using eng property of current animal to concat file name: 'cow.jpg'
        pic.src = `images/animals/${animals[i].eng}.jpg`;
        pic.className = 'animal-pic'; // apply class name to img
        divvy.appendChild(pic); // output img to div

        // make input text box
        const inputBox = document.createElement('input');
        inputBox.type = 'search'; // make it type search so can have search event
        inputBox.placeholder = 'name..'; // prompt user to enter animal name
        // Assign eng, chi and also properties to the input box. These will be used by the checkSpelling* function to see if the user input matches any of the three accepted spellings:
        inputBox.eng = animal.eng;
        inputBox.chi = animal.chi;
        inputBox.also = animal.also;
        inputBox.i = i; // also save the loop index num an an input box property 
        // Have the input box call the function when its search event is fired:
        inputBox.addEventListener('search', checkSpelling);
        // Also have input box call the function on blur (Tab out of box)
        inputBox.addEventListener('blur', checkSpelling);
        // Output the input box to the div. It appears under the animal image:
        divvy.appendChild(inputBox);

        // Make sound icon image
        const soundIcon = new Image();
        soundIcon.src = 'images/sound-icon.png';
        soundIcon.className = 'sound-icon';
        // add an .eng property to sound icon, so that func
        // can know which animal this icon goes with
        // soundIcon.eng = animal.eng;// 'chicken' or 'dog'
        // make sound icon run inline anon function on click
        soundIcon.addEventListener('click', function() {
            sound.src = `audio/${animal.eng}.mp3`; // set source
            sound.play(); // play sound
        });
        divvy.appendChild(soundIcon); // output sound icon to animal div

        // make the Chinese character image, and output it to animal div:
        const chineseChar = new Image();
        chineseChar.src = `images/chars/char-${animal.chi}.jpg`;
        chineseChar.className = 'chinese-char';
        divvy.appendChild(chineseChar);

        // make a span to hold the English name, and output it to animal div
        const engSpan = document.createElement('span');
        engSpan.className = 'english';
        engSpan.textContent = animal.eng;
        engSpan.id = 'eng-' + i; // give span a unique id
        // so that the checkSpelling function can go get this elem
        // to set its opacity to 100%;
        divvy.appendChild(engSpan);

        // make a span to hold the English name, and output it to animal div
        const pinSpan = document.createElement('span');
        pinSpan.className = 'pinyin';
        pinSpan.innerHTML = animal.pin; // give span a unique id
        // so that the checkSpelling function can go get this elem
        // to set its opacity to 100%;
        pinSpan.id = 'pin-' + i;
        divvy.appendChild(pinSpan);

        // make a p-tag and output series of years in increments of 12
        const yearP = document.createElement('p');
        yearP.className = 'zodiac-year';
        // make a string of 15 zodiac years for the current animal, and output that string to the yearP as its textContent:
        let yearsStr = "";
        // concat 15 cycles worth of years in the string:
        // start in the past, and go forward in time in 12 year intervals:
        for(let y = animal.year - 156; y <= animal.year + 12; y+=12 ) {
            yearsStr += `${y} `;
        }
        yearP.textContent = yearsStr;
        divvy.appendChild(yearP);

    } // end loop

    function checkSpelling() {

        let input = this.value; // get the text entered by user in animal input box
        // Compare the user input to the English, pinyin and alternate "also" spelling. 
        // The user input needs to match *one* of the three correct spellings:
        if(input == this.eng || input == this.chi || input == this.also) {
            // If the user input is correct, turn the input box green; else turn the box red:
            this.style.backgroundColor = '#0B0';
            // make the eng and pin spans visible
            document.getElementById('eng-' + this.i).style.opacity = 1;
            document.getElementById('pin-' + this.i).style.opacity = 1;
        } else {
            this.style.backgroundColor = '#921'; // wrong answer, so set input box bg color to red
        }
        this.style.color = '#fff'; // make text white to contrast w green or red input box bg
    } // end checkSpelling function

}
 