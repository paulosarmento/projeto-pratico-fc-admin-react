import { Brightness1, Brightness4, Brightness7 } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  toggle: () => void;
  theme: string;
  handleDrawerToggle?: () => void;
};

export default function Header({
  toggle,
  theme,
  handleDrawerToggle,
}: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CodeFlix
          </Typography>

          <IconButton sx={{ ml: 2 }} onClick={toggle} color="inherit">
            {theme === "dark" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
