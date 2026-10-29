import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  Droplets,
  Sun,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Send,
  MessageSquare,
  Sparkles,
  Bot,
  RefreshCw,
  ExternalLink,
  Scissors,
  ThermometerSun,
  X,
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';

interface SymptomInfo {
  id: string;
  label: string;
  icon: string;
  shortDesc: string;
  diagnosis: string;
  severity: 'mild' | 'moderate' | 'critical';
  rootCause: string;
  remedySteps: string[];
  wateringAdvice: string;
  lightAdvice: string;
  recommendedProducts: string[];
}

const symptomsData: SymptomInfo[] = [
  {
    id: 'yellow-leaves',
    label: 'Yellowing Leaves',
    icon: '🍂',
    shortDesc: 'Lower or older leaves turning pale yellow or translucent',
    diagnosis: 'Overwatering or Impaired Soil Drainage',
    severity: 'moderate',
    rootCause:
      'Excess moisture in the root zone suffocates delicate root hairs, depriving the foliage of oxygen and vital nitrogen.',
    remedySteps: [
      'Stop watering immediately and check if water is pooling in the saucer or cachepot.',
      'Poke 3-4 ventilation holes in the soil using a clean wooden chopstick to aerate roots.',
      'Prune off completely yellow or mushy leaves using sterilized shears so energy goes to healthy foliage.',
      'Allow the top 2 inches of soil to completely dry out before watering again.',
    ],
    wateringAdvice: 'Cut watering frequency in half. Always test soil dryness with your index finger.',
    lightAdvice: 'Move slightly closer to bright indirect light to help evaporate standing soil moisture.',
    recommendedProducts: ['Well-Draining Indoor Potting Mix', 'Terracotta Planter with Drainage'],
  },
  {
    id: 'brown-tips',
    label: 'Crispy Brown Tips & Edges',
    icon: '🪵',
    shortDesc: 'Edges of leaves feel dry, brittle, and paper-like',
    diagnosis: 'Low Ambient Humidity or Tap Water Mineral Burn',
    severity: 'mild',
    rootCause:
      'Air conditioners or heaters sap ambient humidity, while harsh tap water salts (chlorine, fluoride) accumulate in leaf margins.',
    remedySteps: [
      'Switch from tap water to filtered, RO, or rainwater allowed to stand overnight.',
      'Place a pebble humidity tray with water beneath the plant pot (ensure pot does not sit submerged).',
      'Group plants closely together to generate a micro-climate of natural humidity.',
      'Trim the brown tips following the natural leaf contour, leaving a thin brown border to avoid injuring live tissue.',
    ],
    wateringAdvice: 'Keep soil evenly moist, never letting it become bone dry or waterlogged.',
    lightAdvice: 'Shield from harsh noon direct sunlight and keep away from cold AC vents.',
    recommendedProducts: ['Brass Plant Water Mister', 'Organic Seaweed Plant Tonic'],
  },
  {
    id: 'drooping',
    label: 'Drooping & Limp Stems',
    icon: '🥀',
    shortDesc: 'Foliage looks tired, wilting, and lifeless',
    diagnosis: 'Hydrophobic Soil Dehydration or Root Suffocation',
    severity: 'moderate',
    rootCause:
      'Either the soil has dried out into a hardened brick causing water to run off the sides, or root rot has damaged the vascular system.',
    remedySteps: [
      'The Finger Test: Feel 2 inches into the soil. If bone dry, the plant is severely dehydrated.',
      'If dry: Give the pot a 20-minute "bottom watering" bath in a basin until the topsoil feels damp.',
      'If soil is soggy but plant is wilting: Root rot is likely present—stop watering and aerate soil immediately.',
      'Avoid sudden temperature swings while the plant recovers its turgor pressure.',
    ],
    wateringAdvice: 'Perform deep bottom watering until soil is rehydrated, then drain thoroughly.',
    lightAdvice: 'Keep in gentle, soft indirect light while recovering.',
    recommendedProducts: ['Self-Watering Ceramic Pot', 'Cocopeat Moisture Retainer'],
  },
  {
    id: 'pests',
    label: 'Sticky Residue / Webbing',
    icon: '🕸️',
    shortDesc: 'Tiny webs beneath leaves, white fuzzy specks, or sticky honeydew',
    diagnosis: 'Sap-Sucking Pests (Spider Mites, Mealybugs, or Aphids)',
    severity: 'moderate',
    rootCause:
      'Dry, warm indoor air allows micro pests to proliferate quickly on tender leaf undersides and stem joints.',
    remedySteps: [
      'Isolate the infected plant immediately away from other indoor greenery.',
      'Take the plant to the shower or sink and spray down both sides of leaves with a gentle stream of lukewarm water.',
      'Wipe stems and leaf crotches with a cotton swab dipped in 70% rubbing alcohol to eliminate mealybugs.',
      'Spray weekly with cold-pressed organic Neem Oil solution mixed with a few drops of mild liquid soap.',
    ],
    wateringAdvice: 'Maintain regular watering; stressed dehydrated plants are more susceptible to insect attack.',
    lightAdvice: 'Provide plenty of bright indirect light to support plant immunity.',
    recommendedProducts: ['Pure Cold-Pressed Neem Oil Spray', 'Microfiber Plant Leaf Cleaning Gloves'],
  },
  {
    id: 'root-rot',
    label: 'Black Mushy Stems & Odor',
    icon: '⬛',
    shortDesc: 'Base of stem turns black, mushy, and gives off a stagnant sour smell',
    diagnosis: 'Advanced Root Rot Fungal Infection',
    severity: 'critical',
    rootCause:
      'Anaerobic fungi thrive in waterlogged soil with no drainage holes, decomposing the root system from underneath.',
    remedySteps: [
      'Emergency Surgery: Gently take the plant out of its pot and inspect the root ball.',
      'Rinse away old soil. Snip off all brown, black, slimy or foul-smelling roots until only firm white roots remain.',
      'Dunk remaining healthy roots in a mild solution of 3% hydrogen peroxide and water (1:4 ratio) to disinfect.',
      'Repot in a clean pot with fresh, well-draining potting mix (perlite + bark + cocopeat). Do not reuse old soil.',
    ],
    wateringAdvice: 'Do NOT water for 3 to 4 days after repotting to allow root wounds to callous and heal.',
    lightAdvice: 'Place in bright, filtered light with excellent air circulation.',
    recommendedProducts: ['Perlite Airy Soil Mix', 'Fungicide Powder for Plants'],
  },
  {
    id: 'stunted',
    label: 'Stunted Growth / Pale Color',
    icon: '🌱',
    shortDesc: 'No new leaves for months, small leaves, or fading variegation',
    diagnosis: 'Insufficient Sunlight or Pot-Bound Nutrient Exhaustion',
    severity: 'mild',
    rootCause:
      'The plant lacks sufficient photon energy for photosynthesis, or the root system has filled the pot, exhausting soil nutrients.',
    remedySteps: [
      'Check underneath the pot: Are roots growing out of the drainage holes? If yes, it is time to repot 2 inches larger.',
      'Wipe dust off foliage with a damp cloth—dust blocks up to 40% of light absorption!',
      'Relocate the plant 2–3 feet closer to a sunny window or balcony door.',
      'Feed with a balanced organic liquid fertilizer (NPK 10-10-10) during active spring and summer growth.',
    ],
    wateringAdvice: 'Water when top 1-2 inches of soil dries out completely.',
    lightAdvice: 'Gradually introduce more morning sunlight over 4 days to prevent leaf sunburn.',
    recommendedProducts: ['Organic Bio-Enzyme Plant Food', 'Premium Glazed Ceramic Pot (2" larger)'],
  },
];

const presetQuestions = [
  'How often should I water my plants in summer vs monsoon vs winter in India?',
  'Why are my Monstera leaves not splitting (fenestrating)?',
  'Which indoor plants are completely safe for cats and dogs?',
  'How do I eliminate tiny fungus gnats flying around the soil?',
  'Can I keep indoor plants in an air-conditioned bedroom?',
];

function generateAIAnswer(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('monsoon') || q.includes('summer') || q.includes('winter') || q.includes('water frequency')) {
    return `☀️ **Seasonal Watering Rule for India:**
- **Summer:** High heat increases transpiration. Water deeply every 2–4 days when the top 1 inch is dry. Water early morning before the sun gets fierce.
- **Monsoon:** High humidity slows soil evaporation. Reduce watering! Always check with a finger—water only once every 6–10 days.
- **Winter:** Plants enter dormancy with shorter daylight. Cut watering significantly—most indoor plants only need a drink every 10–14 days.`;
  }

  if (q.includes('monstera') || q.includes('split') || q.includes('fenestrat')) {
    return `🌿 **Why Monstera Leaves Aren't Splitting:**
1. **Light is the #1 Factor:** Monsteras produce slits (fenestrations) only when receiving copious *bright indirect sunlight*. A dim corner will keep leaves small and solid.
2. **Plant Maturity:** Juvenile Monsteras usually do not split until they are 1–2 years old.
3. **Moss Pole Climbing:** In nature, Monsteras climb trees. Giving them a coir/moss pole stimulates mature, giant, perforated leaf growth!`;
  }

  if (q.includes('cat') || q.includes('dog') || q.includes('pet')) {
    return `🐾 **Top 100% Pet-Safe Plants at Avarna:**
- **Areca Palm & Boston Fern:** Completely non-toxic, lush, and excellent humidifiers.
- **Spider Plant:** Harmless to cats (they find it mildly stimulating like catnip!) and filters toxins.
- **Calathea & Prayer Plant:** Gorgeous patterned foliage that is 100% safe if nibbled.
- **Haworthia & Peperomia:** Cute compact desktop succulents with zero toxicity.
*(Note: Keep Monstera, Snake Plant, and Peace Lily on high shelves as their calcium oxalate crystals can irritate curious mouths).*`;
  }

  if (q.includes('gnat') || q.includes('flies') || q.includes('bugs') || q.includes('insects')) {
    return `🪰 **Natural Fungus Gnat Solution:**
Fungus gnats lay eggs only in consistently soggy, wet topsoil.
1. **Let It Dry:** Allow the top 2 inches of soil to completely dry out—gnat larvae cannot survive dry conditions.
2. **Cinnamon Powder:** Dust ground cinnamon across the topsoil—it is a natural antifungal that starves gnat larvae.
3. **Yellow Sticky Traps:** Place 1-2 sticky traps near the base to catch flying adults.
4. **Bottom Watering:** Water your pots from below so the top layer stays dry!`;
  }

  if (q.includes('ac') || q.includes('air condition') || q.includes('bedroom')) {
    return `❄️ **Keeping Plants in Air-Conditioned Rooms:**
Yes, absolutely! Follow these 3 golden rules:
1. **Never Place in Direct Airflow:** Cold draft blowing straight onto foliage causes black cell damage and sudden leaf drop.
2. **Combat Dry Air:** AC removes moisture from air. Mist the air around plants or keep a small water bowl nearby.
3. **Water Slower:** AC rooms stay cooler, so the potting soil takes 2x longer to dry. Water less frequently!`;
  }

  if (q.includes('yellow') || q.includes('pale')) {
    return `🍂 **Why Leaves Turn Yellow:**
Most commonly: overwatering! When roots sit in damp soil with low oxygen, they cannot take up nutrients, causing lower leaves to turn limp and yellow. Allow soil to dry, poke air holes, and ensure your pot has clear drainage holes.`;
  }

  if (q.includes('snake') || q.includes('sansevieria')) {
    return `🐍 **Snake Plant Pro-Tips:**
Snake plants are nearly indestructible, but overwatering will turn their thick fleshy leaves soft and mushy. In normal indoor conditions, water only once every 2 to 3 weeks. They can thrive in deep shade as well as bright sunshine!`;
  }

  if (q.includes('fertiliz') || q.includes('feed')) {
    return `🌱 **Fertilizing Advice:**
Feed indoor plants once every 3 to 4 weeks during active growth (March to October). Use a diluted organic liquid seaweed or compost tea. Never fertilize bone-dry soil (water first to avoid root burn), and do not feed in cold winter dormancy.`;
  }

  // Default intelligent response
  return `🌿 **Dr. Flora's Diagnosis & Guidance:**
For "${query}":
Healthy houseplants need balanced rhythm: **Light > Water > Aeration**.
1. **Light Check:** Ensure your plant receives bright, filtered natural light.
2. **Water Rule:** Always perform the finger test—if the top 1.5 inches are dry, give a thorough soak until water flows out the drainage holes, then discard standing saucer water.
3. **Clean Leaves:** Wipe dust every fortnight to boost photosynthesis by 30%.
Need specific advice on a particular plant or symptom? Check our Symptom Clinic tabs above!`;
}

const PlantCareAssistant: React.FC = () => {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState<'clinic' | 'chat'>('clinic');
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>('yellow-leaves');
  const [selectedPlantName, setSelectedPlantName] = useState<string>('General Houseplant');

  // Chat State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: "Hello plant lover! 🌿 I am Dr. Flora, Avarna's AI Botanist. How can I help your green companions thrive today?",
      time: 'Just now',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentSymptom = symptomsData.find((s) => s.id === selectedSymptomId) || symptomsData[0];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = generateAIAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: answer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <section id="plant-care-assistant" className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <Stethoscope className="w-4 h-4 text-emerald-700" />
            <span>AI Botanical Doctor</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-900 tracking-tight mb-4">
            Plant Care Assistant & Clinic
          </h2>
          <p className="text-forest-700/80 text-base sm:text-lg leading-relaxed">
            Spot leaves turning yellow, drooping, or showing pest spots? Diagnose plant ailments instantly with Dr. Flora AI and get actionable recovery steps.
          </p>

          {/* Mode Tabs */}
          <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl mt-8 border border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'clinic'
                  ? 'bg-white text-forest-900 shadow-md shadow-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Symptom Checker & Diagnosis</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-forest-900 shadow-md shadow-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bot className="w-4 h-4 text-forest-600" />
              <span>Ask Dr. Flora AI</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Symptom Checker & Health Diagnosis */}
        {activeTab === 'clinic' && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Symptom Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-cream-50/70 p-5 rounded-2xl border border-cream-100">
                <label className="block text-xs font-semibold uppercase tracking-wider text-forest-800 mb-2">
                  Select Your Plant (Optional)
                </label>
                <select
                  value={selectedPlantName}
                  onChange={(e) => setSelectedPlantName(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:ring-2 focus:ring-forest-600 outline-none"
                >
                  <option value="General Houseplant">🌿 General Houseplant</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 px-1">
                  What issue are you noticing?
                </p>
                {symptomsData.map((sym) => (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => setSelectedSymptomId(sym.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      selectedSymptomId === sym.id
                        ? 'border-forest-600 bg-forest-50/70 shadow-sm ring-1 ring-forest-500/30'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sym.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{sym.label}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{sym.shortDesc}</p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        sym.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700'
                          : sym.severity === 'moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {sym.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: AI Diagnosis Prescription Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-xl shadow-forest-900/5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentSymptom.icon}</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-forest-700">
                      Prescription for {selectedPlantName}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-gray-900">
                      {currentSymptom.diagnosis}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Curable Condition</span>
                </div>
              </div>

              {/* Root Cause Section */}
              <div className="py-5 border-b border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Underlying Root Cause
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-100">
                  {currentSymptom.rootCause}
                </p>
              </div>

              {/* Immediate First Aid / Action Plan */}
              <div className="py-5 border-b border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-forest-600" />
                  Actionable Remedy & First Aid Steps
                </h4>
                <div className="space-y-2.5">
                  {currentSymptom.remedySteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adjustments: Water & Light */}
              <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100">
                  <div className="flex items-center gap-2 text-sky-800 font-semibold text-xs uppercase tracking-wider mb-1.5">
                    <Droplets className="w-4 h-4 text-sky-600" />
                    Watering Protocol
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {currentSymptom.wateringAdvice}
                  </p>
                </div>

                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs uppercase tracking-wider mb-1.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    Lighting Requirement
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {currentSymptom.lightAdvice}
                  </p>
                </div>
              </div>

              {/* Recommended Remedy Products */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-800">Helpful care products: </span>
                  {currentSymptom.recommendedProducts.join(', ')}
                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <span>Browse Plant Care Essentials</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI Botanical Chatbot */}
        {activeTab === 'chat' && (
          <div className="animate-fade-in max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl shadow-forest-900/5 overflow-hidden flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 sm:p-5 bg-forest-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center border border-forest-600">
                  <Bot className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                    Dr. Flora AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <p className="text-xs text-emerald-200">Avarna Botanical Intelligence • 24/7 Care Support</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setMessages([
                    {
                      sender: 'bot',
                      text: "Hello! 🌿 I am Dr. Flora, Avarna's AI Botanist. How can I help your green companions thrive today?",
                      time: 'Just now',
                    },
                  ])
                }
                className="text-xs text-forest-300 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Chat
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-forest-700 text-white rounded-tr-none shadow-md shadow-forest-700/20'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-2 text-right ${
                        msg.sender === 'user' ? 'text-forest-200' : 'text-gray-400'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-forest-600 animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-forest-600 animate-bounce"
                      style={{ animationDelay: '0.4s' }}
                    />
                    <span className="text-xs text-gray-400 ml-1">Dr. Flora is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Preset Questions Chips */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold uppercase text-gray-400 whitespace-nowrap px-1">
                Frequent:
              </span>
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-forest-50 hover:text-forest-800 text-gray-600 text-xs whitespace-nowrap transition-colors border border-gray-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask any plant care question (e.g., 'Peace lily leaves drooping', 'Fertilizer schedule')..."
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-forest-600 focus:border-forest-600 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="p-3 bg-forest-700 hover:bg-forest-800 text-white rounded-xl transition-all disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlantCareAssistant;