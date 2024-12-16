// pages/user-account-management.tsx
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/UserAccountManagement.css";

const CvList: React.FC = () => {
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/cv_form');
        setCvs(response.data);
      } catch (err: any) {
        setError('Failed to fetch CVs');
      } finally {
        setLoading(false);
      }
    };
    fetchCvs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="cv-container">
      <h1>Danh sách CV</h1>
      {cvs.length === 0 ? (
        <p>Không có CV nào.</p>
      ) : (
        <table className="cv-table">
          <thead>
            <tr>
              <th>Họ và Tên</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Ngày Sinh</th>
              <th>Tóm Tắt</th>
              <th>Chứng Chỉ</th>
              <th>Trình Độ Học Vấn</th>
              <th>Kinh Nghiệm</th>
              <th>Cấp Bậc</th>
              <th>Kỹ Năng</th>
              <th>Mong Muốn Công Việc</th>
              <th>Lương Tối Thiểu</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv._id}>
                <td>{cv.fullName || 'Chưa cung cấp tên'}</td>
                <td>{cv.email}</td>
                <td>{cv.phone}</td>
                <td>{cv.birthDate || 'Chưa cung cấp'}</td>
                <td>{cv.summary || 'Chưa cung cấp'}</td>
                <td>{cv.certifications || 'Chưa cung cấp'}</td>
                <td>{cv.education.educationLevel}</td>
                <td>{cv.experience.jobTitle || 'Chưa có'}</td>
                <td>{cv.experience.highestJobLevel || 'Chưa cung cấp'}</td>
                <td>{cv.skills.join(', ')}</td>
                <td>{cv.jobPreferences.desiredJobTitle}</td>
                <td>{cv.jobPreferences.minimumSalary} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default CvList;
