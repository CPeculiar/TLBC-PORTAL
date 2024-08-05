import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Table,
  Form,
  ListGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
} from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { X, PersonCircle, Eye } from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { List } from "lucide-react";
import "../Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchFilter, setSearchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Add this if you're tracking total pages
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const tootalMembers = localStorage.getItem("tootalMembers") || "0";
  const firstName = localStorage.getItem("firstName") || "User";
  const [searchOptions, setSearchOptions] = useState({
    showAllMembers: false,
    name: "",
    zone: "",
    church: "",
    city: "",
    birthDateBefore: "",
    birthDateAfter: "",
    country: "",
    enrolledInWFS: "",
    gender: "",
    invitedBy: "",
    stateOfOrigin: "",
    stateOfResidence: "",
    wfsGraduationYearMin: "",
    wfsGraduationYearMax: "",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleSearchOptionChange = (option, value) => {
    setSearchOptions({ ...searchOptions, [option]: value });
  };

  const handleSearch = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found. Please login first.");
      return;
    }
    setIsLoading(true);


    try {
      let url = "https://tlbc-platform-api.onrender.com/api/users/";
      

      if (!searchOptions.showAllMembers) {
        const params = new URLSearchParams();
        Object.entries(searchOptions).forEach(([key, value]) => {
          if (value && key !== "showAllMembers") params.append(key, value);
        });
        url += `?${params.toString()}`;
      } 

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      setSearchResults(response.data.results);
      setTotalMembers(response.data.count);
      localStorage.setItem("tootalMembers", response.data.count);
      
    } catch (error) {
      console.error("Error fetching search results:", error);
    }finally {
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchOptions({
      showAllMembers: false,
      name: "",
      zone: "",
      church: "",
      city: "",
      birthDateBefore: "",
      birthDateAfter: "",
      country: "",
      enrolledInWFS: "",
      gender: "",
      invitedBy: "",
      stateOfOrigin: "",
      stateOfResidence: "",
      wfsGraduationYearMin: "",
      wfsGraduationYearMax: "",
    });
    setSearchResults([]);
    setCurrentPage(1); // Reset to default page
    setTotalPages(1);
    setTotalMembers(0)
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Implement pagination logic here
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const renderSearchComponent = () => (
    <>
      <h2 className="mb-4">Search</h2>
      <Form>
        <div className="row">
          <div className="col-12 mb-3">
            <Form.Check
              type="checkbox"
              label="Show All Members"
              checked={searchOptions.showAllMembers}
              onChange={(e) =>
                handleSearchOptionChange("showAllMembers", e.target.checked)
              }
            />
          </div>
        </div>
        {!searchOptions.showAllMembers && (
          <>
            <div className="row">
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={searchOptions.name}
                  onChange={(e) =>
                    handleSearchOptionChange("name", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Zone"
                  value={searchOptions.zone}
                  onChange={(e) =>
                    handleSearchOptionChange("zone", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Church"
                  value={searchOptions.church}
                  onChange={(e) =>
                    handleSearchOptionChange("church", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={searchOptions.city}
                  onChange={(e) =>
                    handleSearchOptionChange("city", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
            <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="date"
                  placeholder="Birth Date (Before)"
                  value={searchOptions.birthDateBefore}
                  onChange={(e) =>
                    handleSearchOptionChange("birthDateBefore", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="date"
                  placeholder="Birth Date (After)"
                  value={searchOptions.birthDateAfter}
                  onChange={(e) =>
                    handleSearchOptionChange("birthDateAfter", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Country"
                  value={searchOptions.country}
                  onChange={(e) =>
                    handleSearchOptionChange("country", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Select
                  value={searchOptions.enrolledInWFS}
                  onChange={(e) =>
                    handleSearchOptionChange("enrolledInWFS", e.target.value)
                  }
                >
                  <option value="">Enrolled in WFS</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6 col-lg-3 mb-3">
                <Form.Select
                  value={searchOptions.gender}
                  onChange={(e) =>
                    handleSearchOptionChange("gender", e.target.value)
                  }
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="Invited By"
                  value={searchOptions.invitedBy}
                  onChange={(e) =>
                    handleSearchOptionChange("invitedBy", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="State of Origin"
                  value={searchOptions.stateOfOrigin}
                  onChange={(e) =>
                    handleSearchOptionChange("stateOfOrigin", e.target.value)
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="text"
                  placeholder="State of Residence"
                  value={searchOptions.stateOfResidence}
                  onChange={(e) =>
                    handleSearchOptionChange("stateOfResidence", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
            <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="number"
                  placeholder="WFS Graduation Year (Min)"
                  value={searchOptions.wfsGraduationYearMin}
                  onChange={(e) =>
                    handleSearchOptionChange(
                      "wfsGraduationYearMin",
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="col-md-6 col-lg-3 mb-3">
                <Form.Control
                  type="number"
                  placeholder="WFS Graduation Year (Max)"
                  value={searchOptions.wfsGraduationYearMax}
                  onChange={(e) =>
                    handleSearchOptionChange(
                      "wfsGraduationYearMax",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </>
        )}
        <div className="row">
        <div className="col-6 mb-3">
            <Button onClick={handleSearch}
            className="w-100"
            disabled={isLoading}
            >
            {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
          <div className="col-6 mb-3">
            <Button variant="secondary" 
            onClick={handleClearSearch}
            className="w-100"
            > Clear 
            </Button>
          </div>
        </div>
      </Form>

    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Zone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.slice((currentPage - 1) * 10, currentPage * 10).map((user) => (
            <tr key={user.username}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.gender}</td>
              <td>{user.zone}</td>
              <td>
                <Button variant="link" onClick={() => handleViewProfile(user)}>
                  <Eye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">Search Results: {totalMembers}</p>
        <p className="mb-2 mb-md-0">Showing {Math.min((currentPage - 1) * 10 + 1, totalMembers)} - {Math.min(currentPage * 10, totalMembers)} of {totalMembers}</p>
        <Pagination className="mb-0">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * 10 >= totalMembers} />
        </Pagination>
      </div>
    </>
  );

  const renderProfileModal = () => (
    <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedUser && (
          <div>
            <h3>{selectedUser.first_name} {selectedUser.last_name}</h3>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone Number:</strong> {selectedUser.phone_number}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Invited By:</strong> {selectedUser.invited_by}</p>
            <p><strong>Birth Date:</strong> {selectedUser.birth_date}</p>
            <p><strong>Origin State:</strong> {selectedUser.origin_state}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Permanent Address:</strong> {selectedUser.perm_address}</p>
            <p><strong>City:</strong> {selectedUser.city}</p>
            <p><strong>State:</strong> {selectedUser.state}</p>
            <p><strong>Country:</strong> {selectedUser.country}</p>
            <p><strong>Church:</strong> {selectedUser.church}</p>
            <p><strong>Zone:</strong> {selectedUser.zone}</p>
            <p><strong>Joined At:</strong> {selectedUser.joined_at}</p>
            <p><strong>First Ministry Arm:</strong> {selectedUser.first_min_arm}</p>
            <p><strong>Current Ministry Arm:</strong> {selectedUser.current_min_arm}</p>
            <p><strong>Current Offices:</strong> {selectedUser.current_offices}</p>
            <p><strong>Previous Offices:</strong> {selectedUser.previous_offices}</p>
            <p><strong>Suspension Record:</strong> {selectedUser.suspension_record}</p>
            <p><strong>WFS Graduation Year:</strong> {selectedUser.wfs_graduation_year}</p>
            <p><strong>Enrolled in WFS:</strong> {selectedUser.enrolled_in_wfs ? 'Yes' : 'No'}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );


  /*  
          LOGOUT
    */
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    setIsLoading(true);

    if (!refreshToken) {
      console.error("No refresh token found");
      // alert("An error occurred: " + error.message);
      alert("No refresh token found. ");
      return;
    }

    try {
      const response = await fetch(
        "https://tlbc-platform-api.onrender.com/api/logout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;

        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error("An unknown error occurred");
        }

        // Extract the first error message
        const firstErrorMessage = Object.values(errorData).flat()[0];
        throw new Error(firstErrorMessage);
      }

      if (response.ok) {
        console.log("Logged out successfully");
        localStorage.removeItem("refreshToken"); // Clear the token on logout
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
    setShowLogoutModal(false);
  };

  const chartData = [
    { name: "Total", value: tootalMembers },
    { name: "Male", value: totalMale },
    { name: "Female", value: totalFemale },
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return (
          <>
            <h2>Dashboard Overview</h2>
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Total Members</Card.Title>
                    <Card.Text>{tootalMembers}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Total Male</Card.Title>
                    <Card.Text>{totalMale}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4 mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>Total Female</Card.Title>
                    <Card.Text>{totalFemale}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="mb-4" style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      case "search":
        return renderSearchComponent();
      case "reports":
        return <h2>Reports</h2>;
      case "userManagement":
        return (
          <>
            <h2>User Management</h2>
            <ListGroup>
              <ListGroup.Item>Create a User</ListGroup.Item>
              <ListGroup.Item>Edit User's Details</ListGroup.Item>
              <ListGroup.Item>Delete a User</ListGroup.Item>
              <ListGroup.Item>Upload Batch Document</ListGroup.Item>
            </ListGroup>
          </>
        );
      case "announcement":
        return (
          <>
            <h2>Announcement</h2>
            <Button className="mb-3">Post Announcement</Button>
            <div className="row">
              <div className="col-md-6 mb-3">
                <h3>Upcoming Events</h3>
                <Table striped bordered hover>
                  {/* <thead>
                    <tr>
                      <th>ID</th>
                      <th>Event Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingEvents.map((event) => (
                      <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.name}</td>
                      </tr>
                    ))}
                  </tbody> */}
                </Table>
              </div>
              <div className="col-md-6 mb-3">
                <h3>Birthdays</h3>
                <Table striped bordered hover>
                  {/* <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Full Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {birthdays.map((person, index) => (
                      <tr key={person.id}>
                        <td>{index + 1}</td>
                        <td>{`${person.firstName} ${person.lastName}`}</td>
                      </tr>
                    ))}
                  </tbody> */}
                </Table>
              </div>
            </div>
          </>
        );
      case "profile":
        return (
        <>
        <h3>Profile</h3>
        
        {renderProfileModal()}
        </>
        )
        // return (
        //   <>
        //     <h2>Profile</h2>
        //     {renderProfileModal()}
        //   </>
        // );
      case "settings":
        return (
          <>
            <h2>Settings</h2>
            <ListGroup>
              <ListGroup.Item>Make Admin</ListGroup.Item>
              <ListGroup.Item>Delete an Admin</ListGroup.Item>
              <ListGroup.Item>Create a User</ListGroup.Item>
              <ListGroup.Item>Delete a User</ListGroup.Item>
            </ListGroup>
          </>
        );
      default:
        return <h2>Select a menu item</h2>;
    }
  };


  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen || !isMobile ? "open" : ""}`}>
        <Button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
          <X size={28} />
        </Button>
        <div className="sidebar-header">
          <PersonCircle size={54} className="text-primary mb-2" style={{marginRight: '5px'}} />
          <h5 className="mb-3">{firstName}</h5>
          <h6 className="text">
            {" "}
            <br />
            <br />
            Admin
          </h6>
        </div>
        <nav className="sidebar-nav">
          <a
            href="#"
            className={activeComponent === "dashboard" ? "active" : ""}
            onClick={() => setActiveComponent("dashboard")}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={activeComponent === "search" ? "active" : ""}
            onClick={() => setActiveComponent("search")}
          >
            Search
          </a>
          <a
            href="#"
            className={activeComponent === "reports" ? "active" : ""}
            onClick={() => setActiveComponent("reports")}
          >
            Reports
          </a>
          <a
            href="#"
            className={activeComponent === "userManagement" ? "active" : ""}
            onClick={() => setActiveComponent("userManagement")}
          >
            User Management
          </a>
          <a
            href="#"
            className={activeComponent === "announcement" ? "active" : ""}
            onClick={() => setActiveComponent("announcement")}
          >
            Announcement
          </a>
          <a
            href="#"
            className={activeComponent === "profile" ? "active" : ""}
            onClick={() => setActiveComponent("profile")}
          >
            Profile
          </a>
          <a
            href="#"
            className={activeComponent === "settings" ? "active" : ""}
            onClick={() => setActiveComponent("settings")}
          >
            Settings
          </a>
          <a href="#" onClick={() => setShowLogoutModal(true)}>
            Logout
          </a>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}


      {/* Content */}
      <div className="content">

        {/* Navbar */}
        {/* <Navbar bg="light" expand="lg" className="mb-4">
          {isMobile && (
            <Button className="menu-icon" onClick={() => setSidebarOpen(true)} style={{backgroundColor: 'transparent', border: 'none'}}>
              <List size={30} />
            </Button>
          )}
          <Navbar.Brand className="ml-auto">Admin Dashboard</Navbar.Brand>
        </Navbar> */}
        
        <Navbar bg="light" expand="lg" className="mb-4">
          {isMobile && (
            <Button
              className="menu-icon"
              onClick={() => setSidebarOpen(true)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                textDecoration: "none",
              }}
            >
              <List size={30} />
            </Button>
          )}
          <Navbar.Brand className="mx-auto">Admin Dashboard</Navbar.Brand>
        </Navbar>

        {/* Main Content */}
        <div className="container-fluid">
        {renderComponent()}
      </div>
      </div>

      {renderProfileModal()}

      {/* Main Content */}
      {/* <div className="main-content">
        <Navbar bg="light" expand="lg" className="mb-4">
          {isMobile && (
            <Button 
              variant="outline-primary" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-2"
            >
              <List size={24} />
            </Button>
          )}
          <Navbar.Brand className="mx-auto">Admin Dashboard</Navbar.Brand>
        </Navbar>

        <div className="content-wrapper">
          {renderComponent()}
        </div>
      </div> */}

      {/* Logout Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
