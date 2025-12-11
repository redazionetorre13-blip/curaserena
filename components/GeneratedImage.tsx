import React, { useState, useEffect } from 'react';
import { generateImage, AspectRatio } from '../services/geminiService';
import { Image as ImageIcon } from 'lucide-react';

interface GeneratedImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: AspectRatio;
  fallbackSrc?: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ 
  prompt, 
  alt, 
  className = "", 
  aspectRatio = '1:1',
  fallbackSrc = "https://picsum.photos/800/600?grayscale"
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchImage = async () => {
      try {
        const generatedUrl = await generateImage(prompt, aspectRatio);
        if (mounted && generatedUrl) {
          setSrc(generatedUrl);
        }
      } catch (e) {
        console.error("Failed to generate image", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      mounted = false;
    };
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`bg-slate-200 animate-pulse flex items-center justify-center ${className}`}>
        <div className="text-slate-400 flex flex-col items-center gap-2">
          <ImageIcon size={32} />
          <span className="text-xs">Generazione immagine AI...</span>
        </div>
      </div>
    );
  }

  return (
    <img 
      src={src || fallbackSrc} 
      alt={alt} 
      className={`transition-opacity duration-500 ${className}`}
    />
  );
};

export default GeneratedImage;