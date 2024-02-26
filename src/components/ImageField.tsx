/* eslint-disable @next/next/no-img-element */
// Why disabled:
// avatars.dicebear.com provides svg avatars
// next/image needs dangerouslyAllowSVG option for that

import React, { ReactNode } from 'react';

type Props = {
  name: string;
  image?: object | null;
  api?: string;
  className?: string;
  children?: ReactNode;
};

export default function ImageField({
  name,
  image,
  className = '',
  children,
}: Props) {
  const imageSrc = image && image[0] ? `${image[0].publicUrl}` : '';

  return (
    <div className={className}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={name}
          className='rounded-full block h-auto w-full max-w-full bg-gray-100 dark:bg-slate-800'
        />
      )}

      {children}
    </div>
  );
}
