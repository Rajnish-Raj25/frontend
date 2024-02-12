import React, { useEffect, useState } from "react";
import { data } from "./Data";
import "./styles.css"; // Import the CSS file

const Fetch = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // Track which user is being edited
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Simulating asynchronous behavior with setTimeout
    setTimeout(() => {
      setUserData(data);
      setLoading(false);
    }, 1000); // Adjust the delay as needed
  }, []);

  const handleDeleteUser = (index) => {
    const updatedUser = userData.filter((_, id) => id !== index);
    setUserData(updatedUser);
  };

  const toggleHeart = (index) => {
    setUserData((prevUserData) => {
      return prevUserData.map((user, i) => {
        if (i === index) {
          return { ...user, filled: !user.filled };
        }
        return user;
      });
    });
  };
  const handleEditUser = (ind) => {
    setEditingUser({ ...userData[ind], index: ind });
    setShowModal(true);
  };

  const handleModalInputChange = (e, field) => {
    const { value } = e.target;
    setEditingUser((prevUser) => ({
      ...prevUser,
      profile: { ...prevUser.profile, [field]: value },
    }));
  };

  const handleSaveChanges = () => {
    const updatedUserData = userData.map((user, index) =>
      index === editingUser.index ? editingUser : user
    );
    setUserData(updatedUserData);
    setShowModal(false);
  };

  const renderModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="heading_container">
          <h2 className="modal-heading">Edit User</h2>
          <p className="modal-heading" onClick={() => setShowModal(false)}>
            X
          </p>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={editingUser.profile.name}
              onChange={(e) => handleModalInputChange(e, "name")}
              className="modal-input"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={editingUser.profile.email}
              onChange={(e) => handleModalInputChange(e, "email")}
              className="modal-input"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              value={editingUser.profile.phone}
              onChange={(e) => handleModalInputChange(e, "phone")}
              className="modal-input"
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website *</label>
            <input
              type="url"
              id="website"
              value={editingUser.profile.website}
              onChange={(e) => handleModalInputChange(e, "website")}
              className="modal-input"
              placeholder="Website"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleSaveChanges}>
              Ok
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) {
    return <img src="./__Iphone-spinner-1.gif" alt="" className="loader" />;
  }

  return (
    <div className="container">
      {userData &&
        userData.map((user, index) => (
          <div className="card" key={index}>
            <div className="image_container">
              <img
                src={user.profile.image_url}
                alt="user"
                className="profile-image"
              />
            </div>

            <div className="user-details">
              <div className="user_info1">
                <h3 className="no_margin">{user.profile.name}</h3>
                <div className="user-info">
                  <img
                    src="https://w7.pngwing.com/pngs/331/955/png-transparent-email-marketing-computer-icons-email-address-email-miscellaneous-text-rectangle-thumbnail.png"
                    alt=""
                  />
                  <p>{user.profile.email}</p>
                </div>
                <div className="user-info">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/010/829/986/small/phone-icon-in-trendy-flat-style-free-png.png"
                    alt=""
                  />
                  <p>{user.profile.phone}</p>
                </div>
                <div className="user-info">
                  <img
                    src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-file-globe-icon-svg-wikimedia-commons-21.png"
                    alt=""
                  />
                  <p>{user.profile.website}</p>
                </div>
              </div>

              <div className="actions">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={toggleHeart}
                  className="action-icon"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill={user.filled ? "red" : "none"}
                  stroke="red"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => toggleHeart(index)}
                  // className="action-icon"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <i
                  className="fa fa-edit"
                  style={{ fontSize: "24px" }}
                  onClick={() => handleEditUser(index)}
                ></i>
                <i
                  className="fa fa-trash-o"
                  style={{ fontSize: "24px" }}
                  onClick={() => handleDeleteUser(index)}
                ></i>
              </div>
            </div>
          </div>
        ))}
      {/* Modal for editing user */}
      {showModal && renderModal()}
    </div>
  );
};

export default Fetch;
