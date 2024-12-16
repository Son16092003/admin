'use client';

import React, { useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person"; // Icon cho nút Quản lý tài khoản
import "../../styles/navbar.css";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accountMenuEl, setAccountMenuEl] = useState<null | HTMLElement>(null); // Menu quản lý tài khoản

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAccountMenuEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const isAccountMenuOpen = Boolean(accountMenuEl);

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
              variant="contained"
              color="info"
              startIcon={<BarChartIcon />}
              onClick={handleClick}
              sx={{
                fontWeight: "bold",
                paddingX: 2,
                textTransform: "none",
                borderRadius: "20px",
              }}
            >
              Thống kê
            </Button>

            {/* Menu Dropdown cho Thống kê */}
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

            {/* Nút Quản lý tài khoản */}
            <Button
              className="navbar-button"
              variant="contained"
              color="info"
              startIcon={<PersonIcon />}
              onClick={handleAccountClick}
              sx={{
                fontWeight: "bold",
                paddingX: 2,
                textTransform: "none",
                borderRadius: "20px",
              }}
            >
              Quản lý tài khoản
            </Button>

            {/* Menu Dropdown cho Quản lý tài khoản */}
            <Menu
              anchorEl={accountMenuEl}
              open={isAccountMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                onMouseLeave: handleClose,
              }}
            >
              <MenuItem onClick={handleClose}>
                <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/user-account-management" passHref className="navbar-menu-item">
                  Quản lý tài khoản người dùng
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <PersonIcon fontSize="small" style={{ marginRight: 8 }} />
                <Link href="/pages/recruiter-management" passHref className="navbar-menu-item">
                  Quản lý tài khoản nhà tuyển dụng
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Đệm khoảng cách để nội dung không bị navbar che */}
      <Box sx={{ marginTop: "80px" }}></Box>
    </>
  );
};

export default Navbar;
