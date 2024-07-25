import LayoutAdmin from "@/components/LayoutAdmin";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const dummyData = [
    {
      kodeWilayah: "BB11",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
    {
      kodeWilayah: "BB12",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
    {
      kodeWilayah: "BB13",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
    {
      kodeWilayah: "BB14",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
    {
      kodeWilayah: "BB15",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
    {
      kodeWilayah: "BB16",
      "Harga Per Kode Wilayah": Math.floor(10000 + Math.random() * 10000),
      "Total User Dalam Batch": Math.floor(Math.random() * 40),
      "Total Order Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Berat Dalam Batch": Math.floor(200 + Math.random() * 300),
      "Total Harga Dalam Batch": Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID"),
    },
  ];
  return (
    <LayoutAdmin>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="space-y-3">
          <h1 className="font-semibold text-3xl">Statistik</h1>
          <div className="bg-white rounded-md flex items-center justify-between gap-8 px-6 py-5">
            <h3 className="min-w-28 font-semibold text-lg">Pilih Batch</h3>
            <Select /*onValueChange={}*/>
              <SelectTrigger className="!ring-0">
                <SelectValue placeholder={"11111111"} />
              </SelectTrigger>
              <SelectContent>
                {["1", "2", "3"].map((option) => (
                  <SelectItem value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button>Unduh laporan</Button>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="font-semibold text-2xl">Keterangan</h1>
          <div className="bg-white rounded-md grid grid-cols-3 gap-8 px-6 py-5">
            {dummyData.map((value) => (
              <div className="bg-slate-50 border p-3 rounded shadow space-y-2 text-sm font-medium">
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">Kode wilayah</span>
                  <span className="basis-2.5">:</span>
                  <span>{value.kodeWilayah}</span>
                </div>
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">harga per kode wilayah</span>
                  <span className="basis-2.5">:</span>
                  <span>{value["Harga Per Kode Wilayah"]}</span>
                </div>
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">total user dalam batch</span>
                  <span className="basis-2.5">:</span>
                  <span>{value["Total User Dalam Batch"]}</span>
                </div>
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">total order dalam batch</span>
                  <span className="basis-2.5">:</span>
                  <span>{value["Total Order Dalam Batch"]}</span>
                </div>
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">total berat dalam batch</span>
                  <span className="basis-2.5">:</span>
                  <span>{value["Total Berat Dalam Batch"]}</span>
                </div>
                <div className="flex flex-row">
                  <span className="basis-3/4 font-semibold">total harga dalam batch</span>
                  <span className="basis-2.5">:</span>
                  <span>{value["Total Harga Dalam Batch"]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Dashboard;
