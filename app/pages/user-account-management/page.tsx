"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/UserAccountManagement.css";
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CvList: React.FC = () => {
  const [cvs, setCvs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch CVs từ API
  const fetchCvs = async (name: string = '') => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/cv_form/search', {
        params: { name: searchTerm },
      });
      setCvs(response.data);
    } catch (err: any) {
      setError('Failed to fetch CVs');
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchCvs khi component mount
  useEffect(() => {
    fetchCvs();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = () => {
    fetchCvs(searchTerm);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="cv-container" sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" marginBottom={2} align="center">
        Danh sách CV
      </Typography>

      {/* Thanh tìm kiếm */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <TextField
          label="Tìm kiếm theo tên người dùng"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{ maxWidth: '400px' }}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: 2 }}>
          Tìm kiếm
        </Button>
      </Box>

      {/* Danh sách CV */}
      {cvs.length === 0 ? (
        <Typography align="center">Không có CV nào.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead >
              <TableRow style={{ backgroundColor: '#011F82'}}>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Họ và Tên</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Email</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Ngày Sinh</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Tóm Tắt</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Chứng Chỉ</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Trình Độ Học Vấn</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Kinh Nghiệm</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Cấp Bậc</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Kỹ Năng</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Mong Muốn Công Việc</TableCell>
                <TableCell style={{ color: 'white', fontSize: '1rem', fontWeight: "bold"}}>Lương Tối Thiểu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cvs.map((cv) => (
                <TableRow key={cv._id}>
                  <TableCell>{cv.fullName || 'Chưa cung cấp tên'}</TableCell>
                  <TableCell>{cv.email}</TableCell>
                  <TableCell>{cv.phone}</TableCell>
                  <TableCell>{cv.birthDate || 'Chưa cung cấp'}</TableCell>
                  <TableCell>{cv.summary || 'Chưa cung cấp'}</TableCell>
                  <TableCell>{cv.certifications || 'Chưa cung cấp'}</TableCell>
                  <TableCell>{cv.education.educationLevel}</TableCell>
                  <TableCell>{cv.experience.jobTitle || 'Chưa có'}</TableCell>
                  <TableCell>{cv.experience.highestJobLevel || 'Chưa cung cấp'}</TableCell>
                  <TableCell>{cv.skills.join(', ')}</TableCell>
                  <TableCell>{cv.jobPreferences.desiredJobTitle}</TableCell>
                  <TableCell>{cv.jobPreferences.minimumSalary} VND</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CvList;
