import React from 'react';

export default function Job({ job }) {
    const requirements = JSON.parse(job.Requirements);
    const responsibilities = JSON.parse(job.Responsibilities);

    return (
        <div className="flex items-center justify-between min-h-32 rounded-2xl">
            <div className="flex gap-4 items-center">
                <p className="font-mono">{job.id}</p>
                <div className="flex flex-col gap-3">
                    <p className="text-2xl font-semibold">{job.Name}</p>
                    <p className="text-sm font-semibold">{job.Description}</p>
                    <p className="text-sm font-semibold">{job.Address}</p>
                    <div className="flex gap-2 text-xs font-semibold">
                        <p>{job.SalaryType}</p>
                        <p className="font-mono border-l-2 border-gray-500 pl-2">{job.Salary}</p>
                        <p className="border-l-2 border-gray-500 pl-2">{job.Type}</p>
                    </div>
                    {requirements.length > 0 && (
                        <div className="text-xs font-semibold">
                            <p className="text-sm font-bold">Requirements:</p>
                            {
                                requirements.map((data, index) => (
                                    <p key={index}>&bull; {data}</p>
                                ))
                            }
                        </div>
                    )}
                    {responsibilities.length > 0 && (
                        <div className="text-xs font-semibold">
                            <p className="text-sm font-bold">Responsibilities:</p>
                            {
                                responsibilities.map((data, index) => (
                                    <p key={index}>&bull; {data}</p>
                                ))
                            }
                        </div>
                    )}
                    <p className="text-xs font-mono">{job.CreatedAt}</p>
                    <div className="flex gap-2 text-xs font-semibold">
                        <p>{job.ContactType}</p>
                        <p className="font-mono border-l-2 border-gray-500 pl-2">{job.ContactInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}