function showMessage(text, isError = false) { // Функция для показа уведомлений
    alert(text);
}
function updateTotal() {  // Функция для конструктора (обновление цены)
    if (document.getElementById('total-price-display')) {
        let total = 0;
        const components = {
            processor: { 'Intel Core i5-14600K': 25000, 'Intel Core i7-14700K': 38000, 'AMD Ryzen 7 7800X3D': 42000 },
            gpu: { 'RTX 4060': 32000, 'RTX 4070': 55000, 'RTX 4080': 90000 },
            motherboard: { 'B760': 12000, 'Z790': 18000, 'B650': 14000 },
            ram: { '16GB DDR5': 8000, '32GB DDR5': 14000, '64GB DDR5': 25000 },
            storage: { '512GB SSD': 5000, '1TB SSD': 8000, '2TB SSD': 14000 },
            psu: { '650W': 6000, '750W': 8000, '850W': 11000 },
            cooling: { 'Воздушное': 4000, 'Жидкостное': 12000, 'Башенное': 7000 }
        };
        const selects = {
            processor: document.getElementById('processor'),
            gpu: document.getElementById('gpu'),
            motherboard: document.getElementById('motherboard'),
            ram: document.getElementById('ram'),
            storage: document.getElementById('storage'),
            psu: document.getElementById('psu'),
            cooling: document.getElementById('cooling')
        };
        for (const [key, select] of Object.entries(selects)) {
            if (select && select.value) {
                if (components[key] && components[key][select.value]) {
                    total += components[key][select.value];
                }
            }
        }
        const totalDisplay = document.getElementById('total-price-display');
        if (totalDisplay) {
            totalDisplay.textContent = total.toLocaleString() + ' ₽';
        }
        const selectedList = document.getElementById('selected-components-list');  // Обновить список выбранных компонентов
        if (selectedList) {
            selectedList.innerHTML = '';
            for (const [key, select] of Object.entries(selects)) {
                if (select && select.value) {
                    const li = document.createElement('li');
                    li.textContent = select.options[select.selectedIndex]?.text || select.value;
                    selectedList.appendChild(li);
                }
            }
        }
    }
}
function initConstructor() {  // Инициализация страницы конструктора
    const selects = ['processor', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'cooling'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', updateTotal);
        }
    });
    updateTotal();
    
    const addToCart = document.getElementById('add-to-cart'); // Кнопка добавления в корзину
    if (addToCart) {
        addToCart.addEventListener('click', function(e) {
            e.preventDefault();
            const total = document.getElementById('total-price-display')?.textContent || '0 ₽';
            showMessage('Товар добавлен в корзину на сумму ' + total);
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        });
    }
}
function initCheckout() { // Инициализация страницы оформления заказа
    const confirmBtn = document.getElementById('confirm-order');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const fio = document.getElementById('fio')?.value;
            if (!fio) {
                showMessage('Пожалуйста, заполните ФИО', true);
                return;
            }
            showMessage('Заказ подтверждён! Номер заказа: #' + Math.floor(Math.random() * 10000));
            setTimeout(() => {
                window.location.href = 'status.html';
            }, 1500);
        });
    }
    const cancelBtn = document.getElementById('cancel-order');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showMessage('Заказ отменён. Возвращается 90% суммы.');
        });
    }
}
function initStatus() { // Инициализация страницы статуса заказа
    const checkBtn = document.getElementById('check-status');
    if (checkBtn) {
        checkBtn.addEventListener('click', function() {
            const orderNumber = document.getElementById('order-number')?.value;
            if (!orderNumber) {
                showMessage('Введите номер заказа', true);
                return;
            }
            const resultBlock = document.getElementById('status-result'); // Имитация поиска заказа
            if (resultBlock) {
                resultBlock.classList.add('active');
                document.getElementById('result-date').textContent = '01.06.2026';
                document.getElementById('result-paid').innerHTML = '<span class="status-badge success">Оплачен ✓</span>';
                document.getElementById('result-shipped').innerHTML = '<span class="status-badge pending">Отгружается</span>';
                document.getElementById('result-status').innerHTML = '<span class="status-badge pending">Собирается</span>';
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', function() { // Запуск инициализации при загрузке страницы
    if (window.location.pathname.includes('constructor.html')) {
        initConstructor();
    }
    if (window.location.pathname.includes('checkout.html')) {
        initCheckout();
    }
    if (window.location.pathname.includes('status.html')) {
        initStatus();
    }
});