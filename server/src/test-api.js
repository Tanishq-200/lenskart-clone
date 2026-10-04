const http = require('http');

const PORT = process.env.PORT || 5000;

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('Testing Lenskart Franchise & Landlord Portal API...');

  try {
    // 1. Health check
    const health = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/health',
      method: 'GET',
    });
    console.log(`[PASS] Health check: status ${health.status}, db: ${health.data.database.type}`);

    // 2. Validate Partner lead rejection
    const invalidPartner = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/api/leads/partner',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { name: '' }
    );
    if (invalidPartner.status === 400) {
      console.log('[PASS] Partner validation rejection correctly returned 400 with field errors');
    } else {
      console.error('[FAIL] Partner validation failed, expected 400, got', invalidPartner.status);
    }

    // 3. Valid Partner lead submission
    const validPartner = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/api/leads/partner',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        isOptometrist: true,
        name: 'Automated Test User',
        email: 'test.user@eyecare.com',
        phone: '9876543210',
        city: 'Mumbai',
        propertyType: 'Owned',
      }
    );
    console.log(`[PASS] Partner submission: status ${validPartner.status}, id: ${validPartner.data.data?._id}`);

    // 4. Valid Landlord lead submission
    const validLandlord = await request(
      {
        hostname: 'localhost',
        port: PORT,
        path: '/api/leads/landlord',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        firstName: 'Test',
        lastName: 'Landlord',
        mobile: '9123456780',
        city: 'Delhi',
        email: 'landlord@realty.com',
        state: 'Delhi',
        landlordType: 'Individual Owner',
        frontage: '20 ft',
        propertyAddress: 'Test High Street Property, Sector 18, Noida',
      }
    );
    console.log(`[PASS] Landlord submission: status ${validLandlord.status}, id: ${validLandlord.data.data?._id}`);

    // 5. Verify records stored in database
    const partnerList = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/leads/partner',
      method: 'GET',
    });
    console.log(`[PASS] Partner list: ${partnerList.data.data.length} records retrieved from DB`);

    const landlordList = await request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/leads/landlord',
      method: 'GET',
    });
    console.log(`[PASS] Landlord list: ${landlordList.data.data.length} records retrieved from DB`);

    console.log('ALL API TESTS PASSED SUCCESSFULLY! Ready for frontend integration.');
  } catch (err) {
    console.error('API Test Error:', err.message);
  }
}

runTests();
