async function initCalendar() {

    const data = await loadData();

    // --- 1. Data converteren naar Scheduler formaat ---
    const calendarData = data.map(item => ({
        Id: item.release,
        Subject: item.release,
        StartTime: new Date(item.releaseDate),
        EndTime: new Date(item.releaseDate),
        IsAllDay: true,
        Description: item.descriptionHtml,
		ProjectId: item.attentions?.highlight ? 1 : 0,
    }));

    // --- 2. Scheduler aanmaken ---
    const schedule = new ej.schedule.Schedule({
        //height: "100%",
        //width: "100%",
        selectedDate: new Date(),       // focus op vandaag
        currentView: "Month",
		views: ['Month'],
		enablePersistence: true,
		readonly: true,
        eventSettings: {
            dataSource: calendarData,
            fields: {
                id: "Id",
                subject: { name: "Subject" },
                startTime: { name: "StartTime" },
                endTime: { name: "EndTime" },
                description: { name: "Description" },
				ProjectId : { name: "ProjectId "},
            }
        },
		eventRendered: function(args) {
			// default styling class
			args.element.classList.add("calendar-event");

			// highlight?
			console.log(args);
			if (args.data.ProjectId ) {
				args.element.classList.add("calendar-event-highlight");
			}
		},
        popupOpen: function(args) {
            // alleen event-popup customizen
            if (args.type === "QuickInfo" && args.data && args.data.Description) {

                // Titel aanpassen
                args.element.querySelector('.e-subject').innerHTML = args.data.Subject;

                // Beschrijving HTML toevoegen
                const desc = args.element.querySelector('.e-description');
                if (desc) {
                    desc.innerHTML = args.data.Description;
                }
            }

            // editor-popup (volledige edit) blokkeren
            if (args.type === "Editor") {
                args.cancel = true;
            }
        }
    });

    schedule.appendTo("#calendar");
}

// Globaal init trigger
initCalendar();
