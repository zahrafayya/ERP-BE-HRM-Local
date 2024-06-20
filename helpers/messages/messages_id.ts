import { MessagesKey } from "./messagesKey";

export const messages_id = {
    // Common Error messages
    [MessagesKey.NODATAFOUND]: "Data tidak ditemukan",
    [MessagesKey.INTERNALSERVERERROR]: "Kesalahan server internal",
    [MessagesKey.UNKNOWNERROR]: "Terjadi kesalahan yang tidak diketahui",
    [MessagesKey.BADREQUEST]: "Permintaan tidak valid.",
    [MessagesKey.UNAUTHORIZED]: "Tidak terotorisasi.",
    [MessagesKey.SPESIFICDATANOTFOUND]: "{0} tidak ditemukan.",
    [MessagesKey.ERRORCREATION]: "Gagal membuat {0}. Metode pembuatan tidak mengembalikan instansi model yang valid.",

    // Common Success messages
    [MessagesKey.SUCCESSGET]: "Data telah ditemukan.",
    [MessagesKey.SUCCESSGETBYID]: "Data telah ditemukan berdasarkan kriteria yang ditentukan.",
    [MessagesKey.SUCCESSCREATE]: "Data telah dibuat.",
    [MessagesKey.SUCCESSBULKCREATE]: "Data telah dibuat secara massal.",
    [MessagesKey.SUCCESSUPDATE]: "Data telah diperbarui.",
    [MessagesKey.SUCCESSBULKUPDATE]: "Data telah diperbarui secara massal.",
    [MessagesKey.SUCCESSDELETE]: "Data telah dihapus.",
    [MessagesKey.SUCCESSSOFTDELETE]: "Data telah dihapus secara lunak.",

    // Repository messages
    [MessagesKey.ERRORMISSINGTOKEN]: "Token tidak ditemukan.",
    [MessagesKey.ERRORINVALIDTOKEN]: "Terjadi kesalahan pada token.",
    [MessagesKey.ERRORFINDINGALL]: "Terjadi kesalahan saat mencari semua data",
    [MessagesKey.ERRORFINDINGBYID]: "Terjadi kesalahan saat mencari data berdasarkan ID",
    [MessagesKey.ERRORCREATE]: "Terjadi kesalahan saat membuat data.",
    [MessagesKey.ERRORBULKCREATE]: "Terjadi kesalahan saat membuat data secara massal.",

    // Business Logic messages
    [MessagesKey.INVOICEALREADYEXISTS]: "Faktur yang terkait dengan kode pesanan penjualan yang diberikan {0} sudah ada.",
};
