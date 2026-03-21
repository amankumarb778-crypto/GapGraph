const fs = require('fs');

async function test() {
    const formData = new FormData();
    formData.append('jdText', 'We need a senior React and Node.js developer.');
    
    // We don't have a file, but the endpoint takes JD text. Wait, backend server.ts requires req.body or req.file.
    // Actually, in fastify multipart, if both are missing it might just use default.
    try {
        const res = await fetch('http://localhost:3001/api/analyze', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        console.log(JSON.stringify(data, null, 2));
    } catch(e) {
        console.error(e);
    }
}
test();
