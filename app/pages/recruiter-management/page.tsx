"use client";

import React, { useEffect, useState } from "react";
import "../../styles/RecruiterManagement.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import Tooltip from "@mui/material/Tooltip"; // Import Tooltip
import RestoreIcon from "@mui/icons-material/Restore"; // Import icon Restore
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  SelectChangeEvent,
} from "@mui/material";

const RecruiterManagement: React.FC = () => {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [editOpen, setEditOpen] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState<any>(null);

  const fetchRecruiters = async (field = "all", query = "") => {
    try {
      setLoading(true);
      const params = field !== "all" && query ? { [field]: query } : {};
      const response = await axios.get("http://localhost:3000/employers", { params });
      console.log('Recruiters:', response.data);
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

  const handleFieldChange = (e: SelectChangeEvent<string>) => {
    setSelectedField(e.target.value as string);
  };

  const handleSearch = () => {
    fetchRecruiters(selectedField, searchTerm);
  };

  const handleUpdate = (recruiter: any) => {
    console.log('Selected recruiter:', recruiter);
    setCurrentRecruiter(recruiter); // Gắn dữ liệu của recruiter đã chọn vào state
    setEditOpen(true); // Mở modal chỉnh sửa
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setCurrentRecruiter(null);
  };

  const handleEditSubmit = async () => {
    try {
      if (!currentRecruiter || !currentRecruiter.id) {
        console.error("Recruiter ID is missing:", currentRecruiter);
        alert("Có lỗi xảy ra. Không tìm thấy ID của nhà tuyển dụng.");
        return;
      }

      console.log('Updating recruiter:', currentRecruiter);
      const response = await axios.patch(
        `http://localhost:3000/employers/${currentRecruiter.id}`,  // Dùng `id` thay vì `_id`
        currentRecruiter
      );
      alert("Cập nhật thành công!");
      setEditOpen(false);
      fetchRecruiters(); // Làm mới danh sách nhà tuyển dụng
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRecruiter((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleBlock = async (id: string) => {
    try {
      const confirmBlock = window.confirm("Bạn có chắc chắn muốn chặn công ty này?");
      if (!confirmBlock) return;

      await axios.patch(`http://localhost:3000/employers/${id}`, { isBlocked: true });
      alert("Công ty đã bị chặn thành công.");
      fetchRecruiters(); // Cập nhật lại danh sách nhà tuyển dụng
    } catch (err) {
      console.error("Lỗi khi chặn công ty:", err);
      alert("Có lỗi xảy ra khi chặn công ty.");
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      const confirmUnblock = window.confirm("Bạn có chắc chắn muốn bỏ chặn công ty này?");
      if (!confirmUnblock) return;

      await axios.patch(`http://localhost:3000/employers/${id}`, { isBlocked: false });
      alert("Công ty đã được bỏ chặn thành công.");
      fetchRecruiters(); // Cập nhật lại danh sách nhà tuyển dụng
    } catch (err) {
      console.error("Lỗi khi bỏ chặn công ty:", err);
      alert("Có lỗi xảy ra khi bỏ chặn công ty.");
    }
  };

  if (loading) return <Typography className="loading-text">Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="recruiter-container">
      <Typography variant="h4" marginBottom={2}>
        Quản Lý Nhà Tuyển Dụng
      </Typography>
      <Box className="search-bar" display="flex" alignItems="center">
        <FormControl sx={{ minWidth: 150, marginRight: 2 }}>
          <Select labelId="select-field-label" value={selectedField} onChange={handleFieldChange}>
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="companyName">Tên Công Ty</MenuItem>
            <MenuItem value="fullName">Họ và Tên</MenuItem>
            <MenuItem value="phoneNumber">Số Điện Thoại</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Nhập thông tin tìm kiếm"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: "70%" }}
          disabled={selectedField === "all"}
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
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Mô Tả</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recruiters.map((recruiter, index) => (
                <TableRow key={recruiter.id || index}>
                  <TableCell>{recruiter.companyName}</TableCell>
                  <TableCell>{recruiter.numberOfEmployees}</TableCell>
                  <TableCell>{recruiter.fullName}</TableCell>
                  <TableCell>{recruiter.phoneNumber}</TableCell>
                  <TableCell>{recruiter.describe}</TableCell>
                  <TableCell>
                    {recruiter.isBlocked ? (
                      <Typography color="error">Đã bị chặn</Typography>
                    ) : (
                      <Typography color="success">Hoạt động</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" alignItems="center">
                      {/* Tooltip cho Edit Icon */}
                      <Tooltip title="Chỉnh sửa" arrow>
                        <Button
                          onClick={() => handleUpdate(recruiter)}
                          sx={{ minWidth: 0, padding: 1, marginRight: 1 }}
                          color="primary"
                        >
                          <EditIcon />
                        </Button>
                      </Tooltip>

                      {/* Tooltip cho Block Icon */}
                      <Tooltip title="Chặn" arrow>
                        <Button
                          onClick={() => handleBlock(recruiter.id)}
                          sx={{ minWidth: 0, padding: 1, marginRight: 1 }}
                          color="error"
                        >
                          <BlockIcon />
                        </Button>
                      </Tooltip>

                      {/* Tooltip cho Restore Icon (Bỏ chặn) */}
                      {recruiter.isBlocked && (
                        <Tooltip title="Bỏ chặn" arrow>
                          <Button
                            onClick={() => handleUnblock(recruiter.id)}
                            sx={{ minWidth: 0, padding: 1 }}
                            color="success"
                          >
                            <RestoreIcon />
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal chỉnh sửa */}
      <Dialog open={editOpen} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh Sửa Nhà Tuyển Dụng</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên Công Ty"
            name="companyName"
            value={currentRecruiter?.companyName || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Họ và Tên"
            name="fullName"
            value={currentRecruiter?.fullName || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Số Điện Thoại"
            name="phoneNumber"
            value={currentRecruiter?.phoneNumber || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mô Tả"
            name="describe"
            value={currentRecruiter?.describe || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Hủy</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecruiterManagement;
