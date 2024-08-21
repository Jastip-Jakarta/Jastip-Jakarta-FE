export const OPTIONS = {
  tokoOnline: ["Shopee", "Tokopedia", "Lazada", "Amazon", "Titipan Pribadi", "Toko lain"] as [
    string,
    ...string[]
  ],
  kodeWilayah: [
    "BB11 - Baubau",
    "BB12 - Baubau",
    "BB13 - Baubau",
    "BB14 - Baubau",
    "BB15 - Baubau",
    "BB31 - Buton",
    "BB21 - Buton Tengah",
    "BB22 - Buton Tengah",
    "BB23 - Buton Tengah",
    "BB24 - Buton Tengah",
  ] as [string, ...string[]],
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
    msg: "Pastikan kamu menulis nomor whatsapp dengan benar, contoh : 62xxxxxxxx",
  },
  {
    label: "Kode Wilayah",
    formName: "code",
    placeholder: "pilih kode wilayah kamu",
    msg: "Silahkan pilih kode wilayah tempat yang akan kamu akan ambil titipan mu. Untuk keterangan kode wilayah silahkan klik",
    options: OPTIONS.kodeWilayah,
  },
];
export interface FormOrderType {
  label: string;
  formName: string;
  placeholder: string;
  msg: string;
  options?: string[];
}
[];

export const FORM_ORDER_ADMIN_JAKARTA = [
  {
    label: "Berat Barang",
    formName: "weight_item",
    placeholder: "berat barang",
  },
  {
    label: "Batch Pengiriman",
    formName: "delivery_batch",
    placeholder: "batch pengiriman",
  },
  {
    label: "Nomor Resi JASTIP",
    formName: "tracking_number_jastip",
    placeholder: "nomor resi jastip",
  },
];

export const FORM_ADD_BATCH = [
  {
    label: "Bulan",
    formName: "month",
    placeholder: "Bulan",
  },
  {
    label: "Tahun",
    formName: "year",
    placeholder: "Tahun",
  },
  {
    label: "Batch",
    formName: "batch",
    placeholder: "Batch",
  },
];
export const FORM_REGION_CODE = [
  {
    label: "Nama admin perwakilan",
    formName: "admin_id_perwakilan",
    placeholder: "Pilih admin perwakilan",
  },
  {
    label: "Nomor telepon whatsapp",
    formName: "phone",
    placeholder: "628xxxxxxx",
  },
  {
    label: "Kode",
    formName: "code",
    placeholder: "BB11",
  },
  {
    label: "Wilayah",
    formName: "region",
    placeholder: "BAUBAU",
  },
  {
    label: "Alamat",
    formName: "full_address",
    placeholder: "Jln. Sultan Labuke no. 27, Keraton (Kedai Kopi Galampa Tana)",
  },
  {
    label: "Harga kode wilayah",
    formName: "price",
    placeholder: "11000",
  },
];
export const FORM_ADD_USER = [
  {
    label: "Nama Pengguna",
    formName: "name",
    placeholder: "Ami citayam",
  },
  {
    label: "Email",
    formName: "email",
    placeholder: "amiciayam@gmail.com",
  },
  {
    label: "Nomor telepon whatsapp",
    formName: "phone",
    placeholder: "628xxxxxxx",
  },
  {
    label: "Kata sandi",
    formName: "password",
    placeholder: "Masukkan kata sandi",
  },
];
