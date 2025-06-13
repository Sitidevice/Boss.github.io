function ridimensionaCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
    disegnaGriglia();
}

  function disegnaGriglia() {
    const cols = 20;
    const rows = 20;
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
    ctx.fillRect(-rectWidth / 2, -rectHeight / 1.3, rectWidth, rectHeight);

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

@@ -45,69 +83,24 @@ document.addEventListener('DOMContentLoaded', () => {
for (let c = 0; c < cols; c++) {
const cx = c * cellW + cellW / 2;
const cy = r * cellH + cellH / 2;
        elementi.push({ cx, cy });
        const angle = getAngle(cx, cy, mouseX, mouseY);
        drawBlock(cx, cy, angle);
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
      ctx.fillRect(-rectWidth / 2, -rectHeight /1.2, rectWidth, rectHeight);

      // Cerchio superiore
      const thirdCircleRadius = rectWidth / 2;
      const thirdCircleY = -rectHeight;
      ctx.beginPath();
      ctx.arc(0, thirdCircleY, thirdCircleRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

requestAnimationFrame(animate);
    drawAllBlocks(lastMouse.x, lastMouse.y);
}

  const lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener('mousemove', (e) => {
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

window.addEventListener('resize', () => {
    elementi.length = 0;
ridimensionaCanvas();
});
