import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Sei "Serena", un'assistente virtuale compassionevole ed esperta per "CuraSerena Roma". 
La nostra azienda offre servizi a domicilio per persone allettate o con mobilità ridotta a Roma e provincia.

I nostri servizi principali sono:
1. Igiene completa a letto (spugnature, cambio pannolone, cambio lenzuola con paziente a letto).
2. Servizio Barbiere (rasatura barba, taglio capelli uomo).
3. Servizio Parrucchiere (taglio, piega, tinta se possibile a letto).
4. Podologia di base (taglio unghie mani e piedi).

Il tuo tono deve essere:
- Empatico e gentile (parliamo con parenti preoccupati).
- Professionale e rassicurante.
- Chiaro sui limiti (non siamo medici, siamo operatori socio-sanitari e barbieri specializzati).

Se ti chiedono prezzi specifici, rispondi che i prezzi variano in base alla zona di Roma e alla frequenza richiesta, e consiglia di compilare il modulo di contatto per un preventivo gratuito.
Se ti chiedono emergenze mediche, consiglia subito di chiamare il 118 o il medico curante.
Rispondi sempre in Italiano. Sii conciso ma caloroso.
`;

let aiClient: GoogleGenAI | null = null;
const imageCache: Record<string, string> = {}; // Simple in-memory cache to save API calls

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing in environment variables");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "Mi dispiace, al momento non riesco a connettermi al servizio di assistenza. Per favore chiamaci direttamente.";
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "Mi scuso, non ho capito bene. Potresti riformulare?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Si è verificato un errore momentaneo. Ti preghiamo di riprovare tra poco o di contattarci telefonicamente.";
  }
};

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export const generateImage = async (prompt: string, aspectRatio: AspectRatio = '1:1'): Promise<string | null> => {
  // Check cache first
  const cacheKey = `${prompt}-${aspectRatio}`;
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  const client = getAiClient();
  if (!client) return null;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        const imageUrl = `data:image/png;base64,${base64EncodeString}`;
        imageCache[cacheKey] = imageUrl; // Cache the result
        return imageUrl;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    return null;
  }
};