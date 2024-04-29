import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import JoblyApi from "./api";
import Company from "./Company";
import { Card, CardBody, ListGroup } from "reactstrap";
import SearchBox from "./SearchBox";
import userContext from "./UserContext";
import "./Companies.css";

const Companies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState();

  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  const handleSearch = async (term) => {
    const companies = await JoblyApi.getCompaniesFiltered(term);
    setCompanies(companies);
    setIsLoading(false);
  };

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }
  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="col-md-5 Companies">
      <SearchBox handleSearch={handleSearch} />
      <Card>
        <CardBody>
          <ListGroup className="Companies-List">
            {companies.map((company) => (
              <Link to={`/companies/${company.handle}`} key={company.handle}>
                <Company company={company} />
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default Companies;
