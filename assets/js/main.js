/* Boyalı Köyü — arayüz davranışları */
(function () {
  "use strict";

  const DIL = document.documentElement.lang === "en" ? "en" : "tr";
  const T = {
    tr: {
      yolTarifi: "Yol tarifi al",
      bolumeGit: "Bölüme git",
      uydu: "Uydu",
      harita: "Harita",
      kapat: "Kapat",
      onceki: "Önceki görsel",
      sonraki: "Sonraki görsel",
      menu: "Menü"
    },
    en: {
      yolTarifi: "Get directions",
      bolumeGit: "Read about it",
      uydu: "Satellite",
      harita: "Map",
      kapat: "Close",
      onceki: "Previous image",
      sonraki: "Next image",
      menu: "Menu"
    }
  }[DIL];

  /* ---------- üst çubuk ---------- */
  const bar = document.querySelector(".bar");
  const links = document.getElementById("bar-links");
  const toggle = document.querySelector(".bar__toggle");

  if (bar) {
    const esik = () => Math.min(window.innerHeight * 0.7, 620);
    const guncelle = () => bar.classList.toggle("is-visible", window.scrollY > esik());
    guncelle();
    window.addEventListener("scroll", guncelle, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const acik = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(acik));
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- görsel büyütme ---------- */
  const kutu = document.getElementById("lightbox");
  const kutuImg = kutu && kutu.querySelector("img");
  const kutuCap = kutu && kutu.querySelector("figcaption");
  const shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  let sira = 0;

  function goster(i) {
    if (!shots.length) return;
    sira = (i + shots.length) % shots.length;
    const s = shots[sira];
    const img = s.querySelector("img");
    kutuImg.src = img.dataset.full || img.src;
    kutuImg.alt = img.alt;
    kutuCap.textContent = s.querySelector(".cap") ? s.querySelector(".cap").textContent : "";
  }

  function ac(i) {
    if (!kutu) return;
    goster(i);
    kutu.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    kutu.querySelector(".lb-close").focus();
  }

  function kapat() {
    kutu.removeAttribute("open");
    document.body.style.overflow = "";
    if (shots[sira]) shots[sira].focus();
  }

  shots.forEach((s, i) => s.addEventListener("click", () => ac(i)));

  if (kutu) {
    kutu.querySelector(".lb-close").addEventListener("click", kapat);
    kutu.querySelector(".lb-prev").addEventListener("click", () => goster(sira - 1));
    kutu.querySelector(".lb-next").addEventListener("click", () => goster(sira + 1));
    kutu.addEventListener("click", (e) => { if (e.target === kutu) kapat(); });
    document.addEventListener("keydown", (e) => {
      if (!kutu.hasAttribute("open")) return;
      if (e.key === "Escape") kapat();
      if (e.key === "ArrowLeft") goster(sira - 1);
      if (e.key === "ArrowRight") goster(sira + 1);
    });
  }

  /* ---------- harita ---------- */
  const hedef = document.getElementById("map");
  if (!hedef || typeof L === "undefined" || typeof NOKTALAR === "undefined") return;

  const gecerli = NOKTALAR.filter((p) => p.lat && p.lng);

  const map = L.map(hedef, { scrollWheelZoom: false }).setView(HARITA_MERKEZ, HARITA_ZOOM);

  const uydu = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { maxZoom: 19, attribution: "Esri, Maxar, Earthstar Geographics" }
  );
  const sokak = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  uydu.addTo(map);

  const grup = L.featureGroup().addTo(map);

  gecerli.forEach((p) => {
    const ad = p[DIL].ad;
    const not = p[DIL].not || "";
    const ikon = L.divIcon({
      className: "",
      html: '<div class="pin">' + p.n + "</div>",
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    const rota =
      "https://www.google.com/maps/dir/?api=1&destination=" + p.lat + "," + p.lng;
    const govde =
      "<b>" + ad + "</b>" +
      (not ? "<span>" + not + "</span><br>" : "") +
      '<a href="#' + p.bolum + '" class="js-goto">' + T.bolumeGit + "</a> · " +
      '<a href="' + rota + '" target="_blank" rel="noopener">' + T.yolTarifi + "</a>";
    L.marker([p.lat, p.lng], { icon: ikon, title: ad, alt: ad })
      .bindPopup(govde)
      .addTo(grup);
  });

  if (gecerli.length) map.fitBounds(grup.getBounds().pad(0.35));

  map.on("popupopen", (e) => {
    const a = e.popup.getElement().querySelector(".js-goto");
    if (a) a.addEventListener("click", () => map.closePopup());
  });

  /* katman düğmeleri */
  const dugmeler = document.querySelectorAll(".map-tools [data-layer]");
  dugmeler.forEach((b) => {
    b.addEventListener("click", () => {
      const istenen = b.dataset.layer;
      map.removeLayer(uydu);
      map.removeLayer(sokak);
      (istenen === "sat" ? uydu : sokak).addTo(map);
      dugmeler.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    });
  });

  /* bölüm başlıklarından haritaya dönen bağlantılar */
  document.querySelectorAll("[data-focus]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const p = gecerli.find((x) => x.id === a.dataset.focus);
      if (!p) return;
      e.preventDefault();
      document.getElementById("harita").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        map.setView([p.lat, p.lng], 18, { animate: true });
        grup.eachLayer((l) => {
          const ll = l.getLatLng();
          if (ll.lat === p.lat && ll.lng === p.lng) l.openPopup();
        });
      }, 500);
    });
  });
})();
