const app = require("express")();

const jobs = {};

function updateJob(jobId, progress) {
  jobs[jobId] = progress;
  console.log(`Updated ${jobId} to ${progress} %`);
  if (progress == 100) return;
  this.setTimeout(() => {
    updateJob(jobId, progress + 10)
  }, 3000);
}

app.post("/submit", (req, res)=> {
  const jobId = `Job-${Date.now()}`;
  jobs[jobId] = 0;
  updateJob(jobId, 0);
  res.end("\n\n" + jobId + "\n\n")
})

app.get("/checkstatus", (req, res)=> {
  console.log(jobs[req.query.jobId]);
  res.end("\n\n Jobstatus: " + jobs[req.query.jobId] + "%\n\n");
})

app.listen(8999, ()=> console.log("Listening on port - 8999"))
