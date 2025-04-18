document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user && user.role === "admin") {
            Swal.fire({
                icon: 'success',
                title: currentLang === 'en' ? 'Login as Admin Successful!' : 'تم تسجيل الدخول كمسؤول بنجاح!',
                text: currentLang === 'en' ? 'Welcome, Admin!' : 'مرحبًا، أيها المسؤول!',
                confirmButtonText: currentLang === 'en' ? 'OK' : 'موافق',
                confirmButtonColor: '#3182ce'
            }).then(() => {
                window.location.href = '/Admin/Admin.html'; // Redirect to admin page
            });
        } else if (user) {
            // Store logged-in user details in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify({
                username: user.username,
                email: user.email,
                role: user.role,
                isAdmin: false
            }));
            Swal.fire({
                icon: 'success',
                title: currentLang === 'en' ? 'Login Successful!' : 'تم تسجيل الدخول بنجاح!',
                text: currentLang === 'en' ? 'Welcome back!' : 'مرحبًا بعودتك!',
                confirmButtonText: currentLang === 'en' ? 'OK' : 'موافق',
                confirmButtonColor: '#3182ce'
            }).then(() => {
                window.location.href = '/Home/Home.html';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: currentLang === 'en' ? 'Login Failed' : 'فشل تسجيل الدخول',
                text: currentLang === 'en' ? 'Invalid email or password.' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
                confirmButtonText: currentLang === 'en' ? 'Try Again' : 'حاول مرة أخرى',
                confirmButtonColor: '#d33'
            });
        }
    });
});