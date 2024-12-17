"use client";
import React, { useEffect, useState } from "react";
import "../../styles/user.css";
import PersonIcon from "@mui/icons-material/Person"; // Import biểu tượng người dùng

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";  // Import IconDelete

interface User {
  userId: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const User: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Lọc người dùng theo tên
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter(user => user.userId !== userId));
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="container">
      <Typography variant="h4" align="center" gutterBottom>
        Thống kê người dùng
      </Typography>

      {/* Tìm kiếm theo tên */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <TextField
          label="Tìm kiếm theo tên"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          sx={{ maxWidth: "400px" }}  // Gọn lại
        />
      </Box>

      {/* Tổng số người dùng */}
      <Box className="box-total-users">
        <PersonIcon className="person-icon" />
        <Typography className="user-count">{filteredUsers.length}</Typography>
        <Typography className="user-text">Người dùng đăng nhập</Typography>
      </Box>



      {/* Chế độ xem */}
      <Box className="view-mode-buttons" display="flex" justifyContent="center" marginBottom="20px">
        <Button
          variant={viewMode === "table" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("table")}
        >
          Xem theo bảng
        </Button>
        <Button
          variant={viewMode === "cards" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("cards")}
        >
          Xem theo thẻ
        </Button>
      </Box>

      {/* Hiển thị người dùng theo chế độ xem */}
      {viewMode === "table" ? (
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Tên</TableCell>
                  <TableCell align="center">Email</TableCell>
                  {/* <TableCell align="center">Thao tác</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user.userId || index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/50"; // Avatar mặc định
                        }}
                        style={{ width: "50px", borderRadius: "50%" }}
                      />

                    </TableCell>
                    <TableCell align="center" >{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {/* <IconButton color="secondary" onClick={() => openDeleteDialog(user)}>
                        <DeleteIcon />
                      </IconButton> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="user-cards-container">
          {filteredUsers.map((user, index) => (
            <Card key={user.userId || index} className="card-user">
              <CardMedia component="img" height="120" image={user.avatar || "https://via.placeholder.com/50"} alt={`${user.name}'s avatar`} />
              <CardContent className="card-content">
                <Typography variant="subtitle1">{user.name}</Typography>
                <Typography variant="body2">{user.email}</Typography>
                {/* <IconButton color="error" onClick={() => openDeleteDialog(user)}>
                  <DeleteIcon />
                </IconButton> */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog Confirm Delete */}
      {/* <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa người dùng này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={() => userToDelete && handleDeleteUser(userToDelete.userId)}
            color="secondary"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default User;