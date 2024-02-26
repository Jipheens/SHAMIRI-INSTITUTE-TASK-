import React from 'react';

type Props = {
  className?: string;
};

export default function Logo({ className = '' }: Props) {
  return (
    <img
      src={'https://flatlogic.com/logo.svg'}
      className={className}
      alt={'Flatlogic logo'}
    ></img>
  );
}
