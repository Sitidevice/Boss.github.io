document.addEventListener('DOMContentLoaded', () => {
    const sticker = document.getElementById('sticker');
    const fraseEsclamata = document.getElementById('fraseEsclamata');

    // Array di frasi che lo sticker può esclamare
    const frasi = [
        "Torniamo a bomba!",
        "Antonièèèè",
        "Facciamo una cosa figa!!",
        "Dove sta Francesco?",
        "È urgente!",
        "Che ci vuole a farlo!"
    ];

    sticker.addEventListener('click', () => {
        // Seleziona una frase casuale dall'array
        const fraseCasuale = frasi[Math.floor(Math.random() * frasi.length)];

        // Aggiorna il testo e mostra la frase
        fraseEsclamata.textContent = fraseCasuale;
        fraseEsclamata.classList.add('mostra');

        // Nasconde la frase dopo un po'
        setTimeout(() => {
            fraseEsclamata.classList.remove('mostra');
        }, 2000); // La frase scompare dopo 2 secondi
    });
});