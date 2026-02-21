(() => {
  // Creates the html elements
  const searchInput = document.getElementById('cve-search');
  const searchBtn   = document.getElementById('search-btn');
  const statusMsg   = document.getElementById('status-msg');
  const resultsEl   = document.getElementById('results');

  // Function to query the API
  async function fetchCVEs(query) {
    const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(query.trim())}&resultsPerPage=40`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    return response.json();
  }

  
  // Function to transform raw output into structured data using .map.
  function processVulnerabilities(vulnerabilities) {
    return vulnerabilities.map(item => {
      const cve = item.cve;
      const metrics = cve.metrics;
      // Check CVSS metrics in order of preference and assign severity, score and version.
      let cvss = { severity: 'UNKNOWN', score: 0, version: 'N/A' };

      if (metrics.cvssMetricV31?.length > 0) {
        const m = metrics.cvssMetricV31[0];
        cvss = { severity: m.cvssData.baseSeverity, score: m.cvssData.baseScore, version: 'v3.1' };
      } else if (metrics.cvssMetricV30?.length > 0) {
        const m = metrics.cvssMetricV30[0];
        cvss = { severity: m.cvssData.baseSeverity, score: m.cvssData.baseScore, version: 'v3.0' };
      } else if (metrics.cvssMetricV2?.length > 0) {
        const m = metrics.cvssMetricV2[0];
        cvss = { severity: m.baseSeverity, score: m.cvssData.baseScore, version: 'v2' };
      }

      // Filter the results using .filter to only include the keywords below in an effort to only return PoCs. Remove duplicates using ...new.
      const pocs = [...new Set((cve.references || [])
        .filter(ref =>
          ref.url.toLowerCase().includes('exploit-db.com') ||
          ref.url.toLowerCase().includes('github.com')     ||
          ref.url.toLowerCase().includes('exploit')        ||
          ref.url.toLowerCase().includes('poc')            ||
          ref.url.toLowerCase().includes('packetstorm')
        )
        .map(ref => ref.url))];

      // Use flatMap to flatten nested description arrays, filter for CWE entries, then map to extract the IDs.
      const cwes = (cve.weaknesses || [])
        .flatMap(w => w.description)
        .filter(d => d.value.startsWith('CWE-'))
        .map(d => d.value);

      return {
        id:          cve.id,
        description: cve.descriptions.find(d => d.lang === 'en')?.value || 'No description available',
        published:   new Date(cve.published).toLocaleDateString(),
        status:      cve.vulnStatus,
        cvss,
        cwes,
        pocs,
      };
    });
  }

  // DOM rendering. Uses textContent only to prevent XSS.
  function renderVulnerabilities(vulnerabilities) {
    // Clear previous results before rendering new ones.
    resultsEl.textContent = '';

    if (vulnerabilities.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = 'No vulnerabilities found.';
      resultsEl.appendChild(msg);
      return;
    }

    // Build and append a card element for each vulnerability.
    vulnerabilities.forEach(vuln => {
      const card = document.createElement('article');

      // Create the CVE title as a link to the NVD detail page.
      const title = document.createElement('h3');
      const titleLink = document.createElement('a');
      titleLink.href = `https://nvd.nist.gov/vuln/detail/${vuln.id}`;
      titleLink.textContent = vuln.id;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      title.appendChild(titleLink);
      card.appendChild(title);

      // Create a severity badge and add the published date and status.
      const meta = document.createElement('p');
      const badge = document.createElement('span');
      badge.className = `sev-${vuln.cvss.severity}`;
      badge.textContent = `${vuln.cvss.severity} ${vuln.cvss.score} (${vuln.cvss.version})`;
      meta.appendChild(badge);
      meta.appendChild(document.createTextNode(` · ${vuln.published} · ${vuln.status}`));
      card.appendChild(meta);

      // Append the English description text.
      const desc = document.createElement('p');
      desc.textContent = vuln.description;
      card.appendChild(desc);

      // Append CWE weakness links if the vulnerability has any.
      if (vuln.cwes.length > 0) {
        const cweP = document.createElement('p');
        cweP.appendChild(document.createTextNode('Weakness: '));
        vuln.cwes.forEach((cwe, i) => {
          const num = cwe.replace('CWE-', '');
          const a = document.createElement('a');
          a.href = `https://cwe.mitre.org/data/definitions/${num}.html`;
          a.textContent = cwe;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          cweP.appendChild(a);
          if (i < vuln.cwes.length - 1) cweP.appendChild(document.createTextNode(', '));
        });
        card.appendChild(cweP);
      }

      // Append PoC and exploit links if any were found.
      if (vuln.pocs.length > 0) {
        const label = document.createElement('p');
        label.textContent = `PoC / Exploit Links (${vuln.pocs.length})`;
        card.appendChild(label);

        const list = document.createElement('ul');
        vuln.pocs.forEach(url => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = url;
          a.textContent = url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          li.appendChild(a);
          list.appendChild(li);
        });
        card.appendChild(list);
      }

      // Add the finished card to the results container.
      resultsEl.appendChild(card);
    });
    document.body.classList.add('has-results');
  }

  // Search function. Fetches and renders results for the current query.
  async function search() {
    const query = searchInput.value.trim();
    if (!query) return;

    statusMsg.textContent = `Searching for "${query}"…`;
    resultsEl.textContent = '';
    document.body.classList.remove('has-results');

    // Fetch raw CVE data from the NVD API.
    const data = await fetchCVEs(query);
    console.log('Raw API response:', data);

    if (data.totalResults === 0) {
      statusMsg.textContent = `No results found for "${query}".`;
      return;
    }

    // Transform raw API data into structured vulnerability objects.
    const vulns = processVulnerabilities(data.vulnerabilities);
    console.log('Processed vulnerabilities:', vulns);

    statusMsg.textContent = '';
    renderVulnerabilities(vulns);
  }

  // Event listeners. No inline handlers used.
  // Trigger search when the button is clicked.
  searchBtn.addEventListener('click', () => {
    search().catch(err => {
      statusMsg.textContent = `Error: ${err.message}`;
      console.error(err);
    });
  });

  // Trigger search when Enter is pressed in the input.
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      search().catch(err => {
        statusMsg.textContent = `Error: ${err.message}`;
        console.error(err);
      });
    }
  });
})();
