// DATA COLLECTIONS
const destinations = [
    { id: 'd1', name: 'Marrakech', price: 450, img: 'images/marakesh.jpg' },
    { id: 'd2', name: 'Sahara Desert', price: 600, img: 'images/sahara desert.jpg' },
    { id: 'd3', name: 'Fes', price: 350, img: 'images/fes.jpg' },
    { id: 'd4', name: 'Chefchaouen', price: 300, img: 'images/chefchaouen.jpg' }
];

const hotels = [
    { id: 'h1', name: 'Ryad Lfath', price: 120, img: 'images/ryad lfath.jpg' },
    { id: 'h2', name: 'Ryad Oulfa', price: 150, img: 'images/ryad oulfa.jpg' },
    { id: 'h3', name: 'Ain Atiik', price: 110, img: 'images/ain atiik.jpg' },
    { id: 'h4', name: 'Hotel Salam', price: 95, img: 'images/salam.jpg' },
    { id: 'h5', name: 'Riad Azabache', price: 135, img: 'images/azabache.jpg' },
    { id: 'h6', name: 'Riad Maria', price: 140, img: 'images/maria.jpg' }
];

const reviews = [
    { name: 'Maria Orlova', text: 'The desert stay was magical.', img: 'images/maria-orlova.jpg' },
    { name: 'Chloe Lefleur', text: 'Stunning architecture and service.', img: 'images/chloe-lefleur.jpg' },
    { name: 'Alexander', text: 'A truly luxury experience.', img: 'images/alexander.jpg' },
    { name: 'Zyna', text: 'Best trip of my life!', img: 'images/zyna.jpg' }
];

const travelTips = [
    "Friday is Couscous day across Morocco!",
    "Learn a few Darija words like 'Shukran' (Thank you).",
    "Bring comfortable shoes for the Marrakech Medina.",
    "The blue streets of Chefchaouen are best at sunrise."
];

let cart = [];

// INITIALIZE
window.onload = () => {
    renderGrid('dest-grid', destinations, 'dest');
    renderGrid('stay-grid', hotels, 'stay');
    renderReviews();
    initCreative();
};

function renderGrid(containerId, data, type) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.img}" onerror="this.src='https://via.placeholder.com/400x300'">
            <div class="card-body">
                <h3>${item.name}</h3>
                <p><strong>$${item.price}</strong></p>
                <button class="add-btn" style="background:#B24C3D; color:white; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;" onclick="addToTrip('${item.id}', '${type}')">Add to Trip</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderReviews() {
    const container = document.getElementById('experience-grid');
    reviews.forEach(rev => {
        container.innerHTML += `
            <div class="card">
                <img src="${rev.img}" style="height:250px">
                <div class="card-body"><h3>${rev.name}</h3><p>"${rev.text}"</p></div>
            </div>`;
    });
}

function initCreative() {
    const tipEl = document.getElementById('daily-tip');
    tipEl.innerText = travelTips[Math.floor(Math.random() * travelTips.length)];
    
    document.getElementById('subscribe-form').onsubmit = (e) => {
        e.preventDefault();
        alert("Welcome to the VIP list!");
    };
}

// LOGIC
function addToTrip(id, type) {
    const source = (type === 'dest') ? destinations : hotels;
    const item = source.find(i => i.id === id);
    if (!cart.find(c => c.id === id)) {
        cart.push(item);
        updateSidebar();
    }
}

function updateSidebar() {
    const list = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-price');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        list.innerHTML += `<p>📍 ${item.name} <span style="float:right">$${item.price}</span></p>`;
        total += item.price;
    });
    totalDisplay.innerText = `$${total}`;
}

function showSection(id) {
    document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
    document.getElementById(id + '-view').style.display = 'block';
}

function switchTab(e, id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    e.currentTarget.classList.add('active');
}

function toggleLogin(show) {
    document.getElementById('login-modal').style.display = show ? 'flex' : 'none';
}

function confirmTrip() {
    if (cart.length === 0) return alert('Select items first!');
    document.getElementById('final-summary').innerHTML = `<ul>${cart.map(i => `<li>${i.name} - $${i.price}</li>`).join('')}</ul>`;
    showSection('confirmation');
}