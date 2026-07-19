/**
 * Cunda Milos — i18n Translation Dictionary
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
    tr: "Ayvalık Cunda Adası'nda taş ev butik otel",
    en: "A stone house boutique hotel on Cunda Island, Ayvalık",
    el: "Πέτρινο μπουτίκ ξενοδοχείο στην Κούνδα, Αϊβαλί",
  },

  // ─── Homepage Intro (SEO/GEO: crawlable statement of what & where we are) ───
  "home.intro.title": {
    tr: "Cunda'da Tarihi Bir Taş Ev Otel",
    en: "A Historic Stone House Hotel in Cunda",
    el: "Ένα Ιστορικό Πέτρινο Ξενοδοχείο στην Κούνδα",
  },
  "home.intro.text": {
    tr: "Cunda Milos, Ayvalık'ın Cunda Adası'nda, 1907 yılında inşa edilmiş ve tarihi eser statüsündeki bir Rum evinde konumlanan altı odalı bir butik oteldir. Taş ev mimarisini modern konforla buluşturan otelimiz; çarşıya, değirmene ve denize yürüme mesafesindedir. İster butik otel ister pansiyon sıcaklığında bir konaklama arıyor olun, sizi Ege'nin en özel adasında ağırlamaktan mutluluk duyarız.",
    en: "Cunda Milos is a six-room boutique hotel set in a protected Greek stone house built in 1907 on Cunda Island, Ayvalık. Blending historic stone architecture with modern comfort, we are a short walk from the market square, the windmill, and the sea. Whether you are looking for a boutique hotel or the warmth of a family-run guesthouse, we look forward to welcoming you.",
    el: "Το Cunda Milos είναι ένα μπουτίκ ξενοδοχείο έξι δωματίων, στεγασμένο σε ένα διατηρητέο ρωμαίικο πέτρινο σπίτι του 1907 στο νησί Κούνδα (Μοσχονήσι) του Αϊβαλί. Συνδυάζοντας την πέτρινη αρχιτεκτονική με σύγχρονες ανέσεις, βρισκόμαστε λίγα βήματα από την αγορά, τον ανεμόμυλο και τη θάλασσα. Είτε αναζητάτε μπουτίκ ξενοδοχείο είτε τη ζεστασιά μιας οικογενειακής πανσιόν, σας περιμένουμε.",
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
    tr: "Merhaba, Cunda Milos'ta müsaitlik durumunu öğrenmek istiyorum.",
    en: "Hello, I would like to inquire about availability at Cunda Milos.",
    el: "Γεια σας, θα ήθελα να ρωτήσω για τη διαθεσιμότητα στο Cunda Milos.",
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
    tr: "Odalar & Suitler",
    en: "Rooms & Suites",
    el: "Δωμάτια & Σουίτες",
  },
  "rooms.metaTitle": {
    tr: "Odalar & Suitler — Cunda Taş Ev Otel Odaları | Cunda Milos",
    en: "Rooms & Suites — Boutique Hotel Rooms in Cunda, Ayvalık | Cunda Milos",
    el: "Δωμάτια & Σουίτες — Ξενοδοχείο στην Κούνδα, Αϊβαλί | Cunda Milos",
  },
  "rooms.subtitle": {
    tr: "Her biri Cunda'nın ruhunu yansıtan, özenle tasarlanmış altı oda",
    en: "Six carefully designed rooms, each reflecting the spirit of Cunda",
    el: "Έξι προσεκτικά σχεδιασμένα δωμάτια, καθένα αντανακλά το πνεύμα της Κούνδα",
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
    tr: "Cunda Milos | Cunda Butik Otel — Tarihi Taş Ev, Ayvalık",
    en: "Cunda Milos | Boutique Hotel in a Historic Stone House — Cunda, Ayvalık",
    el: "Cunda Milos | Μπουτίκ Ξενοδοχείο σε Πέτρινο Σπίτι — Κούνδα, Αϊβαλί",
  },
  "meta.description": {
    tr: "Cunda Milos — Ayvalık Cunda Adası'nda 1907 tarihli Rum evinde 6 odalı butik otel. Taş ev mimarisi, geleneksel Ege kahvaltısı ve deniz manzaralı bahçe.",
    en: "Cunda Milos — a six-room boutique hotel in a 1907 Greek stone house on Cunda Island, Ayvalık. Stone architecture, traditional Aegean breakfast, and a sea-view garden.",
    el: "Cunda Milos — μπουτίκ ξενοδοχείο 6 δωματίων σε ρωμαίικο πέτρινο σπίτι του 1907 στην Κούνδα (Μοσχονήσι) του Αϊβαλί. Πέτρινη αρχιτεκτονική, αιγαιοπελαγίτικο πρωινό, κήπος με θέα στη θάλασσα.",
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
    tr: "Cunda Milos havadan görünüm",
    en: "Aerial view of Cunda Milos",
    el: "Αεροφωτογραφία του Cunda Milos",
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
  "guide.faq.title": {
    tr: "Sıkça Sorulan Sorular",
    en: "Frequently Asked Questions",
    el: "Συχνές Ερωτήσεις",
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
    tr: "Ayvalık Merkezden kalkan eski yol minibüs ve otobüsleri ile, Cunda çarşıdan değirmene doğru yukarı yürüyerek ulaşım sağlayabilir veya özel aracınızla gelebilirsiniz.",
    en: "You can reach us by taking one of the old-road minibuses or buses departing from Ayvalık town center, then walking uphill from Cunda's market square toward the windmill — or simply arrive by private car.",
    el: "Μπορείτε να μας βρείτε με τα μίνι λεωφορεία και τα λεωφορεία του παλιού δρόμου που αναχωρούν από το κέντρο του Αϊβαλί, ανεβαίνοντας με τα πόδια από την αγορά της Κούνδα προς τον ανεμόμυλο — ή να έρθετε με το δικό σας όχημα.",
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
    tr: "Her sabah avlumuzda; yerel zeytinyağı, taze peynirler, köy yumurtası, kekik balı ve mevsim meyveleriyle hazırlanan geleneksel bir Ege kahvaltısı servis edilir.",
    en: "Each morning in our courtyard, a traditional Aegean breakfast is served, prepared with local olive oil, fresh cheeses, village eggs, thyme honey, and seasonal fruits.",
    el: "Κάθε πρωί στην αυλή μας σερβίρεται ένα παραδοσιακό αιγαιοπελαγίτικο πρωινό, φτιαγμένο με τοπικό ελαιόλαδο, φρέσκα τυριά, χωριάτικα αυγά, θυμαρίσιο μέλι και φρούτα εποχής.",
  },
  "experience.garden.title": {
    tr: "Milos Bahçe",
    en: "The Milos Garden",
    el: "Ο Κήπος Milos",
  },
  "experience.garden.text": {
    tr: "Otelimizin ferah ve geniş bahçesinde Ayvalık'ın temiz havasını içinize çekebilir, deniz manzarasına karşı kahvenizi yudumlayabilirsiniz. Ayrıca bahçemizde düzenlenen Yunan gecelerine de davetlisiniz.",
    en: "In our hotel's spacious, airy garden you can breathe in Ayvalık's fresh air and sip your coffee against a backdrop of the sea. You are also warmly invited to the Greek nights held in the garden.",
    el: "Στον ευρύχωρο και δροσερό κήπο του ξενοδοχείου μας μπορείτε να αναπνεύσετε τον καθαρό αέρα του Αϊβαλί και να απολαύσετε τον καφέ σας με θέα τη θάλασσα. Είστε επίσης καλεσμένοι στις ελληνικές βραδιές που διοργανώνονται στον κήπο μας.",
  },
  "experience.architecture.title": {
    tr: "Rum Mimarisi",
    en: "Greek Architecture",
    el: "Ελληνική Αρχιτεκτονική",
  },
  "experience.architecture.text": {
    tr: "Mübadeleden önce bölgede yaşayan Rumlar tarafından 1907'de inşa edilen taş evimiz, tarihi eser statüsündedir. Otelimizde konaklayarak tarihin dokusunu hissedebilir, uzun yıllar boyunca bu duvarlar arasında yaşanmış hikâyelere kendi deneyiminizi ekleyebilirsiniz.",
    en: "Built in 1907 by the Greek community that lived here before the population exchange, our stone house holds protected historic-monument status. Staying with us, you can feel the texture of history and add your own story to the many that have unfolded within these walls over the years.",
    el: "Χτισμένο το 1907 από τους Ρωμιούς που ζούσαν στην περιοχή πριν από την ανταλλαγή των πληθυσμών, το πέτρινο σπίτι μας είναι χαρακτηρισμένο ιστορικό διατηρητέο μνημείο. Μένοντας κοντά μας, μπορείτε να νιώσετε την υφή της ιστορίας και να προσθέσετε τη δική σας εμπειρία στις ιστορίες που έχουν ζήσει αυτοί οι τοίχοι.",
  },
  "experience.service.title": {
    tr: "Kişiye Özel Hizmet",
    en: "Personalized Service",
    el: "Εξατομικευμένη Εξυπηρέτηση",
  },
  "experience.service.text": {
    tr: "Sadece altı odamız olması, her misafire özel ilgi göstermemizi sağlar. Restoran rezervasyonlarından tekne turlarına, zeytin hasadı deneyiminden yerel rehberliğe — seyahatinizi size özel kılıyoruz.",
    en: "With only six rooms, we give every guest personal attention. From restaurant reservations to boat tours, olive harvest experiences to local guided walks — we tailor your journey to you.",
    el: "Με μόνο έξι δωμάτια, προσφέρουμε σε κάθε επισκέπτη προσωπική φροντίδα. Από κρατήσεις εστιατορίων και βόλτες με σκάφος έως εμπειρίες συγκομιδής ελιάς και περιπάτους με ντόπιο ξεναγό — κάνουμε το ταξίδι σας μοναδικά δικό σας.",
  },

  // ─── Gallery Page ───
  "gallery.title": {
    tr: "Galeri",
    en: "Gallery",
    el: "Γκαλερί",
  },
  "gallery.subtitle": {
    tr: "Cunda Milos'un atmosferini keşfedin",
    en: "Discover the atmosphere of Cunda Milos",
    el: "Ανακαλύψτε την ατμόσφαιρα του Cunda Milos",
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
