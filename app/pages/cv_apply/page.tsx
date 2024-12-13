"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Application {
    userId: string;
    jobId: string;
    jobName: string;
    cvId: string;
    CVfullNameUser: string;
    CVEmailUser: string;
    status: string;
}

const CvApply: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch("http://localhost:3000/applications");
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
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

    // Thống kê theo trạng thái ứng viên
    const statusCount = applications.reduce((acc, application) => {
        acc[application.status] = (acc[application.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Thống kê theo công việc
    const jobCount = applications.reduce((acc, application) => {
        acc[application.jobName] = (acc[application.jobName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Dữ liệu cho biểu đồ trạng thái
    const statusData = Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    // Dữ liệu cho biểu đồ công việc
    const jobData = Object.entries(jobCount).map(([job, count]) => ({
        name: job,
        value: count,
    }));

    // Tính tỷ lệ phê duyệt
    const totalApplications = applications.length;
    const approvedCount = statusCount["Approved"] || 0;
    const approvalRate = totalApplications > 0 ? (approvedCount / totalApplications) * 100 : 0;

    return (
        <Box display="flex" flexDirection="column">
            {/* Main Content */}
            <Box p={4} flexGrow={1}>
                <Typography variant="h4" align="center" gutterBottom>
                    Applications
                </Typography>

                {/* Tổng số ứng viên */}
                <Typography variant="h6" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    Total Applications: {totalApplications}
                </Typography>

                {/* Thống kê trạng thái với biểu đồ tròn */}
                <Typography variant="h5" align="center" gutterBottom>
                    Status Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Thống kê công việc với biểu đồ cột */}
                <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
                    Applications per Job
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={jobData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                {/* Tỷ lệ phê duyệt */}
                <Box sx={{ marginTop: 4 }} display="flex" justifyContent="center">
                    <Typography variant="h5">
                        Approval Rate: {approvalRate.toFixed(2)}%
                    </Typography>
                </Box>

                {/* Table */}
                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">User Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Job Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{application.CVfullNameUser}</TableCell>
                                    <TableCell align="center">{application.CVEmailUser || "N/A"}</TableCell>
                                    <TableCell align="center">{application.jobName}</TableCell>
                                    <TableCell align="center">{application.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default CvApply;
