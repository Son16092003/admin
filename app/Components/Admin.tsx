"use client";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Box,
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/user"); // URL API của backend NestJS
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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
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

            {/* Khung hiển thị số lượng user */}
            <Box
                sx={{
                    backgroundColor: "#011F82",
                    padding: "10px",
                    borderRadius: "8px",
                    textAlign: "center",
                    marginBottom: "20px",
                    width: "150px", // Đặt chiều rộng cố định
                    height: "150px", // Đặt chiều cao cố định để tạo hình vuông
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" , color: "white"}}>
                    Total Users: {users.length}
                </Typography>
            </Box>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 2fr))", // Mỗi thẻ tối thiểu 400px, tối đa 1fr
                    gap: "16px", // Khoảng cách giữa các thẻ
                    justifyContent: "center",
                }}
            >
                {users.map((user) => (
                    <Card key={user.userId} style={{ textAlign: "center" }}>
                        <CardMedia
                            component="img"
                            height="120"
                            image={user.avatar}
                            alt={`${user.name}'s avatar`}
                        />
                        <CardContent style={{ padding: "8px" }}>
                            <Typography
                                variant="subtitle1"
                                style={{ fontWeight: "bold", fontSize: "1rem", color: "blue" }}
                            >
                                {user.name}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{ fontWeight: "bold", fontSize: "1rem" }}
                            >
                                Email: {user.email}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default User;
