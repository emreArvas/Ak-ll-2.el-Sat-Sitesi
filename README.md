# Akıllı Satış Projesi

## Proje Amacı
Akıllı Satış, kullanıcıların ürün ekleyip satabildiği, diğer kullanıcıların ise bu ürünleri inceleyip sepete ekleyerek sipariş verebildiği modern bir e-ticaret platformudur. Proje; web, mobil ve RESTful API katmanlarından oluşur. Ayrıca, *Yapay Zeka ile Fiyat Analizi* özelliği sayesinde, kullanıcılar ürün eklerken benzer ürünlerin fiyatlarını analiz edebilir ve önerilen fiyat aralığını görebilirler..

---

## İçerik
- [Proje Amacı](#proje-amacı)
- [Teknolojiler](#teknolojiler)
- [Klasör Yapısı](#klasör-yapısı)
- [Kurulum](#kurulum)
- [Backend (API)](#backend-api)
- [Frontend (Web)](#frontend-web)
- [Mobile (Mobil Uygulama)](#mobile-mobil-uygulama)
- [Yapay Zeka ile Fiyat Analizi](#yapay-zeka-ile-fiyat-analizi)
- [API Örnekleri](#api-örnekleri)
- [Katkıda Bulunanlar](#katkıda-bulunanlar)
- [Lisans](#lisans)

---

## Teknolojiler
- *Backend:* .NET Core, Entity Framework, RESTful API
- *Frontend:* React, Vite
- *Mobile:* React Native, Expo
- *Veritabanı:* SQLite
- *Yapay Zeka:* Python (scikit-learn, pandas), REST entegrasyonu
- *Diğer:* Docker, EAS (Expo Application Services)

---

## Klasör Yapısı



## Kurulum

### 1. Backend (API)
bash
cd backend
dotnet restore
dotnet build
dotnet run

- API varsayılan olarak http://localhost:5000 adresinde çalışır.

### 2. Frontend (Web)
bash
cd frontend
npm install
npm run dev

- Uygulama varsayılan olarak http://localhost:5173 adresinde çalışır.

### 3. Mobile (Mobil Uygulama)
bash
cd mobile
npm install
npx expo start

- Expo Go ile QR kodu okutarak mobil uygulamayı test edebilirsiniz.
- APK almak için:
  bash
  eas build -p android --profile preview
  

---

## Backend (API)

### Amaç ve Özellikler
- Kullanıcı kayıt, giriş, şifre sıfırlama
- Ürün ekleme, listeleme, silme, güncelleme
- Sepet işlemleri (ekle, sil, listele)
- Sipariş işlemleri
- *Fiyat Analizi API'si:* Ürün eklerken benzer ürünlerin fiyatlarını analiz eder ve öneri sunar.

### Temel Klasörler
- Controllers/ : API uç noktaları (ör. Auth, Product, Cart, Order)
- Model/ : Entity modelleri (User, Product, Cart, Order, vb.)
- Service/ : İş mantığı ve servisler
- Dto/ : Veri transfer objeleri
- Enum/ : Enum tanımları
- Context/ : DbContext ve bağlantı
- Migrations/ : Veritabanı migrasyonları

### Konfigürasyon
- appsettings.json ve appsettings.Development.json ile bağlantı ve ayarlar yapılır.
- Docker ile container ortamında çalıştırılabilir.

---

## Frontend (Web)

### Amaç ve Özellikler
- Kullanıcı dostu ürün listeleme ve arama
- Sepet yönetimi
- Sipariş geçmişi
- Giriş/Kayıt/Şifre sıfırlama
- *Fiyat Analizi Modülü:* Ürün ekleme ekranında, benzer ürünlerin fiyat analizini ve önerilen fiyat aralığını gösterir.

### Temel Klasörler
- src/ : Ana kaynak kodu
  - components/ : React bileşenleri
  - pages/ : Sayfa bileşenleri
  - services/ : API ile iletişim
- public/ : Statik dosyalar
