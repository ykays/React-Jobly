import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Job.css";
import userContext from "./UserContext";

const Job = ({ job, applyToJob }) => {
  const [applied, setApplied] = useState(false);

  const { user } = useContext(userContext);
  useEffect(() => {
    if (user.user.applications.includes(job.id)) {
      setApplied(true);
    }
  }, []);

  const handleClick = (e) => {
    const jobId = e.target.parentElement.dataset["id"];
    applyToJob(jobId);
    setApplied(true);
  };

  return (
    <div className="Job">
      <Card>
        <CardBody data-id={job.id}>
          <CardTitle className="Job-Title">{job.title}</CardTitle>
          <p className="Job-Details">Salary: {job.salary}</p>
          <p className="Job-Details">Equity: {job.equity}</p>
          {applied ? (
            <button disabled>APPLIED</button>
          ) : (
            <button onClick={handleClick}>APPLY</button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Job;
