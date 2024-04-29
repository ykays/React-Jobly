import React, { useState, useEffect, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import JoblyApi from "./api";
import { Card, CardBody, ListGroup } from "reactstrap";
import Job from "./Job";
import userContext from "./UserContext";
import "./CompanyDetails.css";

const CompanyDetails = ({ applyToJob }) => {
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState();
  const { user } = useContext(userContext);

  useEffect(() => {
    async function getCompany(handle) {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
      setIsLoading(false);
    }
    getCompany(handle);
  }, []);

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "white" }}>
        <h4>{company.name}</h4>
        <p>{company.description}</p>
      </div>
      <Card>
        <CardBody>
          <ListGroup className="Companies-Details-List">
            {company.jobs.map((job) => (
              <Job key={job.id} job={job} applyToJob={applyToJob} />
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default CompanyDetails;
