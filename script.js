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
        elementi.push({ cx, cy });
      }
    }
  }

  const elementi = [];
  let mouseX = 0;
  let mouseY = 0;

  canvas.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const circleRadius = 10;
    const distance = circleRadius * 2; // distanza tra i centri dei due cerchi
    const rectWidth = distance;
    const rectHeight = circleRadius * 2.5; // ridotto di circa 1/3

    for (const { cx, cy } of elementi) {
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const angle = Math.atan2(dy, dx) + Math.PI; // punta opposta al mouse

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Cerchio sinistro
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(-distance / 2, 0, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cerchio destro
      ctx.beginPath();
      ctx.arc(distance / 2, 0, circleRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rettangolo centrale
      ctx.fillStyle = "black";
      ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight);

      // Cerchio superiore
      const thirdCircleRadius = rectWidth / 2;
      const thirdCircleY = -rectHeight;
      ctx.beginPath();
      ctx.arc(0, thirdCircleY, thirdCircleRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    elementi.length = 0;
    ridimensionaCanvas();
  });

  ridimensionaCanvas();
  animate();
});
