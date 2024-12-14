'use client';

import React, { useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
    <AppBar position="static" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6">
          <Link href="/" passHref className="navbar-logo">
            Admin Dashboard
          </Link>
        </Typography>
        <Box className="navbar-buttons">
          <Button
            className="navbar-button"
            style={{ color: "white", fontWeight: "bold" }}
            onClick={handleClick}
          >
            Thống kê
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
            }}
          >
            <MenuItem>
              <Link href="/pages/user" passHref className="navbar-menu-item">
                Các tài khoản đăng nhập
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/pages/companies" passHref className="navbar-menu-item">
                Các công ty đã tạo
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/pages/cv_apply" passHref className="navbar-menu-item">
                Các CV đã apply
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
