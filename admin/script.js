// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1yk1tIBhP8a5VIDo62ZiN9kjD_tNhQ70",
  authDomain: "mannstore-50549.firebaseapp.com",
  projectId: "mannstore-50549",
  storageBucket: "mannstore-50549.appspot.com",
  messagingSenderId: "539021282370",
  appId: "1:539021282370:web:6aa2f6bd176eee94ffb1db",
  measurementId: "G-40JZM8L3WY"
};
// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Akses elemen form
const inputForm = document.getElementById('inputForm');

inputForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Ambil data dari form
  const namaBarang = document.getElementById('namaBarang').value;
  const kategoriGame = document.getElementById('kategoriGame').value;

  // Mengambil harga dan menghapus pemisah ribuan sebelum mengkonversi
  const hargaAsli = document.getElementById('hargaAsli').value.replace(/\./g, ''); // Menghapus pemisah ribuan
  const hargaDiskon = document.getElementById('hargaDiskon').value.replace(/\./g, ''); // Menghapus pemisah ribuan

  // Format harga menjadi string dengan pemisah ribuan
  const formattedHargaAsli = Number(hargaAsli).toLocaleString('id-ID');
  const formattedHargaDiskon = Number(hargaDiskon).toLocaleString('id-ID');

  if (kategoriGame) {
    try {
      // Kirim data ke Firestore di koleksi sesuai kategori game
      await db.collection(kategoriGame).add({
        namaBarang: namaBarang,
        hargaAsli: formattedHargaAsli, // Simpan sebagai string dengan pemisah ribuan
        hargaDiskon: formattedHargaDiskon, // Simpan sebagai string dengan pemisah ribuan
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert('Data berhasil dikirim ke ' + kategoriGame);
      inputForm.reset();
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert('Terjadi kesalahan saat mengirim data.');
    }
  } else {
    alert('Pilih kategori game!');
  }
});

// Fungsi untuk memformat harga
function formatCurrency(input) {
    // Menghapus semua karakter non-numerik
    let value = input.value.replace(/\D/g, '');

    // Memformat nilai sebagai mata uang (dengan pemisah ribuan)
    value = Number(value).toLocaleString('id-ID');

    // Mengatur nilai yang diformat kembali ke input
    input.value = value;
}
