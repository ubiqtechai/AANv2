import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Check, X, User, Search, Filter, ArrowUpDown } from 'lucide-react';
import { subscribeToUsers, updateUserStatus } from '@/services/userService';
import type { User as UserType } from '@/types';

type SortField = 'fullName' | 'email' | 'primaryJurisdiction' | 'status' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [processingUser, setProcessingUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToUsers(
      (updatedUsers) => {
        setUsers(updatedUsers);
        setLoading(false);
      },
      (error) => {
        console.error('Error loading users:', error);
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  async function handleApprove(userId: string) {
    try {
      setProcessingUser(userId);
      await updateUserStatus(userId, 'approved');
      setSelectedUser(null);
      setError('');
    } catch (err) {
      console.error('Error approving user:', err);
      setError('Failed to approve user. Please try again.');
    } finally {
      setProcessingUser(null);
    }
  }

  async function handleReject(userId: string) {
    try {
      setProcessingUser(userId);
      await updateUserStatus(userId, 'rejected');
      setSelectedUser(null);
      setError('');
    } catch (err) {
      console.error('Error rejecting user:', err);
      setError('Failed to reject user. Please try again.');
    } finally {
      setProcessingUser(null);
    }
  }

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.primaryJurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === 'createdAt') {
        return sortOrder === 'asc' 
          ? a.createdAt.seconds - b.createdAt.seconds
          : b.createdAt.seconds - a.createdAt.seconds;
      }
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-2 text-gray-600">Review and manage user registrations</p>
      </header>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="p-6 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Users Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('fullName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>User</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('primaryJurisdiction')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Jurisdiction</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {user.primaryJurisdiction}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        user.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {user.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-900 mr-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(user.id);
                            }}
                            disabled={processingUser === user.id}
                          >
                            {processingUser === user.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(user.id);
                            }}
                            disabled={processingUser === user.id}
                          >
                            {processingUser === user.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-900">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem label="Full Name" value={selectedUser.fullName} />
                  <DetailItem label="Username" value={selectedUser.username} />
                  <DetailItem label="Email" value={selectedUser.email} />
                  <DetailItem label="Phone" value={selectedUser.phone || 'N/A'} />
                  <DetailItem label="Primary Jurisdiction" value={selectedUser.primaryJurisdiction} />
                  <DetailItem label="Registration Number" value={selectedUser.registrationNumber || 'N/A'} />
                  <DetailItem label="Office Address" value={selectedUser.officeAddress} />
                  <DetailItem label="Team Size" value={selectedUser.teamSize.toString()} />
                  <DetailItem label="Website" value={selectedUser.website || 'N/A'} />
                  <DetailItem label="LinkedIn" value={selectedUser.linkedIn || 'N/A'} />
                  <DetailItem label="Years of Experience" value={selectedUser.yearsOfExperience.toString()} />
                  <DetailItem label="Specialty Areas" value={selectedUser.specialtyAreas.join(', ')} />
                  <DetailItem 
                    label="Created At" 
                    value={new Date(selectedUser.createdAt.seconds * 1000).toLocaleString()} 
                  />
                  <DetailItem 
                    label="Updated At" 
                    value={new Date(selectedUser.updatedAt.seconds * 1000).toLocaleString()} 
                  />
                </div>

                {selectedUser.status === 'pending' && (
                  <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        handleReject(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      disabled={processingUser === selectedUser.id}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        handleApprove(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      disabled={processingUser === selectedUser.id}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}