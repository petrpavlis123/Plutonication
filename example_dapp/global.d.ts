import { PlutonicationModal } from "@plutonication/plutonication";
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'plutonication-modal': React.DetailedHTMLProps<React.HTMLAttributes<PlutonicationModal>, PlutonicationModal>;
    }
  }
}
