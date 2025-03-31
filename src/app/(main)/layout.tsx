import LayoutContainer from '@/app/components/layout/LayoutContainer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}
