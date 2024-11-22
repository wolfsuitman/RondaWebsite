window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');

    // Preloader'ı 2 saniye boyunca göster
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 2000); // 2 saniye (2000 milisaniye)
});
