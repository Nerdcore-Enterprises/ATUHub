import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import GenericPage from '../../components/genericPage';
import SearchBar from '../../components/SearchBar';
import Job from '../../components/Jobs/Job';
import LoadingIcon from '../../components/GenericErrorPage/GenericLoadingPage';
import Alert from '../../components/Alert';
import HeaderWithBack from '../../components/HeaderWithBack';
import GenericModal from '../../components/GenericModal/GenericModal';

export default function JobAdminPage() {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Admin permission state
    const [checkingPermission, setCheckingPermission] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // Modal state
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);

    // Check if the user is an administrator
    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch('/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.ok) {
                    const profile = await response.json();

                    let rolesArray = [];

                    if (typeof profile.roles === "string") {
                        try {
                            rolesArray = JSON.parse(profile.roles);
                            if (!Array.isArray(rolesArray)) {
                                rolesArray = [];
                            }
                        } catch (error) {
                            rolesArray = [profile.roles];
                        }
                    } else if (Array.isArray(profile.roles)) {
                        rolesArray = profile.roles;
                    }

                    if (rolesArray.includes('Administrator')) {
                        setIsAdmin(true);
                    }
                } else {
                    setError('Failed to fetch user profile');
                }
            } catch (err) {
                setError('Error fetching user profile.');
            } finally {
                setCheckingPermission(false);
            }
        }
        fetchUserProfile();
    }, []);

    // After confirming admin permissions, fetch jobs
    useEffect(() => {
        if (!isAdmin) {
            setLoading(false);
            return;
        }
        async function fetchJobs() {
            try {
                const response = await fetch('/api/jobs');
                const data = await response.json();
                if (data.success || data.jobs) {
                    setJobs(data.jobs);
                } else {
                    setError(data.message || 'Failed to load jobs');
                }
            } catch (err) {
                setError('Error fetching jobs.');
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [isAdmin]);

    const openEditModal = (job) => {
        setSelectedJob({ ...job });
        setModalType('edit');
        setModalVisible(true);
    };

    const openCreateModal = () => {
        setSelectedJob({ Name: '', Description: '' });
        setModalType('create');
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalType('');
        setSelectedJob(null);
    };

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedJob(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveJob = async () => {
        try {
            let response;
            if (modalType === 'create') {
                response = await fetch('/api/jobs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedJob)
                });
            } else if (modalType === 'edit') {
                response = await fetch(`/api/jobs/${selectedJob.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(selectedJob)
                });
            }
            if (response.ok) {
                const updatedJob = await response.json();

                if (modalType === 'create') {
                    setJobs(prev => [...prev, updatedJob.job]);
                } else {
                    setJobs(prev => prev.map(job => job.id === updatedJob.job.id ? updatedJob.job : job));
                }
                closeModal();
            } else {
                alert("Failed to save job.");
            }
        } catch (err) {
            alert("Error saving job.");
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (checkingPermission || loading) {
        return (
            <div className="flex justify-center h-screen">
                <LoadingIcon />
            </div>
        );
    }

    if (error) {
        return (
            <GenericPage>
                <Alert severity="danger" text={error} />
            </GenericPage>
        );
    }

    if (!isAdmin) {
        return (
            <GenericPage>
                <Alert severity="danger" text="You do not have permission to view this page." />
            </GenericPage>
        );
    }

    return (
        <GenericPage>
            <HeaderWithBack>Job Management Page</HeaderWithBack>
            <div className="flex justify-between items-center gap-2">
                <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                <button
                    onClick={openCreateModal}
                    className="flex p-5 transition-colors duration-150 bg-[#0077FFAA] hover:bg-[#0077FF] text-white rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map(job => (
                    <div key={job.id} className="flex flex-col bg-[#00000033] justify-between p-4 rounded-2xl shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] gap-4">
                        <Job job={job} />
                        <div className="mt-2 flex justify-end gap-2">
                            <button
                                onClick={() => openEditModal(job)}
                                className="transition-colors duration-150 px-4 py-2 bg-[#0077FFAA] hover:bg-[#0077FF] text-white rounded-full w-24 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <GenericModal visible={modalVisible} onClose={closeModal}>
                <div className='p-6'>
                    {(modalType === 'edit' || modalType === 'create') && selectedJob && (
                        <div>
                            <h2 className="text-2xl mb-4">{modalType === 'create' ? 'Create New Job' : 'Edit Job'}</h2>
                            <div className="flex flex-col gap-4">
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="Name"
                                        value={selectedJob.Name}
                                        onChange={handleModalInputChange}
                                        className="w-full p-2 border rounded mt-1"
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        name="Description"
                                        value={selectedJob.Description}
                                        onChange={handleModalInputChange}
                                        className="w-full p-2 border rounded mt-1"
                                    />
                                </label>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-full"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveJob}
                                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </GenericModal>
        </GenericPage>
    );
}