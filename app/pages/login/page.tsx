'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/login.css';
import { useRouter } from 'next/navigation'; // Đúng module cho App Router

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter(); // Lấy instance của useRouter

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === 'admin' && data.password === 'admin') {
      console.log('Đăng nhập thành công');
      localStorage.setItem("isAuthenticated", "true"); // Set authentication status
      router.push('/admin'); // Điều hướng đến trang Admin
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Đăng Nhập</h1>
      </div>
      <div className="main">
        <div className="userName">
          <p>Tên đăng nhập</p>
          <input type="text" placeholder="Tên đăng nhập" {...register('username', { required: true })} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="password">
          <p>Mật khẩu</p>
          <input type="password" placeholder="Mật khẩu" {...register('password', { required: true })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button onClick={handleSubmit(onSubmit)}>Đăng nhập</button>
      </div>
    </div>
  );
}
