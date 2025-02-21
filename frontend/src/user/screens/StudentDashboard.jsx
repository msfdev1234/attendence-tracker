// src/Screens/User/StudentDashboard.jsx or a similar file
import styled from "styled-components";

import { Outlet } from "react-router-dom"; // Assuming React Router v6
import Sidebar from "../components/Sidebar-user";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

const Content = styled.div`
	flex-grow: 1; // Ensures it takes up the remaining space
	display: flex;
	flex-direction: column;
	margin-left: ${({ marginLeft }) => marginLeft};
	background-color: aliceblue;
`;

const StudentDashboard = () => {
	return (
		<LayoutContainer>
			<Sidebar />

			<Content className="ms-3">
				<div className="row card mb-2 p-3 d-flex flex-row justify-content-between">
					<div className="col-lg-3 col-md-5 col-sm-4 d-flex flex-row">
						<div className="input-group rounded col-1">
							<input
								type="search"
								className="form-control rounded"
								placeholder="Search"
								aria-label="Search"
								aria-describedby="search-addon"
							/>
						</div>

						<span className="input-group-text border-0 ms-1" id="search-addon">
							<FontAwesomeIcon icon={faSearch} />
						</span>
					</div>

					<div className="col-lg-3 col-md-5 col-sm-5 d-flex flex-row justify-content-end align-items-center">
						<div>
							<FontAwesomeIcon icon={faUser} />
							<h7 className="ms-2">My Account</h7>
						</div>
					</div>
				</div>
				<Outlet /> {/* This will render the matched child route components */}
			</Content>
		</LayoutContainer>
	);
};

export default StudentDashboard;
