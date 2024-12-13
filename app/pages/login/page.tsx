'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/login.css';
import { useRouter } from 'next/navigation'; // Next.js Router
import router from 'next/router';

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    if (data.username === 'admin' && data.password === 'admin') {
      console.log('Đăng nhập thành công');
      router.push('/'); // Điều hướng đến trang quản lý người dùng
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
