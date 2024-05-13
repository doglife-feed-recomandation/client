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
            role="outer-padding"
            className="p-3 sm:p-3 md:p-12  flex flex-row w-screen h-screen overflow-auto"
          >
            <div role="left-padding" className="flex-[1_1_0%]"></div>

            <div className="flex-[2_1_800px] min-w-0">
              <img
                className="max-w-full max-h-12"
                src="/louishome_logo.jpeg"
                alt="logo"
              />
              <div className="w-full h-full">{children}</div>
            </div>

            <div role="right-padding" className="flex-[1_1_0%]"></div>
          </div>
        </AntdRegistry>
      </body>
    </html>
  );
}
