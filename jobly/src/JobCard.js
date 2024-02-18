import { useContext, useState, useEffect } from "react";
import userContext from "./userContext";
import "./JobCard.css";

/** JobCard: presentational component, shows title of job, name of company,
 *  salary, and equity.
 *
 *  Props:
 *  job -> { title, salary, equity, companyName (optional) }
 *
 *  State:
 *  - applied
 *
 *  JobCardList -> JobCard
 */

function JobCard({ job }) {
  console.log("JobCard input: ", job);

  const { id, title, companyName, salary, equity } = job;

  const { hasAppliedToJob, applyToJob } = useContext(userContext);
  const [applied, setApplied] = useState();

  useEffect(function checkApplyStatusOnMount() {
    async function checkStatus() {
      setApplied(hasAppliedToJob(id));
    }
    checkStatus();
  }, [id, hasAppliedToJob]);

  /** Applies for job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }


  return (
    <div className="JobCard">
      <h3 className="JobCard-title">{title}</h3>
      {companyName &&
        <p>Company: {companyName}</p>}
      {salary && <p>Salary: {salary}</p>}
      {equity && <p>Equity: {equity}</p>}
      <button
        className="Jobcard-btn"
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}


export default JobCard;