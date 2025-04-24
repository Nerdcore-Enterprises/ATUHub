import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import GenericPage from '../../components/genericPage';
import SearchBar from '../../components/SearchBar';
import Job from '../../components/Jobs/Job';
import LoadingIcon from '../../components/GenericErrorPage/GenericLoadingPage';
import Alert from '../../components/Alert';
import HeaderWithBack from '../../components/HeaderWithBack';
import GenericModal from '../../components/GenericModal/GenericModal';
import Widget from '../../components/BaseWidgets/Widget';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

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
        const requirementsArray = typeof job.Requirements === 'string' ? JSON.parse(job.Requirements || '[]') : (job.Requirements || []);
        const responsibilitiesArray = typeof job.Responsibilities === 'string' ? JSON.parse(job.Responsibilities || '[]') : (job.Responsibilities || []);

        setSelectedJob({
            ...job,
            applyExternally: job.applyExternally || false,
            Requirements: requirementsArray,
            Responsibilities: responsibilitiesArray
        });
        setModalType('edit');
        setModalVisible(true);
    };

    const openCreateModal = () => {
        setSelectedJob({
            Name: '', 
            Description: '',
            Address: '',
            SalaryType: '',
            Salary: '',
            ContactType: '',
            ContactInfo: '',
            applyExternally: false,
            Requirements: [],
            Responsibilities: []
        });
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

    const handleModalCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedJob(prev => ({ ...prev, [name]: checked }));
    };

    const handleArrayChange = (e, field, index) => {
        const { value } = e.target;
        setSelectedJob(prev => {
            const updatedArray = prev[field] ? [...prev[field]] : [];
            updatedArray[index] = value;
            return { ...prev, [field]: updatedArray };
        });
    };

    const handleAddToArray = (field) => {
        setSelectedJob(prev => {
            const updatedArray = prev[field] ? [...prev[field]] : [];
            updatedArray.push("");
            return { ...prev, [field]: updatedArray };
        });
    };

    const handleRemoveFromArray = (field, index) => {
        setSelectedJob(prev => {
            const updatedArray = prev[field] ? [...prev[field]] : [];
            updatedArray.splice(index, 1);
            return { ...prev, [field]: updatedArray };
        });
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
        <>
            <GenericPage>
                <HeaderWithBack>Job Management Page</HeaderWithBack>
                <div className="flex justify-between items-center gap-2">
                    <SearchBar query={searchQuery} setQuery={setSearchQuery} />
                    <button
                        onClick={openCreateModal}
                        className="flex flex-col w-14 h-14 transition-colors duration-150 justify-center bg-[#0077FFAA] hover:bg-[#0077FF] text-white rounded-full shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                    {filteredJobs.map(job => (
                        <Widget key={job.id} className="flex flex-col bg-[#00000033] justify-between p-4 rounded-2xl shadow-[0_0_0.5vh_rgba(0,0,0,0.5)] gap-4">
                            <Job job={job} />
                            <div className="mt-2 flex justify-end gap-2">
                                <button
                                    onClick={() => openEditModal(job)}
                                    className="transition-colors duration-150 px-4 py-2 bg-[#0077FFAA] hover:bg-[#0077FF] text-white rounded-full w-24 shadow-[0_0_0.5vh_rgba(0,0,0,0.5)]"
                                >
                                    Edit
                                </button>
                            </div>
                        </Widget>
                    ))}
                </div>
            </GenericPage>

            <GenericModal visible={modalVisible} onClose={closeModal}>
                <div className='p-6'>
                    {(modalType === 'edit' || modalType === 'create') && selectedJob && (
                        <div className="overflow-y-scroll max-h-[80vh]">
                            <h2 className="text-2xl mb-4">{modalType === 'create' ? 'Create New Job' : 'Edit Job'}</h2>
                            <div className="flex flex-col">
                                <label className="mt-4">Name:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="Name"
                                    placeholder="Name of the job"
                                    value={selectedJob.Name}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4">Description:</label>
                                <Textarea
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    name="Description"
                                    type='text'
                                    value={selectedJob.Description}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4">Location:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="Address"
                                    placeholder="215 W O St, Russellville, AR 72801"
                                    value={selectedJob.Address}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4">Salary Type:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="SalaryType"
                                    placeholder="Hourly / Contract / Salary"
                                    value={selectedJob.SalaryType}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4">Salary:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="Salary"
                                    placeholder="11.00"
                                    value={selectedJob.Salary}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4 inline-flex items-center">
                                    <Input 
                                        type="checkbox"
                                        name="applyExternally" 
                                        checked={selectedJob.applyExternally || false} 
                                        onChange={handleModalCheckboxChange}
                                    />
                                    <span className="ml-2">Apply Externally</span>
                                </label>

                                <label className="mt-4">Contact Method:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="ContactType"
                                    placeholder="Email / Link"
                                    value={selectedJob.ContactType}
                                    onChange={handleModalInputChange}
                                />

                                <label className="mt-4">Contact Info:</label>
                                <Input
                                    className='py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                    type='text'
                                    name="ContactInfo"
                                    placeholder="ddover1@atu.edu / https://atu.edu"
                                    value={selectedJob.ContactInfo}
                                    onChange={handleModalInputChange}
                                />

                                <div className="mt-4">
                                    <label>Requirements:</label>
                                    {selectedJob.Requirements && selectedJob.Requirements.map((req, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <Input
                                                className='flex w-full py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                                type="text" 
                                                name={`Requirements-${index}`} 
                                                value={req} 
                                                onChange={(e) => handleArrayChange(e, 'Requirements', index)}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveFromArray('Requirements', index)}
                                                className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-2"
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddToArray('Requirements')}
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <label>Responsibilities:</label>
                                    {selectedJob.Responsibilities && selectedJob.Responsibilities.map((resp, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <Input
                                                className='flex w-full py-1 px-2 text-sm overflow-y-scroll rounded-lg border-2 border-[#00000033] active:*:outline-none focus:outline-none'
                                                type="text" 
                                                name={`Responsibilities-${index}`} 
                                                value={resp} 
                                                onChange={(e) => handleArrayChange(e, 'Responsibilities', index)}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveFromArray('Responsibilities', index)}
                                                className="ml-2 bg-red-500 hover:bg-red-600 text-white rounded px-2"
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        type="button" 
                                        onClick={() => handleAddToArray('Responsibilities')}
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded px-2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>

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
        </>
    );
}