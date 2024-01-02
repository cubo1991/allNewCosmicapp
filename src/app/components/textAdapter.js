import { useEffect, useState } from 'react';
import AdaptText from './openAi';
// Componente de Next.js

export default function TextAdapter() {
    const [text, setText] = useState('');
    const [adaptedText, setAdaptedText] = useState('');
  
    useEffect(() => {
      if (text) {
        AdaptText(text).then(adapted => setAdaptedText(adapted));
        
      }
    }, [text]);
  
    return (
      <div>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <p>{adaptedText}</p>
      </div>
    );
  }

  