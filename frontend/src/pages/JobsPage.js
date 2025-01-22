import React from 'react';
import Header from '../components/header';
import GenericPage from '../components/genericPage';
import JobWidget from '../components/JobSearch/JobWidget';

export default function JobsPage() {
    const testJobData = {
        name: "Slims Chickens",
        address: "404 Nowhere St, 12345",
        pay: 99,
        time: "Full Time",
        postedTime: new Date("2025-01-01"),
    }

    return (
        <GenericPage>
            <Header title="Jobs" />
            <JobWidget jobData={testJobData}/>
        </GenericPage>
    );
}
