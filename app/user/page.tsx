"use client";
import React, { useEffect, useState } from "react";
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
} from "@mui/material";

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
  const [viewMode, setViewMode] = useState<"table" | "cards">("table"); // State cho chế độ xem

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to MyCV App
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        User List
      </Typography>

      {/* Total Users Card */}
      <Box
        sx={{
          backgroundColor: "#011F82",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "20px",
          width: "150px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          Total Users: {users.length}
        </Typography>
      </Box>

      {/* Nút lựa chọn chế độ xem */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button
          variant={viewMode === "table" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("table")}
          sx={{ marginRight: 2 }}
        >
          View as Table
        </Button>
        <Button
          variant={viewMode === "cards" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setViewMode("cards")}
        >
          View as Cards
        </Button>
      </Box>

      {/* Hiển thị theo chế độ View Mode */}
      {viewMode === "table" ? (
        // Bảng thống kê người dùng
        <div>
          <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 2 }}>
            User Statistics Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.userId || index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      <img
                        src={user.avatar}
                        alt={`${user.name}'s avatar`}
                        style={{ width: "50px", borderRadius: "50%" }}
                      />
                    </TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        // Dạng user card
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 2fr))",
            gap: "16px",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {users.map((user, index) => (
            <Card key={user.userId || index} style={{ textAlign: "center" }}>
              <CardMedia component="img" height="120" image={user.avatar} alt={`${user.name}'s avatar`} />
              <CardContent style={{ padding: "8px" }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold", fontSize: "1rem", color: "blue" }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Email: {user.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
