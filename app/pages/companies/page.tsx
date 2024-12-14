"use client";
import React, { useEffect, useState } from "react";
import "../../styles/companies.css";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Employer {
  userId: string;
  selectedCompany: string; // Công ty thuộc danh mục
  companyName: string; // Tên công ty
  numberOfEmployees: string; // Số nhân viên
  fullName: string; // Người liên hệ
  howDidYouHear: string; // Nguồn
  phoneNumber: string; // Số điện thoại
  describe: string; // Mô tả công ty
}

const Companies: React.FC = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch("http://localhost:3000/employers"); // Thay URL đúng
        const data = await response.json();
        setEmployers(data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Lọc danh sách employer theo danh mục đã chọn (selectedCompany)
  const filteredEmployers =
    selectedCategory === "all"
      ? employers
      : employers.filter((employer) => employer.selectedCompany === selectedCategory);

  // Lấy danh sách các danh mục công ty (selectedCompany) duy nhất
  const companyCategories = Array.from(new Set(employers.map((employer) => employer.selectedCompany)));

  return (
    <div className="container">
      <Typography variant="h4" align="center" gutterBottom>
        Danh sách Công ty
      </Typography>

      {/* Dropdown chọn danh mục công ty */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="select-company-category-label">Danh mục</InputLabel>
          <Select
            labelId="select-company-category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {companyCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Bảng hiển thị */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Tên công ty</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Danh mục</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Số nhân viên</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Người liên hệ</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Số điện thoại</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Mô tả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployers.map((employer, index) => (
              <TableRow key={employer.userId}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{employer.companyName}</TableCell>
                <TableCell align="center">{employer.selectedCompany}</TableCell>
                <TableCell align="center">{employer.numberOfEmployees}</TableCell>
                <TableCell align="center">{employer.fullName}</TableCell>
                <TableCell align="center">{employer.phoneNumber}</TableCell>
                <TableCell align="center">{employer.describe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Companies;
