const itemList = document.getElementById('item-list');
const snackbar = document.getElementById('snackbar');

// Generate initial items
const items = Array.from({ length: 20 }, (_, i) => `Stolperstein ${i + 1}`);
items.forEach(addItem);

// Function to add an item to the DOM
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

  // Touch start and mouse down
  function start(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    content.style.transition = 'none';
  }

  // Touch move and mouse move
  function move(e) {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = currentX - startX;
    content.style.transform = `translateX(${dx}px)`;
  }

  // Touch end and mouse up
  function end(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - startX;

    if (Math.abs(dx) > 100) {
      // Highlight before removing
      background.style.backgroundColor = '#4caf50'; // Highlight color
      li.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
      content.style.transform = `translateX(${dx > 0 ? '100%' : '-100%'})`;
      setTimeout(() => {
        li.remove();
        showSnackbar(`${text} dismissed`);
      }, 300);
    } else {
      // Reset position
      content.style.transition = 'transform 0.3s ease';
      content.style.transform = 'translateX(0)';
    }
  }

  // Show item information on click
  function showInfo() {
    showSnackbar(`Info: Details for ${text}`);
  }

  // Event listeners for touch and mouse
  li.addEventListener('touchstart', start);
  li.addEventListener('touchmove', move);
  li.addEventListener('touchend', end);

  li.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);

  // Click event to show information
  li.addEventListener('click', showInfo);
}

// Function to show the snackbar
function showSnackbar(message) {
  snackbar.textContent = message;
  snackbar.className = 'snackbar show';
  setTimeout(() => {
    snackbar.className = 'snackbar';
  }, 3000);
}

