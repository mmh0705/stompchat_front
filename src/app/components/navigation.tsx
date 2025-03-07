"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
    
    const pathname = usePathname();
    return (
        <nav >
            <Link href="/" className={pathname === '/' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
                홈
            </Link>
            <Link href="/login" className={pathname === '/login' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
                로그인
            </Link>
            <Link href="/tetris" className={pathname === '/tetris' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
                테트리스
            </Link>
            <Link href="/chat" className={pathname === '/chat' ? 'font-bold mr-4' : 'mr-4 text-blue-500'}>
                채팅
            </Link>
        </nav>
    );
};