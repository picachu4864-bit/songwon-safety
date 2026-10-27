const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let serverDataStore = {
  allRecords: {},
  inspectors: null,
  approvalRoles: null,
  checklistTemplates: null
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname)));

app.get('/api/data', (req, res) => {
  res.json(serverDataStore);
});

app.post('/api/data', (req, res) => {
  const { allRecords, inspectors, approvalRoles, checklistTemplates } = req.body;
  if (allRecords) serverDataStore.allRecords = allRecords;
  if (inspectors) serverDataStore.inspectors = inspectors;
  if (approvalRoles) serverDataStore.approvalRoles = approvalRoles;
  if (checklistTemplates) serverDataStore.checklistTemplates = checklistTemplates;
  res.json({ success: true, message: '저장 완료' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`성원엔비켐(Songwon Envichem) 서버가 포트 ${PORT}에서 실행 중입니다.`);
});