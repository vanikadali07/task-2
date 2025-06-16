const themeToggleBtn = document.getElementById('themeToggle');
const htmlElem = document.documentElement;

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (htmlElem.getAttribute('data-theme') === 'light') {
      htmlElem.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = '☀️';
    } else {
      htmlElem.setAttribute('data-theme', 'light');
      themeToggleBtn.textContent = '🌙';
    }
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    [...contactForm.querySelectorAll('.error-message')].forEach(el => (el.textContent = ''));

    const nameInput = contactForm.name;
    if (!nameInput.value.trim()) {
      contactForm.name.nextElementSibling.textContent = 'Name is required.';
      valid = false;
    }

    const emailInput = contactForm.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      contactForm.email.nextElementSibling.textContent = 'Email is required.';
      valid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      contactForm.email.nextElementSibling.textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (valid) {
      localStorage.setItem('beautyUser', nameInput.value);
      window.location.href = 'products.html';
    }
  });
}

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const taskList = document.getElementById('taskList');

let products = JSON.parse(localStorage.getItem('beautyProducts') || '[]');

function renderProducts() {
  taskList.innerHTML = '';
  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
      <label class="task-label">${product.name}</label>
      <span class="task-timestamp">${product.time}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

if (todoForm) {
  renderProducts();

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = todoInput.value.trim();
    if (!name) return;

    products.push({
      name: name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('beautyProducts', JSON.stringify(products));
    renderProducts();
    todoInput.value = '';
  });

  taskList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.dataset.index;
      products.splice(index, 1);
      localStorage.setItem('beautyProducts', JSON.stringify(products));
      renderProducts();
    }
  });
}
