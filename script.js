const urlInput = document.getElementById("url");
const sizeInput = document.getElementById("size");
const fgInput = document.getElementById("fg");
const bgInput = document.getElementById("bg");
const generateBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download");
const qrContainer = document.getElementById("qrcode");
const qrMeta = document.getElementById("qrMeta");

let qr;

function generateQR() {
  const value = urlInput.value.trim();
  if (!value) {
    alert("Introduce una URL o texto válido.");
    return;
  }

  qrContainer.innerHTML = ""; // Limpia el anterior

  qr = new QRCode(qrContainer, {
    text: value,
    width: parseInt(sizeInput.value) || 256,
    height: parseInt(sizeInput.value) || 256,
    colorDark: fgInput.value,
    colorLight: bgInput.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  qrMeta.textContent = `Contenido: ${value}`;
}

function downloadQR() {
  const canvas = qrContainer.querySelector("canvas");
  if (!canvas) {
    alert("Primero genera un QR.");
    return;
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "codigo_qr.png";
  link.click();
}

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);

// Permitir generar con Enter
urlInput.addEventListener("keydown", e => {
  if (e.key === "Enter") generateQR();
});
