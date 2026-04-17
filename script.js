// DATA: Folder path set to images/
const destinations = [
    { id: 'mar', name: 'Marrakech', price: 450, img: 'images/marakesh.jpg' },
    { id: 'sah', name: 'Sahara Desert', price: 600, img: 'images/sahara desert.jpg' },
    { id: 'fes', name: 'Fes', price: 350, img: 'images/fes.jpg' },
    { id: 'che', name: 'Chefchaouen', price: 300, img: 'images/chefchaouen.jpg' }
];

const hotels = [
    { id: 'h1', name: 'Ryad Lfath', price: 120, img: 'images/ryad lfath.jpg' },
    { id: 'h2', name: 'Ryad Oulfa', price: 150, img: 'images/ryad oulfa.jpg' },
    { id: 'h3', name: 'Ain Atiik', price: 110, img: 'images/ain atiik.jpg' },
    { id: 'h4', name: 'Hotel Salam', price: 95, img: 'images/salam.jpg' },
    { id: 'h5', name: 'Riad Azabache', price: 135, img: 'images/azabache.jpg' },
    { id: 'h6', name: 'Riad Maria', price: 140, img: 'images/maria.jpg' }
];

let cart = [];

// NAVIGATION
function showSection(viewId) {
    document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
    document.getElementById(viewId + '-view').style.display = 'block';
    window.scrollTo(0, 0);
}

function switchTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// LOGIN
function toggleLogin(show) {
    document.getElementById('login-modal').style.display = show ? 'flex' : 'none';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('user-email').value;
    alert(`Welcome back, ${email.split('@')[0]}!`);
    toggleLogin(false);
    document.querySelector('.login-btn').innerText = "My Profile";
});

// RENDERING
function renderGrids() {
    const destGrid = document.getElementById('dest-grid');
    destinations.forEach(item => destGrid.appendChild(createCard(item, 'dest')));

    const stayGrid = document.getElementById('stay-grid');
    hotels.forEach(item => stayGrid.appendChild(createCard(item, 'stay')));
}

function createCard(item, type) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${item.img}" onerror="this.src='https://via.placeholder.com/300x200?text=Check+Images+Folder'">
        <div class="card-body">
            <h3>${item.name}</h3>
            <strong>$${item.price}</strong>
            <button class="add-btn" style="float:right; background:#B24C3D; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;" onclick="addToTrip('${item.id}', '${type}')">+ Add</button>
        </div>
    `;
    return div;
}

// CART LOGIC
function addToTrip(id, type) {
    const list = type === 'dest' ? destinations : hotels;
    const item = list.find(i => i.id === id);
    if (!cart.find(c => c.id === id)) {
        cart.push(item);
        updateSidebar();
    }
}

function updateSidebar() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    container.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const icon = item.id.startsWith('h') ? '🏨' : '📍';
        container.innerHTML += `<p>${icon} ${item.name} <span style="float:right">$${item.price}</span></p>`;
        total += item.price;
    });
    totalEl.innerText = `$${total}`;
}

// FINAL CONFIRMATION
function confirmTrip() {
    if (cart.length === 0) return alert("Select at least one item first!");
    const finalDiv = document.getElementById('final-summary');
    finalDiv.innerHTML = `<h3>Summary:</h3><ul>${cart.map(i => `<li>${i.name} - $${i.price}</li>`).join('')}</ul>`;
    showSection('confirmation');
}

window.onload = renderGrids;