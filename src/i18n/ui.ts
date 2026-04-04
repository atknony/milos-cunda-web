/**
 * Milos Cunda — i18n Translation Dictionary
 * Languages: Turkish (tr), English (en), Greek (el)
 */

export const languages = {
  tr: "Türkçe",
  en: "English",
  el: "Ελληνικά",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "tr";

/**
 * Flat UI string dictionary.
 * Keys follow the pattern: `section.element`
 */
export const ui = {
  // ─── Navigation ───
  "nav.rooms": {
    tr: "Odalar",
    en: "Rooms",
    el: "Δωμάτια",
  },
  "nav.experience": {
    tr: "Deneyim",
    en: "Experience",
    el: "Εμπειρία",
  },
  "nav.cunda": {
    tr: "Cunda Rehberi",
    en: "Cunda Guide",
    el: "Οδηγός Κούνδα",
  },
  "nav.gallery": {
    tr: "Galeri",
    en: "Gallery",
    el: "Γκαλερί",
  },
  "nav.contact": {
    tr: "İletişim",
    en: "Contact",
    el: "Επικοινωνία",
  },

  // ─── Hero / Home ───
  "hero.tagline": {
    tr: "Ege'nin Kalbinde Zarafet",
    en: "Elegance in the Heart of the Aegean",
    el: "Κομψότητα στην Καρδιά του Αιγαίου",
  },
  "hero.subtitle": {
    tr: "Cunda Adası'nda butik konaklama deneyimi",
    en: "A boutique stay on Cunda Island",
    el: "Μπουτίκ διαμονή στο νησί της Κούνδα",
  },

  // ─── CTAs ───
  "cta.whatsapp": {
    tr: "WhatsApp ile Rezervasyon",
    en: "Book via WhatsApp",
    el: "Κράτηση μέσω WhatsApp",
  },
  "cta.call": {
    tr: "Hemen Arayın",
    en: "Call Now",
    el: "Καλέστε Τώρα",
  },
  "cta.explore": {
    tr: "Keşfedin",
    en: "Explore",
    el: "Εξερευνήστε",
  },
  "cta.viewRoom": {
    tr: "Odayı İnceleyin",
    en: "View Room",
    el: "Δείτε το Δωμάτιο",
  },
  "cta.allRooms": {
    tr: "Tüm Odalar",
    en: "All Rooms",
    el: "Όλα τα Δωμάτια",
  },

  // ─── WhatsApp Pre-filled Messages ───
  "whatsapp.message": {
    tr: "Merhaba, Milos Cunda'da müsaitlik durumunu öğrenmek istiyorum.",
    en: "Hello, I would like to inquire about availability at Milos Cunda.",
    el: "Γεια σας, θα ήθελα να ρωτήσω για τη διαθεσιμότητα στο Milos Cunda.",
  },
  "whatsapp.roomMessage": {
    tr: "Merhaba, {roomName} odası hakkında bilgi almak istiyorum.",
    en: "Hello, I would like to inquire about the {roomName} room.",
    el: "Γεια σας, θα ήθελα να ρωτήσω για το δωμάτιο {roomName}.",
  },

  // ─── Sections ───
  "section.rooms.title": {
    tr: "Odalarımız",
    en: "Our Rooms",
    el: "Τα Δωμάτιά μας",
  },
  "section.rooms.subtitle": {
    tr: "Her biri Ege'nin huzurunu yansıtan özenle tasarlanmış odalar",
    en: "Carefully curated rooms reflecting the tranquility of the Aegean",
    el: "Προσεκτικά σχεδιασμένα δωμάτια που αντανακλούν τη γαλήνη του Αιγαίου",
  },
  "section.experience.title": {
    tr: "Milos Deneyimi",
    en: "The Milos Experience",
    el: "Η Εμπειρία Milos",
  },
  "section.guide.title": {
    tr: "Cunda Adası Rehberi",
    en: "Cunda Island Guide",
    el: "Οδηγός Νησιού Κούνδα",
  },
  "section.guide.subtitle": {
    tr: "Tarih, mimari ve gastronomi",
    en: "History, architecture and gastronomy",
    el: "Ιστορία, αρχιτεκτονική και γαστρονομία",
  },

  // ─── Room Details ───
  "room.capacity": {
    tr: "Kapasite",
    en: "Capacity",
    el: "Χωρητικότητα",
  },
  "room.size": {
    tr: "Büyüklük",
    en: "Size",
    el: "Μέγεθος",
  },
  "room.amenities": {
    tr: "Olanaklar",
    en: "Amenities",
    el: "Παροχές",
  },
  "room.guests": {
    tr: "{count} Misafir",
    en: "{count} Guests",
    el: "{count} Επισκέπτες",
  },
  "room.from": {
    tr: "Gecelik",
    en: "per night",
    el: "ανά βράδυ",
  },
  "room.startingFrom": {
    tr: "Başlangıç fiyatı",
    en: "Starting from",
    el: "Από",
  },

  // ─── Rooms Listing Page ───
  "rooms.title": {
    tr: "Odalar & Süitler",
    en: "Rooms & Suites",
    el: "Δωμάτια & Σουίτες",
  },
  "rooms.subtitle": {
    tr: "Her biri Cunda'nın ruhunu yansıtan, özenle tasarlanmış sekiz oda",
    en: "Eight carefully designed rooms, each reflecting the spirit of Cunda",
    el: "Οκτώ προσεκτικά σχεδιασμένα δωμάτια, καθένα αντανακλά το πνεύμα της Κούνδα",
  },

  // ─── Room Detail Page ───
  "room.about": {
    tr: "Oda Hakkında",
    en: "About This Room",
    el: "Σχετικά με το Δωμάτιο",
  },
  "room.gallery": {
    tr: "Fotoğraf Galerisi",
    en: "Photo Gallery",
    el: "Φωτογραφικό Άλμπουμ",
  },
  "room.specs": {
    tr: "Oda Detayları",
    en: "Room Details",
    el: "Λεπτομέρειες Δωματίου",
  },
  "room.bedType": {
    tr: "Yatak",
    en: "Bed",
    el: "Κρεβάτι",
  },
  "room.view": {
    tr: "Manzara",
    en: "View",
    el: "Θέα",
  },
  "room.checkIn": {
    tr: "Giriş: 14:00",
    en: "Check-in: 2:00 PM",
    el: "Check-in: 14:00",
  },
  "room.checkOut": {
    tr: "Çıkış: 11:00",
    en: "Check-out: 11:00 AM",
    el: "Check-out: 11:00",
  },
  "room.bookThis": {
    tr: "Bu Odayı Rezerve Edin",
    en: "Reserve This Room",
    el: "Κρατήστε αυτό το Δωμάτιο",
  },
  "room.otherRooms": {
    tr: "Diğer Odalarımız",
    en: "Our Other Rooms",
    el: "Τα Άλλα Δωμάτιά μας",
  },
  "room.backToRooms": {
    tr: "Tüm Odalara Dön",
    en: "Back to All Rooms",
    el: "Πίσω σε Όλα τα Δωμάτια",
  },

  // ─── Lightbox ───
  "lightbox.close": {
    tr: "Galeriyi kapat",
    en: "Close gallery",
    el: "Κλείσιμο γκαλερί",
  },
  "lightbox.prev": {
    tr: "Önceki fotoğraf",
    en: "Previous photo",
    el: "Προηγούμενη φωτογραφία",
  },
  "lightbox.next": {
    tr: "Sonraki fotoğraf",
    en: "Next photo",
    el: "Επόμενη φωτογραφία",
  },
  "lightbox.counter": {
    tr: "{current} / {total}",
    en: "{current} / {total}",
    el: "{current} / {total}",
  },

  // ─── Footer ───
  "footer.tagline": {
    tr: "Cunda Adası, Ayvalık · Balıkesir, Türkiye",
    en: "Cunda Island, Ayvalık · Balıkesir, Türkiye",
    el: "Νησί Κούνδα, Αϊβαλί · Μπαλίκεσιρ, Τουρκία",
  },
  "footer.rights": {
    tr: "Tüm hakları saklıdır.",
    en: "All rights reserved.",
    el: "Με επιφύλαξη παντός δικαιώματος.",
  },
  "footer.privacy": {
    tr: "Gizlilik Politikası",
    en: "Privacy Policy",
    el: "Πολιτική Απορρήτου",
  },
  "footer.description": {
    tr: "Ege mimarisinden ilham alan, Cunda Adası'nın kalbinde bir butik otel deneyimi.",
    en: "A boutique hotel experience in the heart of Cunda Island, inspired by Aegean architecture.",
    el: "Μια εμπειρία μπουτίκ ξενοδοχείου στην καρδιά της Κούνδα, εμπνευσμένη από την αρχιτεκτονική του Αιγαίου.",
  },
  "footer.contact": {
    tr: "İletişim",
    en: "Contact",
    el: "Επικοινωνία",
  },
  "footer.navigation": {
    tr: "Keşfet",
    en: "Explore",
    el: "Εξερευνήστε",
  },
  "footer.followUs": {
    tr: "Bizi Takip Edin",
    en: "Follow Us",
    el: "Ακολουθήστε μας",
  },

  // ─── Accessibility & Meta ───
  "a11y.skipToContent": {
    tr: "İçeriğe geç",
    en: "Skip to content",
    el: "Μετάβαση στο περιεχόμενο",
  },
  "a11y.menuOpen": {
    tr: "Menüyü aç",
    en: "Open menu",
    el: "Άνοιγμα μενού",
  },
  "a11y.menuClose": {
    tr: "Menüyü kapat",
    en: "Close menu",
    el: "Κλείσιμο μενού",
  },
  "meta.title": {
    tr: "Milos Cunda | Cunda Adası Butik Otel — Ayvalık",
    en: "Milos Cunda | Boutique Hotel on Cunda Island — Ayvalık",
    el: "Milos Cunda | Μπουτίκ Ξενοδοχείο στην Κούνδα — Αϊβαλί",
  },
  "meta.description": {
    tr: "Cunda Adası'nın kalbinde, Ege mimarisinden ilham alan butik otel. Huzur, zarafet ve yerel gastronomi deneyimi.",
    en: "A boutique hotel in the heart of Cunda Island, inspired by Aegean architecture. Tranquility, elegance, and local gastronomy.",
    el: "Ένα μπουτίκ ξενοδοχείο στην καρδιά της Κούνδα, εμπνευσμένο από την αιγαιοπελαγίτικη αρχιτεκτονική.",
  },

  // ─── Header ───
  "header.reserve": {
    tr: "Rezervasyon",
    en: "Reserve",
    el: "Κράτηση",
  },
  "header.langLabel": {
    tr: "Dil seçimi",
    en: "Language selection",
    el: "Επιλογή γλώσσας",
  },

  // ─── Hero ───
  "hero.scroll": {
    tr: "Keşfetmek için kaydırın",
    en: "Scroll to discover",
    el: "Κάντε κύλιση για να ανακαλύψετε",
  },
  "hero.videoLabel": {
    tr: "Milos Cunda havadan görünüm",
    en: "Aerial view of Milos Cunda",
    el: "Αεροφωτογραφία του Milos Cunda",
  },

  // ─── Guide Listing ───
  "guide.title": {
    tr: "Cunda Adası Rehberi",
    en: "Cunda Island Guide",
    el: "Οδηγός Νησιού Κούνδα",
  },
  "guide.subtitle": {
    tr: "Tarihi, mimarisi ve lezzetleriyle Ege'nin saklı incisi",
    en: "The Aegean's hidden gem — its history, architecture, and flavors",
    el: "Το κρυμμένο στολίδι του Αιγαίου — ιστορία, αρχιτεκτονική και γεύσεις",
  },
  "guide.readMore": {
    tr: "Devamını Oku",
    en: "Read More",
    el: "Διαβάστε Περισσότερα",
  },
  "guide.readTime": {
    tr: "{min} dk okuma",
    en: "{min} min read",
    el: "{min} λεπτά ανάγνωση",
  },
  "guide.backToGuide": {
    tr: "Rehbere Dön",
    en: "Back to Guide",
    el: "Πίσω στον Οδηγό",
  },
  "guide.relatedPlaces": {
    tr: "İlgili Mekanlar",
    en: "Related Places",
    el: "Σχετικοί Τόποι",
  },
  "guide.publishedOn": {
    tr: "Yayın Tarihi",
    en: "Published",
    el: "Δημοσιεύτηκε",
  },
  "guide.all": {
    tr: "Tümü",
    en: "All",
    el: "Όλα",
  },
  "guide.category.history": {
    tr: "Tarih",
    en: "History",
    el: "Ιστορία",
  },
  "guide.category.architecture": {
    tr: "Mimari",
    en: "Architecture",
    el: "Αρχιτεκτονική",
  },
  "guide.category.gastronomy": {
    tr: "Gastronomi",
    en: "Gastronomy",
    el: "Γαστρονομία",
  },
  "guide.category.nature": {
    tr: "Doğa",
    en: "Nature",
    el: "Φύση",
  },
  "guide.category.culture": {
    tr: "Kültür",
    en: "Culture",
    el: "Πολιτισμός",
  },
  "guide.category.activities": {
    tr: "Aktiviteler",
    en: "Activities",
    el: "Δραστηριότητες",
  },

  // ─── Guide Article CTA (end of every article) ───
  "guide.cta.title": {
    tr: "Cunda'yı Milos'ta Yaşayın",
    en: "Experience Cunda at Milos",
    el: "Ζήστε την Κούνδα στο Milos",
  },
  "guide.cta.text": {
    tr: "Cunda Adası'nın kalbinde, tarihi ve doğasıyla iç içe bir konaklama deneyimi sizi bekliyor.",
    en: "A stay immersed in the island's history and nature awaits you in the heart of Cunda.",
    el: "Μια διαμονή βυθισμένη στην ιστορία και τη φύση του νησιού σας περιμένει στην καρδιά της Κούνδα.",
  },
  "guide.cta.rooms": {
    tr: "Odalarımızı Keşfedin",
    en: "Discover Our Rooms",
    el: "Ανακαλύψτε τα Δωμάτιά μας",
  },

  // ─── Contact Page ───
  "contact.title": {
    tr: "İletişim",
    en: "Contact",
    el: "Επικοινωνία",
  },
  "contact.subtitle": {
    tr: "Sizinle tanışmak için sabırsızlanıyoruz",
    en: "We look forward to welcoming you",
    el: "Ανυπομονούμε να σας καλωσορίσουμε",
  },
  "contact.address": {
    tr: "Adres",
    en: "Address",
    el: "Διεύθυνση",
  },
  "contact.phone": {
    tr: "Telefon",
    en: "Phone",
    el: "Τηλέφωνο",
  },
  "contact.email": {
    tr: "E-posta",
    en: "Email",
    el: "Email",
  },
  "contact.hours": {
    tr: "Resepsiyon Saatleri",
    en: "Reception Hours",
    el: "Ώρες Ρεσεψιόν",
  },
  "contact.hoursValue": {
    tr: "08:00 – 22:00",
    en: "8:00 AM – 10:00 PM",
    el: "08:00 – 22:00",
  },
  "contact.directions": {
    tr: "Yol Tarifi",
    en: "Get Directions",
    el: "Οδηγίες",
  },
  "contact.directionsDesc": {
    tr: "Ayvalık'tan Cunda Adası'na köprü ile yaklaşık 5 dakikada ulaşabilirsiniz. Otelimiz Sahil Mahallesi'nde, deniz kıyısında yer almaktadır.",
    en: "Cunda Island is a 5-minute drive from Ayvalık over the bridge. Our hotel is located on the waterfront in Sahil Mahallesi.",
    el: "Η Κούνδα απέχει 5 λεπτά με αυτοκίνητο από το Αϊβαλί μέσω της γέφυρας. Το ξενοδοχείο μας βρίσκεται στην παραλία στο Sahil Mahallesi.",
  },
  "contact.mapLabel": {
    tr: "Haritada Göster",
    en: "View on Map",
    el: "Δείτε στον Χάρτη",
  },

  // ─── Experience Page ───
  "experience.title": {
    tr: "Milos Deneyimi",
    en: "The Milos Experience",
    el: "Η Εμπειρία Milos",
  },
  "experience.subtitle": {
    tr: "Her detayın özenle düşünüldüğü bir konaklama deneyimi",
    en: "A stay where every detail has been carefully considered",
    el: "Μια διαμονή όπου κάθε λεπτομέρεια έχει μελετηθεί προσεκτικά",
  },
  "experience.breakfast.title": {
    tr: "Ege Kahvaltısı",
    en: "Aegean Breakfast",
    el: "Αιγαιοπελαγίτικο Πρωινό",
  },
  "experience.breakfast.text": {
    tr: "Her sabah avlumuzda, yerel zeytin yağı, taze peynirler, köy yumurtası, kekik balı ve mevsim meyveleriyle hazırlanan geleneksel bir Ege kahvaltısı servis edilir. Ekmekler günlük pişirilir, reçeller el yapımıdır.",
    en: "Each morning in our courtyard, a traditional Aegean breakfast is served with local olive oil, fresh cheeses, farm eggs, thyme honey, and seasonal fruits. Breads are baked daily, jams are homemade.",
    el: "Κάθε πρωί στην αυλή μας, σερβίρεται ένα παραδοσιακό αιγαιοπελαγίτικο πρωινό με τοπικό ελαιόλαδο, φρέσκα τυριά, αυγά φάρμας, μέλι θυμαριού και εποχιακά φρούτα.",
  },
  "experience.courtyard.title": {
    tr: "Taş Avlu",
    en: "The Stone Courtyard",
    el: "Η Πέτρινη Αυλή",
  },
  "experience.courtyard.text": {
    tr: "Otelimizin kalbi olan avlu, yüzyıllık taş duvarlar ve begonvil çiçekleriyle çevrilmiştir. Sabah kahvaltınızı güneşin altında, akşam aperatifinizi yıldızların altında yapacağınız huzurlu bir vahadır.",
    en: "The heart of our hotel, the courtyard is enclosed by centuries-old stone walls and cascading bougainvillea. A serene oasis where you'll enjoy morning breakfast under the sun and evening aperitifs under the stars.",
    el: "Η καρδιά του ξενοδοχείου μας, η αυλή περιβάλλεται από αιωνόβιους πέτρινους τοίχους και μπουκαμβίλιες. Μια γαλήνια όαση.",
  },
  "experience.service.title": {
    tr: "Kişiye Özel Hizmet",
    en: "Personalized Service",
    el: "Εξατομικευμένη Εξυπηρέτηση",
  },
  "experience.service.text": {
    tr: "Sadece sekiz odamız olması, her misafire özel ilgi göstermemizi sağlar. Restoran rezervasyonlarından tekne turlarına, zeytin hasadı deneyiminden yerel rehberliğe — seyahatinizi size özel kılıyoruz.",
    en: "With only eight rooms, we give every guest personal attention. From restaurant reservations to boat tours, olive harvest experiences to local guided walks — we tailor your journey to you.",
    el: "Με μόνο οκτώ δωμάτια, προσφέρουμε σε κάθε επισκέπτη προσωπική προσοχή. Από κρατήσεις εστιατορίων έως βόλτες με βάρκα.",
  },
  "experience.sunset.title": {
    tr: "Gün Batımı Terası",
    en: "Sunset Terrace",
    el: "Βεράντα Ηλιοβασιλέματος",
  },
  "experience.sunset.text": {
    tr: "Çatı terasımız, Ege üzerinde batan güneşin Midilli Adası'nın siluetini boyamasını izlemek için tasarlanmıştır. Yerel şaraplar ve mevsimsel mezelerin eşliğinde günü uğurlamak, Milos deneyiminin en özel anlarından biridir.",
    en: "Our rooftop terrace is designed for watching the sun paint Lesbos Island's silhouette as it sets over the Aegean. Accompanied by local wines and seasonal mezes, bidding farewell to the day is one of the most treasured moments of the Milos experience.",
    el: "Η ταράτσα μας είναι σχεδιασμένη για να παρακολουθείτε τον ήλιο να ζωγραφίζει τη σιλουέτα της Λέσβου καθώς δύει πάνω από το Αιγαίο.",
  },

  // ─── Gallery Page ───
  "gallery.title": {
    tr: "Galeri",
    en: "Gallery",
    el: "Γκαλερί",
  },
  "gallery.subtitle": {
    tr: "Milos Cunda'nın atmosferini keşfedin",
    en: "Discover the atmosphere of Milos Cunda",
    el: "Ανακαλύψτε την ατμόσφαιρα του Milos Cunda",
  },
  "gallery.cat.all": {
    tr: "Tümü",
    en: "All",
    el: "Όλα",
  },
  "gallery.cat.rooms": {
    tr: "Odalar",
    en: "Rooms",
    el: "Δωμάτια",
  },
  "gallery.cat.exterior": {
    tr: "Dış Mekan",
    en: "Exterior",
    el: "Εξωτερικοί Χώροι",
  },
  "gallery.cat.dining": {
    tr: "Gastronomi",
    en: "Dining",
    el: "Γαστρονομία",
  },
  "gallery.cat.island": {
    tr: "Cunda Adası",
    en: "Cunda Island",
    el: "Νησί Κούνδα",
  },

  // ─── 404 ───
  "404.title": {
    tr: "Sayfa Bulunamadı",
    en: "Page Not Found",
    el: "Η Σελίδα δεν Βρέθηκε",
  },
  "404.message": {
    tr: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    en: "The page you're looking for doesn't exist or has been moved.",
    el: "Η σελίδα που αναζητάτε δεν υπάρχει ή έχει μετακινηθεί.",
  },
  "404.home": {
    tr: "Ana Sayfaya Dön",
    en: "Return Home",
    el: "Επιστροφή στην Αρχική",
  },
  "404.rooms": {
    tr: "Odalarımızı Keşfedin",
    en: "Explore Our Rooms",
    el: "Εξερευνήστε τα Δωμάτιά μας",
  },
} as const;

export type UIKey = keyof typeof ui;
