const commonTimezones = [
    'Asia/Bangkok',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Australia/Sydney',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'UTC'
];

function populateTimezones() {
    const fromSelect = document.getElementById('fromTimezone');
    const toSelect = document.getElementById('toTimezone');

    commonTimezones.forEach(timezone => {
        const fromOption = new Option(timezone, timezone);
        const toOption = new Option(timezone, timezone);
        fromSelect.add(fromOption);
        toSelect.add(toOption);
    });

    fromSelect.value = 'Asia/Bangkok';
    toSelect.value = 'UTC';
}

function convertTime() {
    const datetime = document.getElementById('datetime').value;
    const fromTz = document.getElementById('fromTimezone').value;
    const toTz = document.getElementById('toTimezone').value;

    if (!datetime) {
        alert('กรุณาเลือกวันที่และเวลา');
        return;
    }

    try {
        const date = new Date(datetime);

        const fromTime = date.toLocaleString('th-TH', {
            timeZone: fromTz,
            dateStyle: 'full',
            timeStyle: 'long'
        });

        const toTime = date.toLocaleString('th-TH', {
            timeZone: toTz,
            dateStyle: 'full',
            timeStyle: 'long'
        });

        document.getElementById('result').innerHTML = `
            <strong>เวลาต้นทาง (${fromTz}):</strong><br>
            ${fromTime}<br><br>
            <strong>เวลาปลายทาง (${toTz}):</strong><br>
            ${toTime}
        `;
    } catch (error) {
        document.getElementById('result').innerHTML = 'เกิดข้อผิดพลาดในการแปลงเวลา';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    populateTimezones();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('datetime').value = `${year}-${month}-${day}T${hours}:${minutes}`;
});