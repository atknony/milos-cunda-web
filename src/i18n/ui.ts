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
} as const;

export type UIKey = keyof typeof ui;
