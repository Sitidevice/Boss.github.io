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

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function ridimensionaCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function disegnaBloccoRotante(ctx, x, y, mouseX, mouseY) {
    const circleRadius = 20;
    const distance = circleRadius * 2.5;
    const rectWidth = distance;
    const rectHeight = circleRadius * 4;

    // Centro del blocco (x, y) — rimane fisso
    // Calcolo centro del cerchio superiore (per ottenere direzione verso mouse)
    const verticeX = x;
    const verticeY = y - rectHeight;

    const dx = mouseX - verticeX;
    const dy = mouseY - verticeY;
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Cerchio sinistro (alla base)
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(-distance / 1.8, 0, circleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Cerchio destro (alla base)
    ctx.beginPath();
    ctx.arc(distance / 1.8, 0, circleRadius, 0, Math.PI * 2);
    ctx.fill();

    // Rettangolo verticale
    ctx.fillRect(-rectWidth / 2, -rectHeight, rectWidth, rectHeight);

    // Cerchio superiore (sopra rettangolo)
    ctx.beginPath();
    ctx.arc(0, -rectHeight, rectWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animazione() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e0e0e0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;

    disegnaBloccoRotante(ctx, centroX, centroY, mouseX, mouseY);

    requestAnimationFrame(animazione);
  }

  window.addEventListener('resize', ridimensionaCanvas);
  ridimensionaCanvas();

  animazione();
});
