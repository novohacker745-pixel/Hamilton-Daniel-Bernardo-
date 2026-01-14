
import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchTracks = async (query: string): Promise<Track[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for music tracks related to: "${query}". Include both Angolan and international artists. Return a list of 6 tracks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING },
              duration: { type: Type.STRING },
              genre: { type: Type.STRING },
              isVideo: { type: Type.BOOLEAN },
            },
            required: ["id", "title", "artist", "album", "duration", "genre", "isVideo"],
          }
        }
      }
    });

    // Use .text property directly, as it's a getter.
    const results = JSON.parse(response.text);
    return results.map((track: any) => ({
      ...track,
      coverUrl: `https://picsum.photos/seed/${track.id}/400/400`,
    }));
  } catch (error) {
    console.error("Gemini search error:", error);
    return [];
  }
};

export const generateLyrics = async (title: string, artist: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short snippet of lyrics for the song "${title}" by "${artist}". If it's a real song, provide its lyrics. If it's unknown, invent a poetic lyric in Portuguese.`,
    });
    // Use .text property directly.
    return response.text;
  } catch (error) {
    return "Letras indisponíveis no momento.";
  }
};

export const getSmartRecommendations = async (history: string[]): Promise<Track[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this listening history: ${history.join(", ")}, recommend 4 Angolan music tracks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING },
              duration: { type: Type.STRING },
              genre: { type: Type.STRING },
              isVideo: { type: Type.BOOLEAN },
            },
            required: ["id", "title", "artist", "album", "duration", "genre", "isVideo"],
          }
        }
      }
    });

    // Use .text property directly.
    const results = JSON.parse(response.text);
    return results.map((track: any) => ({
      ...track,
      coverUrl: `https://picsum.photos/seed/rec-${track.id}/400/400`,
    }));
  } catch (error) {
    return [];
  }
};
