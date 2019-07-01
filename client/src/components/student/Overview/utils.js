import moment from "moment";

function compare(a, b) {
  if (
    moment(a.startDate).format("YYYY-MM-DD HH:mm") >
    moment(b.startDate).format("YYYY-MM-DD HH:mm")
  ) {
    return -1;
  }
  if (
    moment(a.startDate).format("YYYY-MM-DD HH:mm") <
    moment(b.startDate).format("YYYY-MM-DD HH:mm")
  ) {
    return 1;
  }
  return 0;
}

export const sortJobsByDate = jobs => {
  return jobs.sort(compare);
};

export const generateRows = jobs => {
  let rows = [];

  jobs.forEach(job => {
    const status = getStatus(job.startDate, job.endDate);
    let studentResponse;
    if (job.studentResponse === true) {
      studentResponse = "Yes";
    } else {
      studentResponse = "No";
    }
    rows.push(
      createData(
        status,
        studentResponse,
        moment(job.startDate).format("DD-MM-YYYY HH:mm"),
        moment(job.endDate).format("DD-MM-YYYY HH:mm"),
        job.location,
        job.responses.length + "/" + job.studentsNumber,
        job.hourlyPayment,
        job.companyFullname,
        job.docID,
        job.responses,
        job.jobDescription,
        job.companyUserUID
      )
    );
  });
  return rows;
};

export const getStatus = (jobStartDate, jobEndDate) => {
  const currentDate = moment().format("YYYY-MM-DD HH:mm");

  if (jobStartDate > currentDate) {
    return "Upcoming";
  }
  if (jobEndDate < currentDate) {
    return "Finished";
  }
  if (currentDate >= jobStartDate && currentDate <= jobEndDate) {
    return "Running";
  }
};

let id = 0;
export function createData(
  status,
  studentResponse,
  startDate,
  endDate,
  location,
  responsesNumber,
  hourlyPayment,
  companyFullname,
  docID,
  responses,
  jobDescription,
  companyUserUID
) {
  id += 1;
  return {
    id,
    status,
    studentResponse,
    startDate,
    endDate,
    location,
    responsesNumber,
    hourlyPayment,
    companyFullname,
    docID,
    responses,
    jobDescription,
    companyUserUID
  };
}
