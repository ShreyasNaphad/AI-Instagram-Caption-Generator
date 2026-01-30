import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true // Since this is a client-side demo
});

export const generateCaptions = async (context: string, tone: string) => {
  const prompt = `You are an expert Instagram content creator.

Generate 5 short, trendy Instagram captions with emojis.

Context: ${context}
Tone: ${tone}

Return only captions as a numbered list.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
    });
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating captions:', error);
    throw error;
  }
};

export const generateHashtags = async (context: string) => {
  const prompt = `Generate 10 trending Instagram hashtags for this post:

Topic: ${context}

Return hashtags in one line starting with #.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
    });
    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating hashtags:', error);
    throw error;
  }
};
