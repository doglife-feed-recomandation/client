import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import type { MenuProps } from 'antd/lib/menu';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: <Link href="/petInfoForm">PetInfoForm</Link>,
    },
    {
      key: 2,
      label: <Link href="/recommendResult">RecommendResult</Link>,
    },
  ];

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
              <Menu
                theme="dark"
                mode="horizontal"
                items={items}
                style={{ flex: 1, minWidth: 0 }}
              />
            </Header>
            <Content style={{ padding: '0 48px' }}>
              <div style={{ padding: 24 }}>{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
