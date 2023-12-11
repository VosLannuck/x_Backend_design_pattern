const app = require("express")()
const jobs = {}

async function checkIfJobComplete(jobId) {
  return new Promise( ( resolve, reject) => {
      if (jobs[jobId] < 100 ) {
        this.setTimeout( ()=>  resolve(false), 1000 )
      } 
      else {
        resolve(true)
      }
  });
}

function updateJob(jobId, prg) {
  jobs[jobId] = prg;
  console.log(`Updated ${jobId} to ${prg}`);
  if (prg == 100) return;
  this.setTimeout(()=> {updateJob(jobId, prg + 10)}, 1000);
}

app.post("/submit", (req, res) => {
  const jobId = `Job-${Date.now()}`;
  jobs[jobId] = 0;
  console.log(`Job created ${jobId}`)
  updateJob(jobId, 0);
  res.end(`${jobId}`)
});

app.get("/checkstatus", async (req, res) => {
  console.log(req.query);
  const {jobId} = req.query
  console.log(jobId);
  while(await checkIfJobComplete(jobId) == false);
  res.end(`\n\n JobStatus for ${jobId} is completed`)
});

app.listen(8999, () => console.log("listening on 8999"));
