document.addEventListener('DOMContentLoaded', function () {
    var popover = document.querySelectorAll('[popover]');
    if (popover.length > 0) {
        if (!('popover' in HTMLElement.prototype)) {
            popover.forEach(function (elem) {
                elem.style.display = 'none';
                elem.classList.add('popover-fallback');
            });

            var backdrop = document.createElement('div');
            backdrop.className = 'backdrop';
            backdrop.style.display = 'none';
            document.body.appendChild(backdrop);

            document.addEventListener('click', function (event) {
                if (event.target.hasAttribute('popovertarget')) {
                    var popovertarget = event.target.getAttribute('popovertarget');
                    var targetElem = document.getElementById(popovertarget);
                    if (targetElem) {
                        targetElem.style.display = 'block';
                        backdrop.style.display = 'block';
                        var newEvent = new CustomEvent('toggle', { detail: { originalEvent: { newState: "open" }}});
                        targetElem.dispatchEvent(newEvent);
                    }
                } else if (event.target.classList.contains('backdrop')) {
                    var popoverFallbacks = document.querySelectorAll('.popover-fallback');
                    popoverFallbacks.forEach(function (elem) {
                        elem.style.display = 'none';
                    });
                    backdrop.style.display = 'none';
                }
            });

            HTMLElement.prototype.showPopover = function() {
                var popoverElem = document.getElementById(this.getAttribute('id'));
                if (popoverElem) {
                    popoverElem.style.display = 'block';
                    backdrop.style.display = 'block';
                    var newEvent = new CustomEvent('toggle', { detail: { originalEvent: { newState: "open" }}});
                    popoverElem.dispatchEvent(newEvent);
                }
            };

            HTMLElement.prototype.hidePopover = function() {
                var popoverFallbacks = document.querySelectorAll('.popover-fallback');
                popoverFallbacks.forEach(function (elem) {
                    elem.style.display = 'none';
                });
                backdrop.style.display = 'none';
            };
        }
    }
});
