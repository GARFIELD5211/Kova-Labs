import * as React from 'react';
import {
  FloatingIconsHero,
  type FloatingIconsHeroProps,
  demoIcons,
} from '@/components/ui/floating-icons-hero-section';

export default function FloatingIconsHeroDemo() {
  return (
    <FloatingIconsHero
      title="A World of Innovation"
      subtitle="Explore a universe of possibilities with our platform, connecting you to the tools and technologies that shape the future."
      ctaText="Join the Revolution"
      ctaHref="#work"
      icons={demoIcons}
    />
  );
}
export { FloatingIconsHeroDemo };
