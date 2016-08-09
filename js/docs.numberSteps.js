$('.step').each(function (i) {
    var stepNumber = parseInt(i + 1);
    $(this).addClass('step-' + stepNumber);
});
