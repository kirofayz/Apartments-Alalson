document.addEventListener('DOMContentLoaded', () => {
    // Get language from localStorage or default to English
    const language = localStorage.getItem('language') || 'en';
    const isArabic = language === 'ar';
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navbarNav = document.getElementById('navbar-nav');

    // Update navbar based on login status
    if (loggedInUser) {
        navbarNav.innerHTML = `
            <button class="lang-btn btn btn-outline-secondary" onclick="toggleLanguage()">${isArabic ? 'EN' : 'AR'}</button>
            <a class="nav-link" href="#" onclick="logout()">${isArabic ? 'تسجيل الخروج' : 'Logout'}</a>
        `;
    } else {
        navbarNav.innerHTML = `
            <button class="lang-btn btn btn-outline-secondary" onclick="toggleLanguage()">${isArabic ? 'EN' : 'AR'}</button>
            <a class="nav-link" href="/Login/Login.html" data-en="Login" data-ar="تسجيل الدخول">${isArabic ? 'تسجيل الدخول' : 'Login'}</a>
            <a class="nav-link" href="/Register/Register.html" data-en="Register" data-ar="تسجيل حساب جديد">${isArabic ? 'تسجيل حساب جديد' : 'Register'}</a>
            <a class="nav-link" href="/Login/Login.html" data-en="Admin" data-ar="الإدارة">${isArabic ? 'الإدارة' : 'Admin'}</a>
        `;
    }

    // Apply RTL if Arabic
    if (isArabic) {
        document.body.classList.add('rtl');
        document.querySelectorAll('.custom-select').forEach(select => select.classList.add('rtl'));
    }

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
                localStorage.removeItem('loggedInUser');
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

    // Initialize default admin user
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const defaultAdmin = {
        username: "admin",
        email: "Admin@apartment.com",
        password: "Admin@123",
        role: 'admin'
    };
    if (!users.some(u => u.email === defaultAdmin.email)) {
        users.push(defaultAdmin);
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Initialize apartments data
    const apartmentSearchData = [
        { id: 1, governorate: "cairo", district: "ain shams", street: "main street", zone: "عين شمس", address: "123 الشارع الرئيسي", beds: 2, baths: 1, area: "120", price: "5000 LE", buyPrice: "1000000 LE", image: "1.jpg" },
        { id: 2, governorate: "cairo", district: "nasr city", street: "makram ebeid", zone: "مدينة نصر", address: "45 مكرم عبيد", beds: 3, baths: 2, area: "150", price: "7000 LE", buyPrice: "1500000 LE", image: "2.jpg" },
        { id: 3, governorate: "cairo", district: "nasr city", street: "abbas el akkad", zone: "مدينة نصر", address: "78 عباس العقاد", beds: 2, baths: 1, area: "130", price: "6000 LE", buyPrice: "1200000 LE", image: "3.jpg" },
        { id: 4, governorate: "alex", district: "smouha", street: "victor emanuel", zone: "سموحة", address: "12 فيكتور صموئيل", beds: 3, baths: 2, area: "160", price: "8000 LE", buyPrice: "1800000 LE", image: "4.jpg" },
        { id: 5, governorate: "giza", district: "dokki", street: "tahrir st", zone: "الدقي", address: "5 شارع التحرير", beds: 2, baths: 1, area: "110", price: "4500 LE", buyPrice: "900000 LE", image: "5.jpg" }
    ];

    if (!localStorage.getItem("apartments")) {
        localStorage.setItem("apartments", JSON.stringify(apartmentSearchData));
    }

    const apartments = JSON.parse(localStorage.getItem("apartments")) || [];
    const apartmentList = document.getElementById("apartment-list");
    const governorateSelect = document.getElementById("governorate-select");
    const districtSelect = document.getElementById("district-select");
    const streetSelect = document.getElementById("street-select");

    const locationData = {
        cairo: {
            "ain shams": ["main street", "secondary street"],
            "nasr city": ["makram ebeid", "abbas el akkad"],
            "heliopolis": ["merghany", "nozha"]
        },
        alex: {
            "smouha": ["victor emanuel", "fawzy moaz"],
            "miami": ["gamila bouhraid", "khaled ibn el waleed"]
        },
        giza: {
            dokki: ["tahrir st", "mosadak st"],
            mohandessin: ["lebanon st", "syria st"]
        }
    };

    const translations = {
        districts: {
            "ain shams": { en: "Ain Shams", ar: "عين شمس" },
            "nasr city": { en: "Nasr City", ar: "مدينة نصر" },
            "heliopolis": { en: "Heliopolis", ar: "مصر الجديدة" },
            "smouha": { en: "Smouha", ar: "سموحة" },
            "miami": { en: "Miami", ar: "ميامي" },
            "dokki": { en: "Dokki", ar: "الدقي" },
            "mohandessin": { en: "Mohandessin", ar: "المهندسين" }
        },
        streets: {
            "main street": { en: "Main Street", ar: "الشارع الرئيسي" },
            "secondary street": { en: "Secondary Street", ar: "الشارع الفرعي" },
            "makram ebeid": { en: "Makram Ebeid", ar: "شارع مكرم عبيد" },
            "abbas el akkad": { en: "Abbas El Akkad", ar: "شارع عباس العقاد" },
            "merghany": { en: "Merghany", ar: "شارع المرغني" },
            "nozha": { en: "Nozha", ar: "شارع النزهة" },
            "victor emanuel": { en: "Victor Emanuel", ar: "فيكتور عمانويل" },
            "fawzy moaz": { en: "Fawzy Moaz", ar: "فوزي معاذ" },
            "gamila bouhraid": { en: "Gamila Bouhraid", ar: "جميلة بوحريد" },
            "khaled ibn el waleed": { en: "Khaled Ibn El Waleed", ar: "خالد ابن الوليد" },
            "tahrir st": { en: "Tahrir St", ar: "شارع التحرير" },
            "mosadak st": { en: "Mosadak St", ar: "شارع مصدق" },
            "lebanon st": { en: "Lebanon St", ar: "شارع لبنان" },
            "syria st": { en: "Syria St", ar: "شارع سوريا" }
        }
    };

    function displayApartments(filteredApartments = apartments) {
        apartmentList.innerHTML = '';
        filteredApartments.forEach((apt, index) => {
            const card = `
                <div class="col-md-4 mb-4">
                    <div class="apartment-card">
                        <img src="/Images/${apt.image || 'default.jpg'}" class="card-img-top" alt="${apt.zone}">
                        <div class="card-body">
                            <h5 class="card-title">${apt.zone}</h5>
                            <p class="card-text">
                                <i class="fas fa-map-marker-alt"></i> ${apt.address}
                            </p>
                            <p class="card-text">
                                <i class="fas fa-bed"></i> ${apt.beds} ${isArabic ? 'سرير' : 'Beds'} | 
                                <i class="fas fa-bath"></i> ${apt.baths} ${isArabic ? 'حمام' : 'Baths'} | 
                                <i class="fas fa-ruler"></i> ${apt.area} ${isArabic ? 'قدم مربع' : 'sqft'}
                            </p>
                            <h5 class="text-primary fw-bold">${apt.price} ${isArabic ? 'جنيه / شهرياً' : 'LE / Month'}</h5>
                            <h5 class="text-danger fw-bold">${apt.buyPrice} ${isArabic ? 'جنيه' : 'LE'}</h5>
                              <a href="javascript:void(0);" 
   class="btn btn-primary w-100 view-details-btn"
   data-index="${index}">
   ${isArabic ? 'عرض التفاصيل' : 'View Details'}
</a>

                        </div>
                    </div>
                </div>
            `;
            apartmentList.innerHTML += card;
        });
    }


    // Filter apartments
    function filterApartments() {
        const governorate = governorateSelect.value.toLowerCase();
        const district = districtSelect.value.toLowerCase();
        const street = streetSelect.value.toLowerCase();

        const filteredApartments = apartments.filter(apt => {
            return (
                (!governorate || apt.governorate.toLowerCase() === governorate) &&
                (!district || apt.district.toLowerCase() === district) &&
                (!street || apt.street.toLowerCase() === street)
            );
        });

        displayApartments(filteredApartments);
    }

    governorateSelect.addEventListener("change", (e) => {
        const governorate = e.target.value;
        districtSelect.innerHTML = `<option value="">${isArabic ? 'اختر الحي' : 'Select District'}</option>`;
        streetSelect.innerHTML = `<option value="">${isArabic ? 'اختر الشارع' : 'Select Street'}</option>`;
        districtSelect.disabled = !governorate;
        streetSelect.disabled = true;

        if (governorate && locationData[governorate]) {
            Object.keys(locationData[governorate]).forEach(district => {
                const option = document.createElement("option");
                option.value = district;
                option.textContent = isArabic
                    ? translations.districts[district]?.ar || district
                    : translations.districts[district]?.en || district;
                districtSelect.appendChild(option);
            });
        }
        filterApartments();
    });

    // District change event
    districtSelect.addEventListener("change", (e) => {
        const governorate = governorateSelect.value;
        const district = e.target.value;
        streetSelect.innerHTML = `<option value="">${isArabic ? 'اختر الشارع' : 'Select Street'}</option>`;
        streetSelect.disabled = !district;

        if (district && locationData[governorate][district]) {
            locationData[governorate][district].forEach(street => {
                const option = document.createElement("option");
                option.value = street;
                option.textContent = isArabic
                    ? translations.streets[street]?.ar || street
                    : translations.streets[street]?.en || street;
                streetSelect.appendChild(option);
            });
        }
        filterApartments();
    });

    streetSelect.addEventListener("change", filterApartments);

    // Initial display
    displayApartments();

    // Update select placeholders based on language
    governorateSelect.options[0].text = isArabic ? 'اختر المحافظة' : 'Select Governorate';
    districtSelect.options[0].text = isArabic ? 'اختر الحي' : 'Select District';
    streetSelect.options[0].text = isArabic ? 'اختر الشارع' : 'Select Street';



        const isLoggedIn = loggedInUser ? 'true' : 'false'; // تحديد إذا المستخدم مسجل دخول
    
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault(); // نوقف أي توجيه افتراضي
    
                const aptIndex = this.dataset.index;
    
                if (isLoggedIn == 'false') {
                    Swal.fire({
                        icon: 'warning',
                        title: isArabic ? 'تنبيه' : 'Warning',
                        text: isArabic ? 'يجب تسجيل الدخول أولاً' : 'You must be logged in first',
                        confirmButtonText: isArabic ? 'حسناً' : 'OK'
                    });
                } else {
                    // لو مسجل دخول، نروح لصفحة التفاصيل
                    window.location.href = `/Detials/Detials.html?id=${aptIndex}`;
                }
            });
        });
    
    

});



