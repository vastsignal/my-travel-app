import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Coffee, Camera, Train, Utensils, Moon, Sun, ChevronRight, Share, Info, Sparkles, X, Volume2, ShoppingBag, Ship } from 'lucide-react';

// ==========================================
// 👇 請在這裡修改你的行程資料 👇
// ==========================================

const TRIP_INFO = {
  title: "🌊 瀨戶內海跳島藝術之旅",
  dateRange: "2025.10.23 - 10.27",
  coverImage: "https://images.unsplash.com/photo-1596792978018-8686d63d6402?q=80&w=2070&auto=format&fit=crop"
};

const SCHEDULE_DATA = [
  {
    day: 1,
    date: "10/23 (四)",
    title: "抵達岡山與高松",
    events: [
      { time: "16:30", type: "transport", title: "抵達岡山桃太郎空港", desc: "入境後前往市區", icon: Train },
      { time: "18:00", type: "food", title: "晚餐：鳥民居酒屋", desc: "岡山在地氛圍，享受燒鳥料理", icon: Utensils },
      { time: "19:30", type: "sight", title: "AEON Mall 岡山", desc: "站前大型購物中心逛街採買", icon: ShoppingBag },
      { time: "21:00", type: "stay", title: "移動至高松 & Check-in", desc: "住宿：エクストールイン高松", icon: Moon },
    ]
  },
  {
    day: 2,
    date: "10/24 (五)",
    title: "豐島：自然與美術館",
    events: [
      { time: "09:00", type: "sight", title: "唐櫃浜散策", desc: "欣賞豐島的寧靜海景與梯田", icon: Sun },
      { time: "11:30", type: "sight", title: "豐島美術館", desc: "感受水滴、風與光影的建築奇蹟", icon: Camera },
      { time: "14:00", type: "food", title: "午餐：島廚房", desc: "Shima Kitchen 在地食材創意料理", icon: Utensils },
      { time: "15:30", type: "sight", title: "甲生與家浦", desc: "港口周邊藝術作品巡禮", icon: MapPin },
      { time: "18:30", type: "food", title: "晚餐：うどん家 五右衛門", desc: "高松必吃咖哩烏龍麵", icon: Utensils },
      { time: "21:00", type: "stay", title: "飯店休息", desc: "住宿：エクストールイン高松", icon: Moon },
    ]
  },
  {
    day: 3,
    date: "10/25 (六)",
    title: "直島：當代藝術巡禮",
    events: [
      { time: "10:30", type: "sight", title: "地中美術館", desc: "安藤忠雄建築，欣賞莫內睡蓮", icon: Camera },
      { time: "12:30", type: "food", title: "午餐：地中カフェ", desc: "眺望瀨戶內海的愜意午餐", icon: Coffee },
      { time: "14:30", type: "sight", title: "家計畫 (Art House Project)", desc: "本村地區古民家改建藝術群", icon: MapPin },
      { time: "18:00", type: "food", title: "晚餐：ぎょうざ屋", desc: "在地人推薦的餃子店", icon: Utensils },
      { time: "19:30", type: "sight", title: "直島錢湯 (I Love 湯)", desc: "大竹伸朗創作，可以泡澡的藝術品", icon: Sparkles },
      { time: "21:00", type: "stay", title: "返回高松", desc: "住宿：エクストールイン高松", icon: Moon },
    ]
  },
  {
    day: 4,
    date: "10/26 (日)",
    title: "小豆島：橄欖與電影",
    events: [
      { time: "08:02", type: "transport", title: "搭乘呆呆獸渡輪", desc: "前往小豆島，順遊迷路の町", icon: Ship },
      { time: "12:00", type: "food", title: "午餐：こまめ食堂", desc: "梯田旁的人氣定食", icon: Utensils },
      { time: "14:00", type: "sight", title: "抱擁小豆島 & 橄欖公園", desc: "騎掃把拍照，尋找白色風車", icon: Camera },
      { time: "16:00", type: "sight", title: "二十四之瞳映画村", desc: "昭和復古風情電影場景", icon: MapPin },
      { time: "18:30", type: "food", title: "晚餐：小豆島拉麵", desc: "HISHIO (醤) 拉麵", icon: Utensils },
      { time: "20:30", type: "stay", title: "飯店 Check-in", desc: "住宿：ホテルグリーンプラザ小豆島", icon: Moon },
    ]
  },
  {
    day: 5,
    date: "10/27 (一)",
    title: "天使之路與高松市區",
    events: [
      { time: "09:00", type: "sight", title: "天使之路 (Angel Road)", desc: "退潮時才出現的戀人聖地", icon: Sun },
      { time: "10:30", type: "sight", title: "三都半島", desc: "沿途藝術作品欣賞", icon: Camera },
      { time: "13:00", type: "food", title: "午餐：公樂食堂", desc: "懷舊風味的大眾食堂", icon: Utensils },
      { time: "15:00", type: "sight", title: "高松城跡 (玉藻公園)", desc: "日本三大水城之一", icon: MapPin },
      { time: "18:00", type: "food", title: "晚餐：骨付鳥 蘭丸 & 鶴丸", desc: "香川名物烤雞腿與宵夜烏龍麵", icon: Utensils },
      { time: "20:00", type: "sight", title: "香川 Pokémon Center", desc: "尋找呆呆獸周邊與打卡點", icon: Sparkles },
      { time: "21:30", type: "stay", title: "飯店休息", desc: "住宿：エクストールイン高松", icon: Moon },
    ]
  },
];

// ==========================================
// 👇 GEMINI AI 設定 (含自動重試機制) 👇
// ==========================================

const apiKey = ""; // 請在此處填入您的 API Key，或依賴環境變數

const callGemini = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: {
         type: "OBJECT",
         properties: {
           tip: { type: "STRING" },
           japanese_phrase: { type: "STRING" },
           japanese_pronunciation: { type: "STRING" },
           phrase_meaning: { type: "STRING" }
         }
      }
    }
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // 嘗試最多 5 次 (Exponential Backoff)
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // 如果 API Key 錯誤 (400) 或權限不足 (403)，重試通常沒用，直接拋出錯誤讓使用者檢查
      if (response.status === 400 || response.status === 403) {
         const errorText = await response.text();
         console.error("Gemini Auth/Request Error:", errorText);
         throw new Error("請檢查您的 API Key 是否正確設定。");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return JSON.parse(data.candidates[0].content.parts[0].text);

    } catch (error) {
       // 如果是最後一次嘗試，或是 API Key 錯誤，則回傳 null 並結束
       if (i === 4 || error.message.includes("API Key")) {
         console.error("Gemini API Failed after retries:", error);
         return null;
       }
       // 等待時間：1s, 2s, 4s, 8s...
       await delay(Math.pow(2, i) * 1000);
    }
  }
  return null;
};

// ==========================================
// 👆 修改結束，以下是程式邏輯 (Vibe Magic) 👆
// ==========================================

const EventCard = ({ event, isLast, onExplore, isLoading }) => {
  const Icon = event.icon;
  
  const getColorClass = (type) => {
    switch(type) {
      case 'food': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'transport': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'sight': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'coffee': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const themeColor = getColorClass(event.type);

  return (
    <div className="flex gap-4 relative">
      {/* 左側時間軸 */}
      <div className="flex flex-col items-center min-w-[60px]">
        <span className="text-sm font-bold text-slate-500 font-mono">{event.time}</span>
        <div className={`mt-2 w-3 h-3 rounded-full border-2 z-10 bg-white ${themeColor.split(' ')[1].replace('text', 'border')}`}></div>
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 my-1"></div>}
      </div>

      {/* 右側卡片內容 */}
      <div className={`flex-1 mb-6 rounded-2xl border shadow-sm transition-all bg-white relative overflow-hidden group ${themeColor.replace('text', 'border-l-4 border')}`}>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-800 text-lg">{event.title}</h3>
            <Icon size={18} className="opacity-70" />
          </div>
          <p className="text-slate-500 text-sm mt-1 leading-relaxed mb-8">{event.desc}</p>
        </div>

        {/* AI 按鈕區 - 絕對定位在右下角 */}
        <div className="absolute bottom-3 right-3">
          <button 
            onClick={() => onExplore(event)}
            disabled={isLoading}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm
              ${isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-wait' 
                : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:shadow-md hover:scale-105 active:scale-95'
              }`}
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
            ) : (
              <Sparkles size={12} />
            )}
            {isLoading ? '探索中...' : 'AI 導遊'}
          </button>
        </div>
      </div>
    </div>
  );
};

// AI 結果 Modal
const AIModal = ({ isOpen, onClose, data, eventTitle }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">AI 隨身導遊</span>
          </div>
          <h3 className="text-xl font-bold">{eventTitle}</h3>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tip Section */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">💡 在地小撇步</h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
              {data.tip}
            </p>
          </div>

          {/* Language Section */}
          <div>
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">💬 實用日語</h4>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">此情境適用</span>
             </div>
            <div className="bg-violet-50 rounded-xl p-4 border border-violet-100 relative">
               {/* 裝飾 icon */}
               <Volume2 className="absolute top-3 right-3 text-violet-200" size={40} />
               
               <p className="text-xl font-bold text-violet-800 mb-1">{data.japanese_phrase}</p>
               <p className="text-xs text-violet-500 font-mono mb-2">{data.japanese_pronunciation}</p>
               <div className="h-px bg-violet-200 w-full mb-2"></div>
               <p className="text-sm text-slate-600">{data.phrase_meaning}</p>
            </div>
          </div>
          
          <button onClick={onClose} className="w-full bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">
            收下建議
          </button>
        </div>
      </div>
    </div>
  );
};

const IOSGuide = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          ✕
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto flex items-center justify-center mb-4 text-4xl">
            📱
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">在 iPhone 上安裝</h3>
          <p className="text-slate-500 text-sm mb-6">這樣就能像原生 App 一樣離線查看行程了！</p>
          
          <div className="text-left space-y-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl">
            <div className="flex gap-3 items-center">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-200 rounded-full font-bold text-xs">1</span>
              <span>點擊下方工具列的 <Share size={16} className="inline mx-1" /> 分享按鈕</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-200 rounded-full font-bold text-xs">2</span>
              <span>往下滑，找到「加入主畫面」</span>
            </div>
            <div className="flex gap-3 items-center">
              <span className="flex items-center justify-center w-6 h-6 bg-slate-200 rounded-full font-bold text-xs">3</span>
              <span>點擊右上角的「加入」即可！</span>
            </div>
          </div>
          
          <button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // AI 相關 State
  const [loadingEventId, setLoadingEventId] = useState(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [currentEventTitle, setCurrentEventTitle] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplore = async (event) => {
    // 如果已經在載入中，忽略點擊
    if (loadingEventId) return;

    setLoadingEventId(event.title + event.time); // 使用組合 key 確保唯一
    setCurrentEventTitle(event.title);
    
    // 建構 Prompt，根據活動類型客製化
    let promptContext = "";
    if (event.type === 'food') promptContext = "這是一個餐廳或飲食行程。";
    else if (event.type === 'sight') promptContext = "這是一個觀光景點。";
    else if (event.type === 'transport') promptContext = "這是一個交通移動行程。";
    
    const prompt = `
      你是一位專業的日本瀨戶內海與四國導遊。
      使用者目前的行程是：${event.title} (${event.desc})。
      ${promptContext}
      
      請生成一個 JSON 物件 (不要 Markdown)，包含以下欄位：
      1. tip: 針對這個地點的一個「不為人知的冷知識」或「行家建議」（例如拍照角度、隱藏菜單、避開人潮時間），50字以內，繁體中文，語氣輕鬆。
      2. japanese_phrase: 針對這個情境，一句最實用的日文短句（例如餐廳點餐、景點問路）。
      3. japanese_pronunciation: 該日文的羅馬拼音。
      4. phrase_meaning: 該日文的中文意思。
    `;

    const result = await callGemini(prompt);
    
    setLoadingEventId(null);
    if (result) {
      setAiData(result);
      setAiModalOpen(true);
    } else {
      alert("AI 導遊目前忙碌中，或 API Key 未設定。請稍後再試！");
    }
  };

  const currentSchedule = SCHEDULE_DATA[activeDay];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 selection:bg-blue-100">
      
      {/* 頂部 Hero 區域 */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10"></div>
        <img 
          src={TRIP_INFO.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
          <p className="text-sm font-medium opacity-90 tracking-wider mb-1 uppercase">{TRIP_INFO.dateRange}</p>
          <h1 className="text-3xl font-bold shadow-sm">{TRIP_INFO.title}</h1>
        </div>
        
        <button 
          onClick={() => setShowGuide(true)}
          className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-all"
        >
          <Info size={20} />
        </button>
      </div>

      {/* 日期選擇器 (Sticky) */}
      <div className={`sticky top-0 z-30 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm pt-2' : 'bg-transparent pt-4'}`}>
        <div className="flex overflow-x-auto gap-3 px-4 pb-4 no-scrollbar snap-x">
          {SCHEDULE_DATA.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveDay(index);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex-shrink-0 snap-center flex flex-col items-center justify-center min-w-[80px] py-2 rounded-2xl border transition-all duration-200 ${
                activeDay === index 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105' 
                  : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'
              }`}
            >
              <span className="text-xs font-medium opacity-80">Day {day.day}</span>
              <span className="text-sm font-bold">{day.date.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 主要行程列表 */}
      <div className="max-w-md mx-auto px-5 mt-6 animate-slide-up">
        <div className="mb-6 flex items-center gap-2 text-slate-400">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-medium uppercase tracking-widest">{currentSchedule.title}</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <div className="space-y-0">
          {currentSchedule.events.map((event, index) => (
            <EventCard 
              key={index} 
              event={event} 
              isLast={index === currentSchedule.events.length - 1}
              onExplore={handleExplore}
              isLoading={loadingEventId === (event.title + event.time)}
            />
          ))}
        </div>
        
        {/* 底部裝飾 */}
        <div className="text-center mt-12 mb-8">
          <p className="text-slate-300 text-sm italic">Have a nice trip! ✈️</p>
        </div>
      </div>

      {/* iOS 安裝教學 Modal */}
      <IOSGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
      
      {/* AI 結果 Modal */}
      <AIModal 
        isOpen={aiModalOpen} 
        onClose={() => setAiModalOpen(false)} 
        data={aiData}
        eventTitle={currentEventTitle}
      />

    </div>
  );
}
