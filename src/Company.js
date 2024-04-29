import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./Company.css";

const Company = ({ company }) => {
  return (
    <div className="Company">
      <Card>
        <CardBody>
          <CardTitle className="Company-Name">{company.name}</CardTitle>
          <p className="Company-Description">{company.description}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Company;
