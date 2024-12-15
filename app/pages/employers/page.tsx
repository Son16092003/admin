"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../../styles/employers.css";

interface Employer {
  id: string;
  userId: string;
  selectedCompany: string;
  companyName: string;
  numberOfEmployees: string;
  fullName: string;
  howDidYouHear: string;
  phoneNumber: string;
  describe: string;
}

const EmployerDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Lấy `id` từ URL
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Đảm bảo `id` sẵn sàng

    const fetchEmployer = async () => {
      try {
        const response = await fetch(`http://localhost:3000/employers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employer details.");
        }
        const data = await response.json();
        setEmployer(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employer) return <div>No employer found.</div>;

  return (
    <div className="detailContainer">
      <h1>{employer.companyName}</h1>
      <p><strong>Contact Name:</strong> {employer.fullName}</p>
      <p><strong>Phone Number:</strong> {employer.phoneNumber}</p>
      <p><strong>Number of Employees:</strong> {employer.numberOfEmployees}</p>
      <p><strong>Description:</strong> {employer.describe}</p>
      <p><strong>How Did You Hear About Us:</strong> {employer.howDidYouHear}</p>
    </div>
  );
};

export default EmployerDetailPage;
