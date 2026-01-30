import { useState } from 'react';
import { Sparkles, Copy, Check, Hash, MessageSquare } from 'lucide-react';
import { generateCaptions, generateHashtags } from './groq';
import './App.css';

function App() {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Aesthetic');
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedCaptions, setCopiedCaptions] = useState(false);
  const [copiedHashtags, setCopiedHashtags] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) return;

    setLoading(true);
    setCaptions([]);
    setHashtags('');

    try {
      const [captionsText, hashtagsText] = await Promise.all([
        generateCaptions(context, tone),
        generateHashtags(context)
      ]);

      // Parse captions list
      const captionsList = captionsText
        .split('\n')
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => line.replace(/^\d+\.\s*/, '').trim());

      setCaptions(captionsList);
      setHashtags(hashtagsText.trim());
    } catch (error) {
      alert('Failed to generate content. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: 'captions' | 'hashtags') => {
    navigator.clipboard.writeText(text);
    if (type === 'captions') {
      setCopiedCaptions(true);
      setTimeout(() => setCopiedCaptions(false), 2000);
    } else {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    }
  };

  return (
    <div className="app-container">
      <h1>InstaGen AI</h1>
      <p className="subtitle">Premium Captions & Hashtags in Seconds</p>

      <div className="input-group">
        <label>Describe your Instagram post</label>
        <textarea
          placeholder="e.g. Sunset at the beach with friends..."
          rows={3}
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Select Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="Aesthetic">Aesthetic</option>
          <option value="Funny">Funny</option>
          <option value="Travel">Travel</option>
          <option value="Motivational">Motivational</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      <button
        className="generate-btn"
        onClick={handleGenerate}
        disabled={loading || !context.trim()}
      >
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          <>
            <Sparkles size={18} />
            Generate Magic
          </>
        )}
      </button>

      {(captions.length > 0 || hashtags) && (
        <div className="results-section">
          {captions.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <MessageSquare size={16} className="inline mr-2" />
                  Generated Captions
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(captions.join('\n\n'), 'captions')}
                >
                  {copiedCaptions ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <ul className="caption-list">
                {captions.map((cap, i) => (
                  <li key={i} className="caption-item">
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hashtags && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Hash size={16} className="inline mr-2" />
                  Trending Hashtags
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(hashtags, 'hashtags')}
                >
                  {copiedHashtags ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <div className="hashtag-container">{hashtags}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
