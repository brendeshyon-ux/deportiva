const cart = {
    items: [],

    toggle() {
        document.getElementById('side-cart').classList.toggle('active');
        document.getElementById('cart-overlay').classList.toggle('active');
    },

    add(id, name, price) {
        const existing = this.items.find(item => item.id === id);

        if (existing) {
            existing.qty++;
        } else {
            this.items.push({ id, name, price, qty: 1 });
        }

        this.updateUI();

        Swal.fire({
            title: '¡Añadido!',
            text: `${name} está en tu carrito`,
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            background: '#18202b',
            color: '#fff'
        });
    },

    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateUI();
    },

    updateUI() {
        const container = document.getElementById('cart-items');
        const countSpan = document.getElementById('cart-count');
        const totalSpan = document.getElementById('cart-total');

        container.innerHTML = '';
        let total = 0;
        let count = 0;

        this.items.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;

            container.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <small>${item.qty} x $${item.price}</small>
                    </div>
                    <button class="remove-btn" onclick="cart.remove(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
        });

        countSpan.innerText = count;
        totalSpan.innerText = `$${total.toFixed(2)}`;
    }
};

document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('bi-x-lg', 'bi-list');
    }
    cart.toggle();
});


const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('bi-list');
    icon.classList.toggle('bi-x-lg');
});

document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('bi-list');
        icon.classList.remove('bi-x-lg');
    });
});

document.getElementById('formularioContacto').addEventListener('submit', function (e) {
    e.preventDefault();
});