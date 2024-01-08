import { DOMAttributes } from 'react';
import { PlutonicationModal } from './lib//src/components/PlutonicationModal';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['plutonication-modal']: CustomElement<PlutonicationModal>;
    }
  }
}
