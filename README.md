# Boyalı Köyü — tanıtım sitesi

Nevşehir'in Ürgüp ilçesine bağlı Boyalı Köyü'nün kültürel mirasını tanıtan
iki dilli (Türkçe / İngilizce) statik web sitesi.

## Siteyi yayına alma (GitHub Pages)

1. GitHub'da yeni bir depo (repository) oluşturun. Adı ne olursa olsun çalışır.
2. Bu klasördeki **bütün dosyaları** deponun ana dizinine yükleyin.
   `index.html` dosyası mutlaka en üstte, klasör içinde değil, kök dizinde olmalıdır.
3. Depoda **Settings → Pages** bölümüne girin.
4. "Build and deployment" başlığı altında **Source** olarak *Deploy from a branch*
   seçin, **Branch** olarak `main` ve klasör olarak `/ (root)` seçip kaydedin.
5. Birkaç dakika içinde site şu adreste yayına girer:
   `https://KULLANICIADINIZ.github.io/DEPOADI/`

## Dosya düzeni

    index.html              Türkçe sayfa
    en.html                 İngilizce sayfa
    .nojekyll               GitHub Pages'in dosyaları olduğu gibi yayınlaması için
    assets/css/style.css    Görünüm
    assets/js/points.js     HARİTA NOKTALARI — koordinat eklemek için burayı düzenleyin
    assets/js/main.js       Menü, görsel büyütme ve harita davranışları
    assets/photos/          Büyük görseller
    assets/photos/thumb/    Sayfada görünen küçük görseller

## Yeni koordinat ekleme

Yalnızca `assets/js/points.js` dosyasını düzenlemeniz yeterlidir. Dosyanın
başındaki açıklama, bir noktanın nasıl ekleneceğini örnekle anlatır.
Çeşmeler ve Kızılyer Mevkii için hazır satırlar dosyanın sonunda yorum
içinde bekliyor; başlarındaki `//` işaretlerini silip koordinatları
yazmanız yeterli.

Koordinatları Google Earth'te noktaya sağ tıklayıp "Özellikler" diyerek
alabilirsiniz. Enlem 38 ile, boylam 35 ile başlar ve ondalık ayırıcı
nokta olmalıdır (virgül değil).

## Yeni fotoğraf ekleme

1. Fotoğrafın uzun kenarı en fazla 1700 piksel olacak şekilde küçültülmüş
   hâlini `assets/photos/` klasörüne, en fazla 760 piksellik hâlini
   `assets/photos/thumb/` klasörüne aynı dosya adıyla koyun.
2. `index.html` ve `en.html` içinde ilgili bölümdeki `<div class="gallery">`
   bloğuna mevcut satırlardan birini kopyalayıp dosya adını ve alt yazıyı
   değiştirin.

Dosya adlarında Türkçe karakter, boşluk ve büyük harf kullanmayın.

## Eksikler

- 1 Numaralı Çeşme'nin fotoğrafı yok.
- Hamam günümüze ulaşmadığı için fotoğrafı ve koordinatı yok.
- Mihrap fotoğrafı yok.
- Çeşmeler ve Kızılyer Mevkii için koordinat bekleniyor.
