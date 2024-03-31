// pages/jwtChecker.tsx
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const MyPage = () => {
  const [isJwt, setIsJwt] = useState<boolean>(false);
  const [jwtMessage, setJwtMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<{
    name?: string,
    email?: string,
    address?: string,
    occupation?: string
  }>({});
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsJwt(true);
      fetchUserInfo(jwt); // JWTがある場合、ユーザー情報を取得
    } else {
      setIsJwt(false);
      setJwtMessage('JWTなし');
      alert("ログインしていないので、ログインページへ遷移します。");
      router.push('/login');
    }
  }, []);

  const fetchUserInfo = async (jwt: string) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/user-info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwt}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // レスポンスデータを状態にセット
        setJwtMessage(`JWTあり`);
      } else {
        throw new Error('ユーザー情報の取得に失敗しました。');
      }
    } catch (error) {
      console.error(error);
      alert('ユーザー情報の取得中にエラーが発生しました。');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // JWTをローカルストレージから削除
    router.push('/login'); // ログインページへ遷移
  };

  return (
    <>
      <div className='maindiv'>
        <div className="header blue">マイページ</div>
        <div className='containt-body'>
          {!isJwt && (
            <p>{jwtMessage}</p>
          )}
          {isJwt && (
            <div className='member-card'>
              <p>名前: {userInfo.name}</p>
              <p>メール: {userInfo.email}</p>
              <p>住所: {userInfo.address}</p>
              <p>職業: {userInfo.occupation}</p>
              <button onClick={handleLogout}>ログアウト</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
