function fetchClasses() {
  const table = document.querySelector('div[style*="padding:5px"] table');
  if (!table) {
    console.error('No schedule table found');
    return [];
  }

  const rows = Array.from(table.querySelectorAll("tr")).slice(1);
  const classes = [];
  const days = ["L", "M", "W", "J", "V", "S"];
  
  // Updated type abbreviations mapping based on BuscaCursos class names
  const typeAbbreviations = {
    "horarioCAT": "C",     // Cátedra
    "horarioAYUD": "AY",  // Ayudantía
    "horarioLAB": "LAB",  // Laboratorio
    "horarioTERR": "TER", // Terreno
    "horarioTALL": "T",   // Taller
    "horarioPRAC": "PRA", // Práctica
    "horarioTES": "TES",  // Tesis
    "horarioOTRO": "O"    // Otro
  };

  for (let row of rows) {
    const cells = row.querySelectorAll("td");
    const time = cells[0]?.innerText.trim();
    if (!time) continue;

    for (let i = 1; i <= 6; i++) {
      const cell = cells[i];
      if (!cell) continue;
      
      const spans = cell.querySelectorAll("span");
      spans.forEach((span) => {
        const match = span.textContent.match(/(\d{5})-([A-Z0-9]+)/);
        if (match) {
          const [fullCode, nrc, sigla] = match;
          let type = "O"; // Default to "Otro"
          
          // Find the type class (color-coded)
          span.classList.forEach(c => {
            if (typeAbbreviations[c]) {
              type = typeAbbreviations[c];
            }
          });
          
          // Extract additional info from the span content
          const spanLines = span.textContent.trim().split('\n');
          const seccion = spanLines.length > 1 ? spanLines[1].trim() : '';
          const profesor = spanLines.length > 2 ? spanLines[2].trim() : '';
          const sala = spanLines.length > 3 ? spanLines[3].trim() : '';

          classes.push({
            nrc,
            sigla,
            type,
            day: days[i - 1],
            time,
            seccion,
            profesor,
            sala
          });
        }
      });
    }
  }

  console.log('Found classes:', classes);
  return classes;
}

function generateICS(classEntries) {
  const pad = (n) => n.toString().padStart(2, '0');
  const getDate = (day, time) => {
    const base = new Date("2025-08-04T00:00:00");
    base.setDate(base.getDate() + "LMWJVS".indexOf(day));
    const [h, m] = time.split(":").map(Number);
    base.setHours(h, m, 0);
    return base;
  };

  const dtstamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const events = classEntries.map((entry, i) => {
    const start = getDate(entry.day, entry.time);
    const end = new Date(start.getTime() + 70 * 60 * 1000);

    const format = (d) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    return `
BEGIN:VEVENT
UID:${entry.nrc}-${i}@quickuc
DTSTAMP:${dtstamp}
SUMMARY:[${entry.type}] - ${entry.sigla}
DTSTART;TZID=America/Santiago:${format(start)}
DTEND;TZID=America/Santiago:${format(end)}
DESCRIPTION:NRC: ${entry.nrc}\\nSigla: ${entry.sigla}\\nSección: ${entry.seccion}\\nProfesor: ${entry.profesor}\\nSala: ${entry.sala}
STATUS:CONFIRMED
END:VEVENT`;
  });

  return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Horario UC
X-WR-TIMEZONE:America/Santiago
${events.join("\n")}
END:VCALENDAR`;
}

function fetchCalendar() {
  try {
    const classes = fetchClasses();
    if (classes.length === 0) {
      console.warn('No classes found in schedule');
      return { success: false, error: 'No classes found' };
    }

    const ics = generateICS(classes);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "horario-uc.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return { success: true };
  } catch (error) {
    console.error('Error generating calendar:', error);
    return { success: false, error: error.message };
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchCalendar") {
    const result = fetchCalendar();
    sendResponse(result);
  }
  return true; // Required for async sendResponse
});
