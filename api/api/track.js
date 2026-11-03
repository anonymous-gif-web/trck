export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { type, message, ip, city, country, org, deviceModel, screenRes, time } = req.body;
    
    // سحب التوكن والآيدي من متغيرات البيئة السرية في المنصة
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    let textMsg = "";
    if (type === "visit") {
        textMsg = 
            "🚨 تم تسجيل دخول زائر جديد للموقع!\n\n" +
            "📍 الموقع: " + city + "، " + country + "\n" +
            "🌐 IP: " + ip + "\n" +
            "📡 المزود: " + org + "\n" +
            "📱 الجهاز: " + deviceModel + "\n" +
            "🖥 الشاشة: " + screenRes + "\n" +
            "⏰ الوقت: " + time;
    } else {
        textMsg = 
            "💬 رسالة جديدة من زائر!\n\n" +
            "✍️ النص المكتوب: \"" + message + "\"\n\n" +
            "------------------------\n" +
            "📍 الموقع: " + city + "، " + country + "\n" +
            "📱 الجهاز: " + deviceModel + "\n" +
            "⏰ الوقت: " + time;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: textMsg })
        });
        const data = await response.json();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
