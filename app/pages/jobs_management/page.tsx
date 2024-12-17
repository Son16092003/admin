"use client";

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    CircularProgress,
    Grid,
    Box,
    Chip,
    Collapse,
    IconButton,
    TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

interface Job {
    userId: string;
    title: string;
    company: string;
    companyName: string;
    location: string;
    salary: string;
    jobType: string;
    jobDescription: string;
    requirements: string;
    benefits: string;
    status: 'Mở' | 'Tạm dừng' | 'Đóng';
    additionalInfo: {
        deadline: string;
        experience: string;
        education: string;
        quantity: number;
        gender: string;
    };
}

const JobsManagement: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedJob, setExpandedJob] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    const [locationCount, setLocationCount] = useState<Record<string, number>>({});

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:3000/jobs');
                const data = await response.json();
                setJobs(data);
                setFilteredJobs(data);

                // Tính số lượng công việc theo title
                const countLocation = data.reduce((acc: Record<string, number>, job: Job) => {
                    acc[job.location] = (acc[job.location] || 0) + 1;
                    return acc;
                }, {});
                setLocationCount(countLocation);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleExpandClick = (index: number) => {
        setExpandedJob((prev) => (prev === index ? null : index));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase(); // Chuyển query thành chữ thường
        setSearchQuery(query);

        // Lọc công việc theo title, company, hoặc companyName (không phân biệt hoa/thường)
        const filtered = jobs.filter((job) => {
            const title = job.title?.toLowerCase() || "";
            const company = job.company?.toLowerCase() || "";
            const companyName = job.companyName?.toLowerCase() || "";
            return title.includes(query) || company.includes(query) || companyName.includes(query);
        });
        setFilteredJobs(filtered);
    };

    const titleData = Object.entries(locationCount).map(([name, value]) => ({
        name, // Tiêu đề công việc
        value, // Số lượng công việc
    }));

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ marginTop: 4, padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Quản lý công việc
            </Typography>

            {/* Total number of jobs */}
            <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
                Tổng số công việc đã tạo: {jobs.length}
            </Typography>

            {/* Search Box */}
            <TextField
                label="Tìm kiếm công việc (tiêu đề, công ty)"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{ mb: 3 }}
            />

            <Grid container spacing={3}>
                {filteredJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ minHeight: 250 }}>
                            <CardHeader
                                title={job.title}
                                subheader={job.companyName || job.company}
                                action={
                                    <IconButton
                                        onClick={() => handleExpandClick(index)}
                                        aria-expanded={expandedJob === index}
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                }
                                titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                                subheaderTypographyProps={{ color: 'text.secondary' }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Địa điểm:</strong> {job.location}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    <strong>Mức lương:</strong> {job.salary}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Chip
                                        label={job.status}
                                        color={
                                            job.status === 'Mở'
                                                ? 'success'
                                                : job.status === 'Tạm dừng'
                                                    ? 'warning'
                                                    : 'default'
                                        }
                                        size="small"
                                    />
                                </Box>
                            </CardContent>
                            <Collapse in={expandedJob === index} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body2">
                                        <strong>Loại công việc:</strong> {job.jobType}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Mô tả:</strong> {job.jobDescription}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Yêu cầu:</strong> {job.requirements}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Quyền lợi:</strong> {job.benefits}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Hạn nộp:</strong> {job.additionalInfo.deadline}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Kinh nghiệm:</strong> {job.additionalInfo.experience}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Học vấn:</strong> {job.additionalInfo.education}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Số lượng:</strong> {job.additionalInfo.quantity}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        <strong>Giới tính:</strong> {job.additionalInfo.gender}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" align="center" gutterBottom sx={{ marginTop: 4 }}>
                Phân phối Công Việc Theo danh sách địa điểm
            </Typography>
            <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart data={titleData}>
                        <CartesianGrid strokeDasharray="3 3" /> 
                        <XAxis dataKey="name" label={{ value: 'Tiêu đề công việc', position: 'insideBottom', offset: -5 }} /> 
                        <YAxis label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default JobsManagement;
