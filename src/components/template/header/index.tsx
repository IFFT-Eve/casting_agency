import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { FC, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {}

type Page = {
  name: string;
  url: string;
};

const pages: Page[] = [
  {
    name: "Movies",
    url: "movie",
  },
  {
    name: "Actors",
    url: "actor",
  },
];

export const CastingAgencyTemplateHeader: FC<Props> = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const settings = useMemo(() => {
    if (isAuthenticated) {
      return [
        {
          name: "Logout",
          action: false,
        },
      ];
    }
    return [
      {
        name: "Login",
        action: true,
      },
    ];
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigate = (url: string) => {
    navigate(`/${url}`);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickAction = (action: boolean) => {
    if (action) {
      loginWithRedirect();
    } else {
      logout();
    }
  };

  return (
    <StyledAppbar position="static" color="transparent">
      <Container maxWidth="xl" className="styled-container">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            CASTING AGENCY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ name, url }) => (
                <MenuItem key={name} onClick={() => handleNavigate(url)}>
                  <Typography sx={{ textAlign: "center" }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, url }) => (
              <Button
                key={name}
                onClick={() => handleNavigate(url)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <FaceIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ action, name }) => (
                <MenuItem key={name} onClick={() => onClickAction(action)}>
                  <Typography sx={{ textAlign: "center" }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppbar>
  );
};

const StyledAppbar = styled(AppBar)`
  box-shadow: none !important;

  .styled-container {
    padding: 0;
  }
`;
