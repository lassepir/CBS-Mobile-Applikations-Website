const itemList = document.getElementById('item-list');
const snackbar = document.getElementById('snackbar');

// Generate initial items
const items = Array.from({ length: 20 }, (_, i) => `Stolperstein ${i + 1}`);
items.forEach(addItem);

// Function to add an item to the DOM
function addItem(text) {
  const li = document.createElement('li');
  li.className = 'list-group-item item';

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
      // Remove item on significant swipe
      li.style.transition = 'transform 0.3s ease';
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

  // Event listeners for touch and mouse
  content.addEventListener('touchstart', start);
  content.addEventListener('touchmove', move);
  content.addEventListener('touchend', end);

  content.addEventListener('mousedown', start);
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
}

// Function to show the snackbar
function showSnackbar(message) {
  snackbar.textContent = message;
  snackbar.className = 'snackbar show';
  setTimeout(() => {
    snackbar.className = 'snackbar';
  }, 3000);
}

// Navigation
document.getElementById('nav-index').addEventListener('click', function(e) {
  e.preventDefault();
  showPage('index');
});

document.getElementById('nav-maps').addEventListener('click', function(e) {
  e.preventDefault();
  showPage('maps');
});

function showPage(page) {
  if (page === 'index') {
    document.getElementById('index-page').style.display = 'block';
    document.getElementById('maps-page').style.display = 'none';
    document.querySelector('.nav-item.active').classList.remove('active');
    document.getElementById('nav-index').parentElement.classList.add('active');
  } else if (page === 'maps') {
    document.getElementById('index-page').style.display = 'none';
    document.getElementById('maps-page').style.display = 'block';
    document.querySelector('.nav-item.active').classList.remove('active');
    document.getElementById('nav-maps').parentElement.classList.add('active');
  }
}
