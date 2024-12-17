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
  TextField,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const [searchKeyword, setSearchKeyword] = useState<string>(""); // Từ khóa tìm kiếm

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch("http://localhost:3000/employers");
        const data = await response.json();
        setEmployers(data);

        // Tính toán số lượng công ty theo danh mục
        const countCategories = data.reduce((acc: Record<string, number>, employer: Employer) => {
          acc[employer.selectedCompany] = (acc[employer.selectedCompany] || 0) + 1;
          return acc;
        }, {});
        setCategoryCount(countCategories);
      } catch (error) {
        console.error("Error fetching employers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);
  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    value,
  }));


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }


  // Lọc danh sách employer theo danh mục đã chọn (selectedCompany)
  const filteredEmployers = employers.filter((employer) => {
    const matchesCategory =
      selectedCategory === "all" || employer.selectedCompany === selectedCategory;
    const matchesSearch =
      employer.companyName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      employer.selectedCompany.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  // Lấy danh sách các danh mục công ty (selectedCompany) duy nhất
  const companyCategories = Array.from(new Set(employers.map((employer) => employer.selectedCompany)));

  return (
    <div className="container">
      <Typography variant="h4" align="center" gutterBottom>
        Danh sách Công ty
      </Typography>

      {/* Dropdown chọn danh mục công ty */}
      <Box display="flex" justifyContent="center" marginBottom="20px" gap="20px">
        {/* Dropdown chọn danh mục công ty */}
        <FormControl variant="outlined" style={{ minWidth: 250 }}>
          <InputLabel id="select-company-category-label">Danh mục</InputLabel>
          <Select
            labelId="select-company-category-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Danh mục" // Thêm thuộc tính này để khớp với InputLabel
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {companyCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Ô tìm kiếm */}
        <TextField
          label="Tìm kiếm theo tên công ty"
          variant="outlined"
          fullWidth
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ mb: 3 }}
        />
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
      <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
        Phân phối Danh mục Công ty
      </Typography>
      <Box sx={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

    </div>
  );
};

export default Companies;
