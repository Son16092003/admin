"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
    <AppBar position="static" sx={{ backgroundColor: "#011F82" }}>
      <Toolbar>
        <MenuIcon sx={{ mr: 2 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
            Admin Dashboard
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            color="inherit"
            onClick={handleClick}
            sx={{ color: "white", textTransform: "none" }}
          >
            Thống kê
          </Button>

          {/* Menu xổ xuống */}
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            MenuListProps={{
              onMouseLeave: handleClose,
            }}
          >
            <MenuItem>
              <Link href="/user" passHref style={{ textDecoration: "none", color: "black" }}>
                Các tài khoản đăng nhập
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/companies" passHref style={{ textDecoration: "none", color: "black" }}>
                Các công ty đã tạo
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/cv_apply" passHref style={{ textDecoration: "none", color: "black" }}>
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
