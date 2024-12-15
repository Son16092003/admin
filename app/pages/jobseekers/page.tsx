"use client";

import React, { useEffect, useState } from "react";
import "../../styles/jobseekers.css";

// Định nghĩa kiểu dữ liệu cho các thông tin cần thiết
interface Address {
  country: string;
  address: string;
  city: string;
  zipCode: string;
}

interface Education {
  schoolName: string;
  fieldOfStudy: string;
  educationStartDate: string;
  educationEndDate: string;
  educationDescription: string;
}

interface Experience {
  jobTitle: string;
  companyName: string;
  workCountry: string;
  workCity: string;
  workExperience: string;
  highestJobLevel: string;
}

interface JobPreferences {
  desiredJobTitle: string;
  jobType: string;
  minimumSalary: number;
}

interface JobSeekerData {
  fullName: string;
  email: string;
  phone: string;
  address?: Address;
  education?: Education;
  experience?: Experience;
  skills?: string[];  // Đánh dấu là optional
  certifications: string;
  jobPreferences?: JobPreferences;
}

const JobSeekersPage: React.FC = () => {
  const [jobSeekerData, setJobSeekerData] = useState<JobSeekerData | null>(null); // State để chứa dữ liệu job seeker
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cv_form/");
        console.log("response data:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobSeekerData(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hiển thị khi đang tải dữ liệu hoặc có lỗi
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  // Component hiển thị thông tin JobSeeker
  const JobSeekerCard: React.FC<{ data: JobSeekerData }> = ({ data }) => {
    if (!data) return <div>Không có dữ liệu</div>;

    return (
      <div className="card">
        <h2>{data.fullName}</h2>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Số điện thoại:</strong> {data.phone}</p>

        {/* Hiển thị địa chỉ */}
        {data.address ? (
          <div>
            <strong>Địa chỉ:</strong>
            <p>{data.address.address}, {data.address.city}, {data.address.country}, Mã bưu chính: {data.address.zipCode}</p>
          </div>
        ) : (
          <div><strong>Địa chỉ:</strong> Không có thông tin</div>
        )}

        {/* Học vấn */}
        <div>
          <h3><strong>Học vấn</strong></h3>
          {data.education ? (
            <>
              <p><strong>Trường học:</strong> {data.education.schoolName}</p>
              <p><strong>Ngành học:</strong> {data.education.fieldOfStudy}</p>
              <p><strong>Mô tả học vấn:</strong> {data.education.educationDescription}</p>
              <p>
                <strong>Bắt đầu:</strong> {new Date(data.education.educationStartDate).toLocaleDateString()} -
                <strong>Kết thúc:</strong> {new Date(data.education.educationEndDate).toLocaleDateString()}
              </p>
            </>
          ) : (
            <div><strong>Học vấn:</strong> Không có thông tin</div>
          )}
        </div>

        {/* Kinh nghiệm làm việc */}
        <div>
          <h3><strong>Kinh nghiệm làm việc</strong></h3>
          {data.experience ? (
            <>
              <p><strong>Công ty:</strong> {data.experience.companyName || "Chưa có"}</p>
              <p><strong>Chức vụ:</strong> {data.experience.jobTitle || "Chưa có"}</p>
              <p><strong>Lĩnh vực:</strong> {data.experience.workExperience || "Chưa có"}</p>
              <p><strong>Địa chỉ công ty:</strong> {data.experience.workCountry}, {data.experience.workCity}</p>
            </>
          ) : (
            <div><strong>Kinh nghiệm làm việc:</strong> Không có thông tin</div>
          )}
        </div>

        {/* Sở thích công việc */}
        <div>
          <strong>Sở thích công việc</strong>
          {/* Kiểm tra nếu có thông tin về jobPreferences */}
          {data.jobPreferences ? (
            <>
              <p><strong>Vị trí mong muốn:</strong> {data.jobPreferences.desiredJobTitle}</p>
              <p><strong>Loại công việc:</strong> {data.jobPreferences.jobType}</p>
              <p><strong>Lương mong muốn:</strong> ${data.jobPreferences.minimumSalary}</p>
            </>
          ) : (
            <div><strong>Sở thích công việc:</strong> Không có thông tin</div>
          )}
        </div>

        {/* Kỹ năng */}
        <div>
          <h3><strong>Kỹ năng</strong></h3>
          {/* Kiểm tra xem skills có phải là mảng và có dữ liệu không */}
          {Array.isArray(data.skills) && data.skills.length > 0 ? (
            data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))
          ) : (
            <p>Chưa có kỹ năng</p>
          )}
        </div>

        {/* Chứng chỉ */}
        <div>
          <h3><strong>Chứng chỉ</strong></h3>
          <p>{data.certifications || "Chưa có chứng chỉ"}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="job-container">
      {jobSeekerData ? (
        <JobSeekerCard data={jobSeekerData} />
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default JobSeekersPage;

