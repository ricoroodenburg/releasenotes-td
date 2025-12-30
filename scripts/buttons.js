// Dropdown items die altijd onder More zitten (Button 3,4,5)
const defaultMoreItems = [
	{ 
		text: 'Community',
		url: 'https://community.topdesk.com',
		iconCss: 'e-icons e-open-link'
	},
	{ 
		text: 'Documentation Portal',
		url: 'https://docs.topdesk.com',
		iconCss: 'e-icons e-open-link'
	},
	{ 
		text: 'My Topdesk',
		url: 'https://my.topdesk.com',
		iconCss: 'e-icons e-open-link'
	},
	{ 
		text: 'Status Page',
		url: 'https://status.topdesk.com',
		iconCss: 'e-icons e-open-link'
	},
	{ 
		text: 'TIP Platform',
		url: 'https://tip.topdesk.com',
		iconCss: 'e-icons e-open-link'
	},
	{
		separator: true
	},			
	{ 
		text: 'About',
		iconCss: 'e-icons e-circle-info'
	}
];

// SplitButton aanmaken
const moreBtn = new ej.splitbuttons.DropDownButton({
	items: defaultMoreItems,
	content: "More",
	beforeItemRender: (args) => {
		const a = args.element.getElementsByTagName('a')[0];
		if (a) {
			a.setAttribute('target', '_blank');
		}
	}
});
moreBtn.appendTo("#moreBtn");

// Functie om toolbar te updaten bij resize
function updateToolbar() {
	if (window.innerWidth <= 600) {
		// Mobile: buttons 1 & 2 verbergen
		document.getElementById("btn1").style.display = "none";
		document.getElementById("btn2").style.display = "none";

		// Voeg Button 1 & 2 toe aan dropdown
		moreBtn.items = [
			{ text: "Button 1", onClick: () => alert("Button 1 clicked") },
			{ text: "Button 2", onClick: () => alert("Button 2 clicked") },
			...defaultMoreItems
		];
		moreBtn.content = "…"; // verander content naar drie puntjes
		moreBtn.dataBind();
	} else {
		// Desktop: buttons zichtbaar
		document.getElementById("btn1").style.display = "inline-block";
		document.getElementById("btn2").style.display = "inline-block";

		// Dropdown terug naar standaard items
		moreBtn.items = defaultMoreItems;
		moreBtn.content = "More";
		moreBtn.dataBind();
	}
}

window.addEventListener("resize", updateToolbar);
updateToolbar(); // init
