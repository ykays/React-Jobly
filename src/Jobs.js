import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import JoblyApi from "./api";
import Job from "./Job";
import { Card, CardBody, ListGroup } from "reactstrap";
import SearchBox from "./SearchBox";
import userContext from "./UserContext";
import "./Jobs.css";

const Jobs = ({ applyToJob }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState();
  const { user } = useContext(userContext);

  useEffect(() => {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    getJobs();
  }, []);

  const handleSearch = async (term) => {
    const jobs = await JoblyApi.getJobsFiltered(term);
    setJobs(jobs);
    setIsLoading(false);
  };

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="col-md-5 Jobs">
      <SearchBox handleSearch={handleSearch} />
      <Card>
        <CardBody>
          <ListGroup className="Jobs-List">
            {jobs.map((job) => (
              <Job job={job} key={job.id} applyToJob={applyToJob} />
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default Jobs;
