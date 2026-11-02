"use client";

import * as React from "react";
import { Header } from "./header";
import { CommandPalette } from "./command-palette";

export function HomeClientShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  return (
    <>
      <Header onOpenCommandPalette={() => setPaletteOpen(true)} />
      {children}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
