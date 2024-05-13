import { AntdRegistry } from '@ant-design/nextjs-registry';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <AntdRegistry>
          <img className="max-h-12" src="/louishome_logo.jpeg" alt="logo" />
          <div
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
            }}
          >
            {children}
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
