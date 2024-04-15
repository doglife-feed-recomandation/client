import Link from 'next/link';

export default function Home() {
  return (
    <main>
      반려견 사료추천 서비스
      <Link href="/form">사료 추천 받기</Link>
    </main>
  );
}
