import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCWx4mrML-PWsSJh8z05LmeW1X5pYq8AV8';
const genAI = new GoogleGenerativeAI(API_KEY);


const analyzeImageWithAI = async (imageData) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Base64'ten Blob'a dönüştürme
        const base64Data = imageData.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        
        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        
        const blob = new Blob(byteArrays, { type: 'image/jpeg' });
        
        // Resmi analiz et
        const prompt = "Bu ürün resmini analiz et ve şu bilgileri ver:\n" +
                      "1. Ürünün durumu (yeni, ikinci el, hasarlı vb.)\n" +
                      "2. Ürünün markası/modeli (eğer görünüyorsa)\n" +
                      "3. Ürünün genel kalitesi\n" +
                      "4. Görünür kusurlar veya özellikler\n" +
                      "Lütfen kısa ve öz cevaplar ver.";

        const result = await model.generateContent([prompt, blob]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error analyzing image:', error);
        return null;
    }
};

export const analyzeImage = async (title, description) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const prompt = `Türkiye'deki  piyasada, aşağıdaki ürün için makul bir fiyat tahmini yap. 
        Sadece sayısal değeri TL cinsinden döndür, başka açıklama yapma.
        
        Ürün Başlığı: ${title}
        Ürün Açıklaması: ${description}
        
        Örnek yanıt formatı: 1500`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Sadece sayısal değeri al
        const price = text.match(/\d+/);
        return price ? parseInt(price[0]) : null;
    } catch (error) {
        console.error("Error analyzing product:", error);
        return null;
    }
};

export const analyzeProductWithImage = async (imageData, title, description) => {
    try {
        // Resim analizi
        const imageAnalysis = await analyzeImageWithAI(imageData);
        
        // Fiyat analizi
        const priceAnalysis = await analyzeImage(title, description);
        
        // Sonuçları birleştir
        return {
            imageAnalysis,
            priceAnalysis,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error("Error in combined analysis:", error);
        return null;
    }
}; 