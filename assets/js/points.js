/* ==================================================================
   BOYALI KÖYÜ — HARİTA NOKTALARI
   ------------------------------------------------------------------
   Yeni bir nokta eklemek için aşağıdaki listeye şu kalıpta bir satır
   ekleyin. Başka hiçbir dosyaya dokunmanız gerekmez.

     {
       id:  "cesme-1",                      // benzersiz kısa ad
       n:   7,                              // haritada görünecek numara
       lat: 38.59200, lng: 35.00860,        // Google Earth'ten kopyalayın
       tr:  { ad: "1 Numaralı Çeşme", not: "AH 1299 / 1881" },
       en:  { ad: "Fountain No. 1",    not: "AH 1299 / CE 1881" },
       bolum: "cesmeler"                    // sayfadaki bölümün id'si
     },

   Google Earth'te bir noktaya sağ tıklayıp "Özellikler" dediğinizde
   enlem (lat) ve boylam (lng) görünür. Enlem 38 ile, boylam 35 ile
   başlamalıdır. Ondalık ayırıcı nokta olmalıdır, virgül değil.
================================================================== */

const NOKTALAR = [
  {
    id: "cami", n: 1,
    lat: 38.5925013976465, lng: 35.00857093936919,
    tr: { ad: "Boyalı Köyü Camii", not: "AH 990 / 1582–83, yenilenmesi AH 1290" },
    en: { ad: "Boyalı Village Mosque", not: "AH 990 / CE 1582–83, rebuilt AH 1290" },
    bolum: "cami"
  },
  {
    id: "boyali-kilisesi", n: 2,
    lat: 38.59190832437886, lng: 35.00819732260996,
    tr: { ad: "Boyalı Kilisesi", not: "Caminin 10 m batısında, kaya oyma" },
    en: { ad: "Boyalı Church", not: "Rock-cut, 10 m west of the mosque" },
    bolum: "kilise"
  },
  {
    id: "bizans-yerlesimi", n: 3,
    lat: 38.59069663068436, lng: 35.01627045962746,
    tr: { ad: "Ören Bizans Yerleşimi", not: "Şirehaneler, güvercinlikler, kaya oyma mekânlar" },
    en: { ad: "Ören Byzantine Settlement", not: "Wine presses, dovecotes, rock-cut chambers" },
    bolum: "oren"
  },
  {
    id: "oren-1", n: 4,
    lat: 38.59144492204724, lng: 35.01571469827837,
    tr: { ad: "Ören 1 Kilisesi", not: "Sütunlu Kilise" },
    en: { ad: "Ören Church 1", not: "The Columned Church" },
    bolum: "oren-1"
  },
  {
    id: "oren-2", n: 5,
    lat: 38.59122227431679, lng: 35.01592993303563,
    tr: { ad: "Ören 2 Kilisesi", not: "Kabartma Haç Kilisesi" },
    en: { ad: "Ören Church 2", not: "The Church of the Carved Cross" },
    bolum: "oren-2"
  },
  {
    id: "hoyuk", n: 6,
    lat: 38.59071058763758, lng: 35.01377105956669,
    tr: { ad: "Ören Höyüğü", not: "Yüzeyde yoğun seramik; dönemi tartışmalı" },
    en: { ad: "The Ören Mound", not: "Dense surface pottery; dating disputed" },
    bolum: "hoyuk"
  }

  /* ---- KOORDİNATI BEKLEYEN NOKTALAR --------------------------------
     Aşağıdaki satırların başındaki // işaretlerini silip koordinatları
     yazdığınızda noktalar haritada belirir.

  ,{
    id: "cesme-1", n: 7,
    lat: 0, lng: 0,
    tr: { ad: "1 Numaralı Çeşme", not: "AH 1299 / 1881" },
    en: { ad: "Fountain No. 1", not: "AH 1299 / CE 1881" },
    bolum: "cesmeler"
  }
  ,{
    id: "cesme-2", n: 8,
    lat: 0, lng: 0,
    tr: { ad: "2 Numaralı Çeşme", not: "AH 1288 / 1871" },
    en: { ad: "Fountain No. 2", not: "AH 1288 / CE 1871" },
    bolum: "cesmeler"
  }
  ,{
    id: "kizilyer", n: 9,
    lat: 0, lng: 0,
    tr: { ad: "Kızılyer Mevkii", not: "Terk edilmiş eski köy dokusu" },
    en: { ad: "Kızılyer Locality", not: "The abandoned old village fabric" },
    bolum: "koy"
  }
  ------------------------------------------------------------------ */
];

/* Haritanın açılışta ortalanacağı nokta ve yakınlık derecesi */
const HARITA_MERKEZ = [38.5916, 35.0122];
const HARITA_ZOOM = 15;
