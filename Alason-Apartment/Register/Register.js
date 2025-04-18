document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    // Initialize default admin user if not present
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const defaultAdmin = {
        username: "admin",
        email: "Admin@apartment.com",
        password: "Admin@123",
        role: 'admin'
    };

    // Check if the admin user already exists; if not, add it
    if (!users.some(u => u.email === defaultAdmin.email)) {
        users.push(defaultAdmin);
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const users = JSON.parse(localStorage.getItem('users')) || []; // Refresh users array

            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: currentLang === 'en' ? 'Registration Failed' : 'فشل التسجيل',
                    text: currentLang === 'en' ? 'Passwords do not match.' : 'كلمات المرور غير متطابقة.',
                    confirmButtonText: currentLang === 'en' ? 'Try Again' : 'حاول مرة أخرى',
                    confirmButtonColor: '#d33'
                });
                return;
            }

            if (users.some(u => u.email === email)) {
                Swal.fire({
                    icon: 'error',
                    title: currentLang === 'en' ? 'Registration Failed' : 'فشل التسجيل',
                    text: currentLang === 'en' ? 'Email already registered.' : 'البريد الإلكتروني مسجل بالفعل.',
                    confirmButtonText: currentLang === 'en' ? 'Try Again' : 'حاول مرة أخرى',
                    confirmButtonColor: '#d33'
                });
                return;
            }

            const newUser = { 
                username, 
                email, 
                password, 
                role:'user' // Default for new users
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            Swal.fire({
                icon: 'success',
                title: currentLang === 'en' ? 'Registration Successful!' : 'تم التسجيل بنجاح!',
                text: currentLang === 'en' ? 'You can now log in.' : 'يمكنك الآن تسجيل الدخول.',
                confirmButtonText: currentLang === 'en' ? 'OK' : 'موافق',
                confirmButtonColor: '#3182ce'
            }).then(() => {
                window.location.href = '/Login/Login.html';
            });
        });
    }
});