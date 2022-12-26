const { v4: uuidv4 } = require("uuid");
export const menuItems = [
  {
    id: uuidv4(),
    label: "Beranda",
    icon: "uil-home-alt",
    link: "/",
  },
  {
    id: uuidv4(),
    label: "Pasien",
    icon: "uil-bed",
    link: "/patients",
  },
  {
    id: uuidv4(),
    label: "Reservasi",
    icon: "uil-schedule",
    link: "/reservations",
  },
  {
    id: uuidv4(),
    label: "Tarif",
    icon: "uil-bill",
    link: "/bills",
  },
  {
    id: uuidv4(),
    label: "Rekapitulasi",
    icon: "uil-chart-pie-alt",
    link: "/recapitulations",
  },
];
