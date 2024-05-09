import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
