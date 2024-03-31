// pages/jwtChecker.tsx
"use client";
import { useEffect, useState } from 'react';
import { Base64 } from 'js-base64';

const Home = () => {
  const [jwtMessage, setJwtMessage] = useState<string>('');

  useEffect(() => {
    // ローカルストレージからJWTを取得
    const jwt = localStorage.getItem('token');
    if (jwt) {
      // JWTが存在する場合、デコードして中身を表示
      const payload = jwt.split('.')[1]; // JWTは'.'で区切られた3部分から成る
      const decodedPayload = Base64.decode(payload); // ペイロード部分をデコード
      setJwtMessage(`JWTあり: ${decodedPayload}`);
    } else {
      // JWTが存在しない場合
      setJwtMessage('JWTなし');
    }
  }, []);

  return (
    <div>
      <p>{jwtMessage}</p>
    </div>
  );
};

export default Home;
