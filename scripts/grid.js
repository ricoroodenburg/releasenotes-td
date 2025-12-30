async function initGrid() {
    try {
        const data = await loadData(); // globaal gedefinieerde loadData() in index.html

        const toolbarOptions = [
            { text: 'Search', align: 'Left' },
            { text: 'Expand All', align: 'Right', tooltipText: 'Expand All', prefixIcon: 'e-chevron-down', id: 'expandall' },
            { text: 'Collapse All', align: 'Right', tooltipText: 'Collapse All', prefixIcon: 'e-chevron-up', id: 'collapseall' }
        ];

        const filterSettings = { type: 'Excel' };

        // Grid aanmaken en globaal beschikbaar maken
        window.grid = new ej.grids.Grid({
            dataSource: data,
            enablePersistence: true,
            enableAdaptiveUI: true,
            adaptiveUIMode: 'Mobile',
            height: '100%',
            created: function() {
                setTimeout(() => {
                    const searchBar = document.getElementById(grid.element.id + "_searchbar");
                    if (searchBar) {
                        searchBar.addEventListener('keyup', function(event) {
                            grid.search(event.target.value);
                        });
                    }
                }, 0);
            },
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            allowSorting: true,
            sortSettings: { columns: [{ field: 'releaseDate', direction: 'Descending' }] },
            allowMultiSorting: true,
            showColumnMenu: true,
            allowFiltering: true,
            filterSettings: filterSettings,
            allowGrouping: true,
            toolbar: toolbarOptions,
            toolbarClick: clickHandler,
            groupSettings: { columns: ['releaseDate'], showDropArea: false, captionTemplate: '#captiontemplate' },
            allowResizing: true,
            allowReordering: true,
			emptyRecordTemplate: `
                <div class='emptyRecordTemplate' style="text-align: center;">
                    <img src="emptyRecordTemplate.svg" class="e-emptyRecord" alt="No record" style="height: 88.2%; max-height: 360px">
                    <br>
                    <h2>Er zijn geen resultaten gevonden</h2>
                    <p>Probeer een andere zoekopdracht</p>
                </div>
            `,
            columns: [
                { field: "release", headerText: "Release", width: 100 },
                { field: "releaseDate", headerText: "Release Date", width: 140, type:'date', format:'yyyy-MM-dd' },
                { field: "descriptionHtml", headerText: "Description", width: 350, template: d => `<div style="white-space:normal;">${d.descriptionHtml}</div>`, allowGrouping: false },
                { field: "category", headerText: "Category", width:150 },
                { field: "subcategory", headerText: "Subcategory", width:150 },
                { headerText:"Source", width:100, template: d => {
                    if(d.source==="production") return `<span class="status-badge success">Feature</span>`;
                    if(d.source==="api") return `<span class="status-badge primary">API</span>`;
                    return "";
                }},
                { headerText:"Hosting", width:150, template: d => {
                    let html="";
                    if(d.hosting?.saas) html+= `<span class="status-badge success" style="margin-right:5px">SAAS</span>`;
                    if(d.hosting?.onpremisesvirtualappliance) html+= `<span class="status-badge danger">Virtual Appliance</span>`;
                    return html;
                }},
                { field:"isTosNote", headerText:"TOS", width:80, template: d => d.isTosNote ? `<span class="status-badge success">True</span>` : `<span class="status-badge danger">False</span>`, visible:false }
            ],
            rowDataBound: function(args) {
                if(args.data.attentions?.highlight) args.row.classList.add('highlight-row');
            }
        });

        grid.appendTo('#grid');

    } catch (e) {
        console.error("Failed to initialize grid:", e);
    }
}

function clickHandler(args) {
	switch (args.item.id){
	
		case 'expandall':
			console.debug(`${args.item.id} invoked`);
			grid.groupModule.expandAll();
			break;

		case 'collapseall':
			console.debug(`${args.item.id} invoked`);
			grid.groupModule.collapseAll();
			break;
			
		default:
			console.info(`No action found for ${args.item.id}`);
			
	};
	
}

function template(args) { 
	const date = args.key; // dit is een Date-object
	if (!(date instanceof Date)) return `${args.headerText}: ${args.key}`;

	const day   = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year  = date.getFullYear();

	return `${args.headerText}: ${day}-${month}-${year}`;
}

// Globaal init trigger
initGrid();
