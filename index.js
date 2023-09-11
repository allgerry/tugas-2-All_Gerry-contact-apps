// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Hapus Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5. Reset Data \n");
    readline.question(`Silahkan Masukan Pilihan Anda  :`, input => {
        mainMenu(Number(input))
    });
}



function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData() 
            break;
        // lanjutkan menu pilihanya disini secara urut
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}



function simpan() { // fungsi untuk menyimpan data
    console.log("Silahkan Masukan Data ! : ");
    readline.question("Nama :", (nama) => {
        objectKontak.nama = nama
        console.log(`Input data berhasil ! :${nama}`);
        ambilInputanNomor()
    })
    
}
const ambilInputanNomor = () => { // fungsi untuk mengambil inputan nomor
    readline.question("Nomor :", (nomor) => {
        objectKontak.nomorHp = nomor
        databaseKontak.push(Object.assign({},objectKontak)) // insert data kedalam array databseKOntak
        kembali()
    })
}
const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) :", (pilihan) => {
        if(pilihan === "y"){
            viewMenu()
        }else {
            readline.close()
        }
        
    })
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData () {
    databaseKontak.length = 0
    console.log("Data telah direset");
    kembali();
}

function pencarianData () {
    readline.question("Memasukkan nama yang ingin dicari: ", (nama) => {
        const hasilPencarian = databaseKontak.filter(kontak => kontak.nama.toLowerCase()=== nama.toLowerCase());
    
        if (hasilPencarian.length > 0){
            console.table(hasilPencarian);
        } else {
            console.log(`Data dengan nama ${nama} tidak ditemukan.`);
        }
        kembali();
    });
}
function hapusData () {
    readline.question("Masukkan nama yang ingin dihapus: ", (nama) => {
        const indexHapus = databaseKontak.findIndex (kontak => kontak.nama.toLowerCase()=== nama.toLowerCase());

        if (indexHapus !== -1) {
            databaseKontak.splice(indexHapus, 1);
            console.log(`Data dengan nama ${nama} telah dihapus`);
            
        }else {
            console.log(`Data dengan nama ${nama} tidak diteemukan`);
        }
        kembali();
    })
}


viewMenu() // panggil fungsi view menu untuk pertama kali