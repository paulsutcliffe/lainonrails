$(function() {
    if (window.PIE) {
        $('.none').each(function() {
            PIE.attach(this);
        });
    }
});