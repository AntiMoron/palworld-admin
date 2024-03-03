import styles from "./layout.module.sass";
import { ConfigProvider } from "antd";
import MotionBackground from "@/components/Motion";
import Menu from "@/components/Menu";
import GlobalHeading from "@/components/GlobalHeading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.frame}>
      <Menu />
      <MotionBackground />
      <main className="w-full overflow-y-auto">
        <div className="container px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <GlobalHeading />
          <ConfigProvider>{children}</ConfigProvider>
        </div>
      </main>
    </div>
  );
}
