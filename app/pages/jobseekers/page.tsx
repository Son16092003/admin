"use client";

import React, { useEffect, useState } from "react";
import JobSeekerCard from "../../Components/jobSeekerCard/JobSeekerCard";

const JobSeekers = () => {
  const [jobSeekerData, setJobSeekerData] = useState<any>(null); // State để chứa dữ liệu job seeker
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/cv_form/");
        console.log("response data", response.json());
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

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

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

export default JobSeekers;
