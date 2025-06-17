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
    "Bimbi belli, come state?!",
    "Siete felici?",
    "Uomo!",
    "Giulièèè",
    "Torniamo a bomba!",
    "A che ora ci vediamo da Cicciotto",
    "A che stai?",
    "Tu che stai facendo?"
  ];
  let indiceFraseCorrente = 0;

  sticker.addEventListener('click', () => {
    fraseEsclamata.textContent = frasi[indiceFraseCorrente];
    fraseEsclamata.classList.add('mostra');
    fraseEsclamata.style.backgroundColor = "white";
    indiceFraseCorrente = (indiceFraseCorrente + 1) % frasi.length;

    setTimeout(() => {
      fraseEsclamata.classList.remove('mostra');
    }, 4000);
  });

  let cols = 5;
  let rows = 5;

  function ridimensionaCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blockSize = 100; // dimensione base
    cols = Math.max(1, Math.floor(canvas.width / blockSize));
    rows = Math.max(1, Math.floor(canvas.height / blockSize));
  }

  function getAngle(cx, cy, mx, my) {
    return Math.atan2(my - cy, mx - cx);
  }

  function drawBlock(cx, cy, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const bigCircleRadius = 15;
    const distance = bigCircleRadius * 2;
    const rectWidth = distance;
    const rectHeight = bigCircleRadius * 2.66;

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(-distance / 2, 0, bigCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(distance / 2, 0, bigCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight);

    const thirdCircleRadius = rectWidth / 2;
    const thirdCircleY = -rectHeight;
    ctx.beginPath();
    ctx.arc(0, thirdCircleY, thirdCircleRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawAllBlocks(mouseX, mouseY) {
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffdb36";
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
