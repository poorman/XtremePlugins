import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — XtremePlugins | WooCommerce, Shopify & WordPress Plugins',
  description:
    'Answers to common questions about XtremePlugins — subscription plans, plugin compatibility, delivery, billing, refunds, and technical requirements for our WooCommerce, Shopify, and WordPress plugins.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
