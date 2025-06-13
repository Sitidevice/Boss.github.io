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
  const cols = 20;
  const rows = 20;
  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#e0e0e0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * cellW + cellW / 2;
      const cy = r * cellH + cellH / 2;
      const angle = Math.random() * Math.PI * 2;

      const circleRadius = Math.min(cellW, cellH) * 0.1;
      const distance = circleRadius * 3; // distanza tra i due centri dei cerchi

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Primo cerchio (sinistra)
      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.arc(-distance / 2, 0, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Secondo cerchio (destra)
      ctx.beginPath();
      ctx.arc(distance / 2, 0, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rettangolo verticale che collega i centri dei cerchi
      const rectW = Math.min(cellW, cellH) * 0.05; // spessore del rettangolo
      const rectH = distance; // altezza = distanza tra centri

      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.fillRect(-rectW / 2, -distance / 2, rectW, rectH);

      ctx.restore();
    }
  }
}

  window.addEventListener('resize', ridimensionaCanvas);
  ridimensionaCanvas();
});
