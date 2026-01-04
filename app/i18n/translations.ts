export const translations = {
  en: {
    // Hero Section
    title: "Lovely Myanmar Pyi",
    subtitle: "A place to share hope, kindness, and stories from every region of Myanmar.",
    connectButton: "Connect Wallet to Begin",
    
    // Auth Card
    welcome: "Welcome",
    welcomeMessage: "Connect your wallet to explore Myanmar's regions and share messages with the community.",
    connectWith: "Connect with",
    
    // Status Bar
    signedIn: "You're signed in",
    notConnected: "Not connected",
    disconnect: "Disconnect",
    
    // Map Panel
    selectRegion: "Select a Region",
    noSelection: "No region selected",
    connectToView: "Connect your wallet to view the map",
    
    // Messages Panel
    storiesFromRegion: "Stories from this region",
    region: "Region",
    setupRequired: "Setup required",
    setupMessage: "to enable message sharing.",
    sharePrompt: "Share something kind, hopeful, or encouraging about this region 💙",
    shareButton: "Share",
    sharing: "Sharing...",
    loadingMessages: "Loading messages...",
    noMessages: "No messages yet.",
    beFirst: "Be the first to share.",
    messageLengthLimit: "1-200 characters",
    cooldownInfo: "60 second cooldown between posts",
    characterCount: "characters",
    
    // Info Banner
    infoBanner: "Click a region on the map to select it, then share your message with the community.",
    
    // Statistics
    totalUsers: "Total Users",
    totalMessages: "Total Messages",
    totalEmojis: "Total Reactions",
    
    // Footer
    madeWith: "Made with care for Myanmar 🇲🇲",
    poweredBy: "Powered by Base",
    github: "GitHub",
  },
  my: {
    // Hero Section
    title: "ချစ်စရာ့ မြန်မာပြည်",
    subtitle: "မြန်မာပြည်အနှံ့ ဒေသအသီးသီးမှ မျှော်လင့်ချက်၊ မေတ္တာတရားနှင့် အမှတ်တရ ဇာတ်လမ်းလေးများကို မျှဝေရာနေရာ။",
    connectButton: "စတင်ရန် Wallet ချိတ်ဆက်ပါ",
    
    // Auth Card
    welcome: "ကြိုဆိုပါတယ်",
    welcomeMessage: "မြန်မာ့ဒေသများကို လေ့လာပြီး မိမိ၏ခံစားချက်များကို အားလုံးနှင့်မျှဝေနိုင်ရန် Wallet ချိတ်ဆက်ပါ။",
    connectWith: "ချိတ်ဆက်မည့်နည်းလမ်း",
    
    // Status Bar
    signedIn: "အကောင့်ဝင်ထားသည်",
    notConnected: "ချိတ်ဆက်မထားပါ",
    disconnect: "အကောင့်ထွက်ရန်",
    
    // Map Panel
    selectRegion: "ဒေသရွေးချယ်ပါ",
    noSelection: "ဒေသရွေးချယ်ထားခြင်းမရှိပါ",
    connectToView: "မြေပုံကြည့်ရှုရန် Wallet ချိတ်ဆက်ပါ",
    
    // Messages Panel
    storiesFromRegion: "ဤဒေသဆိုင်ရာ အမှတ်တရ ဇာတ်လမ်းများ",
    region: "ဒေသ",
    setupRequired: "အကောင့်ပြင်ဆင်မှု လိုအပ်သည်",
    setupMessage: "- စာတိုများမျှဝေနိုင်ရန် ကနဦးပြင်ဆင်ပါ",
    sharePrompt: "ဒီဒေသအတွက် ကြည်နူးစရာ၊ မျှော်လင့်ချက် နဲ့ အားပေးစကားလေးတွေ မျှဝေပေးခဲ့ပါ 💙",
    shareButton: "မျှဝေမည်",
    sharing: "မျှဝေနေသည်...",
    loadingMessages: "စာတိုများ ရယူနေသည်...",
    noMessages: "မျှဝေထားခြင်း မရှိသေးပါ။",
    beFirst: "ပထမဆုံး မျှဝေသူ ဖြစ်ပါစေ။",
    messageLengthLimit: "၁-၂၀၀ စာလုံး",
    cooldownInfo: "တစ်ခါမျှဝေပီးတိုင်း ၆၀ စက္ကန့် စောင့်ဆိုင်းရမည်",
    characterCount: "စာလုံး",
    
    // Info Banner
    infoBanner: "မြေပုံပေါ်ရှိ မိမိနှစ်သက်ရာ ဒေသကိုနှိပ်ပြီး အမှတ်တရ စာတိုလေးတွေ မျှဝေလိုက်ပါ။",
    
    // Statistics
    totalUsers: "စုစုပေါင်း အသုံးပြုသူ",
    totalMessages: "စုစုပေါင်း မက်ဆေ့ခ်ျများ",
    totalEmojis: "စုစုပေါင်း တုံ့ပြန်မှုများ",
    
    // Footer
    madeWith: "မြန်မာပြည်အတွက် စေတနာဖြင့် ဖန်တီးထားသည် 🇲🇲",
    poweredBy: "Base ကွန်ရက်အသုံးပြုထားသည်",
    github: "GitHub",
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;