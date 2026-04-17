// 1. DATA: Cities and Hotels (using your uploaded images)
const destinations = [
    { id: 'mar', name: 'Marrakech', price: 450, img: 'marakesh.jpg' },
    { id: 'sah', name: 'Sahara Desert', price: 600, img: 'sahara desert.jpg' },
    { id: 'fes', name: 'Fes', price: 350, img: 'fes.jpg' },
    { id: 'che', name: 'Chefchaouen', price: 300, img: 'chefchaouen.jpg' }
];

const hotels = [
    { id: 'h1', name: 'Ryad Lfath', price: 120, img: 'ryad lfath.jpg' },
    { id: 'h2', name: 'Ryad Oulfa', price: 150, img: 'ryad oulfa.jpg' },
    { id: 'h3', name: 'Ain Atiik', price: 110, img: 'ain atiik.jpg' },
    { id: 'h4', name: 'Hotel Salam', price: 95, img: 'salam.jpg' },
    { id: 'h5', name: 'Riad Azabache', price: 135, img: 'azabache.jpg' },
    { id: 'h6', name: 'Riad Maria', price: 140, img: 'maria.jpg' }
];

let cart = [];

// 2. VIEW NAVIGATION
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

// 3. AUTH LOGIC
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

// 4. RENDERING GRIDS
function renderContent() {
    // Render Destinations
    const destGrid = document.getElementById('dest-grid');
    destinations.forEach(item => {
        const card = createCard(item, 'dest');
        destGrid.appendChild(card);
    });

    // Render Hotels
    const stayGrid = document.getElementById('stay-grid');
    hotels.forEach(item => {
        const card = createCard(item, 'stay');
        stayGrid.appendChild(card);
    });
}

function createCard(item, type) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${item.img}">
        <div class="card-body">
            <h3>${item.name}</h3>
            <strong>$${item.price}${type === 'stay' ? ' / night' : ''}</strong>
            <button class="add-btn" onclick="addToTrip('${item.id}', '${type}')">+ Add</button>
        </div>
    `;
    return div;
}

// 5. CART LOGIC
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

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Nothing selected yet.</p>';
    } else {
        cart.forEach(item => {
            const p = document.createElement('p');
            const icon = item.id.startsWith('h') ? '🏨' : '📍';
            p.innerHTML = `${icon} ${item.name} <span style="float:right">$${item.price}</span>`;
            container.appendChild(p);
            total += item.price;
        });
    }
    totalEl.innerText = `$${total}`;
}

// 6. CONFIRMATION LOGIC
function confirmTrip() {
    if (cart.length === 0) {
        alert("Select at least one destination or hotel to confirm.");
        return;
    }

    const summaryDiv = document.getElementById('final-summary');
    let total = 0;
    let html = '<h3>Booking Details:</h3><ul>';
    
    cart.forEach(item => {
        html += `<li>${item.name} - $${item.price}</li>`;
        total += item.price;
    });
    
    html += `</ul><hr><h4>Grand Total: $${total}</h4>`;
    summaryDiv.innerHTML = html;
    
    showSection('confirmation');
}

window.onload = renderContent;