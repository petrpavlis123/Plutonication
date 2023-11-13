// @packages
import type { HexString } from "@polkadot/util/types";

let signature: HexString = "0x";
async function waitForSignature(): Promise<HexString> {
  signature = "0x";
  while (signature === "0x") {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  return signature;
}

export {waitForSignature};