"use client";
import { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper, Card, CardContent } from "@mui/material";
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Home({ children }: { children: React.ReactNode }) {
  const [userCount, setUserCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<number[]>([]);
  const [jobs, setJobs] = useState<number[]>([]);
  
  useEffect(() => {
    // Fetch logged-in user data
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Fetch user count from API
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/user"); // Adjust URL if needed
        const users = await response.json();
        setUserCount(users.length); // Assuming `users` is an array of all users
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3000/applications"); // Adjust URL if needed
        const applications = await response.json();
        setApplications(applications.length);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    }

    // Fetch company count from API
    const fetchCompanyCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/employers"); // Adjust URL if needed
        const companies = await response.json();
        setCompanyCount(companies.length); // Assuming `companies` is an array of all companies
      } catch (error) {
        console.error("Error fetching company count:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/jobs"); // Adjust URL if needed
        const jobs = await response.json();
        setJobs(jobs.length); // Assuming `jobs` is an array of all jobs
      } catch (error) {
        console.error("Error fetching job count:", error);
      }
    }

    fetchUserCount();
    fetchCompanyCount();
    fetchApplications();
    fetchJobs();
  }, []);


  const pages = [
    { name: "Quản lý người dùng", path: "/pages/user", icon: <PeopleIcon fontSize="large" color="primary" /> },
    { name: "Quản lý công việc đã tạo", path: "/pages/jobs_management", icon: <WorkIcon fontSize="large" color="primary" /> },
    { name: "Quản lý công ty đã tạo", path: "/pages/companies", icon: <BusinessIcon fontSize="large" color="primary" /> },
    { name: "Quản lý CV đã apply", path: "/pages/cv_apply", icon: <BarChartIcon fontSize="large" color="primary" /> },
  ];

  const statistics = [
    { title: "Người dùng đăng nhập", value: userCount, icon: <PeopleIcon color="secondary" fontSize="large" /> },
    { title: "Công ty đã tạo", value: companyCount, icon: <BusinessIcon color="secondary" fontSize="large" /> },
    { title: "Người tìm việc đã nộp CV", value: applications, icon: <WorkIcon color="secondary" fontSize="large" /> },
    { title: "Công việc đã tạo", value: jobs, icon: <BarChartIcon color="secondary" fontSize="large" /> },
  ];
  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" fontWeight="bold" color="primary">
          Hệ thống quản lý
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Chào mừng bạn đến với hệ thống quản lý. Hãy chọn một chức năng để bắt đầu!
        </Typography>
      </Box>

      {/* Statistics Section */}
      <Grid container spacing={4} justifyContent="center" mb={4}>
        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={4} sx={{ textAlign: 'center', p: 2 }}>
              {stat.icon}
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Navigation Menu */}
      <Grid container spacing={4} justifyContent="center">
        {pages.map((page, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Paper elevation={4} sx={{ p: 3, textAlign: 'center', transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <Box mb={2}>{page.icon}</Box>
              <Typography variant="h6" fontWeight="medium" mb={2}>
                {page.name}
              </Typography>
              <Link href={page.path} passHref>
                <Button variant="contained" color="primary" fullWidth>
                  Đi đến
                </Button>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box textAlign="center" mt={6}>
        <Typography variant="body2" color="text.secondary">
          © 2024 Quản lý hệ thống. Tất cả quyền được bảo lưu.
        </Typography>
      </Box>
    </Box>
  );
}
