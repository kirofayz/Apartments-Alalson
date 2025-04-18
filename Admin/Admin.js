document.addEventListener('DOMContentLoaded', () => {
    // Get language from localStorage or default to English
    const language = localStorage.getItem('language') || 'en';
    const isArabic = language === 'ar';

     // Logout function
     window.logout = function () {
        Swal.fire({
            icon: 'warning',
            title: isArabic ? 'تسجيل الخروج' : 'Logout',
            text: isArabic ? 'هل أنت متأكد أنك تريد تسجيل الخروج؟' : 'Are you sure you want to logout?',
            showCancelButton: true,
            confirmButtonText: isArabic ? 'نعم' : 'Yes',
            cancelButtonText: isArabic ? 'لا' : 'No',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                // localStorage.removeItem('loggedInUser');
                Swal.fire({
                    icon: 'success',
                    title: isArabic ? 'تم تسجيل الخروج!' : 'Logged Out!',
                    text: isArabic ? 'تم تسجيل خروجك بنجاح.' : 'You have been logged out successfully.',
                    confirmButtonText: isArabic ? 'موافق' : 'OK',
                    confirmButtonColor: '#3182ce'
                }).then(() => {
                    window.location.href = '/Login/Login.html';
                });
            }
        });
    };

    // Default apartments if not in localStorage
    const exampleApartments = [
        { id: 1, governorate: "القاهرة", district: "ain shams", street: "main street", zone: "عين شمس", address: "123 الشارع الرئيسي", beds: 2, baths: 1, area: "120", price: "5000 LE", buyPrice: "1000000 LE", image: "1.jpg" },
        { id: 2, governorate: "القاهرة", district: "nasr city", street: "makram ebeid", zone: "مدينة نصر", address: "45 مكرم عبيد", beds: 3, baths: 2, area: "150", price: "7000 LE", buyPrice: "1500000 LE", image: "2.jpg" },
        { id: 3, governorate: "القاهرة", district: "nasr city", street: "abbas el akkad", zone: "مدينة نصر", address: "78 عباس العقاد", beds: 2, baths: 1, area: "130", price: "6000 LE", buyPrice: "1200000 LE", image: "3.jpg" },
        { id: 4, governorate: "الاسكندرية", district: "smouha", street: "victor emanuel", zone: "سموحة", address: "12 فيكتور صموئيل", beds: 3, baths: 2, area: "160", price: "8000 LE", buyPrice: "1800000 LE", image: "4.jpg" },
        { id: 5, governorate: "الجيزة", district: "dokki", street: "tahrir st", zone: "الدقي", address: "5 شارع التحرير", beds: 2, baths: 1, area: "110", price: "4500 LE", buyPrice: "900000 LE", image: "5.jpg" }
    ];

    const exampleCities = [
        { name: 'Cairo' },
        { name: 'Alex' },
    ];

    const exampleReservations = [
        {
            userName: "John Doe",
            propertyName: isArabic ? "شقة فاخرة" : "Luxury Apartment",
            appointment: "2025-03-22 Saturday"
        },
        {
            userName: "Jane Smith",
            propertyName: isArabic ? "فيلا حديثة" : "Modern Villa",
            appointment: "2025-03-23 Sunday"
        }
    ];

    // Initialize data in localStorage if not present
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
    if (!localStorage.getItem('apartments')) localStorage.setItem('apartments', JSON.stringify(exampleApartments));
    if (!localStorage.getItem('cities')) localStorage.setItem('cities', JSON.stringify(exampleCities));
    if (!localStorage.getItem('reservations')) localStorage.setItem('reservations', JSON.stringify(exampleReservations));

    // Category and search functionality
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const lookupList = document.getElementById('lookup-list');
    let currentCategory = 'users';

    function getData(category) {
        switch (category) {
            case 'users': return JSON.parse(localStorage.getItem('users')) || [];
            case 'apartments': return JSON.parse(localStorage.getItem('apartments')) || [];
            case 'cities': return JSON.parse(localStorage.getItem('cities')) || [];
            case 'reservations': return JSON.parse(localStorage.getItem('reservations')) || [];
            default: return [];
        }
    }

    function updateLookups() {
        const searchTerm = searchInput.value.toLowerCase();
        const items = getData(currentCategory);
        lookupList.innerHTML = '';
        const filteredItems = items.filter(item => {
            switch (currentCategory) {
                case 'users': return item.username.toLowerCase().includes(searchTerm) || item.email.toLowerCase().includes(searchTerm);
                case 'apartments': return item.zone.toLowerCase().includes(searchTerm) || item.address.toLowerCase().includes(searchTerm);
                case 'cities': return item.name.toLowerCase().includes(searchTerm);
                case 'reservations': return item.userName.toLowerCase().includes(searchTerm) || item.propertyName.toLowerCase().includes(searchTerm);
                default: return false;
            }
        });
        filteredItems.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'lookup-item';
            div.innerHTML = getLookupText(item, index);
            div.onclick = () => selectItem(index);
            lookupList.appendChild(div);
        });
    }

    function getLookupText(item, index) {
        const number = `( ${index + 1} ) `;
        switch (currentCategory) {
            case 'users': return `${number}${item.username} - ${item.email} - ${item.role}`;
            case 'apartments': return `${number}${item.zone} - ${item.address} - ${item.price} ${isArabic ? 'جنيه / شهرياً' : 'LE / Month'} - ${item.buyPrice} ${isArabic ? 'جنيه' : 'LE'}`;
            case 'cities': return `${number}${item.name}`;
            case 'reservations': return `${number}${item.userName} - ${item.propertyName} - ${item.appointment}`;
            default: return '';
        }
    }

    function selectItem(index) {
        const items = getData(currentCategory);
        const item = items[index];
        Swal.fire({
            title: isArabic ? 'عنصر مختار' : 'Selected Item',
            text: getSelectText(item),
            confirmButtonText: isArabic ? 'موافق' : 'OK',
            customClass: {
                popup: 'swal-modern-popup',
                title: 'swal-modern-title',
                confirmButton: 'btn btn-primary-modern'
            },
            buttonsStyling: false
        });
    }

    function getSelectText(item) {
        switch (currentCategory) {
            case 'users': return `${isArabic ? 'اسم المستخدم' : 'Username'}: ${item.username} - ${isArabic ? 'البريد الإلكتروني' : 'Email'}: ${item.email} - ${isArabic ? 'الدور' : 'Role'}: ${item.role}`;
            case 'apartments': return `${isArabic ? 'العقار' : 'Property'}: ${item.zone} - ${isArabic ? 'العنوان' : 'Address'}: ${item.address} - ${isArabic ? 'السعر للإيجار' : 'Price for Rent'}: ${item.price} ${isArabic ? 'جنيه / شهرياً' : 'LE / Month'} - ${isArabic ? 'السعر للبيع' : 'Price for Buy'}: ${item.buyPrice} ${isArabic ? 'جنيه' : 'LE'}`;
            case 'cities': return `${isArabic ? 'المدينة' : 'City'}: ${item.name}`;
            case 'reservations': return `${isArabic ? 'اسم المستخدم' : 'User Name'}: ${item.userName} - ${isArabic ? 'اسم العقار' : 'Property Name'}: ${item.propertyName} - ${isArabic ? 'الميعاد' : 'Appointment'}: ${item.appointment}`;
            default: return '';
        }
    }

    categorySelect.addEventListener('change', () => {
        currentCategory = categorySelect.value;
        searchInput.value = '';
        updateLookups();
        loadCRUD();
    });

    searchInput.addEventListener('input', updateLookups);
    updateLookups();

    // CRUD Operations
    const crudContent = document.getElementById('crud-content');

    function loadCRUD() {
        const items = getData(currentCategory);
        crudContent.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                        ${getTableHeaders()}
                    </tr>
                </thead>
                <tbody id="crud-table-body"></tbody>
            </table>
        `;
        displayItems();
    }

    function getTableHeaders() {
        switch (currentCategory) {
            case 'users': return `
                <th>${isArabic ? 'اسم المستخدم' : 'Username'}</th>
                <th>${isArabic ? 'البريد الإلكتروني' : 'Email'}</th>
                <th>${isArabic ? 'الدور' : 'Role'}</th>
                <th>${isArabic ? 'الإجراءات' : 'Actions'}</th>
            `;
            case 'apartments': return `
                <th>${isArabic ? 'المنطقة' : 'Zone'}</th>
                <th>${isArabic ? 'المدينة' : 'City'}</th>
                <th>${isArabic ? 'العنوان' : 'Address'}</th>
                <th>${isArabic ? 'السعر للإيجار' : 'Rental Price'}</th>
                <th>${isArabic ? 'السعر للبيع' : 'Buy Price'}</th>
                <th>${isArabic ? 'غرف النوم' : 'Bedrooms'}</th>
                <th>${isArabic ? 'الحمامات' : 'Bathrooms'}</th>
                <th>${isArabic ? 'المساحة' : 'Area'}</th>
                <th>${isArabic ? 'الصورة' : 'Image'}</th>
                <th>${isArabic ? 'الإجراءات' : 'Actions'}</th>
            `;
            case 'cities': return `
                <th>${isArabic ? 'اسم المدينة' : 'City Name'}</th>
                <th>${isArabic ? 'الإجراءات' : 'Actions'}</th>
            `;
            case 'reservations': return `
                <th>${isArabic ? 'اسم المستخدم' : 'User Name'}</th>
                <th>${isArabic ? 'اسم العقار' : 'Property Name'}</th>
                <th>${isArabic ? 'الميعاد' : 'Appointment'}</th>
                <th>${isArabic ? 'الإجراءات' : 'Actions'}</th>
            `;
            default: return '';
        }
    }

    function displayItems() {
        const tbody = document.getElementById('crud-table-body');
        const items = getData(currentCategory);
        tbody.innerHTML = '';
        items.forEach((item, index) => {
            tbody.innerHTML += `
                <tr>
                    ${getTableRow(item, index)}
                </tr>
            `;
        });
    }

    function getTableRow(item, index) {
        switch (currentCategory) {
            case 'users': return `
                <td>${item.username}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="updateItem(${index})">${isArabic ? 'تعديل' : 'Edit'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">${isArabic ? 'حذف' : 'Delete'}</button>
                </td>
            `;
            case 'apartments': return `
                <td>${item.zone}</td>
                <td>${item.governorate}</td>
                <td>${item.address}</td>
                <td>${item.price} ${isArabic ? 'جنيه / شهرياً' : 'LE / Month'}</td>
                <td>${item.buyPrice} ${isArabic ? 'جنيه' : 'LE'}</td>
                <td>${item.beds}</td>
                <td>${item.baths}</td>
                <td>${item.area} ${isArabic ? 'م²' : 'm²'}</td>
                <td><img src="/Images/${item.image}" alt="Apartment Image" style="width: 50px; height: 50px;"></td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="updateItem(${index})">${isArabic ? 'تعديل' : 'Edit'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">${isArabic ? 'حذف' : 'Delete'}</button>
                </td>
            `;
            case 'cities': return `
                <td>${item.name}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="updateItem(${index})">${isArabic ? 'تعديل' : 'Edit'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">${isArabic ? 'حذف' : 'Delete'}</button>
                </td>
            `;
            case 'reservations': return `
                <td>${item.userName}</td>
                <td>${item.propertyName}</td>
                <td>${item.appointment}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="updateItem(${index})">${isArabic ? 'تعديل' : 'Edit'}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">${isArabic ? 'حذف' : 'Delete'}</button>
                </td>
            `;
            default: return '';
        }
    }

    window.addItem = function () {
        let html, preConfirm;
        switch (currentCategory) {
            case 'users':
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="new-username">${isArabic ? 'اسم المستخدم' : 'Username'}</label>
                        <input id="new-username" class="swal-input-custom" placeholder="${isArabic ? 'اسم المستخدم' : 'Username'}" required>

                        <label class="swal-label" for="new-email">${isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
                        <input id="new-email" class="swal-input-custom" type="email" placeholder="${isArabic ? 'البريد الإلكتروني' : 'Email'}" required>

                        <label class="swal-label" for="password">${isArabic ? 'كلمة السر' : 'Password'}</label>
                        <input id="password" class="swal-input-custom" type="password" placeholder="${isArabic ? 'كلمة السر' : 'Password'}" required>

                        <label class="swal-label" for="user-role">${isArabic ? 'الدور' : 'Role'}</label>
                        <select id="user-role" class="swal-input-custom" required>
                            <option value="" disabled selected>${isArabic ? 'اختر الدور' : 'Select Role'}</option>
                            <option value="admin">${isArabic ? 'مسؤول' : 'Admin'}</option>
                            <option value="user">${isArabic ? 'مستخدم' : 'User'}</option>
                        </select>
                    </div>
                `;
                preConfirm = () => {
                    const username = document.getElementById('new-username').value;
                    const email = document.getElementById('new-email').value;
                    const password = document.getElementById('password').value;
                    const role = document.getElementById('user-role').value;

                    if (!username || !email || !password || !role) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    const items = getData('users');
                    if (items.some(item => item.email === email)) {
                        Swal.showValidationMessage(isArabic ? 'البريد الإلكتروني موجود بالفعل' : 'Email already exists');
                        return false;
                    }

                    items.push({ username, email, password, role });
                    localStorage.setItem('users', JSON.stringify(items));
                };
                break;
            case 'apartments':
                const cities = getData('cities');
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="new-zone">${isArabic ? 'المنطقة' : 'Zone'}</label>
                        <input id="new-zone" class="swal-input-custom" placeholder="${isArabic ? 'المنطقة' : 'Zone'}" required>

                        <label class="swal-label" for="new-city">${isArabic ? 'المدينة' : 'City'}</label>
                        <select id="new-city" class="swal-input-custom" required>
                            <option value="" disabled selected>${isArabic ? 'اختر المدينة' : 'Select City'}</option>
                            ${cities.map(city => `<option value="${city.name}">${city.name}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="new-address">${isArabic ? 'العنوان' : 'Address'}</label>
                        <input id="new-address" class="swal-input-custom" placeholder="${isArabic ? 'العنوان' : 'Address'}" required>

                        <label class="swal-label" for="new-price">${isArabic ? 'السعر للإيجار' : 'Rental Price'}</label>
                        <input id="new-price" class="swal-input-custom" type="number" placeholder="${isArabic ? 'السعر للإيجار' : 'Rental Price'}" required>

                        <label class="swal-label" for="new-buy-price">${isArabic ? 'السعر للبيع' : 'Buy Price'}</label>
                        <input id="new-buy-price" class="swal-input-custom" type="number" placeholder="${isArabic ? 'السعر للبيع' : 'Buy Price'}" required>

                        <label class="swal-label" for="new-beds">${isArabic ? 'غرف النوم' : 'Bedrooms'}</label>
                        <input id="new-beds" class="swal-input-custom" type="number" placeholder="${isArabic ? 'غرف النوم' : 'Bedrooms'}" required>

                        <label class="swal-label" for="new-baths">${isArabic ? 'الحمامات' : 'Bathrooms'}</label>
                        <input id="new-baths" class="swal-input-custom" type="number" placeholder="${isArabic ? 'الحمامات' : 'Bathrooms'}" required>

                        <label class="swal-label" for="new-area">${isArabic ? 'المساحة' : 'Area'}</label>
                        <input id="new-area" class="swal-input-custom" type="number" placeholder="${isArabic ? 'المساحة' : 'Area'}" required>

                        <label class="swal-label" for="new-image">${isArabic ? 'الصورة' : 'Image'}</label>
                        <input id="new-image" type="file" class="swal-input-custom" accept="image/*" required>
                    </div>
                `;
                preConfirm = () => {
                    const zone = document.getElementById('new-zone').value;
                    const city = document.getElementById('new-city').value;
                    const address = document.getElementById('new-address').value;
                    const price = parseInt(document.getElementById('new-price').value);
                    const buyPrice = parseInt(document.getElementById('new-buy-price').value);
                    const beds = parseInt(document.getElementById('new-beds').value);
                    const baths = parseInt(document.getElementById('new-baths').value);
                    const area = parseInt(document.getElementById('new-area').value);
                    const imageInput = document.getElementById('new-image');
                    const image = imageInput.files[0] ? imageInput.files[0].name : '';

                    if (!zone || !city || !address || !price || !buyPrice || !beds || !baths || !area || !image) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    const items = getData('apartments');
                    items.push({ zone, city, address, price, buyPrice, beds, baths, area, image });
                    localStorage.setItem('apartments', JSON.stringify(items));
                };
                break;
            case 'cities':
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="new-name">${isArabic ? 'اسم المدينة' : 'City Name'}</label>
                        <input id="new-name" class="swal-input-custom" placeholder="${isArabic ? 'اسم المدينة' : 'City Name'}" required>
                    </div>
                `;
                preConfirm = () => {
                    const name = document.getElementById('new-name').value;
                    if (!name) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }
                    const items = getData('cities');
                    items.push({ name });
                    localStorage.setItem('cities', JSON.stringify(items));
                };
                break;
            case 'reservations':
                const users = getData('users');
                const apartments = getData('apartments');
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="new-user-name">${isArabic ? 'اسم المستخدم' : 'User Name'}</label>
                        <select id="new-user-name" class="swal-input-custom" required>
                            <option value="" disabled selected>${isArabic ? 'اختر المستخدم' : 'Select User'}</option>
                            ${users.map(user => `<option value="${user.username}">${user.username}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="new-property-name">${isArabic ? 'اسم العقار' : 'Property Name'}</label>
                        <select id="new-property-name" class="swal-input-custom" required>
                            <option value="" disabled selected>${isArabic ? 'اختر العقار' : 'Select Property'}</option>
                            ${apartments.map(apartment => `<option value="${apartment.zone}">${apartment.zone}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="new-appointment-date">${isArabic ? 'تاريخ الميعاد' : 'Appointment Date'}</label>
                        <input id="new-appointment-date" class="swal-input-custom" type="date" required>

                        <label class="swal-label" for="new-appointment-day">${isArabic ? 'يوم الميعاد' : 'Appointment Day'}</label>
                        <select id="new-appointment-day" class="swal-input-custom" required>
                            <option value="" disabled selected>${isArabic ? 'اختر اليوم' : 'Select Day'}</option>
                            <option value="Saturday">${isArabic ? 'السبت' : 'Saturday'}</option>
                            <option value="Sunday">${isArabic ? 'الأحد' : 'Sunday'}</option>
                            <option value="Monday">${isArabic ? 'الإثنين' : 'Monday'}</option>
                            <option value="Tuesday">${isArabic ? 'الثلاثاء' : 'Tuesday'}</option>
                            <option value="Wednesday">${isArabic ? 'الأربعاء' : 'Wednesday'}</option>
                            <option value="Thursday">${isArabic ? 'الخميس' : 'Thursday'}</option>
                            <option value="Friday">${isArabic ? 'الجمعة' : 'Friday'}</option>
                        </select>
                    </div>
                `;
                preConfirm = () => {
                    const userName = document.getElementById('new-user-name').value;
                    const propertyName = document.getElementById('new-property-name').value;
                    const appointmentDate = document.getElementById('new-appointment-date').value;
                    const appointmentDay = document.getElementById('new-appointment-day').value;

                    if (!userName || !propertyName || !appointmentDate || !appointmentDay) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    const appointment = `${appointmentDate} ${appointmentDay}`;
                    const items = getData('reservations');
                    items.push({ userName, propertyName, appointment });
                    localStorage.setItem('reservations', JSON.stringify(items));
                };
                break;
        }

        Swal.fire({
            title: isArabic ? 'إضافة جديد' : 'Add New',
            html: html,
            confirmButtonText: isArabic ? 'إضافة' : 'Add',
            showCancelButton: true,
            customClass: {
                popup: 'swal-modern-popup',
                title: 'swal-modern-title',
                confirmButton: 'btn btn-primary-modern',
                cancelButton: 'btn btn-secondary-modern'
            },
            buttonsStyling: false,
            preConfirm: preConfirm
        }).then((result) => {
            if (result.isConfirmed) {
                updateLookups();
                displayItems();
                Swal.fire({
                    title: isArabic ? 'تم الإضافة!' : 'Added!',
                    text: isArabic ? 'تمت الإضافة بنجاح.' : 'Item added successfully.',
                    icon: 'success',
                    confirmButtonText: isArabic ? 'حسنًا' : 'OK',
                    customClass: {
                        popup: 'swal-modern-popup',
                        title: 'swal-modern-title',
                        confirmButton: 'btn btn-primary-modern'
                    },
                    buttonsStyling: false
                });
            }
        });
    };

    window.updateItem = function (index) {
        const items = getData(currentCategory);
        const item = items[index];
        let html, preConfirm;
        switch (currentCategory) {
            case 'users':
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="update-username">${isArabic ? 'اسم المستخدم' : 'Username'}</label>
                        <input id="update-username" class="swal-input-custom" value="${item.username}" required>

                        <label class="swal-label" for="update-email">${isArabic ? 'البريد الإلكتروني' : 'Email'}</label>
                        <input id="update-email" class="swal-input-custom" type="email" value="${item.email}" required>

                        <label class="swal-label" for="update-password">${isArabic ? 'كلمة السر' : 'Password'}</label>
                        <input id="update-password" class="swal-input-custom" type="password" value="${item.password}" required>

                        <label class="swal-label" for="update-role">${isArabic ? 'الدور' : 'Role'}</label>
                        <select id="update-role" class="swal-input-custom" required>
                            <option value="admin" ${item.role === 'admin' ? 'selected' : ''}>${isArabic ? 'مسؤول' : 'Admin'}</option>
                            <option value="user" ${item.role === 'user' ? 'selected' : ''}>${isArabic ? 'مستخدم' : 'User'}</option>
                        </select>
                    </div>
                `;
                preConfirm = () => {
                    const username = document.getElementById('update-username').value;
                    const email = document.getElementById('update-email').value;
                    const password = document.getElementById('update-password').value;
                    const role = document.getElementById('update-role').value;

                    if (!username || !email || !password || !role) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    if (items.some((i, idx) => i.email === email && idx !== index)) {
                        Swal.showValidationMessage(isArabic ? 'البريد الإلكتروني موجود بالفعل' : 'Email already exists');
                        return false;
                    }

                    items[index] = { username, email, password, role };
                    localStorage.setItem('users', JSON.stringify(items));
                };
                break;
            case 'apartments':
                const cities = getData('cities');
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="update-zone">${isArabic ? 'المنطقة' : 'Zone'}</label>
                        <input id="update-zone" class="swal-input-custom" value="${item.zone}" required>

                        <label class="swal-label" for="update-city">${isArabic ? 'المدينة' : 'City'}</label>
                        <select id="update-city" class="swal-input-custom" required>
                            <option value="" disabled>${isArabic ? 'اختر المدينة' : 'Select City'}</option>
                            ${cities.map(city => `<option value="${city.name}" ${item.city === city.name ? 'selected' : ''}>${city.name}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="update-address">${isArabic ? 'العنوان' : 'Address'}</label>
                        <input id="update-address" class="swal-input-custom" value="${item.address}" required>

                        <label class="swal-label" for="update-price">${isArabic ? 'السعر للإيجار' : 'Rental Price'}</label>
                        <input id="update-price" class="swal-input-custom" type="number" value="${item.price}" required>

                        <label class="swal-label" for="update-buy-price">${isArabic ? 'السعر للبيع' : 'Buy Price'}</label>
                        <input id="update-buy-price" class="swal-input-custom" type="number" value="${item.buyPrice}" required>

                        <label class="swal-label" for="update-beds">${isArabic ? 'غرف النوم' : 'Bedrooms'}</label>
                        <input id="update-beds" class="swal-input-custom" type="number" value="${item.beds}" required>

                        <label class="swal-label" for="update-baths">${isArabic ? 'الحمامات' : 'Bathrooms'}</label>
                        <input id="update-baths" class="swal-input-custom" type="number" value="${item.baths}" required>

                        <label class="swal-label" for="update-area">${isArabic ? 'المساحة' : 'Area'}</label>
                        <input id="update-area" class="swal-input-custom" type="number" value="${item.area}" required>

                        <label class="swal-label" for="update-image">${isArabic ? 'الصورة' : 'Image'}</label>
                        <input id="update-image" type="file" class="swal-input-custom" accept="image/*">
                        <p>${isArabic ? 'الصورة الحالية' : 'Current Image'}: ${item.image}</p>
                    </div>
                `;
                preConfirm = () => {
                    const zone = document.getElementById('update-zone').value;
                    const city = document.getElementById('update-city').value;
                    const address = document.getElementById('update-address').value;
                    const price = parseInt(document.getElementById('update-price').value);
                    const buyPrice = parseInt(document.getElementById('update-buy-price').value);
                    const beds = parseInt(document.getElementById('update-beds').value);
                    const baths = parseInt(document.getElementById('update-baths').value);
                    const area = parseInt(document.getElementById('update-area').value);
                    const imageInput = document.getElementById('update-image');
                    const image = imageInput.files[0] ? imageInput.files[0].name : item.image;

                    if (!zone || !city || !address || !price || !buyPrice || !beds || !baths || !area) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    items[index] = { zone, city, address, price, buyPrice, beds, baths, area, image };
                    localStorage.setItem('apartments', JSON.stringify(items));
                };
                break;
            case 'cities':
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="update-name">${isArabic ? 'اسم المدينة' : 'City Name'}</label>
                        <input id="update-name" class="swal-input-custom" value="${item.name}" required>
                    </div>
                `;
                preConfirm = () => {
                    const name = document.getElementById('update-name').value;
                    if (!name) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }
                    items[index] = { name };
                    localStorage.setItem('cities', JSON.stringify(items));
                };
                break;
            case 'reservations':
                const users = getData('users');
                const apartments = getData('apartments');
                const [appointmentDate, appointmentDay] = item.appointment.split(' ');
                html = `
                    <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                        <label class="swal-label" for="update-user-name">${isArabic ? 'اسم المستخدم' : 'User Name'}</label>
                        <select id="update-user-name" class="swal-input-custom" required>
                            <option value="" disabled>${isArabic ? 'اختر المستخدم' : 'Select User'}</option>
                            ${users.map(user => `<option value="${user.username}" ${item.userName === user.username ? 'selected' : ''}>${user.username}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="update-property-name">${isArabic ? 'اسم العقار' : 'Property Name'}</label>
                        <select id="update-property-name" class="swal-input-custom" required>
                            <option value="" disabled>${isArabic ? 'اختر العقار' : 'Select Property'}</option>
                            ${apartments.map(apartment => `<option value="${apartment.zone}" ${item.propertyName === apartment.zone ? 'selected' : ''}>${apartment.zone}</option>`).join('')}
                        </select>

                        <label class="swal-label" for="update-appointment-date">${isArabic ? 'تاريخ الميعاد' : 'Appointment Date'}</label>
                        <input id="update-appointment-date" class="swal-input-custom" type="date" value="${appointmentDate}" required>

                        <label class="swal-label" for="update-appointment-day">${isArabic ? 'يوم الميعاد' : 'Appointment Day'}</label>
                        <select id="update-appointment-day" class="swal-input-custom" required>
                            <option value="" disabled>${isArabic ? 'اختر اليوم' : 'Select Day'}</option>
                            <option value="Saturday" ${appointmentDay === 'Saturday' ? 'selected' : ''}>${isArabic ? 'السبت' : 'Saturday'}</option>
                            <option value="Sunday" ${appointmentDay === 'Sunday' ? 'selected' : ''}>${isArabic ? 'الأحد' : 'Sunday'}</option>
                            <option value="Monday" ${appointmentDay === 'Monday' ? 'selected' : ''}>${isArabic ? 'الإثنين' : 'Monday'}</option>
                            <option value="Tuesday" ${appointmentDay === 'Tuesday' ? 'selected' : ''}>${isArabic ? 'الثلاثاء' : 'Tuesday'}</option>
                            <option value="Wednesday" ${appointmentDay === 'Wednesday' ? 'selected' : ''}>${isArabic ? 'الأربعاء' : 'Wednesday'}</option>
                            <option value="Thursday" ${appointmentDay === 'Thursday' ? 'selected' : ''}>${isArabic ? 'الخميس' : 'Thursday'}</option>
                            <option value="Friday" ${appointmentDay === 'Friday' ? 'selected' : ''}>${isArabic ? 'الجمعة' : 'Friday'}</option>
                        </select>
                    </div>
                `;
                preConfirm = () => {
                    const userName = document.getElementById('update-user-name').value;
                    const propertyName = document.getElementById('update-property-name').value;
                    const appointmentDate = document.getElementById('update-appointment-date').value;
                    const appointmentDay = document.getElementById('update-appointment-day').value;

                    if (!userName || !propertyName || !appointmentDate || !appointmentDay) {
                        Swal.showValidationMessage(isArabic ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
                        return false;
                    }

                    const appointment = `${appointmentDate} ${appointmentDay}`;
                    items[index] = { userName, propertyName, appointment };
                    localStorage.setItem('reservations', JSON.stringify(items));
                };
                break;
        }

        Swal.fire({
            title: isArabic ? 'تعديل العنصر' : 'Update Item',
            html: html,
            confirmButtonText: isArabic ? 'تحديث' : 'Update',
            showCancelButton: true,
            customClass: {
                popup: 'swal-modern-popup',
                title: 'swal-modern-title',
                confirmButton: 'btn btn-primary-modern',
                cancelButton: 'btn btn-secondary-modern'
            },
            buttonsStyling: false,
            preConfirm: preConfirm
        }).then((result) => {
            if (result.isConfirmed) {
                updateLookups();
                displayItems();
                Swal.fire({
                    title: isArabic ? 'تم التحديث!' : 'Updated!',
                    text: isArabic ? 'تم تحديث العنصر بنجاح.' : 'Item updated successfully.',
                    icon: 'success',
                    confirmButtonText: isArabic ? 'حسنًا' : 'OK',
                    customClass: {
                        popup: 'swal-modern-popup',
                        title: 'swal-modern-title',
                        confirmButton: 'btn btn-primary-modern'
                    },
                    buttonsStyling: false
                });
            }
        });
    };

    window.deleteItem = function (index) {
        Swal.fire({
            icon: 'warning',
            title: isArabic ? 'حذف العنصر' : 'Delete Item',
            text: isArabic ? 'هل أنت متأكد؟' : 'Are you sure?',
            showCancelButton: true,
            confirmButtonText: isArabic ? 'نعم' : 'Yes',
            cancelButtonText: isArabic ? 'لا' : 'No',
            customClass: {
                popup: 'swal-modern-popup',
                title: 'swal-modern-title',
                confirmButton: 'btn btn-primary-modern',
                cancelButton: 'btn btn-secondary-modern'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                const items = getData(currentCategory);
                items.splice(index, 1);
                localStorage.setItem(currentCategory, JSON.stringify(items));
                updateLookups();
                displayItems();
                Swal.fire({
                    title: isArabic ? 'تم الحذف!' : 'Deleted!',
                    text: isArabic ? 'تم حذف العنصر بنجاح.' : 'Item deleted successfully.',
                    icon: 'success',
                    confirmButtonText: isArabic ? 'حسنًا' : 'OK',
                    customClass: {
                        popup: 'swal-modern-popup',
                        title: 'swal-modern-title',
                        confirmButton: 'btn btn-primary-modern'
                    },
                    buttonsStyling: false
                });
            }
        });
    };

    // Initial load
    loadCRUD();
});