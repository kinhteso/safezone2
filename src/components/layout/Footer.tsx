import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-safe flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/safezone-logo.png"
            alt="SafeZone Logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg object-cover"
          />
          <div>
            <p className="font-display text-lg font-bold text-blue-deep">
              SafeZone
            </p>
            <p className="text-sm text-gray-400">
              Vùng an toàn số cho thế hệ trẻ Việt Nam
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <p>Email: safezone.tlu@gmail.com</p>
          <p>Hotline: 0708 910 446</p>
          <p>safezone.tlu.edu.vn</p>
        </div>
      </div>
    </footer>
  );
}
