'use client';

import React, { useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart"; // Icon cho nút Thống kê
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import "../../styles/navbar.css";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" className="navbar" sx={{ backgroundColor: "#011f82" }}>
        <Toolbar className="navbar-toolbar">
          <Typography variant="h6">
            <Link href="/" passHref className="navbar-logo">
              ADMIN
            </Link>
          </Typography>
          <Box className="navbar-buttons">
            {/* Nút Thống kê */}
            <Button
              className="navbar-button"
              variant="contained" // Thêm màu nền để nổi bật
              color="info" // Màu sắc khác biệt
              startIcon={<BarChartIcon />} // Icon biểu tượng
              onClick={handleClick}
              sx={{
                fontWeight: "bold",
                paddingX: 2,
                textTransform: "none", // Không viết hoa toàn bộ chữ
                borderRadius: "20px", // Làm nút bo tròn
              }}
            >
              Thống kê
            </Button>

            {/* Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              MenuListProps={{
                onMouseLeave: handleClose,
              }}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircleIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/user" passHref className="navbar-menu-item">
                  Các tài khoản đăng nhập
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <BusinessIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/companies" passHref className="navbar-menu-item">
                  Các công ty đã tạo
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <DescriptionIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/cv_apply" passHref className="navbar-menu-item">
                  Các CV đã apply
                </Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <DescriptionIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/jobs_management" passHref className="navbar-menu-item">
                  Các công việc đã tạo
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Đệm khoảng cách để nội dung không bị navbar che */}
      <Box sx={{ marginTop: "80px" /* Chiều cao mặc định của AppBar */ }}>
      </Box>
    </>
  );
};

export default Navbar;
