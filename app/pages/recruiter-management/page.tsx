// pages/recruiter-management.tsx
"use client";

import React, { useEffect, useState } from 'react';
import "../../styles/RecruiterManagement.css";
import axios from 'axios';

const RecruiterManagement: React.FC = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/employers');
        setRecruiters(response.data);
      } catch (err: any) {
        setError('Failed to fetch recruiters');
      } finally {
        setLoading(false);
      }
    };
    fetchRecruiters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="recruiter-container">
      <h1>Quản Lý Nhà Tuyển Dụng</h1>
      {recruiters.length === 0 ? (
        <p>Không có nhà tuyển dụng nào.</p>
      ) : (
        <table className="recruiter-table">
          <thead>
            <tr>
              <th>Tên Công Ty</th>
              <th>Số Nhân Viên</th>
              <th>Họ và Tên</th>
              <th>Phương Thức Liên Hệ</th>
              <th>Số Điện Thoại</th>
              <th>Mô Tả</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((recruiter) => (
              <tr key={recruiter._id}>
                <td>{recruiter.companyName}</td>
                <td>{recruiter.numberOfEmployees}</td>
                <td>{recruiter.fullName}</td>
                <td>{recruiter.howDidYouHear}</td>
                <td>{recruiter.phoneNumber}</td>
                <td>{recruiter.describe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default RecruiterManagement;
