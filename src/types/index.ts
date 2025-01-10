import { ReactNode } from 'react';

export type BaseComponentProps<Props = object> = {
  children?: ReactNode;
  className?: string;
} & Props;
