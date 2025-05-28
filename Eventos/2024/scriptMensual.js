
// Selecciona todas las imágenes que quieres hacer clickeables
const images = document.querySelectorAll('.media-container img');

// Variables para el modal y la imagen actual
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;

// Array de las URLs y textos de las imágenes
const imagesArray = Array.from(images).map((img, index) => ({
  src: img.src,
  alt: img.alt,
  parent: img.closest('.media-container')
}));

// Función para abrir el modal con la imagen seleccionada
function openModal(index) {
  currentImageIndex = index;
  updateModal();
  modal.style.display = 'flex';
}

// Función para actualizar la imagen en el modal
function updateModal() {
  const imgData = imagesArray[currentImageIndex];
  modalImg.src = imgData.src;
  captionText.innerHTML = 'Imagen: ' + (imgData.alt || '');
}

// Agregar evento a cada imagen para abrir el modal
images.forEach((img, index) => {
  img.style.cursor = 'pointer'; // cursor de clic
  img.addEventListener('click', () => {
    openModal(index);
  });
});

// Evento para cerrar el modal
closeBtn.onclick = () => {
  modal.style.display = 'none';
};

// Navegación anterior
prevBtn.onclick = () => {
  currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
  updateModal();
};

// Navegación siguiente
nextBtn.onclick = () => {
  currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
  updateModal();
};

// Cerrar el modal si el usuario hace clic fuera de la imagen
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Agregar navegación con flechas del teclado
window.addEventListener('keydown', (event) => {
  if (modal.style.display === 'flex') { // Solo si el modal está abierto
    if (event.key === 'ArrowLeft') {
      // Navegar a la imagen anterior
      currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
      updateModal();
    } else if (event.key === 'ArrowRight') {
      // Navegar a la siguiente imagen
      currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
      updateModal();
    }
  }
});
