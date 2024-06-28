export const OPTIONS = {
  tokoOnline: ["Shopee", "Tokopedia", "Lazada", "Amazon", "Titipan Pribadi", "Toko lain"] as [
    string,
    ...string[]
  ],
  kodeWilayah: ["BB11", "BB12", "BB13", "BB14", "BB15", "BB31", "BB21", "BB22", "BB23", "BB24"] as [
    string,
    ...string[]
  ],
};

export const FORM_ORDER = [
  {
    label: "Nama Barang",
    formName: "item_name",
    placeholder: "nama barang kamu",
    msg: "Pastikan kamu barang apa yang kamu titip",
  },
  {
    label: "Nomor Resi",
    formName: "tracking_number",
    placeholder: "nomor resi kamu",
    msg: "Pastikan kamu menulis nomor resi nya dengan benar",
  },
  {
    label: "Toko Online",
    formName: "online_store",
    placeholder: "pilih toko online",
    msg: "Silahkan pilih toko online tempat kamu belanja",
    options: OPTIONS.tokoOnline,
  },
  {
    label: "Nomor Whatsapp",
    formName: "whatsapp_number",
    placeholder: "nomor whatsapp kamu",
    msg: "Pastikan kamu menulis nomor whatsapp dengan benar dengan format +62",
  },
  {
    label: "Kode Wilayah",
    formName: "code",
    placeholder: "pilih kode wilayah kamu",
    msg: "Silahkan pilih kode wilayah tempat yang akan kamu akan ambil titipan mu. Untuk keterangan kode wilayah silahkan klik",
    options: OPTIONS.kodeWilayah,
  },
];
