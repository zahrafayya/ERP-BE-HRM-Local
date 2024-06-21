import express from 'express';
import dotenv from 'dotenv';
import db from "../infrastructure/models";
import recruitmentRequestRouter from './routers/recruitment_request.router';
import departmentRouter from './routers/department.router';
import positionRouter from './routers/position.router';
import employeeRouter from './routers/employee.router';
import whitePayrollRouter from './routers/white_payroll.router';
import asuransiRouter from './routers/asuransi.router';
import amalRouter from './routers/amal.router';
import ptkpRouter from './routers/ptkp.router';
import familyMemberRouter from './routers/family_member.router';
import terPPhRouter from './routers/ter_pph.router';
import dayOffRouter from './routers/day_off.router';
import configurationRouter from './routers/configuration.router';
import presenceWhiteRouter from './routers/presence_white.router';
import overtimeRouter from './routers/overtime.router';
import salaryPercentageRouter from './routers/salary_percentage.router';
import salarySlipRouter from './routers/salary_slip.router';
import pkpRouter from './routers/pkp.router';
import allowanceRouter from './routers/allowance.router';
import allowanceNameRouter from './routers/allowance_name.router';
import bukpotRouter from './routers/bukpot.router';
import presenceBlueRouter from './routers/presence_blue.router';
import bukpotBlueRouter from './routers/bukpot_blue.router';

const dns = require('dns');

dotenv.config();

// Create an instance of express and CORS
const app = express();
const cors = require('cors');

// Parse JSON, url-encoded query and middleware CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Initialize database
db.sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err: object) => console.log("Error syncing tables: ", err));

const dnsPromises = dns.promises;
dnsPromises.setServers(['8.8.8.8', '8.8.4.4']); 

// Define routes
app.get('/test-dns', (req, res) => {
  dnsPromises.lookup('scm-api.erplabiim.com', (err: any, address: any, family: any) => {
      if (err) {
          res.status(500).send(`DNS lookup failed: ${err.message}`);
      } else {
          res.send(`Address: ${address}, Family: IPv${family}`);
      }
  });
});

app.get('/test-dns-erp', (req, res) => {
  dnsPromises.lookup('erp-api.erplabiim.com', (err: any, address: any, family: any) => {
      if (err) {
          res.status(500).send(`DNS lookup failed: ${err.message}`);
      } else {
          res.send(`Address: ${address}, Family: IPv${family}`);
      }
  });
});

app.use('/api/recruitment_request', recruitmentRequestRouter);
app.use('/api/department', departmentRouter);
app.use('/api/asuransi', asuransiRouter);
app.use('/api/position', positionRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/white_payroll', whitePayrollRouter);
app.use('/api/amal', amalRouter);
app.use('/api/ptkp', ptkpRouter);
app.use('/api/family_member', familyMemberRouter);
app.use('/api/ter_pph', terPPhRouter);
app.use('/api/day_off', dayOffRouter);
app.use('/api/configuration', configurationRouter);
app.use('/api/presence_white', presenceWhiteRouter);
app.use('/api/presence_blue', presenceBlueRouter);
app.use('/api/overtime', overtimeRouter);
app.use('/api/salary_percentage', salaryPercentageRouter);
app.use('/api/salary_slip', salarySlipRouter);
app.use('/api/pkp', pkpRouter);
app.use('/api/allowance', allowanceRouter);
app.use('/api/allowance_name', allowanceNameRouter);
app.use('/api/bukpot', bukpotRouter);
app.use('/api/bukpot_blue', bukpotBlueRouter);

// Set the port
const PORT = process.env.PORT ?? 3114;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
