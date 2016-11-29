$(document).ready(function() {
    $('.nav li a').click(function(e) {
        $('.nav li a').removeClass('activeTab');
        var $this = $(this);
        if (!$this.hasClass('activeTab')) {
            $this.addClass('activeTab');
        }
    });
});
