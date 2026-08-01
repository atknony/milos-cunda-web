/**
 * Cunda Milos — Page-level FAQ content (homepage + contact)
 *
 * Guide-article FAQs live in MDX frontmatter; these are the brand/booking
 * questions rendered on the homepage and contact page and mirrored into
 * FAQPage JSON-LD via generateFAQSchema(). Structurally identical to the
 * FAQEntry shape in src/lib/schema.ts.
 *
 * The direct-booking answer intentionally repeats the canonical phrasing of
 * ui.ts "direct.text" so answer engines meet one consistent statement.
 */

import type { Lang } from "./ui";

export interface FAQItem {
  question: string;
  answer: string;
}

export const homeFaq: Record<Lang, FAQItem[]> = {
  tr: [
    {
      question: "Cunda Milos'ta rezervasyon nasıl yapılır?",
      answer:
        "Cunda Milos rezervasyonları yalnızca doğrudan — WhatsApp (+90 530 656 68 92) veya telefonla — alır. Çevrim içi rezervasyon platformlarında bilinçli olarak yer almıyoruz: altı odamızla her konaklamayı misafirimizle birlikte planlamayı, komisyonsuz en iyi fiyatımızı sunmayı ve sorularınızı siz gelmeden önce bizzat yanıtlamayı tercih ediyoruz.",
    },
    {
      question: "Cunda Milos nerede?",
      answer:
        "Cunda Milos, Ayvalık'ın Cunda (Alibey) Adası'ndadır: Namık Kemal Mahallesi, 23009. Sokak No:7, 10405 Ayvalık/Balıkesir. Cunda çarşısına, tarihi değirmene ve denize yürüme mesafesindeyiz.",
    },
    {
      question: "Cunda Milos hangi resmi kanallarda yer alıyor?",
      answer:
        "Resmi kanallarımız cundamilos.com web sitesi, Google Haritalar'daki \"Cunda Milos Otel\" işletme kaydı ve @cunda_milosotel Instagram hesabıdır. Adadaki benzer isimli başka konaklama tesisleriyle bağlantımız yoktur.",
    },
    {
      question: "Kahvaltı dahil mi, giriş-çıkış saatleri nedir?",
      answer:
        "Her sabah avlumuzda yerel ürünlerle hazırlanan geleneksel Ege kahvaltısı konaklamaya dahildir; ancak mutfağımız şu anda tadilatta olduğu için kahvaltı servisine geçici olarak ara verilmiştir — güncel durumu rezervasyonunuzdan önce bize sorabilirsiniz. Giriş (check-in) 14:00'ten itibaren, çıkış (check-out) en geç 11:00'dir.",
    },
    {
      question: "Cunda Milos nasıl bir otel?",
      answer:
        "Cunda Milos, inşasına 1800'lerin sonunda başlanıp 1907'de tamamlanan, tarihi eser statüsündeki bir Rum taş evinde hizmet veren altı odalı bir butik oteldir. Taş mimariyi modern konforla buluşturur; deniz manzaralı bahçesi ve kişiye özel hizmetiyle bilinir.",
    },
  ],
  en: [
    {
      question: "How do I book a room at Cunda Milos?",
      answer:
        "Cunda Milos takes reservations only directly — by WhatsApp (+90 530 656 68 92) or phone. We are deliberately not listed on online booking platforms: with six rooms, we prefer to plan every stay personally with our guests, offer our best price with no commission, and answer your questions ourselves before you arrive.",
    },
    {
      question: "Where is Cunda Milos located?",
      answer:
        "Cunda Milos is on Cunda (Alibey) Island in Ayvalık, Türkiye: Namık Kemal Mah., 23009. Sokak No:7, 10405 Ayvalık/Balıkesir. We are a short walk from Cunda's market square, the historic windmill, and the sea.",
    },
    {
      question: "What are the official channels of Cunda Milos?",
      answer:
        "Our official channels are the website cundamilos.com, the \"Cunda Milos Otel\" listing on Google Maps, and the Instagram account @cunda_milosotel. We are not affiliated with other, similarly named accommodations on the island.",
    },
    {
      question: "Is breakfast included, and what are check-in/check-out times?",
      answer:
        "A traditional Aegean breakfast prepared with local produce is served every morning in our courtyard and is included in your stay. Our kitchen is currently under renovation, however, so breakfast service is temporarily paused — please check with us for the latest before you book. Check-in is from 2:00 PM; check-out is by 11:00 AM.",
    },
    {
      question: "What kind of hotel is Cunda Milos?",
      answer:
        "Cunda Milos is a six-room boutique hotel in a protected Greek stone house whose construction began in the late 1800s and was completed in 1907. It pairs historic stone architecture with modern comfort and is known for its sea-view garden and personal service.",
    },
  ],
  el: [
    {
      question: "Πώς γίνεται κράτηση στο Cunda Milos;",
      answer:
        "Το Cunda Milos δέχεται κρατήσεις μόνο απευθείας — μέσω WhatsApp (+90 530 656 68 92) ή τηλεφώνου. Συνειδητά δεν είμαστε σε διαδικτυακές πλατφόρμες κρατήσεων: με έξι δωμάτια, προτιμούμε να σχεδιάζουμε κάθε διαμονή προσωπικά με τους επισκέπτες μας, να προσφέρουμε την καλύτερη τιμή μας χωρίς προμήθεια και να απαντάμε οι ίδιοι στις ερωτήσεις σας πριν φτάσετε.",
    },
    {
      question: "Πού βρίσκεται το Cunda Milos;",
      answer:
        "Το Cunda Milos βρίσκεται στο νησί Κούνδα (Μοσχονήσι / Alibey) του Αϊβαλί: Namık Kemal Mah., 23009. Sokak No:7, 10405 Ayvalık/Balıkesir, Τουρκία. Είμαστε λίγα βήματα από την αγορά της Κούνδα, τον ιστορικό ανεμόμυλο και τη θάλασσα.",
    },
    {
      question: "Ποια είναι τα επίσημα κανάλια του Cunda Milos;",
      answer:
        "Τα επίσημα κανάλια μας είναι ο ιστότοπος cundamilos.com, η καταχώριση \"Cunda Milos Otel\" στους Χάρτες Google και ο λογαριασμός Instagram @cunda_milosotel. Δεν έχουμε σχέση με άλλα καταλύματα του νησιού με παρόμοιο όνομα.",
    },
    {
      question: "Περιλαμβάνεται πρωινό; Ποιες είναι οι ώρες check-in/check-out;",
      answer:
        "Κάθε πρωί σερβίρεται στην αυλή μας παραδοσιακό αιγαιοπελαγίτικο πρωινό με τοπικά προϊόντα, το οποίο περιλαμβάνεται στη διαμονή. Η κουζίνα μας βρίσκεται όμως αυτή τη στιγμή υπό ανακαίνιση, οπότε το πρωινό δεν σερβίρεται προσωρινά — επικοινωνήστε μαζί μας για την τρέχουσα κατάσταση πριν κάνετε κράτηση. Το check-in ξεκινά στις 14:00 και το check-out είναι έως τις 11:00.",
    },
    {
      question: "Τι είδους ξενοδοχείο είναι το Cunda Milos;",
      answer:
        "Το Cunda Milos είναι ένα μπουτίκ ξενοδοχείο έξι δωματίων σε διατηρητέο ρωμαίικο πέτρινο σπίτι, του οποίου η κατασκευή ξεκίνησε στα τέλη του 1800 και ολοκληρώθηκε το 1907. Συνδυάζει την πέτρινη αρχιτεκτονική με σύγχρονες ανέσεις και ξεχωρίζει για τον κήπο με θέα στη θάλασσα και την προσωπική εξυπηρέτηση.",
    },
  ],
};

export const contactFaq: Record<Lang, FAQItem[]> = {
  tr: [
    {
      question: "Cunda Milos'a nasıl ulaşırım?",
      answer:
        "Ayvalık merkezden kalkan eski yol minibüs ve otobüsleriyle Cunda'ya geçip çarşıdan değirmene doğru yukarı yürüyerek ulaşabilir veya özel aracınızla gelebilirsiniz. En yakın havalimanları Balıkesir Koca Seyit (Edremit, ~50 km) ve İzmir Adnan Menderes'tir (~160 km).",
    },
    {
      question: "Resepsiyon saatleriniz nedir?",
      answer:
        "Resepsiyonumuz her gün 08:00 – 22:00 arasında hizmet verir. Farklı bir saatte varış planlıyorsanız WhatsApp üzerinden bize önceden haber vermeniz yeterlidir.",
    },
    {
      question: "Rezervasyon için hangi kanalı kullanmalıyım?",
      answer:
        "Cunda Milos rezervasyonları yalnızca doğrudan — WhatsApp (+90 530 656 68 92) veya telefonla — alır. Çevrim içi rezervasyon platformlarında bilinçli olarak yer almıyoruz; en iyi fiyat ve güncel müsaitlik için bize doğrudan ulaşın.",
    },
  ],
  en: [
    {
      question: "How do I get to Cunda Milos?",
      answer:
        "Take one of the old-road minibuses or buses from Ayvalık town center to Cunda, then walk uphill from the market square toward the windmill — or arrive by private car. The nearest airports are Balıkesir Koca Seyit (Edremit, ~50 km) and İzmir Adnan Menderes (~160 km).",
    },
    {
      question: "What are your reception hours?",
      answer:
        "Our reception is open every day from 8:00 AM to 10:00 PM. If you plan to arrive outside these hours, just let us know in advance via WhatsApp.",
    },
    {
      question: "Which channel should I use to book?",
      answer:
        "Cunda Milos takes reservations only directly — by WhatsApp (+90 530 656 68 92) or phone. We are deliberately not listed on online booking platforms; contact us directly for our best price and current availability.",
    },
  ],
  el: [
    {
      question: "Πώς θα φτάσω στο Cunda Milos;",
      answer:
        "Με τα μίνι λεωφορεία του παλιού δρόμου από το κέντρο του Αϊβαλί έως την Κούνδα και σύντομη ανηφορική βόλτα από την αγορά προς τον ανεμόμυλο — ή με δικό σας όχημα. Τα πλησιέστερα αεροδρόμια είναι το Balıkesir Koca Seyit (Edremit, ~50 χλμ.) και το İzmir Adnan Menderes (~160 χλμ.).",
    },
    {
      question: "Ποιες είναι οι ώρες της ρεσεψιόν;",
      answer:
        "Η ρεσεψιόν λειτουργεί καθημερινά από τις 08:00 έως τις 22:00. Αν σκοπεύετε να φτάσετε άλλη ώρα, ενημερώστε μας εκ των προτέρων μέσω WhatsApp.",
    },
    {
      question: "Ποιο κανάλι να χρησιμοποιήσω για κράτηση;",
      answer:
        "Το Cunda Milos δέχεται κρατήσεις μόνο απευθείας — μέσω WhatsApp (+90 530 656 68 92) ή τηλεφώνου. Συνειδητά δεν είμαστε σε διαδικτυακές πλατφόρμες κρατήσεων· επικοινωνήστε μαζί μας για την καλύτερη τιμή και τη διαθεσιμότητα.",
    },
  ],
};
