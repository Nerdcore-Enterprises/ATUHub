import React from 'react';

function safeJsonParse(data) {
    if (typeof data === 'string') {
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Error parsing JSON:", error, data);
            return [];
        }
    }
    return Array.isArray(data) ? data : [];
}

export default function Job({ job }) {
    const requirements = safeJsonParse(job.Requirements);
    const responsibilities = safeJsonParse(job.Responsibilities);

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
                            {requirements.map((data, index) => (
                                <p key={index}>&bull; {data}</p>
                            ))}
                        </div>
                    )}
                    {responsibilities.length > 0 && (
                        <div className="text-xs font-semibold">
                            <p className="text-sm font-bold">Responsibilities:</p>
                            {responsibilities.map((data, index) => (
                                <p key={index}>&bull; {data}</p>
                            ))}
                        </div>
                    )}
                    <p className="flex items-center text-xs gap-1">
                        <span className="font-bold">Created:</span>
                        <span className="font-mono">{job.CreatedAt}</span>
                    </p>
                    <div className="flex gap-2 text-xs font-semibold">
                        <p>{job.ContactType}</p>
                        <p className="font-mono border-l-2 border-gray-500 pl-2">{job.ContactInfo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}