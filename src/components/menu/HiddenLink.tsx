import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  name: string | JSX.Element;
  hide?: string | undefined;
  staticRoute?: boolean | undefined;
  style?: React.CSSProperties;
}

export default function HiddenLink({ name, hide, style }: Props) {
  const router = useRouter();

  return (
    <Link href={hide || ''}>
      <a
        className={classNames(
          hide
        )}
      >
        {name}
      </a>
    </Link>
  );
}
