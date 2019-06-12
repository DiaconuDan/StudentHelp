import moment from "moment";

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
        job.companyFullname
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
  companyFullname
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
    companyFullname
  };
}