const isArabic = localStorage.getItem('language') === 'ar';
const apartments = JSON.parse(localStorage.getItem('apartments')) || [];

const params = new URLSearchParams(window.location.search);
const itemId = parseInt(params.get('id'));
const   item = apartments[itemId];

const carouselContainer = document.getElementById('carousel-images');
const detailsContainer = document.getElementById('apartment-details');

if (item) {
    // Assuming item.images is an array of image URLs; if not, adjust accordingly
    const images = item.images || ['/Images/2.jpg', '/Images/3.jpg', '/Images/1.jpg', '/Images/4.jpg']; // Fallback images
    let carouselItems = '';
    images.forEach((img, index) => {
        carouselItems += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${img}" class="d-block w-100" alt="Apartment Image ${index + 1}" style="object-fit: cover; height: 400px;">
            </div>
        `;
    });
    carouselContainer.innerHTML = carouselItems;

    // Apartment details
    detailsContainer.innerHTML = `
        <h3 class="mb-3">${item.address}</h3>
        <p class="text-muted">Description</p>
        <ul class="list-unstyled">
            <li><i class="fas fa-bed me-2"></i> ${isArabic ? 'غرف النوم' : 'Bedrooms'} : ${item.beds || 'N/A'}</li>
            <li><i class="fas fa-bath me-2"></i> ${isArabic ? 'الحمامات' : 'Bathrooms'} : ${item.baths || 'N/A'}</li>
            <li><i class="fas fa-ruler-combined me-2"></i> ${isArabic ? 'المساحة' : 'Area'} : ${item.area || 'N/A'} ${isArabic ? 'م²' : 'sqm'}</li>
            <li><i class="fas fa-dollar-sign me-2"></i> ${isArabic ? 'السعر للإيجار' : 'Price'} : ${item.price || 'N/A'} ${isArabic ? 'جنيه / شهرياً' : 'LE / Month'}</li>
            <li><i class="fas fa-dollar-sign me-2"></i> ${isArabic ? 'السعر للبيع' : 'Price'} : ${item.buyPrice || 'N/A'} ${isArabic ? 'جنيه' : 'LE'}</li>
        </ul>
        <a href="#" id="reserve-btn" class="btn btn-primary mt-3">${isArabic ? 'حجز ميعاد' : 'Reserve'}</a>
        <a href="/Home/Home.html" class="btn btn-primary mt-3">${isArabic ? 'رجوع' : 'Back'}</a>
    `;

    // Add event listener for the Reserve button
    document.getElementById('reserve-btn').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        Swal.fire({
            title: isArabic ? 'حجز موعد لعرض الشقة' : 'Reserve an Appointment',
            html: `
                <hr>
                <div class="swal-form-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                    <label class="swal-label" for="visit-date">${isArabic ? 'التاريخ' : 'Date'}</label>
                    <input type="date" id="visit-date" class="swal-input-custom" required>

                    <label class="swal-label" for="visit-day">${isArabic ? 'اليوم' : 'Day'}</label>
                    <select id="visit-day" class="swal-select-custom" required>
                        <option value="" disabled selected>${isArabic ? 'اختر يوم' : 'Choose a day'}</option>
                        <option value="saturday">${isArabic ? 'السبت' : 'Saturday'}</option>
                        <option value="sunday">${isArabic ? 'الأحد' : 'Sunday'}</option>
                        <option value="monday">${isArabic ? 'الإثنين' : 'Monday'}</option>
                        <option value="tuesday">${isArabic ? 'الثلاثاء' : 'Tuesday'}</option>
                        <option value="wednesday">${isArabic ? 'الأربعاء' : 'Wednesday'}</option>
                        <option value="thursday">${isArabic ? 'الخميس' : 'Thursday'}</option>
                        <option value="friday">${isArabic ? 'الجمعة' : 'Friday'}</option>
                    </select>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: isArabic ? 'تأكيد' : 'Confirm',
            cancelButtonText: isArabic ? 'إلغاء' : 'Cancel',
            customClass: {
                popup: 'swal-modern-popup',
                title: 'swal-modern-title',
                confirmButton: 'btn btn-primary-modern',
                cancelButton: 'btn btn-secondary-modern'
            },
            buttonsStyling: false,
            preConfirm: () => {
                const date = document.getElementById('visit-date').value;
                const day = document.getElementById('visit-day').value;
                if (!date || !day) {
                    Swal.showValidationMessage(isArabic ? 'يرجى اختيار التاريخ واليوم' : 'Please select both date and day');
                }
                return { date, day };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { date, day } = result.value;
                Swal.fire({
                    title: isArabic ? 'تم الحجز بنجاح!' : 'Appointment Reserved!',
                    html: `
                        <div class="swal-success-container" style="text-align: ${isArabic ? 'right' : 'left'};">
                            <p class="swal-success-text">${isArabic ? 'تفاصيل الحجز:' : 'Reservation Details:'}</p>
                            <ul class="swal-details-list">
                                <li><i class="fas fa-calendar-alt me-2"></i> <strong>${isArabic ? 'التاريخ' : 'Date'}:</strong> ${date}</li>
                                <li><i class="fas fa-calendar-day me-2"></i> <strong>${isArabic ? 'اليوم' : 'Day'}:</strong> ${isArabic ? document.getElementById('visit-day').options[document.getElementById('visit-day').selectedIndex].text : day}</li>
                            </ul>
                            <hr class="swal-divider">
                            <p class="swal-success-text">${isArabic ? 'تفاصيل الاتصال :' : 'Contact Details :'}</p>
                            <ul class="swal-details-list">
                                <li><i class="fas fa-phone me-2"></i> +201202982836 </li>
                                <li><i class="fas fa-envelope me-2"></i>kirofayz23@gmail.com</li>
                                <li><i class="fas fa-map-marker-alt me-2"></i> ${item.address}</li>
                            </ul>
                        </div>
                    `,
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
    });
} else {
    detailsContainer.innerHTML = `<p class="text-danger">${isArabic ? 'العنصر غير موجود' : 'Item not found.'}</p>`;
}