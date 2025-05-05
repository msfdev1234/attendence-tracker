import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaChartBar, FaCog, FaBars, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";


const SidebarContainer = styled.div`
  width: ${({ collapsed }) => (collapsed ? "80px" : "250px")};
  min-height: 100vh;
  justify-content: space-between;
  background-color: #2f54eb;
  color: white;
  padding: 20px;
  transition: all 0.3s;
  position: relative; // Added for absolute positioning of the toggle button
`;

const Logo = styled.h1`
  font-size: 20px;
  color: white;
  margin-bottom: 2rem;
  display: ${({ collapsed }) => (collapsed ? "none" : "block")};
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ collapsed }) => (collapsed ? "10px" : "20px")};
  gap: 1rem;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 4px; // Rounded corners for aesthetics

  &:hover {
    background-color: #1d3461; // Darker shade for hover
  }

  &.active {
    background-color: #4169e1; // Distinct color for active state
    color: white;
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute; // Positioned absolutely to top-right corner
  top: 20px;
  right: 20px; // Right align within the sidebar
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #a9a9a9; // Change color on hover for better visibility
  }
`;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
     // Add this line to check the value of confirmLogout
    if (confirmLogout) {
      localStorage.clear();
      navigate('/');
    }
  };
  return (
    <SidebarContainer collapsed={collapsed}>
      <CollapseButton onClick={() => setCollapsed(!collapsed)}>
        <FaBars />
      </CollapseButton>
      <Logo collapsed={collapsed}>My Studies</Logo>
      <LinkContainer>
        <StyledLink to="/user/dashboard/welcome" activeClassName="active">
          <FaHome /> {collapsed ? "" : "Dashboard"}
        </StyledLink>
        <StyledLink to="/user/dashboard/my-courses" activeClassName="active">
          <FaBook /> {collapsed ? "" : "My Courses"}
        </StyledLink>
        <StyledLink to="/user/dashboard/analytics" activeClassName="active">
          <FaChartBar /> {collapsed ? "" : "Analytics"}
        </StyledLink>
        <StyledLink to="/user/dashboard/settings" activeClassName="active">
          <FaCog /> {collapsed ? "" : "Settings"}
        </StyledLink>
        <StyledLink activeClassName="active" onClick={handleLogout}>
          <FaSignOutAlt /> {collapsed ? "" : "Logout"}
        </StyledLink>
      </LinkContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
