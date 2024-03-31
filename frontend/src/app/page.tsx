"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"; // ルーターフックのインポート
import './globals.css';

const Home = () => {
  const [isJwt, setIsJwt] = useState<boolean>(false);
  const [jwtMessage, setJwtMessage] = useState<string>('');
  const router = useRouter(); // useRouter フックの使用

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setJwtMessage(`JWTあり`);
      setIsJwt(true);
    } else {
      setJwtMessage('JWTなし');
    }
  }, []);

  const handleLoginRedirect = () => {
    router.push('/login'); // `/login` への遷移
  };

  const handleMyRedirect = () => {
    router.push('mypage'); // `/mypage` への遷移
  };

  return (
    <>
      <div className='maindiv'>
        <div className="header blue">トップページ</div>
        <div className='containt-body'>
          <div>
            <p>{jwtMessage}</p>
            {!isJwt && (
              // JWTがない場合、ログインページへ
              <button onClick={handleLoginRedirect}>ログインページへ</button>
            )}
            {isJwt && (
              // JWTがある場合、マイページへ
              <button onClick={handleMyRedirect}>マイページへ</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;