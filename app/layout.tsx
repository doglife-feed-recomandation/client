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
