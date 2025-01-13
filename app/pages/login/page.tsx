'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../styles/login.css';
import { useRouter } from 'next/navigation';

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();

  // Xóa trạng thái đăng nhập khi ứng dụng khởi chạy
  useEffect(() => {
    localStorage.removeItem("isAuthenticated");
    console.log('Trạng thái đăng nhập đã bị xóa.');
    console.log('Trạng thái đăng nhập:', localStorage.getItem("isAuthenticated"));
  }, []);
  

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Dữ liệu đăng nhập:', data);
    if (data.username === 'admin' && data.password === 'admin') {
      console.log('Đăng nhập thành công');
      localStorage.setItem("isAuthenticated", "true");
      router.push('/');
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
          <input 
            type="text" 
            placeholder="Tên đăng nhập" 
            {...register('username', { required: "Vui lòng nhập tên đăng nhập" })} 
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="password">
          <p>Mật khẩu</p>
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            {...register('password', { required: "Vui lòng nhập mật khẩu" })} 
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button onClick={handleSubmit(onSubmit)}>Đăng nhập</button>
      </div>
    </div>
  );
}
