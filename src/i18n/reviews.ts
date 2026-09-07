/**
 * Cunda Milos — Guest reviews (Google Maps)
 *
 * Hand-curated selection from the property's Google Business Profile:
 * https://maps.google.com/?cid=12231583961060775956
 *
 * Editorial rules for this file:
 *  - Turkish text is the guest's own wording. Where a quote is shortened it is
 *    always a CONTIGUOUS opening excerpt (never stitched from separate parts);
 *    only punctuation is tidied and emoji are dropped for typographic calm.
 *    Excerpts are kept to roughly 200 characters so no card towers over the
 *    others in the marquee — length is a layout constraint here, not just taste.
 *  - `en` / `el` are translations of that Turkish original, kept in the guest's
 *    register rather than polished into marketing copy.
 *  - Surnames are reduced to an initial — the reviews are public, the display
 *    names needn't be.
 *  - Reviews written by members of the family are deliberately NOT included.
 *
 * Refresh by hand when notable new reviews land; `summary` must be kept in step
 * with the live rating/count on the listing.
 */

import type { Lang } from "./ui";

export interface Review {
  /** Display name, surname abbreviated. */
  name: string;
  /** Stars given, 1–5. */
  rating: number;
  /** ISO year-month the review was posted; rendered via monthLabel(). */
  month: string;
  quote: Record<Lang, string>;
}

/** Aggregate figures shown above the marquee. Update alongside `reviews`. */
export const reviewSummary = {
  rating: 5,
  ratingText: { tr: "5,0", en: "5.0", el: "5,0" } as Record<Lang, string>,
  count: 16,
  url: "https://maps.google.com/?cid=12231583961060775956",
};

const MONTHS: Record<Lang, string[]> = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  el: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
};

/** "2026-08" → "Ağustos 2026" / "August 2026" / "Αύγουστος 2026" */
export function monthLabel(lang: Lang, month: string): string {
  const [year, m] = month.split("-");
  const name = MONTHS[lang][Number(m) - 1];
  return name ? `${name} ${year}` : year;
}

export const reviews: Review[] = [
  {
    name: "Femihan Ö.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "103 yıl önce gelenlerin dördüncü nesil Girit göçmenlerine aktardıkları ruhla yeniden canlanan harika Rum evi mükemmel bir otele dönüşmüş; her şey tertemiz ve mis kokulu.",
      en: "A wonderful Greek house, brought back to life by the spirit those who arrived 103 years ago passed down to the fourth generation of Cretan émigrés, has become a perfect hotel; everything is spotless and sweet-smelling.",
      el: "Ένα υπέροχο ρωμαίικο σπίτι, που ξαναζωντάνεψε με το πνεύμα το οποίο όσοι ήρθαν πριν από 103 χρόνια κληροδότησαν στην τέταρτη γενιά των Κρητικών προσφύγων, έγινε ένα τέλειο ξενοδοχείο· όλα πεντακάθαρα και μυρωδάτα.",
    },
  },
  {
    name: "Nesrin Ö.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "Tarihi bir Rum evinin ruhu korunarak harika bir otele dönüştürülmüş. Her yer tertemiz ve mis gibi. Bahçesi, deniz ve Milos değirmeni manzaralı odaları, yüksek tavanları ve ferah atmosferiyle çok keyifli.",
      en: "The spirit of a historic Greek house has been preserved and turned into a wonderful hotel. Every corner is spotless and fresh. The garden, the rooms looking out over the sea and the Milos windmill, the high ceilings and the airy feel make it a delight.",
      el: "Το πνεύμα ενός ιστορικού ρωμαίικου σπιτιού διατηρήθηκε και μετατράπηκε σε ένα υπέροχο ξενοδοχείο. Κάθε γωνιά πεντακάθαρη και φρέσκια. Ο κήπος, τα δωμάτια με θέα στη θάλασσα και στον ανεμόμυλο του Μήλου, τα ψηλά ταβάνια και η ευάερη ατμόσφαιρα το κάνουν απολαυστικό.",
    },
  },
  {
    name: "Nur Y.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "Cunda'nın ruhunu yansıtan, aile yadigârı taş bir evden otele dönüştürülmüş çok güzel bir yer. Otelin her köşesinde bunun izini göreceksiniz zaten. Bahçesi çok güzel, girişte Türk kahvesi ikramı çok hoş.",
      en: "A beautiful place that reflects the spirit of Cunda — a stone house handed down through the family and turned into a hotel. You see traces of that in every corner. The garden is lovely, and the Turkish coffee on arrival is a charming touch.",
      el: "Ένα πανέμορφο μέρος που αποπνέει το πνεύμα της Κούνδας — ένα πέτρινο σπίτι, οικογενειακό κειμήλιο, που έγινε ξενοδοχείο. Θα δείτε τα ίχνη του σε κάθε γωνιά. Ο κήπος είναι υπέροχος και ο τούρκικος καφές στην άφιξη μια χαριτωμένη λεπτομέρεια.",
    },
  },
  {
    name: "Serap Ö.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "Eski bir Rum evinin dokusu korunarak çok güzel ve keyifli bir butik otele dönüştürülmüş. Taş konsepti, yüksek tavanları ve ferah odalarıyla kendine has çok güzel bir atmosferi var. Her yer tertemiz ve özenli.",
      en: "The fabric of an old Greek house has been preserved and turned into a beautiful, welcoming boutique hotel. With its stone character, high ceilings and airy rooms it has an atmosphere all of its own. Everywhere is spotless and cared for.",
      el: "Ο ιστός ενός παλιού ρωμαίικου σπιτιού διατηρήθηκε και μετατράπηκε σε ένα πανέμορφο, φιλόξενο μπουτίκ ξενοδοχείο. Με την πέτρινη ταυτότητα, τα ψηλά ταβάνια και τα ευάερα δωμάτιά του έχει μια ολότελα δική του ατμόσφαιρα. Παντού πεντακάθαρα και περιποιημένα.",
    },
  },
  {
    name: "Yağmur G.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "İçeriye ilk adım attığımız anda tertemiz ve mis gibi bir ortamla karşılaştık. Odamız son derece temizdi, konforlu ve ferahtı.",
      en: "The moment we stepped inside we found a spotless, fresh space. Our room was extremely clean, comfortable and airy.",
      el: "Από τη στιγμή που μπήκαμε, βρεθήκαμε σε έναν πεντακάθαρο, φρέσκο χώρο. Το δωμάτιό μας ήταν εξαιρετικά καθαρό, άνετο και ευάερο.",
    },
  },
  {
    name: "Yelda H.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "Çok güzel vakit geçirebileceğiniz bir yer. Sıcak ve samimi bir ortamı var, çok sıcakkanlılardı. Huzurlu ve sakin bir yer arıyorsanız burada güzel vakit geçirebilirsiniz.",
      en: "A place where you can have a genuinely lovely time. The atmosphere is warm and unaffected, and they could not have been more welcoming. If you are looking for somewhere peaceful and quiet, you will enjoy your time here.",
      el: "Ένα μέρος όπου θα περάσετε πραγματικά όμορφα. Η ατμόσφαιρα είναι ζεστή και ανεπιτήδευτη, και μας υποδέχτηκαν με μεγάλη εγκαρδιότητα. Αν ψάχνετε κάτι γαλήνιο και ήσυχο, εδώ θα περάσετε υπέροχα.",
    },
  },
  {
    name: "Elif T.",
    rating: 5,
    month: "2026-08",
    quote: {
      tr: "Cunda değirmen manzaralı, yeni açılan bu otelde iki gün konakladık; çok memnun kaldık. Odalar tertemizdi, herkese tavsiye ederiz. Konum olarak da çok iyi bir yerde.",
      en: "We stayed two nights at this newly opened hotel with its view of the Cunda windmill and were delighted. The rooms were spotless — we would recommend it to anyone. The location is excellent too.",
      el: "Μείναμε δύο βράδια σε αυτό το νεοανοιγμένο ξενοδοχείο με θέα στον ανεμόμυλο της Κούνδας και μείναμε ενθουσιασμένοι. Τα δωμάτια ήταν πεντακάθαρα — το συνιστούμε ανεπιφύλακτα. Και η τοποθεσία είναι εξαιρετική.",
    },
  },
  {
    name: "Ersin Y.",
    rating: 5,
    month: "2026-09",
    quote: {
      tr: "Müthiş temizlikte, evinizi aratmayacak kadar huzurlu.",
      en: "Immaculately clean, and so peaceful you will not miss home.",
      el: "Άψογα καθαρό και τόσο γαλήνιο που δεν θα νοσταλγήσετε το σπίτι σας.",
    },
  },
];
