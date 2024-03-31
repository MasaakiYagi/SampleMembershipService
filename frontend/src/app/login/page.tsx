"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const hashPassword = async (password: string): Promise<string> => {
    // パスワードをUint8Arrayにエンコード
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    // SHA-256でハッシュ化
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    // ハッシュを16進数文字列に変換
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = await hashPassword(password);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: hashedPassword }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // JWTをローカルストレージに保存
        router.push('/mypage'); // ダッシュボードページへリダイレクト
      } else {
        alert('ログインに失敗しました');
      }
    } catch (error) {
      console.error('ログイン時にエラーが発生しました', error);
      alert('ログインに失敗しました');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default Login;
