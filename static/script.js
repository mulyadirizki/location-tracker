function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation tidak didukung oleh browser ini.";
    }
}

function sendLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var message = `Latitude: ${latitude}, Longitude: ${longitude}`;
    document.getElementById("location").innerHTML = message;

    // Kirim data ke backend
    fetch('/save-location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "Pengguna menolak permintaan Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Informasi lokasi tidak tersedia.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "Permintaan untuk mendapatkan lokasi pengguna mengalami timeout.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "Terjadi kesalahan yang tidak diketahui.";
            break;
    }
}

// Panggil getLocation saat halaman dimuat
window.onload = getLocation;
