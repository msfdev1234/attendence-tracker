import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FirebaseBaseModel from '../../../models/FirebaseBaseModel';

const UserScreenAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userModel = new FirebaseBaseModel('users');
        const allUsers = await userModel.getAllDocuments();
        // Filter out admin users
        const filteredUsers = allUsers.filter(user => user.userType !== 'admin');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const userModel = new FirebaseBaseModel('users');
      const existingDoc = await userModel.findDocumentById(userId);
      
      if (existingDoc) {
        const newStatus = currentStatus === 'active' ? 'pending' : 'active';
        await userModel.setDocument(userId, {
          ...existingDoc,
          status: newStatus
        });
        
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const renderUserTable = (userType, title) => (
    <div className="mb-8">
      <SubTitle>{title}</SubTitle>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(user => user.userType === userType)
              .map(user => (
                <tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <StatusBadge status={user.status || 'pending'}>
                      {user.status || 'pending'}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <ActionButton
                      status={user.status}
                      onClick={() => handleStatusChange(user.id, user.status)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </ActionButton>
                  </Td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container>
      <Title>User Management</Title>
      {renderUserTable('professor', 'Professors')}
      {renderUserTable('student', 'Students')}
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #666;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'active' ? '#e6f4ea' : '#fff3e0'};
  color: ${props => 
    props.status === 'active' ? '#1e8e3e' : '#fb8c00'};
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.status === 'active' ? '#dc3545' : '#28a745'};
  color: white;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  color: #333;
  font-weight: 500;
`;

export default UserScreenAdmin;