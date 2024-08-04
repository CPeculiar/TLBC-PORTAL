import React from 'react';

function Members() {
  const members = [
    { id: 1, name: 'Kemi Adewale', mobile: '08199237456', email: 'kemiwale@gmail.com', image: '/path-to-kemi-image.jpg' },
    { id: 2, name: 'Natashsa Hertfordshire', mobile: '09069237456', email: 'nat31245@outlook.com', image: '/path-to-natashsa-image.jpg' },
    { id: 3, name: 'Chukwuma Ejiofor', mobile: '08023741892', email: 'mailchuk@ghs.com', image: '/path-to-chukwuma-image.jpg' },
    { id: 4, name: 'Usman Buhari', mobile: '09011227882', email: 'usmanb@gmail.com', image: '/path-to-usman-image.jpg' },
    { id: 5, name: 'Lolade Ajumogobia', mobile: '08022173466', email: 'lolaju@yahoo.com', image: '/path-to-lolade-image.jpg' },
    { id: 6, name: 'Ovia Kalamari', mobile: '08029108238', email: 'ovie@icloud.com', image: '/path-to-ovia-image.jpg' },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Members</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary">Add Members</button>
        <div className="input-group w-50">
          <input type="text" className="form-control" placeholder="Search by name, mobile or email" />
          <button className="btn btn-outline-secondary" type="button">Advanced Search</button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>
                  <input type="checkbox" />
                  <img src={member.image} alt={member.name} className="rounded-circle ml-2" width="30" height="30" />
                </td>
                <td>{member.name}</td>
                <td>{member.mobile}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Members;