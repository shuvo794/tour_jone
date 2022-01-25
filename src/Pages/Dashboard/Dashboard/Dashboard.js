import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Switch,
  Route,
  useRouteMatch,
  NavLink,
  useHistory,
} from "react-router-dom";
import { Button } from "@mui/material";
import Pay from "../Pay/Pay";
import MyOrders from "../MyOrders/MyOrders";
import Review from "../Review/Review";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../Shared/AdminRoute/AdminRoute";
import ManageAllProducts from "../ForAdmin/ManageAllOrders/ManageAllOrders";
import AddProduct from "../ForAdmin/AddProduct/AddProduct";
import MakeAdmin from "../ForAdmin/MakeAdmin/MakeAdmin";
import ManageProducts from "../ForAdmin/ManageProducts/ManageProducts";
import "./Dashboard.css";
const drawerWidth = 240;

function Dashboard(props) {
  let { path, url } = useRouteMatch();
  const { user, admin, signOutUser } = useAuth();
  const history = useHistory();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dashboardLink = {
    textAlign: "left",
    position: "10px 5px",
  };
  const dashboardButton = {
    fontSize: "15px",
    color: "var(--color)",
    fontWeight: "bold",
    margin: "8px 0",
  };
  const drawer = (
    <Box
      sx={{
        height: "100%",
        background: "var(--dashboard-bg)",
        color: "white",
        display: "flex",
        justifyContent: "center",
      }}
      className="dashboard-drawer"
    >
      <Toolbar />
      {user?.email&&admin? (
        <Box
          sx={{
            fontFamily: "var(--dusis-font)",
            display: "flex",
            flexDirection: "column",
            ml: -8,
            mt: 25,
            textTransform: "none",
          }}
        >
          <NavLink style={dashboardLink} to={`/`}>
            <Button color="inherit" style={dashboardButton}>
              Home
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/manageAllOrders`}>
            <Button color="inherit" style={dashboardButton}>
              Manage All Orders
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/AddProduct`}>
            <Button color="inherit" style={dashboardButton}>
              Add a product
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/makeAdmin`}>
            <Button color="inherit" style={dashboardButton}>
              Make Admin
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/manageProducts`}>
            <Button color="inherit" style={dashboardButton}>
              Manage Products
            </Button>
          </NavLink>
          <Button
            color="inherit"
            style={dashboardButton}
            onClick={() => {
              signOutUser(history);
            }}
          >
            Log Out
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            fontFamily: "var(--dusis-font)",
            display: "flex",
            flexDirection: "column",
            ml: -8,
            mt: 25,
            textTransform: "none",
          }}
        >
          <NavLink style={dashboardLink} to={`/`}>
            <Button color="inherit" style={dashboardButton}>
              Home
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/myOrders`}>
            <Button color="inherit" style={dashboardButton}>
              My Orders
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/pay`}>
            <Button color="inherit" style={dashboardButton}>
              Pay
            </Button>
          </NavLink>
          <NavLink style={dashboardLink} to={`${url}/review`}>
            <Button color="inherit" style={dashboardButton}>
              Review
            </Button>
          </NavLink>
          <Button
            color="inherit"
            style={dashboardButton}
            onClick={() => {
              signOutUser(history);
            }}
          >
            Log Out
          </Button>
        </Box>
      )}
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "var(--dashboard-bg)",
          boxShadow: "var(--box-shadow)",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "var(--color)" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "var(--blue-color)", py: 3 }}
          >
            Phone Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: "var(--blue-color)",
                fontFamily: "var(--dosis-font )",
                mt: 15,
              }}
            >
              click any side bar link to see the page source
            </Typography>
          </Route>
          <Route path={`${path}/myOrders`}>
            <MyOrders />
          </Route>
          <Route path={`${path}/pay`}>
            <Pay />
          </Route>
          <Route path={`${path}/review`}>
            <Review />
          </Route>
          <AdminRoute path={`${path}/AddProduct`}>
            <AddProduct />
          </AdminRoute>
          <AdminRoute path={`${path}/manageAllOrders`}>
            <ManageAllProducts />
          </AdminRoute>
          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute path={`${path}/manageProducts`}>
            <ManageProducts />
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
