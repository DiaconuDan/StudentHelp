
  
  import moment from "moment" ;

  
  let id = 0;
  export function createData(status, startDate, endDate, location, responsesNumber, hourlyPayment, responses, docID) {
    id += 1;
    return { id, status, startDate, endDate,location,  responsesNumber, hourlyPayment,responses, docID };
  }
  
  
  export const getStatus = ( jobStartDate, jobEndDate) => {
  
  
    const currentDate = moment().format('YYYY-MM-DD HH:mm');
    
  
    if ( jobStartDate > currentDate) {
      return "Upcoming" ;
    }
    if ( jobEndDate < currentDate) {
      return "Finished" ;
    }
    if ( currentDate>= jobStartDate && currentDate <= jobEndDate) {
      return "Running" ;
    } 
   
  }
  
  export const generateRows = ( jobs ) => {
    let rows = [] ;
    jobs.forEach( job => {
      const status = getStatus( job.startDate, job.endDate) ;
      rows.push(createData(status, moment(job.startDate).format('DD-MM-YYYY HH:mm'), moment(job.endDate).format('DD-MM-YYYY HH:mm'), job.location, job.responses.length + "/" + job.studentsNumber, job.hourlyPayment, job.responses, job.docID));
    })
    return rows ;
  }
  