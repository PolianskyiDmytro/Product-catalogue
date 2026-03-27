import { useState } from 'react';
import cn from 'classnames';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn(className, { skeleton: !loaded })}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn(className, { hidden: !loaded })}
      />
    </div>
  );
}
