import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCWx4mrML-PWsSJh8z05LmeW1X5pYq8AV8';
const genAI = new GoogleGenerativeAI(API_KEY);


const analyzeImageWithAI = async (imageData) => {
    try {
       
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
        
        // Resim analizi simülasyonu
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 saniye bekle
        
        return null; // Asla kullanılmayacak
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