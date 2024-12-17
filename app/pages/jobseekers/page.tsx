// pages/user-account-management.tsx
import React from "react";
import styles from "./UserAccountManagement.module.css";

type Address = {
  country: string;
  address: string;
  city: string;
  zipCode: string;
  _id: string;
};

type Education = {
  educationLevel: string;
  fieldOfStudy: string;
  schoolName: string;
  educationCountry: string;
  educationCity: string;
  educationStartDate: string;
  educationEndDate: string;
  educationDescription: string;
  highestEducationLevel: string;
  _id: string;
};

type Experience = {
  jobTitle: string;
  companyName: string;
  workCountry: string;
  workCity: string;
  workStartDate: string;
  workEndDate: string;
  workExperience: string;
  highestJobLevel: string;
  _id: string;
};

type JobPreferences = {
  desiredJobTitle: string;
  jobType: string;
  minimumSalary: number;
  _id: string;
};

type UserProfile = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: Address;
  education: Education;
  experience: Experience;
  skills: string[];
  certifications: string;
  birthDate: string;
  summary: string;
  jobPreferences: JobPreferences;
};

const UserAccountManagement: React.FC = () => {
  const userProfile: UserProfile = {
    userId: "109332206105253186302",
    fullName: "Uyên Uyên",
    email: "uyenuyen0273@gmail.com",
    phone: "0901338207",
    address: {
      country: "Vietnam",
      address: "Nguyễn Thị Minh Khai",
      city: "Hồ Chí Minh",
      zipCode: "7000",
      _id: "674fa970935f36eada25c571",
    },
    education: {
      educationLevel: "Đại học",
      fieldOfStudy: "Hồ Chí Minh ",
      schoolName: "Hoa Sen",
      educationCountry: "Vietnam",
      educationCity: "Hồ Chí Minh",
      educationStartDate: "2021-09-06T00:49:00.000Z",
      educationEndDate: "2024-12-04T00:49:00.000Z",
      educationDescription: "Đại học năm 4",
      highestEducationLevel: "Đại học",
      _id: "674fa970935f36eada25c572",
    },
    experience: {
      jobTitle: "Chưa có",
      companyName: "Chưa có",
      workCountry: "Vietnam",
      workCity: "Hồ Chí Minh ",
      workStartDate: "2024-12-04T00:49:00.000Z",
      workEndDate: "2024-12-04T00:49:00.000Z",
      workExperience: "",
      highestJobLevel: "Chưa có",
      _id: "674fa970935f36eada25c573",
    },
    skills: ["JavaScript", "React"],
    certifications: "Chưa có",
    birthDate: "2003-07-02T00:49:00.000Z",
    summary: "",
    jobPreferences: {
      desiredJobTitle: "Senior",
      jobType: "Full-time ",
      minimumSalary: 2000,
      _id: "674fa970935f36eada25c574",
    },
  };

  return (
    <div className={styles.profileContainer}>
      <h1>Thông tin người dùng</h1>
      <section className={styles.section}>
        <h2>Thông tin cá nhân</h2>
        <p><strong>Họ tên:</strong> {userProfile.fullName}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Số điện thoại:</strong> {userProfile.phone}</p>
        <p><strong>Ngày sinh:</strong> {new Date(userProfile.birthDate).toLocaleDateString()}</p>
        <p><strong>Địa chỉ:</strong> {`${userProfile.address.address}, ${userProfile.address.city}, ${userProfile.address.country}, Mã bưu điện: ${userProfile.address.zipCode}`}</p>
      </section>
      <section className={styles.section}>
        <h2>Học vấn</h2>
        <p><strong>Trường:</strong> {userProfile.education.schoolName}</p>
        <p><strong>Chuyên ngành:</strong> {userProfile.education.fieldOfStudy}</p>
        <p><strong>Mô tả:</strong> {userProfile.education.educationDescription}</p>
        <p><strong>Thời gian:</strong> {`${new Date(userProfile.education.educationStartDate).toLocaleDateString()} - ${new Date(userProfile.education.educationEndDate).toLocaleDateString()}`}</p>
      </section>
      <section className={styles.section}>
        <h2>Kinh nghiệm</h2>
        <p><strong>Chức danh:</strong> {userProfile.experience.jobTitle}</p>
        <p><strong>Công ty:</strong> {userProfile.experience.companyName}</p>
        <p><strong>Địa điểm:</strong> {`${userProfile.experience.workCity}, ${userProfile.experience.workCountry}`}</p>
        <p><strong>Thời gian:</strong> {`${new Date(userProfile.experience.workStartDate).toLocaleDateString()} - ${new Date(userProfile.experience.workEndDate).toLocaleDateString()}`}</p>
      </section>
      <section className={styles.section}>
        <h2>Kỹ năng</h2>
        <ul>
          {userProfile.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Chứng chỉ</h2>
        <p>{userProfile.certifications}</p>
      </section>
      <section className={styles.section}>
        <h2>Sở thích công việc</h2>
        <p><strong>Vị trí mong muốn:</strong> {userProfile.jobPreferences.desiredJobTitle}</p>
        <p><strong>Hình thức làm việc:</strong> {userProfile.jobPreferences.jobType}</p>
        <p><strong>Lương tối thiểu:</strong> ${userProfile.jobPreferences.minimumSalary}</p>
      </section>
    </div>
  );
};

export default UserAccountManagement;
