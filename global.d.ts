import React from "react";
import { PlutonicationModal } from "lib/src/components/PlutonicationModal";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'Plutonication-modal': React.DetailedHTMLProps<React.HTMLAttributes<PlutonicationModal>, PlutonicationModal>;
    }
  }
}
