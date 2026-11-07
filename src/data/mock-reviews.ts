import { Review } from "@/types/storefront";

export const MOCK_REVIEWS: Review[] = [
  // English Reviews
  {
    id: "rev-en-1",
    author: "Rakesh M.",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "14 Oct 2026",
    title: "Refreshing herbal taste and daily morning vitality",
    comment:
      "Started taking Immuno Plus with lukewarm water every morning. The formulation tastes fresh, earthy, and genuinely botanical without synthetic sweetening agents. Fits easily into my morning wellness routine.",
    language: "en",
    verifiedBuyer: false,
    productName: "Immuno Plus Tablets",
    isDemo: true,
  },
  {
    id: "rev-en-2",
    author: "Dr. Ananya S.",
    location: "Hyderabad, Telangana",
    rating: 5,
    date: "28 Sep 2026",
    title: "Gentle herbal blend with zero artificial aftertaste",
    comment:
      "Digest Zen has a very pleasant traditional aroma of Saunf and Haritaki. It is gentle, non-irritating, and pleasant to take after evening dinner.",
    language: "en",
    verifiedBuyer: false,
    productName: "Digest Zen Herbal Churna",
    isDemo: true,
  },
  {
    id: "rev-en-3",
    author: "Sneha Kapur",
    location: "Gurugram, Haryana",
    rating: 4,
    date: "05 Nov 2026",
    title: "Authentic roasted herb aroma and non-greasy oil",
    comment:
      "The Hair Vital Forte kit comes with both herbal oil and tablets. The oil smells naturally of Bhringraj and cold-pressed sesame, absorbing quickly into the scalp without heavy stickiness.",
    language: "en",
    verifiedBuyer: false,
    productName: "Hair Vital Forte Kesh Kit",
    isDemo: true,
  },

  // Hindi (देवनागरी) Reviews
  {
    id: "rev-hi-1",
    author: "अनिता शर्मा",
    location: "लखनऊ, उत्तर प्रदेश",
    rating: 5,
    date: "22 Oct 2026",
    title: "शुद्ध पारंपरिक स्वाद और उत्कृष्ट पैकेजिंग",
    comment:
      "आरोग्य पाथ का तुलसी गिलोय अर्क और च्यवनप्राश बहुत ही शुद्ध हैं। बाज़ार में मिलने वाले अत्यधिक मीठे उत्पादों के मुकाबले इसमें असली जड़ी-बूटियों की ताज़गी महसूस होती है। पैकेजिंग भी बहुत सुरक्षित मिली।",
    language: "hi",
    verifiedBuyer: false,
    productName: "Tulsi Giloy Pure Extract",
    isDemo: true,
  },
  {
    id: "rev-hi-2",
    author: "सुरेश पी.",
    location: "नागपुर, महाराष्ट्र",
    rating: 5,
    date: "19 Oct 2026",
    title: "पारंपरिक आयुर्वेदिक चूर्ण, लेने में बेहद सुगम",
    comment:
      "डाइजेस्ट ज़ेन चूर्ण का स्वाद पारंपरिक और प्राकृतिक है। गुनगुने पानी के साथ आसानी से घुल जाता है। बिल्कुल शुद्ध और प्रामाणिक हर्बल तैयारी लगती है।",
    language: "hi",
    verifiedBuyer: false,
    productName: "Digest Zen Herbal Churna",
    isDemo: true,
  },
  {
    id: "rev-hi-3",
    author: "राजेंद्र कुमार",
    location: "जयपुर, राजस्थान",
    rating: 5,
    date: "01 Nov 2026",
    title: "शल्लाकी और गुग्गुलु का पारंपरिक प्रामाणिक मिश्रण",
    comment:
      "जॉइंट ईज़ गोलियों में असली शल्लाकी और गुग्गुलु की सुगंध स्पष्ट महसूस होती है। गोलियों की बनावट और डिब्बे की सील बहुत उच्च स्तर की है।",
    language: "hi",
    verifiedBuyer: false,
    productName: "Joint Ease Mahanarayan Tabs",
    isDemo: true,
  },

  // Hinglish Reviews
  {
    id: "rev-hinglish-1",
    author: "Amit G.",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    date: "12 Oct 2026",
    title: "CalmMind tabs ka natural Brahmi aroma is very calming",
    comment:
      "Bedtime routine me CalmMind tablets ko warm milk ke saath include kiya hai. Product quality is top-notch, tablets are easy to swallow, and natural botanical aroma is very soothing.",
    language: "hinglish",
    verifiedBuyer: false,
    productName: "CalmMind Stress Relief",
    isDemo: true,
  },
  {
    id: "rev-hinglish-2",
    author: "Vikram Nair",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "25 Oct 2026",
    title: "Daily wellness routine ke liye authentic formulation",
    comment:
      "Stamina Max extract ko 3 weeks se use kar raha hoon. Ingredients label clearly lists pure Ashwagandha and Himalayan Shilajit without fillers. Very transparent brand.",
    language: "hinglish",
    verifiedBuyer: false,
    productName: "Stamina Max Energy Tonic",
    isDemo: true,
  },
  {
    id: "rev-hinglish-3",
    author: "Pooja Verma",
    location: "New Delhi",
    rating: 4,
    date: "03 Nov 2026",
    title: "Fast COD delivery and tamper-proof packaging",
    comment:
      "Order placement was very easy with Cash on Delivery option. Bottle seal and outer box quality was solid. Ingredients feel genuine and authentic.",
    language: "hinglish",
    verifiedBuyer: false,
    productName: "Glow Radiance Herbal Skin",
    isDemo: true,
  },
];
