import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { Blurhash } from 'react-blurhash';

interface LazyImageProps {
  src: string;
  alt: string;
  height?: string | number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, height = 140 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} style={{ position: 'relative', height: `${height}px` }}>
      {!loaded && (
        <Blurhash
          hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
          width={'100%'}
          height={'100%'}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      {inView && (
        <CardMedia
          component="img"
          height={`${height}px`}
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? 'block' : 'none', objectFit: 'contain', marginTop: '10px' }}
        />
      )}
    </div>
  );
};

export default LazyImage;
