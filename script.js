document.addEventListener('DOMContentLoaded', () => {
  const sticker = document.getElementById('sticker');
  const fraseEsclamata = document.getElementById('fraseEsclamata');
  const canvas = document.getElementById('sfondoCanvas');
  const ctx = canvas.getContext('2d');

  const frasi = [
    "Antonièèèèè",
    "Che ci vuole a farlo?",
    "Questa cosa puzza!",
    "È urgente!",
    "Hai fatto?",
    "Dove sta Francesco?",
    "Torniamo a bomba!"
  ];
  let indiceFraseCorrente = 0;

  sticker.addEventListener('click', () => {
    fraseEsclamata.textContent = frasi[indiceFraseCorrente];
    fraseEsclamata.classList.add('mostra');
    indiceFraseCorrente = (indiceFraseCorrente + 1) % frasi.length;

    setTimeout(() => {
      fraseEsclamata.classList.remove('mostra');
    }, 2000);
  });

  function ridimensionaCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    disegnaGriglia();
  }

  function disegnaGriglia() {
    const cols = 100;
    const rows = 100;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000";

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cellW;
        const y = r * cellH;

        // 3 cerchi neri pieni (disposti in diagonale)
        for (let i = 0; i < 3; i++) {
          const cx = x + (cellW * 0.25) * (i + 1);
          const cy = y + cellH * 0.25;
          const radius = Math.min(cellW, cellH) * 0.05;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Rettangolo nero pieno in basso
        const rw = cellW * 0.4;
        const rh = cellH * 0.15;
        const rx = x + (cellW - rw) / 2;
        const ry = y + cellH * 0.65;
        ctx.fillRect(rx, ry, rw, rh);
      }
    }
  }

  window.addEventListener('resize', ridimensionaCanvas);
  ridimensionaCanvas();
});
