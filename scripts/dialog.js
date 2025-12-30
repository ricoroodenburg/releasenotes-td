// dialog.js
window.dialog = new ej.popups.Dialog({
    header: 'About',
    content: `
        This product is not developed, supported, or affiliated with TOPdesk. Best effort only.
    `,
    buttons: [
        {
            click: function() {
                window.open('https://github.com/ricoroodenburg/releasenotes-td', '_blank'); // Link naar GitHub
            },
            buttonModel: { content: 'Show on GitHub', isPrimary: true }
        }
    ],
    width: '400px',
    visible: false,
    isModal: true,
	overlayClick: onOverlayClick,
	showCloseIcon: true,
	animationSettings: {
        effect: 'Zoom',
        duration: 400,
        delay: 1
    }
});

function onOverlayClick() {
    dialog.hide();
}

dialog.appendTo('#dialog');
