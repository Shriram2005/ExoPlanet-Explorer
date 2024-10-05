document.getElementById('search-button').addEventListener('click', function() {
    const discoveryMethod = document.getElementById('discoverymethod').value;
    const discoveryYear = document.getElementById('disc_year').value;
    const hostName = document.getElementById('hostname').value;
    const planetRadiusMin = document.getElementById('planet_radius_min').value;
    const planetRadiusMax = document.getElementById('planet_radius_max').value;
    const planetMassMin = document.getElementById('planet_mass_min').value;
    const planetMassMax = document.getElementById('planet_mass_max').value;
    const orbitalPeriod = document.getElementById('orbital_period').value;

    fetch('./PS_2024.10.05_10.00.36.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header row
            const filteredRows = rows.filter(row => {
                const columns = row.split(',');
                const methodMatch = discoveryMethod ? columns[5] === discoveryMethod : true;
                const yearMatch = discoveryYear ? columns[6] === discoveryYear : true;
                const hostMatch = hostName ? columns[1].toLowerCase().includes(hostName.toLowerCase()) : true;
                const radiusMatch = planetRadiusMin || planetRadiusMax ? 
                    (planetRadiusMin ? parseFloat(columns[20]) >= parseFloat(planetRadiusMin) : true) &&
                    (planetRadiusMax ? parseFloat(columns[20]) <= parseFloat(planetRadiusMax) : true) : true;
                const massMatch = planetMassMin || planetMassMax ? 
                    (planetMassMin ? parseFloat(columns[26]) >= parseFloat(planetMassMin) : true) &&
                    (planetMassMax ? parseFloat(columns[26]) <= parseFloat(planetMassMax) : true) : true;
                const periodMatch = orbitalPeriod ? parseFloat(columns[11]) === parseFloat(orbitalPeriod) : true;
                return methodMatch && yearMatch && hostMatch && radiusMatch && massMatch && periodMatch;
            });

            displayResults(filteredRows);
        });
});

function displayResults(rows) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (rows.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headers = ['Planet Name', 'Host Star', 'Discovery Method', 'Discovery Year', 'Orbital Period (days)', 'Planet Radius (Earth radii)', 'Planet Mass (Earth masses)', 'Distance (pc)', 'Equilibrium Temperature (K)', 'Stellar Mass (Solar masses)', 'Stellar Radius (Solar radii)'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    rows.forEach(row => {
        const columns = row.split(',');
        const tr = document.createElement('tr');
        const cells = [
            columns[0], // Planet Name
            columns[1], // Host Star
            columns[5], // Discovery Method
            columns[6], // Discovery Year
            columns[11], // Orbital Period
            columns[20], // Planet Radius
            columns[26], // Planet Mass
            columns[65], // Distance
            columns[29], // Equilibrium Temperature
            columns[36], // Stellar Mass
            columns[37]  // Stellar Radius
        ];
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    resultsContainer.appendChild(table);
}