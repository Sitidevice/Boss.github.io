document.addEventListener('DOMContentLoaded', () => {
    const sticker = document.getElementById('sticker');
    const fraseEsclamata = document.getElementById('fraseEsclamata');

    // Array delle frasi nell'ordine esatto che desideri
    const frasi = [
        "Antonièèèèè",
        "Che ci vuole a farlo?",
        "Questa cosa puzza!",
        "È urgente!",
        "Hai fatto?",
        "Dove sta Francesco?",
        "Torniamo a bomba!"
    ];

    let indiceFraseCorrente = 0; // Inizia dalla prima frase (indice 0)

    sticker.addEventListener('click', () => {
        // Ottieni la frase corrente dall'array usando l'indice
        const fraseDaMostrare = frasi[indiceFraseCorrente];

        // Aggiorna il testo e mostra la frase
        fraseEsclamata.textContent = fraseDaMostrare;
        fraseEsclamata.classList.add('mostra');

        // Incrementa l'indice per passare alla prossima frase al click successivo
        indiceFraseCorrente++;

        // Se l'indice supera la lunghezza dell'array, torna all'inizio
        if (indiceFraseCorrente >= frasi.length) {
            indiceFraseCorrente = 0; // Ricomincia dalla prima frase dopo aver mostrato l'ultima
        }

        // Nasconde la frase dopo un periodo di tempo (2 secondi)
        setTimeout(() => {
            fraseEsclamata.classList.remove('mostra');
        }, 2000); // La frase scompare dopo 2000 millisecondi (2 secondi)
    });
});
