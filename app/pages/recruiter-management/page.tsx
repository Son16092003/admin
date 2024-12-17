"use client";

import React, { useEffect, useState } from "react";
import "../../styles/RecruiterManagement.css";
import axios from "axios";
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const RecruiterManagement: React.FC = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchRecruiters = async (query = "") => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/employers`, {
        params: query ? { companyName: query } : {},
      });
      setRecruiters(response.data);
    } catch (err: any) {
      setError("Failed to fetch recruiters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    fetchRecruiters(searchTerm);
  };

  if (loading) return <Typography className="loading-text">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="recruiter-container">
      <Typography variant="h4" marginBottom={2}>
        Quản Lý Nhà Tuyển Dụng
      </Typography>
      <Box className="search-bar">
        <TextField
          label="Tìm kiếm theo tên công ty"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: "400px" }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>
          Tìm kiếm
        </Button>
      </Box>
      {recruiters.length === 0 ? (
        <Typography className="no-data">Không có nhà tuyển dụng nào.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table className="recruiter-table">
            <TableHead>
              <TableRow>
                <TableCell>Tên Công Ty</TableCell>
                <TableCell>Số Nhân Viên</TableCell>
                <TableCell>Họ và Tên</TableCell>
                <TableCell>Phương Thức Liên Hệ</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Mô Tả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiters.map((recruiter, index) => (
                <TableRow key={recruiter._id || index}>
                  <TableCell>{recruiter.companyName}</TableCell>
                  <TableCell>{recruiter.numberOfEmployees}</TableCell>
                  <TableCell>{recruiter.fullName}</TableCell>
                  <TableCell>{recruiter.howDidYouHear}</TableCell>
                  <TableCell>{recruiter.phoneNumber}</TableCell>
                  <TableCell>{recruiter.describe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RecruiterManagement;
