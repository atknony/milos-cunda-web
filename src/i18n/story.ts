/**
 * Cunda Milos — "Bir Mübadil Konuk Evi" (the house's own story)
 *
 * A long-form article by the journalist Tanju İzbek on the Şakar family and
 * the house on Karanfil Sokak, rendered as an editorial section on the About
 * page. Kept out of `ui.ts` because that file is a flat key→string dictionary
 * for interface copy; this is structured editorial content with its own
 * block types (verse, pull quote, figure), closer in spirit to `faq.ts`.
 *
 * The Turkish is the original. English and Greek are translations that keep
 * the author's register. Cretan-Greek couplets ("mantinades") are quoted in
 * the author's own Latin transliteration in the tr/en versions and in Greek
 * script in the el version, each with a plain-language rendering beneath.
 *
 * Note: the article dates the house to the 1800s, while the rest of the site
 * dates the building to 1907. Both are the owner's own statements and are
 * left as written — do not silently reconcile them.
 */

import type { Lang } from "./ui";

export type StoryBlock =
  /** Body paragraph. */
  | { kind: "p"; text: string }
  /** Section subheading. */
  | { kind: "h"; text: string }
  /** A mantinada / couplet, with an optional plain rendering. */
  | { kind: "verse"; lines: string[]; translation?: string }
  /** Display pull quote lifted from the surrounding prose. */
  | { kind: "pull"; text: string }
  /** Inline photograph breaking up the text. */
  | { kind: "figure"; image: string; alt: string; caption: string }
  /** Closing salutation, set as a display line. */
  | { kind: "closing"; text: string };

export interface Story {
  /** Small label above the title. */
  kicker: string;
  title: string;
  subtitle: string;
  /** Standfirst — set larger, with a drop cap. */
  lead: string;
  author: string;
  authorRole: string;
  blocks: StoryBlock[];
}

/* ─────────────────────────── Türkçe (original) ─────────────────────────── */

const tr: Story = {
  kicker: "Evin Hikâyesi",
  title: "Bir Mübadil Konuk Evi: Cunda Milos",
  subtitle: "Doğdukları evden bir konuk evine dönüşümün hikâyesi",
  lead: "Cunda'da, anadan babadan Giritli bir ailenin izinde yeni bir konuk evi: Milos Cunda…",
  author: "Tanju İzbek",
  authorRole: "Gazeteci",
  blocks: [
    { kind: "h", text: "Şakar Ailesi" },
    {
      kind: "p",
      text: "Birinci kuşak Girit Resmo mübadili Sıdıka ve Halil Şakar çifti, ikisi de Girit Resmo'da doğmuştur. Biri beş, biri üç yaşında Cunda'ya gelmiştir. (O Gonotis çe i Rustembeyena Giritliler lakapları ile anılır; bunu da iliştirelim.) Milos'un mübadele sonrası ilk ev sahipleri, Girit'ten gelen ve burada ölen birinci kuşak Gonotis İbrahim Ağa ile Çıkudakis Nazife Hanım'ın çocukları ve torunları, bu evde doğup büyümüşlerdir. 1935'te Soyadı Kanunu ile “Şakar” soyadını alan Şakar ailesi, yüz yılı aşkın süredir bu evi korumuştur.",
    },
    {
      kind: "p",
      text: "Şimdi Milos'u hayata geçiren Halil, Sıdıka ve Fatma'nın eve damgasını vuran babaannesi ve dedesiyle hikâyeye başlayalım. Sıdıka ve Halil Şakar, Girit Rethimno'dan Cunda'ya, Lozan Antlaşması gereği 1923 yılında, dünyanın en büyük insan değiş tokuşu olarak anılan “Mübadele” ile gelen iki değerli portredir.",
    },
    {
      kind: "figure",
      image: "/images/gallery/exterior-facade.jpg",
      alt: "Karanfil Sokak'taki tarihi taş ev — Cunda Milos'un cephesi",
      caption: "Karanfil Sokak'taki ev: yüz yılı aşkın süredir aynı ailenin elinde.",
    },

    { kind: "h", text: "Sıdıka Şakar — Udun Kraliçesi" },
    {
      kind: "p",
      text: "Sıdıka Şakar (babaanne), o yıllarda Cunda'da ut çalan ender kadınlardan biridir. Dayısı Derviş Bey, Sıdıka'nın yeteneğini fark edince günün birinde İstanbul'dan bir ut ile gelir. Sıdıka Hanım'ın sevinçten gözleri parlar. Bu ut, o zaman Cunda'da bir zelzele yaratmıştır. Çünkü adaya ilk kez bir müzik aleti gelmiştir.",
    },
    {
      kind: "p",
      text: "Bizim ünlü Girit oyunumuz “Pendozali”nin kraliçesidir. O günden ölümüne dek udunu çalar. O yıllarda Cunda'da bir düğün olur da Sıdıka abla sahneye fırlayıp bir pendozali oynamazsa düğün güzel olmazdı. Kardeşi Hüsnü ağabeyle halayı tutar, elindeki mendille ayakları da uçar; pendozali pidihto'ya dönerdi. Sıçramalı pendozali — bedozali…",
    },
    {
      kind: "p",
      text: "Bir ayrıntı daha: zeytin toplama zamanıdır. Patrica'da zeytinlikleri olanlar, ekim–şubat ayları arasında Pateriça'daki damlarına göçer. Tüm gün zeytinler toplanır; akşam yemeğinden sonra bütün komşular bir araya gelir. Aposperida başlar — gece oturması anlamındadır. Tüm komşular, Sıdıka ablanın udunun nağmelerine kulak kesilir. 1940'lı yıllarda Cunda'da bir müzik aleti çalmak, dans etmek ve şarkı söylemek, Giritlilerin ne denli kozmopolit olduğunun bir kanıtıdır.",
    },
    {
      kind: "p",
      text: "Üç tane pırıl pırıl çocuk yetiştirmiştir: Nazife Şakar Anbarcı, Adile Şakar Baydere ve İbrahim Şakar — to Brobro mas. Biz Giritliler, çocuklarımızın adlarını sevilesi olsun diye küçültüveririz. Bedozali, Sıdıka abla demekti. Anısına, kendisinin sıkça söylediği bir maniyi söylemeden geçmeyelim:",
    },
    {
      kind: "verse",
      lines: [
        "Alo horo de reğome okso to bedozali",
        "apu tone horevğane oli mikri meğali",
      ],
      translation:
        "“Bedozaliden başka bir oyun beğenmiyorum; çünkü bu oyunu küçük büyük herkesin oynadığını biliyorum.”",
    },

    { kind: "h", text: "Halil Şakar — Zeytin, Tayfa ve Okuma Geceleri" },
    {
      kind: "p",
      text: "Halil Şakar (büyükbaba, dede), çok disiplinli bir zeytin üreticisidir. Onun gibi güzel “at”a binen yoktur. “Tayfa” denince akla Halil ağabey gelir. Zeytin toplama zamanı Balıkesir'in köylerinden en kalabalık tayfa Halil ağabeye gelir; her yıl ilk önce onun tayfası gelirdi. Bütün ada halkı sevinir, en çok da anneannem ve cicim… Çünkü Halil ağabey, zeytinlerini toplamakta güçlük çekenlere tayfasından bir iki kişi gönderir, onlara katkıda bulunurdu. İmeceyi sever, emeğe önem verirdi.",
    },
    {
      kind: "p",
      text: "Hiç unutamam; tayfasının kâhyası Baki ağabeydi. O stavlo'da, damda zeytin toplayan o emekçi kızlarla ne güzel günlerimiz olmuştur. Zeytin sonrası taş fırına sürdükleri köy ekmeklerinin mis gibi kokusu bugün bile burnumda tüter. Hele bostanları… Kabo mis gibi kavun, karpuz kokardı.",
    },
    {
      kind: "p",
      text: "Halil ağabey okuryazardı. Bu çok önemliydi. Şu anda konuk olduğunuz evde okuma geceleri yapılırdı. Pezula — bahçedeki taş kerevet — bir okul, bir medrese gibiydi. Bütün komşular, Halil ağabeyin o gece okuyacağı roman tefrikasının bir bölümünü kaçırmamak için saatinde bahçede olurdu. Canlı bir arkası yarın örneği… Kemal Tahir mi istersiniz, Kerime Nadir mi? O yıllarda Tercüman'da hangisi tefrika ediliyorsa artık… Tolstoy'un Anna Karenina'sı kitaptan okunur; üstelik Halil ağabey, Türkçe bilmeyen birinci kuşağa anında çeviri yapardı.",
    },
    { kind: "pull", text: "Pezula, bir okul, bir medrese gibiydi." },
    {
      kind: "figure",
      image: "/images/experience/courtyard.jpg",
      alt: "Cunda Milos'un bahçesi — çam ağaçları, begonviller ve taş duvarlar",
      caption: "Bahçe: okuma gecelerinin ve aposperida'ların yapıldığı yer.",
    },
    {
      kind: "p",
      text: "Adaya gazete üç günde bir gelirdi. Bugün adanın bu karmaşasına neden olan köprü bağlantısı o zamanlar yoktu. Motorlarla, deniz yolu ile gelen gazetelerin girdiği ender evlerden biriydi bu ev. O nedenledir ki Halil ağabey, çocuklarının eğitimine önem veren bir babaydı. Okul, müzik aleti, zanaat… Yeter ki öğrensinler.",
    },

    { kind: "h", text: "Nazife — Mandolinin Kraliçesi" },
    {
      kind: "p",
      text: "Nazife abla mandolinin kraliçesiydi; öyle güzel çalardı ki herkes peşindeydi. “Nazife, Bekledim de Gelmedin'i çalsın”, “Nazife, Manolya'yı çalsın”, “Nazife, Pendozali'yi çalsın”, “Nazife, Oso varun ta sidera'yı çalsın”, hele de Nazifo samyotisa'yı çalsın diye…",
    },
    {
      kind: "p",
      text: "Bir anıyı iliştirmeden geçemeyeceğim. Nazife abla, İzmir Karşıyaka'ya gelin gitmiştir; canım Orhan abiyle evlidir. Orhan Anbarcı, İzmir'in önemli bir antikacısıdır. Babam, Nazife ablanın mandolin çalmasına hayrandır. Soma'daki eczanesini kapatır; annemi İzmir Fuarı Göl Gazinosu'na götürecektir. İzmir'e vardıklarında direksiyonu doğruca Nazife ablaların Karşıyaka'daki evine kırar. Nazife, arabanın arkasında mandolinle çalmaya başlar. Orhan ağabey dükkânını kapatır; birlikte Göl Gazinosu'na doğru yola çıkarlar.",
    },
    {
      kind: "p",
      text: "Ne mi olur? Göl Gazinosu'nda çalgılar susar, Nazife ablamın mandolini programı tamamlar. Bu arada Nazife abla programı arabada da sürdürür; babam, eczanede telefondan amcama şarkıları dinletir. Aylin ve Mustafa adında iki çocuğu vardır; şimdi torun torba sahibidir.",
    },

    { kind: "h", text: "Adile — Matematiğin ve Kitapların Yolu" },
    {
      kind: "p",
      text: "Adile Şakar, 1960'lı yıllarda Ayvalık Lisesi birincisidir; matematik piridir. O yıllarda Cunda'dan Ayvalık Lisesine giden tek tük öğrenciden biridir; üstelik kız öğrencidir. İzmir Kız Enstitüsüne birincilikle girer, matematik öğretmeni olur; ver elini Uşak… Ve bize entelektüel bir enişte getirir: Cengiz Baydere. İzmir Kız Lisesinde Fransızca öğretmenidir; sonraları bir efsane olur.",
    },
    {
      kind: "p",
      text: "“Çi Sidikas o ğabros”… Bizim Karanfil Sokak'ta sık sık yankılanan bu Giritçe tümce, “Sıdıka'nın damadı” anlamındaydı ve Cengiz abinin öğrendiği ilk Giritçe tümceydi. Annem ne severdi onu…",
    },
    {
      kind: "p",
      text: "Unutmadan geçemem: Balzac'ı bana Adile abla tanıttı. Ortaokuldaydım, 1960'ların sonuydu. Bana bir kitap armağan etti; Honoré de Balzac'ın “Eugénie Grandet”si hayatımı etkiledi. Roman, para hırsının, çıkarcılığın ve tutkuların insan hayatını nasıl etkilediğini anlatıyordu. Cenker ve Gözde, iki çocuklarıdır. Cenker gitar çalıyor; bir müzik atölyesi var ve dersler veriyor. Kızı Gözde'nin sesi çok güzel; enfes şarkılar söylüyor.",
    },

    { kind: "h", text: "İbrahim ve Dilşat — Evin İki Direği" },
    {
      kind: "p",
      text: "İbrahim Şakar, şu anda konuk olacağımız Milos'u hayata geçiren genç kuşaktan üç kardeşin — Halil, Sıdıka ve Fatma'nın (ben Fatoş demeyi tercih ederim) — babasıdır. To Brobro mas, İbrahimciğimiz… Ailenin zanaatkârı; marangoz ve mobilya ustasıdır. Ailenin tek oğlu olarak el bebek gül bebek büyütülmüştür.",
    },
    {
      kind: "p",
      text: "Eşi Dilşat Şakar, adanın ünlü ilk kuşak Giritli ailesi Kesebirlerin Fatma Hanım ile Merohuso Ali Bey'in kızıdır; zarif, fedakâr ve vefakârdır. O da has bir Giritlidir — to Dilşo mas, Dilşatımız. Dilşat bu eve gelin gelmiş, çocuklarını bu evde doğurmuş ve bu evde büyütmüştür. Bir ziyaretine gittiğinizde sizi ikramlara boğar, “Allah aşkına, Allah aşkına!” diye ısrar eder; kahvenizi ya da çayınızı içirmeden göndermezdi. Misafirperver mi misafirperver…",
    },

    { kind: "h", text: "Karanfil Sokak'taki Ev" },
    {
      kind: "p",
      text: "O yüzdendir ki Milos Cunda'nın hikâyesi, büyüleyici yaşanmışlıklarla doludur. Karanfil Sokak'taki, 1800'lü yıllardan kalma bu tarihî ev, eski kentin sit alanı içinde olduğu için aslına uygun biçimde restore edilmiş ve sizlerin kullanımına sunulmuştur. Tarihi koklayabileceğiniz, bir sıcaklığı hissedebileceğiniz bir konuk evine dönüştürülmüştür.",
    },
    {
      kind: "figure",
      image: "/images/rooms/numara-2/bedroom.jpg",
      alt: "Restorasyonda korunan taş ve tuğla duvarlar — Cunda Milos'ta bir oda",
      caption: "Restorasyonda evin özgün taş ve tuğla dokusu olduğu gibi bırakıldı.",
    },
    {
      kind: "p",
      text: "Otelimizi, Şakar ailesinin üçüncü kuşağından üç kardeş — Halil, Sıdıka ve Fatoş — çalıştıracaktır. Burada dikkat çekmek istediğim bir konu da şudur: müzik, ailenin genlerinde vardır. Sıdıka Şakar Onay işletme eğitimi almıştır; kuğu gibi dans ediyor. Eşi Volkan Onay ut, gitar ve buzuki çalıyor. Çocukları Atakan ve Ömer'dir; Atakan gitar çalıyor. Halil Şakar, Ziraat Fakültesi mezunudur; Halil ve eşi Tülin'in İbrahim Ege ve İrem adlı iki çocuğu vardır.",
    },
    {
      kind: "p",
      text: "Şakar ailesinde İbrahim, Sıdıka ve Fatoş gibi isimler tekrarlanır; gelenek sürer ve anneanne, babaanne, dede isimleri torunlara verilir. Fatma Şakar, benim Fatoş'um, yıllar sonra karşıma sirtaki hocam olarak çıkar. Şaşırmam; kendisi kimya mühendisidir. Sıdıka ablanın dans yeteneğini almış bir torundur ve bağlama da çalıyor. Ayvalık'ta Dans Ayvali ve Mübadele Korosu'nda şarkı söyleyip dans ediyor; müthiş performanslara imza atıyor.",
    },
    {
      kind: "p",
      text: "Eğitime, okumaya, müziğe, dansa ve şarkılara önem veren bir ailenin torunlarının bize sunacağı bu büyülü atmosferde güzel günler geçireceğimize inanıyorum.",
    },

    { kind: "h", text: "“Ksaderfi”: Bir Sözcük, Bir Ömür" },
    {
      kind: "p",
      text: "Bu sözcük bana hep Şakar ailesini anımsatmıştır. “Kuzen” anlamında, Giritlilerde kardeşten bile önemli bir sözcüktür.",
    },
    {
      kind: "p",
      text: "Anneannemin Karanfil Çıkmazı'ndaki — şu anda içimi acıtan bir yıkıntı olan — evinin enginarlarla bezeli arka bahçesinden, küçük bir patikayla pezulaya ulaşırdık. Halil ağabey “Ksaderfi!” diye bağırdığında anlardık: Halil ağabey ile anneannem kardeş çocuklarıydı. Gelsin Limnes'lerden kavunlar, karpuzlar… Ve vazgeçilmeyen yaşam biçimi olan maniler — i madinades. İbrahim Şakar'dan bir mani iliştirmeden olmaz:",
    },
    {
      kind: "verse",
      lines: [
        "İrthane tu mayi ta roda çe feran ton ayera",
        "na droserepsun ta dendra pu tane maramena",
      ],
      translation:
        "Mayıs'ın gülleri geldi, rüzgârı getirdi; ağaçların solmuş dallarını serinletti.",
    },
    {
      kind: "figure",
      image: "/images/gallery/garden.jpg",
      alt: "Begonvillerin ardında Cunda Milos'un taş evi ve bahçesi",
      caption: "“Ksaderfi!” diye seslenilen bahçe, bugün de aynı yerde duruyor.",
    },
    {
      kind: "p",
      text: "İşte Şakar ailesinin ve benim çocukluğumu da mühürleyen Milos Cunda'nın böyle bir hikâyesi var. Her evin bir hikâyesi vardır. Bu dönüşümde güzel anılar biriktirmeniz dileğiyle…",
    },
    { kind: "pull", text: "Her evin bir hikâyesi vardır." },
    { kind: "closing", text: "Hoş geldiniz… Kalosorisete…" },
  ],
};

/* ─────────────────────────────── English ─────────────────────────────── */

const en: Story = {
  kicker: "The Story of the House",
  title: "A House of the Exchange: Cunda Milos",
  subtitle: "How the house they were born in became a house for guests",
  lead: "On Cunda, in the footsteps of a family Cretan on both sides, a new guest house: Milos Cunda…",
  author: "Tanju İzbek",
  authorRole: "Journalist",
  blocks: [
    { kind: "h", text: "The Şakar Family" },
    {
      kind: "p",
      text: "Sıdıka and Halil Şakar, first-generation exchange migrants from Rethymno in Crete, were both born there — one arrived on Cunda at five years old, the other at three. (Among the Cretans they were known by the nicknames o Gonotis and i Rustembeyena; let us set that down too.) The first owners of Milos after the population exchange were the children and grandchildren of İbrahim Ağa Gonotis and Nazife Hanım Çıkudakis, who came from Crete and died here; they were born and raised in this house. Taking the surname “Şakar” under the Surname Law of 1935, the family has kept this house for more than a hundred years.",
    },
    {
      kind: "p",
      text: "Let us begin the story with the grandmother and grandfather who left their mark on the house — the grandparents of Halil, Sıdıka and Fatma, who are bringing Milos to life today. Sıdıka and Halil Şakar are two treasured portraits, brought from Rethymno in Crete to Cunda in 1923 under the Treaty of Lausanne, in what is remembered as the largest exchange of populations the world has known.",
    },
    {
      kind: "figure",
      image: "/images/gallery/exterior-facade.jpg",
      alt: "The historic stone house on Karanfil Sokak — the facade of Cunda Milos",
      caption: "The house on Karanfil Sokak: in the same family's hands for over a century.",
    },

    { kind: "h", text: "Sıdıka Şakar — Queen of the Oud" },
    {
      kind: "p",
      text: "Sıdıka Şakar, the grandmother, was one of the very few women playing the oud on Cunda in those years. When her uncle Derviş Bey recognised her gift, he arrived one day from Istanbul carrying an oud. Her eyes shone with joy. That instrument caused something of an earthquake on Cunda at the time — it was the first musical instrument ever to reach the island.",
    },
    {
      kind: "p",
      text: "She was the queen of our famous Cretan dance, the pentozali. From that day until her death she played her oud. In those years, if there was a wedding on Cunda and Sıdıka did not spring onto the floor to dance a pentozali, the wedding was not considered a good one. She would take up the line with her brother Hüsnü, a handkerchief in her hand and her feet in the air; the pentozali would turn into pidihto. The leaping pentozali — bedozali…",
    },
    {
      kind: "p",
      text: "One more detail: it is the olive harvest. Those with olive groves at Patrica move to their lodges at Pateriça between October and February. The olives are gathered all day; after supper, all the neighbours come together. The aposperida begins — it means the evening sitting. Every neighbour falls silent for the notes of Sıdıka's oud. To play an instrument, to dance and to sing on Cunda in the 1940s is proof of how cosmopolitan the Cretans were.",
    },
    {
      kind: "p",
      text: "She raised three bright children: Nazife Şakar Anbarcı, Adile Şakar Baydere and İbrahim Şakar — to Brobro mas. We Cretans shrink our children's names to make them dearer. Bedozali meant Sıdıka. In her memory, we cannot pass on without one of the couplets she so often sang:",
    },
    {
      kind: "verse",
      lines: [
        "Alo horo de reğome okso to bedozali",
        "apu tone horevğane oli mikri meğali",
      ],
      translation:
        "“I care for no dance but the bedozali; for I know that everyone, young and old, has danced it.”",
    },

    { kind: "h", text: "Halil Şakar — Olives, the Crew, and Reading Nights" },
    {
      kind: "p",
      text: "Halil Şakar, the grandfather, was a most disciplined olive grower. No one sat a horse as well as he did. Say “the crew” and Halil comes to mind. At harvest time the largest crew from the villages of Balıkesir came to him, and every year his crew arrived first. The whole island was glad of it, my grandmother most of all — because Halil would send one or two of his crew to those who were struggling to bring in their own olives, and lend them a hand. He loved collective work and held labour in high regard.",
    },
    {
      kind: "p",
      text: "I can never forget it; the steward of his crew was Baki. What fine days we had in that stavlo, in the lodge, with the working girls who picked the olives. The scent of the village bread they slid into the stone oven after the harvest is in my nostrils to this day. And the melon patches… the kabo smelled sweetly of melon and watermelon.",
    },
    {
      kind: "p",
      text: "Halil was lettered, and that mattered a great deal. Reading nights were held in the very house in which you are now a guest. The pezula — the stone bench in the garden — was like a school, like a medrese. All the neighbours would be in the garden on the hour, so as not to miss a single instalment of the serialised novel he was to read that night. A living radio serial… Would you have Kemal Tahir, or Kerime Nadir? Whichever was running in Tercüman in those years… Tolstoy's Anna Karenina was read from the book itself; and Halil would translate on the spot for the first generation, who had no Turkish.",
    },
    { kind: "pull", text: "The pezula was like a school, like a medrese." },
    {
      kind: "figure",
      image: "/images/experience/courtyard.jpg",
      alt: "The garden at Cunda Milos — pines, bougainvillea and stone walls",
      caption: "The garden: where the reading nights and the aposperides were held.",
    },
    {
      kind: "p",
      text: "The newspaper reached the island once every three days. The causeway that causes today's crowding did not yet exist. This was one of the few houses that took the papers arriving by boat, by sea. That is why Halil was a father who cared about his children's education. School, an instrument, a craft… so long as they learned.",
    },

    { kind: "h", text: "Nazife — Queen of the Mandolin" },
    {
      kind: "p",
      text: "Nazife was the queen of the mandolin; she played so beautifully that everyone sought her out. “Let Nazife play Bekledim de Gelmedin”, “Let Nazife play Manolya”, “Let Nazife play the Pentozali”, “Let Nazife play Oso varun ta sidera” — and above all, let Nazifo play the samyotisa…",
    },
    {
      kind: "p",
      text: "I cannot pass on without adding a memory. Nazife married into Karşıyaka in İzmir, to my dear Orhan — Orhan Anbarcı, a well-known antiquarian of the city. My father was an admirer of Nazife's mandolin playing. He would close his pharmacy in Soma to take my mother to the Göl Gazinosu at the İzmir Fair; and arriving in İzmir, he would turn the wheel straight for their house in Karşıyaka. Nazife would begin to play in the back of the car. Orhan would shut up his shop, and off they would all go to the Göl Gazinosu.",
    },
    {
      kind: "p",
      text: "And what happened then? At the Göl Gazinosu the band fell silent, and my Nazife's mandolin finished the programme. She would carry the programme on in the car as well; and my father, from the telephone in the pharmacy, would hold up the receiver so my uncle could hear the songs. She had two children, Aylin and Mustafa; she has grandchildren of her own now.",
    },

    { kind: "h", text: "Adile — The Road of Mathematics and Books" },
    {
      kind: "p",
      text: "Adile Şakar was top of her year at Ayvalık High School in the 1960s, a master of mathematics. She was one of only a handful of students who went from Cunda to the high school in Ayvalık — and a girl, at that. She entered the İzmir Girls' Institute first in her class, became a mathematics teacher, and off to Uşak… And she brought us an intellectual brother-in-law: Cengiz Baydere, a teacher of French at the İzmir Girls' High School, who would later become a legend.",
    },
    {
      kind: "p",
      text: "“Çi Sidikas o ğabros”… That Cretan phrase, so often echoing along our Karanfil Sokak, meant “Sıdıka's son-in-law”, and it was the first Cretan sentence Cengiz learned. How my mother loved him…",
    },
    {
      kind: "p",
      text: "I must not forget: it was Adile who introduced me to Balzac. I was at secondary school, at the end of the 1960s. She gave me a book as a gift, and Honoré de Balzac's Eugénie Grandet shaped my life. The novel showed how greed for money, self-interest and the passions bear upon a human life. Cenker and Gözde are her two children. Cenker plays the guitar; he has a music studio and gives lessons. Her daughter Gözde has a beautiful voice and sings exquisitely.",
    },

    { kind: "h", text: "İbrahim and Dilşat — The Two Pillars of the House" },
    {
      kind: "p",
      text: "İbrahim Şakar is the father of the three siblings of the younger generation — Halil, Sıdıka and Fatma (I prefer to say Fatoş) — who are bringing to life the Milos in which we are about to be guests. To Brobro mas, our dear İbrahim… the craftsman of the family, a carpenter and master of furniture. As the only son, he was raised as the apple of every eye.",
    },
    {
      kind: "p",
      text: "His wife, Dilşat Şakar, is the daughter of Fatma Hanım and Merohuso Ali Bey of the Kesebirs, the island's celebrated first-generation Cretan family; she is gracious, giving and steadfast, and a true Cretan herself — to Dilşo mas, our Dilşat. Dilşat came to this house as a bride, bore her children in it and raised them in it. Call on her and she will bury you in hospitality, insisting “for heaven's sake, for heaven's sake!”; she would never let you go without your coffee or your tea. Hospitable beyond measure…",
    },

    { kind: "h", text: "The House on Karanfil Sokak" },
    {
      kind: "p",
      text: "That is why the story of Milos Cunda is full of enchanting lived experience. This historic house on Karanfil Sokak, dating from the 1800s, stands within the conservation area of the old town and has therefore been restored faithfully to its original form and opened for your use. It has been turned into a guest house where you can breathe in history and feel a certain warmth.",
    },
    {
      kind: "figure",
      image: "/images/rooms/numara-2/bedroom.jpg",
      alt: "Stone and brick walls preserved in the restoration — a room at Cunda Milos",
      caption: "In the restoration, the original stone and brick of the house was left exactly as it was.",
    },
    {
      kind: "p",
      text: "The hotel will be run by three siblings of the third generation of the Şakar family — Halil, Sıdıka and Fatoş. And here is something I should like to draw attention to: music runs in this family's blood. Sıdıka Şakar Onay trained in business administration; she dances like a swan. Her husband Volkan Onay plays the oud, the guitar and the bouzouki. Their children are Atakan and Ömer; Atakan plays the guitar. Halil Şakar is a graduate of the Faculty of Agriculture; Halil and his wife Tülin have two children, İbrahim Ege and İrem.",
    },
    {
      kind: "p",
      text: "In the Şakar family, names such as İbrahim, Sıdıka and Fatoş recur; the tradition continues, and the names of grandmothers and grandfathers pass to the grandchildren. Fatma Şakar, my Fatoş, turned up years later as my sirtaki teacher. I was not surprised; she is a chemical engineer. She is a granddaughter who inherited Sıdıka's gift for dance, and she plays the bağlama too. In Ayvalık she sings and dances with Dans Ayvali and the Mübadele Choir, giving remarkable performances.",
    },
    {
      kind: "p",
      text: "I believe we shall spend fine days in this enchanted atmosphere, offered to us by the grandchildren of a family that held education, reading, music, dance and song in such high regard.",
    },

    { kind: "h", text: "“Ksaderfi”: One Word, a Whole Life" },
    {
      kind: "p",
      text: "This word has always brought the Şakar family to my mind. It means “cousin”, and among Cretans it carries more weight even than the word for a sibling.",
    },
    {
      kind: "p",
      text: "From the artichoke-strewn back garden of my grandmother's house on Karanfil Çıkmazı — now a ruin that pains me to think of — a small path took us to the pezula. When Halil called out “Ksaderfi!”, we understood: he and my grandmother were first cousins. Let the melons and watermelons come from the Limnes… And the couplets, that way of life no one would give up — i madinades. It would not do to close without a couplet from İbrahim Şakar:",
    },
    {
      kind: "verse",
      lines: [
        "İrthane tu mayi ta roda çe feran ton ayera",
        "na droserepsun ta dendra pu tane maramena",
      ],
      translation:
        "The roses of May have come and brought the wind with them, to cool the withered branches of the trees.",
    },
    {
      kind: "figure",
      image: "/images/gallery/garden.jpg",
      alt: "The stone house and garden of Cunda Milos behind bougainvillea",
      caption: "The garden into which “Ksaderfi!” was called still stands in the same place today.",
    },
    {
      kind: "p",
      text: "Such, then, is the story of the Şakar family and of Milos Cunda, which sealed my own childhood too. Every house has a story. May you gather fine memories of your own in this one's new chapter…",
    },
    { kind: "pull", text: "Every house has a story." },
    { kind: "closing", text: "Welcome… Kalosorisete…" },
  ],
};

/* ─────────────────────────────── Ελληνικά ─────────────────────────────── */

const el: Story = {
  kicker: "Η Ιστορία του Σπιτιού",
  title: "Ένα Σπίτι της Ανταλλαγής: Cunda Milos",
  subtitle: "Η ιστορία της μεταμόρφωσης — από το σπίτι όπου γεννήθηκαν σε σπίτι για τους επισκέπτες",
  lead: "Στην Κούνδα, στα βήματα μιας οικογένειας κρητικής από πατέρα και από μητέρα, ένας νέος ξενώνας: Milos Cunda…",
  author: "Tanju İzbek",
  authorRole: "Δημοσιογράφος",
  blocks: [
    { kind: "h", text: "Η Οικογένεια Şakar" },
    {
      kind: "p",
      text: "Η Sıdıka και ο Halil Şakar, ανταλλάξιμοι πρώτης γενιάς από το Ρέθυμνο της Κρήτης, γεννήθηκαν και οι δύο εκεί· η μία έφτασε στην Κούνδα πέντε ετών, ο άλλος τριών. (Ανάμεσα στους Κρητικούς ήταν γνωστοί με τα παρατσούκλια «ο Γονωτής» και «η Ρουστεμπεγιαίνα»· ας το σημειώσουμε κι αυτό.) Οι πρώτοι ιδιοκτήτες του Milos μετά την ανταλλαγή ήταν τα παιδιά και τα εγγόνια του İbrahim Ağa Γονωτή και της Nazife Χανούμ Τσικουδάκη, που ήρθαν από την Κρήτη και πέθαναν εδώ· σε αυτό το σπίτι γεννήθηκαν και μεγάλωσαν. Παίρνοντας το επώνυμο «Şakar» με τον νόμο περί επωνύμων του 1935, η οικογένεια κρατά αυτό το σπίτι πάνω από εκατό χρόνια.",
    },
    {
      kind: "p",
      text: "Ας αρχίσουμε την ιστορία από τη γιαγιά και τον παππού που σφράγισαν το σπίτι — τους παππούδες του Halil, της Sıdıka και της Fatma, που σήμερα δίνουν ζωή στο Milos. Η Sıdıka και ο Halil Şakar είναι δύο πολύτιμα πορτρέτα, που ήρθαν από το Ρέθυμνο της Κρήτης στην Κούνδα το 1923, βάσει της Συνθήκης της Λωζάννης, με εκείνη τη «Μεγάλη Ανταλλαγή» που μνημονεύεται ως η μεγαλύτερη ανταλλαγή πληθυσμών στον κόσμο.",
    },
    {
      kind: "figure",
      image: "/images/gallery/exterior-facade.jpg",
      alt: "Το ιστορικό πέτρινο σπίτι στην οδό Karanfil — η πρόσοψη του Cunda Milos",
      caption: "Το σπίτι στην οδό Karanfil: πάνω από έναν αιώνα στα χέρια της ίδιας οικογένειας.",
    },

    { kind: "h", text: "Sıdıka Şakar — Η Βασίλισσα του Ούτι" },
    {
      kind: "p",
      text: "Η Sıdıka Şakar, η γιαγιά, ήταν από τις ελάχιστες γυναίκες που έπαιζαν ούτι στην Κούνδα εκείνα τα χρόνια. Όταν ο θείος της, ο Derviş Bey, αντιλήφθηκε το χάρισμά της, έφτασε μια μέρα από την Κωνσταντινούπολη κρατώντας ένα ούτι. Τα μάτια της έλαμψαν από χαρά. Εκείνο το όργανο προκάλεσε τότε σεισμό στην Κούνδα — ήταν το πρώτο μουσικό όργανο που έφτανε ποτέ στο νησί.",
    },
    {
      kind: "p",
      text: "Ήταν η βασίλισσα του περίφημου κρητικού μας χορού, του πεντοζάλι. Από εκείνη τη μέρα ως τον θάνατό της έπαιζε το ούτι της. Τα χρόνια εκείνα, αν γινόταν γάμος στην Κούνδα και η Sıdıka δεν πεταγόταν στην πίστα να σύρει ένα πεντοζάλι, ο γάμος δεν λογαριαζόταν πετυχημένος. Έπιανε τον χορό με τον αδελφό της τον Hüsnü, με το μαντήλι στο χέρι και τα πόδια της να πετούν· το πεντοζάλι γινόταν πηδηχτό. Το πηδηχτό πεντοζάλι — μπεντοζάλι…",
    },
    {
      kind: "p",
      text: "Και μια λεπτομέρεια ακόμη: είναι η εποχή του ελαιοκάρπου. Όσοι έχουν ελαιώνες στην Patrica μετακομίζουν στα καλύβια τους στην Pateriça από τον Οκτώβριο ως τον Φεβρουάριο. Όλη μέρα μαζεύουν ελιές· μετά το δείπνο συγκεντρώνονται όλοι οι γείτονες. Αρχίζει η αποσπερίδα — η βραδινή σύναξη. Όλοι σωπαίνουν για ν' ακούσουν τους σκοπούς από το ούτι της Sıdıka. Το να παίζεις όργανο, να χορεύεις και να τραγουδάς στην Κούνδα της δεκαετίας του 1940 είναι απόδειξη του πόσο κοσμοπολίτες ήταν οι Κρητικοί.",
    },
    {
      kind: "p",
      text: "Μεγάλωσε τρία λαμπρά παιδιά: τη Nazife Şakar Anbarcı, την Adile Şakar Baydere και τον İbrahim Şakar — το μπρο-μπρο μας. Εμείς οι Κρητικοί μικραίνουμε τα ονόματα των παιδιών μας για να τα κάνουμε πιο αγαπητά. «Μπεντοζάλι» σήμαινε Sıdıka. Στη μνήμη της, δεν γίνεται να προσπεράσουμε μια μαντινάδα που έλεγε συχνά:",
    },
    {
      kind: "verse",
      lines: [
        "Άλλο χορό δε ρέγομαι όξω το μπεντοζάλι",
        "απού τονε χορεύγανε όλοι μικροί μεγάλοι",
      ],
      translation:
        "«Άλλον χορό δεν αγαπώ πάρεξ το μπεντοζάλι· γιατί το χόρεψαν μικροί και μεγάλοι.»",
    },

    { kind: "h", text: "Halil Şakar — Ελιές, το Συνεργείο και οι Νύχτες της Ανάγνωσης" },
    {
      kind: "p",
      text: "Ο Halil Şakar, ο παππούς, ήταν άκρως πειθαρχημένος ελαιοπαραγωγός. Κανείς δεν ίππευε τόσο ωραία όσο εκείνος. Πες «συνεργείο» και έρχεται στον νου ο Halil. Στη συγκομιδή, το πολυπληθέστερο συνεργείο από τα χωριά του Μπαλίκεσιρ ερχόταν σ' εκείνον, και κάθε χρόνο το δικό του συνεργείο έφτανε πρώτο. Χαιρόταν όλο το νησί, και πιο πολύ η γιαγιά μου — γιατί ο Halil έστελνε έναν δυο ανθρώπους του σε όσους δυσκολεύονταν να μαζέψουν τις ελιές τους, να τους συντρέξει. Αγαπούσε τη συλλογική δουλειά και τιμούσε τον μόχθο.",
    },
    {
      kind: "p",
      text: "Δεν το ξεχνώ ποτέ· επιστάτης του συνεργείου ήταν ο Baki. Τι ωραίες μέρες περάσαμε σ' εκείνο τον στάβλο, στο καλύβι, με τις εργάτριες που μάζευαν τον ελαιόκαρπο. Η μυρωδιά από το χωριάτικο ψωμί που έβαζαν στον πέτρινο φούρνο μετά τη συγκομιδή μού μυρίζει ακόμη. Και τα μποστάνια… ο κάμπος μοσχοβολούσε πεπόνι και καρπούζι.",
    },
    {
      kind: "p",
      text: "Ο Halil ήξερε γράμματα, και αυτό μετρούσε πολύ. Στο ίδιο σπίτι όπου φιλοξενείστε τώρα γίνονταν νύχτες ανάγνωσης. Η πεζούλα — το πέτρινο πεζούλι της αυλής — ήταν σαν σχολείο, σαν μεντρεσές. Όλοι οι γείτονες βρίσκονταν στην ώρα τους στον κήπο, για να μη χάσουν ούτε ένα επεισόδιο από το μυθιστόρημα σε συνέχειες που θα διάβαζε εκείνο το βράδυ. Ένα ζωντανό ραδιοφωνικό σίριαλ… Κεμάλ Ταχίρ θέλετε, ή Κεριμέ Ναντίρ; Ό,τι δημοσιευόταν σε συνέχειες στην Tercüman εκείνα τα χρόνια… Η Άννα Καρένινα του Τολστόι διαβαζόταν από το ίδιο το βιβλίο· και ο Halil μετέφραζε επιτόπου για την πρώτη γενιά, που δεν ήξερε τουρκικά.",
    },
    { kind: "pull", text: "Η πεζούλα ήταν σαν σχολείο, σαν μεντρεσές." },
    {
      kind: "figure",
      image: "/images/experience/courtyard.jpg",
      alt: "Ο κήπος του Cunda Milos — πεύκα, βουκαμβίλιες και πέτρινοι τοίχοι",
      caption: "Ο κήπος: εκεί γίνονταν οι νύχτες της ανάγνωσης και οι αποσπερίδες.",
    },
    {
      kind: "p",
      text: "Η εφημερίδα έφτανε στο νησί κάθε τρεις μέρες. Η σύνδεση με τη γέφυρα, που σήμερα προκαλεί όλη αυτή τη συμφόρηση, δεν υπήρχε ακόμη. Αυτό ήταν από τα λίγα σπίτια όπου έμπαιναν οι εφημερίδες που έρχονταν με τις βάρκες, από τη θάλασσα. Γι' αυτό και ο Halil ήταν πατέρας που νοιαζόταν για τη μόρφωση των παιδιών του. Σχολείο, ένα όργανο, μια τέχνη… αρκεί να μάθαιναν.",
    },

    { kind: "h", text: "Nazife — Η Βασίλισσα του Μαντολίνου" },
    {
      kind: "p",
      text: "Η Nazife ήταν η βασίλισσα του μαντολίνου· έπαιζε τόσο όμορφα που όλοι την αναζητούσαν. «Να παίξει η Nazife το Bekledim de Gelmedin», «να παίξει η Nazife τη Manolya», «να παίξει η Nazife το πεντοζάλι», «να παίξει η Nazife το Όσο βαρούν τα σίδερα» — και πάνω απ' όλα, να παίξει η Ναζιφώ τη σαμιώτισσα…",
    },
    {
      kind: "p",
      text: "Δεν γίνεται να μην προσθέσω μια ανάμνηση. Η Nazife παντρεύτηκε στο Καρσιγιακά της Σμύρνης, τον αγαπημένο μου Orhan — τον Orhan Anbarcı, σημαντικό αρχαιοπώλη της πόλης. Ο πατέρας μου θαύμαζε το παίξιμό της. Έκλεινε το φαρμακείο του στη Σόμα για να πάει τη μητέρα μου στο Göl Gazinosu της Έκθεσης της Σμύρνης· και φτάνοντας στη Σμύρνη, έστριβε το τιμόνι κατευθείαν για το σπίτι τους στο Καρσιγιακά. Η Nazife άρχιζε να παίζει στο πίσω κάθισμα του αυτοκινήτου. Ο Orhan έκλεινε το μαγαζί του, και ξεκινούσαν όλοι μαζί για το Göl Gazinosu.",
    },
    {
      kind: "p",
      text: "Και τι γινόταν; Στο Göl Gazinosu σώπαιναν οι μουσικοί, και το μαντολίνο της Nazife μου έκλεινε το πρόγραμμα. Στο μεταξύ συνέχιζε το πρόγραμμα και μέσα στο αυτοκίνητο· και ο πατέρας μου, από το τηλέφωνο του φαρμακείου, κρατούσε το ακουστικό για ν' ακούσει ο θείος μου τα τραγούδια. Είχε δύο παιδιά, την Aylin και τον Mustafa· σήμερα έχει και δικά της εγγόνια.",
    },

    { kind: "h", text: "Adile — Ο Δρόμος των Μαθηματικών και των Βιβλίων" },
    {
      kind: "p",
      text: "Η Adile Şakar ήταν πρώτη της χρονιάς της στο Λύκειο του Αϊβαλί τη δεκαετία του 1960, δεξιοτέχνις των μαθηματικών. Ήταν από τους ελάχιστους μαθητές που πήγαιναν από την Κούνδα στο Λύκειο του Αϊβαλί — και μάλιστα κορίτσι. Μπήκε πρώτη στο Παρθεναγωγείο της Σμύρνης, έγινε καθηγήτρια μαθηματικών, και δρόμο για το Ουσάκ… Και μας έφερε έναν διανοούμενο γαμπρό: τον Cengiz Baydere, καθηγητή γαλλικών στο Παρθεναγωγείο της Σμύρνης, που αργότερα έγινε θρύλος.",
    },
    {
      kind: "p",
      text: "«Κι της Σιδίκας ο γαμπρός»… Αυτή η κρητική φράση, που αντηχούσε τόσο συχνά στη δική μας οδό Karanfil, σήμαινε «ο γαμπρός της Sıdıka», και ήταν η πρώτη κρητική φράση που έμαθε ο Cengiz. Πόσο τον αγαπούσε η μητέρα μου…",
    },
    {
      kind: "p",
      text: "Δεν πρέπει να το ξεχάσω: η Adile μου σύστησε τον Μπαλζάκ. Ήμουν στο γυμνάσιο, στα τέλη της δεκαετίας του 1960. Μου χάρισε ένα βιβλίο, και η Ευγενία Γκραντέ του Ονορέ ντε Μπαλζάκ σημάδεψε τη ζωή μου. Το μυθιστόρημα έδειχνε πώς η δίψα για χρήμα, το ιδιοτελές συμφέρον και τα πάθη βαραίνουν πάνω σε μια ανθρώπινη ζωή. Ο Cenker και η Gözde είναι τα δύο της παιδιά. Ο Cenker παίζει κιθάρα· έχει εργαστήρι μουσικής και παραδίδει μαθήματα. Η κόρη της η Gözde έχει πανέμορφη φωνή και τραγουδά υπέροχα.",
    },

    { kind: "h", text: "İbrahim και Dilşat — Οι Δύο Κολόνες του Σπιτιού" },
    {
      kind: "p",
      text: "Ο İbrahim Şakar είναι ο πατέρας των τριών αδελφών της νεότερης γενιάς — του Halil, της Sıdıka και της Fatma (εγώ προτιμώ να λέω Fatoş) — που δίνουν ζωή στο Milos όπου θα φιλοξενηθούμε. Το μπρο-μπρο μας, ο İbrahim μας… ο τεχνίτης της οικογένειας, ξυλουργός και μάστορας επίπλων. Ως μοναχογιός, μεγάλωσε με όλα τα χάδια.",
    },
    {
      kind: "p",
      text: "Η σύζυγός του, Dilşat Şakar, είναι κόρη της Fatma Χανούμ και του Merohuso Ali Bey από τους Kesebir, τη φημισμένη κρητική οικογένεια πρώτης γενιάς του νησιού· είναι λεπτή, ανιδιοτελής και πιστή, και γνήσια Κρητικιά η ίδια — το Dilşo μας, η Dilşat μας. Η Dilşat ήρθε νύφη σε αυτό το σπίτι, εδώ γέννησε τα παιδιά της και εδώ τα μεγάλωσε. Αν την επισκεφθείτε, θα σας πνίξει στα κεράσματα, επιμένοντας «για όνομα του Θεού, για όνομα του Θεού!»· δεν σας άφηνε να φύγετε χωρίς τον καφέ ή το τσάι σας. Φιλόξενη όσο δεν πάει…",
    },

    { kind: "h", text: "Το Σπίτι στην Οδό Karanfil" },
    {
      kind: "p",
      text: "Γι' αυτό και η ιστορία του Milos Cunda είναι γεμάτη μαγευτικά βιώματα. Αυτό το ιστορικό σπίτι στην οδό Karanfil, από τον 19ο αιώνα, βρίσκεται εντός της ζώνης προστασίας της παλιάς πόλης και γι' αυτό αναστηλώθηκε πιστά στην αρχική του μορφή και παραδόθηκε στη χρήση σας. Μετατράπηκε σε έναν ξενώνα όπου μπορείτε να μυρίσετε την ιστορία και να νιώσετε μια ζεστασιά.",
    },
    {
      kind: "figure",
      image: "/images/rooms/numara-2/bedroom.jpg",
      alt: "Πέτρινοι και τούβλινοι τοίχοι διατηρημένοι στην αναστήλωση — δωμάτιο στο Cunda Milos",
      caption: "Στην αναστήλωση, η αυθεντική πέτρα και το τούβλο του σπιτιού έμειναν ακριβώς όπως ήταν.",
    },
    {
      kind: "p",
      text: "Το ξενοδοχείο θα το λειτουργήσουν τρία αδέλφια της τρίτης γενιάς των Şakar — ο Halil, η Sıdıka και η Fatoş. Και να τι θα ήθελα να επισημάνω: η μουσική είναι στο αίμα αυτής της οικογένειας. Η Sıdıka Şakar Onay σπούδασε διοίκηση επιχειρήσεων· χορεύει σαν κύκνος. Ο σύζυγός της Volkan Onay παίζει ούτι, κιθάρα και μπουζούκι. Τα παιδιά τους είναι ο Atakan και ο Ömer· ο Atakan παίζει κιθάρα. Ο Halil Şakar είναι απόφοιτος της Γεωπονικής Σχολής· ο Halil και η σύζυγός του Tülin έχουν δύο παιδιά, τον İbrahim Ege και την İrem.",
    },
    {
      kind: "p",
      text: "Στην οικογένεια Şakar τα ονόματα İbrahim, Sıdıka και Fatoş επαναλαμβάνονται· η παράδοση συνεχίζεται, και τα ονόματα των γιαγιάδων και των παππούδων περνούν στα εγγόνια. Η Fatma Şakar, η Fatoş μου, εμφανίστηκε χρόνια αργότερα ως δασκάλα μου στο συρτάκι. Δεν εξεπλάγην· είναι χημικός μηχανικός. Είναι εγγονή που κληρονόμησε το ταλέντο της Sıdıka στον χορό, και παίζει και μπαγλαμά. Στο Αϊβαλί τραγουδά και χορεύει με το Dans Ayvali και τη Χορωδία της Ανταλλαγής, δίνοντας εξαιρετικές παραστάσεις.",
    },
    {
      kind: "p",
      text: "Πιστεύω πως θα περάσουμε όμορφες μέρες σε αυτή τη μαγευτική ατμόσφαιρα, που μας προσφέρουν τα εγγόνια μιας οικογένειας η οποία τιμούσε τη μόρφωση, το διάβασμα, τη μουσική, τον χορό και το τραγούδι.",
    },

    { kind: "h", text: "«Ξάδερφι»: Μια Λέξη, Μια Ζωή" },
    {
      kind: "p",
      text: "Αυτή η λέξη μού θύμιζε πάντα την οικογένεια Şakar. Σημαίνει «ξάδελφος», και για τους Κρητικούς βαραίνει ακόμη περισσότερο κι από τη λέξη για τον αδελφό.",
    },
    {
      kind: "p",
      text: "Από τον πίσω κήπο του σπιτιού της γιαγιάς μου στο αδιέξοδο Karanfil — σήμερα ένα ερείπιο που μου πονά την ψυχή — γεμάτο αγκινάρες, ένα μικρό μονοπάτι μάς έβγαζε στην πεζούλα. Όταν ο Halil φώναζε «Ξάδερφι!», καταλαβαίναμε: εκείνος και η γιαγιά μου ήταν πρώτα ξαδέλφια. Κι ας έρχονταν τα πεπόνια και τα καρπούζια από τις Λίμνες… Και οι μαντινάδες, εκείνος ο τρόπος ζωής που κανείς δεν απαρνιόταν — οι μαντινάδες. Δεν γίνεται να κλείσουμε χωρίς μια μαντινάδα του İbrahim Şakar:",
    },
    {
      kind: "verse",
      lines: [
        "Ήρθανε του Μάη τα ρόδα κι έφεραν τον αέρα",
        "να δροσερέψουν τα δέντρα που 'ναι μαραμένα",
      ],
      translation:
        "Ήρθαν τα ρόδα του Μάη κι έφεραν μαζί τον άνεμο, να δροσίσουν τα μαραμένα κλαδιά των δέντρων.",
    },
    {
      kind: "figure",
      image: "/images/gallery/garden.jpg",
      alt: "Το πέτρινο σπίτι και ο κήπος του Cunda Milos πίσω από τις βουκαμβίλιες",
      caption: "Ο κήπος όπου ακουγόταν το «Ξάδερφι!» στέκει ακόμη στην ίδια θέση.",
    },
    {
      kind: "p",
      text: "Τέτοια, λοιπόν, είναι η ιστορία της οικογένειας Şakar και του Milos Cunda, που σφράγισε και τα δικά μου παιδικά χρόνια. Κάθε σπίτι έχει μια ιστορία. Εύχομαι να μαζέψετε κι εσείς όμορφες αναμνήσεις σε αυτό το νέο του κεφάλαιο…",
    },
    { kind: "pull", text: "Κάθε σπίτι έχει μια ιστορία." },
    { kind: "closing", text: "Καλώς ορίσατε… Kalosorisete…" },
  ],
};

export const story: Record<Lang, Story> = { tr, en, el };
