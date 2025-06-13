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
  }

  function getAngle(cx, cy, mx, my) {
    return Math.atan2(my - cy, mx - cx) + Math.PI; // invertita
  }

  function drawBlock(cx, cy, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const bigCircleRadius = 15;
    const distance = bigCircleRadius * 2;
    const rectWidth = distance;
    const rectHeight = bigCircleRadius * 2; // ridotta altezza del rettangolo

    // Cerchio sinistro
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(-distance / 2, 0, bigCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Cerchio destro
    ctx.beginPath();
    ctx.arc(distance / 2, 0, bigCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Rettangolo verticale
    ctx.fillStyle = "black";
    ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight);

    // Terzo cerchio superiore
    const thirdCircleRadius = rectWidth / 2;
    const thirdCircleY = -rectHeight;
    ctx.beginPath();
    ctx.arc(0, thirdCircleY, thirdCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawAllBlocks(mouseX, mouseY) {
    const cols = 10;
    const rows = 10;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * cellW + cellW / 2;
        const cy = r * cellH + cellH / 2;
        const angle = getAngle(cx, cy, mouseX, mouseY);
        drawBlock(cx, cy, angle);
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    drawAllBlocks(lastMouse.x, lastMouse.y);
  }

  const lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener('mousemove', (e) => {
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    ridimensionaCanvas();
  });

  ridimensionaCanvas();
  animate();
});
