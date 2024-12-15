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
    TextField,
} from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

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

    // State cho hai trường tìm kiếm
    const [searchTermTable, setSearchTermTable] = useState<string>(""); // Search tên và công việc
    const [searchTermChart, setSearchTermChart] = useState<string>(""); // Search phân phối công việc

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch("http://localhost:3000/applications");
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách ứng dụng:", error);
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

    const normalizedApplications = applications.map((application) => ({
        ...application,
        jobName: application.jobName.trim().toLowerCase(),
    }));

    const jobCount = normalizedApplications.reduce((acc, application) => {
        acc[application.jobName] = (acc[application.jobName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const statusCount = applications.reduce((acc, application) => {
        acc[application.status] = (acc[application.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const statusData = Object.entries(statusCount).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    const jobData = Object.entries(jobCount)
        .sort(([jobA], [jobB]) => jobA.localeCompare(jobB))
        .map(([job, count]) => ({
            name: job,
            value: count,
        }));

    // Lọc danh sách ứng dụng theo từ khóa trong bảng
    const filteredApplications = applications.filter(
        (application) =>
            application.CVfullNameUser
                .toLowerCase()
                .includes(searchTermTable.toLowerCase()) ||
            application.jobName.toLowerCase().includes(searchTermTable.toLowerCase())
    );

    // Lọc dữ liệu công việc theo từ khóa trong biểu đồ
    const filteredJobData = jobData.filter((job) =>
        job.name.toLowerCase().includes(searchTermChart.toLowerCase())
    );

    return (
        <Box display="flex" flexDirection="column">
            <Box p={4} flexGrow={1}>
                <Typography variant="h4" align="center" gutterBottom>
                    Danh sách ứng dụng
                </Typography>

                {/* Search 1: Tìm kiếm theo tên người dùng hoặc công việc */}
                <Box display="flex" justifyContent="center" sx={{ marginBottom: 4 }}>
                    <TextField
                        label="Tìm kiếm trong bảng (Tên hoặc Công việc)"
                        variant="outlined"
                        value={searchTermTable}
                        onChange={(e) => setSearchTermTable(e.target.value)}
                        sx={{ width: "50%" }}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>#</TableCell>
                                <TableCell align="center"sx={{ fontWeight: 'bold' }}>Tên người dùng</TableCell>
                                <TableCell align="center"sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell align="center"sx={{ fontWeight: 'bold' }}>Tên công việc</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredApplications.map((application, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">
                                        {application.CVfullNameUser}
                                    </TableCell>
                                    <TableCell align="center">
                                        {application.CVEmailUser || "N/A"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {application.jobName}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Search 2: Tìm kiếm phân phối công việc */}
                <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
                    <TextField
                        label="Tìm kiếm trong Phân phối công việc"
                        variant="outlined"
                        value={searchTermChart}
                        onChange={(e) => setSearchTermChart(e.target.value)}
                        sx={{ width: "50%" }}
                    />
                </Box>

                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ marginTop: 4 }}
                >
                    Phân phối công việc
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredJobData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <Typography variant="h5" align="center" gutterBottom>
                    Phân phối trạng thái
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={statusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {statusData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default CvApply;
