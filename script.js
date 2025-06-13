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
    fraseEsclamata.style.backgroundColor = 'white'; // Sfondo bianco per la label
    indiceFraseCorrente = (indiceFraseCorrente + 1) % frasi.length;

    setTimeout(() => {
      fraseEsclamata.classList.remove('mostra');
    }, 2000);
  });

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    disegnaGriglia();
  });

  function ridimensionaCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    disegnaGriglia();
  }

  function disegnaGriglia() {
    const cols = 15;
    const rows = 15;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const baseCircleRadius = Math.min(cellW, cellH) * 0.25; // più grande
    const distance = baseCircleRadius * 2; // estremità coincidenti
    const rectWidth = distance;
    const rectHeight = baseCircleRadius * 4;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * cellW + cellW / 2;
        const cy = r * cellH + cellH / 2;

        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const angle = Math.atan2(dy, dx) + Math.PI / 2; // invertita

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        // Cerchio sinistro
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(-distance / 2, 0, baseCircleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Cerchio destro
        ctx.beginPath();
        ctx.arc(distance / 2, 0, baseCircleRadius, 0, Math.PI * 2);
        ctx.fill();

        // Rettangolo centrale (verticale)
        ctx.fillStyle = "black";
        ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight);

        // Cerchio superiore (centrato sopra il rettangolo)
        const thirdCircleRadius = rectWidth / 2;
        const thirdCircleY = -rectHeight;

        ctx.beginPath();
        ctx.arc(0, thirdCircleY, thirdCircleRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
  }

  window.addEventListener('resize', ridimensionaCanvas);
  ridimensionaCanvas();
});
