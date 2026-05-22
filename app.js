const menuItems = [
    { id: 1, name: "Wagyu Gold Burger", price: 24.99, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800", desc: "Aged Wagyu, truffle mayo, gold-leaf bun." },
    { id: 2, name: "Truffle Burrata Pizza", price: 21.50, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800", desc: "Italian burrata, fresh truffles, forest mushrooms." },
    { id: 3, name: "Lobster Ravioli", price: 29.20, img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800", desc: "Hand-rolled pasta, Atlantic lobster, saffron cream." },
    { id: 4, name: "Saffron Risotto", price: 18.99, img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800", desc: "Carnaroli rice, Persian saffron, 24-month parmesan." },
    { id: 5, name: "Herb Roasted Duck", price: 34.00, img: "https://images.pexels.com/photos/29333558/pexels-photo-29333558.jpeg", desc: "Dry-aged duck, orange reduction, rosemary glaze." },
    { id: 6, name: "Velvet Mousse", price: 12.50, img: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=800", desc: "Dark Belgian chocolate, gold dust, raspberry core." }
];

const services = [
    { icon: "fa-utensils", title: "Elite Dining", desc: "A curated gastronomic experience in an opulent setting." },
    { icon: "fa-champagne-glasses", title: "Private Events", desc: "Bespoke celebrations designed with luxury in mind." },
    { icon: "fa-truck-fast", title: "Flavor on Demand", desc: "The same fine-dining excellence at your doorstep." }
];

let cart = [];

function renderServices() {
    document.getElementById('service-grid').innerHTML = services.map(s => `
                <div class="group p-12 rounded-[3rem] bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 transition-all duration-500 hover:shadow-2xl text-center">
                    <div class="w-20 h-20 bg-orange-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-lg shadow-orange-600/20 transform group-hover:rotate-12 transition">
                        <i class="fa-solid ${s.icon}"></i>
                    </div>
                    <h3 class="text-2xl font-serif font-bold mb-4 tracking-tight">${s.title}</h3>
                    <p class="text-gray-500 leading-relaxed">${s.desc}</p>
                </div>
            `).join('');
}

function renderMenu() {
    document.getElementById('food-grid').innerHTML = menuItems.map(item => `
                <div class="menu-card bg-white rounded-[3rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                    <div class="relative h-80 overflow-hidden">
                        <img src="${item.img}" class="w-full h-full object-cover transition-transform duration-700 hover:scale-110" alt="${item.name}">
                        <div class="absolute top-6 right-6 bg-white px-5 py-2 rounded-full font-bold text-orange-600 shadow-xl">$${item.price}</div>
                    </div>
                    <div class="p-10 text-center relative">
                        <h3 class="text-2xl font-serif font-bold mb-3">${item.name}</h3>
                        <p class="text-gray-400 text-sm mb-8 font-light">${item.desc}</p>
                        <button onclick="addToCart(${item.id})" class="buy-btn w-full bg-black text-white hover:bg-orange-600 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95">Add to Selection</button>
                    </div>
                </div>
            `).join('');
}

function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    const inCart = cart.find(p => p.id === id);
    if (inCart) inCart.qty++;
    else cart.push({ ...item, qty: 1 });
    updateCart();
    if (document.getElementById('cart-sidebar').classList.contains('translate-x-full')) toggleCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    document.getElementById('cart-items').innerHTML = cart.map(item => `
                <div class="flex items-center gap-6 animate-fadeInUp">
                    <img src="${item.img}" class="w-24 h-24 rounded-3xl object-cover shadow-lg">
                    <div class="flex-grow">
                        <h4 class="font-bold text-lg">${item.name}</h4>
                        <p class="text-orange-600 font-bold">$${item.price}</p>
                        <div class="flex items-center gap-4 mt-2">
                            <button onclick="changeQty(${item.id}, -1)" class="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">-</button>
                            <span class="font-bold">${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)" class="w-8 h-8 rounded-full border border-orange-600 text-orange-600 flex items-center justify-center hover:bg-orange-50">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

function changeQty(id, delta) {
    const item = cart.find(p => p.id === id);
    item.qty += delta;
    if (item.qty < 1) cart = cart.filter(p => p.id !== id);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('translate-x-full');
    document.getElementById('overlay').classList.toggle('hidden');
}

window.onload = () => {
    renderServices();
    renderMenu();
};