const itemList = document.getElementById('item-list');
const snackbar = document.getElementById('snackbar');

// Initiale Elemente generieren
const items = Array.from({ length: 20 }, (_, i) => `Stolperstein ${i + 1}`);
items.forEach(addItem);

// Funktion zum Hinzufügen eines Elements zum DOM
function addItem(text) {
  const li = document.createElement('li');
  li.className = 'item';

  const background = document.createElement('div');
  background.className = 'background';

  const content = document.createElement('div');
  content.className = 'content';
  content.textContent = text;

  li.appendChild(background);
  li.appendChild(content);
  itemList.appendChild(li);

  let startX = 0;
  let isDragging = false;

  // Touchstart und Mousedown
  function start(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    content.style.transition = 'none';
  }

  // Touchmove und Mousemove
  function move(e) {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = currentX - startX;
    content.style.transform = `translateX(${dx}px)`;
  }

  // Touchend und Mouseup
  function end(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - startX;

    if (Math.abs(dx) > 100) {
      // Element bei signifikantem Wischen entfernen
      li.style.transition = 'transform 0.3s ease';
      content.style.transform = `translateX(${dx > 0 ? '100%' : '-100%'})`;
      setTimeout(() => {
        li.remove();
        showSnackbar(`${text} entfernt`);
      }, 300);
    } else {
      // Position zurücksetzen
      content.style.transition = 'transform 0.3s ease';
      content.style.transform = 'translateX(0)';
    }
 
::contentReference[oaicite:0]{index=0}
 
