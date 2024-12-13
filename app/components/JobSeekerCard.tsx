// components/JobSeekerCard.tsx

import React from "react";
import "../styles/jobseekers.css";

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
  address: Address;
  education: Education;
  experience: Experience;
  skills: string[];
  certifications: string;
  jobPreferences: JobPreferences;
}

interface JobSeekerCardProps {
  data: JobSeekerData;
}

const JobSeekerCard: React.FC<JobSeekerCardProps> = ({ data }) => {
  return (
    <div className="card">
      <h2>{data.fullName}</h2>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Số điện thoại:</strong> {data.phone}</p>

      {/* Hiển thị địa chỉ */}
      <div>
        <strong>Địa chỉ:</strong>
        <p>{data.address.address}, {data.address.city}, {data.address.country}, Mã bưu chính: {data.address.zipCode}</p>
      </div>

      {/* Học vấn */}
      <div>
        <h3><strong>Học vấn</strong></h3>
        <p><strong>Trường học:</strong> {data.education.schoolName}</p>
        <p><strong>Ngành học:</strong> {data.education.fieldOfStudy}</p>
        <p><strong>Mô tả học vấn:</strong> {data.education.educationDescription}</p>
        <p>
          <strong>Bắt đầu:</strong> {new Date(data.education.educationStartDate).toLocaleDateString()} - 
          <strong>Kết thúc:</strong> {new Date(data.education.educationEndDate).toLocaleDateString()}
        </p>
      </div>

      {/* Kinh nghiệm làm việc */}
      <div>
        <h3><strong>Kinh nghiệm làm việc</strong></h3>
        <p><strong>Công ty:</strong> {data.experience.companyName}</p>
        <p><strong>Chức vụ:</strong> {data.experience.jobTitle}</p>
        <p><strong>Lĩnh vực:</strong> {data.experience.workExperience}</p>
        <p><strong>Địa chỉ công ty:</strong> {data.experience.workCountry}, {data.experience.workCity}</p>
      </div>

      {/* Sở thích công việc */}
      <div>
        <strong>Sở thích công việc</strong>
        <p><strong>Vị trí mong muốn:</strong> {data.jobPreferences.desiredJobTitle}</p>
        <p><strong>Loại công việc:</strong> {data.jobPreferences.jobType}</p>
        <p><strong>Lương mong muốn:</strong> ${data.jobPreferences.minimumSalary}</p>
      </div>

      {/* Kỹ năng */}
      <div>
        <h3><strong>Kỹ năng</strong></h3>
        {data.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerCard;
