// pages/jobseekers.tsx

import React from "react";
import JobSeekerCard from "../../components/JobSeekerCard";

const jobSeekerData = {
  fullName: "Uyên Uyên",
  email: "uyenuyen0273@gmail.com",
  phone: "0901338207",
  address: {
    country: "Vietnam",
    address: "Nguyễn Thị Minh Khai",
    city: "Hồ Chí Minh",
    zipCode: "7000"
  },
  education: {
    schoolName: "Hoa Sen",
    fieldOfStudy: "CNTT",
    educationStartDate: "2021-09-06",
    educationEndDate: "2024-12-04",
    educationDescription: "Đại học năm 4"
  },
  experience: {
    jobTitle: "Chưa có",
    companyName: "Chưa có",
    workCountry: "Vietnam",
    workCity: "Hồ Chí Minh",
    workExperience: "",
    highestJobLevel: "Chưa có"
  },
  skills: ["JavaScript", "React"],
  certifications: "Chưa có",
  jobPreferences: {
    desiredJobTitle: "Senior Developer",
    jobType: "Full-time",
    minimumSalary: 2000
  }
};

const JobSeekers = () => {
  return (
    <div className="job-container">
      <JobSeekerCard data={jobSeekerData} />
    </div>
  );
};

export default JobSeekers;
