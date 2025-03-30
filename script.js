// Global variables
let map;
let marker;
let currentLocation = null;
let weatherData = null;
let soilData = null;
let chatHistory = [];

// Comprehensive translations for all languages
const translations = {
    'bn': {
        // Header & Navigation
        'Kisan Sahayata': 'কৃষক সহায়তা',
        'Welcome to Kisan Sahayata': 'কৃষক সহায়তায় স্বাগতম',
        'Your Digital Farming Assistant': 'আপনার ডিজিটাল কৃষি সহকারী',
        
        // Weather Section
        'Weather Information': 'আবহাওয়ার তথ্য',
        'Temperature': 'তাপমাত্রা',
        'Humidity': 'আর্দ্রতা',
        'Rainfall': 'বৃষ্টিপাত',
        'Wind Speed': 'বাতাসের গতি',
        
        // Soil Section
        'Soil Information': 'মাটির তথ্য',
        'Soil Moisture': 'মাটির আর্দ্রতা',
        'pH Level': 'পিএইচ মাত্রা',
        
        // Disease Detection
        'Crop Disease Detection': 'ফসলের রোগ সনাক্তকরণ',
        'Upload Image': 'ছবি আপলোড করুন',
        'Detect Disease': 'রোগ সনাক্ত করুন',
        'Detection Result': 'সনাক্তকরণের ফলাফল',
        'Disease': 'রোগ',
        'Confidence': 'নির্ভরযোগ্যতা',
        'Recommended Solutions': 'প্রস্তাবিত সমাধান',
        
        // AI Assistant
        'AI Assistant': 'কৃত্রিম বুদ্ধিমত্তা সহকারী',
        'Ask your question...': 'আপনার প্রশ্ন জিজ্ঞাসা করুন...',
        'Send': 'পাঠান',
        'Type your message': 'আপনার বার্তা টাইপ করুন',
        
        // Recommendations
        'AI Recommendations': 'কৃত্রিম বুদ্ধিমত্তা সুপারিশ',
        'Fertilizer Recommendations': 'সারের সুপারিশ',
        'Pest Control': 'কীটপতঙ্গ নিয়ন্ত্রণ',
        
        // Common Actions
        'Search': 'অনুসন্ধান',
        'Submit': 'জমা দিন',
        'Cancel': 'বাতিল',
        'Save': 'সংরক্ষণ',
        'Delete': 'মুছে ফেলুন',
        'Update': 'আপডেট',
        'Loading': 'লোড হচ্ছে',
        'Error': 'ত্রুটি',
        'Success': 'সফল',
        'Warning': 'সতর্কতা',
        'Use Current Location': 'বর্তমান অবস্থান ব্যবহার করুন',
        'Search for your farm location': 'আপনার খামারের অবস্থান খুঁজুন'
    },
    'pa': {
        // Header & Navigation
        'Kisan Sahayata': 'ਕਿਸਾਨ ਸਹਾਇਤਾ',
        'Welcome to Kisan Sahayata': 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
        'Your Digital Farming Assistant': 'ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ',
        
        // Weather Section
        'Weather Information': 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ',
        'Temperature': 'ਤਾਪਮਾਨ',
        'Humidity': 'ਨਮੀ',
        'Rainfall': 'ਮੀਂਹ',
        'Wind Speed': 'ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ',
        
        // Soil Section
        'Soil Information': 'ਮਿੱਟੀ ਦੀ ਜਾਣਕਾਰੀ',
        'Soil Moisture': 'ਮਿੱਟੀ ਦੀ ਨਮੀ',
        'pH Level': 'ਪੀਐਚ ਪੱਧਰ',
        
        // Disease Detection
        'Crop Disease Detection': 'ਫਸਲ ਰੋਗ ਦੀ ਪਛਾਣ',
        'Upload Image': 'ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
        'Detect Disease': 'ਰੋਗ ਦੀ ਪਛਾਣ ਕਰੋ',
        'Detection Result': 'ਪਛਾਣ ਦਾ ਨਤੀਜਾ',
        'Disease': 'ਰੋਗ',
        'Confidence': 'ਭਰੋਸਾ',
        'Recommended Solutions': 'ਸਿਫਾਰਸ਼ੀ ਹੱਲ',
        
        // AI Assistant
        'AI Assistant': 'ਏਆਈ ਸਹਾਇਕ',
        'Ask your question...': 'ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ...',
        'Send': 'ਭੇਜੋ',
        'Type your message': 'ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ',
        
        // Recommendations
        'AI Recommendations': 'ਏਆਈ ਸਿਫਾਰਸ਼ਾਂ',
        'Fertilizer Recommendations': 'ਖਾਦ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ',
        'Pest Control': 'ਕੀੜੇ ਨਿਯੰਤਰਣ',
        
        // Common Actions
        'Search': 'ਖੋਜ',
        'Submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
        'Cancel': 'ਰੱਦ ਕਰੋ',
        'Save': 'ਸੰਭਾਲੋ',
        'Delete': 'ਮਿਟਾਓ',
        'Update': 'ਅਪਡੇਟ',
        'Loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
        'Error': 'ਗਲਤੀ',
        'Success': 'ਸਫਲ',
        'Warning': 'ਚੇਤਾਵਨੀ',
        'Use Current Location': 'ਮੌਜੂਦਾ ਸਥਾਨ ਵਰਤੋ',
        'Search for your farm location': 'ਆਪਣੇ ਖੇਤ ਦਾ ਸਥਾਨ ਖੋਜੋ'
    },
    'hi': {
        // Header & Navigation
        'Kisan Sahayata': 'किसान सहायता',
        'Welcome to Kisan Sahayata': 'किसान सहायता में आपका स्वागत है',
        'Your Digital Farming Assistant': 'आपका डिजिटल कृषि सहायक',
        
        // Weather Section
        'Weather Information': 'मौसम की जानकारी',
        'Temperature': 'तापमान',
        'Humidity': 'नमी',
        'Rainfall': 'वर्षा',
        'Wind Speed': 'हवा की गति',
        
        // Soil Section
        'Soil Information': 'मिट्टी की जानकारी',
        'Soil Moisture': 'मिट्टी की नमी',
        'pH Level': 'पीएच स्तर',
        
        // Disease Detection
        'Crop Disease Detection': 'फसल रोग पहचान',
        'Upload Image': 'छवि अपलोड करें',
        'Detect Disease': 'रोग का पता लगाएं',
        'Detection Result': 'पहचान परिणाम',
        'Disease': 'रोग',
        'Confidence': 'विश्वास स्तर',
        'Recommended Solutions': 'अनुशंसित समाधान',
        
        // AI Assistant
        'AI Assistant': 'एआई सहायक',
        'Ask your question...': 'अपना प्रश्न पूछें...',
        'Send': 'भेजें',
        'Type your message': 'अपना संदेश टाइप करें',
        
        // Common Actions
        'Search': 'खोजें',
        'Submit': 'जमा करें',
        'Cancel': 'रद्द करें',
        'Save': 'सहेजें',
        'Delete': 'हटाएं',
        'Update': 'अपडेट करें',
        'Loading': 'लोड हो रहा है',
        'Error': 'त्रुटि',
        'Success': 'सफल',
        'Warning': 'चेतावनी',
        'Use Current Location': 'वर्तमान स्थान का उपयोग करें',
        'Search for your farm location': 'अपने खेत का स्थान खोजें'
    },
    'ta': {
        // Header & Navigation
        'Kisan Sahayata': 'கிசான் சஹயதா',
        'Welcome to Kisan Sahayata': 'கிசான் சஹயதாவிற்கு வரவேற்கிறோம்',
        'Your Digital Farming Assistant': 'உங்கள் டிஜிட்டல் விவசாய உதவியாளர்',
        
        // Weather Section
        'Weather Information': 'வானிலை தகவல்',
        'Temperature': 'வெப்பநிலை',
        'Humidity': 'ஈரப்பதம்',
        'Rainfall': 'மழை',
        'Wind Speed': 'காற்றின் வேகம்',
        
        // Soil Section
        'Soil Information': 'மண் தகவல்',
        'Soil Moisture': 'மண் ஈரப்பதம்',
        'pH Level': 'பிஹெச் அளவு',
        
        // Disease Detection
        'Crop Disease Detection': 'பயிர் நோய் கண்டறிதல்',
        'Upload Image': 'படத்தை பதிவேற்றவும்',
        'Detect Disease': 'நோயை கண்டறியவும்',
        'Detection Result': 'கண்டறிதல் முடிவு',
        'Disease': 'நோய்',
        'Confidence': 'நம்பகத்தன்மை',
        'Recommended Solutions': 'பரிந்துரைக்கப்பட்ட தீர்வுகள்',
        
        // AI Assistant
        'AI Assistant': 'செயற்கை நுண்ணறிவு உதவியாளர்',
        'Ask your question...': 'உங்கள் கேள்வியை கேளுங்கள்...',
        'Send': 'அனுப்பு',
        'Type your message': 'உங்கள் செய்தியை தட்டச்சு செய்யவும்',
        
        // Common Actions
        'Search': 'தேடு',
        'Submit': 'சமர்ப்பி',
        'Cancel': 'ரத்து செய்',
        'Save': 'சேமி',
        'Delete': 'அழி',
        'Update': 'புதுப்பி',
        'Loading': 'ஏற்றுகிறது',
        'Error': 'பிழை',
        'Success': 'வெற்றி',
        'Warning': 'எச்சரிக்கை',
        'Use Current Location': 'தற்போதைய இடத்தை பயன்படுத்து',
        'Search for your farm location': 'உங்கள் பண்ணை இடத்தை தேடுங்கள்'
    },
    'te': {
        // Header & Navigation
        'Kisan Sahayata': 'కిసాన్ సహాయత',
        'Welcome to Kisan Sahayata': 'కిసాన్ సహాయతకు స్వాగతం',
        'Your Digital Farming Assistant': 'మీ డిజిటల్ వ్యవసాయ సహాయకుడు',
        
        // Weather Section
        'Weather Information': 'వాతావరణ సమాచారం',
        'Temperature': 'ఉష్ణోగ్రత',
        'Humidity': 'తేమ',
        'Rainfall': 'వర్షపాతం',
        'Wind Speed': 'గాలి వేగం',
        
        // Soil Section
        'Soil Information': 'నేల సమాచారం',
        'Soil Moisture': 'నేల తేమ',
        'pH Level': 'పిహెచ్ స్థాయి',
        
        // Disease Detection
        'Crop Disease Detection': 'పంట వ్యాధి గుర్తింపు',
        'Upload Image': 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
        'Detect Disease': 'వ్యాధిని గుర్తించండి',
        'Detection Result': 'గుర్తింపు ఫలితం',
        'Disease': 'వ్యాధి',
        'Confidence': 'నమ్మకం',
        'Recommended Solutions': 'సిఫార్సు చేయబడిన పరిష్కారాలు',
        
        // AI Assistant
        'AI Assistant': 'కృత్రిమ మేధ సహాయకుడు',
        'Ask your question...': 'మీ ప్రశ్నను అడగండి...',
        'Send': 'పంపు',
        'Type your message': 'మీ సందేశాన్ని టైప్ చేయండి',
        
        // Common Actions
        'Search': 'వెతుకు',
        'Submit': 'సమర్పించు',
        'Cancel': 'రద్దు చేయి',
        'Save': 'భద్రపరచు',
        'Delete': 'తొలగించు',
        'Update': 'నవీకరించు',
        'Loading': 'లోడ్ అవుతోంది',
        'Error': 'లోపం',
        'Success': 'విజయం',
        'Warning': 'హెచ్చరిక',
        'Use Current Location': 'ప్రస్తుత స్థానాన్ని ఉపయోగించండి',
        'Search for your farm location': 'మీ పొలం స్థానాన్ని వెతకండి'
    },
    'kn': {
        // Header & Navigation
        'Kisan Sahayata': 'ಕಿಸಾನ್ ಸಹಾಯತ',
        'Welcome to Kisan Sahayata': 'ಕಿಸಾನ್ ಸಹಾಯತಕ್ಕೆ ಸ್ವಾಗತ',
        'Your Digital Farming Assistant': 'ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಕೃಷಿ ಸಹಾಯಕ',
        
        // Weather Section
        'Weather Information': 'ಹವಾಮಾನ ಮಾಹಿತಿ',
        'Temperature': 'ತಾಪಮಾನ',
        'Humidity': 'ತೇವಾಂಶ',
        'Rainfall': 'ಮಳೆ',
        'Wind Speed': 'ಗಾಳಿಯ ವೇಗ',
        
        // Soil Section
        'Soil Information': 'ಮಣ್ಣಿನ ಮಾಹಿತಿ',
        'Soil Moisture': 'ಮಣ್ಣಿನ ತೇವಾಂಶ',
        'pH Level': 'ಪಿಹೆಚ್ ಮಟ್ಟ',
        
        // Disease Detection
        'Crop Disease Detection': 'ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
        'Upload Image': 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
        'Detect Disease': 'ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಿ',
        'Detection Result': 'ಪತ್ತೆ ಫಲಿತಾಂಶ',
        'Disease': 'ರೋಗ',
        'Confidence': 'ವಿಶ್ವಾಸ',
        'Recommended Solutions': 'ಶಿಫಾರಸು ಮಾಡಿದ ಪರಿಹಾರಗಳು',
        
        // AI Assistant
        'AI Assistant': 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಸಹಾಯಕ',
        'Ask your question...': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...',
        'Send': 'ಕಳುಹಿಸಿ',
        'Type your message': 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ',
        
        // Common Actions
        'Search': 'ಹುಡುಕಿ',
        'Submit': 'ಸಲ್ಲಿಸಿ',
        'Cancel': 'ರದ್ದುಮಾಡಿ',
        'Save': 'ಉಳಿಸಿ',
        'Delete': 'ಅಳಿಸಿ',
        'Update': 'ನವೀಕರಿಸಿ',
        'Loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ',
        'Error': 'ದೋಷ',
        'Success': 'ಯಶಸ್ಸು',
        'Warning': 'ಎಚ್ಚರಿಕೆ',
        'Use Current Location': 'ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ',
        'Search for your farm location': 'ನಿಮ್ಮ ಕೃಷಿ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ'
    },
    'mr': {
        // Header & Navigation
        'Kisan Sahayata': 'किसान सहाय्यता',
        'Welcome to Kisan Sahayata': 'किसान सहाय्यतामध्ये आपले स्वागत आहे',
        'Your Digital Farming Assistant': 'आपला डिजिटल शेती सहाय्यक',
        
        // Weather Section
        'Weather Information': 'हवामान माहिती',
        'Temperature': 'तापमान',
        'Humidity': 'आर्द्रता',
        'Rainfall': 'पाऊस',
        'Wind Speed': 'वाऱ्याचा वेग',
        
        // Soil Section
        'Soil Information': 'मातीची माहिती',
        'Soil Moisture': 'मातीची आर्द्रता',
        'pH Level': 'पीएच स्तर',
        
        // Disease Detection
        'Crop Disease Detection': 'पीक रोग शोध',
        'Upload Image': 'प्रतिमा अपलोड करा',
        'Detect Disease': 'रोग शोधा',
        'Detection Result': 'शोध निकाल',
        'Disease': 'रोग',
        'Confidence': 'विश्वास',
        'Recommended Solutions': 'शिफारस केलेली उपाय',
        
        // AI Assistant
        'AI Assistant': 'कृत्रिम बुद्धिमत्ता सहाय्यक',
        'Ask your question...': 'आपला प्रश्न विचारा...',
        'Send': 'पाठवा',
        'Type your message': 'आपला संदेश टाइप करा',
        
        // Common Actions
        'Search': 'शोधा',
        'Submit': 'सबमिट करा',
        'Cancel': 'रद्द करा',
        'Save': 'जतन करा',
        'Delete': 'हटवा',
        'Update': 'अपडेट करा',
        'Loading': 'लोड होत आहे',
        'Error': 'त्रुटी',
        'Success': 'यशस्वी',
        'Warning': 'चेतावणी',
        'Use Current Location': 'वर्तमान स्थान वापरा',
        'Search for your farm location': 'आपल्या शेताचे स्थान शोधा'
    },
    'gu': {
        // Header & Navigation
        'Kisan Sahayata': 'કિસાન સહાયતા',
        'Welcome to Kisan Sahayata': 'કિસાન સહાયતામાં આપનું સ્વાગત છે',
        'Your Digital Farming Assistant': 'તમારો ડિજિટલ ખેતી સહાયક',
        
        // Weather Section
        'Weather Information': 'હવામાન માહિતી',
        'Temperature': 'તાપમાન',
        'Humidity': 'ભેજ',
        'Rainfall': 'વરસાદ',
        'Wind Speed': 'પવનની ગતિ',
        
        // Soil Section
        'Soil Information': 'જમીનની માહિતી',
        'Soil Moisture': 'જમીનનો ભેજ',
        'pH Level': 'પીએચ સ્તર',
        
        // Disease Detection
        'Crop Disease Detection': 'પાક રોગ શોધ',
        'Upload Image': 'છબી અપલોડ કરો',
        'Detect Disease': 'રોગ શોધો',
        'Detection Result': 'શોધ પરિણામ',
        'Disease': 'રોગ',
        'Confidence': 'વિશ્વાસ',
        'Recommended Solutions': 'ભલામણ કરેલા ઉકેલો',
        
        // AI Assistant
        'AI Assistant': 'એઆઈ સહાયક',
        'Ask your question...': 'તમારો પ્રશ્ન પૂછો...',
        'Send': 'મોકલો',
        'Type your message': 'તમારો સંદેશ ટાઈપ કરો',
        
        // Common Actions
        'Search': 'શોધો',
        'Submit': 'સબમિટ કરો',
        'Cancel': 'રદ કરો',
        'Save': 'સાચવો',
        'Delete': 'કાઢી નાખો',
        'Update': 'અપડેટ કરો',
        'Loading': 'લોડ થઈ રહ્યું છે',
        'Error': 'ભૂલ',
        'Success': 'સફળ',
        'Warning': 'ચેતવણી',
        'Use Current Location': 'વર્તમાન સ્થાન વાપરો',
        'Search for your farm location': 'તમારા ખેતરનું સ્થાન શોધો'
    },
    'bn': {
        // Header & Navigation
        'Kisan Sahayata': 'কৃষক সহায়তা',
        'Welcome to Kisan Sahayata': 'কৃষক সহায়তায় আপনাকে স্বাগতম',
        'Your Digital Farming Assistant': 'আপনার ডিজিটাল কৃষি সহকারী',
        
        // Weather Section
        'Weather Information': 'আবহাওয়ার তথ্য',
        'Temperature': 'তাপমাত্রা',
        'Humidity': 'আর্দ্রতা',
        'Rainfall': 'বৃষ্টিপাত',
        'Wind Speed': 'বাতাসের গতি',
        
        // Soil Section
        'Soil Information': 'মাটির তথ্য',
        'Soil Moisture': 'মাটির আর্দ্রতা',
        'pH Level': 'পিএইচ মাত্রা',
        
        // Disease Detection
        'Crop Disease Detection': 'ফসলের রোগ সনাক্তকরণ',
        'Upload Image': 'ছবি আপলোড করুন',
        'Detect Disease': 'রোগ সনাক্ত করুন',
        'Detection Result': 'সনাক্তকরণের ফলাফল',
        'Disease': 'রোগ',
        'Confidence': 'আত্মবিশ্বাস',
        'Recommended Solutions': 'সুপারিশকৃত সমাধান',
        
        // AI Assistant
        'AI Assistant': 'কৃত্রিম বুদ্ধিমত্তা সহকারী',
        'Ask your question...': 'আপনার প্রশ্ন জিজ্ঞাসা করুন...',
        'Send': 'পাঠান',
        'Type your message': 'আপনার বার্তা টাইপ করুন',
        
        // Common Actions
        'Search': 'অনুসন্ধান',
        'Submit': 'জমা দিন',
        'Cancel': 'বাতিল',
        'Save': 'সংরক্ষণ',
        'Delete': 'মুছে ফেলুন',
        'Update': 'হালনাগাদ',
        'Loading': 'লোড হচ্ছে',
        'Error': 'ত্রুটি',
        'Success': 'সফল',
        'Warning': 'সতর্কতা',
        'Use Current Location': 'বর্তমান অবস্থান ব্যবহার করুন',
        'Search for your farm location': 'আপনার খামারের অবস্থান খুঁজুন'
    },
    'pa': {
        // Header & Navigation
        'Kisan Sahayata': 'ਕਿਸਾਨ ਸਹਾਇਤਾ',
        'Welcome to Kisan Sahayata': 'ਕਿਸਾਨ ਸਹਾਇਤਾ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ',
        'Your Digital Farming Assistant': 'ਤੁਹਾਡਾ ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ',
        
        // Weather Section
        'Weather Information': 'ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ',
        'Temperature': 'ਤਾਪਮਾਨ',
        'Humidity': 'ਨਮੀ',
        'Rainfall': 'ਮੀਂਹ',
        'Wind Speed': 'ਹਵਾ ਦੀ ਰਫ਼ਤਾਰ',
        
        // Soil Section
        'Soil Information': 'ਮਿੱਟੀ ਦੀ ਜਾਣਕਾਰੀ',
        'Soil Moisture': 'ਮਿੱਟੀ ਦੀ ਨਮੀ',
        'pH Level': 'ਪੀਐਚ ਪੱਧਰ',
        
        // Disease Detection
        'Crop Disease Detection': 'ਫਸਲ ਰੋਗ ਦੀ ਪਛਾਣ',
        'Upload Image': 'ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
        'Detect Disease': 'ਰੋਗ ਦੀ ਪਛਾਣ ਕਰੋ',
        'Detection Result': 'ਪਛਾਣ ਦਾ ਨਤੀਜਾ',
        'Disease': 'ਰੋਗ',
        'Confidence': 'ਭਰੋਸਾ',
        'Recommended Solutions': 'ਸਿਫਾਰਸ਼ੀ ਹੱਲ',
        
        // AI Assistant
        'AI Assistant': 'ਏਆਈ ਸਹਾਇਕ',
        'Ask your question...': 'ਆਪਣਾ ਸਵਾਲ ਪੁੱਛੋ...',
        'Send': 'ਭੇਜੋ',
        'Type your message': 'ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ',
        
        // Recommendations
        'AI Recommendations': 'ਏਆਈ ਸਿਫਾਰਸ਼ਾਂ',
        'Fertilizer Recommendations': 'ਖਾਦ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ',
        'Pest Control': 'ਕੀੜੇ ਨਿਯੰਤਰਣ',
        
        // Common Actions
        'Search': 'ਖੋਜ',
        'Submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
        'Cancel': 'ਰੱਦ ਕਰੋ',
        'Save': 'ਸੰਭਾਲੋ',
        'Delete': 'ਮਿਟਾਓ',
        'Update': 'ਅਪਡੇਟ',
        'Loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
        'Error': 'ਗਲਤੀ',
        'Success': 'ਸਫਲ',
        'Warning': 'ਚੇਤਾਵਨੀ',
        'Use Current Location': 'ਮੌਜੂਦਾ ਸਥਾਨ ਵਰਤੋ',
        'Search for your farm location': 'ਆਪਣੇ ਖੇਤ ਦਾ ਸਥਾਨ ਖੋਜੋ'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    setupLanguageSelector();
    setupVoiceRecognition();
    loadInitialData();
    initializeTranslation();
});

// Google Maps initialization
function initializeMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5
    });

    const input = document.getElementById('locationSearch');
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        setMapToLocation(place.geometry.location);
    });

    // Add event listener for Enter key
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = input.value.trim();
            if (query) {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: query }, (results, status) => {
                    if (status === 'OK' && results[0].geometry.location) {
                        setMapToLocation(results[0].geometry.location);
                    } else {
                        alert('Place not found. Please try again.');
                    }
                });
            }
        }
    });
}

function setMapToLocation(location) {
    map.setCenter(location);
    map.setZoom(15);

    if (marker) {
        marker.setMap(null);
    }

    marker = new google.maps.Marker({
        map: map,
        position: location
    });

    currentLocation = {
        lat: location.lat(),
        lng: location.lng()
    };

    updateWeatherData();
    updateSoilData();
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                map.setZoom(15);

                if (marker) {
                    marker.setMap(null);
                }

                marker = new google.maps.Marker({
                    map: map,
                    position: pos
                });

                currentLocation = pos;
                updateWeatherData();
                updateSoilData();
            },
            (error) => {
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

// Replace with your actual weather API key
const WEATHER_API_KEY = 'e5cdeaa3c02aa77c73e8e41c14e9080e';

async function updateWeatherData() {
    if (!currentLocation) return;

    try {
        console.log('Fetching weather data for location:', currentLocation); // Debug log

        // Fetch weather data using the provided API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lng}&units=metric&appid=${WEATHER_API_KEY}`);
        
        console.log('Weather API response status:', response.status); // Debug log

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Weather API Error:', errorData); // Debug log
            throw new Error(`Weather API Error: ${errorData.message}`);
        }

        const weatherData = await response.json();
        console.log('Weather data received:', weatherData); // Debug log

        // Update the weather information on the page
        document.getElementById('temperature').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        document.getElementById('rainfall').textContent = weatherData.rain ? `${weatherData.rain['1h']}mm` : '0mm';
        document.getElementById('windSpeed').textContent = `${weatherData.wind.speed}km/h`;

        updateRecommendations();
    } catch (error) {
        console.error('Error fetching weather data:', error); // Debug log
        alert('Unable to fetch weather data. Please try again later.');
    }
}

// Soil data integration
async function updateSoilData() {
    if (!currentLocation) {
        console.error('Current location is not set. Cannot fetch soil data.');
        alert('Please set your location first.');
        return;
    }

    try {
        console.log('Generating random soil data for location:', currentLocation); // Debug log

        // Generate random values for soil pH and moisture
        const phValue = (Math.random() * 13 + 1).toFixed(2); // Random value between 1 and 14
        const moistureValue = `${(Math.random() * 13 + 1).toFixed(2)}%`; // Random value between 1% and 14%

        console.log('Generated soil data:', { ph: phValue, moisture: moistureValue }); // Debug log

        // Update the soil information on the page
        document.getElementById('soilMoisture').textContent = moistureValue;
        document.getElementById('soilPH').textContent = phValue;

        soilData = { ph: phValue, moisture: moistureValue }; // Update global soilData
        updateRecommendations();
    } catch (error) {
        console.error('Error generating soil data:', error); // Debug log
        alert('Unable to generate soil data. Please try again later.');
    }
}

// Disease detection
async function detectDisease() {
    const imageInput = document.getElementById('cropImage');
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image first');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('image', file);

        // Replace with actual disease detection API endpoint
        const response = await fetch('/api/detect-disease', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        displayDiseaseResult(result);
    } catch (error) {
        console.error('Error detecting disease:', error);
        alert('Error detecting disease. Please try again.');
    }
}

function displayDiseaseResult(result) {
    const resultDiv = document.getElementById('diseaseResult');
    resultDiv.innerHTML = `
        <h3>Detection Result</h3>
        <p>Disease: ${result.disease}</p>
        <p>Confidence: ${result.confidence}%</p>
        <h4>Recommended Solutions:</h4>
        <ul>
            ${result.solutions.map(solution => `<li>${solution}</li>`).join('')}
        </ul>
    `;
}

// AI Chatbot
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    addMessageToChat('user', message);
    input.value = '';

    // Replace with actual AI chatbot API endpoint
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        addMessageToChat('assistant', data.response);
        speakResponse(data.response);
    })
    .catch(error => {
        console.error('Error getting chatbot response:', error);
        addMessageToChat('assistant', 'Sorry, I encountered an error. Please try again.');
    });
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Voice recognition setup
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            document.getElementById('userInput').value = text;
        };

        window.recognition = recognition;
    }
}

function startVoiceInput() {
    if (window.recognition) {
        window.recognition.start();
    } else {
        alert('Voice recognition is not supported in your browser');
    }
}

function speakResponse(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
}

// Language support
function setupLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', handleLanguageChange);
}

function handleLanguageChange(event) {
    const selectedLanguage = event.target.value;
    console.log('Language changed to:', selectedLanguage); // Debug log
    translatePage(selectedLanguage);
}

function translatePage(language) {
    // Debug log
    console.log('Translating to:', language);
    
    if (language === 'en') {
        resetToEnglish();
        return;
    }

    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const originalText = element.getAttribute('data-original-text') || element.textContent;
        
        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', originalText);
        }

        // Translate if translation exists
        if (translations[language] && translations[language][originalText]) {
            element.textContent = translations[language][originalText];
        }
    });
}

function resetToEnglish() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.textContent = originalText;
        }
    });
}

// AI Recommendations
function updateRecommendations() {
    if (!weatherData || !soilData) return;

    // Replace with actual AI recommendations API endpoint
    fetch('/api/recommendations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            weather: weatherData,
            soil: soilData
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('fertilizerRec').innerHTML = formatRecommendations(data.fertilizers);
        document.getElementById('pestControlRec').innerHTML = formatRecommendations(data.pestControl);
    })
    .catch(error => {
        console.error('Error getting recommendations:', error);
    });
}

function formatRecommendations(recommendations) {
    return `
        <ul>
            ${recommendations.map(rec => `
                <li>
                    <strong>${rec.name}</strong>
                    <p>${rec.description}</p>
                    <small>Confidence: ${rec.confidence}%</small>
                </li>
            `).join('')}
        </ul>
    `;
}

// Initial data load
function loadInitialData() {
    // Load any saved user preferences
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
            translatePage(savedLanguage);
        }
    }
}

// Function to initialize translation attributes
function initializeTranslation() {
    // Select all elements that contain text
    const textElements = document.querySelectorAll('*');
    textElements.forEach(element => {
        // Check if element has direct text content
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            const text = element.textContent.trim();
            if (text) {
                element.setAttribute('data-translate', '');
                element.setAttribute('data-original-text', text);
            }
        }
        
        // Handle placeholders
        if (element.placeholder) {
            element.setAttribute('data-translate-placeholder', '');
            element.setAttribute('data-original-placeholder', element.placeholder);
        }
        
        // Handle value attributes for buttons
        if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
            if (element.value) {
                element.setAttribute('data-translate-value', '');
                element.setAttribute('data-original-value', element.value);
            }
        }
    });
}

// Function to translate the page
function translatePage(language) {
    if (language === 'en') {
        resetToEnglish();
        return;
    }

    const languageTranslations = translations[language];
    if (!languageTranslations) {
        console.error('Translations not available for:', language);
        return;
    }

    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const originalText = element.getAttribute('data-original-text') || element.textContent.trim();
        
        // Store original text if not already stored
        if (!element.getAttribute('data-original-text')) {
            element.setAttribute('data-original-text', originalText);
        }

        // Translate if translation exists
        if (languageTranslations[originalText]) {
            element.textContent = languageTranslations[originalText];
        }
    });

    // Update document language
    document.documentElement.lang = language;
    localStorage.setItem('preferredLanguage', language);
}

// Function to reset to English
function resetToEnglish() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.textContent = originalText;
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const originalPlaceholder = element.getAttribute('data-original-placeholder');
        if (originalPlaceholder) {
            element.placeholder = originalPlaceholder;
        }
    });

    document.querySelectorAll('[data-translate-value]').forEach(element => {
        const originalValue = element.getAttribute('data-original-value');
        if (originalValue) {
            element.value = originalValue;
        }
    });

    document.documentElement.lang = 'en';
    localStorage.setItem('preferredLanguage', 'en');
}

// Handle language change event
function handleLanguageChange(event) {
    const selectedLanguage = event.target.value;
    translatePage(selectedLanguage);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTranslation();
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
            translatePage(savedLanguage);
        }
    }
});
function searchLocation() {
    const input = document.getElementById('locationSearch');
    const query = input.value.trim();
    if (query) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: query }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
                const location = results[0].geometry.location;
                setMapToLocation(location);
            } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                alert('No results found for the entered location. Please try a different query.');
            } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                alert('You have exceeded the request limit. Please try again later.');
            } else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
                alert('Request denied. Please check your API key and permissions.');
            } else if (status === google.maps.GeocoderStatus.INVALID_REQUEST) {
                alert('Invalid request. Please check the entered location.');
            } else {
                alert('An error occurred while searching for the location. Please try again.');
                console.error('Geocoder error:', status);
            }
        });
    } else {
        alert('Please enter a location to search.');
    }
}

function redirectToScheme() {
    window.location.href = "https://agriwelfare.gov.in/en/FarmWelfare";
}